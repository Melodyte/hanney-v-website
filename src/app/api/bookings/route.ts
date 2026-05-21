import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { bookingSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        full_name: result.data.fullName,
        email: result.data.email,
        phone: result.data.phone,
        service_category: result.data.serviceCategory,
        preferred_date: result.data.preferredDate,
        notes: result.data.notes || null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Database error creating booking:', error);
      return NextResponse.json(
        { error: 'Service unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: true, booking: data }, { status: 201 });
  } catch (err) {
    console.error('Unexpected error in POST /api/bookings:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error fetching bookings:', error);
      return NextResponse.json(
        { error: 'Service unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ bookings: data });
  } catch (err) {
    console.error('Unexpected error in GET /api/bookings:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
