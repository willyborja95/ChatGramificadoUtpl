import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatDialog,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
    MatTableModule,
    MatSnackBarModule,
    MatTooltipModule,
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTabsModule,
        MatMenuModule,
        MatGridListModule,
        MatTableModule,
        MatSnackBarModule,
        MatTooltipModule,
    ],
    exports: [
        MatTabsModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatMenuModule,
        MatTableModule,
        MatSnackBarModule,
        MatTooltipModule,
    ],
    declarations: [],
    providers: [
        MatDialog
    ]
})
export class MaterialModule { }