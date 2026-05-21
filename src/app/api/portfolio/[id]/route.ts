import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = await createClient();

    const updateData: Record<string, unknown> = {};
    if (body.category !== undefined) updateData.category = body.category;
    if (body.sort_order !== undefined) updateData.sort_order = body.sort_order;
    if (body.alt_text !== undefined) updateData.alt_text = body.alt_text;

    const { data, error } = await supabase
      .from('portfolio_items')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error updating portfolio item:', error);
      return NextResponse.json(
        { error: 'Failed to update portfolio item' },
        { status: 503 }
      );
    }

    revalidatePath('/portfolio');
    revalidatePath('/');
    return NextResponse.json({ success: true, item: data });
  } catch (err) {
    console.error('Unexpected error in PATCH /api/portfolio/[id]:', err);
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
      .from('portfolio_items')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database error deleting portfolio item:', error);
      return NextResponse.json(
        { error: 'Failed to delete portfolio item' },
        { status: 503 }
      );
    }

    revalidatePath('/portfolio');
    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Unexpected error in DELETE /api/portfolio/[id]:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
