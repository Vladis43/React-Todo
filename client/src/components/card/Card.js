import React, {Component} from 'react'
import {Redirect} from "react-router-dom"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from 'store/cards/actions'

import styled from 'styled-components'
import * as md from '@material-ui/core'

import Header from "./Header"
import CardItem from './CardItem'
import AddCardButton from './AddCardButton'
import CreatingCard from './modal/CreatingCard'

const CardWrapper = styled.div`  
  width: 98%;
  position: absolute;
  top: 100px;
  @media screen and (max-device-width: 455px) {
    top: 50px;
  }
`;
const GridContainer = styled(md.Grid)``;
const GridItem = styled(md.Grid)`
  display: flex;
  justify-content: center;
`;

class Card extends Component {
    state = {
        isOpenCreatingCard: false,
        cardName: '',
        cardDescription: '',
        errorMessage: ''
    }

    componentDidMount() {
        const userId = window.localStorage.getItem('id')
        this.props.fetchCards(userId)
    }

    handleLogOut = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('id')
        window.localStorage.removeItem('user')

        this.props.history.push('/auth')
    }

    handleOpenCreatingCard = (event) => {
        event.preventDefault()
        this.setState({isOpenCreatingCard: true})
    }

    handleCloseCreatingCard = () => {
        this.setState({isOpenCreatingCard: false, errorMessage: ''})
    }

    handleChangeName = (event) => {
        this.setState({
            cardName: event.target.value,
            errorMessage: ''
        })
    }

    handleChangeDescription = (event) => {
        this.setState({
            cardDescription: event.target.value,
            errorMessage: ''
        })
    }

    handleAddNewCard = (event) => {
        event.preventDefault()
        const {cardName, cardDescription} = this.state

        if (cardName && cardDescription === '') {
            this.setState({errorMessage: 'Field is required!'})
        } else {
            const card = {
                title: cardName,
                description: cardDescription,
                userId: window.localStorage.getItem('id')
            }
            this.props.addNewCard(card)
            this.setState({isOpenCreatingCard: false})
        }
    }


    render() {
        const {todos, cards, deleteCard} = this.props
        const {isOpenCreatingCard, cardName, cardDescription, errorMessage} = this.state

        return (
            window.localStorage.getItem('token') &&
            window.localStorage.getItem('token') !== null &&
            window.localStorage.getItem('token') !== 'undefined' ?

                <div>
                    <Header
                        logOut={this.handleLogOut}
                        username={window.localStorage.getItem('user').toUpperCase()}
                    />
                    <CardWrapper>
                        <GridContainer container spacing={24} style={{padding: 24}}>
                            {cards.map(card => {
                                return (
                                    <GridItem item xs={12} sm={6} lg={4} xl={3} key={card._id}>
                                        <CardItem
                                            card={card}
                                            amountTodo={todos.length}
                                            cardName={card.title}
                                            deleteCardAction={deleteCard}
                                        />
                                    </GridItem>
                                )
                            })}
                            <CreatingCard
                                isModal={isOpenCreatingCard}
                                cardName={cardName}
                                cardDescription={cardDescription}
                                closeModal={this.handleCloseCreatingCard}
                                errorMessage={errorMessage}
                                addNewCard={this.handleAddNewCard}
                                changeName={this.handleChangeName}
                                changeDescription={this.handleChangeDescription}
                            />
                            <GridItem item xs={12} sm={6} lg={4} xl={3}>
                                <AddCardButton openModal={this.handleOpenCreatingCard}/>
                            </GridItem>
                        </GridContainer>
                    </CardWrapper>
                </div> : <Redirect to="/auth"/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.items,
        cards: state.cards.items
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapActionToProps)(Card)
