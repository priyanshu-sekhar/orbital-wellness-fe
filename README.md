# Orbital Wellness Frontend

This project is a frontend application for the Orbital Wellness platform. It is built using Next.js, a popular React framework, and TypeScript, a statically typed superset of JavaScript. The application fetches and displays usage data from orbital wellness backend service.

## Project Structure

The project is structured as follows:

- `src/`: This directory contains the source code of the application.
  - `hooks/`: Contains custom React hooks used in the application.
  - `interface/`: Contains TypeScript interfaces used throughout the application.
  - `helpers/`: Contains helper functions.
- `test/`: Contains test files for the application.
- `jest.config.ts`: Configuration file for Jest, the testing framework used in this project.
- `package.json`: Defines the project's npm dependencies and scripts.

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the project dependencies by running `npm install`.
4. Start the development server by running `npm run dev`.

## Testing

This project uses Jest and the React Testing Library for testing. To run the tests, use the command `npm run test`.

## Linting

ESLint is used in this project to enforce code quality. To run the linter, use the command `npm run lint`.

## Building and Running in Production

To create a production build of the application, use the command `npm run build`. After the build is complete, you can start the application by running `npm run start`.

Please note that this application requires a running backend service to function correctly. Ensure that the backend service is running and accessible at the URL specified in the `useFetchUsageData` hook (`http://localhost:8000/usage` by default).

## Dependencies

This project uses several dependencies, including:

- `next`: The React framework used for building the application.
- `react` and `react-dom`: Libraries for building user interfaces.
- `date-fns`: A modern JavaScript date utility library.
- `jest-fetch-mock`: A fetch mock for Jest to enable easy mocking of fetch requests in tests.
- `recharts`: A composable charting library built on React components.
- `tailwindcss`: A utility-first CSS framework for rapidly building custom user interfaces.

For a full list of dependencies, refer to the `package.json` file.