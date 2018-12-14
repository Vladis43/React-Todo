import React from 'react'
import styled from 'styled-components'
import * as md from '@material-ui/core'
import * as icon from '@material-ui/icons'

const SnackBar = styled(md.Snackbar)`
  margin-top: 30px;
`;
const Message = styled.span`
  display: flex;
  align-items: center;
`;
const ErrorIcon = styled(icon.Error)`
  margin-right: 10px;
`;

const Snackbar = ({open, errorMessage, handleCloseSnackbar}) => (
    <div>
        <SnackBar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
        >
            <md.SnackbarContent
                message={
                    <Message id="message-id">
                        <ErrorIcon/>
                        {errorMessage}
                    </Message>
                }
                action={
                    <md.IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={handleCloseSnackbar}
                    >
                        <icon.Close/>
                    </md.IconButton>
                }
            />
        </SnackBar>
    </div>
)

export default Snackbar