import { Container, Service, Inject } from 'typedi';

// ----------------------------------------------------------------
//                           Api Services
// ----------------------------------------------------------------

type ApiService = 'AuthUser' | 'Locale';

const apiServicePrefix = 'apiService';

export function RegisterApiService(serviceName: ApiService) {
  return Service(`${apiServicePrefix}.${serviceName}`);
}

export function InjectApiService(serviceName: ApiService) {
  try {
    return Inject(`${apiServicePrefix}.${serviceName}`);
  } catch(e) {
    console.error(`Service failed: ${apiServicePrefix}.${serviceName}`);
    throw e;
  }
}

export function setService(serviceName: ApiService, value: any) {
  Container.set(`${apiServicePrefix}.${serviceName}`, value);
}

// ----------------------------------------------------------------
//                           Use Cases
// ----------------------------------------------------------------

type UseCase = 'AuthUser' | 'Locale';

const useCasePrefix = 'useCase';

export function RegisterUseCase(useCaseName: UseCase) {
  return Service(`${useCasePrefix}.${useCaseName}`);
}

export function InjectUseCase(useCaseName: UseCase) {
  return Inject(`${useCasePrefix}.${useCaseName}`);
}

export function setUseCase(useCaseName: UseCase, value: any) {
  Container.set(`${useCasePrefix}.${useCaseName}`, value);
}

export function getUseCase<T>(useCaseName: UseCase) {
  try {
    return Container.get<T>(`${useCasePrefix}.${useCaseName}`);
  } catch(e) {
    console.error(`Service failed: ${useCasePrefix}.${useCaseName}`);
    throw e;
  }
}

// ----------------------------------------------------------------
//                           Env Vars
// ----------------------------------------------------------------

type EnvVars = 'API_URL';

const envVarPrefix = 'useCase';

export function InjectEnv(envVarName: EnvVars) {
  return Inject(`${envVarPrefix}.${envVarName}`);
}

export function setEnvVars(envVarName: EnvVars, value: string) {
  Container.set(`${envVarPrefix}.${envVarName}`, value);
}

export function getEnvVars(envVarName: EnvVars) {
  return Container.get(`${envVarPrefix}.${envVarName}`);
}