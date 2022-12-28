export const onEachFeatureFunc = (feature, layer) => {
  layer.bindPopup(feature.id);
};
// "#800026" "#BD0026" "#E31A1C" "#FC4E2A" "#FD8D3C"  "#FEB24C"

export function getGumusColor(gumus) {
  return gumus > 5 ? "#800026" : gumus > 4 ? "#BD0026" : gumus > 3 ? "#E31A1C" : gumus > 2 ? "#FC4E2A" : gumus > 1 ? "#FD8D3C" : gumus > 0 ? "#FEB24C" : "#FFFFFF";
}

export function disctrictStyle(feature) {
  return {
    fillColor: feature.color ? feature.color : "rgba(68, 68, 68, 0.6)",
    weight: 1,
    opacity: 1,
    color: "gray",
    dashArray: "3",
    fillOpacity: 0.6,
  };
}

export function highlightFeature(e, infoDashboard) {
  e.target.setStyle({
    weight: 2,
    color: "rgb(68, 68, 68)",
    dashArray: "",
    fillOpacity: 0.7,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    e.target.bringToFront();
  }

  infoDashboard.update(e.target.feature);
}

export function resetHighlight(e, infoDashboard) {
  let style = { weight: 2, color: "gray", dashArray: "3", fillOpacity: 0.6 };
  e.target.setStyle(style);

  infoDashboard.update();
}

export function zoomToFeature(e, map) {
  map.fitBounds(e.target.getBounds());
}

export function onEachFeature(layer, infoDashboard, map) {
  layer.on({
    mouseover: (e) => highlightFeature(e, infoDashboard),
    mouseout: (e) => resetHighlight(e, infoDashboard),
    click: (e) => zoomToFeature(e, map),
  });
}

export const createDiv = (infoDashboard, className) => {
  infoDashboard._div = L.DomUtil.create("div", className);
  infoDashboard.update();
  return infoDashboard._div;
};

export const createContent = (infoDashboard, props) => {
  infoDashboard._div.innerHTML = `<h4>Районы Кыргызстана</h4> ${props ? "<b>" + props.id + "</b><br />" + "<b>" + props.gumus.toFixed(2) + " гумус" + "</b><br />" + "<b>" + props.region + " область" + "</b><br />" : ""}`;
};

export const createScaleDirectory = () => {
  let div = L.DomUtil.create("div", "scale");
  let grades = [0, 1, 2, 3, 4, 5];

  for (let i = 0; i < grades.length; i++) {
    div.innerHTML += '<i style="background:' + getGumusColor(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + " гумус" + "<br>" : "+");
  }

  return div;
};
