import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { writeFile } from 'fs/promises'
import path from 'path'

// GET /api/doctors
export async function GET() {
    try {
        const doctors = await prisma.doctor.findMany()
        return NextResponse.json(doctors)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching doctors' }, { status: 500 })
    }
}

// POST /api/doctors
export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData()
        const name = formData.get('name') as string
        const specialization = formData.get('specialization') as string
        const doctorUserId = formData.get('userId') as string | null
        const imageFile = formData.get('image') as File | null

        let imageUrl = null

        if (imageFile) {
            const buffer = Buffer.from(await imageFile.arrayBuffer())
            // Create a unique filename
            const filename = `${Date.now()}-${imageFile.name.replaceAll(' ', '_')}`
            const uploadDir = path.join(process.cwd(), 'public/uploads/doctors')

            try {
                await writeFile(path.join(uploadDir, filename), buffer)
                imageUrl = `/uploads/doctors/${filename}`
            } catch (error) {
                console.error('Error saving image:', error)
                return NextResponse.json({ error: 'Error saving image' }, { status: 500 })
            }
        }

        // If userId is provided, verify user exists
        if (doctorUserId) {
            const userExists = await prisma.user.findUnique({ where: { id: doctorUserId } })
            if (!userExists) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }
        }

        const data: any = {
            name,
            specialization,
            image: imageUrl,
        }

        if (doctorUserId) {
            data.userId = doctorUserId
        }

        const doctor = await prisma.doctor.create({
            data,
        })

        // Update user role to doctor ONLY if userId is provided
        if (doctorUserId) {
            await prisma.user.update({
                where: { id: doctorUserId },
                data: { role: 'doctor' }
            })
        }

        return NextResponse.json(doctor)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Error creating doctor' }, { status: 500 })
    }
}
