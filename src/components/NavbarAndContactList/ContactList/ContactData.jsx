import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { conatctSliceAction } from "./../../../store/contact-slice.js"
import { deleteContact, addToFavList, removeFromFav } from '../../../store/contact-action.js';

const ContactData = (props) => {
  const dispatch = useDispatch();
  const contactKeys = useSelector(state => state.favContact.contactKeys);
  
  // Local state to track the favorite status of each contact
  const [favoriteStatus, setFavoriteStatus] = useState({});

  const isFavorite = (key) => {
    return contactKeys.some(contact => contact.key === key) && favoriteStatus[key] === true;
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
      setFavoriteStatus(prev => ({ ...prev, [key]: false })); // Update local state to reflect removal
    } else {
      dispatch(addToFavList(key));
      setFavoriteStatus(prev => ({ ...prev, [key]: true })); // Update local state to reflect addition
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
                  style={{ cursor: 'pointer', color: isFavorite(contact.key) ? 'red' : 'black' }} // Change color based on favorite status
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
