import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ActiveWebhooks } from './activeWebhooks.model';
@ObjectType({ description: 'Repositories list' })
export class RepositoriesList {
  @Field(() => ID)
  id: string;

  @Field(() => String, { description: 'Repository name' })
  name: string;

  @Field(() => String, { description: 'Repository size', nullable: true })
  size: string;

  @Field(() => String, { description: 'Repository owner', nullable: true })
  owner: string;

  @Field(() => Boolean, {
    description: 'Repository is private or public',
    nullable: true,
  })
  private?: boolean;

  @Field(() => String, {
    description: 'Repository number of files',
    nullable: true,
  })
  numberOfFiles?: string;

  @Field(() => [ActiveWebhooks], {
    description: 'Repository active webhooks',
    nullable: true,
  })
  activeWebhooks?: ActiveWebhooks;
}
