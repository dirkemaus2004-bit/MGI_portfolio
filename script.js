window.addEventListener("DOMContentLoaded", () => {

    // =====================
    // MAP
    // =====================
    const map = L.map('map').setView([52.2, 5.3], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // =====================
    // MARKER
    // =====================
    const loobos = L.marker([52.161368, 5.736439]).addTo(map);

// =====================
// TRACE FOREST PROJECT
// =====================

    const traceForest = L.marker([52.032835, 6.649352]).addTo(map);

traceForest.bindPopup(`
    <b>TRACE Forest Biodiversity Dashboard</b><br><br>

    Interactive web application combining:
    <ul>
        <li>LiDAR-derived forest metrics</li>
        <li>Citizen science observations</li>
    </ul>

    <a href="files/prototype_presentation.pdf" target="_blank">
        Open prototype description
    </a>
`);

    loobos.bindPopup(`
    <b>Loobos Flux Tower Site</b><br>
    Bachelor thesis: Ozone effects on Gross Primary Productivity<br><br>
    <a href="files/bsc_thesis_naar_overleaf.pdf" target="_blank">
        Click here to view
    </a>
`);

const expLoobos = document.getElementById("exp-loobos");
const expWastewater = document.getElementById("exp-wastewater");
const expTrace = document.getElementById("exp-trace");

expLoobos.addEventListener("click", () => {
    map.setView([52.161368, 5.736439], 12);
    loobos.openPopup();
});

expTrace.addEventListener("click", () => {

    map.setView(
        [52.032835, 6.649352],
        14
    );

    traceForest.openPopup();

});

   // =====================
// POLYGON (MaasWaal from GeoJSON)
// =====================
let maasWaal;

fetch("files/LandvanMaasenWaal.geojson")
    .then(response => response.json())
    .then(data => {

        maasWaal = L.geoJSON(data, {

            style: {
                color: "black",
                weight: 2,
                fillColor: "#000000",
                fillOpacity: 0.2
            },

            onEachFeature: function(feature, layer){

                layer.bindPopup(`
                    <b>${feature.properties.name}</b><br>
                    ${feature.properties.project}
                `);

                layer.on("mouseover", function () {
                    this.setStyle({ fillOpacity: 0.35 });
                });

                layer.on("mouseout", function () {
                    this.setStyle({ fillOpacity: 0.2 });
                });

            }

        }).addTo(map);

    });

expWastewater.addEventListener("click", () => {

    if (maasWaal) {

        map.fitBounds(maasWaal.getBounds());

        maasWaal.eachLayer(function(layer){
            layer.openPopup();
        });

    }

});

})
