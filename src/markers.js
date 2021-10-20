
export function generateMarkers(map, openSidebar) {
            map.flyTo({
                center: e.features[0].geometry.coordinates,
                speed: 0.4,
                curve: 1.2, 
                zoom: 3.5,
                essential: true 
            });
}
