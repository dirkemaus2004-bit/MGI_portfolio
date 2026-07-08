window.addEventListener("DOMContentLoaded", async () => {

Cesium.Ion.defaultAccessToken =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZDBiZGJmZC01ZjQxLTRlNzktYTRjYy04MDljYTExNGEzNmEiLCJpZCI6NDUzOTk0LCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3ODM1MjQwMDl9.Ns22Zc0_aKIitOWL8Ps0VQoyLCNt32vVcdnnLRddN04";

const viewer = new Cesium.Viewer("cesium-map",{
    terrain:Cesium.Terrain.fromWorldTerrain(),
    animation:false,
    timeline:false,
    baseLayerPicker:false,
    geocoder:false,
    homeButton:false,
    sceneModePicker:false,
    navigationHelpButton:false
});


const buildings = await Cesium.createOsmBuildingsAsync();
viewer.scene.primitives.add(buildings);



function flyToLocation(lon,lat,height=1500){
    viewer.camera.flyTo({
        destination:Cesium.Cartesian3.fromDegrees(lon,lat,height),
        duration:2
    });
}



/* =====================
   PROJECT DATA
===================== */

const projects={

loobos:{
    lon:5.736439,
    lat:52.161368,
    height:1200,
    title:"Loobos Flux Tower Site",
    description:"Bachelor thesis: Ozone effects on Gross Primary Productivity.",
    link:"files/bsc_thesis_naar_overleaf.pdf"
},

trace:{
    lon:6.649352,
    lat:52.032835,
    height:1200,
    title:"Forest biodiversity monitoring dashboard",
    description:"Interactive dashboard combining LiDAR-derived forest metrics and citizen science observations.",
    link:"files/prototype_presentation.pdf"
}

};



function updateProjectInfo(project){

    document.getElementById("project-title").innerHTML=project.title;

    document.getElementById("project-description").innerHTML=project.description;

    const link=document.getElementById("project-link");

    link.href=project.link;
    link.style.display="block";

}




/* =====================
   EXPERIENCE PINS
===================== */


viewer.entities.add({

position:Cesium.Cartesian3.fromDegrees(
    5.736439,
    52.161368
),

point:{
    pixelSize:12,
    color:Cesium.Color.RED
},

label:{
    text:"Loobos Flux Tower",
    pixelOffset:new Cesium.Cartesian2(0,-25)
},

description:
`
<h3>Loobos Flux Tower Site</h3>
<p>Bachelor thesis: Ozone effects on Gross Primary Productivity.</p>
<a href="files/bsc_thesis_naar_overleaf.pdf" target="_blank">
Open thesis
</a>
`

});



viewer.entities.add({

position:Cesium.Cartesian3.fromDegrees(
    6.649352,
    52.032835
),

point:{
    pixelSize:12,
    color:Cesium.Color.RED
},

label:{
    text:"Forest biodiversity monitoring",
    pixelOffset:new Cesium.Cartesian2(0,-25)
},

description:
`
<h3>Forest biodiversity monitoring dashboard</h3>
<p>Interactive dashboard combining LiDAR-derived forest metrics and citizen science observations.</p>
<a href="files/prototype_presentation.pdf" target="_blank">
Open project description
</a>
`

});



/* =====================
   POLYGONS
===================== */


async function loadPolygon(file,title,description,link){

const data=await fetch(file).then(r=>r.json());

const polygon=await Cesium.GeoJsonDataSource.load(
    data,
    {
        fill:Cesium.Color.CYAN.withAlpha(0.25),
        stroke:Cesium.Color.WHITE,
        strokeWidth:3
    }
);


viewer.dataSources.add(polygon);


polygon.entities.values.forEach(e=>{

e.name=title;

e.description=
`
<h3>${title}</h3>
<p>${description}</p>
<a href="${link}" target="_blank">
Open project
</a>
`;

});


return polygon;

}



const wastewaterPolygon =
await loadPolygon(
"files/LandvanMaasenWaal.geojson",
"Industrial Wastewater Project",
"Finding the most cost-effective path for an industrial wastewater pipeline.",
"files/wastewater_pipeline.pdf"
);



const glyphosatePolygon =
await loadPolygon(
"files/leeuwarden_polygon.geojson",
"Glyphosate Detection Project",
"Remote sensing based detection of glyphosate application.",
"https://dirkemaus.shinyapps.io/shiny_app/"
);



/* =====================
   EXPERIENCE BUTTONS
===================== */


document.querySelectorAll(".experience-item").forEach(item=>{

item.onclick=()=>{

const type=item.dataset.project;


if(projects[type]){

const p=projects[type];

flyToLocation(
p.lon,
p.lat,
p.height
);

updateProjectInfo(p);

}


if(type==="wastewater"){

viewer.flyTo(wastewaterPolygon,{duration:2});

document.getElementById("project-title").innerHTML=
"Industrial Wastewater Project";

}


if(type==="glyphosate"){

viewer.flyTo(glyphosatePolygon,{duration:2});

document.getElementById("project-title").innerHTML=
"Glyphosate Detection Project";

}


};

});



/* =====================
   EDUCATION
===================== */


const education=[

{
title:"Almende College Isala",
years:"2016 - 2022",
description:"Secondary education.",
lon:6.3724645,
lat:51.9136228,
height:1200
},

{
title:"Wageningen University & Research",
years:"2022 - 2025",
description:"BSc Environmental Sciences.",
lon:5.6660124,
lat:51.9854749,
height:1200
},

{
title:"Universidade de Aveiro",
years:"September 2022 - January 2023",
description:"Exchange semester during BSc Environmental Sciences.",
lon:-8.6600424,
lat:40.6305831,
height:1200
},

{
title:"Wageningen University & Research",
years:"2025 - present",
description:"MSc Geo-Information Science & Climate Studies.",
lon:5.6660124,
lat:51.9854749,
height:1000
}

];



function showEducation(i){

const e=education[i];

flyToLocation(
e.lon,
e.lat,
e.height
);


document.getElementById("education-title").innerHTML=e.title;

document.getElementById("education-years").innerHTML=e.years;

document.getElementById("education-description").innerHTML=e.description;

}



document.querySelectorAll(".timeline-event").forEach(event=>{

event.onclick=()=>{

showEducation(
Number(event.dataset.index)
);

};

});



flyToLocation(
5.6660124,
51.9854749,
300000
);


});