import React from 'react'
import styled from 'styled-components'
import * as md from '@material-ui/core'


const Wrapper = styled(md.CardActions)`
  display: flex;
  flex-direction: column;
  @media screen and (max-device-width: 400px) {
    justify-content: center;
  }
`;
const Input = styled(md.TextField)``;
const Button = styled(md.Button)`
  width: 100%;
`;


const ConfirmField = ({codeValue, setCode, errorMessage}) => (
    <Wrapper style={{marginBottom: 20}}>
        <Input
            fullWidth
            name="code"
            variant="outlined"
            label="Enter code"
            placeholder="Code..."
            value={codeValue}
            onChange={setCode}
            helperText={errorMessage}
            error={errorMessage ? true : false}
        />
        <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            style={{marginTop: 10}}
        >
            Confirm
        </Button>
    </Wrapper>
)

export default ConfirmField