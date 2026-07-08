window.addEventListener("DOMContentLoaded", () => {

    // =====================
    // MAP
    // =====================
    const map = L.map('map').setView([52.2, 5.3], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);


    // =====================
    // MARKERS
    // =====================

    const loobos = L.marker([52.161368, 5.736439]).addTo(map);

    const traceForest = L.marker([52.032835, 6.649352]).addTo(map);


    traceForest.bindPopup(`
        <b>Citizen science-based forest biodiversity monitoring dashboard</b><br><br>

        Interactive web application combining LiDAR-derived forest metrics and
        citizen science observations.</li>
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


    // =====================
    // EXPERIENCE BUTTONS
    // =====================

    const expLoobos = document.getElementById("exp-loobos");
    const expWastewater = document.getElementById("exp-wastewater");
    const expTrace = document.getElementById("exp-trace");
    const expGuard = document.getElementById("exp-guard");


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
    // POLYGON (MaasWaal)
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
    <b>Industrial Wastewater Project</b><br>
    Project with the objective to find the most cost-effective path for a wastewater pipeline<br><br>
    <a href="files/wastewater_pipeline.pdf" target="_blank">
        Click here to view
    </a>
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


    // =====================
    // POLYGON (Leeuwarden)
    // =====================

    let leeuwardenPolygon;

    fetch("files/leeuwarden_polygon.geojson")
        .then(response => response.json())
        .then(data => {

            leeuwardenPolygon = L.geoJSON(data, {

                style: {
                    color: "black",
                    weight: 2,
                    fillColor: "#000000",
                    fillOpacity: 0.2
                },

                onEachFeature: function(feature, layer){

                    layer.bindPopup(`
    <b>Glyphosate Detection Project</b><br>
    Using remote sensing techniques to detect glyphosate application<br><br>
    <a href="https://dirkemaus.shinyapps.io/shiny_app/" target="_blank">
        Click here to view
    </a>
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


});
