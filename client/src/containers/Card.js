import React, {Component} from 'react'
import {Redirect} from "react-router-dom"
import {connect} from 'react-redux'
import * as actions from 'store/cards/actions'

import styled from 'styled-components'
import * as md from '@material-ui/core'

import Header from "../components/card/Header"
import CardItem from '../components/card/CardItem'
import AddCardButton from '../components/card/AddCardButton'
import AddCard from '../components/card/modal/AddCard'

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
        isOpenAddCardModal: false,
        cardName: '',
        cardDescription: '',
        imageFileSelected: '',
        errorMessage: ''
    }

    componentDidMount() {
        const userId = window.localStorage.getItem('id')
        this.props.fetchCards(userId)
    }

    LogOut = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('id')
        window.localStorage.removeItem('user')

        this.props.history.push('/authorization')
    }

    OpenAddCardModal = (event) => {
        event.preventDefault()
        this.setState({isOpenAddCardModal: true})
    }

    CloseAddCardModal = () => {
        this.setState({
            isOpenAddCardModal: false,
            cardName: '',
            cardDescription: '',
            errorMessage: ''
        })
    }

    handleChangeValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            errorMessage: ''
        })
    }

    handleImageFileSelected = (event) => {
        if (event.target.files.length === 0) {
            return null
        } else {
            this.setState({
                imageFileSelected: event.target.files[0]
            })
        }
    }

    AddNewCard = (event) => {
        event.preventDefault()
        const {cardName, cardDescription} = this.state

        if (cardName === '') {
            this.setState({errorMessage: 'Field is required!'})
        } else  if (cardDescription === '') {
            this.setState({errorMessage: 'Field is required!'})
        } else {
            const card = {
                title: cardName,
                description: cardDescription,
                userId: window.localStorage.getItem('id')
            }
            this.props.addNewCard(card)
            this.setState({
                isOpenCreatingCard: false,
                cardName: '',
                cardDescription: ''
            })
        }
    }

    render() {
        const {todos, cards, deleteCard} = this.props
        const {isOpenAddCardModal, cardName, cardDescription, imageFileSelected, errorMessage} = this.state

        return (
            window.localStorage.getItem('token') &&
            window.localStorage.getItem('token') !== null &&
            window.localStorage.getItem('token') !== 'undefined' ?

                <div>
                    <Header
                        logOut={this.LogOut}
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
                            <AddCard
                                isModal={isOpenAddCardModal}
                                cardName={cardName}
                                cardDescription={cardDescription}
                                imageFileSelected={imageFileSelected}
                                errorMessage={errorMessage}
                                closeModal={this.CloseAddCardModal}
                                addNewCard={this.AddNewCard}
                                changeValue={this.handleChangeValue}
                                changeImageFile={this.handleImageFileSelected}
                            />
                            <GridItem item xs={12} sm={6} lg={4} xl={3}>
                                <AddCardButton openModal={this.OpenAddCardModal}/>
                            </GridItem>
                        </GridContainer>
                    </CardWrapper>
                </div> : <Redirect to="/authorization"/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.items,
        cards: state.cards.items
    }
}

export default connect(mapStateToProps, {...actions})(Card)
