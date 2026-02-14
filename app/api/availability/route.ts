import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const doctorId = searchParams.get('doctorId')
    const date = searchParams.get('date')

    if (!doctorId || !date) {
        return NextResponse.json({ error: 'Missing doctorId or date' }, { status: 400 })
    }

    try {
        // Parse date string (YYYY-MM-DD) to Date object (UTC midnight)
        const queryDate = new Date(date)

        const appointments = await prisma.appointment.findMany({
            where: {
                doctorId,
                date: {
                    equals: queryDate
                },
                status: {
                    not: 'cancelled'
                }
            },
            select: { time: true }
        })

        const takenSlots = appointments.map(a => a.time)
        return NextResponse.json({ takenSlots })
    } catch (error) {
        console.error('Error checking availability:', error)
        return NextResponse.json({ error: 'Error checking availability' }, { status: 500 })
    }
}
