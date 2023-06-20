import React, {useState, useContext, useEffect} from 'react';

import whitemark from '../../../assets/whitemark.png'
import blackmark from '../../../assets/blackmark.png'
import { BookmarkContext } from '../../../bookmarkContext/BookmarkContext';



function DetailImage({imgs}){
    const {markedPokemon, addBookmark, removeBookmark} = useContext(BookmarkContext);
    const [isMarked, setisMarked] = useState(false);

    function addingMark(){
        setisMarked(true)
        addBookmark(imgs);
    }


    function removingMark(){
        setisMarked(false)
        removeBookmark(imgs);
    }

    useEffect(()=>{
        if(localStorage.key('marked')){
            let checkarr = localStorage.getItem('marked');
            let temp = JSON.parse(checkarr);
            console.log(temp);

            for(let i = 0; i < temp.length; i++){
                if(temp[i].name === imgs.name){
                    setisMarked(true);
                }
            }
        }
    },[isMarked])


    return(
        <div className='pokemon-container-mark detail'>
                    <img className='detail-image' src={imgs.sprites.other.dream_world.front_default} alt="" />
                    {
                            isMarked ? 
                            <img onClick={()=>removingMark(imgs)} className='bookmark detail-mark' src={blackmark} alt="" />
                            :
                            <img onClick={()=>addingMark(imgs)}  className='bookmark detail-mark' src={whitemark} alt="" />
                    }
                </div>
    )
}

export default DetailImage;