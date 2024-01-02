import { createSlice }from "@reduxjs/toolkit"

const initValue={
     posts:[]
}

const postSlice = createSlice({
    name:"posts",
    initialState:initValue,
    reducers:{
        set:(state,actions)=>{
            state.posts = actions.payload.data
            console.log('postSlice',state.posts)
        }
    }
})

export const {set} =  postSlice.actions
export default  postSlice.reducer