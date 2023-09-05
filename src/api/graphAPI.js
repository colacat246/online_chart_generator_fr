import api from '@/config/createRequest.js';
import useInfoAlert from '@/composables/infoAlert.js';
const { setInfo } = useInfoAlert();

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

  if (res.data.data.isUpdated) {
    setInfo({ content: '数据已保存' });
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
