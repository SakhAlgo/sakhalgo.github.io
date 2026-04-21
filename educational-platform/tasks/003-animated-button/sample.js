// Задание 003 — JS не требуется для базовой анимации
// Дополнительно: смена текста при клике
const btn = document.querySelector('.btn');
const txt = btn.querySelector('.btn-text');
const msgs = ['Нажми меня', 'Ещё раз!', '🎉 Молодец!', '🚀 Вперёд!'];
let i = 0;

btn.addEventListener('click', () => {
  i = (i + 1) % msgs.length;
  txt.textContent = msgs[i];
});
