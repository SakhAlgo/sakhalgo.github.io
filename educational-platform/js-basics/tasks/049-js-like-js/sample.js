document.getElementById('askBtn').addEventListener('click', function() {
  const likesJS = confirm('Тебе нравится JavaScript?');
  if (likesJS) {
    alert('Конечно, отличный язык.');
  } else {
    alert('Не нравится? Вы кнопкой ошиблись?');
  }
});