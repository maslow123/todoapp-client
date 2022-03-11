import { FC } from "react";
import { Navbar } from "@components/common";
import style from './Layout.module.css';
import Head from "next/head";


const Layout: FC = ({ children }) => {

    return (
        <>
            <Head>
                <link href="../../../../public/fonts/Poppins-Black.ttf"/>
            </Head>
            <div className={style.root}>                        
                <Navbar/>                
                <main 
                    className="fit"
                >
                    { children }
                </main>
            </div>
        </>
    )
}

export default Layout;