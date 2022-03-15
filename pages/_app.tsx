import { AppProps } from "next/app";
import { FC } from "react";
import "@assets/main.css";
import 'keen-slider/keen-slider.min.css';

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps}: AppProps & { Component: { Layout: FC }}) {
    return (
        <Component {...pageProps} />            
    )
}

export default MyApp;