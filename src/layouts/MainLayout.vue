<!-- Material Design Icons: https://materialdesignicons.com/ -->

<script setup lang="ts">
import { ref } from "vue";

// import { onMounted } from "vue";

// import { useAppStore } from "../stores/appStore";
// const appStore = useAppStore();

let showMenuBar = ref(true);
let showLeftDrawer = ref(true);
let showRightDrawer = ref(true);
let showStatusBar = ref(true);

// onMounted(() => {
// ...
// });
</script>

<template>
  <div class="q-pa-md">
    <q-layout view="hHh LpR fFf">
      <!-- Header: -->
      <q-header v-model="showMenuBar" class="text-left bg-blue-5" elevated reveal>
        <!-- Menu bar: -->
        <q-toolbar>
          <q-btn dense flat icon="mdi-menu" round @click="showLeftDrawer = !showLeftDrawer" />
          <q-toolbar-title class="my-title" :shrink="true" style="cursor: pointer" @click="$router.push({ path: '/' })">
            <q-avatar>
              <img src="src/assets/Jedlik_small.png" />
            </q-avatar>
            Jedlik
          </q-toolbar-title>
          <q-btn :class="{ active: $route.path === '/' }" clickable flat icon="mdi-home" label="Home" no-caps to="/" />
          <q-btn
            :class="{ active: $route.path === '/xempty' }"
            flat
            icon="mdi-application-outline"
            label="xEmpty"
            no-caps
            to="/xempty"
          />
          <q-btn
            :class="{ active: $route.path === '/xhelp' }"
            flat
            icon="mdi-lifebuoy"
            label="xHelp"
            no-caps
            to="/xhelp"
          />
          <q-toolbar-title class="my-title" />
          <q-btn dense flat icon="mdi-menu" round @click="showRightDrawer = !showRightDrawer" />
        </q-toolbar>
      </q-header>

      <!-- Left drawer: -->
      <q-drawer v-model="showLeftDrawer" bordered :breakpoint="600" :width="200">
        <q-scroll-area class="fit bg-blue-1">
          <q-btn
            align="left"
            class="full-width q-ma-xs"
            :class="{ active: $route.path === '/' }"
            flat
            icon="mdi-home"
            label="Home"
            no-caps
            to="/"
          />
          <q-btn
            align="left"
            class="full-width q-ma-xs"
            :class="{ active: $route.path === '/xempty' }"
            flat
            icon="mdi-application-outline"
            label="xEmpty"
            no-caps
            to="/xempty"
          />
          <q-btn
            align="left"
            class="full-width q-ma-xs"
            :class="{ active: $route.path === '/xhelp' }"
            flat
            icon="mdi-lifebuoy"
            label="xHelp"
            no-caps
            to="/xhelp"
          />
        </q-scroll-area>
      </q-drawer>

      <!-- Right drawer: -->
      <q-drawer v-model="showRightDrawer" bordered :breakpoint="800" class="bg-blue-1" side="right" :width="200">
        <q-scroll-area class="fit">
          <div class="q-ma-sm text-center">
            You must start JSON server (with: "npm run backend") before try these links!
          </div>
          <q-btn
            align="left"
            class="full-width q-ma-xs"
            :class="{ active: $route.path === '/xtable' }"
            flat
            icon="mdi-table"
            label="xTable"
            no-caps
            to="/xtable"
          />
          <q-btn
            align="left"
            class="full-width q-ma-xs"
            :class="{ active: $route.path === '/xcard' }"
            flat
            icon="mdi-card-account-details"
            label="xCard"
            no-caps
            to="/xcard"
          />
          <q-btn
            align="left"
            class="full-width q-ma-xs"
            :class="{ active: $route.path === '/xcarousel' }"
            flat
            icon="mdi-view-carousel-outline"
            label="xCarousel"
            no-caps
            to="/xcarousel"
          />
        </q-scroll-area>
      </q-drawer>

      <!-- Status bar: -->
      <q-footer v-model="showStatusBar" class="bg-blue-5" elevated reveal>
        <q-toolbar>
          <q-toolbar-title class="text-center my-title">Jedlik frontend template 2023</q-toolbar-title>
        </q-toolbar>
      </q-footer>

      <!-- Main container (DON'T DELETE!) -->
      <q-page-container id="container">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss">
.active {
  background-color: #44a5f1;
  color: yellow;
}

.my-title {
  font-size: 10px;
  @media (min-width: 400px) {
    font-size: calc(10px + 0.5vw);
  }
  @media (min-width: 800px) {
    font-size: calc(14px + 0.5vw);
  }
  @media (min-width: 1200px) {
    font-size: calc(18px + 0.5vw);
  }
}
</style>
