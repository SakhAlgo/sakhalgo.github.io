function greet(name) {
  console.log('Hello, ' + name);
  document.getElementById('output').textContent = 'Hello, ' + name;
}
greet('World');
