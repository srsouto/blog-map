const fs = require('fs');
const slugify = require('slugify');

const adventures = require('../src/adventures/adventures.json');
const trips = require('../src/trips/trips.json');

const baseUrl = process.env.SITE_URL || 'https://blog.stevensouto.com';
const paths = ['/'];

adventures.forEach(adventure => {
  paths.push(`/${adventure.id}/`);
  trips.forEach(trip => {
    paths.push(`/${adventure.id}/${trip.id}/`);
    trip.entries.forEach(entry => {
      const slug = slugify(entry.title, { lower: true, remove: /[:,]/ });
      paths.push(`/${adventure.id}/${trip.id}/${entry.id}-${slug}`);
    });
  });
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(p => `  <url><loc>${baseUrl}${p}</loc></url>`).join('\n')}
</urlset>`;

fs.writeFileSync('dist/sitemap.xml', sitemap);
console.log(`Sitemap generated: ${paths.length} URLs`);
