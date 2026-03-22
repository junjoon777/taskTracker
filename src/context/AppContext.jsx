import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function AppProvider({ children }) {
  const [names, setNames] = useState(() => [
    localStorage.getItem('tc_name_0') || 'Player 1',
    localStorage.getItem('tc_name_1') || 'Player 2',
  ])

  const [tasks, setTasksState] = useState(() => [
    JSON.parse(localStorage.getItem('tc_tasks_0') || '[]'),
    JSON.parse(localStorage.getItem('tc_tasks_1') || '[]'),
  ])

  const updateName = (idx, name) => {
    const updated = [...names]
    updated[idx] = name
    setNames(updated)
    localStorage.setItem(`tc_name_${idx}`, name)
  }

  const saveTasks = (idx, updated) => {
    setTasksState(prev => {
      const next = [...prev]
      next[idx] = updated
      return next
    })
    localStorage.setItem(`tc_tasks_${idx}`, JSON.stringify(updated))
  }

  const addTask = (idx, data) => {
    const task = { id: generateId(), createdAt: new Date().toISOString(), ...data }
    saveTasks(idx, [...tasks[idx], task])
    return task
  }

  const deleteTask = (idx, id) => {
    saveTasks(idx, tasks[idx].filter(t => t.id !== id))
  }

  const getTasksForDate = (idx, dateStr) => tasks[idx].filter(t => t.date === dateStr)

  return (
    <AppContext.Provider value={{ names, updateName, addTask, deleteTask, getTasksForDate }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
