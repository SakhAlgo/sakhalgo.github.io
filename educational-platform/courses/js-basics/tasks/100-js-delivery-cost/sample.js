function getPlanetName(n) {
  switch (n) {
    case 1:
      return 'Mercury';
    case 2:
      return 'Venus';
    case 3:
      return 'Earth';
    case 4:
      return 'Mars';
    default:
      return 'unknown';
  }
}

document.getElementById('output').textContent = getPlanetName(3);