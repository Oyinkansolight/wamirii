import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import clsxm from '@/lib/clsxm';

export type TextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label?: string; errorMessage?: string };

export default function TextInput(props: TextInputProps) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className={clsxm(
          'mb-2 block text-sm font-medium text-gray-900 ',
          'mb-2 block text-sm font-medium text-red-700 '
        )}
      >
        {props.label}
      </label>
      <input
        id={props.name}
        {...props}
        className={clsxm(
          'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500      ',
          props.errorMessage &&
            'block w-full rounded-lg border border-red-500 bg-red-50 p-2.5 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500    '
        )}
      />
      {props.errorMessage && (
        <p className='mt-2 text-sm text-red-600'>{props.errorMessage}</p>
      )}
    </div>
  );
}
