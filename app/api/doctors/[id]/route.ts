import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { unlink } from 'fs/promises'
import path from 'path'

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if requester is admin
        const requester = await prisma.user.findUnique({ where: { id: userId } })
        if (!requester || (requester.role !== 'admin' && requester.role !== 'doctor')) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { id } = await params

        // Find doctor to get image and userId
        const doctor = await prisma.doctor.findUnique({ where: { id } })
        if (!doctor) {
            return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
        }

        // If linked to user, update user role
        if (doctor.userId) {
            await prisma.user.update({
                where: { id: doctor.userId },
                data: { role: 'patient' } // Demote to patient
            })
        }

        // Delete image if it's a local upload
        if (doctor.image && doctor.image.startsWith('/uploads/')) {
            const imagePath = path.join(process.cwd(), 'public', doctor.image)
            try {
                await unlink(imagePath)
            } catch (e) {
                console.error("Failed to delete image file:", e)
                // Proceed with deletion even if file removal fails
            }
        }

        // Delete all appointments associated with this doctor first to avoid FK constraint error
        await prisma.appointment.deleteMany({
            where: { doctorId: id }
        })

        await prisma.doctor.delete({ where: { id } })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting doctor:", error)
        return NextResponse.json({ error: 'Error deleting doctor' }, { status: 500 })
    }
}
