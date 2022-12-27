import { NarynData } from "./data/Naryn.js";
import { ChuyData } from "./data/Chuy.js";
import { analysesData } from "./data/Analyses.js";
import { createContent, createDiv, createScaleDirectory, onEachFeature, regionStyle } from "./utils.js";
import { OshData } from "./data/Osh.js";
import { DjalalAbadData } from "./data/Djalal-Abad.js";
import { BatkenData } from "./data/Batken.js";
import { TalasData } from "./data/Talas.js";
import { BishkekData } from "./data/Bishkek.js";
import { YssykKolData } from "./data/Yssyk-Kol.js";
import { useGetAverageGumus } from "./hooks.js";
import { cartoDB_DarkMatter, googleSat, googleStreets, osm, stamen_Watercolor } from "./layers.js";

const map = L.map("map").setView([41.1928749994, 74.1323169961], 7);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

const { avarageDatasOfGumus } = useGetAverageGumus(analysesData);
const infoDashboard = L.control();

const regionsData = [NarynData, OshData, ChuyData, DjalalAbadData, BatkenData, TalasData, YssykKolData, BishkekData];

for (let [key, value] of Object.entries(avarageDatasOfGumus)) {
  for (let polygon of regionsData) {
    L.geoJSON(polygon, {
      onEachFeature: (_, layer) => onEachFeature(layer, infoDashboard, map),
      style: (feature) => regionStyle(feature, key, value),
    }).addTo(map);
  }
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
