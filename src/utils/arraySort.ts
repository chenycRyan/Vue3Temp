export function arrItemSort(arrObj: any[], keyName: string, type: number) {
  //这里如果 直接等于arrObj，相当于只是对对象的引用，改变排序会同时影响原有对象的排序，而通过arrObj.slice(0)，
  //表示把对象复制给另一个对象，两者间互不影响
  let tempArrObj = arrObj.slice(0)
  let compare = function (keyName: string, type: number) {
    return function (obj1: any, obj2: any) {
      let val1 = obj1[keyName]
      let val2 = obj2[keyName]
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1)
        val2 = Number(val2)
      }
      //如果值为空的，放在最后
      if (val1 == null && val2 == null) {
        return 0
      } else if (val1 == null && val2 != null) {
        return type == 1 ? -1 : 1
      } else if (val2 == null && val1 != null) {
        return type == 1 ? 1 : -1
      }
      //排序
      if (val1 < val2) {
        return type == 1 ? 1 : -1
      } else if (val1 > val2) {
        return type == 1 ? -1 : 1
      } else {
        return 0
      }
    }
  }
  return tempArrObj.sort(compare(keyName, type))
}
