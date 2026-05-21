import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = await createClient();

    const updateData: Record<string, unknown> = {};
    if (body.client_name !== undefined) updateData.client_name = body.client_name;
    if (body.service_type !== undefined) updateData.service_type = body.service_type;
    if (body.review_text !== undefined) updateData.review_text = body.review_text;
    if (body.rating !== undefined) updateData.rating = body.rating;
    if (body.screenshot_url !== undefined) updateData.screenshot_url = body.screenshot_url || null;
    if (body.is_visible !== undefined) updateData.is_visible = body.is_visible;

    const { data, error } = await supabase
      .from('testimonials')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error updating testimonial:', error);
      return NextResponse.json(
        { error: 'Failed to update testimonial' },
        { status: 503 }
      );
    }

    revalidatePath('/');
    return NextResponse.json({ success: true, testimonial: data });
  } catch (err) {
    console.error('Unexpected error in PUT /api/testimonials/[id]:', err);
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
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database error deleting testimonial:', error);
      return NextResponse.json(
        { error: 'Failed to delete testimonial' },
        { status: 503 }
      );
    }

    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Unexpected error in DELETE /api/testimonials/[id]:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
