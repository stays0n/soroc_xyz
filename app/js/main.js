const main = () => {
    const BREAKPOINT_768PX = 768;
    const header = document.body.querySelector('.header');
    const work = document.body.querySelector('.work');
    const workSwiperSlider = work.querySelector('.work__swiper');

    const handleWindowResize = () => {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const headerHeight = header.offsetHeight;
        const workSwiperSliderHeight = workSwiperSlider.offsetHeight;

        work.style.height = windowHeight - headerHeight + 'px';

        if (workSwiperSliderHeight > windowHeight - headerHeight) {
            return (work.style.alignItems = 'flex-start');
        }

        if (windowWidth <= BREAKPOINT_768PX) {
            return (work.style.alignItems = 'flex-end');
        }

        return (work.style.alignItems = 'center');
    };

    class WorkSwiper extends Swiper {
        constructor(...args) {
            super(...args);
            this.nextButton = this.navigation.nextEl;
            this.lastSlideIndex = this.slides.length - 1;
        }

        slidesCount() {
            const lastSlide = this.slides[this.slides.length - 1];

            if (window.innerWidth > BREAKPOINT_768PX) {
                if (lastSlide.hasAttribute('data-fake')) {
                    this.removeSlide(this.slides.length - 1);
                }
            }
            if (window.innerWidth <= BREAKPOINT_768PX) {
                if (!lastSlide.hasAttribute('data-fake')) {
                    this.appendSlide(
                        '<div class="swiper-slide" data-fake></div>',
                    );
                }
            }
        }
    }

    const workSwiper = new WorkSwiper('.work__swiper', {
        navigation: {
            nextEl: '.scrolldown__icon',
        },
        direction: 'horizontal',
        mousewheel: {
            invert: false,
        },
        freeMode: {
            enabled: true,
            sticky: true,
        },
        slidesPerView: 'auto',
        grabCursor: true,
        breakpoints: {
            0: {
                spaceBetween: 16,
            },
            [BREAKPOINT_768PX + 1]: {
                spaceBetween: 0,
            },
        },
        on: {
            reachEnd: function () {
                setTimeout(() => (this.nextButton.disabled = false));
                this.nextButton.onclick = () => this.slideTo(0);

                if (window.innerWidth <= BREAKPOINT_768PX) {
                    this.slideTo(this.lastSlideIndex);
                }
            },
            reachBeginning: function () {
                this.nextButton.onclick = null;
            },
        },
    });

    window.addEventListener('resize', () => {
        handleWindowResize();
        workSwiper.slidesCount();
    });

    window.addEventListener(
        'load',
        () => {
            handleWindowResize();
            workSwiper.slidesCount();
            document.body.classList.remove('hidden');
        },
        { once: true },
    );
};

main();
