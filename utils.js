export const onEachFeatureFunc = (feature, layer) => {
  layer.bindPopup(feature.id);
};

export const useGetAverageGumus = (analysesData) => {
  const regions = analysesData.map((elem) => {
    return elem["район"];
  });

  let data = {};
  let dataCount = {};

  for (let i = 0; i < analysesData.length; i++) {
    data[regions[i]] = 0;
    dataCount[regions[i]] = 0;
    for (let j = 1; j < analysesData.length; j++) {
      if (regions[i] === regions[j]) {
        data[regions[i]] += +analysesData[i]["гумус, %"];
        dataCount[regions[i]] += 1;
      }
    }
  }

  let avarageDatasOfGumus = [];
  const keys = Object.keys(dataCount);

  for (let i = 0; i < analysesData.length; i++) {
    avarageDatasOfGumus[keys[i]] = data[keys[i]] / dataCount[keys[i]];
  }

  return { avarageDatasOfGumus };
};

export function getGumusColor(gumus) {
  console.log(gumus);
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
