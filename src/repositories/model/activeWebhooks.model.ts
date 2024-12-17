import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType({ description: 'Active Webhooks of repositories' })
export class ActiveWebhooks {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date)
  created_at: Date;
}
