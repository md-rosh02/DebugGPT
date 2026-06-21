import { CheckCircle2, ClipboardPaste, Sparkles } from 'lucide-react';

const steps = [
  {
    title: 'Paste Error',
    icon: ClipboardPaste,
    text: 'Drop in a stack trace, runtime error, build log, or console output.',
  },
  {
    title: 'AI Analyzes',
    icon: Sparkles,
    text: 'DebugGPT identifies the likely cause, severity, and surrounding context.',
  },
  {
    title: 'Get the Fix',
    icon: CheckCircle2,
    text: 'Receive corrected code, concrete steps, and habits that prevent repeats.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border bg-background px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold">How it works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="rounded-xl border border-border bg-surface p-5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-lg font-extrabold text-primary">
                    {index + 1}
                  </span>
                  <Icon className="h-6 w-6 text-secondary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-textMuted">{step.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
