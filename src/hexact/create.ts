import { createServicesTools, createUseCasesTools } from './decorators';

export function createHexact<
  Services extends Record<string, unknown>,
  UseCases extends Record<string, unknown>
>() {
  const servicesTools = createServicesTools<Services>();
  const useCasesTools = createUseCasesTools<UseCases>();

  return {
    ...servicesTools,
    ...useCasesTools,
  }
}
