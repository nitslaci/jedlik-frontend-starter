import { defineStore } from "pinia";
import { Notify, Loading } from "quasar";
import { api } from "src/boot/axios";
// import { useAppStore } from "./appStore";
// import { useOneStore } from "./oneStore";
// import { useManyStore } from "./manyStore";

// const appStore = useAppStore();
// const oneStore = useOneStore();
// const manyStore = useManyStore()

// === INTERFACES ===
// Convert JSON document to TS Interface quickly: https://transform.tools/json-to-typescript

// Don't forget the question marks after field names!
export interface IOther {
  id?: number; // PK
}

interface IState {
  document: IOther; // use for create, update, delete and store one document
  documentOld: IOther; // use for only edit (diff and restore)
  documents: IOther[]; // use for store API responses
}

export const useOtherStore = defineStore({
  id: "otherStore",
  state: (): IState => ({
    document: {},
    documentOld: {},
    documents: [],
  }),
  getters: {},
  actions: {
    async Create(): Promise<void> {
      if (this.document) {
        Loading.show();
        api
          .post("/xyz", this.document)
          .then((res) => {
            Loading.hide();
            if (res?.data) {
              Loading.hide();
              Notify.create({
                message: `New document with id=${res.data.id} has been saved successfully!`,
                color: "positive",
              });
              // router.push("/page_path");
            }
          })
          .catch((error) => {
            ShowErrorWithNotify(error);
          });
      }
    },
  },
  // all "state" data is stored in browser session store:
  persist: {
    enabled: true,
  },
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     { storage: sessionStorage, paths: ["document", "documentOld"] },
  //     { storage: localStorage, paths: ["documents"] },
  //   ],
  // },
});

Notify.setDefaults({
  position: "top",
  textColor: "yellow",
  timeout: 3000,
  actions: [{ icon: "close", color: "white" }],
});

function ShowErrorWithNotify(error: any): void {
  Loading.hide();
  let msg = "Hiba!";

  // The optional chaining (?.) operator accesses an object's property or calls a function.
  // If the object accessed or function called is undefined or null,
  // it returns undefined instead of throwing an error.
  if (error?.response?.data?.status) {
    msg += ` (${error.response.data.status}):`;
  } else if (error?.response?.status) {
    msg += ` (${error.response.status}):`;
  } else {
    msg += ":";
  }

  if (error?.response?.data?.message) {
    msg += ` ${error.response.data.message}`;
  } else if (error?.response?.message) {
    msg += ` ${error.response.message}`;
  } else if (error?.request && error?.message) {
    msg += ` No response(${error.message})`; // if no response
  } else if (error?.message) {
    msg += ` Message(${error.message})`;
  } else {
    msg += " Unknow error message";
  }
  Notify.create({ message: msg, color: "negative" });
}
