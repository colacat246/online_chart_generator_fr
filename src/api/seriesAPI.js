import api from '@/config/createRequest.js';
import { saveChangeAPI } from '@/api/graphAPI.js';

export async function addNewSeriesAPI(data, graphStore) {
  try {
    if (graphStore.changeCountGetter !== 0) await saveChangeAPI(graphStore);
    const res = await api.post('/userGraphSeries', data);
    if (res.data.statusCodeValue !== 999) {
      throw res.data.message;
    }
    graphStore.addSeries(res.data.data.graph, res.data.data.newSeriesId);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteSeriesAPI(id, graphStore) {
  // TODO 异常处理
  if (graphStore.changeCountGetter !== 0) await saveChangeAPI(graphStore);
  const res = await api.delete('/userGraphSeries', {
    data: { createdGraphId: graphStore.graphIdIntGetter, seriesId: id },
  });
  graphStore.deleteSeries(res.data.data.graph, id, res.data.data.seriesId);
}
