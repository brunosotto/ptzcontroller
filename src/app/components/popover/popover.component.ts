import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {}

onToogleColorChange(ev){
    const target = ev.detail.checked;
    console.log(target);
    if ( target ){

      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      // document.body.setAttribute('color-theme', 'dark');
    } else {
       this.renderer.setAttribute(document.body, 'color-theme', 'light');
      //  document.body.setAttribute('color-theme', 'light');
    }
  }
}
