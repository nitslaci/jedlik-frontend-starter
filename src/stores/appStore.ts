import { defineStore } from "pinia";

export interface IApp {
  showEditDialog: boolean;
  showNewDialog: boolean;
  filter: string;
  selected: Array<any>;
}

export const useAppStore = defineStore({
  id: "appStore",
  state: (): IApp => ({
    showEditDialog: false,
    showNewDialog: false,
    filter: "",
    selected: [],
  }),
  getters: {},
  actions: {},
  // all "state" data is stored in browser session store:
  persist: {
    enabled: true,
  },
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     { storage: sessionStorage, paths: ["showEditDialog", "showNewDialog"] },
  //     { storage: localStorage, paths: ["selected"] },
  //   ],
  // },
});
