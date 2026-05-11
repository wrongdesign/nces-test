'use client';

import type { PropsWithChildren } from 'react';

import Image from 'next/image';

const AuthWrapper = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex flex-col p-6 border border-[--defaultBorder] rounded-2xl items-center ">
            <Image alt={'Logo'} height={75} src={'/logo.png'} width={100} />
            {children}
        </div>
    );
};

export default AuthWrapper;
