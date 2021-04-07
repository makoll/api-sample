import { UserEntity } from '@/entities/User';
import { NotFoundError } from '@/errors/NotFoundError';
import { Controller } from '@/interfaces/controllers/index';
import { UserRepository } from '@/interfaces/databases/repositoryImples/user/UserRepositoryImple';
import { TUpdateUserRequest, TUpdateUserRequestData } from '@/interfaces/requests/user/UpdateUserRequest';
import { createDefaultResponse, TDefaultResponse } from '@/interfaces/responses';
import { responseCreated, TCreatedResponse } from '@/interfaces/responses/CreatedResponse';
import { TUserResponse } from '@/interfaces/responses/user/UserInfoResponse';
import { FindUserUseCase } from '@/usecases/user/FindUserUseCase';
import { UpdateUserUseCase } from '@/usecases/user/UpdateUserUseCase';

export class UserController extends Controller {
  private userRepository: UserRepository;

  public constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  public async findUser(userId: string): Promise<TDefaultResponse<TUserResponse>> {
    const useCase = new FindUserUseCase(this.userRepository);
    const user = await useCase.findUser(userId);

    if (!user) {
      throw new NotFoundError('指定されたユーザーが見つかりません。');
    }

    const userInfo = convertForResponse(user);

    return createDefaultResponse(userInfo);
  }

  public async updateUser(userId: string, req: TUpdateUserRequest): Promise<TCreatedResponse> {
    this.logCalled('updateUserFromCustomer');

    const userParams = req.data;

    const findUseCase = new FindUserUseCase(this.userRepository);
    const userEntity = await findUseCase.findUser(userId);
    if (!userEntity) {
      throw new NotFoundError('指定されたユーザーが見つかりません。');
    }

    const user = convertForRequest(userEntity, userParams);

    await this.validate([user]);

    const updateUseCase = new UpdateUserUseCase(this.userRepository);
    await updateUseCase.updateUser(user);

    return responseCreated();
  }
}

const convertForResponse = (user: UserEntity): TUserResponse => {
  if (!user.corporation) {
    throw new Error('ユーザーの会社情報が登録されていません。');
  }

  return {
    userId: user.userId,
    corporationId: user.corporationId,
    corporationName: user.corporation.name,
    name: user.name,
  };
};

const convertForRequest = (entity: UserEntity, request: TUpdateUserRequestData): UserEntity =>
  new UserEntity({
    userId: entity.userId,
    name: request.name ?? '',
    corporationId: entity.corporationId,
  });
