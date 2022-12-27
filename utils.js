export const onEachFeatureFunc = (feature, layer) => {
  layer.bindPopup(feature.id);
};

export function getGumusColor(gumus) {
  return gumus > 5 ? "#800026" : gumus > 4 ? "#BD0026" : gumus > 3 ? "#E31A1C" : gumus > 2 ? "#FC4E2A" : gumus > 1 ? "#FD8D3C" : gumus > 0.5 ? "#FEB24C" : "#FFFFFF";
}

export function regionStyle(feature, regionName, gumus) {
  const bool = regionName.split(" ")[0].toLowerCase() === feature.id.split(" ")[0].toLowerCase();
  if (bool) {
    feature.color = getGumusColor(gumus);
  }

  return {
    fillColor: feature.color,
    weight: 2,
    opacity: 1,
    color: "gray",
    dashArray: "3",
    fillOpacity: 0.9,
  };
}

export function highlightFeature(e, infoDashboard) {
  e.target.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    e.target.bringToFront();
  }

  infoDashboard.update(e.target.feature);
}

export function resetHighlight(e, infoDashboard) {
  let style = { weight: 2, color: "gray", dashArray: "3" };
  e.target.setStyle(style);

  infoDashboard.update();
}

export function zoomToFeature(e, map) {
  map.fitBounds(e.target.getBounds());
}

export function onEachFeature(layer, infoDashboard) {
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
  infoDashboard._div.innerHTML = "<h4>регионы Кр</h4>" + (props ? "<b>" + props.id + "</b><br />" : "");
};
