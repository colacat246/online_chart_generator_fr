import { defineStore } from 'pinia';

export const useGraphStore = defineStore('graphStore', {
  state: () => {
    return {
      graph: null,
      graphId: null, // 是string
      activeSeriesData: '',
    };
  },
  actions: {
    setGraph(argObj) {
      const { graphId, newGraph, activeSeries } = argObj;
      if (graphId) this.graphId = graphId.toString();
      this.graph = newGraph;
      if (activeSeries) {
        this.activeSeriesData = activeSeries;
      } else {
        this.activeSeriesData =
          this.graph.series.length !== 0 ? this.graph.series[0].$extra.id : '';
      }
    },
  },
  getters: {
    graphIdIntGetter: (state) => {
      return parseInt(state.graphId);
    },
  },
});
