"use client"

import { Alert, AlertTitle } from '@/shared/ui/alert';
import React from 'react';
import {CircleAlert} from "lucide-react";

interface ErrorAlertProps {
    formError: string | null;
}

const ErrorAlert = ({ formError }: ErrorAlertProps) => {
    return (
        <Alert
            variant="destructive"
            icon={CircleAlert}
            className="border-red-500/40 bg-red-50 text-red-900 dark:border-red-500/50 dark:bg-red-950/40 dark:text-red-100">
            <AlertTitle className={'bg-transparent!'}>{formError}</AlertTitle>
        </Alert>
    );
};

export default ErrorAlert;
