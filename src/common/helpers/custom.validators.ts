import { Transform, TransformFnParams, TransformOptions } from 'class-transformer';

export function Trim(options?: TransformOptions) {
  return Transform((params: TransformFnParams) => {
    const { value } = params;
    return typeof value === `string` ? value.trim() : value;
  }, options);
}

export function ToUpperCase(options?: TransformOptions) {
  return Transform((params: TransformFnParams) => {
    const { value } = params;
    return typeof value === `string` ? value.toUpperCase() : value;
  }, options);
}
