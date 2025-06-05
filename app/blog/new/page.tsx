"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/app/components/RichTextEditor";
import SeoScore from "@/app/components/SeoScore";

export default function NewPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [focusKeywords, setFocusKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const keywordInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we'll just log the post data
    console.log({ title, content });
    // In a real app, we would save this to a database
    router.push("/");
  };

  const addKeyword = (kw: string) => {
    const trimmed = kw.trim();
    if (trimmed && !focusKeywords.includes(trimmed)) {
      setFocusKeywords([...focusKeywords, trimmed]);
    }
    setKeywordInput("");
  };

  const removeKeyword = (kw: string) => {
    setFocusKeywords(focusKeywords.filter((k) => k !== kw));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        {/* Main Editor Column */}
        <div className="flex-1 min-w-0 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl sm:text-5xl font-extrabold bg-transparent border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 px-0 py-4 mb-2 placeholder-gray-400 transition"
              required
              placeholder="Add title"
              autoFocus
              style={{ outline: "none", boxShadow: "none" }}
            />

            <div className="flex flex-col gap-2">
              <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-0 sm:p-0 transition">
                <RichTextEditor content={content} onChange={setContent} />
              </div>
            </div>

            <div className="flex gap-4 justify-end mt-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-lg font-semibold text-base shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Publish
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-gray-200 hover:bg-gray-300 transition text-gray-800 px-8 py-3 rounded-lg font-semibold text-base shadow-md focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        {/* SEO Score Column */}
        <div className="w-full md:w-80 flex-shrink-0 md:sticky md:top-10 flex flex-col gap-4">
          {/* Focus Keywords Section */}
          <div className="flex flex-col gap-1 mb-2">
            <label className="text-base font-medium text-gray-700 mb-1">
              Focus Keywords (for SEO)
            </label>
            <div className="flex flex-wrap gap-2 mb-1">
              {focusKeywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-medium"
                >
                  {kw}
                  <button
                    type="button"
                    className="ml-2 text-blue-400 hover:text-blue-700"
                    onClick={() => removeKeyword(kw)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                ref={keywordInputRef}
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    (e.key === "Enter" || e.key === ",") &&
                    keywordInput.trim()
                  ) {
                    e.preventDefault();
                    addKeyword(keywordInput);
                  }
                }}
                className="flex-1 text-base bg-transparent border-0 border-b border-gray-100 focus:border-blue-400 focus:ring-0 px-0 py-2 placeholder-gray-400 transition"
                placeholder="Add keyword and press Enter"
                style={{ outline: "none", boxShadow: "none" }}
              />
              <button
                type="button"
                className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg font-semibold text-sm hover:bg-blue-200 transition"
                onClick={() => keywordInput.trim() && addKeyword(keywordInput)}
                tabIndex={-1}
              >
                Add
              </button>
            </div>
            {focusKeywords.length > 2 && (
              <div className="text-xs text-orange-500 mt-1">
                Too many focus keywords can harm SEO. Try to focus on 1–2 main
                keywords.
              </div>
            )}
          </div>
          <SeoScore
            html={content}
            focusKeywords={focusKeywords}
            title={title}
          />
        </div>
      </div>
    </div>
  );
}
