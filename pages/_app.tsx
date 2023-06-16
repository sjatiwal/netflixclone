import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "@styles/globals.css";
import { Provider } from "react-redux";
import store from "@store";
import { useState, useEffect } from "react";
function MyApp({ Component, pageProps }: AppProps) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }
  return (
    <Provider store={store}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </Provider>
  );
}

export default MyApp;
