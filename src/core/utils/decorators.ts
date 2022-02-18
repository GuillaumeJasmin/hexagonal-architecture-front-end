import { Container, Service, Inject } from 'typedi';

export function createServicesTools<ApiService extends Record<string, unknown>>() {
  const servicePrefix = 'service';

  type ServiceKey = keyof ApiService;

  function RegisterService(serviceName: ServiceKey) {
    return Service(`${servicePrefix}.${serviceName}`);
  }

  function InjectService(serviceName: ServiceKey) {
    try {
      return Inject(`${servicePrefix}.${serviceName}`);
    } catch(e) {
      console.error(`inject service failed: ${servicePrefix}.${serviceName}`);
      throw e;
    }
  }

  function setService<S extends ServiceKey, T extends ApiService[S]>(serviceName: S, value: T) {
    Container.set(`${servicePrefix}.${serviceName}`, value);
    
    return value;
  }

  function getService<T extends ServiceKey>(serviceName: T) {
    try {
      return Container.get<ApiService[T]>(`${servicePrefix}.${serviceName}`);
    } catch(e) {
      console.error(`get service failed: ${servicePrefix}.${serviceName}`);
      throw e;
    }
  }

  return {
    RegisterService,
    InjectService,
    setService,
    getService,
  }
}

export function createUseCasesTools<UseCase extends Record<string, unknown>>() {
  const useCasePrefix = 'useCase';

  type UseCaseKey = keyof UseCase;

  function RegisterUseCase(useCaseName: UseCaseKey) {
    return Service(`${useCasePrefix}.${useCaseName}`);
  }

  function InjectUseCase(useCaseName: UseCaseKey) {
    try {
      return Inject(`${useCasePrefix}.${useCaseName}`);
    } catch(e) {
      console.error(`inject useCase failed: ${useCasePrefix}.${useCaseName}`);
      throw e;
    }
    
  }

  function setUseCase<U extends UseCaseKey, T extends UseCase[U]>(useCaseName: U, value: T) {
    Container.set(`${useCasePrefix}.${useCaseName}`, value);

    return value;
  }

  function getUseCase<T extends UseCaseKey>(useCaseName: T) {
    try {
      return Container.get<UseCase[T]>(`${useCasePrefix}.${useCaseName}`);
    } catch(e) {
      console.error(`get useCase failed: ${useCasePrefix}.${useCaseName}`);
      throw e;
    }
  }

  return {
    RegisterUseCase,
    InjectUseCase,
    setUseCase,
    getUseCase,
  }
}

export function createEnvVarsTools<EnvVars>() {
  const envVarPrefix = 'useCase';

  function InjectEnvVar(envVarName: EnvVars) {
    return Inject(`${envVarPrefix}.${envVarName}`);
  }

  function setEnvVar(envVarName: EnvVars, value: string) {
    Container.set(`${envVarPrefix}.${envVarName}`, value);
  }

  function getEnvVar(envVarName: EnvVars) {
    return Container.get(`${envVarPrefix}.${envVarName}`);
  }

  return {
    InjectEnvVar,
    setEnvVar,
    getEnvVar
  }
}