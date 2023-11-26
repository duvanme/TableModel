import React, { useState } from 'react'
import './Modal.css'

const Modal = ({ closeModal, onSubmit, defaultValue }) => {

    const [formState, setFormState] = useState(defaultValue || {
        page: "",
        description: "",
        status: "live"
    });

    const [errors, setErrors] = useState("");

    /*make sure the form is not empty  */

    const validateForm = () => {
        if (formState.page && formState.description && formState.status) {
            setErrors("");
            return true;
        }
        else {
            let errorField = [];
            for (const [key, value] of Object.entries(formState)) {
                if (!value) {
                    errorField.push(key);
                }
            }
            setErrors(errorField.join(", "));
            return false
        }
    };
    /*update each field value*/
    const handleChange = (e) => {

        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        onSubmit(formState);
        closeModal();
    };


    return (
        <div className='modal-container' onClick={(e) => {
            if (e.target.className === 'modal-container') { closeModal(); }
        }}>
            <div className='modal'>
                <form>
                    <div className='form-group'>
                        <label htmlFor='page'>Page</label>
                        <input name='page' value={formState.page} onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description</label>
                        <textarea name='description' value={formState.description} onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='status'>Status</label>
                        <select name="status" value={formState.status} onChange={handleChange}>
                            <option value="live">Live</option>
                            <option value="draft">Draft</option>
                            <option value="error">Error</option>
                        </select>
                    </div>
                </form>
                {errors && <div className='error'>{`Please include: ${errors}`}</div>}
                <button type='submit' className='btn' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default Modal
