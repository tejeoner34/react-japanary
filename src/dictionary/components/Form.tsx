import { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from '../../common/components/ui/input';
import { Button } from '@/common/components/ui';

type FormProps = {
  onSubmit: (value: string) => void;
};
export default function Form({ onSubmit }: FormProps) {
  const [inputValue, setinputValue] = useState('');

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (inputValue.length) {
      onSubmit(inputValue.trim());
      setinputValue('');
    }
  };

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setinputValue(ev.target.value);
  };
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input type="text" placeholder="入力..." onChange={handleInputChange} />
      <Button type="submit" variant="primary">
        Search
      </Button>
    </form>
  );
}
