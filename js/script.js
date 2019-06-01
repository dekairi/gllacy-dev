window.addEventListener('DOMContentLoaded', function () {
    let btnFeedback = document.querySelector('#feedback-btn');
    let elFeedback = document.querySelector('#feedback');
    let btnCloseFeedback = document.querySelector("#btn-close-feedback");

    btnFeedback.addEventListener('click', function (event) {
        event.preventDefault();
        elFeedback.classList.add('modal--show');
        elFeedback.classList.remove('modal--hide');
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
});
