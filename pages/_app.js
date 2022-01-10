import "../styles/globals.css";
import { ThemeProvider } from "../contexts/google-user";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
