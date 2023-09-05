import api from '@/config/createRequest.js';
import { ElMessage } from 'element-plus';

export async function selectGraphAPI(createdGraphId, graphStore) {
  if (!createdGraphId) {
    graphStore.$reset();
    return;
  }
  const res = await api.get(`/userGraph/${createdGraphId}`);
  graphStore.changeGraph(createdGraphId, res.data.data);
}

export async function addNewGraphAPI(data, graphListStore) {
  // TODO 做一个全局提示逻辑，处理异常
  try {
    const res = await api.post('/userGraph', data);

    if (res.data.statusCodeValue !== 999) return null;

    graphListStore.setGraphList(res.data.data.graphList);
    graphListStore.setActiveGraphId(res.data.data.newGraphId);
  } catch (err) {
    console.log(err);
  }
}

export async function saveChangeAPI(graphStore) {
  const res = await api.put('/userGraph', {
    createdGraphId: graphStore.graphIdIntGetter,
    data: graphStore.graphGetter,
  });
  ElMessage({
    message: 'ok',
    type: 'success',
  });

  // TODO 提示自动保存
  if (res.data.data.isUpdated) {
    graphStore.resetChange();
  }
}

// 删除图形
export async function deleteGraphAPI(createdGraphId, graphListStore) {
  try {
    const res = await api.delete('/userGraph', { data: { createdGraphId } });
    graphListStore.setGraphList(res.data.data.graphList);
    // 删除的是当前图形，进行跳转
    if (createdGraphId.toString() === graphListStore.activeGraphIdGetter) {
      graphListStore.setActiveGraphId(res.data.data.curGraphId);
    }
  } catch (err) {
    console.log(err);
  }
}