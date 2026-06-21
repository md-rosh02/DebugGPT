import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Clipboard, Copy } from 'lucide-react';
import { getConceptUrl, normalizeSeverity, severityStyles } from '../utils/helpers.js';

const tabs = ['Explanation', 'Fix', 'Prevention'];

function SkeletonLoader() {
  return (
    <div className="mt-6 animate-fadeSlideUp rounded-xl border border-border bg-surface p-5">
      <div className="space-y-4">
        <div className="h-5 w-36 rounded-lg skeleton-block animate-shimmer" />
        <div className="h-24 rounded-lg skeleton-block animate-shimmer" />
        <div className="h-20 rounded-lg skeleton-block animate-shimmer" />
        <div className="h-12 rounded-lg skeleton-block animate-shimmer" />
      </div>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const value = normalizeSeverity(severity);

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase ${severityStyles(value)}`}>
      {value}
    </span>
  );
}

function CodeBlock({ code, language }) {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current && window.hljs) {
      window.hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code || '');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <span className="truncate text-xs font-bold uppercase tracking-[0.08em] text-secondary">
          {language || 'text'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-semibold text-textPrimary transition hover:border-primary hover:shadow-violet"
        >
          {copied ? (
            <Check className="h-4 w-4 text-success" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="max-h-[420px] overflow-auto p-4 text-sm leading-6">
        <code ref={codeRef} className={`language-${language || 'plaintext'}`}>
          {code || '// No code snippet returned.'}
        </code>
      </pre>
    </div>
  );
}

export default function OutputPanel({ analysis, isLoading }) {
  const [activeTab, setActiveTab] = useState('Explanation');
  const tabIndex = useMemo(() => tabs.indexOf(activeTab), [activeTab]);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (!analysis) {
    return null;
  }

  return (
    <section className="mt-6 animate-fadeSlideUp rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="relative mb-5 grid grid-cols-3 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-2 pb-3 text-sm font-semibold transition sm:text-base ${
              activeTab === tab ? 'text-textPrimary' : 'text-textMuted hover:text-textPrimary'
            }`}
          >
            {tab}
          </button>
        ))}
        <span
          className="absolute bottom-[-1px] h-0.5 rounded-full bg-primary transition-transform duration-300"
          style={{
            width: `${100 / tabs.length}%`,
            transform: `translateX(${tabIndex * 100}%)`,
          }}
        />
      </div>

      {activeTab === 'Explanation' && (
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold">What happened</h2>
            <SeverityBadge severity={analysis.explanation?.severity} />
          </div>
          <p className="leading-7 text-textMuted">{analysis.explanation?.what}</p>
          <div>
            <h3 className="mb-3 text-base font-bold">Why it happened</h3>
            <ul className="space-y-3">
              {(analysis.explanation?.why || []).map((reason) => (
                <li key={reason} className="flex gap-3 text-sm leading-6 text-textMuted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'Fix' && (
        <div className="space-y-5">
          <CodeBlock code={analysis.fix?.code} language={analysis.fix?.language} />
          <div>
            <h2 className="mb-3 text-xl font-bold">Step-by-step fix</h2>
            <ol className="space-y-3">
              {(analysis.fix?.steps || []).map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-6 text-textMuted">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {activeTab === 'Prevention' && (
        <div className="space-y-6">
          <div>
            <h2 className="mb-3 text-xl font-bold">How to avoid this in future</h2>
            <ul className="space-y-3">
              {(analysis.prevention?.tips || []).map((tip) => (
                <li key={tip} className="flex gap-3 text-sm leading-6 text-textMuted">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-base font-bold">
              <Clipboard className="h-4 w-4 text-secondary" aria-hidden="true" />
              Related concepts to learn
            </h3>
            <div className="flex flex-wrap gap-2">
              {(analysis.prevention?.concepts || []).map((concept) => (
                <a
                  key={concept}
                  href={getConceptUrl(concept)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-textPrimary transition hover:border-secondary hover:text-secondary"
                >
                  {concept}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
