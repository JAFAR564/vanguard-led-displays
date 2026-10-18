import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const inputVideo = process.argv[2] || 'public/assets/george-estate-installation.mp4';
const outputDir = process.argv[3] || 'public/assets/scrollytelling/hero';
const fps = parseInt(process.argv[4] || '24', 10);
const duration = parseFloat(process.argv[5] || '4.0');
const quality = parseInt(process.argv[6] || '85', 10);

console.log('==========================================================');
console.log(' Vanguard Scrollytelling Frame Slicer (Node.js / FFmpeg)');
console.log('==========================================================');

if (!fs.existsSync(inputVideo)) {
  console.error(`Error: Input video not found at: ${inputVideo}`);
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

// Clean previous frames
for (const file of fs.readdirSync(outputDir)) {
  if (file.startsWith('frame_') && file.endsWith('.webp')) {
    fs.unlinkSync(path.join(outputDir, file));
  }
}

console.log(`Input Video:  ${inputVideo}`);
console.log(`Output Dir:   ${outputDir}`);
console.log(`Target FPS:   ${fps} fps (Duration: ${duration}s)`);
console.log(`WebP Quality: ${quality}%`);
console.log('----------------------------------------------------------');

const filter = `fps=${fps},scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2`;
const targetPattern = path.join(outputDir, 'frame_%03d.webp').replace(/\\/g, '/');

const ffmpegArgs = [
  'ffmpeg',
  '-y',
  '-ss', '00:00:00',
  '-t', duration.toString(),
  '-i', `"${inputVideo}"`,
  '-vf', `"${filter}"`,
  '-vcodec', 'libwebp',
  '-quality', quality.toString(),
  '-preset', 'photo',
  `"${targetPattern}"`
].join(' ');

console.log('Running FFmpeg...');
execSync(ffmpegArgs, { stdio: 'inherit', shell: true });

const files = fs.readdirSync(outputDir).filter(f => f.startsWith('frame_') && f.endsWith('.webp'));
console.log('----------------------------------------------------------');
console.log(`Extraction complete! Total frames extracted: ${files.length}`);
console.log(`Frames stored in: ${outputDir}`);
console.log('==========================================================');
