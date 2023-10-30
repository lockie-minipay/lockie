// Encode function
function encodeText(text: string) {
  const texts = text.split(",");
  const timestamp = Date.now();
  return texts.join("#") + "#" + timestamp;
}

// Decode function
function decodeText(encodedText: string) {
  return encodedText.split("#").slice(0, -1);
}

export { encodeText, decodeText };
