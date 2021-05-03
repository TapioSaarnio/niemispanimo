import React from 'react'
import {FaInstagram} from 'react-icons/fa'

/*
 Renders the bottom of the front page
*/
const BottomContainer = () => {

    const styles = {

        bottomContainer: {

            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center'

        }
    }

    return(
        <div style={styles.bottomContainer}>
            <h2 id='streetCred'>Keski-Suomen sydämessä, peritty jano ja palo tehdä itse</h2>
            <div id='ig'>
                <a href='https://www.instagram.com/niemispanimo/'>
                    <FaInstagram style={{backgroundColor: '#93ea1f', marginRight: 5}}/><span id='niemisPanimoIg'>niemispanimo</span>
                </a>
            </div>
        </div>
    )
}

export default BottomContainer