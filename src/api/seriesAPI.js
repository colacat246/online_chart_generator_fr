import api from '@/config/createRequest.js';
import { saveChangeAPI } from '@/api/graphAPI.js';

export async function addNewSeriesAPI(data, graphStore) {
  if (graphStore.changeCountGetter !== 0) await saveChangeAPI(graphStore);
  const { resData } = await api.post('/userGraphSeries', data);
  graphStore.addSeries(resData.graph, resData.newSeriesId);
}

export async function deleteSeriesAPI(id, graphStore) {
  if (graphStore.changeCountGetter !== 0) await saveChangeAPI(graphStore);
  const { resData } = await api.delete('/userGraphSeries', {
    data: { createdGraphId: graphStore.graphIdIntGetter, seriesId: id },
  });
  graphStore.deleteSeries(resData.graph, id, resData.seriesId);
}
