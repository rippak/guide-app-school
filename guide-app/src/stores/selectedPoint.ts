import { defineStore } from 'pinia'
import type { Point } from '@/types/point'

export const usePointStore = defineStore('selectedPoint', {
    state: () => ({
        selectedPoint: null as Point | null
    }),
    actions: {
        setSelectedPoint(point: Point | null) {
            this.selectedPoint = point
        }
    }
})