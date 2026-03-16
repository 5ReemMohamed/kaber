window.onload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navbarSupportedContent');

    // scroll effect
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    navbarCollapse?.addEventListener("show.bs.collapse", () => navbar.classList.add("show-bg"));
    navbarCollapse?.addEventListener("hide.bs.collapse", () => navbar.classList.remove("show-bg"));

    if (navLinks && navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const isNavbarVisible = window.getComputedStyle(navbarCollapse).display !== 'none';

                if (isNavbarVisible && window.innerWidth < 992) {
                    const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (collapseInstance) {
                        collapseInstance.hide();
                    }
                }
            });
        });
    }
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        counter.innerText = "0";

        const updateCounter = () => {
            const target = +counter.getAttribute("data-target");
            const c = +counter.innerText;

            const increment = target / 200;

            if (c < target) {
                counter.innerText = `${Math.ceil(c + increment)}`;
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    });
    const swiper = new Swiper(".testimonialSwiper", {

        // عدد الكروت
        slidesPerView: 3,
        spaceBetween: 30,

        // loop infinite
        loop: true,

        // autoplay
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },

        // grab cursor
        grabCursor: true,

        // drag by mouse
        simulateTouch: true,

        // smooth speed
        speed: 900,

        // responsive
        breakpoints: {

            0: {
                slidesPerView: 1
            },

            576: {
                slidesPerView: 1
            },

            768: {
                slidesPerView: 2
            },

            992: {
                slidesPerView: 2
            },

            1200: {
                slidesPerView: 3
            }

        }

    });
    const faq = document.querySelectorAll(".faq-item");

    faq.forEach(item => {

        item.querySelector(".faq-question").addEventListener("click", () => {

            item.classList.toggle("active");

        });

    });
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
    AOS.init({ offset: 120, duration: 1000, easing: 'ease-in-out' });
});
