import { Request, Response, Status } from "../deps.ts";
import { sendErrorResponse, sendResponse } from "../services/http.ts";
import { isAllRequiredFieldsAvailable } from "../services/http.ts";
import { authModel } from '../models/auth.ts';
import { getHashedText, isHashedTextSameAsPlainText } from '../services/crypto.ts';
import { generateAccessToken } from '../services/jwt.ts';

const signUpUser = async (
    { request, response }: { request: Request; response: Response },
) => {
    try {
        let payload = await request.body().value;

        if (
            !isAllRequiredFieldsAvailable(
                payload,
                ["email", "password"]
            )
        ) {
            sendResponse(
                response,
                null,
                false,
                "Mandatory fields are missing!",
                Status.BadRequest,
            );
            return;
        }

        const userAuth = await authModel.findOne({ email: payload.email });

        if (userAuth) {
            sendResponse(
                response,
                null,
                true,
                'Email Id already in use!',
                Status.OK
            );
            return;
        }

        payload['password'] = await getHashedText(payload.password);

        await authModel.insertOne(payload);

        sendResponse(
            response,
            null,
            true,
            'User registered successfully!',
            Status.Created
        );

    } catch (err) {
        sendErrorResponse(response);
    }
};

const signInUser = async (
    { request, response }: { request: Request; response: Response },
) => {
    try {
        let isPasswordCorrect: boolean = false;
        const payload = await request.body().value;

        if (
            !isAllRequiredFieldsAvailable(
                payload,
                ["email", "password"]
            )
        ) {
            sendResponse(
                response,
                null,
                false,
                "Mandatory fields are missing!",
                Status.BadRequest,
            );
            return;
        }

        const userAuth = await authModel.findOne({ email: payload.email });

        if (!userAuth) {
            sendResponse(response, null, true, 'Email Id is not registed!', Status.Unauthorized);
            return;
        }

        isPasswordCorrect = await isHashedTextSameAsPlainText(payload.password, userAuth?.password);

        if (isPasswordCorrect) {

            const accessToken = await generateAccessToken({ _id: userAuth._id, email: userAuth.email });

            sendResponse(
                response,
                { accessToken },
                true,
                'User authenticated successfully!',
                Status.OK
            )
            return;
        }

        sendResponse(
            response,
            null,
            true,
            'Password is incorrect!',
            Status.Unauthorized
        )

    } catch (err) {
        sendErrorResponse(response);
    }
};

export { signUpUser, signInUser };
