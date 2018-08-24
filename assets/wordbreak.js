export default function addBreaks(str) {
  return str
    .replace(/_/g, '_​')
    .replace(/\//g, '/​')
}
