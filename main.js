mapboxgl.accessToken = 'pk.eyJ1IjoiYmFzdGllbi1hcm1hbmQiLCJhIjoiY2tzc2dvemxqMGpzZjJ2bXE4MWw3aWo2NCJ9.ZH9nt2q6hcmWmqc4XwC51Q';

// Generate map with Mapbox GL
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-96, 37.8],
    zoom: 3
});

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}
  
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

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
            'fill-color': '#ECCA85',
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
 
    const Sorowako = [121.3525, -2.5458333333333];
    const goro = [167.0166666, -22.2833322];
    const wedabay = [127.94775, 0.47158];
    const teslagiga = [13.8, 52.4];
    const CATL = [11.033333, 50.983334]

    // create the popup
    const popup1 = new mapboxgl.Popup({ offset: 25 }).setText(
        'Sorowako Mine Environmental Impacts Air pollution Biodiversity loss (wildlife, agro-diversity) Desertification/Drought, Food insecurity (crop damage), Brown zones Loss of landscape/aesthetic degradation'
    );
    const popup2 = new mapboxgl.Popup({ offset: 25 }).setText(
        'Goro Mine Environmental Impacts Air pollution Biodiversity loss (wildlife, agro-diversity) Desertification/Drought, Food insecurity (crop damage), Brown zones Loss of landscape/aesthetic degradation'
    );
    const popup3 = new mapboxgl.Popup({ offset: 25 }).setText(
        'Weda Bay nickel Mine Environmental Impacts Air pollution Biodiversity loss (wildlife, agro-diversity) Desertification/Drought, Food insecurity (crop damage), Brown zones Loss of landscape/aesthetic degradation'
    );
    const popup4 = new mapboxgl.Popup({ offset: 25 }).setText(
        'Tesla Gigafactory'
    );
    const popup5 = new mapboxgl.Popup({ offset: 25 }).setText(
        'CATL Gigafactory'
    );
    // create DOM element for the marker
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    const el3 = document.createElement('div');
    const el4 = document.createElement('div');
    const el5 = document.createElement('div');

    el1.id = 'marker1';
    el2.id = 'marker2';
    el3.id = 'marker3';
    el4.id = 'marker4';
    el5.id = 'marker5';

    // create the marker
    new mapboxgl.Marker(el1)
        .setLngLat(Sorowako)
        .setPopup(popup1) // sets a popup on this marker
        .addTo(map);
    new mapboxgl.Marker(el2)
        .setLngLat(goro)
        .setPopup(popup2) // sets a popup on this marker
        .addTo(map);
    new mapboxgl.Marker(el3)
        .setLngLat(wedabay)
        .setPopup(popup3) // sets a popup on this marker
        .addTo(map);
    
    new mapboxgl.Marker(el4)
        .setLngLat(teslagiga)
        .setPopup(popup4) // sets a popup on this marker
        .addTo(map);
    
    new mapboxgl.Marker(el5)
        .setLngLat(CATL)
        .setPopup(popup5) // sets a popup on this marker
        .addTo(map);}
,
);