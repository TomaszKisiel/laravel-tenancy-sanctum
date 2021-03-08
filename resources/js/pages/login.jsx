import React, { useState } from 'react'

const Login = ( { dispatch } ) => {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleOnSubmit = async ( e ) => {
        e.preventDefault()

        axios.get( '/sanctum/csrf-cookie' ).then(()=>{
            axios.post( '/login', {
                email: email,
                password: password,
                remember: true
            } ).then( res => {
                if ( res.status === 200 ) {
                    dispatch( { type: "SIGN_IN", state: true } )
                }
            }).catch( err => console.log( err ))
        })
    }

    return (
        <form onSubmit={ handleOnSubmit }>
            <div style={ { marginBottom: "15px" } }>
                <label htmlFor="email">Email</label><br/>
                <input
                    id="email"
                    type="email"
                    value={ email }
                    onChange={ e => setEmail( e.target.value ) }
                    placeholder="smith@
                    example.com" autoComplete={ "off" }/>
            </div>
            <div style={ { marginBottom: "30px" } }>
                <label htmlFor="password">Password</label><br/>
                <input
                    id="password"
                    type="password"
                    value={ password }
                    onChange={ e => setPassword( e.target.value ) }
                    placeholder="password"
                    autoComplete={ "off" }/>
            </div>
            <button type="submit">Sign in</button>
        </form>
    )
}

export default Login
