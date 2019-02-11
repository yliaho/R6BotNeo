export function format(str: string, arr: any[]) {
  return str.replace(/%(\d+)/g, function(_, m) {
    return arr[--m]
  })
}
