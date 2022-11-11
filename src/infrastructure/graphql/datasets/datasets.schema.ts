import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Dataset {
  @Field(() => String, { nullable: false })
  id: string;
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => String, { nullable: false })
  code: string;
}

@ArgsType()
export class CreateDataset {
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => String, { nullable: false })
  code: string;
}

@ArgsType()
export class UpdateDataset {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  code: string;
}
