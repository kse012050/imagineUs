$(document).ready(function(){
    history.scrollRestoration = "manual";
    var scrollSelector;
    var scrollSelectorArray = [];
    mainResponsiveSelector();
    $(window).resize(function(){
        mainResponsiveSelector();
    })
    
    for(var i = 0 ; i < scrollSelector.length; i++){
        // console.log(scrollSelector[i]);
    }
    var delta = 0;
    var offsetTop = 0;
    var scrollIdx = 0;
    var logoBlack;
    var menuBlack;
    var touchStartX;
    var touchStartY;
    var touchEndX;
    var touchEndY;
    var touchCompareX;
    var touchCompareY;

    $('body.scrollPage').on('touchstart',function(e){
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
    })

    $('body.scrollPage').on('mousewheel touchend',function(e){
        if($('html, body').is(':animated')){
            return;
        }
        console.log(e.type);
        if(e.type == 'mousewheel'){
            delta = e.originalEvent.wheelDelta;
        }else if(e.type == 'touchend'){
            touchCompareX = Math.abs(touchStartX - e.changedTouches[0].clientX);
            touchCompareY = Math.abs(touchStartY - e.changedTouches[0].clientY);
            if(touchCompareX < touchCompareY){
                delta = e.changedTouches[0].clientY - touchStartY
            }
        }
        
        if(delta > 0 && scrollIdx > 0 && (scrollSelectorArray[scrollIdx].scrollTop() < 10)){
            scrollIdx--;
            logoColor(false);
        }else if(delta < 0 && scrollIdx < scrollSelectorArray.length - 1){
            logoColor(true);
            scrollIdx++;
        }

        offsetTop = scrollSelectorArray[scrollIdx].offset().top;

        $('html, body').stop().animate({scrollTop: offsetTop},800); 
    })

    $(window).scroll(function(){
        var scrollProgress = $(window).scrollTop() / ($(document).height() - $(window).height()) * 100;
        $('.scrollProgress > div > div').css('height',scrollProgress + '%');
    })

    function mainResponsiveSelector(){
        if(windowWidth > 1280){
            scrollSelector = $('[data-scroll = "all"] , [data-scroll = "pc"] > *');
        }else{
            scrollSelector = $('[data-scroll = "all"] , [data-scroll = "pc"]');
        }
        scrollSelectorArray.splice(0,scrollSelectorArray.length)

        $.each(scrollSelector , function(idx){
            scrollSelectorArray.push($(this));
            if($(this).attr('data-scroll') == 'all'){
                logoBlack = idx;
            }else if($(this).attr('data-scroll') == 'menuColor'){
                menuBlack = idx;
            }
        });
    }

    function logoColor(a){
        if(logoBlack == scrollIdx){
            if(a){
                $('header').addClass('black');
            }else{
                $('header').removeClass('black');
            }
        }
        if(menuBlack == scrollIdx){
            if(a){
                $('header > div > div , .scrollProgress').addClass('black');
            }else{
                $('header > div > div , .scrollProgress').removeClass('black');
            }
        }
    }
});