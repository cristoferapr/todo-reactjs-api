import React, {useState, useEffect} from "react";

//create your first component
const Home = () => {
	const [input, setInput] = useState('');
	const [task, setTask] = useState([])
	const [toggle, setToogle] = useState("No tasks, add a task")
	const togglePh = (n) =>{
		if (n == 1){
			return "What's need to be done?"
		}else{
			return "No tasks, add a task"
		}
	}

	async function fetchGET (){
		const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/cristofer', {
		  method: "GET",
		})
		const responseJSON = await response.json()
		if (!responseJSON) fetchCREATE()
		setTask(responseJSON)
		if( responseJSON.length > 1) setToogle(togglePh(1))

		.then(resp => {
	
			console.log(resp.ok); // will be true if the response is successfull

			console.log(resp.status); // the status code = 200 or code = 400 etc.
	
			console.log(resp.text()); // will try return the exact result as string
	
			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
	
		})
	
		.then(data => {
	
			//here is were your code should start after the fetch finishes
	
			console.log(data); //this will print on the console the exact object received from the server
	
		})
	
		.catch(error => {
	
			//error handling
	
			console.log(error);
	
		});
	}

	async function fetchPUT (){
		console.log(task)
		await fetch('https://assets.breatheco.de/apis/fake/todos/user/cristofer', {

		method: "PUT",
  
		body: JSON.stringify(task),
  
		headers: {
  
		  "Content-Type": "application/json"
  
		}
  
	  })

		.then(resp => {
	
			console.log(resp.ok); // will be true if the response is successfull
	
			console.log(resp.status); // the status code = 200 or code = 400 etc.
	
			console.log(resp.text()); // will try return the exact result as string
	
			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
	
		})
	
		.then(data => {
	
			//here is were your code should start after the fetch finishes
	
			console.log(data); //this will print on the console the exact object received from the server
	
		})
	
		.catch(error => {
	
			//error handling
	
			console.log(error);
	
		});
	}

	useEffect (() =>{
		fetchGET()
	}, [])

	useEffect (() =>{
		fetchPUT()
	}, [task])

	const addTask = (e) =>{
		e.preventDefault()
		if (input === '') return
		setTask([...task,
			{label:input, done:false}])
		setInput('')
		if( toggle === "No tasks, add a task"){
			setToogle(togglePh(1))
		}
		console.log(toggle)
	}

	const remove = (index) =>{
		setTask(task.filter((_item,i)=> i !== index))
		if( task.length === 2){
			setToogle(togglePh(0))
		}
	}

	const removeAll = () =>{
		var j = task.length -1
		let reducedTodo = [...task]
		for (j ; j>0; j--){
			reducedTodo.splice (j)
		}
		setTask(reducedTodo)
		setToogle(togglePh(0))
	}

	return(
		<body>
	<div className="container-fluid text-center body">
		<h1 className="heading">todos</h1>
		<ul>
			<li>
				<form onSubmit={addTask}>
				<input placeholder={toggle} className="taskinput ps-1" onChange={e => setInput(e.target.value)} value={input}></input>
				<button className="add-btn"></button>
				</form>
			</li>
			{task.map((item, i) =>(
				<li key={i}>
					<button className="delete-btn" onClick={()=> remove(i)}>{item.label}<span>x</span></button>
				</li>
			))}
					<br></br>
		<button className="rmall" onClick={removeAll}>REMOVE ALL TASKS</button>
		</ul>

	</div>
	</body>
	)
}
  
  export default Home