window.addEventListener('DOMContentLoaded', function () {
    let btnFeedback = document.getElementById('feedback-btn');
    let elFeedback = document.getElementById('feedback');
    let btnCloseFeedback = document.getElementById("btn-close-feedback");
    let inputFeedbackName = document.getElementById('feedback-name');

    btnFeedback.addEventListener('click', function (event) {
        event.preventDefault();
        elFeedback.classList.add('modal--show');
        elFeedback.classList.remove('modal--hide');
        inputFeedbackName.focus();
    });

    btnCloseFeedback.addEventListener('click', function () {
        elFeedback.classList.remove('modal--show');
        elFeedback.classList.add('modal--hide');
    });

    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 27) {
            elFeedback.classList.remove('modal--show');
            elFeedback.classList.add('modal--hide');
        }
    });

    // slide-show
    let slides = document.querySelectorAll('.slide');
    let dots = document.querySelectorAll('.slider-dot-item');
    let backgrounds = {
        0: '#849D8F',
        1: '#8996A6',
        2: '#9D8B84'
    };

    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', function () {
            removeActiveStatusFromDots();
            dots[i].classList.add('slider-dot-item--current');
            removeActiveStatusFromSlides();
            slides[i].classList.add('slide--active');
            document.body.style.backgroundColor = backgrounds[i];
        });
    }

    function removeActiveStatusFromDots() {
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('slider-dot-item--current');
        }
    }

    function removeActiveStatusFromSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('slide--active');
        }
    }
});
