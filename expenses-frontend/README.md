# Expenses Frontend

Angular frontend for the Expenses Tool application.

## Quick Start

```bash
# Install dependencies
npm install

# Development server (runs on http://localhost:4200)
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Development

When developing the frontend separately from the backend:

1. Start the Angular dev server: `npm start`
2. Configure API URLs in services to point to `http://localhost:8080`
3. Ensure CORS is enabled in the Spring Boot backend

## Integration with Spring Boot

The frontend is automatically built and integrated into the Spring Boot application during Maven build. The build output is copied to `src/main/resources/static/` so Spring Boot can serve it.

For more information, see the main [README.md](../README.md) in the project root.
