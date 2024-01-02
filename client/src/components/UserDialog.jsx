import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { grey,pink } from "@mui/material/colors"
import { useState } from "react"

const UserDialog=(props)=>{
    const {u}=props
    const [able,setAble] = useState(props.userName.current=="")

    return(
        <Dialog open={props.open} onClose={props.handleCancel}>
            <DialogTitle>{props.h} User</DialogTitle>
            <DialogContent>
                <TextField 
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    variant="outlined"
                    color="action"
                    inputRef={props?.name}
                    sx={{marginRight: 2}}
                    defaultValue={u?.name}
                />
                <TextField
                    margin="dense"
                    id="username"
                    required
                    label="User Name"
                    variant="outlined"
                    color="action"
                    inputRef={props.userName}
                    defaultValue={u?.userName}
                    onChange={()=>{setAble(props.userName.current.value=="")}}
                />
                <TextField
                    margin="dense"
                    id="address"
                    label="Address"
                    variant="outlined"
                    color="action"
                    inputRef={props.address}
                    sx={{marginRight: 2}}
                    defaultValue={u?.address}
                />
                <TextField
                    margin="dense"
                    id="phone"
                    label="Phone"
                    variant="outlined"
                    color="action"
                    inputRef={props.phone}
                    defaultValue={u?.phone}
                />
                <TextField
                    margin="dense"
                    id="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    color="action"
                    inputRef={props.email}
                    defaultValue={u?.email}
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCancel} sx={{ color: grey[600] }}>Cancel</Button>
                <Button onClick={props.handleClose} sx={{ color: 'white', backgroundColor: pink['A400'] }} disabled={able}>Submit</Button>
            </DialogActions>
        </Dialog>
    )   
}

export default UserDialog