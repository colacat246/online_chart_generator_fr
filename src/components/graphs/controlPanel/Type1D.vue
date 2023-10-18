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
        v-if="isAlert"
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
import { ref } from 'vue';

const isAlert = ref(false);

// 转换input的输出、输入
const unzipData = (val, axis) => {
  axis = axis === 'x' ? 0 : 1;
  return val.map((i) => i[axis]).filter((i) => !isNaN(i));
};
const updateData = (val, data, axis, placeToReplace) => {
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
      isAlert.value = true;
    }
    if (!otherData[i] && otherData[i] !== 0) {
      otherData.push(NaN);
    }
    const arr = Array(2);
    arr[axis] = val[i];
    arr[otherAxis] = otherData[i];
    res.push(arr);
  }
  placeToReplace.data = res;
  // 坐标数量检查，放到宏任务队列里才能被反复触发
  Promise.resolve()
    .then(() => {
      isAlert.value = false;
    })
    .then(() => {
      isAlert.value = placeToReplace.data.flat().includes(NaN);
    });
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
