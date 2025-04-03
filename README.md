# Mars Rover API

This is a Node.js API for controlling a Mars Rover, built using Test-Driven Development (TDD) principles with TypeScript and a clean architecture approach.

## Mars Rover Kata

The Mars Rover kata is a programming exercise with the following requirements:

- The rover moves on a 10x10 grid (coordinates from 0 to 9)
- The initial position of the rover is (0,0,N) - bottom left corner, facing North
- The rover can receive a sequence of commands:
  - `R` - Turn right
  - `L` - Turn left
  - `M` - Move forward
- The rover wraps around the edges of the grid
- The rover can detect obstacles and report them

## Project Architecture

The project follows Clean Architecture principles with the following structure:

- `src/domain/` - Core business entities (Rover, Grid, Position)
- `src/application/` - Application services and use cases
- `src/interfaces/` - API controllers and adapters

## TDD Approach

This project was developed using Outside-In TDD:

1. Start with high-level acceptance tests
2. Move to unit tests for specific components
3. Follow the Red-Green-Refactor cycle

## API Usage

```
POST /api/rover/execute
{
  "commands": "RMMLM"
}
```

Response:
```
{
  "position": "2:1:N"
}
```

If an obstacle is encountered, the response includes the obstacle flag:
```
{
  "position": "1:0:S:O"
}
```

## Setup and Running

### Local Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev
```

### Using Docker

```bash
# Build and start production container
docker compose up mars-rover-api

# Start development container with hot reloading
docker compose up dev

# Run tests
docker compose run test
```

### Running in CI/CD

The project includes GitHub Actions workflows for continuous integration. Every push to the main branch or pull request will:

1. Run linting checks
2. Run the test suite
3. Build the Docker container

## Technologies

- TypeScript
- Express.js
- Jest for testing
- Winston for logging
- Docker for containerization
- GitHub Actions for CI/CD
