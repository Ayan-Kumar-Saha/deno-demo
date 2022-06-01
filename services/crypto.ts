import { hash, compare } from "../deps.ts";

const getHashedText = async (plainText: string) => {
    return await hash(plainText);
}

const isHashedTextSameAsPlainText = async (plainText: string, hash: string) => {
    return await compare(plainText, hash);
}

export { getHashedText, isHashedTextSameAsPlainText };