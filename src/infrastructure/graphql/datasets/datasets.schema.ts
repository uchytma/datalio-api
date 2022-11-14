import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UUIDResolver } from 'graphql-scalars';
import { Dataitem } from '../dataitems/dataitems.schema';

@ObjectType()
export class Dataset {
  @Field(() => UUIDResolver)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;

  @Field(() => [Dataitem])
  dataitems?: Dataitem[];
}

@InputType()
export class CreateDatasetInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;
}

@ObjectType()
export class CreateDatasetPayload {
  @Field(() => Dataset)
  dataset: Dataset;
}

@InputType()
export class UpdateDatasetInput {
  @Field(() => UUIDResolver)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;
}

@ObjectType()
export class UpdateDatasetPayload {
  @Field(() => Dataset)
  dataset: Dataset;
}
