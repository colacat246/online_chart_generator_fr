import api from '@/config/createRequest.js';

export async function addNewSeriesAPI(data, graphStore) {
  try {
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
  const res = await api.delete('/userGraphSeries', {
    data: { createdGraphId: graphStore.graphIdIntGetter, seriesId: id },
  });
  graphStore.deleteSeries(res.data.data.graph, id, res.data.data.seriesId);
}
