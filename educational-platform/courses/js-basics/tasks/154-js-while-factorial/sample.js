function factorial(n) {
  let result = 1;
  let i = 2;
  while (i <= n) {
    result *= i;
    i++;
  }
  return result;
}

document.getElementById('output').textContent = factorial(5);