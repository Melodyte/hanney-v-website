import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Database error fetching product:', error);
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ product: data });
  } catch (err) {
    console.error('Unexpected error in GET /api/products/[id]:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = await createClient();

    const updateData: Record<string, unknown> = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.price_naira !== undefined) updateData.price_naira = body.price_naira;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.availability !== undefined) updateData.availability = body.availability;
    if (body.image_urls !== undefined) updateData.image_urls = body.image_urls;
    if (body.is_visible !== undefined) updateData.is_visible = body.is_visible;

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error updating product:', error);
      return NextResponse.json(
        { error: 'Failed to update product' },
        { status: 503 }
      );
    }

    revalidatePath('/products');
    return NextResponse.json({ success: true, product: data });
  } catch (err) {
    console.error('Unexpected error in PUT /api/products/[id]:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database error deleting product:', error);
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 503 }
      );
    }

    revalidatePath('/products');
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Unexpected error in DELETE /api/products/[id]:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
