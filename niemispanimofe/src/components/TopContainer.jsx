import React from 'react'


const TopContainer = () => {

    const styles= {
        topContainer: {
            display: 'flex',
            justifyContent: 'center',
            justifyItems: 'center',
            padding: 1,
            backgroundColor: 'black',
            flex: 1,
            textAlign: 'center',
            alignItems: 'center'
            

        },
    }

    return(

        <div style={styles.topContainer}>
            <h1 id='niemisPanimoHeader'>
                NIEMISPANIMO
            </h1>
        </div>
        
    )
}

export default TopContainer