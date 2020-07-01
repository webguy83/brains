import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ isProfileOpen, toggleModalOpen, user, loadUser }) => {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [pet, setPet] = useState(user.pet);

  const onFormChange = (e) => {
    const val = e.target.value;
    switch (e.target.name) {
      case 'user-name':
        setName(val);
        break;
      case 'user-age':
        setAge(val);
        break;
      case 'user-pet':
        setPet(val);
        break;
      default:
        return;
    }
  }

  const onProfileUpdate = (data) => {
    fetch(`http://localhost:3001/profile/${user.id}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json', "Authorization": window.sessionStorage.getItem('token') },
      body: JSON.stringify({ formInput: data })
    })
      .then(res => {
        if (res.status === 200 || res.status === 304) {
          toggleModalOpen();
          loadUser({ ...user, ...data })
        }
      }).catch(console.log)
  }

  return (
    <div className="profile-modal">
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <div className="measure">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="br-100 ba h3 w3 dib" alt="avatar" />
            <h1>{name}</h1>
            <h4>Images submitted: 3247</h4>
            <p>Member since: Fucktober</p>
            <hr />
            <label className="mt2 fw6" htmlFor="user-name">Name:</label>
            <input
              onChange={onFormChange}
              className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
              placeholder={name}
              type="text"
              name="user-name"
              id="user-name"
            />
            <label className="mt2 fw6" htmlFor="user-age">Age:</label>
            <input
              onChange={onFormChange}
              className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
              placeholder={age}
              type="text"
              name="user-age"
              id="user-age"
            />
            <label className="mt2 fw6" htmlFor="user-pet">Pet:</label>
            <input
              onChange={onFormChange}
              className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
              placeholder={pet}
              type="text"
              name="user-pet"
              id="user-pet"
            />
            <div className="lh-copy mt3" style={{ display: 'flex', justifyContent: "space-between" }}>
              <button onClick={() => onProfileUpdate({ name, age, pet })} className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20">Save</button>
              <button onClick={toggleModalOpen} className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20">Cancel</button>
            </div>
          </div>
        </main>
        <div className="modal-close" onClick={toggleModalOpen}>&times;</div>
      </article>
    </div>
  );
};

export default Profile;