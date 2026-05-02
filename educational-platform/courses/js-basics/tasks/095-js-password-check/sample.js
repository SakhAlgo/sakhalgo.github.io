function checkPassword(password) {
  if (password.length < 8) {
    return 'too short';
  } else if (password.length <= 15) {
    return 'medium';
  } else {
    return 'strong';
  }
}

document.getElementById('output').textContent = checkPassword('mySecret123');