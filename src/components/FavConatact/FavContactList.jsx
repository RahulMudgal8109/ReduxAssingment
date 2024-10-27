import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import FavContactData from './FavContactData';

const FavContactList = () => {
  const [favContacts,setFavContacts]=useState([]);
  // const dispatch=useDispatch();
   const eventOccured = useSelector(state => state.contact.eventOccured);


  //console.log(contacts)
  useEffect(()=>{
    const fetchData=async()=>{
      const res=await fetch(`https://conatctlist-65500-default-rtdb.asia-southeast1.firebasedatabase.app/fav-contact-list.json`);
      const data=await res.json();
      //console.log(data);
      const favContactsData=[];

      for(const key in data)
      {
        favContactsData.push({
          key:key,
          name:data[key].name,
          surname:data[key].surname,
          mobile:data[key].mobile
        })
      }
      //console.log(contactsData)
      setFavContacts(favContactsData);
    }
    fetchData();
    
  },[eventOccured])
  return (
    <div className='contact-list'>
      {
        favContacts.length>0?(
          <table>

        <thead>
          <tr>
            <th><p>Profile</p></th>
            <th><p>Name</p></th>
            <th><p>Surname</p></th>
            <th><p>Mobile</p></th>
           
          </tr>
        </thead>
        <FavContactData favContacts={favContacts}/>
        
      </table>
        ):
        (
          <p>No Data</p>
        )
      }
      
    </div>
  )
}

export default FavContactList