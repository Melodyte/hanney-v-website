import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paths, secret } = body;

    // Validate the revalidation secret
    if (!secret || secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { error: 'Invalid revalidation secret' },
        { status: 401 }
      );
    }

    if (!paths || !Array.isArray(paths) || paths.length === 0) {
      return NextResponse.json(
        { error: 'paths must be a non-empty array of strings' },
        { status: 400 }
      );
    }

    // Revalidate each path
    const results: { path: string; success: boolean }[] = [];

    for (const path of paths) {
      if (typeof path !== 'string') continue;
      try {
        revalidatePath(path);
        results.push({ path, success: true });
      } catch (err) {
        console.error(`Failed to revalidate path: ${path}`, err);
        results.push({ path, success: false });
      }
    }

    return NextResponse.json({
      success: true,
      revalidated: results,
    });
  } catch (err) {
    console.error('Unexpected error in POST /api/revalidate:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
