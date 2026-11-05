import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const roomsDir = path.join(__dirname, 'public', 'assets', 'rooms');

// Real, stunning, photorealistic Diwali illuminated rooms curated from architectural royalty-free photography
const decoratedRooms = [
  {
    name: 'living_room_decorated.jpg',
    url: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=1200&q=80', // Beautiful warm Indian living space with glowing golden fairy lights and candles
  },
  {
    name: 'pooja_room_decorated.jpg',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80', // Glowing traditional brass oil lamps & festive flowers
  },
  {
    name: 'balcony_decorated.jpg',
    url: 'https://images.unsplash.com/photo-1514897575457-c4db467cf78e?auto=format&fit=crop&w=1200&q=80', // Balcony evening fairy lights and golden lanterns
  },
  {
    name: 'entrance_decorated.jpg',
    url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80', // Illuminated entryway with floor rangoli and glowing candles
  },
  {
    name: 'bedroom_decorated.jpg',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', // Cozy ambient golden fairy lights and candle glow
  },
  {
    name: 'outdoor_decorated.jpg',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80', // Grand illuminated courtyard with fairy canopies and warm lanterns
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`Failed with status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const item of decoratedRooms) {
    const dest = path.join(roomsDir, item.name);
    try {
      console.log(`Downloading ${item.name}...`);
      await downloadFile(item.url, dest);
      console.log(`✅ Saved ${item.name}`);
    } catch (e) {
      console.warn(`Could not download ${item.name}: ${e.message}`);
    }
  }
}

run();
