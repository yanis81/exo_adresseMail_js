function afficherEmails() { // Fonction pour récupérer et afficher les emails
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const addresses = data.addresses; 
            const emailList = document.getElementById('emailList'); 
            const searchInput = document.getElementById('searchEmail'); 

            function afficherListe(filtre = "") {
                emailList.innerHTML = ""; 
                
                addresses
                    .filter(email => email.toLowerCase().includes(filtre.toLowerCase()))
                    .forEach(email => {
                        const li = document.createElement('li');
                        li.textContent = email;
                        emailList.appendChild(li);
                    });
            }

            afficherListe();
 
            searchInput.addEventListener("input", (event) => {
                afficherListe(event.target.value); 
            });
        })
        .catch(error => console.error('Erreur lors du chargement des emails :', error));
}

export { afficherEmails };
