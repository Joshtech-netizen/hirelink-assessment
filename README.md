# HireLink Assessment

Built for The Digicoast Fellowship. Handles recruitment pipeline and candidate applications.

## 🛠 Tech Stack
- **Framework**: React 18 + TypeScript
- **State**: Zustand (with Persist Middleware)
- **Validation**: React Hook Form + Zod
- **Styling**: Tailwind CSS

## 📋 Architectural Decisions
1. **Zustand over Redux**: Chosen for its simplicity and built-in persistence, which allowed me to meet the `localStorage` requirement without boilerplate.
2. **Schema-First Validation**: Using Zod ensures that the multi-step form data is consistent and valid before moving through the pipeline stages.
3. **Responsive UI**: Tailwind CSS was used to ensure the Pipeline Board is functional across various screen sizes.

## 🚀 Setup
1. `npm install`
2. `npm run dev`