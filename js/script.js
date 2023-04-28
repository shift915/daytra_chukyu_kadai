
//resultのスライダー
const swiper = new Swiper('.swiper', {

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets',
  },
  spaceBetween: 40,
  width: 400,
  breakpoints :{
    768: {
      width: 274,
      spaceBetween: 24,
    }
  },
  loop: true,
  loopedSlides: 6,
});

//Q&Aのアコーディオン
$('.qa__item').on('click', function(){
  $(this).find('.qa__item-q-part-wrap').toggleClass('is-open');
  $(this).children('.qa__item-a').slideToggle();
});

//コンタクトフォームのバリデーション
$('#your-name, #your-kana, input[type="checkbox"]').on('change', function(){
  if(
    $('#your-name').val() !== '' &&
    $('#your-kana').val() !== '' &&
    $('#privacy').prop('checked') === true
    ){
    $('#js-submit').prop('disabled', false);
}else {
  $('#js-submit').prop('disabled', true);
}
});

//カタカナのバリデーション
function checkKatakana() {
  const katakanaRegex = /^[\u30A0-\u30FF]+$/;
  const yourKana = $('#your-kana').val();

  if (!katakanaRegex.test(yourKana)) {
    alert('フリガナはカタカナで入力してください。');
  }
}

$('#your-kana').on('change', checkKatakana);

//トップに戻るボタン
$(window).on('scroll', function(){
  if($(this).scrollTop() > 100){
    $('.to-top').fadeIn();
  }else {
    $('.to-top').fadeOut();
  }
});

//スムーススクロール
$('.header__nav-link, .main-visual__button').on('click', function(e){
  e.preventDefault()
  let header = $('.header').outerHeight();
  let target = $(this).attr('href');
  
  let position = $(target).offset().top - header;

  $('html, body').animate({
    scrollTop: position
  }, 300);

  $('.header__nav').removeClass('is-show');
  $('.header__overlay').removeClass('is-show');
  $('.header__nav-toggle').removeClass('is-show');

  return false;
});

//ハンバーガー
$('.header__nav-toggle').on('click', function(){
  $('.header__nav').toggleClass('is-show');
  $('.header__overlay').toggleClass('is-show');
  $('.header__nav-toggle').toggleClass('is-show');
});

$('.header__overlay').on('click', function(){
  $('.header__nav').removeClass('is-show');
  $('.header__overlay').removeClass('is-show');
  $('.header__nav-toggle').removeClass('is-show');
});

//フォーム送信した後の処理

const $form = $('.contact__form');

$form.submit(function(e) { 
  $.ajax({ 
   url: $form.attr('action'), 
   data: $form.serialize(), 
   type: "POST", 
   dataType: "xml", 
   statusCode: { 
      0: function() { 
        //送信に成功したときの処理 
        $form.slideUp();
        $('.contact__submitted.is-success').slideDown();

      }, 
      200: function() { 
        //送信に失敗したときの処理
        $form.slideUp(); 
        $('.contact__submitted.is-error').slideDown();
      }
    } 
  });
  return false; 
});

//上に戻るボタン
$('#to-top').on('click', function(e){
  e.preventDefault();

  $('html, body').animate({
    scrollTop: 0
  }, 300);
});