import { render } from './utils/test-utils';
import { describe, it } from 'vitest';
import App from './App';

describe('Test', () => {
  it('checking whether vite and react text is available', () => {
    render(<App />);
  });
});
