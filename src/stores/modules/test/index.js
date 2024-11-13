import { defineStore } from "pinia";
const useTestStore = defineStore("test", {
  state() {
    return {
      test: "Hello NM",
    };
  },
  actions() {},
  getters() {},
});

export { useTestStore };
