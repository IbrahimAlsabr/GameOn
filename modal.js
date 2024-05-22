function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const closeBtn = document.querySelector(".close");
const bground = document.querySelector(".bground");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

closeBtn.onclick = function () {
    bground.style.display = "none";
    const form = document.querySelector('form[name="reserve"]');
    const confirmationMessage = document.querySelector(".confirmation-message");
    form.style.display = "block";
    confirmationMessage.style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form[name="reserve"]');
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validate()) {
            showConfirmationMessage();
        }
    });
});

function validate() {
    clearErrors();

    const firstName = document.getElementById("first").value.trim();
    const lastName = document.getElementById("last").value.trim();
    const email = document.getElementById("email").value.trim();
    const quantity = document.getElementById("quantity").value;
    const locations = document.getElementsByName("location");
    const birthdate = document.getElementById("birthdate").value.trim();
    const terms = document.getElementById("checkbox1").checked;

    let isValid = true;

    // Validate first name
    if (firstName.length < 2) {
        showError(
            "first",
            "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
        );
        isValid = false;
    }

    // Validate last name
    if (lastName.length < 2) {
        showError(
            "last",
            "Veuillez entrer 2 caractères ou plus pour le champ du nom."
        );
        isValid = false;
    }

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        showError("email", "Veuillez entrer une adresse e-mail valide.");
        isValid = false;
    }

    // Validate birthdate
    if (!birthdate) {
        showError("birthdate", "Vous devez entrer votre date de naissance.");
        isValid = false;
    }

    // Validate quantity
    if (isNaN(quantity) || quantity < 0 || quantity > 99) {
        showError("quantity", "Veuillez entrer un nombre valide de concours.");
        isValid = false;
    }

    // Validate location
    let locationSelected = false;
    for (let i = 0; i < locations.length; i++) {
        if (locations[i].checked) {
            locationSelected = true;
            break;
        }
    }
    if (!locationSelected) {
        showError("location1", "Vous devez choisir une option.");
        isValid = false;
    }

    // Validate terms and conditions
    if (!terms) {
        showError(
            "checkbox1",
            "Vous devez vérifier que vous acceptez les termes et conditions."
        );
        isValid = false;
    }

    return isValid;
}

function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    inputElement.parentNode.insertBefore(
        errorElement,
        inputElement.nextSibling
    );
}

function clearErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach((error) => error.remove());
}

function showConfirmationMessage() {
    const form = document.querySelector('form[name="reserve"]');
    form.style.display = "none";
    const modalBody = document.querySelector(".modal-body");
    const confirmationMessage = document.createElement("div");
    confirmationMessage.className = "confirmation-message";
    confirmationMessage.textContent = "Merci ! Votre réservation a été reçue.";
    modalBody.appendChild(confirmationMessage);
    form.reset();
}
