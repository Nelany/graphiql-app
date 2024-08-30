import { KeyValue } from '@/Types/Types';

export function replaceVariables(str: string | undefined, variables: KeyValue[]): string {
  if (!str) {
    return '';
  }
  return str.replace(/"{{(.*?)}}"/g, (match, p1) => {
    const variable = variables.find((v) => v.key === p1);
    return variable ? variable.value : match;
  });
}
