function calcDelivery(distance, isExpress) {
  if (distance <= 0) {
    return 'invalid';
  }

  let cost;
  if (distance <= 10) {
    cost = 300;
  } else if (distance <= 50) {
    cost = 500;
  } else {
    cost = 800;
  }

  if (isExpress) {
    cost += 200;
  }

  return cost + ' руб';
}

document.getElementById('output').textContent = calcDelivery(25, true);