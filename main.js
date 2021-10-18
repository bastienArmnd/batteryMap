mapboxgl.accessToken = 'pk.eyJ1IjoiYmFzdGllbi1hcm1hbmQiLCJhIjoiY2tzc2dvemxqMGpzZjJ2bXE4MWw3aWo2NCJ9.ZH9nt2q6hcmWmqc4XwC51Q';

// Generate map with Mapbox GL
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-96, 37.8],
    zoom: 3
});

// Define 2 functions to open and close the sidebar
let sidebarOpen = false;

function openSidebar(){
    document.getElementById("mySidebar").style.width = "550px";
    document.getElementById("openbtn").style.transform = "translateX(+540px)";
    document.getElementById("openbtn").style.transform += "rotateY(180deg)";
    document.getElementById("openbtn").style.transition = ".3s"
    sidebarOpen = true;
}

function closeSidebar(){
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("openbtn").style.transform = "translateX(0px)";
    document.getElementById("openbtn").style.transform += "rotateY(0deg)";
    document.getElementById("openbtn").style.transition = ".5s"
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

    map.style.stylesheet.layers.forEach(function(layer) {
        if (layer.type === 'symbol') {
            map.removeLayer(layer.id);
        }
    });
    
    let hoveredStateId = null;

    map.addSource('nickel-producers', {
        type: 'geojson',
        data: './geojson/nickel-producers-countries.geojson'
    });

    map.addSource('cobalt-producers', {
        type: 'geojson',
        data: './geojson/cobalt-producers-countries.geojson'
    });

    map.addLayer({
        'id': 'nickel-producers',
        'type': 'fill',
        'source': 'nickel-producers',
        'layout': {},
        "maxzoom": 3.5,
        'paint': {
            'fill-color': '#5179A0',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.2,
                0.5
            ]
        }
    });

    map.addLayer({
        'id': 'cobalt-producers',
        'type': 'fill',
        'source': 'cobalt-producers',
        'layout': {},
        "maxzoom": 3.5,
        'paint': {
            'fill-color': '#B1CFEC',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.2,
                0.5
            ]
        }
    });

    map.on('mouseenter', 'nickel-producers', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'nickel-producers', () => {
        map.getCanvas().style.cursor = '';
    });

    map.on('mouseenter', 'cobalt-producers', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'cobalt-producers', () => {
        map.getCanvas().style.cursor = '';
    });

    // When the user moves their mouse over the state-fill layer, we'll update the
    // feature state for the feature under the mouse.

    function onMouseHoverCountry(sourceId) {
        map.on('mousemove', sourceId, (e) => {

            function fillStateFunction(e, geoJsonName) {
                if (e.features.length > 0) {
                    if (hoveredStateId !== null) {
                        map.setFeatureState(
                            { source: geoJsonName, id: hoveredStateId },
                            { hover: false }
                        );
                    }
                    hoveredStateId = e.features[0].id;
                    map.setFeatureState(
                        { source: geoJsonName, id: hoveredStateId },
                        { hover: true }
                    );
                }
            }
    
            fillStateFunction(e, sourceId);
        });
    }
    
    onMouseHoverCountry('cobalt-producers')
    onMouseHoverCountry('nickel-producers')

    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.

    function offMouseHoverCountry(sourceId) {
        map.on('mouseleave', sourceId, () => {

            function emptyStateFunction(geoJsonName) {
                if (hoveredStateId !== null) {
                    map.setFeatureState(
                        { source: geoJsonName, id: hoveredStateId },
                        { hover: false }
                    );
                }
                hoveredStateId = null;
            }
    
            emptyStateFunction(sourceId)
        });
    }

    offMouseHoverCountry('nickel-producers')
    offMouseHoverCountry('cobalt-producers')
 
    const lngLatSorowako = [121.3525, -2.5458333333333];
    const lngLatGoro = [167.0166666, -22.2833322];
    const lngLatWeda = [127.94775, 0.47158];
    const lngLatTesla = [13.8, 52.4];
    const lngLatCatl = [11.033333, 50.983334];
    
    // create the popup
    const popupSorowako = new mapboxgl.Popup({ offset: 30 }).setText(
        'Sorowako Mine Environmental Impacts Air pollution Biodiversity loss (wildlife, agro-diversity) Desertification/Drought, Food insecurity (crop damage), Brown zones Loss of landscape/aesthetic degradation'
    );
    const popupGoro = new mapboxgl.Popup({ offset: 30 }).setText(
        'Goro Mine'
    );
    const popupWeda = new mapboxgl.Popup({ offset: 25 }).setText(
        'Weda Bay Mine'
    );
    const popupTesla = new mapboxgl.Popup({ offset: 25 }).setText(
        'Tesla Gigafactory'
    );
    const popupCatl = new mapboxgl.Popup({ offset: 25 }).setText(
        'CATL Gigafactory'
    );

    function createMarker(name, popup, lngLat) {
        const element = document.createElement('div');
        element.onclick = openSidebar;
        element.className = 'marker '+name;
        new mapboxgl.Marker(element)
            .setLngLat(lngLat)
            .setPopup(popup)
            .addTo(map);
    }
    createMarker('sorowako', popupSorowako, lngLatSorowako);
    createMarker('goro', popupGoro, lngLatGoro);
    createMarker('weda', popupWeda, lngLatWeda);
    createMarker('tesla', popupTesla, lngLatTesla);
    createMarker('catl', popupCatl, lngLatCatl);}
,
);