import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secundary: string;
      gray: string;
      background: string;
      text: string;
      withOpacity: string;
    };
  }
}
