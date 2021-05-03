import React, {useState} from 'react'
import {Modal, Header, Segment } from 'semantic-ui-react'
import {Button} from 'react-bootstrap'
import {Formik, Form, Field} from 'formik'
import {TextArea} from './TextArea'
import { FaBeer } from 'react-icons/fa'

/*
 Renders the modal component where a user can submit a review for a beer
*/
const LeaveReviewModal = ({onSubmit, leaveReviewModalOpen, onClose, error, product, user}) => {

    const [rating, setRating] = useState(null)
    
    return(
            <Modal open={leaveReviewModalOpen} onClose={onClose} centered={true} closeIcon>
                <Header textAlign='center'>Arvostele tuote</Header>
                <Modal.Content>
                    {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
                <Formik 
                initialValues={{description:'', verdict: null, product: product, user: user }}
                onSubmit={onSubmit}
                validate={values => {
                    const requiredError = 'Täytä molemmat kentät!';
                    const errors = {};
                    if(!values.verdict) {
                        errors.description = requiredError;
                    }
                    if(!values.description) {
                        errors.description = requiredError;
                    }
                    return errors;
                }}
                >
                {() => {
                    return (
                        <div id='leaveReviewDiv'>
                            <Form className='form-ui'>
                                <div id='beerRatingDiv'>
                                    {[...Array(5)].map((bottle, i) => {
                                        const ratingValue = i + 1;
                                        return(
                                            <label>
                                                <Field type='radio' name='verdict' value={ratingValue} onClick={() =>setRating(ratingValue)}/>
                                                <FaBeer size={45} color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}/>
                                            </label>                                        
                                        )
                                    })}
                                </div>
                            <div id='description'>
                                <Field name='description' placeholder='Arvostelu' component={TextArea}/>
                            </div>
                            <div id='leaveReviewButtonDiv'>
                                <Button id='leaveReviewButton' type='submit'>Lähetä</Button>
                            </div>
                        </Form>
                    </div>
                );
            }}
                   </Formik>
                </Modal.Content>
            </Modal>
    )
}

export default LeaveReviewModal