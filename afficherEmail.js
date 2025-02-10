import { emailGraphique } from "./graphique.js";

const displayEmailSection = document.getElementById('displayEmail');

// Fonction pour afficher la liste des emails
function afficherEmails(emailList) {
    displayEmailSection.innerHTML = `
        <h2>Liste des emails</h2>
        <input type="text" id="searchBar" placeholder="Rechercher un email..." />
        <ul id="emailList"></ul>
    `;

    const emailListElement = document.getElementById('emailList');
    const searchBar = document.getElementById('searchBar');

    function updateEmailList(filteredEmails) {
        emailListElement.innerHTML = filteredEmails.map(email => `<li>${email}</li>`).join('');
    }

    // Afficher tous les emails au chargement
    updateEmailList(emailList);

    // Écouter les entrées de l'utilisateur dans la barre de recherche
    searchBar.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredEmails = emailList.filter(email => email.toLowerCase().includes(searchTerm));
        updateEmailList(filteredEmails);
    });
}

// Charger les emails depuis `data.json`
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const emailList = data.addresses;
        afficherEmails(emailList);
        emailGraphique(); // On met aussi à jour le graphique
    })
    .catch(error => console.error('Erreur lors du chargement des emails', error));

    
// Fonction pour afficher tous les emails
//function showAllEmails() {
//    afficherEmails(); // Recharge la liste complète
//}

//export {showAllEmails};
export { afficherEmails };
