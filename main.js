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
    // Add a data source containing GeoJSON data.
    map.addSource('indo-china-route', {
        'type': 'geojson',
        'data': "./geojson/ID-to-CH-route.json"
    });

    // Colour the road in black
    map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'indo-china-route',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 3
        }
    });
});

// Add 2 battery markers for example
const geojson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-77.032, 38.913]
            },
            properties: {
                title: 'Mapbox',
                description: 'Washington, D.C.'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-122.414, 37.776]
            },
            properties: {
                title: 'Mapbox',
                description: 'San Francisco, California'
            }
        }
    ]
};

for (const { geometry, properties } of geojson.features) {
    // create a HTML element for each feature
    const el = document.createElement('div');
    el.className = 'marker';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el).setLngLat(geometry.coordinates).addTo(map);
    new mapboxgl.Marker(el)
        .setLngLat(geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(`<h3>${properties.title}</h3><p>${properties.description}</p>`)
        )
        .addTo(map);
}

