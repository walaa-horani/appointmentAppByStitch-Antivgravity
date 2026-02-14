import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if requester is admin or doctor
        const requester = await prisma.user.findUnique({ where: { id: userId } })
        if (!requester || (requester.role !== 'admin' && requester.role !== 'doctor')) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { id } = await params
        const body = await req.json()
        const { status } = body

        if (!status || !['pending', 'confirmed', 'cancelled'].includes(status.toLowerCase())) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        // Use lowercase status to match Prisma enum
        const newStatus = status.toLowerCase()

        const updated = await prisma.appointment.update({
            where: { id },
            data: { status: newStatus as any }
        })

        return NextResponse.json(updated)
    } catch (error) {
        console.error("Error updating appointment:", error)
        return NextResponse.json({ error: 'Error updating appointment' }, { status: 500 })
    }
}
