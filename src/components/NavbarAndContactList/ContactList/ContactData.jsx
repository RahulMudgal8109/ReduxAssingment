import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conatctSliceAction } from "./../../../store/contact-slice.js";
import { deleteContact, addToFavList, removeFromFav } from '../../../store/contact-action.js';

const ContactData = (props) => {
    const dispatch = useDispatch();
    const contactKeys = useSelector(state => state.favContact.contactKeys);
  
    const isFavorite = (key) => {
         const idx=contactKeys.findIndex(contact => contact.key === key);
         if(idx!==-1){
          return true;
         }
         return false;
    };

    const handleDelete = (key) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            dispatch(deleteContact(key));
        }
    };

    const handleEdit = (key) => {
        dispatch(conatctSliceAction.setExistingKey(key));
    };

    const handleFav = (key) => {
        if (isFavorite(key)) {
            dispatch(removeFromFav(key, contactKeys));
        } else {
            dispatch(addToFavList(key));
        }
    };

    return (
        <tbody>
            {
                props.contacts.map((contact) => (
                    <tr key={contact.key}>
                        <td>
                            <div className='profile-img-box'>
                                <i className='fa-solid fa-user'></i>
                            </div>
                        </td>
                        <td><h2>{contact.name}</h2></td>
                        <td><h2>{contact.surname}</h2></td>
                        <td><h2>{contact.mobile}</h2></td>
                        <td>
                            <div>
                                <i className='fa-solid fa-pen' title="Edit" onClick={() => handleEdit(contact.key)}></i>
                                <i
                                    className='fa-solid fa-trash'
                                    onClick={() => handleDelete(contact.key)}
                                    title="Delete"
                                    style={{ cursor: 'pointer', color: 'red' }}
                                ></i>
                                <i
                                    className={`fa-solid fa-heart${isFavorite(contact.key) ? ' red-heart' : ''}`}
                                    title="Favorite"
                                    onClick={() => handleFav(contact.key)}
                                    style={{ cursor: 'pointer', color: isFavorite(contact.key) ? 'red' : 'black' }}
                                ></i>
                            </div>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    );
};

export default ContactData;
