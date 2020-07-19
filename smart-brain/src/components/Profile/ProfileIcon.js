import React, { useState } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import './ProfileIcon.css';
import { useEffect } from 'react';

const ProfileIcon = ({ onRouteChange, toggleModalOpen, pet }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [petImg, setPetImg] = useState("")

  useEffect(() => {
    fetch(`https://sjx5jfrccl.execute-api.us-east-1.amazonaws.com/prod/pet?pet=${pet}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.input) {
          setPetImg(data.input);
        } else {
          setPetImg('http://tachyons.io/img/logo.jpg');
        }
      })
      .catch(console.log)
  }, [pet])

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
        {petImg ? <img
          src={petImg}
          className="br-100 ba h3 w3 dib" alt="avatar" /> : null}

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