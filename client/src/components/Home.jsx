import { Typography } from "@mui/material"
import { grey, pink } from "@mui/material/colors"

const Home=()=>{
    return(
        <>
        <Typography sx={{padding:"40px", color:pink['A400']}} align="center" variant="h2">Home Page</Typography>
        <Typography sx={{padding:"20px", color:grey[600]}} align="center" variant="h3">Shulamt friedman & Lea Bellahsen</Typography>
        <Typography sx={{padding:"20px", color:grey[600]}} align="center" variant="h4">The site for encouraging a healthy lifestyle</Typography>
        </>
    )
}

export default Home