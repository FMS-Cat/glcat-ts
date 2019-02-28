import { GLCat } from './GLCat';
/**
 * It's a WebGLTexture.
 */
export declare class GLCatTexture {
    private __glCat;
    private __texture;
    private __width;
    private __height;
    /**
     * Create a new GLCatTexture instance.
     */
    constructor(glCat: GLCat, texture: WebGLTexture);
    /**
     * Dispose the texture.
     */
    dispose(): void;
    /**
     * Retrieve its own texture.
     */
    getTexture(): WebGLTexture;
    /**
     * Return its width.
     */
    getWidth(): number;
    /**
     * Return its height.
     */
    getHeight(): number;
    /**
     * Specify how to filter the texture.
     */
    textureFilter(): void;
    textureFilter(filter: number): void;
    textureFilter(filterMag: number, filterMin: number): void;
    /**
     * Specify how to wrap the texture.
     */
    textureWrap(): void;
    textureWrap(wrap: number): void;
    textureWrap(wrapS: number, wrapT: number): void;
    /**
     * Set new data into this texture.
     */
    setTexture(source: TexImageSource): void;
    /**
     * Set new data into this texture.
     * This function uses `Uint8Array`. If you want to source image data, use `GLCat.setTexture()` instead.
     * Or you want to use float texture? Try this: `GLCat.setTextureFromFloatArray()`
     */
    setTextureFromArray(width: number, height: number, source: Uint8Array | null, format?: number): void;
    /**
     * Set new data into this texture.
     * This function uses `Float32Array`.
     * If you can't grab `OES_texture_float` extension here, you will die at this point.
     */
    setTextureFromFloatArray(width: number, height: number, source: Float32Array | null, format?: number): void;
    /**
     * Copy pixels from current framebuffer to given texture.
     */
    copyTexture(width: number, height: number): void;
    /**
     * Set new cubemap data into this texture.
     * @param textures Array of iamges. Order: `X+`, `X-`, `Y+`, `Y-`, `Z+`, `Z-`
     * @todo due to compatibility of its `width` and `height` it should not be used yet
     */
    setCubemap(textures: TexImageSource[]): void;
}
