import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';

import { Loader } from './components/Loader';
import { db, auth } from './firebase/firebase';
import { Link } from 'react-router-dom';

export function SignUp() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [hallHostel, setHallHostel] = useState('');
  const [fellowship, setFellowship] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const history = useHistory();

  const register = (e) => {
    e.preventDefault();
    setShow(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        updateUser(authUser);
        setShow(false);
        setEmail('');
        setFellowship('');
        setHallHostel('');
        setName('');
        setPassword('');
        setPhone('');
        alert('Registered successfully');
      })
      .catch((error) => {
        setShow(false);
        alert(error.message);
      });
  };
  const updateUser = (authUser) => {
    authUser.user.updateProfile({
      displayName: name,
      photoURL: 'https://www.w3schools.com/w3images/avatar2.png',
    });

    db.collection('profile').doc(name).set({
      full_name: name,
      email_address: email,
      hall_Hostel: hallHostel,
      fellowship: fellowship,
      phone_number: phone,
      date_of_birth: 'choose your date of Birth',
    });
    history.push('/');
  };

  return (
    <div className="app">
      <h1 className="welcome__text">Welcome to Church</h1>
      {show && (
        <>
          <Loader />
        </>
      )}

      <img src="/UCCNEW.png" alt="logo" />

      <div className="form__wrapper container mx-auto">
        <Form onSubmit={register}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full Name"
              value={name}
              className="input__overwrite"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="tell"
              placeholder="Enter your contact"
              value={phone}
              className="input__overwrite"
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email ddress</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              className="input__overwrite"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Hall or Hostel</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Hall or Hostel"
              value={hallHostel}
              className="input__overwrite"
              onChange={(e) => setHallHostel(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Fellowship</Form.Label>
            <Form.Select
              size="sm"
              onChange={(e) => setFellowship(e.target.value)}
            >
              <option>Choose your Fellowship</option>
              <option>Mimshack</option>
              <option>Ambassadors</option>
              <option>Loveworld Generals</option>
              <option>Pleroma</option>
              <option>Avans Guards</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your Password"
              value={password}
              className="input__overwrite"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="btn__center">
            <Button
              disabled={
                name.length === 0 ||
                phone.length === 0 ||
                hallHostel.length === 0 ||
                email.length === 0
                  ? true
                  : false
              }
              variant="primary"
              type="submit"
              className="btn__overwrite btn-lg"
            >
              Register
            </Button>
          </div>
        </Form>
        <div className="register__link">
          <Link to="/">Register</Link>
        </div>
      </div>
    </div>
  );
}
