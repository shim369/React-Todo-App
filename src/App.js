import './App.css';
import React from "react";
import { useState } from "react";

function App() {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

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

	const handleSubmit = (e) => {
		e.preventDefault();

		setTodos([
			...todos,
			{
				id: todos.length,
				inputValue: inputValue,
				checked: false,
			},
		]);
		setInputValue("");
	};

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};


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
						<div className={`todoValue ${todo.checked ? "completed" : ""}`}>
						<span>{todo.inputValue}</span>
						</div>
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