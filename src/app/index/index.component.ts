import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  username = '';
  password = '';
  branches: any[] = [];
  financialYears: any[] = [];
  selectedBranch = '';
  selectedYear = '';
  isPasswordEnabled = false;
  isBranchEnabled = false;
  isYearEnabled = false;
  validUser = false;

  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  onUsernameBlur() {
    if (!this.username) {
      this.toastr.warning('Please enter Username');
      return;
    }

    this.api.checkUserExists(this.username).subscribe({
      next: (res : any) => {
        if (res.status === 'Success') {
          this.toastr.success('User Exists');
          this.isPasswordEnabled = true;
        } else {
          this.toastr.warning('Username Does not Exist');
          this.isPasswordEnabled = false;
        }
      },
      error: () => {
        this.toastr.error('Error validating username');
      }
    });
  }

  onPasswordBlur() {
    if (!this.password) {
      this.toastr.warning('Please enter Password');
      return;
    }

    this.api.validatePassword(this.username, this.password).subscribe({
      next: (res : any) => {
        if (res.status === 'Success') {
          this.toastr.success('Validated Successfully');
          this.validUser = true;
          this.isBranchEnabled = true;
          this.isYearEnabled = true;
          localStorage.setItem('token', 'QzY3dnpYQjZrU2ZWRElhTW5rN3F6UXFneDRPdmVoT1A=');
          this.fetchBranches();
        } else {
          this.toastr.warning('Validation Failed');
          this.validUser = false;
        }
      },
      error: () => {
        this.toastr.error('Error validating password');
      }
    });
  }

  fetchBranches() {
    this.api.getUserBranches(this.username).subscribe({
      next: (res :any) => {
        if (res.status === 'Success') {
          this.branches = res.response.filter((b: any) => b.BRANCH_VIEW === true);
          if (this.branches.length > 0) {
            this.selectedBranch = this.branches[0].BRANCH_CODE;
            this.onBranchChange();
          }
        } else {
          this.toastr.warning('Branches not available');
        }
      },
      error: () => {
        this.toastr.error('Error loading branches');
      }
    });
  }

  onBranchChange() {
    if (!this.selectedBranch) return;
    this.api.getFinancialYear(this.selectedBranch, this.username).subscribe({
      next: (res : any) => {
        if (res.status === 'Success') {
          this.financialYears = res.response.filter((f: any) => f.Status === 'Open');
          this.isYearEnabled = true;
          if (this.financialYears.length > 0) {
            this.selectedYear = this.financialYears[0].fyearcode;
          }
        } else {
          this.toastr.warning('Financial Year Not Retrieved');
        }
      },
      error: () => {
        this.toastr.error('Error loading financial years');
      }
    });
  }

  onSubmit() {
    if (this.validUser && this.selectedBranch && this.selectedYear) {
      this.router.navigate(['/product-details']);
    } else {
      this.toastr.warning('Please complete login process');
    }
  }
}
