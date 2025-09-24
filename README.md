# Personal Job Tracker

A personal job application tracker built with React and Tailwind CSS, with local storage via IndexedDB.
Keep track of jobs you’ve applied to, mark favorites, manage resumes and cover letters, and log application details like status, contacts, and notes.

## Features

- Add, edit, and delete jobs

- - Mark jobs as favorites with hearts

Track job status: Applied, Interviewed, Rejected

- Upload resumes and cover letters (PDF/DOC) locally

- Assign resumes/cover letters to specific job applications

- Notes for each job

- All data persists locally in the browser using IndexedDB

- Responsive, interactive job cards with hover effects

## Pages

- Profile Page: Manage resumes and cover letters

- Jobs Page: View and filter job applications by status or favorites

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

### Installation

Clone the repository:

git clone https://github.com/cpeterson27/job-tracker.git

cd job-tracker


Install dependencies:

npm install
# or
yarn install


Start the development server:

npm run dev
# or
yarn dev


Open http://localhost:5173
 in your browser.

Building for Production
npm run build
# or
yarn build

Running the Production Build Locally
npm run preview
# or
yarn preview

# License

This project is MIT licensed.