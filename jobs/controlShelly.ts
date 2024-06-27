const now = new Date().toISOString().split('T')[1].split('.')[0];

const indexHour = (hour: string): number => {
  if (parseInt(hour.charAt(1)) <= 9 && parseInt(hour.charAt(0)) === 0) {
    return parseInt(hour.charAt(1))
  } else {
    return parseInt(hour.substring(0, 2))
  }
}

console.log(indexHour(''))