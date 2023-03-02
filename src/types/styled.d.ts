import "styled-components";
import { TColor } from "~/styles/themes";

declare module "styled-components" {
  export interface DefaultTheme {
    color: TColor;
  }
}
