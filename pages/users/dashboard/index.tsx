import { Layout } from "@components/common"
import { Card, CardContent, Container, FAB } from "@components/ui";
import { mock } from "util/mock";
import s from './Dashboard.module.css';

export default function Dashboard() {
    const data = mock.todos.list;

    return (
        <Layout title="My Task">
            <Container>
                <FAB/>
                <div className={s.card}>
                    <Card title={'Today'} headerColor={'green'}>
                        <CardContent contents={data.today} isToday={true}/>                        
                    </Card>
                    <Card title={'Upcoming'} headerColor={'yellow'}>
                        <CardContent contents={data.upcoming} isToday={false}/>                        
                    </Card>
                    <Card title={'Done'} headerColor={'blue'}>
                        <CardContent contents={data.done} isToday={false}/>                        
                    </Card>
                </div>
            </Container>
        </Layout>
    )
};