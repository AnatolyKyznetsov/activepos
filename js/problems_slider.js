document.addEventListener('DOMContentLoaded', () => {
    const problemSlidersInit = () => {
        const blocks = document.querySelectorAll('.js-problemWrapper');
        
        if (!window.Swiper) {
            return false;
        }
        
        blocks.forEach(block => {
            const slider = block.querySelector('.js-problemSlider');
            const thumbs = block.querySelectorAll('.js-problemThumb');
            
            if (!slider) {
                return false;
            }

            const breakpoints = {};

            breakpoints[window.media.md] = {
                autoHeight: true,
                height: block.offsetHeight,
                direction: 'vertical',
            }

            const swiper = new Swiper(slider, {
                slidesPerView: 1,
                spaceBetween: 32,
                pagination: {
                    el: '.js-problemSilderPagination',
                },
                scrollbar: {
                    el: '.js-problemSilderScroll',
                    draggable: true,
                },
                mousewheel: {
                    invert: false,
                    thresholdDelta: 25,
                },
                breakpoints,
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
        });
    }

    problemSlidersInit();
});