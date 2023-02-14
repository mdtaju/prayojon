import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { createTheme, ThemeProvider } from "@mui/material";
import '../styles/globals.css';
config.autoAddCss = false;

const theme = createTheme({
  palette: {
    primary: {
      main: "#1b74e4"
    }
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.7)",
        },
      },
    },
  }
})
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
