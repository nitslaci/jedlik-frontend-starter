import { api } from "../boot/axios";
import { defineStore } from "pinia";
import { Notify, Loading } from "quasar";

// Convert JSON document to TS Interface quickly: https://transform.tools/json-to-typescript

// Interface for Application
export interface IApp {
  showEditDialog: boolean;
  showNewDialog: boolean;
  filter: string;
  selected: Array<any>;
}

// Interfaces for OneSide
export interface IOne {
  id?: number;
  categoryNameField?: string;
}
interface IOneDoc {
  // For handle CRUD operations:
  document?: IOne; // use for create, update, delete and store one document
  documentOld?: IOne; // use for only edit (diff and restore)
  documents?: IOne[]; // use for store API responses
}

// Interfaces for ManySide
export interface IMany {
  id?: number; // PK
  categoryId?: number; // FK
  titleField?: string;
  descField?: string;
  dateField?: string;
  boolField?: boolean;
  priceField?: number;
  imgField?: string;
  category?: {
    id?: number;
    categoryNameField?: string;
  };
}
interface IManyDoc {
  document?: IMany; // use for create, update, delete and store one document
  documentOld?: IMany; // use for only edit (diff and restore)
  documents?: IMany[]; // use for store API responses
}

// Interfaces for OtherSide
export interface IOther {
  id?: number; // PK
}
interface IOtherDoc {
  document?: IOther; // use for create, update, delete and store one document
  documentOld?: IOther; // use for only edit (diff and restore)
  documents?: IOther[]; // use for store API responses
}

export interface IStore {
  app: IApp;
  one: IOneDoc;
  many: IManyDoc;
  other: IOtherDoc;
}

export const useStore = defineStore({
  id: "Store",
  state: (): IStore => ({
    app: {
        selected: [],
        filter: "",
        showEditDialog: false,
        showNewDialog: false
    },
    one: {
        document: {},
        documentOld: {},
        documents: []
    },
    many: {
        document: {},
        documentOld: {},
        documents: []
    },
    other: {
        document: {},
        documentOld: {},
        documents: []
    },
  }),
  getters: {},
  actions: {
    async OneGetAll(): Promise<void> {
      Loading.show();
      this.one.documents = [];
      api
        .get("/categories")
        .then((res) => {
          Loading.hide();
          if (res?.data) {
            this.one.documents = res.data;
          }
        })
        .catch((error) => {
          ShowErrorWithNotify(error);
        });
    },

    async ManyGetAll(): Promise<void> {
        Loading.show();
        this.many.documents = [];
        api
          .get("/advertisements")
          .then((res) => {
            Loading.hide();
            if (res?.data) {
              this.many.documents = res.data;
            }
          })
          .catch((error) => {
            ShowErrorWithNotify(error);
          });
      },
  
      async ManyGetById(): Promise<void> {
        if (this.many.document?.id) {
          Loading.show();
          api
            .get(`/advertisements/${this.many.document.id}`)
            .then((res) => {
              Loading.hide();
              if (res?.data) {
                this.many.document = res.data;
                // store startig data to PATCH method:
                Object.assign(this.many.documentOld!, this.many.document);
              }
            })
            .catch((error) => {
              ShowErrorWithNotify(error);
            });
        }
      },
  
      async ManyFilter(): Promise<void> {
        if (this.app.filter) {
          this.many.documents = [];
          // Loading.show();
          api
            .get(`/advertisements?_expand=category&q=${this.app.filter}`)
            .then((res) => {
              // Loading.hide();
              if (res?.data) {
                this.many.documents = res.data;
              }
            })
            .catch((error) => {
              ShowErrorWithNotify(error);
            });
        }
      },
  
      async ManyEditById(): Promise<void> {
        if (this.many.document?.id) {
          const diff: any = {};
          // the diff object only stores changed fields:
          Object.keys(this.many.document).forEach((k, i) => {
            const newValue = Object.values(this.many.document!)[i];
            const oldValue = Object.values(this.many.documentOld!)[i];
            if (newValue != oldValue) diff[k] = newValue;
          });
          if (Object.keys(diff).length == 0) {
            Notify.create({
              message: "Nothing changed!",
              color: "negative",
            });
          } else {
            Loading.show();
            api
              .patch(`/advertisements/${this.many.document.id}`, diff)
              .then((res) => {
                Loading.hide();
                const data: IMany = res?.data;
                if (data.id) {
                  this.ManyGetAll(); // refresh dataN with read all data again from backend
                  Notify.create({
                    message: `Document with id=${data.id} has been edited successfully!`,
                    color: "positive",
                  });
                }
              })
              .catch((error) => {
                ShowErrorWithNotify(error);
              });
          }
        }
      },
  
      async ManyDeleteById(): Promise<void> {
        if (this.many.document?.id) {
          Loading.show();
          api
            .delete(`/advertisements/${this.many.document.id}`)
            .then(() => {
              Loading.hide();
              this.ManyGetAll(); // refresh dataN with read all data again from backend
              Notify.create({
                message: `Document with id=${this.many.document!.id} has been deleted successfully!`,
                color: "positive",
              });
            })
            .catch((error) => {
              ShowErrorWithNotify(error);
            });
        }
      },
  
      async ManyCreate(): Promise<void> {
        if (this.many.document) {
          Loading.show();
          api
            .post("/advertisements", this.many.document)
            .then((res) => {
              Loading.hide();
              const data: IMany = res?.data;
              if (data) {
                this.ManyGetAll(); // refresh dataN with read all data again from backend
                Notify.create({
                  message: `New document with id=${data.id} has been saved successfully!`,
                  color: "positive",
                });
                // Example page routing from store (no import required)
                // this.router.push("/page_path");
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
