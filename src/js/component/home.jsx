import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

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

	const addTask = (e) =>{
		e.preventDefault()
		if (input === '') return
		setTask([...task, {
			text:input,
			completed:false
		}])
		setInput('')
		if( toggle === "No tasks, add a task"){
			setToogle(togglePh(1))
		}
		console.log(toggle)
	}

	const remove = (index) =>{
		setTask(task.filter((_item,i)=> i !== index))
		if (index == 0){
			togglePh(0)
		}
		if( task.length === 1){
			setToogle(togglePh(0))
		}
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
					<button className="delete-btn" onClick={()=> remove(i)}>{item.text}<span>x</span></button>
				</li>
			))}
		</ul>
	</div>
	</body>
	)
}
  
  export default Home