import './BookmarkedPage.css';

import React, {useContext} from 'react';

import { BookmarkContext } from '../../bookmarkContext/BookmarkContext';

import Pokemon from '../listingPage/pokemon/Pokemon';
import MarkedPokemon from './markedpokemon/MarkedPokemon';


function BookmarkedPage(){
    const {markedPokemon, addBookmark, removeBookmark} = useContext(BookmarkContext)
    console.log(markedPokemon)

    

    return(
        <div id='the-pokemon-container' className='pokemon-container'>
                {   markedPokemon.length == 0 ? <h1>No Pokemon Bookmarked</h1>:
                    markedPokemon.map((data)=>{
                        // console.log(data)
                        return ( 
                            <MarkedPokemon key={data.name} pokemon={data}/>
                        )
                    })
                }

        </div>
    )

}


export default BookmarkedPage;