import './App.css';
import React from "react";
import { useState } from "react";

function App() {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);



	const handleSubmit = (e) => {
		e.preventDefault();

		const newTodo = {
			inputValue: inputValue,
			id: todos.length,
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
		<div>
			<h2>React Todo App</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" onChange={handleChange} value={inputValue} className="inputText" />
				<input type="submit" value="作成" className="submitButton" />
			</form>
			<ul className='todoList'>
				{todos.map((todo) => (
					<li key={todo.id}>
						<input type="text"
						onChange={(e) => handleEdit(todo.id, e.target.value)}
						className="inputText"
						value={todo.inputValue}
						disabled={todo.checked} />
						<input className='checkBox' type="checkbox" onChange={() => handleChecked(todo.id, todo.checked)} />
						<button onClick={()=> handleDelete(todo.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	</div>
  );
}

export default App;