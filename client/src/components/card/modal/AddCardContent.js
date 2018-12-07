import React from 'react'
import * as md from "@material-ui/core"
import styled from "styled-components"
import UploadImage from './UploadImage'

const Content = styled(md.DialogContent)`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    justify-content: space-evenly;
  }
`;
const CardName = styled(md.TextField)``;
const CardDescription = styled(md.TextField)``;

const AddCardContent = (props) => {
    const {
        cardName, cardDescription, imageFileSelected, errorMessage,
        changeValue, changeImageFile
    } = props

    return (
        <Content>
            <div>
                <CardName
                    name="cardName"
                    autoFocus
                    label="Card name"
                    value={cardName}
                    onChange={changeValue}
                    helperText={errorMessage ? errorMessage : ''}
                    error={errorMessage ? true : false}
                />
                <UploadImage
                    imageFileSelected={imageFileSelected}
                    changeImageFile={changeImageFile}
                />
            </div>
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
        </Content>
    )
}

export default AddCardContent