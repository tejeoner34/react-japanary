/* eslint-disable react-refresh/only-export-components */

import { ReactElement, ReactNode } from 'react';
import { render, renderHook, RenderHookOptions, RenderOptions } from '@testing-library/react';
import { AllProviders } from './contextProviders';

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options });

const customRenderHook = <TProps, TResult>(
  hook: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps>
) => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <AllProviders>{children}</AllProviders>
  );

  return renderHook(hook, { wrapper, ...options });
};

export * from '@testing-library/react';

export { customRender as render };
export { customRenderHook as renderHook };
