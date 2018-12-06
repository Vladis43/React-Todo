import React from 'react'
import styled from 'styled-components'
import * as md from '@material-ui/core'

const ButtonWrapper = styled(md.CardActions)`
  display: flex;
  justify-content: flex-end;
  @media screen and (max-device-width: 455px) {
    justify-content: center;
  }
`;
const ConfirmButton = styled(md.Button)``;

const SingUpButton = () => (
    <ButtonWrapper>
        <ConfirmButton
            variant="contained"
            size="large"
            color="primary"
            type="submit"
        >
            Confirm
        </ConfirmButton>
    </ButtonWrapper>
)

export default SingUpButton