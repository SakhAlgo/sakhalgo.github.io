function getTrafficLightAction(color) {
  switch (color) {
    case 'green':
      return 'go';
    case 'yellow':
      return 'wait';
    case 'red':
      return 'stop';
    default:
      return 'invalid color';
  }
}

document.getElementById('output').textContent = getTrafficLightAction('green');