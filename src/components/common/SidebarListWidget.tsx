// src/components/common/SidebarListWidget.tsx
import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons'; // For passing icon components
import { RiArrowRightSLine } from 'react-icons/ri';

interface SidebarListItem {
  id: string;
  primaryText: string;
  secondaryText?: string;
  link: string;
}

interface SidebarListWidgetProps {
  title: string;
  items: SidebarListItem[];
  listIcon?: IconType; // Icon for each list item
  headerIcon?: IconType; // Icon for the widget header
  viewAllLink?: string;
  viewAllText?: string;
  maxItems?: number;
}

const SidebarListWidget: React.FC<SidebarListWidgetProps> = ({
  title,
  items,
  listIcon: ListItemIcon,
  headerIcon: HeaderIcon,
  viewAllLink,
  viewAllText = "View All",
  maxItems = 3 // Default to showing 3 items
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  const displayedItems = items.slice(0, maxItems);

  return (
    <div className="bg-app-surface rounded-card shadow-md p-4">
      <h3 className="text-md font-semibold text-app-text-base mb-3 flex items-center">
        {HeaderIcon && <HeaderIcon className="w-5 h-5 mr-2 text-app-primary" />}
        {title}
      </h3>
      <ul className="space-y-1">
        {displayedItems.map(item => (
          <li key={item.id}>
           
              <Link href={item.link} className="flex items-center p-2 rounded-md hover:bg-app-primary/5 group transition-colors">
                {ListItemIcon && <ListItemIcon className="w-4 h-4 mr-2.5 text-app-secondary flex-shrink-0" />}
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-medium text-app-text-muted group-hover:text-app-primary truncate leading-tight" title={item.primaryText}>
                    {item.primaryText}
                  </p>
                  {item.secondaryText && (
                    <p className="text-xs text-app-text-muted opacity-80 truncate" title={item.secondaryText}>
                      {item.secondaryText}
                    </p>
                  )}
                </div>
                <RiArrowRightSLine className="w-5 h-5 text-app-border flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 group-hover:text-app-primary transition-all" />
              </Link>
         
          </li>
        ))}
      </ul>
      {viewAllLink && items.length > maxItems && (
        <div className="mt-3 text-right">
          
            <Link href={viewAllLink} className="text-xs text-app-secondary hover:text-app-secondary-hover font-medium">
              {viewAllText} &rarr;
            </Link>
          
        </div>
      )}
    </div>
  );
};

export default SidebarListWidget;