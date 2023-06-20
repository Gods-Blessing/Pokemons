import './DetailPage.css';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import { PieChart, Pie, Cell } from 'recharts';
import DetailImage from './image/DetailImage';







function DetailPage(){
    
    
    let {name} = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(()=>{
        async function datafetch(){
            let data =await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            
            let maindata = await data.json();
            // console.log(maindata);
            
            setPokemon(maindata);
        }

        datafetch();
    }, [])

    return(
        <>{
            pokemon ? 
        <div className='detail-main-container'>
            <h1>Details</h1>

            <div className='detail-container'>
                <DetailImage imgs={pokemon} />
                <div>
                    <h2 className='pokemon-detail-name'>{pokemon.name}</h2>

                    <div className='poki-detail'>
                        <b>Id</b>
                        <span>:</span>
                        <span className='poki-detail-2'>{pokemon.id}</span>
                    </div>

                    <div className='poki-detail'>
                        <b>Weight</b>
                        <span>:</span>
                        <span className='poki-detail-2'>{pokemon.weight}</span>
                    </div>

                    <div className='poki-detail'>
                        <b>Height</b>
                        <span>:</span>
                        <span className='poki-detail-2'>{pokemon.height}</span>
                    </div>
                    
                    {/* species */}
                    <div className='poki-detail'>
                        <b>Species</b>
                        <span>:</span>
                        <span className='poki-detail-2 species-name'>{pokemon.species.name}</span>
                    </div>


                    {/* attack types */}
                    <div className='attack-types'>
                        <b>Abilities </b>
                        <span>:</span>
                        <span>
                            <ul className='detail-list'>
                            {
                                pokemon.abilities.map((data)=>(
                                    <li key={data.slot}>
                                        {data.ability.name}
                                    </li>
                                ))
                            }
                            </ul>
                        </span>
                    </div>

                    <div className='attack-types'>
                        <b>Attack Types </b>
                        <span>:</span>
                        <span>
                            <ul className='detail-list'>
                            {
                                pokemon.types.map((data)=>(
                                    <li key={data.slot}>
                                        {data.type.name}
                                    </li>
                                ))
                            }
                            </ul>
                        </span>
                    </div>

                    <div className='attack-types'>
                        <b>Forms </b>
                        <span>:</span>
                        <span>
                            <ul className='detail-list'>
                            {
                                pokemon.forms.map((data)=>(
                                    <li key={data.name}>
                                        {data.name}
                                    </li>
                                ))
                            }
                            </ul>
                        </span>
                    </div>

                    


                </div>

                <div className='chart'>

                <div className='attack-types'>
                        <b>Stats </b>
                        <span>:</span>
                        <span>
                            <ul className='detail-list'>
                            {
                                pokemon.stats.map((data)=>(
                                    <li key={data.stat.name}>
                                        <span>{data.stat.name} - </span>
                                        <span>{data.base_stat}</span>
                                        
                                    </li>
                                ))
                            }
                            </ul>
                        </span>
                    </div>

                    <PieChart width={240} height={250}>
                        <Pie data={pokemon.stats}
                            dataKey="base_stat"
                        cx="50%" cy="50%" outerRadius={80} label>
                            {
                            pokemon.stats.map((entry, index) => (
                                <>
                                <Cell key={`cell-${index}`} fill={`rgb(${Math.floor(Math.random() * 254)}, ${Math.floor(Math.random() * 254)}, ${Math.floor(Math.random() * 254)})`}/>
                                </>
                            ))
                            }
                        </Pie>
                    </PieChart>
                    </div>
            </div>
        </div>

        :

        <h1>No Pokemon Selected</h1>
        }
        </>
    )
}

export default DetailPage;