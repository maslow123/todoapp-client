import { Layout } from "@components/common"
import { AddTodoRequest } from "@components/common/types/Todo";
import { Container, Form } from "@components/ui";
import { hasError } from "@lib/helper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { mock } from "util/mock";
import s from './Add.module.css';

export default function AddTodo() {
    const router = useRouter();
 
    const [action] = useState<string | string[]>(router.query.action);
    const [payload, setPayload] = useState<AddTodoRequest>({
        color: '',
        deadline: null,
        title: '',
        content: ''
    });
    const [errorList, setErrorList] = useState<string[]>(null);

    useEffect(() => {
        // here
    }, [])

    const handleSubmit = async (e): Promise<Boolean> => {
        e.preventDefault();
        let errors = [];

        Object.keys(payload).map(item => {
            if (!payload[item] && item !== 'color') {
                errors = [...errors, item];
            }
        });

        setErrorList(errors);
        return true;
    }
    const handleChange = (evt): void => {
        const value = evt.target.value;
        const name = evt.target.name;
        
        setPayload({
            ...payload,
            [name]: value
        });
    };

    const renderButtonText = (action: string | string[]): string => {
        switch(action) {
            case 'new':
                return 'Tambah';
            case 'edit':
                return 'Ubah';
            default:
                return '';
        };
    };

    const form = [
        {
            label: 'Deadline',
            name: 'deadline',
            type: 'date'
        },
        {
            label: 'Title',
            name: 'title',
            type: 'text'
        },
        {
            label: 'Content',
            name: 'content',
            type: 'textarea'
        },
    ];

    return (
        <Layout title="Add Task">
            
            <div className={s.wrapper}>
                <Container>
                    <div className="mb-6">
                        <label className={s.label}>                    
                            Color Task
                        </label>
                        <div className={s.colorWrapper}>
                            {mock.colors.map(color => (
                                <div key={color}>
                                    <button className="rounded-full w-8 h-8 mr-3 border-2" style={{ background: color }}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <form className={s.form} onSubmit={handleSubmit}>
                        {form.map((f, i) => (
                            <Form
                                disabled={action === 'read'}
                                key={i}
                                label={f.label}
                                name={f.name}
                                type={f.type}
                                required
                                handleChange={handleChange}
                                hasError={hasError(errorList, f.name)}
                            />
                        ))}
                        <div className={s.button}>
                            <button className="bg-blue rounded-full py-2 px-5 h-10 mb-3">
                                <span className="uppercase text-black text-sm font-medium tracking-widest">
                                    {renderButtonText(action)}
                                </span>
                            </button>
                        </div>
                    </form>
                </Container>
            </div> 
        </Layout>
    )
}