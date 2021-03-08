/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import "../styles/Channel.css";
import "../styles/Team.css";
import "tailwindcss/dist/tailwind.min.css";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

function App({ Component, pageProps }) {
  return (
    <div id="myapp">
      <ThemeProvider attribute="class">
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
