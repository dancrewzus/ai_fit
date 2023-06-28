import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class LoginDto {

  @ApiProperty({
    example: 'adumbledore@howarts.magic',
    description: 'User email.',
  })
  @IsEmail() 
  email: String
  
  @ApiProperty({
    example: 'ADumbledore_1881',
    description: 'User password.',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
  }) 
  password: String
}