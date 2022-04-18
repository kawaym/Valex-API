import * as companyRepository from "../repositories/companyRepository.js";

export async function findByApiKey(apiKey: string) {
  const company = await companyRepository.findByApiKey(apiKey);
  if (!company) throw "error_not_found";
  return company;
}
