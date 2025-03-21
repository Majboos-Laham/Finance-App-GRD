export const tokens = {
  grey: {
    100: "#f0f0f3",
    200: "#e1e2e7",
    300: "#d1d3da",
    400: "#c2c5ce",
    500: "#b3b6c2",
    600: "#8f929b",
    700: "#6b6d74",
    800: "#48494e",
    900: "#242427",
  },
  primary: {
    100: "#d0fcf4",
    200: "#a0f9e9",
    300: "#71f5de",
    400: "#41f2d3",
    500: "#12efc8",
    600: "#0ebfa0",
    700: "#0b8f78",
    800: "#076050",
    900: "#043028",
  },
  secondary: {
    100: "#fcf0dd",
    200: "#fae1bb",
    300: "#f7d299",
    400: "#f5c377",
    500: "#f2b455",
    600: "#c29044",
    700: "#916c33",
    800: "#614822",
    900: "#302411",
  },
  tertiary: {
    500: "#8884d8",
  },
  background: {
    light: "#2d2d34",
    main: "#1f2026",
  },
};

export const themeSettings = {
  palette: {
    mode: 'dark',
    primary: {
      ...tokens.primary,
      main: tokens.primary[500],
      light: tokens.primary[400],
      dark: tokens.primary[700],
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
    },
    tertiary: {
      ...tokens.tertiary,
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    background: {
      default: tokens.background.main,
      light: tokens.background.light,
      paper: tokens.background.main,
    },
    text: {
      primary: tokens.grey[100],
      secondary: tokens.grey[300],
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 800,
      color: tokens.grey[200],
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 600,
      color: tokens.grey[300],
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      fontWeight: 400,
      color: tokens.grey[500],
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 10,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'all 0.3s linear',
          backgroundColor: tokens.background.main,
          minHeight: '100vh',
        },
      },
    },
  },
};

export const getThemeByMode = (mode: 'light' | 'dark') => {
  const lightMode = {
    ...themeSettings,
    palette: {
      ...themeSettings.palette,
      mode: 'light',
      background: {
        default: "#ffffff",
        light: tokens.grey[100],
        paper: tokens.grey[100],
      },
      text: {
        primary: tokens.grey[900],
        secondary: tokens.grey[800],
      },
      primary: {
        ...tokens.primary,
        main: tokens.primary[600],
        light: tokens.primary[500],
        dark: tokens.primary[700],
      },
      grey: {
        ...tokens.grey,
        main: tokens.grey[500],
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'all 0.3s linear',
            backgroundColor: '#ffffff',
            minHeight: '100vh',
          },
        },
      },
    },
  };

  const darkMode = {
    ...themeSettings,
    palette: {
      ...themeSettings.palette,
      mode: 'dark',
      background: {
        default: tokens.background.main,
        light: tokens.background.light,
        paper: tokens.background.main,
      },
      text: {
        primary: tokens.grey[100],
        secondary: tokens.grey[300],
      },
    },
  };

  return mode === 'light' ? lightMode : darkMode;
};