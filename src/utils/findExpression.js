export default function findExpression(array) {
  const result = [];

  for (const item of array) {
    if (item['expressions']) {
      let max = 0;
      let maxExpression = null;
      const object = item['expressions'];

      for (const expression in object) {
        if (object[expression] > max) {
          max = object[expression];
          maxExpression = expression;
        }
      }

      const emotionPerPerson = [maxExpression, max];
      result.push(emotionPerPerson);
    }
  }

  if (result.length === 1 || result.length === 2) {
    return result;
  }

  result.sort((a, b) => b[1] - a[1]);
  return result.slice(0, 2);
}
