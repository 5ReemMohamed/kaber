window.onload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navbarSupportedContent');
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

        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        grabCursor: true,
        simulateTouch: true,
        speed: 900,
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
    const form = document.querySelector("form");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");
    const message = document.getElementById("message");
    const inputs = [name, email, phone, address, message];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{9,15}$/;
    function validateInput(input, type = "text") {
        const error = input.nextElementSibling;

        input.classList.remove("valid", "invalid");

        if (input.value.trim() === "") {
            error.textContent = "هذا الحقل مطلوب";
            input.classList.add("invalid");
            return false;
        }

        if (type === "email" && !emailRegex.test(input.value)) {
            error.textContent = "البريد الإلكتروني غير صحيح";
            input.classList.add("invalid");
            return false;
        }

        if (type === "phone" && !phoneRegex.test(input.value)) {
            error.textContent = "رقم الهاتف غير صحيح";
            input.classList.add("invalid");
            return false;
        }
        error.textContent = "";
        input.classList.add("valid");
        return true;
    }
    name.addEventListener("input", () => validateInput(name));
    address.addEventListener("input", () => validateInput(address));
    message.addEventListener("input", () => validateInput(message));

    email.addEventListener("input", () => validateInput(email, "email"));
    phone.addEventListener("input", () => validateInput(phone, "phone"));

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        if (!validateInput(name)) isValid = false;
        if (!validateInput(email, "email")) isValid = false;
        if (!validateInput(phone, "phone")) isValid = false;
        if (!validateInput(address)) isValid = false;
        if (!validateInput(message)) isValid = false;

        if (isValid) {

            Swal.fire({
                icon: "success",
                title: "تم الإرسال",
                text: "تم إرسال رسالتك بنجاح",
                confirmButtonText: "حسناً"
            }).then(() => {

                let whatsappMessage =
                    `الاسم: ${name.value}
البريد الإلكتروني: ${email.value}
رقم الهاتف: ${phone.value}
العنوان: ${address.value}
الرسالة: ${message.value}`;

                let encodedMessage = encodeURIComponent(whatsappMessage);

                window.open(`https://wa.me/966541683466?text=${encodedMessage}`, "_blank");

                form.reset();
                inputs.forEach(input => {
                    input.classList.remove("valid", "invalid");
                    input.nextElementSibling.textContent = "";
                });
            });
        }
    });
    AOS.init({ offset: 120, duration: 1000, easing: 'ease-in-out' });
});
