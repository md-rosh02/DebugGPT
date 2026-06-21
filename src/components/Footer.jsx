import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-textMuted sm:flex-row">
        <p>Built with Groq API</p>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1 font-medium transition hover:text-textPrimary"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
          <span>Free forever</span>
        </div>
      </div>
    </footer>
  );
}
