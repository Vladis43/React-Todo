import React from 'react'

import * as md from '@material-ui/core'
import styled from 'styled-components'

const PreloaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const CircularProgress = styled(md.CircularProgress)`
  margin: theme.spacing.unit * 2;
`;

const Preloader = () => (
    <PreloaderWrapper>
        <CircularProgress size={48} />
    </PreloaderWrapper>
)

export default Preloader