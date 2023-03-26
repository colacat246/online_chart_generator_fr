<template>
  <el-scrollbar>
    <el-collapse
      accordion
      v-if="curGraph && curGraph.series"
      v-model="activeData"
    >
      <template v-for="curData in curGraph.series" :key="curData.id">
        <el-collapse-item :name="curData.id">
          <template #title>
            <div class="title-con">
              <section
                class="title-item"
                title=""
                :ref="(el) => setGraphRef(el, curData.id)"
              >
                {{ curData.name }}
              </section>
              <DeleteButtonVue
                :item-to-delete="curData.id"
                @delete-item="handleDeleteLine"
                size="16"
                class="del-button"
              ></DeleteButtonVue>
            </div>
          </template>
          <div class="item-con">
            <span>名称</span>
            <input type="text" v-model="curData.name" />
          </div>
          <div class="item-con">
            <span>X轴</span>
            <input
              type="text"
              :value="unzipData(curData.data, 'x')"
              @change="
                updateData($event.target.value, curData.data, 'x', curData)
              "
            />
          </div>
          <div class="item-con">
            <span>Y轴</span>
            <input
              type="text"
              :value="unzipData(curData.data, 'y')"
              @change="
                updateData($event.target.value, curData.data, 'y', curData)
              "
            />
          </div>
          <el-alert
            v-show="curData.axisWarn"
            class="axis-warning"
            title="X轴与Y轴数据个数不一致"
            type="warning"
          />

          <LineStyleVue
            class="item-con-double"
            v-model="curData.lineStyle.type"
            v-model:lineWidth="curData.lineStyle.width"
          ></LineStyleVue>
          <div class="item-con-double">
            <section>
              <span>平滑</span>
              <el-input-number
                size="small"
                v-model="curData.smooth"
                :min="0"
                :max="5"
                :step="0.02"
                :value-on-clear="0"
              />
            </section>
            <SwitchColorVue
              v-model="curData.color"
              :series="curGraph.series"
              :id="curData.id"
            ></SwitchColorVue>
          </div>
          <SymbolSelectorVue
            v-model="curData.symbol"
            v-model:symbolSize="curData.symbolSize"
            class="item-con-double"
          ></SymbolSelectorVue>
        </el-collapse-item>
      </template>
    </el-collapse>
    <el-button type="primary" @click="addNewLine($event)">添加新曲线</el-button>
  </el-scrollbar>
</template>

<script setup>
import { inject, computed, toRefs, ref, watch, nextTick } from 'vue';
import SwitchColorVue from '@/components/graphs/controlItems/SwitchColor.vue';
import SymbolSelectorVue from '@/components/graphs/controlItems/SymbolSelector.vue';
import LineStyleVue from '@/components/graphs/controlItems/LineStyle.vue';
import DeleteButtonVue from '@/components/generalComponents/DeleteButton.vue';

const blurBtn = inject('blurBtn');
const genId = inject('genUuid');
const genNewName = inject('genNewName');

// const storeD = storeData();
// const { graphs } = storeToRefs(storeD);
const props = defineProps(['graph']);
const { graph: curGraph } = toRefs(props);
const curGraphId = computed(() => curGraph.value.$extra.uuid);
// const { currentRoute } = useRouter();
// 图表Id
// const curGraphId = computed(() => {
//   return currentRoute.value.params.id;
// });
// 通过图表Id拿到当前图表对象
// const curGraph = computed(() => {
// return graphs.value.find((i) => i.id === curGraphId.value);
// });

// 转换input的输出、输入
const unzipData = (val, axis) => {
  axis = axis === 'x' ? 0 : 1;
  return val.map((i) => i[axis]).filter((i) => !isNaN(i));
};
const updateData = (val, data, axis, placeToReplace) => {
  placeToReplace.axisWarn = false;
  val = val
    .trim()
    .replace(/^,/, '')
    .replace(/,$/, '')
    .split(/, *,?/)
    .map((i) => parseFloat(i));

  let otherAxis = axis === 'x' ? 'y' : 'x';
  const otherData = unzipData(data, otherAxis);

  axis = axis === 'x' ? 0 : 1;
  otherAxis = otherAxis === 'x' ? 0 : 1;

  // BUG 坐标数量检查
  const maxLengh =
    val.length > otherData.length ? val.length : otherData.length;
  const res = [];
  for (let i = 0; i < maxLengh; i++) {
    if (!val[i] && val[i] !== 0) {
      val.push(NaN);
      placeToReplace.axisWarn = true;
    }
    if (!otherData[i] && otherData[i] !== 0) {
      otherData.push(NaN);
      placeToReplace.axisWarn = true;
    }
    const arr = Array(2);
    arr[axis] = val[i];
    arr[otherAxis] = otherData[i];
    res.push(arr);
  }
  placeToReplace.data = res;
};

// 添加新折线
// TODO name不能重复
const addNewLine = (evt) => {
  blurBtn(evt);
  const curSeries = curGraph.value.series;
  const id = genId();
  const defaultLineTemplate = {
    id,
    name: genNewName('新曲线', curSeries),
    data: [[], []],
    type: 'line',
    color: undefined,
    lineStyle: {},
    symbol: 'none',
    symbolSize: 7,
    lineStyle: {
      width: 1.5,
      type: 'solid',
    },
    smooth: 0,
  };
  curSeries.push(defaultLineTemplate);
  // 展开新面板
  activeData.value = id;
};

// 删除曲线
const handleDeleteLine = (id) => {
  const idx = curGraph.value.series.findIndex((i) => i.id === id);
  curGraph.value.series.splice(idx, 1);
};

// 控制面板当前曲线，默认展开第一个
const activeData = ref(
  curGraph.value.series[0] ? curGraph.value.series[0].id : ''
);

// 控制面板属性，结构为 属性 -> id
let graphControlProps = {
  refs: {},
};

// 折叠面板展开时不显示提示title
const setGraphRef = (el, curDataId) => {
  if (el) {
    graphControlProps.refs[curDataId] = el;
  }
};

watch([curGraphId, activeData], handleTitleTip, { immediate: true });

// 处理鼠标悬浮title提示
async function handleTitleTip() {
  await nextTick();
  for (const i in graphControlProps.refs) {
    graphControlProps.refs[i].title = '点击编辑曲线';
  }
  if (activeData.value === '') return; // 面板未改变时返回
  graphControlProps.refs[activeData.value].title = '收起';
}
</script>

<style lang="less" scoped>
.title-con {
  :deep(&:hover .del-button) {
    visibility: visible;
    opacity: 1;
  }
}
</style>
