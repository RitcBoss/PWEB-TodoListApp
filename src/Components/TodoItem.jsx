import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'

const TodoItem = ({ text, id, isComplete, deleteTodo, toggle }) => {
    return (
        <div className='flex items-center my-3 gap-2 border-y-2 py-4 border-y-slate-100' >

            <div onClick={() => { toggle(id) }} className='flex flex-1 items-center cursor-pointer'>
                <img className='w-7' src={isComplete ? tick : not_tick} alt="" />
                <p className={`text-slate-700 ml-4 text-[17px] ${isComplete ? "line-through text-slate-300 " : ""}`}>{text}</p>
            </div>

            <div className='flex items-cente '>
                <img onClick={() => { deleteTodo(id) }} className='w-3.5 cursor-pointer ' src={delete_icon} alt="" />
            </div>
        </div>
    )
}

export default TodoItem