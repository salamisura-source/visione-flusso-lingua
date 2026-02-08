import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TaskAttachment } from '@/types/attachment';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export const useAttachments = (taskId: string | null) => {
  const { user } = useAuth();
  const [attachments, setAttachments] = useState<TaskAttachment[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchAttachments = useCallback(async () => {
    if (!taskId || !user) {
      setAttachments([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('task_attachments')
        .select('*')
        .eq('task_id', taskId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAttachments((data as TaskAttachment[]) || []);
    } catch (error) {
      console.error('Error fetching attachments:', error);
    } finally {
      setLoading(false);
    }
  }, [taskId, user]);

  const uploadAttachment = async (file: File): Promise<TaskAttachment | null> => {
    if (!taskId || !user) return null;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${user.id}/${taskId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('task-attachments')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: attachment, error: dbError } = await supabase
        .from('task_attachments')
        .insert({
          task_id: taskId,
          user_id: user.id,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      setAttachments((prev) => [attachment as TaskAttachment, ...prev]);
      return attachment as TaskAttachment;
    } catch (error) {
      console.error('Error uploading attachment:', error);
      toast.error('Errore nel caricamento del file');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteAttachment = async (attachment: TaskAttachment) => {
    try {
      const { error: storageError } = await supabase.storage
        .from('task-attachments')
        .remove([attachment.file_path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('task_attachments')
        .delete()
        .eq('id', attachment.id);

      if (dbError) throw dbError;

      setAttachments((prev) => prev.filter((a) => a.id !== attachment.id));
    } catch (error) {
      console.error('Error deleting attachment:', error);
      toast.error('Errore nell\'eliminazione del file');
    }
  };

  const getPublicUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('task-attachments')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  return {
    attachments,
    loading,
    uploading,
    fetchAttachments,
    uploadAttachment,
    deleteAttachment,
    getPublicUrl,
  };
};
