import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { baseImports } from '../../shared/base-imports';
import { UserDto } from '../../services/api-client';

@Component({
  selector: 'user-edit',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ...baseImports],
  styleUrls: ['user-edit.component.scss'],
  templateUrl: 'user-edit.component.html',
})
export class UserEdit {
  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id');

  userFormGroup = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string>('', [Validators.required]),
    username: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
  });

  get name() {
    return this.userFormGroup.get('name');
  }

  get username() {
    return this.userFormGroup.get('username');
  }

  get email() {
    return this.userFormGroup.get('email');
  }

  constructor() {
    const id = this.id;
    if (id) {
      this.userService.getUserById(+id).subscribe((user) => {
        if (!user) {
          console.log('User not found');
          return;
        }

        this.userFormGroup.patchValue(user);
      });
    }
  }

  createUser() {
    const newUser = this.userFormGroup.value;

    const user: UserDto = {
      id: newUser.id ?? undefined, // let server generate ID if creating
      name: newUser.name!,
      email: newUser.email!,
      username: newUser.username!,
    };

    if (!this.userFormGroup.valid) {
      this.userFormGroup.markAllAsTouched();
      return;
    }

    if (!this.id) {
      // CREATE
      this.userService.createUser(user).subscribe({
        next: (createdUser) => {
          console.log('User created', createdUser);
          this.router.navigate(['/users']);
        },
        error: (err) => console.error('Failed to create user', err),
      });
    } else {
      // UPDATE
      this.userService.updateUser(user.id!, user).subscribe({
        next: () => {
          console.log('User updated');
          this.router.navigate(['/users']);
        },
        error: (err) => console.error('Failed to update user', err),
      });
    }
  }
}
