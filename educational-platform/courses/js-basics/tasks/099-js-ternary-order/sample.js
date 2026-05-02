function getOrderStatus(isPaid, isShipped) {
  if (!isPaid) {
    return 'awaiting payment';
  }
  return isShipped ? 'shipped' : 'processing';
}

document.getElementById('output').textContent = getOrderStatus(true, false);