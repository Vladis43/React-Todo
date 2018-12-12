import React from 'react'
import * as md from '@material-ui/core'
import * as icon from '@material-ui/icons'

const Snackbar = ({open, errorMessage, handleCloseSnackbar}) => (
    <div>
        <md.Snackbar
            style={{backgroundColor: '#d03739'}}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            ContentProps={{
                'aria-describedby': 'message-id',
                'background-color': '#d03739'
            }}
            message={
                <span id="message-id">
                    <icon.Error/>
                    {errorMessage}
                </span>
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
    </div>
)

export default Snackbar