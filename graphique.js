function emailGraphique() {
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const addresses = data.addresses;
        const domainCounts = {};

        addresses.forEach(email => {
            let domain = email.split('@')[1];
            if (domain) {
                domain = domain.split('.')[0]; 
                domainCounts[domain] = (domainCounts[domain] || 0) + 1;
            }
        });

    
        const sortedDomains = Object.entries(domainCounts).sort((a, b) => b[1] - a[1]);

    
        const labels = [];
        const values = [];
        let autresCount = 0;

        sortedDomains.forEach(([domain, count]) => {
            if (count > 3) {
                labels.push(domain);
                values.push(count);
            } else {
                autresCount += count;
            }
        });

        if (autresCount > 0) {
            labels.push("Autres");
            values.push(autresCount);
        }

     
        const canvas = document.getElementById('emailChart');
        if (!canvas) {
            console.error("Canvas 'emailChart' non trouvé !");
            return;
        }

        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Répartition des services email',
                    data: values,
                    backgroundColor: ['red', 'blue', 'green', 'orange', 'purple', 'cyan', 'pink', 'yellow', 'brown'],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    datalabels: {
                        color: 'white',
                        anchor: 'center',
                        align: 'middle',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        formatter: (value, ctx) => {
                            let total = values.reduce((acc, val) => acc + val, 0);
                            let percentage = ((value / total) * 100).toFixed(2) + "%";
                            return `${ctx.chart.data.labels[ctx.dataIndex]}: ${value} (${percentage})`;
                        }
                    }
                }
            },
            plugins: [ChartDataLabels] 
        });
    })
    .catch(error => console.error('Erreur de chargement du fichier JSON', error));
}

export { emailGraphique };