export function createAttr(name: string, value: string): Attr {
  const attrEl = document.createAttribute(name);
  attrEl.value = value;

  return attrEl;
}
