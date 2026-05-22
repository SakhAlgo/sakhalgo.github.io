function power(base, exp) {
  let result = 1;
  let i = 1;
  while (i <= exp) {
    result *= base;
    i++;
  }
  return result;
}

document.getElementById('output').textContent = power(2, 3);