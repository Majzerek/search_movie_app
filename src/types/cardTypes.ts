
export type CardType = {
  img: string;
  titleHeader: string;
  year: string;
  id: number;
  overview?: string;
  popularity?: number;
  isLoad?: boolean;
}

export type HeartComponentProps = {
  id: number;
  title: string;
  year: string;
  element: JSX.Element;
}