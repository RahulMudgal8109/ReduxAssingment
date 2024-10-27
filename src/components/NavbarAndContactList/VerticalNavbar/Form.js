import React, { useEffect, useState } from 'react'
import "./Form.css";
import addnewImage from "../../../assets/add-new.svg";
import Button from '../../Ui/Button.js';
import { useDispatch, useSelector } from 'react-redux';
import {conatctSliceAction} from "./../../../store/contact-slice.js";
import {addContact} from "./../../../store/contact-action.js"


const Form = () => {
  //console.log(conatctSliceAction)
  const {updateContact}=conatctSliceAction;
  //console.log(addContact);
  const dispatch=useDispatch();
  const existingContactKey=useSelector((state)=>state.contact.key);
 // console.log(existingContactKey)

  useEffect(()=>{
    const fetchExistingData=async()=>{
      const res=await fetch(`https://conatctlist-65500-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list/${existingContactKey}.json`);
      //console.log(res)
      const data=await res.json();
      //console.log(data);

      setUserData({
        name:data?.name || "",
        surname:data?.surname || "",
        mobile:data?.mobile || ""
      })
    }
    fetchExistingData();

  },[existingContactKey])


  //console.log(existingContactKey)
  const [userData,setUserData]=useState({
    name:"",
    surname:"",
    mobile:""
  })


  const inputChange=(e)=>{
    setUserData({
      ...userData,
      [e.target.name]:e.target.value

    })
  }


  const submitHandler=(e)=>{
    e.preventDefault();
    if(existingContactKey)
    {
      dispatch(updateContact(
        {
          key:existingContactKey,
          name:userData.name,
          surname:userData.surname,
          mobile:userData.mobile
        }
      ))
      //existingContactKey=""
    }
    else{
      dispatch(addContact(userData));

    }
    
    setUserData({
     name:"",
     surname:"",
     mobile:""

    })
  }

  return (
    <form className='form' onSubmit={submitHandler}>
      <div className='add-new-img'>
        <img src={addnewImage}></img>
      </div>
      <div className='input-text'>
        <input
          type='text'
          placeholder='name' name="name" value={userData.name} onChange={inputChange} required pattern='[A-Za-z]+'/>
        <input
          type='text'
          placeholder='surname' name="surname" value={userData.surname} onChange={inputChange} required pattern='[A-Za-z]+'/>
      </div>
      <div className='input-tel'>
        <input
          type='text'
          placeholder='7854809325' name="mobile" value={userData.mobile} onChange={inputChange} required pattern='^[1-9]\d*$' maxLength={10} minLength={10}/>
      </div>
      <Button type="submit" name='Add' />
    </form>
  )
}

export default Form