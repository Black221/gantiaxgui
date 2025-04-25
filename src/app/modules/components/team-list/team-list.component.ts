import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Team } from '@core/services/team/team.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'module-pointages-team-list',
    templateUrl: './team-list.component.html'
})
export class TeamListComponent {
    // Search
    searchControl: FormControl = new FormControl('');
    filteredTeams: Team[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { teams: Team[], selectedTeam: Team, addTeam: boolean },
        private _matDialogRef: MatDialogRef<TeamListComponent>
    ) {
        this.filteredTeams = this.data.teams;

        // Set up search with debounce
        this.searchControl.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe((value) => {
                this.searchTeams(value);
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    openTeamCreationDialog(): void {
        this._matDialogRef.close('create');
    }
    /**
     * Select team
     *
     * @param team Selected team
     */
    selectTeam(team: Team): void {
        this._matDialogRef.close(team);
    }

    /**
     * Search teams
     */
    private searchTeams(value: string): void {
        if (!value) {
            this.filteredTeams = this.data.teams;
            return;
        }

        const searchValue = value.toLowerCase();
        this.filteredTeams = this.data.teams.filter(team => 
            team.name.toLowerCase().includes(searchValue)
        );
    }

    /**
     * Track by function for ngFor loops
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
