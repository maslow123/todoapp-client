import { FC, ReactNode } from "react";
import s from './Form.module.css';

interface Props {
    label: string;
};

const Form:FC<Props> = ({ label }) => {
    return (
        <>
            * {label}
            <input 
                type="text"
                className={s.text}
            />
        </>
    );
};

export default Form