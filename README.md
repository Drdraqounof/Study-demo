# StudyFlow

## Project Overview
StudyFlow is a productivity app designed to help students improve focus, organization, and time management. It provides tools like a focus timer, task management, and AI-powered research assistance to enhance study efficiency.

## Problem Summary
Students often struggle with managing their time effectively, staying focused, and organizing their study materials. StudyFlow addresses these challenges by offering a centralized platform with tools tailored to student needs.

## Features
- **Focus Timer**: Implements the Pomodoro technique to help students study in focused intervals.
- **Task Management**: Organize assignments and track deadlines.
- **Progress Tracking**: Visualize study patterns and time spent on each subject.
- **AI Integration**: 
  - Summarizes uploaded documents and images.
  - Provides explanations and answers questions about study materials.
- **User Authentication**: Secure login and signup functionality.
- **File Uploads**: Upload study materials for AI analysis.

## Tech Stack
- **Framework**: Next.js 16 (App Router, Server Actions)
- **Frontend**: React 19
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI API for research assistance
- **Database**: Prisma with PostgreSQL
- **Other Tools**: ESLint, Prettier, and PostCSS

## How to Run the Project
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd study
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables in a `.env` file:
   ```env
   DATABASE_URL=<your-database-url>
   OPENAI_API_KEY=<your-openai-api-key>
   JWT_SECRET=<your-jwt-secret>
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Reflection
### What Worked
- The integration of the AI assistant significantly enhanced the app's functionality, providing students with quick and accurate study assistance.
- The focus timer and task management features were well-received during testing, helping users stay organized and productive.

### What Didn’t Work
- Initial build errors and missing imports caused delays during development.
- The analytics feature was removed due to limited use and complexity.

### What We’d Improve
- Enhance the AI assistant to support more file formats and provide deeper insights.
- Improve the UI/UX for better accessibility and user engagement.
- Add more customization options for the focus timer and task management tools.

---

For more details, see the code in `app/page.tsx` and other app directories.
