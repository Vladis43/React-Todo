import React from 'react'
import styled from 'styled-components'
import * as md from '@material-ui/core'
import {TextValidator} from 'react-material-ui-form-validator'


const Wrapper = styled(md.CardActions)`
  display: flex;
  flex-direction: column;
  @media screen and (max-device-width: 400px) {
    justify-content: center;
  }
`;
const Input = styled(TextValidator)``;
const Button = styled(md.Button)`
  width: 100%;
`;


const ConfirmField = ({codeValue, setCode}) => (
    <Wrapper style={{marginBottom: 20}}>
        <Input
            fullWidth
            name="code"
            variant="outlined"
            label="Enter code"
            placeholder="Code..."
            value={codeValue}
            onChange={setCode}
            validators={['required']}
            errorMessages={['this field is required']}
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