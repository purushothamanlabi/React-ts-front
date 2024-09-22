import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/form.css';
import helloConfig from '../toastConfig';
import URL from '../fetchHook/baseURL';

const Form: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const [email, setEmail] = useState<string>('');

  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedAge = parseInt(e.target.value, 10);
    setAge(isNaN(parsedAge) ? undefined : parsedAge);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidName = (name: string) => {
    return /^[a-zA-Z\s]+$/.test(name); 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formIsValid = true;

    if (!name.trim()) {
      toast.error("Name is required.", helloConfig);
      formIsValid = false;
    } else if (!isValidName(name)) {
      toast.error("Name should only contain letters.", helloConfig);
      formIsValid = false;
    }

    if (age === undefined) {
      toast.error("Age is required.", helloConfig);
      formIsValid = false;
    } else if (age < 1 || age > 120) {
      toast.error("Age must be between 1 and 120.", helloConfig);
      formIsValid = false;
    }

    if (!email.trim()) {
      toast.error("Email is required.", helloConfig);
      formIsValid = false;
    } else if (!isValidEmail(email)) {
      toast.error("Please enter a valid email.", helloConfig);
      formIsValid = false;
    }

    if (!formIsValid) return;

    try {
      const response = await fetch(`${URL}/adduser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          age,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success('User added successfully!', helloConfig);
      navigate("/list");

    } catch (error) {
      console.error("Error adding user:", error);
      toast.error('Failed to add user!', helloConfig);
    }
  };

  return (
    <div className='add-container'>
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <InputText id="name" name="name" value={name} onChange={handleNameChange} required />

        <label htmlFor="age">Age:</label>
        <InputText
          id="age"
          name="age"
          value={age !== undefined ? age.toString() : ''}
          onChange={handleAgeChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <InputText id="email" name="email" value={email} onChange={handleEmailChange} required />

        <button type="submit">Submit</button>
      </form>
      <button><Link to={"/list"}>Back to List</Link></button>
    </div>
  );
};

export default Form;
