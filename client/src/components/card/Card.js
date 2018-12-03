import React, {Component} from 'react'
import {Redirect} from "react-router-dom"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from 'store/cards/actions'

import styled from 'styled-components'
import * as md from '@material-ui/core'

import Header from "./header/Header"
import CardItem from './carditem/CardItem'
import AddCard from './addcard/AddCard'
import TodoModal from './todomodal/TodoModal'


const CardWrapper = styled.div`  
  width: 98%;
  position: absolute;
  top: 100px;
`;
const GridContainer = styled(md.Grid)``;
const GridItem = styled(md.Grid)`
  display: flex;
  justify-content: center;
`;


class Card extends Component {
    state = {
        open: false,
        cardName: '',
        cardNameActive: false,
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

    addCard = (event) => {
        event.preventDefault()

        this.setState({open: true})
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        if (this.state.cardNameActive) {
            this.setState({open: false})
        } else {
            this.setState({errorMessage: 'Specify card name!'})
        }
    }

    handleChangeName = (event) => {
        this.setState({
            cardName: event.target.value.toUpperCase(),
            errorMessage: ''
        })
    }

    handleChangeNameActive = () => {
        this.setState({
            cardNameActive: !this.state.cardNameActive
        })
        const card = {
            title: this.state.cardName,
            userId: window.localStorage.getItem('id')
        }
        this.props.addNewCard(card)

        this.setState({
            cardName: '',
            errorMessage: ''
        })
    }

    render() {
        const {todos, cards, deleteCard} = this.props
        const {open, cardName, cardNameActive, errorMessage} = this.state

        console.log(this.state)
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
                        <GridContainer container spacing={40}>
                            {cards.map(card => {
                                return (
                                    <GridItem item xs={3} key={card._id}>
                                        <CardItem
                                            amountTodo={todos.length}
                                            openModal={this.handleOpen}
                                            cardName={card.title}
                                            deleteCard={deleteCard}
                                        />
                                    </GridItem>
                                )
                            })}
                            <TodoModal
                                openModal={open}
                                cardName={cardName}
                                cardNameActive={cardNameActive}
                                errorMessage={errorMessage}
                                closeModal={this.handleClose}
                                ChangeName={event => this.handleChangeName(event)}
                                ChangeNameActive={this.handleChangeNameActive}
                            />
                            <GridItem item xs={3}>
                                <AddCard addNewCard={event => this.addCard(event)}/>
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
