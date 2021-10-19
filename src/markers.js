
export function generateMarkers(map, openSidebar) {

    const layers = [
        {geojson: './geojson/markers/gigafactories/gigafactory.geojson', url :  './img/gigafactory-icon.png', id: 'gigafactory'},
        {geojson: './geojson/markers/mines/nickel.geojson', url: './img/nickel-icon.png', id: 'nickel'}
    ]

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
                'icon-size': 0.1,
                'icon-allow-overlap': true
            }
        })
    }));
}
