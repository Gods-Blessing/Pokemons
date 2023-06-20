import { Link } from 'react-router-dom';
import './Pokemon.css';
import React, { useEffect, useState, useContext } from "react";
import whitemark from '../../../assets/whitemark.png'
import blackmark from '../../../assets/blackmark.png'

import { BookmarkContext } from '../../../bookmarkContext/BookmarkContext';




function Pokemon(props){
    const {markedPokemon, addBookmark, removeBookmark} = useContext(BookmarkContext);
    const [pokemon, setPokemon] = useState(null);
    const [isMarked, setisMarked] = useState(false);
    // console.log(pokemon)
    // console.log(isMarked);

    function addingMark(){
        setisMarked(true)
        addBookmark(pokemon);
    }


    function removingMark(){
        setisMarked(false)
        removeBookmark(pokemon);
    }



    useEffect(()=>{
        async function datafetch(){
            let data =await fetch(`https://pokeapi.co/api/v2/pokemon/${props.detail && props.detail.name}`);
            
            let maindata = await data.json();
            
            if(localStorage.key('marked')){
                let checkarr = localStorage.getItem('marked');
                let temp = JSON.parse(checkarr);
                console.log(temp);

                for(let i = 0; i < temp.length; i++){
                    if(temp[i].name === maindata.name){
                        setisMarked(true);
                    }
                }

            }
            setPokemon(maindata);
        }

        datafetch();
    }, [])



    return(
        <div className='individual-pokemon-container'>
            
            {
                pokemon ? (<>
                    <div className='pokemon-container-mark'>
                        <img className='pokemon-image' src={pokemon ? pokemon.sprites.other.dream_world.front_default : ""} alt={pokemon.name} />

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
                </>
                ): <h1>Loading....</h1>
            }
                
        </div>
    )
}


export default Pokemon;