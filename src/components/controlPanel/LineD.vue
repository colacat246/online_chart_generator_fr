<template>
  <el-scrollbar>
    <div v-if="graphs[curGraphIdx].series">
      <div v-for="curData in graphs[curGraphIdx].series" :key="curData.id">
        <div class="border-bottom">
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
        </div>
      </div>
    </div>
    <el-button type="primary" @click="addNewLine($event)">添加新曲线</el-button>
  </el-scrollbar>
</template>

<script setup>
import { inject, computed, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { storeData } from '../../store/data.js';

const blurBtn = inject('blurBtn');
const genId = inject('genId');
const genNewName = inject('genNewName');
const storeD = storeData();
const { graphs } = storeToRefs(storeD);
// 拿到图形Id
const { currentRoute } = useRouter();
const curGraphId = computed(() => {
  return currentRoute.value.params.id;
});

// 拿到图形对象并确保当前图形对象在store数组中序号正确
let curGraphIdx = ref('');
watch(
  [curGraphId, storeD], // 发生增加或删除时同步更新数组位置
  () => {
    curGraphIdx.value = graphs.value.findIndex(
      (i) => i.id === curGraphId.value
    );
  },
  {
    immediate: true,
  }
);

// 转换用户输入
const unzipData = (val, axis) => {
  axis = axis === 'x' ? 0 : 1;
  return val.map((i) => i[axis]).filter((i) => !isNaN(i));
};

const updateData = (val, data, axis, placeToReplace) => {
  val = val
    .trim()
    .replace(/^,/, '')
    .replace(/,$/, '')
    .split(/\D+/)
    .map((i) => parseFloat(i));

  let otherAxis = axis === 'x' ? 'y' : 'x';
  const otherData = unzipData(data, otherAxis);

  axis = axis === 'x' ? 0 : 1;
  otherAxis = otherAxis === 'x' ? 0 : 1;
  const maxLengh =
    val.length > otherData.length ? val.length : otherData.length;
  const res = [];
  for (let i = 0; i < maxLengh; i++) {
    if (!val[i]) {
      val.push(NaN);
    }
    if (!otherData[i]) {
      otherData.push(NaN);
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
  const defaultLineTemplate = {
    name: genNewName('新曲线', graphs.value[curGraphIdx.value].series),
    data: [[], []],
    type: 'line',
    lineStyle: {},
    symbol: undefined,
    symbolSize: undefined,
  };
  graphs.value[curGraphIdx.value].series.push(defaultLineTemplate);
};
</script>

<style lang="less" scoped>
.item-con {
  padding: 5px;
  display: flex;
  align-items: center;
  input {
    flex: 1;
  }
  span {
    color: #303133;
    padding-right: 10px;
    text-align: right;
    font-size: 14px;
    width: 35px;
  }
}
</style>
