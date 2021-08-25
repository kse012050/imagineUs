$(document).ready(function(){
    history.scrollRestoration = "manual";
    var scrollArray = $('[data-scroll = "all"] , [data-scroll = "pc"] > * ');

    for(var i = 0 ; i < scrollArray.length; i++){
        // console.log(scrollArray[i]);
    }
    var delta = 0;
    var offsetTop = 0;
    $.each(scrollArray , function(){
        $(this).on('mousewheel touchmove',function(e){
            
            e.preventDefault();
            if($('html, body').is(':animated')){
                return;
            }
            delta = e.originalEvent.wheelDelta;
            
            if(delta > 0){
                if($(this).parent().attr('data-scroll') == 'pc' && $(this).index() == 0){
                    offsetTop = $(this).parent().prev().offset().top;
                    $('header h1').removeClass('black');
                }else{
                    offsetTop = $(this).prev().offset().top;
                    if($(this).parent().attr('data-scroll') == 'pc' && $(this).index() == 1){
                        $('header > div > div').removeClass('black');
                        $('.scrollProgress').removeClass('black');
                    }
                }
            }else{
                offsetTop = $(this).next().offset().top;
                if($(this).next().attr('data-scroll') == 'pc'){
                    $('header h1').addClass('black');
                }else if($(this).parent().attr('data-scroll') == 'pc'){
                    $('header > div > div').addClass('black');
                    $('.scrollProgress').addClass('black');
                }
            }

            $('html, body').stop().animate({scrollTop: offsetTop},800); 
        })
    })

    $(window).scroll(function(){
        var scrollProgress = $(window).scrollTop() / ($(document).height() - $(window).height()) * 100;
        $('.scrollProgress > div > div').css('height',scrollProgress + '%');
    })
});