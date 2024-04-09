import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
// check for available decorators (https://github.com/typestack/class-validator)

export class CreateUserDto {
  // @ApiProperty() for Swagger

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  isVerified: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  isActive: boolean;
}
