import { Loader2, X } from 'lucide-react';
import { languages } from '../utils/helpers.js';

export default function ErrorInput({
  errorText,
  selectedLanguage,
  isLoading,
  validationError,
  onTextChange,
  onLanguageChange,
  onAnalyze,
  onClear,
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3 shadow-sm transition sm:p-4">
      <div className="mb-3 flex flex-col gap-3 border-b border-border pb-3 sm:flex-row sm:items-center sm:justify-between">
        <select
          value={selectedLanguage}
          disabled={isLoading}
          onChange={(event) => onLanguageChange(event.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-textPrimary outline-none transition focus:border-primary focus:shadow-violet disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          aria-label="Language selector"
        >
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>

        <div className="flex items-center justify-between gap-3 text-sm text-textMuted sm:justify-end">
          <span>{errorText.length.toLocaleString()} chars</span>
          <button
            type="button"
            onClick={onClear}
            disabled={isLoading || !errorText}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-textMuted transition hover:border-danger hover:text-danger disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Clear error input"
            title="Clear"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <textarea
        value={errorText}
        disabled={isLoading}
        onChange={(event) => onTextChange(event.target.value)}
        placeholder="Paste your error, stack trace, or console log here..."
        className="min-h-[220px] w-full resize-y rounded-lg border border-border bg-background p-4 font-mono text-sm leading-6 text-textPrimary outline-none transition duration-200 placeholder:text-textMuted focus:border-primary focus:shadow-violet disabled:cursor-not-allowed disabled:opacity-70"
        aria-label="Error text"
      />

      {validationError && (
        <p className="mt-3 text-sm font-medium text-danger">{validationError}</p>
      )}

      <button
        type="button"
        onClick={onAnalyze}
        disabled={isLoading}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white shadow-violet transition duration-200 hover:shadow-violet active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {isLoading ? 'Analyzing...' : 'Analyze Error'}
      </button>
    </div>
  );
}
