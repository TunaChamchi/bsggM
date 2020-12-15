import withSplitting from 'withSplitting';

export const Dex = withSplitting(() => import('./Dex'));
export const Item = withSplitting(() => import('./Item'));
export const Monster = withSplitting(() => import('./Monster'));