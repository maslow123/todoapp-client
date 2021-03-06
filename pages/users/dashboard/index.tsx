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
        fetchData();
    }, []);

    const fetchData = async () => {        
        const resp = await listTodo();                        
        setTodo(resp);

        if (resp.error) { setIsError(true); };
        setLoading(false);
    };

    const handleMarkAsComplete = async (ok: boolean) => {
        if (ok) {
            await fetchData();
        }
    };

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
                            <Card title={'Hari ini'} headerColor={'green'}>
                                <CardContent 
                                    contents={todo.today} 
                                    isToday={true} 
                                    success={handleMarkAsComplete}
                                    section="today"/>                        
                            </Card>
                            <Card title={'Mendatang'} headerColor={'yellow'}>
                                <CardContent 
                                    contents={todo.upcoming} 
                                    isToday={false} 
                                    success={() => {}}
                                    section="upcoming"
                                />                        
                            </Card>
                            <Card title={'Selesai'} headerColor={'blue'}>
                                <CardContent 
                                    contents={todo.done} 
                                    isToday={false} 
                                    success={() => {}}
                                    section="done"
                                />                        
                            </Card>
                        </div>
                    </Container>
                )
            }
        </Layout>
    )
};