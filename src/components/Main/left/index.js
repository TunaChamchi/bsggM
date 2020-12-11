import withSplitting from 'withSplitting';

export const Characters = withSplitting(() => import('./Characters'));
export const Search = withSplitting(() => import('./Search'));