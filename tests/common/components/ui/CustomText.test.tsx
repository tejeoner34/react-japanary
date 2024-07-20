import CustomText from '@/common/components/ui/CustomText';
import { render, screen } from '@testing-library/react';

describe('CustomText', () => {
  it('should render with default tag (p) if not specified', () => {
    render(<CustomText text="Hello" styles="custom-style" />);
    const element = screen.getByText('Hello');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('P');
    expect(element).toHaveClass('custom-style');
  });

  it('should render with specified tag', () => {
    render(<CustomText tag="h1" text="Title" styles="title-style" />);
    const element = screen.getByText('Title');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('H1');
    expect(element).toHaveClass('title-style');
  });

  it('should render without styles if not provided', () => {
    render(<CustomText text="Paragraph" />);
    const element = screen.getByText('Paragraph');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('P');
    const className = element.className;
    expect(className).toBe('');
  });
});
