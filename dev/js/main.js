$(document).ready(function () {
  $('.js-menu').addClass('hidden-mobile');
	$('.js-toggle-nav').click(function () {
    $('.js-menu').slideToggle();
    $(this).toggleClass('js-close');
  });
});