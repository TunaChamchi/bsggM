import withSplitting from 'withSplitting';

export const Main = withSplitting(() => import('./Main'));
export const Detail = withSplitting(() => import('./Detail'));
export const Map = withSplitting(() => import('./Map'));