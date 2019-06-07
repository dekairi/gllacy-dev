window.addEventListener("DOMContentLoaded", function () {
    let chbFillers = document.querySelectorAll(".filter-fillers .checkbox");

    for (let i = 0; i < chbFillers.length; i++) {
        chbFillers[i].addEventListener("keydown", function (evt) {
            if (evt.key === " ") {
                evt.preventDefault();
                changeCheckbox(chbFillers[i], chbFillers[i].querySelector("input"));
            }
        });
    }

    function changeCheckbox(checkbox, input) {
        switch (checkbox.getAttribute("aria-checked")) {
            case "true":
                checkbox.setAttribute("aria-checked", "false");
                input.removeAttribute("checked");
                break;
            case "false":
                checkbox.setAttribute("aria-checked", "true");
                input.setAttribute("checked", "checked");
                break;
        }
    }

    let radioFat = document.querySelectorAll(".filter-fat .radio");

    for (let i = 0; i < radioFat.length; i++) {
        radioFat[i].addEventListener("keydown", function (evt) {
            if (evt.key === "ArrowRight") {
                evt.preventDefault();
                if (i !== radioFat.length - 1) {
                    changeCurrentRadioButton(radioFat[i], radioFat[i].querySelector("input"));
                    setFocusOnNextOrPreviousItem(radioFat[i + 1], radioFat[i + 1].querySelector("input"));
                }
            }
            if (evt.key === "ArrowLeft") {
                evt.preventDefault();
                if (i !== 0) {
                    changeCurrentRadioButton(radioFat[i], radioFat[i].querySelector("input"));
                    setFocusOnNextOrPreviousItem(radioFat[i - 1], radioFat[i - 1].querySelector("input"));
                }
            }
        });
    }

function changeCurrentRadioButton(elRadioButton, elRadioInput) {
        elRadioButton.setAttribute("tabindex", "-1");
        elRadioButton.setAttribute("aria-checked", "false");
        elRadioInput.removeAttribute("checked");
    }

    function setFocusOnNextOrPreviousItem(elNext, elRadioInput) {
        elNext.setAttribute("tabindex", "0");
        elNext.setAttribute("aria-checked", "true");
        elNext.focus();
        elRadioInput.setAttribute("checked", "checked");
    }
});
