export type Language = 'it' | 'en' | 'es' | 'de' | 'fr';

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export const translations: Record<Language, Record<string, string>> = {
  it: {
    // App
    'app.title': 'Kanban Board',
    'app.subtitle': 'Gestisci i tuoi progetti',
    
    // Columns
    'status.not_started': 'Non iniziato',
    'status.ready': 'Pronto',
    'status.in_progress': 'In corso',
    'status.blocked': 'Bloccato',
    'status.done': 'Fatto',
    'status.cancelled': 'Annullato',
    
    // Priority
    'priority.low': 'Bassa',
    'priority.medium': 'Media',
    'priority.high': 'Alta',
    
    // Actions
    'action.add_task': 'Aggiungi task',
    'action.save': 'Salva',
    'action.cancel': 'Annulla',
    'action.delete': 'Elimina',
    'action.edit': 'Modifica',
    'action.login': 'Accedi',
    'action.logout': 'Esci',
    'action.register': 'Registrati',
    'action.search': 'Cerca per titolo...',
    'action.add_file': 'Aggiungi file',
    'action.download': 'Scarica',
    
    // Filters
    'filter.all_priorities': 'Tutte le priorità',
    
    // Forms
    'form.title': 'Titolo',
    'form.description': 'Descrizione',
    'form.priority': 'Priorità',
    'form.due_date': 'Scadenza',
    'form.status': 'Stato',
    'form.email': 'Email',
    'form.password': 'Password',
    'form.attachments': 'Allegati',
    
    // Messages
    'message.no_tasks': 'Nessun task',
    'message.drag_hint': 'Trascina per spostare',
    'message.saved': 'Salvato con successo',
    'message.deleted': 'Eliminato con successo',
    'message.error': 'Si è verificato un errore',
    'message.login_required': 'Accedi per salvare i tuoi task',
    'message.welcome': 'Benvenuto!',
    'message.no_attachments': 'Nessun allegato',
    
    // Chat
    'chat.title': 'Assistente AI',
    'chat.placeholder': 'Scrivi un messaggio...',
    'chat.send': 'Invia',
    'chat.thinking': 'Sto pensando...',
    'chat.welcome': 'Ciao! Sono il tuo assistente AI. Come posso aiutarti oggi?',
    
    // Auth
    'auth.login_title': 'Accedi',
    'auth.register_title': 'Crea account',
    'auth.no_account': 'Non hai un account?',
    'auth.have_account': 'Hai già un account?',
    'auth.check_email': 'Controlla la tua email per confermare la registrazione',
  },
  en: {
    // App
    'app.title': 'Kanban Board',
    'app.subtitle': 'Manage your projects',
    
    // Columns
    'status.not_started': 'Not Started',
    'status.ready': 'Ready',
    'status.in_progress': 'In Progress',
    'status.blocked': 'Blocked',
    'status.done': 'Done',
    'status.cancelled': 'Cancelled',
    
    // Priority
    'priority.low': 'Low',
    'priority.medium': 'Medium',
    'priority.high': 'High',
    
    // Actions
    'action.add_task': 'Add task',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.delete': 'Delete',
    'action.edit': 'Edit',
    'action.login': 'Login',
    'action.logout': 'Logout',
    'action.register': 'Register',
    'action.search': 'Search by title...',
    'action.add_file': 'Add file',
    'action.download': 'Download',
    
    // Filters
    'filter.all_priorities': 'All priorities',
    
    // Forms
    'form.title': 'Title',
    'form.description': 'Description',
    'form.priority': 'Priority',
    'form.due_date': 'Due Date',
    'form.status': 'Status',
    'form.email': 'Email',
    'form.password': 'Password',
    'form.attachments': 'Attachments',
    
    // Messages
    'message.no_tasks': 'No tasks',
    'message.drag_hint': 'Drag to move',
    'message.saved': 'Saved successfully',
    'message.deleted': 'Deleted successfully',
    'message.error': 'An error occurred',
    'message.login_required': 'Login to save your tasks',
    'message.welcome': 'Welcome!',
    'message.no_attachments': 'No attachments',
    
    // Chat
    'chat.title': 'AI Assistant',
    'chat.placeholder': 'Type a message...',
    'chat.send': 'Send',
    'chat.thinking': 'Thinking...',
    'chat.welcome': 'Hello! I\'m your AI assistant. How can I help you today?',
    
    // Auth
    'auth.login_title': 'Login',
    'auth.register_title': 'Create Account',
    'auth.no_account': 'Don\'t have an account?',
    'auth.have_account': 'Already have an account?',
    'auth.check_email': 'Check your email to confirm registration',
  },
  es: {
    // App
    'app.title': 'Tablero Kanban',
    'app.subtitle': 'Gestiona tus proyectos',
    
    // Columns
    'status.not_started': 'No iniciado',
    'status.ready': 'Listo',
    'status.in_progress': 'En progreso',
    'status.blocked': 'Bloqueado',
    'status.done': 'Hecho',
    'status.cancelled': 'Cancelado',
    
    // Priority
    'priority.low': 'Baja',
    'priority.medium': 'Media',
    'priority.high': 'Alta',
    
    // Actions
    'action.add_task': 'Añadir tarea',
    'action.save': 'Guardar',
    'action.cancel': 'Cancelar',
    'action.delete': 'Eliminar',
    'action.edit': 'Editar',
    'action.login': 'Iniciar sesión',
    'action.logout': 'Cerrar sesión',
    'action.register': 'Registrarse',
    'action.search': 'Buscar por título...',
    'action.add_file': 'Añadir archivo',
    'action.download': 'Descargar',
    
    // Filters
    'filter.all_priorities': 'Todas las prioridades',
    
    // Forms
    'form.title': 'Título',
    'form.description': 'Descripción',
    'form.priority': 'Prioridad',
    'form.due_date': 'Fecha límite',
    'form.status': 'Estado',
    'form.email': 'Correo electrónico',
    'form.password': 'Contraseña',
    'form.attachments': 'Adjuntos',
    
    // Messages
    'message.no_tasks': 'Sin tareas',
    'message.drag_hint': 'Arrastra para mover',
    'message.saved': 'Guardado con éxito',
    'message.deleted': 'Eliminado con éxito',
    'message.error': 'Ocurrió un error',
    'message.login_required': 'Inicia sesión para guardar tus tareas',
    'message.welcome': '¡Bienvenido!',
    'message.no_attachments': 'Sin adjuntos',
    
    // Chat
    'chat.title': 'Asistente IA',
    'chat.placeholder': 'Escribe un mensaje...',
    'chat.send': 'Enviar',
    'chat.thinking': 'Pensando...',
    'chat.welcome': '¡Hola! Soy tu asistente IA. ¿Cómo puedo ayudarte hoy?',
    
    // Auth
    'auth.login_title': 'Iniciar sesión',
    'auth.register_title': 'Crear cuenta',
    'auth.no_account': '¿No tienes cuenta?',
    'auth.have_account': '¿Ya tienes cuenta?',
    'auth.check_email': 'Revisa tu correo para confirmar el registro',
  },
  de: {
    // App
    'app.title': 'Kanban-Board',
    'app.subtitle': 'Verwalte deine Projekte',
    
    // Columns
    'status.not_started': 'Nicht gestartet',
    'status.ready': 'Bereit',
    'status.in_progress': 'In Bearbeitung',
    'status.blocked': 'Blockiert',
    'status.done': 'Erledigt',
    'status.cancelled': 'Abgebrochen',
    
    // Priority
    'priority.low': 'Niedrig',
    'priority.medium': 'Mittel',
    'priority.high': 'Hoch',
    
    // Actions
    'action.add_task': 'Aufgabe hinzufügen',
    'action.save': 'Speichern',
    'action.cancel': 'Abbrechen',
    'action.delete': 'Löschen',
    'action.edit': 'Bearbeiten',
    'action.login': 'Anmelden',
    'action.logout': 'Abmelden',
    'action.register': 'Registrieren',
    'action.search': 'Nach Titel suchen...',
    'action.add_file': 'Datei hinzufügen',
    'action.download': 'Herunterladen',
    
    // Filters
    'filter.all_priorities': 'Alle Prioritäten',
    
    // Forms
    'form.title': 'Titel',
    'form.description': 'Beschreibung',
    'form.priority': 'Priorität',
    'form.due_date': 'Fälligkeitsdatum',
    'form.status': 'Status',
    'form.email': 'E-Mail',
    'form.password': 'Passwort',
    'form.attachments': 'Anhänge',
    
    // Messages
    'message.no_tasks': 'Keine Aufgaben',
    'message.drag_hint': 'Ziehen zum Verschieben',
    'message.saved': 'Erfolgreich gespeichert',
    'message.deleted': 'Erfolgreich gelöscht',
    'message.error': 'Ein Fehler ist aufgetreten',
    'message.login_required': 'Melden Sie sich an, um Ihre Aufgaben zu speichern',
    'message.welcome': 'Willkommen!',
    'message.no_attachments': 'Keine Anhänge',
    
    // Chat
    'chat.title': 'KI-Assistent',
    'chat.placeholder': 'Nachricht schreiben...',
    'chat.send': 'Senden',
    'chat.thinking': 'Denke nach...',
    'chat.welcome': 'Hallo! Ich bin dein KI-Assistent. Wie kann ich dir heute helfen?',
    
    // Auth
    'auth.login_title': 'Anmelden',
    'auth.register_title': 'Konto erstellen',
    'auth.no_account': 'Kein Konto?',
    'auth.have_account': 'Bereits ein Konto?',
    'auth.check_email': 'Überprüfen Sie Ihre E-Mail zur Bestätigung',
  },
  fr: {
    // App
    'app.title': 'Tableau Kanban',
    'app.subtitle': 'Gérez vos projets',
    
    // Columns
    'status.not_started': 'Non commencé',
    'status.ready': 'Prêt',
    'status.in_progress': 'En cours',
    'status.blocked': 'Bloqué',
    'status.done': 'Terminé',
    'status.cancelled': 'Annulé',
    
    // Priority
    'priority.low': 'Basse',
    'priority.medium': 'Moyenne',
    'priority.high': 'Haute',
    
    // Actions
    'action.add_task': 'Ajouter une tâche',
    'action.save': 'Enregistrer',
    'action.cancel': 'Annuler',
    'action.delete': 'Supprimer',
    'action.edit': 'Modifier',
    'action.login': 'Connexion',
    'action.logout': 'Déconnexion',
    'action.register': 'S\'inscrire',
    'action.search': 'Rechercher par titre...',
    'action.add_file': 'Ajouter un fichier',
    'action.download': 'Télécharger',
    
    // Filters
    'filter.all_priorities': 'Toutes les priorités',
    
    // Forms
    'form.title': 'Titre',
    'form.description': 'Description',
    'form.priority': 'Priorité',
    'form.due_date': 'Date d\'échéance',
    'form.status': 'Statut',
    'form.email': 'E-mail',
    'form.password': 'Mot de passe',
    'form.attachments': 'Pièces jointes',
    
    // Messages
    'message.no_tasks': 'Aucune tâche',
    'message.drag_hint': 'Glisser pour déplacer',
    'message.saved': 'Enregistré avec succès',
    'message.deleted': 'Supprimé avec succès',
    'message.error': 'Une erreur est survenue',
    'message.login_required': 'Connectez-vous pour sauvegarder vos tâches',
    'message.welcome': 'Bienvenue !',
    'message.no_attachments': 'Aucune pièce jointe',
    
    // Chat
    'chat.title': 'Assistant IA',
    'chat.placeholder': 'Écrivez un message...',
    'chat.send': 'Envoyer',
    'chat.thinking': 'Je réfléchis...',
    'chat.welcome': 'Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd\'hui ?',
    
    // Auth
    'auth.login_title': 'Connexion',
    'auth.register_title': 'Créer un compte',
    'auth.no_account': 'Pas de compte ?',
    'auth.have_account': 'Déjà un compte ?',
    'auth.check_email': 'Vérifiez votre e-mail pour confirmer l\'inscription',
  },
};

export const getTranslation = (lang: Language, key: string): string => {
  return translations[lang][key] || key;
};
