import { useState, useEffect } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Calendar, Flag, MoreHorizontal, Pencil, Trash2, Paperclip } from 'lucide-react';
import { Task } from '@/types/task';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { it, enUS, es, de, fr } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const locales = { it, en: enUS, es, de, fr };

export const TaskCard = ({ task, index, onEdit, onDelete }: TaskCardProps) => {
  const { t, language } = useLanguage();
  const [attachmentCount, setAttachmentCount] = useState(0);

  useEffect(() => {
    const fetchAttachmentCount = async () => {
      const { count } = await supabase
        .from('task_attachments')
        .select('*', { count: 'exact', head: true })
        .eq('task_id', task.id);
      setAttachmentCount(count || 0);
    };
    fetchAttachmentCount();
  }, [task.id]);

  const priorityColors = {
    low: 'bg-priority-low',
    medium: 'bg-priority-medium',
    high: 'bg-priority-high',
  };

  const priorityLabels = {
    low: t('priority.low'),
    medium: t('priority.medium'),
    high: t('priority.high'),
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM', { locale: locales[language] });
    } catch {
      return '';
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            group relative bg-card rounded-lg p-4 mb-3
            border border-border/50 cursor-grab active:cursor-grabbing
            transition-all duration-200 animate-fade-in
            ${snapshot.isDragging ? 'shadow-lg ring-2 ring-primary/50 rotate-2 scale-105' : 'hover:border-primary/30 card-shadow hover:scale-[1.02]'}
          `}
        >
          {/* Action Menu */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded hover:bg-secondary transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  {t('action.edit')}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(task.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t('action.delete')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Title */}
          <h3 className="font-medium text-card-foreground pr-8 mb-2 line-clamp-2">
            {task.title}
          </h3>

          {/* Description */}
          {task.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Priority Badge */}
            <span className={`
              inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-primary-foreground
              ${priorityColors[task.priority]}
            `}>
              <Flag className="w-3 h-3" />
              {priorityLabels[task.priority]}
            </span>

            {/* Due Date */}
            {task.due_date && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground">
                <Calendar className="w-3 h-3" />
                {formatDate(task.due_date)}
              </span>
            )}

            {/* Attachments Count */}
            {attachmentCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground">
                <Paperclip className="w-3 h-3" />
                {attachmentCount}
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};
