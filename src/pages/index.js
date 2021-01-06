import withSplitting from 'withSplitting';

export const Main = withSplitting(() => import('./Main'));
export const Detail = withSplitting(() => import('./Detail'));
export const Map = withSplitting(() => import('./Map'));
export const RouteM = withSplitting(() => import('./RouteM'));
export const NewMain = withSplitting(() => import('./NewMain'));
export const Match = withSplitting(() => import('./match'));
export const Rank = withSplitting(() => import('./rank'));
export const Rank_Character = withSplitting(() => import('./rank_Character'));
export const Loading = withSplitting(() => import('./Loading'));

export const Error404 = withSplitting(() => import('./404'));