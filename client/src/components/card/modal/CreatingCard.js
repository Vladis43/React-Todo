import React from 'react'
import * as md from '@material-ui/core'
import styled from 'styled-components'
import CreatingCardContent from './CreatingCardContent'

const CreatingCardField = styled(md.Dialog)``;
const CreatingCardActions = styled(md.DialogActions)``;

const CreatingCard = (props) => {
    const {
        isModal, cardName, cardDescription, imageFileSelected, errorMessage,
        closeModal, addNewCard, changeName, changeDescription, changeImageFile
    } = props

    return (
        <CreatingCardField
            fullWidth
            open={isModal}
            aria-labelledby="scroll-dialog-title"
            onClose={closeModal}
        >
            <CreatingCardContent
                cardName={cardName}
                cardDescription={cardDescription}
                imageFileSelected={imageFileSelected}
                errorMessage={errorMessage}
                addNewCard={addNewCard}
                changeName={changeName}
                changeDescription={changeDescription}
                changeImageFile={changeImageFile}
            />
            <CreatingCardActions>
                <md.Button color="primary" onClick={closeModal}>
                    Cancel
                </md.Button>
                <md.Button color="primary" onClick={addNewCard}>
                    Add Card
                </md.Button>
            </CreatingCardActions>
        </CreatingCardField>
    )
}

export default CreatingCard