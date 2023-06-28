import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString, IsOptional, IsEmail, Matches, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {

  @ApiProperty({
    example: 'adumbledore@howarts.magic',
    description: 'User email.',
    uniqueItems: true,
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
  
  @IsBoolean() 
  @IsOptional() 
  isActive?: Boolean
  
  @ApiProperty({
    example: '646ae975732fecc4a485707d',
    description: 'Role ID.',
    required: false,
  })
  @IsString()
  @MinLength(6)
  @IsOptional() 
  role?: String
}
