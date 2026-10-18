#!/usr/bin/env bash
# ==============================================================================
# Vanguard Architectural Displays — Automated Frame Extraction Pipeline
# Slices cinematic video from Mai 2.6 / external generator into 60fps WebP frames
# for the HTML5 canvas scroll-scrub engine.
# ==============================================================================

set -euo pipefail

INPUT_VIDEO="${1:-public/assets/hero-cinematic.mp4}"
OUTPUT_DIR="${2:-public/assets/scrollytelling/hero}"
FPS="${3:-24}"
QUALITY="${4:-85}"

echo "=========================================================="
echo " Vanguard Scrollytelling Frame Slicer"
echo "=========================================================="

if [ ! -f "$INPUT_VIDEO" ]; then
  echo "Error: Input video not found at: $INPUT_VIDEO"
  echo ""
  echo "Usage: npm run extract-frames [path_to_video.mp4] [output_dir] [fps] [quality]"
  echo "Default input: public/assets/hero-cinematic.mp4"
  echo ""
  echo "Tip: Place your generated video from Mai 2.6 at public/assets/hero-cinematic.mp4"
  echo "and run 'npm run extract-frames' again."
  exit 1
fi

if ! command -v ffmpeg &> /dev/null; then
  echo "Error: ffmpeg is not installed or not in PATH."
  exit 1
fi

echo "Input Video:  $INPUT_VIDEO"
echo "Output Dir:   $OUTPUT_DIR"
echo "Target FPS:   $FPS fps"
echo "WebP Quality: $QUALITY%"
echo "----------------------------------------------------------"

mkdir -p "$OUTPUT_DIR"

# Clean any existing frames in output directory
rm -f "$OUTPUT_DIR"/frame_*.webp

echo "Extracting frames with FFmpeg..."
ffmpeg -i "$INPUT_VIDEO" \
  -vf "fps=$FPS,scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
  -vcodec libwebp \
  -quality "$QUALITY" \
  -preset photo \
  "$OUTPUT_DIR/frame_%03d.webp"

FRAME_COUNT=$(ls -1 "$OUTPUT_DIR"/frame_*.webp 2>/dev/null | wc -l)
TOTAL_SIZE=$(du -sh "$OUTPUT_DIR" | cut -f1)

echo "----------------------------------------------------------"
echo "Extraction complete!"
echo "Total frames extracted: $FRAME_COUNT"
echo "Total directory weight: $TOTAL_SIZE"
echo "Target canvas directory: $OUTPUT_DIR"
echo "=========================================================="
