import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Input } from '../../common/components/ui/input';
import { Button } from '@/common/components/ui';

type FormProps = {
  value?: string;
  onSubmit: (value: string) => void;
};
export default function Form({ value = '', onSubmit }: FormProps) {
  const [inputValue, setinputValue] = useState(value);

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (inputValue.length) {
      onSubmit(inputValue.trim());
    }
  };

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setinputValue(ev.target.value);
  };

  useEffect(() => {
    setinputValue(value);
  }, [value]);

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input type="text" placeholder="入力..." onChange={handleInputChange} value={inputValue} />
      <Button type="submit" variant="primary">
        Search
      </Button>
    </form>
  );
}
