export const useGetAvarageDistrictFields = (analysesData, key) => {
  const regions = analysesData.map((elem) => {
    return { district: elem["район"], region: elem["область"] };
  });

  let data = {};
  let dataCount = {};
  let dataRegion = {};

  for (let i = 0; i < analysesData.length; i++) {
    data[regions[i].district] = 0;
    dataCount[regions[i].district] = 0;
    dataRegion[regions[i].district] = 0;
    for (let j = 1; j < analysesData.length; j++) {
      if (regions[i].district === regions[j].district) {
        data[regions[i].district] += +analysesData[i][key];
        dataCount[regions[i].district] += 1;
        dataRegion[regions[i].district] = regions[i].region;
      }
    }
  }

  let listOfAvarageCounts = [];
  const keys = Object.keys(dataCount);

  for (let i = 0; i < analysesData.length; i++) {
    let obj = {
      gumus: data[keys[i]] / dataCount[keys[i]],
      region: dataRegion[keys[i]],
    };
    listOfAvarageCounts[keys[i]] = obj;
  }

  return listOfAvarageCounts;
};
