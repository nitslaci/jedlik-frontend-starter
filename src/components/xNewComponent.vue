<script setup lang="ts">
import { useStore } from "../stores/store";
import { date, Dialog } from "quasar";
// import router from "../router";

const s = useStore();

function ShowDialog() {
  s.OneGetAll();
  Reset(); // set default settings
}

function HideDialog() {
  s.many.document = {};
}

function Submit() {
  Dialog.create({
    title: "Confirm",
    message: "Would you like to save new document?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      s.ManyCreate();
      s.app.showNewDialog = false;
      // router.push("/xcard");
    })
    .onCancel(() => {
      // router.push("/xcard");
    });
}

function Reset() {
  s.many.document = {
    dateField: date.formatDate(new Date(), "YYYY-MM-DD"),
    imgField: "https://nitslaszlo.github.io/static/hahu_old/01.jpg",
    boolField: false,
  };
}

function Close() {
  s.app.showNewDialog = false;
}
</script>

<template>
  <q-dialog v-model="s.app.showNewDialog" persistent @hide="HideDialog()" @show="ShowDialog()">
    <q-card class="q-pa-md" style="width: 60vw; min-width: 300px">
      <q-form @reset="Reset()" @submit="Submit()">
        <h5 class="text-center q-mt-sm q-mb-none">Add new advertisement</h5>
        <q-select
          v-model="s.many.document!.categoryId"
          clearable
          emit-value
          filled
          label="categoryNameField"
          map-options
          option-label="categoryNameField"
          option-value="id"
          :options="s.one.documents"
          :rules="[(v) => v != null || 'Please choose one!']"
        />
        <q-input
          v-model="s.many.document!.titleField"
          filled
          label="titleField"
          :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
          type="text"
        />
        <q-input
          v-model="s.many.document!.descField"
          filled
          label="descField"
          :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
          type="textarea"
        />
        <q-input
          v-model="s.many.document!.dateField"
          clearable
          filled
          label="dateField"
          :rules="[(v) => (v != null && v != '') || 'dateField - Choose!']"
          type="date"
        />
        <div class="row justify-end q-mb-md">
          <q-checkbox v-model="s.many.document!.boolField" filled label="boolField" />
        </div>
        <q-input
          v-model="s.many.document!.priceField"
          filled
          label="priceField"
          mask="currency"
          :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
          thousands-separator=" "
          type="number"
        />
        <q-input
          v-model="s.many.document!.imgField"
          clearable
          filled
          label="imgField"
          :rules="[(v) => (v != null && v != '') || 'Please fill in!']"
          type="url"
        />
        <div class="row justify-center">
          <q-btn class="q-mr-md" color="green" label="Save" no-caps type="submit" />
          <q-btn class="q-mr-md" color="red" label="Reset" no-caps type="reset" />
          <q-btn class="q-mr-md" color="blue" label="Close" no-caps @click="Close()" />
        </div>
        <!-- for testing: -->
        {{ s.many.document }}
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
