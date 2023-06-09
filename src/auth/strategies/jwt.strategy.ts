import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt,Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { HandleErrors } from 'src/common/utils/handleErrors.util';
import { User } from 'src/app/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
    private readonly handleErrors: HandleErrors,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtSecret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  public validate = async (payload: JwtPayload): Promise<User> => {
    try {
      const { id } = payload
      const user = await this.userModel.findOne({ _id: id })
        .select('email isActive role data')
        .populate({ path: 'role', select: 'name' })
        .populate({ path: 'data', select: 'firstName secondName paternalSurname maternalSurname birthDate profilePicture' })

      if(!user) {
        throw new UnauthorizedException('Invalid token')
      }
      if(!user.isActive) {
        throw new UnauthorizedException('User is inactive')
      }
      return user
    } catch (error) {
      this.handleErrors.handleExceptions(error)
    }
  }
}