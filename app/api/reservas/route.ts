import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getSlug } from "@/lib/get-restaurant";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  const { name, guests, date, preference, comments } = await req.json();

  if (!name || !guests || !date || !preference) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios" },
      { status: 400 },
    );
  }

  // Get restaurant slug for multi-tenant identification
  const slug = await getSlug();

  const { error } = await supabaseAdmin.from("reservas").insert({
    restaurant_slug: slug,
    name,
    guests: Number(guests),
    date,
    preference,
    comments: comments ?? null,
  });

  if (error) {
    console.error("[reservas] Supabase error:", error);
    return NextResponse.json(
      { error: "No se pudo guardar la reserva" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
