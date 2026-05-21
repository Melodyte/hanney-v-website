import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { testimonialSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all');

    let query = supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true });

    // Only filter by visibility for public requests
    if (!all) {
      query = query.eq('is_visible', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error fetching testimonials:', error);
      return NextResponse.json(
        { error: 'Service unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ testimonials: data });
  } catch (err) {
    console.error('Unexpected error in GET /api/testimonials:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = testimonialSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get the next sort_order value
    const { data: lastItem } = await supabase
      .from('testimonials')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .single();

    const nextSortOrder = lastItem ? lastItem.sort_order + 1 : 0;

    const { data, error } = await supabase
      .from('testimonials')
      .insert({
        client_name: result.data.client_name,
        service_type: result.data.service_type,
        review_text: result.data.review_text,
        rating: result.data.rating,
        screenshot_url: result.data.screenshot_url || null,
        is_visible: result.data.is_visible,
        sort_order: nextSortOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error creating testimonial:', error);
      return NextResponse.json(
        { error: 'Service unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    revalidatePath('/');
    return NextResponse.json({ success: true, testimonial: data }, { status: 201 });
  } catch (err) {
    console.error('Unexpected error in POST /api/testimonials:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
