import type { PossibleColorSchemes } from "../models/color-schemes.type";

class ColorModeService {
  private static currentScheme: PossibleColorSchemes = "light";
  constructor() {}

  public static changeColorScheme = (colorSchemeName: PossibleColorSchemes) => {
    const el = document.getElementById("color-wrap-id") as HTMLDivElement;
    el.classList.remove(ColorModeService.currentScheme);
    el.classList.add(colorSchemeName);
  };
}

export { ColorModeService };

/*
interface ColorScheme {
  colorBackground: string;
  colorText: string;

  colorPrimary: string;
  colorSecondary: string;

  colorSuccess: string;
  colorError: string;
  colorWarning: string;

  colorAccent1: string;
  colorAccent2: string;
  colorAccent3: string;
  colorAccent4: string;
  colorAccent5: string;
}

const colorSchemes: { [name: string]: ColorScheme } = {
  light: {
    colorBackground: "white",
    colorText: "black",

    colorPrimary: "rgb(32, 184, 120)",
    colorSecondary: "black",

    colorSuccess: "rgb(0, 224, 101)",
    colorError: "rgb(255, 0, 106)",
    colorWarning: "rgb(255, 153, 0)",

    colorAccent1: "rgb(86, 255, 199)",
    colorAccent2: "rgb(41, 147, 189)",
    colorAccent3: "rgb(255, 0, 119)",
    colorAccent4: "rgb(132, 0, 255)",
    colorAccent5: "rgb(0, 255, 157)",
  },
  dark: {
    colorBackground: "black",
    colorText: "white",

    colorPrimary: "rgb(32, 184, 120)",
    colorSecondary: "black",

    colorSuccess: "rgb(0, 224, 101)",
    colorError: "rgb(255, 0, 106)",
    colorWarning: "rgb(255, 153, 0)",

    colorAccent1: "rgb(86, 255, 199)",
    colorAccent2: "rgb(41, 147, 189)",
    colorAccent3: "rgb(255, 0, 119)",
    colorAccent4: "rgb(132, 0, 255)",
    colorAccent5: "rgb(0, 255, 157)",
  },
};
const camelToKebabCase = (str: string) => {
  // const newStr = str.replace(/[0-9]/g, number => ``)
  return str.replace(
    /[A-Z]/g || /[0-9]/g,
    (letter) => `-${letter.toLowerCase()}`
  );
};

export const changeColorScheme = (colorSchemeName: "light" | "dark") => {
  setScssColors(colorSchemes[colorSchemeName]);
};

const setScssColors = (colorScheme: ColorScheme) => {
  const colorWrap = document.getElementById(
    "color-mode-wrap"
  ) as HTMLDivElement;

  if (!colorWrap) return;
  console.log(colorScheme);
  for (const key in colorScheme) {
    const scssName = "--" + camelToKebabCase(key);
    colorWrap.style.setProperty(scssName, (colorScheme as any)[key]);
  }
};
*/
