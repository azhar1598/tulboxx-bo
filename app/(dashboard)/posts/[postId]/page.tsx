"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RichTextEditor from "@/app/components/RichTextEditor";
import SeoScore from "@/app/components/SeoScore";
import { useMutation, useQuery } from "@tanstack/react-query";
import callApi from "@/services/apiService";
import { use } from "react";

export default function EditPost({ params }: { params: any }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [focusKeywords, setFocusKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const keywordInputRef = useRef<HTMLInputElement>(null);

  // Unwrap params using React.use()
  const unwrappedParams: any = use(params);

  // Fetch post data
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", unwrappedParams.postId],
    queryFn: async () => {
      const response = await callApi.get(`/posts/${unwrappedParams.postId}`);
      return response.data;
    },
  });

  // Update form when post data is loaded
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setFocusKeywords(post.focus_keywords || []);
    }
  }, [post]);

  const updatePost = useMutation({
    mutationFn: async (data: {
      title: string;
      content: string;
      authorId: number;
      focusKeywords: string[];
    }) => {
      const response = await callApi.patch(`/posts/${post.id}`, data);
      return response.data;
    },
    onSuccess: () => {
      router.push("/posts");
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2">
      <div className="w-full mx-auto flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 min-w-0 mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updatePost.mutate({
                title,
                content,
                authorId: 125,
                focusKeywords,
              });
            }}
            className="flex flex-col gap-8"
          >
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl sm:text-5xl font-extrabold bg-transparent border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 px-0 py-4 mb-2 placeholder-gray-400 transition"
              required
              placeholder="Add title"
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
                className="bg-blue-600 cursor-pointer hover:bg-blue-700 transition text-white px-8 py-3 rounded-lg font-semibold text-base shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => router.push("/posts")}
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
