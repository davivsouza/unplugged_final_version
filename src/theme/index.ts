import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    gray: {
      50: '#F8F8F8',
      100: '#979797',
      200: "#CACACA",
      300: '#898C94',
      400: "#606060",
      500: "#232227",
      600: "#3E3E3E",
      700: '#181818',
      800: '#0D0C10',
      900: '#1C1C1C',
    },
    purple: {
      200: '#A7A1FF',
      400: '#171425',
      500: '#6C63FF',
      600: '#2F2E41',
      700: '#443EA3',
      800: '#221E2B',
      900: '#2B2634',
    },
    red: {
      300: "#FF6584",

    },
    white: "#FFFFFF",
    green: {
      300: '#66FF63',
      500: "#00DB09",
    },
    yellow: {
      300: '#FCC400',
    }
  },
  fonts: {
    heading: "Epilogue_700Bold",
    body: "Epilogue_400Regular",
    semiBold: 'Epilogue_600SemiBold'
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 25,
    '3xl': 32,
  },
});
