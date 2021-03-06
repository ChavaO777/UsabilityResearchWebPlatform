import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-experiment-delete',
  templateUrl: './experiment-delete.component.html',
  styleUrls: ['./experiment-delete.component.css']
})
export class ExperimentDeleteComponent implements OnInit {

  constructor(
    private errorHandler: ErrorHandlerService,
    private crud: CrudService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

    console.log('Deleting');
    this.crud.delete(this.crud.models.EXPERIMENT, id)
    .subscribe(
      (res: Response) => {
        this.errorHandler.showInformativeMessage('Successfully deleted experiment.');
        this.router.navigate(['/experiments']);
      },
      (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
      }
    );
  }
}
