# Bitespeed Chatbot

A modern chatbot interface built with Next.js, React Flow, Shadcn/ui, and Tailwind CSS.

## Features

- **React Flow Canvas**: Interactive flow-based interface for building chatbot conversations
- **Modern UI**: Clean white and light green theme using Shadcn/ui components
- **Responsive Design**: Organized layout with top bar and side panel
- **TypeScript**: Full type safety throughout the application


## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: High-quality, accessible UI components
- **React Flow**: Library for building node-based interfaces
- **Lucide React**: Beautiful, customizable icons

## Components

### TopBar
- Contains "Save Changes" button in the top right
- Clean white background with subtle border

### SidePanel
- Right-side panel with "Send Message" button
- Includes a messaging icon and organized layout
- Fixed width of 320px (80 in Tailwind units)

### FlowCanvas
- Full React Flow implementation with:
  - Dot pattern background
  - Controls for zoom/pan
  - MiniMap for navigation
  - Light gray background matching the theme
