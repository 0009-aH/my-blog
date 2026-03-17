import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  const GITHUB_USERNAME = '0009-aH';
  const TODAY = new Date().toISOString().split('T')[0];

  try {
    // 1. Fetch GitHub Events
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
      headers: {
        'User-Agent': 'Cron-Job',
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      // If 404 or other error, return helpful message but 500 status
      const errorText = await response.text();
      return NextResponse.json({ error: `GitHub API Error: ${response.status} ${response.statusText}`, details: errorText }, { status: 500 });
    }

    const events = await response.json();

    // 2. Filter for PushEvents today
    const pushEvents = events.filter((event: any) => {
      const eventDate = new Date(event.created_at).toISOString().split('T')[0];
      return event.type === 'PushEvent' && eventDate === TODAY;
    });

    if (pushEvents.length === 0) {
      return NextResponse.json({ message: 'No commits found for today.' });
    }

    // 3. Consolidate Activities
    const repos: Record<string, string[]> = {};

    pushEvents.forEach((event: any) => {
      const repoName = event.repo.name;
      if (!repos[repoName]) {
        repos[repoName] = [];
      }
      event.payload.commits.forEach((commit: any) => {
        repos[repoName].push(commit.message);
      });
    });

    // 4. Construct Portable Text Body
    const bodyBlocks: any[] = [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: `Here is a summary of all my coding activity for ${TODAY}:` }],
      }
    ];

    Object.keys(repos).forEach((repo) => {
      // Repo Heading
      bodyBlocks.push({
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: repo, marks: ['strong'] }],
      });

      // Commit List
      repos[repo].forEach(msg => {
        bodyBlocks.push({
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          level: 1,
          children: [{ _type: 'span', text: msg }],
        });
      });
    });

    // 5. Create Sanity Post
    const title = `Daily Summary - ${TODAY}`;
    const slug = `daily-summary-${TODAY}`;

    // Check if post already exists
    // Note: We need to use valid GROQ params
    const existing = await writeClient.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });

    if (existing) {
      return NextResponse.json({ message: 'Summary already exists.', id: existing._id });
    }

    const newPost = await writeClient.create({
      _type: 'post',
      title: title,
      slug: { _type: 'slug', current: slug },
      publishedAt: new Date().toISOString(),
      author: 'Peng Ji',
      categories: ['Daily Log'],
      body: bodyBlocks,
    });

    return NextResponse.json({ message: 'Daily summary created!', id: newPost._id });

  } catch (error: any) {
    console.error('Cron Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
