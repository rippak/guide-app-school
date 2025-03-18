<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePointStore } from '@/stores/selectedPoint'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const pointStore = usePointStore()
const { selectedPoint } = storeToRefs(pointStore)

const clearSelectedPoint = () => {
  pointStore.setSelectedPoint(null)
}

const popupRef = ref(null)

onClickOutside(popupRef, () => {
  if (selectedPoint.value) {
    clearSelectedPoint()
  }
})
</script>

<template>
  <transition name="popup-fade">
  <div
      v-if="selectedPoint"
      class="popup"
      ref="popupRef"
      @click.stop
  >
    <div class="popup-content">
      <button
          class="close-button"
          @click="clearSelectedPoint"
          aria-label="Закрыть"
      >
        &times;
      </button>

      <h2 class="title">{{ selectedPoint.title }}</h2>

      <img
          :src="selectedPoint.image"
          :alt="selectedPoint.title"
          class="point-image"
      />

      <p class="description">{{ selectedPoint.description }}</p>
    </div>
  </div>
  </transition>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 600px;
  width: 90%;
  color: black;
  will-change: transform, opacity;
}

.popup-content {
  position: relative;
}

.close-button {
  position: absolute;
  top: -15px;
  right: -10px;
  background: none;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  color: black;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  margin-top: 0;
  color: #000;
  font-family: "Great Vibes", cursive;
  font-size: 2.1rem;
}

.point-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.description {
  line-height: 1.5;
  margin: 0;
}

.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: all 0.3s ease;
}

.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -20%);
}

</style>