import React, { useState } from 'react';
import s from './Login.module.css';
import { Badge, Form } from '@components/ui';
import Image from 'next/image';
import { LoginRequest, LoginResponse } from 'services/types/users';
import { loginUser } from 'services/users';
import { checkEmailFormat, generateErrorMessage, hasError } from 'util/helper';
import Link from 'next/link';

const LoginPathImage = '/images/login.png';

export default function Login() {
    const [payload, setPayload] = useState<LoginRequest>({
        email: '',
        password: ''
    });
    const [errorList, setErrorList] = useState<string[]>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [invalid, setInvalid] = useState<Boolean>(false);
    const [invalidEmailFormat, setInvalidEmailFormat] = useState<Boolean>(false);

    const handleSubmit = async (e): Promise<Boolean> => {
        e.preventDefault();
        let error = '';
        let errors = [];
        const key = Object.keys(payload);

        key.map(item => {
            let isError = false;
            if (!payload[item]) {
                isError = true;
                errors = [...errors, item];
            }
            if (item === 'email' && !isError && !checkEmailFormat(payload[item])) {
                setInvalidEmailFormat(true);                
                errors = [...errors, item];
            }
        });

        setErrorList(errors);
        if (errors.length > 0) {
            return false;
        }

        const resp: LoginResponse = await loginUser(payload);
        let isValid = false;
        if (resp.error) {
            isValid = true;
            error = generateErrorMessage(resp.error);
        }

        setErrorMessage(error);
        setInvalid(isValid);
        if (error) { return false };

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
            label: 'Email',
            name: 'email',
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
                            <Badge caption={errorMessage} color="error"/>
                        )}       
                        <form className={s.form} onSubmit={handleSubmit}>                        
                            {form.map((item, i) => (
                                <Form
                                    disabled={false}
                                    key={i}
                                    label={item.label}
                                    name={item.name}
                                    type={item.type}
                                    required
                                    handleChange={handleChange}
                                    hasError={hasError(errorList, item.name)}
                                    errorMessage={item.name === 'username' && invalidEmailFormat ? 'Kesalahan pada format Email' : '' }
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
                            Belum punya akun? 
                            <Link href={"/users/register"}>
                                <a href="#"> Daftar di sini</a>
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
};