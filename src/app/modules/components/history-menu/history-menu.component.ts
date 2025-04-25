import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MemberFormComponent } from "../member-form/member-form.component";
import { Team } from "@core/services/team/team.interface";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { Archive } from "@core/services/archive/archive.interface";

@Component({
    selector: 'app-history-menu',
    templateUrl: './history-menu.component.html',
})
export class HistoryMenuComponent implements OnInit {
    
    searchControl: FormControl = new FormControl('');
    filteredArchive: Archive[] = [];
    items: Archive[] = [];
    selectedArchiveId: string;
    date!: Date;
    

    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: { 
            itemId: string,
            items: Archive[],
        },
        private _matDialogRef: MatDialogRef<MemberFormComponent>
    ) {
        this.selectedArchiveId = this._data.itemId;
    }

    ngOnInit(): void {
        
        this.filteredArchive = this._data.items;
        this.items = this._data.items;

        // Set up search with debounce
        this.searchControl.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe((value) => {
                this.searchArchive(value);
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * Select team
     *
     * @param team Selected team
     */
    selectArchive(archive: Archive): void {
        this._matDialogRef.close(archive);
    }

    /**
     * Search items
     */
    private searchArchive(value: string): void {
        if (!value) {
            this.filteredArchive = this._data.items;
            return;
        }

        const searchValue = value.toLowerCase();
        this.filteredArchive = this._data.items.filter(item => 
            item.title.toLowerCase().includes(searchValue)
        );
    }

    /**
     * Track by function for ngFor loops
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    changeDate(date: Date) {
        this.date = date;
        // this.fetchHistory();
    }
}