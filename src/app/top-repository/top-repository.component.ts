import {Component, OnInit} from '@angular/core';
import {GitService} from '../git-service';
import {Observable, of} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {debug} from 'util';

@Component({
  selector: 'app-top-repository',
  templateUrl: './top-repository.component.html',
  styleUrls: ['./top-repository.component.less'],
})
export class TopRepositoryComponent implements OnInit {
  repositories: any[];
  constructor(private gitService: GitService) {}

  ngOnInit() {
    this.gitService.GetTopRepositories("LabShare", 7).subscribe(val => {
      // Filter out the duplicates
      this.repositories = val.map(item => item.Repo).filter((value, index, self) => self.indexOf(value) === index);
    });
  }
}
