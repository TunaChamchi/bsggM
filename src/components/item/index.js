import withSplitting from 'withSplitting';

export const Weapons = withSplitting(() => import('./Weapons'));
export const Armors = withSplitting(() => import('./Armors'));