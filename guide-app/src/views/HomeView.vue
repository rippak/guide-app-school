<script setup lang="ts">

import YandexMap from "@/components/YandexMap.vue";
import TheWelcome from "@/components/TheWelcome.vue";
import PointPopup from "@/components/PointPopup.vue";
</script>

<template>
  <div class="map-columns">
    <div class="map-columns--description">
      <TheWelcome />
    </div>
    <div class="map-columns--map">
      <YandexMap />
    </div>
  </div>
  <PointPopup />
</template>

<style scoped>


</style>
