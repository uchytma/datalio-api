import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Dataitem {
  @Field(() => String, { nullable: false })
  id: string;
  @Field(() => String, { nullable: false })
  title: string;
  @Field(() => String, { nullable: false })
  text: string;
}
