import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GithubService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async getUserRepositories(): Promise<UserRepository[]> {
    try {
      const { data } = await this.httpService
        .get<UserRepository[]>(
          `${this.configService.get('GITHUB_API_BASE')}/user/repos`,
          {
            headers: {
              Authorization: `token ${this.configService.get('GITHUB_TOKEN')}`,
              'X-GitHub-Api-Version': '2022-11-28',
              Accept: 'application/vnd.github+json',
            },
          },
        )
        .toPromise();
      return Promise.all(data.map((item) => this.attachActiveWebHooks(item)));
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getExistRepository(
    owner: string,
    repository: string,
  ): Promise<UserRepository> {
    try {
      const { data } = await this.httpService
        .get<UserRepository>(
          `${this.configService.get('GITHUB_API_BASE')}/repos/${owner}/${repository}`,
          {
            headers: {
              Authorization: `token ${this.configService.get('GITHUB_TOKEN')}`,
              'X-GitHub-Api-Version': '2022-11-28',
              Accept: 'application/vnd.github+json',
            },
          },
        )
        .toPromise();

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  private async getRepositoryListWebHooks(
    owner: string,
    repository: string,
  ): Promise<ActiveWebHooks[]> {
    try {
      const { data } = await this.httpService
        .get(
          `${this.configService.get<ActiveWebHooks[]>('GITHUB_API_BASE')}/repos/${owner}/${repository}/hooks`,
          {
            headers: {
              Authorization: `token ${this.configService.get('GITHUB_TOKEN')}`,
              'X-GitHub-Api-Version': '2022-11-28',
              Accept: 'application/vnd.github+json',
            },
          },
        )
        .toPromise();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  private async attachActiveWebHooks(
    item: UserRepository,
  ): Promise<UserRepository> {
    const activeWebHooks = await this.getRepositoryListWebHooks(
      item.owner.login,
      item.name,
    );
    return {
      ...item,
      activeWebHooks,
    };
  }
}
