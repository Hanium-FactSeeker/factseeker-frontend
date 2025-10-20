export function ageMapping(range?: string): string {
  if (!range) return '';
  const normalized = range.replace('~', '-');
  const start = parseInt(normalized.split('-')[0], 10);
  if (isNaN(start)) return '';

  if (start >= 10 && start < 20) return '10';
  if (start >= 20 && start < 30) return '20';
  if (start >= 30 && start < 40) return '30';
  if (start >= 40 && start < 50) return '40';
  if (start >= 50 && start < 60) return '50';
  if (start >= 60) return '60+';
  return '';
}
