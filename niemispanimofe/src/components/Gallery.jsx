import React from 'react'
import niemisPanimoCrew from '../imgs/niemisPanimoCrew.png'
import Arto from '../imgs/Arto.jpeg'
import FirmanLasi from '../imgs/FirmanLasi.jpeg'
import Beer from '../imgs/Beer.jpeg'
import BeerTriangle from '../imgs/beerTriangle.jpeg'
import DonQs from '../imgs/DonQs.jpeg'
import FreshWater from '../imgs/FreshWater.jpeg'
import KoponenNauttii from '../imgs/KoponenNauttii.jpeg'
import Koivuranta from '../imgs/Koivuranta.jpeg'
import SampoJuo from '../imgs/SampoJuo.jpeg'
import Kuijo from '../imgs/Kuijo.jpeg'
import Premiere from '../imgs/Premiere.jpeg'
import Borsta from '../imgs/Borsta.jpeg'
import Brewing from '../imgs/Brewing.jpeg'
import Joona from '../imgs/Joona.jpeg'
import Joutsa from '../imgs/Joutsa.jpeg'
import Savela from '../imgs/Savela.jpeg'
import SavelaYö from '../imgs/SavelaYö.jpeg'
import KoposenPyramidi from '../imgs/KoposenPyramidi.jpeg'
import Guest from '../imgs/Guest.jpeg'
import Jalasjarvi from '../imgs/Jalasjarvi.jpeg'
import Same from '../imgs/Same.jpeg'
import SeppaKuijo from '../imgs/SeppaKuijo.jpeg'
import Veke from '../imgs/Veke.jpeg'
import Koposen from '../imgs/Koposen.jpeg'
import Nuotio from '../imgs/Nuotio.jpeg'
import Uunissa from '../imgs/Uunissa.jpeg'
import KulmanPojatBottle from '../imgs/KulmanPojatBottle.jpeg'
import CodeCan from '../imgs/CodeCan.jpeg'
import { Link } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

/*
 Renders the photo gallery
*/
const Gallery = () => {

    const photos = [
        {
            photo: Arto,
        },
        {
            photo: Beer
        },
        {
            photo: KoponenNauttii
        },
        {
            photo: BeerTriangle
        },
        {
            photo: DonQs
        },
        {
            photo: FreshWater
        },
        {
            photo: Koivuranta
        },
        {
            photo: FirmanLasi
        },
        {
            photo: Kuijo
        },
        {
             photo: KoposenPyramidi
        },
        {
            photo: Premiere
        },
        {
            photo: SampoJuo
        },
        {
            photo: Borsta
        },
        {
            photo: Brewing
        },
        {
            photo: Guest
        },
        {
            photo: Joutsa
        },
        {
            photo: Jalasjarvi
        },
        {
            photo: Savela
        },
        {
            photo: SavelaYö
        },
        {
            photo: Same
        },
        {
            photo: Joona
        },
        {
            photo: Nuotio
        },
        {
            photo: Uunissa
        },
        {
            photo: SeppaKuijo
        },
        {
            photo: Veke
        },
        {
            photo: Koposen
        },
        {
            photo: CodeCan
        }

    ]

    return(
          <div className='content'>
               <Link to='/'>
                    <img src={niemisPanimoCrew} alt='Niemispanimo Crew' className='niemisPanimoCrew'/>
               </Link>
                <Carousel width="800">
                    {photos.map(pho=> <div key={pho.photo}><img alt=''src={pho.photo}/></div>)}
                </Carousel>
                <img src={KulmanPojatBottle} alt='Liike 22 X Niemispanimo'/>
            </div>
    )
}

export default Gallery