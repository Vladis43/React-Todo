import React from 'react'
import * as md from '@material-ui/core'
import styled from 'styled-components'
import {ValidatorForm} from 'react-material-ui-form-validator'
import CardContent from './CardContent'

const Modal = styled(md.Dialog)`
    margin-bottom: 250px;
  @media screen and (max-device-width: 455px) {
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const Form = styled(ValidatorForm)``;
const Title = styled(md.DialogTitle)``;
const CardActions = styled(md.DialogActions)``;

const ActionCard = (props) => {
    const {
        isModal, cardName, cardDescription, imageURL, errorMessage,
        closeModal, actionCard, isEdit, changeValue, handleImageChange
    } = props

    return (
        <Modal
            fullWidth
            open={isModal}
            aria-labelledby="title"
            onClose={closeModal}
        >
            <Form onSubmit={actionCard}>
                <Title id="title">Please fill in the fields</Title>
                <CardContent
                    cardName={cardName}
                    cardDescription={cardDescription}
                    imageURL={imageURL}
                    errorMessage={errorMessage}
                    changeValue={changeValue}
                    handleImageChange={handleImageChange}
                />
                <CardActions>
                    <md.Button color="primary" onClick={closeModal}>
                        Cancel
                    </md.Button>
                    <md.Button color="primary" type="submit">
                        {isEdit ? 'Save changes' : 'Add card'}
                    </md.Button>
                </CardActions>
            </Form>
        </Modal>
    )
}

export default ActionCard