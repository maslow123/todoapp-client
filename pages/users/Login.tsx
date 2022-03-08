import React, { Component } from 'react';
import s from './Login.module.css';
import { Container, Form } from '@components/ui';
import Image from 'next/image';

const LoginPathImage = '/images/login.png';

export default function Login() {
    return (
        <div className={s.parent}>                
            <div className={s.leftpane}>
                <Container>
                    <div className={s.imageWrapper}>  
                        <Image
                            className={s.placeholderImage}
                            alt="login"
                            src={LoginPathImage}
                            height={700}
                            width={700}
                            layout="intrinsic"
                            quality={100}
                        />
                    </div>
                    <div className={s.caption}>
                        <span>Mari buat TODO, agar pekerjaan menjadi lebih mudah</span>
                    </div>
                </Container>
            </div>
            <div className={s.rightpane}>
                <div className={s.appNameWrapper}>
                    <span className={s.appName}>TODO APP</span>                
                </div>
                <div className={s.welcomeWrapper}>
                    <span className={s.welcomeText}>Welcome to Todoapp</span>                
                    <div className={s.loginFormWrapper}>
                        <Form
                            label="Username or Email"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};