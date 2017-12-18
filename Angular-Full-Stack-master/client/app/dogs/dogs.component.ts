import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DogService } from '../services/dog.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Dog } from '../shared/models/dog.model';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss']
})
export class DogsComponent implements OnInit {

  dog = new Dog();
  dogs: Dog[] = [];
  isLoading = true;
  isEditing = false;

  addDogsForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  Owner = new FormControl('', Validators.required);

  constructor(private dogService: DogService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getDogs();
    this.addDogsForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      Owner: this.Owner
    });
  }

  getDogs() {
    this.dogService.getDogs().subscribe(
      data => this.dogs = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addDog() {
    this.dogService.addDog(this.addDogsForm.value).subscribe(
      res => {
        this.dogs.push(res);
        this.addDogsForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(dog: Dog) {
    this.isEditing = true;
    this.dog = dog;
  }

  cancelEditing() {
    this.isEditing = false;
    this.dog = new Dog();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getDogs();
  }

  editDogs(dog: Dog) {
    this.dogService.editDogs(dog).subscribe(
      () => {
        this.isEditing = false;
        this.dog = dog;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteDogs(dog: Dog) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dogService.deleteDogs(dog).subscribe(
        () => {
          const pos = this.dogs.map(elem => elem._id).indexOf(dog._id);
          this.dogs.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
