function paginate(array, pageIndex, pageSize) {
  const first = pageIndex * pageSize
  const last = (pageIndex * pageSize) + pageSize
  return array.filter((_, index) => {
    return first <= index && index < last
  })
}

export default paginate;