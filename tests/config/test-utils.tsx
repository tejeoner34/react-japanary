/* eslint-disable react-refresh/only-export-components */

import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AllProviders } from './contextProviders';

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
