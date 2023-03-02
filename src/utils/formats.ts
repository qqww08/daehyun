const floatToPercent = (number: number) => {
  return `${Math.round(number * 100)}%`;
};
const comma = (number: number) => {
  return number.toLocaleString();
};
export const format = {
  floatToPercent,
  comma,
};
