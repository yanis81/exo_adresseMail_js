import { emailGraphique } from './graphique.js';
import { afficherEmails } from './afficherEmail.js'
document.addEventListener('DOMContentLoaded', () => {
     emailGraphique(); //affiche et crée le graphique
     afficherEmails(); //affiche les emails récuperer du data.json et permet de les rechercher
});


