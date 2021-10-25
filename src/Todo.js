import React from "react";
import { Component, useState} from "react";
import { Input, List, DatePicker} from "antd";
import {CloseCircleOutlined} from '@ant-design/icons';

// TODO
// add an event listener- cmd-z / cmd-shift-z to undo/redo changes
// keep track of the previous state in history
  // history
    // prev: array of old states
      // question-should I track the nextId? maybe yes
    // current: normally null, but when undoing, track the pos in history
    

  // each new todos, add the old todos&nextId to history
    // helper func
    // if current is not null
      // truncate next parts of history(can't redo now)
      // set to current null
    
  // undo
    // check if there are history to revert to, else do nothing
      // prev non empty
      // current not set to 0
    // set current to place to revert to
      // if !current, set current to prev.len 
      // else current = current-1
    // add the state now to history(so we can redo)
    // set todos&nextId to prev[current] - helper func

  // redo
    // check if there are states to redo to
      // current not null
    // set current to place to redo to
      // current = current + 1
    // set todos&nextId to prev[current] - helper func

class Todo extends Component {
	constructor(props) {
		super(props);

		this.state ={
      history: [],
			todos: [],
      nextId: 0
		}
	}

  addInput = (todoContent)=>{
    const {todos, nextId} = this.state;

    const newTodos = todos.concat(
      {
        // unique id to every todo item
        id: nextId,
        content: todoContent,
        date: null,
      }
    );

    this.setState({
      todos: newTodos,
      nextId: nextId+1,
    });
  }

  removeItem = todoID=>{
    const {todos} = this.state;

    const itemIdx = findTodoByID(todos, todoID);
    const newTodos = todos.slice();
    newTodos.splice(itemIdx, 1);

    this.setState({
      todos: newTodos,
    })
  }

  handleDateChange = (date, todoId)=>{
    const{todos, nextId} = this.state;
    const todoIdx = findTodoByID(todos, todoId);
   

    // making copy instead of modifying the object to allow functionality like 
    // undo changes in future
    const newTodoItem = Object.assign({}, todos[todoIdx]);
    newTodoItem.id = nextId;
    this.setState({nextId: nextId+1});
    newTodoItem.date = date;

    const newTodos = todos.slice();
    newTodos[todoIdx] = newTodoItem;
    this.setState({todos: newTodos});
  }

	render() {
		return (
			<div className="todoContainer">
				<h1>ToDo List</h1>
				
				<InputTodo
          addTodo={this.addInput}
				/>

        <List 
          dataSource={this.state.todos}
          locale={{emptyText: "Nothing todo yet"}}
          renderItem={item=>(
            <TodoItem
              todo={item}
              onRemove={this.removeItem}
              onDateChange={this.handleDateChange}
            />
          )}
        />
			</div>
		);
	}
}

// helper function, return the index of a todo with certain id
// if not find, throw an error
function findTodoByID(todos, id ){
  for(let i=0; i<todos.length; i++){
    if(todos[i].id === id){
      return i;
    }
  }
  throw console.error("no todo item with that id!");
}


// controlled element for input section that adds todo
// simply using e.target.value = "new"; to clear Input doesnt work for this version of antd
// had to create a hook to manage the value of Input
function InputTodo({addTodo}){
  const [inputVal, setInputVal] = useState("");

  const handleChange = e=>{
    setInputVal(e.target.value);
  }

  const handlePressEnter = e=>{
    addTodo(e.target.value);
    // clear the input
    setInputVal("");
  }

  return (
    <Input
      placeholder="What needs to be done?"
      value={inputVal}
      onChange={handleChange}
      onPressEnter={handlePressEnter}
    />
  );
}


function TodoItem({todo, onRemove, onDateChange}){
  return (
    <List.Item 
      actions={[
        <DatePicker 
          onChange={(date, _)=>onDateChange(date, todo.id)}
          value={todo.date}
        />,
        <CloseCircleOutlined
          onClick={()=>{onRemove(todo.id)}}
        />,
      ]}
    >
      {todo.content}
    </List.Item>
  );
}

export default Todo;
