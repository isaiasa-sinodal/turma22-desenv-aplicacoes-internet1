import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { ModalComponent } from './modal/modal.component';
import { InputComponent } from './input/input.component';

@NgModule({
  imports: [ButtonComponent, InputComponent, ModalComponent],
  exports: [ButtonComponent, InputComponent, ModalComponent],
})
export class ComponentsModule {}
