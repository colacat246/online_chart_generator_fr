<template>
  <el-collapse
    accordion
    v-if="graph && graph.series"
    v-model="activeSeriesData"
  >
    <template v-for="curData in graph.series" :key="curData.$extra.id">
      <el-collapse-item :name="curData.$extra.id">
        <template #title>
          <div class="title-con">
            <section
              class="title-item"
              title=""
              :ref="(el) => setGraphRef(el, curData.$extra.id)"
            >
              {{ curData.name }}
            </section>
            <DeleteSeries :series-id="curData.$extra.id"></DeleteSeries>
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
            :series="graph.series"
            :id="curData.$extra.id"
          ></SwitchColorVue>
        </div>
        <SymbolSelectorVue
          v-model="curData.symbol"
          v-model:symbolSize="curData.symbolSize"
          class="item-con-double"
        ></SymbolSelectorVue>
      </el-collapse-item>
    </template>
    <div class="flex_con">
      <AddNewSeries></AddNewSeries>
    </div>
  </el-collapse>
</template>

<script setup>
import SwitchColorVue from '@/components/graphs/controlItems/SwitchColor.vue';
import SymbolSelectorVue from '@/components/graphs/controlItems/SymbolSelector.vue';
import LineStyleVue from '@/components/graphs/controlItems/LineStyle.vue';
import AddNewSeries from '@/components/graphs/controlItems/AddNewSeries.vue';
import DeleteSeries from '@/components/graphs/controlItems/DeleteSeries.vue';

import { storeToRefs } from 'pinia';
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();
const { graph, activeSeriesData } = storeToRefs(graphStore);

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

</script>

<style lang="less" scoped>
.title-con {
  :deep(&:hover .del-button) {
    visibility: visible;
    opacity: 1;
  }
}
</style>
