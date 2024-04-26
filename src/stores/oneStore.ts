import { defineStore } from "pinia";
import { Notify, Loading } from "quasar";
import { api } from "../boot/axios";


// import { useAppStore } from "./appStore";
// import { useManyStore } from "./manyStore";
// import { useOtherStore } from "./otherStore";

// const appStore = useAppStore();
// const manyStore = useManyStore();
// const otherStore = useOtherStore();

// === INTERFACES ===
// Convert JSON document to TS Interface quickly: https://transform.tools/json-to-typescript

// Don't forget the question marks (?) after field names!
export interface IOne {
  id?: number;
  categoryNameField?: string;
}

interface IState {
  // For handle CRUD operations:
  document: IOne; // use for create, update, delete and store one document
  documentOld: IOne; // use for only edit (diff and restore)
  documents: IOne[]; // use for store API responses
}

export const useOneStore = defineStore({
  id: "oneStore",
  state: (): IState => ({
    document: {},
    documentOld: {},
    documents: [],
  }),
  getters: {},
  actions: {
    async GetAll(): Promise<void> {
      Loading.show();
      this.documents = [];
      api
        .get("/categories")
        .then((res) => {
          Loading.hide();
          if (res?.data) {
            this.documents = res.data;
          }
        })
        .catch((error) => {
          ShowErrorWithNotify(error);
        });
    },
  },
  persist: {
    enabled: true,
  },
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
