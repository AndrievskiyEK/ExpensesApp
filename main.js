// объявление переменных - строковых констант
const STATUS_IN_LIMIT = "все хорошо";
const STATUS_OUT_OF_LIMIT = "все плохо";
const CHANGE_LIMIT_TEXT = "Новый лимит:"
// объявление переменных - ссылок на html элементы
const inputNode = document.getElementById("expenseInput");
const categorySelectNode = document.getElementById("categorySelect");
const addButtonNode = document.getElementById("addButton");
const clearButtonNode = document.getElementById("clearButton");
const totalValueNode = document.getElementById("totalValue");
const statusNode = document.getElementById("statusText");
const historyNode = document.getElementById("history__list");
const validationMessage = document.getElementById("validationMessage");
const changeLimitBtn = document.getElementById("changeLimitBtn");

//получение лимита из html 
const limitNode = document.getElementById("limitValue");
let limit = parseInt(limitNode.innerText);

//объявление основной переменной
let expenses = [];

// ----Функции-------------------------- 

// подсчет и возврат суммы всех трат
const getTotal = () => {
    let sum = 0;
    expenses.forEach((expense) => {
        sum += expense.amount;
    });

    return sum;
};
// Рендер 
const renderStatus = () => {
    const total = getTotal(expenses);
    totalValueNode.innerText = total;
// поработать с классами  statusNode.className реализовать через переключение через classList
    if (total <= limit) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.className = "stats__statusText_positive";
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - total})  руб.`;
        statusNode.className = "stats__statusText_negative";
    };
};

const renderHistory = () => {
    historyNode.innerHTML = "";
    expenses.forEach((expense) => {
        const historyItem = document.createElement("li");
        historyItem.className = "rub";
        historyItem.innerText = `${expense.category} - ${expense.amount}`;

        historyNode.appendChild(historyItem);  
    });
};

const render = () => {
    renderStatus();
    renderHistory();
}

function getExpanseFromUser() {
    return parseInt(inputNode.value);
}

function getSelectedCategory() {
    return categorySelectNode.value;
}


function validationCategory(){
    const currentCategory = getSelectedCategory();
    if (currentCategory === "Категория"){
        validationMessage.classList.remove ("validationMessage_hidden");
        addButton.setAttribute("disabled", "true")
        return;
    }
    
    validationMessage.classList.add ("validationMessage_hidden"); // добавляем класс validationMessage_hidden (скрываем надпись)
    
    addButton.removeAttribute("disabled"); // удаляем атрибут disabled 
}

const clearInput = (input) => {
    input.value = "";
};

function addButtonHandler () {
    const currentAmount = getExpanseFromUser();
    // если в поле input пусто то прекращаем работу функции
    if (!currentAmount){
        alert ("Введите потраченную сумму");
        return;
    }
    const currentCategory = getSelectedCategory();
    //Если пользователь не выбрал категорию, то прекращай работу функции
    if (currentCategory === "Категория"){
        return
    }
    // из полученных данные собираем объект newExpense
    //который состоит из 2-х полей Amount(значение в руб) и Category (категория)
    const newExpense = {amount: currentAmount, category: currentCategory}

    expenses.push(newExpense);

    render();

    clearInput(inputNode);
};

const clearButtonHandler = () => {
    expenses = [];
    render();
};

function changeLimitHandler(){
    const newLimit = prompt(CHANGE_LIMIT_TEXT);
    const nevLimitValue = parseInt (newLimit);

    if (!nevLimitValue) {
        return;
    }

    limitNode.innerText = nevLimitValue;

    limit = nevLimitValue;

    render();
}

// привязка функций к обработчику событий
addButtonNode.addEventListener("click", addButtonHandler);
clearButtonNode.addEventListener("click", clearButtonHandler);
inputNode.addEventListener("input", validationCategory);
categorySelectNode.addEventListener("click", validationCategory);
changeLimitBtn.addEventListener('click', changeLimitHandler);