export type CustomiserOption = {
  flex: 'soft' | 'medium' | 'stiff';
  finish: 'matte' | 'glossy';
  texture: string;
  frontTexture?: string;
  backTexture?: string;
  size: string;

};


export type SnowboardBaseOption = {
  id: string;
  name: string;
  color: string;
  price: number;
};

export type SnowboardBindingOption = {
  id: string;
  name: string;
  color: string;
  price: number;
};


export type CustomizerSettings = {
  wheels: WheelOption[];
  decks: DeckOption[];
  metals: MetalOption[]; // Used for both trucks and bolts
  snowboards: {
    decks: SnowboardDeckOption[];
    bases: SnowboardBaseOption[];
    bindings: SnowboardBindingOption[];
  };
};

