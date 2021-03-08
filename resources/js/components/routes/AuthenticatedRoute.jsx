import React from 'react'
import { Route, Redirect } from "react-router-dom"

const AuthenticatedRoute = ( { children, authenticated, ...rest } ) => {
    // const [ authState, authDispatch ] = useAuthContext()

    return (
        authenticated ? (
            <Route { ...rest }>
                { children }

            </Route>
        ) : (
            <Redirect to="/login"/>
        )
    )
}

export default AuthenticatedRoute
