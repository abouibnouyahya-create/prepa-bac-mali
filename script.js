// ==================================================
// VARIABLES GLOBALES
// ==================================================
let themeActif = "";
let score = 0;
let repondues = [];
let timerInterval = null;
let tempsRestant = 180;
let nombreQuestionsActuelles = 10;

// ==================================================
// 1. NAVIGATION ENTRE LES PAGES
// ==================================================
function ouvrirTheme(idTheme) {
    themeActif = idTheme;

    document.getElementById('accueil').classList.add('cache');
    document.getElementById('page-theme').classList.remove('cache');

    if (idTheme === 'renouveau-poetique') {
        document.getElementById('titre-theme').textContent = coursRenouveauPoetique.titre;
        afficherCours(coursRenouveauPoetique);
    } else if (idTheme === 'travail') {
        document.getElementById('titre-theme').textContent = coursTravail.titre;
        afficherCours(coursTravail);
    }

    afficherOnglet('cours');
    window.scrollTo(0, 0);
}

function retourAccueil() {
    document.getElementById('page-theme').classList.add('cache');
    document.getElementById('accueil').classList.remove('cache');

    if (timerInterval) clearInterval(timerInterval);
    afficherRecordAccueil();
    window.scrollTo(0, 0);
}

function afficherOnglet(nom) {
    const boutons = document.querySelectorAll('.onglet');
    boutons.forEach(b => b.classList.remove('actif'));

    document.getElementById('contenu-cours').classList.add('cache');
    document.getElementById('contenu-quiz').classList.add('cache');
    document.getElementById('contenu-citations').classList.add('cache');

    if (timerInterval) clearInterval(timerInterval);

    if (nom === 'cours') {
        boutons[0].classList.add('actif');
        document.getElementById('contenu-cours').classList.remove('cache');
    } else if (nom === 'quiz') {
        boutons[1].classList.add('actif');
        document.getElementById('contenu-quiz').classList.remove('cache');
        afficherQuiz();
    } else if (nom === 'citations') {
        boutons[2].classList.add('actif');
        document.getElementById('contenu-citations').classList.remove('cache');
        afficherCitations();
    }
}

// ==================================================
// 2. AFFICHER LE COURS
// ==================================================
function afficherCours(leCours) {
    const container = document.getElementById('contenu-cours');
    let html = '';

    leCours.sections.forEach(section => {
        html += `<h3>${section.titre}</h3>`;
        html += section.contenu;
    });

    container.innerHTML = html;
}

// ==================================================
// 3. AFFICHER LES CITATIONS (Mis à jour)
// ==================================================
function afficherCitations() {
    const container = document.getElementById('contenu-citations');
    let html = '';

    if (themeActif === 'travail') {
        html += '<h3>💬 Fiche de citations : Le Travail</h3>';
        html += '<h4>Facette 1 : Le travail libérateur</h4>';
        html += '<ul>';
        html += '<li><em>« Que le travail est un trésor. »</em> — La Fontaine, <em>Le Laboureur et ses Enfants</em></li>';
        html += '<li><em>« Vous chantiez ? j\'en suis fort aise : / Eh bien ! dansez maintenant. »</em> — La Fontaine, <em>La Cigale et la Fourmi</em></li>';
        html += '<li><em>« Pour le moment, tu n\'as qu\'un seul devoir, étudier. »</em> — Bernard Dadié, <em>Climbié</em></li>';
        html += '</ul>';
        html += '<h4>Facette 2 : Le travail aliénant</h4>';
        html += '<ul>';
        html += '<li><em>« Travail mauvais qui prend l\'âge tendre en sa serre, / (…) / Qui se sert d\'un enfant ainsi que d\'un outil ! »</em> — Victor Hugo, <em>Melancholia</em></li>';
        html += '<li><em>« Le travail, c\'est la mort. »</em> — Émile Zola, <em>Germinal</em></li>';
        html += '<li>Le travail forcé colonial : un système d\'exploitation qui nie la liberté de l\'homme.</li>';
        html += '</ul>';
    } else {
        html += '<h3>💬 Fiche de citations : Le Renouveau poétique</h3>';
        html += '<h4>La modernité (Apollinaire)</h4>';
        html += '<ul>';
        html += '<li><em>« Tu as fait de douloureux et de joyeux voyages / Avant de t\'apercevoir du mensonge et de l\'âge »</em> — Apollinaire, <em>Zone</em> (Le vers libre et le bilan de vie).</li>';
        html += '<li><em>« J\'ai vécu comme un fou et j\'ai perdu mon temps »</em> — Apollinaire, <em>Zone</em> (Le temps qui passe).</li>';
        html += '<li><em>« Bergère ô tour Eiffel le troupeau des ponts bêle ce matin »</em> — Apollinaire, <em>Zone</em> (La ville moderne et la surprise poétique).</li>';
        html += '<li><em>« Les jours s\'en vont je demeure »</em> — Apollinaire, <em>Le Pont Mirabeau</em> (L\'immobilité face au temps).</li>';
        html += '</ul>';
        html += '<h4>Les procédés et la forme</h4>';
        html += '<ul>';
        html += '<li><em>« Vienne la nuit sonne l\'heure / Les jours s\'en vont je demeure »</em> — Apollinaire, <em>Le Pont Mirabeau</em> (Exemple parfait d\'anaphore / refrain).</li>';
        html += '<li><em>« Sous le pont Mirabeau coule la Seine / Et nos amours »</em> — Apollinaire (Comparaison de l\'eau et de l\'amour perdu).</li>';
        html += '</ul>';
    }

    container.innerHTML = html;
}

// ==================================================
// 4. AFFICHER LE RECORD À L'ACCUEIL
// ==================================================
function afficherRecordAccueil() {
    let meilleurScore = localStorage.getItem('meilleurScorePrepaBac');
    let affichageRecord = document.getElementById('affichage-record');

    if (meilleurScore !== null && affichageRecord) {
        affichageRecord.innerHTML = `🏆 Ton meilleur score au quiz : ${meilleurScore} / ${nombreQuestionsActuelles}`;
    }
}

// ==================================================
// 5. BANQUE DE QUESTIONS : RENOUVEAU POÉTIQUE
// ==================================================
const questionsPoesie = [
    {
        question: "Quel poète français est considéré comme le précurseur du renouveau poétique et du Surréalisme ?",
        reponses: ["Victor Hugo", "Guillaume Apollinaire", "Charles Baudelaire", "Arthur Rimbaud"],
        bonne: 1
    },
    {
        question: "Quelle technique poétique Apollinaire a-t-il inventée en mêlant texte et dessin ?",
        reponses: ["Le sonnet", "Le calligramme", "L'alexandrin", "La fable"],
        bonne: 1
    },
    {
        question: "Dans son recueil 'Alcools', qu'est-ce qu'Apollinaire a décidé de supprimer pour moderniser la poésie ?",
        reponses: ["Les rimes", "Les strophes", "La ponctuation", "Les verbes"],
        bonne: 2
    },
    {
        question: "Concernant le renouveau poétique d'Apollinaire, quelle affirmation est VRAIE ?",
        reponses: [
            "Il a totalement rejeté le passé et la tradition.",
            "Il a gardé un pied dans le passé tout en étant moderne.",
            "Il a écrit uniquement des poèmes sans aucune règle.",
            "Il refusait d'utiliser les mythes anciens."
        ],
        bonne: 1
    },
    {
        question: "Le vers libre signifie :",
        reponses: [
            "Un vers qui ne rime jamais",
            "Un poème sans titre",
            "Un vers qui s'affranchit des règles classiques de la métrique",
            "Un poème en prose uniquement"
        ],
        bonne: 2
    },
    {
        question: "Quel procédé consiste à répéter un mot en début de vers ?",
        reponses: ["La métaphore", "L'anaphore", "L'hyperbole", "La comparaison"],
        bonne: 1
    },
    {
        question: "Quel poète a écrit 'La Prose du Transsibérien' ?",
        reponses: ["Guillaume Apollinaire", "Blaise Cendrars", "Pierre Reverdy", "André Breton"],
        bonne: 1
    },
    {
        question: "Quel thème moderne Apollinaire intègre-t-il dans sa poésie ?",
        reponses: [
            "La vie des rois de France",
            "La ville et les nouvelles technologies (Tour Eiffel, usines...)",
            "La science-fiction",
            "La vie des marins européens"
        ],
        bonne: 1
    },
    {
        question: "Dans 'Zone' d'Apollinaire, quel thème classique est évoqué malgré la modernité du poème ?",
        reponses: ["La guerre de 14-18", "Le temps qui passe et les regrets", "La vie des rois", "La religion"],
        bonne: 1
    },
    {
        question: "Dans 'Le Pont Mirabeau', que symbolise l'eau de la Seine qui coule ?",
        reponses: [
            "La modernité de Paris",
            "L'amour qui s'en va et le temps qui passe",
            "La force de la nature",
            "Le voyage en train"
        ],
        bonne: 1
    },
    {
        question: "Quel recueil d'Apollinaire contient des poèmes écrits sous forme de dessins ?",
        reponses: ["Alcools", "Calligrammes", "Le Bestiaire", "Vitam impendere amori"],
        bonne: 1
    },
    {
        question: "Comment appelle-t-on la figure de style qui consiste à exagérer une idée ?",
        reponses: ["La métaphore", "L'hyperbole", "L'anaphore", "La personnification"],
        bonne: 1
    },
    {
        question: "Pourquoi Apollinaire a-t-il supprimé la ponctuation dans certains poèmes ?",
        reponses: [
            "Parce qu'il ne savait pas écrire",
            "Pour libérer le rythme et le souffle du vers",
            "Pour faire des économies d'encre",
            "Parce que c'était la mode en Angleterre"
        ],
        bonne: 1
    },
    {
        question: "Quel poète français est mort juste avant la fin de la Première Guerre mondiale, en 1918 ?",
        reponses: ["Victor Hugo", "Guillaume Apollinaire", "Arthur Rimbaud", "Charles Baudelaire"],
        bonne: 1
    },
    {
        question: "Dans 'Le Pont Mirabeau', quel est le refrain qui se répète ?",
        reponses: [
            "Sous le pont Mirabeau coule la Seine",
            "Vienne la nuit sonne l'heure / Les jours s'en vont je demeure",
            "L'amour s'en va comme cette eau courante",
            "La joie venait toujours après la peine"
        ],
        bonne: 1
    },
    {
        question: "Le mot 'calligramme' est un mélange de deux mots. Lesquels ?",
        reponses: [
            "Calligraphie et idéogramme",
            "Calligraphie et programme",
            "Calcul et gramme",
            "Calme et diagramme"
        ],
        bonne: 0
    },
    {
        question: "Dans la poésie classique, comment appelle-t-on un vers de 12 syllabes ?",
        reponses: ["Un décasyllabe", "Un octosyllabe", "Un alexandrin", "Un sonnet"],
        bonne: 2
    },
    {
        question: "Quel est le point commun entre 'Zone' et 'Le Pont Mirabeau' ?",
        reponses: [
            "Ils parlent de la guerre",
            "Ils évoquent le temps qui passe",
            "Ils sont écrits en latin",
            "Ils n'ont pas de titre"
        ],
        bonne: 1
    },
    {
        question: "Qu'est-ce qu'un 'vers libre' ?",
        reponses: [
            "Un vers qui ne parle pas de politique",
            "Un vers qui ne respecte pas les règles classiques de la métrique et des rimes",
            "Un vers qui est gratuit",
            "Un vers écrit par un prisonnier"
        ],
        bonne: 1
    },
    {
        question: "Quel mouvement littéraire du XXe siècle considère Apollinaire comme son précurseur ?",
        reponses: ["Le Classicisme", "Le Romantisme", "Le Surréalisme", "Le Réalisme"],
        bonne: 2
    },
    {
        question: "Comment Apollinaire intègre-t-il la modernité dans sa poésie ?",
        reponses: [
            "En parlant de la Tour Eiffel et des usines",
            "En écrivant en anglais",
            "En utilisant uniquement l'alexandrin",
            "En refusant de parler des villes"
        ],
        bonne: 0
    },
    {
        question: "Quel est le thème principal du poème 'Le Pont Mirabeau' ?",
        reponses: [
            "La beauté de la nature",
            "Le temps qui passe et l'amour perdu",
            "La guerre et la mort",
            "La joie de vivre à Paris"
        ],
        bonne: 1
    },
    {
        question: "Que signifie le mot 'Alcools' dans le titre du recueil d'Apollinaire ?",
        reponses: [
            "L'alcoolisme du poète",
            "La vie qui brûle et enivre",
            "Un mélange de mots savants",
            "Le nom d'un bar à Paris"
        ],
        bonne: 1
    },
    {
        question: "Quel poète a écrit 'J'ai vécu comme un fou et j'ai perdu mon temps' ?",
        reponses: ["Blaise Cendrars", "Guillaume Apollinaire", "Arthur Rimbaud", "Victor Hugo"],
        bonne: 1
    }
];

// ==================================================
// 6. BANQUE DE QUESTIONS : LE TRAVAIL
// ==================================================
const questionsTravail = [
    {
        question: "D'où vient étymologiquement le mot 'travail' ?",
        reponses: ["Du latin 'labor'", "Du latin 'tripalium' (instrument de torture)", "Du grec 'ergon'", "De l'anglais 'work'"],
        bonne: 1
    },
    {
        question: "Dans la fable 'Le Laboureur et ses Enfants', que représente le trésor caché ?",
        reponses: ["De l'or", "Le travail lui-même", "Un héritage familial", "Une arme"],
        bonne: 1
    },
    {
        question: "Quel poète a écrit 'Melancholia' pour dénoncer le travail des enfants ?",
        reponses: ["Victor Hugo", "Charles Baudelaire", "Arthur Rimbaud", "Émile Zola"],
        bonne: 0
    },
    {
        question: "Dans 'La Cigale et la Fourmi', que représente la fourmi ?",
        reponses: ["La paresse", "La prévoyance et le travail", "L'art et la musique", "La générosité"],
        bonne: 1
    },
    {
        question: "Quel écrivain ivoirien a écrit 'Climbié' ?",
        reponses: ["Aimé Césaire", "Léopold Sédar Senghor", "Bernard Dadié", "Camara Laye"],
        bonne: 2
    },
    {
        question: "Quel est le point commun entre 'Melancholia' et 'Germinal' ?",
        reponses: ["Ils parlent de la nature", "Ils dénoncent l'aliénation par le travail", "Ils sont écrits par Victor Hugo", "Ils parlent de la ville"],
        bonne: 1
    },
    {
        question: "Comment le travail forcé en Afrique coloniale est-il considéré ?",
        reponses: ["Une source de liberté", "Une forme d'aliénation et d'exploitation", "Un jeu", "Une tradition locale"],
        bonne: 1
    },
    {
        question: "Selon La Fontaine, le travail est :",
        reponses: ["Une malédiction", "Un trésor", "Une perte de temps", "Un plaisir"],
        bonne: 1
    },
    {
        question: "Que dénonce Victor Hugo dans 'Melancholia' ?",
        reponses: ["Le travail des enfants dans les usines", "La vie des paysans", "Le chômage", "Les grèves"],
        bonne: 0
    },
    {
        question: "Dans 'Germinal', quel est le métier des personnages principaux ?",
        reponses: ["Paysans", "Mineurs", "Ouvriers du textile", "Pêcheurs"],
        bonne: 1
    }
];

// ==================================================
// 7. LOGIQUE DU QUIZ (MÉLANGE ET CHRONO)
// ==================================================
function melangerTableau(tableau) {
    for (let i = tableau.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tableau[i], tableau[j]] = [tableau[j], tableau[i]];
    }
    return tableau;
}

function afficherQuiz() {
    const container = document.getElementById('contenu-quiz');
    score = 0;

    let banqueQuestions = themeActif === 'travail' ? questionsTravail : questionsPoesie;

    let banqueMelangee = melangerTableau([...banqueQuestions]);
    let questionsSelectionnees = banqueMelangee.slice(0, nombreQuestionsActuelles);

    repondues = new Array(questionsSelectionnees.length).fill(false);
    tempsRestant = 180;

    let html = `<div class="chrono" id="chrono">⏱️ 03:00</div>`;
    html += `<h3>Teste tes connaissances 🎯</h3>`;
    html += `<p>Tu as 3 minutes pour répondre à ces ${questionsSelectionnees.length} questions tirées au hasard !</p>`;

    questionsSelectionnees.forEach((q, index) => {
        html += `<div class="question-quiz" id="q-${index}">`;
        html += `<h4>Q${index + 1}. ${q.question}</h4>`;

        let reponsesAvecIndex = q.reponses.map((texte, i) => {
            return { texte: texte, estBonne: (i === q.bonne) };
        });

        reponsesAvecIndex = melangerTableau(reponsesAvecIndex);

        reponsesAvecIndex.forEach((rep) => {
            const dataAttr = rep.estBonne ? 'data-bonne-reponse="true"' : '';
            html += `<button class="reponse" ${dataAttr} onclick="verifierReponse(${index}, ${rep.estBonne}, this)">${rep.texte}</button>`;
        });

        html += `</div>`;
    });

    html += `<div class="resultat-quiz" id="resultat">Score : 0 / ${nombreQuestionsActuelles}</div>`;
    container.innerHTML = html;

    lancerChrono();
}

function lancerChrono() {
    const chronoElement = document.getElementById('chrono');

    timerInterval = setInterval(() => {
        tempsRestant--;
        const minutes = Math.floor(tempsRestant / 60);
        const secondes = tempsRestant % 60;
        const affichage = `⏱️ ${String(Math.max(0, minutes)).padStart(2, '0')}:${String(Math.max(0, secondes)).padStart(2, '0')}`;

        if (chronoElement) {
            chronoElement.textContent = affichage;
            if (tempsRestant <= 30 && tempsRestant > 0) {
                chronoElement.classList.add('urgence');
            }
        }

        if (tempsRestant <= 0) {
            clearInterval(timerInterval);
            finDuTemps();
        }
    }, 1000);
}

function finDuTemps() {
    const tousLesBoutons = document.querySelectorAll('.reponse');
    tousLesBoutons.forEach(b => b.style.pointerEvents = 'none');

    document.querySelectorAll('.question-quiz').forEach(conteneur => {
        const bonneReponseBouton = conteneur.querySelector('[data-bonne-reponse="true"]');
        if (bonneReponseBouton && !bonneReponseBouton.classList.contains('correcte')) {
            bonneReponseBouton.classList.add('correcte');
        }
    });

    let meilleurScore = localStorage.getItem('meilleurScorePrepaBac');
    let messageRecord = "";

    if (meilleurScore === null || score > parseInt(meilleurScore)) {
        localStorage.setItem('meilleurScorePrepaBac', score);
        messageRecord = "<br>🏆 <strong>Nouveau record personnel !</strong>";
    } else {
        messageRecord = `<br>Ton record actuel est de <strong>${meilleurScore} / ${nombreQuestionsActuelles}</strong>.`;
    }

    const resultat = document.getElementById('resultat');
    resultat.innerHTML = `⏰ <strong>Temps écoulé !</strong><br>Score final : <strong>${score} / ${nombreQuestionsActuelles}</strong>${messageRecord}`;
    resultat.style.background = "#f8d7da";
    resultat.style.borderColor = "#dc3545";
}

function verifierReponse(indexQ, estBonneReponse, bouton) {
    if (repondues[indexQ] || tempsRestant <= 0) return;
    repondues[indexQ] = true;

    const conteneur = document.getElementById(`q-${indexQ}`);
    const boutons = conteneur.querySelectorAll('.reponse');

    boutons.forEach(b => {
        b.style.pointerEvents = 'none';
    });

    if (estBonneReponse) {
        bouton.classList.add('correcte');
        score++;
    } else {
        bouton.classList.add('fausse');
        const bonneReponseBouton = conteneur.querySelector('[data-bonne-reponse="true"]');
        if (bonneReponseBouton) {
            bonneReponseBouton.classList.add('correcte');
        }
    }

    document.getElementById('resultat').textContent = `Score : ${score} / ${nombreQuestionsActuelles}`;

    if (repondues.every(r => r === true)) {
        clearInterval(timerInterval);
        const pourcent = Math.round((score / nombreQuestionsActuelles) * 100);
        let message = '';
        if (pourcent >= 80) message = "🎉 Excellent ! Tu es prêt pour le Bac !";
        else if (pourcent >= 60) message = "👍 Bien, continue à réviser !";
        else if (pourcent >= 40) message = "💪 Pas mal, mais révise encore.";
        else message = "📖 Relis le cours et réessaie !";

        let meilleurScore = localStorage.getItem('meilleurScorePrepaBac');
        let messageRecord = "";

        if (meilleurScore === null || score > parseInt(meilleurScore)) {
            localStorage.setItem('meilleurScorePrepaBac', score);
            messageRecord = "<br>🏆 <strong>Nouveau record personnel !</strong> Félicitations !";
        } else {
            messageRecord = `<br>Ton record actuel est de <strong>${meilleurScore} / ${nombreQuestionsActuelles}</strong>. Continue comme ça !`;
        }

        document.getElementById('resultat').innerHTML =
            `Score final : <strong>${score} / ${nombreQuestionsActuelles}</strong> (${pourcent}%)<br>${message}${messageRecord}`;
    }
}

// ==================================================
// 8. MODE SOMBRE
// ==================================================
function toggleModeSombre() {
    document.body.classList.toggle('dark-mode');

    const btn = document.getElementById('btn-mode-sombre');
    if (document.body.classList.contains('dark-mode')) {
        btn.textContent = '☀️';
        localStorage.setItem('modeSombre', 'actif');
    } else {
        btn.textContent = '🌙';
        localStorage.setItem('modeSombre', 'inactif');
    }
}

// Au chargement, on vérifie le mode sombre
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('modeSombre') === 'actif') {
        document.body.classList.add('dark-mode');
        const btn = document.getElementById('btn-mode-sombre');
        if (btn) btn.textContent = '☀️';
    }
});

// Afficher le record au démarrage
window.onload = function () {
    afficherRecordAccueil();
};