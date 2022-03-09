import React, { Component, FormEvent, useState } from 'react';
import s from './Login.module.css';
import { Container, Form } from '@components/ui';
import Image from 'next/image';
import { LoginUser } from '@components/common/types/Login';
import { hasError } from '@lib/helper';
import { LoginRequest, LoginResponse } from 'services/types/users';
import { loginUser } from 'services/users';
import { GenericErrorResponse } from 'services/types/generic';

const LoginPathImage = '/images/login.png';

export default function Login() {
    const [payload, setPayload] = useState<LoginUser>({
        username: '',
        password: ''
    });
    const [invalid, setInvalid] = useState<boolean>(false);
    const [errorList, setErrorList] = useState<string[]>(null);

    const handleSubmit = async (e): Promise<Boolean> => {
        e.preventDefault();
        let errors = [];

        if (payload?.username === '') {
            errors = [...errors, 'username'];
        }
        if (payload?.password === '') {
            errors = [...errors, 'password'];
        }

        console.log(errors);
        setErrorList(errors);

        if (errors.length > 0) {
            return false;
        }

        const data = new FormData(e.target);
        const jsonPayload = Object.fromEntries(data.entries());
        
        const req: LoginRequest = {
            email: jsonPayload.username.toString(),
            password: jsonPayload.password.toString()
        };

        const userData: LoginResponse = await loginUser(req);
        let isValid = false;
        if (userData.error) {
            isValid = true;
        }

        setInvalid(isValid);
        return true

    };

    const handleChange = (evt): void => {
        const value = evt.target.value;
        const name = evt.target.name;

        setPayload({
            ...payload,
            [name]: value
        });
    };

    const form = [
        {
            label: 'Username or Email',
            name: 'username',
            type: 'text'
        },
        {
            label: 'Password',
            name: 'password',
            type: 'password'
        }
    ];

    return (
        <div className={s.parent}>                
            <div className={s.leftpane}>
                <div className={s.image}>  
                    <Image
                        className={s.placeholderImage}
                        alt="login"
                        src={LoginPathImage}
                        layout="intrinsic"
                        quality={100}
                        width={500}
                        height={500}
                    />
                </div>
                <div className={s.caption}>
                    <span>Mari buat TODO, agar pekerjaan menjadi lebih mudah</span>
                </div>
            </div>
            <div className={s.rightpane}>
                <div className={s.appNameWrapper}>
                    <span className={s.appName}>TODO APP</span>                                    
                </div>
                <div className={s.welcomeWrapper}>
                    <span className={s.welcomeText}>Selamat datang di Todoapp</span>                
                    <div className={s.loginFormWrapper}>   
                        {invalid && (
                            <>                            
                                <br/>
                                <span className={s.invalidPassword}>
                                    Username atau password yang dimasukkan salah
                                </span>              
                            </>
                        )}       
                        <form className={s.form} onSubmit={handleSubmit}>                        
                            {form.map((item, i) => (
                                <Form
                                    key={i}
                                    label={item.label}
                                    name={item.name}
                                    type={item.type}
                                    required
                                    handleChange={handleChange}
                                    hasError={hasError(errorList, item.name)}
                                />
                            ))}
                            <div className="text-right pb-4">
                                Lupa Password?
                            </div>

                            <button className="bg-red rounded-full py-2 px-5 h-10 mb-3">
                                <span className="uppercase text-black tracking-widest">
                                    Login
                                </span>
                            </button><br/>
                        </form>

                        <span className={s.registerText}>
                            Belum punya akun? <a href="#">Daftar di sini</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
};