import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const inputVideo = process.argv[2] || 'public/assets/hero-cinematic.mp4';
const outputDir = process.argv[3] || 'public/assets/scrollytelling/hero';
const targetFrames = parseInt(process.argv[4] || '96', 10);
const quality = parseInt(process.argv[5] || '85', 10);

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

// Probe duration using ffprobe
let duration = 4.0;
try {
  const probeOutput = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${inputVideo}"`, { encoding: 'utf-8' }).trim();
  const parsed = parseFloat(probeOutput);
  if (!isNaN(parsed) && parsed > 0) {
    duration = parsed;
  }
} catch {
  console.warn('Could not probe duration with ffprobe, defaulting to 4.0s');
}

const targetFps = (targetFrames / duration).toFixed(3);

console.log(`Input Video:   ${inputVideo}`);
console.log(`Output Dir:    ${outputDir}`);
console.log(`Video Length:  ${duration.toFixed(2)}s`);
console.log(`Target Frames: ${targetFrames} (Calculated FPS: ${targetFps})`);
console.log(`WebP Quality:  ${quality}%`);
console.log('----------------------------------------------------------');

const filter = `fps=${targetFps},scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2`;
const targetPattern = path.join(outputDir, 'frame_%03d.webp').replace(/\\/g, '/');

const ffmpegArgs = [
  'ffmpeg',
  '-y',
  '-i', `"${inputVideo}"`,
  '-vf', `"${filter}"`,
  '-vframes', targetFrames.toString(),
  '-vcodec', 'libwebp',
  '-quality', quality.toString(),
  '-preset', 'photo',
  `"${targetPattern}"`
].join(' ');

console.log('Running FFmpeg frame extraction...');
execSync(ffmpegArgs, { stdio: 'inherit', shell: true });

const files = fs.readdirSync(outputDir).filter(f => f.startsWith('frame_') && f.endsWith('.webp'));
console.log('----------------------------------------------------------');
console.log(`Extraction complete! Total frames extracted: ${files.length}`);
console.log(`Frames stored in: ${outputDir}`);
console.log('==========================================================');
