mapboxgl.accessToken = 'pk.eyJ1IjoiYmFzdGllbi1hcm1hbmQiLCJhIjoiY2tzc2dvemxqMGpzZjJ2bXE4MWw3aWo2NCJ9.ZH9nt2q6hcmWmqc4XwC51Q';

// Generate map with Mapbox GL
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-96, 37.8],
    zoom: 3
});

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
        "maxzoom": 4,
        'paint': {
            'fill-color': '#627BC1',
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
        "maxzoom": 4,
        'paint': {
            'fill-color': '#C4B27F',
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
 
    const monument = [121.3525, -2.5458333333333];

    // create the popup
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        'Sorowako Mine Environmental Impacts Air pollution Biodiversity loss (wildlife, agro-diversity) Desertification/Drought, Food insecurity (crop damage), Brown zones Loss of landscape/aesthetic degradation'
    );

    // create DOM element for the marker
    const el = document.createElement('div');
    el.id = 'marker';

    // create the marker
    new mapboxgl.Marker(el)
        .setLngLat(monument)
        .setPopup(popup) // sets a popup on this marker
        .addTo(map);
    }
);