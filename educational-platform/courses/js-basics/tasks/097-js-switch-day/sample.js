function getFoodType(food) {
  switch (food) {
    case 'apple':
    case 'banana':
      return 'fruit';
    case 'carrot':
    case 'broccoli':
      return 'vegetable';
    case 'bread':
      return 'grain';
    default:
      return 'unknown';
  }
}

document.getElementById('output').textContent = getFoodType('apple');