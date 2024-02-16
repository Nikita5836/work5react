import React, { Component } from 'react';
import {
  Form,
  Button,
  ListGroup,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: JSON.parse(localStorage.getItem('todos')) || [],
      newTodo: '',
      editingIndex: -1,
      editText: '',
    };
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  handleChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.newTodo.trim() === '') return;
    const todos = [
      ...this.state.todos,
      { text: this.state.newTodo, editing: false },
    ];
    this.setState({ todos, newTodo: '' });
  };

  handleDelete = (index) => {
    const todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState({ todos });
  };

  handleEdit = (index) => {
    const todos = [...this.state.todos];
    todos[index].editing = true;
    this.setState({ todos, editingIndex: index, editText: todos[index].text });
  };

  handleEditChange = (e) => {
    this.setState({ editText: e.target.value });
  };

  handleEditSubmit = (e) => {
    e.preventDefault();
    if (this.state.editText.trim() === '') return;
    const todos = [...this.state.todos];
    todos[this.state.editingIndex].text = this.state.editText;
    todos[this.state.editingIndex].editing = false;
    this.setState({ todos, editingIndex: -1, editText: '' });
  };

  render() {
    return (
      <Container className="py-5">
        <h2 className="text-center mb-4">Todo List</h2>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form onSubmit={this.handleSubmit} className="mb-3">
              <InputGroup>
                <FormControl
                  type="text"
                  value={this.state.newTodo}
                  onChange={this.handleChange}
                  placeholder="Add a new todo"
                />
                <Button type="submit" variant="primary">
                  Add
                </Button>
              </InputGroup>
            </Form>
            <ListGroup>
              {this.state.todos.map((todo, index) => (
                <ListGroup.Item
                  key={index}
                  className={`${
                    todo.editing ? 'editing' : ''
                  } d-flex justify-content-between align-items-center`}
                >
                  {todo.editing ? (
                    <Form onSubmit={this.handleEditSubmit} className="w-100">
                      <InputGroup>
                        <FormControl
                          type="text"
                          value={this.state.editText}
                          onChange={this.handleEditChange}
                        />
                        <Button type="submit" variant="success">
                          Save
                        </Button>
                      </InputGroup>
                    </Form>
                  ) : (
                    <>
                      <span>{todo.text}</span>
                      <div>
                        <Button
                          variant="info"
                          onClick={() => this.handleEdit(index)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => this.handleDelete(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    </>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TodoList;
