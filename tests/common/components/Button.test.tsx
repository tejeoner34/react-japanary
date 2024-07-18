import { render, screen } from '@testing-library/react';
import { Button } from '../../../src/common/components/ui';

describe('Button', () => {
  it('should render with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  //   it('should apply custom className', () => {
  //     const { getByRole } = render(<Button className="custom-class">Click me</Button>);
  //     const button = getByRole('button');
  //     expect(button).toHaveClass('custom-class');
  //   });

  //   it('should render as a different element when asChild is true', () => {
  //     const { getByRole } = render(
  //       <Button asChild>
  //         <a href="/">Link</a>
  //       </Button>
  //     );
  //     const link = getByRole('link');
  //     expect(link).toBeInTheDocument();
  //     expect(link).toHaveTextContent('Link');
  //   });

  //   it('should forward ref correctly', () => {
  //     const ref = React.createRef<HTMLButtonElement>();
  //     render(<Button ref={ref}>Click me</Button>);
  //     expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  //   });

  //   it('should apply variant styles', () => {
  //     const { getByRole } = render(<Button variant="outline">Click me</Button>);
  //     const button = getByRole('button');
  //     expect(button).toHaveClass('variant-outline');
  //   });

  //   it('should apply size styles', () => {
  //     const { getByRole } = render(<Button size="sm">Click me</Button>);
  //     const button = getByRole('button');
  //     expect(button).toHaveClass('size-sm');
  //   });
});
