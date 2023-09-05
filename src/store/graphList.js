import { defineStore } from 'pinia';

export const useGraphListStore = defineStore('graphListStore', {
  state: () => {
    return {
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
  },
  getters: {
    activeGraphIdGetter: (state) => state.activeGraphId,
  },
});
