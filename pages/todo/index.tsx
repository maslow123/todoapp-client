import { Layout } from "@components/common"
import { Container, Form } from "@components/ui";
import { color } from "@lib/color";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createTodo, detailTodo, editTodo } from "services/todos";
import { TodoCreateRequest, TodoCreateResponse, TodoUpdateRequest, TodoUpdateResponse } from "services/types/todos";
import { hasError, validate } from "util/helper";
import { mock } from "util/mock";
import s from './Add.module.css';

export default function AddTodo() {
    const router = useRouter();
 
    const [action] = useState<string | string[]>(router.query.action);
    const [todoID] = useState<string | string[]>(router.query.todoID);

    const [payload, setPayload] = useState<TodoCreateRequest | TodoUpdateRequest>({
        todo_id: 0,
        color: color.blue,
        date: null,
        title: '',
        content: '',
        is_priority: false,
        category_id: 0
    });
    const [errorList, setErrorList] = useState<string[]>(null);
    const [render, setRender] = useState<boolean>(false);

    useEffect(() => {
        if (action === 'edit') {
            
            const fetchData = async () => {
                const numberID = Number(todoID);
                const todo = await detailTodo(numberID);
                if (!todo.error) {
                    payload.todo_id = todo.id;
                    payload.color = todo.color;
                    payload.date = todo.date;
                    payload.title = todo.title;
                    payload.content = todo.content;
                    payload.is_priority = todo.is_priority;
                    payload.category_id = todo.category_id;

                    setPayload({ ...payload });
                    setRender(true);
                }
            };

            fetchData();
            return;
        }

        setRender(true);
    }, [])

    const handleSubmit = async (e): Promise<boolean> => {
        e.preventDefault();
        const skipErrorField = ['color'];
        const errors = validate(payload, skipErrorField);
        
        setErrorList(errors);
        if (errors.length > 0) { return false; }
        payload.date = payload.date.split('T')[0];

        let resp: TodoCreateResponse | TodoUpdateResponse;
        if (action === 'add') {
            resp = await createTodo(payload);
        } else if (action === 'edit') {
            resp = await editTodo(payload);
        }

        if (resp.error) {
            console.log(resp.error);
            return false;
        }

        router.push('/users/dashboard');
    };

    const handleChange = (evt): void => {
        if (evt?.type && evt.type === 'category') {
            setPayload({
                ...payload,
                category_id: evt.id
            });
            return;
        }

        const name = evt.target.name;
        let value = evt.target.value;
        if (name === 'is_priority') {
            value = evt.target.checked;
        }
        setPayload({
            ...payload,
            [name]: value
        });
    };

    const renderButtonText = (action: string | string[]): string => {
        switch(action) {
            case 'add':
                return 'Tambah';
            case 'edit':
                return 'Ubah';
            default:
                return '';
        };
    };

    const form = [
        {
            label: 'Batas Waktu',
            name: 'date',
            type: 'date',
            value: payload.date && payload.date.split('T')[0],
            isChecked: false
        },
        {
            label: 'Judul',
            name: 'title',
            type: 'text',
            value: payload.title,
            isChecked: false
        },
        {
            label: 'Isi',
            name: 'content',
            type: 'textarea',
            value: payload.content,
            isChecked: false
        },
        {
            label: 'Kategori',
            name: 'category_id',
            type: 'select',
            value: payload.category_id !== 0 ? payload.category_id : 999,
            isChecked: false
        },
        {
            label: 'Prioritas',
            name: 'is_priority',
            type: 'checkbox',
            value: '',
            isChecked: payload.is_priority
        }
    ];

    return (
        <Layout title={`${action} Task`}>
            {render && (
                <div className={s.wrapper}>
                    <Container>
                        <div className="mb-6">
                            <label className={s.label}>                    
                                Color Task
                            </label>
                            <div className={s.colorWrapper}>
                                {mock.colors.map(color => (
                                    <div key={color}>
                                        <button 
                                            className="rounded-full w-8 h-8 mr-3 border-2" 
                                            style={{ 
                                                background: color, 
                                                borderColor: payload.color === color && 'grey'
                                            }}
                                            onClick={() => setPayload({ ...payload, color })}
                                        />
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
                                    required={f.type !== 'checkbox'}
                                    handleChange={handleChange}
                                    hasError={hasError(errorList, f.name)}
                                    value={f.value}
                                    isChecked={f.isChecked}
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
            )}
        </Layout>
    )
}