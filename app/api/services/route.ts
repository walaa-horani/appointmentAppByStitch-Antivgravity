import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

// GET /api/services
export async function GET() {
    try {
        const services = await prisma.service.findMany()
        return NextResponse.json(services)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching services' }, { status: 500 })
    }
}

// POST /api/services (Admin only - simplification: check role if needed, or just protected)
export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if user is admin (Optional: Add role check logic here if strictly required for demo)
        // const user = await prisma.user.findUnique({ where: { id: userId } })
        // if (user?.role !== 'admin') ...

        const body = await req.json()
        const { name, description, duration, price } = body

        const service = await prisma.service.create({
            data: {
                name,
                description,
                duration: parseInt(duration),
                price: parseFloat(price),
            },
        })
        return NextResponse.json(service)
    } catch (error) {
        return NextResponse.json({ error: 'Error creating service' }, { status: 500 })
    }
}
