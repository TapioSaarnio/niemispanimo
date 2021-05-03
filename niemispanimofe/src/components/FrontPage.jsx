import React from 'react'
import BottomContainer from './BottomContainer'
import MiddleContainer from './MiddleContainer'
import TopContainer from './TopContainer'

/*
 Renders the front page
*/
const FrontPage = () => {

    return(
         <div id="App">
            <TopContainer/>
            <MiddleContainer/>
            <BottomContainer/>
         </div>
    )
}


export default FrontPage