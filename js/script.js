window.media = { lg: 1920, md: 1200, sm: 520 }

document.addEventListener('DOMContentLoaded', () => {
    const initCookiePolicy = () => {
        const block = document.querySelector('.js-cookiePolisy');
        const cookieName = BX.message('COOKIE_PREFIX') + '_COOKIE_POLICY_ACCEPTED';
        
        if (!block || BX.getCookie(cookieName)) {
            return false;
        }

        const close = block.querySelector('.js-cookiePolisyClose');

        close?.addEventListener('click', () => {
            block.classList.remove('is-active');
            BX.setCookie(cookieName, true, { expires: 31536000 });

            setTimeout(() => {
                block.remove();
            }, 1000);
        });

        block.classList.add('is-active');
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

            if (window.scrollY <= 0) {
                header.classList.remove('is-hidden');
                prevScroll = 0;

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
            e.target.closest('.js-headerLink') || 
            !e.target.closest('.js-headerMenu') && 
            !e.target.closest('.js-headerBurger'))) {
                closeMenu();
            }
        });

        window.addEventListener('resize', closeMenu);
    }

    const tabsScrollInit = () => {
        const buttons = document.querySelectorAll('.js-tabButtons');

        buttons.forEach(button => {
            const parent = button.closest('.js-tabWrapper');
        
            if (!parent) {
                return false;
            }
        
            parent.classList.remove('is-end');
            parent.classList.add('is-start');
            window.addEventListener('resize', tabsScrollInit);

            if (button.offsetWidth == button.scrollWidth) {
                parent.classList.add('is-end');
                return false;
            }
        
            button.addEventListener('scroll', () => {
                if (Math.ceil(button.scrollLeft + button.offsetWidth) >= button.scrollWidth) {
                    parent.classList.add('is-end');
                } else if (button.scrollLeft <= 0) {
                    parent.classList.add('is-start');
                } else {
                    parent.classList.remove('is-end');
                    parent.classList.remove('is-start');
                }
            });
        });
    }

    const targetInViewport = target => {
        if (!target) {
            return false;
        }
    
        const rect = target.getBoundingClientRect();
    
        const targetPosition = {
            top: window.scrollY + rect.top,
            bottom: window.scrollY + rect.bottom
        }
    
        const windowPosition = {
            top: window.scrollY,
            bottom: window.scrollY + document.documentElement.clientHeight
        };
        
        return targetPosition.bottom > windowPosition.top && targetPosition.top < windowPosition.bottom
    }

    const showOnViewport = () => {
        const elements = document.querySelectorAll('.js-viewportShow');

        const showElement = element => {
            if (!targetInViewport(element) || 
                element.classList.contains('in-viewport')) {
                return false;
            }

            const delay = Number(element.dataset.delay) || 1;

            setTimeout(() => {
                element.style.opacity = 1;
            }, 300 * delay);

            element.classList.add('in-viewport')
        }

        elements.forEach(element => {
            window.addEventListener('scroll', () => {
                showElement(element);
            });

            showElement(element);
        });
    }

    const menuRolledInit = () => {
        const menu = document.querySelector('.js-headerMenu');

        if (!menu || (menu.offsetWidth == menu.scrollWidth)) {
            return false;
        }

        const button = document.querySelector('.js-menuRolled');

        if (!button) {
            return false;
        }

        const rollLastLink = () => {
            const links = menu.querySelectorAll('.js-headerLink:not(.is-rolled)')
            links[links.length - 1].classList.add('is-rolled');

            if (menu.offsetWidth != menu.scrollWidth) {
                rollLastLink();
            }
        }

        button.classList.add('is-shown');

        button.addEventListener('click', () => {
            const links = menu.querySelectorAll('.js-headerLink');

            links.forEach(link => {
                if (link.classList.contains('is-rolled')) {
                    link.classList.remove('is-rolled');
                } else {
                    link.classList.add('is-rolled');
                }
            });

            button.classList.toggle('is-opened');
        });

        rollLastLink();
    }

    tabsScrollInit();
    showOnViewport();
    menuRolledInit();
    burgerInit();
    showImgInit();
    tabsInit();
    cardProductVideoInit();
    initCookiePolicy();
    headerHideInit();
});