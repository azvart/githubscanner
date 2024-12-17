import { Injectable } from '@nestjs/common';
import { GithubService } from '../github/github.service';
import { RepositoriesList } from './model/repositorieslist.model';

@Injectable()
export class RepositoriesService {
  constructor(private readonly githubService: GithubService) {}

  async getRepositories(withHooks: boolean): Promise<RepositoriesList[]> {
    try {
      const repositoriesList = await this.githubService.getUserRepositories();

      return repositoriesList.map((item) => {
        return {
          id: String(item.id),
          name: item.name,
          owner: item.owner.login,
          private: item.private,
          numberOfFiles: null,
          ...(withHooks && { activeWebHooks: item.activeWebHooks }),
          size: String(item.size),
        };
      });
    } catch (error) {}
  }

  async getExistRepository(
    owner: string,
    repository: string,
  ): Promise<RepositoriesList> {
    try {
      const data = await this.githubService.getExistRepository(
        owner,
        repository,
      );
      return {
        id: String(data.id),
        name: data.name,
        size: null,
        owner: data.owner.login,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
