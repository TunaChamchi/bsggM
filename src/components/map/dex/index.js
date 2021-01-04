import withSplitting from 'withSplitting';

export const Dex = withSplitting(() => import('./Dex'));
export const SrcItem = withSplitting(() => import('./SrcItem'));
export const Monster = withSplitting(() => import('./Monster'));