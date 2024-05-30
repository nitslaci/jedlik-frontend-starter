<script setup lang="ts">
import { useStore } from "../stores/store";
import { Dialog } from "quasar";
import { onMounted } from "vue";
import xEdit from "../components/xEditComponent.vue";
import xNew from "../components/xNewComponent.vue";

const s = useStore();

onMounted(() => {
  s.ManyGetAll();
});

function editDocument(id: number | undefined) {
  s.many.document!.id = id;
  s.app.showEditDialog = true;
}

function newDocument() {
  s.app.showNewDialog = true;
}

function deleteDocument(id: number | undefined) {
  Dialog.create({
    title: "Confirm",
    message: "Would you like to delete?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      s.many.document = { id: id };
      s.ManyDeleteById();
    })
    .onCancel(() => {
      // router.push("/xcard");
    });
}

function filterUpdate() {
  if (s.app.filter!.length > 0) {
    s.ManyFilter();
  } else {
    s.ManyGetAll();
  }
}
</script>

<template>
  <q-page class="q-pa-md">
    <q-input v-model="s.app.filter" dense filled label="Filter" type="text" @update:model-value="filterUpdate()" />
    <div class="row">
      <div v-for="e in s.many.documents" :key="e.id" class="col-sm-12 col-md-6 col-lg-4">
        <q-card class="q-ma-md">
          <q-img :src="e.imgField">
            <div class="text-h7 absolute-top text-right">
              {{ e.category?.categoryNameField }} -
              {{ new Date(e.dateField!).toLocaleDateString() }}
            </div>
            <div class="text-h7 absolute-bottom text-left">{{ e.titleField }} - {{ e.priceField }} Ft</div>
          </q-img>
          <q-card-section>
            <q-badge v-if="e.boolField" color="green" label="yes" outline />
            <q-badge v-else color="red" label="no" outline />
            {{ e.descField }}
          </q-card-section>
          <q-card-actions align="center">
            <q-btn color="green" no-caps @click="newDocument()">New</q-btn>
            <q-btn color="blue" no-caps @click="editDocument(e.id)">Edit</q-btn>
            <q-btn color="red" no-caps @click="deleteDocument(e.id)">Delete</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <xEdit />
    <xNew />
  </q-page>
</template>

<style scoped></style>
