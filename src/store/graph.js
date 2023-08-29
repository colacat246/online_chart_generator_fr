import { defineStore } from 'pinia';

export const useGraphStore = defineStore('graphStore', {
  state: () => {
    return {
      graph: null,
    };
  },
});
