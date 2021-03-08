import React, { useEffect, useState } from 'react'

const Home = ( { dispatch } ) => {
    const [ tenant, setTenant ] = useState( null )

    useEffect(() => {
       axios.get("/tenant").then( res => {
           setTenant( res.data["tenant"] )
       })
    });

    const handleOnLogout = () => {
        axios.get( '/sanctum/csrf-cookie' ).then(()=>{
            axios.post( '/logout' ).then( res => {
                if ( res.status === 204 ) {
                    dispatch( { type: "SIGN_IN", state: false } )
                }
            } )
        } )

    }

    return (
        <>
            <main>
                { tenant ? (
                    <>Welcome in { tenant }'s home!</>
                ) : (
                    <>Welcome home!</>
                )}
            </main>
            <nav>
                <button onClick={ handleOnLogout }>Wyloguj</button>
            </nav>
        </>
    )
}

export default Home
