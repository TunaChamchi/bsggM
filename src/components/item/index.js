import withSplitting from 'withSplitting';

export const Weapons = withSplitting(() => import('./Weapons'));
export const Armors = withSplitting(() => import('./Armors'));
export const ItemOrder = withSplitting(() => import('./ItemOrder'));
export const Item = withSplitting(() => import('./Item'));