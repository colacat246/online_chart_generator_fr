import api from '@/config/createRequest.js';

export async function getGraphListAPI(graphListStore) {
  try {
    const res = await api.get('/userGraphList');
    graphListStore.setGraphList(res.data.data);
    graphListStore.resetActiveGraphId();
  } catch (err) {
    // TODO 处理错误记录
    console.log(err);
  }
}
