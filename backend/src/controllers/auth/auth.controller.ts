import express from 'express';
import { dtoValidation } from '@utils/request/dto-validation';
import { LoginAuthSchemaDto, loginAuthSchemaDto } from './dtos/login.auth.schema-dto';
import { errorResponse } from '@utils/response/error-response';
import { AuthService } from '@api/auth-api/auth.service';
import { RegisterAuthSchemaDto, registerAuthSchemaDto } from './dtos/register.auth.schema-dto';
import { isServiceError } from '@utils/error/is-service-error';
import { userAuthGuard } from '../../guards/user-auth.guard';

const router = express.Router();

router.post('/api/v1/auth/login', dtoValidation(loginAuthSchemaDto), async (req, res) => {
  const dto = req.body as LoginAuthSchemaDto;

  try {
    const token = await AuthService.login(dto);

    res.status(200).send(token);
  } catch (e) {
    if (isServiceError(e)) {
      if (e.code === AuthService.codes.CredentialsAreIncorrect) {
        res.status(400).send(errorResponse(e));
        return;
      }
    }

    res.status(500).send(errorResponse(e));
  }
});

router.post('/api/v1/auth/register', dtoValidation(registerAuthSchemaDto), async (req, res) => {
  console.log('register here: ');
  const dto = req.body as RegisterAuthSchemaDto;

  try {
    await AuthService.register(dto);

    res.status(201).send();
  } catch (e) {
    if (isServiceError(e)) {
      if (e.code === AuthService.codes.AccountAlreadyExist) {
        res.status(400).send(errorResponse(e));
        return;
      }
    }

    res.status(500).send(errorResponse(e));
  }
});

router.get('/api/v1/auth/authorization-check', userAuthGuard());

export const authController = router;
