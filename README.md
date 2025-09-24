# Personal Job Tracker

A simple React app to track job applications, resumes, and cover letters. Includes filtering by status (Applied, Interviewed, Rejected) and favorites, with persistent storage in the browser via IndexedDB.

## Demo

View the live demo: https://cpeterson27.github.io/job-tracker/

## Features

- Add, edit, and delete jobs

- Mark jobs as favorites with hearts

- Track job status: Applied, Interviewed, Rejected

- Upload resumes and cover letters (PDF/DOC) locally

- Assign resumes/cover letters to specific job applications

- Notes for each job

- All data persists locally in the browser using IndexedDB

- Responsive, interactive job cards with hover effects

## Getting Started

These instructions will help you get a local copy running.

### Prerequisites

- Node.js v18+

- npm or yarn

### Usage

- Navigate between Profile and Jobs pages using the navbar.

-- Upload resumes and cover letters on the Profile page.

- Add new job applications or edit existing ones on the Jobs page.

- Use the filter buttons (All, Favorites, Applied, Interviewed, Rejected) to view jobs by status.

- Click the heart on a job card to mark as favorite; favorites persist even after page refresh.

## Demo
https://cpeterson27.github.io/job-tracker/profile

### Installation

Install

Clone the repo:

git clone https://github.com/cpeterson27/job-tracker.git
cd job-tracker


Install dependencies:

npm install


Run locally:

npm run dev


The app should now be available at http://localhost:5173/.

## Deployment

The app is configured to deploy on GitHub Pages:

npm run build
npm install -g gh-pages
gh-pages -d dist


Or using the deploy script:

npm run deploy


The live site will be available at:

https://cpeterson27.github.io/job-tracker/

License

MIT License