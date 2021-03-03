/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import "../styles/Channel.css";
import "../styles/Team.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
// import "tailwindcss/dist/tailwind.min.css";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default App;
