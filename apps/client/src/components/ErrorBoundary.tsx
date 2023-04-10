import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

type Props = {
    children: React.ReactNode;
};

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
}

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
    // Do something with the error
    // E.g. log to an error logging client here
};

export function ErrorBoundaryComponent(props: Props) {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
            {props.children}
        </ErrorBoundary>
    );
}
