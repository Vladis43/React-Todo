import React from 'react'
import * as md from "@material-ui/core"
import styled from "styled-components"
import UploadImage from './UploadImage'

const Content = styled(md.DialogContent)`
  display: flex;
  flex-direction: column;
`;

const CreatingCardContent = (props) => {
    const {
        cardName, cardDescription, imageFileSelected, errorMessage,
        changeName, changeDescription, changeImageFile
    } = props

    return (
        <Content>
            Please fill in the fields: <br/>
            <md.TextField
                autoFocus
                label="Card name"
                value={cardName}
                onChange={changeName}
                helperText={errorMessage ? errorMessage : ''}
                error={errorMessage ? true : false}
            />
            <md.TextField
                label="Description"
                placeholder="Description"
                multiline
                variant="outlined"
                value={cardDescription}
                onChange={changeDescription}
                helperText={errorMessage ? errorMessage : ''}
                error={errorMessage ? true : false}
            />
            <UploadImage
                imageFileSelected={imageFileSelected}
                changeImageFile={changeImageFile}
            />
        </Content>
    )
}

export default CreatingCardContent