import { Injectable } from '@angular/core';

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
    title: ' ',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'candidate',
        title: 'Dashboard',
        type: 'item',
        url: 'candidate',
        icon: 'feather icon-user',
        classes: 'nav-item'
      },
      {
        id: 'add-candidate',
        title: 'Candidates',
        type: 'item',
        url: 'all-candidate',
        icon: 'feather icon-user-plus',
        classes: 'nav-item'
      },
      {
        id: 'dashboard',
        title: 'Lineup Interview',
        type: 'item',
        url: 'dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item'
      },
      {
        id: 'done-interview',
        title: 'Done Interview',
        type: 'item',
        url: 'done-interview',
        icon: 'feather icon-calendar',
        classes: 'nav-item'
      },
      {
        id: 'dashboard-graph',
        title: 'Reports',
        type: 'item',
        url: 'dashboard-graph',
        icon: 'feather icon-briefcase',
        classes: 'nav-item'
      },
      {
        id: 'create-user',
        title: 'Users',
        type: 'item',
        url: 'create-user',
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
