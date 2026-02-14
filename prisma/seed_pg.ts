
import { Client } from 'pg'
import fs from 'fs'
import path from 'path'

// Load .env manually
try {
    const envPath = path.resolve(__dirname, '..', '.env')
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8')
        envConfig.split('\n').forEach(line => {
            const parts = line.split('=')
            if (parts.length >= 2) {
                const key = parts[0].trim()
                const value = parts.slice(1).join('=').trim()
                if (key && value && !key.startsWith('#')) {
                    process.env[key] = value.replace(/^["']|["']$/g, '')
                }
            }
        })
    }
} catch (e) {
    console.error('Error loading .env', e)
}

const client = new Client({
    connectionString: process.env.DATABASE_URL
})

async function main() {
    console.log('Connecting to DB via pg...')
    await client.connect()

    // 1. Services
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

    for (const s of services) {
        const res = await client.query('SELECT id FROM "Service" WHERE name = $1', [s.name])
        if (res.rowCount != null && res.rowCount > 0) {
            await client.query('UPDATE "Service" SET description = $2, duration = $3, price = $4, category = $5, "updatedAt" = NOW() WHERE id = $1', [res.rows[0].id, s.description, s.duration, s.price, s.category])
        } else {
            await client.query('INSERT INTO "Service" (id, name, description, duration, price, category, "createdAt", "updatedAt") VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())', [s.name, s.description, s.duration, s.price, s.category])
        }
    }
    console.log('Services seeded.')

    // 2. Doctors
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

    for (const d of doctors) {
        const res = await client.query('SELECT id FROM "Doctor" WHERE name = $1', [d.name])
        if (res.rowCount != null && res.rowCount > 0) {
            await client.query('UPDATE "Doctor" SET specialization = $2, image = $3 WHERE id = $1', [res.rows[0].id, d.specialization, d.image])
        } else {
            await client.query('INSERT INTO "Doctor" (id, name, specialization, image) VALUES (gen_random_uuid(), $1, $2, $3)', [d.name, d.specialization, d.image])
        }
    }
    console.log('Doctors seeded.')

    // 3. Patients (Users)
    const patients = [
        { email: 'alice@example.com', name: 'Alice Brown', id: 'user_dummy_1' },
        { email: 'bob@example.com', name: 'Bob Smith', id: 'user_dummy_2' },
        { email: 'charlie@example.com', name: 'Charlie Davis', id: 'user_dummy_3' },
    ]

    for (const p of patients) {
        const res = await client.query('SELECT id FROM "User" WHERE email = $1', [p.email])
        if (res.rowCount === 0) {
            await client.query('INSERT INTO "User" (id, email, name, role, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())', [p.id, p.email, p.name, 'patient'])
        } else {
            // Ensure role is patient if exists? No, don't overwrite role of existing user if they are admin.
            // But if they are just a user, maybe update?
            // User might be testing with their own email.
        }
    }
    console.log('Patients seeded.')

    await client.end()
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})
