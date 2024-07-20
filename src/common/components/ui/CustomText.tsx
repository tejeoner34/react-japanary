interface CustomTextProps {
  tag: keyof JSX.IntrinsicElements;
  text: string;
  styles: string;
}

export default function CustomText({ tag: Tag, text, styles }: CustomTextProps) {
  return <Tag className={styles}>{text}</Tag>;
}

CustomText.defaultProps = {
  tag: 'p',
  styles: '',
  text: '',
};
