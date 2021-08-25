

$(document).ready(function(){
    var windowWidth = 0;
    windowWidthFun();
    $(window).resize(function(){
        windowWidthFun();
    })


    $('header > div > div nav').hover(function(){
        pcMenu(true);
    },function(){
        pcMenu(false);
    });
    mobileMenu();

    function windowWidthFun(){
        if($('body').hasClass('scrollPage')){
            windowWidth = $(window).width();
        }else{
            windowWidth = $(window).width() + 17;
        }
    }
  
    function pcMenu(a){
        if(windowWidth > 1280){
            if(a){
                $('header').addClass('active');
                $('header > div > div nav > ul > li ul').stop().slideDown();
            }else{
                $('header').removeClass('active');
                $('header > div > div nav > ul > li ul').stop().slideUp();
            }
        }
    }

    
    function mobileMenu(){
        $('.menuBtn').click(function(){
            if(windowWidth < 1280){
                $('header > div > div nav').toggleClass('active');
            }
        });
    
        $('header > div > div nav').on('mousewheel touchmove',function(e){
            if(windowWidth < 1280){
                e.preventDefault()
            }
        })

        $('header > div > div nav > ul > li > a').click(function(e){
            if(windowWidth < 1280){
                e.preventDefault()
                $(this).next().slideToggle();
            }
        })
    }
});