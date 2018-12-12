import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from 'store/cards/actions'
import jwt_decode from 'jwt-decode'

import styled from 'styled-components'
import * as md from '@material-ui/core'

import Header from "../components/Header"
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
        user: '',
        isOpenAddCardModal: false,
        cardName: '',
        cardDescription: '',
        imageFile: '',
        imageURL: '',
        errorMessage: ''
    }

    componentDidMount() {
        const token = window.localStorage.getItem('token')

        if (!token) {
            this.props.history.push('/authorization')
        } else {
            this.setState({
                user: jwt_decode(token)._doc
            })
            const userId = jwt_decode(token)._doc._id
            if (userId) {
                this.props.fetchCards(userId)
            }
        }
    }

    OpenAddCardModal = (event) => {
        event.preventDefault()
        this.setState({
            isOpenAddCardModal: true,
            cardName: '',
            cardDescription: '',
            imageFile: '',
            imageURL: '',
            errorMessage: ''
        })
    }

    CloseAddCardModal = () => {
        this.setState({isOpenAddCardModal: false})
    }

    handleChangeValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            errorMessage: ''
        })
    }

    handleImageChange = (event) => {
        const reader = new FileReader()
        const file = event.target.files[0]

        reader.onloadend = () => {
            this.setState({
                imageFile: file,
                imageURL: reader.result
            })
        }

        reader.readAsDataURL(file)
    }

    AddNewCard = (event) => {
        event.preventDefault()
        const {user, cardName, cardDescription, imageFile} = this.state

        if (cardName === '') {
            this.setState({errorMessage: 'Field is required!'})
        } else if (cardDescription === '') {
            this.setState({errorMessage: 'Field is required!'})
        } else {
            const card = {
                title: cardName,
                description: cardDescription,
                image: imageFile,
                userId: user._id
            }
            const token = window.localStorage.getItem('token')
            const cardFormData = new FormData()

            Object.keys(card).forEach((key) => {
                cardFormData.append(key, card[key])
            })

            this.props.addNewCard(cardFormData, token)
            this.setState({isOpenAddCardModal: false})
        }
    }

    render() {
        const {todos, cards, deleteCard} = this.props
        const {user, isOpenAddCardModal, cardName, cardDescription, imageURL, errorMessage} = this.state

        console.log(this.state)
        return (
            <div>
                <Header username={user.username} history={this.props.history}/>
                <CardWrapper>
                    <GridContainer container spacing={24} style={{padding: 24}}>
                        {cards.map(card => {
                            return (
                                <GridItem item xs={12} sm={6} lg={4} xl={3} key={card._id}>
                                    <CardItem
                                        card={card}
                                        amountTodo={todos.length}
                                        deleteCardAction={deleteCard}
                                    />
                                </GridItem>
                            )
                        })}
                        <AddCard
                            isModal={isOpenAddCardModal}
                            cardName={cardName}
                            cardDescription={cardDescription}
                            imageURL={imageURL}
                            errorMessage={errorMessage}
                            closeModal={this.CloseAddCardModal}
                            addNewCard={this.AddNewCard}
                            changeValue={this.handleChangeValue}
                            handleImageChange={this.handleImageChange}
                        />
                        <GridItem item xs={12} sm={6} lg={4} xl={3}>
                            <AddCardButton openModal={this.OpenAddCardModal}/>
                        </GridItem>
                    </GridContainer>
                </CardWrapper>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.items,
        users: state.auth.users,
        cards: state.cards.items
    }
}

export default connect(mapStateToProps, {...actions})(Card)
