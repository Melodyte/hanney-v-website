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
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Database error fetching blog post:', error);
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post: data });
  } catch (err) {
    console.error('Unexpected error in GET /api/blog/[id]:', err);
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
    if (body.title !== undefined) updateData.title = body.title;
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt || null;
    if (body.body_html !== undefined) updateData.body_html = body.body_html;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.featured_image_url !== undefined) updateData.featured_image_url = body.featured_image_url;
    if (body.author !== undefined) updateData.author = body.author;
    if (body.is_published !== undefined) updateData.is_published = body.is_published;
    if (body.published_at !== undefined) updateData.published_at = body.published_at;

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error updating blog post:', error);
      return NextResponse.json(
        { error: 'Failed to update blog post' },
        { status: 503 }
      );
    }

    revalidatePath('/blog');
    revalidatePath(`/blog/${data.slug}`);
    return NextResponse.json({ success: true, post: data });
  } catch (err) {
    console.error('Unexpected error in PUT /api/blog/[id]:', err);
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
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database error deleting blog post:', error);
      return NextResponse.json(
        { error: 'Failed to delete blog post' },
        { status: 503 }
      );
    }

    revalidatePath('/blog');
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Unexpected error in DELETE /api/blog/[id]:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
