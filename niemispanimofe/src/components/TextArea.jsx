import { ErrorMessage, Field} from 'formik'

/*
 Formik component on which the description of a review is written on
*/
export const TextArea = ({field, label}) => {

    return(
        <div>
            <label>{label}</label>
            <Field style={{resize: 'none'}} rows="5" cols="25" as='textarea' id='reviewText' placeholder='Kuvaus'  {...field}/>
            <div style={{color: 'red'}}>
                <ErrorMessage name={field.name} />
            </div>
        </div>
    )
}

export default TextArea