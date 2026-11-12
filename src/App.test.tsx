import App from './App';
import { render, screen } from '@testing-library/react';

test('Uses light theme when dark mode is not preferred', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /where thoughtful software systems/i }),
  ).toBeInTheDocument();
  expect(getComputedStyle(document.body).color).toBe('rgb(0, 0, 0)');
  expect(getComputedStyle(document.body).backgroundColor).toBe(
    'rgb(255, 255, 255)',
  );
});

test('Uses dark theme when dark mode is preferred', () => {
  const matchMediaDescriptor = Object.getOwnPropertyDescriptor(
    window,
    'matchMedia',
  );
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: jest.fn().mockImplementation((media: string) => ({
      matches: media === '(prefers-color-scheme: dark)',
      media,
      onchange: null,
      addListener: jest.fn(),
      dispatchEvent: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });

  try {
    render(<App />);
    expect(getComputedStyle(document.body).color).toBe('rgb(255, 255, 255)');
    expect(getComputedStyle(document.body).backgroundColor).toBe(
      'rgb(0, 0, 0)',
    );
  } finally {
    if (matchMediaDescriptor) {
      Object.defineProperty(window, 'matchMedia', matchMediaDescriptor);
    } else {
      delete (window as Partial<Window>).matchMedia;
    }
  }
});
