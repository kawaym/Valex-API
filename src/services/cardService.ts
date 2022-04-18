import * as creditCardGenerator from "creditcard-generator";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";

import * as cardRepository from "../repositories/cardRepository.js";

export async function createCard(
  employeeId: number,
  employeeName: string,
  type: cardRepository.TransactionTypes
) {
  const cardholderName = contractName(employeeName);
  const number = creditCardGenerator.GenCC("Mastercard")[0];
  const securityCode = generateSecurityCode();
  const expirationDate = dayjs().add(5, "year").format("MM/YY");

  try {
    await cardRepository.insert({
      employeeId: employeeId,
      number: number,
      cardholderName: cardholderName,
      securityCode: securityCode,
      expirationDate: expirationDate,
      isVirtual: false,
      isBlocked: false,
      type: type,
    });
  } catch (e) {
    throw "error_server_internal";
  }
}

export async function checkTypeAndEmployeeId(
  type: cardRepository.TransactionTypes,
  id: number
) {
  const card = await cardRepository.findByTypeAndEmployeeId(type, id);
  if (card) throw "error_conflict";
}

export async function activateCard(
  id: number,
  securityCode: string,
  password: string
) {
  const hashedPass = bcrypt.hashSync(password, 10);

  const card = await cardRepository.findById(id);
  if (!card) throw "error_not_found";

  const expired = dayjs(card.expirationDate).diff(dayjs());
  if (expired >= 0) throw "card_expired";

  if (card.password) throw "card_already_activated";

  const validSecurityCode =
    securityCode === decryptSecurityCode(card.securityCode);
  if (!validSecurityCode) throw "invalid_CVC";

  await cardRepository.update(id, { password: hashedPass });
}

function contractName(name: string) {
  const splitName = name.split(" ");
  const filteredName = splitName.filter((word) => word.length >= 3);

  let contractedName = "";

  for (let i = 0; i < filteredName.length; i++) {
    if (i === 0 || i === filteredName.length - 1) {
      contractedName += " " + filteredName[i];
    } else {
      contractedName += " " + filteredName[i][0];
    }
  }
  return contractedName;
}
function generateSecurityCode() {
  const number = Math.floor(Math.random() * (999 - 1)) + 1;
  const paddedNumber = String(number).padStart(3, "0");

  return encryptSecurityCode(paddedNumber);
}

function encryptSecurityCode(securityCode: string) {
  const encryptedNumber = CryptoJS.AES.encrypt(
    securityCode,
    process.env.JWT_SECRET
  ).toString();

  return encryptedNumber;
}

function decryptSecurityCode(securityCode: string) {
  const decryptedSecurityCode = CryptoJS.AES.decrypt(
    securityCode,
    process.env.JWT_SECRET
  ).toString(CryptoJS.enc.Utf8);

  return decryptedSecurityCode;
}
