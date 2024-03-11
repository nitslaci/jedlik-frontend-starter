<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function routerExample() {
  router.push("/empty");
}
</script>

<template>
  <q-page>
    <div class="column flex-center" style="min-height: inherit">
      <q-img width="150px" alt="Jedlik logo" src="../assets/Jedlik_big.png" />
      <h2>Jedlik Ányos Technikum - Győr</h2>
      <q-btn color="teal" no-caps @click="$router.push('\empty')">
        <q-icon left size="3em" name="mdi-router" />
        <div>Go Empty Page from template</div>
      </q-btn>
      <q-btn color="amber" class="q-mt-md" no-caps @click="routerExample">
        <q-icon left size="3em" name="mdi-map" />
        <div>Go Empty Page from script</div>
      </q-btn>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
h2 {
  font-size: 3vw;
}
</style>
