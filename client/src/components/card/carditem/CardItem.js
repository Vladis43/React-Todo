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
  flex-direction: column;
`;
const CardName = styled.div`
  color: #4251B1;
  font-size: 22px;
`;
const TodoCount = styled.div`
  color: #c6c6c6;
  font-size: 16px;
`;


const CardItem = ({amountTodo, openModal, cardName}) => (
    <Card>
        <CardActionArea onClick={openModal}>
            <CardContent>
                <CardName>
                    {cardName.toUpperCase()}
                </CardName>
                <TodoCount>
                    {`${amountTodo} items`.toUpperCase()}
                </TodoCount>
            </CardContent>
        </CardActionArea>
    </Card>
)

export default CardItem