//브랜드(제조사), 모델, 디테일(연식,연료,세부모델명,엔진형식,연비), 사진설정

import { IsString } from 'class-validator';

export class CreateCarInfoDto {
  @IsString()
  plateNumber: string;

  @IsString()
  nickName: string;

  @IsString()
  detailId: string;
}
