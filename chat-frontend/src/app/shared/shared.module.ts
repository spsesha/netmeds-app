import { NgModule } from '@angular/core';
import { MatSlideToggleModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatCardModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule
  ]
})
export class SharedModule { }
