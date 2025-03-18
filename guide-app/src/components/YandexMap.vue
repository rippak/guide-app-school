<script setup lang="ts">
import points from "@/data/points/points.json";
import { storeToRefs } from 'pinia'
import { usePointStore } from "@/stores/selectedPoint.ts";
import type { Point } from "@/types/point.ts";
import { shallowRef } from 'vue';
import type { YMap } from '@yandex/ymaps3-types';
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker
} from 'vue-yandex-maps';

const map = shallowRef<null | YMap>(null);

const pointStore = usePointStore();
const { selectedPoint } = storeToRefs(pointStore)
const activePoint = shallowRef<null | Point>(null);

function selectPoint(point: Point) {
  pointStore.setSelectedPoint(point)
}

</script>

<template>
  <yandex-map
      v-model="map"
      :settings="{
          location: {
            center: [30.336853, 59.838688],
            zoom: 11,
          },
        }"
      width="100%"
      height="500px"
      style="height: 100vh"
  >
    <yandex-map-marker
        v-for="point in points"
        :key="point.id"
        position="left top-center"
        @click="selectPoint(point)"
        :settings="{
            coordinates: [point.lng, point.lat],
            zIndex: point.zIndex ?? 0
        }"
    >
      <div
          :class="{active: point.id === selectedPoint?.id}"
          class="sight-seeing-marker"
      >
        <span class="sight-seeing-marker--title">{{point.title}}</span>
      </div>
    </yandex-map-marker>
    <yandex-map-default-scheme-layer/>
    <yandex-map-default-features-layer/>
  </yandex-map>
</template>

<style scoped>
.sight-seeing-marker {
  position: relative;
  width: 25px;
  height: 25px;
}

.sight-seeing-marker:after {
  position: absolute;
  content: "";
  width: 25px;
  height: 25px;
  background: #ff0000;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #fff;
  font-weight: bold;
  line-height: 20px;
  transition: width 0.25s ease, height 0.25s ease, transform 0.25s ease;
}

.sight-seeing-marker--title {
  position: absolute;
  opacity: 0;
  white-space: nowrap;
  transition: opacity 0.5s ease, transform 0.25s ease;
  background: #eee;
  color: #444;
  left: 8px;
  top: -1px;
  padding: 3px 10px 3px 25px;
  display: none;
  font-size: .8rem;
}

.sight-seeing-marker:hover:after,
.sight-seeing-marker.active:after {
  width: 30px;
  height: 30px;
  transform: translate(-2.5px, -2.5px);
  cursor: pointer;
}

.sight-seeing-marker:hover .sight-seeing-marker--title,
.sight-seeing-marker.active .sight-seeing-marker--title {
  opacity: 1;
  display: block;
  transform: translate(0, 0);
}
</style>