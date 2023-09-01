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
    changeGraph(graphId, newGraph) {
      this.graphId = graphId.toString();
      this.setGraph(newGraph);
      this.resetActiveSeriesId();
    },

    addSeries(newGraph, newSeriesId) {
      this.setGraph(newGraph);
      this.setActiveSeriesId(newSeriesId);
    },

    deleteSeries(newGraph, deletedSeriesId, previousId) {
      this.setGraph(newGraph);
      // 删除的是不是当前series
      if (deletedSeriesId !== this.activeSeriesData) {
        return;
      }
      // 删除的是当前series，但剩余series为空
      if (!previousId) {
        this.resetActiveSeriesId();
        return;
      }
      // 删除的是当前series，剩余series不为空
      this.setActiveSeriesId(previousId);
    },

    resetActiveSeriesId() {
      if (this.graph.series.length === 0) {
        this.setActiveSeriesId('');
      } else {
        this.setActiveSeriesId(this.graph.series[0].$extra.id);
      }
    },

    // 基础功能
    setGraph(newGraph) {
      this.graph = newGraph;
    },

    setActiveSeriesId(id) {
      this.activeSeriesData = id;
    },
  },
  getters: {
    graphIdIntGetter: (state) => {
      return parseInt(state.graphId);
    },
    activeSeriesIdGetter: (state) => {
      return state.activeSeriesData;
    },
  },
});