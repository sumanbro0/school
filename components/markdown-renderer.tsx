/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

type CustomComponentProps = {
  node?: any;
  children?: React.ReactNode;
  [key: string]: any;
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = "",
}) => {
  const customComponents: Components = {
    h1: ({ node, children, ...props }: CustomComponentProps) => (
      <div className="text-center mb-8">
        <h1
          className="text-4xl font-bold uppercase tracking-wide mb-2"
          {...props}
        >
          {children}
        </h1>
        <div className="flex justify-center items-center">
          <div className="h-[2px] w-16 bg-blue-600"></div>
          <div className="h-4 w-4 rounded-full bg-blue-600 mx-2"></div>
          <div className="h-[2px] w-16 bg-blue-600"></div>
        </div>
      </div>
    ),
    h2: ({ node, children, ...props }: CustomComponentProps) => (
      <h2
        className="text-2xl font-bold text-center uppercase tracking-wide my-6"
        {...props}
      >
        {children}
      </h2>
    ),
    p: ({ node, children, ...props }: CustomComponentProps) => (
      <p className="text-gray-800 leading-relaxed mb-6 text-justify" {...props}>
        {children}
      </p>
    ),
    a: ({ node, children, ...props }: CustomComponentProps) => (
      <a
        className="text-blue-600 hover:text-blue-800"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    div: ({ node, ...props }) => (
      <div
        {...props}
        style={{
          display: props.className === "image-grid" ? "flex" : "block",
          gap: "20px",
          flexWrap: "wrap",
          textAlign: "center",
          justifyContent: "center",
        }}
      />
    ),
    img: ({ node, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img
        {...props}
        style={{
          borderRadius: "8px",
          marginBottom: "8px",
          height: "300px",
          width: "250px",
        }}
      />
    ),
    strong: ({ node, ...props }) => (
      <strong {...props} style={{ fontSize: "14px", marginTop: "4px" }} />
    ),
    code: ({
      node,
      inline,
      children,
      ...props
    }: CustomComponentProps & { inline?: boolean }) =>
      inline ? (
        <code className="bg-gray-100 rounded px-1" {...props}>
          {children}
        </code>
      ) : (
        <code className="block bg-gray-100 p-4 rounded" {...props}>
          {children}
        </code>
      ),
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 ${className}`}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={customComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
