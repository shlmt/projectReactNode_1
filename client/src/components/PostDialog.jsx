import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { grey, pink } from "@mui/material/colors"
import { useState } from "react"

const PostDialog=(props)=>{
    const {p} = props
    const [able,setAble]=useState(props.title.current=="")
    
    return(
        <Dialog open={props.open} onClose={props.handleCancel}>
            <DialogTitle>{props.h} Post</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    label="Title"
                    fullWidth
                    variant="standard"
                    color="action"
                    inputRef={props.title}
                    defaultValue={p?.title}
                    onChange={()=>{setAble(props.title.current.value=="")}}
                />
                <TextField
                    margin="dense"
                    id="body"
                    label="Body"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    color="action"
                    inputRef={props.body}
                    defaultValue={p?.body}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCancel} sx={{ color: grey[600] }}>Cancel</Button>
                <Button onClick={props.handleClose} sx={{ color: 'white', backgroundColor: pink['A400'] }} disabled={able}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default PostDialog