function ageCategory(age) {
  if (age >= 0 && age <= 12) {
    return 'child';
  } else if (age >= 13 && age <= 17) {
    return 'teen';
  } else if (age >= 18 && age <= 64) {
    return 'adult';
  } else {
    return 'senior';
  }
}

document.getElementById('output').textContent = ageCategory(25);