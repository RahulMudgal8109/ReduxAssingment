import React, { useEffect, useState } from 'react'
import "./Navbar.css";
import { useDispatch, useSelector } from 'react-redux';
import { conatctSliceAction } from "./../../../store/contact-slice.js"
import { Link } from "react-router-dom";

const Navbar = () => {
    //const [totalConatcts,setTotalContacts]=useState("0");
    const totalContacts = useSelector(state => state.contact.totalContacts)
    //console.log(totalContacts)
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchTotalConatcts = () => {
            fetch("https://conatctlist-65500-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list.json")
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    // setTotalContacts(Object.keys(data).length);
                    dispatch(conatctSliceAction.fetchTotalConatcts(data))
                }).catch(error => {
                    console.log(error)
                })
        }
        fetchTotalConatcts()

    }, [])
    return (
        <ul>
            <li>
                <Link to="/">
                    <i className='fa-solid fa-address-book'></i>
                    <div>
                        <h2>All contacts</h2>
                        <p>{totalContacts} contacts</p>
                    </div>
                </Link>


            </li>
            <li>
                <Link to="/fav">

                    <i className='fa-solid fa-heart'></i>
                    <div>
                        <h2>Favourites</h2>
                        <p>10 contacts</p>
                    </div>
                </Link>

            </li>
        </ul>
    )
}

export default Navbar