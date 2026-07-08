window.addEventListener("DOMContentLoaded", async () => {



/* =====================================================
   CESIUM SETUP
===================================================== */


Cesium.Ion.defaultAccessToken =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZDBiZGJmZC01ZjQxLTRlNzktYTRjYy04MDljYTExNGEzNmEiLCJpZCI6NDUzOTk0LCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3ODM1MjQwMDl9.Ns22Zc0_aKIitOWL8Ps0VQoyLCNt32vVcdnnLRddN04";



const viewer = new Cesium.Viewer("cesium-map", {

    terrain: Cesium.Terrain.fromWorldTerrain(),

    animation: false,
    timeline: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false

});



// 3D buildings

const buildings =
await Cesium.createOsmBuildingsAsync();


viewer.scene.primitives.add(buildings);

/* =====================================================
   CAMERA HELPER
===================================================== */

function flyToLocation(
    longitude,
    latitude,
    height=1500
){


    viewer.camera.flyTo({

        destination:

        Cesium.Cartesian3.fromDegrees(
            longitude,
            latitude,
            height
        ),


        duration:2

    });


}

/* =====================================================
   EXPERIENCE DATA
===================================================== */
const experiences = {


    loobos:{

        lon:5.736439,

        lat:52.161368,

        height:1200,


        title:
        "Loobos Flux Tower Site",


        description:
        "Bachelor thesis: Ozone effects on Gross Primary Productivity."


    },

    trace:{

        lon:6.649352,

        lat:52.032835,

        height:1200,


        title:
        "Forest biodiversity monitoring dashboard",


        description:
        "Interactive dashboard combining LiDAR-derived forest metrics and citizen science observations."

    }


};

/* =====================================================
   EXPERIENCE MARKERS
===================================================== */


const loobosPin = viewer.entities.add({

    position: Cesium.Cartesian3.fromDegrees(
        5.736439,
        52.161368
    ),

    point: {
        pixelSize: 12,
        color: Cesium.Color.RED
    },

    label: {
        text: "Loobos Flux Tower Site",
        font: "14px sans-serif",
        pixelOffset: new Cesium.Cartesian2(0,-25)
    },

    description: `
        <h3>Loobos Flux Tower Site</h3>

        <p>
        Bachelor thesis: Ozone effects on Gross Primary Productivity.
        </p>

        <a href="files/bsc_thesis_naar_overleaf.pdf" target="_blank">
        Open thesis
        </a>
    `

});



const tracePin = viewer.entities.add({

    position: Cesium.Cartesian3.fromDegrees(
        6.649352,
        52.032835
    ),

    point: {
        pixelSize: 12,
        color: Cesium.Color.RED
    },

    label: {
        text: "Forest biodiversity monitoring",
        font: "14px sans-serif",
        pixelOffset: new Cesium.Cartesian2(0,-25)
    },

    description: `
        <h3>Forest biodiversity monitoring dashboard</h3>

        <p>
        Interactive dashboard combining LiDAR-derived forest metrics
        and citizen science observations.
        </p>

        <a href="files/prototype_presentation.pdf" target="_blank">
        Open project description
        </a>
    `

});

/* =====================================================
   EXPERIENCE BUTTONS
===================================================== */

document.querySelectorAll(".experience-item").forEach(item => {

    item.addEventListener("click", () => {

        const project = item.dataset.project;


        if (project === "loobos") {

            flyToLocation(
                5.736439,
                52.161368,
                1200
            );

        }


        if (project === "trace") {

            flyToLocation(
                6.649352,
                52.032835,
                1200
            );

        }


        if (project === "wastewater" && wastewaterPolygon) {

            viewer.flyTo(
                wastewaterPolygon,
                {
                    duration: 2
                }
            );

        }


        if (project === "glyphosate" && glyphosatePolygon) {

            viewer.flyTo(
                glyphosatePolygon,
                {
                    duration: 2
                }
            );

        }

    });

});

/* =====================================================
   EXPERIENCE POLYGONS
===================================================== */



async function addPolygon(
    file,
    title,
    description,
    link
){


const response =
await fetch(file);


const geojson =
await response.json();



const polygon =
await Cesium.GeoJsonDataSource.load(
    geojson,
    {

        fill:
        Cesium.Color.CYAN.withAlpha(0.25),

        stroke:
        Cesium.Color.WHITE,

        strokeWidth:3

    }
);



viewer.dataSources.add(polygon);



polygon.entities.values.forEach(entity=>{


    entity.name=title;


    entity.description = `
<h3>${title}</h3>

<p>
${description}
</p>

<a href="${link}" target="_blank">
Open project
</a>
`;


});


return polygon;


}

let wastewaterPolygon =
await addPolygon(

"files/LandvanMaasenWaal.geojson",

"Industrial Wastewater Project",

"Finding the most cost-effective path for an industrial wastewater pipeline."

);



let glyphosatePolygon =
await addPolygon(

"files/leeuwarden_polygon.geojson",

"Glyphosate Detection Project",

"Remote sensing based detection of glyphosate application."

);

const wastewaterButton =
document.getElementById(
"exp-wastewater"
);


if(wastewaterButton){


wastewaterButton.onclick=()=>{


viewer.flyTo(
    wastewaterPolygon,
    {
        duration:2
    }
);


};


}

const glyphosateButton =
document.getElementById(
"exp-guard"
);



if(glyphosateButton){


glyphosateButton.onclick=()=>{


viewer.flyTo(
    glyphosatePolygon,
    {
        duration:2
    }
);


};


}


/* =====================================================
   EDUCATION DATA
===================================================== */


const educationData=[



{

title:
"Almende College Isala",

years:
"2016 - 2022",

description:
"Secondary education.",

lon:
6.3724645,

lat:
51.9136228,

height:
1200

},

{

title:
"Wageningen University & Research",

years:
"2022 - 2025",

description:
"BSc Environmental Sciences.",

lon:
5.6660124,

lat:
51.9854749,

height:
1200

},

{

title:
"Universidade de Aveiro",

years:
"September 2022 - January 2023",

description:
"Exchange semester during BSc Environmental Sciences.",

lon:
-8.6600424,

lat:
40.6305831,

height:
1200

},

{

title:
"Wageningen University & Research",

years:
"2025 - present",

description:
"MSc Geo-Information Science & Climate Studies.",

lon:
5.6660124,

lat:
51.9854749,

height:
1000

}


];

function showEducation(index){


const place =
educationData[index];



flyToLocation(

place.lon,

place.lat,

place.height

);



document.getElementById(
"education-title"
).innerHTML =
place.title;



document.getElementById(
"education-years"
).innerHTML =
place.years;



document.getElementById(
"education-description"
).innerHTML =
place.description;


}

/* =====================================================
   TIMELINE EVENTS
===================================================== */


document
.querySelectorAll(".timeline-event")
.forEach(event=>{


event.addEventListener(
"click",
()=>{


showEducation(

Number(
event.dataset.index

)

);


}

);


});


// start view

flyToLocation(
5.6660124,
51.9854749,
300000
);



});