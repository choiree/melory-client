export default function getSortedGenre(array) {
  const resultObj = {};
  const resultArr = [];

  for (const photo of array) {
    if (photo.genre.length === 2) {
      if (!resultObj[photo.genre[0]]) {
        resultObj[photo.genre[0]] = 1;
      } else {
        resultObj[photo.genre[0]] += 1;
      }

      if (!resultObj[photo.genre[1]]) {
        resultObj[photo.genre[1]] = 1;
      } else {
        resultObj[photo.genre[1]] += 1;
      }
    }
    if (photo.genre.length === 1) {
      if (!resultObj[photo.genre[0]]) {
        resultObj[photo.genre[0]] = 1;
      } else {
        resultObj[photo.genre[0]] += 1;
      }
    }
  }

  for (const value in resultObj) {
    const obj = { name: value, count: resultObj[value] };

    resultArr.push(obj);
  }

  return resultArr;
}
