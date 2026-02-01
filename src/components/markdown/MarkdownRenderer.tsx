"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyButton } from "@/components/chat/CopyButton";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeString = String(children).replace(/\n$/, "");
          const isInline = !match && !codeString.includes("\n");

          if (isInline) {
            return (
              <code
                className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          }

          return (
            <div className="relative group my-4">
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyButton text={codeString} />
              </div>
              {match && (
                <div className="bg-zinc-800 text-zinc-400 text-xs px-4 py-1 rounded-t-lg">
                  {match[1]}
                </div>
              )}
              <SyntaxHighlighter
                style={oneDark}
                language={match?.[1] || "text"}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  borderTopLeftRadius: match ? 0 : "0.5rem",
                  borderTopRightRadius: match ? 0 : "0.5rem",
                  borderBottomLeftRadius: "0.5rem",
                  borderBottomRightRadius: "0.5rem",
                }}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          );
        },
        p({ children }) {
          return <p className="mb-4 last:mb-0">{children}</p>;
        },
        ul({ children }) {
          return <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>;
        },
        ol({ children }) {
          return <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>;
        },
        h1({ children }) {
          return <h1 className="text-2xl font-bold mb-4 mt-6">{children}</h1>;
        },
        h2({ children }) {
          return <h2 className="text-xl font-bold mb-3 mt-5">{children}</h2>;
        },
        h3({ children }) {
          return <h3 className="text-lg font-bold mb-2 mt-4">{children}</h3>;
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-4 border-muted-foreground/30 pl-4 italic my-4">
              {children}
            </blockquote>
          );
        },
        a({ href, children }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {children}
            </a>
          );
        },
        table({ children }) {
          return (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-muted">
                {children}
              </table>
            </div>
          );
        },
        th({ children }) {
          return (
            <th className="border border-muted bg-muted px-4 py-2 text-left font-semibold">
              {children}
            </th>
          );
        },
        td({ children }) {
          return <td className="border border-muted px-4 py-2">{children}</td>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
