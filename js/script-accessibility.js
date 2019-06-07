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
});
