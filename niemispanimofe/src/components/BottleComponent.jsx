import React, {useState} from 'react'
import {FaBeer} from 'react-icons/fa'

/*
 Component for setting a rating for a beer
*/
export const BottleComponent = () => {

    const [rating, setRating] = useState(null)
    
    return(
            <div id='leaveReviewDiv'>
                <div id='beerRating'>
                    {[...Array(5)].map((bottle, i) => {

                        const ratingValue = i + 1;

                        return(
                                <label>
                                    <input type='radio' name='rating' value={ratingValue} onClick={() =>setRating(ratingValue)}/>
                                        <FaBeer size={50} color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}/>
                                </label>
                              )
                    })}
                </div> 
            </div>
    )
}

export default BottleComponent