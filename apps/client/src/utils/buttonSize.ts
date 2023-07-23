import { Size } from './Enums';

export function getSizeClass(size?: string) {
    switch (size) {
        case Size.xs:
            return 'w-3 h-3';
        case Size.sm:
            return 'w-4 h-4';
        case Size.md:
            return 'w-6 h-6';
        case Size.lg:
            return 'w-8 h-8';
        default:
            return 'w-4 h-4';
    }
}
