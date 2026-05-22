function getDigits(n) {
  let digits = [];
  while (n > 0) {
    digits.push(n % 10);
    n = Math.floor(n / 10);
  }
  return digits.reverse();
}

document.getElementById('output').textContent = getDigits(123).join(', ');