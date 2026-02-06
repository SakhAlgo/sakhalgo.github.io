# Workspace Overview

This repository contains various web development projects and examples created by our team. It serves as a collection of frontend layouts and mini-projects demonstrating different aspects of web development using HTML5, CSS3, JavaScript, and Bootstrap.

## Project Structure

The workspace consists of multiple subdirectories, each representing a different project or example:

- **bs_task**: A Bootstrap-focused task project
- **bwlanding**: A landing page project with CSS, fonts, images and JavaScript
- **dveri-master**: A comprehensive website project with multiple pages (index, about, catalog, contacts, etc.)
- **fclanding**: Another landing page project
- **fragment1** & **fragment2**: Design fragment projects
- **examples**: Contains Figma design examples
- **makets**: Contains archived versions of projects
- **miniproject**: A product management application with local storage functionality
- **test**: A simple test project
- **TestBroodstrap**: A Bootstrap-based test project

## Key Technologies

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3.8 (CSS and JS framework)
- Bootstrap Icons
- List.js (for search/filter functionality)
- SweetAlert2 (for enhanced alert dialogs)

## Miniproject Details

The miniproject directory contains a sophisticated product management application with the following features:

### Features
- Product inventory management with local storage persistence
- Add, remove, and transfer products between inventory and shopping cart
- Sorting functionality for tables (by clicking on column headers)
- Search functionality for products
- Discount calculation system
- Responsive design using Bootstrap grid system
- Confirmation dialogs for deletion operations

### Architecture
- **HTML**: Structured with Bootstrap classes for responsive layout
- **CSS**: Custom styles in main.css with Bootstrap for framework
- **JavaScript**: Main functionality in main.js with event handlers for:
  - Table sorting
  - Product CRUD operations
  - Local storage management
  - Discount calculations
  - Modal interactions

### Dependencies
The project uses the following npm packages:
- bootstrap: ^5.3.8
- bootstrap-icons: ^1.13.1
- list.js: ^2.3.1
- sweetalert2: ^11.26.17

## Development Setup

To work with any of the projects in this workspace:

1. Navigate to the specific project directory
2. Open the index.html file in a web browser to view the project
3. For projects that require dependencies, run `npm install` in the root directory

## Building and Running

Most projects in this workspace are static HTML/CSS/JS applications that can be run directly in a browser. For projects that utilize the dependencies listed in package.json:

```bash
# Install dependencies
npm install

# Then open index.html in the desired project directory
```

## Development Conventions

- Uses Bootstrap 5 for responsive design
- Implements local storage for client-side data persistence
- Follows semantic HTML structure
- Uses modular CSS with custom styles layered on top of Bootstrap
- JavaScript follows event-driven programming patterns
- Includes accessibility features through proper HTML semantics

## Special Features

- The miniproject implements advanced functionality including:
  - Dual-table interface (inventory and shopping cart)
  - Dynamic price calculations
  - Persistent storage using localStorage
  - Interactive modal forms
  - Sortable tables with memory of sort state
  - Input validation and user feedback