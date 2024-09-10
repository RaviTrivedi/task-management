import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { RootState } from "../../features/store";
import { taskState } from "../../features/task/taskSlice";
import { Box, Card, CardContent, Container, Paper, Typography } from "@mui/material";

const TaskDescription = () => {

    const { id } = useParams()
    const tasks = useSelector((state: RootState) => state.tasks)
    const [currTask, setCurrTask] = useState<taskState | undefined>()

    useEffect(() => {
        setCurrTask(tasks.find((task) => task.id === id))
    }, [id])

    return (

        <>
            <Container component={Box} margin={3}>
                <Paper component={Box} px={3} py={1}>
                    <Typography variant="h4" align="center" marginY={2}>{currTask?.title}</Typography>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h4" align="center" >{currTask?.description}</Typography>
                            <Typography variant="h4" align="center" >status:{currTask?.status}</Typography>
                        </CardContent>
                    </Card>
                </Paper>
            </Container>
        </>
    )
}

export default TaskDescription