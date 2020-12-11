import withSplitting from 'withSplitting';

export const Main = withSplitting(() => import('./Main'));
export const Character = withSplitting(() => import('./Character'));
export const Detail = withSplitting(() => import('./Detail'));
export const Item = withSplitting(() => import('./Item'));