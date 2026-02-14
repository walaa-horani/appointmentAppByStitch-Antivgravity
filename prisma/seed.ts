import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
    // Create some default services
    // Create some default services

    const services = [
        {
            name: 'General Consultation',
            description: 'Standard check-up with a general practitioner.',
            duration: 30,
            price: 50.00,
            category: 'General Practitioner'
        },
        {
            name: 'Dental Check-up',
            description: 'Routine dental cleaning and examination.',
            duration: 45,
            price: 80.00,
            category: 'Dentist'
        },
        {
            name: 'Cardiology Screening',
            description: 'Heart health assessment and ECG.',
            duration: 60,
            price: 150.00,
            category: 'Cardiologist'
        },
    ]

    for (const service of services) {
        const existing = await prisma.service.findFirst({
            where: { name: service.name }
        })

        if (existing) {
            await prisma.service.update({
                where: { id: existing.id },
                data: service
            })
        } else {
            await prisma.service.create({
                data: service,
            })
        }
    }



    // Seed Doctors
    const doctors = [
        {
            name: 'Dr. Sarah Wilson',
            specialization: 'Dentist',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop'
        },
        {
            name: 'Dr. James Carter',
            specialization: 'Cardiologist',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop'
        },
        {
            name: 'Dr. Emily Chen',
            specialization: 'General Practitioner',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop'
        }
    ]

    for (const doc of doctors) {
        // Simple check by name for seed idempotency
        const existing = await prisma.doctor.findFirst({ where: { name: doc.name } })
        if (!existing) {
            await prisma.doctor.create({ data: doc })
        } else {
            await prisma.doctor.update({
                where: { id: existing.id },
                data: doc
            })
        }
    }

    // Seed Patients
    const patients = [
        { email: 'alice@example.com', name: 'Alice Brown', id: 'user_dummy_1' },
        { email: 'bob@example.com', name: 'Bob Smith', id: 'user_dummy_2' },
        { email: 'charlie@example.com', name: 'Charlie Davis', id: 'user_dummy_3' },
    ]

    for (const p of patients) {
        const existing = await prisma.user.findUnique({ where: { email: p.email } })
        if (!existing) {
            await prisma.user.create({
                data: {
                    id: p.id, // Mock ID
                    email: p.email,
                    name: p.name,
                    role: 'patient',
                }
            })
        }
    }

    console.log('Seed data created.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
