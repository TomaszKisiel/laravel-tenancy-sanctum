import React, { useEffect, useReducer, useState } from 'react'

import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import AuthenticatedRoute from "./components/routes/AuthenticatedRoute"
import UnauthenticatedRoute from "./components/routes/UnauthenticatedRoute"

require( './bootstrap' )

const reducer = ( state, action ) => {
    switch ( action.type ) {
        case "SIGN_IN": {
            return {
                ...state,
                isAuthenticated: action.state,
                loading: false
            }
        }
        default:
            return state
    }
}

const initialAuth = {
    isAuthenticated: false,
    loading: true
}


const App = () => {
    const [ auth, dispatch ] = useReducer( reducer, initialAuth )

    useEffect( () => {
        axios.get( '/sanctum/csrf-cookie' ).then( () => {
            axios.post( "/" ).then( res => {
                if ( res.status === 200 ) {
                    dispatch( { type: "SIGN_IN", state: true } )
                } else {
                    dispatch( { type: "SIGN_IN", state: false } )
                }
            } ).catch( () => {
                dispatch( { type: "SIGN_IN", state: false } )
            } )
        } )
    }, [] )

    return (
        ( auth.loading ) ? (
            <div>Czekaj...</div>
        ) : (
            <Router>
                <Switch>
                    <AuthenticatedRoute path="/home" authenticated={ auth.isAuthenticated }>
                        <Home dispatch={ dispatch }/>
                    </AuthenticatedRoute>
                    <AuthenticatedRoute path="/dashboard" authenticated={ auth.isAuthenticated }>
                        <h1>Dashboard</h1>
                    </AuthenticatedRoute>
                    <UnauthenticatedRoute path="/" authenticated={ auth.isAuthenticated }>
                        <Login dispatch={ dispatch }/>
                    </UnauthenticatedRoute>
                    {/*<Route exact path="/home">*/ }
                    {/*    { ( auth.isAuthenticated ) ? <Home/> : <Redirect to="/login"/> }*/ }
                    {/*</Route>*/ }
                    {/*<Route exact path="/register">*/ }
                    {/*    /!*{ ( ! auth.isAuthenticated ) ? <Login dispatch={ dispatch }/> : <Redirect to="/home"/> }*!/*/ }
                    {/*</Route>*/ }
                    {/*<Route path="/">*/ }
                    {/*    { ( ! auth.isAuthenticated ) ? <Login dispatch={ dispatch }/> : <Redirect to="/home"/> }*/ }
                    {/*    /!*<Login dispatch={ dispatch }/>*!/*/ }
                    {/*</Route>*/ }
                </Switch>
            </Router>
        )
    )
}

if ( document.getElementById( 'root' ) ) {
    ReactDOM.render( <App/>, document.getElementById( 'root' ) )
}
