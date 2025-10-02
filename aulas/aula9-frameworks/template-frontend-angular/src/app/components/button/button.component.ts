import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  standalone: true,
})
export class ButtonComponent {
  @Input() size: 'sm' | 'lg' = 'lg';
  @Input() className = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
