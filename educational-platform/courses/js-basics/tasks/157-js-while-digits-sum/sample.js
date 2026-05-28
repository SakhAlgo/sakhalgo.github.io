function sumDigits(n) {
  let sum = 0;
  
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  
  return sum;
}

const result = sumDigits(123);
console.log(result);