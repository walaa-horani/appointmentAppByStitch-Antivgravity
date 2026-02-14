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
