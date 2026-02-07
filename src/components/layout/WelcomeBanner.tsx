import { motion } from 'framer-motion';
import { Sparkles, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface WelcomeBannerProps {
  onLogin: () => void;
}

export const WelcomeBanner = ({ onLogin }: WelcomeBannerProps) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-6 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 
        border border-primary/20 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent 
          flex items-center justify-center shadow-lg glow">
          <Sparkles className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-foreground mb-1">
            {t('message.welcome')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t('message.login_required')}
          </p>
        </div>
        <Button onClick={onLogin} className="gap-2">
          <LogIn className="w-4 h-4" />
          {t('action.login')}
        </Button>
      </div>
    </motion.div>
  );
};
