import withSplitting from 'withSplitting';

export const Route = withSplitting(() => import('./Route'));
export const Stat = withSplitting(() => import('./Stat'));
export const Map = withSplitting(() => import('./Map'));