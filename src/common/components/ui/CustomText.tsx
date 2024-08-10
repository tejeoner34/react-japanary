interface CustomTextProps {
  tag: keyof JSX.IntrinsicElements;
  text: string;
  styles: string;
}

const stylesByTag: Record<string, string> = {
  h1: 'text-4xl font-bold text-center',
  h2: 'text-3xl font-bold text-center',
  h3: 'text-2xl font-bold text-center',
  h4: '',
  h5: '',
  p: 'text-center',
};

export default function CustomText({ tag: Tag, text, styles }: CustomTextProps) {
  const tagStyle = stylesByTag[Tag] || '';
  return <Tag className={`${styles} ${tagStyle}`}>{text}</Tag>;
}

CustomText.defaultProps = {
  tag: 'p',
  styles: '',
  text: '',
};
