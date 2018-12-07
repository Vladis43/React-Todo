import React from 'react'
import * as md from '@material-ui/core'
import styled from 'styled-components'
import AddCardContent from './AddCardContent'

const Modal = styled(md.Dialog)``;
const Title = styled(md.DialogTitle)``;
const CardActions = styled(md.DialogActions)``;

const AddCard = (props) => {
    const {
        isModal, cardName, cardDescription, imageFileSelected, errorMessage,
        closeModal, addNewCard, changeValue, changeImageFile
    } = props

    return (
        <Modal
            fullWidth
            open={isModal}
            aria-labelledby="title"
            onClose={closeModal}
        >
            <Title id="title">Please fill in the fields</Title>
            <AddCardContent
                cardName={cardName}
                cardDescription={cardDescription}
                imageFileSelected={imageFileSelected}
                errorMessage={errorMessage}
                addNewCard={addNewCard}
                changeValue={changeValue}
                changeImageFile={changeImageFile}
            />
            <CardActions>
                <md.Button color="primary" onClick={closeModal}>
                    Cancel
                </md.Button>
                <md.Button color="primary" onClick={addNewCard}>
                    Add Card
                </md.Button>
            </CardActions>
        </Modal>
    )
}

export default AddCard