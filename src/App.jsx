import { useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import useStore from './store/useStore';
import { initAudio } from './utils/audioUtils';

// Components - Eagerly loaded (needed immediately)
import Header from './components/common/Header';
import HomeScreen from './components/home/HomeScreen';
import LoadingSpinner from './components/common/LoadingSpinner';
import InstallPWA from './components/common/InstallPWA';

// Lazy load all modules for code splitting
const HindiModule = lazy(() => import('./components/modules/hindi/HindiModule'));
const EnglishModule = lazy(() => import('./components/modules/english/EnglishModule'));
const MathsModule = lazy(() => import('./components/modules/maths/MathsModule'));
const EVSModule = lazy(() => import('./components/modules/evs/EVSModule'));
const ArtModule = lazy(() => import('./components/modules/art/ArtModule'));
const BrainGamesModule = lazy(() => import('./components/modules/brainGames/BrainGamesModule'));
const RhymeTimeModule = lazy(() => import('./components/modules/rhymeTime/RhymeTimeModule'));
const SpellingBeeModule = lazy(() => import('./components/modules/spellingBee/SpellingBeeModule'));
const OppositesModule = lazy(() => import('./components/modules/opposites/OppositesModule'));
const ClockTimeModule = lazy(() => import('./components/modules/clockTime/ClockTimeModule'));
const OddOneOutModule = lazy(() => import('./components/modules/oddOneOut/OddOneOutModule'));
const MiniPianoModule = lazy(() => import('./components/modules/miniPiano/MiniPianoModule'));
const StoryBuilderModule = lazy(() => import('./components/modules/storyBuilder/StoryBuilderModule'));
const BodyExplorerModule = lazy(() => import('./components/modules/bodyExplorer/BodyExplorerModule'));
const WorldFlagsModule = lazy(() => import('./components/modules/worldFlags/WorldFlagsModule'));
const MoneyMathModule = lazy(() => import('./components/modules/moneyMath/MoneyMathModule'));
const ShadowMatchModule = lazy(() => import('./components/modules/shadowMatch/ShadowMatchModule'));
const WeatherStationModule = lazy(() => import('./components/modules/weatherStation/WeatherStationModule'));
const PlantLifeCycleModule = lazy(() => import('./components/modules/plantLifeCycle/PlantLifeCycleModule'));
const ContinentsExplorerModule = lazy(() => import('./components/modules/continentsExplorer/ContinentsExplorerModule'));
const MysteryLettersModule = lazy(() => import('./components/modules/mysteryLetters/MysteryLettersModule'));
const EmotionMirrorModule = lazy(() => import('./components/modules/emotionMirror/EmotionMirrorModule'));
const FoodGroupsModule = lazy(() => import('./components/modules/foodGroups/FoodGroupsModule'));
const ThenAndNowModule = lazy(() => import('./components/modules/thenAndNow/ThenAndNowModule'));
const CalendarSeasonsModule = lazy(() => import('./components/modules/calendarSeasons/CalendarSeasonsModule'));
const ParentDashboard = lazy(() => import('./components/dashboard/ParentDashboard'));

function App() {
  const currentScreen = useStore((state) => state.currentScreen);
  const hydrate = useStore((state) => state.hydrate);

  // Load saved data on mount
  useEffect(() => {
    hydrate();
    
    // Initialize audio context on first user interaction
    const handleFirstInteraction = () => {
      initAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hydrate]);

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen key="home" />;
      
      case 'hindi':
        return <HindiModule key="hindi" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'english':
        return <EnglishModule key="english" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'maths':
        return <MathsModule key="maths" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'evs':
        return <EVSModule key="evs" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'art':
        return <ArtModule key="art" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'brainGames':
        return <BrainGamesModule key="brainGames" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'rhymeTime':
        return <RhymeTimeModule key="rhymeTime" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'spellingBee':
        return <SpellingBeeModule key="spellingBee" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'opposites':
        return <OppositesModule key="opposites" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'clockTime':
        return <ClockTimeModule key="clockTime" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'oddOneOut':
        return <OddOneOutModule key="oddOneOut" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'miniPiano':
        return <MiniPianoModule key="miniPiano" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'storyBuilder':
        return <StoryBuilderModule key="storyBuilder" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'bodyExplorer':
        return <BodyExplorerModule key="bodyExplorer" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'worldFlags':
        return <WorldFlagsModule key="worldFlags" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'moneyMath':
        return <MoneyMathModule key="moneyMath" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'shadowMatch':
        return <ShadowMatchModule key="shadowMatch" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'weatherStation':
        return <WeatherStationModule key="weatherStation" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'plantLifeCycle':
        return <PlantLifeCycleModule key="plantLifeCycle" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'continentsExplorer':
        return <ContinentsExplorerModule key="continentsExplorer" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'mysteryLetters':
        return <MysteryLettersModule key="mysteryLetters" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'emotionMirror':
        return <EmotionMirrorModule key="emotionMirror" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'foodGroups':
        return <FoodGroupsModule key="foodGroups" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'thenAndNow':
        return <ThenAndNowModule key="thenAndNow" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'calendarSeasons':
        return <CalendarSeasonsModule key="calendarSeasons" onBack={() => useStore.getState().setScreen('home')} />;
      
      case 'dashboard':
        return <ParentDashboard key="dashboard" onBack={() => useStore.getState().setScreen('home')} />;
      
      // Other module screens will be added here
      // ... other cases
      
      default:
        return <HomeScreen key="home" />;
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      
      <main className="pb-8">
        <Suspense fallback={<LoadingSpinner message="Loading module..." />}>
          <AnimatePresence mode="wait">
            {renderScreen()}
          </AnimatePresence>
        </Suspense>
      </main>

      {/* PWA Install Prompt */}
      <InstallPWA />
    </div>
  );
}

export default App;
