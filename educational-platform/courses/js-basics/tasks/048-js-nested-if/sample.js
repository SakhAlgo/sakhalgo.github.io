function canAccess(age, hasLicense) {
  if (age >= 18) {
    if (hasLicense) {
      return 'drive';
    } else {
      return 'no license';
    }
  } else {
    return 'too young';
  }
}

document.getElementById('output').textContent = canAccess(20, true);