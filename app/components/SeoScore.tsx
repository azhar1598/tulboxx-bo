import React from "react";

interface SeoScoreProps {
  html: string;
  focusKeywords: string[];
  title: string;
}

function getTextContent(html: string) {
  if (typeof window !== "undefined") {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || "";
  } else {
    // SSR fallback
    return html.replace(/<[^>]+>/g, "");
  }
}

export default function SeoScore({
  html,
  focusKeywords,
  title,
}: SeoScoreProps) {
  // Parse HTML
  const parser = typeof window !== "undefined" ? new window.DOMParser() : null;
  const doc = parser ? parser.parseFromString(html, "text/html") : null;

  // Checks
  const wordCount = getTextContent(html)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const headings = doc ? doc.querySelectorAll("h1, h2, h3").length : 0;
  const images = doc ? doc.querySelectorAll("img").length : 0;
  const links = doc ? doc.querySelectorAll("a").length : 0;
  const keywordInTitle =
    focusKeywords.length > 0 &&
    focusKeywords.some((kw) => title.toLowerCase().includes(kw.toLowerCase()));
  const keywordInContent =
    focusKeywords.length > 0 &&
    focusKeywords.some((kw) =>
      getTextContent(html).toLowerCase().includes(kw.toLowerCase())
    );

  // Score calculation (simple)
  let score = 0;
  if (wordCount >= 600) score += 20;
  if (headings >= 2) score += 15;
  if (images >= 1) score += 15;
  if (links >= 1) score += 10;
  if (keywordInTitle) score += 20;
  if (keywordInContent) score += 20;
  if (focusKeywords.length > 2) score -= 10;

  let color = "#ef4444"; // red-500
  if (score >= 80) color = "#22c55e"; // green-500
  else if (score >= 50) color = "#f59e42"; // orange-400

  // Suggestions
  const suggestions = [];
  if (wordCount < 600) suggestions.push("Increase word count (min 600). ✍️");
  if (headings < 2) suggestions.push("Add more headings (H1, H2, H3). 🏷️");
  if (images < 1) suggestions.push("Add at least one image. 🖼️");
  if (links < 1) suggestions.push("Add at least one link. 🔗");
  if (focusKeywords.length === 0) {
    suggestions.push("Add at least one focus keyword for SEO analysis. 🗝️");
  } else {
    if (!keywordInTitle)
      suggestions.push(
        "Include at least one focus keyword in the title (H1). 🗝️"
      );
    if (!keywordInContent)
      suggestions.push("Include at least one focus keyword in the content. 🗝️");
    if (focusKeywords.length > 2)
      suggestions.push(
        "Too many focus keywords can harm SEO. Try to focus on 1–2 main keywords."
      );
  }

  return (
    <div className="rounded-2xl p-6 mt-8 bg-white shadow-xl border border-gray-100 max-w-2xl mx-auto transition-all">
      <div className="flex items-center gap-4 mb-4">
        <span className="font-bold text-lg">SEO Score</span>
        <span
          className="rounded-full px-3 py-1 text-white font-semibold text-base shadow"
          style={{ background: color, transition: "background 0.3s" }}
        >
          {score}
        </span>
        <span className="text-sm text-gray-400">/ 100</span>
        <div className="flex-1 ml-4">
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 rounded-full transition-all"
              style={{ width: `${score}%`, background: color }}
            />
          </div>
        </div>
      </div>
      <ul className="list-disc ml-8 text-base text-gray-700 space-y-1">
        {suggestions.length === 0 ? (
          <li className="text-green-600 font-medium">
            🎉 Great job! Your post is well-optimized.
          </li>
        ) : (
          suggestions.map((s, i) => <li key={i}>{s}</li>)
        )}
      </ul>
      <div className="mt-4 text-xs text-gray-400 flex gap-4 flex-wrap">
        <span>
          Word count: <b>{wordCount}</b>
        </span>
        <span>
          Headings: <b>{headings}</b>
        </span>
        <span>
          Images: <b>{images}</b>
        </span>
        <span>
          Links: <b>{links}</b>
        </span>
        <span>
          Focus keywords: <b>{focusKeywords.length}</b>
        </span>
      </div>
    </div>
  );
}
