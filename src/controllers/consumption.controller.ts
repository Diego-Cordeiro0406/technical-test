const dotenv = require('dotenv')
dotenv.config()

import { Request, Response } from 'express';
import consumptionsService from '../services/consumption.service';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';
import { readFileSync } from 'fs';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY

const genAI = new GoogleGenerativeAI(apiKey!)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function fileToGenerativePart(path: string, mimeType: string) {
  return {
    inlineData: {
      data: Buffer.from(readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function create(req: Request, res: Response) {
  const {
    image,
    customer_code,
    measure_datetime,
    measure_type
  } = req.body;

  const imgBuffer = Buffer.from(image, 'base64');

  const uploadDir = path.join(__dirname, 'uploads', customer_code);

  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  const timestamp = new Date(measure_datetime).getTime();
  const filename = `${measure_type}_${timestamp}.png`;
  const filePath = path.join(uploadDir, filename);
  console.log(filePath)

  writeFileSync(filePath, imgBuffer);

  const prompt = "extrair o valor deste medidor";

  const imagePart = fileToGenerativePart(
    `${filePath}`,
    "image/jpeg",
  );

  const result = await model.generateContent([prompt, imagePart]);
  
  writeFileSync('uploads.jpeg', imgBuffer);

  const numericValue = result.response.text().replace(/[^\d.,]/g, '');
      
  const normalizedValue = numericValue.replace(',', '.').replace(/\.$/, '');;
      
      
  const measure_uuid = uuidv4()
  const { status, data } = await consumptionsService.create({
      measure_uuid,
      image_url: filePath,
      customer_code,
      measure_datetime,
      measure_value: normalizedValue,
      has_confirmed: false,
      measure_type
    }
  );

  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json({
        "error_code": "DOUBLE_REPORT",
        "error_description": data
      });
    }

  res.status(201).json({
    image_url: filePath,
    measure_value: normalizedValue,
    measure_uuid
  });
}

async function update(req: Request, res: Response) {
  const {
    measure_uuid,
    confirmed_value,
  } = req.body;

  const { status, data } = await consumptionsService.update(
    {
      measure_uuid,
      confirmed_value,
    }
  );
 
  if (status === 'NOT_FOUND') {
      return res.status(mapStatusHTTP(status)).json({
        error_code: 'MEASURE_NOT_FOUND',
        error_description: data
      });
    }
  
  if (status === 'DUPLICATE') {
      return res.status(mapStatusHTTP(status)).json({
        error_code: 'CONFIRMATION_DUPLICATE',
        error_description: data
      });
    }
  
  if (status === 'INVALID_DATA') {
      return res.status(mapStatusHTTP(status)).json({
        error_code: 'INVALID_DATA',
        error_description: data
      });
    }

  res.status(200).json(data);
}

async function findAllByCustomerCode(req: Request, res: Response) {
  const { customer_code } = req.params
  const { measure_type } = req.query
  
  if (measure_type && measure_type !== 'WATER' && measure_type !== 'GAS') {
    return res.status(400).json({
      error_code: 'INVALID_TYPE',
      error_description: 'Tipo de medição não permitida'
    });
  }
  
  const { status, data } = await consumptionsService.findAllByCustomerCode(customer_code, measure_type?.toUpperCase());

  if (status === 'NOT_FOUND') {
    return res.status(mapStatusHTTP(status)).json({
      error_code: 'MEASURES_NOT_FOUND',
      error_description: data
    });
  }

  res.status(200).json(data);
}

export default {
  create,
  update,
  findAllByCustomerCode
};