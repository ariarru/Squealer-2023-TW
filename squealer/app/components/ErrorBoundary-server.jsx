"use client"

import { ErrorBoundary } from "./ErrorBoundary";

import React from 'react';

const ErrorBoundaryServer = ({ children }) => {
    return (
        <div>
            <ErrorBoundary>
                {children}
            </ErrorBoundary>
        </div>
    );
}

export default ErrorBoundaryServer;
