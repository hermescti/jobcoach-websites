import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://jobcoach-websites.vercel.app/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};