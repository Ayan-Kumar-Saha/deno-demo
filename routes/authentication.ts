import { Router } from "../deps.ts";
import { signUpUser, signInUser } from '../controllers/authentication.ts'

const router = new Router();

router
    .post('/api/auth/register', signUpUser)
    .post('/api/auth/login', signInUser);

export default router;