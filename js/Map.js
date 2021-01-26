class Map {
  constructor(stations) {
    this.myMap = L.map("map").setView([43.6044622, 1.4442469], 12);
    this.stations = stations;
    this.initMap();
    this.get(this.myMap, this.stations);
    this.markersCluster;
  }
  initMap() {
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>', // Lien vers la source des données
      minZoom: 10,
      maxZoom: 20
    }).addTo(this.myMap);
  }
  get(myMap, stations) {
    this.markersCluster = new L.MarkerClusterGroup();
    for (let i = 0; i < stations.length; i++) {
      let markerColor = "green-marker";
      if (stations[i].available_bikes === 0) {
        markerColor = "red-marker";
      }
      const markerColorStatus = L.icon({
        iconUrl: `images/Icons/${markerColor}.png`,
        iconSize: [40, 40]
      });
      const latLng = new L.LatLng(stations[i].position.lat, stations[i].position.lng);
      const marker = new L.Marker((latLng), { icon: markerColorStatus }).addEventListener("click", () => {
        if (stations[i].available_bikes === 0) {
          document.getElementById("station_name").innerHTML = stations[i].name;
          document.getElementById("address").innerHTML = stations[i].address;
          document.getElementById("stands_nb").innerHTML = stations[i].available_bike_stands;
          document.getElementById("bikes_nb").innerHTML = stations[i].available_bikes;
          document.getElementById("book").disabled = true;
          document.getElementById("bikes_nb").style.color = "#CB140D";
          document.getElementById("book").style.visibility = "visible";
        }
        else {
          document.getElementById("station_name").innerHTML = stations[i].name;
          document.getElementById("address").innerHTML = stations[i].address;
          document.getElementById("stands_nb").innerHTML = stations[i].available_bike_stands;
          document.getElementById("bikes_nb").innerHTML = stations[i].available_bikes;
          document.getElementById("book").disabled = false;
          document.getElementById("bikes_nb").style.color = "rgb(27, 148, 223)";
          document.getElementById("book").style.visibility = "visible";
        }
      });
      this.markersCluster.addLayer(marker);
    }
    myMap.addLayer(this.markersCluster);
  }
}
