document.addEventListener('DOMContentLoaded', () => {
    const solutionsSilderInit = () => {
        if (!window.Swiper) {
            return false;
        }

        const mousewheel = {
            forceToAxis: true,
            invert: false,
            thresholdDelta: 25,
        }

        const thumbs = new Swiper('.js-solutionsSilderThumbs', {
            mousewheel,
            navigation,
            watchSlidesProgress: true,
            freeMode: true,
            spaceBetween: 16,
            slidesPerView: 'auto',
        });

        new Swiper('.js-solutionsSilder', {
            mousewheel,
            navigation: {
                nextEl: '.js-solutionsSilderNext',
                prevEl: '.js-solutionsSilderPrev',
            },
            scrollbar: {
                el: '.js-solutionsSilderScroll',
                draggable: true,
            },
            slidesPerView: 1,
            spaceBetween: 16,
            thumbs: {
                swiper: thumbs,
            }
        });
    }

    solutionsSilderInit();
});