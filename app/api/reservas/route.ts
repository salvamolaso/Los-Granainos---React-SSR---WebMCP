import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseAdmin()
  const { name, guests, date, preference, comments } = await req.json()

  if (!name || !guests || !date || !preference) {
    return NextResponse.json(
      { error: 'Faltan campos obligatorios' },
      { status: 400 }
    )
  }

  const { error } = await supabaseAdmin.from('reservas').insert({
    name,
    guests: Number(guests),
    date,
    preference,
    comments: comments ?? null,
  })

  if (error) {
    console.error('[reservas] Supabase error:', error)
    return NextResponse.json(
      { error: 'No se pudo guardar la reserva' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
