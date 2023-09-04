import { defineStore } from 'pinia';
// import api from '@/config/createRequest.js';
// import _ from 'lodash';

export const useGraphStore = defineStore('graphStore', {
  state: () => {
    return {
      graph: null,
      graphId: null, // 是string
      activeSeriesData: '',
      changeCount: 2,
    };
  },
  actions: {
    changeGraph(graphId, newGraph) {
      this.graphId = graphId.toString();
      this.setGraph(newGraph);
      this.resetActiveSeriesId();
      this.resetChange();
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

    // 基础功能，注意全部使用patch方法，避免被changeCount监听器监听到
    setGraph(newGraph) {
      this.$patch((state) => {
        state.graph = newGraph;
      });
    },

    setActiveSeriesId(id) {
      this.$patch((state) => {
        state.activeSeriesData = id;
      });
    },

    change() {
      this.$patch((state) => {
        state.changeCount++;
      });
    },

    resetChange() {
      this.$patch((state) => {
        state.changeCount = 0;
      });
    },
  },
  getters: {
    graphIdIntGetter: (state) => {
      return parseInt(state.graphId);
    },
    activeSeriesIdGetter: (state) => {
      return state.activeSeriesData;
    },
    changeCountGetter: (state) => {
      return state.changeCount;
    },
    graphGetter: (state) => {
      return state.graph;
    },
  },
});
