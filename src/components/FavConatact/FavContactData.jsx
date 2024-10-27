import React from 'react'

const FavContactData = (props) => {
  return (
    <tbody>
    {
    props.favContacts.map((contact) => (
      <tr key={contact.key}>
        <td>
          <div className='profile-img-box'>
            <i className='fa-solid fa-user'></i>
          </div>
        </td>
        <td><h2>{contact.name}</h2></td>
        <td><h2>{contact.surname}</h2></td>
        <td><h2>{contact.mobile}</h2></td>
        
      </tr>
    ))
    }
  </tbody>
  )
}

export default FavContactData