function afficherEmails() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const addresses = data.addresses; // Récupérer les emails du JSON
            
            const displaySection = document.getElementById('displayEmail'); // Sélectionner la section d'affichage
            
            const ul = document.createElement('ul'); // Créer une liste
            
            addresses.forEach(email => {
                const li = document.createElement('li'); // Créer un élément de liste
                li.textContent = email; // Ajouter l'email comme texte
                ul.appendChild(li); // Ajouter l'élément à la liste
            });

            displaySection.appendChild(ul); // Ajouter la liste dans la section
        })
        .catch(error => console.error('Erreur lors du chargement des emails :', error));
}

// Exporter la fonction pour l'utiliser ailleurs si besoin
export { afficherEmails };
