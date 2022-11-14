import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UUIDResolver } from 'graphql-scalars';
import { Dataset } from '../datasets/datasets.schema';

@ObjectType()
export class Dataitem {
  @Field(() => UUIDResolver)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  text: string;

  @Field(() => String)
  datasetId: string;

  @Field(() => Dataset)
  dataset?: Dataset;
}

@InputType()
export class CreateDataitemInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  text: string;

  @Field(() => UUIDResolver)
  datasetId: string;
}

@ObjectType()
export class CreateDataitemPayload {
  @Field(() => Dataitem)
  dataitem: Dataitem;
}
