import React, { useState } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import './ProfileIcon.css';

const ProfileIcon = ({ onRouteChange, toggleModalOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return <div className="pa4 tc">
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        tag="span"
        data-toggle="dropdown"
        aria-expanded={dropdownOpen}
      >
        <img
          src="http://tachyons.io/img/logo.jpg"
          className="br-100 ba h3 w3 dib" alt="avatar" />
      </DropdownToggle>
      <DropdownMenu right className="b--transparent shadow-5 dropdownoption">
        <DropdownItem onClick={toggleModalOpen}>View Profile</DropdownItem>
        <DropdownItem onClick={() => {
          fetch('http://localhost:3001/signout', {
            method: "post",
            headers: {
              "Authorization": window.sessionStorage.getItem('token')
            }
          })
            .then(res => res.json())
            .then(() => {
              window.sessionStorage.removeItem('token');
              onRouteChange('signout')
            })
            .catch(console.log)
        }}>Sign Out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>


}

export default ProfileIcon;