import { create } from 'zustand';

const useStore = create((set, get) => ({
  // Navigation
  currentScreen: 'home',
  setScreen: (screen) => {
    // Cancel any ongoing speech when changing screens
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    set({ currentScreen: screen });
  },

  // Gamification
  totalStars: 0,
  addStars: (count) => {
    set((state) => ({ totalStars: state.totalStars + count }));
    get().checkBadges();
    get().persist();
  },

  // Progress Tracking
  mathCorrect: 0,
  hindiCorrect: 0,
  spellingCorrect: 0,
  evsCorrect: 0,
  storiesRead: 0,
  artDrawn: 0,

  incrementMath: () => {
    set((state) => ({ mathCorrect: state.mathCorrect + 1 }));
    get().checkBadges();
    get().persist();
  },
  incrementHindi: () => {
    set((state) => ({ hindiCorrect: state.hindiCorrect + 1 }));
    get().checkBadges();
    get().persist();
  },
  incrementSpelling: () => {
    set((state) => ({ spellingCorrect: state.spellingCorrect + 1 }));
    get().checkBadges();
    get().persist();
  },
  incrementEVS: () => {
    set((state) => ({ evsCorrect: state.evsCorrect + 1 }));
    get().checkBadges();
    get().persist();
  },
  incrementStories: () => {
    set((state) => ({ storiesRead: state.storiesRead + 1 }));
    get().checkBadges();
    get().persist();
  },
  incrementArt: () => {
    set((state) => ({ artDrawn: state.artDrawn + 1 }));
    get().checkBadges();
    get().persist();
  },

  // Badges
  badges: [],
  unlockedBadges: [],
  unlockBadge: (badgeId) => {
    set((state) => {
      if (!state.unlockedBadges.includes(badgeId)) {
        return { unlockedBadges: [...state.unlockedBadges, badgeId] };
      }
      return state;
    });
    get().persist();
  },
  checkBadges: () => {
    const state = get();
    const badges = [
      { id: 'first-star', condition: state.totalStars >= 1 },
      { id: 'star-collector', condition: state.totalStars >= 10 },
      { id: 'math-whiz', condition: state.mathCorrect >= 5 },
      { id: 'hindi-hero', condition: state.hindiCorrect >= 5 },
      { id: 'bookworm', condition: state.storiesRead >= 3 },
      { id: 'story-reader', condition: state.storiesRead >= 1 },
      { id: 'art-star', condition: state.artDrawn >= 1 },
      { id: 'explorer', condition: state.evsCorrect >= 3 },
      { id: 'spelling-bee', condition: state.spellingCorrect >= 3 },
      { id: 'all-rounder', condition: state.totalStars >= 20 },
    ];

    badges.forEach((badge) => {
      if (badge.condition && !state.unlockedBadges.includes(badge.id)) {
        get().unlockBadge(badge.id);
        // Show badge unlock modal (will be implemented in UI)
        set({ lastUnlockedBadge: badge.id });
      }
    });
  },
  lastUnlockedBadge: null,
  clearLastUnlockedBadge: () => set({ lastUnlockedBadge: null }),

  // Activity Log (for parent dashboard)
  activityLog: [],
  logActivity: (activity) => {
    set((state) => ({
      activityLog: [
        ...state.activityLog,
        {
          ...activity,
          timestamp: Date.now(),
        },
      ],
    }));
    get().persist();
  },

  // Settings
  soundEnabled: true,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

  // Persistence
  hydrate: () => {
    try {
      const saved = localStorage.getItem('littlelearners-data');
      if (saved) {
        const data = JSON.parse(saved);
        set({
          totalStars: data.totalStars || 0,
          mathCorrect: data.mathCorrect || 0,
          hindiCorrect: data.hindiCorrect || 0,
          spellingCorrect: data.spellingCorrect || 0,
          evsCorrect: data.evsCorrect || 0,
          storiesRead: data.storiesRead || 0,
          artDrawn: data.artDrawn || 0,
          unlockedBadges: data.unlockedBadges || [],
          activityLog: data.activityLog || [],
          soundEnabled: data.soundEnabled !== undefined ? data.soundEnabled : true,
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  },
  persist: () => {
    try {
      const state = get();
      const dataToSave = {
        totalStars: state.totalStars,
        mathCorrect: state.mathCorrect,
        hindiCorrect: state.hindiCorrect,
        spellingCorrect: state.spellingCorrect,
        evsCorrect: state.evsCorrect,
        storiesRead: state.storiesRead,
        artDrawn: state.artDrawn,
        unlockedBadges: state.unlockedBadges,
        activityLog: state.activityLog.slice(-100), // Keep only last 100 activities
        soundEnabled: state.soundEnabled,
      };
      localStorage.setItem('littlelearners-data', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  },
  resetProgress: () => {
    set({
      totalStars: 0,
      mathCorrect: 0,
      hindiCorrect: 0,
      spellingCorrect: 0,
      evsCorrect: 0,
      storiesRead: 0,
      artDrawn: 0,
      unlockedBadges: [],
      activityLog: [],
      currentScreen: 'home',
    });
    localStorage.removeItem('littlelearners-data');
  },
}));

export default useStore;
