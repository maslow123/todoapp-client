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
    value?: string | number | readonly string[];
    isChecked?: boolean;
};

const Form:FC<Props> = ({ label, required, name, type, hasError, disabled, handleChange, errorMessage, value, isChecked }) => {

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
                        value={value}
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
                        value={value}
                    />
                );
            case 'checkbox':
                return (
                    <>
                        <input 
                            type="checkbox" 
                            className={s.checkbox} 
                            onChange={handleChange} 
                            name={name}
                            checked={isChecked}
                        />
                        <span className={s.checkmark}></span>
                    </>
                );
            case 'select':
                return (
                    <Select 
                        value={value}
                        handleChange={e => {
                            e.type = 'category';
                            handleChange(e);
                        }}
                    />
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
                    <span className="capitalize">{ !errorMessage && label} </span> 
                    {errorMessage || 'tidak boleh kosong'} 
                </div>
            )}            
        </div>            
    );
};

export default Form