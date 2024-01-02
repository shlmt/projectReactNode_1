import axios from "axios"

const useHttp=(model)=>{

    const url = 'http://localhost:4444/api/'

    const updateItem = async(obj)=>{

        try {
            const res = await axios.put(url+model,obj)
            // alert(`Updated successfully`)
            return res
        }
        catch (error) {
            throw(error)
        }
    }

    const addItem = async(obj)=>{
        try {
            const res = await axios.post(url+model,obj)
            // alert('Created successfully')
            return res
        }
        catch (error) {
            throw(error)
        }
    }

    const delItem = async(id)=>{
        try {
            const res = await axios.delete(url+model+'/'+id)
            // alert("Deleted successfully")
            return res
        }
        catch (error) {
            throw(error)
        }
    }

    return {addItem,updateItem,delItem}
}

export default useHttp