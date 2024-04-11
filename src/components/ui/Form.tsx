import { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from './input';

type FormProps = {
  onSubmit: (value: string) => void;
};
export default function Form({ onSubmit }: FormProps) {
  const [inputValue, setinputValue] = useState('');

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (inputValue.length) {
      onSubmit(inputValue.trim());
    }
  };

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setinputValue(ev.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" placeholder="入力..." onChange={handleInputChange} />
    </form>
  );
}
