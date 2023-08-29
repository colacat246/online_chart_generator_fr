import { defineStore } from 'pinia';

export const useGraphListStore = defineStore('graphListStore', {
  state: () => {
    return {
      graphList: [],
    };
  },
});
