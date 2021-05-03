import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'
import niemisPanimoCrew from '../imgs/niemisPanimoCrew.png'
import LoginModal from './LoginModal'
import SignUpModal from './SignUpModal'
import LeaveReviewModal from './LeaveReviewModal'
import ReadReviewsModal from './ReadReviewsModal'
import AddBeerModal from './AddBeerModal'
import { FaBeer } from 'react-icons/fa'
const signUpUrl = 'http://localhost:3001/api/users'
const loginUrl = 'http://localhost:3001/api/login'
const leaveReviewUrl = 'http://localhost:3001/api/reviews'
const addBeerUrl = 'http://localhost:3001/api/products'
const getProductUrl = 'http://localhost:3001/api/products'



const Products =() => {

    const [products, setProducts] = useState(null)
    const [user, setUser] = useState(null)
    const [product, setProduct] = useState(null)
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const [signUpModalOpen, setSignUpModalOpen] = useState(false)
    const [addBeerModalOpen, setAddBeerModalOpen] = useState(false)
    const [leaveReviewModalOpen, setLeaveReviewOpen] = useState(false)
    const [readReviewsModalOpen, setReadReviewsModalOpen] = useState(false)
    const [confirmationMessage, setConfirmationMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const openLoginModal = () =>  setLoginModalOpen(true)
    const openSignUpModal = () => setSignUpModalOpen(true)
    const openAddBeerModal = () => setAddBeerModalOpen(true)
    const closeAddBeerModal = () => setAddBeerModalOpen(false)
    const closeReadReviewsModal = () => setReadReviewsModalOpen(false)
    const closeLoginModal = () => setLoginModalOpen(false)
    const closeLeaveReviewModal = () => setLeaveReviewOpen(false)
    const closeSignUpModal = () => setSignUpModalOpen(false);

    useEffect(() => {
        getAllProducts().then(p => {
            setProducts(p)
        })
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    /*
    Opens a modal in which a user can submit a review for the product
    */
    const openLeaveReviewModal = (product) => {

        if(user){   

            setProduct(product)
            setLeaveReviewOpen(true)

        } else {

            alert('Kirjaudu sisään jättääksesi arvostelun')

        }

    }


    /*
     Gets all the products from the API
    */
    const getAllProducts = async() => {

        const response = await axios.get(getProductUrl)
        return response.data
        
    }

    /*
    Opens a modal where a user can read all the submitted reviews of a certain product 
    */
    const openReadReviewsModal = (product) => {

        setProduct(product)
        setReadReviewsModalOpen(true)

    }


    /*
    Logs in a user, sets an error message in the case of incorrect credentials
    */
    const handleLogin = async (values) => {

        console.log('values')
        console.log(values)

        try{

            const response = await axios.post(loginUrl, values)
            const user = response.data
            setUser(user)
            if(values.remember === true){
                window.localStorage.setItem(
                'loggedInUser', JSON.stringify(user)
            )
            }
        } catch(e) {
            setErrorMessage(`Käyttäjätunnus tai salasana väärin`)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            return
        }

            closeLoginModal()
        
    }


    /*
    clears the localstorage and logs out a user
    */
    const handleLogOut = () => {

        window.localStorage.clear()
        setUser(null)

    }

    /*
     Makes a post request of the review to the backend
    */
    const handleLeaveReview = async (values) => {

        await axios.post(leaveReviewUrl, values)
        closeLeaveReviewModal()
        getAllProducts().then(p => {
            setProducts(p)
        })
         
    }

    /*
     Creates an account, sets an error message if username is already taken
    */
    const handleSignUp = async (values) => {
        
        try {
            await axios.post(signUpUrl, values)
            } catch(e) {
                setErrorMessage(`Käyttäjätunnus "${values.username}" on jo olemassa`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                return
                
            }

            closeSignUpModal()
            setConfirmationMessage('Tunnukset luotu!')
            setTimeout(() => {
                setConfirmationMessage('')
            }, 5000)

    }

    /*
     Adds a beer to the database, sets an error message if all the fields are not filled
    */
    const handleAddBeer = async (values) => {

        
        let data = new FormData();
        data.append("file", values.file)
        data.append("name", values.name)
        data.append("description", values.description)


        try {

            await axios.post(addBeerUrl, data)
            
        } catch(e) {
            console.log(e)
            setErrorMessage('jotain meni vikaan')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            return
        }

        closeAddBeerModal()
        setConfirmationMessage('Bisse lisätty!')
        setTimeout(() => {
            setConfirmationMessage('')
        }, 5000)

    }


    /*
     Renders the login and sign up buttons, this will be rendered if no user is logged in.
    */
    const loginAndSignIn = (handleLogin, handleSignUp) => (

            <div id='login'>
                <Button id='loginButton' onClick = {() => openLoginModal(handleLogin)}>Kirjaudu sisään</Button>
                <Button id='signInButton' onClick = {() => openSignUpModal(handleSignUp)}>Luo tunnukset</Button>
            </div>

    )


    /*
      Renders which user is currently logged in and the logout button. The add beer button will be rendered if the user logged in has admin rights.
    */
    const loggedInForm = () => {

        if(user.admin === true) {

            console.log('useradmin')
            return(
                <div id='loggedIn'>
                    <p>Olet kirjautunut sisään käyttäjänimellä "{user.username}"</p>
                    <Button id='logOutButton' onClick = {() => handleLogOut()}>Kirjaudu ulos</Button>
                    <Button id='addBeerButton'onClick = {() => openAddBeerModal()}>Uus Bisse</Button>
                </div>
                )

        }

        return(
        <div id='loggedIn'>
            <p>Olet kirjautunut sisään käyttäjänimellä "{user.username}"</p>
            <Button id='logOutButton' onClick = {() => handleLogOut()}>Kirjaudu ulos</Button>
        </div>
        )

    }

    if(products) {
        return(
            <div className='content'>
                <div>
                    <Link to='/'>
                    <img src={niemisPanimoCrew} alt='Niemispanimo Crew' className='niemisPanimoCrew'/>
                    </Link>
                </div>
                <LoginModal onSubmit={handleLogin} loginModalOpen={loginModalOpen} onClose={closeLoginModal} error={errorMessage}/>
                <SignUpModal onSubmit={handleSignUp} signUpModalOpen={signUpModalOpen} onClose={closeSignUpModal} error={errorMessage}/>
                <LeaveReviewModal onSubmit={handleLeaveReview} leaveReviewModalOpen={leaveReviewModalOpen} onClose={closeLeaveReviewModal} error={errorMessage} product={product} user={user}/>
                <ReadReviewsModal readReviewsModalOpen={readReviewsModalOpen} onClose={closeReadReviewsModal} error={errorMessage} product={product} />
                <AddBeerModal onSubmit={handleAddBeer} addBeerModalOpen={addBeerModalOpen} onClose={closeAddBeerModal} error={errorMessage} />
                {user === null ? loginAndSignIn(handleLogin, handleSignUp) : loggedInForm()}
                <p>{confirmationMessage}</p>
                {products.map(p => {

                    let avg = 0
                    let i

                    for (i = 0; i < p.reviews.length; i++) {
                        avg = avg + p.reviews[i].verdict
                    }

                    avg = avg/i
                    avg = Math.round(avg)

                    if(avg) {

                        return(

                            <Card key={p.name}>
                                <Card.Img  src={p.image} className='cardPicture'/>
                                <Card.Body>
                                    <div className='description'>
                                        <Card.Text >{p.description}</Card.Text>
                                    </div>
                                    <div id='average'>
                                        {[...Array(avg)].map(b => <FaBeer key={p.name} size={20} color = { "#ffc107"}/>)}
                                    </div>
                                    <div id='reviewButtons'>
                                        <Button id='readReviewsButton' onClick={() => openReadReviewsModal(p)}>Lue arvosteluja</Button>
                                        <Button id='leaveReviewButton' onClick={() => openLeaveReviewModal(p)}>Jätä arvostelu</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    }

                    return(
                    <Card key={p.name}>
                        <Card.Img  src={p.image} className='cardPicture'/>
                        <Card.Body>
                    <div className='description'>
                        <Card.Text id='beerDescription'>{p.description}</Card.Text>
                    </div>
                    <div id='reviewButtons'>
                        <Button id='readReviewsButton' onClick={() => openReadReviewsModal(p)}>Lue arvosteluja</Button>
                        <Button id='leaveReviewButton' onClick={() => openLeaveReviewModal(p)}>Jätä arvostelu</Button>
                    </div>
                </Card.Body>
                </Card>
                )})}            
            </div>
        )
    }
    else {

        return(

            null

        )
    }
}

export default Products