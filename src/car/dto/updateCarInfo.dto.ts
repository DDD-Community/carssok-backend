import { IsString } from 'class-validator';

export class UpdateCarInfoDto {
  @IsString()
  brandId: string;

  @IsString()
  modelId: string;

  @IsString()
  detailId: string;
}
