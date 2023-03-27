<template>
  <el-collapse-item>
    <template #title>
      <div class="title-con">
        <section class="title-item">{{ axisTitle }}</section>
      </div>
    </template>
    <div class="item-con">
      <span>名称</span>
      <input type="text" v-model="axis.name" />
    </div>

    <!-- <div class="item-con">
      <span>位置</span>
      <el-select
        class="el-select"
        v-model="axis.nameLocation"
        size="small"
      >
        <el-option
          v-for="item in nameLocations"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div> -->
    <div class="item-con">
      <span>文字颜色</span>
      <section>
        <el-color-picker v-model="axis.nameTextStyle.color" size="default" />
      </section>
    </div>
    <div class="item-con">
      <span>字形</span>
      <el-select
        class="el-select"
        v-model="axis.nameTextStyle.fontStyle"
        size="small"
      >
        <el-option
          v-for="item in fontStyles"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="item-con">
      <span>字号</span>
      <el-input-number size="small" v-model="axis.nameTextStyle.fontSize" />
    </div>
    <div class="item-con">
      <span>字体粗细</span>
      <el-switch
        class="bold-switcher"
        size="small"
        active-text="加粗"
        inactive-text="常规"
        v-model="axis.nameTextStyle.fontWeight"
        active-value="bold"
        inactive-value="normal"
      />
    </div>
    <div class="item-con">
      <span>距坐标轴距离</span>
      <el-input-number size="small" v-model="axis.nameTextStyle.padding" />
    </div>
    <div class="item-con-double">
      <section>
        <span>坐标轴最小值</span>
        <el-input-number
          size="small"
          :model-value="typeof axis.min === 'function' ? NaN : axis.min"
          placeholder="默认值"
          @change="(v) => (axis.min = v)"
        />
      </section>
      <section>
        <el-button
          size="small"
          type="primary"
          @click="axis.min = setDefaultAxisEnd.min"
          >恢复默认</el-button
        >
      </section>
    </div>
    <div class="item-con-double">
      <section>
        <span>坐标轴最大值</span>
        <el-input-number
          size="small"
          :model-value="typeof axis.max === 'function' ? NaN : axis.max"
          placeholder="默认值"
          @change="(v) => (axis.max = v)"
        />
      </section>
      <section>
        <el-button
          size="small"
          type="primary"
          @click="axis.max = setDefaultAxisEnd.max"
          >恢复默认</el-button
        >
      </section>
    </div>
    <div class="item-con">
      <span>轴线颜色</span>
      <el-color-picker v-model="axis.axisLine.lineStyle.color" size="default" />
    </div>
    <div class="item-con">
      <span>轴线宽度</span>
      <el-input-number
        size="small"
        v-model="axis.axisLine.lineStyle.width"
        :min="0"
        :step="0.5"
      />
    </div>
    <div class="item-con-double">
      <section>
        <span>轴线起始</span>
        <el-switch
          size="small"
          v-model="axis.axisLine.symbol[0]"
          active-text="箭头"
          active-value="arrow"
          inactive-text="无"
          inactive-value="none"
        />
      </section>
      <section>
        <span>箭头偏移</span>
        <el-input-number
          size="small"
          v-model="axis.axisLine.symbolOffset[0]"
          :step="0.5"
        ></el-input-number>
      </section>
    </div>
    <div class="item-con-double">
      <section>
        <span>轴线结尾</span>
        <el-switch
          size="small"
          v-model="axis.axisLine.symbol[1]"
          active-text="箭头"
          active-value="arrow"
          inactive-text="无"
          inactive-value="none"
        />
      </section>
      <section>
        <span>箭头偏移</span>
        <el-input-number
          size="small"
          v-model="axis.axisLine.symbolOffset[1]"
          :step="0.5"
        ></el-input-number>
      </section>
    </div>
    <div class="item-con-double">
      <section>
        <span>箭头宽度</span>
        <el-input-number
          size="small"
          v-model="axis.axisLine.symbolSize[0]"
          :min="0"
          :step="0.5"
          :disabled="
            axis.axisLine.symbol[0] === 'none' &&
            axis.axisLine.symbol[1] === 'none'
          "
        ></el-input-number>
      </section>
      <section>
        <span>箭头长度</span>
        <el-input-number
          size="small"
          v-model="axis.axisLine.symbolSize[1]"
          :min="0"
          :step="0.5"
          :disabled="
            axis.axisLine.symbol[0] === 'none' &&
            axis.axisLine.symbol[1] === 'none'
          "
        ></el-input-number>
      </section>
    </div>
    <div class="item-con">
      <span>刻度位置</span>
      <el-switch
        size="small"
        v-model="axis.axisTick.inside"
        active-text="内侧"
        inactive-text="外侧"
      />
    </div>
    <div class="item-con">
      <span>主刻度</span>
      <el-switch
        size="small"
        v-model="axis.axisTick.show"
        active-text="显示"
        inactive-text="隐藏"
      />
    </div>
    <div class="item-con">
      <span>主刻度线长</span>
      <el-input-number
        size="small"
        v-model="axis.axisTick.length"
        :min="0"
        :step="0.5"
        :disabled="!axis.axisTick.show"
      ></el-input-number>
    </div>
    <div class="item-con">
      <span>主刻度线宽</span>
      <el-input-number
        size="small"
        v-model="axis.axisTick.lineStyle.width"
        :min="0"
        :step="0.5"
        :disabled="!axis.axisTick.show"
      ></el-input-number>
    </div>
    <div class="item-con">
      <span>主刻度密度</span>
      <el-slider
        v-model="axis.splitNumber"
        :show-tooltip="false"
        :min="0"
        :max="20"
        :step="0.1"
      />
    </div>
    <div class="item-con">
      <span>主刻度颜色</span>
      <el-color-picker
        v-model="axis.axisTick.lineStyle.color"
        size="default"
        :disabled="!axis.axisTick.show"
      />
    </div>
    <div class="item-con">
      <span>副刻度</span>
      <el-switch
        size="small"
        v-model="axis.minorTick.show"
        active-text="显示"
        inactive-text="隐藏"
      />
    </div>
    <div class="item-con">
      <span>副刻度密度</span>
      <el-input-number
        size="small"
        :min="2"
        :step="1"
        v-model="axis.minorTick.splitNumber"
        :disabled="!axis.minorTick.show"
      ></el-input-number>
    </div>
    <div class="item-con">
      <span>副刻度颜色</span>
      <el-color-picker
        v-model="axis.minorTick.lineStyle.color"
        size="default"
        :disabled="!axis.minorTick.show"
      />
    </div>
    <div class="item-con">
      <span>副刻度线长</span>
      <el-input-number
        size="small"
        v-model="axis.minorTick.length"
        :min="0"
        :step="0.5"
        :disabled="!axis.minorTick.show"
      ></el-input-number>
    </div>
    <div class="item-con">
      <span>副刻度线宽</span>
      <el-input-number
        size="small"
        v-model="axis.minorTick.lineStyle.width"
        :min="0"
        :step="0.5"
        :disabled="!axis.minorTick.show"
      ></el-input-number>
    </div>
  </el-collapse-item>
</template>

<script setup>
import { toRefs } from 'vue';
const props = defineProps(['axisTitle', 'axis']);
const { axis } = toRefs(props);

const nameLocations = [
  { label: '首端', value: 'start' },
  { label: '中部', value: 'middle' },
  { label: '尾端', value: 'end' },
];
const fontStyles = [
  { label: '普通', value: 'normal' },
  { label: '斜体', value: 'italic' },
  { label: 'Oblique', value: 'oblique' },
];

const setDefaultAxisEnd = {
  max: (val) => {
    return Math.ceil(val.max);
  },
  min: (val) => {
    return Math.floor(val.min);
  },
};
</script>

<style lang="less" scoped></style>
