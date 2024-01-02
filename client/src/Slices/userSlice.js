import { createSlice }from "@reduxjs/toolkit"


const initValue={
    users:[]
}

const userSlice = createSlice({
    name:"users",
    initialState:initValue,
    reducers:{
        set:(state,actions)=>{
            state.users = actions.payload.data
            console.log('userSlice',state.users);
        }
    }
})

export const {set} = userSlice.actions
export default userSlice.reducer