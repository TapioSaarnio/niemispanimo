import React from 'react'
import KulmanPojat from'../imgs/kulmanPojat.png'
import Passion from '../imgs/passion.png'
import LifetimeDeal from '../imgs/lifetimeDeal.png'
import { Link } from 'react-router-dom'

/*
 Renders the middle part of the front page
*/
const MiddleContainer = () => {

    const styles = {
        middleContainer: {
            display: 'flex',
            flex: 3,
            backgroundColor: 'black',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexShrink: 1
        }
    }

    return (
            <div style={styles.middleContainer}>
                <div className='frontPageChoices'>
                    <Link to='./Galleria'>
                        <img className='frontPageImgs' alt='Kulman Pojat' src={KulmanPojat}/>
                    </Link>
                    <p className='frontPageChoicesText'>Kuvagalleria</p>
                </div>
                <div className='frontPageChoices'>
                    <Link to='./Tuotteet'>
                        <img className='frontPageImgs' alt='Passion' src={Passion}/>
                    </Link>
                    <p className='frontPageChoicesText'>Tuotteet</p>
                </div>
                <div className='frontPageChoices'>
                    <a href='https://www.youtube.com/watch?v=YbpaPkZojxA&t=1142s&ab_channel=Kulmanpojat'>
                        <img className='frontPageImgs' alt='Lifetime Deal' src={LifetimeDeal}/>
                    </a>
                    <p className='frontPageChoicesText'>Videot</p>
                </div>
            </div>
    ) 
}

export default MiddleContainer