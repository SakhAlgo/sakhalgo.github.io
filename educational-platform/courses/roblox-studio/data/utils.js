// ============ УТИЛИТЫ ============

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>]/g, function (m) {
    if (m === "&") return "&";
    if (m === "<") return "<";
    if (m === ">") return ">";
    return m;
  });
}

function escapeHtmlPreserveSpaces(str) {
  if (!str) return "";
  return escapeHtml(str);
}
