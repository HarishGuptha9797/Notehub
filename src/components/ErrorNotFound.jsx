import React from 'react'
import {Link} from 'react-router-dom';
export default function ErrorNotFound() {
  return (
    <div style={{color:'white',fontSize:'20px'}}>
        <h1>ErrorNotFound</h1>
        <Link to="/">Back to Home Page</Link>
    </div>
  )
}
