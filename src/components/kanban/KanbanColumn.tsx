import { motion } from 'framer-motion';
import { Droppable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { Task, TaskStatus } from '@/types/task';
import { TaskCard } from './TaskCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onAddTask: (status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const statusColors: Record<TaskStatus, string> = {
  not_started: 'bg-status-not-started',
  ready: 'bg-status-ready',
  in_progress: 'bg-status-in-progress',
  blocked: 'bg-status-blocked',
  done: 'bg-status-done',
  cancelled: 'bg-status-cancelled',
};

export const KanbanColumn = ({ 
  status, 
  tasks, 
  onAddTask,
  onEditTask,
  onDeleteTask,
}: KanbanColumnProps) => {
  const { t } = useLanguage();

  const statusKey = `status.${status}` as const;
  const title = t(statusKey);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-shrink-0 w-[300px] bg-muted/30 rounded-xl border border-border/50 flex flex-col max-h-[calc(100vh-200px)]"
    >
      {/* Column Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
            <h2 className="font-semibold text-foreground">{title}</h2>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              {tasks.length}
            </span>
          </div>
          <button
            onClick={() => onAddTask(status)}
            className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tasks Container */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex-1 p-3 overflow-y-auto scrollbar-thin min-h-[100px]
              transition-colors duration-200
              ${snapshot.isDraggingOver ? 'bg-primary/5' : ''}
            `}
          >
            {tasks.length === 0 ? (
              <div className="flex items-center justify-center h-20 text-muted-foreground text-sm">
                {t('message.no_tasks')}
              </div>
            ) : (
              tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </motion.div>
  );
};
