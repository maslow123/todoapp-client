import { FC } from "react";
import { Container } from "@components/ui";
import Link from "next/link";
import s from "./Navbar.module.css";
import Image from "next/image";

const Navbar: FC = () => {
    return (
        <div className="bg-red">
            <Container>
                <div className={s.wrapper}>
                    <div className="flex flex-1 items-center">
                        <Link href="/">
                            <a className={`${s.logo} font-bold tracking-widest`}>
                                TODOAPP
                            </a>
                        </Link> 
                    </div>
                    <div className="flex flex-1 justify-center items-center">                    
                        <span>My Task</span>    
                    </div>
                    <div className="flex flex-1 justify-end space-x-8 pt-3">
                        <div className={s.image} >                    
                            <Image
                                src={'/images/avatar.png'}
                                objectFit="cover"
                                height={50}
                                width={50}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
};

export default Navbar;