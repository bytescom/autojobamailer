import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const LoginPage = dynamic(() => import('@/features/auth/LoginPage'));

export default function Page() {
    return (
        <Suspense>
            <LoginPage />
        </Suspense>
    );
}
