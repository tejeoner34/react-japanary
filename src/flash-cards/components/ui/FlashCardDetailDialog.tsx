import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/common/components/ui';
import CustomText from '@/common/components/ui/CustomText';
import { FlashCardModel } from '@/flash-cards/domain/models/flashCards.model';

type FlashCardDetailDialogProps = {
  flashCard: FlashCardModel;
  isVisible: boolean;
  onCloseVisibility: () => void;
};

export default function FlashCardDetailDialog({
  flashCard,
  isVisible,
  onCloseVisibility,
}: FlashCardDetailDialogProps) {
  return (
    <Dialog
      open={isVisible}
      onOpenChange={() => {
        onCloseVisibility();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{flashCard.front}</DialogTitle>
          <DialogDescription className="hidden">Flash card information dialog</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CustomText text={flashCard.back} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
