import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { newsletterSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check for existing subscriber (deduplication)
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, is_active')
      .eq('email', result.data.email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'This email is already subscribed.' },
        { status: 409 }
      );
    }

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: result.data.email,
        is_active: true,
      });

    if (error) {
      console.error('Database error subscribing to newsletter:', error);
      return NextResponse.json(
        { error: 'Service unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to the newsletter.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Unexpected error in POST /api/newsletter:', err);
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
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) {
      console.error('Database error fetching subscribers:', error);
      return NextResponse.json(
        { error: 'Service unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ subscribers: data });
  } catch (err) {
    console.error('Unexpected error in GET /api/newsletter:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
