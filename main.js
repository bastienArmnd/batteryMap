import { generateMineralProducers } from './src/country-layers.js';
import { generateMarkers } from './src/markers.js'


mapboxgl.accessToken = 'pk.eyJ1IjoiYmFzdGllbi1hcm1hbmQiLCJhIjoiY2tzc2dvemxqMGpzZjJ2bXE4MWw3aWo2NCJ9.ZH9nt2q6hcmWmqc4XwC51Q';

// Generate map with Mapbox GL
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [+46, 37.8],
    zoom: 2.5
});

// Define 2 functions to open and close the sidebar
let sidebarOpen = false;

function openSidebar(){
    document.getElementById("mySidebar").style.width = "550px";
    document.getElementById("openbtn").style.transform = "translateX(+550px)";
    document.getElementById("openbtn").style.transform += "rotateY(180deg)";
    document.getElementById("openbtn").style.transition = ".3s"
    sidebarOpen = true;
}

function closeSidebar(){
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("openbtn").style.transform = "translateX(0px)";
    document.getElementById("openbtn").style.transform += "rotateY(0deg)";
    document.getElementById("openbtn").style.transition = ".7s"
    sidebarOpen = false;
}

const openbtn = document.querySelector('.openbtn');
openbtn.addEventListener('click', () => {
    if(!sidebarOpen) {
        openbtn.classList.add('close');
        openSidebar();
    } else {
        openbtn.classList.remove('close');
        closeSidebar();
    }
}, false)

// Add customized visuals when map loads
map.on('load', () => {

    // remove all map labels for readibility
    map.style.stylesheet.layers.forEach(function(layer) {
        if (layer.type === 'symbol') {
            map.removeLayer(layer.id);
        }
    });

    generateMineralProducers(map);
    generateMarkers(map, openSidebar);
},
);