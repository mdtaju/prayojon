import ProgressBar from "@badrap/bar-of-progress";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import Router from "next/router";
import "react-phone-number-input/style.css";

import { wrapper } from "../src/reduxStore/store";
import "../styles/globals.css";

const progress = new ProgressBar({
  size: 2,
  color: "rgb(27 116 228)",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);
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
  // <script src="https://cdn.socket.io/4.6.0/socket.io.min.js" integrity="sha384-c79GN5VsunZvi+Q/WObgk2in0CbZsHnjEqvFxC5DxHn9lTfNce2WW6h2pH6u/kF+" crossorigin="anonymous"></script>
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
