function findChar(str, char) {
  let i = 0;
  
  while (i < str.length) {
    if (str[i] === char) {
      return i;
    }
    i++;
  }
  
  return -1;
}

const result = findChar('hello', 'l');
console.log(result);