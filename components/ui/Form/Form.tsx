import { ChangeEventHandler, FC } from "react";
import s from './Form.module.css';

interface Props {
    label: string;
    required: Boolean;
    name: string;
    type: string;
    hasError: Boolean;
    handleChange:  ChangeEventHandler<HTMLInputElement>;
};

const Form:FC<Props> = ({ label, required, name, type, hasError, handleChange }) => {
    return (
        <div className="mb-6">
            <label className={s.label}>
                {required && (<span className="text-rose-600">* </span>)}
                {label}
                
            </label>
            <input 
                className={`${s.formInput}`} 
                style={{ borderColor: hasError && 'red' }}
                name={name} 
                type={type}
                placeholder={label}
                onChange={handleChange}
            />
            {hasError && (<div className="text-left" style={{ color: 'red' }}><span className="capitalize">{name}</span> tidak boleh kosong</div>)}            
        </div>            
    );
};

export default Form