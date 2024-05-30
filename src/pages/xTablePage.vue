<script setup lang="ts">
import { IMany, useStore } from "../stores/store";
import { onMounted } from "vue";
import { QTableColumn } from "quasar";

const s = useStore();

onMounted(() => {
  s.ManyGetAll();
});

// Selected row(s) -> selection="single" or selection="multiple"
// const selected = ref<any>([]);

function deleteRecord(): void {
  // store.many.document = { id: selected.value[0].id };
  s.many.document = { id: s.app.selected![0].id };
  s.ManyDeleteById();
  // selected.value = [];
  s.app.selected = [];
}

function filterUpdate() {
  // Clear button (x) set filter to null
  if (s.app.filter) {
    s.app.filter = "";
  }
  if (s.app.filter!.length > 0) {
    s.ManyFilter()
  } else {
    s.ManyGetAll();
  }
}

// Columns def template:
// const cols: QTableColumn[] = [
//   { name: "", label: "", field: "", align:"center" },
// ];

/*  Slot for table column
    <template #body-cell-fieldName="props">
      <q-td :props="props">
      </q-td>
    </template>
  */

// JSON-server and MongoDb-populate() return field(s) with object type from the "1"-side:
// field: (row: any) => row.category.categoryNameField,

// sort with: sortable: true
// align with (default right): align: "center"
const columns: QTableColumn[] = [
  { name: "id", label: "id", field: "id", align: "left" },
  { name: "categoryId", label: "categoryId", field: (row: IMany) => row.categoryId, align: "left" },
  { name: "titleField", label: "titleField", field: (row: IMany) => row.titleField, align: "left" },
  { name: "descField", label: "descField", field: (row: IMany) => row.descField, align: "left" },
  { name: "dateField", label: "dateField", field: (row: IMany) => row.dateField, align: "left" },
  { name: "boolField", label: "boolField", field: (row: IMany) => row.boolField, align: "center" },
  { name: "priceField", label: "priceField", field: (row: IMany) => row.priceField, align: "center" },
  {
    name: "category",
    label: "category",
    field: (row: IMany) => row.category?.categoryNameField,
    align: "center",
  },
  { name: "imgField", label: "imgField", field: (row: IMany) => row.imgField, align: "center" },
];
</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <q-input
        v-model="s.app.filter"
        clearable
        dense
        filled
        label="Filter"
        type="text"
        @update:model-value="filterUpdate()"
      />
      <q-table
        v-model:selected="s.app.selected"
        :columns="columns"
        dense
        :rows="s.many.documents!"
        selection="multiple"
        title="Advertisements"
        wrap-cells
      >
        <!-- slot1: -->
        <template #body-cell-boolField="props">
          <q-td :props="props">
            <q-badge v-if="props.value" color="green" label="Yes" outline />
            <q-badge v-else color="red" label="No" outline />
          </q-td>
        </template>
        <!-- slot2: -->
        <template #body-cell-imgField="props">
          <q-td :props="props">
            <q-img class="myImg" :src="props.value" width="300px" />
          </q-td>
        </template>
      </q-table>
      <!-- Button for delete selected record: -->
      <div class="row justify-center q-ma-md">
        <q-btn
          v-show="s.app.selected!.length == 1"
          color="red"
          label="Delete selected record"
          no-caps
          @click="deleteRecord()"
        />
        <q-btn
          v-show="s.app.selected!.length != 0"
          class="q-ml-md"
          color="green"
          :label="s.app.selected!.length == 1 ? 'Clear selection' : 'Clear selections'"
          no-caps
          @click="s.app.selected = []"
        />
      </div>
    </div>
    {{ s.app.selected }}
  </q-page>
</template>

<style lang="scss" scoped>
.myImg {
  border-radius: 10%;
}
</style>
