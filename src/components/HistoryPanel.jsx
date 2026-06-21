import { Trash2 } from 'lucide-react';
import {
  formatRelativeTime,
  normalizeSeverity,
  severityStyles,
  truncateText,
} from '../utils/helpers.js';

export default function HistoryPanel({ history, onSelect, onClearHistory }) {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">Recent Errors</h2>
          <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-bold text-textMuted">
            {history.length}
          </span>
        </div>
        <button
          type="button"
          onClick={onClearHistory}
          disabled={history.length === 0}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold text-textMuted transition hover:border-danger hover:text-danger disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Clear History</span>
        </button>
      </div>

      {history.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-5 text-sm text-textMuted">
          Your analyzed errors will appear here.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {history.map((item) => {
            const severity = normalizeSeverity(item.severity);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item)}
                className="rounded-xl border border-border bg-surface p-4 text-left transition duration-150 hover:-translate-y-0.5 hover:border-primary hover:shadow-violet"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="truncate rounded-full border border-secondary/40 bg-secondary/10 px-2.5 py-1 text-xs font-bold text-secondary">
                    {item.language || 'Auto'}
                  </span>
                  <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-bold uppercase ${severityStyles(severity)}`}>
                    {severity}
                  </span>
                </div>
                <p className="min-h-[44px] text-sm font-semibold leading-6 text-textPrimary">
                  {truncateText(item.errorText)}
                </p>
                <p className="mt-3 text-xs font-medium text-textMuted">
                  {formatRelativeTime(item.createdAt)}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
