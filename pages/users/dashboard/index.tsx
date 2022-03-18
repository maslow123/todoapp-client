import { Layout } from "@components/common"
import { Card, CardContent, Container, FAB } from "@components/ui";
import { useEffect, useState } from "react";
import { listTodo } from "services/todos";
import { TodoListResponse } from "services/types/todos";
import s from './Dashboard.module.css';

export default function Dashboard() {
    const [todo, setTodo] = useState<TodoListResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const resp = await listTodo();                        
            setTodo(resp);

            if (resp.error) { setIsError(true); };

            setLoading(false);
        };

        fetchData();
    }, [])

    return (
        <Layout title="My Task">
            {
                loading 
                ? (
                    <>Loading...</>
                )
                : (
                    isError
                    ? <h1>Error</h1>
                    :
                    <Container>
                        <FAB/>
                        <div className={s.card}>
                            <Card title={'Today'} headerColor={'green'}>
                                <CardContent contents={todo.today} isToday={true}/>                        
                            </Card>
                            <Card title={'Upcoming'} headerColor={'yellow'}>
                                <CardContent contents={todo.upcoming} isToday={false}/>                        
                            </Card>
                            <Card title={'Done'} headerColor={'blue'}>
                                <CardContent contents={todo.done} isToday={false}/>                        
                            </Card>
                        </div>
                    </Container>
                )
            }
        </Layout>
    )
};