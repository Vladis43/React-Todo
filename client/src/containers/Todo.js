import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from 'store/todos/actions'

import styled from 'styled-components'
import * as md from '@material-ui/core'
import * as icon from '@material-ui/icons'

import Preloader from '../components/todo/Preloader'
import TaskBar from '../components/todo/TaskBar'
import TodoItem from '../components/todo/TodoItem'


const Modal = styled(md.Dialog)``;
const Title = styled(md.DialogTitle)`
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 6px;
    color: #4251B1;
  }
`;
const Collapse = styled(md.Collapse)`
  div{
    display: flex;
    flex-direction: column;
  }
`;
const Description = styled(md.Typography)``;
const Image = styled.img`
  width: 100%;
`;
const Content = styled(md.DialogContent)`
  min-height: 300px;
`;
const Items = styled(md.Typography)`
  padding: 0 24px;
  text-align: right;
`;
const Actions = styled(md.DialogActions)``;
const CloseButton = styled(md.Button)``;


class Todo extends Component {
    state = {
        todoText: '',
        errorMessage: '',
        expanded: false
    }

    componentDidMount() {
        const cardId = window.localStorage.getItem('cardID')
        const token = window.localStorage.getItem('token')

        if (cardId) {
            this.props.fetchTodos(cardId, token)
        }
    }

    handleChange = (event) =>
        this.setState({
                todoText: event.target.value
            }
        )

    handleAddTodo = (event) => {
        event.preventDefault();

        const {todoText} = this.state

        if (todoText === '') {
            this.setState({
                errorMessage: 'Text field is require!'
            })
        } else {
            const token = window.localStorage.getItem('token')
            const cardId = window.localStorage.getItem('cardID')
            const todo = {
                title: todoText,
                completed: false
            }

            this.props.addNewTodo(cardId, todo, token)

            this.setState({
                todoText: '',
                errorMessage: ''
            })
        }
    }

    handleExpandClick = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        const {todoText, errorMessage, expanded} = this.state
        const {todos, isLoading, toggleTodo, deleteTodo} = this.props

        return (
            <Modal
                fullWidth
                open={this.props.isModal}
                onClose={this.props.closeModal}
                scroll="body"
            >
                {isLoading ? <Preloader/> : ''}
                <Title>
                    <div>
                        {this.props.title.toUpperCase()}
                        <md.IconButton
                            onClick={this.handleExpandClick}
                            aria-expanded={expanded}
                            style={
                                expanded ? {transform: 'rotate(180deg)', transition: '0.3s'} :
                                    {transform: 'rotate(0deg)', transition: '0.3s'}
                            }
                        >
                            <icon.ExpandMore/>
                        </md.IconButton>
                    </div>
                    <Collapse in={expanded} timeout="auto" unmountOnExit style={{transition: '0.3s'}}>
                        <div>
                            <Description variant="subtitle1">{this.props.description}</Description>
                            <Image src={this.props.image} alt=""/>
                        </div>
                    </Collapse>
                </Title>
                <Content>
                    <TaskBar
                        AddTodoSubmit={this.handleAddTodo}
                        todoValue={todoText}
                        onChange={(event) => {
                            this.handleChange(event)
                        }}
                        errorMessage={errorMessage}
                    />
                    <md.List component="nav">
                        {todos.map((todo) => {
                            return (
                                <TodoItem
                                    key={todo._id}
                                    todo={todo}
                                    toggleTodoAction={toggleTodo}
                                    deleteTodoAction={deleteTodo}
                                />
                            )
                        })}
                    </md.List>
                </Content>
                <Items color="textSecondary">{`Items: ${todos.length}`}</Items>
                <Actions>
                    <CloseButton color="primary" onClick={this.props.closeModal}>Close</CloseButton>
                </Actions>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.items,
        isLoading: state.todos.isFetching
    }
}

export default connect(mapStateToProps, {...actions})(Todo)