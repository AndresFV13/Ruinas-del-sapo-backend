import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('/users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    async getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }
}
