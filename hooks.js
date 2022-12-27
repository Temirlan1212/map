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
