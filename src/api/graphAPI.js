import api from '@/config/createRequest.js';
import useInfoAlert from '@/composables/infoAlert.js';
const { setInfo } = useInfoAlert();

export async function selectGraphAPI(createdGraphId, graphStore) {
  if (!createdGraphId) {
    graphStore.$reset();
    return;
  }
  const { resData } = await api.get(`/userGraph/${createdGraphId}`);
  graphStore.changeGraph(createdGraphId, resData);
}

export async function addNewGraphAPI(data, graphListStore) {
  const { resData } = await api.post('/userGraph', data);
  graphListStore.setGraphList(resData.graphList);
  graphListStore.setActiveGraphId(resData.newGraphId);
}

export async function saveChangeAPI(graphStore) {
  await api.put('/userGraph', {
    createdGraphId: graphStore.graphIdIntGetter,
    data: graphStore.graphGetter,
  });

  setInfo({ content: '数据已保存' });
  graphStore.resetChange();
}

// 删除图形
export async function deleteGraphAPI(createdGraphId, graphListStore) {
  const { resData } = await api.delete('/userGraph', {
    data: { createdGraphId },
  });
  graphListStore.setGraphList(resData.graphList);
  // 删除的是当前图形，进行跳转
  if (createdGraphId.toString() === graphListStore.activeGraphIdGetter) {
    graphListStore.setActiveGraphId(resData.curGraphId);
  }
}
