type ErrorBannerProps = {
  messages: string[];
};

export function ErrorBanner({ messages }: ErrorBannerProps) {
  if (messages.length === 0) return null;

  return (
    <div
      role="alert"
      className="rounded-2xl border border-danger/20 bg-danger/[0.06] px-4 py-3 text-sm leading-6 text-ink"
    >
      {messages.length === 1 ? (
        <p>{messages[0]}</p>
      ) : (
        <ul className="list-disc space-y-1 pl-5">
          {messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
