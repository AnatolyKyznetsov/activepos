document.addEventListener('DOMContentLoaded', () => {
    const certificateSilderInit = () => {
        if (!window.Swiper) {
            return false;
        }

        const breakpoints = {};

        breakpoints[window.media.md] = {
            slidesPerView: 4,
            spaceBetween: 16,
        }

        new Swiper('.js-certificateSilder', {
            mousewheel: {
                forceToAxis: true,
                invert: false,
                thresholdDelta: 25,
            },
            navigation: {
                nextEl: '.js-certificateSilderNext',
                prevEl: '.js-certificateSilderPrev',
            },
            pagination: {
                el: '.js-certificateSilderPagination',
            },
            slidesPerView: 1,
            spaceBetween: 0,
            breakpoints,
        });
    }

    certificateSilderInit();
});