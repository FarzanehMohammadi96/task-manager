# Task Manager

A modern, responsive task management application built with Next.js 15, TypeScript, and Zustand. Features include task creation, editing, deletion, search functionality, pagination, and dark mode support.

## Features

- **Task Management**: Create, edit, and delete tasks with validation
- **Search & Filter**: Search tasks by title
- **Pagination**: Efficient pagination for large task lists
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Type Safety**: Full TypeScript support with strict type checking
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Performance**: Optimized with React.memo, useCallback, and efficient state management

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: SCSS Modules with CSS variables
- **Icons**: Font Awesome
- **Notifications**: React Toastify
- **Form Handling**: React Hook Form with validation
- **API**: RESTful API integration

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── theme/            # Theme-related components
│   ├── loading/          # Loading components
│   ├── pagination/       # Pagination components
│   └── ...               # Other components
├── services/             # API services
├── store/                # Zustand store
├── styles/               # SCSS modules
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Design System

The application uses a consistent design system with:

- **Color Palette**: Blue primary, semantic colors for success/error states
- **Typography**: Geist font family with proper hierarchy
- **Dark Mode**: Complete dark mode support with proper contrast

## Configuration

### TypeScript Configuration

The project uses strict TypeScript configuration with:
- Strict mode enabled
- Proper type checking for all files

## Responsive Design

The application is fully responsive with breakpoints:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px

## Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Proper color contrast ratios


## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [Font Awesome](https://fontawesome.com/) for icons
- [React Hook Form](https://react-hook-form.com/) for form handling
