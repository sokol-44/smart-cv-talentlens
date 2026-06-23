import React from "react";

/**
 * Component that parses a string and renders text inside parentheses in a specially styled, highlighted badge.
 * This satisfies requirement 1: "Dane w nawiasach potraktuj jako informacje uzupełniające i specjalnie oznacz."
 */
export const SupplementaryText: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  // Regex to match any text inside parentheses, including nested-like but simple matches.
  const regex = /\(([^)]+)\)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add plain text before parentheses
    if (match.index > lastIndex) {
      parts.push(<span key={`text-${lastIndex}`}>{text.substring(lastIndex, match.index)}</span>);
    }

    // Add highlighted badge for text inside parentheses
    const parenthesizedContent = match[1];
    parts.push(
      <span
        key={`badge-${match.index}`}
        className="inline-flex items-center gap-1 text-[10px] md:text-[11px] font-mono font-medium text-indigo-700 bg-indigo-50 border border-indigo-100/60 rounded px-1.5 py-0.5 mx-1 shadow-2xs select-none hover:bg-indigo-100/60 transition cursor-help"
        title="Informacja uzupełniająca / Supplementary info"
      >
        {parenthesizedContent}
      </span>
    );
    lastIndex = regex.lastIndex;
  }

  // Add remaining plain text
  if (lastIndex < text.length) {
    parts.push(<span key={`text-${lastIndex}`}>{text.substring(lastIndex)}</span>);
  }

  return <>{parts.length > 0 ? parts : <span>{text}</span>}</>;
};
