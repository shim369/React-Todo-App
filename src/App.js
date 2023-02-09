import './App.css';
import React from "react";
import { useState } from "react";
import { v4 } from 'uuid';

function App() {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);



	const handleSubmit = (e) => {
		e.preventDefault();

		const newTodo = {
			inputValue: inputValue,
			id: v4(),
			checked: false,
		};
		setTodos([
			newTodo,
			...todos
		]);
		setInputValue("");
	};

	const handleEdit = (id, inputValue) => {
		const newTodos = todos.map((todo) => {
			if(todo.id === id) {
				todo.inputValue = inputValue;
			}
			return todo;
		});
		setTodos(newTodos);
	};

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};


	const handleChecked = (id, checked) => {
		setTodos(
			todos.map((todo) => {
				if(todo.id === id) {
					todo.checked = !checked;
				}
				return todo;
			})
		);
	};	

	const handleDelete = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));

	}
	
  return (
    <div className="App">
		<div className='container'>
		<h1>React Todo App</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" onChange={handleChange} value={inputValue} className="inputText" />
				<button type="submit">Add</button>
			</form>
			<ul className='todoList'>
				{todos.map((todo) => (
					<li key={todo.id}>
						<input type="text"
						onChange={(e) => handleEdit(todo.id, e.target.value)}
						className="listText"
						value={todo.inputValue}
						disabled={todo.checked} />
						{/* <input className='checkBox' type="checkbox" onChange={() => handleChecked(todo.id, todo.checked)} /> */}
						
						<input type="checkbox" id={`box-${todo.id}`} onChange={(e) => handleChecked(todo.id, todo.checked)} /><label htmlFor={`box-${todo.id}`}></label>
						<button onClick={()=> handleDelete(todo.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	</div>
  );
}

export default App;