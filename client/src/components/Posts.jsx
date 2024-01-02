import useAxios from "axios-hooks"
import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { set } from "../Slices/postSlice"
import Post from "./Post"
import { IconButton, Stack, responsiveFontSizes } from "@mui/material"
import PostAddIcon from '@mui/icons-material/PostAdd';
import { pink } from "@mui/material/colors"
import useHttp from "../hooks/useHttp"
import PostDialog from "./PostDialog"

const Posts = (props) => {
    const [{ data, loading, error }, refetch] = useAxios('http://localhost:4444/api/posts')
    const {addItem} = useHttp('posts')

    const dispatch = useDispatch()
    useEffect(() => { loading ? console.log('loading') : dispatch(set({ data: data })) }, [data])
    const posts = useSelector(myStore => myStore.postSlice.posts)

    const [open, setOpen] = useState(false)
    const handleClickOpen = () => { setOpen(true) }

    const title = useRef("")
    const body = useRef("")

    const handleCancel = () => {
        setOpen(false)
        title.current.value = ""
        body.current.value = ""
    }

    const handleClose = async () => {
        if (title.current.value == "")
            return alert("title is required")
        setOpen(false)
        const newPost = {
            title: title.current.value,
            body: body.current.value
        }
        try {
            const res = await addItem(newPost)
        }
        catch (error) {
            console.log(error)
        }
        title.current = ""
        body.current = ""
        refetch()
    }


    return (<>
        <Stack padding={0} margin="10px" flexWrap="wrap" direction={{ xs: 'column', md: 'row' }} justifyContent={"center"} alignItems={{ md: "flex-start", xs: "center" }}>
            {posts.map(p => {if(p.title.includes(props.searchVal)) return <Post p={p} refetch={refetch} key={p._id}/> })}
        </Stack>

        <IconButton aria-label="edit" onClick={handleClickOpen} sx={{ bottom: 40, right: 40, position: 'fixed' }}>{/* <> //!</> */}
            <PostAddIcon style={{fontSize:'85px', color: pink['A400'] }} />
        </IconButton>

        <PostDialog handleCancel={handleCancel} handleClose={handleClose} h="Add" open={open} title={title} body={body}/>
        </>
    )
}

export default Posts