import './ListingPage.css';
import React, { useContext, useEffect, useState } from "react";
import Pokemon from './pokemon/Pokemon';



function ListingPage(){
    
    const [text, setText] = useState('');
    const [apidata, setApidata] = useState();
    const [offset, setOffset] = useState(0);

    // handling input in search bar
    function Handlechange(e){
        console.log(e.target.value);
        setText(e.target.value);
    }

    // function for infinite scroll
    const infiniteScroll = ()=>{
        let ele = document.getElementById('the-pokemon-container');
        // console.log('scroll height ---',ele.scrollHeight);
        // console.log('scroll top -',ele.scrollTop);
        // console.log('window inner height -',window.innerHeight);
        // console.log('ele height--',ele.scrollHeight-ele.scrollTop)
        // console.log('height',ele.offsetHeight);

        // console.log('ans---',ele.scrollTop + (window.innerHeight))

        if(ele.scrollHeight-ele.scrollTop <= ele.offsetHeight+1){
            setOffset((prev)=> prev+12);
            // console.log('hii');
        }

    }

    const fetchingdata = async ()=>{
        let data =await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=12&offset=${offset}`);
        let maindata = await data.json();
        // console.log(maindata)
        if(Array.isArray(apidata) && Array.isArray(maindata.results)){
            setApidata((prev)=>[...prev, ...maindata.results])
        }
    }
    
    useEffect(()=>{
        fetchingdata();
    }, [offset])

    useEffect(()=>{
        let ele = document.getElementById('the-pokemon-container');
        ele.addEventListener('scroll', infiniteScroll);
        return ()=> ele.removeEventListener('scroll', infiniteScroll)
    },[])

    

    useEffect(()=>{
        infiniteScroll();
        let timer = setTimeout(()=>{
            async function datafetch(){
                let data;
                if(text === ''){
                    data =await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=12&offset=0`);
                }else{
                    data =await fetch(`https://pokeapi.co/api/v2/pokemon/${text}`);
                }
                let maindata = await data.json();
        
                console.log(await maindata);
                if(maindata.results){
                    setApidata(maindata.results)
                }else{
                    setApidata(maindata);
                }

            }

            // if(text.length > 0){
                datafetch();
            // }
            
        }, 800);

        return ()=> clearTimeout(timer);
    }, [text])





    return(
        <section className='listing-container'>

            {/* searching */}
            <div className='search-container'>
                <div>
                    <input onChange={Handlechange} type="search-input" placeholder='Search pokemon here...' />
                    <button>Search</button>
                </div>
            </div>


            {/* showing pokemon */}
            <div className='filter-and-pokemons'>
            <aside className='filter-aside'>
                <h4>Currently work on filter is going on</h4>
            </aside>

            <div id='the-pokemon-container' className='pokemon-container'>
                {   Array.isArray(apidata)?
                    apidata.map((data)=>{
                        // console.log(data)
                        return ( 
                            <Pokemon key={data.name} detail={data}/>
                        )
                    }): <Pokemon detail={apidata}/>
                }

            </div>

            </div>

        </section>
    )
}


export default ListingPage;