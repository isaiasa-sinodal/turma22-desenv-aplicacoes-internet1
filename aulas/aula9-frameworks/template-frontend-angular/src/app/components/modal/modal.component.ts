import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class ModalComponent implements AfterViewInit, OnChanges {
  @Input() title?: string;
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();

  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;

  ngAfterViewInit(): void {
    this.syncDialogState();
    this.dialogRef.nativeElement.addEventListener('close', () => {
      this.onClose.emit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.dialogRef) {
      this.syncDialogState();
    }
  }

  private syncDialogState() {
    const dialog = this.dialogRef.nativeElement;
    if (this.isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!this.isOpen && dialog.open) {
      dialog.close();
    }
  }

  handleClose() {
    this.onClose.emit();
    this.dialogRef.nativeElement.close();
  }
}
