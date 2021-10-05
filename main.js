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
// This implements `StyleImageInterface`
// to draw a pulsing dot icon on the map.
const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
         
    // When the layer is added to the map,
    // get the rendering context for the map canvas.
    onAdd: function () {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext('2d');
    },
         
    // Call once before every frame where the icon will be used.
    render: function () {
    const duration = 1000;
    const t = (performance.now() % duration) / duration;
         
    const radius = (size / 2) * 0.3;
    const outerRadius = (size / 2) * 0.7 * t + radius;
    const context = this.context;
         
    // Draw the outer circle.
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(
    this.width / 2,
    this.height / 2,
    outerRadius,
    0,
    Math.PI * 2
    );
    context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
    context.fill();
         
    // Draw the inner circle.
    context.beginPath();
    context.arc(
    this.width / 2,
    this.height / 2,
    radius,
    0,
    Math.PI * 2
    );
    context.fillStyle = 'rgba(255, 100, 100, 1)';
    context.strokeStyle = 'white';
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();
         
    // Update this image's data with data from the canvas.
    this.data = context.getImageData(
    0,
    0,
    this.width,
    this.height
    ).data;
         
    // Continuously repaint the map, resulting
    // in the smooth animation of the dot.
    map.triggerRepaint();
         
    // Return `true` to let the map know that the image was updated.
    return true;
    }
    };
         
    map.on('load', () => {
    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
         
    map.addSource('dot-point', {
    'type': 'geojson',
    'data': {
    'type': 'FeatureCollection',
    'features': [
    {
    'type': 'Feature',
    'geometry': {
    'type': 'Point',
    'coordinates': [0, 25] // icon position [lng, lat]
    }
    }
    ]
    }
    });
    map.addLayer({
    'id': 'layer-with-pulsing-dot',
    'type': 'symbol',
    'source': 'dot-point',
    'layout': {
    'icon-image': 'pulsing-dot'
    }
    });
    }
    ,)}
,);

// var bbox_nickel = turf.bbox(JSON.parse("./geojson/nickel-producers-countries.geojson").features[0].geometry.coordinates);
var bbox_nickel = turf.extent(map.querySourceFeatures('nickel-producers'));
// var coordinates_nickel = bbox_nickel.features[0].geometry.coordinates;

function fitNickel() {
    map.fitBounds(bbox_nickel, {padding: 20});}
