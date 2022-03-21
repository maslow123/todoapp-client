import React, { FC } from 'react';
import Container from '../Container';
import s from './CardContent.module.css';
import { CalendarIcon, PencilIcon } from '@heroicons/react/solid';
import { generateColor, normalizeDate, splitCharacter } from 'util/helper';
import { Todo } from 'services/types/todos';
import Image from 'next/image';
import Link from 'next/link';
import { markAsCompleteTodo } from 'services/todos';

interface Props {
    contents: Todo[];
    isToday: Boolean;
    success?: Function;
    section: 'today' | 'done' | 'upcoming'
};

const CardContent: FC<Props> = ({ contents: data, isToday, success, section }) => {          
    const NoTodoImage = '/images/no-todo.png'; 

    const handleMarkAsComplete = async (todoID: number) => {
        const resp = await markAsCompleteTodo(todoID);
        if (resp.error) {
            return success(false);
        }
        return success(true);
    };
    return (
        <>
            {
                data.length > 0
                ?
                (
                    data.map((item, i) => (
                        <Container key={i}>
                            <div className={s.wrapper} style={{ backgroundColor: item.color || generateColor()}}>
                                <Container>
                                    <div className={s.title}>
                                        <span className={s.titleText}>
                                            {splitCharacter(item.title, 20, true)}
                                        </span>
                                        <button className={s.titleIcon}>
                                            <Link href={`/todo?action=edit&todoID=${item.id}`}>
                                                <PencilIcon className="w-4 h-4"/>
                                            </Link>
                                        </button>                                    
                                    </div>
                                    <div className={s.dueDate}>                        
                                        <div className={s.dueDateIcon}>
                                            <CalendarIcon  className="w-3 h-3"/>
                                        </div>
                                        <div className={s.dueDateTime}>
                                            <p>{normalizeDate(item.date, isToday)}</p>
                                        </div>
                                    </div>
                                    <div className={s.contentWrapper}>
                                        <div className={s.content}>
                                            <p>
                                                {splitCharacter(item.content, 35, false)}
                                            </p>
                                        </div>
                                        {section === 'today' && (
                                            <div className={s.checkboxWrapper}>
                                                <input 
                                                    type="checkbox" 
                                                    className={s.checkbox}
                                                    checked={item.status}
                                                    onChange={() => handleMarkAsComplete(item.id)}
                                                />
                                                <span className={s.checkmark}></span>
                                            </div>
                                        )}
                                    </div>
                                </Container>
                            </div>
                        </Container>
                    ))
                )
                :
                (
                   <div className={s.noTodo}>
                        <Image 
                            src={NoTodoImage}
                            height={300}
                            width={300}
                        />
                        <span className={s.noTodoText}>
                            Hebat! kamu telah menyelesaikan semua TODO hari ini !
                        </span>
                   </div>
                )
            }
        </>
    )
};

export default CardContent;