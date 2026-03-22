import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AppContext = createContext(null)

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function AppProvider({ children }) {
  const [tasks, setTasks] = useState([[], []])
  const [loading, setLoading] = useState(true)

  const loadTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at')
    if (error) { console.error('Load error:', error); return }
    setTasks([
      data.filter(t => t.player_idx === 0),
      data.filter(t => t.player_idx === 1),
    ])
    setLoading(false)
  }

  useEffect(() => {
    loadTasks()

    // Real-time: any insert/delete on tasks reloads both players' data
    const channel = supabase
      .channel('tasks-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, loadTasks)
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const addTask = async (idx, data) => {
    const task = {
      id: generateId(),
      player_idx: idx,
      created_at: new Date().toISOString(),
      ...data,
    }
    // Optimistic update
    setTasks(prev => {
      const next = [prev[0].slice(), prev[1].slice()]
      next[idx] = [...next[idx], task]
      return next
    })
    const { error } = await supabase.from('tasks').insert(task)
    if (error) {
      console.error('Add error:', error)
      // Rollback
      setTasks(prev => {
        const next = [prev[0].slice(), prev[1].slice()]
        next[idx] = next[idx].filter(t => t.id !== task.id)
        return next
      })
    }
  }

  const deleteTask = async (idx, id) => {
    // Optimistic update
    setTasks(prev => {
      const next = [prev[0].slice(), prev[1].slice()]
      next[idx] = next[idx].filter(t => t.id !== id)
      return next
    })
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) {
      console.error('Delete error:', error)
      loadTasks() // Reload on failure
    }
  }

  const getTasksForDate = (idx, dateStr) => tasks[idx].filter(t => t.date === dateStr)

  return (
    <AppContext.Provider value={{ addTask, deleteTask, getTasksForDate, loading }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
