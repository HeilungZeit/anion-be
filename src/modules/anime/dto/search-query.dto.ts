import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class SearchQueryDto {
  @IsString()
  search: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  offset?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number;
}
