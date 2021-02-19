const swiper = new Swiper('.swiper-container', {
  loop: true,
  slidesPerView: 1,
  width: 320,

  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

$(document).on('scroll', function() {
    if ($(window).outerWidth(true) >= 768) {
        let scrollTop = $(document).scrollTop(),
            bottomPoint = $('.static-head__logo').offset().top + $('.static-head__logo').height();

            scrollTop >= bottomPoint ? $('.scroll-head').fadeIn(500) : $('.scroll-head').fadeOut();
    }
});

$('a[href^="#"]').on('click tap', function() {
    let href = $(this).attr('href');

    $('html, body').animate({ scrollTop: `${$(href).offset().top}px` });
});

/*$('.circle-sale').on({
    'mouseenter': function() {
        $(this).addClass('animate__animated animate__swing');
    },
    'mouseleave': function() {
        $(this).removeClass('animate__animated animate__swing');
    }
});*/

let angle = 0,
    timerId = '';

function clear(timerId) {
    console.log('ddd');
    clearInterval(timerId);
}

$('.circle-sale').on({
    'mouseenter': function() {
        if (!$(this).hasClass('lock')) {
            $(this).addClass('lock');

            let currentAngle = $(this).find('span').css('transform'),
                matrix = currentAngle.split('(')[1].split(')')[0].split(','),
                cos = matrix[0],
                sin = matrix[1],
                counter = 0;

                angle = Math.round(Math.asin(sin) * (180/Math.PI))

            if (cos < 0) {
                addAngle = 90 - Math.round(Math.asin(sin) * (180/Math.PI));
                angle = 90 + addAngle;        
            }

            if ($(this).data('angle') === '') $(this).data('angle', angle);

            let animateAngle = [- (Math.abs(angle) + 20), angle, Math.abs(angle) + 20, angle];

            timerId = setInterval(() => {
                if (counter < animateAngle.length) {
                    $(this).find('span').css('transform', `rotate(${animateAngle[counter]}deg)`);
                    counter++;
                } else {
                    clear(timerId);
                }
            }, 200);
        }
    }, 
    'mouseleave': function() {
        $(this).find('span').css('transform', `rotate(${$(this).data('angle')}deg)`);        
        $(this).removeClass('lock').removeData('angle');
    }
});