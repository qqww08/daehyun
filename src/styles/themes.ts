import { DefaultTheme } from "styled-components";

const color = {
  main: "#417fe5",
  white: "#ffffff",
  black: "#000000",
  gray: "#eaeaea",
  gray2: "#afafaf",
};
export type TColor = typeof color;
const themes: DefaultTheme = {
  color,
};

export default themes;
