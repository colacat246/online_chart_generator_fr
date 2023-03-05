<template>
  <el-scrollbar>
    <el-collapse
      accordion
      v-if="curGraph && curGraph.series"
      @change="handleElCollapseChange"
    >
      <template v-for="curData in curGraph.series" :key="curData.id">
        <el-collapse-item :name="curData.id">
          <template #title>
            <div
              class="title-con"
              title="点击编辑曲线"
              :ref="(el) => setGraphRef(el, curData.id)"
            >
              {{ curData.name }}
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
        </el-collapse-item>
      </template>
    </el-collapse>
    <el-button type="primary" @click="addNewLine($event)">添加新曲线</el-button>
  </el-scrollbar>
</template>

<script setup>
import { inject, computed, shallowRef, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { storeData } from '../../store/data.js';

const blurBtn = inject('blurBtn');
const genId = inject('genId');
const genNewName = inject('genNewName');
const storeD = storeData();
const { graphs } = storeToRefs(storeD);
const { currentRoute } = useRouter();

// 图表Id
const curGraphId = computed(() => {
  return currentRoute.value.params.id;
});
// 通过图表Id拿到当前图表对象
const curGraph = computed(() =>
  graphs.value.find((i) => i.id === curGraphId.value)
);

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
  // TODO 删除曲线、修改线形
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
const addNewLine = (evt) => {
  blurBtn(evt);
  const curSeries = graphs.value.find((i) => i.id === curGraphId.value).series;
  const defaultLineTemplate = {
    id: genId(),
    name: genNewName('新曲线', curSeries),
    data: [[], []],
    type: 'line',
    lineStyle: {},
    symbol: undefined,
    symbolSize: undefined,
  };
  curSeries.push(defaultLineTemplate);
};

// 折叠面板展开时不显示提示title
let graphRefs = {};
const setGraphRef = (el, type) => {
  if (el) {
    graphRefs[type] = el;
  }
};
const handleElCollapseChange = (activeName) => {
  for (const i in graphRefs) {
    graphRefs[i].title = '点击编辑曲线';
  }
  graphRefs[activeName].title = '';
};
</script>

<style lang="less" scoped>
.title-con {
  margin-left: 10px;
  font-size: 13px;
  color: #409eff;
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-con {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px 0 10px;
  font-size: 13px;
  .axis-warning {
    margin: 20px 0 0;
    width: 50px;
  }
  input {
    flex: 1;
  }
  span {
    color: #303133;
    margin-right: 5px;
    min-width: 30px;
  }
}
</style>
