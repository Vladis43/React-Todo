import React from 'react'
import * as md from '@material-ui/core'
import styled from 'styled-components'
import {ValidatorForm} from 'react-material-ui-form-validator'
import AddCardContent from './AddCardContent'

const Modal = styled(md.Dialog)``;
const Form = styled(ValidatorForm)``;
const Title = styled(md.DialogTitle)``;
const CardActions = styled(md.DialogActions)``;

const AddCard = (props) => {
    const {
        isModal, cardName, cardDescription, imageURL, errorMessage,
        closeModal, addNewCard, changeValue, handleImageChange
    } = props

    return (
        <Modal
            fullWidth
            open={isModal}
            aria-labelledby="title"
            onClose={closeModal}
        >
            <Form onSubmit={addNewCard}>
                <Title id="title">Please fill in the fields</Title>
                <AddCardContent
                    cardName={cardName}
                    cardDescription={cardDescription}
                    imageURL={imageURL}
                    errorMessage={errorMessage}
                    addNewCard={addNewCard}
                    changeValue={changeValue}
                    handleImageChange={handleImageChange}
                />
                <CardActions>
                    <md.Button color="primary" onClick={closeModal}>
                        Cancel
                    </md.Button>
                    <md.Button color="primary" type="submit">
                        Add Card
                    </md.Button>
                </CardActions>
            </Form>
        </Modal>
    )
}

export default AddCard