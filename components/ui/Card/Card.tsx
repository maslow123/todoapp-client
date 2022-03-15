import React, { FC, ReactNode } from 'react';
import s from './Card.module.css';

interface Props {
    children: ReactNode | ReactNode[];
    title?: string;
    headerColor: string;
}

const Card: FC<Props> = ({ children, title = 'Today', headerColor }) => {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={`${s.title} bg-${headerColor}`}>
                    {title}
                </div>
                <div className={s.content}>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default Card;