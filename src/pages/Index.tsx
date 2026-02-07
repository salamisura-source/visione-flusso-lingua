import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { WelcomeBanner } from '@/components/layout/WelcomeBanner';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';
import { ChatBot } from '@/components/chat/ChatBot';
import { AuthDialog } from '@/components/layout/AuthDialog';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user, loading } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-glow w-16 h-16 rounded-full bg-primary/20" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="py-6">
        {!user && (
          <WelcomeBanner onLogin={() => setAuthDialogOpen(true)} />
        )}
        
        <KanbanBoard />
      </main>

      <ChatBot />

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </div>
  );
};

export default Index;
