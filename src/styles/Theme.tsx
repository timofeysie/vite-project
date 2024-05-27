import { ThemeProvider } from "styled-components";

export type Theme = {
  font: string;
  stanBlue: string;
  charcoal: string;
  backgroundColor: string;
};

export type ThemeProps = {
  children: React.ReactNode;
};

export const stanTheme: Theme = {
  font: "Open Sans",
  charcoal: "#141414",
  stanBlue: "#0072fb",
  backgroundColor: "#000",
};

const Theme = ({ children }: ThemeProps) => {
  return <ThemeProvider theme={stanTheme}>{children}</ThemeProvider>;
};

export default Theme;
