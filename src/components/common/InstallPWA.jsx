import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { isStandalone } from '../../utils/serviceWorkerRegistration';

/**
 * PWA Install Prompt Component
 * Shows a banner prompting users to install the app as a PWA
 * Automatically hides if app is already installed or user dismisses
 */
function InstallPWA() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Don't show if already installed
    if (isStandalone()) {
      return;
    }

    // Check if user has dismissed before
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show prompt after 3 seconds delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond
    await deferredPrompt.userChoice;

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-200 p-4">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">⭐</span>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  Install Little Learners
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Get instant access and use offline! Install the app on your device.
                </p>

                <button
                  onClick={handleInstall}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Install App
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-3 gap-2 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <span>⚡</span>
                <span>Fast</span>
              </div>
              <div className="flex items-center gap-1">
                <span>📱</span>
                <span>Offline</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🔒</span>
                <span>Secure</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InstallPWA;
