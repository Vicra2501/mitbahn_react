import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth'

export default function UserProfileEdit() {

    const storedToken = localStorage.getItem('authToken')
    const { user } = useContext(AuthContext)
    // const deleteUser = userId => {

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);

    // useEffect(() => {
    //     axios.post(`/api/user/${user._id}
    // `, { headers: { Authorization: `Bearer ${storedToken}` } })
    //         .then(response => {
    //             Link('/userprofileedit')
    //         })
    //         .catch(err => console.log(err))
    // }, [])

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = { name, email, password }
        axios.post('/api/auth/userprofilupdate', requestBody)
            .then(response => {
                navigate('/login')
            })
            .catch(err => {
                const errorDescription = err.response.data.errorMessage
                setErrorMessage(errorDescription)
            })
    }


    const handleEmail = e => setEmail(e.target.value)
    const handleName = e => setName(e.target.value)
    const handlePassword = e => setPassword(e.target.value)
    const [errorMessage, setErrorMessage] = useState(undefined);

    return (
        <>
            <form action="/userprofileedit" methode='POST' onSubmit={handleSubmit}>
                <div>User Profile of {user.name}
                    {console.log(user)}
                </div>

                <label>Name:</label>
                <input type='text' placeholder={name} name='Name' value={name} onChange={handleName} />
                <label>Email:</label>
                <input type='email' placeholder={email} email='email' value={email} onChange={handleEmail} />
                <label>Password:</label>
                <input type='password' placeholder={"********"} name='Password' value={password} onChange={handlePassword}/>
                <br></br>
                <button type='submit'>Update Profile</button>
                
                <div id='delete-button'>
                <button id='profile.delete'>Delete Profile</button>
                </div>
            </form>

            {errorMessage && <h5>{errorMessage}</h5>}
            {/* <button onClick={() => deleteUser(user._id)} className="btn-delete"> */}

            {/* Delete 

            </button> */}
        </>

    )
}
