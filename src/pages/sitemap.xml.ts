import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://jobcoach-websites.vercel.app';
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/order</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/impressum</loc>
    <priority>0.5</priority>
    <changefreq>yearly</changefreq>
  </url>
  <url>
    <loc>${baseUrl}/datenschutz</loc>
    <priority>0.5</priority>
    <changefreq>yearly</changefreq>
  </url>
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};