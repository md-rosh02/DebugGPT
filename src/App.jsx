import { useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ErrorInput from './components/ErrorInput.jsx';
import OutputPanel from './components/OutputPanel.jsx';
import HistoryPanel from './components/HistoryPanel.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Footer from './components/Footer.jsx';
import useAnalyze from './hooks/useAnalyze.js';
import useHistory from './hooks/useHistory.js';

export default function App() {
  const [errorText, setErrorText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Auto Detect');
  const [analysis, setAnalysis] = useState(null);
  const { history, addHistoryItem, clearHistory } = useHistory();
  const {
    analyze,
    isLoading,
    error,
    validationError,
    rateLimitSeconds,
    clearError,
  } = useAnalyze();

  const handleAnalyze = async () => {
    const result = await analyze(errorText, selectedLanguage);

    if (!result) {
      return;
    }

    setAnalysis(result);
    addHistoryItem({
      errorText,
      language: result.fix?.language || selectedLanguage,
      severity: result.explanation?.severity || 'info',
      analysis: result,
    });
  };

  const handleHistorySelect = (item) => {
    setErrorText(item.errorText);
    setSelectedLanguage(item.language || 'Auto Detect');
    setAnalysis(item.analysis);
    clearError();
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleClearInput = () => {
    setErrorText('');
    setAnalysis(null);
    clearError();
  };

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <Header />
      <main>
        <Hero />
        <section className="mx-auto max-w-[860px] px-4 pb-12 sm:px-6">
          <ErrorInput
            errorText={errorText}
            selectedLanguage={selectedLanguage}
            isLoading={isLoading}
            validationError={validationError}
            onTextChange={setErrorText}
            onLanguageChange={setSelectedLanguage}
            onAnalyze={handleAnalyze}
            onClear={handleClearInput}
          />

          {error && (
            <div className="mt-5 flex flex-col gap-3 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-textPrimary sm:flex-row sm:items-center sm:justify-between">
              <span>
                {rateLimitSeconds > 0
                  ? `Taking a breather... try again in ${rateLimitSeconds}s`
                  : error}
              </span>
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isLoading || rateLimitSeconds > 0}
                className="rounded-lg border border-danger/50 px-4 py-2 font-semibold text-danger transition hover:bg-danger/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Retry
              </button>
            </div>
          )}

          {(isLoading || analysis) && (
            <OutputPanel analysis={analysis} isLoading={isLoading} />
          )}

          <HistoryPanel
            history={history}
            onSelect={handleHistorySelect}
            onClearHistory={clearHistory}
          />
        </section>
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
