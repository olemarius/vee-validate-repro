import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { camelize, getCurrentInstance, toHandlerKey } from 'vue';

import type { Updater } from '@tanstack/vue-table';
import type { Ref } from 'vue';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function useEmitAsProps<Name extends string>(
    emit: (name: Name, ...args: any[]) => void,
) {
    const vm = getCurrentInstance();

    const events = vm?.type.emits as Name[];
    const result: Record<string, any> = {};
    if (!events?.length) {
        console.warn(
            `No emitted event found. Please check component: ${vm?.type.__name}`,
        );
    }

    events?.forEach((ev) => {
        result[toHandlerKey(camelize(ev))] = (...arg: any) => emit(ev, ...arg);
    });
    return result;
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
    ref.value
      = typeof updaterOrValue === 'function'
            ? updaterOrValue(ref.value)
            : updaterOrValue;
}
