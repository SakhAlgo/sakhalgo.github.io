function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  
  let arr = [0, 1];
  let i = 2;
  
  while (i < n) {
    arr.push(arr[i-1] + arr[i-2]);
    i++;
  }
  
  return arr;
}

const result = fibonacci(6);
console.log(result);