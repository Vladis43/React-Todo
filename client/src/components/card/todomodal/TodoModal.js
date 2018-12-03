import React from 'react'

import * as md from '@material-ui/core'
import * as icon from "@material-ui/icons"
import styled from 'styled-components'

import Todo from '../../todo/Todo'


const TodoModalField = styled(md.Dialog)``;
const TodoModalTitle = styled(md.DialogTitle)`
  width: 552px;
  @media screen and (max-device-width: 455px) {
    width: calc(100% - 48px);
  }
`;
const TodoModalContent = styled(md.DialogContent)``;
const TodoModalActions = styled(md.DialogActions)``;


const TodoModal = (props) => {
    const {openModal, cardName, cardNameActive, errorMessage, closeModal, ChangeName, ChangeNameActive} = props

    return (
        <TodoModalField
            open={openModal}
            onClose={closeModal}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
        >
            <TodoModalTitle id="scroll-dialog-title">
                {cardNameActive ?
                    <md.Tooltip title="Double click to change name" placement="bottom-start">
                        <div onDoubleClick={ChangeNameActive}>
                            {cardName}
                        </div>
                    </md.Tooltip> :
                    <form onSubmit={ChangeNameActive}>
                        Please enter a card name: <br/>
                        <md.TextField
                            autoFocus
                            type="text"
                            label="Card name"
                            value={cardName}
                            onChange={ChangeName}
                            helperText={errorMessage ? errorMessage : ''}
                            error={errorMessage ? true : false}
                        />
                        <md.IconButton
                            color="primary"
                            type="submit"
                        >
                            <icon.Done/>
                        </md.IconButton>
                    </form>
                }
            </TodoModalTitle>
            <TodoModalContent>
                <Todo/>
            </TodoModalContent>
            <TodoModalActions>
                <md.Button onClick={closeModal} color="primary">
                    Cancel
                </md.Button>
            </TodoModalActions>
        </TodoModalField>
    )
}

export default TodoModal