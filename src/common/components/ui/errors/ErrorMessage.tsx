type ErrorMessageProps = {
  message: string;
};
export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className="text-error">{message}</p>;
}
