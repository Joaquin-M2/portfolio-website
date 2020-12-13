export default function decodeHTMLEntities(textWithHTMLEntities) {
  const txt = document.createElement('textarea');
  txt.innerHTML = textWithHTMLEntities;
  return txt.value;
}
