export const languages = [
  'Auto Detect',
  'JavaScript',
  'Python',
  'Java',
  'Go',
  'Rust',
  'C++',
  'PHP',
  'Ruby',
  'TypeScript',
  'Kotlin',
  'Swift',
];

export function truncateText(text, length = 96) {
  if (!text) {
    return '';
  }

  const firstLine = text.trim().split('\n').find(Boolean) || text.trim();
  return firstLine.length > length ? `${firstLine.slice(0, length - 1)}...` : firstLine;
}

export function formatRelativeTime(timestamp) {
  const seconds = Math.max(1, Math.floor((Date.now() - timestamp) / 1000));

  if (seconds < 60) {
    return 'just now';
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

export function normalizeSeverity(severity) {
  const value = String(severity || 'info').toLowerCase();
  return ['critical', 'warning', 'info'].includes(value) ? value : 'info';
}

export function severityStyles(severity) {
  const value = normalizeSeverity(severity);

  if (value === 'critical') {
    return 'border-danger/40 bg-danger/10 text-danger';
  }

  if (value === 'warning') {
    return 'border-secondary/40 bg-secondary/10 text-secondary';
  }

  return 'border-success/40 bg-success/10 text-success';
}

export function getConceptUrl(concept) {
  const query = encodeURIComponent(`${concept} programming documentation`);
  return `https://www.google.com/search?q=${query}`;
}
