import CustomText from '@/common/components/ui/CustomText';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';

export default function DictionaryScreen() {
  const navigate = useNavigate();

  const handleSearch = (word: string) => {
    navigate(`search/${word}`);
  };
  return (
    <>
      <div className="z-100 fixed bottom-0 right-0 left-0 p-5 bg-backgroundSecondary max-w-md w-full md:relative md:p-0">
        <Form onSubmit={handleSearch} hasDeleteAction />
      </div>
      <div className="flex flex-col gap-3">
        <CustomText tag="h1" styles="text-4xl font-bold text-center" text="Japanese Dictionary" />
        <CustomText
          styles="text-center"
          text="Search for a word in Kanji, Hiragana or Katakana. Ex: 辞書"
        />
      </div>
    </>
  );
}
