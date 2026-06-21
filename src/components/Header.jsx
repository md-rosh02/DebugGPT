import { Github, Star } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a href="/" className="flex min-w-0 items-center gap-3" aria-label="DebugGPT home">
          <span className="h-6 w-6 shrink-0 rounded-md bg-primary shadow-violet" />
          <span className="truncate text-lg font-bold text-textPrimary">DebugGPT</span>
          <span className="rounded-full border border-secondary/40 bg-secondary/10 px-2 py-0.5 text-xs font-semibold uppercase text-secondary">
            beta
          </span>
        </a>

        <nav className="flex items-center gap-2 sm:gap-4">
          <a
            href="#how-it-works"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-textMuted transition hover:text-textPrimary sm:inline-flex"
          >
            How it works
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-semibold text-textPrimary transition hover:border-primary hover:shadow-violet"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            <Star className="hidden h-4 w-4 sm:block" aria-hidden="true" />
            <span>Star</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
