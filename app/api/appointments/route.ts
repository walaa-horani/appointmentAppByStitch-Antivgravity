import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

// GET /api/appointments
export async function GET(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url)
        const role = searchParams.get('role') // 'patient' or 'doctor'

        let whereClause = {}
        if (role === 'doctor') {
            const doctor = await prisma.doctor.findUnique({ where: { userId } })
            if (doctor) {
                whereClause = { doctorId: doctor.id }
            }
        } else {
            whereClause = { patientId: userId }
        }

        const appointments = await prisma.appointment.findMany({
            where: whereClause,
            include: {
                doctor: true,
                service: true,
                patient: true
            }
        })

        return NextResponse.json(appointments)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching appointments' }, { status: 500 })
    }
}

// POST /api/appointments
export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json()
        const { doctorId, serviceId, date, time } = body

        // Combine date and time if needed, or just use date
        const appointmentDate = new Date(date)

        // Check for conflict
        const conflict = await prisma.appointment.findFirst({
            where: {
                doctorId,
                date: { equals: appointmentDate },
                time: time,
                status: {
                    not: 'cancelled'
                }
            }
        })

        if (conflict) {
            return NextResponse.json({ error: 'This time slot is already booked.' }, { status: 409 })
        }

        const appointment = await prisma.appointment.create({
            data: {
                patientId: userId,
                doctorId,
                serviceId,
                date: appointmentDate,
                time: time || "",
                status: 'pending'
            },
        })
        return NextResponse.json(appointment)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Error creating appointment' }, { status: 500 })
    }
}
