import { create, verify, getNumericDate } from "../deps.ts";

const generateAccessToken = async (tokenData: any) => {
    return await create(
        { alg: "HS512", typ: "JWT" },
        { ...tokenData, exp: getNumericDate(60 * 60) },
        "secret",
    );
};

export { generateAccessToken };