const display    = document.getElementById('display');
const expression = document.getElementById('expression');

let currentValue  = '0';
let previousValue = '';
let operator      = null;
let shouldReset   = false;

function updateDisplay(val) {
  // Уменьшить шрифт при длинных числах
  display.style.fontSize = val.length > 9 ? '28px' : val.length > 6 ? '40px' : '56px';
  display.textContent = val;
}

function inputDigit(digit) {
  if (shouldReset) { currentValue = digit; shouldReset = false; }
  else currentValue = currentValue === '0' ? digit : currentValue + digit;
  updateDisplay(currentValue);
}

function inputDot() {
  if (shouldReset) { currentValue = '0.'; shouldReset = false; }
  else if (!currentValue.includes('.')) currentValue += '.';
  updateDisplay(currentValue);
}

function setOperator(op) {
  if (operator && !shouldReset) calculate();
  previousValue = currentValue;
  operator      = op;
  shouldReset   = true;
  expression.textContent = `${previousValue} ${op}`;
}

function calculate() {
  if (!operator || !previousValue) return;
  const a = parseFloat(previousValue);
  const b = parseFloat(currentValue);
  let result;
  switch (operator) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/': result = b !== 0 ? a / b : 'Ошибка'; break;
  }
  expression.textContent = `${previousValue} ${operator} ${currentValue} =`;
  currentValue  = result === 'Ошибка' ? 'Ошибка' : String(parseFloat(result.toFixed(10)));
  operator      = null;
  previousValue = '';
  shouldReset   = true;
  updateDisplay(currentValue);
}

function clearAll() {
  currentValue  = '0';
  previousValue = '';
  operator      = null;
  shouldReset   = false;
  expression.textContent = '';
  updateDisplay('0');
}

function toggleSign() {
  currentValue = String(parseFloat(currentValue) * -1);
  updateDisplay(currentValue);
}

function percent() {
  currentValue = String(parseFloat(currentValue) / 100);
  updateDisplay(currentValue);
}

// ── Event delegation ──
document.querySelector('.calc-buttons').addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;

  if (btn.dataset.num !== undefined) inputDigit(btn.dataset.num);
  else if (btn.dataset.op)          setOperator(btn.dataset.op);
  else switch (btn.dataset.action) {
    case 'clear':   clearAll();     break;
    case 'equals':  calculate();    break;
    case 'dot':     inputDot();     break;
    case 'sign':    toggleSign();   break;
    case 'percent': percent();      break;
  }
});

// ── Keyboard support ──
document.addEventListener('keydown', e => {
  if (e.key >= '0' && e.key <= '9') inputDigit(e.key);
  else if (e.key === '.')  inputDot();
  else if (e.key === '+')  setOperator('+');
  else if (e.key === '-')  setOperator('-');
  else if (e.key === '*')  setOperator('*');
  else if (e.key === '/')  { e.preventDefault(); setOperator('/'); }
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Escape') clearAll();
  else if (e.key === 'Backspace') {
    currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
    updateDisplay(currentValue);
  }
});

updateDisplay('0');
