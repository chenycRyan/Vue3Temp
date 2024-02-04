import { defineStore } from 'pinia'
import { StatusState } from '../interface'

export const StatusStore = defineStore('StatusState', {
  state: (): StatusState => ({
    startTime: null,
    endTime: null,
    start: false,
    end: false,
    order: null,
    company: null
  }),
  actions: {
    setStartTime(val: any) {
      this.startTime = val
    },
    setEndTime(val: any) {
      this.endTime = val
    },
    setStart(val: boolean) {
      this.start = val
    },
    setEnd(val: boolean) {
      this.end = val
    },
    setOrder(obj: { id: number }) {
      this.order = obj
    },
    setCompany(obj: any) {
      this.company = obj
    },
    resetInfo() {
      this.$reset()
    }
  }
})
