'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

export default function SyncUser() {
    const { isSignedIn, user } = useUser()

    useEffect(() => {
        if (isSignedIn && user) {
            fetch('/api/sync-user', { method: 'POST' })
                .catch(err => console.error('Failed to sync user:', err))
        }
    }, [isSignedIn, user])

    return null
}
