function suggestActivity(isWeekend, isRainy) {
  if (isWeekend && !isRainy) {
    return 'go for a walk';
  } else if (isWeekend && isRainy) {
    return 'watch a movie';
  } else {
    return 'work';
  }
}

document.getElementById('output').textContent = suggestActivity(true, false);