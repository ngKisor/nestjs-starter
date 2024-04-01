import { ApiProperty } from "@nestjs/swagger";
import {IsBoolean, IsNotEmpty, IsString} from 'class-validator';
// check for available decorators (https://github.com/typestack/class-validator) 

export class CreateUserDto {
    // @ApiProperty() for Swagger
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ default: false })
    @IsBoolean()
    isVerified: boolean;
}
