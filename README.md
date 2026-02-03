# HireLink - Fellowship Frontend Assessment

HireLink is a robust recruitment management system built for **The Digicoast Fellowship**. It manages the end-to-end hiring journey, featuring a multi-step candidate application flow and a recruiter-facing pipeline management board.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository: `git clone <your-repo-url>`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## 🛠 Tech Stack & Architecture

### Framework: React + TypeScript
[cite_start]I chose **React** for its component-based architecture and **TypeScript** to ensure type safety across the candidate data models, reducing runtime errors[cite: 52].

### State Management: Zustand
For global state, I implemented **Zustand** over Redux. [cite_start]It provides a more lightweight and boilerplate-free solution for managing the candidate pipeline while fulfilling the state management requirement[cite: 53].

### Persistence: LocalStorage Middleware
To meet the requirement for persistence, I utilized Zustand's `persist` middleware. [cite_start]This ensures that application data survives page refreshes without needing a backend[cite: 54].

### Validation: React Hook Form + Zod
- [cite_start]**Zod:** Used to define a strict schema for the multi-step form (Email format, character limits, and required fields)[cite: 18, 19, 20, 21].
- [cite_start]**React Hook Form:** Handles step-by-step validation logic to prevent users from proceeding without completing required fields[cite: 22].

## 📂 Features

### 1. Candidate Experience
- [cite_start]**Job Listings:** Dynamic list of open roles[cite: 9].
- [cite_start]**Multi-Step Application:** 3-step form handling Personal Info, Experience, and Resume Upload[cite: 14, 15, 16, 17].
- [cite_start]**Submission Feedback:** Automatic generation of a unique application ID and a custom Thank You page[cite: 23, 24, 25].

### 2. Recruiter Experience
- [cite_start]**Pipeline Board:** Visual Kanban-style board with stages: Applied, Reviewed, Interview Scheduled, and Offer Sent[cite: 33, 34].
- [cite_start]**Review Panel:** Ability to score candidates (1-5) and add internal notes[cite: 41, 43, 44].
- [cite_start]**Interview Scheduler:** Integrated date/time picker that automatically transitions candidate state[cite: 45, 46, 47].
- [cite_start]**Offer Management:** Mock offer letter generation and status tracking[cite: 48, 49, 50].

## 📝 Design Decisions
- **Separation of Concerns:** Component logic is separated into `public/` (Candidate) and `admin/` (Recruiter) directories.
- **UX Focus:** Implemented smooth transitions between form steps and visual feedback for every state change.