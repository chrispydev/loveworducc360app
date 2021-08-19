import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';

import { Loader } from './components/Loader';
import { db } from './firebase/firebase';
import { Link } from 'react-router-dom';

export function Home() {
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  const attendance = (e) => {
    e.preventDefault();
    setShow(true);

    setTimeout(() => {
      db.collection('profile').onSnapshot((snapshot) =>
        setUsers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    }, 1000);

    const registered = users?.filter(({ id, data }) => {
      if (data.email_address === email) {
        return true;
      }
    });

    if (registered.length === 0) {
      setShow(false);
      alert('You are not a registered user');
    } else {
      var d = new Date();
      var weekday = new Array(7);
      weekday[0] = 'Sunday';
      weekday[1] = 'Monday';
      weekday[2] = 'Tuesday';
      weekday[3] = 'Wednesday';
      weekday[4] = 'Thursday';
      weekday[5] = 'Friday';
      weekday[6] = 'Saturday';

      // db.collection(`SundayService`)
      db.collection(`${weekday[d.getDay()]}Service`)
        .add({
          email: email,
          data: registered.map((service) => service.data) || [],
        })
        .then(() => {
          setEmail('');
          setShow(false);
          alert('Service Attended');
        })
        .catch((error) => {
          setShow(false);
          alert('Try Again', error);
        });
    }
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
        <Form onSubmit={attendance}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email ddress</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              className="input__overwrite"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
          </Form.Group>
          <div className="btn__center">
            <Button
              disabled={email.length === 0 ? true : false}
              variant="primary"
              type="submit"
              className="btn__overwrite btn-lg"
            >
              Submit
            </Button>
          </div>
          <div className="register__link">
            <Link to="/register">New in BlwUCC SignUp</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
