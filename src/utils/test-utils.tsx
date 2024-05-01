import { cleanup, render, RenderOptions } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

afterEach(() => {
  cleanup();
});

type WrapperProps = {
  children: ReactNode;
};

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) {
  const Wrapper: React.FC<WrapperProps> = ({ children }) => (
    <Router>
      <Provider store={store}>{children}</Provider>
    </Router>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
