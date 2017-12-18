import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { GodService } from '../services/god.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { God } from '../shared/models/god.model';

@Component({
  selector: 'app-gods',
  templateUrl: './gods.component.html',
  styleUrls: ['./gods.component.scss']
})
export class GodsComponent implements OnInit {

  god = new God();
  gods: God[] = [];
  isLoading = true;
  isEditing = false;

  addGodForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private godService: GodService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getGods();
    this.addGodForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight
    });
  }

  getGods() {
    this.godService.getGods().subscribe(
      data => this.gods = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addGod() {
    this.godService.addGod(this.addGodForm.value).subscribe(
      res => {
        this.gods.push(res);
        this.addGodForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(god: God) {
    this.isEditing = true;
    this.god = god;
  }

  cancelEditing() {
    this.isEditing = false;
    this.god = new God();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the gods to reset the editing
    this.getGods();
  }

  editGod(god: God) {
    this.godService.editGod(god).subscribe(
      () => {
        this.isEditing = false;
        this.god = god;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteGod(god: God) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.godService.deleteGod(god).subscribe(
        () => {
          const pos = this.gods.map(elem => elem._id).indexOf(god._id);
          this.gods.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
