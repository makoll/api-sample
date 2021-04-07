import { UserEntity } from '@/entities/User';
import { IUserRepository } from '@/interfaces/databases/repositories/user/IUserRepository';
import { Usecase } from '@/usecases';

export class UpdateUserUseCase extends Usecase {
  private userRepository: IUserRepository;

  public constructor(userRepository: IUserRepository) {
    super();
    this.userRepository = userRepository;
  }

  public async updateUser(user: UserEntity): Promise<void> {
    await this.userRepository.update(user);
  }
}
