import React from 'react'
import * as md from '@material-ui/core'
import styled from 'styled-components'
import {ValidatorForm} from 'react-material-ui-form-validator'
import CardContent from './CardContent'

const Modal = styled(md.Dialog)`
  @media screen and (max-device-width: 455px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const Form = styled(ValidatorForm)``;
const Title = styled(md.DialogTitle)``;
const CardActions = styled(md.DialogActions)``;

const EditCard = (props) => {
    const {
        isModal, cardName, cardDescription, imageURL, errorMessage,
        closeModal, editCard, changeValue, handleImageChange
    } = props

    return (
        <Modal
            fullWidth
            open={isModal}
            aria-labelledby="title"
            onClose={closeModal}
        >
            <Form onSubmit={editCard}>
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
                        Save changes
                    </md.Button>
                </CardActions>
            </Form>
        </Modal>
    )
}

export default EditCard