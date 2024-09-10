import {
    Backdrop,
    Box,
    Container,
    Fade,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material"
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import FormField, { FormFieldType } from "../../components/FormField";
import ButtonComponent from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { addTask, deleteTask, updateTask } from "../../features/task/taskSlice";
import { Link } from "react-router-dom";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export interface FormValues {
    title: string;
    description: string;
    status: "pending" | "completed"
};
const Home = () => {
    const [open, setOpen] = useState(false);
    const [currEditData, setCurrEditData] = useState({})
    const statusArr = [
        {
            value: "pending",
            label: "Pending"
        },
        {
            value: "completed",
            label: "Completed"
        },
    ]
    const tasks = useSelector((state: RootState) => state?.tasks)
    const dispatch = useDispatch()
    const taskFields = {
        title: "",
        description: "",
        status: "pending" || "completed"
    }

    const { control, handleSubmit, formState: { errors, }, reset } = useForm<FieldValues>({
        defaultValues: {
            ...taskFields
        },
        mode: "onChange"
    })

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false)
        reset({ ...taskFields })
    }
    const onSubmit = async (data: FieldValues) => {
        if (Object.keys(currEditData).length) {
            dispatch(updateTask(data))
            setCurrEditData({})
        } else {
            dispatch(addTask(data))
        }
        setOpen(false)
        reset()
    }

    const handleEdit = (data: FieldValues) => {
        reset(data)
        setCurrEditData(data)
        setOpen(true)
    }
    const handleDelete = (data: FieldValues) => {
        dispatch(deleteTask(data))
    }
    return (
        <Container component={Box} margin={3}>
            <Paper component={Box} px={3} py={1}>
                <Typography variant="h2" align="center" marginY={2}>Your task manager!</Typography>
                <ButtonComponent
                    variant="contained"
                    onClick={() => {
                        reset({ ...taskFields })
                        handleOpen()
                    }}
                    text="Add New Task"
                    type="button"
                />
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormField
                                    control={control}
                                    name="title"
                                    rules={{
                                        required: "title is required"
                                    }}
                                    type={FormFieldType.INPUT}
                                    id="title"
                                    label="Title"
                                    placeholder="Enter Your Task Title"
                                    fullWidth
                                    error={Boolean(errors?.title)}
                                    helperText={(typeof errors.title?.message === 'string') ? errors.title?.message : undefined}
                                />
                                <FormField
                                    control={control}
                                    name="description"
                                    rules={{
                                        required: "description is required"
                                    }}
                                    type={FormFieldType.TEXTAREA}
                                    id="description"
                                    label="Task description"
                                    placeholder="Enter Your Task Description"
                                    error={Boolean(errors?.description)}
                                    fullWidth
                                    helperText={(typeof errors.description?.message === 'string') ? errors.description?.message : undefined}
                                />
                                <FormField
                                    control={control}
                                    name="status"
                                    rules={{
                                        required: false,
                                    }}
                                    type={FormFieldType.SELECT}
                                    id="status"
                                    label="Task status"
                                    placeholder="Enter Your Task status"
                                    options={statusArr}
                                    error={Boolean(errors?.status)}
                                    fullWidth
                                    helperText={(typeof errors.status?.message === 'string') ? errors.status?.message : undefined}
                                />
                                <ButtonComponent
                                    text="Submit"
                                    variant="contained"
                                    color="primary"
                                    type='submit'
                                />
                            </form>
                        </Box>
                    </Fade>
                </Modal>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Task (S)</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks && tasks.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Link to={`${row.id}`}>
                                            {row.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
                                    <TableCell align="center">
                                        <ButtonComponent
                                            variant="contained"
                                            color="success"
                                            text="Edit"
                                            type="button"
                                            onClick={() => handleEdit(row)}
                                        />
                                        <ButtonComponent
                                            variant="contained"
                                            color="error"
                                            text="Delete"
                                            type="button"
                                            onClick={() => handleDelete(row)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    )
}

export default Home