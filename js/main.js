var menuBtn = document.querySelector('.hamburger');
var headerNav = document.querySelector('.header__nav');
var arNavLink = headerNav.querySelectorAll('.nav__link');

var orderForm = document.querySelector('.order');
var orderSubmit = document.querySelector('.order__send');


menuBtn.addEventListener('click', function () {
	menuBtn.classList.toggle('hamburger--close');
	menuBtn.querySelector('.hamburger__line').classList.toggle('hamburger__line--close');
	headerNav.classList.toggle('header__nav--open');
});


orderSubmit.addEventListener('click', function (e) {
	e.preventDefault();
	
	const xhr = new XMLHttpRequest();
		
	xhr.open('POST', 'http://otkuda-kuda/');
	xhr.send(new FormData(orderForm));
});