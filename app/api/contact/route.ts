import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Schema for validation
const contactSchema = z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    subject: z.string().min(3, 'Assunto deve ter pelo menos 3 caracteres'),
    message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Validate input
        const result = contactSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json(
                { error: 'Dados inválidos', details: result.error.flatten() },
                { status: 400 }
            )
        }

        const { name, email, subject, message } = result.data

        // Use admin client to bypass RLS and ensure delivery
        const supabase = createAdminClient()

        // Insert message
        const { error } = await supabase
            .from('contact_messages')
            .insert({
                name,
                email,
                subject,
                message,
            })

        if (error) {
            console.error('Error saving contact message:', error)
            return NextResponse.json(
                { error: 'Erro ao salvar mensagem' },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Unexpected error in contact API:', error)
        return NextResponse.json(
            { error: 'Erro interno do servidor' },
            { status: 500 }
        )
    }
}
