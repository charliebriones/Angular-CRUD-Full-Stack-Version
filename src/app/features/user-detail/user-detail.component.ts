import { Component, inject } from '@angular/core';
import { baseImports } from '../../shared/base-imports';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.interface';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'user-detail',
  styleUrls: ['user-detail.component.scss'],
  imports: [...baseImports],
  templateUrl: 'user-detail.component.html',
})
export class UserDetail {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  user$!: Observable<User | undefined>;

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.user$ = this.userService.getUserById(id).pipe(
      map((userDto) =>
        userDto
          ? {
              id: userDto.id!,
              name: userDto.name ?? '',
              username: userDto.username ?? '',
              email: userDto.email ?? '',
            }
          : undefined,
      ),
    );
  }
}
