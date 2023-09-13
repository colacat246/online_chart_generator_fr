<template>
  <SeriesPanelContainerVue>
    <template v-slot="{ series: curData, graph: curGraph }">
      <div class="item-con">
        <span>X轴</span>
        <input
          type="text"
          :value="unzipData(curData.data, 'x')"
          @change="updateData($event.target.value, curData.data, 'x', curData)"
        />
      </div>
      <div class="item-con">
        <span>Y轴</span>
        <input
          type="text"
          :value="unzipData(curData.data, 'y')"
          @change="updateData($event.target.value, curData.data, 'y', curData)"
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
          :id="curData.$extra.id"
        ></SwitchColorVue>
      </div>
      <SymbolSelectorVue
        v-model="curData.symbol"
        v-model:symbolSize="curData.symbolSize"
        class="item-con-double"
      ></SymbolSelectorVue>
    </template>
  </SeriesPanelContainerVue>
</template>

<script setup>
import SeriesPanelContainerVue from '@/components/graphs/controlItems/SeriesPanelContainer.vue';
import SwitchColorVue from '@/components/graphs/controlItems/SwitchColor.vue';
import SymbolSelectorVue from '@/components/graphs/controlItems/SymbolSelector.vue';
import LineStyleVue from '@/components/graphs/controlItems/LineStyle.vue';

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

  // BUG 坐标数量检查的显示
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
</script>

<style lang="less" scoped>
.title-con {
  :deep(&:hover .del-button) {
    visibility: visible;
    opacity: 1;
  }
}
</style>
