var menuBtn = document.querySelector('.hamburger');
var headerNav = document.querySelector('.header__nav');
var arNavLink = headerNav.querySelectorAll('.nav__link');

//Переменные связанные с формой заказа звонка
var orderForm = document.querySelector('.order');
var inptPhone = orderForm.clientPhone;
var orderSubmit = document.querySelector('.order__send');
var sendStatus = orderForm.querySelector('.order__status-send');


menuBtn.addEventListener('click', function () {
    opnClsNav();
});
arNavLink.forEach(function (elem) {
	elem.addEventListener('click', function (event) {
        opnClsNav();
	});
});


//Устанавливает шаблон ввода для поля номера телефона
inptPhone.addEventListener('focus', function () {
    var oldValue;

	inptPhone.addEventListener('keydown', saveValue);
    inptPhone.addEventListener('input', phoneMask);
});

//Отправка данных формы на сервер и отображение результата
orderSubmit.addEventListener('click', function (e) {
	e.preventDefault();

    arOrderFormInputs = orderForm.querySelectorAll('.order__inpt');

    var valid = true;
    arOrderFormInputs.forEach(function (input) {
        input.classList.remove('order__inpt--invalid');
        if (input.value.length === 0) {
            if (valid) { valid = false }
            input.classList.add('order__inpt--invalid');
        }else if (input.name === 'clientPhone') {
            if (input.value.search('.7 .[0-9]{3}. [0-9]{3}-[0-9]{2}-[0-9]{2}') === -1) {
                if (valid) { valid = false }

                input.classList.add('order__inpt--invalid');
            }
        };
    });

    if (valid) {
        var arInvalidField = orderForm.querySelectorAll('.order__inpt--invalid');
        if (arInvalidField.length > 0) {
            arInvalidField.forEach(function (elem) {
                elem.classList.remove('order__inpt--invalid');
            });
        }
    }

    displaySendResults(valid);
});

/*
* Функция для поля набора номера
* Callback функция для нажатия клавиши при фокусе на поле
* Отменяет ввод всех символов кроме цифр и Backspace
* */
function saveValue(keyW) {
    oldValue = inptPhone.value;

    //Если нажата клавиша Backspace, то ...
    /*if (keyW.key.match(/backspace/i) !== null) {
        alert('Удаление');
        //Если 5 символ в значении поля "_" ('+7 (_'), то ...
        if (inptPhone.value[4] !== '_') {
            var oldValue = inptPhone.value;

            if (oldValue.includes('_')) {
                var pos = oldValue.indexOf('_');

                if (oldValue[pos - 1].match(/[()-]/) !== null) {
                    pos = pos - 1;
                } else if (oldValue[pos - 1].match(/\s/) !== null) {
                    pos = pos - 2;
                }

                var newValue = oldValue.slice(0, pos - 1) + '_' + oldValue.slice(pos);
            } else {
                var posEndChar = inptPhone.value.length - 1;

                var newValue = oldValue.slice(0, posEndChar) + '_';
            }

            inptPhone.value = newValue;
        }
    } else if (keyW.key.match(/^[0-9]/) !== null) {
        alert('Цифра');
        inptPhone.value = inptPhone.value.replace('_', keyW.key);
    }*/
}

function phoneMask(inpt) {
    if (inpt.inputType === 'insertText') {
        if (inpt.data.match(/^[0-9]/) !== null) {
            alert('Цифра');

            inptPhone.value = oldValue.replace('_', inpt.data);
        } else {
            alert('Буква');

            inptPhone.value = oldValue;
        }
    } else if (inpt.inputType === 'deleteContentBackward') {
        alert('Backspace');

        //Если 5 символ в значении поля "_" ('+7 (_'), то ...
        if (oldValue[4] !== '_') {
            if (oldValue.includes('_')) {
                var pos = oldValue.indexOf('_');

                if (oldValue[pos - 1].match(/[()-]/) !== null) {
                    pos = pos - 1;
                } else if (oldValue[pos - 1].match(/\s/) !== null) {
                    pos = pos - 2;
                }

                var newValue = oldValue.slice(0, pos - 1) + '_' + oldValue.slice(pos);
            } else {
                var posEndChar = oldValue.length - 1;

                var newValue = oldValue.slice(0, posEndChar) + '_';
            }

            inptPhone.value = newValue;
        } else {
            inptPhone.value = oldValue;
        };
    };
}

/*
* Функция открытия/закрытия меню для экранов телефонов
* */
function opnClsNav() {
    //Меняет вид кнопки открыть/закрыть
    menuBtn.classList.toggle('hamburger--close');
    menuBtn.querySelector('.hamburger__line').classList.toggle('hamburger__line--close');
    //Открывает/закрывает меню
    headerNav.classList.toggle('header__nav--open');
}

/*
* Функция получает результат отправки данных на сервер и отображает соответствующий блок
* bool status
* */
function displaySendResults (status) {
    if (status) {
        status = 'success';

        var arInptsOrderForm = orderForm.querySelectorAll('.order__inpt');
        arInptsOrderForm.forEach(function (inpt) {
            inpt.classList.add('order__inpt--send-' + status);
            setTimeout(function () {
                inpt.classList.remove('order__inpt--send-' + status);
            }, 3000);
        })

        orderSubmit.blur();
        orderSubmit.classList.add('order__send--send-' + status);
        setTimeout(function () {
            orderSubmit.classList.remove('order__send--send-' + status);
        }, 3000);
    };
}