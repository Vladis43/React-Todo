import React from 'react'

import * as md from '@material-ui/core'
import styled from 'styled-components'

const PreloaderWrapper = styled.div`
  flex-grow: 1;
`;

const Progress = styled(md.LinearProgress)`
  margin: theme.spacing.unit * 2;
`;

const Preloader = () => (
    <PreloaderWrapper>
        <Progress/>
    </PreloaderWrapper>
)

export default Preloader