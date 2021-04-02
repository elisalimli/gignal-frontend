/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import "../styles/Channel.css";
import "../styles/Team.css";
import "../styles/Modal.css";
import "../styles/Checkbox.css";
import "../styles/ScrollBottom.css";
import "../styles/Scroll.css";
import "../styles/styles.css";
import "../styles/tailwind.css";
import "../styles/index.css";
// import "tailwindcss/dist/tailwind.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <div id="myapp">
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
        <ToastContainer />
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,user-scalable=no,user-scalable=0"
          />
        </Head>
      </ThemeProvider>
    </div>
  );
}

export default App;
