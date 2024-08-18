import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/common/components/ui/DropdownMenu';

import CustomText from './CustomText';

interface Item {
  name: string;
  icon?: React.ReactNode;
  action: () => void;
}
interface CustomDropdownMenuProps {
  items: Item[];
  children: React.ReactNode;
}

export default function CustomDropdownMenu({ items, children }: CustomDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {items.map(({ name, icon, action }, index, array) => (
          <div key={index}>
            <DropdownMenuItem onClick={action}>
              {icon}
              <CustomText tag="p" text={name} />
            </DropdownMenuItem>
            <DropdownMenuSeparator className={`${index === array.length - 1 && 'hidden'}`} />
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
