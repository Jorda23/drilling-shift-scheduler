import '@testing-library/jest-dom';

beforeEach(() => {
  Object.defineProperty(window, 'open', {
    writable: true,
    value: jest.fn(),
  });
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
  jest.useRealTimers();
});