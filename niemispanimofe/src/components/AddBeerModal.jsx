import React from 'react'
import {Modal, Header, Segment} from 'semantic-ui-react'
import {Button} from 'react-bootstrap'
import { Formik, Form, Field } from 'formik'
import {TextArea} from './TextArea'
import { TextField } from './TextField'
import {Input} from 'reactstrap'

/*
 Renders the modal where a user with admin privilidges can submit a new beer to the site
*/
const AddBeerModal = ({onSubmit, addBeerModalOpen, onClose, error}) => {

    return(
        <Modal open={addBeerModalOpen} onClose={onClose} centered={true} closeIcon>
            <Header textAlign='center'>Lisää olut</Header>
            <Modal.Content>
                {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
                <Formik
                initialValues={{name:'', description:'', file: null}}
                onSubmit={onSubmit}
                validate={values => {
                    const requiredError = 'Täytä kenttä'
                    const errors = {}
                    if(!values.name) {
                        errors.name = requiredError
                    }
                    if(!values.description) {
                        errors.description = requiredError
                    }
                    if(!values.file) {
                        errors.file = requiredError
                    }
                    return errors
                }}
                >
                    {(formProps) => {
                        return (
                            <div id='addBeerDiv'>
                                <Form className='form-ui'>
                                    <div id='beerNameDiv'>
                                        <Field name='name' showText={true} placeholder='Bissen nimi' component={TextField}/>
                                    </div>
                                    <div id='addBeerDescription'>
                                        <Field name='description' placeholder='kuvaus' component={TextArea}/>
                                    </div>
                                    <Input
                                    id='file'
                                    type='file'
                                    name='file'
                                    onChange={(event) =>
                                        formProps.setFieldValue('file', event.target.files[0])
                                    }
                                    />                                    
                                    <Button id=''type='submit'>Lisää</Button>
                            </Form>
                        </div>
                    )
                }}
            </Formik>
        </Modal.Content>
    </Modal>
    )
}

export default AddBeerModal