
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

    loadMineLayer('nickel');
    loadMineLayer('gigafactory');

    // const lngLatSorowako = [121.3525, -2.5458333333333];
    // const lngLatGoro = [167.0166666, -22.2833322];
    // const lngLatWeda = [127.94775, 0.47158];
    // const lngLatTesla = [13.8, 52.4];
    // const lngLatCatl = [11.033333, 50.983334];
    
    // // create the popup
    // const popupSorowako = new mapboxgl.Popup({ offset: 30 }).setText(
    //     'Sorowako Mine Environmental Impacts Air pollution Biodiversity loss (wildlife, agro-diversity) Desertification/Drought, Food insecurity (crop damage), Brown zones Loss of landscape/aesthetic degradation'
    // );
    // const popupGoro = new mapboxgl.Popup({ offset: 30 }).setText(
    //     'Goro Mine'
    // );
    // const popupWeda = new mapboxgl.Popup({ offset: 25 }).setText(
    //     'Weda Bay Mine'
    // );
    // const popupTesla = new mapboxgl.Popup({ offset: 25 }).setText(
    //     'Tesla Gigafactory'
    // );
    // const popupCatl = new mapboxgl.Popup({ offset: 25 }).setText(
    //     'CATL Gigafactory'
    // );
    
    // function createMarker(name, popup, lngLat) {
    //     const element = document.createElement('div');
    //     element.onclick = openSidebar;
    //     element.addEventListener('click', () => {
    //         map.flyTo({
    //             // center: [lngLat[0] - 20, lngLat[1]],
    //             center: lngLat,
    //             speed: 0.4,
    //             curve: 1.2, // change the speed at which it zooms out
    //             zoom: 3.5,
    //             essential: true 
    //         });
    //     })
    //     element.className = 'marker '+name;
    //     new mapboxgl.Marker(element)
    //         .setLngLat(lngLat)
    //         .setPopup(popup)
    //         .addTo(map);
    // }
    // createMarker('sorowako', popupSorowako, lngLatSorowako);
    // createMarker('goro', popupGoro, lngLatGoro);
    // createMarker('weda', popupWeda, lngLatWeda);
    // createMarker('tesla', popupTesla, lngLatTesla);
    // createMarker('catl', popupCatl, lngLatCatl);
}
