/*!
* @fms-cat/glcat-ts v0.12.1
* WebGL wrapper with plenty of hackability
*
* Copyright (c) 2018-2020 FMS_Cat
* @fms-cat/glcat-ts is distributed under MIT License
* https://github.com/FMS-Cat/glcat-ts/blob/master/LICENSE
*/
const GL_ARRAY_BUFFER = 0x8892;
const GL_BLEND = 0x0be2;
const GL_CLAMP_TO_EDGE = 0x812f;
const GL_COLOR_ATTACHMENT0 = 0x8ce0;
const GL_COLOR_BUFFER_BIT = 0x00004000;
const GL_COMPILE_STATUS = 0x8b81;
const GL_COMPLETION_STATUS_KHR = 0x91b1;
const GL_DEPTH_ATTACHMENT = 0x8d00;
const GL_DEPTH_BUFFER_BIT = 0x00000100;
const GL_DEPTH_COMPONENT16 = 0x81a5;
const GL_DEPTH_TEST = 0x0b71;
const GL_DEPTH24_STENCIL8 = 0x88f0;
const GL_DRAW_FRAMEBUFFER = 0x8ca9;
const GL_ELEMENT_ARRAY_BUFFER = 0x8893;
const GL_FLOAT = 0x1406;
const GL_FRAGMENT_SHADER = 0x8b30;
const GL_FRAMEBUFFER = 0x8d40;
const GL_HALF_FLOAT = 0x140b;
const GL_LEQUAL = 0x0203;
const GL_LINEAR = 0x2601;
const GL_LINK_STATUS = 0x8b82;
const GL_MAX_DRAW_BUFFERS = 0x8824;
const GL_NEAREST = 0x2600;
const GL_ONE_MINUS_SRC_ALPHA = 0x0303;
const GL_READ_FRAMEBUFFER = 0x8ca8;
const GL_RENDERBUFFER = 0x8d41;
const GL_RGBA = 0x1908;
const GL_RGBA32F = 0x8814;
const GL_RGBA8 = 0x8058;
const GL_SRC_ALPHA = 0x0302;
const GL_STATIC_DRAW = 0x88e4;
const GL_TEXTURE_2D = 0x0de1;
const GL_TEXTURE_CUBE_MAP = 0x8513;
const GL_TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
const GL_TEXTURE_MAG_FILTER = 0x2800;
const GL_TEXTURE_MIN_FILTER = 0x2801;
const GL_TEXTURE_WRAP_S = 0x2802;
const GL_TEXTURE_WRAP_T = 0x2803;
const GL_TEXTURE0 = 0x84c0;
const GL_UNSIGNED_BYTE = 0x1401;
const GL_VERTEX_SHADER = 0x8b31;

class BindHelper {
    constructor(init, binder) {
        this.__prev = init;
        this.__binder = binder;
    }
    bind(value, callback) {
        const prev = this.__prev;
        if (value !== prev) {
            this.__binder(value);
            this.__prev = value;
        }
        if (callback) {
            const ret = callback(value);
            this.bind(prev);
            return ret;
        }
        else {
            return undefined;
        }
    }
}

/**
 * It's a WebGLBuffer.
 */
class GLCatBuffer {
    /**
     * Create a new GLCatBuffer instance.
     */
    constructor(glCat, buffer) {
        this.__glCat = glCat;
        this.__buffer = buffer;
    }
    /**
     * Its own buffer.
     */
    get buffer() {
        return this.__buffer;
    }
    /**
     * Its own buffer. Shorter than [[GLCatBuffer.buffer]].
     */
    get raw() {
        return this.__buffer;
    }
    /**
     * Dispose the buffer.
     */
    dispose() {
        this.__glCat.gl.deleteBuffer(this.__buffer);
    }
    /**
     * Set new data into this buffer.
     */
    setVertexbuffer(source, usage = GL_STATIC_DRAW) {
        const { gl } = this.__glCat;
        this.__glCat.bindVertexBuffer(this, () => {
            gl.bufferData(GL_ARRAY_BUFFER, source, usage);
        });
    }
    /**
     * Set new index data into this buffer.
     */
    setIndexbuffer(source, usage = GL_STATIC_DRAW) {
        const { gl } = this.__glCat;
        this.__glCat.bindIndexBuffer(this, () => {
            gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, source, usage);
        });
    }
}

const GLCatErrors = {
    get UnexpectedNullError() {
        const error = new Error('GLCat: Unexpected null detected');
        error.name = 'UnexpectedNullError';
        throw error;
    },
    get WebGL2ExclusiveError() {
        const error = new Error('GLCat: Attempted to use WebGL2 exclusive stuff');
        error.name = 'WebGL2ExclusiveError';
        return error;
    }
};

/**
 * It's a WebGLFramebuffer.
 */
class GLCatFramebuffer {
    /**
     * Create a new GLCatFramebuffer instance.
     */
    constructor(glCat, framebuffer) {
        this.__renderbufferMap = new Map();
        this.__textureMap = new Map();
        this.__glCat = glCat;
        this.__framebuffer = framebuffer;
    }
    /**
     * Its own framebuffer.
     */
    get framebuffer() {
        return this.__framebuffer;
    }
    /**
     * Its own framebuffer. Shorter than [[GLCatFramebuffer.framebuffer]]
     */
    get raw() {
        return this.__framebuffer;
    }
    /**
     * Its attached renderbuffer.
     * If you want to grab other than `DEPTH_ATTACHMENT`, try [[GLCatFramebuffer.getRenderbuffer]] instead.
     */
    get renderbuffer() {
        var _a;
        return (_a = this.__renderbufferMap.get(GL_DEPTH_ATTACHMENT)) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Its attached texture.
     * If you want to grab other than `COLOR_ATTACHMENT0`, try [[GLCatFramebuffer.getTexture]] instead.
     */
    get texture() {
        var _a;
        return (_a = this.__textureMap.get(GL_COLOR_ATTACHMENT0)) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Dispose the framebuffer.
     */
    dispose(alsoAttached = false) {
        const { gl } = this.__glCat;
        gl.deleteFramebuffer(this.__framebuffer);
        if (alsoAttached) {
            for (const renderbuffer of this.__renderbufferMap.values()) {
                gl.deleteRenderbuffer(renderbuffer.raw);
            }
            for (const texture of this.__textureMap.values()) {
                gl.deleteTexture(texture.raw);
            }
        }
    }
    /**
     * Retrieve its attached renderbuffer.
     */
    getRenderbuffer(attachment = GL_DEPTH_ATTACHMENT) {
        var _a;
        return (_a = this.__renderbufferMap.get(attachment)) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Retrieve its attached texture.
     */
    getTexture(attachment = GL_COLOR_ATTACHMENT0) {
        var _a;
        return (_a = this.__textureMap.get(attachment)) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Attach a renderbuffer to this framebuffer.
     */
    attachRenderbuffer(renderbuffer, { attachment = GL_DEPTH_ATTACHMENT } = {}) {
        const { gl } = this.__glCat;
        this.__glCat.bindFramebuffer(this, () => {
            gl.framebufferRenderbuffer(GL_FRAMEBUFFER, attachment, GL_RENDERBUFFER, renderbuffer.raw);
        });
        this.__renderbufferMap.set(attachment, renderbuffer);
    }
    /**
     * Attach a texture to this framebuffer.
     */
    attachTexture(texture, { level = 0, attachment = GL_COLOR_ATTACHMENT0 } = {}) {
        const { gl } = this.__glCat;
        this.__glCat.bindFramebuffer(this, () => {
            gl.framebufferTexture2D(GL_FRAMEBUFFER, attachment, GL_TEXTURE_2D, texture.raw, level);
        });
        this.__textureMap.set(attachment, texture);
    }
}

/**
 * It's a WebGLProgram, but has cache of variable locations.
 */
class GLCatProgram {
    /**
     * Create a new GLCatProgram instance.
     */
    constructor(glCat, program) {
        this.__shaders = null;
        this.__attribLocationCache = {};
        this.__uniformLocationCache = {};
        this.__uniformTextureUnitMap = {};
        this.__uniformtextureUnitIndex = 0;
        this.__linked = false;
        this.__glCat = glCat;
        this.__program = program;
    }
    /**
     * Its own program.
     */
    get program() {
        return this.__program;
    }
    /**
     * Its own program. Shorter than [[GLCatProgram.program]].
     */
    get raw() {
        return this.__program;
    }
    /**
     * Its shaders.
     */
    get shaders() {
        return this.__shaders ? this.__shaders.concat() : null;
    }
    /**
     * Whether the last link operation was successful or not.
     */
    get isLinked() {
        return this.__linked;
    }
    /**
     * Dispose the program.
     */
    dispose(alsoAttached = false) {
        const { gl } = this.__glCat;
        gl.deleteProgram(this.__program);
        if (alsoAttached) {
            const shaders = this.shaders;
            if (shaders) {
                shaders.forEach((shader) => {
                    shader.dispose();
                });
            }
        }
    }
    /**
     * Attach shaders and link this program.
     */
    link(...shaders) {
        const { gl } = this.__glCat;
        shaders.forEach((shader) => gl.attachShader(this.__program, shader.raw));
        gl.linkProgram(this.__program);
        this.__linked = gl.getProgramParameter(this.__program, GL_LINK_STATUS);
        if (!this.__linked) {
            throw new Error(gl.getProgramInfoLog(this.__program));
        }
        this.__shaders = shaders.concat();
    }
    /**
     * Attach shaders and link this program.
     * It's gonna be asynchronous if you have the KHR_parallel_shader_compile extension support.
     */
    linkAsync(...shaders) {
        const glCat = this.__glCat;
        const { gl } = this.__glCat;
        const extParallel = glCat.getExtension('KHR_parallel_shader_compile');
        shaders.forEach((shader) => gl.attachShader(this.__program, shader.raw));
        gl.linkProgram(this.__program);
        return new Promise((resolve, reject) => {
            const update = () => {
                if (!extParallel ||
                    gl.getProgramParameter(this.__program, GL_COMPLETION_STATUS_KHR) === true) {
                    this.__linked = gl.getProgramParameter(this.__program, GL_LINK_STATUS);
                    if (!this.__linked) {
                        reject(gl.getProgramInfoLog(this.__program));
                        return;
                    }
                    this.__shaders = shaders.concat();
                    resolve();
                    return;
                }
                requestAnimationFrame(update);
            };
            update();
        });
    }
    /**
     * Attach an attribute variable.
     * @param name Name of the attribute variable
     * @param buffer Vertex buffer. Can be null, to disable attribute array
     * @param size Number of components per vertex. Must be 1, 2, 3 or 4
     */
    attribute(name, buffer, size = 1, divisor = 0, type = GL_FLOAT, stride = 0, offset = 0) {
        const { gl } = this.__glCat;
        const location = this.getAttribLocation(name);
        if (location === -1) {
            return;
        }
        if (buffer === null) {
            gl.disableVertexAttribArray(location);
            return;
        }
        this.__glCat.bindVertexBuffer(buffer, () => {
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, size, type, false, stride, offset);
            if (gl instanceof WebGL2RenderingContext) {
                gl.vertexAttribDivisor(location, divisor);
            }
            else {
                const ext = this.__glCat.getExtension('ANGLE_instanced_arrays');
                if (ext) {
                    ext.vertexAttribDivisorANGLE(location, divisor);
                }
            }
        });
    }
    /**
     * Attach an uniform variable.
     * See also: [[GLCatProgram.uniformVector]]
     */
    uniform(name, type, ...value) {
        const func = this['uniform' + type];
        func.call(this, name, ...value);
    }
    /**
     * Attach an uniform variable.
     * See also: [[GLCatProgram.uniform]]
     */
    uniformVector(name, type, value) {
        const func = this['uniform' + type];
        func.call(this, name, value);
    }
    /**
     * Attach an uniform1i variable.
     */
    uniform1i(name, value) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniform1i(location, value);
        });
    }
    /**
     * Attach an uniform2i variable.
     */
    uniform2i(name, x, y) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniform2i(location, x, y);
        });
    }
    /**
     * Attach an uniform3i variable.
     */
    uniform3i(name, x, y, z) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniform3i(location, x, y, z);
        });
    }
    /**
     * Attach an uniform4i variable.
     */
    uniform4i(name, x, y, z, w) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniform4i(location, x, y, z, w);
        });
    }
    /**
     * Attach an uniform1iv variable.
     */
    uniform1iv(name, array) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniform1iv(location, array);
        });
    }
    /**
     * Attach an uniform2iv variable.
     */
    uniform2iv(name, array) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniform2iv(location, array);
        });
    }
    /**
     * Attach an uniform3iv variable.
     */
    uniform3iv(name, array) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniform3iv(location, array);
        });
    }
    /**
     * Attach an uniform4iv variable.
     */
    uniform4iv(name, array) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniform4iv(location, array);
        });
    }
    /**
     * Attach an uniform1f variable.
     */
    uniform1f(name, value) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniform1f(location, value);
        });
    }
    /**
     * Attach an uniform2f variable.
     */
    uniform2f(name, x, y) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniform2f(location, x, y);
        });
    }
    /**
     * Attach an uniform3f variable.
     */
    uniform3f(name, x, y, z) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniform3f(location, x, y, z);
        });
    }
    /**
     * Attach an uniform4f variable.
     */
    uniform4f(name, x, y, z, w) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniform4f(location, x, y, z, w);
        });
    }
    /**
     * Attach an uniform1fv variable.
     */
    uniform1fv(name, array) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniform1fv(location, array);
        });
    }
    /**
     * Attach an uniform2fv variable.
     */
    uniform2fv(name, array) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniform2fv(location, array);
        });
    }
    /**
     * Attach an uniform3fv variable.
     */
    uniform3fv(name, array) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniform3fv(location, array);
        });
    }
    /**
     * Attach an uniform4fv variable.
     */
    uniform4fv(name, array) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniform4fv(location, array);
        });
    }
    /**
     * Attach an uniformMatrix2fv variable.
     */
    uniformMatrix2fv(name, array, transpose = false) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniformMatrix2fv(location, transpose, array);
        });
    }
    /**
     * Attach an uniformMatrix3fv variable.
     */
    uniformMatrix3fv(name, array, transpose = false) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniformMatrix3fv(location, transpose, array);
        });
    }
    /**
     * Attach an uniformMatrix4fv variable.
     */
    uniformMatrix4fv(name, array, transpose = false) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        this.__glCat.useProgram(this, () => {
            gl.uniformMatrix4fv(location, transpose, array);
        });
    }
    /**
     * Attach a `sampler2D` type uniform texture.
     * @param name Name of the uniform texture
     * @param texture Texture object
     */
    uniformTexture(name, texture) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        const unit = this.getUniformTextureUnit(name);
        gl.activeTexture(GL_TEXTURE0 + unit);
        this.__glCat.bindTexture2D(texture !== null && texture !== void 0 ? texture : null);
        this.__glCat.useProgram(this, () => {
            gl.uniform1i(location, unit);
        });
    }
    /**
     * Attach a `samplerCube` type uniform texture.
     * @param name Name of the uniform texture
     * @param texture Texture object
     */
    uniformCubemap(name, texture) {
        const { gl } = this.__glCat;
        const location = this.getUniformLocation(name);
        const unit = this.getUniformTextureUnit(name);
        gl.activeTexture(GL_TEXTURE0 + unit);
        this.__glCat.bindTextureCubeMap(texture !== null && texture !== void 0 ? texture : null);
        this.__glCat.useProgram(this, () => {
            gl.uniform1i(location, unit);
        });
    }
    /**
     * Retrieve attribute location.
     */
    getAttribLocation(name) {
        const { gl } = this.__glCat;
        if (this.__attribLocationCache[name] !== undefined) {
            return this.__attribLocationCache[name];
        }
        else {
            const location = gl.getAttribLocation(this.__program, name);
            // if ( location === -1 ) {
            //   this.glCat.spit( 'GLCatProgram.getAttribLocation: Could not retrieve attribute location' );
            //   return -1;
            // }
            this.__attribLocationCache[name] = location;
            return location;
        }
    }
    /**
     * Retrieve uniform location.
     */
    getUniformLocation(name) {
        const { gl } = this.__glCat;
        if (this.__uniformLocationCache[name] !== undefined) {
            return this.__uniformLocationCache[name];
        }
        else {
            const location = gl.getUniformLocation(this.__program, name);
            // if ( location === null ) {
            //   this.glCat.spit( 'GLCatProgram.getUniformLocation: Could not retrieve uniform location' );
            //   return location;
            // }
            this.__uniformLocationCache[name] = location;
            return location;
        }
    }
    /**
     * Retrieve or create a texture unit that corresponds to given name.
     */
    getUniformTextureUnit(name) {
        if (this.__uniformTextureUnitMap[name] === undefined) {
            this.__uniformTextureUnitMap[name] = this.__uniformtextureUnitIndex;
            this.__uniformtextureUnitIndex++;
        }
        return this.__uniformTextureUnitMap[name];
    }
}

/**
 * It's a WebGLRenderbuffer.
 */
class GLCatRenderbuffer {
    /**
     * Create a new GLCatTexture instance.
     */
    constructor(glCat, renderbuffer) {
        this.__width = 0;
        this.__height = 0;
        this.__glCat = glCat;
        this.__renderbuffer = renderbuffer;
    }
    /**
     * Its own renderbuffer.
     */
    get renderbuffer() {
        return this.__renderbuffer;
    }
    /**
     * Its own renderbuffer. Shorter than [[GLCatRenderBuffer.renderbuffer]].
     */
    get raw() {
        return this.__renderbuffer;
    }
    /**
     * Its width.
     */
    get width() {
        return this.__width;
    }
    /**
     * Its height.
     */
    get height() {
        return this.__height;
    }
    /**
     * Dispose the renderbuffer.
     */
    dispose() {
        this.__glCat.gl.deleteRenderbuffer(this.__renderbuffer);
    }
    /**
     * Initialize this renderbuffer.
     */
    init(width, height, { format = this.__glCat.preferredDepthFormat } = {}) {
        const { gl } = this.__glCat;
        this.__glCat.bindRenderbuffer(this, () => {
            gl.renderbufferStorage(GL_RENDERBUFFER, format, width, height);
        });
        this.__width = width;
        this.__height = height;
    }
    /**
     * Initialize this renderbuffer with multisample enabled.
     * If you are using WebGL1, it will fallback to non multisample one instead.
     */
    initMultisample(width, height, { samples = this.__glCat.preferredMultisampleSamples, format = GL_DEPTH_ATTACHMENT } = {}) {
        const { gl } = this.__glCat;
        this.__glCat.bindRenderbuffer(this, () => {
            if (gl instanceof WebGL2RenderingContext) {
                gl.renderbufferStorageMultisample(GL_RENDERBUFFER, samples, format, width, height);
            }
            else {
                gl.renderbufferStorage(GL_RENDERBUFFER, format, width, height);
            }
        });
        this.__width = width;
        this.__height = height;
    }
}

/**
 * It's a WebGLShader.
 */
class GLCatShader {
    /**
     * Create a new GLCatShader instance.
     */
    constructor(glCat, shader) {
        this.__compiled = false;
        this.__glCat = glCat;
        this.__shader = shader;
    }
    /**
     * Its own shader.
     */
    get shader() {
        return this.__shader;
    }
    /**
     * Its own shader. Shorter than [[GLCatShader.shader]].
     */
    get raw() {
        return this.__shader;
    }
    /**
     * Dispose the shader.
     */
    dispose() {
        this.__glCat.gl.deleteShader(this.__shader);
    }
    /**
     * Return whether the last compilation was successful or not.
     */
    isCompiled() {
        return this.__compiled;
    }
    /**
     * Compile the shader.
     */
    compile(code) {
        const { gl } = this.__glCat;
        gl.shaderSource(this.__shader, code);
        gl.compileShader(this.__shader);
        this.__compiled = gl.getShaderParameter(this.__shader, GL_COMPILE_STATUS);
        if (!this.__compiled) {
            throw new Error(gl.getShaderInfoLog(this.__shader));
        }
    }
}

const zeroTextureArray = new Uint8Array([0, 0, 0, 0]);
/**
 * It's a WebGLTexture.
 */
class GLCatTexture {
    /**
     * Create a new GLCatTexture instance.
     */
    constructor(glCat, texture) {
        this.__width = 0;
        this.__height = 0;
        this.__glCat = glCat;
        this.__texture = texture;
        this.textureFilter(GL_LINEAR);
        this.textureWrap(GL_CLAMP_TO_EDGE);
    }
    /**
     * Its own texture.
     */
    get texture() {
        return this.__texture;
    }
    /**
     * Its own texture. Shorter than [[GLCatTexture.textured]]
     */
    get raw() {
        return this.__texture;
    }
    /**
     * Its width.
     */
    get width() {
        return this.__width;
    }
    /**
     * Its height.
     */
    get height() {
        return this.__height;
    }
    /**
     * Dispose the texture.
     */
    dispose() {
        this.__glCat.gl.deleteTexture(this.__texture);
    }
    textureFilter(filterMag = GL_NEAREST, filterMin = filterMag) {
        const { gl } = this.__glCat;
        this.__glCat.bindTexture2D(this, () => {
            gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, filterMag);
            gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, filterMin);
        });
    }
    textureWrap(wrapS = GL_CLAMP_TO_EDGE, wrapT = wrapS) {
        const { gl } = this.__glCat;
        this.__glCat.bindTexture2D(this, () => {
            gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, wrapS);
            gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, wrapT);
        });
    }
    /**
     * Initialize the texture.
     */
    texStorage2D(width, height, { target = GL_TEXTURE_2D, level = 1, format = GL_RGBA8 } = {}) {
        const { gl } = this.__glCat;
        if (gl instanceof WebGL2RenderingContext) {
            this.__glCat.bindTexture2D(this, () => {
                gl.texStorage2D(target, level, format, width, height);
            });
        }
        else {
            throw GLCatErrors.WebGL2ExclusiveError;
        }
    }
    /**
     * Return a value for the passed parameter name.
     * See: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter
     */
    getParameter(pname) {
        const { gl } = this.__glCat;
        return this.__glCat.bindTexture2D(this, () => {
            return gl.getParameter(pname);
        });
    }
    /**
     * Specify the pixel storage modes.
     * See: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/pixelStorei
     */
    pixelStorei(pname, param) {
        const { gl } = this.__glCat;
        this.__glCat.bindTexture2D(this, () => {
            gl.pixelStorei(pname, param);
        });
    }
    /**
     * Set new data into this texture.
     */
    setTexture(source) {
        const { gl } = this.__glCat;
        this.__glCat.bindTexture2D(this, () => {
            gl.texImage2D(GL_TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
        });
        this.__width = source.width;
        this.__height = source.height;
    }
    /**
     * Set new data into this texture.
     * This function uses TypedArray. If you want to source image data, use `GLCat.setTexture()` instead.
     */
    setTextureFromArray(width, height, source, { internalformat = GL_RGBA8, format = GL_RGBA, type = GL_UNSIGNED_BYTE } = {}) {
        const { gl } = this.__glCat;
        let iformat = internalformat;
        if (!(gl instanceof WebGL2RenderingContext)) {
            if (type === GL_HALF_FLOAT) {
                this.__glCat.getExtension('OES_texture_half_float', true);
                this.__glCat.getExtension('OES_texture_half_float_linear');
            }
            else if (type === GL_FLOAT) {
                this.__glCat.getExtension('OES_texture_float', true);
                this.__glCat.getExtension('OES_texture_float_linear');
            }
            iformat = format;
        }
        this.__glCat.bindTexture2D(this, () => {
            gl.texImage2D(GL_TEXTURE_2D, 0, iformat, width, height, 0, format, type, source);
        });
        this.__width = width;
        this.__height = height;
    }
    /**
     * Copy pixels from current framebuffer to given texture.
     */
    copyTexture(width, height) {
        const { gl } = this.__glCat;
        this.__glCat.bindTexture2D(this, () => {
            gl.copyTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, 0, 0, width, height, 0);
        });
        this.__width = width;
        this.__height = height;
    }
    /**
     * Set new cubemap data into this texture.
     * @param textures Array of iamges. Order: `X+`, `X-`, `Y+`, `Y-`, `Z+`, `Z-`
     * @todo due to compatibility of its `width` and `height` it should not be used yet
     */
    setCubemap(textures) {
        const { gl } = this.__glCat;
        this.__glCat.bindTextureCubeMap(this, () => {
            for (let i = 0; i < 6; i++) {
                gl.texImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, GL_RGBA, GL_RGBA, GL_UNSIGNED_BYTE, textures[i]);
            }
            gl.texParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
            gl.texParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
            gl.texParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
            gl.texParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
        });
    }
    /**
     * Set [ 0, 0, 0, 0 ] to this texture.
     * Useful for temporary use..
     */
    setZeroTexture() {
        this.setTextureFromArray(1, 1, zeroTextureArray);
    }
}

/**
 * It's a WebGLVertexArrayObject.
 */
class GLCatVertexArray {
    /**
     * Create a new GLCatBuffer instance.
     */
    constructor(glCat, vertexArray) {
        this.__glCat = glCat;
        this.__vertexArray = vertexArray;
    }
    /**
     * Its own buffer.
     */
    get buffer() {
        return this.__vertexArray;
    }
    /**
     * Its own buffer. Shorter than [[GLCatBuffer.buffer]].
     */
    get raw() {
        return this.__vertexArray;
    }
    /**
     * Dispose the buffer.
     */
    dispose() {
        const { gl } = this.__glCat;
        if (gl instanceof WebGL2RenderingContext) {
            gl.deleteVertexArray(this.__vertexArray);
        }
        else {
            const ext = this.__glCat.getExtension('OES_vertex_array_object', true);
            ext.deleteVertexArrayOES(this.__vertexArray);
        }
    }
    /**
     * Bind a vertex buffer to the vertex array.
     */
    bindVertexbuffer(source, location, size = 1, divisor = 0, type = GL_FLOAT, stride = 0, offset = 0) {
        const { gl } = this.__glCat;
        this.__glCat.bindVertexArray(this, () => {
            gl.bindBuffer(GL_ARRAY_BUFFER, source.raw);
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, size, type, false, stride, offset);
            if (gl instanceof WebGL2RenderingContext) {
                gl.vertexAttribDivisor(location, divisor);
            }
            else {
                const ext = this.__glCat.getExtension('ANGLE_instanced_arrays');
                if (ext) {
                    ext.vertexAttribDivisorANGLE(location, divisor);
                }
            }
        });
    }
    /**
     * Bind an index buffer to the vertex array.
     */
    bindIndexbuffer(source) {
        const { gl } = this.__glCat;
        this.__glCat.bindVertexArray(this, () => {
            gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, source.raw);
        });
    }
}

/**
 * WebGL wrapper with plenty of hackability.
 */
class GLCat {
    /**
     * Create a new GLCat instance.
     * Rendering context is required.
     */
    constructor(gl) {
        this.preferredMultisampleSamples = 4;
        this.__preferredDepthFormat = null;
        this.__bindHelperVertexBuffer = new BindHelper(null, (buffer) => {
            var _a;
            const gl = this.__gl;
            gl.bindBuffer(GL_ARRAY_BUFFER, (_a = buffer === null || buffer === void 0 ? void 0 : buffer.raw) !== null && _a !== void 0 ? _a : null);
        });
        this.__bindHelperIndexBuffer = new BindHelper(null, (buffer) => {
            var _a;
            const gl = this.__gl;
            gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, (_a = buffer === null || buffer === void 0 ? void 0 : buffer.raw) !== null && _a !== void 0 ? _a : null);
        });
        this.__bindHelperVertexArray = new BindHelper(null, (vertexArray) => {
            var _a;
            this.rawBindVertexArray((_a = vertexArray === null || vertexArray === void 0 ? void 0 : vertexArray.raw) !== null && _a !== void 0 ? _a : null);
        });
        this.__bindHelperTexture2D = new BindHelper(null, (texture) => {
            var _a;
            const gl = this.__gl;
            gl.bindTexture(GL_TEXTURE_2D, (_a = texture === null || texture === void 0 ? void 0 : texture.raw) !== null && _a !== void 0 ? _a : null);
        });
        this.__bindHelperTextureCubeMap = new BindHelper(null, (texture) => {
            var _a;
            const gl = this.__gl;
            gl.bindTexture(GL_TEXTURE_CUBE_MAP, (_a = texture === null || texture === void 0 ? void 0 : texture.raw) !== null && _a !== void 0 ? _a : null);
        });
        this.__bindHelperRenderbuffer = new BindHelper(null, (renderbuffer) => {
            var _a;
            const gl = this.__gl;
            gl.bindRenderbuffer(GL_RENDERBUFFER, (_a = renderbuffer === null || renderbuffer === void 0 ? void 0 : renderbuffer.raw) !== null && _a !== void 0 ? _a : null);
        });
        this.__bindHelperFramebuffer = new BindHelper(null, (framebuffer) => {
            var _a;
            const gl = this.__gl;
            gl.bindFramebuffer(GL_FRAMEBUFFER, (_a = framebuffer === null || framebuffer === void 0 ? void 0 : framebuffer.raw) !== null && _a !== void 0 ? _a : null);
        });
        this.__bindHelperProgram = new BindHelper(null, (program) => {
            var _a;
            const gl = this.__gl;
            gl.useProgram((_a = program === null || program === void 0 ? void 0 : program.raw) !== null && _a !== void 0 ? _a : null);
        });
        this.__bindHelperDrawBuffers = new BindHelper([GL_COLOR_ATTACHMENT0], (buffers) => {
            this.rawDrawBuffers(buffers);
        });
        this.__extensionCache = {};
        this.__gl = gl;
        gl.enable(GL_DEPTH_TEST);
        gl.depthFunc(GL_LEQUAL);
        gl.enable(GL_BLEND);
        gl.blendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    }
    static throwIfNull(v) {
        if (v == null) {
            throw GLCatErrors.UnexpectedNullError;
        }
        else {
            return v;
        }
    }
    get preferredDepthFormat() {
        if (this.__preferredDepthFormat !== null) {
            return this.__preferredDepthFormat;
        }
        else if (this.__gl instanceof WebGL2RenderingContext) {
            return GL_DEPTH24_STENCIL8;
        }
        else {
            return GL_DEPTH_COMPONENT16;
        }
    }
    set preferredDepthFormat(format) {
        this.__preferredDepthFormat = format;
    }
    /**
     * Its own rendering context.
     */
    get renderingContext() {
        return this.__gl;
    }
    /**
     * Its own rendering context. Shorter than [[GLCat.renderingContext]]
     */
    get gl() {
        return this.__gl;
    }
    /**
     * A dummy texture, 100% organic pure #FF00FF texture.
     */
    get dummyTexture() {
        if (this.__dummyTextureCache) {
            return this.__dummyTextureCache;
        }
        const texture = this.createTexture();
        texture.setTextureFromArray(1, 1, new Uint8Array([255, 0, 255, 255]));
        this.__dummyTextureCache = texture;
        return texture;
    }
    getExtension(name, throwIfNotFound) {
        const gl = this.__gl;
        if (this.__extensionCache[name]) {
            return this.__extensionCache[name];
        }
        else {
            this.__extensionCache[name] = gl.getExtension(name);
            if (this.__extensionCache[name]) {
                return this.__extensionCache[name];
            }
            else {
                if (throwIfNotFound) {
                    throw new Error('GLCat.getExtension: The extension "' + name + '" is not supported');
                }
                return null;
            }
        }
    }
    /**
     * Retrieve extensions.
     * If they are your precious ones and you cannot live without them, turn on `throwIfNotFound`.
     */
    getExtensions(names, throwIfNotFound) {
        return names.map((n) => this.getExtension(n, throwIfNotFound));
    }
    /**
     * Create a new shader object.
     */
    createShader(type) {
        const gl = this.__gl;
        const shader = GLCat.throwIfNull(gl.createShader(type));
        return new GLCatShader(this, shader);
    }
    /**
     * Create a new GLCat program object.
     */
    createProgram() {
        const gl = this.__gl;
        const program = GLCat.throwIfNull(gl.createProgram());
        return new GLCatProgram(this, program);
    }
    /**
     * Create a new GLCat program object, in lazier way.
     */
    lazyProgram(vert, frag) {
        let vertexShader;
        try {
            // == vert ===================================================================================
            vertexShader = this.createShader(GL_VERTEX_SHADER);
            vertexShader.compile(vert);
            // == frag ===================================================================================
            const fragmentShader = this.createShader(GL_FRAGMENT_SHADER);
            fragmentShader.compile(frag);
            // == program ================================================================================
            const program = this.createProgram();
            program.link(vertexShader, fragmentShader);
            // == almost done ============================================================================
            return program;
        }
        catch (e) {
            vertexShader === null || vertexShader === void 0 ? void 0 : vertexShader.dispose();
            throw e;
        }
    }
    /**
     * Create a new GLCat program object, in lazier way.
     * It's gonna be asynchronous if you have the KHR_parallel_shader_compile extension support.
     */
    lazyProgramAsync(vert, frag) {
        try {
            // == vert ===================================================================================
            const vertexShader = this.createShader(GL_VERTEX_SHADER);
            vertexShader.compile(vert);
            // == frag ===================================================================================
            const fragmentShader = this.createShader(GL_FRAGMENT_SHADER);
            fragmentShader.compile(frag);
            // == program ================================================================================
            const program = this.createProgram();
            return program.linkAsync(vertexShader, fragmentShader).then(() => {
                return program;
            }).catch((e) => {
                program === null || program === void 0 ? void 0 : program.dispose();
                fragmentShader === null || fragmentShader === void 0 ? void 0 : fragmentShader.dispose();
                vertexShader === null || vertexShader === void 0 ? void 0 : vertexShader.dispose();
                return Promise.reject(e);
            });
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    /**
     * Specify a program to use.
     * If callback is provided, it will execute the callback immediately, and undo the usage after the callback.
     */
    useProgram(program, callback) {
        return this.__bindHelperProgram.bind(program, callback);
    }
    /**
     * Create a new vertex buffer.
     */
    createBuffer() {
        const gl = this.__gl;
        const buffer = GLCat.throwIfNull(gl.createBuffer());
        return new GLCatBuffer(this, buffer);
    }
    /**
     * Bind a vertex buffer.
     * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
     */
    bindVertexBuffer(buffer, callback) {
        return this.__bindHelperVertexBuffer.bind(buffer, callback);
    }
    /**
     * Bind an index buffer.
     * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
     */
    bindIndexBuffer(buffer, callback) {
        return this.__bindHelperIndexBuffer.bind(buffer, callback);
    }
    /**
     * Create a new vertex array.
     */
    createVertexArray() {
        const gl = this.__gl;
        if (gl instanceof WebGL2RenderingContext) {
            const vertexArray = GLCat.throwIfNull(gl.createVertexArray());
            return new GLCatVertexArray(this, vertexArray);
        }
        else {
            const ext = this.getExtension('OES_vertex_array_object', true);
            const vertexArray = GLCat.throwIfNull(ext.createVertexArrayOES());
            return new GLCatVertexArray(this, vertexArray);
        }
    }
    /**
     * Wrapper of `gl.bindVertexArray`.
     *
     * {@link rawBindVertexArray} is better.
     */
    rawBindVertexArray(array) {
        const gl = this.__gl;
        if (gl instanceof WebGL2RenderingContext) {
            gl.bindVertexArray(array);
        }
        else {
            const ext = this.getExtension('OES_vertex_array_object', true);
            ext.bindVertexArrayOES(array);
        }
    }
    /**
     * {@link rawBindVertexArray} but better.
     *
     * Bind a vertex array.
     * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
     */
    bindVertexArray(vertexArray, callback) {
        return this.__bindHelperVertexArray.bind(vertexArray, callback);
    }
    /**
     * Create a new texture.
     */
    createTexture() {
        const gl = this.__gl;
        const texture = GLCat.throwIfNull(gl.createTexture());
        return new GLCatTexture(this, texture);
    }
    /**
     * Bind a 2D texture.
     * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
     */
    bindTexture2D(texture, callback) {
        return this.__bindHelperTexture2D.bind(texture, callback);
    }
    /**
     * Bind a cubemap texture.
     * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
     */
    bindTextureCubeMap(texture, callback) {
        return this.__bindHelperTextureCubeMap.bind(texture, callback);
    }
    /**
     * Create a new renderbuffer.
     */
    createRenderbuffer() {
        const gl = this.__gl;
        const renderbuffer = GLCat.throwIfNull(gl.createRenderbuffer());
        return new GLCatRenderbuffer(this, renderbuffer);
    }
    /**
     * Bind a renderbuffer.
     * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
     */
    bindRenderbuffer(renderbuffer, callback) {
        return this.__bindHelperRenderbuffer.bind(renderbuffer, callback);
    }
    /**
     * Create a new framebuffer.
     */
    createFramebuffer() {
        const gl = this.__gl;
        const framebuffer = GLCat.throwIfNull(gl.createFramebuffer());
        return new GLCatFramebuffer(this, framebuffer);
    }
    /**
     * Bind a framebuffer.
     * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
     */
    bindFramebuffer(framebuffer, callback) {
        return this.__bindHelperFramebuffer.bind(framebuffer, callback);
    }
    /**
     * Create a new framebufer, in lazier way.
     */
    lazyFramebuffer(width, height, { isFloat = false, depthFormat = this.preferredDepthFormat } = {}) {
        let texture;
        let renderbuffer;
        let framebuffer;
        try {
            // == framebuffer ============================================================================
            framebuffer = this.createFramebuffer();
            // == renderbuffer ===========================================================================
            renderbuffer = this.createRenderbuffer();
            renderbuffer.init(width, height, { format: depthFormat });
            framebuffer.attachRenderbuffer(renderbuffer, { attachment: GL_DEPTH_ATTACHMENT });
            // == texture ================================================================================
            texture = this.createTexture();
            if (isFloat) {
                texture.setTextureFromArray(width, height, null, { internalformat: GL_RGBA32F, format: GL_RGBA, type: GL_FLOAT });
            }
            else {
                texture.setTextureFromArray(width, height, null);
            }
            framebuffer.attachTexture(texture);
            // == almost done ============================================================================
            return framebuffer;
        }
        catch (e) {
            framebuffer === null || framebuffer === void 0 ? void 0 : framebuffer.dispose();
            texture === null || texture === void 0 ? void 0 : texture.dispose();
            renderbuffer === null || renderbuffer === void 0 ? void 0 : renderbuffer.dispose();
            throw e;
        }
    }
    /**
     * Create a new multisample framebuffer, in lazier way.
     */
    lazyMultisampleFramebuffer(width, height, { samples = 4, isFloat = false, depthFormat = this.preferredDepthFormat, fallbackWebGL1 = true } = {}) {
        const gl = this.__gl;
        if (gl instanceof WebGL2RenderingContext) {
            let renderbufferDepth;
            let framebuffer;
            try {
                // == framebuffer ==========================================================================
                framebuffer = this.createFramebuffer();
                // == renderbuffer depth ===================================================================
                renderbufferDepth = this.createRenderbuffer();
                renderbufferDepth.initMultisample(width, height, { samples, format: depthFormat });
                framebuffer.attachRenderbuffer(renderbufferDepth, { attachment: GL_DEPTH_ATTACHMENT });
                // == renderbuffer color ===================================================================
                const renderbufferColor = this.createRenderbuffer();
                const colorFormat = isFloat ? GL_RGBA32F : GL_RGBA8;
                renderbufferColor.initMultisample(width, height, { samples, format: colorFormat });
                framebuffer.attachRenderbuffer(renderbufferColor, { attachment: GL_COLOR_ATTACHMENT0 });
                // == almost done ==========================================================================
                return framebuffer;
            }
            catch (e) {
                framebuffer === null || framebuffer === void 0 ? void 0 : framebuffer.dispose();
                renderbufferDepth === null || renderbufferDepth === void 0 ? void 0 : renderbufferDepth.dispose();
                throw e;
            }
        }
        else if (fallbackWebGL1) {
            return this.lazyFramebuffer(width, height, { isFloat });
        }
        else {
            throw GLCatErrors.WebGL2ExclusiveError;
        }
    }
    /**
     * Create a new draw buffers, in lazier way.
     * If you can't grab `WEBGL_draw_buffers` extension, you'll die instantly at this point.
     */
    lazyDrawbuffers(width, height, numBuffers, { isFloat = false, depthFormat = this.preferredDepthFormat } = {}) {
        if (GL_MAX_DRAW_BUFFERS < numBuffers) {
            throw new Error('GLCat: Maximum draw buffers count exceeded');
        }
        const textures = [];
        let framebuffer;
        try {
            // == framebuffer ============================================================================
            framebuffer = this.createFramebuffer();
            // == renderbuffer ===========================================================================
            const renderbuffer = this.createRenderbuffer();
            renderbuffer.init(width, height, { format: depthFormat });
            framebuffer.attachRenderbuffer(renderbuffer, { attachment: GL_DEPTH_ATTACHMENT });
            // == texture ================================================================================
            for (let i = 0; i < numBuffers; i++) {
                const texture = this.createTexture();
                if (isFloat) {
                    texture.setTextureFromArray(width, height, null, { internalformat: GL_RGBA32F, format: GL_RGBA, type: GL_FLOAT });
                }
                else {
                    texture.setTextureFromArray(width, height, null);
                }
                framebuffer.attachTexture(texture, { attachment: GL_COLOR_ATTACHMENT0 + i });
            }
            // == almost done ============================================================================
            return framebuffer;
        }
        catch (e) {
            textures.forEach((texture) => {
                texture.dispose();
            });
            framebuffer === null || framebuffer === void 0 ? void 0 : framebuffer.dispose();
            throw e;
        }
    }
    /**
     * Wrapper of `gl.drawBuffers`.
     *
     * {@link drawBuffers} is better.
     */
    rawDrawBuffers(buffers) {
        const gl = this.__gl;
        if (gl instanceof WebGL2RenderingContext) {
            gl.drawBuffers(buffers);
        }
        else {
            const ext = this.getExtension('WEBGL_draw_buffers');
            ext === null || ext === void 0 ? void 0 : ext.drawBuffersWEBGL(buffers);
        }
    }
    /**
     * {@link rawDrawBuffers} but better.
     *
     * Call this before you're gonna use draw buffers.
     * If you can't grab `WEBGL_draw_buffers` extension, you'll die instantly at this point.
     * If callback is provided, it will execute the callback immediately, and undo the draw buffers after the callback.
     */
    drawBuffers(buffersOrNumBuffers, callback) {
        let buffers;
        if (Array.isArray(buffersOrNumBuffers)) {
            buffers = buffersOrNumBuffers;
        }
        else if (buffersOrNumBuffers) {
            buffers = [];
            for (let i = 0; i < buffersOrNumBuffers; i++) {
                buffers[i] = GL_COLOR_ATTACHMENT0 + i;
            }
        }
        else {
            buffers = [GL_COLOR_ATTACHMENT0];
        }
        return this.__bindHelperDrawBuffers.bind(buffers, callback);
    }
    /**
     * a wrapper of drawElementsInstanced.
     */
    drawArraysInstanced(mode, first, count, primcount) {
        const { gl } = this;
        if (gl instanceof WebGL2RenderingContext) {
            gl.drawArraysInstanced(mode, first, count, primcount);
        }
        else {
            const ext = this.getExtension('ANGLE_instanced_arrays', true);
            ext.drawArraysInstancedANGLE(mode, first, count, primcount);
        }
    }
    /**
     * a wrapper of drawElementsInstanced.
     */
    drawElementsInstanced(mode, count, type, offset, instanceCount) {
        const { gl } = this;
        if (gl instanceof WebGL2RenderingContext) {
            gl.drawElementsInstanced(mode, count, type, offset, instanceCount);
        }
        else {
            const ext = this.getExtension('ANGLE_instanced_arrays', true);
            ext.drawElementsInstancedANGLE(mode, count, type, offset, instanceCount);
        }
    }
    /**
     * Clear the current framebuffer.
     */
    clear(red = 0.0, green = 0.0, blue = 0.0, alpha = 1.0, depth = 1.0) {
        const gl = this.__gl;
        gl.clearColor(red, green, blue, alpha);
        gl.clearDepth(depth);
        gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    }
    /**
     * Basically just a `gl.blitFramebuffer`.
     */
    blitFramebuffer(src, dst, _a) {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        var { srcViewport = [0, 0, (_c = (_b = src === null || src === void 0 ? void 0 : src.renderbuffer) === null || _b === void 0 ? void 0 : _b.width) !== null && _c !== void 0 ? _c : 0, (_e = (_d = src === null || src === void 0 ? void 0 : src.renderbuffer) === null || _d === void 0 ? void 0 : _d.height) !== null && _e !== void 0 ? _e : 0], dstViewport = [0, 0, (_g = (_f = dst === null || dst === void 0 ? void 0 : dst.renderbuffer) === null || _f === void 0 ? void 0 : _f.width) !== null && _g !== void 0 ? _g : 0, (_j = (_h = dst === null || dst === void 0 ? void 0 : dst.renderbuffer) === null || _h === void 0 ? void 0 : _h.height) !== null && _j !== void 0 ? _j : 0], mask = GL_COLOR_BUFFER_BIT, filter = GL_NEAREST } = _a === void 0 ? {} : _a;
        const gl = this.__gl;
        if (gl instanceof WebGL2RenderingContext) {
            gl.bindFramebuffer(GL_READ_FRAMEBUFFER, (_k = src === null || src === void 0 ? void 0 : src.raw) !== null && _k !== void 0 ? _k : null);
            gl.bindFramebuffer(GL_DRAW_FRAMEBUFFER, (_l = dst === null || dst === void 0 ? void 0 : dst.raw) !== null && _l !== void 0 ? _l : null);
            gl.blitFramebuffer(srcViewport[0], srcViewport[1], srcViewport[2], srcViewport[3], dstViewport[0], dstViewport[1], dstViewport[2], dstViewport[3], mask, filter);
            gl.bindFramebuffer(GL_READ_FRAMEBUFFER, null);
            gl.bindFramebuffer(GL_DRAW_FRAMEBUFFER, null);
        }
        else {
            throw GLCatErrors.WebGL2ExclusiveError;
        }
    }
}

export default GLCat;
export { GLCat, GLCatBuffer, GLCatFramebuffer, GLCatProgram, GLCatRenderbuffer, GLCatShader, GLCatTexture, GLCatVertexArray };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xjYXQubW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvR0xDb25zdGFudHMudHMiLCIuLi9zcmMvdXRpbHMvQmluZEhlbHBlci50cyIsIi4uL3NyYy9HTENhdEJ1ZmZlci50cyIsIi4uL3NyYy9HTENhdEVycm9ycy50cyIsIi4uL3NyYy9HTENhdEZyYW1lYnVmZmVyLnRzIiwiLi4vc3JjL0dMQ2F0UHJvZ3JhbS50cyIsIi4uL3NyYy9HTENhdFJlbmRlcmJ1ZmZlci50cyIsIi4uL3NyYy9HTENhdFNoYWRlci50cyIsIi4uL3NyYy9HTENhdFRleHR1cmUudHMiLCIuLi9zcmMvR0xDYXRWZXJ0ZXhBcnJheS50cyIsIi4uL3NyYy9HTENhdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgR0xfQUNUSVZFX0FUVFJJQlVURVMgPSAweDhiODk7XG5leHBvcnQgY29uc3QgR0xfQUNUSVZFX1RFWFRVUkUgPSAweDg0ZTA7XG5leHBvcnQgY29uc3QgR0xfQUNUSVZFX1VOSUZPUk1fQkxPQ0tTID0gMHg4YTM2O1xuZXhwb3J0IGNvbnN0IEdMX0FDVElWRV9VTklGT1JNUyA9IDB4OGI4NjtcbmV4cG9ydCBjb25zdCBHTF9BTElBU0VEX0xJTkVfV0lEVEhfUkFOR0UgPSAweDg0NmU7XG5leHBvcnQgY29uc3QgR0xfQUxJQVNFRF9QT0lOVF9TSVpFX1JBTkdFID0gMHg4NDZkO1xuZXhwb3J0IGNvbnN0IEdMX0FMUEhBID0gMHgxOTA2O1xuZXhwb3J0IGNvbnN0IEdMX0FMUEhBX0JJVFMgPSAweDBkNTU7XG5leHBvcnQgY29uc3QgR0xfQUxSRUFEWV9TSUdOQUxFRCA9IDB4OTExYTtcbmV4cG9ydCBjb25zdCBHTF9BTFdBWVMgPSAweDAyMDc7XG5leHBvcnQgY29uc3QgR0xfQU5ZX1NBTVBMRVNfUEFTU0VEID0gMHg4YzJmO1xuZXhwb3J0IGNvbnN0IEdMX0FOWV9TQU1QTEVTX1BBU1NFRF9DT05TRVJWQVRJVkUgPSAweDhkNmE7XG5leHBvcnQgY29uc3QgR0xfQVJSQVlfQlVGRkVSID0gMHg4ODkyO1xuZXhwb3J0IGNvbnN0IEdMX0FSUkFZX0JVRkZFUl9CSU5ESU5HID0gMHg4ODk0O1xuZXhwb3J0IGNvbnN0IEdMX0FUVEFDSEVEX1NIQURFUlMgPSAweDhiODU7XG5leHBvcnQgY29uc3QgR0xfQkFDSyA9IDB4MDQwNTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORCA9IDB4MGJlMjtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9DT0xPUiA9IDB4ODAwNTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9EU1RfQUxQSEEgPSAweDgwY2E7XG5leHBvcnQgY29uc3QgR0xfQkxFTkRfRFNUX1JHQiA9IDB4ODBjODtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9FUVVBVElPTiA9IDB4ODAwOTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9FUVVBVElPTl9BTFBIQSA9IDB4ODgzZDtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9FUVVBVElPTl9SR0IgPSAweDgwMDk7XG5leHBvcnQgY29uc3QgR0xfQkxFTkRfU1JDX0FMUEhBID0gMHg4MGNiO1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX1NSQ19SR0IgPSAweDgwYzk7XG5leHBvcnQgY29uc3QgR0xfQkxVRV9CSVRTID0gMHgwZDU0O1xuZXhwb3J0IGNvbnN0IEdMX0JPT0wgPSAweDhiNTY7XG5leHBvcnQgY29uc3QgR0xfQk9PTF9WRUMyID0gMHg4YjU3O1xuZXhwb3J0IGNvbnN0IEdMX0JPT0xfVkVDMyA9IDB4OGI1ODtcbmV4cG9ydCBjb25zdCBHTF9CT09MX1ZFQzQgPSAweDhiNTk7XG5leHBvcnQgY29uc3QgR0xfQlJPV1NFUl9ERUZBVUxUX1dFQkdMID0gMHg5MjQ0O1xuZXhwb3J0IGNvbnN0IEdMX0JVRkZFUl9TSVpFID0gMHg4NzY0O1xuZXhwb3J0IGNvbnN0IEdMX0JVRkZFUl9VU0FHRSA9IDB4ODc2NTtcbmV4cG9ydCBjb25zdCBHTF9CWVRFID0gMHgxNDAwO1xuZXhwb3J0IGNvbnN0IEdMX0NDVyA9IDB4MDkwMTtcbmV4cG9ydCBjb25zdCBHTF9DTEFNUF9UT19FREdFID0gMHg4MTJmO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SID0gMHgxODAwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQwID0gMHg4Y2UwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQwX1dFQkdMID0gMHg4Y2UwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxID0gMHg4Y2UxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxX1dFQkdMID0gMHg4Y2UxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMCA9IDB4OGNlYTtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTBfV0VCR0wgPSAweDhjZWE7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDExID0gMHg4Y2ViO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMV9XRUJHTCA9IDB4OGNlYjtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTIgPSAweDhjZWM7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDEyX1dFQkdMID0gMHg4Y2VjO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMyA9IDB4OGNlZDtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTNfV0VCR0wgPSAweDhjZWQ7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDE0ID0gMHg4Y2VlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxNF9XRUJHTCA9IDB4OGNlZTtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTUgPSAweDhjZWY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDE1X1dFQkdMID0gMHg4Y2VmO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQyID0gMHg4Y2UyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQyX1dFQkdMID0gMHg4Y2UyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQzID0gMHg4Y2UzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQzX1dFQkdMID0gMHg4Y2UzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ0ID0gMHg4Y2U0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ0X1dFQkdMID0gMHg4Y2U0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ1ID0gMHg4Y2U1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ1X1dFQkdMID0gMHg4Y2U1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ2ID0gMHg4Y2U2O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ2X1dFQkdMID0gMHg4Y2U2O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ3ID0gMHg4Y2U3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ3X1dFQkdMID0gMHg4Y2U3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ4ID0gMHg4Y2U4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ4X1dFQkdMID0gMHg4Y2U4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ5ID0gMHg4Y2U5O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ5X1dFQkdMID0gMHg4Y2U5O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0JVRkZFUl9CSVQgPSAweDAwMDA0MDAwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0NMRUFSX1ZBTFVFID0gMHgwYzIyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX1dSSVRFTUFTSyA9IDB4MGMyMztcbmV4cG9ydCBjb25zdCBHTF9DT01QQVJFX1JFRl9UT19URVhUVVJFID0gMHg4ODRlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBJTEVfU1RBVFVTID0gMHg4YjgxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBMRVRJT05fU1RBVFVTX0tIUiA9IDB4OTFiMTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1IxMV9FQUMgPSAweDkyNzA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SRzExX0VBQyA9IDB4OTI3MjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQl9BVENfV0VCR0wgPSAweDhjOTI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JfRVRDMV9XRUJHTCA9IDB4OGQ2NDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQl9QVlJUQ18yQlBQVjFfSU1HID0gMHg4YzAxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCX1BWUlRDXzRCUFBWMV9JTUcgPSAweDhjMDA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JfUzNUQ19EWFQxX0VYVCA9IDB4ODNmMDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQjhfRVRDMiA9IDB4OTI3NDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQjhfUFVOQ0hUSFJPVUdIX0FMUEhBMV9FVEMyID0gMHg5Mjc4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEwWDEwX0tIUiA9IDB4OTNiYjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMFg1X0tIUiA9IDB4OTNiODtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMFg2X0tIUiA9IDB4OTNiOTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMFg4X0tIUiA9IDB4OTNiYTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMlgxMF9LSFIgPSAweDkzYmM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfMTJYMTJfS0hSID0gMHg5M2JkO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzRYNF9LSFIgPSAweDkzYjA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfNVg0X0tIUiA9IDB4OTNiMTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ181WDVfS0hSID0gMHg5M2IyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzZYNV9LSFIgPSAweDkzYjM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfNlg2X0tIUiA9IDB4OTNiNDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ184WDVfS0hSID0gMHg5M2I1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzhYNl9LSFIgPSAweDkzYjY7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfOFg4X0tIUiA9IDB4OTNiNztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVRDX0VYUExJQ0lUX0FMUEhBX1dFQkdMID0gMHg4YzkyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BVENfSU5URVJQT0xBVEVEX0FMUEhBX1dFQkdMID0gMHg4N2VlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9QVlJUQ18yQlBQVjFfSU1HID0gMHg4YzAzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9QVlJUQ180QlBQVjFfSU1HID0gMHg4YzAyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDFfRVhUID0gMHg4M2YxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDNfRVhUID0gMHg4M2YyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDVfRVhUID0gMHg4M2YzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQThfRVRDMl9FQUMgPSAweDkyNzU7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TSUdORURfUjExX0VBQyA9IDB4OTI3MTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NJR05FRF9SRzExX0VBQyA9IDB4OTI3MztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQxX0VYVCA9IDB4OGM0ZDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQzX0VYVCA9IDB4OGM0ZTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQ1X0VYVCA9IDB4OGM0ZjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfUzNUQ19EWFQxX0VYVCA9IDB4OGM0YztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEwWDEwX0tIUiA9IDB4OTNkYjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEwWDVfS0hSID0gMHg5M2Q4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTBYNl9LSFIgPSAweDkzZDk7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ18xMFg4X0tIUiA9IDB4OTNkYTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEyWDEwX0tIUiA9IDB4OTNkYztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEyWDEyX0tIUiA9IDB4OTNkZDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzRYNF9LSFIgPSAweDkzZDA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ181WDRfS0hSID0gMHg5M2QxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfNVg1X0tIUiA9IDB4OTNkMjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzZYNV9LSFIgPSAweDkzZDM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ182WDZfS0hSID0gMHg5M2Q0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfOFg1X0tIUiA9IDB4OTNkNTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzhYNl9LSFIgPSAweDkzZDY7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ184WDhfS0hSID0gMHg5M2Q3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0VUQzJfRUFDID0gMHg5Mjc3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfRVRDMiA9IDB4OTI3NjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X1BVTkNIVEhST1VHSF9BTFBIQTFfRVRDMiA9IDB4OTI3OTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1RFWFRVUkVfRk9STUFUUyA9IDB4ODZhMztcbmV4cG9ydCBjb25zdCBHTF9DT05ESVRJT05fU0FUSVNGSUVEID0gMHg5MTFjO1xuZXhwb3J0IGNvbnN0IEdMX0NPTlNUQU5UX0FMUEhBID0gMHg4MDAzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTlNUQU5UX0NPTE9SID0gMHg4MDAxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTlRFWFRfTE9TVF9XRUJHTCA9IDB4OTI0MjtcbmV4cG9ydCBjb25zdCBHTF9DT1BZX1JFQURfQlVGRkVSID0gMHg4ZjM2O1xuZXhwb3J0IGNvbnN0IEdMX0NPUFlfUkVBRF9CVUZGRVJfQklORElORyA9IDB4OGYzNjtcbmV4cG9ydCBjb25zdCBHTF9DT1BZX1dSSVRFX0JVRkZFUiA9IDB4OGYzNztcbmV4cG9ydCBjb25zdCBHTF9DT1BZX1dSSVRFX0JVRkZFUl9CSU5ESU5HID0gMHg4ZjM3O1xuZXhwb3J0IGNvbnN0IEdMX0NVTExfRkFDRSA9IDB4MGI0NDtcbmV4cG9ydCBjb25zdCBHTF9DVUxMX0ZBQ0VfTU9ERSA9IDB4MGI0NTtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1BST0dSQU0gPSAweDhiOGQ7XG5leHBvcnQgY29uc3QgR0xfQ1VSUkVOVF9RVUVSWSA9IDB4ODg2NTtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1FVRVJZX0VYVCA9IDB4ODg2NTtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1ZFUlRFWF9BVFRSSUIgPSAweDg2MjY7XG5leHBvcnQgY29uc3QgR0xfQ1cgPSAweDA5MDA7XG5leHBvcnQgY29uc3QgR0xfREVDUiA9IDB4MWUwMztcbmV4cG9ydCBjb25zdCBHTF9ERUNSX1dSQVAgPSAweDg1MDg7XG5leHBvcnQgY29uc3QgR0xfREVMRVRFX1NUQVRVUyA9IDB4OGI4MDtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSCA9IDB4MTgwMTtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9BVFRBQ0hNRU5UID0gMHg4ZDAwO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0JJVFMgPSAweDBkNTY7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQlVGRkVSX0JJVCA9IDB4MDAwMDAxMDA7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ0xFQVJfVkFMVUUgPSAweDBiNzM7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ09NUE9ORU5UID0gMHgxOTAyO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0NPTVBPTkVOVDE2ID0gMHg4MWE1O1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0NPTVBPTkVOVDI0ID0gMHg4MWE2O1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0NPTVBPTkVOVDMyRiA9IDB4OGNhYztcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9GVU5DID0gMHgwYjc0O1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX1JBTkdFID0gMHgwYjcwO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX1NURU5DSUwgPSAweDg0Zjk7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfU1RFTkNJTF9BVFRBQ0hNRU5UID0gMHg4MjFhO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX1RFU1QgPSAweDBiNzE7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfV1JJVEVNQVNLID0gMHgwYjcyO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIMjRfU1RFTkNJTDggPSAweDg4ZjA7XG5leHBvcnQgY29uc3QgR0xfREVQVEgzMkZfU1RFTkNJTDggPSAweDhjYWQ7XG5leHBvcnQgY29uc3QgR0xfRElUSEVSID0gMHgwYmQwO1xuZXhwb3J0IGNvbnN0IEdMX0RPTlRfQ0FSRSA9IDB4MTEwMDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjAgPSAweDg4MjU7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIwX1dFQkdMID0gMHg4ODI1O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMSA9IDB4ODgyNjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjFfV0VCR0wgPSAweDg4MjY7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMCA9IDB4ODgyZjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEwX1dFQkdMID0gMHg4ODJmO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTEgPSAweDg4MzA7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMV9XRUJHTCA9IDB4ODgzMDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEyID0gMHg4ODMxO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTJfV0VCR0wgPSAweDg4MzE7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMyA9IDB4ODgzMjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEzX1dFQkdMID0gMHg4ODMyO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTQgPSAweDg4MzM7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxNF9XRUJHTCA9IDB4ODgzMztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjE1ID0gMHg4ODM0O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTVfV0VCR0wgPSAweDg4MzQ7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIyID0gMHg4ODI3O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMl9XRUJHTCA9IDB4ODgyNztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjMgPSAweDg4Mjg7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIzX1dFQkdMID0gMHg4ODI4O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNCA9IDB4ODgyOTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjRfV0VCR0wgPSAweDg4Mjk7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI1ID0gMHg4ODJhO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNV9XRUJHTCA9IDB4ODgyYTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjYgPSAweDg4MmI7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI2X1dFQkdMID0gMHg4ODJiO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNyA9IDB4ODgyYztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjdfV0VCR0wgPSAweDg4MmM7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI4ID0gMHg4ODJkO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSOF9XRUJHTCA9IDB4ODgyZDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjkgPSAweDg4MmU7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI5X1dFQkdMID0gMHg4ODJlO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfRlJBTUVCVUZGRVIgPSAweDhjYTk7XG5leHBvcnQgY29uc3QgR0xfRFJBV19GUkFNRUJVRkZFUl9CSU5ESU5HID0gMHg4Y2E2O1xuZXhwb3J0IGNvbnN0IEdMX0RTVF9BTFBIQSA9IDB4MDMwNDtcbmV4cG9ydCBjb25zdCBHTF9EU1RfQ09MT1IgPSAweDAzMDY7XG5leHBvcnQgY29uc3QgR0xfRFlOQU1JQ19DT1BZID0gMHg4OGVhO1xuZXhwb3J0IGNvbnN0IEdMX0RZTkFNSUNfRFJBVyA9IDB4ODhlODtcbmV4cG9ydCBjb25zdCBHTF9EWU5BTUlDX1JFQUQgPSAweDg4ZTk7XG5leHBvcnQgY29uc3QgR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIgPSAweDg4OTM7XG5leHBvcnQgY29uc3QgR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVJfQklORElORyA9IDB4ODg5NTtcbmV4cG9ydCBjb25zdCBHTF9FUVVBTCA9IDB4MDIwMjtcbmV4cG9ydCBjb25zdCBHTF9GQVNURVNUID0gMHgxMTAxO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUID0gMHgxNDA2O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUXzMyX1VOU0lHTkVEX0lOVF8yNF84X1JFViA9IDB4OGRhZDtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQyID0gMHg4YjVhO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDJYMyA9IDB4OGI2NTtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQyWDQgPSAweDhiNjY7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUMyA9IDB4OGI1YjtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQzWDIgPSAweDhiNjc7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUM1g0ID0gMHg4YjY4O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDQgPSAweDhiNWM7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUNFgyID0gMHg4YjY5O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDRYMyA9IDB4OGI2YTtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9WRUMyID0gMHg4YjUwO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX1ZFQzMgPSAweDhiNTE7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfVkVDNCA9IDB4OGI1MjtcbmV4cG9ydCBjb25zdCBHTF9GUkFHTUVOVF9TSEFERVIgPSAweDhiMzA7XG5leHBvcnQgY29uc3QgR0xfRlJBR01FTlRfU0hBREVSX0RFUklWQVRJVkVfSElOVCA9IDB4OGI4YjtcbmV4cG9ydCBjb25zdCBHTF9GUkFHTUVOVF9TSEFERVJfREVSSVZBVElWRV9ISU5UX09FUyA9IDB4OGI4YjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUiA9IDB4OGQ0MDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0FMUEhBX1NJWkUgPSAweDgyMTU7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9CTFVFX1NJWkUgPSAweDgyMTQ7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9DT0xPUl9FTkNPRElORyA9IDB4ODIxMDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0NPTE9SX0VOQ09ESU5HX0VYVCA9IDB4ODIxMDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0NPTVBPTkVOVF9UWVBFID0gMHg4MjExO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfQ09NUE9ORU5UX1RZUEVfRVhUID0gMHg4MjExO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfREVQVEhfU0laRSA9IDB4ODIxNjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0dSRUVOX1NJWkUgPSAweDgyMTM7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9PQkpFQ1RfTkFNRSA9IDB4OGNkMTtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX09CSkVDVF9UWVBFID0gMHg4Y2QwO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfUkVEX1NJWkUgPSAweDgyMTI7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9TVEVOQ0lMX1NJWkUgPSAweDgyMTc7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0NVQkVfTUFQX0ZBQ0UgPSAweDhjZDM7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0xBWUVSID0gMHg4Y2Q0O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfVEVYVFVSRV9MRVZFTCA9IDB4OGNkMjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9CSU5ESU5HID0gMHg4Y2E2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0NPTVBMRVRFID0gMHg4Y2Q1O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0RFRkFVTFQgPSAweDgyMTg7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfSU5DT01QTEVURV9BVFRBQ0hNRU5UID0gMHg4Y2Q2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfRElNRU5TSU9OUyA9IDB4OGNkOTtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX01JU1NJTkdfQVRUQUNITUVOVCA9IDB4OGNkNztcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX01VTFRJU0FNUExFID0gMHg4ZDU2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX1VOU1VQUE9SVEVEID0gMHg4Y2RkO1xuZXhwb3J0IGNvbnN0IEdMX0ZST05UID0gMHgwNDA0O1xuZXhwb3J0IGNvbnN0IEdMX0ZST05UX0FORF9CQUNLID0gMHgwNDA4O1xuZXhwb3J0IGNvbnN0IEdMX0ZST05UX0ZBQ0UgPSAweDBiNDY7XG5leHBvcnQgY29uc3QgR0xfRlVOQ19BREQgPSAweDgwMDY7XG5leHBvcnQgY29uc3QgR0xfRlVOQ19SRVZFUlNFX1NVQlRSQUNUID0gMHg4MDBiO1xuZXhwb3J0IGNvbnN0IEdMX0ZVTkNfU1VCU1RSQUNUID0gMHg4MDBhO1xuZXhwb3J0IGNvbnN0IEdMX0dFTkVSQVRFX01JUE1BUF9ISU5UID0gMHg4MTkyO1xuZXhwb3J0IGNvbnN0IEdMX0dFUVVBTCA9IDB4MDIwNjtcbmV4cG9ydCBjb25zdCBHTF9HUFVfRElTSk9JTlRfRVhUID0gMHg4ZmJiO1xuZXhwb3J0IGNvbnN0IEdMX0dSRUFURVIgPSAweDAyMDQ7XG5leHBvcnQgY29uc3QgR0xfR1JFRU5fQklUUyA9IDB4MGQ1MztcbmV4cG9ydCBjb25zdCBHTF9IQUxGX0ZMT0FUID0gMHgxNDBiO1xuZXhwb3J0IGNvbnN0IEdMX0hBTEZfRkxPQVRfT0VTID0gMHg4ZDYxO1xuZXhwb3J0IGNvbnN0IEdMX0hJR0hfRkxPQVQgPSAweDhkZjI7XG5leHBvcnQgY29uc3QgR0xfSElHSF9JTlQgPSAweDhkZjU7XG5leHBvcnQgY29uc3QgR0xfSU1QTEVNRU5UQVRJT05fQ09MT1JfUkVBRF9GT1JNQVQgPSAweDhiOWI7XG5leHBvcnQgY29uc3QgR0xfSU1QTEVNRU5UQVRJT05fQ09MT1JfUkVBRF9UWVBFID0gMHg4YjlhO1xuZXhwb3J0IGNvbnN0IEdMX0lOQ1IgPSAweDFlMDI7XG5leHBvcnQgY29uc3QgR0xfSU5DUl9XUkFQID0gMHg4NTA3O1xuZXhwb3J0IGNvbnN0IEdMX0lOVCA9IDB4MTQwNDtcbmV4cG9ydCBjb25zdCBHTF9JTlRfMl8xMF8xMF8xMF9SRVYgPSAweDhkOWY7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfMkQgPSAweDhkY2E7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfMkRfQVJSQVkgPSAweDhkY2Y7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfM0QgPSAweDhkY2I7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfQ1VCRSA9IDB4OGRjYztcbmV4cG9ydCBjb25zdCBHTF9JTlRfVkVDMiA9IDB4OGI1MztcbmV4cG9ydCBjb25zdCBHTF9JTlRfVkVDMyA9IDB4OGI1NDtcbmV4cG9ydCBjb25zdCBHTF9JTlRfVkVDNCA9IDB4OGI1NTtcbmV4cG9ydCBjb25zdCBHTF9JTlRFUkxFQVZFRF9BVFRSSUJTID0gMHg4YzhjO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfRU5VTSA9IDB4MDUwMDtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX0ZSQU1FQlVGRkVSX09QRVJBVElPTiA9IDB4MDUwNjtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX0lOREVYID0gMHhmZmZmZmZmZjtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX09QRVJBVElPTiA9IDB4MDUwMjtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX1ZBTFVFID0gMHgwNTAxO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkVSVCA9IDB4MTUwYTtcbmV4cG9ydCBjb25zdCBHTF9LRUVQID0gMHgxZTAwO1xuZXhwb3J0IGNvbnN0IEdMX0xFUVVBTCA9IDB4MDIwMztcbmV4cG9ydCBjb25zdCBHTF9MRVNTID0gMHgwMjAxO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVfTE9PUCA9IDB4MDAwMjtcbmV4cG9ydCBjb25zdCBHTF9MSU5FX1NUUklQID0gMHgwMDAzO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVfV0lEVEggPSAweDBiMjE7XG5leHBvcnQgY29uc3QgR0xfTElORUFSID0gMHgyNjAxO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVBUl9NSVBNQVBfTElORUFSID0gMHgyNzAzO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVBUl9NSVBNQVBfTkVBUkVTVCA9IDB4MjcwMTtcbmV4cG9ydCBjb25zdCBHTF9MSU5FUyA9IDB4MDAwMTtcbmV4cG9ydCBjb25zdCBHTF9MSU5LX1NUQVRVUyA9IDB4OGI4MjtcbmV4cG9ydCBjb25zdCBHTF9MT1dfRkxPQVQgPSAweDhkZjA7XG5leHBvcnQgY29uc3QgR0xfTE9XX0lOVCA9IDB4OGRmMztcbmV4cG9ydCBjb25zdCBHTF9MVU1JTkFOQ0UgPSAweDE5MDk7XG5leHBvcnQgY29uc3QgR0xfTFVNSU5BTkNFX0FMUEhBID0gMHgxOTBhO1xuZXhwb3J0IGNvbnN0IEdMX01BWCA9IDB4ODAwODtcbmV4cG9ydCBjb25zdCBHTF9NQVhfM0RfVEVYVFVSRV9TSVpFID0gMHg4MDczO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9BUlJBWV9URVhUVVJFX0xBWUVSUyA9IDB4ODhmZjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ0xJRU5UX1dBSVRfVElNRU9VVF9XRUJHTCA9IDB4OTI0NztcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ09MT1JfQVRUQUNITUVOVFMgPSAweDhjZGY7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTE9SX0FUVEFDSE1FTlRTX1dFQkdMID0gMHg4Y2RmO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DT01CSU5FRF9GUkFHTUVOVF9VTklGT1JNX0NPTVBPTkVOVFMgPSAweDhhMzM7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTUJJTkVEX1RFWFRVUkVfSU1BR0VfVU5JVFMgPSAweDhiNGQ7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTUJJTkVEX1VOSUZPUk1fQkxPQ0tTID0gMHg4YTJlO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DT01CSU5FRF9WRVJURVhfVU5JRk9STV9DT01QT05FTlRTID0gMHg4YTMxO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DVUJFX01BUF9URVhUVVJFX1NJWkUgPSAweDg1MWM7XG5leHBvcnQgY29uc3QgR0xfTUFYX0RSQVdfQlVGRkVSUyA9IDB4ODgyNDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfRFJBV19CVUZGRVJTX1dFQkdMID0gMHg4ODI0O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FTEVNRU5UX0lOREVYID0gMHg4ZDZiO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FTEVNRU5UU19JTkRJQ0VTID0gMHg4MGU5O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FTEVNRU5UU19WRVJUSUNFUyA9IDB4ODBlODtcbmV4cG9ydCBjb25zdCBHTF9NQVhfRVhUID0gMHg4MDA4O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9JTlBVVF9DT01QT05FTlRTID0gMHg5MTI1O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9VTklGT1JNX0JMT0NLUyA9IDB4OGEyZDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfRlJBR01FTlRfVU5JRk9STV9DT01QT05FTlRTID0gMHg4YjQ5O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9VTklGT1JNX1ZFQ1RPUlMgPSAweDhkZmQ7XG5leHBvcnQgY29uc3QgR0xfTUFYX1BST0dSQU1fVEVYRUxfT0ZGU0VUID0gMHg4OTA1O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9SRU5ERVJCVUZGRVJfU0laRSA9IDB4ODRlODtcbmV4cG9ydCBjb25zdCBHTF9NQVhfU0FNUExFUyA9IDB4OGQ1NztcbmV4cG9ydCBjb25zdCBHTF9NQVhfU0VSVkVSX1dBSVRfVElNRU9VVCA9IDB4OTExMTtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9JTUFHRV9VTklUUyA9IDB4ODg3MjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9MT0RfQklBUyA9IDB4ODRmZDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9NQVhfQU5JU09UUk9QWV9FWFQgPSAweDg0ZmY7XG5leHBvcnQgY29uc3QgR0xfTUFYX1RFWFRVUkVfU0laRSA9IDB4MGQzMztcbmV4cG9ydCBjb25zdCBHTF9NQVhfVFJBTlNGT1JNX0ZFRURCQUNLX0lOVEVSTEVBVkVEX0NPTVBPTkVOVFMgPSAweDhjOGE7XG5leHBvcnQgY29uc3QgR0xfTUFYX1RSQU5TRk9STV9GRUVEQkFDS19TRVBBUkFURV9BVFRSSUJTID0gMHg4YzhiO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9UUkFOU0ZPUk1fRkVFREJBQ0tfU0VQQVJBVEVfQ09NUE9ORU5UUyA9IDB4OGM4MDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVU5JRk9STV9CTE9DS19TSVpFID0gMHg4YTMwO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9VTklGT1JNX0JVRkZFUl9CSU5ESU5HUyA9IDB4OGEyZjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkFSWUlOR19DT01QT05FTlRTID0gMHg4YjRiO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WQVJZSU5HX1ZFQ1RPUlMgPSAweDhkZmM7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9BVFRSSUJTID0gMHg4ODY5O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WRVJURVhfT1VUUFVUX0NPTVBPTkVOVFMgPSAweDkxMjI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9URVhUVVJFX0lNQUdFX1VOSVRTID0gMHg4YjRjO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WRVJURVhfVU5JRk9STV9CTE9DS1MgPSAweDhhMmI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9VTklGT1JNX0NPTVBPTkVOVFMgPSAweDhiNGE7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9VTklGT1JNX1ZFQ1RPUlMgPSAweDhkZmI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZJRVdQT1JUX0RJTVMgPSAweDBkM2E7XG5leHBvcnQgY29uc3QgR0xfTUVESVVNX0ZMT0FUID0gMHg4ZGYxO1xuZXhwb3J0IGNvbnN0IEdMX01FRElVTV9JTlQgPSAweDhkZjQ7XG5leHBvcnQgY29uc3QgR0xfTUlOID0gMHg4MDA3O1xuZXhwb3J0IGNvbnN0IEdMX01JTl9FWFQgPSAweDgwMDc7XG5leHBvcnQgY29uc3QgR0xfTUlOX1BST0dSQU1fVEVYRUxfT0ZGU0VUID0gMHg4OTA0O1xuZXhwb3J0IGNvbnN0IEdMX01JUlJPUkVEX1JFUEVBVCA9IDB4ODM3MDtcbmV4cG9ydCBjb25zdCBHTF9ORUFSRVNUID0gMHgyNjAwO1xuZXhwb3J0IGNvbnN0IEdMX05FQVJFU1RfTUlQTUFQX0xJTkVBUiA9IDB4MjcwMjtcbmV4cG9ydCBjb25zdCBHTF9ORUFSRVNUX01JUE1BUF9ORUFSRVNUID0gMHgyNzAwO1xuZXhwb3J0IGNvbnN0IEdMX05FVkVSID0gMHgwMjAwO1xuZXhwb3J0IGNvbnN0IEdMX05JQ0VTVCA9IDB4MTEwMjtcbmV4cG9ydCBjb25zdCBHTF9OT19FUlJPUiA9IDA7XG5leHBvcnQgY29uc3QgR0xfTk9ORSA9IDA7XG5leHBvcnQgY29uc3QgR0xfTk9URVFVQUwgPSAweDAyMDU7XG5leHBvcnQgY29uc3QgR0xfT0JKRUNUX1RZUEUgPSAweDkxMTI7XG5leHBvcnQgY29uc3QgR0xfT05FID0gMTtcbmV4cG9ydCBjb25zdCBHTF9PTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEEgPSAweDgwMDQ7XG5leHBvcnQgY29uc3QgR0xfT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SID0gMHg4MDAyO1xuZXhwb3J0IGNvbnN0IEdMX09ORV9NSU5VU19EU1RfQUxQSEEgPSAweDAzMDU7XG5leHBvcnQgY29uc3QgR0xfT05FX01JTlVTX0RTVF9DT0xPUiA9IDB4MDMwNztcbmV4cG9ydCBjb25zdCBHTF9PTkVfTUlOVVNfU1JDX0FMUEhBID0gMHgwMzAzO1xuZXhwb3J0IGNvbnN0IEdMX09ORV9NSU5VU19TUkNfQ09MT1IgPSAweDAzMDE7XG5leHBvcnQgY29uc3QgR0xfT1VUX09GX01FTU9SWSA9IDB4MDUwNTtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX0FMSUdOTUVOVCA9IDB4MGQwNTtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX1JPV19MRU5HVEggPSAweDBkMDI7XG5leHBvcnQgY29uc3QgR0xfUEFDS19TS0lQX1BJWEVMUyA9IDB4MGQwNDtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX1NLSVBfUk9XUyA9IDB4MGQwMztcbmV4cG9ydCBjb25zdCBHTF9QSVhFTF9QQUNLX0JVRkZFUiA9IDB4ODhlYjtcbmV4cG9ydCBjb25zdCBHTF9QSVhFTF9QQUNLX0JVRkZFUl9CSU5ESU5HID0gMHg4OGVkO1xuZXhwb3J0IGNvbnN0IEdMX1BJWEVMX1VOUEFDS19CVUZGRVIgPSAweDg4ZWM7XG5leHBvcnQgY29uc3QgR0xfUElYRUxfVU5QQUNLX0JVRkZFUl9CSU5ESU5HID0gMHg4OGVmO1xuZXhwb3J0IGNvbnN0IEdMX1BPSU5UUyA9IDB4MDAwMDtcbmV4cG9ydCBjb25zdCBHTF9QT0xZR09OX09GRlNFVF9GQUNUT1IgPSAweDgwMzg7XG5leHBvcnQgY29uc3QgR0xfUE9MWUdPTl9PRkZTRVRfRklMTCA9IDB4ODAzNztcbmV4cG9ydCBjb25zdCBHTF9QT0xZR09OX09GRlNFVF9VTklUUyA9IDB4MmEwMDtcbmV4cG9ydCBjb25zdCBHTF9RVUVSWV9DT1VOVEVSX0JJVFNfRVhUID0gMHg4ODY0O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVCA9IDB4ODg2NjtcbmV4cG9ydCBjb25zdCBHTF9RVUVSWV9SRVNVTFRfQVZBSUxBQkxFID0gMHg4ODY3O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVF9BVkFJTEFCTEVfRVhUID0gMHg4ODY3O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVF9FWFQgPSAweDg4NjY7XG5leHBvcnQgY29uc3QgR0xfUjExRl9HMTFGX0IxMEYgPSAweDhjM2E7XG5leHBvcnQgY29uc3QgR0xfUjE2RiA9IDB4ODIyZDtcbmV4cG9ydCBjb25zdCBHTF9SMTZJID0gMHg4MjMzO1xuZXhwb3J0IGNvbnN0IEdMX1IxNlVJID0gMHg4MjM0O1xuZXhwb3J0IGNvbnN0IEdMX1IzMkYgPSAweDgyMmU7XG5leHBvcnQgY29uc3QgR0xfUjMySSA9IDB4ODIzNTtcbmV4cG9ydCBjb25zdCBHTF9SMzJVSSA9IDB4ODIzNjtcbmV4cG9ydCBjb25zdCBHTF9SOCA9IDB4ODIyOTtcbmV4cG9ydCBjb25zdCBHTF9SOF9TTk9STSA9IDB4OGY5NDtcbmV4cG9ydCBjb25zdCBHTF9SOEkgPSAweDgyMzE7XG5leHBvcnQgY29uc3QgR0xfUjhVSSA9IDB4ODIzMjtcbmV4cG9ydCBjb25zdCBHTF9SQVNURVJJWkVSX0RJU0NBUkQgPSAweDhjODk7XG5leHBvcnQgY29uc3QgR0xfUkVBRF9CVUZGRVIgPSAweDBjMDI7XG5leHBvcnQgY29uc3QgR0xfUkVBRF9GUkFNRUJVRkZFUiA9IDB4OGNhODtcbmV4cG9ydCBjb25zdCBHTF9SRUFEX0ZSQU1FQlVGRkVSX0JJTkRJTkcgPSAweDhjYWE7XG5leHBvcnQgY29uc3QgR0xfUkVEID0gMHgxOTAzO1xuZXhwb3J0IGNvbnN0IEdMX1JFRF9CSVRTID0gMHgwZDUyO1xuZXhwb3J0IGNvbnN0IEdMX1JFRF9JTlRFR0VSID0gMHg4ZDk0O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUiA9IDB4OGQ0MTtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfQUxQSEFfU0laRSA9IDB4OGQ1MztcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfQklORElORyA9IDB4OGNhNztcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfQkxVRV9TSVpFID0gMHg4ZDUyO1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9ERVBUSF9TSVpFID0gMHg4ZDU0O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9HUkVFTl9TSVpFID0gMHg4ZDUxO1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9IRUlHSFQgPSAweDhkNDM7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX0lOVEVSTkFMX0ZPUk1BVCA9IDB4OGQ0NDtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfUkVEX1NJWkUgPSAweDhkNTA7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX1NBTVBMRVMgPSAweDhjYWI7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX1NURU5DSUxfU0laRSA9IDB4OGQ1NTtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfV0lEVEggPSAweDhkNDI7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSRVIgPSAweDFmMDE7XG5leHBvcnQgY29uc3QgR0xfUkVQRUFUID0gMHgyOTAxO1xuZXhwb3J0IGNvbnN0IEdMX1JFUExBQ0UgPSAweDFlMDE7XG5leHBvcnQgY29uc3QgR0xfUkcgPSAweDgyMjc7XG5leHBvcnQgY29uc3QgR0xfUkdfSU5URUdFUiA9IDB4ODIyODtcbmV4cG9ydCBjb25zdCBHTF9SRzE2RiA9IDB4ODIyZjtcbmV4cG9ydCBjb25zdCBHTF9SRzE2SSA9IDB4ODIzOTtcbmV4cG9ydCBjb25zdCBHTF9SRzE2VUkgPSAweDgyM2E7XG5leHBvcnQgY29uc3QgR0xfUkczMkYgPSAweDgyMzA7XG5leHBvcnQgY29uc3QgR0xfUkczMkkgPSAweDgyM2I7XG5leHBvcnQgY29uc3QgR0xfUkczMlVJID0gMHg4MjNjO1xuZXhwb3J0IGNvbnN0IEdMX1JHOCA9IDB4ODIyYjtcbmV4cG9ydCBjb25zdCBHTF9SRzhfU05PUk0gPSAweDhmOTU7XG5leHBvcnQgY29uc3QgR0xfUkc4SSA9IDB4ODIzNztcbmV4cG9ydCBjb25zdCBHTF9SRzhVSSA9IDB4ODIzODtcbmV4cG9ydCBjb25zdCBHTF9SR0IgPSAweDE5MDc7XG5leHBvcnQgY29uc3QgR0xfUkdCX0lOVEVHRVIgPSAweDhkOTg7XG5leHBvcnQgY29uc3QgR0xfUkdCMTBfQTIgPSAweDgwNTk7XG5leHBvcnQgY29uc3QgR0xfUkdCMTBfQTJVSSA9IDB4OTA2ZjtcbmV4cG9ydCBjb25zdCBHTF9SR0IxNkYgPSAweDg4MWI7XG5leHBvcnQgY29uc3QgR0xfUkdCMTZJID0gMHg4ZDg5O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjE2VUkgPSAweDhkNzc7XG5leHBvcnQgY29uc3QgR0xfUkdCMzJGID0gMHg4ODE1O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjMyRl9FWFQgPSAweDg4MTU7XG5leHBvcnQgY29uc3QgR0xfUkdCMzJJID0gMHg4ZDgzO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjMyVUkgPSAweDhkNzE7XG5leHBvcnQgY29uc3QgR0xfUkdCNV9BMSA9IDB4ODA1NztcbmV4cG9ydCBjb25zdCBHTF9SR0I1NjUgPSAweDhkNjI7XG5leHBvcnQgY29uc3QgR0xfUkdCOCA9IDB4ODA1MTtcbmV4cG9ydCBjb25zdCBHTF9SR0I4X1NOT1JNID0gMHg4Zjk2O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjhJID0gMHg4ZDhmO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjhVSSA9IDB4OGQ3ZDtcbmV4cG9ydCBjb25zdCBHTF9SR0I5X0U1ID0gMHg4YzNkO1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEgPSAweDE5MDg7XG5leHBvcnQgY29uc3QgR0xfUkdCQV9JTlRFR0VSID0gMHg4ZDk5O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkExNkYgPSAweDg4MWE7XG5leHBvcnQgY29uc3QgR0xfUkdCQTE2SSA9IDB4OGQ4ODtcbmV4cG9ydCBjb25zdCBHTF9SR0JBMTZVSSA9IDB4OGQ3NjtcbmV4cG9ydCBjb25zdCBHTF9SR0JBMzJGID0gMHg4ODE0O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEzMkZfRVhUID0gMHg4ODE0O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEzMkkgPSAweDhkODI7XG5leHBvcnQgY29uc3QgR0xfUkdCQTMyVUkgPSAweDhkNzA7XG5leHBvcnQgY29uc3QgR0xfUkdCQTQgPSAweDgwNTY7XG5leHBvcnQgY29uc3QgR0xfUkdCQTggPSAweDgwNTg7XG5leHBvcnQgY29uc3QgR0xfUkdCQThfU05PUk0gPSAweDhmOTc7XG5leHBvcnQgY29uc3QgR0xfUkdCQThJID0gMHg4ZDhlO1xuZXhwb3J0IGNvbnN0IEdMX1JHQkE4VUkgPSAweDhkN2M7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFX0FMUEhBX1RPX0NPVkVSQUdFID0gMHg4MDllO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9CVUZGRVJTID0gMHg4MGE4O1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9DT1ZFUkFHRSA9IDB4ODBhMDtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVfQ09WRVJBR0VfSU5WRVJUID0gMHg4MGFiO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9DT1ZFUkFHRV9WQUxVRSA9IDB4ODBhYTtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSXzJEID0gMHg4YjVlO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRVJfMkRfQVJSQVkgPSAweDhkYzE7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8yRF9BUlJBWV9TSEFET1cgPSAweDhkYzQ7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8yRF9TSEFET1cgPSAweDhiNjI7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8zRCA9IDB4OGI1ZjtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSX0JJTkRJTkcgPSAweDg5MTk7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl9DVUJFID0gMHg4YjYwO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRVJfQ1VCRV9TSEFET1cgPSAweDhkYzU7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUyA9IDB4ODBhOTtcbmV4cG9ydCBjb25zdCBHTF9TQ0lTU09SX0JPWCA9IDB4MGMxMDtcbmV4cG9ydCBjb25zdCBHTF9TQ0lTU09SX1RFU1QgPSAweDBjMTE7XG5leHBvcnQgY29uc3QgR0xfU0VQQVJBVEVfQVRUUklCUyA9IDB4OGM4ZDtcbmV4cG9ydCBjb25zdCBHTF9TSEFERVJfVFlQRSA9IDB4OGI0ZjtcbmV4cG9ydCBjb25zdCBHTF9TSEFESU5HX0xBTkdVQUdFX1ZFUlNJT04gPSAweDhiOGM7XG5leHBvcnQgY29uc3QgR0xfU0hPUlQgPSAweDE0MDI7XG5leHBvcnQgY29uc3QgR0xfU0lHTkFMRUQgPSAweDkxMTk7XG5leHBvcnQgY29uc3QgR0xfU0lHTkVEX05PUk1BTElaRUQgPSAweDhmOWM7XG5leHBvcnQgY29uc3QgR0xfU1JDX0FMUEhBID0gMHgwMzAyO1xuZXhwb3J0IGNvbnN0IEdMX1NSQ19BTFBIQV9TQVRVUkFURSA9IDB4MDMwODtcbmV4cG9ydCBjb25zdCBHTF9TUkNfQ09MT1IgPSAweDAzMDA7XG5leHBvcnQgY29uc3QgR0xfU1JHQiA9IDB4OGM0MDtcbmV4cG9ydCBjb25zdCBHTF9TUkdCX0FMUEhBX0VYVCA9IDB4OGM0MjtcbmV4cG9ydCBjb25zdCBHTF9TUkdCX0VYVCA9IDB4OGM0MDtcbmV4cG9ydCBjb25zdCBHTF9TUkdCOCA9IDB4OGM0MTtcbmV4cG9ydCBjb25zdCBHTF9TUkdCOF9BTFBIQTggPSAweDhjNDM7XG5leHBvcnQgY29uc3QgR0xfU1JHQjhfQUxQSEE4X0VYVCA9IDB4OGM0MztcbmV4cG9ydCBjb25zdCBHTF9TVEFUSUNfQ09QWSA9IDB4ODhlNjtcbmV4cG9ydCBjb25zdCBHTF9TVEFUSUNfRFJBVyA9IDB4ODhlNDtcbmV4cG9ydCBjb25zdCBHTF9TVEFUSUNfUkVBRCA9IDB4ODhlNTtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMID0gMHgxODAyO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQVRUQUNITUVOVCA9IDB4OGQyMDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfRkFJTCA9IDB4ODgwMTtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfRlVOQyA9IDB4ODgwMDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfUEFTU19ERVBUSF9GQUlMID0gMHg4ODAyO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19QQVNTX0RFUFRIX1BBU1MgPSAweDg4MDM7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9CQUNLX1JFRiA9IDB4OGNhMztcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfVkFMVUVfTUFTSyA9IDB4OGNhNDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfV1JJVEVNQVNLID0gMHg4Y2E1O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQklUUyA9IDB4MGQ1NztcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JVRkZFUl9CSVQgPSAweDAwMDAwNDAwO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQ0xFQVJfVkFMVUUgPSAweDBiOTE7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9GQUlMID0gMHgwYjk0O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfRlVOQyA9IDB4MGI5MjtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0lOREVYID0gMHgxOTAxO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfSU5ERVg4ID0gMHg4ZDQ4O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfUEFTU19ERVBUSF9GQUlMID0gMHgwYjk1O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfUEFTU19ERVBUSF9QQVNTID0gMHgwYjk2O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfUkVGID0gMHgwYjk3O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfVEVTVCA9IDB4MGI5MDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX1ZBTFVFX01BU0sgPSAweDBiOTM7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9XUklURU1BU0sgPSAweDBiOTg7XG5leHBvcnQgY29uc3QgR0xfU1RSRUFNX0NPUFkgPSAweDg4ZTI7XG5leHBvcnQgY29uc3QgR0xfU1RSRUFNX0RSQVcgPSAweDg4ZTA7XG5leHBvcnQgY29uc3QgR0xfU1RSRUFNX1JFQUQgPSAweDg4ZTE7XG5leHBvcnQgY29uc3QgR0xfU1VCUElYRUxfQklUUyA9IDB4MGQ1MDtcbmV4cG9ydCBjb25zdCBHTF9TWU5DX0NPTkRJVElPTiA9IDB4OTExMztcbmV4cG9ydCBjb25zdCBHTF9TWU5DX0ZFTkNFID0gMHg5MTE2O1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfRkxBR1MgPSAweDkxMTU7XG5leHBvcnQgY29uc3QgR0xfU1lOQ19GTFVTSF9DT01NQU5EU19CSVQgPSAweDAwMDAwMDAxO1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfR1BVX0NPTU1BTkRTX0NPTVBMRVRFID0gMHg5MTE3O1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfU1RBVFVTID0gMHg5MTE0O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUgPSAweDE3MDI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV8yRCA9IDB4MGRlMTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFXzJEX0FSUkFZID0gMHg4YzFhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfM0QgPSAweDgwNmY7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9CQVNFX0xFVkVMID0gMHg4MTNjO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQklORElOR18yRCA9IDB4ODA2OTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0JJTkRJTkdfMkRfQVJSQVkgPSAweDhjMWQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9CSU5ESU5HXzNEID0gMHg4MDZhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQklORElOR19DVUJFX01BUCA9IDB4ODUxNDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NPTVBBUkVfRlVOQyA9IDB4ODg0ZDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NPTVBBUkVfTU9ERSA9IDB4ODg0YztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQID0gMHg4NTEzO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWCA9IDB4ODUxNjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1kgPSAweDg1MTg7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9aID0gMHg4NTFhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWCA9IDB4ODUxNTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1kgPSAweDg1MTc7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9aID0gMHg4NTE5O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfSU1NVVRBQkxFX0ZPUk1BVCA9IDB4OTEyZjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0lNTVVUQUJMRV9MRVZFTFMgPSAweDgyZGY7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NQUdfRklMVEVSID0gMHgyODAwO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUFYX0FOSVNPVFJPUFlfRVhUID0gMHg4NGZlO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUFYX0xFVkVMID0gMHg4MTNkO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUFYX0xPRCA9IDB4ODEzYjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX01JTl9GSUxURVIgPSAweDI4MDE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NSU5fTE9EID0gMHg4MTNhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfV1JBUF9SID0gMHg4MDcyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfV1JBUF9TID0gMHgyODAyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfV1JBUF9UID0gMHgyODAzO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUwID0gMHg4NGMwO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxID0gMHg4NGMxO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxMCA9IDB4ODRjYTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTEgPSAweDg0Y2I7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTEyID0gMHg4NGNjO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxMyA9IDB4ODRjZDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTQgPSAweDg0Y2U7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTE1ID0gMHg4NGNmO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxNiA9IDB4ODRkMDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTcgPSAweDg0ZDE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTE4ID0gMHg4NGQyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxOSA9IDB4ODRkMztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMiA9IDB4ODRjMjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjAgPSAweDg0ZDQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTIxID0gMHg4NGQ1O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyMiA9IDB4ODRkNjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjMgPSAweDg0ZDc7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTI0ID0gMHg4NGQ4O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyNSA9IDB4ODRkOTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjYgPSAweDg0ZGE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTI3ID0gMHg4NGRiO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyOCA9IDB4ODRkYztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjkgPSAweDg0ZGQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTMgPSAweDg0YzM7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTMwID0gMHg4NGRlO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUzMSA9IDB4ODRkZjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNCA9IDB4ODRjNDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNSA9IDB4ODRjNTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNiA9IDB4ODRjNjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNyA9IDB4ODRjNztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFOCA9IDB4ODRjODtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFOSA9IDB4ODRjOTtcbmV4cG9ydCBjb25zdCBHTF9USU1FX0VMQVBTRURfRVhUID0gMHg4OGJmO1xuZXhwb3J0IGNvbnN0IEdMX1RJTUVPVVRfRVhQSVJFRCA9IDB4OTExYjtcbmV4cG9ydCBjb25zdCBHTF9USU1FT1VUX0lHTk9SRUQgPSAtMTtcbmV4cG9ydCBjb25zdCBHTF9USU1FU1RBTVBfRVhUID0gMHg4ZTI4O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDSyA9IDB4OGUyMjtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfQUNUSVZFID0gMHg4ZTI0O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CSU5ESU5HID0gMHg4ZTI1O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CVUZGRVIgPSAweDhjOGU7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUl9CSU5ESU5HID0gMHg4YzhmO1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CVUZGRVJfTU9ERSA9IDB4OGM3ZjtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfQlVGRkVSX1NJWkUgPSAweDhjODU7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUl9TVEFSVCA9IDB4OGM4NDtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfUEFVU0VEID0gMHg4ZTIzO1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19QUklNSVRJVkVTX1dSSVRURU4gPSAweDhjODg7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX1ZBUllJTkdTID0gMHg4YzgzO1xuZXhwb3J0IGNvbnN0IEdMX1RSSUFOR0xFX0ZBTiA9IDB4MDAwNjtcbmV4cG9ydCBjb25zdCBHTF9UUklBTkdMRV9TVFJJUCA9IDB4MDAwNTtcbmV4cG9ydCBjb25zdCBHTF9UUklBTkdMRVMgPSAweDAwMDQ7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9BUlJBWV9TVFJJREUgPSAweDhhM2M7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19BQ1RJVkVfVU5JRk9STV9JTkRJQ0VTID0gMHg4YTQzO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfQUNUSVZFX1VOSUZPUk1TID0gMHg4YTQyO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfQklORElORyA9IDB4OGEzZjtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JMT0NLX0RBVEFfU0laRSA9IDB4OGE0MDtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JMT0NLX0lOREVYID0gMHg4YTNhO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfUkVGRVJFTkNFRF9CWV9GUkFHTUVOVF9TSEFERVIgPSAweDhhNDY7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19SRUZFUkVOQ0VEX0JZX1ZFUlRFWF9TSEFERVIgPSAweDhhNDQ7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVIgPSAweDhhMTE7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVJfQklORElORyA9IDB4OGEyODtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JVRkZFUl9PRkZTRVRfQUxJR05NRU5UID0gMHg4YTM0O1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQlVGRkVSX1NJWkUgPSAweDhhMmE7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVJfU1RBUlQgPSAweDhhMjk7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9JU19ST1dfTUFKT1IgPSAweDhhM2U7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9NQVRSSVhfU1RSSURFID0gMHg4YTNkO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fT0ZGU0VUID0gMHg4YTNiO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fU0laRSA9IDB4OGEzODtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX1RZUEUgPSAweDhhMzc7XG5leHBvcnQgY29uc3QgR0xfVU5NQVNLRURfUkVOREVSRVJfV0VCR0wgPSAweDkyNDY7XG5leHBvcnQgY29uc3QgR0xfVU5NQVNLRURfVkVORE9SX1dFQkdMID0gMHg5MjQ1O1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19BTElHTk1FTlQgPSAweDBjZjU7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX0NPTE9SU1BBQ0VfQ09OVkVSU0lPTl9XRUJHTCA9IDB4OTI0MztcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfRkxJUF9ZX1dFQkdMID0gMHg5MjQwO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19JTUFHRV9IRUlHSFQgPSAweDgwNmU7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX1BSRU1VTFRJUExZX0FMUEhBX1dFQkdMID0gMHg5MjQxO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19ST1dfTEVOR1RIID0gMHgwY2YyO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19TS0lQX0lNQUdFUyA9IDB4ODA2ZDtcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfU0tJUF9QSVhFTFMgPSAweDBjZjQ7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX1NLSVBfUk9XUyA9IDB4MGNmMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05BTEVEID0gMHg5MTE4O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0JZVEUgPSAweDE0MDE7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UID0gMHgxNDA1O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF8xMEZfMTFGXzExRl9SRVYgPSAweDhjM2I7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzJfMTBfMTBfMTBfUkVWID0gMHg4MzY4O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF8yNF84ID0gMHg4NGZhO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF8yNF84X1dFQkdMID0gMHg4NGZhO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF81XzlfOV85X1JFViA9IDB4OGMzZTtcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl8yRCA9IDB4OGRkMjtcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRkNztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl8zRCA9IDB4OGRkMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl9DVUJFID0gMHg4ZGQ0O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9WRUMyID0gMHg4ZGM2O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9WRUMzID0gMHg4ZGM3O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9WRUM0ID0gMHg4ZGM4O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX05PUk1BTElaRUQgPSAweDhjMTc7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfTk9STUFMSVpFRF9FWFQgPSAweDhjMTc7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfU0hPUlQgPSAweDE0MDM7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfU0hPUlRfNF80XzRfNCA9IDB4ODAzMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9TSE9SVF81XzVfNV8xID0gMHg4MDM0O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX1NIT1JUXzVfNl81ID0gMHg4MzYzO1xuZXhwb3J0IGNvbnN0IEdMX1ZBTElEQVRFX1NUQVRVUyA9IDB4OGI4MztcbmV4cG9ydCBjb25zdCBHTF9WRU5ET1IgPSAweDFmMDA7XG5leHBvcnQgY29uc3QgR0xfVkVSU0lPTiA9IDB4MWYwMjtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVJSQVlfQklORElORyA9IDB4ODViNTtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVJSQVlfQklORElOR19PRVMgPSAweDg1YjU7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9CVUZGRVJfQklORElORyA9IDB4ODg5ZjtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX0RJVklTT1IgPSAweDg4ZmU7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9ESVZJU09SX0FOR0xFID0gMHg4OGZlO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfRU5BQkxFRCA9IDB4ODYyMjtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX0lOVEVHRVIgPSAweDg4ZmQ7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9OT1JNQUxJWkVEID0gMHg4ODZhO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfUE9JTlRFUiA9IDB4ODY0NTtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX1NJWkUgPSAweDg2MjM7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9TVFJJREUgPSAweDg2MjQ7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9UWVBFID0gMHg4NjI1O1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9TSEFERVIgPSAweDhiMzE7XG5leHBvcnQgY29uc3QgR0xfVklFV1BPUlQgPSAweDBiYTI7XG5leHBvcnQgY29uc3QgR0xfV0FJVF9GQUlMRUQgPSAweDkxMWQ7XG5leHBvcnQgY29uc3QgR0xfWkVSTyA9IDA7XG4iLCJleHBvcnQgY2xhc3MgQmluZEhlbHBlcjxUVmFsdWU+IHtcbiAgcHJpdmF0ZSBfX3ByZXY6IFRWYWx1ZTtcbiAgcHJpdmF0ZSBfX2JpbmRlcjogKCB2YWx1ZTogVFZhbHVlICkgPT4gdm9pZDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoIGluaXQ6IFRWYWx1ZSwgYmluZGVyOiAoIHZhbHVlOiBUVmFsdWUgKSA9PiB2b2lkICkge1xuICAgIHRoaXMuX19wcmV2ID0gaW5pdDtcbiAgICB0aGlzLl9fYmluZGVyID0gYmluZGVyO1xuICB9XG5cbiAgcHVibGljIGJpbmQ8VD4oXG4gICAgdmFsdWU6IFRWYWx1ZSxcbiAgICBjYWxsYmFjaz86ICggdmFsdWU6IFRWYWx1ZSApID0+IFRcbiAgKTogVCB7XG4gICAgY29uc3QgcHJldiA9IHRoaXMuX19wcmV2O1xuICAgIGlmICggdmFsdWUgIT09IHByZXYgKSB7XG4gICAgICB0aGlzLl9fYmluZGVyKCB2YWx1ZSApO1xuICAgICAgdGhpcy5fX3ByZXYgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoIGNhbGxiYWNrICkge1xuICAgICAgY29uc3QgcmV0ID0gY2FsbGJhY2soIHZhbHVlICk7XG4gICAgICB0aGlzLmJpbmQoIHByZXYgKTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQgYXMgYW55O1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xfQVJSQVlfQlVGRkVSLCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiwgR0xfU1RBVElDX0RSQVcgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xCdWZmZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdEJ1ZmZlcjxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19idWZmZXI6IFdlYkdMQnVmZmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgYnVmZmVyKCk6IFdlYkdMQnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2J1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRCdWZmZXIuYnVmZmVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTEJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19idWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0QnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBidWZmZXI6IFdlYkdMQnVmZmVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19idWZmZXIgPSBidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZUJ1ZmZlciggdGhpcy5fX2J1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIHNldFZlcnRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEFycmF5QnVmZmVyIHwgQXJyYXlCdWZmZXJWaWV3IHwgbnVsbCxcbiAgICB1c2FnZTogbnVtYmVyID0gR0xfU1RBVElDX0RSQVdcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRWZXJ0ZXhCdWZmZXIoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLmJ1ZmZlckRhdGEoIEdMX0FSUkFZX0JVRkZFUiwgc291cmNlLCB1c2FnZSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbmV3IGluZGV4IGRhdGEgaW50byB0aGlzIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBzZXRJbmRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEFycmF5QnVmZmVyIHwgQXJyYXlCdWZmZXJWaWV3IHwgbnVsbCxcbiAgICB1c2FnZTogbnVtYmVyID0gR0xfU1RBVElDX0RSQVdcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRJbmRleEJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuYnVmZmVyRGF0YSggR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHNvdXJjZSwgdXNhZ2UgKTtcbiAgICB9ICk7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBHTENhdEVycm9ycyA9IHtcbiAgZ2V0IFVuZXhwZWN0ZWROdWxsRXJyb3IoKSB7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoICdHTENhdDogVW5leHBlY3RlZCBudWxsIGRldGVjdGVkJyApO1xuICAgIGVycm9yLm5hbWUgPSAnVW5leHBlY3RlZE51bGxFcnJvcic7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH0sXG4gIGdldCBXZWJHTDJFeGNsdXNpdmVFcnJvcigpIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvciggJ0dMQ2F0OiBBdHRlbXB0ZWQgdG8gdXNlIFdlYkdMMiBleGNsdXNpdmUgc3R1ZmYnICk7XG4gICAgZXJyb3IubmFtZSA9ICdXZWJHTDJFeGNsdXNpdmVFcnJvcic7XG4gICAgcmV0dXJuIGVycm9yO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgR0xfQ09MT1JfQVRUQUNITUVOVDAsIEdMX0RFUFRIX0FUVEFDSE1FTlQsIEdMX0ZSQU1FQlVGRkVSLCBHTF9SRU5ERVJCVUZGRVIsIEdMX1RFWFRVUkVfMkQgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcbmltcG9ydCB0eXBlIHsgR0xDYXRSZW5kZXJidWZmZXIgfSBmcm9tICcuL0dMQ2F0UmVuZGVyYnVmZmVyJztcbmltcG9ydCB0eXBlIHsgR0xDYXRUZXh0dXJlIH0gZnJvbSAnLi9HTENhdFRleHR1cmUnO1xuXG4vKipcbiAqIEl0J3MgYSBXZWJHTEZyYW1lYnVmZmVyLlxuICovXG5leHBvcnQgY2xhc3MgR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19mcmFtZWJ1ZmZlcjogV2ViR0xGcmFtZWJ1ZmZlcjtcbiAgcHJpdmF0ZSBfX3JlbmRlcmJ1ZmZlck1hcCA9IG5ldyBNYXA8R0xlbnVtLCBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4+KCk7XG4gIHByaXZhdGUgX190ZXh0dXJlTWFwID0gbmV3IE1hcDxHTGVudW0sIEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4+KCk7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gZnJhbWVidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZyYW1lYnVmZmVyKCk6IFdlYkdMRnJhbWVidWZmZXIge1xuICAgIHJldHVybiB0aGlzLl9fZnJhbWVidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biBmcmFtZWJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRGcmFtZWJ1ZmZlci5mcmFtZWJ1ZmZlcl1dXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTEZyYW1lYnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2ZyYW1lYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBhdHRhY2hlZCByZW5kZXJidWZmZXIuXG4gICAqIElmIHlvdSB3YW50IHRvIGdyYWIgb3RoZXIgdGhhbiBgREVQVEhfQVRUQUNITUVOVGAsIHRyeSBbW0dMQ2F0RnJhbWVidWZmZXIuZ2V0UmVuZGVyYnVmZmVyXV0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmVuZGVyYnVmZmVyKCk6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLmdldCggR0xfREVQVEhfQVRUQUNITUVOVCApID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGF0dGFjaGVkIHRleHR1cmUuXG4gICAqIElmIHlvdSB3YW50IHRvIGdyYWIgb3RoZXIgdGhhbiBgQ09MT1JfQVRUQUNITUVOVDBgLCB0cnkgW1tHTENhdEZyYW1lYnVmZmVyLmdldFRleHR1cmVdXSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldCB0ZXh0dXJlKCk6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fX3RleHR1cmVNYXAuZ2V0KCBHTF9DT0xPUl9BVFRBQ0hNRU5UMCApID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0RnJhbWVidWZmZXIgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIGZyYW1lYnVmZmVyOiBXZWJHTEZyYW1lYnVmZmVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19mcmFtZWJ1ZmZlciA9IGZyYW1lYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoIGFsc29BdHRhY2hlZCA9IGZhbHNlICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGdsLmRlbGV0ZUZyYW1lYnVmZmVyKCB0aGlzLl9fZnJhbWVidWZmZXIgKTtcblxuICAgIGlmICggYWxzb0F0dGFjaGVkICkge1xuICAgICAgZm9yICggY29uc3QgcmVuZGVyYnVmZmVyIG9mIHRoaXMuX19yZW5kZXJidWZmZXJNYXAudmFsdWVzKCkgKSB7XG4gICAgICAgIGdsLmRlbGV0ZVJlbmRlcmJ1ZmZlciggcmVuZGVyYnVmZmVyLnJhdyApO1xuICAgICAgfVxuXG4gICAgICBmb3IgKCBjb25zdCB0ZXh0dXJlIG9mIHRoaXMuX190ZXh0dXJlTWFwLnZhbHVlcygpICkge1xuICAgICAgICBnbC5kZWxldGVUZXh0dXJlKCB0ZXh0dXJlLnJhdyApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBpdHMgYXR0YWNoZWQgcmVuZGVyYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGdldFJlbmRlcmJ1ZmZlciggYXR0YWNobWVudCA9IEdMX0RFUFRIX0FUVEFDSE1FTlQgKTogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX19yZW5kZXJidWZmZXJNYXAuZ2V0KCBhdHRhY2htZW50ICkgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBpdHMgYXR0YWNoZWQgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBnZXRUZXh0dXJlKCBhdHRhY2htZW50ID0gR0xfQ09MT1JfQVRUQUNITUVOVDAgKTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9fdGV4dHVyZU1hcC5nZXQoIGF0dGFjaG1lbnQgKSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIHJlbmRlcmJ1ZmZlciB0byB0aGlzIGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGF0dGFjaFJlbmRlcmJ1ZmZlcihcbiAgICByZW5kZXJidWZmZXI6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PixcbiAgICB7XG4gICAgICBhdHRhY2htZW50ID0gR0xfREVQVEhfQVRUQUNITUVOVFxuICAgIH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZEZyYW1lYnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5mcmFtZWJ1ZmZlclJlbmRlcmJ1ZmZlciggR0xfRlJBTUVCVUZGRVIsIGF0dGFjaG1lbnQsIEdMX1JFTkRFUkJVRkZFUiwgcmVuZGVyYnVmZmVyLnJhdyApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX19yZW5kZXJidWZmZXJNYXAuc2V0KCBhdHRhY2htZW50LCByZW5kZXJidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSB0ZXh0dXJlIHRvIHRoaXMgZnJhbWVidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgYXR0YWNoVGV4dHVyZShcbiAgICB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+LFxuICAgIHtcbiAgICAgIGxldmVsID0gMCxcbiAgICAgIGF0dGFjaG1lbnQgPSBHTF9DT0xPUl9BVFRBQ0hNRU5UMFxuICAgIH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZEZyYW1lYnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5mcmFtZWJ1ZmZlclRleHR1cmUyRCggR0xfRlJBTUVCVUZGRVIsIGF0dGFjaG1lbnQsIEdMX1RFWFRVUkVfMkQsIHRleHR1cmUucmF3LCBsZXZlbCApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX190ZXh0dXJlTWFwLnNldCggYXR0YWNobWVudCwgdGV4dHVyZSApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBHTF9DT01QTEVUSU9OX1NUQVRVU19LSFIsIEdMX0ZMT0FULCBHTF9MSU5LX1NUQVRVUywgR0xfVEVYVFVSRTAgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcbmltcG9ydCB0eXBlIHsgR0xDYXRCdWZmZXIgfSBmcm9tICcuL0dMQ2F0QnVmZmVyJztcbmltcG9ydCB0eXBlIHsgR0xDYXRTaGFkZXIgfSBmcm9tICcuL0dMQ2F0U2hhZGVyJztcbmltcG9ydCB0eXBlIHsgR0xDYXRUZXh0dXJlIH0gZnJvbSAnLi9HTENhdFRleHR1cmUnO1xuXG5leHBvcnQgdHlwZSBHTENhdFByb2dyYW1Vbmlmb3JtVHlwZSA9XG4gICcxZicgfCAnMmYnIHwgJzNmJyB8ICc0ZicgfFxuICAnMWknIHwgJzJpJyB8ICczaScgfCAnNGknIHxcbiAgJzFmdicgfCAnMmZ2JyB8ICczZnYnIHwgJzRmdicgfFxuICAnMWl2JyB8ICcyaXYnIHwgJzNpdicgfCAnNGl2JyB8XG4gICdNYXRyaXgyZnYnIHwgJ01hdHJpeDNmdicgfCAnTWF0cml4NGZ2JztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xQcm9ncmFtLCBidXQgaGFzIGNhY2hlIG9mIHZhcmlhYmxlIGxvY2F0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0UHJvZ3JhbTxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19wcm9ncmFtOiBXZWJHTFByb2dyYW07XG4gIHByaXZhdGUgX19zaGFkZXJzOiBHTENhdFNoYWRlcjxUQ29udGV4dD5bXSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9fYXR0cmliTG9jYXRpb25DYWNoZTogeyBbIG5hbWU6IHN0cmluZyBdOiBudW1iZXIgfSA9IHt9O1xuICBwcml2YXRlIF9fdW5pZm9ybUxvY2F0aW9uQ2FjaGU6IHsgWyBuYW1lOiBzdHJpbmcgXTogV2ViR0xVbmlmb3JtTG9jYXRpb24gfCBudWxsIH0gPSB7fTtcbiAgcHJpdmF0ZSBfX3VuaWZvcm1UZXh0dXJlVW5pdE1hcDogeyBbIG5hbWU6IHN0cmluZyBdOiBudW1iZXIgfSA9IHt9O1xuICBwcml2YXRlIF9fdW5pZm9ybXRleHR1cmVVbml0SW5kZXggPSAwO1xuICBwcml2YXRlIF9fbGlua2VkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcHJvZ3JhbS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcHJvZ3JhbSgpOiBXZWJHTFByb2dyYW0ge1xuICAgIHJldHVybiB0aGlzLl9fcHJvZ3JhbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIHByb2dyYW0uIFNob3J0ZXIgdGhhbiBbW0dMQ2F0UHJvZ3JhbS5wcm9ncmFtXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTFByb2dyYW0ge1xuICAgIHJldHVybiB0aGlzLl9fcHJvZ3JhbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgc2hhZGVycy5cbiAgICovXG4gIHB1YmxpYyBnZXQgc2hhZGVycygpOiBHTENhdFNoYWRlcjxUQ29udGV4dD5bXSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9fc2hhZGVycyA/IHRoaXMuX19zaGFkZXJzLmNvbmNhdCgpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBsYXN0IGxpbmsgb3BlcmF0aW9uIHdhcyBzdWNjZXNzZnVsIG9yIG5vdC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaXNMaW5rZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX19saW5rZWQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0UHJvZ3JhbSBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PiwgcHJvZ3JhbTogV2ViR0xQcm9ncmFtICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19wcm9ncmFtID0gcHJvZ3JhbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSBwcm9ncmFtLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoIGFsc29BdHRhY2hlZCA9IGZhbHNlICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGdsLmRlbGV0ZVByb2dyYW0oIHRoaXMuX19wcm9ncmFtICk7XG5cbiAgICBpZiAoIGFsc29BdHRhY2hlZCApIHtcbiAgICAgIGNvbnN0IHNoYWRlcnMgPSB0aGlzLnNoYWRlcnM7XG4gICAgICBpZiAoIHNoYWRlcnMgKSB7XG4gICAgICAgIHNoYWRlcnMuZm9yRWFjaCggKCBzaGFkZXIgKSA9PiB7XG4gICAgICAgICAgc2hhZGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgfSApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggc2hhZGVycyBhbmQgbGluayB0aGlzIHByb2dyYW0uXG4gICAqL1xuICBwdWJsaWMgbGluayggLi4uc2hhZGVyczogR0xDYXRTaGFkZXI8VENvbnRleHQ+W10gKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgc2hhZGVycy5mb3JFYWNoKCAoIHNoYWRlciApID0+IGdsLmF0dGFjaFNoYWRlciggdGhpcy5fX3Byb2dyYW0sIHNoYWRlci5yYXcgKSApO1xuICAgIGdsLmxpbmtQcm9ncmFtKCB0aGlzLl9fcHJvZ3JhbSApO1xuXG4gICAgdGhpcy5fX2xpbmtlZCA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIoIHRoaXMuX19wcm9ncmFtLCBHTF9MSU5LX1NUQVRVUyApO1xuICAgIGlmICggIXRoaXMuX19saW5rZWQgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoIGdsLmdldFByb2dyYW1JbmZvTG9nKCB0aGlzLl9fcHJvZ3JhbSApISApO1xuICAgIH1cblxuICAgIHRoaXMuX19zaGFkZXJzID0gc2hhZGVycy5jb25jYXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggc2hhZGVycyBhbmQgbGluayB0aGlzIHByb2dyYW0uXG4gICAqIEl0J3MgZ29ubmEgYmUgYXN5bmNocm9ub3VzIGlmIHlvdSBoYXZlIHRoZSBLSFJfcGFyYWxsZWxfc2hhZGVyX2NvbXBpbGUgZXh0ZW5zaW9uIHN1cHBvcnQuXG4gICAqL1xuICBwdWJsaWMgbGlua0FzeW5jKCAuLi5zaGFkZXJzOiBHTENhdFNoYWRlcjxUQ29udGV4dD5bXSApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBnbENhdCA9IHRoaXMuX19nbENhdDtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG4gICAgY29uc3QgZXh0UGFyYWxsZWwgPSBnbENhdC5nZXRFeHRlbnNpb24oICdLSFJfcGFyYWxsZWxfc2hhZGVyX2NvbXBpbGUnICk7XG5cbiAgICBzaGFkZXJzLmZvckVhY2goICggc2hhZGVyICkgPT4gZ2wuYXR0YWNoU2hhZGVyKCB0aGlzLl9fcHJvZ3JhbSwgc2hhZGVyLnJhdyApICk7XG4gICAgZ2wubGlua1Byb2dyYW0oIHRoaXMuX19wcm9ncmFtICk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgPT4ge1xuICAgICAgY29uc3QgdXBkYXRlID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWV4dFBhcmFsbGVsIHx8XG4gICAgICAgICAgZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlciggdGhpcy5fX3Byb2dyYW0sIEdMX0NPTVBMRVRJT05fU1RBVFVTX0tIUiApID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuX19saW5rZWQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKCB0aGlzLl9fcHJvZ3JhbSwgR0xfTElOS19TVEFUVVMgKTtcbiAgICAgICAgICBpZiAoICF0aGlzLl9fbGlua2VkICkge1xuICAgICAgICAgICAgcmVqZWN0KCBnbC5nZXRQcm9ncmFtSW5mb0xvZyggdGhpcy5fX3Byb2dyYW0gKSApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX19zaGFkZXJzID0gc2hhZGVycy5jb25jYXQoKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCB1cGRhdGUgKTtcbiAgICAgIH07XG4gICAgICB1cGRhdGUoKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIGF0dHJpYnV0ZSB2YXJpYWJsZS5cbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYXR0cmlidXRlIHZhcmlhYmxlXG4gICAqIEBwYXJhbSBidWZmZXIgVmVydGV4IGJ1ZmZlci4gQ2FuIGJlIG51bGwsIHRvIGRpc2FibGUgYXR0cmlidXRlIGFycmF5XG4gICAqIEBwYXJhbSBzaXplIE51bWJlciBvZiBjb21wb25lbnRzIHBlciB2ZXJ0ZXguIE11c3QgYmUgMSwgMiwgMyBvciA0XG4gICAqL1xuICBwdWJsaWMgYXR0cmlidXRlKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBidWZmZXI6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGwsXG4gICAgc2l6ZSA9IDEsXG4gICAgZGl2aXNvciA9IDAsXG4gICAgdHlwZTogbnVtYmVyID0gR0xfRkxPQVQsXG4gICAgc3RyaWRlID0gMCxcbiAgICBvZmZzZXQgPSAwXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRBdHRyaWJMb2NhdGlvbiggbmFtZSApO1xuICAgIGlmICggbG9jYXRpb24gPT09IC0xICkgeyByZXR1cm47IH1cblxuICAgIGlmICggYnVmZmVyID09PSBudWxsICkge1xuICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KCBsb2NhdGlvbiApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX19nbENhdC5iaW5kVmVydGV4QnVmZmVyKCBidWZmZXIsICgpID0+IHtcbiAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KCBsb2NhdGlvbiApO1xuICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlciggbG9jYXRpb24sIHNpemUsIHR5cGUsIGZhbHNlLCBzdHJpZGUsIG9mZnNldCApO1xuXG4gICAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgICAgZ2wudmVydGV4QXR0cmliRGl2aXNvciggbG9jYXRpb24sIGRpdmlzb3IgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4dCA9IHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJyApO1xuICAgICAgICBpZiAoIGV4dCApIHtcbiAgICAgICAgICBleHQudmVydGV4QXR0cmliRGl2aXNvckFOR0xFKCBsb2NhdGlvbiwgZGl2aXNvciApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtIHZhcmlhYmxlLlxuICAgKiBTZWUgYWxzbzogW1tHTENhdFByb2dyYW0udW5pZm9ybVZlY3Rvcl1dXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybSggbmFtZTogc3RyaW5nLCB0eXBlOiBHTENhdFByb2dyYW1Vbmlmb3JtVHlwZSwgLi4udmFsdWU6IG51bWJlcltdICk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bmMgPSAoIHRoaXMgYXMgYW55IClbICd1bmlmb3JtJyArIHR5cGUgXTtcbiAgICBmdW5jLmNhbGwoIHRoaXMsIG5hbWUsIC4uLnZhbHVlICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0gdmFyaWFibGUuXG4gICAqIFNlZSBhbHNvOiBbW0dMQ2F0UHJvZ3JhbS51bmlmb3JtXV1cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtVmVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICB0eXBlOiBHTENhdFByb2dyYW1Vbmlmb3JtVHlwZSxcbiAgICB2YWx1ZTogRmxvYXQzMkxpc3QgfCBJbnQzMkxpc3RcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgZnVuYyA9ICggdGhpcyBhcyBhbnkgKVsgJ3VuaWZvcm0nICsgdHlwZSBdO1xuICAgIGZ1bmMuY2FsbCggdGhpcywgbmFtZSwgdmFsdWUgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTFpIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0xaSggbmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFpKCBsb2NhdGlvbiwgdmFsdWUgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0yaSB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMmkoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMmkoIGxvY2F0aW9uLCB4LCB5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtM2kgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTNpKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtM2koIGxvY2F0aW9uLCB4LCB5LCB6ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtNGkgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTRpKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm00aSggbG9jYXRpb24sIHgsIHksIHosIHcgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0xaXYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTFpdiggbmFtZTogc3RyaW5nLCBhcnJheTogSW50MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFpdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMml2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0yaXYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEludDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0yaXYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTNpdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2l2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBJbnQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtM2l2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm00aXYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTRpdiggbmFtZTogc3RyaW5nLCBhcnJheTogSW50MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTRpdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMWYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTFmKCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMWYoIGxvY2F0aW9uLCB2YWx1ZSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTJmIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0yZiggbmFtZTogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0yZiggbG9jYXRpb24sIHgsIHkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0zZiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2YoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0zZiggbG9jYXRpb24sIHgsIHksIHogKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm00ZiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtNGYoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTRmKCBsb2NhdGlvbiwgeCwgeSwgeiwgdyApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTFmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMWZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTJmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMmZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0yZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTNmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2Z2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0zZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTRmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtNGZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm00ZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDJmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4MmZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCwgdHJhbnNwb3NlID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtTWF0cml4MmZ2KCBsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDNmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4M2Z2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCwgdHJhbnNwb3NlID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtTWF0cml4M2Z2KCBsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDRmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4NGZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCwgdHJhbnNwb3NlID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KCBsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBgc2FtcGxlcjJEYCB0eXBlIHVuaWZvcm0gdGV4dHVyZS5cbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgdW5pZm9ybSB0ZXh0dXJlXG4gICAqIEBwYXJhbSB0ZXh0dXJlIFRleHR1cmUgb2JqZWN0XG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybVRleHR1cmUoIG5hbWU6IHN0cmluZywgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIGNvbnN0IHVuaXQgPSB0aGlzLmdldFVuaWZvcm1UZXh0dXJlVW5pdCggbmFtZSApO1xuICAgIGdsLmFjdGl2ZVRleHR1cmUoIEdMX1RFWFRVUkUwICsgdW5pdCApO1xuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0ZXh0dXJlID8/IG51bGwgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFpKCBsb2NhdGlvbiwgdW5pdCApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBgc2FtcGxlckN1YmVgIHR5cGUgdW5pZm9ybSB0ZXh0dXJlLlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSB1bmlmb3JtIHRleHR1cmVcbiAgICogQHBhcmFtIHRleHR1cmUgVGV4dHVyZSBvYmplY3RcbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtQ3ViZW1hcCggbmFtZTogc3RyaW5nLCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgY29uc3QgdW5pdCA9IHRoaXMuZ2V0VW5pZm9ybVRleHR1cmVVbml0KCBuYW1lICk7XG4gICAgZ2wuYWN0aXZlVGV4dHVyZSggR0xfVEVYVFVSRTAgKyB1bml0ICk7XG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlQ3ViZU1hcCggdGV4dHVyZSA/PyBudWxsICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xaSggbG9jYXRpb24sIHVuaXQgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgYXR0cmlidXRlIGxvY2F0aW9uLlxuICAgKi9cbiAgcHVibGljIGdldEF0dHJpYkxvY2F0aW9uKCBuYW1lOiBzdHJpbmcgKTogbnVtYmVyIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBpZiAoIHRoaXMuX19hdHRyaWJMb2NhdGlvbkNhY2hlWyBuYW1lIF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fYXR0cmliTG9jYXRpb25DYWNoZVsgbmFtZSBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKCB0aGlzLl9fcHJvZ3JhbSwgbmFtZSApO1xuICAgICAgLy8gaWYgKCBsb2NhdGlvbiA9PT0gLTEgKSB7XG4gICAgICAvLyAgIHRoaXMuZ2xDYXQuc3BpdCggJ0dMQ2F0UHJvZ3JhbS5nZXRBdHRyaWJMb2NhdGlvbjogQ291bGQgbm90IHJldHJpZXZlIGF0dHJpYnV0ZSBsb2NhdGlvbicgKTtcbiAgICAgIC8vICAgcmV0dXJuIC0xO1xuICAgICAgLy8gfVxuICAgICAgdGhpcy5fX2F0dHJpYkxvY2F0aW9uQ2FjaGVbIG5hbWUgXSA9IGxvY2F0aW9uO1xuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB1bmlmb3JtIGxvY2F0aW9uLlxuICAgKi9cbiAgcHVibGljIGdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZTogc3RyaW5nICk6IFdlYkdMVW5pZm9ybUxvY2F0aW9uIHwgbnVsbCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgaWYgKCB0aGlzLl9fdW5pZm9ybUxvY2F0aW9uQ2FjaGVbIG5hbWUgXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuIHRoaXMuX191bmlmb3JtTG9jYXRpb25DYWNoZVsgbmFtZSBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbiggdGhpcy5fX3Byb2dyYW0sIG5hbWUgKTtcbiAgICAgIC8vIGlmICggbG9jYXRpb24gPT09IG51bGwgKSB7XG4gICAgICAvLyAgIHRoaXMuZ2xDYXQuc3BpdCggJ0dMQ2F0UHJvZ3JhbS5nZXRVbmlmb3JtTG9jYXRpb246IENvdWxkIG5vdCByZXRyaWV2ZSB1bmlmb3JtIGxvY2F0aW9uJyApO1xuICAgICAgLy8gICByZXR1cm4gbG9jYXRpb247XG4gICAgICAvLyB9XG4gICAgICB0aGlzLl9fdW5pZm9ybUxvY2F0aW9uQ2FjaGVbIG5hbWUgXSA9IGxvY2F0aW9uO1xuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBvciBjcmVhdGUgYSB0ZXh0dXJlIHVuaXQgdGhhdCBjb3JyZXNwb25kcyB0byBnaXZlbiBuYW1lLlxuICAgKi9cbiAgcHVibGljIGdldFVuaWZvcm1UZXh0dXJlVW5pdCggbmFtZTogc3RyaW5nICk6IG51bWJlciB7XG4gICAgaWYgKCB0aGlzLl9fdW5pZm9ybVRleHR1cmVVbml0TWFwWyBuYW1lIF0gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHRoaXMuX191bmlmb3JtVGV4dHVyZVVuaXRNYXBbIG5hbWUgXSA9IHRoaXMuX191bmlmb3JtdGV4dHVyZVVuaXRJbmRleDtcbiAgICAgIHRoaXMuX191bmlmb3JtdGV4dHVyZVVuaXRJbmRleCArKztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fX3VuaWZvcm1UZXh0dXJlVW5pdE1hcFsgbmFtZSBdO1xuICB9XG59XG4iLCJpbXBvcnQgeyBHTF9ERVBUSF9BVFRBQ0hNRU5ULCBHTF9SRU5ERVJCVUZGRVIgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xSZW5kZXJidWZmZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19yZW5kZXJidWZmZXI6IFdlYkdMUmVuZGVyYnVmZmVyO1xuICBwcml2YXRlIF9fd2lkdGggPSAwO1xuICBwcml2YXRlIF9faGVpZ2h0ID0gMDtcblxuICAvKipcbiAgICogSXRzIG93biByZW5kZXJidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlbmRlcmJ1ZmZlcigpOiBXZWJHTFJlbmRlcmJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19yZW5kZXJidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biByZW5kZXJidWZmZXIuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0UmVuZGVyQnVmZmVyLnJlbmRlcmJ1ZmZlcl1dLlxuICAgKi9cbiAgcHVibGljIGdldCByYXcoKTogV2ViR0xSZW5kZXJidWZmZXIge1xuICAgIHJldHVybiB0aGlzLl9fcmVuZGVyYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyB3aWR0aC5cbiAgICovXG4gIHB1YmxpYyBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3dpZHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBoZWlnaHQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9faGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdFRleHR1cmUgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIHJlbmRlcmJ1ZmZlcjogV2ViR0xSZW5kZXJidWZmZXIgKSB7XG4gICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XG4gICAgdGhpcy5fX3JlbmRlcmJ1ZmZlciA9IHJlbmRlcmJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSByZW5kZXJidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9fZ2xDYXQuZ2wuZGVsZXRlUmVuZGVyYnVmZmVyKCB0aGlzLl9fcmVuZGVyYnVmZmVyICk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGlzIHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBpbml0KFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgeyBmb3JtYXQgPSB0aGlzLl9fZ2xDYXQucHJlZmVycmVkRGVwdGhGb3JtYXQgfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kUmVuZGVyYnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5yZW5kZXJidWZmZXJTdG9yYWdlKCBHTF9SRU5ERVJCVUZGRVIsIGZvcm1hdCwgd2lkdGgsIGhlaWdodCApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGlzIHJlbmRlcmJ1ZmZlciB3aXRoIG11bHRpc2FtcGxlIGVuYWJsZWQuXG4gICAqIElmIHlvdSBhcmUgdXNpbmcgV2ViR0wxLCBpdCB3aWxsIGZhbGxiYWNrIHRvIG5vbiBtdWx0aXNhbXBsZSBvbmUgaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBpbml0TXVsdGlzYW1wbGUoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB7XG4gICAgICBzYW1wbGVzID0gdGhpcy5fX2dsQ2F0LnByZWZlcnJlZE11bHRpc2FtcGxlU2FtcGxlcyxcbiAgICAgIGZvcm1hdCA9IEdMX0RFUFRIX0FUVEFDSE1FTlRcbiAgICB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRSZW5kZXJidWZmZXIoIHRoaXMsICgpID0+IHtcbiAgICAgIGlmICggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgICBnbC5yZW5kZXJidWZmZXJTdG9yYWdlTXVsdGlzYW1wbGUoIEdMX1JFTkRFUkJVRkZFUiwgc2FtcGxlcywgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnbC5yZW5kZXJidWZmZXJTdG9yYWdlKCBHTF9SRU5ERVJCVUZGRVIsIGZvcm1hdCwgd2lkdGgsIGhlaWdodCApO1xuICAgICAgfVxuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cbn1cbiIsImltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcbmltcG9ydCB7IEdMX0NPTVBJTEVfU1RBVFVTIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMU2hhZGVyLlxuICovXG5leHBvcnQgY2xhc3MgR0xDYXRTaGFkZXI8VENvbnRleHQgZXh0ZW5kcyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0PiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fc2hhZGVyOiBXZWJHTFNoYWRlcjtcbiAgcHJpdmF0ZSBfX2NvbXBpbGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gc2hhZGVyLlxuICAgKi9cbiAgcHVibGljIGdldCBzaGFkZXIoKTogV2ViR0xTaGFkZXIge1xuICAgIHJldHVybiB0aGlzLl9fc2hhZGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gc2hhZGVyLiBTaG9ydGVyIHRoYW4gW1tHTENhdFNoYWRlci5zaGFkZXJdXS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3KCk6IFdlYkdMU2hhZGVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3NoYWRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRTaGFkZXIgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIHNoYWRlcjogV2ViR0xTaGFkZXIgKSB7XG4gICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XG4gICAgdGhpcy5fX3NoYWRlciA9IHNoYWRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSBzaGFkZXIuXG4gICAqL1xuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9fZ2xDYXQuZ2wuZGVsZXRlU2hhZGVyKCB0aGlzLl9fc2hhZGVyICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHdoZXRoZXIgdGhlIGxhc3QgY29tcGlsYXRpb24gd2FzIHN1Y2Nlc3NmdWwgb3Igbm90LlxuICAgKi9cbiAgcHVibGljIGlzQ29tcGlsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX19jb21waWxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21waWxlIHRoZSBzaGFkZXIuXG4gICAqL1xuICBwdWJsaWMgY29tcGlsZSggY29kZTogc3RyaW5nICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGdsLnNoYWRlclNvdXJjZSggdGhpcy5fX3NoYWRlciwgY29kZSApO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoIHRoaXMuX19zaGFkZXIgKTtcblxuICAgIHRoaXMuX19jb21waWxlZCA9IGdsLmdldFNoYWRlclBhcmFtZXRlciggdGhpcy5fX3NoYWRlciwgR0xfQ09NUElMRV9TVEFUVVMgKTtcbiAgICBpZiAoICF0aGlzLl9fY29tcGlsZWQgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoIGdsLmdldFNoYWRlckluZm9Mb2coIHRoaXMuX19zaGFkZXIgKSEgKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMX0NMQU1QX1RPX0VER0UsIEdMX0ZMT0FULCBHTF9IQUxGX0ZMT0FULCBHTF9MSU5FQVIsIEdMX05FQVJFU1QsIEdMX1JHQkEsIEdMX1JHQkE4LCBHTF9URVhUVVJFXzJELCBHTF9URVhUVVJFX0NVQkVfTUFQLCBHTF9URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1gsIEdMX1RFWFRVUkVfTUFHX0ZJTFRFUiwgR0xfVEVYVFVSRV9NSU5fRklMVEVSLCBHTF9URVhUVVJFX1dSQVBfUywgR0xfVEVYVFVSRV9XUkFQX1QsIEdMX1VOU0lHTkVEX0JZVEUgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcbmltcG9ydCB7IEdMQ2F0RXJyb3JzIH0gZnJvbSAnLi9HTENhdEVycm9ycyc7XG5cbmNvbnN0IHplcm9UZXh0dXJlQXJyYXkgPSBuZXcgVWludDhBcnJheSggWyAwLCAwLCAwLCAwIF0gKTtcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xUZXh0dXJlLlxuICovXG5leHBvcnQgY2xhc3MgR0xDYXRUZXh0dXJlPFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3RleHR1cmU6IFdlYkdMVGV4dHVyZTtcbiAgcHJpdmF0ZSBfX3dpZHRoID0gMDtcbiAgcHJpdmF0ZSBfX2hlaWdodCA9IDA7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgdGV4dHVyZSgpOiBXZWJHTFRleHR1cmUge1xuICAgIHJldHVybiB0aGlzLl9fdGV4dHVyZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIHRleHR1cmUuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0VGV4dHVyZS50ZXh0dXJlZF1dXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTFRleHR1cmUge1xuICAgIHJldHVybiB0aGlzLl9fdGV4dHVyZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgd2lkdGguXG4gICAqL1xuICBwdWJsaWMgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX193aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgaGVpZ2h0LlxuICAgKi9cbiAgcHVibGljIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2hlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRUZXh0dXJlIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCB0ZXh0dXJlOiBXZWJHTFRleHR1cmUgKSB7XG4gICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XG4gICAgdGhpcy5fX3RleHR1cmUgPSB0ZXh0dXJlO1xuICAgIHRoaXMudGV4dHVyZUZpbHRlciggR0xfTElORUFSICk7XG4gICAgdGhpcy50ZXh0dXJlV3JhcCggR0xfQ0xBTVBfVE9fRURHRSApO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9fZ2xDYXQuZ2wuZGVsZXRlVGV4dHVyZSggdGhpcy5fX3RleHR1cmUgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0byBmaWx0ZXIgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgdGV4dHVyZUZpbHRlcigpOiB2b2lkO1xuICBwdWJsaWMgdGV4dHVyZUZpbHRlciggZmlsdGVyOiBudW1iZXIgKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVGaWx0ZXIoIGZpbHRlck1hZzogbnVtYmVyLCBmaWx0ZXJNaW46IG51bWJlciApOiB2b2lkO1xuICBwdWJsaWMgdGV4dHVyZUZpbHRlciggZmlsdGVyTWFnOiBudW1iZXIgPSBHTF9ORUFSRVNULCBmaWx0ZXJNaW46IG51bWJlciA9IGZpbHRlck1hZyApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9NQUdfRklMVEVSLCBmaWx0ZXJNYWcgKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfTUlOX0ZJTFRFUiwgZmlsdGVyTWluICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IHRvIHdyYXAgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgdGV4dHVyZVdyYXAoKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVXcmFwKCB3cmFwOiBudW1iZXIgKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVXcmFwKCB3cmFwUzogbnVtYmVyLCB3cmFwVDogbnVtYmVyICk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlV3JhcCggd3JhcFM6IG51bWJlciA9IEdMX0NMQU1QX1RPX0VER0UsIHdyYXBUOiBudW1iZXIgPSB3cmFwUyApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9XUkFQX1MsIHdyYXBTICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFXzJELCBHTF9URVhUVVJFX1dSQVBfVCwgd3JhcFQgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyB0ZXhTdG9yYWdlMkQoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB7IHRhcmdldCA9IEdMX1RFWFRVUkVfMkQsIGxldmVsID0gMSwgZm9ybWF0ID0gR0xfUkdCQTggfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGlmICggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgICAgZ2wudGV4U3RvcmFnZTJEKCB0YXJnZXQsIGxldmVsLCBmb3JtYXQsIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgIH0gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgR0xDYXRFcnJvcnMuV2ViR0wyRXhjbHVzaXZlRXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHZhbHVlIGZvciB0aGUgcGFzc2VkIHBhcmFtZXRlciBuYW1lLlxuICAgKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJHTFJlbmRlcmluZ0NvbnRleHQvZ2V0UGFyYW1ldGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0UGFyYW1ldGVyKCBwbmFtZTogR0xlbnVtICk6IGFueSB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgcmV0dXJuIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICByZXR1cm4gZ2wuZ2V0UGFyYW1ldGVyKCBwbmFtZSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBwaXhlbCBzdG9yYWdlIG1vZGVzLlxuICAgKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJHTFJlbmRlcmluZ0NvbnRleHQvcGl4ZWxTdG9yZWlcbiAgICovXG4gIHB1YmxpYyBwaXhlbFN0b3JlaSggcG5hbWU6IEdMZW51bSwgcGFyYW06IG51bWJlciB8IGJvb2xlYW4gKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnBpeGVsU3RvcmVpKCBwbmFtZSwgcGFyYW0gKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyBkYXRhIGludG8gdGhpcyB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHNldFRleHR1cmUoIHNvdXJjZTogVGV4SW1hZ2VTb3VyY2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnRleEltYWdlMkQoIEdMX1RFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIHNvdXJjZSApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHNvdXJjZS53aWR0aDtcbiAgICB0aGlzLl9faGVpZ2h0ID0gc291cmNlLmhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbmV3IGRhdGEgaW50byB0aGlzIHRleHR1cmUuXG4gICAqIFRoaXMgZnVuY3Rpb24gdXNlcyBUeXBlZEFycmF5LiBJZiB5b3Ugd2FudCB0byBzb3VyY2UgaW1hZ2UgZGF0YSwgdXNlIGBHTENhdC5zZXRUZXh0dXJlKClgIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgc2V0VGV4dHVyZUZyb21BcnJheShcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHNvdXJjZTogQXJyYXlCdWZmZXJWaWV3IHwgbnVsbCxcbiAgICB7XG4gICAgICBpbnRlcm5hbGZvcm1hdCA9IEdMX1JHQkE4LFxuICAgICAgZm9ybWF0ID0gR0xfUkdCQSxcbiAgICAgIHR5cGUgPSBHTF9VTlNJR05FRF9CWVRFXG4gICAgfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGxldCBpZm9ybWF0ID0gaW50ZXJuYWxmb3JtYXQ7XG4gICAgaWYgKCAhKCBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSApIHtcbiAgICAgIGlmICggdHlwZSA9PT0gR0xfSEFMRl9GTE9BVCApIHtcbiAgICAgICAgdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ09FU190ZXh0dXJlX2hhbGZfZmxvYXQnLCB0cnVlICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0X2xpbmVhcicgKTtcbiAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09IEdMX0ZMT0FUICkge1xuICAgICAgICB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnT0VTX3RleHR1cmVfZmxvYXQnLCB0cnVlICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXInICk7XG4gICAgICB9XG5cbiAgICAgIGlmb3JtYXQgPSBmb3JtYXQ7XG4gICAgfVxuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnRleEltYWdlMkQoXG4gICAgICAgIEdMX1RFWFRVUkVfMkQsXG4gICAgICAgIDAsXG4gICAgICAgIGlmb3JtYXQsXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIDAsXG4gICAgICAgIGZvcm1hdCxcbiAgICAgICAgdHlwZSxcbiAgICAgICAgc291cmNlXG4gICAgICApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogQ29weSBwaXhlbHMgZnJvbSBjdXJyZW50IGZyYW1lYnVmZmVyIHRvIGdpdmVuIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgY29weVRleHR1cmUoIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5jb3B5VGV4SW1hZ2UyRCggR0xfVEVYVFVSRV8yRCwgMCwgR0xfUkdCQSwgMCwgMCwgd2lkdGgsIGhlaWdodCwgMCApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyBjdWJlbWFwIGRhdGEgaW50byB0aGlzIHRleHR1cmUuXG4gICAqIEBwYXJhbSB0ZXh0dXJlcyBBcnJheSBvZiBpYW1nZXMuIE9yZGVyOiBgWCtgLCBgWC1gLCBgWStgLCBgWS1gLCBgWitgLCBgWi1gXG4gICAqIEB0b2RvIGR1ZSB0byBjb21wYXRpYmlsaXR5IG9mIGl0cyBgd2lkdGhgIGFuZCBgaGVpZ2h0YCBpdCBzaG91bGQgbm90IGJlIHVzZWQgeWV0XG4gICAqL1xuICBwdWJsaWMgc2V0Q3ViZW1hcCggdGV4dHVyZXM6IFRleEltYWdlU291cmNlW10gKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlQ3ViZU1hcCggdGhpcywgKCkgPT4ge1xuICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgNjsgaSArKyApIHtcbiAgICAgICAgZ2wudGV4SW1hZ2UyRChcbiAgICAgICAgICBHTF9URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1ggKyBpLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgR0xfUkdCQSxcbiAgICAgICAgICBHTF9SR0JBLFxuICAgICAgICAgIEdMX1VOU0lHTkVEX0JZVEUsXG4gICAgICAgICAgdGV4dHVyZXNbIGkgXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9NSU5fRklMVEVSLCBHTF9MSU5FQVIgKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIEdMX1RFWFRVUkVfTUFHX0ZJTFRFUiwgR0xfTElORUFSICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFX0NVQkVfTUFQLCBHTF9URVhUVVJFX1dSQVBfUywgR0xfQ0xBTVBfVE9fRURHRSApO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9XUkFQX1QsIEdMX0NMQU1QX1RPX0VER0UgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFsgMCwgMCwgMCwgMCBdIHRvIHRoaXMgdGV4dHVyZS5cbiAgICogVXNlZnVsIGZvciB0ZW1wb3JhcnkgdXNlLi5cbiAgICovXG4gIHB1YmxpYyBzZXRaZXJvVGV4dHVyZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFRleHR1cmVGcm9tQXJyYXkoIDEsIDEsIHplcm9UZXh0dXJlQXJyYXkgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBHTENhdCwgR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGUgfSBmcm9tICcuL0dMQ2F0JztcbmltcG9ydCB7IEdMX0FSUkFZX0JVRkZFUiwgR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIEdMX0ZMT0FUIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0QnVmZmVyIH0gZnJvbSAnLi9HTENhdEJ1ZmZlcic7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMVmVydGV4QXJyYXlPYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdFZlcnRleEFycmF5PFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3ZlcnRleEFycmF5OiBHTENhdFZlcnRleEFycmF5UmF3VHlwZTxUQ29udGV4dD47XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGdldCBidWZmZXIoKTogR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQ+IHtcbiAgICByZXR1cm4gdGhpcy5fX3ZlcnRleEFycmF5O1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gYnVmZmVyLiBTaG9ydGVyIHRoYW4gW1tHTENhdEJ1ZmZlci5idWZmZXJdXS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3KCk6IEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0PiB7XG4gICAgcmV0dXJuIHRoaXMuX192ZXJ0ZXhBcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRCdWZmZXIgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIHZlcnRleEFycmF5OiBHTENhdFZlcnRleEFycmF5UmF3VHlwZTxUQ29udGV4dD4gKSB7XG4gICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XG4gICAgdGhpcy5fX3ZlcnRleEFycmF5ID0gdmVydGV4QXJyYXk7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgaWYgKCBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBnbC5kZWxldGVWZXJ0ZXhBcnJheSggdGhpcy5fX3ZlcnRleEFycmF5ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4dCA9IHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdmVydGV4X2FycmF5X29iamVjdCcsIHRydWUgKTtcbiAgICAgIGV4dC5kZWxldGVWZXJ0ZXhBcnJheU9FUyggdGhpcy5fX3ZlcnRleEFycmF5IGFzIGFueSApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgdmVydGV4IGJ1ZmZlciB0byB0aGUgdmVydGV4IGFycmF5LlxuICAgKi9cbiAgcHVibGljIGJpbmRWZXJ0ZXhidWZmZXIoXG4gICAgc291cmNlOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4sXG4gICAgbG9jYXRpb246IG51bWJlcixcbiAgICBzaXplID0gMSxcbiAgICBkaXZpc29yID0gMCxcbiAgICB0eXBlOiBudW1iZXIgPSBHTF9GTE9BVCxcbiAgICBzdHJpZGUgPSAwLFxuICAgIG9mZnNldCA9IDBcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRWZXJ0ZXhBcnJheSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuYmluZEJ1ZmZlciggR0xfQVJSQVlfQlVGRkVSLCBzb3VyY2UucmF3ICk7XG4gICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSggbG9jYXRpb24gKTtcbiAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoIGxvY2F0aW9uLCBzaXplLCB0eXBlLCBmYWxzZSwgc3RyaWRlLCBvZmZzZXQgKTtcblxuICAgICAgaWYgKCBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICAgIGdsLnZlcnRleEF0dHJpYkRpdmlzb3IoIGxvY2F0aW9uLCBkaXZpc29yICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBleHQgPSB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnQU5HTEVfaW5zdGFuY2VkX2FycmF5cycgKTtcbiAgICAgICAgaWYgKCBleHQgKSB7XG4gICAgICAgICAgZXh0LnZlcnRleEF0dHJpYkRpdmlzb3JBTkdMRSggbG9jYXRpb24sIGRpdmlzb3IgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGFuIGluZGV4IGJ1ZmZlciB0byB0aGUgdmVydGV4IGFycmF5LlxuICAgKi9cbiAgcHVibGljIGJpbmRJbmRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PlxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFZlcnRleEFycmF5KCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5iaW5kQnVmZmVyKCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiwgc291cmNlLnJhdyApO1xuICAgIH0gKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xfQVJSQVlfQlVGRkVSLCBHTF9CTEVORCwgR0xfQ09MT1JfQVRUQUNITUVOVDAsIEdMX0NPTE9SX0JVRkZFUl9CSVQsIEdMX0RFUFRIMjRfU1RFTkNJTDgsIEdMX0RFUFRIX0FUVEFDSE1FTlQsIEdMX0RFUFRIX0JVRkZFUl9CSVQsIEdMX0RFUFRIX0NPTVBPTkVOVDE2LCBHTF9ERVBUSF9URVNULCBHTF9EUkFXX0ZSQU1FQlVGRkVSLCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiwgR0xfRkxPQVQsIEdMX0ZSQUdNRU5UX1NIQURFUiwgR0xfRlJBTUVCVUZGRVIsIEdMX0xFUVVBTCwgR0xfTUFYX0RSQVdfQlVGRkVSUywgR0xfTkVBUkVTVCwgR0xfT05FX01JTlVTX1NSQ19BTFBIQSwgR0xfUkVBRF9GUkFNRUJVRkZFUiwgR0xfUkVOREVSQlVGRkVSLCBHTF9SR0JBLCBHTF9SR0JBMzJGLCBHTF9SR0JBOCwgR0xfU1JDX0FMUEhBLCBHTF9URVhUVVJFXzJELCBHTF9URVhUVVJFX0NVQkVfTUFQLCBHTF9WRVJURVhfU0hBREVSIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgeyBCaW5kSGVscGVyIH0gZnJvbSAnLi91dGlscy9CaW5kSGVscGVyJztcbmltcG9ydCB7IEdMQ2F0QnVmZmVyIH0gZnJvbSAnLi9HTENhdEJ1ZmZlcic7XG5pbXBvcnQgeyBHTENhdEVycm9ycyB9IGZyb20gJy4vR0xDYXRFcnJvcnMnO1xuaW1wb3J0IHsgR0xDYXRGcmFtZWJ1ZmZlciB9IGZyb20gJy4vR0xDYXRGcmFtZWJ1ZmZlcic7XG5pbXBvcnQgeyBHTENhdFByb2dyYW0gfSBmcm9tICcuL0dMQ2F0UHJvZ3JhbSc7XG5pbXBvcnQgeyBHTENhdFJlbmRlcmJ1ZmZlciB9IGZyb20gJy4vR0xDYXRSZW5kZXJidWZmZXInO1xuaW1wb3J0IHsgR0xDYXRTaGFkZXIgfSBmcm9tICcuL0dMQ2F0U2hhZGVyJztcbmltcG9ydCB7IEdMQ2F0VGV4dHVyZSB9IGZyb20gJy4vR0xDYXRUZXh0dXJlJztcbmltcG9ydCB7IEdMQ2F0VmVydGV4QXJyYXkgfSBmcm9tICcuL0dMQ2F0VmVydGV4QXJyYXknO1xuXG5leHBvcnQgdHlwZSBXZWJHTEV4dGVuc2lvbiA9IGFueTtcblxuZXhwb3J0IHR5cGUgR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQgZXh0ZW5kcyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0PlxuICA9IFRDb250ZXh0IGV4dGVuZHMgV2ViR0wyUmVuZGVyaW5nQ29udGV4dFxuICAgID8gV2ViR0xWZXJ0ZXhBcnJheU9iamVjdFxuICAgIDogV2ViR0xWZXJ0ZXhBcnJheU9iamVjdE9FUztcblxuLyoqXG4gKiBXZWJHTCB3cmFwcGVyIHdpdGggcGxlbnR5IG9mIGhhY2thYmlsaXR5LlxuICovXG5leHBvcnQgY2xhc3MgR0xDYXQ8VENvbnRleHQgZXh0ZW5kcyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0PiB7XG4gIHB1YmxpYyBzdGF0aWMgdGhyb3dJZk51bGw8VD4oIHY6IFQgfCBudWxsICk6IFQge1xuICAgIGlmICggdiA9PSBudWxsICkge1xuICAgICAgdGhyb3cgR0xDYXRFcnJvcnMuVW5leHBlY3RlZE51bGxFcnJvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHY7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHByZWZlcnJlZE11bHRpc2FtcGxlU2FtcGxlcyA9IDQ7XG5cbiAgcHJpdmF0ZSBfX3ByZWZlcnJlZERlcHRoRm9ybWF0OiBHTGVudW0gfCBudWxsID0gbnVsbDtcbiAgcHVibGljIGdldCBwcmVmZXJyZWREZXB0aEZvcm1hdCgpOiBHTGVudW0ge1xuICAgIGlmICggdGhpcy5fX3ByZWZlcnJlZERlcHRoRm9ybWF0ICE9PSBudWxsICkge1xuICAgICAgcmV0dXJuIHRoaXMuX19wcmVmZXJyZWREZXB0aEZvcm1hdDtcbiAgICB9IGVsc2UgaWYgKCB0aGlzLl9fZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgcmV0dXJuIEdMX0RFUFRIMjRfU1RFTkNJTDg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBHTF9ERVBUSF9DT01QT05FTlQxNjtcbiAgICB9XG4gIH1cbiAgcHVibGljIHNldCBwcmVmZXJyZWREZXB0aEZvcm1hdCggZm9ybWF0OiBHTGVudW0gKSB7XG4gICAgdGhpcy5fX3ByZWZlcnJlZERlcHRoRm9ybWF0ID0gZm9ybWF0O1xuICB9XG5cbiAgcHJpdmF0ZSBfX2dsOiBUQ29udGV4dDtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlclZlcnRleEJ1ZmZlciA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCBidWZmZXIgKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcbiAgICAgIGdsLmJpbmRCdWZmZXIoIEdMX0FSUkFZX0JVRkZFUiwgYnVmZmVyPy5yYXcgPz8gbnVsbCApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlckluZGV4QnVmZmVyID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIGJ1ZmZlciApID0+IHtcbiAgICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuICAgICAgZ2wuYmluZEJ1ZmZlciggR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGJ1ZmZlcj8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJWZXJ0ZXhBcnJheSA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0VmVydGV4QXJyYXk8VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIHZlcnRleEFycmF5ICkgPT4ge1xuICAgICAgdGhpcy5yYXdCaW5kVmVydGV4QXJyYXkoIHZlcnRleEFycmF5Py5yYXcgPz8gbnVsbCApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlclRleHR1cmUyRCA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggdGV4dHVyZSApID0+IHtcbiAgICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuICAgICAgZ2wuYmluZFRleHR1cmUoIEdMX1RFWFRVUkVfMkQsIHRleHR1cmU/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyVGV4dHVyZUN1YmVNYXAgPSBuZXcgQmluZEhlbHBlcjxHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIHRleHR1cmUgKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcbiAgICAgIGdsLmJpbmRUZXh0dXJlKCBHTF9URVhUVVJFX0NVQkVfTUFQLCB0ZXh0dXJlPy5yYXcgPz8gbnVsbCApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlclJlbmRlcmJ1ZmZlciA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCByZW5kZXJidWZmZXIgKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcbiAgICAgIGdsLmJpbmRSZW5kZXJidWZmZXIoIEdMX1JFTkRFUkJVRkZFUiwgcmVuZGVyYnVmZmVyPy5yYXcgPz8gbnVsbCApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlckZyYW1lYnVmZmVyID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggZnJhbWVidWZmZXIgKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlciggR0xfRlJBTUVCVUZGRVIsIGZyYW1lYnVmZmVyPy5yYXcgPz8gbnVsbCApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlclByb2dyYW0gPSBuZXcgQmluZEhlbHBlcjxHTENhdFByb2dyYW08VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIHByb2dyYW0gKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcbiAgICAgIGdsLnVzZVByb2dyYW0oIHByb2dyYW0/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyRHJhd0J1ZmZlcnMgPSBuZXcgQmluZEhlbHBlcjxHTGVudW1bXT4oXG4gICAgWyBHTF9DT0xPUl9BVFRBQ0hNRU5UMCBdLFxuICAgICggYnVmZmVycyApID0+IHtcbiAgICAgIHRoaXMucmF3RHJhd0J1ZmZlcnMoIGJ1ZmZlcnMgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2V4dGVuc2lvbkNhY2hlOiB7IFsgbmFtZTogc3RyaW5nIF06IFdlYkdMRXh0ZW5zaW9uIH0gPSB7fTtcbiAgcHJpdmF0ZSBfX2R1bW15VGV4dHVyZUNhY2hlPzogR0xDYXRUZXh0dXJlPFRDb250ZXh0PjtcblxuICAvKipcbiAgICogSXRzIG93biByZW5kZXJpbmcgY29udGV4dC5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmVuZGVyaW5nQ29udGV4dCgpOiBUQ29udGV4dCB7XG4gICAgcmV0dXJuIHRoaXMuX19nbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIHJlbmRlcmluZyBjb250ZXh0LiBTaG9ydGVyIHRoYW4gW1tHTENhdC5yZW5kZXJpbmdDb250ZXh0XV1cbiAgICovXG4gIHB1YmxpYyBnZXQgZ2woKTogVENvbnRleHQge1xuICAgIHJldHVybiB0aGlzLl9fZ2w7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IGluc3RhbmNlLlxuICAgKiBSZW5kZXJpbmcgY29udGV4dCBpcyByZXF1aXJlZC5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZ2w6IFRDb250ZXh0ICkge1xuICAgIHRoaXMuX19nbCA9IGdsO1xuXG4gICAgZ2wuZW5hYmxlKCBHTF9ERVBUSF9URVNUICk7XG4gICAgZ2wuZGVwdGhGdW5jKCBHTF9MRVFVQUwgKTtcbiAgICBnbC5lbmFibGUoIEdMX0JMRU5EICk7XG4gICAgZ2wuYmxlbmRGdW5jKCBHTF9TUkNfQUxQSEEsIEdMX09ORV9NSU5VU19TUkNfQUxQSEEgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGR1bW15IHRleHR1cmUsIDEwMCUgb3JnYW5pYyBwdXJlICNGRjAwRkYgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgZHVtbXlUZXh0dXJlKCk6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4ge1xuICAgIGlmICggdGhpcy5fX2R1bW15VGV4dHVyZUNhY2hlICkge1xuICAgICAgcmV0dXJuIHRoaXMuX19kdW1teVRleHR1cmVDYWNoZTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0dXJlID0gdGhpcy5jcmVhdGVUZXh0dXJlKCk7XG5cbiAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkoIDEsIDEsIG5ldyBVaW50OEFycmF5KCBbIDI1NSwgMCwgMjU1LCAyNTUgXSApICk7XG4gICAgdGhpcy5fX2R1bW15VGV4dHVyZUNhY2hlID0gdGV4dHVyZTtcbiAgICByZXR1cm4gdGV4dHVyZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBhbiBleHRlbnNpb24uXG4gICAqIElmIHRoZXkgaXMgeW91ciBwcmVjaW91cyBvbmUgYW5kIHlvdSBjYW5ub3QgbGl2ZSB3aXRob3V0IGhpbSwgdHVybiBvbiBgdGhyb3dJZk5vdEZvdW5kYC5cbiAgICovXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2hhbGZfZmxvYXQnLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IE9FU190ZXh0dXJlX2hhbGZfZmxvYXQgfCBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfaGFsZl9mbG9hdCcsXG4gICAgdGhyb3dJZk5vdEZvdW5kOiB0cnVlXG4gICk6IE9FU190ZXh0dXJlX2hhbGZfZmxvYXQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0X2xpbmVhcicsXG4gICAgdGhyb3dJZk5vdEZvdW5kPzogZmFsc2VcbiAgKTogT0VTX3RleHR1cmVfaGFsZl9mbG9hdF9saW5lYXIgfCBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfaGFsZl9mbG9hdF9saW5lYXInLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0X2xpbmVhcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2Zsb2F0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBPRVNfdGV4dHVyZV9mbG9hdCB8IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdGV4dHVyZV9mbG9hdCcsXG4gICAgdGhyb3dJZk5vdEZvdW5kOiB0cnVlXG4gICk6IE9FU190ZXh0dXJlX2Zsb2F0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXIgfCBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnQU5HTEVfaW5zdGFuY2VkX2FycmF5cycsXG4gICAgdGhyb3dJZk5vdEZvdW5kPzogZmFsc2VcbiAgKTogQU5HTEVfaW5zdGFuY2VkX2FycmF5cyB8IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogQU5HTEVfaW5zdGFuY2VkX2FycmF5czsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBPRVNfdmVydGV4X2FycmF5X29iamVjdCB8IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdmVydGV4X2FycmF5X29iamVjdCcsXG4gICAgdGhyb3dJZk5vdEZvdW5kOiB0cnVlXG4gICk6IE9FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnV0VCR0xfZHJhd19idWZmZXJzJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBXRUJHTF9kcmF3X2J1ZmZlcnMgfCBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnV0VCR0xfZHJhd19idWZmZXJzJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogV0VCR0xfZHJhd19idWZmZXJzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbiggbmFtZTogc3RyaW5nLCB0aHJvd0lmTm90Rm91bmQ/OiBib29sZWFuICk6IFdlYkdMRXh0ZW5zaW9uIHwgbnVsbDtcbiAgcHVibGljIGdldEV4dGVuc2lvbiggbmFtZTogc3RyaW5nLCB0aHJvd0lmTm90Rm91bmQ/OiBib29sZWFuICk6IFdlYkdMRXh0ZW5zaW9uIHwgbnVsbCB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBpZiAoIHRoaXMuX19leHRlbnNpb25DYWNoZVsgbmFtZSBdICkge1xuICAgICAgcmV0dXJuIHRoaXMuX19leHRlbnNpb25DYWNoZVsgbmFtZSBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbIG5hbWUgXSA9IGdsLmdldEV4dGVuc2lvbiggbmFtZSApO1xuICAgICAgaWYgKCB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbIG5hbWUgXSApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX19leHRlbnNpb25DYWNoZVsgbmFtZSBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCB0aHJvd0lmTm90Rm91bmQgKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCAnR0xDYXQuZ2V0RXh0ZW5zaW9uOiBUaGUgZXh0ZW5zaW9uIFwiJyArIG5hbWUgKyAnXCIgaXMgbm90IHN1cHBvcnRlZCcgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgZXh0ZW5zaW9ucy5cbiAgICogSWYgdGhleSBhcmUgeW91ciBwcmVjaW91cyBvbmVzIGFuZCB5b3UgY2Fubm90IGxpdmUgd2l0aG91dCB0aGVtLCB0dXJuIG9uIGB0aHJvd0lmTm90Rm91bmRgLlxuICAgKi9cbiAgcHVibGljIGdldEV4dGVuc2lvbnMoIG5hbWVzOiBzdHJpbmdbXSwgdGhyb3dJZk5vdEZvdW5kPzogYm9vbGVhbiApOiBBcnJheTxXZWJHTEV4dGVuc2lvbiB8IG51bGw+IHtcbiAgICByZXR1cm4gbmFtZXMubWFwKCAoIG4gKSA9PiB0aGlzLmdldEV4dGVuc2lvbiggbiwgdGhyb3dJZk5vdEZvdW5kICkgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgc2hhZGVyIG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVTaGFkZXIoIHR5cGU6IG51bWJlciApOiBHTENhdFNoYWRlcjxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgY29uc3Qgc2hhZGVyID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVNoYWRlciggdHlwZSApICk7XG5cbiAgICByZXR1cm4gbmV3IEdMQ2F0U2hhZGVyKCB0aGlzLCBzaGFkZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXQgcHJvZ3JhbSBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlUHJvZ3JhbSgpOiBHTENhdFByb2dyYW08VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGNvbnN0IHByb2dyYW0gPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlUHJvZ3JhbSgpICk7XG5cbiAgICByZXR1cm4gbmV3IEdMQ2F0UHJvZ3JhbSggdGhpcywgcHJvZ3JhbSApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdCBwcm9ncmFtIG9iamVjdCwgaW4gbGF6aWVyIHdheS5cbiAgICovXG4gIHB1YmxpYyBsYXp5UHJvZ3JhbSggdmVydDogc3RyaW5nLCBmcmFnOiBzdHJpbmcgKTogR0xDYXRQcm9ncmFtPFRDb250ZXh0PiB7XG4gICAgbGV0IHZlcnRleFNoYWRlcjogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBmcmFnbWVudFNoYWRlcjogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBwcm9ncmFtOiBHTENhdFNoYWRlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgLy8gPT0gdmVydCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgdmVydGV4U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXIoIEdMX1ZFUlRFWF9TSEFERVIgKTtcbiAgICAgIHZlcnRleFNoYWRlci5jb21waWxlKCB2ZXJ0ICk7XG5cbiAgICAgIC8vID09IGZyYWcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXIoIEdMX0ZSQUdNRU5UX1NIQURFUiApO1xuICAgICAgZnJhZ21lbnRTaGFkZXIuY29tcGlsZSggZnJhZyApO1xuXG4gICAgICAvLyA9PSBwcm9ncmFtID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCBwcm9ncmFtID0gdGhpcy5jcmVhdGVQcm9ncmFtKCk7XG4gICAgICBwcm9ncmFtLmxpbmsoIHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIgKTtcblxuICAgICAgLy8gPT0gYWxtb3N0IGRvbmUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgcmV0dXJuIHByb2dyYW07XG4gICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICBwcm9ncmFtPy5kaXNwb3NlKCk7XG4gICAgICBmcmFnbWVudFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgdmVydGV4U2hhZGVyPy5kaXNwb3NlKCk7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXQgcHJvZ3JhbSBvYmplY3QsIGluIGxhemllciB3YXkuXG4gICAqIEl0J3MgZ29ubmEgYmUgYXN5bmNocm9ub3VzIGlmIHlvdSBoYXZlIHRoZSBLSFJfcGFyYWxsZWxfc2hhZGVyX2NvbXBpbGUgZXh0ZW5zaW9uIHN1cHBvcnQuXG4gICAqL1xuICBwdWJsaWMgbGF6eVByb2dyYW1Bc3luYyggdmVydDogc3RyaW5nLCBmcmFnOiBzdHJpbmcgKTogUHJvbWlzZTxHTENhdFByb2dyYW08VENvbnRleHQ+PiB7XG4gICAgbGV0IHZlcnRleFNoYWRlcjogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBmcmFnbWVudFNoYWRlcjogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBwcm9ncmFtOiBHTENhdFNoYWRlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgLy8gPT0gdmVydCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgY29uc3QgdmVydGV4U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXIoIEdMX1ZFUlRFWF9TSEFERVIgKTtcbiAgICAgIHZlcnRleFNoYWRlci5jb21waWxlKCB2ZXJ0ICk7XG5cbiAgICAgIC8vID09IGZyYWcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXIoIEdMX0ZSQUdNRU5UX1NIQURFUiApO1xuICAgICAgZnJhZ21lbnRTaGFkZXIuY29tcGlsZSggZnJhZyApO1xuXG4gICAgICAvLyA9PSBwcm9ncmFtID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCBwcm9ncmFtID0gdGhpcy5jcmVhdGVQcm9ncmFtKCk7XG4gICAgICByZXR1cm4gcHJvZ3JhbS5saW5rQXN5bmMoIHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIgKS50aGVuKCAoKSA9PiB7XG4gICAgICAgIHJldHVybiBwcm9ncmFtO1xuICAgICAgfSApLmNhdGNoKCAoIGUgKSA9PiB7XG4gICAgICAgIHByb2dyYW0/LmRpc3Bvc2UoKTtcbiAgICAgICAgZnJhZ21lbnRTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgICAgdmVydGV4U2hhZGVyPy5kaXNwb3NlKCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCggZSApO1xuICAgICAgfSApO1xuICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgcHJvZ3JhbT8uZGlzcG9zZSgpO1xuICAgICAgZnJhZ21lbnRTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHZlcnRleFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCBlICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgYSBwcm9ncmFtIHRvIHVzZS5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSB1c2FnZSBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgdXNlUHJvZ3JhbTxUPihcbiAgICBwcm9ncmFtOiBHTENhdFByb2dyYW08VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggcHJvZ3JhbTogR0xDYXRQcm9ncmFtPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclByb2dyYW0uYmluZCggcHJvZ3JhbSwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgdmVydGV4IGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVCdWZmZXIoKTogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGNvbnN0IGJ1ZmZlciA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVCdWZmZXIoKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdEJ1ZmZlciggdGhpcywgYnVmZmVyICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIHZlcnRleCBidWZmZXIuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZFZlcnRleEJ1ZmZlcjxUPihcbiAgICBidWZmZXI6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIGJ1ZmZlcjogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyVmVydGV4QnVmZmVyLmJpbmQoIGJ1ZmZlciwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGFuIGluZGV4IGJ1ZmZlci5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kSW5kZXhCdWZmZXI8VD4oXG4gICAgYnVmZmVyOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCBidWZmZXI6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlckluZGV4QnVmZmVyLmJpbmQoIGJ1ZmZlciwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgdmVydGV4IGFycmF5LlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVZlcnRleEFycmF5KCk6IEdMQ2F0VmVydGV4QXJyYXk8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmICggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgY29uc3QgdmVydGV4QXJyYXkgPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlVmVydGV4QXJyYXkoKSApO1xuXG4gICAgICByZXR1cm4gbmV3IEdMQ2F0VmVydGV4QXJyYXkoIHRoaXMsIHZlcnRleEFycmF5IGFzIGFueSApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHQgPSB0aGlzLmdldEV4dGVuc2lvbiggJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JywgdHJ1ZSApO1xuXG4gICAgICBjb25zdCB2ZXJ0ZXhBcnJheSA9IEdMQ2F0LnRocm93SWZOdWxsKCBleHQuY3JlYXRlVmVydGV4QXJyYXlPRVMoKSApO1xuXG4gICAgICByZXR1cm4gbmV3IEdMQ2F0VmVydGV4QXJyYXkoIHRoaXMsIHZlcnRleEFycmF5IGFzIGFueSApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG9mIGBnbC5iaW5kVmVydGV4QXJyYXlgLlxuICAgKlxuICAgKiB7QGxpbmsgcmF3QmluZFZlcnRleEFycmF5fSBpcyBiZXR0ZXIuXG4gICAqL1xuICBwdWJsaWMgcmF3QmluZFZlcnRleEFycmF5KCBhcnJheTogR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQ+IHwgbnVsbCApOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmICggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgZ2wuYmluZFZlcnRleEFycmF5KCBhcnJheSApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHQgPSB0aGlzLmdldEV4dGVuc2lvbiggJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JywgdHJ1ZSApO1xuICAgICAgZXh0LmJpbmRWZXJ0ZXhBcnJheU9FUyggYXJyYXkgYXMgYW55ICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHtAbGluayByYXdCaW5kVmVydGV4QXJyYXl9IGJ1dCBiZXR0ZXIuXG4gICAqXG4gICAqIEJpbmQgYSB2ZXJ0ZXggYXJyYXkuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZFZlcnRleEFycmF5PFQ+KFxuICAgIHZlcnRleEFycmF5OiBHTENhdFZlcnRleEFycmF5PFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIHZlcnRleEFycmF5OiBHTENhdFZlcnRleEFycmF5PFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclZlcnRleEFycmF5LmJpbmQoIHZlcnRleEFycmF5LCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVRleHR1cmUoKTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBjb25zdCB0ZXh0dXJlID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVRleHR1cmUoKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdFRleHR1cmUoIHRoaXMsIHRleHR1cmUgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgMkQgdGV4dHVyZS5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kVGV4dHVyZTJEPFQ+KFxuICAgIHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyVGV4dHVyZTJELmJpbmQoIHRleHR1cmUsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIGN1YmVtYXAgdGV4dHVyZS5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kVGV4dHVyZUN1YmVNYXA8VD4oXG4gICAgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJUZXh0dXJlQ3ViZU1hcC5iaW5kKCB0ZXh0dXJlLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyByZW5kZXJidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlUmVuZGVyYnVmZmVyKCk6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBjb25zdCByZW5kZXJidWZmZXIgPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlUmVuZGVyYnVmZmVyKCkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRSZW5kZXJidWZmZXIoIHRoaXMsIHJlbmRlcmJ1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSByZW5kZXJidWZmZXIuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZFJlbmRlcmJ1ZmZlcjxUPihcbiAgICByZW5kZXJidWZmZXI6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIHJlbmRlcmJ1ZmZlcjogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyUmVuZGVyYnVmZmVyLmJpbmQoIHJlbmRlcmJ1ZmZlciwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgZnJhbWVidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlRnJhbWVidWZmZXIoKTogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgY29uc3QgZnJhbWVidWZmZXIgPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlRnJhbWVidWZmZXIoKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdEZyYW1lYnVmZmVyKCB0aGlzLCBmcmFtZWJ1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSBmcmFtZWJ1ZmZlci5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kRnJhbWVidWZmZXI8VD4oXG4gICAgZnJhbWVidWZmZXI6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggZnJhbWVidWZmZXI6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyRnJhbWVidWZmZXIuYmluZCggZnJhbWVidWZmZXIsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGZyYW1lYnVmZXIsIGluIGxhemllciB3YXkuXG4gICAqL1xuICBwdWJsaWMgbGF6eUZyYW1lYnVmZmVyKFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAge1xuICAgICAgaXNGbG9hdCA9IGZhbHNlLFxuICAgICAgZGVwdGhGb3JtYXQgPSB0aGlzLnByZWZlcnJlZERlcHRoRm9ybWF0XG4gICAgfSA9IHt9XG4gICk6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHtcbiAgICBsZXQgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgcmVuZGVyYnVmZmVyOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IGZyYW1lYnVmZmVyOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICAvLyA9PSBmcmFtZWJ1ZmZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBmcmFtZWJ1ZmZlciA9IHRoaXMuY3JlYXRlRnJhbWVidWZmZXIoKTtcblxuICAgICAgLy8gPT0gcmVuZGVyYnVmZmVyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgcmVuZGVyYnVmZmVyID0gdGhpcy5jcmVhdGVSZW5kZXJidWZmZXIoKTtcbiAgICAgIHJlbmRlcmJ1ZmZlci5pbml0KCB3aWR0aCwgaGVpZ2h0LCB7IGZvcm1hdDogZGVwdGhGb3JtYXQgfSApO1xuICAgICAgZnJhbWVidWZmZXIuYXR0YWNoUmVuZGVyYnVmZmVyKCByZW5kZXJidWZmZXIsIHsgYXR0YWNobWVudDogR0xfREVQVEhfQVRUQUNITUVOVCB9ICk7XG5cbiAgICAgIC8vID09IHRleHR1cmUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHRleHR1cmUgPSB0aGlzLmNyZWF0ZVRleHR1cmUoKTtcbiAgICAgIGlmICggaXNGbG9hdCApIHtcbiAgICAgICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KFxuICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIHsgaW50ZXJuYWxmb3JtYXQ6IEdMX1JHQkEzMkYsIGZvcm1hdDogR0xfUkdCQSwgdHlwZTogR0xfRkxPQVQgfVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KCB3aWR0aCwgaGVpZ2h0LCBudWxsICk7XG4gICAgICB9XG4gICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hUZXh0dXJlKCB0ZXh0dXJlICk7XG5cbiAgICAgIC8vID09IGFsbW9zdCBkb25lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHJldHVybiBmcmFtZWJ1ZmZlcjtcbiAgICB9IGNhdGNoICggZSApIHtcbiAgICAgIGZyYW1lYnVmZmVyPy5kaXNwb3NlKCk7XG4gICAgICB0ZXh0dXJlPy5kaXNwb3NlKCk7XG4gICAgICByZW5kZXJidWZmZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBtdWx0aXNhbXBsZSBmcmFtZWJ1ZmZlciwgaW4gbGF6aWVyIHdheS5cbiAgICovXG4gIHB1YmxpYyBsYXp5TXVsdGlzYW1wbGVGcmFtZWJ1ZmZlcihcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHtcbiAgICAgIHNhbXBsZXMgPSA0LFxuICAgICAgaXNGbG9hdCA9IGZhbHNlLFxuICAgICAgZGVwdGhGb3JtYXQgPSB0aGlzLnByZWZlcnJlZERlcHRoRm9ybWF0LFxuICAgICAgZmFsbGJhY2tXZWJHTDEgPSB0cnVlXG4gICAgfSA9IHt9XG4gICk6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmICggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgbGV0IHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgICBsZXQgcmVuZGVyYnVmZmVyRGVwdGg6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICAgIGxldCByZW5kZXJidWZmZXJDb2xvcjogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgICAgbGV0IGZyYW1lYnVmZmVyOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gPT0gZnJhbWVidWZmZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgZnJhbWVidWZmZXIgPSB0aGlzLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XG5cbiAgICAgICAgLy8gPT0gcmVuZGVyYnVmZmVyIGRlcHRoID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgcmVuZGVyYnVmZmVyRGVwdGggPSB0aGlzLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xuICAgICAgICByZW5kZXJidWZmZXJEZXB0aC5pbml0TXVsdGlzYW1wbGUoXG4gICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgIHsgc2FtcGxlcywgZm9ybWF0OiBkZXB0aEZvcm1hdCB9XG4gICAgICAgICk7XG4gICAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFJlbmRlcmJ1ZmZlciggcmVuZGVyYnVmZmVyRGVwdGgsIHsgYXR0YWNobWVudDogR0xfREVQVEhfQVRUQUNITUVOVCB9ICk7XG5cbiAgICAgICAgLy8gPT0gcmVuZGVyYnVmZmVyIGNvbG9yID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgY29uc3QgcmVuZGVyYnVmZmVyQ29sb3IgPSB0aGlzLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xuICAgICAgICBjb25zdCBjb2xvckZvcm1hdCA9IGlzRmxvYXQgPyBHTF9SR0JBMzJGIDogR0xfUkdCQTg7XG4gICAgICAgIHJlbmRlcmJ1ZmZlckNvbG9yLmluaXRNdWx0aXNhbXBsZShcbiAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgeyBzYW1wbGVzLCBmb3JtYXQ6IGNvbG9yRm9ybWF0IH1cbiAgICAgICAgKTtcbiAgICAgICAgZnJhbWVidWZmZXIuYXR0YWNoUmVuZGVyYnVmZmVyKCByZW5kZXJidWZmZXJDb2xvciwgeyBhdHRhY2htZW50OiBHTF9DT0xPUl9BVFRBQ0hNRU5UMCB9ICk7XG5cbiAgICAgICAgLy8gPT0gYWxtb3N0IGRvbmUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgcmV0dXJuIGZyYW1lYnVmZmVyO1xuICAgICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICAgIGZyYW1lYnVmZmVyPy5kaXNwb3NlKCk7XG4gICAgICAgIHRleHR1cmU/LmRpc3Bvc2UoKTtcbiAgICAgICAgcmVuZGVyYnVmZmVyQ29sb3I/LmRpc3Bvc2UoKTtcbiAgICAgICAgcmVuZGVyYnVmZmVyRGVwdGg/LmRpc3Bvc2UoKTtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCBmYWxsYmFja1dlYkdMMSApIHtcbiAgICAgIHJldHVybiB0aGlzLmxhenlGcmFtZWJ1ZmZlciggd2lkdGgsIGhlaWdodCwgeyBpc0Zsb2F0IH0gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgR0xDYXRFcnJvcnMuV2ViR0wyRXhjbHVzaXZlRXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBkcmF3IGJ1ZmZlcnMsIGluIGxhemllciB3YXkuXG4gICAqIElmIHlvdSBjYW4ndCBncmFiIGBXRUJHTF9kcmF3X2J1ZmZlcnNgIGV4dGVuc2lvbiwgeW91J2xsIGRpZSBpbnN0YW50bHkgYXQgdGhpcyBwb2ludC5cbiAgICovXG4gIHB1YmxpYyBsYXp5RHJhd2J1ZmZlcnMoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBudW1CdWZmZXJzOiBudW1iZXIsXG4gICAge1xuICAgICAgaXNGbG9hdCA9IGZhbHNlLFxuICAgICAgZGVwdGhGb3JtYXQgPSB0aGlzLnByZWZlcnJlZERlcHRoRm9ybWF0XG4gICAgfSA9IHt9XG4gICk6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHtcbiAgICBpZiAoIEdMX01BWF9EUkFXX0JVRkZFUlMgPCBudW1CdWZmZXJzICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCAnR0xDYXQ6IE1heGltdW0gZHJhdyBidWZmZXJzIGNvdW50IGV4Y2VlZGVkJyApO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHR1cmVzOiBHTENhdFRleHR1cmU8VENvbnRleHQ+W10gPSBbXTtcbiAgICBsZXQgcmVuZGVyYnVmZmVyOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IGZyYW1lYnVmZmVyOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICAvLyA9PSBmcmFtZWJ1ZmZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBmcmFtZWJ1ZmZlciA9IHRoaXMuY3JlYXRlRnJhbWVidWZmZXIoKTtcblxuICAgICAgLy8gPT0gcmVuZGVyYnVmZmVyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgY29uc3QgcmVuZGVyYnVmZmVyID0gdGhpcy5jcmVhdGVSZW5kZXJidWZmZXIoKTtcbiAgICAgIHJlbmRlcmJ1ZmZlci5pbml0KCB3aWR0aCwgaGVpZ2h0LCB7IGZvcm1hdDogZGVwdGhGb3JtYXQgfSApO1xuICAgICAgZnJhbWVidWZmZXIuYXR0YWNoUmVuZGVyYnVmZmVyKCByZW5kZXJidWZmZXIsIHsgYXR0YWNobWVudDogR0xfREVQVEhfQVRUQUNITUVOVCB9ICk7XG5cbiAgICAgIC8vID09IHRleHR1cmUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IG51bUJ1ZmZlcnM7IGkgKysgKSB7XG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSB0aGlzLmNyZWF0ZVRleHR1cmUoKTtcbiAgICAgICAgaWYgKCBpc0Zsb2F0ICkge1xuICAgICAgICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21BcnJheShcbiAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIHsgaW50ZXJuYWxmb3JtYXQ6IEdMX1JHQkEzMkYsIGZvcm1hdDogR0xfUkdCQSwgdHlwZTogR0xfRkxPQVQgfVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KCB3aWR0aCwgaGVpZ2h0LCBudWxsICk7XG4gICAgICAgIH1cbiAgICAgICAgZnJhbWVidWZmZXIuYXR0YWNoVGV4dHVyZSggdGV4dHVyZSwgeyBhdHRhY2htZW50OiBHTF9DT0xPUl9BVFRBQ0hNRU5UMCArIGkgfSApO1xuICAgICAgfVxuXG4gICAgICAvLyA9PSBhbG1vc3QgZG9uZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICByZXR1cm4gZnJhbWVidWZmZXI7XG4gICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICB0ZXh0dXJlcy5mb3JFYWNoKCAoIHRleHR1cmUgKSA9PiB7XG4gICAgICAgIHRleHR1cmUuZGlzcG9zZSgpO1xuICAgICAgfSApO1xuICAgICAgcmVuZGVyYnVmZmVyPy5kaXNwb3NlKCk7XG4gICAgICBmcmFtZWJ1ZmZlcj8uZGlzcG9zZSgpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBvZiBgZ2wuZHJhd0J1ZmZlcnNgLlxuICAgKlxuICAgKiB7QGxpbmsgZHJhd0J1ZmZlcnN9IGlzIGJldHRlci5cbiAgICovXG4gIHB1YmxpYyByYXdEcmF3QnVmZmVycyggYnVmZmVyczogR0xlbnVtW10gKTogdm9pZCB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGdsLmRyYXdCdWZmZXJzKCBidWZmZXJzICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4dCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCAnV0VCR0xfZHJhd19idWZmZXJzJyApO1xuICAgICAgZXh0Py5kcmF3QnVmZmVyc1dFQkdMKCBidWZmZXJzICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHtAbGluayByYXdEcmF3QnVmZmVyc30gYnV0IGJldHRlci5cbiAgICpcbiAgICogQ2FsbCB0aGlzIGJlZm9yZSB5b3UncmUgZ29ubmEgdXNlIGRyYXcgYnVmZmVycy5cbiAgICogSWYgeW91IGNhbid0IGdyYWIgYFdFQkdMX2RyYXdfYnVmZmVyc2AgZXh0ZW5zaW9uLCB5b3UnbGwgZGllIGluc3RhbnRseSBhdCB0aGlzIHBvaW50LlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGRyYXcgYnVmZmVycyBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgZHJhd0J1ZmZlcnM8VD4oXG4gICAgYnVmZmVyc09yTnVtQnVmZmVycz86IEdMZW51bVtdIHwgbnVtYmVyLFxuICAgIGNhbGxiYWNrPzogKCBidWZmZXJzOiBHTGVudW1bXSApID0+IFRcbiAgKTogVCB7XG4gICAgbGV0IGJ1ZmZlcnM6IEdMZW51bVtdO1xuXG4gICAgaWYgKCBBcnJheS5pc0FycmF5KCBidWZmZXJzT3JOdW1CdWZmZXJzICkgKSB7XG4gICAgICBidWZmZXJzID0gYnVmZmVyc09yTnVtQnVmZmVycztcbiAgICB9IGVsc2UgaWYgKCBidWZmZXJzT3JOdW1CdWZmZXJzICkge1xuICAgICAgYnVmZmVycyA9IFtdO1xuICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgYnVmZmVyc09yTnVtQnVmZmVyczsgaSArKyApIHtcbiAgICAgICAgYnVmZmVyc1sgaSBdID0gR0xfQ09MT1JfQVRUQUNITUVOVDAgKyBpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBidWZmZXJzID0gWyBHTF9DT0xPUl9BVFRBQ0hNRU5UMCBdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlckRyYXdCdWZmZXJzLmJpbmQoIGJ1ZmZlcnMsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogYSB3cmFwcGVyIG9mIGRyYXdFbGVtZW50c0luc3RhbmNlZC5cbiAgICovXG4gIHB1YmxpYyBkcmF3QXJyYXlzSW5zdGFuY2VkKFxuICAgIG1vZGU6IEdMZW51bSxcbiAgICBmaXJzdDogR0xpbnQsXG4gICAgY291bnQ6IEdMc2l6ZWksXG4gICAgcHJpbWNvdW50OiBHTHNpemVpXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XG5cbiAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGdsLmRyYXdBcnJheXNJbnN0YW5jZWQoIG1vZGUsIGZpcnN0LCBjb3VudCwgcHJpbWNvdW50ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4dCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCAnQU5HTEVfaW5zdGFuY2VkX2FycmF5cycsIHRydWUgKTtcbiAgICAgIGV4dC5kcmF3QXJyYXlzSW5zdGFuY2VkQU5HTEUoIG1vZGUsIGZpcnN0LCBjb3VudCwgcHJpbWNvdW50ICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGEgd3JhcHBlciBvZiBkcmF3RWxlbWVudHNJbnN0YW5jZWQuXG4gICAqL1xuICBwdWJsaWMgZHJhd0VsZW1lbnRzSW5zdGFuY2VkKFxuICAgIG1vZGU6IEdMZW51bSxcbiAgICBjb3VudDogR0xzaXplaSxcbiAgICB0eXBlOiBHTGVudW0sXG4gICAgb2Zmc2V0OiBHTGludHB0cixcbiAgICBpbnN0YW5jZUNvdW50OiBHTHNpemVpXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XG5cbiAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGdsLmRyYXdFbGVtZW50c0luc3RhbmNlZCggbW9kZSwgY291bnQsIHR5cGUsIG9mZnNldCwgaW5zdGFuY2VDb3VudCApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHQgPSB0aGlzLmdldEV4dGVuc2lvbiggJ0FOR0xFX2luc3RhbmNlZF9hcnJheXMnLCB0cnVlICk7XG4gICAgICBleHQuZHJhd0VsZW1lbnRzSW5zdGFuY2VkQU5HTEUoIG1vZGUsIGNvdW50LCB0eXBlLCBvZmZzZXQsIGluc3RhbmNlQ291bnQgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGN1cnJlbnQgZnJhbWVidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgY2xlYXIoXG4gICAgcmVkID0gMC4wLFxuICAgIGdyZWVuID0gMC4wLFxuICAgIGJsdWUgPSAwLjAsXG4gICAgYWxwaGEgPSAxLjAsXG4gICAgZGVwdGggPSAxLjBcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBnbC5jbGVhckNvbG9yKCByZWQsIGdyZWVuLCBibHVlLCBhbHBoYSApO1xuICAgIGdsLmNsZWFyRGVwdGgoIGRlcHRoICk7XG4gICAgZ2wuY2xlYXIoIEdMX0NPTE9SX0JVRkZFUl9CSVQgfCBHTF9ERVBUSF9CVUZGRVJfQklUICk7XG4gIH1cblxuICAvKipcbiAgICogQmFzaWNhbGx5IGp1c3QgYSBgZ2wuYmxpdEZyYW1lYnVmZmVyYC5cbiAgICovXG4gIHB1YmxpYyBibGl0RnJhbWVidWZmZXIoXG4gICAgc3JjOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IG51bGwsXG4gICAgZHN0OiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IG51bGwsXG4gICAge1xuICAgICAgc3JjVmlld3BvcnQgPSBbIDAsIDAsIHNyYz8ucmVuZGVyYnVmZmVyPy53aWR0aCA/PyAwLCBzcmM/LnJlbmRlcmJ1ZmZlcj8uaGVpZ2h0ID8/IDAgXSxcbiAgICAgIGRzdFZpZXdwb3J0ID0gWyAwLCAwLCBkc3Q/LnJlbmRlcmJ1ZmZlcj8ud2lkdGggPz8gMCwgZHN0Py5yZW5kZXJidWZmZXI/LmhlaWdodCA/PyAwIF0sXG4gICAgICBtYXNrID0gR0xfQ09MT1JfQlVGRkVSX0JJVCxcbiAgICAgIGZpbHRlciA9IEdMX05FQVJFU1RcbiAgICB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlciggR0xfUkVBRF9GUkFNRUJVRkZFUiwgc3JjPy5yYXcgPz8gbnVsbCApO1xuICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKCBHTF9EUkFXX0ZSQU1FQlVGRkVSLCBkc3Q/LnJhdyA/PyBudWxsICk7XG4gICAgICBnbC5ibGl0RnJhbWVidWZmZXIoXG4gICAgICAgIHNyY1ZpZXdwb3J0WyAwIF0sXG4gICAgICAgIHNyY1ZpZXdwb3J0WyAxIF0sXG4gICAgICAgIHNyY1ZpZXdwb3J0WyAyIF0sXG4gICAgICAgIHNyY1ZpZXdwb3J0WyAzIF0sXG4gICAgICAgIGRzdFZpZXdwb3J0WyAwIF0sXG4gICAgICAgIGRzdFZpZXdwb3J0WyAxIF0sXG4gICAgICAgIGRzdFZpZXdwb3J0WyAyIF0sXG4gICAgICAgIGRzdFZpZXdwb3J0WyAzIF0sXG4gICAgICAgIG1hc2ssXG4gICAgICAgIGZpbHRlclxuICAgICAgKTtcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlciggR0xfUkVBRF9GUkFNRUJVRkZFUiwgbnVsbCApO1xuICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKCBHTF9EUkFXX0ZSQU1FQlVGRkVSLCBudWxsICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEdMQ2F0RXJyb3JzLldlYkdMMkV4Y2x1c2l2ZUVycm9yO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBWU8sTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDO0FBSS9CLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQztBQW1CeEIsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUM7QUFFaEMsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUM7QUFnQ3BDLE1BQU0sbUJBQW1CLEdBQUcsVUFBVSxDQUFDO0FBSXZDLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDO0FBQ2pDLE1BQU0sd0JBQXdCLEdBQUcsTUFBTSxDQUFDO0FBMkV4QyxNQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQztBQUVuQyxNQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FBQztBQUd2QyxNQUFNLG9CQUFvQixHQUFHLE1BQU0sQ0FBQztBQU9wQyxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUM7QUFFN0IsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUM7QUFvQ25DLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDO0FBT25DLE1BQU0sdUJBQXVCLEdBQUcsTUFBTSxDQUFDO0FBSXZDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQztBQWN4QixNQUFNLGtCQUFrQixHQUFHLE1BQU0sQ0FBQztBQUdsQyxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUM7QUFtQzlCLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQztBQXlCN0IsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDO0FBS3pCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUl6QixNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUM7QUFnQjlCLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDO0FBc0NuQyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUM7QUFjMUIsTUFBTSxzQkFBc0IsR0FB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QUNqRCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUUsSUFBSSxDQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUUsSUFBSSxFQUFFO1lBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUUsUUFBUSxFQUFFLEtBQUssQ0FBRSxDQUFDO1NBQ2xDLENBQUUsQ0FBQztLQUNMOzs7O0lBS00sVUFBVSxDQUFFLElBQVksRUFBRSxLQUFrQjtRQUNqRCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUUsSUFBSSxDQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUUsSUFBSSxFQUFFO1lBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUUsUUFBUSxFQUFFLEtBQUssQ0FBRSxDQUFDO1NBQ2xDLENBQUUsQ0FBQztLQUNMOzs7O0lBS00sVUFBVSxDQUFFLElBQVksRUFBRSxLQUFrQjtRQUNqRCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUUsSUFBSSxDQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUUsSUFBSSxFQUFFO1lBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUUsUUFBUSxFQUFFLEtBQUssQ0FBRSxDQUFDO1NBQ2xDLENBQUUsQ0FBQztLQUNMOzs7O0lBS00sVUFBVSxDQUFFLElBQVksRUFBRSxLQUFrQjtRQUNqRCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUUsSUFBSSxDQUFFLENBQUM7UUFDakQsSUFB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
