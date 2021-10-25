import React from "react";
import { Component, useState} from "react";
import { Input, List, DatePicker} from "antd";
import {CloseCircleOutlined} from '@ant-design/icons';

import { Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;

// PLAN
// add an event listener- cmd-z / cmd-shift-z to undo/redo changes
// keep track of the previous state in history
  // history
    // prev: array of old states
      // question-should I track the nextId? maybe not, that will complicate the situation
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
      // if current == len - 1, current=null
    // set todos&nextId to prev[current]

class Todo extends Component {
	constructor(props) {
		super(props);

		this.state = {
      // note: history only tracks of past states, the current state is not in it
      history: {
        prev: [],
        current: null,
      },
			todos: [],
      nextId: 0
		}
	}

  // --- undo/redo ---
  // helper func for changing todos
  editTodos(newTodos){
    const {todos, nextId, history} = this.state;
    let {prev, current} = history;
    // if the current is not null, truncate prev, set current to null
    // so you can't redo after editing

    //TODO: something is off...
    if(current||(current===0)){
      // do not include the current state
      // since it will be added later anyway
      prev = prev.slice(0, current);
      current = null;
    }

    // add current todos to history
    const newPrev = prev.concat({
      todos: todos,
      nextId: nextId
    });
    const newHistory = {
      prev: newPrev,
      current: current
    }
    
    this.setState({history: newHistory});
    
    // change state to newTodos
    this.setState({todos: newTodos});
  }

  undo = () => {
    const {todos, nextId} = this.state;
    let {prev, current} = this.state.history;
    
    // check if there are history to revert to
      // prev non-empty
      // not in earliest history(current=0)
    if ((!prev)||(current===0)){
      console.log('Undo failed: no history revert back to');
      return;
    }

    // set current to place to revert to
    if (!current) {
      // if this is the first undo 
      // add the state now to history(so we can redo)
      current = prev.length - 1;

      prev = prev.concat({
        todos: todos,
        nextId: nextId
      });
    } else {
      current = current - 1;
    }
    const newHistory = {
      prev: prev,
      current: current
    }
    this.setState({history: newHistory});

    // set todos&nextId to prev[current]
    this.setState(prev[current]);
  }

  redo = ()=>{
    let {current, prev} = this.state.history;

    // check if there are states to redo to
    // if current state is at the end of history list
    // there is no future states to redo to, set current to null
    if (current===(prev.length-1)){
      current = null;
    }
    if (current===null) {
      console.log('redo fails: no state to redo to');
      return;
    }

    // set current to place to redo to
    current = current + 1;
    
    this.setState({history: {
      prev: prev,
      current: current
    }})

    // set todos&nextId to prev[current]
    this.setState(prev[current]);
  }

  // event listening for ctrl+z / ctrl+shift+z
  componentDidMount() {
    // event for undo&redo
    window.addEventListener('keydown', (event) => {
      if (event.ctrlKey
        &&event.shiftKey
        &&event.key.toLowerCase() === 'z') {
        this.redo();
      } else if (event.ctrlKey
        &&event.key.toLowerCase() === 'z') {
        this.undo();
      } 
    });
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
    
    this.editTodos(newTodos);
    this.setState({
      nextId: nextId+1,
    });
  }

  removeItem = todoID=>{
    const {todos} = this.state;

    const itemIdx = findTodoByID(todos, todoID);
    const newTodos = todos.slice();
    newTodos.splice(itemIdx, 1);

    this.editTodos(newTodos);
  }

  handleDateChange = (date, todoId)=>{
    const{todos} = this.state;
    const todoIdx = findTodoByID(todos, todoId);
   

    // making copy instead of modifying the object to allow functionality like 
    // undo changes in future
    // not changing the id because the old item is immediately replaced by the new
    // one so there are no need to worry about duplicate ids
    const newTodoItem = Object.assign({}, todos[todoIdx]);
    newTodoItem.date = date;

    const newTodos = todos.slice();
    newTodos[todoIdx] = newTodoItem;
    this.editTodos(newTodos);
  }

	render() {
		return (
			<div className="todoContainer">
        <Typography>
          <Title>ToDo List</Title>
          
          <Paragraph> 
            Press <Text keyboard>Enter</Text> to input a list item
          </Paragraph>

          <Paragraph> 
            Use <Text keyboard>Ctrl+Z</Text> to undo, 
            <Text keyboard>Ctrl+Shift+Z</Text> to redo
          </Paragraph>
        </Typography>

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
