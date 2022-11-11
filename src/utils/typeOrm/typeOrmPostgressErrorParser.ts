import { PG_UNIQUE_VIOLATION } from 'src/utils/typeOrm/postgresErrorCodes';
import { QueryFailedError } from 'typeorm';

export class TypeOrmPostgressErrorParser {
  /**
   * Returns true, if the error is caused by a unique constraint violation of specific field.
   * Works only with Postgres (using specific postgres error codes and messages for detection).
   */
  static isDuplicateFieldError(error: any, field: string): boolean {
    if (error instanceof QueryFailedError) {
      const { code, detail } = error as any;
      const regex = new RegExp(
        `Key \\(${field}\\)=\\((\\w+)\\) already exists.`,
      );
      if (code === PG_UNIQUE_VIOLATION && regex.test(detail)) return true;
    }
    return false;
  }
}
