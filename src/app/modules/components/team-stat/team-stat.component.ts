import { Component, Input } from "@angular/core";
import { TeamStat } from "@core/services/team/team.interface";


@Component({
    selector: 'app-team-stat',
    templateUrl: './team-stat.component.html',
    styles: `
        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        /* Firefox */
        input[type=number] {
            -moz-appearance: textfield;
        }
        
        /* width */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        /* Track */
        ::-webkit-scrollbar-track {
            @apply bg-default;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            @apply bg-primary-500; 
        }
        
        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            @apply bg-primary;
        }
    `,
})
export class TeamStatComponent {

    @Input() teamStat: TeamStat = {} as TeamStat;
    constructor() { }
}