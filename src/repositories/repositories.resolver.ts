import { Query, Resolver, Args } from '@nestjs/graphql';
import { RepositoriesList } from './model/repositorieslist.model';
import { RepositoriesService } from './repositories.service';

@Resolver(() => [RepositoriesList])
export class RepositoriesResolver {
  constructor(private readonly repositoriesService: RepositoriesService) {}
  @Query(() => [RepositoriesList])
  async repositories(
    @Args('withHooks') withHooks: boolean,
  ): Promise<RepositoriesList[]> {
    return this.repositoriesService.getRepositories(withHooks);
  }

  @Query(() => RepositoriesList)
  async repository(
    @Args('owner') owner: string,
    @Args('repository') repository: string,
  ): Promise<RepositoriesList> {
    return await this.repositoriesService.getExistRepository(owner, repository);
  }
}
