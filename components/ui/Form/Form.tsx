import { ChangeEventHandler, FC, MouseEventHandler } from "react";
import s from './Form.module.css';
import Select from "./Select";

interface Props {
    label: string;
    required: Boolean;
    name: string;
    type: string;
    hasError: Boolean;
    disabled: boolean;
    handleChange:  ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    errorMessage?: string;
};

const Form:FC<Props> = ({ label, required, name, type, hasError, disabled, handleChange, errorMessage }) => {

    const generateForm = () => {
        switch(type) {
            case 'text': 
            case 'date':
            case 'password':
                return (
                    <input 
                        disabled={disabled}
                        className={`${s.formInput}`} 
                        style={{ borderColor: hasError && 'red' }}
                        name={name} 
                        type={type}
                        placeholder={label}
                        onChange={disabled ? () => {}: handleChange}
                    />
                );
            case 'textarea':
                return (
                    <textarea                
                        disabled={disabled}
                        className={`${s.formInput} h-11`} 
                        style={{ borderColor: hasError && 'red' }}
                        name={name}
                        placeholder={label}
                        onChange={disabled ? () => {}: handleChange}
                    />
                );
            case 'checkbox':
                return (
                    <>
                        <input type="checkbox" className={s.checkbox} onChange={handleChange} name={name}/>
                        <span className={s.checkmark}></span>
                    </>
                );
            case 'select':
                return (
                    <Select handleChange={e => {
                        e.type = 'category';
                        handleChange(e);
                    }}/>
                )
            default:
                return null
        }
    };

    return (
        <div className="mb-6">
            <label className={s.label}>
                {required && (<span className="text-rose-600">* </span>)}
                {label}
                
            </label>
            {generateForm()}
            {hasError 
            && (
                <div className="text-left" style={{ color: 'red' }}>
                    <span className="capitalize">{ !errorMessage && name} </span> 
                    {errorMessage || 'tidak boleh kosong'} 
                </div>
            )}            
        </div>            
    );
};

export default Form