import React from 'react'
import * as md from "@material-ui/core"
import styled from "styled-components"
import UploadImage from './UploadImage'
import {TextValidator} from 'react-material-ui-form-validator'

const Content = styled(md.DialogContent)`
  display: flex;
  @media screen and (max-device-width: 455px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;
const InputWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-device-width: 455px) {
    width: 200px;
    justify-content: center;
    margin-bottom: 10px;
  }
`;
const CardName = styled(TextValidator)`
  width: 100%;
`;
const CardDescription = styled(TextValidator)`
  width: 100%;
`;

const CardContent = (props) => {
    const {cardName, cardDescription, imageURL, changeValue, handleImageChange} = props

    return (
        <Content>
            <UploadImage
                imageURL={imageURL}
                handleImageChange={handleImageChange}
            />
            <InputWrapper>
                <CardName
                    style={{marginBottom: 46}}
                    name="cardName"
                    autoFocus
                    label="Card name"
                    value={cardName}
                    onChange={changeValue}
                    validators={['required', 'maxStringLength: 15']}
                    errorMessages={['this field is required', 'no more than 15 characters']}
                />
                <CardDescription
                    name="cardDescription"
                    label="Description"
                    multiline
                    variant="outlined"
                    value={cardDescription}
                    onChange={changeValue}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
            </InputWrapper>
        </Content>
    )
}

export default CardContent