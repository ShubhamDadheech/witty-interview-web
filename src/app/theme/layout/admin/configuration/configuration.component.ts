import { Component, OnInit } from '@angular/core';
import {DattaConfig} from '../../../../app-config';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  public styleSelectorToggle: boolean; // open configuration menu
  public layoutType: string; // layout type
  public rtlLayout: any; // rtl type
  public menuFixedLayout: any; // menu/navbar fixed flag
  public headerFixedLayout: any; // header fixed flag
  public boxLayout: any; // box layout flag
  public isColoredIcon: any; // menu icon color
  public headerBackgroundColor: string; // header background color
  public navbarBackgroundColor: string; // navbar background color
  public brandBackgroundColor: string; // brand/logo background color
  public navBackgorundImage: string; // navbar background image

  public menuDropdownIcon: string; // navbar background image
  public menuListIcon: string; // navbar background image

  public navActiveColor: string;
  public navTitleColor: string;
  public menuTitleHide: any;

  public dattaConfig: any;

  constructor() {}

  ngOnInit() {
    this.styleSelectorToggle = false;
    this.dattaConfig = DattaConfig.config;

    this.layoutType =  this.dattaConfig['layout-type'];
    this.setLayout(this.layoutType);

    this.isColoredIcon = this.dattaConfig['nav-icon-color'];
    this.changeIconColor(this.isColoredIcon);

    this.headerBackgroundColor = this.dattaConfig['header-back-color'];
    this.navbarBackgroundColor = this.dattaConfig['nav-back-color'];
    this.brandBackgroundColor = this.dattaConfig['nav-brand-color'];
    this.navBackgorundImage = this.dattaConfig['nav-back-image'];

    this.setHeaderBackground(this.headerBackgroundColor);
    this.setNavbarBackground(this.navbarBackgroundColor);
    this.setBrandBackground(this.brandBackgroundColor);
    this.setBackgroundImage(this.navBackgorundImage);

    this.rtlLayout = this.dattaConfig['rtl-layout'];
    this.changeRtlLayout(this.rtlLayout);

    this.menuFixedLayout = this.dattaConfig['nav-fixed-layout'];
    if (this.dattaConfig['layout'] === 'vertical') {
      this.changeMenuFixedLayout(this.menuFixedLayout);
    }

    this.headerFixedLayout = this.dattaConfig['header-fixed-layout'];
    this.changeHeaderFixedLayout(this.headerFixedLayout);

    this.boxLayout = this.dattaConfig['box-layout'];
    this.changeBoxLayout(this.boxLayout);

    this.menuDropdownIcon = this.dattaConfig['nav-dropdown-icon'];
    this.setMenuDropdownIcon(this.menuDropdownIcon);

    this.menuListIcon = this.dattaConfig['nav-list-icon'];
    this.setMenuListIcon(this.menuListIcon);

    this.navActiveColor = this.dattaConfig['nav-active-list-color'];
    this.setNavActiveColor(this.navActiveColor);

    this.navTitleColor = this.dattaConfig['nav-list-title-color'];
    this.setNavTitleColor(this.navTitleColor);

    this.menuTitleHide = this.dattaConfig['nav-list-title-hide'];
    this.changeMenuTitle(this.menuTitleHide);
  }

  // change main layout
  setLayout(layout) {
    document.querySelector('.pcoded-navbar').classList.remove('menu-light');
    document.querySelector('.pcoded-navbar').classList.remove('menu-dark');
    document.querySelector('.pcoded-navbar').classList.remove('navbar-dark');
    document.querySelector('body').classList.remove('datta-dark');
    this.layoutType = layout;
    if (layout === 'menu-light') {
      document.querySelector('.pcoded-navbar').classList.add(layout);
    }
    if (layout === 'dark') {
      document.querySelector('.pcoded-navbar').classList.add('navbar-dark');
      document.querySelector('body').classList.add('datta-dark');
    }
    if (layout === 'reset') {
      this.reset();
    }
  }

  reset() {
    document.querySelector('.pcoded-navbar').classList.remove('icon-colored');
    this.ngOnInit();
  }

  setColoredIcon(e) {
    const flag = !!(e.target.checked);
    this.changeIconColor(flag);
  }

  changeIconColor(flag) {
    if (flag) {
      document.querySelector('.pcoded-navbar').classList.add('icon-colored');
    } else {
      document.querySelector('.pcoded-navbar').classList.remove('icon-colored');
    }
  }

  setRtlLayout(e) {
    const flag = !!(e.target.checked);
    this.changeRtlLayout(flag);
  }

  changeRtlLayout(flag) {
    if (flag) {
      document.querySelector('body').classList.add('datta-rtl');
    } else {
      document.querySelector('body').classList.remove('datta-rtl');
    }
  }

  setMenuFixedLayout(e) {
    const flag = !!(e.target.checked);
    this.changeMenuFixedLayout(flag);
  }

  changeMenuFixedLayout(flag) {
    setTimeout(() => {
      if (flag) {
        document.querySelector('.pcoded-navbar').classList.remove('menupos-static');
        (document.querySelector('#nav-ps-datta') as HTMLElement).style.maxHeight = 'calc(100vh - 70px)';
      } else {
        document.querySelector('.pcoded-navbar').classList.add('menupos-static');
        (document.querySelector('#nav-ps-datta') as HTMLElement).style.maxHeight = '100%';
      }
    }, 100);
  }

  setHeaderFixedLayout(e) {
    const flag = !!(e.target.checked);
    this.changeHeaderFixedLayout(flag);
  }

  changeHeaderFixedLayout(flag) {
    if (flag) {
      document.querySelector('.pcoded-header').classList.add('headerpos-fixed');
      document.querySelector('.pcoded-header').classList.add('header-blue');
    } else {
      document.querySelector('.pcoded-header').classList.remove('headerpos-fixed');
    }
  }

  setBoxLayout(e) {
    const flag = !!(e.target.checked);
    this.changeBoxLayout(flag);
  }

  changeBoxLayout(flag) {
    if (flag) {
      document.querySelector('body').classList.add('container');
      document.querySelector('body').classList.add('box-layout');
    } else {
      document.querySelector('body').classList.remove('box-layout');
      document.querySelector('body').classList.remove('container');
    }
  }

  hideMenuTitle(e) {
    const flag = !!(e.target.checked);
    this.changeMenuTitle(flag);
  }

  changeMenuTitle(flag) {
    if (flag) {
      document.querySelector('.pcoded-navbar').classList.add('caption-hide');
    } else {
      document.querySelector('.pcoded-navbar').classList.remove('caption-hide');
    }
  }

  setHeaderBackground(background) {
    this.headerBackgroundColor = background;
    document.querySelector('.pcoded-header').classList.remove('header-blue');
    document.querySelector('.pcoded-header').classList.remove('header-red');
    document.querySelector('.pcoded-header').classList.remove('header-purple');
    document.querySelector('.pcoded-header').classList.remove('header-lightblue');
    document.querySelector('.pcoded-header').classList.remove('header-dark');
    if (background !== 'header-default') {
      document.querySelector('.pcoded-header').classList.add(background);
    }
  }

  setNavbarBackground(background) {
    this.navbarBackgroundColor = background;
    document.querySelector('.pcoded-navbar').classList.remove('navbar-blue');
    document.querySelector('.pcoded-navbar').classList.remove('navbar-red');
    document.querySelector('.pcoded-navbar').classList.remove('navbar-purple');
    document.querySelector('.pcoded-navbar').classList.remove('navbar-lightblue');
    document.querySelector('.pcoded-navbar').classList.remove('navbar-dark');

    // add default menu brand background color
    document.querySelector('.pcoded-navbar').classList.add('brand-default');
    if (background !== 'navbar-default') {
      document.querySelector('.pcoded-navbar').classList.add(background);
    }
  }

  setBrandBackground(background) {
    this.brandBackgroundColor = background;
    document.querySelector('.pcoded-navbar').classList.remove('brand-default');
    document.querySelector('.pcoded-navbar').classList.remove('brand-blue');
    document.querySelector('.pcoded-navbar').classList.remove('brand-red');
    document.querySelector('.pcoded-navbar').classList.remove('brand-purple');
    document.querySelector('.pcoded-navbar').classList.remove('brand-lightblue');
    document.querySelector('.pcoded-navbar').classList.remove('brand-dark');
    if (background !== 'brand-default') {
      document.querySelector('.pcoded-navbar').classList.add(background);
    }
  }

  setBackgroundImage(image) {
    document.querySelector('.pcoded-navbar').classList.remove('navbar-image-1');
    document.querySelector('.pcoded-navbar').classList.remove('navbar-image-2');
    document.querySelector('.pcoded-navbar').classList.remove('navbar-image-3');
    document.querySelector('.pcoded-navbar').classList.remove('navbar-image-4');
    document.querySelector('.pcoded-navbar').classList.remove('navbar-image-5');
    if (image) {
      this.navBackgorundImage = image;
      document.querySelector('.pcoded-navbar').classList.add(image);
    }
  }

  setMenuDropdownIcon(icon) {
    document.querySelector('.pcoded-navbar').classList.remove('drp-icon-style1');
    document.querySelector('.pcoded-navbar').classList.remove('drp-icon-style2');
    document.querySelector('.pcoded-navbar').classList.remove('drp-icon-style3');
    if (icon !== 'style1') {
      document.querySelector('.pcoded-navbar').classList.add('drp-icon-' + icon);
    }
  }

  setMenuListIcon(icon) {
    document.querySelector('.pcoded-navbar').classList.remove('menu-item-icon-style1');
    document.querySelector('.pcoded-navbar').classList.remove('menu-item-icon-style2');
    document.querySelector('.pcoded-navbar').classList.remove('menu-item-icon-style3');
    document.querySelector('.pcoded-navbar').classList.remove('menu-item-icon-style4');
    document.querySelector('.pcoded-navbar').classList.remove('menu-item-icon-style5');
    document.querySelector('.pcoded-navbar').classList.remove('menu-item-icon-style6');
    if (icon !== 'style1') {
      document.querySelector('.pcoded-navbar').classList.add('menu-item-icon-' + icon);
    }
  }

  setNavActiveColor(style) {
    document.querySelector('.pcoded-navbar').classList.remove('active-default');
    document.querySelector('.pcoded-navbar').classList.remove('active-blue');
    document.querySelector('.pcoded-navbar').classList.remove('active-red');
    document.querySelector('.pcoded-navbar').classList.remove('active-purple');
    document.querySelector('.pcoded-navbar').classList.remove('active-dark');
    if (style !== 'active-default') {
      this.navActiveColor = style;
      document.querySelector('.pcoded-navbar').classList.add(style);
    }
  }

  setNavTitleColor(style) {
    document.querySelector('.pcoded-navbar').classList.remove('title-default');
    document.querySelector('.pcoded-navbar').classList.remove('title-blue');
    document.querySelector('.pcoded-navbar').classList.remove('title-red');
    document.querySelector('.pcoded-navbar').classList.remove('title-purple');
    document.querySelector('.pcoded-navbar').classList.remove('title-lightblue');
    document.querySelector('.pcoded-navbar').classList.remove('title-dark');
    if (style !== 'title-default') {
      this.navTitleColor = style;
      document.querySelector('.pcoded-navbar').classList.add(style);
    }
  }

}
