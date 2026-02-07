import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Task, TaskStatus, TaskPriority } from '@/types/task';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('position', { ascending: true });

      if (error) throw error;
      setTasks((data as Task[]) || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Errore nel caricamento dei task');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (task: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          ...task,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      setTasks((prev) => [...prev, data as Task]);
      return data as Task;
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Errore nella creazione del task');
      return null;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Errore nell\'aggiornamento del task');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Errore nell\'eliminazione del task');
    }
  };

  const moveTask = async (taskId: string, newStatus: TaskStatus, newPosition: number) => {
    // Optimistic update
    setTasks((prev) => {
      const taskIndex = prev.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return prev;

      const newTasks = [...prev];
      newTasks[taskIndex] = { ...newTasks[taskIndex], status: newStatus, position: newPosition };
      return newTasks;
    });

    // Persist to database
    await updateTask(taskId, { status: newStatus, position: newPosition });
  };

  const getTasksByStatus = useCallback((status: TaskStatus): Task[] => {
    return tasks
      .filter((t) => t.status === status)
      .sort((a, b) => a.position - b.position);
  }, [tasks]);

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByStatus,
    refetch: fetchTasks,
  };
};
