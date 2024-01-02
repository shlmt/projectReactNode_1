import { createSlice }from "@reduxjs/toolkit"

const initValue={
    tasks:[]
}

const taskSlice = createSlice({
    name:"tasks",
    initialState:initValue,
    reducers:{
        set:(state,actions)=>{
            state.tasks = actions.payload.data
            console.log('taskSlice',state.tasks);
        }
    }
})

export const {set} = taskSlice.actions
export default taskSlice.reducer