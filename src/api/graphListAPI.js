import api from '@/config/createRequest.js';

export async function getGraphListAPI(graphListStore) {
  const { resData } = await api.get('/userGraphList');
  graphListStore.setGraphList(resData);
  graphListStore.resetActiveGraphId();
}
