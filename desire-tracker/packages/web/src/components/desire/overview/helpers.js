export const prepareDataForTable = (data) => {
  console.log(data)
  if (!data) return []

  return Object.keys(data).map(key => {
    if (data[key]) {
      return { id: key, key, ...data[key] }
    }
  })
}
