export function splitChars(el) {
  const text = el.textContent;
  el.textContent = "";
  const spans = [...text].map((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? " " : char;
    span.style.display = "inline-block";
    span.style.willChange = "transform";
    el.appendChild(span);
    return span;
  });
  return spans;
}
