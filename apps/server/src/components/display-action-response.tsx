import { CircleAlert } from 'lucide-react';

interface ServerActionProps {
  result: {
    data?: {
      error?: string;
    };
    serverError?: string;
    fetchError?: string;
    validationErrors?: Record<string, string[] | undefined> | undefined;
  };
}

function ErrorMessage({ text }: { text: string }) {
  return (
    <div className="text-destructive flex items-center gap-1">
      <CircleAlert className="h-4 min-h-4 w-4 min-w-4" />
      <p>{text}</p>
    </div>
  );
}

export function DisplayActionResponse({ result }: ServerActionProps) {
  const { data, serverError, fetchError, validationErrors } = result;

  return (
    <>
      {data?.error ? <ErrorMessage text={data.error} /> : null}

      {serverError ? <ErrorMessage text={serverError} /> : null}

      {fetchError ? <ErrorMessage text={fetchError} /> : null}

      {/* {validationErrors ? (
        <div className="text-destructive my-2">
          {Object.keys(validationErrors).map((key) => (
            <p key={key}>
              {`${key}: ${validationErrors && validationErrors[key as keyof typeof validationErrors]}`}
            </p>
          ))}
        </div>
      ) : null} */}
    </>
  );
}
