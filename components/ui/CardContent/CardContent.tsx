import React, { FC } from 'react';
import Container from '../Container';
import s from './CardContent.module.css';
import { CalendarIcon } from '@heroicons/react/solid';
import { splitCharacter } from 'util/helper';

interface Data {
    title: string;
    content: string;
    due_date: string;
};

interface Props {
    contents: Data[];
}

const CardContent: FC<Props> = ({ contents: data }) => {   
    return (
        <>
            {
                data.map((item, i) => (
                    <Container key={i}>
                        <div className={s.wrapper}>
                            <Container>
                                <div className={s.title}>
                                    {splitCharacter(item.title, 30, true)}
                                </div>
                                <div className={s.dueDate}>                        
                                    <div className={s.dueDateIcon}>
                                        <CalendarIcon  className="w-3 h-3"/>
                                    </div>
                                    <div className={s.dueDateTime}>
                                        <p>{item.due_date}</p>
                                    </div>
                                </div>
                                <div className={s.content}>
                                    <p>
                                        {splitCharacter(item.content, 100, false)}
                                    </p>
                                </div>
                            </Container>
                        </div>
                    </Container>
                ))
            }
        </>
    )
};

export default CardContent;