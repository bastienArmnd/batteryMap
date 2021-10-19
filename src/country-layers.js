export function generateMineralProducers(map){

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
        "maxzoom": 3,
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
        "maxzoom": 3,
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

    map.addSource('aluminium-producers', {
        type: 'geojson',
        data: './geojson/aluminium-producers-countries.geojson'
    });

    map.addLayer({
        'id': 'aluminium-producers',
        'type': 'fill',
        'source': 'aluminium-producers',
        'layout': {},
        "maxzoom": 3,
        'paint': {
            'fill-color': '#D7C5E2',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.2,
                0.5
            ]
        }
    });

    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false
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

            // Single out the first found feature.
            var feature = e.features[0];

            // Display a popup with the name of the county
            popup.setLngLat(e.lngLat)
                .setText(feature.properties.ADMIN)
                .addTo(map);

        });
    }
    

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

            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    }

    function countryHoverEffect(layerName) {
        // change pointer
        map.on('mouseenter', layerName, () => {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', layerName, () => {
            map.getCanvas().style.cursor = '';
        });

        // change layer opacity
        onMouseHoverCountry(layerName);
        offMouseHoverCountry(layerName);
    }

    countryHoverEffect('nickel-producers');
    countryHoverEffect('cobalt-producers');
    countryHoverEffect('aluminium-producers');
}