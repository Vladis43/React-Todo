import React from 'react'

import * as md from '@material-ui/core'
import * as icon from '@material-ui/icons'
import styled from 'styled-components'

const Card = styled(md.Card)`
  width: 300px;
  height: 200px;
`;
const CardActionArea = styled(md.CardActionArea)`
  height: 70%;
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
const CardDescription = styled.div`
  color: #c6c6c6;
  font-size: 18px;
`;
const CardActions = styled(md.CardActions)`
  display: flex;
  justify-content: space-evenly;
`;
const DeleteButton = styled(md.IconButton)``;
const CreateButton = styled(md.IconButton)``;


const CardItem = ({card, openEditCardModal, openTodo, deleteCardAction}) => (
    <Card>
        <CardActionArea
            onClick={openTodo}
            style={card.imageURL ? {background: `url(${card.imageURL}) 0% 0% / 100% no-repeat`} : {}}
        >
            <CardContent>
                <CardName>
                    {card.title.toUpperCase()}
                </CardName>
                <CardDescription>
                    {card.description.substr(0, 25)}
                </CardDescription>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <DeleteButton onClick={() => deleteCardAction(card._id, window.localStorage.getItem('token'))}>
                <icon.Delete/>
            </DeleteButton>
            <CreateButton onClick={openEditCardModal}>
                <icon.Create/>
            </CreateButton>
        </CardActions>
    </Card>
)

export default CardItem