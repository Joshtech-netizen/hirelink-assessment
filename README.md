# HireLink Assessment

Built for The Digicoast Fellowship. Handles recruitment pipeline and candidate applications.

## 🛠 Tech Stack

- **Framework**: React 18 + TypeScript
- **State**: Zustand (with Persist Middleware)
- **Validation**: React Hook Form + Zod
- **Styling**: Tailwind CSS

## 🚀 Setup

1. `npm install`
2. `npm run dev`

## 🏗 Architectural Decisions

### 1\. Framework: React & TypeScript

I utilized **React** for its component-based architecture and **TypeScript** to ensure strict data modeling for candidates and job listings. This prevents runtime errors when passing application data between the candidate and admin views.

### 2\. State Management: Zustand

I chose **Zustand** as the primary state management tool. It provides a lightweight, performant alternative to Redux, allowing for easy updates to the recruitment pipeline board without excessive boilerplate.

### 3\. Styling: Tailwind CSS (v4)

Leveraging the latest **Tailwind CSS v4** allows for a CSS-first configuration, which reduces the complexity of the build pipeline while ensuring the UI is highly responsive for the Pipeline Board.

### 4\. Persistence: LocalStorage

To meet the persistence requirement, I implemented Zustand's persist middleware. This ensures that all applications and recruiter notes are saved locally in the browser, allowing for a fully functional demo without a backend.

## ✨ Features

### 1\. Candidate Experience

- **Job Listings:** A clean interface to browse available roles.

- **Multi-Step Application:** A guided 3-step form capturing personal info, professional experience, and resume uploads.

- **Dynamic Validation:** Step-by-step validation using **Zod** ensures data integrity before the user proceeds.

- **Submission Feedback:** Generates a unique frontend Application ID upon completion.

### 2\. Recruiter Experience (Admin)

- **Pipeline Board:** A Kanban-style board tracking candidates through stages: _Applied, Reviewed, Interview Scheduled,_ and _Offer Sent_.

- **Review Panel:** Detailed view of candidate data, including portfolio links, with the ability to assign scores (1-5) and internal notes.

- **Interview Scheduler:** Integrated date/time picker that automatically transitions candidate status.

- **Offer Management:** Ability to draft mock offer letters for successful candidates.

## 📦 Additional Stack Details

- **Framework:** React + Vite

- **State Management:** Zustand

- **Validation:** React Hook Form + Zod

- **Routing:** React Router DOM

- **Styling:** Tailwind CSS

## 3\. TESTING

- **Testing Suite:** Integrated Vitest for unit testing core business logic, including unique ID generation and global state transitions, ensuring high code reliability.
