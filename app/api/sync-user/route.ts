import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST() {
    try {
        const { userId } = await auth()
        const user = await currentUser()

        if (!userId || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const email = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress || user.emailAddresses[0]?.emailAddress
        const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'No Name'

        if (email) {
            await prisma.user.upsert({
                where: { id: userId },
                update: {
                    email,
                    name,
                },
                create: {
                    id: userId,
                    email,
                    name,
                    role: 'patient', // Default role
                }
            })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error syncing user:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
