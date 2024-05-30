<script setup lang="ts">
import { useStore } from "../stores/store";
import { onMounted, ref } from "vue";

const s = useStore();

const currentSlide = ref(1);
const autoplay = ref(2000);

onMounted(() => {
  s.ManyGetAll();
});
</script>

<template>
  <q-page class="q-pa-xl">
    <q-carousel
      v-model="currentSlide"
      animated
      arrows
      :autoplay="autoplay"
      class="bg-primary text-white shadow-15 rounded-borders"
      infinite
      navigation
      transition-next="scale"
      transition-prev="scale"
      @mouseenter="autoplay = 0"
      @mouseleave="autoplay = 2000"
    >
      <q-carousel-slide
        v-for="e in s.many.documents"
        :key="e.id"
        class="column flex-top"
        :img-src="e.imgField"
        :name="e.id"
      >
        <div class="text-center rounded-borders q-pa-xs q-ma-xl" style="background-color: rgba(10, 10, 10, 0.3)">
          <h3>{{ e.titleField }}</h3>
          {{ e.descField }}
        </div>
      </q-carousel-slide>
    </q-carousel>
    {{ currentSlide }}
  </q-page>
</template>

<style scoped></style>
