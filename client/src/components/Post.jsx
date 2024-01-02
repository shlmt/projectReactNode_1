import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRef, useState } from "react"
import { IconButton } from "@mui/material"
import { pink } from "@mui/material/colors"
import useHttp from '../hooks/useHttp';
import PostDialog from './PostDialog';

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

const Post = (props) => {
    const { p } = props
    const {updateItem,delItem} = useHttp('posts')

    let bodyStart;
    if (p.body.length > 50) bodyStart = p.body.split(' ').slice(0, 50).join(' ') + "..."
    else bodyStart = p.body.split(' ').slice(0, 50).join(' ')

    const [expanded, setExpanded] = useState(false)
    const [colorLike, setColorLike] = useState('action')
    const [numLikes, setNumLikes] = useState(Math.floor(Math.random()*25))
    const [colorDel, setColorDel] = useState('action')
    const [colorEdit, setColorEdit] = useState('action')
    const [open, setOpen] = useState(false)

    const title = useRef(p.title)
    const body = useRef(p.body)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const like = () => {
        if (colorLike == 'action') {
            setColorLike(pink['A400'])
            setNumLikes(numLikes + 1)
        }
        else {
            setColorLike('action')
            setNumLikes(numLikes - 1)
        }
    }

    const deletePost = async () => {
        setColorDel(pink['A400'])
        try {
            const result = await delItem(p._id)
        }
        catch (error) {
            console.log(error)
        }
        props.refetch()
        setColorDel('action')
        setExpanded(false)
    }


    const handleCancel = () => {
        setOpen(false)
        setColorEdit()
    }

    const handleClose = async () => {
        if (title.current.value == "")
            return alert("title is required")
        const updatePost = {
            id: p._id,
            title: title.current.value,
            body: body.current.value
        }
        try {
            const res = await updateItem(updatePost)
        }
        catch (error) {
            console.log(error)
        }
        props.refetch()
        setOpen(false)
        setColorEdit()
    }

    const updatePost = () => {
        setColorEdit(pink['A400'])
        setOpen(true)
    }

    return (
        <>
        <Card sx={{ width: 345, margin: "10px"}}>
            <CardContent>
                <Typography
                    variant="h5"
                    textAlign="center"
                    component="h6"
                    bgcolor={'gray'}
                    color="white"
                    sx={{ borderRadius: 1 }}
                    fontFamily="Monospace"
                >
                    {p.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" padding="10px 0 0 0">
                    {bodyStart}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="delete" onClick={deletePost}>
                    <DeleteIcon style={{ color: colorDel }} />
                </IconButton>
                 <IconButton aria-label="edit" onClick={updatePost}>
                    <EditIcon style={{ color: colorEdit }} />
                </IconButton>
                <IconButton aria-label="add to favorites" onClick={like}>
                    <EmojiEventsIcon sx={{ color: colorLike }} />
                </IconButton>
                <Typography variant="body2">
                    {numLikes}
                </Typography>
               
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
                <Typography variant="body2" color="text.secondary" onClick={handleExpandClick}>more</Typography>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph variant="body1" color="text.secondary">
                        {p.body.split(' ').slice(50).join(' ')}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>

        <PostDialog handleCancel={handleCancel} handleClose={handleClose} h="Edit" open={open} p={p} title={title} body={body}/>
        </>
    );
}

export default Post