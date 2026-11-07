---
name: natural-wordpress-scheduler
description: Master AI skill for Natural Human Editorial WordPress scheduling. Eliminates robotic footprint, simulates authentic human publishing patterns, enforces variable daily post counts (1 to 7/day), natural gap/off-days (5-day and 10-day cycles), randomized daylight/evening hours with non-round minutes and seconds, and seamlessly synchronizes Info and Commercial Best posts while safeguarding live published content.
---

# Natural WordPress Scheduler Skill
**Version:** 1.0.0  
**Framework:** Anti-AI Detection & Natural Editorial Simulation for WordPress  
**Target Search Engine:** Google Algorithm & Anti-Bot Footprint Prevention

---

## 1. Overview & Core Philosophy
Google's spam prevention and search algorithms analyze post frequency, interval regularity, and publishing timestamps to detect automated sites. Standard WordPress schedulers post at fixed mathematical intervals (e.g. exactly 3 posts every single day at 09:00:00, 15:00:00). This rigid clockwork pattern leaves a clear "automation footprint."

This skill enforces a **100% Natural Human Editorial Behavior** model:
- Post counts fluctuate day by day (e.g. Day 1: 4, Day 2: 2, Day 3: 5, Day 4: 1).
- Natural rest periods (Gap/Off-Days) break up continuous publishing strings.
- Publishing timestamps reflect realistic human active hours with jittered minutes and seconds.
- Informational and Commercial ("Best") review content are distributed harmoniously.
- Already published and indexed posts are strictly protected from status modification.

---

## 2. Core Operational Rules

### Rule 1: Variable Daily Post Count (প্রতিদিন ভিন্ন ভিন্ন সংখ্যা)
- **Constraint:** Never publish the exact same number of posts consecutive days.
- **Range:** Between 1 and a specified daily ceiling (default: 1 to 5, or maximum 7 posts per day).
- **Distribution:** Weighted natural human variation:
  - 1 post/day: ~15% of publishing days
  - 2 posts/day: ~20% of publishing days
  - 3 posts/day: ~25% of publishing days
  - 4 posts/day: ~20% of publishing days
  - 5 posts/day: ~10% of publishing days
  - 6-7 posts/day: ~10% of publishing days

### Rule 2: Natural Gap Days / Off-Days (বিরতির দিন — ০টি পোস্ট)
- Real human editorial teams and bloggers take regular breaks and holidays.
- **Cadence Cycle:**
  1. Publish for **5 consecutive days** $\rightarrow$ **1 Gap Day** (0 posts).
  2. Publish for **10 consecutive days** $\rightarrow$ **1 Gap Day** (0 posts).
  3. Repeat the $(5 \rightarrow 1 \rightarrow 10 \rightarrow 1)$ cycle continuously.
- On Gap Days, **zero** posts (neither Info nor Best) are published.

### Rule 3: Natural Human Timing & Jitter (অনিয়মিত সময় ও এলোমেলো মিনিট/সেকেন্ড)
- **Forbidden:** Round or clockwork times (e.g., `09:00:00`, `12:00:00`, `15:00:00`).
- **Active Daylight & Evening Windows:**
  - **Morning Window:** `08:15:00` – `11:45:00`
  - **Lunch / Early Afternoon:** `12:15:00` – `15:45:00`
  - **Late Afternoon / Evening:** `16:30:00` – `18:45:00`
  - **Night Window:** `19:30:00` – `22:45:00`
- **Jitter:** Every post must receive randomly generated minutes and seconds (e.g., `08:42:15`, `13:25:50`, `17:44:20`, `21:18:40`).
- **Minimum Spacing:** Posts scheduled on the same day must be separated by at least 2 to 3 hours.

### Rule 4: Content Synchronization (Info vs Commercial Best Posts)
- When a site contains both Informational Guides (How-to, Troubleshooting) and Commercial ("Best / Review") content:
  - Info posts maintain the primary baseline volume.
  - Commercial Best posts are placed at a controlled rate (typically 1 post per publishing day) in afternoon/evening slots.
  - Both types pause together on Gap Days.

### Rule 5: Strict SEO & Published Post Safeguard
- Posts with `post_status = 'publish'` must **NEVER** be reverted to draft or modified in schedule dates.
- Changing live indexed URLs will cause Googlebot `404 Not Found` errors and trigger rank drops.
- Only posts in `draft` or `future` status may be scheduled.
