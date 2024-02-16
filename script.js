document.addEventListener('DOMContentLoaded', () => {
    const initCookiePolicy = () => {
        const block = document.querySelector('.js-cookiePolisy');
        
        if (!block) {
            return false;
        }

        const close = block.querySelector('.js-cookiePolisyClose');

        close?.addEventListener('click', () => {
            block.classList.add('is-hidden');

            setTimeout(() => {
                block.remove();
            }, 1000);
        });
    }

    const cardProductVideoInit = () => {
        const cards = document.querySelectorAll('.js-cardProduct');

        cards.forEach(card => {
            const head = card.querySelector('.js-cardProductHead');
            const video = card.querySelector('.js-cardProductVideo');
            
            if (!head || !video) {
                return false;
            }

            const iframe = video.querySelector('iframe');

            head.addEventListener('click', e => {
                if (e.target != video) {
                    video.classList.add('is-active');
                }
            });

            video.addEventListener('click', () => {
                video.classList.remove('is-active');

                if (iframe) {
                    video.append(iframe);
                }
            });
        });
    }

    const headerHideInit = () => {
        const header = document.querySelector('.js-header');
        let prevScroll = window.scrollY;

        if (!header) {
            return false;
        }

        document.addEventListener('scroll', () => {
            if (header.classList.contains('is-opened')) {
                return false;
            }

            if (prevScroll < window.scrollY) {
                header.classList.add('is-hidden');
            } else {
                header.classList.remove('is-hidden');
            }

            prevScroll = window.scrollY;
        });
    }

    const tabsInit = () => {
        const tabs = document.querySelectorAll('.js-tabs');

        const elementState = (elements, activeIndex) => {
            elements.forEach((element, index) => {
                element.classList.remove('is-active');

                if (activeIndex === index) {
                    element.classList.add('is-active');
                }
            });
        }

        const itemsEvent = (items, contents) => {
            if (!items || !contents) {
                return false;
            }

            items.forEach((item, index) => {
                item.addEventListener('click', () => {
                    elementState(items, index);
                    elementState(contents, index);
                });
            });
        }

        tabs.forEach(block => {
            const items = block.querySelectorAll('.js-tabsItem');
            const contents =  block.querySelectorAll('.js-tabsContent');

            itemsEvent(items, contents);
        });
    }

    const showImgInit = () => {
        const buttons = document.querySelectorAll('.js-showImg');

        buttons.forEach(button => {
            const src = button.dataset.src;

            if (!src) {
                return false;
            }

            button.addEventListener('click', () => {
                const block = document.createElement('div');
                const img = document.createElement('img');

                block.addEventListener('click', e => {
                    if (e.target == block) {
                        block.remove();
                    }
                });

                block.className = 'fullscreen-img';
                img.src = src;

                block.append(img);
                document.body.append(block);
            });
        });
    }

    const burgerInit = () => {
        const header = document.querySelector('.js-header');
        const menu = document.querySelector('.js-headerMenu');
        
        if (!header || !menu) {
            return false;
        }

        const button = header.querySelector('.js-headerBurger');

        const closeMenu = () => {
            header.classList.remove('is-opened');
            menu.style.maxHeight = '';
        }

        button?.addEventListener('click', () => {
            const isActive = header.classList.toggle('is-opened');
            menu.style.maxHeight = isActive ? `${menu.scrollHeight}px` : '';
        });

        document.addEventListener('click', e => {
            if ((e.target.closest('.js-closeBurger') || 
            !e.target.closest('.js-headerMenu') && 
            !e.target.closest('.js-headerBurger'))) {
                closeMenu();
            }
        });

        window.addEventListener('resize', closeMenu);
    }

    const problemsButtonsScrollInit = () => {
        const buttons = document.querySelector('.js-problemsButtons');

        if (!buttons) {
            return false;
        }
    
        const parent = buttons.closest('.js-problemsButtonsParent');
    
        if (!parent) {
            return false;
        }
    
        parent.classList.add('is-start');
    
        buttons.addEventListener('scroll', () => {
            if (Math.ceil(buttons.scrollLeft + buttons.offsetWidth) >= buttons.scrollWidth) {
                parent.classList.add('is-end');
            } else if (buttons.scrollLeft == 0) {
                parent.classList.add('is-start');
            } else {
                parent.classList.remove('is-end');
                parent.classList.remove('is-start');
            }
        });
    }

    burgerInit();
    showImgInit();
    tabsInit();
    cardProductVideoInit();
    initCookiePolicy();
    headerHideInit();
    problemsButtonsScrollInit();
});