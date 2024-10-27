import { conatctSliceAction } from "./contact-slice"
import favContactSlice, { favContactSliceActions } from "./favContactSlice"
export const addContact = (userData) => {

    //console.log(action.payload)
    return (dispatch) => {
        fetch(`https://conatctlist-65500-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list.json`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            }
        ).then(() => {
            fetch("https://conatctlist-65500-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list.json")
                .then(res => res.json())
                .then(data => {
                    dispatch(conatctSliceAction.fetchTotalConatcts(data))
                })

        }).catch(error => {
            console.log(error);
        })

    }


}
export const deleteContact = (deleteKey) => {
    //const deleteKey = action.payload;
    return (dispatch) => {
        fetch(`https://conatctlist-65500-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list/${deleteKey}.json`,
            {
                method: "DELETE"

            }).then(() => {
                fetch("https://conatctlist-65500-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list.json")
                    .then(res => res.json())
                    .then(data => {
                        dispatch(conatctSliceAction.fetchTotalConatcts(data))
                    })

            }).catch(error => {
                console.log(error);
            })
    }

}
export const addToFavList = (key) => {
    return (dispatch) => {
        fetch(`https://conatctlist-65500-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list/${key}.json`)
            .then(res => res.json())
            .then(data => {
                fetch(`https://conatctlist-65500-default-rtdb.asia-southeast1.firebasedatabase.app/fav-contact-list/.json`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    }
                )
                .then(res=>res.json())
                .then(data=>{
                    const newKey=data.name;
                    dispatch(favContactSliceActions.setContactKeys({key:key,favKey:newKey}))
                })
            })
           
           
            .catch(err => {
                console.log(err)
            })
    }

}
export const removeFromFav =(key,contactKeys)=>{
    return (dispatch)=>{
        console.log(contactKeys)
        const keyToRemove=key;
        const indexToRemove=contactKeys.findIndex(contact=>contact.key===keyToRemove);
        console.log(indexToRemove)

        if(indexToRemove!==-1)
        {
            const favKeyToRemove=contactKeys[indexToRemove].favKey;
            console.log(favKeyToRemove)
            fetch(`https://conatctlist-65500-default-rtdb.asia-southeast1.firebasedatabase.app/fav-contact-list/${favKeyToRemove}.json`,{
                method:"DELETE"
            }).then(res=>res.json())
            .then(data=>console.log(data))
            .catch(error=>console.log(error))
        }
    }

}