import CustomDropdownMenu from '@/common/components/ui/CustomDropdownMenu';
import CustomText from '@/common/components/ui/CustomText';
import { DeckModel } from '@/flash-cards/domain/models/deck.model';
import { EllipsisVertical, Pencil, X } from 'lucide-react';
import { DeckForm } from './DeckForm';
import { useState } from 'react';

interface DeckItemProps {
  deck: DeckModel;
  onClick: (deck: DeckModel) => void;
  onDelete: (deck: DeckModel) => void;
  onEdit: (deck: DeckModel) => void;
}

export default function DeckItem({ deck, onClick, onDelete, onEdit }: DeckItemProps) {
  const [isDeckFormVisible, setIsDeckFormVisible] = useState(false);

  const dropdownMenuItems = [
    {
      name: 'Edit deck',
      icon: <Pencil className="mr-2 h-4 w-4" />,
      action: () => setIsDeckFormVisible(true),
    },
    {
      name: 'Delete deck',
      icon: <X className="mr-2 h-4 w-4" />,
      action: () => onDelete(deck),
    },
  ];
  return (
    <div
      className="flex justify-between items-center gap-1 bg-backgroundTertiary p-4 rounded-md"
      role="button"
      tabIndex={0}
      onClick={() => onClick(deck)}
    >
      <div className="text-start">
        <CustomText tag="h4" text={deck.name} />
        <CustomText styles="opacity-80" text={deck.description} />
      </div>
      <div className="flex gap-3">
        <div>
          <CustomText
            styles="text-nowrap"
            text={`Study: ${String(deck.cards.pendingStudyAmount)}`}
          />
        </div>
        <CustomDropdownMenu items={dropdownMenuItems}>
          <EllipsisVertical role="button" tabIndex={0} />
        </CustomDropdownMenu>
      </div>
      <DeckForm
        isVisible={isDeckFormVisible}
        mode="edit"
        deck={deck}
        onCloseVisibility={() => setIsDeckFormVisible(false)}
        onSubmit={onEdit}
      />
    </div>
  );
}
