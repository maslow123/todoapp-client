import React, { FC } from 'react';
import Container from '../Container';
import s from './CardContent.module.css';
import { CalendarIcon, PencilIcon } from '@heroicons/react/solid';
import { generateColor, normalizeDate, splitCharacter } from 'util/helper';

interface Data {
    title: string;
    content: string;
    date: Date;
    color: string;
};

interface Props {
    contents: Data[];
    isToday: Boolean;
}

const CardContent: FC<Props> = ({ contents: data, isToday }) => {   
    return (
        <>
            {
                data.map((item, i) => (
                    <Container key={i}>
                        <div className={s.wrapper} style={{ backgroundColor: item.color || generateColor()}}>
                            <Container>
                                <div className={s.title}>
                                    <span className={s.titleText}>
                                        {splitCharacter(item.title, 30, true)}
                                    </span>
                                    <button className={s.titleIcon}>
                                        <PencilIcon  className="w-4 h-4"/>
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