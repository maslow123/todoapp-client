import { Layout } from "@components/common"
import { Card, CardContent, Container } from "@components/ui";
import s from './Dashboard.module.css';

interface Data {
    title: string;
    content: string;
    due_date: string;
};

export default function Dashboard() {
    const sampleContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more 
    recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    `;

    const headers: string[] = ['Today', 'Upcoming', 'Done'];
    const contents: Data[] = [
        {
            title: 'Title 1',
            content: sampleContent,
            due_date: '10.00 PM'
        },
        {
            title: 'Title 2',
            content: sampleContent,
            due_date: '11.00 PM'
        },
        {
            title: 'Title 3',
            content: sampleContent,
            due_date: '12.00 PM'
        },
        {
            title: 'Title 4',
            content: sampleContent,
            due_date: '1.00 PM'
        },
        
        {
            title: 'Title 5',
            content: sampleContent,
            due_date: '1.00 PM'
        },
        {
            title: 'Title 6',
            content: sampleContent,
            due_date: '1.00 PM'
        },
        
        {
            title: 'Title 7',
            content: sampleContent,
            due_date: '1.00 PM'
        }
    ];

    return (

        <Container>
            <div className={s.card}>
                {headers.map(i => (
                    <Card key={i} title={i}>
                        <CardContent contents={contents} />                        
                    </Card>
                ))}
            </div>
        </Container>
    )
};

Dashboard.Layout = Layout;