import * as employeeRepository from "../repositories/employeeRepository.js";

export async function findById(id: number) {
  const employee = await employeeRepository.findById(id);
  if (!employee) throw "error_not_found";
  return employee;
}
