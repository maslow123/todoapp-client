import React, { useState } from 'react';
import s from './Register.module.css';
import { Badge, Form } from '@components/ui';
import Image from 'next/image';
import { RegisterUserRequest, RegisterUserResponse } from 'services/types/users';
import { registerUser } from 'services/users';
import { generateErrorMessage, hasError, validate } from 'util/helper';
import Link from 'next/link';

const image = '/images/register.png';

export default function Register() {
    const [payload, setPayload] = useState<RegisterUserRequest>({
        name: '',
        address: '',
        email: '',
        password: '',        
        pic: 'example.jpg'
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorList, setErrorList] = useState<string[]>(null);
    const [invalidEmailFormat, setInvalidEmailFormat] = useState<boolean>(false);
    const [showBadge, setShowBadge] = useState<boolean>(false);
    const [badgeMessage, setBadgeMessage] = useState<string>('');
    const [badgeColor, setBadgeColor] = useState<string>();

    const handleSubmit = async (e): Promise<boolean> => {
        e.preventDefault();       
        let message = 'Kamu berhasil mendaftar. Ayo login sekarang.';          
        const errors = validate(payload);
        const invalidEmail = errors.find(message => message === 'invalid-format-email');
        if (invalidEmail) {
            setInvalidEmailFormat(true);
        }
        
        setErrorList([...errors]);        
        if (errors.length > 0) { return false };   

        setIsLoading(true);
        const resp: RegisterUserResponse = await registerUser(payload);   
        setIsLoading(false);

        let badge = 'success';
        if (resp.error?.length > 0) {
            badge = 'error';
            message = generateErrorMessage(resp.error);                    
        }

        setBadgeColor(badge);
        setBadgeMessage(message);
        setShowBadge(true);
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
            label: 'Nama Lengkap',
            name: 'name',
            type: 'text'
        },
        {
            label: 'Username atau email',
            name: 'email',
            type: 'text'
        },
        {
            label: 'Password',
            name: 'password',
            type: 'password'
        },
        {
            label: 'Alamat',
            name: 'address',
            type: 'textarea'
        }
    ];

    return (
        <div className={s.parent}>                
            <div className={s.leftpane}>
                <div className={s.image}>  
                    <Image
                        className={s.placeholderImage}
                        alt="login"
                        src={image}
                        layout="intrinsic"
                        quality={100}
                        width={500}
                        height={500}
                    />
                </div>
                <div className={s.caption}>
                    <span>Daftar yuk, supaya bisa nikmatin fiturnya</span>
                </div>
            </div>
            <div className={s.rightpane}>
                <div className={s.appNameWrapper}>
                    <span className={s.appName}>TODO APP</span>                                    
                </div>
                <div className={s.welcomeWrapper}>
                    <span className={s.welcomeText}>Daftar</span>  
                    {showBadge && ( <Badge caption={badgeMessage} color={badgeColor}/> )}              
                    <div className={s.registerFormWrapper}>                           
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
                                    errorMessage={item.name === 'email' && invalidEmailFormat ? 'Kesalahan pada format Email' : '' }
                                />
                            ))}                            

                            <button className="bg-red rounded-full py-2 px-5 h-10 mb-3" disabled={isLoading}>
                                <span className="uppercase text-black tracking-widest">
                                    Daftar
                                </span>
                            </button><br/>
                        </form>
                        <span className={s.registerText}>
                            Sudah punya akun? 
                            <Link href={"/users/login"}>
                                <a href="#"> Login di sini</a>
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
};