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
  height: 100%;
  display: flex;
  //justify-content: center;
  //align-items: center;
  color: #4251B1;
  font-size: 24px;
`;

const CardItem = ({amountTodo}) => {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    {`Card Name`.toUpperCase()} <br/>
                    {`${amountTodo} items`.toUpperCase()}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CardItem