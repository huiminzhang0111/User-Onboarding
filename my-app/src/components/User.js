import React from 'react'

export default function User({details}) {
    if(!details) {
        return <h3>Working fetching your users</h3>
    }
    return (
        <div className='user container'>
            <h2>{details.first_name}</h2>
            <p>Email: {details.email}</p>
            <p>Password: {details.password}</p>
            <p>Service Terms Agreed: {details.terms}</p>
        </div>
    )
}