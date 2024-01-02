import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useRef, useState } from "react"
import { CardActions, Checkbox, IconButton, Stack } from "@mui/material"
import { pink } from "@mui/material/colors"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import useHttp from '../hooks/useHttp';
import TaskDialog from './TaskDialog';

const Todo=(props)=>{
    const {t} = props
    const title = useRef(t.name)
    const tags =  useRef(t.tags.join(","))
    const complete = useRef(t.complete)

    const {updateItem,delItem} = useHttp('tasks')

    const [colorDel, setColorDel] = useState('action')
    const [colorEdit, setColorEdit] = useState('action')

    const deleteTask = async () => {
        setColorDel(pink['A400'])
        try {
            const result = await delItem(t._id)
        }
        catch (error) {
            console.log(error)
        }
        props.refetch()
        setColorDel()
    }

    const [open, setOpen] = useState(false)

    const handleCancel = () => {
        setOpen(false)
        setColorEdit()
    }

    const handleClose = async () => {
        if (title.current.value == "")
            return alert("title is required")
        const updateTask = {
            id: t._id,
            name:title.current.value,
            tags:tags.current.value?.split(' '),
            complete:complete.current
        }
        try {
            const res = await updateItem(updateTask)
        }
        catch (error) {
            console.log(error)
        }
        props.refetch()
        setOpen(false)
        setColorEdit()
    }

    const [isCheck,setIsCheck] = useState(t.complete)

    const updateTask = () => {
        setColorEdit(pink['A400'])
        setOpen(true)
    }

    const setComplete = async(event)=>{
        setIsCheck(event.target.checked)
        try {
            const res = await axios.put('http://localhost:4444/api/tasks/'+t._id)
            console.log(`${res} ${title.current} updated`)
        }
        catch (error) {
            console.log(error)
        }
    }


    return(
        <>
        <Card sx={{ width: 245,height:150, margin: "10px" }}>
            <CardContent>
                <Typography
                    variant="h5"
                    textAlign="center"
                    component="h5"
                    bgcolor={'gray'}
                    color="white"
                    sx={{ borderRadius: 1 }}
                    fontFamily="Monospace"
                >
                    {t.name}
                </Typography>
                <Typography paragraph variant="body1" sx={{color:'action', margin:"10px"}}>
                    {t.tags.map((t)=>{return(t+" ")})}
                </Typography>
                <CardActions disableSpacing>
                    <IconButton aria-label="delete" onClick={deleteTask}>
                        <DeleteIcon style={{ color: colorDel }} />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={updateTask}>
                        <EditIcon style={{ color: colorEdit }} />
                    </IconButton>
                    <Checkbox
                        icon={<CheckCircleOutlineIcon/>} 
                        checkedIcon={<CheckCircleIcon/>} 
                        onClick={setComplete}
                        checked={isCheck}
                        sx={{color:'action',
                            '&.Mui-checked': {
                            color: pink['A400']},
                    }}
                    />
                </CardActions>
            </CardContent>
        </Card>

        <TaskDialog handleCancel={handleCancel} handleClose={handleClose} h="Edit" open={open} t={t} title={title} tags={tags}/>     
        </>   
    )
}

export default Todo