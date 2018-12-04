import React from 'react'
import * as md from "@material-ui/core"
import * as icon from "@material-ui/icons"
import styled from "styled-components"

const Content = styled(md.DialogContent)`
  display: flex;
  flex-direction: column;
`;

const CreatingCardContent = ({cardName, cardDescription, errorMessage, addNewCard, changeName, changeDescription}) => (
    <form onSubmit={addNewCard}>
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
            <md.Button
                color="primary"
                type="submit"
            >
                <icon.Done/>
            </md.Button>
        </Content>
    </form>
)

export default CreatingCardContent