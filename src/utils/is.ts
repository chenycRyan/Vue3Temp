export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:|\/\/)/.test(path)
}

export function isIntegerNumber(rule: any, value: any, callback: any) {
  if (value <= 0) {
    callback(new Error('需大于0'))
  } else if (value % 1 != 0) {
    callback(new Error('需为整数'))
  } else {
    callback()
  }
}

export function isValidateNumber(rule: any, value: any, callback: any) {
  if (value <= 0) {
    callback(new Error('需大于0'))
  } else {
    callback()
  }
}
