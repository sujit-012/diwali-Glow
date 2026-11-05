import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const roomsDir = path.join(__dirname, 'public', 'assets', 'rooms');

if (!fs.existsSync(roomsDir)) {
  fs.mkdirSync(roomsDir, { recursive: true });
}

const sampleRooms = [
  {
    name: 'living_room.jpg',
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    title: 'Modern Indian Living Room'
  },
  {
    name: 'pooja_room.jpg',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    title: 'Serene Sanctum / Pooja Room'
  },
  {
    name: 'balcony.jpg',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    title: 'Evening Sunset Balcony'
  },
  {
    name: 'entrance.jpg',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    title: 'Grand Main Entrance Foyer'
  },
  {
    name: 'bedroom.jpg',
    url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
    title: 'Cozy Master Bedroom'
  },
  {
    name: 'outdoor.jpg',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    title: 'Courtyard & Veranda'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle redirect
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`Failed with status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const room of sampleRooms) {
    const dest = path.join(roomsDir, room.name);
    try {
      console.log(`Downloading ${room.title}...`);
      await downloadFile(room.url, dest);
      console.log(`✅ Saved ${room.name}`);
    } catch (e) {
      console.warn(`Could not download ${room.name}: ${e.message}`);
    }
  }
}

run();
