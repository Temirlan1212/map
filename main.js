import { createContent, createDiv, createScaleDirectory, disctrictStyle, onEachFeature } from "./utils.js";
import { cartoDB_DarkMatter, googleSat, googleStreets, osm, stamen_Watercolor } from "./layers.js";
import { DistrictsData } from "./data/districts.js";

const map = L.map("map").setView([41.1928749994, 74.1323169961], 7);
const infoDashboard = L.control();

for (let polygon of DistrictsData) {
  L.geoJSON(polygon, {
    onEachFeature: (_, layer) => onEachFeature(layer, infoDashboard, map),
    style: (feature) => disctrictStyle(feature),
  }).addTo(map);
}

infoDashboard.update = (props) => createContent(infoDashboard, props);
infoDashboard.onAdd = () => createDiv(infoDashboard, "infoDashboard");
infoDashboard.addTo(map);

//* scaleDirectory on the bottom of the screen
const scaleDirectory = L.control({ position: "bottomright" });
scaleDirectory.onAdd = () => createScaleDirectory();

scaleDirectory.addTo(map);

//* SEARCH BUTTON
L.Control.geocoder().addTo(map);

//* LAYER CONTROL
cartoDB_DarkMatter.addTo(map);
googleStreets.addTo(map);
googleSat.addTo(map);
stamen_Watercolor.addTo(map);
osm.addTo(map);

const baseLayers = {
  Satellite: googleSat,
  "Google Map": googleStreets,
  "Water Color": stamen_Watercolor,
  OpenStreetMap: osm,
};

L.control.layers(baseLayers).addTo(map);
