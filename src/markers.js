
export function generateMarkers(map, openSidebar) {

    function loadMineLayer(mineralName){
        map.loadImage(
            './img/'+ mineralName + '-icon.png',
            (error, image) => {
                if (error) throw error;
    
                // Add the image to the map style.
                map.addImage(mineralName, image);
    
                // Add a data source containing one point feature.
                map.addSource('point', {
                    'type': 'geojson',
                    'data': './geojson/markers/mines/'+ mineralName +'.geojson'
                });
    
                // Add a layer to use the image to represent the data.
                map.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'point', // reference the data source
                    'minzoom': 0,
                    'layout': {
                        'icon-image': mineralName, // reference the image
                        'icon-size': 0.1
                    }
                });
            }
        );
    }

    // loadMineLayer('nickel');
    loadMineLayer('gigafactory');
}
