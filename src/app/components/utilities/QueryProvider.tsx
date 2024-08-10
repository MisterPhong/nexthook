'use client'

import React, { useEffect, useState } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
    PersistQueryClientProvider,
    Persister,
    persistQueryClient,
} from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
        },
    },
})

type Props = { children: React.ReactNode }

export default function QueryProvider({ children }: Props) {
    const [persister, setPersister] = useState<Persister | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // This code will run only on the client side
            const sessionStoragePersister = createSyncStoragePersister({
                storage: window.sessionStorage,
            })

            persistQueryClient({
                queryClient,
                persister: sessionStoragePersister,
            })

            setPersister(sessionStoragePersister)
        }
    }, [])

    if (!persister) {
        // Optionally, you can render a loading state while the persister is being initialized
        return null
    }

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
        >
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
        </PersistQueryClientProvider>
    )
}
