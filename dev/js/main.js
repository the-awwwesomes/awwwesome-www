$(document).ready(function () {
	$('.js-toggle-nav').click(function () {
    $('.js-menu').slideToggle();
    $(this).toggleClass('js-close');
  });
});