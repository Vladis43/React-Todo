import React from 'react'
import * as md from "@material-ui/core"
import styled from "styled-components"
import UploadImage from './UploadImage'

const Content = styled(md.DialogContent)`
  display: flex;
`;
const InputWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const CardName = styled(md.TextField)`
  width: 100%;
`;
const CardDescription = styled(md.TextField)`
  width: 100%;
`;

const AddCardContent = (props) => {
    const {
        cardName, cardDescription, imageURL, errorMessage,
        changeValue, handleImageChange
    } = props

    return (
        <Content>
            <UploadImage
                imageURL={imageURL}
                handleImageChange={handleImageChange}
            />
            <InputWrapper>
                <CardName
                    name="cardName"
                    autoFocus
                    label="Card name"
                    value={cardName}
                    style={{marginBottom: 46}}
                    onChange={changeValue}
                    helperText={errorMessage ? errorMessage : ''}
                    error={errorMessage ? true : false}
                />
                <CardDescription
                    name="cardDescription"
                    label="Description"
                    placeholder="Description"
                    multiline
                    variant="outlined"
                    value={cardDescription}
                    onChange={changeValue}
                    helperText={errorMessage ? errorMessage : ''}
                    error={errorMessage ? true : false}
                />
            </InputWrapper>
        </Content>
    )
}

export default AddCardContent