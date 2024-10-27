import React, { useEffect, useState } from 'react'
import './ContactList.css';
import ContactData from './ContactData';
import { useDispatch, useSelector } from 'react-redux';

const ContactList = () => {
  const [contacts,setContacts]=useState([]);
  const dispatch=useDispatch();
  const eventOccured = useSelector(state => state.contact.eventOccured);


  //console.log(contacts)
  useEffect(()=>{
    const fetchData=async()=>{
      const res=await fetch(`https://conatctlist-65500-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list.json`);
      const data=await res.json();
      //console.log(data);
      const contactsData=[];

      for(const key in data)
      {
        contactsData.push({
          key:key,
          name:data[key].name,
          surname:data[key].surname,
          mobile:data[key].mobile
        })
      }
      //console.log(contactsData)
       setContacts(contactsData);
    }
    fetchData();
    
  },[eventOccured])
  return (
    <div className='contact-list'>
      {
        contacts.length>0?(
          <table>

        <thead>
          <tr>
            <th><p>Profile</p></th>
            <th><p>Name</p></th>
            <th><p>Surname</p></th>
            <th><p>Mobile</p></th>
            <th><p>Actions</p></th>
          </tr>
        </thead>
        <ContactData contacts={contacts}/>
        
      </table>
        ):
        (
          <p>No Data</p>
        )
      }
      
    </div>
  )
}

export default ContactList