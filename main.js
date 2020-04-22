var menuBtn = document.querySelector('.hamburger');
var headerNav = document.querySelector('.header__nav');
var arNavLink = headerNav.querySelectorAll('.nav__link');

var orderForm = document.querySelector('.order');
var inptPhone = orderForm.clientPhone;
var orderSubmit = document.querySelector('.order__send');


menuBtn.addEventListener('click', function () {
	menuBtn.classList.toggle('hamburger--close');
	menuBtn.querySelector('.hamburger__line').classList.toggle('hamburger__line--close');
	headerNav.classList.toggle('header__nav--open');
});


inptPhone.addEventListener('focus', function () {
	inptPhone.addEventListener('keydown', function (keyW) {
		keyW.preventDefault();

		if (keyW.key.match(/backspace/i) !== null) {
			if (inptPhone.value[3] !== '_') {
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
		} else if (keyW.key.match(/[А-Яa-z]/iu) === null) {
			inptPhone.value = inptPhone.value.replace('_', keyW.key);
		}
	});
});

orderSubmit.addEventListener('click', function (e) {
	e.preventDefault();
	
	const xhr = new XMLHttpRequest();
		
	xhr.open('POST', 'http://otkuda-kuda/order');
	xhr.onload = function () {
		var serverResponse = JSON.parse(xhr.response);

		if (typeof(serverResponse) === "object") {
			var arElementsOrderForm = orderForm.querySelectorAll('input');

			var isset;
            arElementsOrderForm.forEach(function (inpt) {
            	isset = false;

            	serverResponse.find(function (elem) {
					if (elem === inpt.name) {
						isset = true
					}
                });

                if (isset) {
                    inpt.classList.add('order__inpt--invalid');
                } else {
                    inpt.classList.remove('order__inpt--invalid');
                }
			});
		} else {
			var arInvalidField = orderForm.querySelectorAll('.order__inpt--invalid');
			if (arInvalidField.length > 0) {
                arInvalidField.forEach(function (elem) {
                    elem.classList.remove('order__inpt--invalid');
                });
            }
		}
    }
	xhr.send(new FormData(orderForm));
});