"use client";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="container">
      <h1 className="sections__title">Error - {error.message}</h1>
    </div>
  );
}
