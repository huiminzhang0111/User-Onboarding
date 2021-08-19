
import './App.css';

import React, { useState, useEffect } from 'react';
import User from './components/User';
import Form from './components/Form';
import formSchema from './validation/formSchema';
import axios from 'axios';
import * as yup from 'yup';

//initial values
const initialValues = {
  name: '',
  email: '',
  password: '',
  //checkbox
  terms: false,
}
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
}

const initialUser = []
const initialDisabled = true


export default function App() {
  //set states
  const [users, setUsers] = useState(initialUser); //array of user object
  const [formValues, setFormValues] = useState(initialValues); // object
  const [formErrors, setFormErrors] = useState(initialFormErrors); // object
  const [disabled, setDisabled] = useState(initialDisabled); // boolean

  const getUsers = () => {
    axios.get(`https://reqres.in/api/users`)
      .then(res => {
        setUsers(res.data.data);
      }).catch(err=>console.error(err))
  }    

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([res.data, ...users]);
      }).catch(err => console.error(err))

      setFormValues(initialValues)
  }

  const validate = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({...formErrors, [name]:''}))
      .catch(err => setFormErrors({...formErrors, [name]:err.errors[0]}))
  }

  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms,
    }

    postNewUser(newUser);
  }

  useEffect(() => {
    getUsers()
  },[]) 

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  },[formValues])

  return (
    <div className="Container">
      <h1>New User Form</h1>
      <Form 
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      {
        Array.from(users).map(user => {
          return (
            <User key={user.id} details={user}/>
          )
        })
      }
    </div>
  )
}

