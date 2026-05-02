function getDayType(day) {
  switch (day) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return 'workday';
    case 6:
    case 7:
      return 'weekend';
    default:
      return 'invalid';
  }
}

document.getElementById('output').textContent = getDayType(3);