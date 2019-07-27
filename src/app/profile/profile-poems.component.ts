import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PoemListConfig, Profile } from '../core';

@Component({
  selector: 'app-profile-poems',
  templateUrl: './profile-poems.component.html'
})
export class ProfilePoemsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  profile: Profile;
  poemsConfig: PoemListConfig = {
    type: 'all',
    filters: {}
  };

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.poemsConfig = {
          type: 'all',
          filters: {}
        }; // Only method I found to refresh article load on swap
        this.poemsConfig.filters.author = this.profile.username;
      }
    );
  }

}
