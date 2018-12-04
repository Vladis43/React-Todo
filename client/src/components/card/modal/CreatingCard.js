import React from 'react'

import * as md from '@material-ui/core'
import * as icon from '@material-ui/icons'
import styled from 'styled-components'

import CreatingCardContent from './CreatingCardContent'

const CreatingCardField = styled(md.Dialog)``;
const CreatingCardActions = styled(md.DialogActions)``;


const CreatingCard = (props) => {
    const {
        isModal, cardName, cardDescription, errorMessage,
        closeModal, addNewCard, changeName, changeDescription
    } = props

    return (
        <CreatingCardField
            fullWidth
            open={isModal}
            aria-labelledby="scroll-dialog-title"
            onClose={closeModal}
        >
            <CreatingCardActions>
                <md.Button color="primary" onClick={closeModal}>
                    <icon.Close/>
                </md.Button>
            </CreatingCardActions>
            <CreatingCardContent
                cardName={cardName}
                cardDescription={cardDescription}
                addNewCard={addNewCard}
                errorMessage={errorMessage}
                changeName={changeName}
                changeDescription={changeDescription}
            />
        </CreatingCardField>
    )
}

export default CreatingCard