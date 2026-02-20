document.addEventListener('DOMContentLoaded', function () {
    function setupQuiz({ formId, resultContainerId, correctAnswers, correctTextAnswers, scorePrefix }) {
        const form = document.getElementById(formId);
        const resultContainer = document.getElementById(resultContainerId);
        if (!form || !resultContainer) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let score = 0;
            const feedback = [];

            for (const question in correctAnswers) {
                const selected = form.querySelector(`input[name="${question}"]:checked`);
                const isCorrect = selected && selected.value === correctAnswers[question];
                const userAnswer = selected ? selected.value : "aucune réponse";
                if (isCorrect) score++;

                feedback.push({
                    question,
                    isCorrect,
                    userAnswer,
                    correctText: correctTextAnswers[question]
                });
            }

            resultContainer.innerHTML = generateResultHTML(score, feedback, scorePrefix);
            resultContainer.classList.add('fadeIn');

            if (score === Object.keys(correctAnswers).length) {
                launchFireworks();
            }

            // Pas de reset automatique
        });
    }

    function generateResultHTML(score, feedback, scorePrefix) {
        const total = feedback.length;
        const isPerfect = score === total;

        const scoreStyle = isPerfect
            ? 'font-size: 42px; color: #4CAF50; text-shadow: 0 0 10px gold; font-weight: bold; animation: boom 1s ease-in-out;'
            : 'font-size: 32px; color: goldenrod;';

        const title = isPerfect
            ? '⚡ BOUM ! 10/10 ! Tu viens de sauver la planète avec style. Rejoins la ligue des héros verts ! 💚🦸'
            : '📊 Résultat détaillé';

        // Ajout animation si elle n'existe pas déjà
        if (isPerfect && !document.getElementById('boom-style')) {
            const style = document.createElement('style');
            style.id = 'boom-style';
            style.innerHTML = `
                @keyframes boom {
                    0% { transform: scale(0.5); opacity: 0; }
                    60% { transform: scale(1.2); opacity: 1; }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }

        let html = `
            <div style="max-width: 750px; margin: 30px auto; padding: 25px; text-align: center; background: #f9f9f9; border-radius: 15px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <h2 style="${scoreStyle}">${scorePrefix} : ${score}/${total}</h2>
                <h3 style="margin-bottom: 30px; font-size: 20px;">${title}</h3>
                <div style="display: flex; flex-direction: column; gap: 20px;">`;

        feedback.forEach(({ question, isCorrect, userAnswer, correctText }) => {
            const qNum = question.replace('q', '');
            const bg = isCorrect ? '#e8f5e9' : '#ffebee';
            const border = isCorrect ? '#4caf50' : '#f44336';
            const emoji = isCorrect ? '✅' : '❌';
            const displayUser = userAnswer === "aucune réponse" ? "Pas de réponse" : userAnswer;
            const content = isCorrect
                ? `<strong>${emoji} Ta réponse :</strong> ${correctText}`
                : `<strong>${emoji} Ta réponse :</strong> ${displayUser}<br><strong>✅ Bonne réponse :</strong> ${correctText}`;

            html += `
                <div style="background: ${bg}; padding: 15px; border-left: 6px solid ${border}; border-radius: 10px; text-align: left;">
                    <h4 style="margin-bottom: 10px;">Question ${qNum}</h4>
                    <p style="margin: 0;">${content}</p>
                </div>`;
        });

        html += `</div></div>`;
        return html;
    }

    function launchFireworks() {
        const fireworks = document.createElement('div');
        fireworks.className = 'fireworks';
        fireworks.style.position = 'fixed';
        fireworks.style.top = '0';
        fireworks.style.left = '0';
        fireworks.style.width = '100vw';
        fireworks.style.height = '100vh';
        fireworks.style.background = "url('https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.gif') center/cover no-repeat";
        fireworks.style.zIndex = '9999';
        fireworks.style.pointerEvents = 'none';
        document.body.appendChild(fireworks);
        setTimeout(() => fireworks.remove(), 3000);
    }

    // Quiz Facile
    setupQuiz({
        formId: 'formFacile',
        resultContainerId: 'resultContainerFacile',
        correctAnswers: {
            q1: 'b', q2: 'c', q3: 'c', q4: 'a', q5: 'b',
            q6: 'b', q7: 'b', q8: 'c', q9: 'a', q10: 'b'
        },
        correctTextAnswers: {
            q1: "Le dioxyde de carbone (CO₂)",
            q2: "Fermer l’eau pendant le brossage de dents",
            q3: "Une bouteille en plastique",
            q4: "L’énergie solaire",
            q5: "Le plastique",
            q6: "Trois flèches formant un triangle",
            q7: "Utiliser des ampoules à faible consommation",
            q8: "Utiliser des sacs réutilisables",
            q9: "Le dauphin",
            q10: "Bleu"
        },
        scorePrefix: '🌱 Score'
    });

    // Quiz Moyen
    setupQuiz({
        formId: 'formMoyen',
        resultContainerId: 'resultContainerMoyen',
        correctAnswers: {
            q1: 'c', q2: 'b', q3: 'c', q4: 'c', q5: 'a',
            q6: 'a', q7: 'b', q8: 'b', q9: 'b', q10: 'd'
        },
        correctTextAnswers: {
            q1: "Les émissions de voitures",
            q2: "Le réchauffement climatique",
            q3: "L’énergie nucléaire",
            q4: "Le plastique",
            q5: "Elles absorbent le CO₂",
            q6: "Une énergie qui ne pollue pas l’environnement",
            q7: "Des déchets alimentaires",
            q8: "Le métal",
            q9: "La Chine",
            q10: "450 ans"
        },
        scorePrefix: '🌱 Score'
    });

    // Quiz Difficile
    setupQuiz({
        formId: 'formDifficile',
        resultContainerId: 'resultContainerDifficile',
        correctAnswers: {
            q1: 'c', q2: 'c', q3: 'b', q4: 'a', q5: 'c',
            q6: 'a', q7: 'b', q8: 'b', q9: 'b', q10: 'd'
        },
        correctTextAnswers: {
            q1: "La menace pour les coraux et coquillages",
            q2: "Les CFC (chlorofluorocarbures)",
            q3: "Le Brésil",
            q4: "Le réchauffement climatique",
            q5: "25%",
            q6: "Ils sont biodégradables",
            q7: "La Chine",
            q8: "L’agriculture",
            q9: "Une entreprise climatiquement neutre",
            q10: "Tous les plastiques ne sont pas recyclables"
        },
        scorePrefix: '🌍 Score'
    });

    // Affiche le bouton quand on descend
    window.onscroll = function () {
        let button = document.getElementById("topButton");
        if (document.documentElement.scrollTop > 300) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    };

});

// Fonction pour remonter en haut
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}