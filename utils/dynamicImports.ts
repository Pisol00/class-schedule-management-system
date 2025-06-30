import { lazy } from 'react';

// Lazy load heavy components
export const LazyHelpModal = lazy(() => 
  import('@/components/auth/modals/HelpModal').then(module => ({
    default: module.default
  }))
);

export const LazyPrivacyModal = lazy(() => 
  import('@/components/auth/modals/PrivacyModal').then(module => ({
    default: module.default
  }))
);