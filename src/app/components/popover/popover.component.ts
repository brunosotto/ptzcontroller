import { Component, OnInit, Renderer2 } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  public darkmode: boolean;
  public versao = environment.appversion;

  async ngOnInit() {
    // tslint:disable-next-line: prefer-const
    let status = await JSON.parse(this.getConfDarkmode());
    this.darkmode = status.darkmode;
  }

  public onToogleColorChange(ev): void {
    if (ev.detail.checked) {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      this.setDarkmode(ev.detail.checked);
    } else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
      this.setDarkmode(ev.detail.checked);
    }
  }

  private setDarkmode(darkmodetheme?: boolean): Promise<void> {
    const setconfig = {
      darkmode: false
    };
    if (darkmodetheme) {
      setconfig.darkmode = darkmodetheme;
    }
    localStorage.setItem('darkmode', JSON.stringify(setconfig));
    return;
  }

  private getConfDarkmode(): any {
    return localStorage.getItem('darkmode');
  }

}
