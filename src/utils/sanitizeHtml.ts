/**
 * Sanitiza CSS para prevenir CSS injection.
 * Versão leve sem dependência de DOMPurify.
 */
export const sanitizeCss = (css: string): string => {
  if (!css || typeof css !== 'string') {
    return '';
  }

  let sanitized = css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/@import[^;]*;?/gi, '')
    .replace(/@charset[^;]*;?/gi, '')
    .replace(/expression\s*\(/gi, '')
    .replace(/-moz-binding/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:\s*text\/html/gi, '');

  return sanitized;
};
