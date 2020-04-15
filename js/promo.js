var menuBtn = document.querySelector('.hamburger');
var headerNav = document.querySelector('.header__nav');

menuBtn.addEventListener('click', function () {
	menuBtn.classList.toggle('hamburger--close');
	menuBtn.querySelector('.hamburger__line').classList.toggle('hamburger__line--close');
	headerNav.classList.toggle('header__nav--open');
});