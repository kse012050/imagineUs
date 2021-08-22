$(document).ready(function(){
    $('header > div > div nav').hover(function(){
        $('header').addClass('active');
        $('header > div > div nav > ul > li ul').slideDown();
    },function(){
        $('header').removeClass('active');
        $('header > div > div nav > ul > li ul').slideUp();
    })
});