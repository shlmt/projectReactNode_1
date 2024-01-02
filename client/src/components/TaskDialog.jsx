import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { grey,pink } from "@mui/material/colors"
import { useState } from "react"

const TaskDialog=(props)=>{
    const {t}=props
    const [able,setAble] = useState(props.title.current=="")
    return(
        <Dialog open={props.open} onClose={props.handleCancel}>
            <DialogTitle>{props.h} ToDo</DialogTitle>
            <DialogContent>
                <TextField 
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    label="Title"
                    variant="outlined"
                    color="action"
                    inputRef={props.title}
                    sx={{marginRight: 2}}
                    defaultValue={t?.name}
                    onChange={()=>{setAble(props.title.current.value=="")}}
                />
                <TextField
                    margin="dense"
                    id="tags"
                    label="tags"
                    variant="outlined"
                    color="action"
                    inputRef={props.tags}
                    defaultValue={t?.tags}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCancel} sx={{ color: grey[600] }}>Cancel</Button>
                <Button onClick={props.handleClose} sx={{ color: 'white', backgroundColor: pink['A400'] }} disabled={able}>Submit</Button>
            </DialogActions>
        </Dialog>

    )
}

export default TaskDialog