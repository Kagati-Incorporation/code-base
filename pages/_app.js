import AuthProvider from "firebase/AuthContext";
import { Provider } from "react-redux";
import store from "store/store";
import { ThemeProvider } from "styled-components";
import theme from "theme_provider/theme";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
