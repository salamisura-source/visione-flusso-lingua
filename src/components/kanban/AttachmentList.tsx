import { useState, useEffect, useRef } from 'react';
import { Paperclip, X, Download, Image, FileText, File, Loader2, Plus } from 'lucide-react';
import { TaskAttachment } from '@/types/attachment';
import { useAttachments } from '@/hooks/useAttachments';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface AttachmentListProps {
  taskId: string | null;
  readOnly?: boolean;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith('image/')) return Image;
  if (fileType.includes('pdf') || fileType.includes('document')) return FileText;
  return File;
};

export const AttachmentList = ({ taskId, readOnly = false }: AttachmentListProps) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    attachments,
    loading,
    uploading,
    fetchAttachments,
    uploadAttachment,
    deleteAttachment,
    getPublicUrl,
  } = useAttachments(taskId);

  useEffect(() => {
    if (taskId) {
      fetchAttachments();
    }
  }, [taskId, fetchAttachments]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} è troppo grande. Max 10MB.`);
        continue;
      }
      await uploadAttachment(file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownload = (attachment: TaskAttachment) => {
    const url = getPublicUrl(attachment.file_path);
    window.open(url, '_blank');
  };

  if (!taskId) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Paperclip className="w-4 h-4" />
          <span>{t('form.attachments')} ({attachments.length})</span>
        </div>
        
        {!readOnly && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="text-xs"
            >
              {uploading ? (
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              ) : (
                <Plus className="w-3 h-3 mr-1" />
              )}
              {t('action.add_file')}
            </Button>
          </>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : attachments.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-2">
          {t('message.no_attachments')}
        </p>
      ) : (
        <div className="space-y-2 max-h-[200px] overflow-y-auto scrollbar-thin">
          {attachments.map((attachment) => {
            const FileIcon = getFileIcon(attachment.file_type);
            const isImage = attachment.file_type.startsWith('image/');

            return (
              <div
                key={attachment.id}
                className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50 group"
              >
                {isImage ? (
                  <img
                    src={getPublicUrl(attachment.file_path)}
                    alt={attachment.file_name}
                    className="w-10 h-10 rounded object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                    <FileIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{attachment.file_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(attachment.file_size)}
                  </p>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => handleDownload(attachment)}
                    className="p-1.5 rounded hover:bg-secondary"
                    title={t('action.download')}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  {!readOnly && (
                    <button
                      type="button"
                      onClick={() => deleteAttachment(attachment)}
                      className="p-1.5 rounded hover:bg-destructive/20 text-destructive"
                      title={t('action.delete')}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
