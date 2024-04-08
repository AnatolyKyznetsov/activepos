document.addEventListener('DOMContentLoaded', () => {
    const possibilitiesSliderInit = () => {
        if (!window.Swiper) {
            return false;
        }
        
        const thumbs = document.querySelectorAll('.js-possibilitiesThumb');

        const swiper = new Swiper('.js-possibilitiesSlider', {
            spaceBetween: 32,
            pagination: {
                el: '.js-possibilitiesSilderPagination',
            },
            mousewheel: {
                forceToAxis: true,
                invert: false,
                thresholdDelta: 25,
            },
        });

        thumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                swiper.slideTo(index);
            });
        });

        swiper.on('slideChange', e => {
            thumbs.forEach((thumb, index) => {
                if (index === e.activeIndex) {
                    thumb.classList.add('is-active');
                } else {
                    thumb.classList.remove('is-active');
                }
            });
        });
    }

    possibilitiesSliderInit();
});