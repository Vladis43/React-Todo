import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from 'store/todos/actions'

import styled from 'styled-components'
import * as md from '@material-ui/core'

import Header from "./header/Header"
import CardItem from './carditem/CardItem'
import AddCard from './addcard/AddCard'
import TodoModal from './todomodal/TodoModal'


const CardWrapper = styled.div`  
  width: 100%;
  position: absolute;
  top: 100px;
  
  display: flex;
  justify-content: center;
`;
const GridContainer = styled(md.Grid)``;
const GridItem = styled(md.Grid)`
  display: flex;
  justify-content: center;
`;


class Card extends Component {
    state = {
        open: false,
        cards: [],
        cardName: '',
        cardNameActive: true,
        errorMessage: ''
    }

    handleLogOut = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('id')
        window.localStorage.removeItem('user')

        this.props.history.push('/auth')
    }

    addCard = (event) => {
        event.preventDefault()
        this.state.cards.push(1)

        this.setState({cards: this.state.cards})

    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        if (!this.state.cardNameActive) {
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

    handleChangeNameActive = (event) => {
        event.preventDefault()

        this.setState({
            cardNameActive: !this.state.cardNameActive
        })
    }

    render() {
        const {todos} = this.props
        const {open, cards, cardName, cardNameActive, errorMessage} = this.state

        return (
            <div>
                <Header
                    logOut={this.handleLogOut}
                    username={window.localStorage.getItem('user').toUpperCase()}
                />
                <CardWrapper>
                    <GridContainer container spacing={40}>
                        {cards.map((card, index) => {
                            return (
                                <GridItem item xs={3} key={index}>
                                    <CardItem
                                        amountTodo={todos.length}
                                        openModal={this.handleOpen}
                                        cardName={cardName}
                                    />
                                </GridItem>
                            )
                        })}
                        <TodoModal
                            openModal={open}
GridI                       cardName={cardName}
                            cardNameActive={cardNameActive}
                            errorMessage={errorMessage}
                            closeModal={this.handleClose}
                            ChangeName={event => this.handleChangeName(event)}
                            ChangeNameActive={event => this.handleChangeNameActive(event)}
                        />
                        <GridItem item xs={3}>
                            <AddCard addNewCard={event => this.addCard(event)}/>
                        </GridItem>
                    </GridContainer>
                </CardWrapper>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.items
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapActionToProps)(Card)
