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

document.getElementById('output').textContent = findChar('hello', 'l');