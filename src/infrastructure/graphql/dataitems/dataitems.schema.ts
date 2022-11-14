import { Field, ObjectType } from '@nestjs/graphql';
import { Dataset } from '../datasets/datasets.schema';

@ObjectType()
export class Dataitem {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  title: string;

  @Field(() => String, { nullable: false })
  text: string;

  @Field(() => String)
  datasetId: string;

  @Field(() => Dataset)
  dataset?: Dataset;
}
