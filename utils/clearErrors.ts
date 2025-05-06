import type { IError } from './types';

export default function clearErrors(error: Ref<Partial<IError>>) {
    setTimeout(() => {
        for (const key in error.value) {
            error.value[key as keyof IError] = '';
        }
    }, 3500);
}
