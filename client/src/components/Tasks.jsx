import useAxios from "axios-hooks"
import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch} from "react-redux"
import { set } from "../Slices/taskSlice"
import Todo from "./Todo"
import { IconButton, Stack } from "@mui/material"
import AddTaskIcon from '@mui/icons-material/AddTask';
import { pink } from "@mui/material/colors"
import useHttp from "../hooks/useHttp"
import TaskDialog from "./TaskDialog"

const Tasks=(props)=>{
    const [{ data, loading, error }, refetch] = useAxios('http://localhost:4444/api/tasks')
    const {addItem} = useHttp('tasks')

    const dispatch = useDispatch()
    useEffect(() => {loading ? console.log('loading') : dispatch(set({data:data})) }, [data])
    const tasks = useSelector(myStore=>myStore.taskSlice.tasks)
    
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => { setOpen(true) }
    const title = useRef("")
    const tags =  useRef("")
    const complete = useRef("")

    const handleCancel = () => {
        setOpen(false)
        title.current = ""
        tags.current = ""
        complete.current = ""
    }

    const handleClose = async () => {
        if (title.current.value == "")
            return alert("title is required")
        setOpen(false)
        const newTask = {
            name:title.current.value,
            tags:tags.current.value?.split(' '),
            complete:complete.current.value
        }
        try {
            const res = await addItem(newTask)
        }
        catch (error) {
            console.log(error)
        }
        title.current =""
        tags.current = ""
        complete.current = ""
        refetch()
    }

    return(
        <>
        <Stack padding={0} margin="10px" flexWrap="wrap" direction={{ xs: 'column', md: 'row' }} justifyContent={"center"} alignItems={{ md: "flex-start", xs: "center" }}>
            {tasks.map(t=>{if(t.name.includes(props.searchVal)) return <Todo t={t} refetch={refetch} key={t._id}/>})}
        </Stack>

        <IconButton aria-label="edit" onClick={handleClickOpen} sx={{ bottom: 40, right: 40, position: 'absolute' }}>
            <AddTaskIcon style={{fontSize:'85px', color: pink['A400'] }} />
        </IconButton>

        <TaskDialog handleCancel={handleCancel} handleClose={handleClose} h="Add" open={open} title={title} tags={tags}/>
        </>
    )
}

export default Tasks