declare namespace H {
  namespace service {
    class Platform {
      constructor(options: { apikey: string });
      createDefaultLayers(): any;
    }
  }
  class Map {
    constructor(
      element: HTMLElement,
      baseLayer: any,
      options?: { zoom: number; center: { lat: number; lng: number } }
    );
  }
  namespace mapevents {
    class Behavior {
      constructor(mapEvents: MapEvents);
    }
    class MapEvents {
      constructor(map: H.Map);
    }
  }
  namespace ui {
    class UI {
      static createDefault(map: H.Map, layers: any): UI;
    }
  }
}
