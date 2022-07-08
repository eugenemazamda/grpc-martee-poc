import { 
  BadRequestException, 
  HttpStatus, 
  Inject, 
  Injectable
 } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { 
  AuthenticationDetails, 
  CognitoUser, 
  CognitoUserAttribute, 
  CognitoUserPool, 
  ISignUpResult 
} from 'amazon-cognito-identity-js';
import { AuthConfig } from 'src/configuration/auth.config';
import { CreateUserDtoInput } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthenticateDtoOutput, AuthenticateEmailDtoInput } from './dto/authentication.dto';
import { AuthConfirmationDtoOutput, AuthConfirmationDtoInput } from './dto/confirm-signup.dto';
import { AuthRegisterDtoInput, AuthRegisterDtoOutput } from './dto/register.dto';
import { ResendVerifyRequestDtoInput, ResendVerifyRequestDtoOutput } from './dto/resend-code.dto';
import AWS from 'aws-sdk';


@Injectable()
export class AuthService {

    private userPool: CognitoUserPool;

    constructor(
        @Inject(UserService)
        private readonly userService: UserService,
        @Inject(AuthConfig)
        private readonly authConfig: AuthConfig,
        private jwtService: JwtService
    ) {
        this.userPool = new CognitoUserPool({
            UserPoolId: this.authConfig.userPoolId,
            ClientId: this.authConfig.clientId
        });
    }

    // configuration cognito register user
    async cognitoRegister(
        userPool: CognitoUserPool,
        { phone, password, email }: AuthRegisterDtoInput,
      ): Promise<ISignUpResult> {
          const attributList = [];
          const attributPhone = new CognitoUserAttribute({ Name: 'phone_number', Value: phone});
          const attributEmail = new CognitoUserAttribute({ Name: 'email', Value: email });
          attributList.push(attributPhone);
          attributList.push(attributEmail);
        return new Promise((resolve, reject) => {
          return userPool.signUp(
            email,
            password,
            attributList,
            null,
            (err, result) => {
              if (!result) {
                return reject(err);
              }
              return resolve(result);
            },
          );
        });
    }

    // Create user account 
  async register(
    authRegisterRequest: AuthRegisterDtoInput
  ): Promise<AuthRegisterDtoOutput> {
    const registerUserRequest = await this.cognitoRegister(
      this.userPool,
      authRegisterRequest,
    );

    const userData: CreateUserDtoInput = {
        email: authRegisterRequest.email,
        cognito_userId: registerUserRequest.userSub,
        phone: authRegisterRequest.phone
    };

    const userCreation = await this.userService.create(userData);

    return userCreation;
  }

  // confirmation email with code 
  async verifyEmail(
    authConfirmSignupDto: AuthConfirmationDtoInput,
  ): Promise<AuthConfirmationDtoOutput> {
    const { email, code } = authConfirmSignupDto; 
    
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return newUser.confirmRegistration(code, true, (err, res) => {
        if (err) {
          reject({ status: HttpStatus.BAD_REQUEST, error: err.message });
        }
        resolve({ statuts: HttpStatus.OK, success: 'Email address verify!!!' });
      });
    });
  }

  // Resend verify phone code
  async resendVerifyEmail(
    resendVerifyPhoneDto: ResendVerifyRequestDtoInput
  ): Promise<ResendVerifyRequestDtoOutput> {
    const { email } = resendVerifyPhoneDto;
    const userData = {
      Username: email,
      Pool: this.userPool
    };

    const newUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      return newUser.resendConfirmationCode(
        (err) => {
          if (err) {
            return reject({ status: HttpStatus.BAD_REQUEST, error: err.message });
          }
          return resolve({ statuts: HttpStatus.OK, success: 'Email verification has been resend'})
        }
      )
    })
  }

  // Authentification by phone 
  async authenticateByEmail(user: AuthenticateEmailDtoInput): Promise<AuthenticateDtoOutput> {

    const { email, password } = user;

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const userData = {
      Username: email,
      Pool: this.userPool,
    };
    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            statuts: HttpStatus.OK,
            success: 'Your successfull connect',
            token: result.getIdToken().getJwtToken(),
            refresh_token: result.getRefreshToken().getToken(),
            cognito_userId: result.getIdToken()?.payload?.sub,
          });
        },
        onFailure: (err) => {
          reject(new BadRequestException(err.message));
        },
      });
    });
  }

}
