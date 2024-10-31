let map;
let marker;

function initMap(){
    map = L.map('map').setView([46.227638,2.213749],6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        
        attribution:'© OpenStreetMap contibutors'
    }).addTo(map);
}

async function searchLocation(query) {
    // Fait une requête à l'API Nominatim avec le terme de recherche encodé
    // limit=5 limite les résultats à 5 suggestions
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
    const data = await response.json();  // Convertit la réponse en JSON
    return data;  // Retourne les données
}

document.addEventListener('DOMContentLoaded', function(){
    initMap();

    const searchBox = document.querySelector('.search-box')
    const resultsContainer = document.querySelector('.results-container');
    let searchTimeout;

    searchBox.addEventListener('input',function(){
        clearTimeout(searchTimeout);
        const query = this.value.trim();

        if(query.length < 3){
            resultsContainer.style.display = 'none';
            return;
        }
        searchTimeout = setTimeout(async () => {
            try{
                const results = await searchLocation(query);
                resultsContainer.innerHTML = '';
                results.forEach(result => {
                    const div = document.createElement('div');
                    div.className = 'result-item';
                    div.textContent = result.display_name;
                    div.addEventListener('click', () => {
                        searchBox.value = result.display_name;

                        resultsContainer.style.display = 'none';
                        const lat = parseFloat(result.lat);
                        const lon = parseFloat(result.lon);

                        if(marker){
                            map.removeLayer(marker);
                        }

                        marker = L.marker([lat,lon]).addTo(map);
                        map.setView([lat,lon],15);
                    });
                    resultsContainer.appendChild(div);
                });
                resultsContainer.style.display = results.length > 0 ? 'block' : 'none';
            }
            catch(error){
                    console.error('Erreur de recherche', error);
            }
            
        },300);
    });
    document.addEventListener('click',function(e){
        if(!resultsContainer.contains(e.target) && e.target !== searchBox){
            resultsContainer.style.display = 'none';
        }
    })

});