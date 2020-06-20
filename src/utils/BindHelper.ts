export class BindHelper<TValue> {
  private __prev: TValue;
  private __binder: ( value: TValue ) => void;

  public constructor( init: TValue, binder: ( value: TValue ) => void ) {
    this.__prev = init;
    this.__binder = binder;
  }

  public bind<T>(
    value: TValue,
    callback?: ( value: TValue ) => T
  ): T {
    const prev = this.__prev;
    if ( value !== prev ) {
      this.__binder( value );
      this.__prev = value;
    }

    if ( callback ) {
      const ret = callback( value );
      this.bind( prev );
      return ret;
    } else {
      return undefined as any;
    }
  }
}
