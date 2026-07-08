window.addEventListener("DOMContentLoaded", () => {


    // =====================
    // EXPERIENCE MAP (LEAFLET)
    // =====================

    const map = L.map('map').setView([52.2, 5.3], 7);

    L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
            attribution: 'Tiles &copy; Esri'
        }
    ).addTo(map);



    // =====================
    // MARKERS
    // =====================

    const loobos = L.marker([52.161368, 5.736439]).addTo(map);

    const traceForest = L.marker([52.032835, 6.649352]).addTo(map);



    traceForest.bindPopup(`
        <b>Citizen science-based forest biodiversity monitoring dashboard</b><br><br>

        Interactive web application combining LiDAR-derived forest metrics and
        citizen science observations.<br><br>

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


    expLoobos.addEventListener("click", () => {

        map.setView(
            [52.161368, 5.736439],
            12
        );

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
    // WASTEWATER POLYGON
    // =====================

    let maasWaal;


    fetch("files/LandvanMaasenWaal.geojson")

        .then(response => response.json())

        .then(data => {


            maasWaal = L.geoJSON(data, {


                style: {

                    color:"black",
                    weight:2,
                    fillColor:"#000000",
                    fillOpacity:0.2

                },


                onEachFeature:function(feature,layer){


                    layer.bindPopup(`

                    <b>Industrial Wastewater Project</b><br>

                    Project with the objective to find the most cost-effective path
                    for a wastewater pipeline<br><br>

                    <a href="files/wastewater_pipeline.pdf" target="_blank">
                    Click here to view
                    </a>

                    `);



                    layer.on("mouseover",function(){

                        this.setStyle({
                            fillOpacity:0.35
                        });

                    });



                    layer.on("mouseout",function(){

                        this.setStyle({
                            fillOpacity:0.2
                        });

                    });


                }


            }).addTo(map);


        });



    expWastewater.addEventListener("click",()=>{


        if(maasWaal){

            map.fitBounds(
                maasWaal.getBounds()
            );


            maasWaal.eachLayer(function(layer){

                layer.openPopup();

            });

        }


    });





    // =====================
    // GLYPHOSATE POLYGON
    // =====================


    fetch("files/leeuwarden_polygon.geojson")

    .then(response=>response.json())

    .then(data=>{


        const leeuwardenPolygon = L.geoJSON(data,{


            style:{

                color:"black",
                weight:2,
                fillColor:"#000000",
                fillOpacity:0.2

            },


            onEachFeature:function(feature,layer){


                layer.bindPopup(`

                <b>Glyphosate Detection Project</b><br>

                Using remote sensing techniques to detect glyphosate application
                <br><br>

                <a href="https://dirkemaus.shinyapps.io/shiny_app/"
                target="_blank">

                Click here to view

                </a>

                `);



                layer.on("mouseover",function(){

                    this.setStyle({
                        fillOpacity:0.35
                    });

                });



                layer.on("mouseout",function(){

                    this.setStyle({
                        fillOpacity:0.2
                    });

                });


            }


        }).addTo(map);



    });





    // =====================
    // EDUCATION CESIUM MAP
    // =====================


    Cesium.Ion.defaultAccessToken =
    "YOUR_TOKEN_HERE";



    const educationViewer = new Cesium.Viewer(
    "education-globe",
    {

        terrain: Cesium.Terrain.fromWorldTerrain(),

        imageryProvider: new Cesium.IonImageryProvider({
            assetId: 2
        }),

        animation:false,
        timeline:false,
        baseLayerPicker:false

    }
);




    Cesium.createOsmBuildingsAsync()

    .then(function(buildings){

        educationViewer.scene.primitives.add(buildings);

    });





    const educationData = [


        {

            title:"Almende College Isala",

            years:"2016 - 2022",

            description:"Secondary education.",

            longitude:6.3724645,

            latitude:51.9136228,

            height:1500

        },


        {

            title:"Wageningen University & Research",

            years:"2022 - 2025",

            description:"BSc Environmental Sciences.",

            longitude:5.6660124,

            latitude:51.9854749,

            height:1200

        },


        {

            title:"Universidade de Aveiro",

            years:"September 2022 - January 2023",

            description:"Exchange semester during BSc Environmental Sciences.",

            longitude:-8.6600424,

            latitude:40.6305831,

            height:1500

        },


        {

            title:"Wageningen University & Research",

            years:"2025 - present",

            description:"MSc Geo-Information Science & Climate Studies.",

            longitude:5.6660124,

            latitude:51.9854749,

            height:800

        }


    ];





    function flyEducation(index){


        const place = educationData[index];


        educationViewer.camera.flyTo({


            destination:

            Cesium.Cartesian3.fromDegrees(

                place.longitude,

                place.latitude,

                place.height

            ),


            duration:2


        });



        document.getElementById("education-title").innerHTML =
            place.title;


        document.getElementById("education-years").innerHTML =
            place.years;


        document.getElementById("education-description").innerHTML =
            place.description;


    }





    document

    .querySelectorAll(".timeline-event")

    .forEach(function(event){


        event.addEventListener("click",function(){


            flyEducation(

                Number(
                    this.dataset.index
                )

            );


        });


    });





    flyEducation(0);



});