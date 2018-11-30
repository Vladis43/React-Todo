import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from 'store/todos/actions'

import styled from 'styled-components'
import * as md from '@material-ui/core'

import Header from "./header/Header"
import CardItem from './carditem/CardItem'
import AddCard from './addcard/AddCard'

//Styled Components=====================================================================================================
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
//======================================================================================================================

class Card extends Component {
    state = {
        cards: []
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

        this.setState({
            cards: this.state.cards
        })

    }

    render() {
        const {todos} = this.props

        console.log(this.state.cards)
        return (
            <div>
                <Header
                    logOut={this.handleLogOut}
                    username={window.localStorage.getItem('user').toUpperCase()}
                />
                <CardWrapper>
                    <GridContainer container spacing={40} >
                        {this.state.cards.map((card, index) => {
                            return (
                                <GridItem item xs={3} key={index}>
                                    <CardItem amountTodo={todos.length}/>
                                </GridItem>
                            )
                        })}


                        {/*<GridItem item xs={3}>*/}
                            {/*<CardItem amountTodo={todos.length}/>*/}
                        {/*</GridItem>*/}
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
