const API_ORIGIN =
  import.meta.env.VITE_SERVER_URL ||
  (import.meta.env.VITE_API_BASE || 'http://localhost:5002/api').replace(/\/api\/?$/, '');

export function resolveImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/uploads')) return `${API_ORIGIN}${path}`;
  return path;
}
