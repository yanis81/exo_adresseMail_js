import { afficherEmails } from "./afficherEmail.js";

function emailGraphique() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const addresses = data.addresses;
            const domainCounts = {};
            const domainEmails = {};

            // Compter les domaines et stocker les emails associés
            addresses.forEach(email => {
                let domain = email.split('@')[1]; // Récupère le domaine après '@'
                if (domain) {
                    domain = domain.split('.')[0]; // Ex: gmail, yahoo...
                    domainCounts[domain] = (domainCounts[domain] || 0) + 1;
                    if (!domainEmails[domain]) {
                        domainEmails[domain] = [];
                    }
                    domainEmails[domain].push(email);
                }
            });

            // Gestion des catégories avec peu de valeurs
            let autresCount = 0;
            const autresEmails = [];
            const filteredCounts = {};
            const filteredEmails = {};

            Object.keys(domainCounts).forEach(domain => {
                if (domainCounts[domain] <= 3) { // Mettre dans "AUTRES" si 1 à 3 occurrences
                    autresCount += domainCounts[domain];
                    autresEmails.push(...domainEmails[domain]);
                } else {
                    filteredCounts[domain] = domainCounts[domain];
                    filteredEmails[domain] = domainEmails[domain];
                }
            });

            if (autresCount > 0) {
                filteredCounts["Autres"] = autresCount;
                filteredEmails["Autres"] = autresEmails;
            }

            const labels = Object.keys(filteredCounts);
            const values = Object.values(filteredCounts);

            // Création du graphique
            const ctx = document.getElementById('emailChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',  // Type de graphique
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Répartition des services email',
                        data: values,
                        backgroundColor: ['red', 'blue', 'green', 'orange', 'purple', 'cyan', 'pink', 'yellow', 'brown'], // Couleurs des segments
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            position: 'top'  // Position de la légende
                        },
                        datalabels: {
                            color: '#fff',  // Couleur du texte des étiquettes
                            font: {
                                weight: 'bold',  // Poids de la police
                            },
                            formatter: (value, context) => {
                                // Afficher le nom du domaine et la valeur (ex. Gmail: 30)
                                return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
                            }
                        }
                    }
                }
            });

            // Générer la liste sous le graphique
            const filterList = document.getElementById('emailFilterList');
            filterList.innerHTML = ''; // Vider la liste avant de la remplir

            labels.forEach(domain => {
                const li = document.createElement('li');
                li.textContent = `${domain} (${filteredCounts[domain]})`;
                li.style.cursor = 'pointer';
                li.onclick = () => afficherEmails(filteredEmails[domain]); // Filtrer les emails au clic
                filterList.appendChild(li);
            });

            // ✅ Affichage des emails dès le chargement (par défaut : tous les emails)
            afficherEmails(addresses);
        })
        .catch(error => console.error('Erreur de chargement du fichier JSON', error));
}

export { emailGraphique };
