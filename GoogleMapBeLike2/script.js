let map;
let marker;

let savedMarkers = [];

function initMap(){
    map = L.map('map').setView([46.227638,2.213749],6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        
        attribution:'© OpenStreetMap contibutors'
    }).addTo(map);
    loadSavedLocations();
}

function createRedMarker(lat,lon,name){
    const redIcon = new L.Icon({
        iconUrl:'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25,41],
        iconAnchor: [12,41],
        popupAnchor: [1,-34],
        shadowSize:[41,41]
    });
    const newMarker = L.marker([lat,lon],{icon:redIcon}).addTo(map);
    newMarker.bindPopup(name);
    return newMarker;
}
function loadSavedLocations() {
    const savedLocations = JSON.parse(localStorage.getItem('savedLocations') || '[]');
    savedMarkers.forEach(marker => map.removeLayer(marker)); // Nettoie les anciens marqueurs
    savedMarkers = [];

    savedLocations.forEach(location => {
        const marker = createRedMarker(
            location.latitude,
            location.longitude,
            location.name
        );
        savedMarkers.push(marker);
    });
}

async function searchLocation(query) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
    const data = await response.json();
    return data;
}

document.addEventListener('DOMContentLoaded', function(){
    initMap();

    const searchBox = document.querySelector('.search-box')
    const resultsContainer = document.querySelector('.results-container');
    let searchTimeout;
    let modalSearchTimeout;


    const addButton = document.querySelector('.add-button');
    const dialogOverlay = document.querySelector('.dialog-overlay');
    const cancelButton = document.querySelector('.cancel-button');
    const addressInput = document.querySelector('#address');
    const addressResults = document.querySelector('.address-results');
    const form = document.querySelector('#position-form');

    addButton.addEventListener('click',function(){
        dialogOverlay.style.display = 'flex';
    });
    
    cancelButton.addEventListener('click',function(){
        dialogOverlay.style.display = 'none';
        form.reset();
        if(marker){
            map.removeLayer(marker);
            marker = null
        }
    });

    addressInput.addEventListener('input', function() {
        clearTimeout(modalSearchTimeout);
        const query = this.value.trim();

        if(query.length < 3){
            addressResults.style.display = 'none';
            return;
        }
        modalSearchTimeout = setTimeout(async () =>{
       
            const result = await searchLocation(query);
            addressResults.innerHTML = '';
            result.forEach(result =>{
                    const div = document.createElement('div');
                    div.className = 'result-item';
                    div.textContent = result.display_name;
                    div.addEventListener('click', ()=>{
                    addressInput.value = result.display_name;
                    document.querySelector('#latitude').value = result.lat;
                    document.querySelector('#longitude').value = result.lon;
                    addressResults.style.display = 'none';
                    const lat = parseFloat(result.lat);
                    const lon = parseFloat(result.lon);
                    if (marker) {
                        map.removeLayer(marker);
                    }
                    marker = L.marker([lat,lon]).addTo(map);
                    map.setView([lat,lon],15)
                    });
                    addressResults.appendChild(div);
            });
            addressResults.style.display = result.length >0 ? 'block' : 'none';
      },300);
    });

    form.addEventListener('submit',function(e){
        e.preventDefault();

        const newLocation = {
            name: document.querySelector('#name').value,
            description: document.querySelector('#description').value,
            phone: document.querySelector('#phone').value,
            email: document.querySelector('#email').value,
            address: addressInput.value,
            latitude: parseFloat(document.querySelector('#latitude').value),
            longitude: parseFloat(document.querySelector('#longitude').value)
        };

        const savedLocations = JSON.parse(localStorage.getItem('savedLocations') || '[]');
        savedLocations.push(newLocation);

        localStorage.setItem('savedLocations', JSON.stringify(savedLocations));

        const newMarker = createRedMarker(
            newLocation.latitude,
            newLocation.longitude,
            newLocation.name
        );
        savedMarkers.push(newMarker);

        dialogOverlay.style.display = 'none';
        form.reset();

    });
    

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