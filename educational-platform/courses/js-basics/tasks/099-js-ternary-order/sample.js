function getNumberType(n) {
  switch (n) {
    case 1:
    case 3:
    case 5:
      return 'odd';
    case 2:
    case 4:
      return 'even';
    default:
      return 'out of range';
  }
}

document.getElementById('output').textContent = getNumberType(3);