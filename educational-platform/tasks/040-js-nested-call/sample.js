function double(x) {
    return x * 2;
}

function calculate() {
    return double(5) + double(3);
}

document.getElementById('output').textContent = 'Результат: ' + calculate();
