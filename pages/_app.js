import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import "react-phone-number-input/style.css";
import { wrapper } from "../src/reduxStore/store";
import "../styles/globals.css";
// const { default: AbortController } = require("abort-controller");
// const { default: fetch, Headers, Request, Response } = require("node-fetch");

// Object.assign(globalThis, {
//   fetch,
//   Headers,
//   Request,
//   Response,
//   AbortController,
// });

config.autoAddCss = false;

const theme = createTheme({
  palette: {
    primary: {
      main: "#1b74e4",
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.7)",
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        {/* <Provider store={store}> */}
        <Component {...pageProps} />
        {/* </Provider> */}
      </ThemeProvider>
    </SessionProvider>
  );
}

export default wrapper.withRedux(MyApp);
