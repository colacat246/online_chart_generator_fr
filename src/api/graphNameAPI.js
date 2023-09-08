import api from '@/config/createRequest.js';
import useInfoAlert from '@/composables/infoAlert.js';
const { setInfo } = useInfoAlert();

// 更新graphList中的图形名称
export async function updateGraphNameAPI(
  data,
  graphListStore
) {
  const { resData } = await api.put(`/userGraphName`, data);
  graphListStore.setGraphName(data.createdGraphId, data.graphName);
  setInfo({ content: '数据已保存' });
}
