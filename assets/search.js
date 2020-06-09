const checkName = (name, str) => {
  const pattern = str
    .split('')
    .map((x) => {
      return `(?=.*${x})`
    })
    .join('')
  const regex = new RegExp(`${pattern}`, 'g')
  return name.match(regex)
}

const onKeyUp = (arr) => {
  const str = event.target.value.toLowerCase().substring(0, 3)
  const filteredArr = arr.filter((x) => {
    const xSub = x.substring(0, 3).toLowerCase()
    return x.toLowerCase().includes(str) || checkName(xSub, str)
  })
  return filteredArr
}
