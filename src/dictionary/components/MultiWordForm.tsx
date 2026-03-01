import { ChangeEvent, FormEvent, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Input } from '../../common/components/ui/input';
import { Button } from '@/common/components/ui';

type MultiWordFormProps = {
  /** initial list of words */
  values?: string[];
  /** called when the user wants to compare the current words */
  onSubmit: (words: string[]) => void;
};

export default function MultiWordForm({ values = [], onSubmit }: MultiWordFormProps) {
  const [words, setWords] = useState<string[]>(values);
  const [inputValue, setInputValue] = useState('');
  const maxWords = 10;

  const handleAdd = (ev: FormEvent) => {
    ev.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (words.length >= maxWords) {
      return;
    }

    setWords((prev) => [...prev, trimmed]);
    setInputValue('');
  };

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value);
  };

  const handleRemove = (index: number) => {
    setWords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCompare = () => {
    if (words.length === 0) return;
    console.log('Comparing words:', words);
    onSubmit(words);
  };

  return (
    <div className="w-full">
      {words.length > 0 && (
        <ul className="mt-3 space-y-1">
          {words.map((word, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between bg-backgroundSecondary p-2 rounded"
            >
              <span>{word}</span>
              <button
                type="button"
                className="p-1"
                aria-label={`remove ${word}`}
                data-testid="remove-icon"
                onClick={() => handleRemove(idx)}
              >
                <IoMdClose size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <form className="flex gap-2" onSubmit={handleAdd}>
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="入力..."
            onChange={handleInputChange}
            value={inputValue}
            disabled={words.length >= maxWords}
          />
        </div>
        <Button type="submit" variant="primary" disabled={words.length >= maxWords}>
          Add
        </Button>
      </form>

      <Button
        className="mt-4 w-full"
        variant="secondary"
        onClick={handleCompare}
        disabled={words.length === 0}
      >
        Compare
      </Button>
    </div>
  );
}
