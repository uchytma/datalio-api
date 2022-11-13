import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Dataitem } from '../dataitems/dataitems.schema';

@ObjectType()
export class Dataset {
  @Field(() => String, { nullable: false })
  id: string;
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => String, { nullable: false })
  code: string;
  @Field(() => [Dataitem])
  dataitems?: Dataitem[];
}

@ArgsType()
export class CreateDatasetInput {
  @Field(() => String, { nullable: false })
  name: string;
  @Field(() => String, { nullable: false })
  code: string;
}

@ObjectType()
export class CreateDatasetPayload {
  @Field(() => Dataset)
  dataset: Dataset;
}

@ArgsType()
export class UpdateDatasetInput {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  code: string;
}

@ObjectType()
export class UpdateDatasetPayload {
  @Field(() => Dataset)
  dataset: Dataset;
}
