import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { productSchema } from '@/lib/validations';
import { generateSlug } from '@/lib/utils/slug';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const all = searchParams.get('all');

    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    // Only filter by visibility for public requests
    if (!all) {
      query = query.eq('is_visible', true);
    }

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error fetching products:', error);
      return NextResponse.json(
        { error: 'Service unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ products: data });
  } catch (err) {
    console.error('Unexpected error in GET /api/products:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = productSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const slug = generateSlug(result.data.name);
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('products')
      .insert({
        name: result.data.name,
        slug,
        description: result.data.description,
        price_naira: result.data.price_naira,
        category: result.data.category,
        availability: result.data.availability,
        image_urls: result.data.image_urls,
        is_visible: result.data.is_visible,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error creating product:', error);
      return NextResponse.json(
        { error: 'Service unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    revalidatePath('/products');
    return NextResponse.json({ success: true, product: data }, { status: 201 });
  } catch (err) {
    console.error('Unexpected error in POST /api/products:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
