import { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Task, TaskStatus } from '@/types/task';
import { KanbanColumn } from './KanbanColumn';
import { TaskDialog } from './TaskDialog';
import { useTasks } from '@/hooks/useTasks';
import { useLanguage } from '@/contexts/LanguageContext';

const STATUSES: TaskStatus[] = ['not_started', 'ready', 'in_progress', 'blocked', 'done', 'cancelled'];

export const KanbanBoard = () => {
  const { t } = useLanguage();
  const { tasks, loading, createTask, updateTask, deleteTask, moveTask, getTasksByStatus } = useTasks();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>('not_started');

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStatus = destination.droppableId as TaskStatus;
    moveTask(draggableId, newStatus, destination.index);
  };

  const handleAddTask = (status: TaskStatus) => {
    setDefaultStatus(status);
    setEditingTask(null);
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
  };

  const handleSaveTask = async (taskData: Partial<Task>) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
    } else {
      await createTask({
        title: taskData.title || '',
        description: taskData.description || null,
        status: taskData.status || defaultStatus,
        priority: taskData.priority || 'medium',
        due_date: taskData.due_date || null,
        position: getTasksByStatus(taskData.status || defaultStatus).length,
      });
    }
    setDialogOpen(false);
    setEditingTask(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse-glow w-16 h-16 rounded-full bg-primary/20" />
      </div>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-thin">
          {STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={getTasksByStatus(status)}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </DragDropContext>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={editingTask}
        defaultStatus={defaultStatus}
        onSave={handleSaveTask}
      />
    </>
  );
};
