import CustomDropdownMenu from '@/common/components/ui/CustomDropdownMenu';
import CustomText from '@/common/components/ui/CustomText';
import { Deck } from '@/flash-cards/domain/models/deck.model';
import { EllipsisVertical, Pencil } from 'lucide-react';

interface DeckItemProps {
  deck: Deck;
}

export default function DeckItem({ deck }: DeckItemProps) {
  const dropdownMenuItems = [
    {
      name: 'Edit deck',
      icon: <Pencil className="mr-2 h-4 w-4" />,
      action: () => {},
    },
  ];
  return (
    <div className="flex justify-between items-center bg-backgroundTertiary p-4 rounded-md">
      <div className="text-start">
        <CustomText tag="h4" text={deck.name} />
        <CustomText styles="opacity-80" text={deck.description} />
      </div>
      <div>
        <CustomDropdownMenu items={dropdownMenuItems}>
          <EllipsisVertical />
        </CustomDropdownMenu>
      </div>
    </div>
  );
}
