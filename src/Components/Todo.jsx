import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItem from './TodoItem'

const Todo = () => {

    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : []);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef();

    if (inputRef === "") {
        return null;
    }

    const add = () => {
        const inputText = inputRef.current.value.trim();

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }
        setTodoList((prev) => [...prev, newTodo])
        setInputValue(""); //set value input and update state
        inputRef.current.value = "";
    }

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== id)
        })
    }

    const toggle = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isComplete: !todo.isComplete }
                }
                return todo;
            })
        })
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList))
    }, [todoList])

    const handleInputChange = () => {
        setInputValue(inputRef.current.value)
    }



    return (
        <div className='bg-white opacity-85 place-self-center w-11/12 max-w-2xl flex flex-col p-7 min-h-[550px] rounded-3xl shadow-md'>

            {/* ----- title ---------- */}

            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_icon} alt="" />
                <h1 className='text-3xl font-semibold'>To-Do List</h1>
            </div>

            {/* ----- input box ---------- */}

            <div className='flex items-center my-7 bg-gray-100 rounded-full'>
                <input
                    ref={inputRef}
                    className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-400'
                    type="text"
                    placeholder=' Add what you need to do'
                    onChange={handleInputChange} />
                <button
                    onClick={add}
                    className={`border-none rounded-full w-32 h-14 text-white text-3xl font-medium cursor-pointer ${inputValue ? 'bg-teal-400' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    disabled={!inputValue} // will be set to disabled if input no value
                >+</button>
            </div>

            {/* ----- todo list ---------- */}

            <div>
                {todoList.map((item, index) => {
                    return <TodoItem key={index} text={item.text} id={item.id}
                        isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
                })}
            </div>

        </div>
    )
}

export default Todo