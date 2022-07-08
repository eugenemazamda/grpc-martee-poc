import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDtoInput, CreateUserDtoOutput } from './dto/create-user.dto';
import { FindByUserIdOutput } from './dto/find-by-userid.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDtoInput): Promise<CreateUserDtoOutput> {
    const { phone, email } = createUserDto;
    try {
      const existsEmail = await this.usersRepository.findOne({ where: {email} });
      const existsPhone = await this.usersRepository.findOne({ where: {phone}})
      if (!!existsEmail) {
        return { statuts: HttpStatus.CONFLICT, error: 'Email already exists!!!'};
      }
      if (!!existsPhone) {
        return { statuts: HttpStatus.CONFLICT, error: 'Phone number exists!!!'};
      }
      await this.usersRepository.save(
        this.usersRepository.create(createUserDto)
      );
      return { statuts: HttpStatus.CREATED, success: 'User account create successfull' };
    } catch  {
      return { statuts: HttpStatus.BAD_REQUEST, error: 'Cannot create an account user ;)'}
    }
  }

  // Find user by Id
  async findUserById(cognito_userId: string): Promise<FindByUserIdOutput> {
    try {
        const user = await this.usersRepository.findOne({ where: {cognito_userId}});
        
        if (!user) {
            return { statuts: HttpStatus.NOT_FOUND, error: 'User not found...'};
        }
        return { statuts: HttpStatus.OK, user };
    } catch (err) {
        return { statuts: HttpStatus.NOT_FOUND, error: 'Cannot find user...'};
    }
}

// validate user token 
async validateUser(decode: any): Promise<User> {
  return this.usersRepository.findOne(decode.id);
}

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
