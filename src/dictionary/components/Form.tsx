import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Input } from '../../common/components/ui/input';
import { Button } from '@/common/components/ui';

type FormProps = {
  value?: string;
  onSubmit: (value: string) => void;
  hasDeleteAction?: boolean;
};
export default function Form({ value = '', onSubmit, hasDeleteAction = false }: FormProps) {
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

  const _inputTpl = () => {
    return hasDeleteAction ? (
      <>
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="入力..."
            onChange={handleInputChange}
            value={inputValue}
          />
          <IoMdClose
            size={20}
            className="absolute bottom-0 top-0 right-3 m-auto"
            onClick={() => setinputValue('')}
          />
        </div>
      </>
    ) : (
      <>
        <Input type="text" placeholder="入力..." onChange={handleInputChange} value={inputValue} />
      </>
    );
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      {_inputTpl()}
      <Button type="submit" variant="primary">
        Search
      </Button>
    </form>
  );
}
