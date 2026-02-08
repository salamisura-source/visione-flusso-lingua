import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { TaskPriority } from '@/types/task';

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  priorityFilter: TaskPriority | 'all';
  onPriorityChange: (priority: TaskPriority | 'all') => void;
}

const PRIORITIES: (TaskPriority | 'all')[] = ['all', 'high', 'medium', 'low'];

export const TaskFilters = ({
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityChange,
}: TaskFiltersProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row gap-3 px-4 mb-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('action.search')}
          className="pl-10 bg-input border-border"
        />
      </div>

      {/* Priority Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <Select value={priorityFilter} onValueChange={(v) => onPriorityChange(v as TaskPriority | 'all')}>
          <SelectTrigger className="w-[140px] bg-input border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PRIORITIES.map((p) => (
              <SelectItem key={p} value={p}>
                {p === 'all' ? t('filter.all_priorities') : t(`priority.${p}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
