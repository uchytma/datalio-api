import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Dataset {
  @Field(() => String, { nullable: false })
  id: string;
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => String, { nullable: false })
  code: string;
}