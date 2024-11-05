import { Button } from './button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './Dialog';

type ConfirmationDialogProps = {
  isVisible: boolean;
  onCloseVisibility: () => void;
  onSubmit: () => void;
  titleText: string;
};

function ConfirmationDialog({
  isVisible,
  titleText,
  onSubmit,
  onCloseVisibility,
}: ConfirmationDialogProps) {
  const handleSubmit = () => {
    onSubmit();
    onCloseVisibility();
  };

  return (
    <Dialog
      open={isVisible}
      onOpenChange={() => {
        onCloseVisibility();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{titleText}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <DialogFooter className="grid items-center gap-4">
          <Button variant="destructive" onClick={handleSubmit}>
            Confirm
          </Button>
          <Button onClick={onCloseVisibility}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationDialog;
