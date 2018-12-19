import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from 'store/cards/actions'
import jwt from 'jsonwebtoken'

import styled from 'styled-components'
import * as md from '@material-ui/core'

import Header from "../components/Header"
import CardItem from '../components/card/CardItem'
import AddCardButton from '../components/card/AddCardButton'
import AddCard from '../components/card/modal/AddCard'
import EditCard from '../components/card/modal/EditCard'
import Snackbar from '../components/Snackbar'


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
        isEdit: false,
        isOpenCardModal: false,
        cardName: '',
        cardDescription: '',
        imageFile: '',
        imageURL: '',
        openSnackbar: false,
        errorMessage: ''
    }

    componentDidMount() {
        const token = window.localStorage.getItem('token')

        if (!token) {
            this.props.history.push('/authorization')
        } else {
            this.props.fetchCards(token)
        }
    }

    openAddCardModal = (event) => {
        event.preventDefault()
        this.setState({
            isOpenCardModal: true,
            cardName: '',
            cardDescription: '',
            imageFile: '',
            imageURL: ''
        })
    }

    openEditCardModal = (card) => {
        this.setState({
            isEdit: true,
            isOpenCardModal: true,
            cardName: card.title,
            cardDescription: card.description,
            imageURL: card.imageURL
        })
        window.localStorage.setItem('cardID', card._id)
    }

    closeCardModal = () => {
        this.setState({
            isEdit: false,
            isOpenCardModal: false
        })
        window.localStorage.removeItem('cardID')
    }

    handleChangeValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleImageChange = (event) => {
        const reader = new FileReader()
        const file = event.target.files[0]

        if (file !== undefined) {
            const isJPEG = file.type === 'image/jpeg'
            const isJPG = file.type === 'image/jpg'
            const isPNG = file.type === 'image/png'
            if (!isJPEG && !isJPG && !isPNG) {
                return this.setState({
                    imageFile: '',
                    imageURL: '',
                    openSnackbar: true,
                    errorMessage: 'You can upload JPEG, JPG, PNG file!'
                })
            }

            reader.onloadend = () => {
                this.setState({
                    imageFile: file,
                    imageURL: reader.result
                })
            }

            reader.readAsDataURL(file)
        } else {
            this.setState({
                imageFile: '',
                imageURL: ''
            })
        }
    }

    addNewCard = (event) => {
        event.preventDefault()
        const {cardName, cardDescription, imageFile} = this.state

        const card = {
            title: cardName,
            description: cardDescription,
            image: imageFile
        }

        const token = window.localStorage.getItem('token')
        const cardFormData = new FormData()

        Object.keys(card).forEach((key) => {
            cardFormData.append(key, card[key])
        })

        this.props.addNewCard(cardFormData, token)
        this.setState({isOpenCardModal: false})
    }

    editCard = () => {
        const {cardName, cardDescription, imageFile} = this.state
        const token = window.localStorage.getItem('token')
        const id = window.localStorage.getItem('cardID')
        const card = {
            title: cardName,
            description: cardDescription,
            image: imageFile
        }

        const cardFormData = new FormData()

        Object.keys(card).forEach((key) => {
            cardFormData.append(key, card[key])
        })

        this.props.editCard(id, cardFormData, token)
        this.setState({isOpenCardModal: false})
        window.localStorage.removeItem('cardID')
    }

    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        this.setState({openSnackbar: false})
    }

    render() {
        const {cards, deleteCard} = this.props
        const {isEdit, isOpenCardModal, cardName, cardDescription, imageURL, openSnackbar, errorMessage} = this.state

        const token = window.localStorage.getItem('token')
        const username = token ? jwt.decode(token).payload.username : ''

        return (
            <div>
                <Header
                    username={username}
                    history={this.props.history}
                />
                <CardWrapper>
                    <GridContainer container spacing={24} style={{padding: 24}}>
                        {cards.map(card => {
                            return (
                                <GridItem item xs={12} sm={6} lg={4} xl={3} key={card._id}>
                                    <CardItem
                                        card={card}
                                        openEditCardModal={() => this.openEditCardModal(card)}
                                        deleteCardAction={deleteCard}
                                    />
                                </GridItem>
                            )
                        })}
                        {!isEdit ?
                            <AddCard
                                isModal={isOpenCardModal}
                                cardName={cardName}
                                cardDescription={cardDescription}
                                imageURL={imageURL}
                                errorMessage={errorMessage}
                                closeModal={this.closeCardModal}
                                addNewCard={this.addNewCard}
                                changeValue={this.handleChangeValue}
                                handleImageChange={this.handleImageChange}
                            /> :
                            <EditCard
                                isModal={isOpenCardModal}
                                cardName={cardName}
                                cardDescription={cardDescription}
                                imageURL={imageURL}
                                errorMessage={errorMessage}
                                closeModal={this.closeCardModal}
                                editCard={this.editCard}
                                changeValue={this.handleChangeValue}
                                handleImageChange={this.handleImageChange}
                            />
                        }
                        <GridItem item xs={12} sm={6} lg={4} xl={3}>
                            <AddCardButton openModal={this.openAddCardModal}/>
                        </GridItem>
                    </GridContainer>
                </CardWrapper>
                <Snackbar
                    open={openSnackbar}
                    errorMessage={errorMessage}
                    handleCloseSnackbar={this.handleCloseSnackbar}
                />
            </div>
        )
    }
}

//TODO сделать одну модалку

const mapStateToProps = (state) => {
    return {
        users: state.auth.users,
        cards: state.cards.items
    }
}

export default connect(mapStateToProps, {...actions})(Card)
