import React from 'react'

export default function Form(props) {
    const { values, submit, change, disabled, errors } = props;

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }
    
    const onChange = evt => { 
        const {name, value, checked, type} = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    }

    return (
        <form className='form container' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <h2>Add a User</h2>
                <div className='errors'>
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.terms}</div>
                </div>
            </div>

            <div className='form-group inputs'>
                <h4>General Information</h4>
                <label>Username&nbsp;
                    <input 
                        value={values.name}
                        onChange={onChange}
                        name='name'
                        type='text'
                    />
                </label>
                <label>Email&nbsp;
                    <input 
                        value={values.email}
                        onChange={onChange}
                        name='email'
                        type='text'
                    />
                </label>
                <label>Password&nbsp;
                    <input 
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='password'
                    />
                </label>
            </div>
            <div className='form-group checkbox'>
                <h4>Terms of Service</h4>
                <label>Agree to Terms
                    <input 
                        type='checkbox'
                        name='terms'
                        checked={values.terms}
                        onChange={onChange}
                    />
                </label>
            </div>
            <button disabled={disabled}>Submit</button>
        </form>
    )
}