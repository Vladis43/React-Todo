import React from 'react'

import * as md from '@material-ui/core'
import styled from 'styled-components'

const Card = styled(md.Card)`
  width: 300px;
  height: 200px;
`;
const CardActionArea = styled(md.CardActionArea)`
  height: 100%;
`;
const CardContent = styled(md.CardContent)`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4251B1;
  font-size: 64px;
`;

const AddCardButton = ({openModal}) => (
    <form onSubmit={openModal}>
        <Card>
            <CardActionArea type="submit">
                <CardContent>
                    +
                </CardContent>
            </CardActionArea>
        </Card>
    </form>
)

export default AddCardButton