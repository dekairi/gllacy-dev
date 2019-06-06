window.addEventListener("DOMContentLoaded", function () {
    let btnFeedback = document.getElementById("feedback-btn");
    let elFeedback = document.getElementById("feedback");
    let btnCloseFeedback = document.getElementById("btn-close-feedback");
    let inputFeedbackName = document.querySelectorAll(".modal-feedback input")[0];
    let elOverlay = document.getElementById("overlay");

    btnFeedback.addEventListener("click", function (event) {
        event.preventDefault();
        elFeedback.classList.add("modal--show");
        elFeedback.classList.remove("modal--hide");
        elOverlay.classList.add("overlay--show");
        inputFeedbackName.focus();
    });

    btnCloseFeedback.addEventListener("click", function () {
        elFeedback.classList.remove("modal--show");
        elFeedback.classList.add("modal--hide");
        elOverlay.classList.remove("overlay--show");
    });

    document.addEventListener("keydown", function (event) {
        if (event.keyCode === 27) {
            elFeedback.classList.remove("modal--show");
            elFeedback.classList.add("modal--hide");
        }
    });

    // slide-show
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".slider-dot-item");
    let backgrounds = {
        0: '#849D8F',
        1: '#8996A6',
        2: '#9D8B84'
    };

    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function () {
            removeActiveStatusFromDots();
            dots[i].classList.add("slider-dot-item--current");
            removeActiveStatusFromSlides();
            slides[i].classList.add("slide--active");
            document.body.style.backgroundColor = backgrounds[i];
        });
    }

    function removeActiveStatusFromDots() {
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("slider-dot-item--current");
        }
    }

    function removeActiveStatusFromSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("slide--active");
        }
    }

    //map
    ymaps.ready(init);
    function init() {
        let myMap = new ymaps.Map("map", {
                center: [59.939300, 30.329350],
                zoom: 16,
                controls: []
            }, {
                searchControlProvider: "yandex#search"
            }),

            MyIconContentLayout = new ymaps.templateLayoutFactory.createClass(
                "<div style='color: #FFFFFF; font-weight: bold;'>$[properties.iconContent]</div>"
            ),

            myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
                hintContent: "",
                balloonContent: ""
            }, {
                iconLayout: "default#image",
                iconImageHref: "img/icons/interactive-map-pin.svg",
                iconImageSize: [218, 142],
                iconImageOffset: [-40, -140]
            });

        myMap.geoObjects.add(myPlacemark);
    }

    //radio buttons
    let radioGroup = function (domNode) {
        this.domNode = domNode;
        this.radioButtons = [];
        this.firstRadioButton  = null;
        this.lastRadioButton   = null;
    };

    radioGroup.prototype.init = function () {
        if (!this.domNode.getAttribute('role')) {
            this.domNode.setAttribute('role', 'radiogroup');
        }

        let elRadioButtons = this.domNode.querySelectorAll('[role=radio]');

        for (let i = 0; i < elRadioButtons.length; i++) {
            let elRadioButton = new radioButton(elRadioButtons[i], this);
            elRadioButton.init();
            this.radioButtons.push(elRadioButton);

            if (!this.firstRadioButton) {
                this.firstRadioButton = elRadioButton;
            }
            this.lastRadioButton = elRadioButton;
        }
        this.firstRadioButton.domNode.tabIndex = 0;
    };

    radioGroup.prototype.setChecked  = function (currentItem) {
        for (let i = 0; i < this.radioButtons.length; i++) {
            let elRadioButton = this.radioButtons[i];
            elRadioButton.domNode.setAttribute('aria-checked', 'false');
            elRadioButton.domNode.tabIndex = -1;
        }
        currentItem.domNode.setAttribute('aria-checked', 'true');
        currentItem.domNode.tabIndex = 0;
        currentItem.domNode.focus();
    };

    radioGroup.prototype.setCheckedToPreviousItem = function (currentItem) {
        let index;

        if (currentItem === this.firstRadioButton) {
            this.setChecked(this.lastRadioButton);
        }
        else {
            index = this.radioButtons.indexOf(currentItem);
            this.setChecked(this.radioButtons[index - 1]);
        }
    };

    radioGroup.prototype.setCheckedToNextItem = function (currentItem) {
        let index;

        if (currentItem === this.lastRadioButton) {
            this.setChecked(this.firstRadioButton);
        }
        else {
            index = this.radioButtons.indexOf(currentItem);
            this.setChecked(this.radioButtons[index + 1]);
        }
    };

    let radioButton = function (domNode, groupObj) {
        this.domNode = domNode;
        this.radioGroup = groupObj;

        this.keyCode = Object.freeze({
            'RETURN': 13,
            'SPACE': 32,
            'END': 35,
            'HOME': 36,
            'LEFT': 37,
            'UP': 38,
            'RIGHT': 39,
            'DOWN': 40
        });
    };

    radioButton.prototype.init = function () {
        this.domNode.tabIndex = -1;
        this.domNode.setAttribute('aria-checked', 'false');

        this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
        this.domNode.addEventListener('click', this.handleClick.bind(this));
        this.domNode.addEventListener('focus', this.handleFocus.bind(this));
        this.domNode.addEventListener('blur', this.handleBlur.bind(this));
    };

    radioButton.prototype.handleKeydown = function (event) {
        let tgt = event.currentTarget,
            flag = false,
            clickEvent;

        switch (event.keyCode) {
            case this.keyCode.SPACE:
            case this.keyCode.RETURN:
                this.radioGroup.setChecked(this);
                flag = true;
                break;

            case this.keyCode.UP:
                this.radioGroup.setCheckedToPreviousItem(this);
                flag = true;
                break;

            case this.keyCode.DOWN:
                this.radioGroup.setCheckedToNextItem(this);
                flag = true;
                break;

            case this.keyCode.LEFT:
                this.radioGroup.setCheckedToPreviousItem(this);
                flag = true;
                break;

            case this.keyCode.RIGHT:
                this.radioGroup.setCheckedToNextItem(this);
                flag = true;
                break;

            default:
                break;
        }

        if (flag) {
            event.stopPropagation();
            event.preventDefault();
        }
    };

    radioButton.prototype.handleClick = function (event) {
        this.radioGroup.setChecked(this);
    };

    radioButton.prototype.handleFocus = function (event) {
        this.domNode.classList.add('focus');
    };

    radioButton.prototype.handleBlur = function (event) {
        this.domNode.classList.remove('focus');
    };
});
