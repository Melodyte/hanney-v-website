import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { blogPostSchema } from '@/lib/validations';
import { generateSlug } from '@/lib/utils/slug';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = 9;
    const category = searchParams.get('category');
    const all = searchParams.get('all');

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .order('published_at', { ascending: false });

    // Only filter by published status for public requests
    if (!all) {
      query = query.eq('is_published', true);
    }

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    // Skip pagination for admin requests
    if (all) {
      const { data, error, count } = await query;

      if (error) {
        console.error('Database error fetching blog posts:', error);
        return NextResponse.json(
          { error: 'Service unavailable. Please try again later.' },
          { status: 503 }
        );
      }

      return NextResponse.json({
        posts: data,
        pagination: {
          page: 1,
          pageSize: count || 0,
          total: count || 0,
          totalPages: 1,
        },
      });
    }

    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error('Database error fetching blog posts:', error);
      return NextResponse.json(
        { error: 'Service unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    const totalPages = Math.ceil((count || 0) / pageSize);

    return NextResponse.json({
      posts: data,
      pagination: {
        page,
        pageSize,
        total: count || 0,
        totalPages,
      },
    });
  } catch (err) {
    console.error('Unexpected error in GET /api/blog:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = blogPostSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const slug = generateSlug(result.data.title);
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: result.data.title,
        slug,
        excerpt: result.data.excerpt || null,
        body_html: result.data.body_html,
        category: result.data.category,
        featured_image_url: result.data.featured_image_url,
        author: result.data.author,
        is_published: result.data.is_published,
        published_at: result.data.is_published ? (result.data.published_at || new Date().toISOString()) : null,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error creating blog post:', error);
      return NextResponse.json(
        { error: 'Service unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    revalidatePath('/blog');
    return NextResponse.json({ success: true, post: data }, { status: 201 });
  } catch (err) {
    console.error('Unexpected error in POST /api/blog:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
