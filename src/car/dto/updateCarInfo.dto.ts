import { IsString } from 'class-validator';

export class UpdateCarInfoDto {
  @IsString()
  brand?: string;

  @IsString()
  model?: string;

  @IsString()
  year?: string;

  @IsString()
  fuel?: string;

  @IsString()
  detailModel?: string;

  @IsString()
  engineType?: string;
}
