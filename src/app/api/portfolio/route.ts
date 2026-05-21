import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Database error fetching portfolio items:', error);
      return NextResponse.json(
        { error: 'Service unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ items: data });
  } catch (err) {
    console.error('Unexpected error in GET /api/portfolio:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Basic validation for portfolio items
    if (!body.image_url || !body.alt_text || !body.category) {
      return NextResponse.json(
        { error: 'Validation failed', details: { message: 'image_url, alt_text, and category are required' } },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get the next sort_order value
    const { data: lastItem } = await supabase
      .from('portfolio_items')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .single();

    const nextSortOrder = lastItem ? lastItem.sort_order + 1 : 0;

    const { data, error } = await supabase
      .from('portfolio_items')
      .insert({
        image_url: body.image_url,
        alt_text: body.alt_text,
        category: body.category,
        sort_order: body.sort_order ?? nextSortOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error creating portfolio item:', error);
      return NextResponse.json(
        { error: 'Service unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    revalidatePath('/portfolio');
    revalidatePath('/');
    return NextResponse.json({ success: true, item: data }, { status: 201 });
  } catch (err) {
    console.error('Unexpected error in POST /api/portfolio:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
