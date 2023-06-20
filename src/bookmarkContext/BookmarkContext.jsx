import { createContext, useEffect, useState } from "react";
import { json } from "react-router-dom";

const intialvalue = [];

export const BookmarkContext = createContext(intialvalue);

function BookmarkProvider({children}){
    const [markedPokemon, setMarkedPokemon] = useState(intialvalue);
    
    function addBookmark(payload){
        // console.log("adding",payload);
        let arr = [...markedPokemon, {name:payload.name, img: payload.sprites.other.dream_world.front_default}];
        
        // let namearr = [];
        // arr.map((data)=>namearr.push(data.name));
        // console.log(arr);
        // console.log(namearr);
        if(localStorage.key('marked')){
            localStorage.removeItem('marked');
            localStorage.setItem('marked', JSON.stringify([...arr]));
        }else{
            localStorage.setItem('marked', JSON.stringify([...arr]));
        }
        
        // console.log(localStorage.getItem('marked'));
        setMarkedPokemon((prev)=>{
            return [...prev, {name:payload.name, img: payload.sprites.other.dream_world.front_default}];
        });
    }

    function removeBookmark(payload){
        console.log("removing", payload)
        console.log(markedPokemon);
        let arr = markedPokemon.filter((data)=>data.name != payload.name)
        console.log(arr);

        // let namearr = [];
        // arr.map((data)=>namearr.push(data));
        // console.log(namearr);
        if(localStorage.key('marked')){
            localStorage.removeItem('marked');
            localStorage.setItem('marked', JSON.stringify([...arr]));
        }else{
            localStorage.setItem('marked', JSON.stringify([...arr]));
        }
        setMarkedPokemon((prev)=>{
            return prev.filter((data)=>data.name != payload.name);
        });
    }

    useEffect(()=>{
        if(localStorage.key('marked')){
            let checkarr = localStorage.getItem('marked');
            let temp = JSON.parse(checkarr);
            console.log(temp)
            setMarkedPokemon(temp);
        }
    }, []);

    return(
        <BookmarkContext.Provider value={{markedPokemon, addBookmark, removeBookmark}}>
            {children}
        </BookmarkContext.Provider>
    )
}

export default BookmarkProvider;