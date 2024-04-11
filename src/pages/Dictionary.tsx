import Form from '@/components/ui/Form';

export default function Dictionary() {
  const handleSearch = (searchValue: string) => {
    console.log(searchValue);
  };
  return (
    <div className="container grid place-items-center p-5">
      <div className="max-w-md w-full">
        <Form onSubmit={handleSearch} />
      </div>
    </div>
  );
}
