import "@testing-library/jest-dom";
import { afterAll, beforeAll, afterEach } from "vitest";
import { server } from "./mocks/server";


beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());