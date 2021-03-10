/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import "../styles/Channel.css";
import "../styles/Team.css";
import "../styles/Modal.css";
import "tailwindcss/dist/tailwind.min.css";

import { ThemeProvider } from "next-themes";

function App({ Component, pageProps }) {
  return (
    <div id="myapp">
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}

export default App;
