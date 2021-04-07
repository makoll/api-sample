import { UserEntity } from '@/entities/User';
import { IUserRepository } from '@/interfaces/databases/repositories/user/IUserRepository';
import { Usecase } from '@/usecases';

class FindUserUseCase extends Usecase {
  private userRepository: IUserRepository;

  public constructor(userRepository: IUserRepository) {
    super();
    this.userRepository = userRepository;
  }

  public findUser = async (userId: string): Promise<UserEntity | null> => await this.userRepository.find(userId);
}

export { FindUserUseCase };
