import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useRef, useState } from "react"
import { Box, IconButton } from "@mui/material"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { grey, pink } from "@mui/material/colors"
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import CallIcon from '@mui/icons-material/Call'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import useHttp from '../hooks/useHttp';
import UserDialog from './UserDialog';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const User = (props) => {
    const {u} = props
    const name = useRef(u.name)
    const userName = useRef(u.userName)
    const email = useRef(u.email)
    const address = useRef(u.address)
    const phone = useRef(u.phone)

    const {updateItem,delItem} = useHttp('users')

    const [expanded, setExpanded] = useState(false)
    const [colorDel, setColorDel] = useState()
    const [colorEdit, setColorEdit] = useState()

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const deleteUser = async () => {
        setColorDel(pink['A400'])
        setExpanded(false)
        try {
            const result = await delItem(u._id)
        }
        catch (error) {
            console.log(error)
        }
        props.refetch()
        setColorDel()
        setExpanded(false)
    }

    const [open, setOpen] = useState(false)

    const handleCancel = () => {
        setOpen(false)
        setColorEdit()
    }

    const handleClose = async () => {
        if (userName.current.value == "")
            return alert("user name is required")
        setOpen(false)
        setColorEdit()
        const updateUser = {
            id: u._id,
            name:name.current.value,
            userName:userName.current.value,
            email:email.current.value,
            address:address.current.value,
            phone:phone.current.value
        }
        try {
            const res = await updateItem(updateUser)
        }
        catch (error) {
            console.log(error)
        }
        props.refetch()
    }

    const updateUser = () => {
        setColorEdit(pink['A400'])
        setOpen(true)
    }

    return (
        <>
        <Card sx={{ width: 245,minHeight:120, margin: "10px"}}>
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
                    {u.userName}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="delete" onClick={deleteUser}>
                    <DeleteIcon style={{ color: colorDel }} />
                </IconButton>
                <IconButton aria-label="edit" onClick={updateUser}>
                    <EditIcon style={{ color: colorEdit }} />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
                <Typography variant="body2" color="text.secondary" onClick={handleExpandClick}>more details</Typography>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph variant="body1" sx={{color:grey[700]}}>
                        <AccountCircleRoundedIcon color='action' sx={{padding:"5px"}}/>
                        {u.name}
                    </Typography>
                    <Typography paragraph variant="body1" sx={{color:grey[700]}}>
                        <HomeRoundedIcon color='action' sx={{padding:"5px"}}/>
                        {u.address}
                    </Typography>
                    <Typography paragraph variant="body1" sx={{color:grey[700]}}>
                        <CallIcon color='action' sx={{padding:"5px"}}/>
                        {u.address}
                    </Typography>
                    <Typography paragraph variant="body1" sx={{color:grey[700]}}>
                        <EmailRoundedIcon color='action' sx={{padding:"5px"}}/>
                        {u.email}
                    </Typography>
                </CardContent>
            </Collapse>

        </Card>

        <UserDialog handleCancel={handleCancel} handleClose={handleClose} h="Add" u={u} open={open} name={name} userName={userName} address={address} phone={phone} email={email}/>
    </>
    );
}

export default User