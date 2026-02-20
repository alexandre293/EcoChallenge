// =======================
// AIDE – OUVERTURE / FERMETURE
// =======================

const aideBtn = document.getElementById("aide");
const helpPanel = document.getElementById("helpPanel");
const helpClose = document.getElementById("helpClose");

// Ouvrir le panel aide
aideBtn.addEventListener("click", () => {
    helpPanel.classList.add("active");
});

// Fermer avec la croix
helpClose.addEventListener("click", () => {
    helpPanel.classList.remove("active");
});

// Fermer en cliquant sur le fond
helpPanel.addEventListener("click", (e) => {
    if (e.target === helpPanel) {
        helpPanel.classList.remove("active");
    }
});


// =======================
// ENVOI EMAIL (AIDE)
// =======================

function sendEmail() {
    const userMessage = document.getElementById("userQuestion").value;

    if (userMessage.trim() === "") {
        alert("Veuillez entrer une question avant d'envoyer.");
        return;
    }

    const email = "eco.challenge06400@gmail.com";
    const subject = "Demande d'aide depuis le site";
    const body =
        "Bonjour,\n\nVoici ma question :\n" +
        userMessage +
        "\n\nMerci d'avance !";

    window.location.href =
        `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}


// =======================
// BOUTON RETOUR EN HAUT
// =======================

const topButton = document.getElementById("topButton");

// Affiche / cache le bouton
window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 300) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
});

// Remonter en haut
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach((btn) => {
        btn.addEventListener("click", () => {
            const item = btn.closest(".faq-item");
            const answer = item.querySelector(".faq-answer");

            // Ferme les autres
            document.querySelectorAll(".faq-item").forEach((other) => {
                if (other !== item) other.classList.remove("open");
            });

            // Toggle celui-ci
            item.classList.toggle("open");
        });
    });
});
