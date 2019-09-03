import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/candidate',
        icon: 'feather icon-home',
        classes: 'nav-item'
      },
      {
        id: 'add-candidate',
        title: 'Add Candidate',
        type: 'item',
        url: '/add-candidate',
        icon: 'feather icon-box',
        classes: 'nav-item'
      },
      {
        id: 'dashboard',
        title: 'Future Interview',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item'
      },
      {
        id: 'done-interview',
        title: 'Done Interview',
        type: 'item',
        url: '/done-interview',
        icon: 'feather icon-users',
        classes: 'nav-item'
      }
    ]
  },
  
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
