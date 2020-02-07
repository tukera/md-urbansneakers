/**
 * Truncate() returns a truncated version of text
 * based on the passed length and ellipsis
 */
export default function Truncate(text, length, ellipsis = '...') {
  if (text.length < length) {
    return text;
  }

  let result;
  for (let i = length - 1; i >= 0; i--) {
    if (text.charAt(i).match(/\s/g)) {
      result = `${text.substring(0, i)} ${ellipsis}`;
      break;
    }
    if (i < 1) {
      result = `${text.substring(0, length)}${ellipsis}`;
      break;
    }
  }

  return result;
}
