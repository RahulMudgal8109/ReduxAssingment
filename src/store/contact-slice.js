import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";


const initialState = {
    key: "",
    contact: {
        name: "",
        surname: "",
        tel: ""
    },
    totalContacts:0,
    eventOccured:false

}
const contactSlice = createSlice({
    name: "conatctSlice",
    initialState,
    reducers: {
        
       
        setExistingKey: (state, action) => {
            state.key = action.payload;
        },
        updateContact: (state, action) => {
            // console.log(action.payload);
            const { key, name, surname, mobile } = action.payload;
            fetch(`https://conatctlist-65500-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list/${key}.json`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({name,surname,mobile})

            })
            state.key=""
        },
         fetchTotalConatcts:(state,action)=>{
            if(!action.payload)
            {
                state.totalContacts=0;
            }
            else{
                state.totalContacts=Object.keys(action.payload).length;

            }
            
            
            state.eventOccured = !state.eventOccured;
        }


    }
})

export const conatctSliceAction = contactSlice.actions;
export default contactSlice.reducer;