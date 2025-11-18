import { LyricLine } from "@/types";

/**
 * Parse LRC format lyrics string to LyricLine array
 * LRC format: [mm:ss.xx]lyric text
 * Example: [00:12.50]Hello world
 */
export function parseLrcLyrics(lrcString: string): LyricLine[] {
  if (!lrcString?.trim()) return [];

  const lines = lrcString.split("\n");
  const lyrics: LyricLine[] = [];

  // Regular expression to match LRC format [mm:ss.xx]
  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;

  lines.forEach((line) => {
    line = line.trim();
    if (!line) return;

    // Extract all time tags from the line
    const timeMatches = Array.from(line.matchAll(timeRegex));

    if (timeMatches.length === 0) return;

    // Extract the lyric text (remove time tags)
    const lyricText = line.replace(timeRegex, "").trim();
    if (!lyricText) return;

    // Create a LyricLine for each time tag
    timeMatches.forEach((match) => {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const milliseconds = parseInt(match[3], 10);

      // Convert to seconds
      const startTime = minutes * 60 + seconds + milliseconds / 1000;

      lyrics.push({
        id: lyrics.length + 1,
        startTime,
        endTime: startTime + 3, // Default duration of 3 seconds
        text: lyricText,
      });
    });
  });

  // Sort by start time
  lyrics.sort((a, b) => a.startTime - b.startTime);

  // Update end times based on next lyric start time
  for (let i = 0; i < lyrics.length - 1; i++) {
    lyrics[i].endTime = lyrics[i + 1].startTime - 0.1;
  }

  return lyrics;
}

/**
 * Parse simple timestamped lyrics format
 * Format: [00:12]Hello world or 00:12 Hello world
 */
export function parseSimpleLyrics(lyricsString: string): LyricLine[] {
  if (!lyricsString?.trim()) return [];

  const lines = lyricsString.split("\n");
  const lyrics: LyricLine[] = [];

  // Regex to match [mm:ss] or mm:ss format
  const timeRegex = /(?:\[?(\d{2}):(\d{2})\]?)?\s*(.+)/;

  lines.forEach((line) => {
    line = line.trim();
    if (!line) return;

    const match = line.match(timeRegex);
    if (!match) return;

    const minutes = match[1] ? parseInt(match[1], 10) : 0;
    const seconds = match[2] ? parseInt(match[2], 10) : 0;
    const text = match[3]?.trim();

    if (!text) return;

    const startTime = minutes * 60 + seconds;

    lyrics.push({
      id: lyrics.length + 1,
      startTime,
      endTime: startTime + 3, // Default duration
      text,
    });
  });

  // Sort and update end times
  lyrics.sort((a, b) => a.startTime - b.startTime);

  for (let i = 0; i < lyrics.length - 1; i++) {
    lyrics[i].endTime = lyrics[i + 1].startTime - 0.1;
  }

  return lyrics;
}

/**
 * Auto-detect and parse lyrics format
 */
export function parseLyrics(lyricsString: string): LyricLine[] {
  if (!lyricsString?.trim()) return [];

  // Try LRC format first (contains [mm:ss.xx])
  if (lyricsString.includes("[00:") && lyricsString.includes(".")) {
    return parseLrcLyrics(lyricsString);
  }

  // Try simple format
  return parseSimpleLyrics(lyricsString);
}
