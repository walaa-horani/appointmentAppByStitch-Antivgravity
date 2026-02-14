
import fs from 'fs'
import path from 'path'
import { Client } from 'pg'

// Load .env manually
try {
    const envPath = path.resolve(process.cwd(), '.env')
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
    console.log('Connecting to DB...')
    try {
        await client.connect()
        console.log('Connected successfully via pg driver!')
        const res = await client.query('SELECT NOW()')
        console.log('Current DB Time:', res.rows[0])
        await client.end()
    } catch (err) {
        console.error('Connection failed:', err)
        process.exit(1)
    }
}

main()
