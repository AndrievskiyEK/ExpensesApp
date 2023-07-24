const LIMIT = 10000;
const CURRENCY = 'руб.';
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'status_red';

const inputNode = document.querySelector('.js-input');
const buttonNode = document.querySelector('.js-button');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');

const expenses = [];

init(expenses);
//Обработчик событий по нажатию на ктопку

buttonNode.addEventListener('click', function() { 
    //получаем данные от пользователя
    const expense = getExpanseFromUser();
    //если в данных нечего нет то прекращаем обработчик событий
    if (!expense){
        return;
    }
    // иначе записываем значения введенные пользователем в массив expenses
    trackExpanse(expense);

    // выводим историю, сумму и статус
    render(expenses)     
});

// функция иницилизаций начальных значений
function init(expenses){
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpanses(expenses);
};

//функция получения значения от пользователя
function getExpanseFromUser(){    
    if(!inputNode.value) {
        return null; // Если в константе inputNode.value ничего нет, то прекращаем работу функции
    }
    // записываем в переменную expense введенное пользователем значение в виде чисел с плавающей точкой
    const expense = parseFloat(inputNode.value);
    // очищаем поле ввода
    clearInput(); 
    // результат выполнения функции - переменная expense
    return expense;
}

//функция добавления введенных значений от пользователя в массив
function trackExpanse(expense){
    expenses.push(expense);
}
//функция очистки поля ввода
function clearInput(){
    inputNode.value = '';
}
//Функция расчета суммы
function calculateExpanses(expenses){
    let sum = 0;   

    expenses.forEach(element => {        
        sum += element    
    });
    
    return sum;
}
// функция отображения информации
function render(expenses) {
    const sum = calculateExpanses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum)
}
//функция отображения истории трат
function renderHistory(expenses){
    
    let expensesListHTML = ''; 
    
    expenses.forEach(element => {        
        expensesListHTML += `<li>${element} ${CURRENCY}</li>`;     
    });

    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}
//функция отображения суммы
function renderSum(sum){
    sumNode.innerText = sum;
}
//функция отображения статуса
function renderStatus(sum){ 

    if (sum <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
    }
    else {
        statusNode.innerText = STATUS_OUT_OF_LIMIT;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
}

