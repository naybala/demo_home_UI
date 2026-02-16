"use client";

import "./InfiniteLoader.css";

interface InfiniteLoaderProps {
  message?: string;
}

export default function InfiniteLoader({
  message = "Loading...",
}: InfiniteLoaderProps) {
  return (
    <div className="page-loader-spinner">
      <div className="spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
}
