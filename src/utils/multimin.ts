export class Maxpisor {
  arr: number[]
  min: number
  maxpisor: number
  minMulti: number = 1
  public constructor(arr: number[], origin: boolean) {
    this.arr = arr
    this.min = this._getMin(arr)
    this.maxpisor = this._getMaxp()
    if (origin) {
      this.minMulti = this._getMinMulti()
    }
  }
  _getMin(arr: number[]) {
    let min = Infinity

    arr.forEach(item => (min = item && item < min ? item : min))

    return min
  }
  _getMaxp() {
    let arr_maxpi: number = 0
    const self = this
    function maxpisor(arr: number[]) {
      let min = self._getMin.call(null, arr)
      if (min === Infinity) {
        arr_maxpi = 0
        return
      }

      let exparr = arr.filter(item => item !== min && item != 0)

      if (exparr.length === 0) {
        arr_maxpi = min
        return
      } else {
        let modearr = arr.map(item => (item === min || item === 0 ? item : item % min))
        maxpisor(modearr)
      }
    }
    maxpisor(this.arr)
    return arr_maxpi
  }
  _getMinMulti() {
    let arr = this.arr,
      arr_minMulti

    let totalmulti = arr.reduce((multi, curvalue) => multi * curvalue)
    if (totalmulti === 0) {
      return 0
    } else {
      let marr = arr.map(item => totalmulti / item),
        b = new Maxpisor(marr, false)
      arr_minMulti = totalmulti / b.maxpisor
      return arr_minMulti
    }
  }
}
