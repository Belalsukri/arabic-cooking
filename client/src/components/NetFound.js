import React from 'react'

const NetFound = (props) => {
    return (
        <div>
            <h1 className='text-center mt-5'> 404, not found</h1>
            <p className='text-center mt-5'> No Match foe {props.location.pathname}</p>
        </div>
    )
}

export default NetFound
