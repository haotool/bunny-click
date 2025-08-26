# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bunny Click is a modern Progressive Web Application (PWA) click game built with vanilla JavaScript, featuring advanced visual effects, multi-threading, and comprehensive offline support. The project follows HaoTool.org brand standards and implements BDD (Behavior-Driven Development) methodology.

**Key Features:**
- Pure vanilla JavaScript ES6+ with modern web APIs
- PWA with Service Worker and offline-first architecture
- Multi-threading using Web Workers for visual effects
- Dual storage system (IndexedDB + LocalStorage fallback)
- Real-time TPS (Taps Per Second) calculation
- Single-player and dual-player game modes
- Advanced visual effects system with 10 lightning tiers

## Common Development Tasks

### Build and Development
```bash
# Development server with Vite
npm run dev                    # Start dev server on port 8000
npm start                     # Alias for npm run dev

# Production build
npm run build                 # Build for production using Vite
npm run preview               # Preview production build

# Testing
npm test                      # Run Jest unit tests
npm run test:watch           # Run tests in watch mode
npm run test:coverage        # Run tests with coverage
npm run test:ci              # CI-optimized test run
```

### Version Management
The project uses semantic versioning with automated update across all files:

```bash
# Version updates (auto-updates all files)
npm run version:patch        # 7.0.0 → 7.0.1
npm run version:minor        # 7.0.0 → 7.1.0  
npm run version:major        # 7.0.0 → 8.0.0

# Version verification
npm run check-version        # Check version consistency across files
npm run update-version-files # Manually sync version numbers

# Release workflow
npm run release             # Full release: build + test + semantic-release
```

### Code Quality and Linting
```bash
# ESLint
npm run lint                 # Check code style
npm run lint:check          # Strict linting (no warnings allowed)
npm run lint:fix            # Auto-fix linting issues

# Prettier formatting
npm run format              # Format all files
npm run format:check        # Check if files need formatting

# Comprehensive quality check
npm run code-quality:check  # Run all quality checks
npm run code-quality:fix    # Auto-fix quality issues
```

### Development Tools
```bash
# Project health monitoring
npm run health-check        # Check project health metrics
npm run maintenance         # Run maintenance tasks

# PWA testing
npm run test-pwa           # Test PWA functionality

# Git hooks management
npm run git-hooks:install  # Install Git hooks
npm run git-hooks:remove   # Remove Git hooks
npm run git-hooks:status   # Check hooks status
```

### Running Single Tests
```bash
# Run specific test file
npx jest tests/storage.test.js
npx jest tests/basic-functionality.test.js

# Run test matching pattern
npx jest --testNamePattern="TPS calculation"

# Run tests with specific timeout
npx jest --testTimeout=15000
```

## Architecture Overview

### Core Application Structure
```
bunny-click/
├── index.html              # Main game HTML with embedded styles/scripts
├── app.js                  # Core game engine and logic
├── fx.worker.js           # OffscreenCanvas effects worker
├── sw.js                  # Service Worker for PWA functionality
├── storage/               # Unified storage system
│   ├── adapter.js         # Storage adapter pattern implementation
│   ├── localStorage.js    # LocalStorage adapter
│   └── indexedDB.js       # IndexedDB adapter
└── scripts/               # Automation and utility scripts
```

### Key Architectural Patterns

**Multi-Threading Architecture:**
- Main thread handles game logic and UI updates
- Web Worker (`fx.worker.js`) processes visual effects using OffscreenCanvas
- Prevents blocking during intensive visual effect rendering

**Storage Adapter Pattern:**
- Unified `StorageAdapter` class provides consistent API
- Automatic fallback from IndexedDB to LocalStorage
- Graceful degradation for unsupported browsers

**PWA Architecture:**
- Service Worker with workbox strategies for caching
- Manifest file for app installation
- Offline-first design with cache-first strategies

**Game Engine Design:**
- Event-driven architecture with centralized state management
- Real-time TPS calculation using sliding window algorithm
- Modular audio system with Web Audio API

### Critical Dependencies and Technology Stack

**Build Tools:**
- Vite 5.4.2 for development and build pipeline
- vite-plugin-pwa 0.20.1 for PWA functionality
- Babel for ES6+ transpilation in tests

**Testing Framework:**
- Jest 29.7.0 with jsdom environment
- Custom module name mapping for ES6 imports
- Coverage reporting with v8 provider

**PWA Technologies:**
- Workbox 7.1.0 for Service Worker strategies
- Web App Manifest for installation
- Cache strategies: CacheFirst, NetworkFirst, StaleWhileRevalidate

**Modern Web APIs:**
- OffscreenCanvas for multi-threaded rendering
- IndexedDB with LocalStorage fallback
- Web Audio API for procedural sound generation
- Service Worker for offline functionality

## Special Configuration Notes

### Jest Configuration
The project uses a complex Jest setup to handle:
- ES6 modules with custom module name mapping
- Haste module conflict resolution (ignores `history/` directory)
- jsdom environment for DOM testing
- Custom file mocks for assets

### Vite Configuration
- PWA plugin with auto-update registration
- Comprehensive runtime caching strategies
- Build optimization with chunk naming
- Development server with file warming

### Storage System
The storage system automatically detects the best available storage:
1. IndexedDB (preferred) - for larger data and complex queries
2. LocalStorage (fallback) - for basic key-value storage
3. Memory storage (emergency fallback)

### Version Management System
Automated version management updates version numbers in:
- package.json
- app.webmanifest
- index.html meta tags
- Schema.org JSON-LD data
- Documentation files

## Development Guidelines

### Code Style
- Use vanilla JavaScript ES6+ (no frameworks)
- Follow existing patterns for consistency
- Maintain modular architecture with clear separation of concerns
- Use modern web APIs when available with graceful fallbacks

### Testing Requirements
- Write tests for new game logic and storage functionality
- Maintain coverage for core game mechanics
- Test PWA functionality and offline scenarios
- Use Jest with jsdom for DOM-dependent tests

### PWA Best Practices
- Always update Service Worker when making changes
- Test offline functionality after modifications
- Maintain cache strategies for different resource types
- Follow PWA audit recommendations

### Commit Message Standards
The project uses conventional commits for semantic versioning:
- `feat:` - New features (minor version bump)
- `fix:` - Bug fixes (patch version bump) 
- `docs:` - Documentation changes
- `style:` - Code formatting changes
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Test additions or modifications
- `chore:` - Build process or auxiliary tool changes
- `BREAKING CHANGE:` - Breaking changes (major version bump)

### File Structure Conventions
- Keep main game logic in single HTML file for simplicity
- Use storage/ directory for all storage-related modules
- Put automation scripts in scripts/ directory
- Maintain documentation in docs/ directory
- Use tests/ for all test files

## Performance Considerations

The application is optimized for 60fps performance with:
- Web Workers for heavy visual processing
- Efficient DOM updates with minimal reflows
- Optimized asset loading and caching
- Memory-conscious storage management

Target performance metrics:
- Initial load time: < 3s
- Click response time: < 50ms
- Lighthouse PWA score: > 90
- Memory usage: < 100MB sustained