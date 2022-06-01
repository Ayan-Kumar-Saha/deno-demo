import { ObjectId, Request, Response, Status } from "../deps.ts";
import { sendErrorResponse, sendResponse } from "../services/http.ts";
import { productModel } from "../models/product.ts";

const getProducts = async (
  { response }: { response: Response },
) => {
  try {
    const products = await productModel.find({}).toArray();
    sendResponse(
      response,
      products,
      true,
      "Products fetched successfully!",
      Status.OK,
    );
  } catch (err) {
    sendErrorResponse(response);
  }
};

const getProduct = async (
  { response, params }: { response: Response; params: { id: string } },
) => {
  try {
    const product = await productModel.findOne(
      { _id: new ObjectId(params.id) },
    );
    sendResponse(
      response,
      [product],
      true,
      "Product fetched successfully!",
      Status.OK,
    );
  } catch (err) {
    sendErrorResponse(response);
  }
};

const addProduct = async (
  { request, response }: { request: Request; response: Response },
) => {
  try {
    const payload = await request.body().value;

    if (Object.keys(payload).length < 1) {
      sendResponse(
        response,
        {},
        false,
        "Request body is empty!",
        Status.BadRequest,
      );
      return;
    }

    const insertId = await productModel.insertOne(payload);
    sendResponse(
      response,
      { insertId },
      true,
      "Product added successfully!",
    );
  } catch (err) {
    sendErrorResponse(response);
  }
};

const updateProduct = async (
  { request, response, params }: {
    request: Request;
    response: Response;
    params: { id: string };
  },
) => {
  try {
    const payload = await request.body().value;

    if (Object.keys(payload).length < 1) {
      sendResponse(
        response,
        null,
        false,
        "Request body is empty!",
        Status.BadRequest,
      );
      return;
    }

    await productModel.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: payload },
      { upsert: false },
    );

    sendResponse(
      response,
      null,
      true,
      "Product updated successfully!",
      Status.OK,
    );
  } catch (err) {
    sendErrorResponse(err);
  }
};

const deleteProduct = async (
  { response, params }: { response: Response; params: { id: string } },
) => {
  try {
    await productModel.deleteOne(
      { _id: new ObjectId(params.id) }
    );
    sendResponse(response, null, true, "Product deleted successfully!");
  } catch (err) {
    sendErrorResponse(err);
  }
};

export { addProduct, deleteProduct, getProduct, getProducts, updateProduct };
