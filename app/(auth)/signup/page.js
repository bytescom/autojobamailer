import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SignupPage = dynamic(() => import('@/features/auth/SignupPage'));

export default function Page() {
    return (
        <Suspense>
            <SignupPage />
        </Suspense>
    );
}
