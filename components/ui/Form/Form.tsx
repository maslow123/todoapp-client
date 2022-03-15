import { ChangeEventHandler, FC, TextareaHTMLAttributes } from "react";
import s from './Form.module.css';

interface Props {
    label: string;
    required: Boolean;
    name: string;
    type: string;
    hasError: Boolean;
    disabled: boolean;
    handleChange:  ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

const Form:FC<Props> = ({ label, required, name, type, hasError, disabled, handleChange }) => {
    return (
        <div className="mb-6">
            <label className={s.label}>
                {required && (<span className="text-rose-600">* </span>)}
                {label}
                
            </label>
            {
                type === 'textarea'
                ?
                <textarea                
                    disabled={disabled}
                    className={`${s.formInput} h-11`} 
                    style={{ borderColor: hasError && 'red' }}
                    name={name}
                    placeholder={label}
                    onChange={disabled ? () => {}: handleChange}
                />
                :
                <input 
                    disabled={disabled}
                    className={`${s.formInput}`} 
                    style={{ borderColor: hasError && 'red' }}
                    name={name} 
                    type={type}
                    placeholder={label}
                    onChange={disabled ? () => {}: handleChange}
                />
            }
            {hasError && (<div className="text-left" style={{ color: 'red' }}><span className="capitalize">{name}</span> tidak boleh kosong</div>)}            
        </div>            
    );
};

export default Form