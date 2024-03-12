import React from "react";
import './styles/Search.css'
const Search = ( {handleSearchNote} ) =>{
    return(
        <div className="Search">
            <input 
                onChange={(event)=>handleSearchNote(event.target.value.toLocaleLowerCase())} 
                type="text" 
                placeholder="Type to search" 
            />
        </div>
    )
}
export default Search