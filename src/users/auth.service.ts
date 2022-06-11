import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';

// changing the default scrypt package to use promises as opposed to callbacks
const scrypt = promisify(_scrypt);

// handles the authentication logic for the Users Service
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(email: string, password: string) {
    const users = await this.usersService.find(email);
    if (users.length) throw new BadRequestException('Email already in use');

    //*** Hashing user's passwordoo
    // salt generation - randomBytes give raw binary - we convert it to a hexidecimal string
    const salt = randomBytes(8).toString('hex'); // 8 bytes gives us 16 characters
    // create hash - we set is as Buffer as that's the type being returned by typescript can't figure that out due to using promisify
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // combining hash and original salt for final string
    const finalHash = `${salt}.${hash.toString('hex')}`;

    console.log('salt:', salt);
    console.log('hash:', hash);
    console.log('finalHash:', finalHash);

    // storing our user info into the database
    this.usersService.create(email, finalHash);
  }

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (user == null)
      throw new NotFoundException("User wasn't found in database");

    // destrcutruing hash and salt from stored password hash
    const [salt, hash] = user.password.split('.');

    // encrypting password from supplied user password for comparison
    const suppliedHash = (await scrypt(password, salt, 32)) as Buffer;

    // check if user's supplied password's hash matches stored hash
    if (suppliedHash.toString('hex') !== hash)
      throw new BadRequestException('Bad password.');

    // returns user if sign in successful
    return user;
  }
}
