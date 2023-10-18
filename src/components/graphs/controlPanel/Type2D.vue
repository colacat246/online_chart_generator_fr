<template>
  <SeriesPanelContainerVue>
    <template v-slot="{ series, graph }">
      <div class="item-con">
        <span>横轴图例</span>
        <input
          type="text"
          :value="unzipDataX(graph.xAxis.data)"
          @change="updateDataX($event.target.value, graph.xAxis)"
        />
      </div>
      <div class="item-con">
        <span>数据</span>
        <input
          type="text"
          :value="unzipData(series.data)"
          @change="updateData($event.target.value, series)"
        />
      </div>
      <el-alert
        v-if="isAlert"
        class="axis-warning"
        :title="alertText"
        type="warning"
      />
      <div class="item-con-double">
        <section>
          <span>柱宽度</span>
          <el-slider
            v-model="series.barWidth"
            :show-tooltip="false"
            :min="20"
            :max="200"
            :step="1"
          />
        </section>
        <SwitchColorVue
          v-model="series.color"
          :series="graph.series"
          :id="series.$extra.id"
        ></SwitchColorVue>
      </div>
      <div class="item-con-double">
        <section>
          <span>图例</span>
          <el-switch
            class="bold-switcher"
            size="small"
            active-text="显示"
            inactive-text="隐藏"
            v-model="series.label.show"
          />
        </section>
        <section>
          <span>位置</span>
          <el-select
            class="el-select"
            v-model="series.label.position"
            size="small"
            :disabled="!series.label.show"
          >
            <el-option
              v-for="item in legendPlaceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </section>
      </div>
    </template>
  </SeriesPanelContainerVue>
</template>

<script setup>
import SeriesPanelContainerVue from '@/components/graphs/controlItems/SeriesPanelContainer.vue';
import SwitchColorVue from '@/components/graphs/controlItems/SwitchColor.vue';
import { ref } from 'vue';

const isAlert = ref(false);
const alertTexts = ['数据个数与横轴不一致', '数据不合规范'];
const alertText = ref('');

const legendPlaceOptions = [
  { label: '内部', value: 'inside' },
  { label: '外部', value: 'outside' },
];

const unzipData = (data) => {
  return data.join(', ');
};

const updateData = (newVal, series) => {
  isAlert.value = false;
  const val = newVal
    .trim()
    .replace(/^,/, '')
    .replace(/,$/, '')
    .split(/, *,?/)
    .map((i) => parseFloat(i));
  // 检查
  if (val.includes(NaN)) {
    alertText.value = alertTexts[1];
    Promise.resolve().then(() => {
      isAlert.value = true;
    });
    return;
  }
  series.data = val;
};

const unzipDataX = (data) => {
  return data.join(', ');
};
const updateDataX = (newVal, xAsix) => {
  const val = newVal.split(/, *,?/).map((i) => {
    return i.trim();
  });
  xAsix.data = val;
};
</script>

<style lang="less" scoped></style>
