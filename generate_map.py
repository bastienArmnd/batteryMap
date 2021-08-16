import folium
import os

# create map object
m = folium.Map(location=[50.358002, 3.523300], zoom_start=12)

tooltip = "Click for more info"
variable = "vito"

overlay = os.path.join("data", 'overlay.json')

folium.Marker([50.358002, 3.523300], 
            popup='<strong> Location 1 </strong>',
            tooltip = tooltip).add_to(m)

# geojson overlay
folium.GeoJson(overlay, name='cambridge').add_to(m)

# generate map
m.save('map.html')