# Task City

A productivity tracker that turns your daily habits into a city skyline. Log study sessions, workouts, and personal care — and watch your buildings grow.

Built for two brothers competing side by side.

---

## What it does

- **Log tasks** across three categories: Study, Workout, and Personal Care
- **Each 30 minutes = one building floor** — longer sessions mean taller towers
- **7-day skyline view** centered on today, so you can see your week at a glance
- **Two-player mode** — both users build towers side by side on the same screen, with distinct color palettes, so you can compare and compete
- **Three sky themes** — Night, Sunset, and Morning

---

## Activity categories

| Category | Activities |
|---|---|
| Study | DSA, LLD, System Design, Mock Interview, School, Personal Project |
| Workout | Weight Training, Running, Hiking, Sports |
| Personal Care | Bible, Book, Skincare |

---

## Building system

- 1 block = 30 minutes (hours × 2 blocks), capped at 20 floors
- Each day column has a unique iconic building cap based on its position in the week:
  Empire State, Chrysler, Transamerica Pyramid, Lotte Tower, US Bank Tower, Taipei 101, Burj Khalifa
- Caps only appear when a building has floors (empty days stay clean)

---

## Sky themes

| Theme | Description |
|---|---|
| Night | Dark navy sky, stars, crescent moon, shooting star |
| Sunset | Warm purple-to-orange gradient, sun near horizon |
| Morning | Light blue-to-peach gradient, bright sun, fluffy clouds |

---

## Tech stack

- React 18 + Vite 5
- No external UI libraries
- localStorage only — no backend, no database
- PST (America/Los_Angeles) timezone for all date logic, with auto midnight rollover

---

## Local development

```bash
npm install
npm run dev
```

Runs on `http://localhost:3000`

---

## Deploy

This is a static site. Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) by connecting your GitHub repo — no configuration needed.

---

## Data storage

All data lives in `localStorage` under these keys:

| Key | Contents |
|---|---|
| `tc_tasks_user1` | Task array for player 1 |
| `tc_tasks_user2` | Task array for player 2 |
| `tc_names` | Display names for both players |
| `tc_theme` | Active sky theme |

Each task: `{ id, userId, date (YYYY-MM-DD), category, subject, hours, createdAt }`
