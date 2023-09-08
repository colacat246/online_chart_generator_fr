import { defineStore } from 'pinia';

export const useGraphListStore = defineStore('graphListStore', {
  state: () => {
    return {
      /**
       * [{
       *    createdGraphId: 1,
       *    createdTime: "2023-09-07 01:18:35.757091",
       *    graphName: "柱状图1",
       *    graphTypeId: 2
       * }]
       */
      graphList: [],
      activeGraphId: '',
    };
  },
  actions: {
    setGraphList(newList) {
      this.graphList = newList;
    },

    resetActiveGraphId() {
      if (this.graphList.length === 0) {
        this.setActiveGraphId('');
      } else {
        this.setActiveGraphId(this.graphList[0].createdGraphId);
      }
    },

    setActiveGraphId(id) {
      if (id) {
        this.activeGraphId = id.toString();
      } else {
        this.activeGraphId = '';
      }
    },
    setGraphName(id, newName) {
      const graph = this.graphList.find((i) => i.createdGraphId === id);
      graph.graphName = newName;
    },
  },
  getters: {
    activeGraphIdGetter: (state) => state.activeGraphId,
  },
});
