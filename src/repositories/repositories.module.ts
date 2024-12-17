import { Module } from '@nestjs/common';
import { RepositoriesResolver } from './repositories.resolver';
import { RepositoriesService } from './repositories.service';
import { GithubModule } from '../github/github.module';

@Module({
  imports: [GithubModule],
  providers: [RepositoriesResolver, RepositoriesService],
})
export class RepositoriesModule {}
