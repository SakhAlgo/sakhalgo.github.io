function findNumber(arr, target) {
  let foundIndex = -1;
  
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      foundIndex = i;
      break;
    }
  }
  
  return foundIndex;
}

const result = findNumber([3, 7, 1, 9, 4], 1);
console.log(result);