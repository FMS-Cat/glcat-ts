/*!
* @fms-cat/glcat-ts v0.13.0
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
                var _a;
                if (!extParallel ||
                    gl.getProgramParameter(this.__program, GL_COMPLETION_STATUS_KHR) === true) {
                    this.__linked = gl.getProgramParameter(this.__program, GL_LINK_STATUS);
                    if (!this.__linked) {
                        reject(new Error((_a = gl.getProgramInfoLog(this.__program)) !== null && _a !== void 0 ? _a : 'null'));
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
    renderbufferStorage(width, height, { format = this.__glCat.preferredDepthFormat } = {}) {
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
    renderbufferStorageMultisample(width, height, { samples = this.__glCat.preferredMultisampleSamples, format = GL_DEPTH_ATTACHMENT, fallbackWebGL1 = true } = {}) {
        const { gl } = this.__glCat;
        this.__glCat.bindRenderbuffer(this, () => {
            if (gl instanceof WebGL2RenderingContext) {
                gl.renderbufferStorageMultisample(GL_RENDERBUFFER, samples, format, width, height);
            }
            else {
                if (fallbackWebGL1) {
                    gl.renderbufferStorage(GL_RENDERBUFFER, format, width, height);
                }
                else {
                    throw GLCatErrors.WebGL2ExclusiveError;
                }
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
            renderbuffer.renderbufferStorage(width, height, { format: depthFormat });
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
                renderbufferDepth.renderbufferStorageMultisample(width, height, { samples, format: depthFormat });
                framebuffer.attachRenderbuffer(renderbufferDepth, { attachment: GL_DEPTH_ATTACHMENT });
                // == renderbuffer color ===================================================================
                const renderbufferColor = this.createRenderbuffer();
                const colorFormat = isFloat ? GL_RGBA32F : GL_RGBA8;
                renderbufferColor.renderbufferStorageMultisample(width, height, { samples, format: colorFormat });
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
            renderbuffer.renderbufferStorage(width, height, { format: depthFormat });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xjYXQubW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvR0xDb25zdGFudHMudHMiLCIuLi9zcmMvdXRpbHMvQmluZEhlbHBlci50cyIsIi4uL3NyYy9HTENhdEJ1ZmZlci50cyIsIi4uL3NyYy9HTENhdEVycm9ycy50cyIsIi4uL3NyYy9HTENhdEZyYW1lYnVmZmVyLnRzIiwiLi4vc3JjL0dMQ2F0UHJvZ3JhbS50cyIsIi4uL3NyYy9HTENhdFJlbmRlcmJ1ZmZlci50cyIsIi4uL3NyYy9HTENhdFNoYWRlci50cyIsIi4uL3NyYy9HTENhdFRleHR1cmUudHMiLCIuLi9zcmMvR0xDYXRWZXJ0ZXhBcnJheS50cyIsIi4uL3NyYy9HTENhdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgR0xfQUNUSVZFX0FUVFJJQlVURVMgPSAweDhiODk7XG5leHBvcnQgY29uc3QgR0xfQUNUSVZFX1RFWFRVUkUgPSAweDg0ZTA7XG5leHBvcnQgY29uc3QgR0xfQUNUSVZFX1VOSUZPUk1fQkxPQ0tTID0gMHg4YTM2O1xuZXhwb3J0IGNvbnN0IEdMX0FDVElWRV9VTklGT1JNUyA9IDB4OGI4NjtcbmV4cG9ydCBjb25zdCBHTF9BTElBU0VEX0xJTkVfV0lEVEhfUkFOR0UgPSAweDg0NmU7XG5leHBvcnQgY29uc3QgR0xfQUxJQVNFRF9QT0lOVF9TSVpFX1JBTkdFID0gMHg4NDZkO1xuZXhwb3J0IGNvbnN0IEdMX0FMUEhBID0gMHgxOTA2O1xuZXhwb3J0IGNvbnN0IEdMX0FMUEhBX0JJVFMgPSAweDBkNTU7XG5leHBvcnQgY29uc3QgR0xfQUxSRUFEWV9TSUdOQUxFRCA9IDB4OTExYTtcbmV4cG9ydCBjb25zdCBHTF9BTFdBWVMgPSAweDAyMDc7XG5leHBvcnQgY29uc3QgR0xfQU5ZX1NBTVBMRVNfUEFTU0VEID0gMHg4YzJmO1xuZXhwb3J0IGNvbnN0IEdMX0FOWV9TQU1QTEVTX1BBU1NFRF9DT05TRVJWQVRJVkUgPSAweDhkNmE7XG5leHBvcnQgY29uc3QgR0xfQVJSQVlfQlVGRkVSID0gMHg4ODkyO1xuZXhwb3J0IGNvbnN0IEdMX0FSUkFZX0JVRkZFUl9CSU5ESU5HID0gMHg4ODk0O1xuZXhwb3J0IGNvbnN0IEdMX0FUVEFDSEVEX1NIQURFUlMgPSAweDhiODU7XG5leHBvcnQgY29uc3QgR0xfQkFDSyA9IDB4MDQwNTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORCA9IDB4MGJlMjtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9DT0xPUiA9IDB4ODAwNTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9EU1RfQUxQSEEgPSAweDgwY2E7XG5leHBvcnQgY29uc3QgR0xfQkxFTkRfRFNUX1JHQiA9IDB4ODBjODtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9FUVVBVElPTiA9IDB4ODAwOTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9FUVVBVElPTl9BTFBIQSA9IDB4ODgzZDtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9FUVVBVElPTl9SR0IgPSAweDgwMDk7XG5leHBvcnQgY29uc3QgR0xfQkxFTkRfU1JDX0FMUEhBID0gMHg4MGNiO1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX1NSQ19SR0IgPSAweDgwYzk7XG5leHBvcnQgY29uc3QgR0xfQkxVRV9CSVRTID0gMHgwZDU0O1xuZXhwb3J0IGNvbnN0IEdMX0JPT0wgPSAweDhiNTY7XG5leHBvcnQgY29uc3QgR0xfQk9PTF9WRUMyID0gMHg4YjU3O1xuZXhwb3J0IGNvbnN0IEdMX0JPT0xfVkVDMyA9IDB4OGI1ODtcbmV4cG9ydCBjb25zdCBHTF9CT09MX1ZFQzQgPSAweDhiNTk7XG5leHBvcnQgY29uc3QgR0xfQlJPV1NFUl9ERUZBVUxUX1dFQkdMID0gMHg5MjQ0O1xuZXhwb3J0IGNvbnN0IEdMX0JVRkZFUl9TSVpFID0gMHg4NzY0O1xuZXhwb3J0IGNvbnN0IEdMX0JVRkZFUl9VU0FHRSA9IDB4ODc2NTtcbmV4cG9ydCBjb25zdCBHTF9CWVRFID0gMHgxNDAwO1xuZXhwb3J0IGNvbnN0IEdMX0NDVyA9IDB4MDkwMTtcbmV4cG9ydCBjb25zdCBHTF9DTEFNUF9UT19FREdFID0gMHg4MTJmO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SID0gMHgxODAwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQwID0gMHg4Y2UwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQwX1dFQkdMID0gMHg4Y2UwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxID0gMHg4Y2UxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxX1dFQkdMID0gMHg4Y2UxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMCA9IDB4OGNlYTtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTBfV0VCR0wgPSAweDhjZWE7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDExID0gMHg4Y2ViO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMV9XRUJHTCA9IDB4OGNlYjtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTIgPSAweDhjZWM7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDEyX1dFQkdMID0gMHg4Y2VjO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMyA9IDB4OGNlZDtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTNfV0VCR0wgPSAweDhjZWQ7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDE0ID0gMHg4Y2VlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxNF9XRUJHTCA9IDB4OGNlZTtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTUgPSAweDhjZWY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDE1X1dFQkdMID0gMHg4Y2VmO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQyID0gMHg4Y2UyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQyX1dFQkdMID0gMHg4Y2UyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQzID0gMHg4Y2UzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQzX1dFQkdMID0gMHg4Y2UzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ0ID0gMHg4Y2U0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ0X1dFQkdMID0gMHg4Y2U0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ1ID0gMHg4Y2U1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ1X1dFQkdMID0gMHg4Y2U1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ2ID0gMHg4Y2U2O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ2X1dFQkdMID0gMHg4Y2U2O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ3ID0gMHg4Y2U3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ3X1dFQkdMID0gMHg4Y2U3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ4ID0gMHg4Y2U4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ4X1dFQkdMID0gMHg4Y2U4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ5ID0gMHg4Y2U5O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ5X1dFQkdMID0gMHg4Y2U5O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0JVRkZFUl9CSVQgPSAweDAwMDA0MDAwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0NMRUFSX1ZBTFVFID0gMHgwYzIyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX1dSSVRFTUFTSyA9IDB4MGMyMztcbmV4cG9ydCBjb25zdCBHTF9DT01QQVJFX1JFRl9UT19URVhUVVJFID0gMHg4ODRlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBJTEVfU1RBVFVTID0gMHg4YjgxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBMRVRJT05fU1RBVFVTX0tIUiA9IDB4OTFiMTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1IxMV9FQUMgPSAweDkyNzA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SRzExX0VBQyA9IDB4OTI3MjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQl9BVENfV0VCR0wgPSAweDhjOTI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JfRVRDMV9XRUJHTCA9IDB4OGQ2NDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQl9QVlJUQ18yQlBQVjFfSU1HID0gMHg4YzAxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCX1BWUlRDXzRCUFBWMV9JTUcgPSAweDhjMDA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JfUzNUQ19EWFQxX0VYVCA9IDB4ODNmMDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQjhfRVRDMiA9IDB4OTI3NDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQjhfUFVOQ0hUSFJPVUdIX0FMUEhBMV9FVEMyID0gMHg5Mjc4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEwWDEwX0tIUiA9IDB4OTNiYjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMFg1X0tIUiA9IDB4OTNiODtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMFg2X0tIUiA9IDB4OTNiOTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMFg4X0tIUiA9IDB4OTNiYTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMlgxMF9LSFIgPSAweDkzYmM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfMTJYMTJfS0hSID0gMHg5M2JkO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzRYNF9LSFIgPSAweDkzYjA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfNVg0X0tIUiA9IDB4OTNiMTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ181WDVfS0hSID0gMHg5M2IyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzZYNV9LSFIgPSAweDkzYjM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfNlg2X0tIUiA9IDB4OTNiNDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ184WDVfS0hSID0gMHg5M2I1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzhYNl9LSFIgPSAweDkzYjY7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfOFg4X0tIUiA9IDB4OTNiNztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVRDX0VYUExJQ0lUX0FMUEhBX1dFQkdMID0gMHg4YzkyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BVENfSU5URVJQT0xBVEVEX0FMUEhBX1dFQkdMID0gMHg4N2VlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9QVlJUQ18yQlBQVjFfSU1HID0gMHg4YzAzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9QVlJUQ180QlBQVjFfSU1HID0gMHg4YzAyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDFfRVhUID0gMHg4M2YxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDNfRVhUID0gMHg4M2YyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDVfRVhUID0gMHg4M2YzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQThfRVRDMl9FQUMgPSAweDkyNzU7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TSUdORURfUjExX0VBQyA9IDB4OTI3MTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NJR05FRF9SRzExX0VBQyA9IDB4OTI3MztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQxX0VYVCA9IDB4OGM0ZDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQzX0VYVCA9IDB4OGM0ZTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQ1X0VYVCA9IDB4OGM0ZjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfUzNUQ19EWFQxX0VYVCA9IDB4OGM0YztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEwWDEwX0tIUiA9IDB4OTNkYjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEwWDVfS0hSID0gMHg5M2Q4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTBYNl9LSFIgPSAweDkzZDk7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ18xMFg4X0tIUiA9IDB4OTNkYTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEyWDEwX0tIUiA9IDB4OTNkYztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEyWDEyX0tIUiA9IDB4OTNkZDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzRYNF9LSFIgPSAweDkzZDA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ181WDRfS0hSID0gMHg5M2QxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfNVg1X0tIUiA9IDB4OTNkMjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzZYNV9LSFIgPSAweDkzZDM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ182WDZfS0hSID0gMHg5M2Q0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfOFg1X0tIUiA9IDB4OTNkNTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzhYNl9LSFIgPSAweDkzZDY7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ184WDhfS0hSID0gMHg5M2Q3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0VUQzJfRUFDID0gMHg5Mjc3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfRVRDMiA9IDB4OTI3NjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X1BVTkNIVEhST1VHSF9BTFBIQTFfRVRDMiA9IDB4OTI3OTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1RFWFRVUkVfRk9STUFUUyA9IDB4ODZhMztcbmV4cG9ydCBjb25zdCBHTF9DT05ESVRJT05fU0FUSVNGSUVEID0gMHg5MTFjO1xuZXhwb3J0IGNvbnN0IEdMX0NPTlNUQU5UX0FMUEhBID0gMHg4MDAzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTlNUQU5UX0NPTE9SID0gMHg4MDAxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTlRFWFRfTE9TVF9XRUJHTCA9IDB4OTI0MjtcbmV4cG9ydCBjb25zdCBHTF9DT1BZX1JFQURfQlVGRkVSID0gMHg4ZjM2O1xuZXhwb3J0IGNvbnN0IEdMX0NPUFlfUkVBRF9CVUZGRVJfQklORElORyA9IDB4OGYzNjtcbmV4cG9ydCBjb25zdCBHTF9DT1BZX1dSSVRFX0JVRkZFUiA9IDB4OGYzNztcbmV4cG9ydCBjb25zdCBHTF9DT1BZX1dSSVRFX0JVRkZFUl9CSU5ESU5HID0gMHg4ZjM3O1xuZXhwb3J0IGNvbnN0IEdMX0NVTExfRkFDRSA9IDB4MGI0NDtcbmV4cG9ydCBjb25zdCBHTF9DVUxMX0ZBQ0VfTU9ERSA9IDB4MGI0NTtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1BST0dSQU0gPSAweDhiOGQ7XG5leHBvcnQgY29uc3QgR0xfQ1VSUkVOVF9RVUVSWSA9IDB4ODg2NTtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1FVRVJZX0VYVCA9IDB4ODg2NTtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1ZFUlRFWF9BVFRSSUIgPSAweDg2MjY7XG5leHBvcnQgY29uc3QgR0xfQ1cgPSAweDA5MDA7XG5leHBvcnQgY29uc3QgR0xfREVDUiA9IDB4MWUwMztcbmV4cG9ydCBjb25zdCBHTF9ERUNSX1dSQVAgPSAweDg1MDg7XG5leHBvcnQgY29uc3QgR0xfREVMRVRFX1NUQVRVUyA9IDB4OGI4MDtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSCA9IDB4MTgwMTtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9BVFRBQ0hNRU5UID0gMHg4ZDAwO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0JJVFMgPSAweDBkNTY7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQlVGRkVSX0JJVCA9IDB4MDAwMDAxMDA7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ0xFQVJfVkFMVUUgPSAweDBiNzM7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ09NUE9ORU5UID0gMHgxOTAyO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0NPTVBPTkVOVDE2ID0gMHg4MWE1O1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0NPTVBPTkVOVDI0ID0gMHg4MWE2O1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0NPTVBPTkVOVDMyRiA9IDB4OGNhYztcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9GVU5DID0gMHgwYjc0O1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX1JBTkdFID0gMHgwYjcwO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX1NURU5DSUwgPSAweDg0Zjk7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfU1RFTkNJTF9BVFRBQ0hNRU5UID0gMHg4MjFhO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX1RFU1QgPSAweDBiNzE7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfV1JJVEVNQVNLID0gMHgwYjcyO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIMjRfU1RFTkNJTDggPSAweDg4ZjA7XG5leHBvcnQgY29uc3QgR0xfREVQVEgzMkZfU1RFTkNJTDggPSAweDhjYWQ7XG5leHBvcnQgY29uc3QgR0xfRElUSEVSID0gMHgwYmQwO1xuZXhwb3J0IGNvbnN0IEdMX0RPTlRfQ0FSRSA9IDB4MTEwMDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjAgPSAweDg4MjU7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIwX1dFQkdMID0gMHg4ODI1O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMSA9IDB4ODgyNjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjFfV0VCR0wgPSAweDg4MjY7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMCA9IDB4ODgyZjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEwX1dFQkdMID0gMHg4ODJmO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTEgPSAweDg4MzA7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMV9XRUJHTCA9IDB4ODgzMDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEyID0gMHg4ODMxO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTJfV0VCR0wgPSAweDg4MzE7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMyA9IDB4ODgzMjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEzX1dFQkdMID0gMHg4ODMyO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTQgPSAweDg4MzM7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxNF9XRUJHTCA9IDB4ODgzMztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjE1ID0gMHg4ODM0O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTVfV0VCR0wgPSAweDg4MzQ7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIyID0gMHg4ODI3O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMl9XRUJHTCA9IDB4ODgyNztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjMgPSAweDg4Mjg7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIzX1dFQkdMID0gMHg4ODI4O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNCA9IDB4ODgyOTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjRfV0VCR0wgPSAweDg4Mjk7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI1ID0gMHg4ODJhO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNV9XRUJHTCA9IDB4ODgyYTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjYgPSAweDg4MmI7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI2X1dFQkdMID0gMHg4ODJiO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNyA9IDB4ODgyYztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjdfV0VCR0wgPSAweDg4MmM7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI4ID0gMHg4ODJkO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSOF9XRUJHTCA9IDB4ODgyZDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjkgPSAweDg4MmU7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI5X1dFQkdMID0gMHg4ODJlO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfRlJBTUVCVUZGRVIgPSAweDhjYTk7XG5leHBvcnQgY29uc3QgR0xfRFJBV19GUkFNRUJVRkZFUl9CSU5ESU5HID0gMHg4Y2E2O1xuZXhwb3J0IGNvbnN0IEdMX0RTVF9BTFBIQSA9IDB4MDMwNDtcbmV4cG9ydCBjb25zdCBHTF9EU1RfQ09MT1IgPSAweDAzMDY7XG5leHBvcnQgY29uc3QgR0xfRFlOQU1JQ19DT1BZID0gMHg4OGVhO1xuZXhwb3J0IGNvbnN0IEdMX0RZTkFNSUNfRFJBVyA9IDB4ODhlODtcbmV4cG9ydCBjb25zdCBHTF9EWU5BTUlDX1JFQUQgPSAweDg4ZTk7XG5leHBvcnQgY29uc3QgR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIgPSAweDg4OTM7XG5leHBvcnQgY29uc3QgR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVJfQklORElORyA9IDB4ODg5NTtcbmV4cG9ydCBjb25zdCBHTF9FUVVBTCA9IDB4MDIwMjtcbmV4cG9ydCBjb25zdCBHTF9GQVNURVNUID0gMHgxMTAxO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUID0gMHgxNDA2O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUXzMyX1VOU0lHTkVEX0lOVF8yNF84X1JFViA9IDB4OGRhZDtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQyID0gMHg4YjVhO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDJYMyA9IDB4OGI2NTtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQyWDQgPSAweDhiNjY7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUMyA9IDB4OGI1YjtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQzWDIgPSAweDhiNjc7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUM1g0ID0gMHg4YjY4O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDQgPSAweDhiNWM7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUNFgyID0gMHg4YjY5O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDRYMyA9IDB4OGI2YTtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9WRUMyID0gMHg4YjUwO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX1ZFQzMgPSAweDhiNTE7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfVkVDNCA9IDB4OGI1MjtcbmV4cG9ydCBjb25zdCBHTF9GUkFHTUVOVF9TSEFERVIgPSAweDhiMzA7XG5leHBvcnQgY29uc3QgR0xfRlJBR01FTlRfU0hBREVSX0RFUklWQVRJVkVfSElOVCA9IDB4OGI4YjtcbmV4cG9ydCBjb25zdCBHTF9GUkFHTUVOVF9TSEFERVJfREVSSVZBVElWRV9ISU5UX09FUyA9IDB4OGI4YjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUiA9IDB4OGQ0MDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0FMUEhBX1NJWkUgPSAweDgyMTU7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9CTFVFX1NJWkUgPSAweDgyMTQ7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9DT0xPUl9FTkNPRElORyA9IDB4ODIxMDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0NPTE9SX0VOQ09ESU5HX0VYVCA9IDB4ODIxMDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0NPTVBPTkVOVF9UWVBFID0gMHg4MjExO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfQ09NUE9ORU5UX1RZUEVfRVhUID0gMHg4MjExO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfREVQVEhfU0laRSA9IDB4ODIxNjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0dSRUVOX1NJWkUgPSAweDgyMTM7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9PQkpFQ1RfTkFNRSA9IDB4OGNkMTtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX09CSkVDVF9UWVBFID0gMHg4Y2QwO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfUkVEX1NJWkUgPSAweDgyMTI7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9TVEVOQ0lMX1NJWkUgPSAweDgyMTc7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0NVQkVfTUFQX0ZBQ0UgPSAweDhjZDM7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0xBWUVSID0gMHg4Y2Q0O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfVEVYVFVSRV9MRVZFTCA9IDB4OGNkMjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9CSU5ESU5HID0gMHg4Y2E2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0NPTVBMRVRFID0gMHg4Y2Q1O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0RFRkFVTFQgPSAweDgyMTg7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfSU5DT01QTEVURV9BVFRBQ0hNRU5UID0gMHg4Y2Q2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfRElNRU5TSU9OUyA9IDB4OGNkOTtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX01JU1NJTkdfQVRUQUNITUVOVCA9IDB4OGNkNztcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX01VTFRJU0FNUExFID0gMHg4ZDU2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX1VOU1VQUE9SVEVEID0gMHg4Y2RkO1xuZXhwb3J0IGNvbnN0IEdMX0ZST05UID0gMHgwNDA0O1xuZXhwb3J0IGNvbnN0IEdMX0ZST05UX0FORF9CQUNLID0gMHgwNDA4O1xuZXhwb3J0IGNvbnN0IEdMX0ZST05UX0ZBQ0UgPSAweDBiNDY7XG5leHBvcnQgY29uc3QgR0xfRlVOQ19BREQgPSAweDgwMDY7XG5leHBvcnQgY29uc3QgR0xfRlVOQ19SRVZFUlNFX1NVQlRSQUNUID0gMHg4MDBiO1xuZXhwb3J0IGNvbnN0IEdMX0ZVTkNfU1VCU1RSQUNUID0gMHg4MDBhO1xuZXhwb3J0IGNvbnN0IEdMX0dFTkVSQVRFX01JUE1BUF9ISU5UID0gMHg4MTkyO1xuZXhwb3J0IGNvbnN0IEdMX0dFUVVBTCA9IDB4MDIwNjtcbmV4cG9ydCBjb25zdCBHTF9HUFVfRElTSk9JTlRfRVhUID0gMHg4ZmJiO1xuZXhwb3J0IGNvbnN0IEdMX0dSRUFURVIgPSAweDAyMDQ7XG5leHBvcnQgY29uc3QgR0xfR1JFRU5fQklUUyA9IDB4MGQ1MztcbmV4cG9ydCBjb25zdCBHTF9IQUxGX0ZMT0FUID0gMHgxNDBiO1xuZXhwb3J0IGNvbnN0IEdMX0hBTEZfRkxPQVRfT0VTID0gMHg4ZDYxO1xuZXhwb3J0IGNvbnN0IEdMX0hJR0hfRkxPQVQgPSAweDhkZjI7XG5leHBvcnQgY29uc3QgR0xfSElHSF9JTlQgPSAweDhkZjU7XG5leHBvcnQgY29uc3QgR0xfSU1QTEVNRU5UQVRJT05fQ09MT1JfUkVBRF9GT1JNQVQgPSAweDhiOWI7XG5leHBvcnQgY29uc3QgR0xfSU1QTEVNRU5UQVRJT05fQ09MT1JfUkVBRF9UWVBFID0gMHg4YjlhO1xuZXhwb3J0IGNvbnN0IEdMX0lOQ1IgPSAweDFlMDI7XG5leHBvcnQgY29uc3QgR0xfSU5DUl9XUkFQID0gMHg4NTA3O1xuZXhwb3J0IGNvbnN0IEdMX0lOVCA9IDB4MTQwNDtcbmV4cG9ydCBjb25zdCBHTF9JTlRfMl8xMF8xMF8xMF9SRVYgPSAweDhkOWY7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfMkQgPSAweDhkY2E7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfMkRfQVJSQVkgPSAweDhkY2Y7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfM0QgPSAweDhkY2I7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfQ1VCRSA9IDB4OGRjYztcbmV4cG9ydCBjb25zdCBHTF9JTlRfVkVDMiA9IDB4OGI1MztcbmV4cG9ydCBjb25zdCBHTF9JTlRfVkVDMyA9IDB4OGI1NDtcbmV4cG9ydCBjb25zdCBHTF9JTlRfVkVDNCA9IDB4OGI1NTtcbmV4cG9ydCBjb25zdCBHTF9JTlRFUkxFQVZFRF9BVFRSSUJTID0gMHg4YzhjO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfRU5VTSA9IDB4MDUwMDtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX0ZSQU1FQlVGRkVSX09QRVJBVElPTiA9IDB4MDUwNjtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX0lOREVYID0gMHhmZmZmZmZmZjtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX09QRVJBVElPTiA9IDB4MDUwMjtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX1ZBTFVFID0gMHgwNTAxO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkVSVCA9IDB4MTUwYTtcbmV4cG9ydCBjb25zdCBHTF9LRUVQID0gMHgxZTAwO1xuZXhwb3J0IGNvbnN0IEdMX0xFUVVBTCA9IDB4MDIwMztcbmV4cG9ydCBjb25zdCBHTF9MRVNTID0gMHgwMjAxO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVfTE9PUCA9IDB4MDAwMjtcbmV4cG9ydCBjb25zdCBHTF9MSU5FX1NUUklQID0gMHgwMDAzO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVfV0lEVEggPSAweDBiMjE7XG5leHBvcnQgY29uc3QgR0xfTElORUFSID0gMHgyNjAxO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVBUl9NSVBNQVBfTElORUFSID0gMHgyNzAzO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVBUl9NSVBNQVBfTkVBUkVTVCA9IDB4MjcwMTtcbmV4cG9ydCBjb25zdCBHTF9MSU5FUyA9IDB4MDAwMTtcbmV4cG9ydCBjb25zdCBHTF9MSU5LX1NUQVRVUyA9IDB4OGI4MjtcbmV4cG9ydCBjb25zdCBHTF9MT1dfRkxPQVQgPSAweDhkZjA7XG5leHBvcnQgY29uc3QgR0xfTE9XX0lOVCA9IDB4OGRmMztcbmV4cG9ydCBjb25zdCBHTF9MVU1JTkFOQ0UgPSAweDE5MDk7XG5leHBvcnQgY29uc3QgR0xfTFVNSU5BTkNFX0FMUEhBID0gMHgxOTBhO1xuZXhwb3J0IGNvbnN0IEdMX01BWCA9IDB4ODAwODtcbmV4cG9ydCBjb25zdCBHTF9NQVhfM0RfVEVYVFVSRV9TSVpFID0gMHg4MDczO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9BUlJBWV9URVhUVVJFX0xBWUVSUyA9IDB4ODhmZjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ0xJRU5UX1dBSVRfVElNRU9VVF9XRUJHTCA9IDB4OTI0NztcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ09MT1JfQVRUQUNITUVOVFMgPSAweDhjZGY7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTE9SX0FUVEFDSE1FTlRTX1dFQkdMID0gMHg4Y2RmO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DT01CSU5FRF9GUkFHTUVOVF9VTklGT1JNX0NPTVBPTkVOVFMgPSAweDhhMzM7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTUJJTkVEX1RFWFRVUkVfSU1BR0VfVU5JVFMgPSAweDhiNGQ7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTUJJTkVEX1VOSUZPUk1fQkxPQ0tTID0gMHg4YTJlO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DT01CSU5FRF9WRVJURVhfVU5JRk9STV9DT01QT05FTlRTID0gMHg4YTMxO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DVUJFX01BUF9URVhUVVJFX1NJWkUgPSAweDg1MWM7XG5leHBvcnQgY29uc3QgR0xfTUFYX0RSQVdfQlVGRkVSUyA9IDB4ODgyNDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfRFJBV19CVUZGRVJTX1dFQkdMID0gMHg4ODI0O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FTEVNRU5UX0lOREVYID0gMHg4ZDZiO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FTEVNRU5UU19JTkRJQ0VTID0gMHg4MGU5O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FTEVNRU5UU19WRVJUSUNFUyA9IDB4ODBlODtcbmV4cG9ydCBjb25zdCBHTF9NQVhfRVhUID0gMHg4MDA4O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9JTlBVVF9DT01QT05FTlRTID0gMHg5MTI1O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9VTklGT1JNX0JMT0NLUyA9IDB4OGEyZDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfRlJBR01FTlRfVU5JRk9STV9DT01QT05FTlRTID0gMHg4YjQ5O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9VTklGT1JNX1ZFQ1RPUlMgPSAweDhkZmQ7XG5leHBvcnQgY29uc3QgR0xfTUFYX1BST0dSQU1fVEVYRUxfT0ZGU0VUID0gMHg4OTA1O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9SRU5ERVJCVUZGRVJfU0laRSA9IDB4ODRlODtcbmV4cG9ydCBjb25zdCBHTF9NQVhfU0FNUExFUyA9IDB4OGQ1NztcbmV4cG9ydCBjb25zdCBHTF9NQVhfU0VSVkVSX1dBSVRfVElNRU9VVCA9IDB4OTExMTtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9JTUFHRV9VTklUUyA9IDB4ODg3MjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9MT0RfQklBUyA9IDB4ODRmZDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9NQVhfQU5JU09UUk9QWV9FWFQgPSAweDg0ZmY7XG5leHBvcnQgY29uc3QgR0xfTUFYX1RFWFRVUkVfU0laRSA9IDB4MGQzMztcbmV4cG9ydCBjb25zdCBHTF9NQVhfVFJBTlNGT1JNX0ZFRURCQUNLX0lOVEVSTEVBVkVEX0NPTVBPTkVOVFMgPSAweDhjOGE7XG5leHBvcnQgY29uc3QgR0xfTUFYX1RSQU5TRk9STV9GRUVEQkFDS19TRVBBUkFURV9BVFRSSUJTID0gMHg4YzhiO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9UUkFOU0ZPUk1fRkVFREJBQ0tfU0VQQVJBVEVfQ09NUE9ORU5UUyA9IDB4OGM4MDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVU5JRk9STV9CTE9DS19TSVpFID0gMHg4YTMwO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9VTklGT1JNX0JVRkZFUl9CSU5ESU5HUyA9IDB4OGEyZjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkFSWUlOR19DT01QT05FTlRTID0gMHg4YjRiO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WQVJZSU5HX1ZFQ1RPUlMgPSAweDhkZmM7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9BVFRSSUJTID0gMHg4ODY5O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WRVJURVhfT1VUUFVUX0NPTVBPTkVOVFMgPSAweDkxMjI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9URVhUVVJFX0lNQUdFX1VOSVRTID0gMHg4YjRjO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WRVJURVhfVU5JRk9STV9CTE9DS1MgPSAweDhhMmI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9VTklGT1JNX0NPTVBPTkVOVFMgPSAweDhiNGE7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9VTklGT1JNX1ZFQ1RPUlMgPSAweDhkZmI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZJRVdQT1JUX0RJTVMgPSAweDBkM2E7XG5leHBvcnQgY29uc3QgR0xfTUVESVVNX0ZMT0FUID0gMHg4ZGYxO1xuZXhwb3J0IGNvbnN0IEdMX01FRElVTV9JTlQgPSAweDhkZjQ7XG5leHBvcnQgY29uc3QgR0xfTUlOID0gMHg4MDA3O1xuZXhwb3J0IGNvbnN0IEdMX01JTl9FWFQgPSAweDgwMDc7XG5leHBvcnQgY29uc3QgR0xfTUlOX1BST0dSQU1fVEVYRUxfT0ZGU0VUID0gMHg4OTA0O1xuZXhwb3J0IGNvbnN0IEdMX01JUlJPUkVEX1JFUEVBVCA9IDB4ODM3MDtcbmV4cG9ydCBjb25zdCBHTF9ORUFSRVNUID0gMHgyNjAwO1xuZXhwb3J0IGNvbnN0IEdMX05FQVJFU1RfTUlQTUFQX0xJTkVBUiA9IDB4MjcwMjtcbmV4cG9ydCBjb25zdCBHTF9ORUFSRVNUX01JUE1BUF9ORUFSRVNUID0gMHgyNzAwO1xuZXhwb3J0IGNvbnN0IEdMX05FVkVSID0gMHgwMjAwO1xuZXhwb3J0IGNvbnN0IEdMX05JQ0VTVCA9IDB4MTEwMjtcbmV4cG9ydCBjb25zdCBHTF9OT19FUlJPUiA9IDA7XG5leHBvcnQgY29uc3QgR0xfTk9ORSA9IDA7XG5leHBvcnQgY29uc3QgR0xfTk9URVFVQUwgPSAweDAyMDU7XG5leHBvcnQgY29uc3QgR0xfT0JKRUNUX1RZUEUgPSAweDkxMTI7XG5leHBvcnQgY29uc3QgR0xfT05FID0gMTtcbmV4cG9ydCBjb25zdCBHTF9PTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEEgPSAweDgwMDQ7XG5leHBvcnQgY29uc3QgR0xfT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SID0gMHg4MDAyO1xuZXhwb3J0IGNvbnN0IEdMX09ORV9NSU5VU19EU1RfQUxQSEEgPSAweDAzMDU7XG5leHBvcnQgY29uc3QgR0xfT05FX01JTlVTX0RTVF9DT0xPUiA9IDB4MDMwNztcbmV4cG9ydCBjb25zdCBHTF9PTkVfTUlOVVNfU1JDX0FMUEhBID0gMHgwMzAzO1xuZXhwb3J0IGNvbnN0IEdMX09ORV9NSU5VU19TUkNfQ09MT1IgPSAweDAzMDE7XG5leHBvcnQgY29uc3QgR0xfT1VUX09GX01FTU9SWSA9IDB4MDUwNTtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX0FMSUdOTUVOVCA9IDB4MGQwNTtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX1JPV19MRU5HVEggPSAweDBkMDI7XG5leHBvcnQgY29uc3QgR0xfUEFDS19TS0lQX1BJWEVMUyA9IDB4MGQwNDtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX1NLSVBfUk9XUyA9IDB4MGQwMztcbmV4cG9ydCBjb25zdCBHTF9QSVhFTF9QQUNLX0JVRkZFUiA9IDB4ODhlYjtcbmV4cG9ydCBjb25zdCBHTF9QSVhFTF9QQUNLX0JVRkZFUl9CSU5ESU5HID0gMHg4OGVkO1xuZXhwb3J0IGNvbnN0IEdMX1BJWEVMX1VOUEFDS19CVUZGRVIgPSAweDg4ZWM7XG5leHBvcnQgY29uc3QgR0xfUElYRUxfVU5QQUNLX0JVRkZFUl9CSU5ESU5HID0gMHg4OGVmO1xuZXhwb3J0IGNvbnN0IEdMX1BPSU5UUyA9IDB4MDAwMDtcbmV4cG9ydCBjb25zdCBHTF9QT0xZR09OX09GRlNFVF9GQUNUT1IgPSAweDgwMzg7XG5leHBvcnQgY29uc3QgR0xfUE9MWUdPTl9PRkZTRVRfRklMTCA9IDB4ODAzNztcbmV4cG9ydCBjb25zdCBHTF9QT0xZR09OX09GRlNFVF9VTklUUyA9IDB4MmEwMDtcbmV4cG9ydCBjb25zdCBHTF9RVUVSWV9DT1VOVEVSX0JJVFNfRVhUID0gMHg4ODY0O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVCA9IDB4ODg2NjtcbmV4cG9ydCBjb25zdCBHTF9RVUVSWV9SRVNVTFRfQVZBSUxBQkxFID0gMHg4ODY3O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVF9BVkFJTEFCTEVfRVhUID0gMHg4ODY3O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVF9FWFQgPSAweDg4NjY7XG5leHBvcnQgY29uc3QgR0xfUjExRl9HMTFGX0IxMEYgPSAweDhjM2E7XG5leHBvcnQgY29uc3QgR0xfUjE2RiA9IDB4ODIyZDtcbmV4cG9ydCBjb25zdCBHTF9SMTZJID0gMHg4MjMzO1xuZXhwb3J0IGNvbnN0IEdMX1IxNlVJID0gMHg4MjM0O1xuZXhwb3J0IGNvbnN0IEdMX1IzMkYgPSAweDgyMmU7XG5leHBvcnQgY29uc3QgR0xfUjMySSA9IDB4ODIzNTtcbmV4cG9ydCBjb25zdCBHTF9SMzJVSSA9IDB4ODIzNjtcbmV4cG9ydCBjb25zdCBHTF9SOCA9IDB4ODIyOTtcbmV4cG9ydCBjb25zdCBHTF9SOF9TTk9STSA9IDB4OGY5NDtcbmV4cG9ydCBjb25zdCBHTF9SOEkgPSAweDgyMzE7XG5leHBvcnQgY29uc3QgR0xfUjhVSSA9IDB4ODIzMjtcbmV4cG9ydCBjb25zdCBHTF9SQVNURVJJWkVSX0RJU0NBUkQgPSAweDhjODk7XG5leHBvcnQgY29uc3QgR0xfUkVBRF9CVUZGRVIgPSAweDBjMDI7XG5leHBvcnQgY29uc3QgR0xfUkVBRF9GUkFNRUJVRkZFUiA9IDB4OGNhODtcbmV4cG9ydCBjb25zdCBHTF9SRUFEX0ZSQU1FQlVGRkVSX0JJTkRJTkcgPSAweDhjYWE7XG5leHBvcnQgY29uc3QgR0xfUkVEID0gMHgxOTAzO1xuZXhwb3J0IGNvbnN0IEdMX1JFRF9CSVRTID0gMHgwZDUyO1xuZXhwb3J0IGNvbnN0IEdMX1JFRF9JTlRFR0VSID0gMHg4ZDk0O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUiA9IDB4OGQ0MTtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfQUxQSEFfU0laRSA9IDB4OGQ1MztcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfQklORElORyA9IDB4OGNhNztcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfQkxVRV9TSVpFID0gMHg4ZDUyO1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9ERVBUSF9TSVpFID0gMHg4ZDU0O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9HUkVFTl9TSVpFID0gMHg4ZDUxO1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9IRUlHSFQgPSAweDhkNDM7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX0lOVEVSTkFMX0ZPUk1BVCA9IDB4OGQ0NDtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfUkVEX1NJWkUgPSAweDhkNTA7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX1NBTVBMRVMgPSAweDhjYWI7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX1NURU5DSUxfU0laRSA9IDB4OGQ1NTtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfV0lEVEggPSAweDhkNDI7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSRVIgPSAweDFmMDE7XG5leHBvcnQgY29uc3QgR0xfUkVQRUFUID0gMHgyOTAxO1xuZXhwb3J0IGNvbnN0IEdMX1JFUExBQ0UgPSAweDFlMDE7XG5leHBvcnQgY29uc3QgR0xfUkcgPSAweDgyMjc7XG5leHBvcnQgY29uc3QgR0xfUkdfSU5URUdFUiA9IDB4ODIyODtcbmV4cG9ydCBjb25zdCBHTF9SRzE2RiA9IDB4ODIyZjtcbmV4cG9ydCBjb25zdCBHTF9SRzE2SSA9IDB4ODIzOTtcbmV4cG9ydCBjb25zdCBHTF9SRzE2VUkgPSAweDgyM2E7XG5leHBvcnQgY29uc3QgR0xfUkczMkYgPSAweDgyMzA7XG5leHBvcnQgY29uc3QgR0xfUkczMkkgPSAweDgyM2I7XG5leHBvcnQgY29uc3QgR0xfUkczMlVJID0gMHg4MjNjO1xuZXhwb3J0IGNvbnN0IEdMX1JHOCA9IDB4ODIyYjtcbmV4cG9ydCBjb25zdCBHTF9SRzhfU05PUk0gPSAweDhmOTU7XG5leHBvcnQgY29uc3QgR0xfUkc4SSA9IDB4ODIzNztcbmV4cG9ydCBjb25zdCBHTF9SRzhVSSA9IDB4ODIzODtcbmV4cG9ydCBjb25zdCBHTF9SR0IgPSAweDE5MDc7XG5leHBvcnQgY29uc3QgR0xfUkdCX0lOVEVHRVIgPSAweDhkOTg7XG5leHBvcnQgY29uc3QgR0xfUkdCMTBfQTIgPSAweDgwNTk7XG5leHBvcnQgY29uc3QgR0xfUkdCMTBfQTJVSSA9IDB4OTA2ZjtcbmV4cG9ydCBjb25zdCBHTF9SR0IxNkYgPSAweDg4MWI7XG5leHBvcnQgY29uc3QgR0xfUkdCMTZJID0gMHg4ZDg5O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjE2VUkgPSAweDhkNzc7XG5leHBvcnQgY29uc3QgR0xfUkdCMzJGID0gMHg4ODE1O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjMyRl9FWFQgPSAweDg4MTU7XG5leHBvcnQgY29uc3QgR0xfUkdCMzJJID0gMHg4ZDgzO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjMyVUkgPSAweDhkNzE7XG5leHBvcnQgY29uc3QgR0xfUkdCNV9BMSA9IDB4ODA1NztcbmV4cG9ydCBjb25zdCBHTF9SR0I1NjUgPSAweDhkNjI7XG5leHBvcnQgY29uc3QgR0xfUkdCOCA9IDB4ODA1MTtcbmV4cG9ydCBjb25zdCBHTF9SR0I4X1NOT1JNID0gMHg4Zjk2O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjhJID0gMHg4ZDhmO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjhVSSA9IDB4OGQ3ZDtcbmV4cG9ydCBjb25zdCBHTF9SR0I5X0U1ID0gMHg4YzNkO1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEgPSAweDE5MDg7XG5leHBvcnQgY29uc3QgR0xfUkdCQV9JTlRFR0VSID0gMHg4ZDk5O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkExNkYgPSAweDg4MWE7XG5leHBvcnQgY29uc3QgR0xfUkdCQTE2SSA9IDB4OGQ4ODtcbmV4cG9ydCBjb25zdCBHTF9SR0JBMTZVSSA9IDB4OGQ3NjtcbmV4cG9ydCBjb25zdCBHTF9SR0JBMzJGID0gMHg4ODE0O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEzMkZfRVhUID0gMHg4ODE0O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEzMkkgPSAweDhkODI7XG5leHBvcnQgY29uc3QgR0xfUkdCQTMyVUkgPSAweDhkNzA7XG5leHBvcnQgY29uc3QgR0xfUkdCQTQgPSAweDgwNTY7XG5leHBvcnQgY29uc3QgR0xfUkdCQTggPSAweDgwNTg7XG5leHBvcnQgY29uc3QgR0xfUkdCQThfU05PUk0gPSAweDhmOTc7XG5leHBvcnQgY29uc3QgR0xfUkdCQThJID0gMHg4ZDhlO1xuZXhwb3J0IGNvbnN0IEdMX1JHQkE4VUkgPSAweDhkN2M7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFX0FMUEhBX1RPX0NPVkVSQUdFID0gMHg4MDllO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9CVUZGRVJTID0gMHg4MGE4O1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9DT1ZFUkFHRSA9IDB4ODBhMDtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVfQ09WRVJBR0VfSU5WRVJUID0gMHg4MGFiO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9DT1ZFUkFHRV9WQUxVRSA9IDB4ODBhYTtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSXzJEID0gMHg4YjVlO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRVJfMkRfQVJSQVkgPSAweDhkYzE7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8yRF9BUlJBWV9TSEFET1cgPSAweDhkYzQ7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8yRF9TSEFET1cgPSAweDhiNjI7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8zRCA9IDB4OGI1ZjtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSX0JJTkRJTkcgPSAweDg5MTk7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl9DVUJFID0gMHg4YjYwO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRVJfQ1VCRV9TSEFET1cgPSAweDhkYzU7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUyA9IDB4ODBhOTtcbmV4cG9ydCBjb25zdCBHTF9TQ0lTU09SX0JPWCA9IDB4MGMxMDtcbmV4cG9ydCBjb25zdCBHTF9TQ0lTU09SX1RFU1QgPSAweDBjMTE7XG5leHBvcnQgY29uc3QgR0xfU0VQQVJBVEVfQVRUUklCUyA9IDB4OGM4ZDtcbmV4cG9ydCBjb25zdCBHTF9TSEFERVJfVFlQRSA9IDB4OGI0ZjtcbmV4cG9ydCBjb25zdCBHTF9TSEFESU5HX0xBTkdVQUdFX1ZFUlNJT04gPSAweDhiOGM7XG5leHBvcnQgY29uc3QgR0xfU0hPUlQgPSAweDE0MDI7XG5leHBvcnQgY29uc3QgR0xfU0lHTkFMRUQgPSAweDkxMTk7XG5leHBvcnQgY29uc3QgR0xfU0lHTkVEX05PUk1BTElaRUQgPSAweDhmOWM7XG5leHBvcnQgY29uc3QgR0xfU1JDX0FMUEhBID0gMHgwMzAyO1xuZXhwb3J0IGNvbnN0IEdMX1NSQ19BTFBIQV9TQVRVUkFURSA9IDB4MDMwODtcbmV4cG9ydCBjb25zdCBHTF9TUkNfQ09MT1IgPSAweDAzMDA7XG5leHBvcnQgY29uc3QgR0xfU1JHQiA9IDB4OGM0MDtcbmV4cG9ydCBjb25zdCBHTF9TUkdCX0FMUEhBX0VYVCA9IDB4OGM0MjtcbmV4cG9ydCBjb25zdCBHTF9TUkdCX0VYVCA9IDB4OGM0MDtcbmV4cG9ydCBjb25zdCBHTF9TUkdCOCA9IDB4OGM0MTtcbmV4cG9ydCBjb25zdCBHTF9TUkdCOF9BTFBIQTggPSAweDhjNDM7XG5leHBvcnQgY29uc3QgR0xfU1JHQjhfQUxQSEE4X0VYVCA9IDB4OGM0MztcbmV4cG9ydCBjb25zdCBHTF9TVEFUSUNfQ09QWSA9IDB4ODhlNjtcbmV4cG9ydCBjb25zdCBHTF9TVEFUSUNfRFJBVyA9IDB4ODhlNDtcbmV4cG9ydCBjb25zdCBHTF9TVEFUSUNfUkVBRCA9IDB4ODhlNTtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMID0gMHgxODAyO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQVRUQUNITUVOVCA9IDB4OGQyMDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfRkFJTCA9IDB4ODgwMTtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfRlVOQyA9IDB4ODgwMDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfUEFTU19ERVBUSF9GQUlMID0gMHg4ODAyO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19QQVNTX0RFUFRIX1BBU1MgPSAweDg4MDM7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9CQUNLX1JFRiA9IDB4OGNhMztcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfVkFMVUVfTUFTSyA9IDB4OGNhNDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfV1JJVEVNQVNLID0gMHg4Y2E1O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQklUUyA9IDB4MGQ1NztcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JVRkZFUl9CSVQgPSAweDAwMDAwNDAwO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQ0xFQVJfVkFMVUUgPSAweDBiOTE7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9GQUlMID0gMHgwYjk0O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfRlVOQyA9IDB4MGI5MjtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0lOREVYID0gMHgxOTAxO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfSU5ERVg4ID0gMHg4ZDQ4O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfUEFTU19ERVBUSF9GQUlMID0gMHgwYjk1O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfUEFTU19ERVBUSF9QQVNTID0gMHgwYjk2O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfUkVGID0gMHgwYjk3O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfVEVTVCA9IDB4MGI5MDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX1ZBTFVFX01BU0sgPSAweDBiOTM7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9XUklURU1BU0sgPSAweDBiOTg7XG5leHBvcnQgY29uc3QgR0xfU1RSRUFNX0NPUFkgPSAweDg4ZTI7XG5leHBvcnQgY29uc3QgR0xfU1RSRUFNX0RSQVcgPSAweDg4ZTA7XG5leHBvcnQgY29uc3QgR0xfU1RSRUFNX1JFQUQgPSAweDg4ZTE7XG5leHBvcnQgY29uc3QgR0xfU1VCUElYRUxfQklUUyA9IDB4MGQ1MDtcbmV4cG9ydCBjb25zdCBHTF9TWU5DX0NPTkRJVElPTiA9IDB4OTExMztcbmV4cG9ydCBjb25zdCBHTF9TWU5DX0ZFTkNFID0gMHg5MTE2O1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfRkxBR1MgPSAweDkxMTU7XG5leHBvcnQgY29uc3QgR0xfU1lOQ19GTFVTSF9DT01NQU5EU19CSVQgPSAweDAwMDAwMDAxO1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfR1BVX0NPTU1BTkRTX0NPTVBMRVRFID0gMHg5MTE3O1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfU1RBVFVTID0gMHg5MTE0O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUgPSAweDE3MDI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV8yRCA9IDB4MGRlMTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFXzJEX0FSUkFZID0gMHg4YzFhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfM0QgPSAweDgwNmY7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9CQVNFX0xFVkVMID0gMHg4MTNjO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQklORElOR18yRCA9IDB4ODA2OTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0JJTkRJTkdfMkRfQVJSQVkgPSAweDhjMWQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9CSU5ESU5HXzNEID0gMHg4MDZhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQklORElOR19DVUJFX01BUCA9IDB4ODUxNDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NPTVBBUkVfRlVOQyA9IDB4ODg0ZDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NPTVBBUkVfTU9ERSA9IDB4ODg0YztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQID0gMHg4NTEzO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWCA9IDB4ODUxNjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1kgPSAweDg1MTg7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9aID0gMHg4NTFhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWCA9IDB4ODUxNTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1kgPSAweDg1MTc7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9aID0gMHg4NTE5O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfSU1NVVRBQkxFX0ZPUk1BVCA9IDB4OTEyZjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0lNTVVUQUJMRV9MRVZFTFMgPSAweDgyZGY7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NQUdfRklMVEVSID0gMHgyODAwO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUFYX0FOSVNPVFJPUFlfRVhUID0gMHg4NGZlO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUFYX0xFVkVMID0gMHg4MTNkO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUFYX0xPRCA9IDB4ODEzYjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX01JTl9GSUxURVIgPSAweDI4MDE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NSU5fTE9EID0gMHg4MTNhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfV1JBUF9SID0gMHg4MDcyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfV1JBUF9TID0gMHgyODAyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfV1JBUF9UID0gMHgyODAzO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUwID0gMHg4NGMwO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxID0gMHg4NGMxO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxMCA9IDB4ODRjYTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTEgPSAweDg0Y2I7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTEyID0gMHg4NGNjO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxMyA9IDB4ODRjZDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTQgPSAweDg0Y2U7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTE1ID0gMHg4NGNmO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxNiA9IDB4ODRkMDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTcgPSAweDg0ZDE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTE4ID0gMHg4NGQyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxOSA9IDB4ODRkMztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMiA9IDB4ODRjMjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjAgPSAweDg0ZDQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTIxID0gMHg4NGQ1O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyMiA9IDB4ODRkNjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjMgPSAweDg0ZDc7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTI0ID0gMHg4NGQ4O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyNSA9IDB4ODRkOTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjYgPSAweDg0ZGE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTI3ID0gMHg4NGRiO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyOCA9IDB4ODRkYztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjkgPSAweDg0ZGQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTMgPSAweDg0YzM7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTMwID0gMHg4NGRlO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUzMSA9IDB4ODRkZjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNCA9IDB4ODRjNDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNSA9IDB4ODRjNTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNiA9IDB4ODRjNjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNyA9IDB4ODRjNztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFOCA9IDB4ODRjODtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFOSA9IDB4ODRjOTtcbmV4cG9ydCBjb25zdCBHTF9USU1FX0VMQVBTRURfRVhUID0gMHg4OGJmO1xuZXhwb3J0IGNvbnN0IEdMX1RJTUVPVVRfRVhQSVJFRCA9IDB4OTExYjtcbmV4cG9ydCBjb25zdCBHTF9USU1FT1VUX0lHTk9SRUQgPSAtMTtcbmV4cG9ydCBjb25zdCBHTF9USU1FU1RBTVBfRVhUID0gMHg4ZTI4O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDSyA9IDB4OGUyMjtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfQUNUSVZFID0gMHg4ZTI0O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CSU5ESU5HID0gMHg4ZTI1O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CVUZGRVIgPSAweDhjOGU7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUl9CSU5ESU5HID0gMHg4YzhmO1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CVUZGRVJfTU9ERSA9IDB4OGM3ZjtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfQlVGRkVSX1NJWkUgPSAweDhjODU7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUl9TVEFSVCA9IDB4OGM4NDtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfUEFVU0VEID0gMHg4ZTIzO1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19QUklNSVRJVkVTX1dSSVRURU4gPSAweDhjODg7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX1ZBUllJTkdTID0gMHg4YzgzO1xuZXhwb3J0IGNvbnN0IEdMX1RSSUFOR0xFX0ZBTiA9IDB4MDAwNjtcbmV4cG9ydCBjb25zdCBHTF9UUklBTkdMRV9TVFJJUCA9IDB4MDAwNTtcbmV4cG9ydCBjb25zdCBHTF9UUklBTkdMRVMgPSAweDAwMDQ7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9BUlJBWV9TVFJJREUgPSAweDhhM2M7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19BQ1RJVkVfVU5JRk9STV9JTkRJQ0VTID0gMHg4YTQzO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfQUNUSVZFX1VOSUZPUk1TID0gMHg4YTQyO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfQklORElORyA9IDB4OGEzZjtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JMT0NLX0RBVEFfU0laRSA9IDB4OGE0MDtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JMT0NLX0lOREVYID0gMHg4YTNhO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfUkVGRVJFTkNFRF9CWV9GUkFHTUVOVF9TSEFERVIgPSAweDhhNDY7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19SRUZFUkVOQ0VEX0JZX1ZFUlRFWF9TSEFERVIgPSAweDhhNDQ7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVIgPSAweDhhMTE7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVJfQklORElORyA9IDB4OGEyODtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JVRkZFUl9PRkZTRVRfQUxJR05NRU5UID0gMHg4YTM0O1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQlVGRkVSX1NJWkUgPSAweDhhMmE7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVJfU1RBUlQgPSAweDhhMjk7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9JU19ST1dfTUFKT1IgPSAweDhhM2U7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9NQVRSSVhfU1RSSURFID0gMHg4YTNkO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fT0ZGU0VUID0gMHg4YTNiO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fU0laRSA9IDB4OGEzODtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX1RZUEUgPSAweDhhMzc7XG5leHBvcnQgY29uc3QgR0xfVU5NQVNLRURfUkVOREVSRVJfV0VCR0wgPSAweDkyNDY7XG5leHBvcnQgY29uc3QgR0xfVU5NQVNLRURfVkVORE9SX1dFQkdMID0gMHg5MjQ1O1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19BTElHTk1FTlQgPSAweDBjZjU7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX0NPTE9SU1BBQ0VfQ09OVkVSU0lPTl9XRUJHTCA9IDB4OTI0MztcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfRkxJUF9ZX1dFQkdMID0gMHg5MjQwO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19JTUFHRV9IRUlHSFQgPSAweDgwNmU7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX1BSRU1VTFRJUExZX0FMUEhBX1dFQkdMID0gMHg5MjQxO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19ST1dfTEVOR1RIID0gMHgwY2YyO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19TS0lQX0lNQUdFUyA9IDB4ODA2ZDtcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfU0tJUF9QSVhFTFMgPSAweDBjZjQ7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX1NLSVBfUk9XUyA9IDB4MGNmMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05BTEVEID0gMHg5MTE4O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0JZVEUgPSAweDE0MDE7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UID0gMHgxNDA1O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF8xMEZfMTFGXzExRl9SRVYgPSAweDhjM2I7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzJfMTBfMTBfMTBfUkVWID0gMHg4MzY4O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF8yNF84ID0gMHg4NGZhO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF8yNF84X1dFQkdMID0gMHg4NGZhO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF81XzlfOV85X1JFViA9IDB4OGMzZTtcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl8yRCA9IDB4OGRkMjtcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRkNztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl8zRCA9IDB4OGRkMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl9DVUJFID0gMHg4ZGQ0O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9WRUMyID0gMHg4ZGM2O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9WRUMzID0gMHg4ZGM3O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9WRUM0ID0gMHg4ZGM4O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX05PUk1BTElaRUQgPSAweDhjMTc7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfTk9STUFMSVpFRF9FWFQgPSAweDhjMTc7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfU0hPUlQgPSAweDE0MDM7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfU0hPUlRfNF80XzRfNCA9IDB4ODAzMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9TSE9SVF81XzVfNV8xID0gMHg4MDM0O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX1NIT1JUXzVfNl81ID0gMHg4MzYzO1xuZXhwb3J0IGNvbnN0IEdMX1ZBTElEQVRFX1NUQVRVUyA9IDB4OGI4MztcbmV4cG9ydCBjb25zdCBHTF9WRU5ET1IgPSAweDFmMDA7XG5leHBvcnQgY29uc3QgR0xfVkVSU0lPTiA9IDB4MWYwMjtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVJSQVlfQklORElORyA9IDB4ODViNTtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVJSQVlfQklORElOR19PRVMgPSAweDg1YjU7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9CVUZGRVJfQklORElORyA9IDB4ODg5ZjtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX0RJVklTT1IgPSAweDg4ZmU7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9ESVZJU09SX0FOR0xFID0gMHg4OGZlO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfRU5BQkxFRCA9IDB4ODYyMjtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX0lOVEVHRVIgPSAweDg4ZmQ7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9OT1JNQUxJWkVEID0gMHg4ODZhO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfUE9JTlRFUiA9IDB4ODY0NTtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX1NJWkUgPSAweDg2MjM7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9TVFJJREUgPSAweDg2MjQ7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9UWVBFID0gMHg4NjI1O1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9TSEFERVIgPSAweDhiMzE7XG5leHBvcnQgY29uc3QgR0xfVklFV1BPUlQgPSAweDBiYTI7XG5leHBvcnQgY29uc3QgR0xfV0FJVF9GQUlMRUQgPSAweDkxMWQ7XG5leHBvcnQgY29uc3QgR0xfWkVSTyA9IDA7XG4iLCJleHBvcnQgY2xhc3MgQmluZEhlbHBlcjxUVmFsdWU+IHtcbiAgcHJpdmF0ZSBfX3ByZXY6IFRWYWx1ZTtcbiAgcHJpdmF0ZSBfX2JpbmRlcjogKCB2YWx1ZTogVFZhbHVlICkgPT4gdm9pZDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoIGluaXQ6IFRWYWx1ZSwgYmluZGVyOiAoIHZhbHVlOiBUVmFsdWUgKSA9PiB2b2lkICkge1xuICAgIHRoaXMuX19wcmV2ID0gaW5pdDtcbiAgICB0aGlzLl9fYmluZGVyID0gYmluZGVyO1xuICB9XG5cbiAgcHVibGljIGJpbmQ8VD4oXG4gICAgdmFsdWU6IFRWYWx1ZSxcbiAgICBjYWxsYmFjaz86ICggdmFsdWU6IFRWYWx1ZSApID0+IFRcbiAgKTogVCB7XG4gICAgY29uc3QgcHJldiA9IHRoaXMuX19wcmV2O1xuICAgIGlmICggdmFsdWUgIT09IHByZXYgKSB7XG4gICAgICB0aGlzLl9fYmluZGVyKCB2YWx1ZSApO1xuICAgICAgdGhpcy5fX3ByZXYgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoIGNhbGxiYWNrICkge1xuICAgICAgY29uc3QgcmV0ID0gY2FsbGJhY2soIHZhbHVlICk7XG4gICAgICB0aGlzLmJpbmQoIHByZXYgKTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQgYXMgYW55O1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xfQVJSQVlfQlVGRkVSLCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiwgR0xfU1RBVElDX0RSQVcgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xCdWZmZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdEJ1ZmZlcjxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19idWZmZXI6IFdlYkdMQnVmZmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgYnVmZmVyKCk6IFdlYkdMQnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2J1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRCdWZmZXIuYnVmZmVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTEJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19idWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0QnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBidWZmZXI6IFdlYkdMQnVmZmVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19idWZmZXIgPSBidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZUJ1ZmZlciggdGhpcy5fX2J1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIHNldFZlcnRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEFycmF5QnVmZmVyIHwgQXJyYXlCdWZmZXJWaWV3IHwgbnVsbCxcbiAgICB1c2FnZTogbnVtYmVyID0gR0xfU1RBVElDX0RSQVdcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRWZXJ0ZXhCdWZmZXIoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLmJ1ZmZlckRhdGEoIEdMX0FSUkFZX0JVRkZFUiwgc291cmNlLCB1c2FnZSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbmV3IGluZGV4IGRhdGEgaW50byB0aGlzIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBzZXRJbmRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEFycmF5QnVmZmVyIHwgQXJyYXlCdWZmZXJWaWV3IHwgbnVsbCxcbiAgICB1c2FnZTogbnVtYmVyID0gR0xfU1RBVElDX0RSQVdcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRJbmRleEJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuYnVmZmVyRGF0YSggR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHNvdXJjZSwgdXNhZ2UgKTtcbiAgICB9ICk7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBHTENhdEVycm9ycyA9IHtcbiAgZ2V0IFVuZXhwZWN0ZWROdWxsRXJyb3IoKSB7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoICdHTENhdDogVW5leHBlY3RlZCBudWxsIGRldGVjdGVkJyApO1xuICAgIGVycm9yLm5hbWUgPSAnVW5leHBlY3RlZE51bGxFcnJvcic7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH0sXG4gIGdldCBXZWJHTDJFeGNsdXNpdmVFcnJvcigpIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvciggJ0dMQ2F0OiBBdHRlbXB0ZWQgdG8gdXNlIFdlYkdMMiBleGNsdXNpdmUgc3R1ZmYnICk7XG4gICAgZXJyb3IubmFtZSA9ICdXZWJHTDJFeGNsdXNpdmVFcnJvcic7XG4gICAgcmV0dXJuIGVycm9yO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgR0xfQ09MT1JfQVRUQUNITUVOVDAsIEdMX0RFUFRIX0FUVEFDSE1FTlQsIEdMX0ZSQU1FQlVGRkVSLCBHTF9SRU5ERVJCVUZGRVIsIEdMX1RFWFRVUkVfMkQgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcbmltcG9ydCB0eXBlIHsgR0xDYXRSZW5kZXJidWZmZXIgfSBmcm9tICcuL0dMQ2F0UmVuZGVyYnVmZmVyJztcbmltcG9ydCB0eXBlIHsgR0xDYXRUZXh0dXJlIH0gZnJvbSAnLi9HTENhdFRleHR1cmUnO1xuXG4vKipcbiAqIEl0J3MgYSBXZWJHTEZyYW1lYnVmZmVyLlxuICovXG5leHBvcnQgY2xhc3MgR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19mcmFtZWJ1ZmZlcjogV2ViR0xGcmFtZWJ1ZmZlcjtcbiAgcHJpdmF0ZSBfX3JlbmRlcmJ1ZmZlck1hcCA9IG5ldyBNYXA8R0xlbnVtLCBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4+KCk7XG4gIHByaXZhdGUgX190ZXh0dXJlTWFwID0gbmV3IE1hcDxHTGVudW0sIEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4+KCk7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gZnJhbWVidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZyYW1lYnVmZmVyKCk6IFdlYkdMRnJhbWVidWZmZXIge1xuICAgIHJldHVybiB0aGlzLl9fZnJhbWVidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biBmcmFtZWJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRGcmFtZWJ1ZmZlci5mcmFtZWJ1ZmZlcl1dXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTEZyYW1lYnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2ZyYW1lYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBhdHRhY2hlZCByZW5kZXJidWZmZXIuXG4gICAqIElmIHlvdSB3YW50IHRvIGdyYWIgb3RoZXIgdGhhbiBgREVQVEhfQVRUQUNITUVOVGAsIHRyeSBbW0dMQ2F0RnJhbWVidWZmZXIuZ2V0UmVuZGVyYnVmZmVyXV0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmVuZGVyYnVmZmVyKCk6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLmdldCggR0xfREVQVEhfQVRUQUNITUVOVCApID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGF0dGFjaGVkIHRleHR1cmUuXG4gICAqIElmIHlvdSB3YW50IHRvIGdyYWIgb3RoZXIgdGhhbiBgQ09MT1JfQVRUQUNITUVOVDBgLCB0cnkgW1tHTENhdEZyYW1lYnVmZmVyLmdldFRleHR1cmVdXSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldCB0ZXh0dXJlKCk6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fX3RleHR1cmVNYXAuZ2V0KCBHTF9DT0xPUl9BVFRBQ0hNRU5UMCApID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0RnJhbWVidWZmZXIgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIGZyYW1lYnVmZmVyOiBXZWJHTEZyYW1lYnVmZmVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19mcmFtZWJ1ZmZlciA9IGZyYW1lYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoIGFsc29BdHRhY2hlZCA9IGZhbHNlICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGdsLmRlbGV0ZUZyYW1lYnVmZmVyKCB0aGlzLl9fZnJhbWVidWZmZXIgKTtcblxuICAgIGlmICggYWxzb0F0dGFjaGVkICkge1xuICAgICAgZm9yICggY29uc3QgcmVuZGVyYnVmZmVyIG9mIHRoaXMuX19yZW5kZXJidWZmZXJNYXAudmFsdWVzKCkgKSB7XG4gICAgICAgIGdsLmRlbGV0ZVJlbmRlcmJ1ZmZlciggcmVuZGVyYnVmZmVyLnJhdyApO1xuICAgICAgfVxuXG4gICAgICBmb3IgKCBjb25zdCB0ZXh0dXJlIG9mIHRoaXMuX190ZXh0dXJlTWFwLnZhbHVlcygpICkge1xuICAgICAgICBnbC5kZWxldGVUZXh0dXJlKCB0ZXh0dXJlLnJhdyApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBpdHMgYXR0YWNoZWQgcmVuZGVyYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGdldFJlbmRlcmJ1ZmZlciggYXR0YWNobWVudCA9IEdMX0RFUFRIX0FUVEFDSE1FTlQgKTogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX19yZW5kZXJidWZmZXJNYXAuZ2V0KCBhdHRhY2htZW50ICkgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBpdHMgYXR0YWNoZWQgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBnZXRUZXh0dXJlKCBhdHRhY2htZW50ID0gR0xfQ09MT1JfQVRUQUNITUVOVDAgKTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9fdGV4dHVyZU1hcC5nZXQoIGF0dGFjaG1lbnQgKSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIHJlbmRlcmJ1ZmZlciB0byB0aGlzIGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGF0dGFjaFJlbmRlcmJ1ZmZlcihcbiAgICByZW5kZXJidWZmZXI6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PixcbiAgICB7XG4gICAgICBhdHRhY2htZW50ID0gR0xfREVQVEhfQVRUQUNITUVOVFxuICAgIH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZEZyYW1lYnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5mcmFtZWJ1ZmZlclJlbmRlcmJ1ZmZlciggR0xfRlJBTUVCVUZGRVIsIGF0dGFjaG1lbnQsIEdMX1JFTkRFUkJVRkZFUiwgcmVuZGVyYnVmZmVyLnJhdyApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX19yZW5kZXJidWZmZXJNYXAuc2V0KCBhdHRhY2htZW50LCByZW5kZXJidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSB0ZXh0dXJlIHRvIHRoaXMgZnJhbWVidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgYXR0YWNoVGV4dHVyZShcbiAgICB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+LFxuICAgIHtcbiAgICAgIGxldmVsID0gMCxcbiAgICAgIGF0dGFjaG1lbnQgPSBHTF9DT0xPUl9BVFRBQ0hNRU5UMFxuICAgIH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZEZyYW1lYnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5mcmFtZWJ1ZmZlclRleHR1cmUyRCggR0xfRlJBTUVCVUZGRVIsIGF0dGFjaG1lbnQsIEdMX1RFWFRVUkVfMkQsIHRleHR1cmUucmF3LCBsZXZlbCApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX190ZXh0dXJlTWFwLnNldCggYXR0YWNobWVudCwgdGV4dHVyZSApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBHTF9DT01QTEVUSU9OX1NUQVRVU19LSFIsIEdMX0ZMT0FULCBHTF9MSU5LX1NUQVRVUywgR0xfVEVYVFVSRTAgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcbmltcG9ydCB0eXBlIHsgR0xDYXRCdWZmZXIgfSBmcm9tICcuL0dMQ2F0QnVmZmVyJztcbmltcG9ydCB0eXBlIHsgR0xDYXRTaGFkZXIgfSBmcm9tICcuL0dMQ2F0U2hhZGVyJztcbmltcG9ydCB0eXBlIHsgR0xDYXRUZXh0dXJlIH0gZnJvbSAnLi9HTENhdFRleHR1cmUnO1xuXG5leHBvcnQgdHlwZSBHTENhdFByb2dyYW1Vbmlmb3JtVHlwZSA9XG4gICcxZicgfCAnMmYnIHwgJzNmJyB8ICc0ZicgfFxuICAnMWknIHwgJzJpJyB8ICczaScgfCAnNGknIHxcbiAgJzFmdicgfCAnMmZ2JyB8ICczZnYnIHwgJzRmdicgfFxuICAnMWl2JyB8ICcyaXYnIHwgJzNpdicgfCAnNGl2JyB8XG4gICdNYXRyaXgyZnYnIHwgJ01hdHJpeDNmdicgfCAnTWF0cml4NGZ2JztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xQcm9ncmFtLCBidXQgaGFzIGNhY2hlIG9mIHZhcmlhYmxlIGxvY2F0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0UHJvZ3JhbTxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19wcm9ncmFtOiBXZWJHTFByb2dyYW07XG4gIHByaXZhdGUgX19zaGFkZXJzOiBHTENhdFNoYWRlcjxUQ29udGV4dD5bXSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9fYXR0cmliTG9jYXRpb25DYWNoZTogeyBbIG5hbWU6IHN0cmluZyBdOiBudW1iZXIgfSA9IHt9O1xuICBwcml2YXRlIF9fdW5pZm9ybUxvY2F0aW9uQ2FjaGU6IHsgWyBuYW1lOiBzdHJpbmcgXTogV2ViR0xVbmlmb3JtTG9jYXRpb24gfCBudWxsIH0gPSB7fTtcbiAgcHJpdmF0ZSBfX3VuaWZvcm1UZXh0dXJlVW5pdE1hcDogeyBbIG5hbWU6IHN0cmluZyBdOiBudW1iZXIgfSA9IHt9O1xuICBwcml2YXRlIF9fdW5pZm9ybXRleHR1cmVVbml0SW5kZXggPSAwO1xuICBwcml2YXRlIF9fbGlua2VkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcHJvZ3JhbS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcHJvZ3JhbSgpOiBXZWJHTFByb2dyYW0ge1xuICAgIHJldHVybiB0aGlzLl9fcHJvZ3JhbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIHByb2dyYW0uIFNob3J0ZXIgdGhhbiBbW0dMQ2F0UHJvZ3JhbS5wcm9ncmFtXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTFByb2dyYW0ge1xuICAgIHJldHVybiB0aGlzLl9fcHJvZ3JhbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgc2hhZGVycy5cbiAgICovXG4gIHB1YmxpYyBnZXQgc2hhZGVycygpOiBHTENhdFNoYWRlcjxUQ29udGV4dD5bXSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9fc2hhZGVycyA/IHRoaXMuX19zaGFkZXJzLmNvbmNhdCgpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBsYXN0IGxpbmsgb3BlcmF0aW9uIHdhcyBzdWNjZXNzZnVsIG9yIG5vdC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaXNMaW5rZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX19saW5rZWQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0UHJvZ3JhbSBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PiwgcHJvZ3JhbTogV2ViR0xQcm9ncmFtICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19wcm9ncmFtID0gcHJvZ3JhbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSBwcm9ncmFtLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoIGFsc29BdHRhY2hlZCA9IGZhbHNlICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGdsLmRlbGV0ZVByb2dyYW0oIHRoaXMuX19wcm9ncmFtICk7XG5cbiAgICBpZiAoIGFsc29BdHRhY2hlZCApIHtcbiAgICAgIGNvbnN0IHNoYWRlcnMgPSB0aGlzLnNoYWRlcnM7XG4gICAgICBpZiAoIHNoYWRlcnMgKSB7XG4gICAgICAgIHNoYWRlcnMuZm9yRWFjaCggKCBzaGFkZXIgKSA9PiB7XG4gICAgICAgICAgc2hhZGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgfSApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggc2hhZGVycyBhbmQgbGluayB0aGlzIHByb2dyYW0uXG4gICAqL1xuICBwdWJsaWMgbGluayggLi4uc2hhZGVyczogR0xDYXRTaGFkZXI8VENvbnRleHQ+W10gKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgc2hhZGVycy5mb3JFYWNoKCAoIHNoYWRlciApID0+IGdsLmF0dGFjaFNoYWRlciggdGhpcy5fX3Byb2dyYW0sIHNoYWRlci5yYXcgKSApO1xuICAgIGdsLmxpbmtQcm9ncmFtKCB0aGlzLl9fcHJvZ3JhbSApO1xuXG4gICAgdGhpcy5fX2xpbmtlZCA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIoIHRoaXMuX19wcm9ncmFtLCBHTF9MSU5LX1NUQVRVUyApO1xuICAgIGlmICggIXRoaXMuX19saW5rZWQgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoIGdsLmdldFByb2dyYW1JbmZvTG9nKCB0aGlzLl9fcHJvZ3JhbSApISApO1xuICAgIH1cblxuICAgIHRoaXMuX19zaGFkZXJzID0gc2hhZGVycy5jb25jYXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggc2hhZGVycyBhbmQgbGluayB0aGlzIHByb2dyYW0uXG4gICAqIEl0J3MgZ29ubmEgYmUgYXN5bmNocm9ub3VzIGlmIHlvdSBoYXZlIHRoZSBLSFJfcGFyYWxsZWxfc2hhZGVyX2NvbXBpbGUgZXh0ZW5zaW9uIHN1cHBvcnQuXG4gICAqL1xuICBwdWJsaWMgbGlua0FzeW5jKCAuLi5zaGFkZXJzOiBHTENhdFNoYWRlcjxUQ29udGV4dD5bXSApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBnbENhdCA9IHRoaXMuX19nbENhdDtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG4gICAgY29uc3QgZXh0UGFyYWxsZWwgPSBnbENhdC5nZXRFeHRlbnNpb24oICdLSFJfcGFyYWxsZWxfc2hhZGVyX2NvbXBpbGUnICk7XG5cbiAgICBzaGFkZXJzLmZvckVhY2goICggc2hhZGVyICkgPT4gZ2wuYXR0YWNoU2hhZGVyKCB0aGlzLl9fcHJvZ3JhbSwgc2hhZGVyLnJhdyApICk7XG4gICAgZ2wubGlua1Byb2dyYW0oIHRoaXMuX19wcm9ncmFtICk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgPT4ge1xuICAgICAgY29uc3QgdXBkYXRlID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWV4dFBhcmFsbGVsIHx8XG4gICAgICAgICAgZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlciggdGhpcy5fX3Byb2dyYW0sIEdMX0NPTVBMRVRJT05fU1RBVFVTX0tIUiApID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuX19saW5rZWQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKCB0aGlzLl9fcHJvZ3JhbSwgR0xfTElOS19TVEFUVVMgKTtcbiAgICAgICAgICBpZiAoICF0aGlzLl9fbGlua2VkICkge1xuICAgICAgICAgICAgcmVqZWN0KCBuZXcgRXJyb3IoIGdsLmdldFByb2dyYW1JbmZvTG9nKCB0aGlzLl9fcHJvZ3JhbSApID8/ICdudWxsJyApICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fX3NoYWRlcnMgPSBzaGFkZXJzLmNvbmNhdCgpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHVwZGF0ZSApO1xuICAgICAgfTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gYXR0cmlidXRlIHZhcmlhYmxlLlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdmFyaWFibGVcbiAgICogQHBhcmFtIGJ1ZmZlciBWZXJ0ZXggYnVmZmVyLiBDYW4gYmUgbnVsbCwgdG8gZGlzYWJsZSBhdHRyaWJ1dGUgYXJyYXlcbiAgICogQHBhcmFtIHNpemUgTnVtYmVyIG9mIGNvbXBvbmVudHMgcGVyIHZlcnRleC4gTXVzdCBiZSAxLCAyLCAzIG9yIDRcbiAgICovXG4gIHB1YmxpYyBhdHRyaWJ1dGUoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGJ1ZmZlcjogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBzaXplID0gMSxcbiAgICBkaXZpc29yID0gMCxcbiAgICB0eXBlOiBudW1iZXIgPSBHTF9GTE9BVCxcbiAgICBzdHJpZGUgPSAwLFxuICAgIG9mZnNldCA9IDBcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKCBuYW1lICk7XG4gICAgaWYgKCBsb2NhdGlvbiA9PT0gLTEgKSB7IHJldHVybjsgfVxuXG4gICAgaWYgKCBidWZmZXIgPT09IG51bGwgKSB7XG4gICAgICBnbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkoIGxvY2F0aW9uICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRWZXJ0ZXhCdWZmZXIoIGJ1ZmZlciwgKCkgPT4ge1xuICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoIGxvY2F0aW9uICk7XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKCBsb2NhdGlvbiwgc2l6ZSwgdHlwZSwgZmFsc2UsIHN0cmlkZSwgb2Zmc2V0ICk7XG5cbiAgICAgIGlmICggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJEaXZpc29yKCBsb2NhdGlvbiwgZGl2aXNvciApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXh0ID0gdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ0FOR0xFX2luc3RhbmNlZF9hcnJheXMnICk7XG4gICAgICAgIGlmICggZXh0ICkge1xuICAgICAgICAgIGV4dC52ZXJ0ZXhBdHRyaWJEaXZpc29yQU5HTEUoIGxvY2F0aW9uLCBkaXZpc29yICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0gdmFyaWFibGUuXG4gICAqIFNlZSBhbHNvOiBbW0dMQ2F0UHJvZ3JhbS51bmlmb3JtVmVjdG9yXV1cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtKCBuYW1lOiBzdHJpbmcsIHR5cGU6IEdMQ2F0UHJvZ3JhbVVuaWZvcm1UeXBlLCAuLi52YWx1ZTogbnVtYmVyW10gKTogdm9pZCB7XG4gICAgY29uc3QgZnVuYyA9ICggdGhpcyBhcyBhbnkgKVsgJ3VuaWZvcm0nICsgdHlwZSBdO1xuICAgIGZ1bmMuY2FsbCggdGhpcywgbmFtZSwgLi4udmFsdWUgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybSB2YXJpYWJsZS5cbiAgICogU2VlIGFsc286IFtbR0xDYXRQcm9ncmFtLnVuaWZvcm1dXVxuICAgKi9cbiAgcHVibGljIHVuaWZvcm1WZWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHR5cGU6IEdMQ2F0UHJvZ3JhbVVuaWZvcm1UeXBlLFxuICAgIHZhbHVlOiBGbG9hdDMyTGlzdCB8IEludDMyTGlzdFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBmdW5jID0gKCB0aGlzIGFzIGFueSApWyAndW5pZm9ybScgKyB0eXBlIF07XG4gICAgZnVuYy5jYWxsKCB0aGlzLCBuYW1lLCB2YWx1ZSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMWkgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTFpKCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMWkoIGxvY2F0aW9uLCB2YWx1ZSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTJpIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0yaSggbmFtZTogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0yaSggbG9jYXRpb24sIHgsIHkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0zaSB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2koIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0zaSggbG9jYXRpb24sIHgsIHksIHogKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm00aSB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtNGkoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTRpKCBsb2NhdGlvbiwgeCwgeSwgeiwgdyApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTFpdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMWl2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBJbnQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMWl2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0yaXYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTJpdiggbmFtZTogc3RyaW5nLCBhcnJheTogSW50MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTJpdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtM2l2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0zaXYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEludDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0zaXYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTRpdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtNGl2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBJbnQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtNGl2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0xZiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMWYoIG5hbWU6IHN0cmluZywgdmFsdWU6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xZiggbG9jYXRpb24sIHZhbHVlICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMmYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTJmKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTJmKCBsb2NhdGlvbiwgeCwgeSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTNmIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0zZiggbmFtZTogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTNmKCBsb2NhdGlvbiwgeCwgeSwgeiApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTRmIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm00ZiggbmFtZTogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLCB3OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtNGYoIGxvY2F0aW9uLCB4LCB5LCB6LCB3ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMWZ2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0xZnYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEZsb2F0MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFmdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMmZ2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0yZnYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEZsb2F0MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTJmdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtM2Z2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0zZnYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEZsb2F0MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTNmdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtNGZ2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm00ZnYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEZsb2F0MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTRmdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtTWF0cml4MmZ2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm1NYXRyaXgyZnYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEZsb2F0MzJMaXN0LCB0cmFuc3Bvc2UgPSBmYWxzZSApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm1NYXRyaXgyZnYoIGxvY2F0aW9uLCB0cmFuc3Bvc2UsIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtTWF0cml4M2Z2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm1NYXRyaXgzZnYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEZsb2F0MzJMaXN0LCB0cmFuc3Bvc2UgPSBmYWxzZSApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm1NYXRyaXgzZnYoIGxvY2F0aW9uLCB0cmFuc3Bvc2UsIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtTWF0cml4NGZ2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm1NYXRyaXg0ZnYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEZsb2F0MzJMaXN0LCB0cmFuc3Bvc2UgPSBmYWxzZSApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYoIGxvY2F0aW9uLCB0cmFuc3Bvc2UsIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIGBzYW1wbGVyMkRgIHR5cGUgdW5pZm9ybSB0ZXh0dXJlLlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSB1bmlmb3JtIHRleHR1cmVcbiAgICogQHBhcmFtIHRleHR1cmUgVGV4dHVyZSBvYmplY3RcbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtVGV4dHVyZSggbmFtZTogc3RyaW5nLCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgY29uc3QgdW5pdCA9IHRoaXMuZ2V0VW5pZm9ybVRleHR1cmVVbml0KCBuYW1lICk7XG4gICAgZ2wuYWN0aXZlVGV4dHVyZSggR0xfVEVYVFVSRTAgKyB1bml0ICk7XG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRleHR1cmUgPz8gbnVsbCApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMWkoIGxvY2F0aW9uLCB1bml0ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIGBzYW1wbGVyQ3ViZWAgdHlwZSB1bmlmb3JtIHRleHR1cmUuXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIHVuaWZvcm0gdGV4dHVyZVxuICAgKiBAcGFyYW0gdGV4dHVyZSBUZXh0dXJlIG9iamVjdFxuICAgKi9cbiAgcHVibGljIHVuaWZvcm1DdWJlbWFwKCBuYW1lOiBzdHJpbmcsIHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICBjb25zdCB1bml0ID0gdGhpcy5nZXRVbmlmb3JtVGV4dHVyZVVuaXQoIG5hbWUgKTtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKCBHTF9URVhUVVJFMCArIHVuaXQgKTtcbiAgICB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmVDdWJlTWFwKCB0ZXh0dXJlID8/IG51bGwgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFpKCBsb2NhdGlvbiwgdW5pdCApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBhdHRyaWJ1dGUgbG9jYXRpb24uXG4gICAqL1xuICBwdWJsaWMgZ2V0QXR0cmliTG9jYXRpb24oIG5hbWU6IHN0cmluZyApOiBudW1iZXIge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGlmICggdGhpcy5fX2F0dHJpYkxvY2F0aW9uQ2FjaGVbIG5hbWUgXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuIHRoaXMuX19hdHRyaWJMb2NhdGlvbkNhY2hlWyBuYW1lIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oIHRoaXMuX19wcm9ncmFtLCBuYW1lICk7XG4gICAgICAvLyBpZiAoIGxvY2F0aW9uID09PSAtMSApIHtcbiAgICAgIC8vICAgdGhpcy5nbENhdC5zcGl0KCAnR0xDYXRQcm9ncmFtLmdldEF0dHJpYkxvY2F0aW9uOiBDb3VsZCBub3QgcmV0cmlldmUgYXR0cmlidXRlIGxvY2F0aW9uJyApO1xuICAgICAgLy8gICByZXR1cm4gLTE7XG4gICAgICAvLyB9XG4gICAgICB0aGlzLl9fYXR0cmliTG9jYXRpb25DYWNoZVsgbmFtZSBdID0gbG9jYXRpb247XG4gICAgICByZXR1cm4gbG9jYXRpb247XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIHVuaWZvcm0gbG9jYXRpb24uXG4gICAqL1xuICBwdWJsaWMgZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lOiBzdHJpbmcgKTogV2ViR0xVbmlmb3JtTG9jYXRpb24gfCBudWxsIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBpZiAoIHRoaXMuX191bmlmb3JtTG9jYXRpb25DYWNoZVsgbmFtZSBdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3VuaWZvcm1Mb2NhdGlvbkNhY2hlWyBuYW1lIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKCB0aGlzLl9fcHJvZ3JhbSwgbmFtZSApO1xuICAgICAgLy8gaWYgKCBsb2NhdGlvbiA9PT0gbnVsbCApIHtcbiAgICAgIC8vICAgdGhpcy5nbENhdC5zcGl0KCAnR0xDYXRQcm9ncmFtLmdldFVuaWZvcm1Mb2NhdGlvbjogQ291bGQgbm90IHJldHJpZXZlIHVuaWZvcm0gbG9jYXRpb24nICk7XG4gICAgICAvLyAgIHJldHVybiBsb2NhdGlvbjtcbiAgICAgIC8vIH1cbiAgICAgIHRoaXMuX191bmlmb3JtTG9jYXRpb25DYWNoZVsgbmFtZSBdID0gbG9jYXRpb247XG4gICAgICByZXR1cm4gbG9jYXRpb247XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIG9yIGNyZWF0ZSBhIHRleHR1cmUgdW5pdCB0aGF0IGNvcnJlc3BvbmRzIHRvIGdpdmVuIG5hbWUuXG4gICAqL1xuICBwdWJsaWMgZ2V0VW5pZm9ybVRleHR1cmVVbml0KCBuYW1lOiBzdHJpbmcgKTogbnVtYmVyIHtcbiAgICBpZiAoIHRoaXMuX191bmlmb3JtVGV4dHVyZVVuaXRNYXBbIG5hbWUgXSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgdGhpcy5fX3VuaWZvcm1UZXh0dXJlVW5pdE1hcFsgbmFtZSBdID0gdGhpcy5fX3VuaWZvcm10ZXh0dXJlVW5pdEluZGV4O1xuICAgICAgdGhpcy5fX3VuaWZvcm10ZXh0dXJlVW5pdEluZGV4ICsrO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9fdW5pZm9ybVRleHR1cmVVbml0TWFwWyBuYW1lIF07XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMX0RFUFRIX0FUVEFDSE1FTlQsIEdMX1JFTkRFUkJVRkZFUiB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuaW1wb3J0IHR5cGUgeyBHTENhdCB9IGZyb20gJy4vR0xDYXQnO1xuaW1wb3J0IHsgR0xDYXRFcnJvcnMgfSBmcm9tICcuL0dMQ2F0RXJyb3JzJztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xSZW5kZXJidWZmZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19yZW5kZXJidWZmZXI6IFdlYkdMUmVuZGVyYnVmZmVyO1xuICBwcml2YXRlIF9fd2lkdGggPSAwO1xuICBwcml2YXRlIF9faGVpZ2h0ID0gMDtcblxuICAvKipcbiAgICogSXRzIG93biByZW5kZXJidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlbmRlcmJ1ZmZlcigpOiBXZWJHTFJlbmRlcmJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19yZW5kZXJidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biByZW5kZXJidWZmZXIuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0UmVuZGVyQnVmZmVyLnJlbmRlcmJ1ZmZlcl1dLlxuICAgKi9cbiAgcHVibGljIGdldCByYXcoKTogV2ViR0xSZW5kZXJidWZmZXIge1xuICAgIHJldHVybiB0aGlzLl9fcmVuZGVyYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyB3aWR0aC5cbiAgICovXG4gIHB1YmxpYyBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3dpZHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBoZWlnaHQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9faGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdFRleHR1cmUgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIHJlbmRlcmJ1ZmZlcjogV2ViR0xSZW5kZXJidWZmZXIgKSB7XG4gICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XG4gICAgdGhpcy5fX3JlbmRlcmJ1ZmZlciA9IHJlbmRlcmJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSByZW5kZXJidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9fZ2xDYXQuZ2wuZGVsZXRlUmVuZGVyYnVmZmVyKCB0aGlzLl9fcmVuZGVyYnVmZmVyICk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGlzIHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyByZW5kZXJidWZmZXJTdG9yYWdlKFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgeyBmb3JtYXQgPSB0aGlzLl9fZ2xDYXQucHJlZmVycmVkRGVwdGhGb3JtYXQgfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kUmVuZGVyYnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5yZW5kZXJidWZmZXJTdG9yYWdlKCBHTF9SRU5ERVJCVUZGRVIsIGZvcm1hdCwgd2lkdGgsIGhlaWdodCApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGlzIHJlbmRlcmJ1ZmZlciB3aXRoIG11bHRpc2FtcGxlIGVuYWJsZWQuXG4gICAqIElmIHlvdSBhcmUgdXNpbmcgV2ViR0wxLCBpdCB3aWxsIGZhbGxiYWNrIHRvIG5vbiBtdWx0aXNhbXBsZSBvbmUgaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyByZW5kZXJidWZmZXJTdG9yYWdlTXVsdGlzYW1wbGUoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB7XG4gICAgICBzYW1wbGVzID0gdGhpcy5fX2dsQ2F0LnByZWZlcnJlZE11bHRpc2FtcGxlU2FtcGxlcyxcbiAgICAgIGZvcm1hdCA9IEdMX0RFUFRIX0FUVEFDSE1FTlQsXG4gICAgICBmYWxsYmFja1dlYkdMMSA9IHRydWVcbiAgICB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRSZW5kZXJidWZmZXIoIHRoaXMsICgpID0+IHtcbiAgICAgIGlmICggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgICBnbC5yZW5kZXJidWZmZXJTdG9yYWdlTXVsdGlzYW1wbGUoIEdMX1JFTkRFUkJVRkZFUiwgc2FtcGxlcywgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIGZhbGxiYWNrV2ViR0wxICkge1xuICAgICAgICAgIGdsLnJlbmRlcmJ1ZmZlclN0b3JhZ2UoIEdMX1JFTkRFUkJVRkZFUiwgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgR0xDYXRFcnJvcnMuV2ViR0wyRXhjbHVzaXZlRXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fd2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLl9faGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgeyBHTF9DT01QSUxFX1NUQVRVUyB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuXG4vKipcbiAqIEl0J3MgYSBXZWJHTFNoYWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0U2hhZGVyPFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3NoYWRlcjogV2ViR0xTaGFkZXI7XG4gIHByaXZhdGUgX19jb21waWxlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHNoYWRlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgc2hhZGVyKCk6IFdlYkdMU2hhZGVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3NoYWRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIHNoYWRlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRTaGFkZXIuc2hhZGVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTFNoYWRlciB7XG4gICAgcmV0dXJuIHRoaXMuX19zaGFkZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0U2hhZGVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBzaGFkZXI6IFdlYkdMU2hhZGVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19zaGFkZXIgPSBzaGFkZXI7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgc2hhZGVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZVNoYWRlciggdGhpcy5fX3NoYWRlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIHRoZSBsYXN0IGNvbXBpbGF0aW9uIHdhcyBzdWNjZXNzZnVsIG9yIG5vdC5cbiAgICovXG4gIHB1YmxpYyBpc0NvbXBpbGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9fY29tcGlsZWQ7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGlsZSB0aGUgc2hhZGVyLlxuICAgKi9cbiAgcHVibGljIGNvbXBpbGUoIGNvZGU6IHN0cmluZyApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBnbC5zaGFkZXJTb3VyY2UoIHRoaXMuX19zaGFkZXIsIGNvZGUgKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKCB0aGlzLl9fc2hhZGVyICk7XG5cbiAgICB0aGlzLl9fY29tcGlsZWQgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoIHRoaXMuX19zaGFkZXIsIEdMX0NPTVBJTEVfU1RBVFVTICk7XG4gICAgaWYgKCAhdGhpcy5fX2NvbXBpbGVkICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCBnbC5nZXRTaGFkZXJJbmZvTG9nKCB0aGlzLl9fc2hhZGVyICkhICk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBHTF9DTEFNUF9UT19FREdFLCBHTF9GTE9BVCwgR0xfSEFMRl9GTE9BVCwgR0xfTElORUFSLCBHTF9ORUFSRVNULCBHTF9SR0JBLCBHTF9SR0JBOCwgR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YLCBHTF9URVhUVVJFX01BR19GSUxURVIsIEdMX1RFWFRVUkVfTUlOX0ZJTFRFUiwgR0xfVEVYVFVSRV9XUkFQX1MsIEdMX1RFWFRVUkVfV1JBUF9ULCBHTF9VTlNJR05FRF9CWVRFIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgeyBHTENhdEVycm9ycyB9IGZyb20gJy4vR0xDYXRFcnJvcnMnO1xuXG5jb25zdCB6ZXJvVGV4dHVyZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoIFsgMCwgMCwgMCwgMCBdICk7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMVGV4dHVyZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0VGV4dHVyZTxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX190ZXh0dXJlOiBXZWJHTFRleHR1cmU7XG4gIHByaXZhdGUgX193aWR0aCA9IDA7XG4gIHByaXZhdGUgX19oZWlnaHQgPSAwO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRleHR1cmUoKTogV2ViR0xUZXh0dXJlIHtcbiAgICByZXR1cm4gdGhpcy5fX3RleHR1cmU7XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biB0ZXh0dXJlLiBTaG9ydGVyIHRoYW4gW1tHTENhdFRleHR1cmUudGV4dHVyZWRdXVxuICAgKi9cbiAgcHVibGljIGdldCByYXcoKTogV2ViR0xUZXh0dXJlIHtcbiAgICByZXR1cm4gdGhpcy5fX3RleHR1cmU7XG4gIH1cblxuICAvKipcbiAgICogSXRzIHdpZHRoLlxuICAgKi9cbiAgcHVibGljIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9fd2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGhlaWdodC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX19oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0VGV4dHVyZSBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PiwgdGV4dHVyZTogV2ViR0xUZXh0dXJlICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX190ZXh0dXJlID0gdGV4dHVyZTtcbiAgICB0aGlzLnRleHR1cmVGaWx0ZXIoIEdMX0xJTkVBUiApO1xuICAgIHRoaXMudGV4dHVyZVdyYXAoIEdMX0NMQU1QX1RPX0VER0UgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZVRleHR1cmUoIHRoaXMuX190ZXh0dXJlICk7XG4gIH1cblxuICAvKipcbiAgICogU3BlY2lmeSBob3cgdG8gZmlsdGVyIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHRleHR1cmVGaWx0ZXIoKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVGaWx0ZXIoIGZpbHRlcjogbnVtYmVyICk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlRmlsdGVyKCBmaWx0ZXJNYWc6IG51bWJlciwgZmlsdGVyTWluOiBudW1iZXIgKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVGaWx0ZXIoIGZpbHRlck1hZzogbnVtYmVyID0gR0xfTkVBUkVTVCwgZmlsdGVyTWluOiBudW1iZXIgPSBmaWx0ZXJNYWcgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfTUFHX0ZJTFRFUiwgZmlsdGVyTWFnICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFXzJELCBHTF9URVhUVVJFX01JTl9GSUxURVIsIGZpbHRlck1pbiApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0byB3cmFwIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHRleHR1cmVXcmFwKCk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlV3JhcCggd3JhcDogbnVtYmVyICk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlV3JhcCggd3JhcFM6IG51bWJlciwgd3JhcFQ6IG51bWJlciApOiB2b2lkO1xuICBwdWJsaWMgdGV4dHVyZVdyYXAoIHdyYXBTOiBudW1iZXIgPSBHTF9DTEFNUF9UT19FREdFLCB3cmFwVDogbnVtYmVyID0gd3JhcFMgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfV1JBUF9TLCB3cmFwUyApO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9XUkFQX1QsIHdyYXBUICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgdGV4U3RvcmFnZTJEKFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgeyB0YXJnZXQgPSBHTF9URVhUVVJFXzJELCBsZXZlbCA9IDEsIGZvcm1hdCA9IEdMX1JHQkE4IH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICAgIGdsLnRleFN0b3JhZ2UyRCggdGFyZ2V0LCBsZXZlbCwgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICB9ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEdMQ2F0RXJyb3JzLldlYkdMMkV4Y2x1c2l2ZUVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSB2YWx1ZSBmb3IgdGhlIHBhc3NlZCBwYXJhbWV0ZXIgbmFtZS5cbiAgICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViR0xSZW5kZXJpbmdDb250ZXh0L2dldFBhcmFtZXRlclxuICAgKi9cbiAgcHVibGljIGdldFBhcmFtZXRlciggcG5hbWU6IEdMZW51bSApOiBhbnkge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHJldHVybiB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGhpcywgKCkgPT4ge1xuICAgICAgcmV0dXJuIGdsLmdldFBhcmFtZXRlciggcG5hbWUgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogU3BlY2lmeSB0aGUgcGl4ZWwgc3RvcmFnZSBtb2Rlcy5cbiAgICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViR0xSZW5kZXJpbmdDb250ZXh0L3BpeGVsU3RvcmVpXG4gICAqL1xuICBwdWJsaWMgcGl4ZWxTdG9yZWkoIHBuYW1lOiBHTGVudW0sIHBhcmFtOiBudW1iZXIgfCBib29sZWFuICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5waXhlbFN0b3JlaSggcG5hbWUsIHBhcmFtICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBzZXRUZXh0dXJlKCBzb3VyY2U6IFRleEltYWdlU291cmNlICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC50ZXhJbWFnZTJEKCBHTF9URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBzb3VyY2UgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fd2lkdGggPSBzb3VyY2Uud2lkdGg7XG4gICAgdGhpcy5fX2hlaWdodCA9IHNvdXJjZS5oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyBkYXRhIGludG8gdGhpcyB0ZXh0dXJlLlxuICAgKiBUaGlzIGZ1bmN0aW9uIHVzZXMgVHlwZWRBcnJheS4gSWYgeW91IHdhbnQgdG8gc291cmNlIGltYWdlIGRhdGEsIHVzZSBgR0xDYXQuc2V0VGV4dHVyZSgpYCBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHNldFRleHR1cmVGcm9tQXJyYXkoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBzb3VyY2U6IEFycmF5QnVmZmVyVmlldyB8IG51bGwsXG4gICAge1xuICAgICAgaW50ZXJuYWxmb3JtYXQgPSBHTF9SR0JBOCxcbiAgICAgIGZvcm1hdCA9IEdMX1JHQkEsXG4gICAgICB0eXBlID0gR0xfVU5TSUdORURfQllURVxuICAgIH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBsZXQgaWZvcm1hdCA9IGludGVybmFsZm9ybWF0O1xuICAgIGlmICggISggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkgKSB7XG4gICAgICBpZiAoIHR5cGUgPT09IEdMX0hBTEZfRkxPQVQgKSB7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0JywgdHJ1ZSApO1xuICAgICAgICB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnT0VTX3RleHR1cmVfaGFsZl9mbG9hdF9saW5lYXInICk7XG4gICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSBHTF9GTE9BVCApIHtcbiAgICAgICAgdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ09FU190ZXh0dXJlX2Zsb2F0JywgdHJ1ZSApO1xuICAgICAgICB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyJyApO1xuICAgICAgfVxuXG4gICAgICBpZm9ybWF0ID0gZm9ybWF0O1xuICAgIH1cblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC50ZXhJbWFnZTJEKFxuICAgICAgICBHTF9URVhUVVJFXzJELFxuICAgICAgICAwLFxuICAgICAgICBpZm9ybWF0LFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICAwLFxuICAgICAgICBmb3JtYXQsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIHNvdXJjZVxuICAgICAgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fd2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLl9faGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgcGl4ZWxzIGZyb20gY3VycmVudCBmcmFtZWJ1ZmZlciB0byBnaXZlbiB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIGNvcHlUZXh0dXJlKCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuY29weVRleEltYWdlMkQoIEdMX1RFWFRVUkVfMkQsIDAsIEdMX1JHQkEsIDAsIDAsIHdpZHRoLCBoZWlnaHQsIDAgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fd2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLl9faGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgY3ViZW1hcCBkYXRhIGludG8gdGhpcyB0ZXh0dXJlLlxuICAgKiBAcGFyYW0gdGV4dHVyZXMgQXJyYXkgb2YgaWFtZ2VzLiBPcmRlcjogYFgrYCwgYFgtYCwgYFkrYCwgYFktYCwgYForYCwgYFotYFxuICAgKiBAdG9kbyBkdWUgdG8gY29tcGF0aWJpbGl0eSBvZiBpdHMgYHdpZHRoYCBhbmQgYGhlaWdodGAgaXQgc2hvdWxkIG5vdCBiZSB1c2VkIHlldFxuICAgKi9cbiAgcHVibGljIHNldEN1YmVtYXAoIHRleHR1cmVzOiBUZXhJbWFnZVNvdXJjZVtdICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZUN1YmVNYXAoIHRoaXMsICgpID0+IHtcbiAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IDY7IGkgKysgKSB7XG4gICAgICAgIGdsLnRleEltYWdlMkQoXG4gICAgICAgICAgR0xfVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YICsgaSxcbiAgICAgICAgICAwLFxuICAgICAgICAgIEdMX1JHQkEsXG4gICAgICAgICAgR0xfUkdCQSxcbiAgICAgICAgICBHTF9VTlNJR05FRF9CWVRFLFxuICAgICAgICAgIHRleHR1cmVzWyBpIF1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIEdMX1RFWFRVUkVfTUlOX0ZJTFRFUiwgR0xfTElORUFSICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFX0NVQkVfTUFQLCBHTF9URVhUVVJFX01BR19GSUxURVIsIEdMX0xJTkVBUiApO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9XUkFQX1MsIEdMX0NMQU1QX1RPX0VER0UgKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIEdMX1RFWFRVUkVfV1JBUF9ULCBHTF9DTEFNUF9UT19FREdFICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBbIDAsIDAsIDAsIDAgXSB0byB0aGlzIHRleHR1cmUuXG4gICAqIFVzZWZ1bCBmb3IgdGVtcG9yYXJ5IHVzZS4uXG4gICAqL1xuICBwdWJsaWMgc2V0WmVyb1RleHR1cmUoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRUZXh0dXJlRnJvbUFycmF5KCAxLCAxLCB6ZXJvVGV4dHVyZUFycmF5ICk7XG4gIH1cbn1cbiIsImltcG9ydCB0eXBlIHsgR0xDYXQsIEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlIH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgeyBHTF9BUlJBWV9CVUZGRVIsIEdMX0VMRU1FTlRfQVJSQVlfQlVGRkVSLCBHTF9GTE9BVCB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuaW1wb3J0IHR5cGUgeyBHTENhdEJ1ZmZlciB9IGZyb20gJy4vR0xDYXRCdWZmZXInO1xuXG4vKipcbiAqIEl0J3MgYSBXZWJHTFZlcnRleEFycmF5T2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgR0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX192ZXJ0ZXhBcnJheTogR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQ+O1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgYnVmZmVyKCk6IEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0PiB7XG4gICAgcmV0dXJuIHRoaXMuX192ZXJ0ZXhBcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRCdWZmZXIuYnVmZmVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBHTENhdFZlcnRleEFycmF5UmF3VHlwZTxUQ29udGV4dD4ge1xuICAgIHJldHVybiB0aGlzLl9fdmVydGV4QXJyYXk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0QnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCB2ZXJ0ZXhBcnJheTogR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQ+ICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX192ZXJ0ZXhBcnJheSA9IHZlcnRleEFycmF5O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGlmICggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgZ2wuZGVsZXRlVmVydGV4QXJyYXkoIHRoaXMuX192ZXJ0ZXhBcnJheSApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHQgPSB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnLCB0cnVlICk7XG4gICAgICBleHQuZGVsZXRlVmVydGV4QXJyYXlPRVMoIHRoaXMuX192ZXJ0ZXhBcnJheSBhcyBhbnkgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIHZlcnRleCBidWZmZXIgdG8gdGhlIHZlcnRleCBhcnJheS5cbiAgICovXG4gIHB1YmxpYyBiaW5kVmVydGV4YnVmZmVyKFxuICAgIHNvdXJjZTogR0xDYXRCdWZmZXI8VENvbnRleHQ+LFxuICAgIGxvY2F0aW9uOiBudW1iZXIsXG4gICAgc2l6ZSA9IDEsXG4gICAgZGl2aXNvciA9IDAsXG4gICAgdHlwZTogbnVtYmVyID0gR0xfRkxPQVQsXG4gICAgc3RyaWRlID0gMCxcbiAgICBvZmZzZXQgPSAwXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVmVydGV4QXJyYXkoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLmJpbmRCdWZmZXIoIEdMX0FSUkFZX0JVRkZFUiwgc291cmNlLnJhdyApO1xuICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoIGxvY2F0aW9uICk7XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKCBsb2NhdGlvbiwgc2l6ZSwgdHlwZSwgZmFsc2UsIHN0cmlkZSwgb2Zmc2V0ICk7XG5cbiAgICAgIGlmICggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJEaXZpc29yKCBsb2NhdGlvbiwgZGl2aXNvciApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXh0ID0gdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ0FOR0xFX2luc3RhbmNlZF9hcnJheXMnICk7XG4gICAgICAgIGlmICggZXh0ICkge1xuICAgICAgICAgIGV4dC52ZXJ0ZXhBdHRyaWJEaXZpc29yQU5HTEUoIGxvY2F0aW9uLCBkaXZpc29yICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhbiBpbmRleCBidWZmZXIgdG8gdGhlIHZlcnRleCBhcnJheS5cbiAgICovXG4gIHB1YmxpYyBiaW5kSW5kZXhidWZmZXIoXG4gICAgc291cmNlOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD5cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRWZXJ0ZXhBcnJheSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuYmluZEJ1ZmZlciggR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHNvdXJjZS5yYXcgKTtcbiAgICB9ICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMX0FSUkFZX0JVRkZFUiwgR0xfQkxFTkQsIEdMX0NPTE9SX0FUVEFDSE1FTlQwLCBHTF9DT0xPUl9CVUZGRVJfQklULCBHTF9ERVBUSDI0X1NURU5DSUw4LCBHTF9ERVBUSF9BVFRBQ0hNRU5ULCBHTF9ERVBUSF9CVUZGRVJfQklULCBHTF9ERVBUSF9DT01QT05FTlQxNiwgR0xfREVQVEhfVEVTVCwgR0xfRFJBV19GUkFNRUJVRkZFUiwgR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIEdMX0ZMT0FULCBHTF9GUkFHTUVOVF9TSEFERVIsIEdMX0ZSQU1FQlVGRkVSLCBHTF9MRVFVQUwsIEdMX01BWF9EUkFXX0JVRkZFUlMsIEdMX05FQVJFU1QsIEdMX09ORV9NSU5VU19TUkNfQUxQSEEsIEdMX1JFQURfRlJBTUVCVUZGRVIsIEdMX1JFTkRFUkJVRkZFUiwgR0xfUkdCQSwgR0xfUkdCQTMyRiwgR0xfUkdCQTgsIEdMX1NSQ19BTFBIQSwgR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVkVSVEVYX1NIQURFUiB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuaW1wb3J0IHsgQmluZEhlbHBlciB9IGZyb20gJy4vdXRpbHMvQmluZEhlbHBlcic7XG5pbXBvcnQgeyBHTENhdEJ1ZmZlciB9IGZyb20gJy4vR0xDYXRCdWZmZXInO1xuaW1wb3J0IHsgR0xDYXRFcnJvcnMgfSBmcm9tICcuL0dMQ2F0RXJyb3JzJztcbmltcG9ydCB7IEdMQ2F0RnJhbWVidWZmZXIgfSBmcm9tICcuL0dMQ2F0RnJhbWVidWZmZXInO1xuaW1wb3J0IHsgR0xDYXRQcm9ncmFtIH0gZnJvbSAnLi9HTENhdFByb2dyYW0nO1xuaW1wb3J0IHsgR0xDYXRSZW5kZXJidWZmZXIgfSBmcm9tICcuL0dMQ2F0UmVuZGVyYnVmZmVyJztcbmltcG9ydCB7IEdMQ2F0U2hhZGVyIH0gZnJvbSAnLi9HTENhdFNoYWRlcic7XG5pbXBvcnQgeyBHTENhdFRleHR1cmUgfSBmcm9tICcuL0dMQ2F0VGV4dHVyZSc7XG5pbXBvcnQgeyBHTENhdFZlcnRleEFycmF5IH0gZnJvbSAnLi9HTENhdFZlcnRleEFycmF5JztcblxuZXhwb3J0IHR5cGUgV2ViR0xFeHRlbnNpb24gPSBhbnk7XG5cbmV4cG9ydCB0eXBlIEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD5cbiAgPSBUQ29udGV4dCBleHRlbmRzIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICA/IFdlYkdMVmVydGV4QXJyYXlPYmplY3RcbiAgICA6IFdlYkdMVmVydGV4QXJyYXlPYmplY3RPRVM7XG5cbi8qKlxuICogV2ViR0wgd3JhcHBlciB3aXRoIHBsZW50eSBvZiBoYWNrYWJpbGl0eS5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0PFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD4ge1xuICBwdWJsaWMgc3RhdGljIHRocm93SWZOdWxsPFQ+KCB2OiBUIHwgbnVsbCApOiBUIHtcbiAgICBpZiAoIHYgPT0gbnVsbCApIHtcbiAgICAgIHRocm93IEdMQ2F0RXJyb3JzLlVuZXhwZWN0ZWROdWxsRXJyb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBwcmVmZXJyZWRNdWx0aXNhbXBsZVNhbXBsZXMgPSA0O1xuXG4gIHByaXZhdGUgX19wcmVmZXJyZWREZXB0aEZvcm1hdDogR0xlbnVtIHwgbnVsbCA9IG51bGw7XG4gIHB1YmxpYyBnZXQgcHJlZmVycmVkRGVwdGhGb3JtYXQoKTogR0xlbnVtIHtcbiAgICBpZiAoIHRoaXMuX19wcmVmZXJyZWREZXB0aEZvcm1hdCAhPT0gbnVsbCApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fcHJlZmVycmVkRGVwdGhGb3JtYXQ7XG4gICAgfSBlbHNlIGlmICggdGhpcy5fX2dsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIHJldHVybiBHTF9ERVBUSDI0X1NURU5DSUw4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gR0xfREVQVEhfQ09NUE9ORU5UMTY7XG4gICAgfVxuICB9XG4gIHB1YmxpYyBzZXQgcHJlZmVycmVkRGVwdGhGb3JtYXQoIGZvcm1hdDogR0xlbnVtICkge1xuICAgIHRoaXMuX19wcmVmZXJyZWREZXB0aEZvcm1hdCA9IGZvcm1hdDtcbiAgfVxuXG4gIHByaXZhdGUgX19nbDogVENvbnRleHQ7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJWZXJ0ZXhCdWZmZXIgPSBuZXcgQmluZEhlbHBlcjxHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggYnVmZmVyICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kQnVmZmVyKCBHTF9BUlJBWV9CVUZGRVIsIGJ1ZmZlcj8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJJbmRleEJ1ZmZlciA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCBidWZmZXIgKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcbiAgICAgIGdsLmJpbmRCdWZmZXIoIEdMX0VMRU1FTlRfQVJSQVlfQlVGRkVSLCBidWZmZXI/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyVmVydGV4QXJyYXkgPSBuZXcgQmluZEhlbHBlcjxHTENhdFZlcnRleEFycmF5PFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCB2ZXJ0ZXhBcnJheSApID0+IHtcbiAgICAgIHRoaXMucmF3QmluZFZlcnRleEFycmF5KCB2ZXJ0ZXhBcnJheT8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJUZXh0dXJlMkQgPSBuZXcgQmluZEhlbHBlcjxHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIHRleHR1cmUgKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcbiAgICAgIGdsLmJpbmRUZXh0dXJlKCBHTF9URVhUVVJFXzJELCB0ZXh0dXJlPy5yYXcgPz8gbnVsbCApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlclRleHR1cmVDdWJlTWFwID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCB0ZXh0dXJlICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kVGV4dHVyZSggR0xfVEVYVFVSRV9DVUJFX01BUCwgdGV4dHVyZT8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJSZW5kZXJidWZmZXIgPSBuZXcgQmluZEhlbHBlcjxHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggcmVuZGVyYnVmZmVyICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kUmVuZGVyYnVmZmVyKCBHTF9SRU5ERVJCVUZGRVIsIHJlbmRlcmJ1ZmZlcj8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJGcmFtZWJ1ZmZlciA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIGZyYW1lYnVmZmVyICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kRnJhbWVidWZmZXIoIEdMX0ZSQU1FQlVGRkVSLCBmcmFtZWJ1ZmZlcj8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJQcm9ncmFtID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRQcm9ncmFtPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCBwcm9ncmFtICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC51c2VQcm9ncmFtKCBwcm9ncmFtPy5yYXcgPz8gbnVsbCApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlckRyYXdCdWZmZXJzID0gbmV3IEJpbmRIZWxwZXI8R0xlbnVtW10+KFxuICAgIFsgR0xfQ09MT1JfQVRUQUNITUVOVDAgXSxcbiAgICAoIGJ1ZmZlcnMgKSA9PiB7XG4gICAgICB0aGlzLnJhd0RyYXdCdWZmZXJzKCBidWZmZXJzICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19leHRlbnNpb25DYWNoZTogeyBbIG5hbWU6IHN0cmluZyBdOiBXZWJHTEV4dGVuc2lvbiB9ID0ge307XG4gIHByaXZhdGUgX19kdW1teVRleHR1cmVDYWNoZT86IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD47XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcmVuZGVyaW5nIGNvbnRleHQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlbmRlcmluZ0NvbnRleHQoKTogVENvbnRleHQge1xuICAgIHJldHVybiB0aGlzLl9fZ2w7XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biByZW5kZXJpbmcgY29udGV4dC4gU2hvcnRlciB0aGFuIFtbR0xDYXQucmVuZGVyaW5nQ29udGV4dF1dXG4gICAqL1xuICBwdWJsaWMgZ2V0IGdsKCk6IFRDb250ZXh0IHtcbiAgICByZXR1cm4gdGhpcy5fX2dsO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdCBpbnN0YW5jZS5cbiAgICogUmVuZGVyaW5nIGNvbnRleHQgaXMgcmVxdWlyZWQuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsOiBUQ29udGV4dCApIHtcbiAgICB0aGlzLl9fZ2wgPSBnbDtcblxuICAgIGdsLmVuYWJsZSggR0xfREVQVEhfVEVTVCApO1xuICAgIGdsLmRlcHRoRnVuYyggR0xfTEVRVUFMICk7XG4gICAgZ2wuZW5hYmxlKCBHTF9CTEVORCApO1xuICAgIGdsLmJsZW5kRnVuYyggR0xfU1JDX0FMUEhBLCBHTF9PTkVfTUlOVVNfU1JDX0FMUEhBICk7XG4gIH1cblxuICAvKipcbiAgICogQSBkdW1teSB0ZXh0dXJlLCAxMDAlIG9yZ2FuaWMgcHVyZSAjRkYwMEZGIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGR1bW15VGV4dHVyZSgpOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHtcbiAgICBpZiAoIHRoaXMuX19kdW1teVRleHR1cmVDYWNoZSApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fZHVtbXlUZXh0dXJlQ2FjaGU7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dHVyZSA9IHRoaXMuY3JlYXRlVGV4dHVyZSgpO1xuXG4gICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KCAxLCAxLCBuZXcgVWludDhBcnJheSggWyAyNTUsIDAsIDI1NSwgMjU1IF0gKSApO1xuICAgIHRoaXMuX19kdW1teVRleHR1cmVDYWNoZSA9IHRleHR1cmU7XG4gICAgcmV0dXJuIHRleHR1cmU7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgYW4gZXh0ZW5zaW9uLlxuICAgKiBJZiB0aGV5IGlzIHlvdXIgcHJlY2lvdXMgb25lIGFuZCB5b3UgY2Fubm90IGxpdmUgd2l0aG91dCBoaW0sIHR1cm4gb24gYHRocm93SWZOb3RGb3VuZGAuXG4gICAqL1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0IHwgbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2hhbGZfZmxvYXQnLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfaGFsZl9mbG9hdF9saW5lYXInLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IE9FU190ZXh0dXJlX2hhbGZfZmxvYXRfbGluZWFyIHwgbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2hhbGZfZmxvYXRfbGluZWFyJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogT0VTX3RleHR1cmVfaGFsZl9mbG9hdF9saW5lYXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdGV4dHVyZV9mbG9hdCcsXG4gICAgdGhyb3dJZk5vdEZvdW5kPzogZmFsc2VcbiAgKTogT0VTX3RleHR1cmVfZmxvYXQgfCBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfZmxvYXQnLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBPRVNfdGV4dHVyZV9mbG9hdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2Zsb2F0X2xpbmVhcicsXG4gICAgdGhyb3dJZk5vdEZvdW5kPzogZmFsc2VcbiAgKTogT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyIHwgbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2Zsb2F0X2xpbmVhcicsXG4gICAgdGhyb3dJZk5vdEZvdW5kOiB0cnVlXG4gICk6IE9FU190ZXh0dXJlX2Zsb2F0X2xpbmVhcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ0FOR0xFX2luc3RhbmNlZF9hcnJheXMnLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IEFOR0xFX2luc3RhbmNlZF9hcnJheXMgfCBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnQU5HTEVfaW5zdGFuY2VkX2FycmF5cycsXG4gICAgdGhyb3dJZk5vdEZvdW5kOiB0cnVlXG4gICk6IEFOR0xFX2luc3RhbmNlZF9hcnJheXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdmVydGV4X2FycmF5X29iamVjdCcsXG4gICAgdGhyb3dJZk5vdEZvdW5kPzogZmFsc2VcbiAgKTogT0VTX3ZlcnRleF9hcnJheV9vYmplY3QgfCBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBPRVNfdmVydGV4X2FycmF5X29iamVjdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ1dFQkdMX2RyYXdfYnVmZmVycycsXG4gICAgdGhyb3dJZk5vdEZvdW5kPzogZmFsc2VcbiAgKTogV0VCR0xfZHJhd19idWZmZXJzIHwgbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ1dFQkdMX2RyYXdfYnVmZmVycycsXG4gICAgdGhyb3dJZk5vdEZvdW5kOiB0cnVlXG4gICk6IFdFQkdMX2RyYXdfYnVmZmVyczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oIG5hbWU6IHN0cmluZywgdGhyb3dJZk5vdEZvdW5kPzogYm9vbGVhbiApOiBXZWJHTEV4dGVuc2lvbiB8IG51bGw7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oIG5hbWU6IHN0cmluZywgdGhyb3dJZk5vdEZvdW5kPzogYm9vbGVhbiApOiBXZWJHTEV4dGVuc2lvbiB8IG51bGwge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKCB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbIG5hbWUgXSApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbIG5hbWUgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF0gPSBnbC5nZXRFeHRlbnNpb24oIG5hbWUgKTtcbiAgICAgIGlmICggdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF0gKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbIG5hbWUgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICggdGhyb3dJZk5vdEZvdW5kICkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvciggJ0dMQ2F0LmdldEV4dGVuc2lvbjogVGhlIGV4dGVuc2lvbiBcIicgKyBuYW1lICsgJ1wiIGlzIG5vdCBzdXBwb3J0ZWQnICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIGV4dGVuc2lvbnMuXG4gICAqIElmIHRoZXkgYXJlIHlvdXIgcHJlY2lvdXMgb25lcyBhbmQgeW91IGNhbm5vdCBsaXZlIHdpdGhvdXQgdGhlbSwgdHVybiBvbiBgdGhyb3dJZk5vdEZvdW5kYC5cbiAgICovXG4gIHB1YmxpYyBnZXRFeHRlbnNpb25zKCBuYW1lczogc3RyaW5nW10sIHRocm93SWZOb3RGb3VuZD86IGJvb2xlYW4gKTogQXJyYXk8V2ViR0xFeHRlbnNpb24gfCBudWxsPiB7XG4gICAgcmV0dXJuIG5hbWVzLm1hcCggKCBuICkgPT4gdGhpcy5nZXRFeHRlbnNpb24oIG4sIHRocm93SWZOb3RGb3VuZCApICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHNoYWRlciBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlU2hhZGVyKCB0eXBlOiBudW1iZXIgKTogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGNvbnN0IHNoYWRlciA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVTaGFkZXIoIHR5cGUgKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdFNoYWRlciggdGhpcywgc2hhZGVyICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IHByb2dyYW0gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVByb2dyYW0oKTogR0xDYXRQcm9ncmFtPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBjb25zdCBwcm9ncmFtID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVByb2dyYW0oKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdFByb2dyYW0oIHRoaXMsIHByb2dyYW0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXQgcHJvZ3JhbSBvYmplY3QsIGluIGxhemllciB3YXkuXG4gICAqL1xuICBwdWJsaWMgbGF6eVByb2dyYW0oIHZlcnQ6IHN0cmluZywgZnJhZzogc3RyaW5nICk6IEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4ge1xuICAgIGxldCB2ZXJ0ZXhTaGFkZXI6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZnJhZ21lbnRTaGFkZXI6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgcHJvZ3JhbTogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vID09IHZlcnQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHZlcnRleFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKCBHTF9WRVJURVhfU0hBREVSICk7XG4gICAgICB2ZXJ0ZXhTaGFkZXIuY29tcGlsZSggdmVydCApO1xuXG4gICAgICAvLyA9PSBmcmFnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKCBHTF9GUkFHTUVOVF9TSEFERVIgKTtcbiAgICAgIGZyYWdtZW50U2hhZGVyLmNvbXBpbGUoIGZyYWcgKTtcblxuICAgICAgLy8gPT0gcHJvZ3JhbSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgY29uc3QgcHJvZ3JhbSA9IHRoaXMuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgcHJvZ3JhbS5saW5rKCB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyICk7XG5cbiAgICAgIC8vID09IGFsbW9zdCBkb25lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHJldHVybiBwcm9ncmFtO1xuICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgcHJvZ3JhbT8uZGlzcG9zZSgpO1xuICAgICAgZnJhZ21lbnRTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHZlcnRleFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IHByb2dyYW0gb2JqZWN0LCBpbiBsYXppZXIgd2F5LlxuICAgKiBJdCdzIGdvbm5hIGJlIGFzeW5jaHJvbm91cyBpZiB5b3UgaGF2ZSB0aGUgS0hSX3BhcmFsbGVsX3NoYWRlcl9jb21waWxlIGV4dGVuc2lvbiBzdXBwb3J0LlxuICAgKi9cbiAgcHVibGljIGxhenlQcm9ncmFtQXN5bmMoIHZlcnQ6IHN0cmluZywgZnJhZzogc3RyaW5nICk6IFByb21pc2U8R0xDYXRQcm9ncmFtPFRDb250ZXh0Pj4ge1xuICAgIGxldCB2ZXJ0ZXhTaGFkZXI6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZnJhZ21lbnRTaGFkZXI6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgcHJvZ3JhbTogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vID09IHZlcnQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGNvbnN0IHZlcnRleFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKCBHTF9WRVJURVhfU0hBREVSICk7XG4gICAgICB2ZXJ0ZXhTaGFkZXIuY29tcGlsZSggdmVydCApO1xuXG4gICAgICAvLyA9PSBmcmFnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKCBHTF9GUkFHTUVOVF9TSEFERVIgKTtcbiAgICAgIGZyYWdtZW50U2hhZGVyLmNvbXBpbGUoIGZyYWcgKTtcblxuICAgICAgLy8gPT0gcHJvZ3JhbSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgY29uc3QgcHJvZ3JhbSA9IHRoaXMuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgcmV0dXJuIHByb2dyYW0ubGlua0FzeW5jKCB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyICkudGhlbiggKCkgPT4ge1xuICAgICAgICByZXR1cm4gcHJvZ3JhbTtcbiAgICAgIH0gKS5jYXRjaCggKCBlICkgPT4ge1xuICAgICAgICBwcm9ncmFtPy5kaXNwb3NlKCk7XG4gICAgICAgIGZyYWdtZW50U2hhZGVyPy5kaXNwb3NlKCk7XG4gICAgICAgIHZlcnRleFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoIGUgKTtcbiAgICAgIH0gKTtcbiAgICB9IGNhdGNoICggZSApIHtcbiAgICAgIHByb2dyYW0/LmRpc3Bvc2UoKTtcbiAgICAgIGZyYWdtZW50U2hhZGVyPy5kaXNwb3NlKCk7XG4gICAgICB2ZXJ0ZXhTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCggZSApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGEgcHJvZ3JhbSB0byB1c2UuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgdXNhZ2UgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIHVzZVByb2dyYW08VD4oXG4gICAgcHJvZ3JhbTogR0xDYXRQcm9ncmFtPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIHByb2dyYW06IEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJQcm9ncmFtLmJpbmQoIHByb2dyYW0sIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHZlcnRleCBidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQnVmZmVyKCk6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBjb25zdCBidWZmZXIgPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlQnVmZmVyKCkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRCdWZmZXIoIHRoaXMsIGJ1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSB2ZXJ0ZXggYnVmZmVyLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRWZXJ0ZXhCdWZmZXI8VD4oXG4gICAgYnVmZmVyOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCBidWZmZXI6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclZlcnRleEJ1ZmZlci5iaW5kKCBidWZmZXIsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhbiBpbmRleCBidWZmZXIuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZEluZGV4QnVmZmVyPFQ+KFxuICAgIGJ1ZmZlcjogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggYnVmZmVyOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJJbmRleEJ1ZmZlci5iaW5kKCBidWZmZXIsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHZlcnRleCBhcnJheS5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVWZXJ0ZXhBcnJheSgpOiBHTENhdFZlcnRleEFycmF5PFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGNvbnN0IHZlcnRleEFycmF5ID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVZlcnRleEFycmF5KCkgKTtcblxuICAgICAgcmV0dXJuIG5ldyBHTENhdFZlcnRleEFycmF5KCB0aGlzLCB2ZXJ0ZXhBcnJheSBhcyBhbnkgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5nZXRFeHRlbnNpb24oICdPRVNfdmVydGV4X2FycmF5X29iamVjdCcsIHRydWUgKTtcblxuICAgICAgY29uc3QgdmVydGV4QXJyYXkgPSBHTENhdC50aHJvd0lmTnVsbCggZXh0LmNyZWF0ZVZlcnRleEFycmF5T0VTKCkgKTtcblxuICAgICAgcmV0dXJuIG5ldyBHTENhdFZlcnRleEFycmF5KCB0aGlzLCB2ZXJ0ZXhBcnJheSBhcyBhbnkgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBvZiBgZ2wuYmluZFZlcnRleEFycmF5YC5cbiAgICpcbiAgICoge0BsaW5rIHJhd0JpbmRWZXJ0ZXhBcnJheX0gaXMgYmV0dGVyLlxuICAgKi9cbiAgcHVibGljIHJhd0JpbmRWZXJ0ZXhBcnJheSggYXJyYXk6IEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0PiB8IG51bGwgKTogdm9pZCB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSggYXJyYXkgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5nZXRFeHRlbnNpb24oICdPRVNfdmVydGV4X2FycmF5X29iamVjdCcsIHRydWUgKTtcbiAgICAgIGV4dC5iaW5kVmVydGV4QXJyYXlPRVMoIGFycmF5IGFzIGFueSApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgcmF3QmluZFZlcnRleEFycmF5fSBidXQgYmV0dGVyLlxuICAgKlxuICAgKiBCaW5kIGEgdmVydGV4IGFycmF5LlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRWZXJ0ZXhBcnJheTxUPihcbiAgICB2ZXJ0ZXhBcnJheTogR0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCB2ZXJ0ZXhBcnJheTogR0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJWZXJ0ZXhBcnJheS5iaW5kKCB2ZXJ0ZXhBcnJheSwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVUZXh0dXJlKCk6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgY29uc3QgdGV4dHVyZSA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVUZXh0dXJlKCkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRUZXh0dXJlKCB0aGlzLCB0ZXh0dXJlICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIDJEIHRleHR1cmUuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZFRleHR1cmUyRDxUPihcbiAgICB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclRleHR1cmUyRC5iaW5kKCB0ZXh0dXJlLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSBjdWJlbWFwIHRleHR1cmUuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZFRleHR1cmVDdWJlTWFwPFQ+KFxuICAgIHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyVGV4dHVyZUN1YmVNYXAuYmluZCggdGV4dHVyZSwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgcmVuZGVyYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVJlbmRlcmJ1ZmZlcigpOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgY29uc3QgcmVuZGVyYnVmZmVyID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpICk7XG5cbiAgICByZXR1cm4gbmV3IEdMQ2F0UmVuZGVyYnVmZmVyKCB0aGlzLCByZW5kZXJidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgcmVuZGVyYnVmZmVyLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRSZW5kZXJidWZmZXI8VD4oXG4gICAgcmVuZGVyYnVmZmVyOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCByZW5kZXJidWZmZXI6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclJlbmRlcmJ1ZmZlci5iaW5kKCByZW5kZXJidWZmZXIsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUZyYW1lYnVmZmVyKCk6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGNvbnN0IGZyYW1lYnVmZmVyID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZUZyYW1lYnVmZmVyKCkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRGcmFtZWJ1ZmZlciggdGhpcywgZnJhbWVidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgZnJhbWVidWZmZXIuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZEZyYW1lYnVmZmVyPFQ+KFxuICAgIGZyYW1lYnVmZmVyOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIGZyYW1lYnVmZmVyOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlckZyYW1lYnVmZmVyLmJpbmQoIGZyYW1lYnVmZmVyLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBmcmFtZWJ1ZmVyLCBpbiBsYXppZXIgd2F5LlxuICAgKi9cbiAgcHVibGljIGxhenlGcmFtZWJ1ZmZlcihcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHtcbiAgICAgIGlzRmxvYXQgPSBmYWxzZSxcbiAgICAgIGRlcHRoRm9ybWF0ID0gdGhpcy5wcmVmZXJyZWREZXB0aEZvcm1hdFxuICAgIH0gPSB7fVxuICApOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB7XG4gICAgbGV0IHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IHJlbmRlcmJ1ZmZlcjogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBmcmFtZWJ1ZmZlcjogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgLy8gPT0gZnJhbWVidWZmZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgZnJhbWVidWZmZXIgPSB0aGlzLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XG5cbiAgICAgIC8vID09IHJlbmRlcmJ1ZmZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHJlbmRlcmJ1ZmZlciA9IHRoaXMuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgICByZW5kZXJidWZmZXIucmVuZGVyYnVmZmVyU3RvcmFnZSggd2lkdGgsIGhlaWdodCwgeyBmb3JtYXQ6IGRlcHRoRm9ybWF0IH0gKTtcbiAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFJlbmRlcmJ1ZmZlciggcmVuZGVyYnVmZmVyLCB7IGF0dGFjaG1lbnQ6IEdMX0RFUFRIX0FUVEFDSE1FTlQgfSApO1xuXG4gICAgICAvLyA9PSB0ZXh0dXJlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICB0ZXh0dXJlID0gdGhpcy5jcmVhdGVUZXh0dXJlKCk7XG4gICAgICBpZiAoIGlzRmxvYXQgKSB7XG4gICAgICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21BcnJheShcbiAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICB7IGludGVybmFsZm9ybWF0OiBHTF9SR0JBMzJGLCBmb3JtYXQ6IEdMX1JHQkEsIHR5cGU6IEdMX0ZMT0FUIH1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21BcnJheSggd2lkdGgsIGhlaWdodCwgbnVsbCApO1xuICAgICAgfVxuICAgICAgZnJhbWVidWZmZXIuYXR0YWNoVGV4dHVyZSggdGV4dHVyZSApO1xuXG4gICAgICAvLyA9PSBhbG1vc3QgZG9uZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICByZXR1cm4gZnJhbWVidWZmZXI7XG4gICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICBmcmFtZWJ1ZmZlcj8uZGlzcG9zZSgpO1xuICAgICAgdGV4dHVyZT8uZGlzcG9zZSgpO1xuICAgICAgcmVuZGVyYnVmZmVyPy5kaXNwb3NlKCk7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgbXVsdGlzYW1wbGUgZnJhbWVidWZmZXIsIGluIGxhemllciB3YXkuXG4gICAqL1xuICBwdWJsaWMgbGF6eU11bHRpc2FtcGxlRnJhbWVidWZmZXIoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB7XG4gICAgICBzYW1wbGVzID0gNCxcbiAgICAgIGlzRmxvYXQgPSBmYWxzZSxcbiAgICAgIGRlcHRoRm9ybWF0ID0gdGhpcy5wcmVmZXJyZWREZXB0aEZvcm1hdCxcbiAgICAgIGZhbGxiYWNrV2ViR0wxID0gdHJ1ZVxuICAgIH0gPSB7fVxuICApOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGxldCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgICAgbGV0IHJlbmRlcmJ1ZmZlckRlcHRoOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgICBsZXQgcmVuZGVyYnVmZmVyQ29sb3I6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICAgIGxldCBmcmFtZWJ1ZmZlcjogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vID09IGZyYW1lYnVmZmVyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIGZyYW1lYnVmZmVyID0gdGhpcy5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuXG4gICAgICAgIC8vID09IHJlbmRlcmJ1ZmZlciBkZXB0aCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIHJlbmRlcmJ1ZmZlckRlcHRoID0gdGhpcy5jcmVhdGVSZW5kZXJidWZmZXIoKTtcbiAgICAgICAgcmVuZGVyYnVmZmVyRGVwdGgucmVuZGVyYnVmZmVyU3RvcmFnZU11bHRpc2FtcGxlKFxuICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICB7IHNhbXBsZXMsIGZvcm1hdDogZGVwdGhGb3JtYXQgfVxuICAgICAgICApO1xuICAgICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlckRlcHRoLCB7IGF0dGFjaG1lbnQ6IEdMX0RFUFRIX0FUVEFDSE1FTlQgfSApO1xuXG4gICAgICAgIC8vID09IHJlbmRlcmJ1ZmZlciBjb2xvciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIGNvbnN0IHJlbmRlcmJ1ZmZlckNvbG9yID0gdGhpcy5jcmVhdGVSZW5kZXJidWZmZXIoKTtcbiAgICAgICAgY29uc3QgY29sb3JGb3JtYXQgPSBpc0Zsb2F0ID8gR0xfUkdCQTMyRiA6IEdMX1JHQkE4O1xuICAgICAgICByZW5kZXJidWZmZXJDb2xvci5yZW5kZXJidWZmZXJTdG9yYWdlTXVsdGlzYW1wbGUoXG4gICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgIHsgc2FtcGxlcywgZm9ybWF0OiBjb2xvckZvcm1hdCB9XG4gICAgICAgICk7XG4gICAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFJlbmRlcmJ1ZmZlciggcmVuZGVyYnVmZmVyQ29sb3IsIHsgYXR0YWNobWVudDogR0xfQ09MT1JfQVRUQUNITUVOVDAgfSApO1xuXG4gICAgICAgIC8vID09IGFsbW9zdCBkb25lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIHJldHVybiBmcmFtZWJ1ZmZlcjtcbiAgICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgICBmcmFtZWJ1ZmZlcj8uZGlzcG9zZSgpO1xuICAgICAgICB0ZXh0dXJlPy5kaXNwb3NlKCk7XG4gICAgICAgIHJlbmRlcmJ1ZmZlckNvbG9yPy5kaXNwb3NlKCk7XG4gICAgICAgIHJlbmRlcmJ1ZmZlckRlcHRoPy5kaXNwb3NlKCk7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICggZmFsbGJhY2tXZWJHTDEgKSB7XG4gICAgICByZXR1cm4gdGhpcy5sYXp5RnJhbWVidWZmZXIoIHdpZHRoLCBoZWlnaHQsIHsgaXNGbG9hdCB9ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEdMQ2F0RXJyb3JzLldlYkdMMkV4Y2x1c2l2ZUVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgZHJhdyBidWZmZXJzLCBpbiBsYXppZXIgd2F5LlxuICAgKiBJZiB5b3UgY2FuJ3QgZ3JhYiBgV0VCR0xfZHJhd19idWZmZXJzYCBleHRlbnNpb24sIHlvdSdsbCBkaWUgaW5zdGFudGx5IGF0IHRoaXMgcG9pbnQuXG4gICAqL1xuICBwdWJsaWMgbGF6eURyYXdidWZmZXJzKFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgbnVtQnVmZmVyczogbnVtYmVyLFxuICAgIHtcbiAgICAgIGlzRmxvYXQgPSBmYWxzZSxcbiAgICAgIGRlcHRoRm9ybWF0ID0gdGhpcy5wcmVmZXJyZWREZXB0aEZvcm1hdFxuICAgIH0gPSB7fVxuICApOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB7XG4gICAgaWYgKCBHTF9NQVhfRFJBV19CVUZGRVJTIDwgbnVtQnVmZmVycyApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvciggJ0dMQ2F0OiBNYXhpbXVtIGRyYXcgYnVmZmVycyBjb3VudCBleGNlZWRlZCcgKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0dXJlczogR0xDYXRUZXh0dXJlPFRDb250ZXh0PltdID0gW107XG4gICAgbGV0IHJlbmRlcmJ1ZmZlcjogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBmcmFtZWJ1ZmZlcjogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgLy8gPT0gZnJhbWVidWZmZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgZnJhbWVidWZmZXIgPSB0aGlzLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XG5cbiAgICAgIC8vID09IHJlbmRlcmJ1ZmZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGNvbnN0IHJlbmRlcmJ1ZmZlciA9IHRoaXMuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgICByZW5kZXJidWZmZXIucmVuZGVyYnVmZmVyU3RvcmFnZSggd2lkdGgsIGhlaWdodCwgeyBmb3JtYXQ6IGRlcHRoRm9ybWF0IH0gKTtcbiAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFJlbmRlcmJ1ZmZlciggcmVuZGVyYnVmZmVyLCB7IGF0dGFjaG1lbnQ6IEdMX0RFUFRIX0FUVEFDSE1FTlQgfSApO1xuXG4gICAgICAvLyA9PSB0ZXh0dXJlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBudW1CdWZmZXJzOyBpICsrICkge1xuICAgICAgICBjb25zdCB0ZXh0dXJlID0gdGhpcy5jcmVhdGVUZXh0dXJlKCk7XG4gICAgICAgIGlmICggaXNGbG9hdCApIHtcbiAgICAgICAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkoXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICB7IGludGVybmFsZm9ybWF0OiBHTF9SR0JBMzJGLCBmb3JtYXQ6IEdMX1JHQkEsIHR5cGU6IEdMX0ZMT0FUIH1cbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21BcnJheSggd2lkdGgsIGhlaWdodCwgbnVsbCApO1xuICAgICAgICB9XG4gICAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFRleHR1cmUoIHRleHR1cmUsIHsgYXR0YWNobWVudDogR0xfQ09MT1JfQVRUQUNITUVOVDAgKyBpIH0gKTtcbiAgICAgIH1cblxuICAgICAgLy8gPT0gYWxtb3N0IGRvbmUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgcmV0dXJuIGZyYW1lYnVmZmVyO1xuICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgdGV4dHVyZXMuZm9yRWFjaCggKCB0ZXh0dXJlICkgPT4ge1xuICAgICAgICB0ZXh0dXJlLmRpc3Bvc2UoKTtcbiAgICAgIH0gKTtcbiAgICAgIHJlbmRlcmJ1ZmZlcj8uZGlzcG9zZSgpO1xuICAgICAgZnJhbWVidWZmZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgb2YgYGdsLmRyYXdCdWZmZXJzYC5cbiAgICpcbiAgICoge0BsaW5rIGRyYXdCdWZmZXJzfSBpcyBiZXR0ZXIuXG4gICAqL1xuICBwdWJsaWMgcmF3RHJhd0J1ZmZlcnMoIGJ1ZmZlcnM6IEdMZW51bVtdICk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKCBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBnbC5kcmF3QnVmZmVycyggYnVmZmVycyApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHQgPSB0aGlzLmdldEV4dGVuc2lvbiggJ1dFQkdMX2RyYXdfYnVmZmVycycgKTtcbiAgICAgIGV4dD8uZHJhd0J1ZmZlcnNXRUJHTCggYnVmZmVycyApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgcmF3RHJhd0J1ZmZlcnN9IGJ1dCBiZXR0ZXIuXG4gICAqXG4gICAqIENhbGwgdGhpcyBiZWZvcmUgeW91J3JlIGdvbm5hIHVzZSBkcmF3IGJ1ZmZlcnMuXG4gICAqIElmIHlvdSBjYW4ndCBncmFiIGBXRUJHTF9kcmF3X2J1ZmZlcnNgIGV4dGVuc2lvbiwgeW91J2xsIGRpZSBpbnN0YW50bHkgYXQgdGhpcyBwb2ludC5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBkcmF3IGJ1ZmZlcnMgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGRyYXdCdWZmZXJzPFQ+KFxuICAgIGJ1ZmZlcnNPck51bUJ1ZmZlcnM/OiBHTGVudW1bXSB8IG51bWJlcixcbiAgICBjYWxsYmFjaz86ICggYnVmZmVyczogR0xlbnVtW10gKSA9PiBUXG4gICk6IFQge1xuICAgIGxldCBidWZmZXJzOiBHTGVudW1bXTtcblxuICAgIGlmICggQXJyYXkuaXNBcnJheSggYnVmZmVyc09yTnVtQnVmZmVycyApICkge1xuICAgICAgYnVmZmVycyA9IGJ1ZmZlcnNPck51bUJ1ZmZlcnM7XG4gICAgfSBlbHNlIGlmICggYnVmZmVyc09yTnVtQnVmZmVycyApIHtcbiAgICAgIGJ1ZmZlcnMgPSBbXTtcbiAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGJ1ZmZlcnNPck51bUJ1ZmZlcnM7IGkgKysgKSB7XG4gICAgICAgIGJ1ZmZlcnNbIGkgXSA9IEdMX0NPTE9SX0FUVEFDSE1FTlQwICsgaTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYnVmZmVycyA9IFsgR0xfQ09MT1JfQVRUQUNITUVOVDAgXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJEcmF3QnVmZmVycy5iaW5kKCBidWZmZXJzLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIGEgd3JhcHBlciBvZiBkcmF3RWxlbWVudHNJbnN0YW5jZWQuXG4gICAqL1xuICBwdWJsaWMgZHJhd0FycmF5c0luc3RhbmNlZChcbiAgICBtb2RlOiBHTGVudW0sXG4gICAgZmlyc3Q6IEdMaW50LFxuICAgIGNvdW50OiBHTHNpemVpLFxuICAgIHByaW1jb3VudDogR0xzaXplaVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xuXG4gICAgaWYgKCBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBnbC5kcmF3QXJyYXlzSW5zdGFuY2VkKCBtb2RlLCBmaXJzdCwgY291bnQsIHByaW1jb3VudCApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHQgPSB0aGlzLmdldEV4dGVuc2lvbiggJ0FOR0xFX2luc3RhbmNlZF9hcnJheXMnLCB0cnVlICk7XG4gICAgICBleHQuZHJhd0FycmF5c0luc3RhbmNlZEFOR0xFKCBtb2RlLCBmaXJzdCwgY291bnQsIHByaW1jb3VudCApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhIHdyYXBwZXIgb2YgZHJhd0VsZW1lbnRzSW5zdGFuY2VkLlxuICAgKi9cbiAgcHVibGljIGRyYXdFbGVtZW50c0luc3RhbmNlZChcbiAgICBtb2RlOiBHTGVudW0sXG4gICAgY291bnQ6IEdMc2l6ZWksXG4gICAgdHlwZTogR0xlbnVtLFxuICAgIG9mZnNldDogR0xpbnRwdHIsXG4gICAgaW5zdGFuY2VDb3VudDogR0xzaXplaVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xuXG4gICAgaWYgKCBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBnbC5kcmF3RWxlbWVudHNJbnN0YW5jZWQoIG1vZGUsIGNvdW50LCB0eXBlLCBvZmZzZXQsIGluc3RhbmNlQ291bnQgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5nZXRFeHRlbnNpb24oICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJywgdHJ1ZSApO1xuICAgICAgZXh0LmRyYXdFbGVtZW50c0luc3RhbmNlZEFOR0xFKCBtb2RlLCBjb3VudCwgdHlwZSwgb2Zmc2V0LCBpbnN0YW5jZUNvdW50ICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBjdXJyZW50IGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGNsZWFyKFxuICAgIHJlZCA9IDAuMCxcbiAgICBncmVlbiA9IDAuMCxcbiAgICBibHVlID0gMC4wLFxuICAgIGFscGhhID0gMS4wLFxuICAgIGRlcHRoID0gMS4wXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgZ2wuY2xlYXJDb2xvciggcmVkLCBncmVlbiwgYmx1ZSwgYWxwaGEgKTtcbiAgICBnbC5jbGVhckRlcHRoKCBkZXB0aCApO1xuICAgIGdsLmNsZWFyKCBHTF9DT0xPUl9CVUZGRVJfQklUIHwgR0xfREVQVEhfQlVGRkVSX0JJVCApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJhc2ljYWxseSBqdXN0IGEgYGdsLmJsaXRGcmFtZWJ1ZmZlcmAuXG4gICAqL1xuICBwdWJsaWMgYmxpdEZyYW1lYnVmZmVyKFxuICAgIHNyYzogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIGRzdDogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIHtcbiAgICAgIHNyY1ZpZXdwb3J0ID0gWyAwLCAwLCBzcmM/LnJlbmRlcmJ1ZmZlcj8ud2lkdGggPz8gMCwgc3JjPy5yZW5kZXJidWZmZXI/LmhlaWdodCA/PyAwIF0sXG4gICAgICBkc3RWaWV3cG9ydCA9IFsgMCwgMCwgZHN0Py5yZW5kZXJidWZmZXI/LndpZHRoID8/IDAsIGRzdD8ucmVuZGVyYnVmZmVyPy5oZWlnaHQgPz8gMCBdLFxuICAgICAgbWFzayA9IEdMX0NPTE9SX0JVRkZFUl9CSVQsXG4gICAgICBmaWx0ZXIgPSBHTF9ORUFSRVNUXG4gICAgfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKCBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBnbC5iaW5kRnJhbWVidWZmZXIoIEdMX1JFQURfRlJBTUVCVUZGRVIsIHNyYz8ucmF3ID8/IG51bGwgKTtcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlciggR0xfRFJBV19GUkFNRUJVRkZFUiwgZHN0Py5yYXcgPz8gbnVsbCApO1xuICAgICAgZ2wuYmxpdEZyYW1lYnVmZmVyKFxuICAgICAgICBzcmNWaWV3cG9ydFsgMCBdLFxuICAgICAgICBzcmNWaWV3cG9ydFsgMSBdLFxuICAgICAgICBzcmNWaWV3cG9ydFsgMiBdLFxuICAgICAgICBzcmNWaWV3cG9ydFsgMyBdLFxuICAgICAgICBkc3RWaWV3cG9ydFsgMCBdLFxuICAgICAgICBkc3RWaWV3cG9ydFsgMSBdLFxuICAgICAgICBkc3RWaWV3cG9ydFsgMiBdLFxuICAgICAgICBkc3RWaWV3cG9ydFsgMyBdLFxuICAgICAgICBtYXNrLFxuICAgICAgICBmaWx0ZXJcbiAgICAgICk7XG4gICAgICBnbC5iaW5kRnJhbWVidWZmZXIoIEdMX1JFQURfRlJBTUVCVUZGRVIsIG51bGwgKTtcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlciggR0xfRFJBV19GUkFNRUJVRkZFUiwgbnVsbCApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBHTENhdEVycm9ycy5XZWJHTDJFeGNsdXNpdmVFcnJvcjtcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVlPLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQztBQUkvQixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUM7QUFtQnhCLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDO0FBRWhDLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDO0FBZ0NwQyxNQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FBQztBQUl2QyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztBQUNqQyxNQUFNLHdCQUF3QixHQUFHLE1BQU0sQ0FBQztBQTJFeEMsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUM7QUFFbkMsTUFBTSxtQkFBbUIsR0FBRyxVQUFVLENBQUM7QUFHdkMsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUM7QUFPcEMsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDO0FBRTdCLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDO0FBb0NuQyxNQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQztBQU9uQyxNQUFNLHVCQUF1QixHQUFHLE1BQU0sQ0FBQztBQUl2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QUcsSUFBSSxDQUFDLGtCQUFrQixDQUFFLElBQUksQ0FBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFFLElBQUksRUFBRTtZQUM3QixFQUFFLENBQUMsVUFBVSxDQUFFLFFBQVEsRUFBRSxLQUFLLENBQUUsQ0FBQztTQUNsQyxDQUFFLENBQUM7S0FDTDs7OztJQUtNLFVBQVUsQ0FBRSxJQUFZLEVBQUUsS0FBZ0I7UUFDL0MsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFFLElBQUksQ0FBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFFLElBQUksRUFBRTtZQUM3QixFQUFFLENBQUMsVUFBVSxDQUFFLFFBQVEsRUFBRSxLQUFLLENBQUUsQ0FBQztTQUNsQyxDQUFFLENBQUM7S0FDTDs7OztJQUtNLFVBQVUsQ0FBRSxJQUFZLEVBQUUsS0FBZ0I7UUFDL0MsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFFLElBQUksQ0FBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFFLElBQUksRUFBRTtZQUM3QixFQUFFLENBQUMsVUFBVSxDQUFFLFFBQVEsRUFBRSxLQUFLLENBQUUsQ0FBQztTQUNsQyxDQUFFLENBQUM7S0FDTDs7OztJQUtNLFVBQVUsQ0FBRSxJQUFZLEVBQUUsS0FBZ0I7UUFDL0MsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFFLElBQUksQ0FBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFFLElBQUksRUFBRTtZQUM3QixFQUFFLENBQUMsVUFBVSxDQUFFLFFBQVEs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
