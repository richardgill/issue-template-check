export const diffBetweenToDates = (date1: Date, date2: Date) => {
  let diff

  const firstDate = date1.getTime()
  const secondDate = date2.getTime()
  if (firstDate > secondDate) {
    diff = new Date(firstDate - secondDate)
  } else {
    diff = new Date(secondDate - firstDate)
  }

  const diffFormatTmp =
    diff.getDate() + '-' + (diff.getMonth() + 1) + '-' + diff.getFullYear()
  const diffFormat = diffFormatTmp.split('-')
  const months_passed = Math.abs(parseInt(diffFormat[1]) - 1)
  const years_passed = Math.abs(parseInt(diffFormat[2]) - 1970)
  const days_passed = Math.abs(parseInt(diffFormat[0]))

  //Convert to days and sum together
  const daysTxt = ['day', 'days']

  const yrsTxt = ['year', 'years']
  const mnthsTxt = 'mo'
  const result =
    (years_passed == 1
      ? years_passed + ' ' + yrsTxt[0] + ' '
      : years_passed > 1
      ? years_passed + ' ' + yrsTxt[1] + ' '
      : '') +
    (months_passed == 1
      ? ' ' + months_passed + ' ' + mnthsTxt
      : months_passed > 1
      ? ' ' + months_passed + ' ' + mnthsTxt + ' '
      : '') +
    (days_passed == 1
      ? ' ' + days_passed + ' ' + daysTxt[0]
      : days_passed > 1
      ? ' ' + days_passed + ' ' + daysTxt[1]
      : '')

  return result
}
