import { Link } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import whitemark from '../../../assets/whitemark.png'
import blackmark from '../../../assets/blackmark.png'

import { BookmarkContext } from '../../../bookmarkContext/BookmarkContext';

function MarkedPokemon({pokemon}){
    const {markedPokemon, addBookmark, removeBookmark} = useContext(BookmarkContext);

    const [isMarked, setisMarked] = useState(markedPokemon.includes(pokemon));

    function addingMark(){
        // setisMarked(true)
        addBookmark(pokemon);
    }


    function removingMark(){
        // setisMarked(false)
        removeBookmark(pokemon);
    }

    console.log(pokemon);

    return(
        <div className='individual-pokemon-container'>

                    <div className='pokemon-container-mark'>
                        <img className='pokemon-image' src={pokemon.img} alt={pokemon.name} />

                        {
                            isMarked ? 
                            <img onClick={()=>removingMark(pokemon)} className='bookmark' src={blackmark} alt="" />
                            :
                            <img onClick={()=>addingMark(pokemon)}  className='bookmark' src={whitemark} alt="" />
                        }
                    </div>
                    <Link to={`/detailpage/${pokemon ? pokemon.name:''}`}>
                    <div className='pokemon-name'>
                        {pokemon ? pokemon.name:''}
                    </div>

                    </Link>
                
        </div>
    )
}


export default MarkedPokemon;