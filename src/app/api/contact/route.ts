import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { contactSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name: result.data.name,
        email: result.data.email,
        subject: result.data.subject,
        message: result.data.message,
        is_read: false,
      });

    if (error) {
      console.error('Database error creating contact message:', error);
      return NextResponse.json(
        { error: 'Service unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully.' },
      { status: 201 }
    );
  } catch (err) {
    console.error('Unexpected error in POST /api/contact:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
