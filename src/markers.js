
export function generateMarkers(map, openSidebar) {

    const layers = [
        {geojson: './geojson/markers/gigafactory.geojson', url :  './img/gigafactory-icon.png', id: 'gigafactory'},
        {geojson: './geojson/markers/nickel.geojson', url: './img/nickel-icon.png', id: 'nickel'}
    ]

    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        offset: [0, -25]
    });

    function onMouseHoverMarker(sourceId) {
        map.on('mousemove', sourceId, (e) => {
            map.getCanvas().style.cursor = 'pointer';
        });
    }
    function offMouseHoverMarker(sourceId) {
        map.on('mouseleave', sourceId, () => {
            map.getCanvas().style.cursor = '';
        });
    }

    // Load all icon images first, then use them to style marker layers
    Promise.all(
        layers.map(img => new Promise((resolve, reject) => {
            map.loadImage(img.url, function (error, image) {
                map.addImage(img.id, image)
                resolve();
            })
        }))
    )
    .then(
        layers.forEach(img => {
        // Add a data source containing one point feature.
        map.addSource(img.id, {
            'type': 'geojson',
            'data': img.geojson
        }),

        // Add a layer to use the image to represent the data.
        map.addLayer({
            'id': img.id,
            'type': 'symbol',
            'source': img.id, // reference the data source
            'layout': {
                'icon-image': img.id, // reference the image
                'icon-size': 0.4,
                'icon-allow-overlap': true
            }
        });

        map.on('click', img.id, (e) => {

            // generate new popup for new click
            popup = new mapboxgl.Popup({
                closeButton: false,
                offset: [0, -25]
            });

            // fly map to click coordinates
            map.flyTo({
                center: e.features[0].geometry.coordinates,
                speed: 0.4,
                curve: 1.2, 
                zoom: 3.5,
                essential: true 
            });

            openSidebar();

            // Display a popup with the name of the site
            popup.setLngLat(e.features[0].geometry.coordinates)
                .setText(e.features[0].properties.label)
                .addTo(map);

        });

        onMouseHoverMarker(img.id);
        offMouseHoverMarker(img.id);
    }));
}
