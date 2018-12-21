import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from 'store/todos/actions'

import styled from 'styled-components'
import * as md from '@material-ui/core'

import Preloader from '../components/todo/Preloader'
import TaskBar from '../components/todo/TaskBar'
import TodoItem from '../components/todo/TodoItem'


const Modal = styled(md.Dialog)``;
const Title = styled(md.DialogTitle)``;
const Content = styled(md.DialogContent)`
  min-height: 300px;
`;
const Actions = styled(md.DialogActions)``;


class Todo extends Component {
    state = {
        todoText: '',
        errorMessage: ''
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

    render() {
        const {todoText, errorMessage} = this.state
        const {todos, isLoading, toggleTodo, deleteTodo} = this.props

        return (
            <Modal
                fullWidth
                open={this.props.isModal}
                onClose={this.props.closeModal}
            >
                {isLoading ? <Preloader/> : ''}
                <Title>{this.props.title.toUpperCase()}</Title>
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
                <Actions>
                    <md.Button color="primary" onClick={this.props.closeModal}>Close</md.Button>
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