import useAxios from "axios-hooks"
import { set } from "../Slices/userSlice"
import { useEffect, useRef, useState } from "react"
import { IconButton, Stack } from "@mui/material"
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import {  pink } from "@mui/material/colors"
import { useDispatch,useSelector } from "react-redux"
import User from "./User"
import useHttp from "../hooks/useHttp"
import UserDialog from "./UserDialog"

const Users=(props)=>{
    const [{ data, loading, error }, refetch] = useAxios('http://localhost:4444/api/users')
    const {addItem} = useHttp('users')

    const dispatch = useDispatch()
    useEffect(() => {loading?console.log('loading'):dispatch(set({data:data})) }, [data])
    const users = useSelector(myStore=>myStore.userSlice.users)
    
    const name = useRef('')
    const userName = useRef('')
    const email = useRef('')
    const address = useRef('')
    const phone = useRef('')

    const [open, setOpen] = useState(false)
    const handleClickOpen = () => { setOpen(true) }

    const handleCancel = () => {
        setOpen(false)
        name.current.value = ""
        userName.current.value = ""
        email.current.value = ""
        address.current.value = ""
        phone.current.value = ""
    }

    const handleClose = async () => {
        if (userName.current.value == "")
            return alert("user name is required")
        setOpen(false)
        const newUser = {
            name:name.current.value,
            userName:userName.current.value,
            email:email.current.value,
            address:address.current.value,
            phone:phone.current.value
        }
        try {
            const res = await addItem(newUser)
        }
        catch (error) {
            console.log(error)
        }
        name.current =""
        userName.current = ""
        email.current = ""
        address.current =""
        phone.current =""
        refetch()
    }

    return(
        <>
        <Stack padding={0} margin="10px" flexWrap="wrap" direction={{ xs: 'column', md: 'row' }} justifyContent={"center"} alignItems={{ md: "flex-start", xs: "center" }}>
            {users.map(u=>{
                if(u.name?.includes(props.searchVal)||u.userName?.includes(props.searchVal)||u.email?.includes(props.searchVal)||u.address?.includes(props.searchVal)||u.phone?.includes(props.searchVal))
                    return<User u={u} refetch={refetch} key={u._id}/>
                })}
        </Stack>
        
        <IconButton aria-label="edit" onClick={handleClickOpen} sx={{ bottom: 40, right: 40, position: 'absolute' }}>
            <PersonAddIcon  style={{fontSize:'85px', color: pink['A400'] }} />
        </IconButton>

        <UserDialog handleCancel={handleCancel} handleClose={handleClose} h="Add" open={open} name={name} userName={userName} address={address} phone={phone} email={email}/>
        </>
    )
}

export default Users