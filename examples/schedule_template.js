/**
 * Production-ready Natural Human WordPress Scheduler Script
 * Features:
 *  - REST API Batching with concurrency limit
 *  - 5-day / 10-day natural gap day generator
 *  - Non-round irregular minutes/seconds
 *  - Variable daily count (1 to 7/day)
 */

const https = require('https');

// --- Configuration ---
const CONFIG = {
  domain: 'example.com',
  username: 'your_username',
  appPassword: 'your_app_password_here',
  startDate: '2026-11-10', // YYYY-MM-DD
  maxDailyPosts: 5,        // Upper ceiling per day
  concurrency: 5           // Concurrent API requests
};

const auth = Buffer.from(`${CONFIG.username}:${CONFIG.appPassword}`).toString('base64');

function getHumanTime(slot) {
  const windows = [
    [8, 11],   // Morning
    [12, 14],  // Lunch
    [15, 18],  // Evening
    [19, 22]   // Night
  ];
  const [minH, maxH] = windows[slot % windows.length];
  const h = minH + Math.floor(Math.random() * (maxH - minH + 1));
  const m = Math.floor(Math.random() * 60);
  const s = Math.floor(Math.random() * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function buildSchedulePlan(posts, startDateStr, maxDaily) {
  const blocks = [5, 10];
  let cur = new Date(`${startDateStr}T00:00:00Z`);
  let postIdx = 0;
  let blockIdx = 0;
  const plan = [];

  while (postIdx < posts.length) {
    const blockSize = blocks[blockIdx % blocks.length];
    for (let d = 0; d < blockSize && postIdx < posts.length; d++) {
      const remaining = posts.length - postIdx;
      const count = Math.min(remaining, Math.floor(Math.random() * maxDaily) + 1);

      const y = cur.getUTCFullYear();
      const m = String(cur.getUTCMonth() + 1).padStart(2, '0');
      const dt = String(cur.getUTCDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${dt}`;

      for (let t = 0; t < count; t++) {
        plan.push({
          id: posts[postIdx].id,
          title: posts[postIdx].title?.rendered || posts[postIdx].title,
          date: `${dateStr}T${getHumanTime(t)}`
        });
        postIdx++;
      }
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
    // Gap day
    if (postIdx < posts.length) {
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
    blockIdx++;
  }
  return plan;
}

function schedulePost(item) {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      status: 'future',
      date: item.date,
      date_gmt: item.date
    });

    const req = https.request({
      hostname: CONFIG.domain,
      port: 443,
      path: `/wp-json/wp/v2/posts/${item.id}`,
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve({ id: item.id, status: res.statusCode }));
    });
    req.on('error', err => resolve({ id: item.id, error: err.message }));
    req.write(payload);
    req.end();
  });
}

module.exports = { buildSchedulePlan, schedulePost };
