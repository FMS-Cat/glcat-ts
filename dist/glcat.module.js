/*!
* @fms-cat/glcat-ts v0.14.1
* WebGL wrapper with plenty of hackability
*
* Copyright (c) 2018-2021 FMS_Cat
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
const GL_DEPTH_COMPONENT24 = 0x81a6;
const GL_DEPTH_TEST = 0x0b71;
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
const GL_R16F = 0x822d;
const GL_R32F = 0x822e;
const GL_READ_FRAMEBUFFER = 0x8ca8;
const GL_RENDERBUFFER = 0x8d41;
const GL_RGBA = 0x1908;
const GL_RGBA16F = 0x881a;
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
const GL_TRANSFORM_FEEDBACK = 0x8e22;
const GL_UNSIGNED_BYTE = 0x1401;
const GL_VERTEX_SHADER = 0x8b31;

const GLCatErrors = {
    get UnexpectedNullError() {
        const error = new Error('GLCat: Unexpected null detected');
        error.name = 'UnexpectedNullError';
        return error;
    },
    get WebGL2ExclusiveError() {
        const error = new Error('GLCat: Attempted to use WebGL2 exclusive stuff');
        error.name = 'WebGL2ExclusiveError';
        return error;
    }
};

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
    link(shaders, options = {}) {
        var _a;
        const { gl } = this.__glCat;
        shaders.forEach((shader) => gl.attachShader(this.__program, shader.raw));
        if (options.transformFeedbackVaryings) {
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
                gl.transformFeedbackVaryings(this.__program, options.transformFeedbackVaryings, (_a = options.transformFeedbackBufferMode) !== null && _a !== void 0 ? _a : gl.SEPARATE_ATTRIBS);
            }
            else {
                throw GLCatErrors.WebGL2ExclusiveError;
            }
        }
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
    linkAsync(shaders, options = {}) {
        var _a;
        const glCat = this.__glCat;
        const { gl } = this.__glCat;
        const extParallel = glCat.getExtension('KHR_parallel_shader_compile');
        shaders.forEach((shader) => gl.attachShader(this.__program, shader.raw));
        if (options.transformFeedbackVaryings) {
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
                gl.transformFeedbackVaryings(this.__program, options.transformFeedbackVaryings, (_a = options.transformFeedbackBufferMode) !== null && _a !== void 0 ? _a : gl.SEPARATE_ATTRIBS);
            }
            else {
                throw GLCatErrors.WebGL2ExclusiveError;
            }
        }
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
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
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
    setVertexbuffer(source, usage = GL_STATIC_DRAW) {
        const { gl } = this.__glCat;
        this.__glCat.bindVertexBuffer(this, () => {
            gl.bufferData(GL_ARRAY_BUFFER, source, usage); // this sucks
        });
    }
    setIndexbuffer(source, usage = GL_STATIC_DRAW) {
        const { gl } = this.__glCat;
        this.__glCat.bindIndexBuffer(this, () => {
            gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, source, usage); // this sucks
        });
    }
}

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
    renderbufferStorageMultisample(width, height, { samples = this.__glCat.preferredMultisampleSamples, format = this.__glCat.preferredDepthFormat, fallbackWebGL1 = true } = {}) {
        const { gl } = this.__glCat;
        this.__glCat.bindRenderbuffer(this, () => {
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
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
        if (typeof WebGL2RenderingContext === 'function' &&
            gl instanceof WebGL2RenderingContext) {
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
        if (typeof WebGL2RenderingContext === 'function' &&
            gl instanceof WebGL2RenderingContext) {
            // Ref: https://github.com/mrdoob/three.js/pull/15502/files
            if (internalformat === GL_R16F
                || internalformat === GL_R32F
                || internalformat === GL_RGBA16F
                || internalformat === GL_RGBA32F) {
                this.__glCat.getExtension('EXT_color_buffer_float', true);
                this.__glCat.getExtension('EXT_float_blend');
                this.__glCat.getExtension('OES_texture_float_linear');
            }
        }
        else {
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
 * It's a WebGLTransformFeedback.
 */
class GLCatTransformFeedback {
    /**
     * Create a new GLCatTransformFeedback instance.
     */
    constructor(glCat, transformFeedback) {
        this.__glCat = glCat;
        this.__transformFeedback = transformFeedback;
    }
    /**
     * Its own transform feedback.
     */
    get transformFeedback() {
        return this.__transformFeedback;
    }
    /**
     * Its own transform feedback. Shorter than {@link transformFeedback}.
     */
    get raw() {
        return this.__transformFeedback;
    }
    /**
     * Dispose the transform feedback.
     */
    dispose() {
        const { gl } = this.__glCat;
        if (typeof WebGL2RenderingContext === 'function' &&
            gl instanceof WebGL2RenderingContext) {
            gl.deleteTransformFeedback(this.__transformFeedback);
        }
    }
    /**
     * Bind a buffer to this transform feedback.
     */
    bindBuffer(index, buffer) {
        const { gl } = this.__glCat;
        if (typeof WebGL2RenderingContext === 'function' &&
            gl instanceof WebGL2RenderingContext) {
            this.__glCat.bindTransformFeedback(this, () => {
                var _a;
                gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, index, (_a = buffer === null || buffer === void 0 ? void 0 : buffer.buffer) !== null && _a !== void 0 ? _a : null);
            });
        }
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
        if (typeof WebGL2RenderingContext === 'function' &&
            gl instanceof WebGL2RenderingContext) {
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
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
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
        this.__bindHelperTransformFeedback = new BindHelper(null, (buffer) => {
            var _a;
            const gl = this.__gl;
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
                gl.bindTransformFeedback(GL_TRANSFORM_FEEDBACK, (_a = buffer === null || buffer === void 0 ? void 0 : buffer.raw) !== null && _a !== void 0 ? _a : null);
            }
            else {
                throw GLCatErrors.WebGL2ExclusiveError;
            }
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
        if (typeof WebGL2RenderingContext === 'function' &&
            gl instanceof WebGL2RenderingContext) {
            this.preferredDepthFormat = GL_DEPTH_COMPONENT24;
        }
        else {
            this.preferredDepthFormat = GL_DEPTH_COMPONENT16;
        }
    }
    static throwIfNull(v) {
        if (v == null) {
            throw GLCatErrors.UnexpectedNullError;
        }
        else {
            return v;
        }
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
    lazyProgram(vert, frag, options = {}) {
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
            program.link([vertexShader, fragmentShader], options);
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
    lazyProgramAsync(vert, frag, options = {}) {
        try {
            // == vert ===================================================================================
            const vertexShader = this.createShader(GL_VERTEX_SHADER);
            vertexShader.compile(vert);
            // == frag ===================================================================================
            const fragmentShader = this.createShader(GL_FRAGMENT_SHADER);
            fragmentShader.compile(frag);
            // == program ================================================================================
            const program = this.createProgram();
            return program.linkAsync([vertexShader, fragmentShader], options).then(() => {
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
     * Create a new transform feedback.
     */
    createTransformFeedback() {
        const gl = this.__gl;
        if (typeof WebGL2RenderingContext === 'function' &&
            gl instanceof WebGL2RenderingContext) {
            const transformFeedback = GLCat.throwIfNull(gl.createTransformFeedback());
            return new GLCatTransformFeedback(this, transformFeedback);
        }
        else {
            throw GLCatErrors.WebGL2ExclusiveError;
        }
    }
    /**
     * Bind a transform feedback.
     * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
     */
    bindTransformFeedback(transformFeedback, callback) {
        return this.__bindHelperTransformFeedback.bind(transformFeedback, callback);
    }
    /**
     * Create a new vertex array.
     */
    createVertexArray() {
        const gl = this.__gl;
        if (typeof WebGL2RenderingContext === 'function' &&
            gl instanceof WebGL2RenderingContext) {
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
        if (typeof WebGL2RenderingContext === 'function' &&
            gl instanceof WebGL2RenderingContext) {
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
        if (typeof WebGL2RenderingContext === 'function' &&
            gl instanceof WebGL2RenderingContext) {
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
        if (typeof WebGL2RenderingContext === 'function' &&
            gl instanceof WebGL2RenderingContext) {
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
        if (typeof WebGL2RenderingContext === 'function' &&
            gl instanceof WebGL2RenderingContext) {
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
        if (typeof WebGL2RenderingContext === 'function' &&
            gl instanceof WebGL2RenderingContext) {
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
        if (typeof WebGL2RenderingContext === 'function' &&
            gl instanceof WebGL2RenderingContext) {
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
export { GLCat, GLCatBuffer, GLCatFramebuffer, GLCatProgram, GLCatRenderbuffer, GLCatShader, GLCatTexture, GLCatTransformFeedback, GLCatVertexArray };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xjYXQubW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvR0xDb25zdGFudHMudHMiLCIuLi9zcmMvR0xDYXRFcnJvcnMudHMiLCIuLi9zcmMvR0xDYXRQcm9ncmFtLnRzIiwiLi4vc3JjL3V0aWxzL0JpbmRIZWxwZXIudHMiLCIuLi9zcmMvR0xDYXRCdWZmZXIudHMiLCIuLi9zcmMvR0xDYXRGcmFtZWJ1ZmZlci50cyIsIi4uL3NyYy9HTENhdFJlbmRlcmJ1ZmZlci50cyIsIi4uL3NyYy9HTENhdFNoYWRlci50cyIsIi4uL3NyYy9HTENhdFRleHR1cmUudHMiLCIuLi9zcmMvR0xDYXRUcmFuc2Zvcm1GZWVkYmFjay50cyIsIi4uL3NyYy9HTENhdFZlcnRleEFycmF5LnRzIiwiLi4vc3JjL0dMQ2F0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBHTF9BQ1RJVkVfQVRUUklCVVRFUyA9IDB4OGI4OTtcbmV4cG9ydCBjb25zdCBHTF9BQ1RJVkVfVEVYVFVSRSA9IDB4ODRlMDtcbmV4cG9ydCBjb25zdCBHTF9BQ1RJVkVfVU5JRk9STV9CTE9DS1MgPSAweDhhMzY7XG5leHBvcnQgY29uc3QgR0xfQUNUSVZFX1VOSUZPUk1TID0gMHg4Yjg2O1xuZXhwb3J0IGNvbnN0IEdMX0FMSUFTRURfTElORV9XSURUSF9SQU5HRSA9IDB4ODQ2ZTtcbmV4cG9ydCBjb25zdCBHTF9BTElBU0VEX1BPSU5UX1NJWkVfUkFOR0UgPSAweDg0NmQ7XG5leHBvcnQgY29uc3QgR0xfQUxQSEEgPSAweDE5MDY7XG5leHBvcnQgY29uc3QgR0xfQUxQSEFfQklUUyA9IDB4MGQ1NTtcbmV4cG9ydCBjb25zdCBHTF9BTFJFQURZX1NJR05BTEVEID0gMHg5MTFhO1xuZXhwb3J0IGNvbnN0IEdMX0FMV0FZUyA9IDB4MDIwNztcbmV4cG9ydCBjb25zdCBHTF9BTllfU0FNUExFU19QQVNTRUQgPSAweDhjMmY7XG5leHBvcnQgY29uc3QgR0xfQU5ZX1NBTVBMRVNfUEFTU0VEX0NPTlNFUlZBVElWRSA9IDB4OGQ2YTtcbmV4cG9ydCBjb25zdCBHTF9BUlJBWV9CVUZGRVIgPSAweDg4OTI7XG5leHBvcnQgY29uc3QgR0xfQVJSQVlfQlVGRkVSX0JJTkRJTkcgPSAweDg4OTQ7XG5leHBvcnQgY29uc3QgR0xfQVRUQUNIRURfU0hBREVSUyA9IDB4OGI4NTtcbmV4cG9ydCBjb25zdCBHTF9CQUNLID0gMHgwNDA1O1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EID0gMHgwYmUyO1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX0NPTE9SID0gMHg4MDA1O1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX0RTVF9BTFBIQSA9IDB4ODBjYTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9EU1RfUkdCID0gMHg4MGM4O1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX0VRVUFUSU9OID0gMHg4MDA5O1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX0VRVUFUSU9OX0FMUEhBID0gMHg4ODNkO1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX0VRVUFUSU9OX1JHQiA9IDB4ODAwOTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9TUkNfQUxQSEEgPSAweDgwY2I7XG5leHBvcnQgY29uc3QgR0xfQkxFTkRfU1JDX1JHQiA9IDB4ODBjOTtcbmV4cG9ydCBjb25zdCBHTF9CTFVFX0JJVFMgPSAweDBkNTQ7XG5leHBvcnQgY29uc3QgR0xfQk9PTCA9IDB4OGI1NjtcbmV4cG9ydCBjb25zdCBHTF9CT09MX1ZFQzIgPSAweDhiNTc7XG5leHBvcnQgY29uc3QgR0xfQk9PTF9WRUMzID0gMHg4YjU4O1xuZXhwb3J0IGNvbnN0IEdMX0JPT0xfVkVDNCA9IDB4OGI1OTtcbmV4cG9ydCBjb25zdCBHTF9CUk9XU0VSX0RFRkFVTFRfV0VCR0wgPSAweDkyNDQ7XG5leHBvcnQgY29uc3QgR0xfQlVGRkVSX1NJWkUgPSAweDg3NjQ7XG5leHBvcnQgY29uc3QgR0xfQlVGRkVSX1VTQUdFID0gMHg4NzY1O1xuZXhwb3J0IGNvbnN0IEdMX0JZVEUgPSAweDE0MDA7XG5leHBvcnQgY29uc3QgR0xfQ0NXID0gMHgwOTAxO1xuZXhwb3J0IGNvbnN0IEdMX0NMQU1QX1RPX0VER0UgPSAweDgxMmY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1IgPSAweDE4MDA7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDAgPSAweDhjZTA7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDBfV0VCR0wgPSAweDhjZTA7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDEgPSAweDhjZTE7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDFfV0VCR0wgPSAweDhjZTE7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDEwID0gMHg4Y2VhO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMF9XRUJHTCA9IDB4OGNlYTtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTEgPSAweDhjZWI7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDExX1dFQkdMID0gMHg4Y2ViO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMiA9IDB4OGNlYztcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTJfV0VCR0wgPSAweDhjZWM7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDEzID0gMHg4Y2VkO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxM19XRUJHTCA9IDB4OGNlZDtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTQgPSAweDhjZWU7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDE0X1dFQkdMID0gMHg4Y2VlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxNSA9IDB4OGNlZjtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTVfV0VCR0wgPSAweDhjZWY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDIgPSAweDhjZTI7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDJfV0VCR0wgPSAweDhjZTI7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDMgPSAweDhjZTM7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDNfV0VCR0wgPSAweDhjZTM7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDQgPSAweDhjZTQ7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDRfV0VCR0wgPSAweDhjZTQ7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDUgPSAweDhjZTU7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDVfV0VCR0wgPSAweDhjZTU7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDYgPSAweDhjZTY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDZfV0VCR0wgPSAweDhjZTY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDcgPSAweDhjZTc7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDdfV0VCR0wgPSAweDhjZTc7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDggPSAweDhjZTg7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDhfV0VCR0wgPSAweDhjZTg7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDkgPSAweDhjZTk7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDlfV0VCR0wgPSAweDhjZTk7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQlVGRkVSX0JJVCA9IDB4MDAwMDQwMDA7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQ0xFQVJfVkFMVUUgPSAweDBjMjI7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfV1JJVEVNQVNLID0gMHgwYzIzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBBUkVfUkVGX1RPX1RFWFRVUkUgPSAweDg4NGU7XG5leHBvcnQgY29uc3QgR0xfQ09NUElMRV9TVEFUVVMgPSAweDhiODE7XG5leHBvcnQgY29uc3QgR0xfQ09NUExFVElPTl9TVEFUVVNfS0hSID0gMHg5MWIxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUjExX0VBQyA9IDB4OTI3MDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHMTFfRUFDID0gMHg5MjcyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCX0FUQ19XRUJHTCA9IDB4OGM5MjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQl9FVEMxX1dFQkdMID0gMHg4ZDY0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCX1BWUlRDXzJCUFBWMV9JTUcgPSAweDhjMDE7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JfUFZSVENfNEJQUFYxX0lNRyA9IDB4OGMwMDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQl9TM1RDX0RYVDFfRVhUID0gMHg4M2YwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCOF9FVEMyID0gMHg5Mjc0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCOF9QVU5DSFRIUk9VR0hfQUxQSEExX0VUQzIgPSAweDkyNzg7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfMTBYMTBfS0hSID0gMHg5M2JiO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEwWDVfS0hSID0gMHg5M2I4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEwWDZfS0hSID0gMHg5M2I5O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEwWDhfS0hSID0gMHg5M2JhO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEyWDEwX0tIUiA9IDB4OTNiYztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMlgxMl9LSFIgPSAweDkzYmQ7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfNFg0X0tIUiA9IDB4OTNiMDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ181WDRfS0hSID0gMHg5M2IxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzVYNV9LSFIgPSAweDkzYjI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfNlg1X0tIUiA9IDB4OTNiMztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ182WDZfS0hSID0gMHg5M2I0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzhYNV9LSFIgPSAweDkzYjU7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfOFg2X0tIUiA9IDB4OTNiNjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ184WDhfS0hSID0gMHg5M2I3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BVENfRVhQTElDSVRfQUxQSEFfV0VCR0wgPSAweDhjOTI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FUQ19JTlRFUlBPTEFURURfQUxQSEFfV0VCR0wgPSAweDg3ZWU7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX1BWUlRDXzJCUFBWMV9JTUcgPSAweDhjMDM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX1BWUlRDXzRCUFBWMV9JTUcgPSAweDhjMDI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUMV9FWFQgPSAweDgzZjE7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUM19FWFQgPSAweDgzZjI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUNV9FWFQgPSAweDgzZjM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBOF9FVEMyX0VBQyA9IDB4OTI3NTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NJR05FRF9SMTFfRUFDID0gMHg5MjcxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU0lHTkVEX1JHMTFfRUFDID0gMHg5MjczO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQl9BTFBIQV9TM1RDX0RYVDFfRVhUID0gMHg4YzRkO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQl9BTFBIQV9TM1RDX0RYVDNfRVhUID0gMHg4YzRlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQl9BTFBIQV9TM1RDX0RYVDVfRVhUID0gMHg4YzRmO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQl9TM1RDX0RYVDFfRVhUID0gMHg4YzRjO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTBYMTBfS0hSID0gMHg5M2RiO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTBYNV9LSFIgPSAweDkzZDg7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ18xMFg2X0tIUiA9IDB4OTNkOTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEwWDhfS0hSID0gMHg5M2RhO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTJYMTBfS0hSID0gMHg5M2RjO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTJYMTJfS0hSID0gMHg5M2RkO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfNFg0X0tIUiA9IDB4OTNkMDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzVYNF9LSFIgPSAweDkzZDE7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ181WDVfS0hSID0gMHg5M2QyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfNlg1X0tIUiA9IDB4OTNkMztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzZYNl9LSFIgPSAweDkzZDQ7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ184WDVfS0hSID0gMHg5M2Q1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfOFg2X0tIUiA9IDB4OTNkNjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzhYOF9LSFIgPSAweDkzZDc7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfRVRDMl9FQUMgPSAweDkyNzc7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9FVEMyID0gMHg5Mjc2O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfUFVOQ0hUSFJPVUdIX0FMUEhBMV9FVEMyID0gMHg5Mjc5O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfVEVYVFVSRV9GT1JNQVRTID0gMHg4NmEzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTkRJVElPTl9TQVRJU0ZJRUQgPSAweDkxMWM7XG5leHBvcnQgY29uc3QgR0xfQ09OU1RBTlRfQUxQSEEgPSAweDgwMDM7XG5leHBvcnQgY29uc3QgR0xfQ09OU1RBTlRfQ09MT1IgPSAweDgwMDE7XG5leHBvcnQgY29uc3QgR0xfQ09OVEVYVF9MT1NUX1dFQkdMID0gMHg5MjQyO1xuZXhwb3J0IGNvbnN0IEdMX0NPUFlfUkVBRF9CVUZGRVIgPSAweDhmMzY7XG5leHBvcnQgY29uc3QgR0xfQ09QWV9SRUFEX0JVRkZFUl9CSU5ESU5HID0gMHg4ZjM2O1xuZXhwb3J0IGNvbnN0IEdMX0NPUFlfV1JJVEVfQlVGRkVSID0gMHg4ZjM3O1xuZXhwb3J0IGNvbnN0IEdMX0NPUFlfV1JJVEVfQlVGRkVSX0JJTkRJTkcgPSAweDhmMzc7XG5leHBvcnQgY29uc3QgR0xfQ1VMTF9GQUNFID0gMHgwYjQ0O1xuZXhwb3J0IGNvbnN0IEdMX0NVTExfRkFDRV9NT0RFID0gMHgwYjQ1O1xuZXhwb3J0IGNvbnN0IEdMX0NVUlJFTlRfUFJPR1JBTSA9IDB4OGI4ZDtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1FVRVJZID0gMHg4ODY1O1xuZXhwb3J0IGNvbnN0IEdMX0NVUlJFTlRfUVVFUllfRVhUID0gMHg4ODY1O1xuZXhwb3J0IGNvbnN0IEdMX0NVUlJFTlRfVkVSVEVYX0FUVFJJQiA9IDB4ODYyNjtcbmV4cG9ydCBjb25zdCBHTF9DVyA9IDB4MDkwMDtcbmV4cG9ydCBjb25zdCBHTF9ERUNSID0gMHgxZTAzO1xuZXhwb3J0IGNvbnN0IEdMX0RFQ1JfV1JBUCA9IDB4ODUwODtcbmV4cG9ydCBjb25zdCBHTF9ERUxFVEVfU1RBVFVTID0gMHg4YjgwO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIID0gMHgxODAxO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0FUVEFDSE1FTlQgPSAweDhkMDA7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQklUUyA9IDB4MGQ1NjtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9CVUZGRVJfQklUID0gMHgwMDAwMDEwMDtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9DTEVBUl9WQUxVRSA9IDB4MGI3MztcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9DT01QT05FTlQgPSAweDE5MDI7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ09NUE9ORU5UMTYgPSAweDgxYTU7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ09NUE9ORU5UMjQgPSAweDgxYTY7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ09NUE9ORU5UMzJGID0gMHg4Y2FjO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0ZVTkMgPSAweDBiNzQ7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfUkFOR0UgPSAweDBiNzA7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfU1RFTkNJTCA9IDB4ODRmOTtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9TVEVOQ0lMX0FUVEFDSE1FTlQgPSAweDgyMWE7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfVEVTVCA9IDB4MGI3MTtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9XUklURU1BU0sgPSAweDBiNzI7XG5leHBvcnQgY29uc3QgR0xfREVQVEgyNF9TVEVOQ0lMOCA9IDB4ODhmMDtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSDMyRl9TVEVOQ0lMOCA9IDB4OGNhZDtcbmV4cG9ydCBjb25zdCBHTF9ESVRIRVIgPSAweDBiZDA7XG5leHBvcnQgY29uc3QgR0xfRE9OVF9DQVJFID0gMHgxMTAwO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMCA9IDB4ODgyNTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjBfV0VCR0wgPSAweDg4MjU7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxID0gMHg4ODI2O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMV9XRUJHTCA9IDB4ODgyNjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEwID0gMHg4ODJmO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTBfV0VCR0wgPSAweDg4MmY7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMSA9IDB4ODgzMDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjExX1dFQkdMID0gMHg4ODMwO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTIgPSAweDg4MzE7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMl9XRUJHTCA9IDB4ODgzMTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEzID0gMHg4ODMyO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTNfV0VCR0wgPSAweDg4MzI7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxNCA9IDB4ODgzMztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjE0X1dFQkdMID0gMHg4ODMzO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTUgPSAweDg4MzQ7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxNV9XRUJHTCA9IDB4ODgzNDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjIgPSAweDg4Mjc7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIyX1dFQkdMID0gMHg4ODI3O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMyA9IDB4ODgyODtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjNfV0VCR0wgPSAweDg4Mjg7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI0ID0gMHg4ODI5O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNF9XRUJHTCA9IDB4ODgyOTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjUgPSAweDg4MmE7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI1X1dFQkdMID0gMHg4ODJhO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNiA9IDB4ODgyYjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjZfV0VCR0wgPSAweDg4MmI7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI3ID0gMHg4ODJjO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSN19XRUJHTCA9IDB4ODgyYztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjggPSAweDg4MmQ7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI4X1dFQkdMID0gMHg4ODJkO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSOSA9IDB4ODgyZTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjlfV0VCR0wgPSAweDg4MmU7XG5leHBvcnQgY29uc3QgR0xfRFJBV19GUkFNRUJVRkZFUiA9IDB4OGNhOTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0ZSQU1FQlVGRkVSX0JJTkRJTkcgPSAweDhjYTY7XG5leHBvcnQgY29uc3QgR0xfRFNUX0FMUEhBID0gMHgwMzA0O1xuZXhwb3J0IGNvbnN0IEdMX0RTVF9DT0xPUiA9IDB4MDMwNjtcbmV4cG9ydCBjb25zdCBHTF9EWU5BTUlDX0NPUFkgPSAweDg4ZWE7XG5leHBvcnQgY29uc3QgR0xfRFlOQU1JQ19EUkFXID0gMHg4OGU4O1xuZXhwb3J0IGNvbnN0IEdMX0RZTkFNSUNfUkVBRCA9IDB4ODhlOTtcbmV4cG9ydCBjb25zdCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiA9IDB4ODg5MztcbmV4cG9ydCBjb25zdCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUl9CSU5ESU5HID0gMHg4ODk1O1xuZXhwb3J0IGNvbnN0IEdMX0VRVUFMID0gMHgwMjAyO1xuZXhwb3J0IGNvbnN0IEdMX0ZBU1RFU1QgPSAweDExMDE7XG5leHBvcnQgY29uc3QgR0xfRkxPQVQgPSAweDE0MDY7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfMzJfVU5TSUdORURfSU5UXzI0XzhfUkVWID0gMHg4ZGFkO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDIgPSAweDhiNWE7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUMlgzID0gMHg4YjY1O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDJYNCA9IDB4OGI2NjtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQzID0gMHg4YjViO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDNYMiA9IDB4OGI2NztcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQzWDQgPSAweDhiNjg7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUNCA9IDB4OGI1YztcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQ0WDIgPSAweDhiNjk7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUNFgzID0gMHg4YjZhO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX1ZFQzIgPSAweDhiNTA7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfVkVDMyA9IDB4OGI1MTtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9WRUM0ID0gMHg4YjUyO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQUdNRU5UX1NIQURFUiA9IDB4OGIzMDtcbmV4cG9ydCBjb25zdCBHTF9GUkFHTUVOVF9TSEFERVJfREVSSVZBVElWRV9ISU5UID0gMHg4YjhiO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQUdNRU5UX1NIQURFUl9ERVJJVkFUSVZFX0hJTlRfT0VTID0gMHg4YjhiO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSID0gMHg4ZDQwO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfQUxQSEFfU0laRSA9IDB4ODIxNTtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0JMVUVfU0laRSA9IDB4ODIxNDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0NPTE9SX0VOQ09ESU5HID0gMHg4MjEwO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfQ09MT1JfRU5DT0RJTkdfRVhUID0gMHg4MjEwO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfQ09NUE9ORU5UX1RZUEUgPSAweDgyMTE7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9DT01QT05FTlRfVFlQRV9FWFQgPSAweDgyMTE7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9ERVBUSF9TSVpFID0gMHg4MjE2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfR1JFRU5fU0laRSA9IDB4ODIxMztcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX09CSkVDVF9OQU1FID0gMHg4Y2QxO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfT0JKRUNUX1RZUEUgPSAweDhjZDA7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9SRURfU0laRSA9IDB4ODIxMjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX1NURU5DSUxfU0laRSA9IDB4ODIxNztcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX1RFWFRVUkVfQ1VCRV9NQVBfRkFDRSA9IDB4OGNkMztcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX1RFWFRVUkVfTEFZRVIgPSAweDhjZDQ7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0xFVkVMID0gMHg4Y2QyO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0JJTkRJTkcgPSAweDhjYTY7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQ09NUExFVEUgPSAweDhjZDU7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfREVGQVVMVCA9IDB4ODIxODtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX0FUVEFDSE1FTlQgPSAweDhjZDY7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfSU5DT01QTEVURV9ESU1FTlNJT05TID0gMHg4Y2Q5O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTUlTU0lOR19BVFRBQ0hNRU5UID0gMHg4Y2Q3O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTVVMVElTQU1QTEUgPSAweDhkNTY7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfVU5TVVBQT1JURUQgPSAweDhjZGQ7XG5leHBvcnQgY29uc3QgR0xfRlJPTlQgPSAweDA0MDQ7XG5leHBvcnQgY29uc3QgR0xfRlJPTlRfQU5EX0JBQ0sgPSAweDA0MDg7XG5leHBvcnQgY29uc3QgR0xfRlJPTlRfRkFDRSA9IDB4MGI0NjtcbmV4cG9ydCBjb25zdCBHTF9GVU5DX0FERCA9IDB4ODAwNjtcbmV4cG9ydCBjb25zdCBHTF9GVU5DX1JFVkVSU0VfU1VCVFJBQ1QgPSAweDgwMGI7XG5leHBvcnQgY29uc3QgR0xfRlVOQ19TVUJTVFJBQ1QgPSAweDgwMGE7XG5leHBvcnQgY29uc3QgR0xfR0VORVJBVEVfTUlQTUFQX0hJTlQgPSAweDgxOTI7XG5leHBvcnQgY29uc3QgR0xfR0VRVUFMID0gMHgwMjA2O1xuZXhwb3J0IGNvbnN0IEdMX0dQVV9ESVNKT0lOVF9FWFQgPSAweDhmYmI7XG5leHBvcnQgY29uc3QgR0xfR1JFQVRFUiA9IDB4MDIwNDtcbmV4cG9ydCBjb25zdCBHTF9HUkVFTl9CSVRTID0gMHgwZDUzO1xuZXhwb3J0IGNvbnN0IEdMX0hBTEZfRkxPQVQgPSAweDE0MGI7XG5leHBvcnQgY29uc3QgR0xfSEFMRl9GTE9BVF9PRVMgPSAweDhkNjE7XG5leHBvcnQgY29uc3QgR0xfSElHSF9GTE9BVCA9IDB4OGRmMjtcbmV4cG9ydCBjb25zdCBHTF9ISUdIX0lOVCA9IDB4OGRmNTtcbmV4cG9ydCBjb25zdCBHTF9JTVBMRU1FTlRBVElPTl9DT0xPUl9SRUFEX0ZPUk1BVCA9IDB4OGI5YjtcbmV4cG9ydCBjb25zdCBHTF9JTVBMRU1FTlRBVElPTl9DT0xPUl9SRUFEX1RZUEUgPSAweDhiOWE7XG5leHBvcnQgY29uc3QgR0xfSU5DUiA9IDB4MWUwMjtcbmV4cG9ydCBjb25zdCBHTF9JTkNSX1dSQVAgPSAweDg1MDc7XG5leHBvcnQgY29uc3QgR0xfSU5UID0gMHgxNDA0O1xuZXhwb3J0IGNvbnN0IEdMX0lOVF8yXzEwXzEwXzEwX1JFViA9IDB4OGQ5ZjtcbmV4cG9ydCBjb25zdCBHTF9JTlRfU0FNUExFUl8yRCA9IDB4OGRjYTtcbmV4cG9ydCBjb25zdCBHTF9JTlRfU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRjZjtcbmV4cG9ydCBjb25zdCBHTF9JTlRfU0FNUExFUl8zRCA9IDB4OGRjYjtcbmV4cG9ydCBjb25zdCBHTF9JTlRfU0FNUExFUl9DVUJFID0gMHg4ZGNjO1xuZXhwb3J0IGNvbnN0IEdMX0lOVF9WRUMyID0gMHg4YjUzO1xuZXhwb3J0IGNvbnN0IEdMX0lOVF9WRUMzID0gMHg4YjU0O1xuZXhwb3J0IGNvbnN0IEdMX0lOVF9WRUM0ID0gMHg4YjU1O1xuZXhwb3J0IGNvbnN0IEdMX0lOVEVSTEVBVkVEX0FUVFJJQlMgPSAweDhjOGM7XG5leHBvcnQgY29uc3QgR0xfSU5WQUxJRF9FTlVNID0gMHgwNTAwO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfRlJBTUVCVUZGRVJfT1BFUkFUSU9OID0gMHgwNTA2O1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfSU5ERVggPSAweGZmZmZmZmZmO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfT1BFUkFUSU9OID0gMHgwNTAyO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfVkFMVUUgPSAweDA1MDE7XG5leHBvcnQgY29uc3QgR0xfSU5WRVJUID0gMHgxNTBhO1xuZXhwb3J0IGNvbnN0IEdMX0tFRVAgPSAweDFlMDA7XG5leHBvcnQgY29uc3QgR0xfTEVRVUFMID0gMHgwMjAzO1xuZXhwb3J0IGNvbnN0IEdMX0xFU1MgPSAweDAyMDE7XG5leHBvcnQgY29uc3QgR0xfTElORV9MT09QID0gMHgwMDAyO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVfU1RSSVAgPSAweDAwMDM7XG5leHBvcnQgY29uc3QgR0xfTElORV9XSURUSCA9IDB4MGIyMTtcbmV4cG9ydCBjb25zdCBHTF9MSU5FQVIgPSAweDI2MDE7XG5leHBvcnQgY29uc3QgR0xfTElORUFSX01JUE1BUF9MSU5FQVIgPSAweDI3MDM7XG5leHBvcnQgY29uc3QgR0xfTElORUFSX01JUE1BUF9ORUFSRVNUID0gMHgyNzAxO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVTID0gMHgwMDAxO1xuZXhwb3J0IGNvbnN0IEdMX0xJTktfU1RBVFVTID0gMHg4YjgyO1xuZXhwb3J0IGNvbnN0IEdMX0xPV19GTE9BVCA9IDB4OGRmMDtcbmV4cG9ydCBjb25zdCBHTF9MT1dfSU5UID0gMHg4ZGYzO1xuZXhwb3J0IGNvbnN0IEdMX0xVTUlOQU5DRSA9IDB4MTkwOTtcbmV4cG9ydCBjb25zdCBHTF9MVU1JTkFOQ0VfQUxQSEEgPSAweDE5MGE7XG5leHBvcnQgY29uc3QgR0xfTUFYID0gMHg4MDA4O1xuZXhwb3J0IGNvbnN0IEdMX01BWF8zRF9URVhUVVJFX1NJWkUgPSAweDgwNzM7XG5leHBvcnQgY29uc3QgR0xfTUFYX0FSUkFZX1RFWFRVUkVfTEFZRVJTID0gMHg4OGZmO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DTElFTlRfV0FJVF9USU1FT1VUX1dFQkdMID0gMHg5MjQ3O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DT0xPUl9BVFRBQ0hNRU5UUyA9IDB4OGNkZjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ09MT1JfQVRUQUNITUVOVFNfV0VCR0wgPSAweDhjZGY7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTUJJTkVEX0ZSQUdNRU5UX1VOSUZPUk1fQ09NUE9ORU5UUyA9IDB4OGEzMztcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ09NQklORURfVEVYVFVSRV9JTUFHRV9VTklUUyA9IDB4OGI0ZDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ09NQklORURfVU5JRk9STV9CTE9DS1MgPSAweDhhMmU7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTUJJTkVEX1ZFUlRFWF9VTklGT1JNX0NPTVBPTkVOVFMgPSAweDhhMzE7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NVQkVfTUFQX1RFWFRVUkVfU0laRSA9IDB4ODUxYztcbmV4cG9ydCBjb25zdCBHTF9NQVhfRFJBV19CVUZGRVJTID0gMHg4ODI0O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9EUkFXX0JVRkZFUlNfV0VCR0wgPSAweDg4MjQ7XG5leHBvcnQgY29uc3QgR0xfTUFYX0VMRU1FTlRfSU5ERVggPSAweDhkNmI7XG5leHBvcnQgY29uc3QgR0xfTUFYX0VMRU1FTlRTX0lORElDRVMgPSAweDgwZTk7XG5leHBvcnQgY29uc3QgR0xfTUFYX0VMRU1FTlRTX1ZFUlRJQ0VTID0gMHg4MGU4O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FWFQgPSAweDgwMDg7XG5leHBvcnQgY29uc3QgR0xfTUFYX0ZSQUdNRU5UX0lOUFVUX0NPTVBPTkVOVFMgPSAweDkxMjU7XG5leHBvcnQgY29uc3QgR0xfTUFYX0ZSQUdNRU5UX1VOSUZPUk1fQkxPQ0tTID0gMHg4YTJkO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9VTklGT1JNX0NPTVBPTkVOVFMgPSAweDhiNDk7XG5leHBvcnQgY29uc3QgR0xfTUFYX0ZSQUdNRU5UX1VOSUZPUk1fVkVDVE9SUyA9IDB4OGRmZDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfUFJPR1JBTV9URVhFTF9PRkZTRVQgPSAweDg5MDU7XG5leHBvcnQgY29uc3QgR0xfTUFYX1JFTkRFUkJVRkZFUl9TSVpFID0gMHg4NGU4O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9TQU1QTEVTID0gMHg4ZDU3O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9TRVJWRVJfV0FJVF9USU1FT1VUID0gMHg5MTExO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9URVhUVVJFX0lNQUdFX1VOSVRTID0gMHg4ODcyO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9URVhUVVJFX0xPRF9CSUFTID0gMHg4NGZkO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9URVhUVVJFX01BWF9BTklTT1RST1BZX0VYVCA9IDB4ODRmZjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9TSVpFID0gMHgwZDMzO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9UUkFOU0ZPUk1fRkVFREJBQ0tfSU5URVJMRUFWRURfQ09NUE9ORU5UUyA9IDB4OGM4YTtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVFJBTlNGT1JNX0ZFRURCQUNLX1NFUEFSQVRFX0FUVFJJQlMgPSAweDhjOGI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1RSQU5TRk9STV9GRUVEQkFDS19TRVBBUkFURV9DT01QT05FTlRTID0gMHg4YzgwO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9VTklGT1JNX0JMT0NLX1NJWkUgPSAweDhhMzA7XG5leHBvcnQgY29uc3QgR0xfTUFYX1VOSUZPUk1fQlVGRkVSX0JJTkRJTkdTID0gMHg4YTJmO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WQVJZSU5HX0NPTVBPTkVOVFMgPSAweDhiNGI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZBUllJTkdfVkVDVE9SUyA9IDB4OGRmYztcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkVSVEVYX0FUVFJJQlMgPSAweDg4Njk7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9PVVRQVVRfQ09NUE9ORU5UUyA9IDB4OTEyMjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkVSVEVYX1RFWFRVUkVfSU1BR0VfVU5JVFMgPSAweDhiNGM7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9VTklGT1JNX0JMT0NLUyA9IDB4OGEyYjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkVSVEVYX1VOSUZPUk1fQ09NUE9ORU5UUyA9IDB4OGI0YTtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkVSVEVYX1VOSUZPUk1fVkVDVE9SUyA9IDB4OGRmYjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVklFV1BPUlRfRElNUyA9IDB4MGQzYTtcbmV4cG9ydCBjb25zdCBHTF9NRURJVU1fRkxPQVQgPSAweDhkZjE7XG5leHBvcnQgY29uc3QgR0xfTUVESVVNX0lOVCA9IDB4OGRmNDtcbmV4cG9ydCBjb25zdCBHTF9NSU4gPSAweDgwMDc7XG5leHBvcnQgY29uc3QgR0xfTUlOX0VYVCA9IDB4ODAwNztcbmV4cG9ydCBjb25zdCBHTF9NSU5fUFJPR1JBTV9URVhFTF9PRkZTRVQgPSAweDg5MDQ7XG5leHBvcnQgY29uc3QgR0xfTUlSUk9SRURfUkVQRUFUID0gMHg4MzcwO1xuZXhwb3J0IGNvbnN0IEdMX05FQVJFU1QgPSAweDI2MDA7XG5leHBvcnQgY29uc3QgR0xfTkVBUkVTVF9NSVBNQVBfTElORUFSID0gMHgyNzAyO1xuZXhwb3J0IGNvbnN0IEdMX05FQVJFU1RfTUlQTUFQX05FQVJFU1QgPSAweDI3MDA7XG5leHBvcnQgY29uc3QgR0xfTkVWRVIgPSAweDAyMDA7XG5leHBvcnQgY29uc3QgR0xfTklDRVNUID0gMHgxMTAyO1xuZXhwb3J0IGNvbnN0IEdMX05PX0VSUk9SID0gMDtcbmV4cG9ydCBjb25zdCBHTF9OT05FID0gMDtcbmV4cG9ydCBjb25zdCBHTF9OT1RFUVVBTCA9IDB4MDIwNTtcbmV4cG9ydCBjb25zdCBHTF9PQkpFQ1RfVFlQRSA9IDB4OTExMjtcbmV4cG9ydCBjb25zdCBHTF9PTkUgPSAxO1xuZXhwb3J0IGNvbnN0IEdMX09ORV9NSU5VU19DT05TVEFOVF9BTFBIQSA9IDB4ODAwNDtcbmV4cG9ydCBjb25zdCBHTF9PTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1IgPSAweDgwMDI7XG5leHBvcnQgY29uc3QgR0xfT05FX01JTlVTX0RTVF9BTFBIQSA9IDB4MDMwNTtcbmV4cG9ydCBjb25zdCBHTF9PTkVfTUlOVVNfRFNUX0NPTE9SID0gMHgwMzA3O1xuZXhwb3J0IGNvbnN0IEdMX09ORV9NSU5VU19TUkNfQUxQSEEgPSAweDAzMDM7XG5leHBvcnQgY29uc3QgR0xfT05FX01JTlVTX1NSQ19DT0xPUiA9IDB4MDMwMTtcbmV4cG9ydCBjb25zdCBHTF9PVVRfT0ZfTUVNT1JZID0gMHgwNTA1O1xuZXhwb3J0IGNvbnN0IEdMX1BBQ0tfQUxJR05NRU5UID0gMHgwZDA1O1xuZXhwb3J0IGNvbnN0IEdMX1BBQ0tfUk9XX0xFTkdUSCA9IDB4MGQwMjtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX1NLSVBfUElYRUxTID0gMHgwZDA0O1xuZXhwb3J0IGNvbnN0IEdMX1BBQ0tfU0tJUF9ST1dTID0gMHgwZDAzO1xuZXhwb3J0IGNvbnN0IEdMX1BJWEVMX1BBQ0tfQlVGRkVSID0gMHg4OGViO1xuZXhwb3J0IGNvbnN0IEdMX1BJWEVMX1BBQ0tfQlVGRkVSX0JJTkRJTkcgPSAweDg4ZWQ7XG5leHBvcnQgY29uc3QgR0xfUElYRUxfVU5QQUNLX0JVRkZFUiA9IDB4ODhlYztcbmV4cG9ydCBjb25zdCBHTF9QSVhFTF9VTlBBQ0tfQlVGRkVSX0JJTkRJTkcgPSAweDg4ZWY7XG5leHBvcnQgY29uc3QgR0xfUE9JTlRTID0gMHgwMDAwO1xuZXhwb3J0IGNvbnN0IEdMX1BPTFlHT05fT0ZGU0VUX0ZBQ1RPUiA9IDB4ODAzODtcbmV4cG9ydCBjb25zdCBHTF9QT0xZR09OX09GRlNFVF9GSUxMID0gMHg4MDM3O1xuZXhwb3J0IGNvbnN0IEdMX1BPTFlHT05fT0ZGU0VUX1VOSVRTID0gMHgyYTAwO1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX0NPVU5URVJfQklUU19FWFQgPSAweDg4NjQ7XG5leHBvcnQgY29uc3QgR0xfUVVFUllfUkVTVUxUID0gMHg4ODY2O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVF9BVkFJTEFCTEUgPSAweDg4Njc7XG5leHBvcnQgY29uc3QgR0xfUVVFUllfUkVTVUxUX0FWQUlMQUJMRV9FWFQgPSAweDg4Njc7XG5leHBvcnQgY29uc3QgR0xfUVVFUllfUkVTVUxUX0VYVCA9IDB4ODg2NjtcbmV4cG9ydCBjb25zdCBHTF9SMTFGX0cxMUZfQjEwRiA9IDB4OGMzYTtcbmV4cG9ydCBjb25zdCBHTF9SMTZGID0gMHg4MjJkO1xuZXhwb3J0IGNvbnN0IEdMX1IxNkkgPSAweDgyMzM7XG5leHBvcnQgY29uc3QgR0xfUjE2VUkgPSAweDgyMzQ7XG5leHBvcnQgY29uc3QgR0xfUjMyRiA9IDB4ODIyZTtcbmV4cG9ydCBjb25zdCBHTF9SMzJJID0gMHg4MjM1O1xuZXhwb3J0IGNvbnN0IEdMX1IzMlVJID0gMHg4MjM2O1xuZXhwb3J0IGNvbnN0IEdMX1I4ID0gMHg4MjI5O1xuZXhwb3J0IGNvbnN0IEdMX1I4X1NOT1JNID0gMHg4Zjk0O1xuZXhwb3J0IGNvbnN0IEdMX1I4SSA9IDB4ODIzMTtcbmV4cG9ydCBjb25zdCBHTF9SOFVJID0gMHg4MjMyO1xuZXhwb3J0IGNvbnN0IEdMX1JBU1RFUklaRVJfRElTQ0FSRCA9IDB4OGM4OTtcbmV4cG9ydCBjb25zdCBHTF9SRUFEX0JVRkZFUiA9IDB4MGMwMjtcbmV4cG9ydCBjb25zdCBHTF9SRUFEX0ZSQU1FQlVGRkVSID0gMHg4Y2E4O1xuZXhwb3J0IGNvbnN0IEdMX1JFQURfRlJBTUVCVUZGRVJfQklORElORyA9IDB4OGNhYTtcbmV4cG9ydCBjb25zdCBHTF9SRUQgPSAweDE5MDM7XG5leHBvcnQgY29uc3QgR0xfUkVEX0JJVFMgPSAweDBkNTI7XG5leHBvcnQgY29uc3QgR0xfUkVEX0lOVEVHRVIgPSAweDhkOTQ7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSID0gMHg4ZDQxO1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9BTFBIQV9TSVpFID0gMHg4ZDUzO1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9CSU5ESU5HID0gMHg4Y2E3O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9CTFVFX1NJWkUgPSAweDhkNTI7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX0RFUFRIX1NJWkUgPSAweDhkNTQ7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX0dSRUVOX1NJWkUgPSAweDhkNTE7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX0hFSUdIVCA9IDB4OGQ0MztcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfSU5URVJOQUxfRk9STUFUID0gMHg4ZDQ0O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9SRURfU0laRSA9IDB4OGQ1MDtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfU0FNUExFUyA9IDB4OGNhYjtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfU1RFTkNJTF9TSVpFID0gMHg4ZDU1O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9XSURUSCA9IDB4OGQ0MjtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJFUiA9IDB4MWYwMTtcbmV4cG9ydCBjb25zdCBHTF9SRVBFQVQgPSAweDI5MDE7XG5leHBvcnQgY29uc3QgR0xfUkVQTEFDRSA9IDB4MWUwMTtcbmV4cG9ydCBjb25zdCBHTF9SRyA9IDB4ODIyNztcbmV4cG9ydCBjb25zdCBHTF9SR19JTlRFR0VSID0gMHg4MjI4O1xuZXhwb3J0IGNvbnN0IEdMX1JHMTZGID0gMHg4MjJmO1xuZXhwb3J0IGNvbnN0IEdMX1JHMTZJID0gMHg4MjM5O1xuZXhwb3J0IGNvbnN0IEdMX1JHMTZVSSA9IDB4ODIzYTtcbmV4cG9ydCBjb25zdCBHTF9SRzMyRiA9IDB4ODIzMDtcbmV4cG9ydCBjb25zdCBHTF9SRzMySSA9IDB4ODIzYjtcbmV4cG9ydCBjb25zdCBHTF9SRzMyVUkgPSAweDgyM2M7XG5leHBvcnQgY29uc3QgR0xfUkc4ID0gMHg4MjJiO1xuZXhwb3J0IGNvbnN0IEdMX1JHOF9TTk9STSA9IDB4OGY5NTtcbmV4cG9ydCBjb25zdCBHTF9SRzhJID0gMHg4MjM3O1xuZXhwb3J0IGNvbnN0IEdMX1JHOFVJID0gMHg4MjM4O1xuZXhwb3J0IGNvbnN0IEdMX1JHQiA9IDB4MTkwNztcbmV4cG9ydCBjb25zdCBHTF9SR0JfSU5URUdFUiA9IDB4OGQ5ODtcbmV4cG9ydCBjb25zdCBHTF9SR0IxMF9BMiA9IDB4ODA1OTtcbmV4cG9ydCBjb25zdCBHTF9SR0IxMF9BMlVJID0gMHg5MDZmO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjE2RiA9IDB4ODgxYjtcbmV4cG9ydCBjb25zdCBHTF9SR0IxNkkgPSAweDhkODk7XG5leHBvcnQgY29uc3QgR0xfUkdCMTZVSSA9IDB4OGQ3NztcbmV4cG9ydCBjb25zdCBHTF9SR0IzMkYgPSAweDg4MTU7XG5leHBvcnQgY29uc3QgR0xfUkdCMzJGX0VYVCA9IDB4ODgxNTtcbmV4cG9ydCBjb25zdCBHTF9SR0IzMkkgPSAweDhkODM7XG5leHBvcnQgY29uc3QgR0xfUkdCMzJVSSA9IDB4OGQ3MTtcbmV4cG9ydCBjb25zdCBHTF9SR0I1X0ExID0gMHg4MDU3O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjU2NSA9IDB4OGQ2MjtcbmV4cG9ydCBjb25zdCBHTF9SR0I4ID0gMHg4MDUxO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjhfU05PUk0gPSAweDhmOTY7XG5leHBvcnQgY29uc3QgR0xfUkdCOEkgPSAweDhkOGY7XG5leHBvcnQgY29uc3QgR0xfUkdCOFVJID0gMHg4ZDdkO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjlfRTUgPSAweDhjM2Q7XG5leHBvcnQgY29uc3QgR0xfUkdCQSA9IDB4MTkwODtcbmV4cG9ydCBjb25zdCBHTF9SR0JBX0lOVEVHRVIgPSAweDhkOTk7XG5leHBvcnQgY29uc3QgR0xfUkdCQTE2RiA9IDB4ODgxYTtcbmV4cG9ydCBjb25zdCBHTF9SR0JBMTZJID0gMHg4ZDg4O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkExNlVJID0gMHg4ZDc2O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEzMkYgPSAweDg4MTQ7XG5leHBvcnQgY29uc3QgR0xfUkdCQTMyRl9FWFQgPSAweDg4MTQ7XG5leHBvcnQgY29uc3QgR0xfUkdCQTMySSA9IDB4OGQ4MjtcbmV4cG9ydCBjb25zdCBHTF9SR0JBMzJVSSA9IDB4OGQ3MDtcbmV4cG9ydCBjb25zdCBHTF9SR0JBNCA9IDB4ODA1NjtcbmV4cG9ydCBjb25zdCBHTF9SR0JBOCA9IDB4ODA1ODtcbmV4cG9ydCBjb25zdCBHTF9SR0JBOF9TTk9STSA9IDB4OGY5NztcbmV4cG9ydCBjb25zdCBHTF9SR0JBOEkgPSAweDhkOGU7XG5leHBvcnQgY29uc3QgR0xfUkdCQThVSSA9IDB4OGQ3YztcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVfQUxQSEFfVE9fQ09WRVJBR0UgPSAweDgwOWU7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFX0JVRkZFUlMgPSAweDgwYTg7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFX0NPVkVSQUdFID0gMHg4MGEwO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9DT1ZFUkFHRV9JTlZFUlQgPSAweDgwYWI7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFX0NPVkVSQUdFX1ZBTFVFID0gMHg4MGFhO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRVJfMkQgPSAweDhiNWU7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRjMTtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSXzJEX0FSUkFZX1NIQURPVyA9IDB4OGRjNDtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSXzJEX1NIQURPVyA9IDB4OGI2MjtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSXzNEID0gMHg4YjVmO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRVJfQklORElORyA9IDB4ODkxOTtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSX0NVQkUgPSAweDhiNjA7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl9DVUJFX1NIQURPVyA9IDB4OGRjNTtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVTID0gMHg4MGE5O1xuZXhwb3J0IGNvbnN0IEdMX1NDSVNTT1JfQk9YID0gMHgwYzEwO1xuZXhwb3J0IGNvbnN0IEdMX1NDSVNTT1JfVEVTVCA9IDB4MGMxMTtcbmV4cG9ydCBjb25zdCBHTF9TRVBBUkFURV9BVFRSSUJTID0gMHg4YzhkO1xuZXhwb3J0IGNvbnN0IEdMX1NIQURFUl9UWVBFID0gMHg4YjRmO1xuZXhwb3J0IGNvbnN0IEdMX1NIQURJTkdfTEFOR1VBR0VfVkVSU0lPTiA9IDB4OGI4YztcbmV4cG9ydCBjb25zdCBHTF9TSE9SVCA9IDB4MTQwMjtcbmV4cG9ydCBjb25zdCBHTF9TSUdOQUxFRCA9IDB4OTExOTtcbmV4cG9ydCBjb25zdCBHTF9TSUdORURfTk9STUFMSVpFRCA9IDB4OGY5YztcbmV4cG9ydCBjb25zdCBHTF9TUkNfQUxQSEEgPSAweDAzMDI7XG5leHBvcnQgY29uc3QgR0xfU1JDX0FMUEhBX1NBVFVSQVRFID0gMHgwMzA4O1xuZXhwb3J0IGNvbnN0IEdMX1NSQ19DT0xPUiA9IDB4MDMwMDtcbmV4cG9ydCBjb25zdCBHTF9TUkdCID0gMHg4YzQwO1xuZXhwb3J0IGNvbnN0IEdMX1NSR0JfQUxQSEFfRVhUID0gMHg4YzQyO1xuZXhwb3J0IGNvbnN0IEdMX1NSR0JfRVhUID0gMHg4YzQwO1xuZXhwb3J0IGNvbnN0IEdMX1NSR0I4ID0gMHg4YzQxO1xuZXhwb3J0IGNvbnN0IEdMX1NSR0I4X0FMUEhBOCA9IDB4OGM0MztcbmV4cG9ydCBjb25zdCBHTF9TUkdCOF9BTFBIQThfRVhUID0gMHg4YzQzO1xuZXhwb3J0IGNvbnN0IEdMX1NUQVRJQ19DT1BZID0gMHg4OGU2O1xuZXhwb3J0IGNvbnN0IEdMX1NUQVRJQ19EUkFXID0gMHg4OGU0O1xuZXhwb3J0IGNvbnN0IEdMX1NUQVRJQ19SRUFEID0gMHg4OGU1O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUwgPSAweDE4MDI7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9BVFRBQ0hNRU5UID0gMHg4ZDIwO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19GQUlMID0gMHg4ODAxO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19GVU5DID0gMHg4ODAwO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19QQVNTX0RFUFRIX0ZBSUwgPSAweDg4MDI7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9CQUNLX1BBU1NfREVQVEhfUEFTUyA9IDB4ODgwMztcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfUkVGID0gMHg4Y2EzO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19WQUxVRV9NQVNLID0gMHg4Y2E0O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19XUklURU1BU0sgPSAweDhjYTU7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9CSVRTID0gMHgwZDU3O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQlVGRkVSX0JJVCA9IDB4MDAwMDA0MDA7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9DTEVBUl9WQUxVRSA9IDB4MGI5MTtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0ZBSUwgPSAweDBiOTQ7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9GVU5DID0gMHgwYjkyO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfSU5ERVggPSAweDE5MDE7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9JTkRFWDggPSAweDhkNDg7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9QQVNTX0RFUFRIX0ZBSUwgPSAweDBiOTU7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9QQVNTX0RFUFRIX1BBU1MgPSAweDBiOTY7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9SRUYgPSAweDBiOTc7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9URVNUID0gMHgwYjkwO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfVkFMVUVfTUFTSyA9IDB4MGI5MztcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX1dSSVRFTUFTSyA9IDB4MGI5ODtcbmV4cG9ydCBjb25zdCBHTF9TVFJFQU1fQ09QWSA9IDB4ODhlMjtcbmV4cG9ydCBjb25zdCBHTF9TVFJFQU1fRFJBVyA9IDB4ODhlMDtcbmV4cG9ydCBjb25zdCBHTF9TVFJFQU1fUkVBRCA9IDB4ODhlMTtcbmV4cG9ydCBjb25zdCBHTF9TVUJQSVhFTF9CSVRTID0gMHgwZDUwO1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfQ09ORElUSU9OID0gMHg5MTEzO1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfRkVOQ0UgPSAweDkxMTY7XG5leHBvcnQgY29uc3QgR0xfU1lOQ19GTEFHUyA9IDB4OTExNTtcbmV4cG9ydCBjb25zdCBHTF9TWU5DX0ZMVVNIX0NPTU1BTkRTX0JJVCA9IDB4MDAwMDAwMDE7XG5leHBvcnQgY29uc3QgR0xfU1lOQ19HUFVfQ09NTUFORFNfQ09NUExFVEUgPSAweDkxMTc7XG5leHBvcnQgY29uc3QgR0xfU1lOQ19TVEFUVVMgPSAweDkxMTQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRSA9IDB4MTcwMjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFXzJEID0gMHgwZGUxO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfMkRfQVJSQVkgPSAweDhjMWE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV8zRCA9IDB4ODA2ZjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0JBU0VfTEVWRUwgPSAweDgxM2M7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9CSU5ESU5HXzJEID0gMHg4MDY5O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQklORElOR18yRF9BUlJBWSA9IDB4OGMxZDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0JJTkRJTkdfM0QgPSAweDgwNmE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9CSU5ESU5HX0NVQkVfTUFQID0gMHg4NTE0O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ09NUEFSRV9GVU5DID0gMHg4ODRkO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ09NUEFSRV9NT0RFID0gMHg4ODRjO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVAgPSAweDg1MTM7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9YID0gMHg4NTE2O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWSA9IDB4ODUxODtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1ogPSAweDg1MWE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YID0gMHg4NTE1O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWSA9IDB4ODUxNztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1ogPSAweDg1MTk7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9JTU1VVEFCTEVfRk9STUFUID0gMHg5MTJmO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfSU1NVVRBQkxFX0xFVkVMUyA9IDB4ODJkZjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX01BR19GSUxURVIgPSAweDI4MDA7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NQVhfQU5JU09UUk9QWV9FWFQgPSAweDg0ZmU7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NQVhfTEVWRUwgPSAweDgxM2Q7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NQVhfTE9EID0gMHg4MTNiO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUlOX0ZJTFRFUiA9IDB4MjgwMTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX01JTl9MT0QgPSAweDgxM2E7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9XUkFQX1IgPSAweDgwNzI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9XUkFQX1MgPSAweDI4MDI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9XUkFQX1QgPSAweDI4MDM7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTAgPSAweDg0YzA7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTEgPSAweDg0YzE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTEwID0gMHg4NGNhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxMSA9IDB4ODRjYjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTIgPSAweDg0Y2M7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTEzID0gMHg4NGNkO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxNCA9IDB4ODRjZTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTUgPSAweDg0Y2Y7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTE2ID0gMHg4NGQwO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxNyA9IDB4ODRkMTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTggPSAweDg0ZDI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTE5ID0gMHg4NGQzO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyID0gMHg4NGMyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyMCA9IDB4ODRkNDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjEgPSAweDg0ZDU7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTIyID0gMHg4NGQ2O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyMyA9IDB4ODRkNztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjQgPSAweDg0ZDg7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTI1ID0gMHg4NGQ5O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyNiA9IDB4ODRkYTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjcgPSAweDg0ZGI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTI4ID0gMHg4NGRjO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyOSA9IDB4ODRkZDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMyA9IDB4ODRjMztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMzAgPSAweDg0ZGU7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTMxID0gMHg4NGRmO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU0ID0gMHg4NGM0O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU1ID0gMHg4NGM1O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU2ID0gMHg4NGM2O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU3ID0gMHg4NGM3O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU4ID0gMHg4NGM4O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU5ID0gMHg4NGM5O1xuZXhwb3J0IGNvbnN0IEdMX1RJTUVfRUxBUFNFRF9FWFQgPSAweDg4YmY7XG5leHBvcnQgY29uc3QgR0xfVElNRU9VVF9FWFBJUkVEID0gMHg5MTFiO1xuZXhwb3J0IGNvbnN0IEdMX1RJTUVPVVRfSUdOT1JFRCA9IC0xO1xuZXhwb3J0IGNvbnN0IEdMX1RJTUVTVEFNUF9FWFQgPSAweDhlMjg7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLID0gMHg4ZTIyO1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19BQ1RJVkUgPSAweDhlMjQ7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JJTkRJTkcgPSAweDhlMjU7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUiA9IDB4OGM4ZTtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfQlVGRkVSX0JJTkRJTkcgPSAweDhjOGY7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUl9NT0RFID0gMHg4YzdmO1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CVUZGRVJfU0laRSA9IDB4OGM4NTtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfQlVGRkVSX1NUQVJUID0gMHg4Yzg0O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19QQVVTRUQgPSAweDhlMjM7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX1BSSU1JVElWRVNfV1JJVFRFTiA9IDB4OGM4ODtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfVkFSWUlOR1MgPSAweDhjODM7XG5leHBvcnQgY29uc3QgR0xfVFJJQU5HTEVfRkFOID0gMHgwMDA2O1xuZXhwb3J0IGNvbnN0IEdMX1RSSUFOR0xFX1NUUklQID0gMHgwMDA1O1xuZXhwb3J0IGNvbnN0IEdMX1RSSUFOR0xFUyA9IDB4MDAwNDtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0FSUkFZX1NUUklERSA9IDB4OGEzYztcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JMT0NLX0FDVElWRV9VTklGT1JNX0lORElDRVMgPSAweDhhNDM7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19BQ1RJVkVfVU5JRk9STVMgPSAweDhhNDI7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19CSU5ESU5HID0gMHg4YTNmO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfREFUQV9TSVpFID0gMHg4YTQwO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfSU5ERVggPSAweDhhM2E7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19SRUZFUkVOQ0VEX0JZX0ZSQUdNRU5UX1NIQURFUiA9IDB4OGE0NjtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JMT0NLX1JFRkVSRU5DRURfQllfVkVSVEVYX1NIQURFUiA9IDB4OGE0NDtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JVRkZFUiA9IDB4OGExMTtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JVRkZFUl9CSU5ESU5HID0gMHg4YTI4O1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQlVGRkVSX09GRlNFVF9BTElHTk1FTlQgPSAweDhhMzQ7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVJfU0laRSA9IDB4OGEyYTtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JVRkZFUl9TVEFSVCA9IDB4OGEyOTtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0lTX1JPV19NQUpPUiA9IDB4OGEzZTtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX01BVFJJWF9TVFJJREUgPSAweDhhM2Q7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9PRkZTRVQgPSAweDhhM2I7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9TSVpFID0gMHg4YTM4O1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fVFlQRSA9IDB4OGEzNztcbmV4cG9ydCBjb25zdCBHTF9VTk1BU0tFRF9SRU5ERVJFUl9XRUJHTCA9IDB4OTI0NjtcbmV4cG9ydCBjb25zdCBHTF9VTk1BU0tFRF9WRU5ET1JfV0VCR0wgPSAweDkyNDU7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX0FMSUdOTUVOVCA9IDB4MGNmNTtcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfQ09MT1JTUEFDRV9DT05WRVJTSU9OX1dFQkdMID0gMHg5MjQzO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19GTElQX1lfV0VCR0wgPSAweDkyNDA7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX0lNQUdFX0hFSUdIVCA9IDB4ODA2ZTtcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfUFJFTVVMVElQTFlfQUxQSEFfV0VCR0wgPSAweDkyNDE7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX1JPV19MRU5HVEggPSAweDBjZjI7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX1NLSVBfSU1BR0VTID0gMHg4MDZkO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19TS0lQX1BJWEVMUyA9IDB4MGNmNDtcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfU0tJUF9ST1dTID0gMHgwY2YzO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkFMRUQgPSAweDkxMTg7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfQllURSA9IDB4MTQwMTtcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlQgPSAweDE0MDU7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzEwRl8xMUZfMTFGX1JFViA9IDB4OGMzYjtcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfMl8xMF8xMF8xMF9SRVYgPSAweDgzNjg7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzI0XzggPSAweDg0ZmE7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzI0XzhfV0VCR0wgPSAweDg0ZmE7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzVfOV85XzlfUkVWID0gMHg4YzNlO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9TQU1QTEVSXzJEID0gMHg4ZGQyO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9TQU1QTEVSXzJEX0FSUkFZID0gMHg4ZGQ3O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9TQU1QTEVSXzNEID0gMHg4ZGQzO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9TQU1QTEVSX0NVQkUgPSAweDhkZDQ7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UX1ZFQzIgPSAweDhkYzY7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UX1ZFQzMgPSAweDhkYzc7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UX1ZFQzQgPSAweDhkYzg7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfTk9STUFMSVpFRCA9IDB4OGMxNztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9OT1JNQUxJWkVEX0VYVCA9IDB4OGMxNztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9TSE9SVCA9IDB4MTQwMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9TSE9SVF80XzRfNF80ID0gMHg4MDMzO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX1NIT1JUXzVfNV81XzEgPSAweDgwMzQ7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfU0hPUlRfNV82XzUgPSAweDgzNjM7XG5leHBvcnQgY29uc3QgR0xfVkFMSURBVEVfU1RBVFVTID0gMHg4YjgzO1xuZXhwb3J0IGNvbnN0IEdMX1ZFTkRPUiA9IDB4MWYwMDtcbmV4cG9ydCBjb25zdCBHTF9WRVJTSU9OID0gMHgxZjAyO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BUlJBWV9CSU5ESU5HID0gMHg4NWI1O1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BUlJBWV9CSU5ESU5HX09FUyA9IDB4ODViNTtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX0JVRkZFUl9CSU5ESU5HID0gMHg4ODlmO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfRElWSVNPUiA9IDB4ODhmZTtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX0RJVklTT1JfQU5HTEUgPSAweDg4ZmU7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9FTkFCTEVEID0gMHg4NjIyO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfSU5URUdFUiA9IDB4ODhmZDtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX05PUk1BTElaRUQgPSAweDg4NmE7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9QT0lOVEVSID0gMHg4NjQ1O1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfU0laRSA9IDB4ODYyMztcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX1NUUklERSA9IDB4ODYyNDtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX1RZUEUgPSAweDg2MjU7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX1NIQURFUiA9IDB4OGIzMTtcbmV4cG9ydCBjb25zdCBHTF9WSUVXUE9SVCA9IDB4MGJhMjtcbmV4cG9ydCBjb25zdCBHTF9XQUlUX0ZBSUxFRCA9IDB4OTExZDtcbmV4cG9ydCBjb25zdCBHTF9aRVJPID0gMDtcbiIsImV4cG9ydCBjb25zdCBHTENhdEVycm9ycyA9IHtcbiAgZ2V0IFVuZXhwZWN0ZWROdWxsRXJyb3IoKTogRXJyb3Ige1xuICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCAnR0xDYXQ6IFVuZXhwZWN0ZWQgbnVsbCBkZXRlY3RlZCcgKTtcbiAgICBlcnJvci5uYW1lID0gJ1VuZXhwZWN0ZWROdWxsRXJyb3InO1xuICAgIHJldHVybiBlcnJvcjtcbiAgfSxcbiAgZ2V0IFdlYkdMMkV4Y2x1c2l2ZUVycm9yKCk6IEVycm9yIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvciggJ0dMQ2F0OiBBdHRlbXB0ZWQgdG8gdXNlIFdlYkdMMiBleGNsdXNpdmUgc3R1ZmYnICk7XG4gICAgZXJyb3IubmFtZSA9ICdXZWJHTDJFeGNsdXNpdmVFcnJvcic7XG4gICAgcmV0dXJuIGVycm9yO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgR0xfQ09NUExFVElPTl9TVEFUVVNfS0hSLCBHTF9GTE9BVCwgR0xfTElOS19TVEFUVVMsIEdMX1RFWFRVUkUwIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0QnVmZmVyIH0gZnJvbSAnLi9HTENhdEJ1ZmZlcic7XG5pbXBvcnQgeyBHTENhdEVycm9ycyB9IGZyb20gJy4vR0xDYXRFcnJvcnMnO1xuaW1wb3J0IHR5cGUgeyBHTENhdFNoYWRlciB9IGZyb20gJy4vR0xDYXRTaGFkZXInO1xuaW1wb3J0IHR5cGUgeyBHTENhdFRleHR1cmUgfSBmcm9tICcuL0dMQ2F0VGV4dHVyZSc7XG5cbnR5cGUgV2ViR0wxID0gV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xudHlwZSBXZWJHTDIgPSBXZWJHTDJSZW5kZXJpbmdDb250ZXh0O1xuXG5leHBvcnQgdHlwZSBHTENhdFByb2dyYW1Vbmlmb3JtVHlwZSA9XG4gICcxZicgfCAnMmYnIHwgJzNmJyB8ICc0ZicgfFxuICAnMWknIHwgJzJpJyB8ICczaScgfCAnNGknIHxcbiAgJzFmdicgfCAnMmZ2JyB8ICczZnYnIHwgJzRmdicgfFxuICAnMWl2JyB8ICcyaXYnIHwgJzNpdicgfCAnNGl2JyB8XG4gICdNYXRyaXgyZnYnIHwgJ01hdHJpeDNmdicgfCAnTWF0cml4NGZ2JztcblxuZXhwb3J0IGludGVyZmFjZSBHTENhdFByb2dyYW1MaW5rT3B0aW9ucyB7XG4gIHRyYW5zZm9ybUZlZWRiYWNrVmFyeWluZ3M/OiBzdHJpbmdbXSxcblxuICAvKipcbiAgICogYGdsLlNFUEFSQVRFX0FUVFJJQlNgIGJ5IGRlZmF1bHRcbiAgICovXG4gIHRyYW5zZm9ybUZlZWRiYWNrQnVmZmVyTW9kZT86IG51bWJlcixcbn1cblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xQcm9ncmFtLCBidXQgaGFzIGNhY2hlIG9mIHZhcmlhYmxlIGxvY2F0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0UHJvZ3JhbTxUQ29udGV4dCBleHRlbmRzIFdlYkdMMSB8IFdlYkdMMiA9IFdlYkdMMSB8IFdlYkdMMj4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3Byb2dyYW06IFdlYkdMUHJvZ3JhbTtcbiAgcHJpdmF0ZSBfX3NoYWRlcnM6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PltdIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX19hdHRyaWJMb2NhdGlvbkNhY2hlOiB7IFsgbmFtZTogc3RyaW5nIF06IG51bWJlciB9ID0ge307XG4gIHByaXZhdGUgX191bmlmb3JtTG9jYXRpb25DYWNoZTogeyBbIG5hbWU6IHN0cmluZyBdOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB8IG51bGwgfSA9IHt9O1xuICBwcml2YXRlIF9fdW5pZm9ybVRleHR1cmVVbml0TWFwOiB7IFsgbmFtZTogc3RyaW5nIF06IG51bWJlciB9ID0ge307XG4gIHByaXZhdGUgX191bmlmb3JtdGV4dHVyZVVuaXRJbmRleCA9IDA7XG4gIHByaXZhdGUgX19saW5rZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogSXRzIG93biBwcm9ncmFtLlxuICAgKi9cbiAgcHVibGljIGdldCBwcm9ncmFtKCk6IFdlYkdMUHJvZ3JhbSB7XG4gICAgcmV0dXJuIHRoaXMuX19wcm9ncmFtO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcHJvZ3JhbS4gU2hvcnRlciB0aGFuIFtbR0xDYXRQcm9ncmFtLnByb2dyYW1dXS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3KCk6IFdlYkdMUHJvZ3JhbSB7XG4gICAgcmV0dXJuIHRoaXMuX19wcm9ncmFtO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBzaGFkZXJzLlxuICAgKi9cbiAgcHVibGljIGdldCBzaGFkZXJzKCk6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PltdIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX19zaGFkZXJzID8gdGhpcy5fX3NoYWRlcnMuY29uY2F0KCkgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGxhc3QgbGluayBvcGVyYXRpb24gd2FzIHN1Y2Nlc3NmdWwgb3Igbm90LlxuICAgKi9cbiAgcHVibGljIGdldCBpc0xpbmtlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fX2xpbmtlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRQcm9ncmFtIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBwcm9ncmFtOiBXZWJHTFByb2dyYW0gKSB7XG4gICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XG4gICAgdGhpcy5fX3Byb2dyYW0gPSBwcm9ncmFtO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHByb2dyYW0uXG4gICAqL1xuICBwdWJsaWMgZGlzcG9zZSggYWxzb0F0dGFjaGVkID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgZ2wuZGVsZXRlUHJvZ3JhbSggdGhpcy5fX3Byb2dyYW0gKTtcblxuICAgIGlmICggYWxzb0F0dGFjaGVkICkge1xuICAgICAgY29uc3Qgc2hhZGVycyA9IHRoaXMuc2hhZGVycztcbiAgICAgIGlmICggc2hhZGVycyApIHtcbiAgICAgICAgc2hhZGVycy5mb3JFYWNoKCAoIHNoYWRlciApID0+IHtcbiAgICAgICAgICBzaGFkZXIuZGlzcG9zZSgpO1xuICAgICAgICB9ICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBzaGFkZXJzIGFuZCBsaW5rIHRoaXMgcHJvZ3JhbS5cbiAgICovXG4gIHB1YmxpYyBsaW5rKFxuICAgIHNoYWRlcnM6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PltdLFxuICAgIG9wdGlvbnM6IEdMQ2F0UHJvZ3JhbUxpbmtPcHRpb25zID0ge30sXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHNoYWRlcnMuZm9yRWFjaCggKCBzaGFkZXIgKSA9PiBnbC5hdHRhY2hTaGFkZXIoIHRoaXMuX19wcm9ncmFtLCBzaGFkZXIucmF3ICkgKTtcblxuICAgIGlmICggb3B0aW9ucy50cmFuc2Zvcm1GZWVkYmFja1ZhcnlpbmdzICkge1xuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICAgICkge1xuICAgICAgICBnbC50cmFuc2Zvcm1GZWVkYmFja1ZhcnlpbmdzKFxuICAgICAgICAgIHRoaXMuX19wcm9ncmFtLFxuICAgICAgICAgIG9wdGlvbnMudHJhbnNmb3JtRmVlZGJhY2tWYXJ5aW5ncyxcbiAgICAgICAgICBvcHRpb25zLnRyYW5zZm9ybUZlZWRiYWNrQnVmZmVyTW9kZSA/PyBnbC5TRVBBUkFURV9BVFRSSUJTXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBHTENhdEVycm9ycy5XZWJHTDJFeGNsdXNpdmVFcnJvcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnbC5saW5rUHJvZ3JhbSggdGhpcy5fX3Byb2dyYW0gKTtcblxuICAgIHRoaXMuX19saW5rZWQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKCB0aGlzLl9fcHJvZ3JhbSwgR0xfTElOS19TVEFUVVMgKTtcbiAgICBpZiAoICF0aGlzLl9fbGlua2VkICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCBnbC5nZXRQcm9ncmFtSW5mb0xvZyggdGhpcy5fX3Byb2dyYW0gKSEgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9fc2hhZGVycyA9IHNoYWRlcnMuY29uY2F0KCk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIHNoYWRlcnMgYW5kIGxpbmsgdGhpcyBwcm9ncmFtLlxuICAgKiBJdCdzIGdvbm5hIGJlIGFzeW5jaHJvbm91cyBpZiB5b3UgaGF2ZSB0aGUgS0hSX3BhcmFsbGVsX3NoYWRlcl9jb21waWxlIGV4dGVuc2lvbiBzdXBwb3J0LlxuICAgKi9cbiAgcHVibGljIGxpbmtBc3luYyhcbiAgICBzaGFkZXJzOiBHTENhdFNoYWRlcjxUQ29udGV4dD5bXSxcbiAgICBvcHRpb25zOiBHTENhdFByb2dyYW1MaW5rT3B0aW9ucyA9IHt9LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBnbENhdCA9IHRoaXMuX19nbENhdDtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG4gICAgY29uc3QgZXh0UGFyYWxsZWwgPSBnbENhdC5nZXRFeHRlbnNpb24oICdLSFJfcGFyYWxsZWxfc2hhZGVyX2NvbXBpbGUnICk7XG5cbiAgICBzaGFkZXJzLmZvckVhY2goICggc2hhZGVyICkgPT4gZ2wuYXR0YWNoU2hhZGVyKCB0aGlzLl9fcHJvZ3JhbSwgc2hhZGVyLnJhdyApICk7XG5cbiAgICBpZiAoIG9wdGlvbnMudHJhbnNmb3JtRmVlZGJhY2tWYXJ5aW5ncyApIHtcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0XG4gICAgICApIHtcbiAgICAgICAgZ2wudHJhbnNmb3JtRmVlZGJhY2tWYXJ5aW5ncyhcbiAgICAgICAgICB0aGlzLl9fcHJvZ3JhbSxcbiAgICAgICAgICBvcHRpb25zLnRyYW5zZm9ybUZlZWRiYWNrVmFyeWluZ3MsXG4gICAgICAgICAgb3B0aW9ucy50cmFuc2Zvcm1GZWVkYmFja0J1ZmZlck1vZGUgPz8gZ2wuU0VQQVJBVEVfQVRUUklCU1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgR0xDYXRFcnJvcnMuV2ViR0wyRXhjbHVzaXZlRXJyb3I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2wubGlua1Byb2dyYW0oIHRoaXMuX19wcm9ncmFtICk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgPT4ge1xuICAgICAgY29uc3QgdXBkYXRlID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWV4dFBhcmFsbGVsIHx8XG4gICAgICAgICAgZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlciggdGhpcy5fX3Byb2dyYW0sIEdMX0NPTVBMRVRJT05fU1RBVFVTX0tIUiApID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuX19saW5rZWQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKCB0aGlzLl9fcHJvZ3JhbSwgR0xfTElOS19TVEFUVVMgKTtcbiAgICAgICAgICBpZiAoICF0aGlzLl9fbGlua2VkICkge1xuICAgICAgICAgICAgcmVqZWN0KCBuZXcgRXJyb3IoIGdsLmdldFByb2dyYW1JbmZvTG9nKCB0aGlzLl9fcHJvZ3JhbSApID8/ICdudWxsJyApICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fX3NoYWRlcnMgPSBzaGFkZXJzLmNvbmNhdCgpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHVwZGF0ZSApO1xuICAgICAgfTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gYXR0cmlidXRlIHZhcmlhYmxlLlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdmFyaWFibGVcbiAgICogQHBhcmFtIGJ1ZmZlciBWZXJ0ZXggYnVmZmVyLiBDYW4gYmUgbnVsbCwgdG8gZGlzYWJsZSBhdHRyaWJ1dGUgYXJyYXlcbiAgICogQHBhcmFtIHNpemUgTnVtYmVyIG9mIGNvbXBvbmVudHMgcGVyIHZlcnRleC4gTXVzdCBiZSAxLCAyLCAzIG9yIDRcbiAgICovXG4gIHB1YmxpYyBhdHRyaWJ1dGUoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGJ1ZmZlcjogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBzaXplID0gMSxcbiAgICBkaXZpc29yID0gMCxcbiAgICB0eXBlOiBudW1iZXIgPSBHTF9GTE9BVCxcbiAgICBzdHJpZGUgPSAwLFxuICAgIG9mZnNldCA9IDBcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKCBuYW1lICk7XG4gICAgaWYgKCBsb2NhdGlvbiA9PT0gLTEgKSB7IHJldHVybjsgfVxuXG4gICAgaWYgKCBidWZmZXIgPT09IG51bGwgKSB7XG4gICAgICBnbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkoIGxvY2F0aW9uICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRWZXJ0ZXhCdWZmZXIoIGJ1ZmZlciwgKCkgPT4ge1xuICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoIGxvY2F0aW9uICk7XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKCBsb2NhdGlvbiwgc2l6ZSwgdHlwZSwgZmFsc2UsIHN0cmlkZSwgb2Zmc2V0ICk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0XG4gICAgICApIHtcbiAgICAgICAgZ2wudmVydGV4QXR0cmliRGl2aXNvciggbG9jYXRpb24sIGRpdmlzb3IgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4dCA9IHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJyApO1xuICAgICAgICBpZiAoIGV4dCApIHtcbiAgICAgICAgICBleHQudmVydGV4QXR0cmliRGl2aXNvckFOR0xFKCBsb2NhdGlvbiwgZGl2aXNvciApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtIHZhcmlhYmxlLlxuICAgKiBTZWUgYWxzbzogW1tHTENhdFByb2dyYW0udW5pZm9ybVZlY3Rvcl1dXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybSggbmFtZTogc3RyaW5nLCB0eXBlOiBHTENhdFByb2dyYW1Vbmlmb3JtVHlwZSwgLi4udmFsdWU6IG51bWJlcltdICk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bmMgPSAoIHRoaXMgYXMgYW55IClbICd1bmlmb3JtJyArIHR5cGUgXTtcbiAgICBmdW5jLmNhbGwoIHRoaXMsIG5hbWUsIC4uLnZhbHVlICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0gdmFyaWFibGUuXG4gICAqIFNlZSBhbHNvOiBbW0dMQ2F0UHJvZ3JhbS51bmlmb3JtXV1cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtVmVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICB0eXBlOiBHTENhdFByb2dyYW1Vbmlmb3JtVHlwZSxcbiAgICB2YWx1ZTogRmxvYXQzMkxpc3QgfCBJbnQzMkxpc3RcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgZnVuYyA9ICggdGhpcyBhcyBhbnkgKVsgJ3VuaWZvcm0nICsgdHlwZSBdO1xuICAgIGZ1bmMuY2FsbCggdGhpcywgbmFtZSwgdmFsdWUgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTFpIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0xaSggbmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFpKCBsb2NhdGlvbiwgdmFsdWUgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0yaSB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMmkoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMmkoIGxvY2F0aW9uLCB4LCB5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtM2kgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTNpKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtM2koIGxvY2F0aW9uLCB4LCB5LCB6ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtNGkgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTRpKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm00aSggbG9jYXRpb24sIHgsIHksIHosIHcgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0xaXYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTFpdiggbmFtZTogc3RyaW5nLCBhcnJheTogSW50MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFpdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMml2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0yaXYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEludDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0yaXYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTNpdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2l2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBJbnQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtM2l2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm00aXYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTRpdiggbmFtZTogc3RyaW5nLCBhcnJheTogSW50MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTRpdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMWYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTFmKCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMWYoIGxvY2F0aW9uLCB2YWx1ZSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTJmIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0yZiggbmFtZTogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0yZiggbG9jYXRpb24sIHgsIHkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0zZiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2YoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0zZiggbG9jYXRpb24sIHgsIHksIHogKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm00ZiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtNGYoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTRmKCBsb2NhdGlvbiwgeCwgeSwgeiwgdyApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTFmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMWZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTJmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMmZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0yZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTNmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2Z2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0zZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTRmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtNGZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm00ZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDJmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4MmZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCwgdHJhbnNwb3NlID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtTWF0cml4MmZ2KCBsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDNmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4M2Z2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCwgdHJhbnNwb3NlID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtTWF0cml4M2Z2KCBsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDRmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4NGZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCwgdHJhbnNwb3NlID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KCBsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBgc2FtcGxlcjJEYCB0eXBlIHVuaWZvcm0gdGV4dHVyZS5cbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgdW5pZm9ybSB0ZXh0dXJlXG4gICAqIEBwYXJhbSB0ZXh0dXJlIFRleHR1cmUgb2JqZWN0XG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybVRleHR1cmUoIG5hbWU6IHN0cmluZywgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIGNvbnN0IHVuaXQgPSB0aGlzLmdldFVuaWZvcm1UZXh0dXJlVW5pdCggbmFtZSApO1xuICAgIGdsLmFjdGl2ZVRleHR1cmUoIEdMX1RFWFRVUkUwICsgdW5pdCApO1xuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0ZXh0dXJlID8/IG51bGwgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFpKCBsb2NhdGlvbiwgdW5pdCApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBgc2FtcGxlckN1YmVgIHR5cGUgdW5pZm9ybSB0ZXh0dXJlLlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSB1bmlmb3JtIHRleHR1cmVcbiAgICogQHBhcmFtIHRleHR1cmUgVGV4dHVyZSBvYmplY3RcbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtQ3ViZW1hcCggbmFtZTogc3RyaW5nLCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgY29uc3QgdW5pdCA9IHRoaXMuZ2V0VW5pZm9ybVRleHR1cmVVbml0KCBuYW1lICk7XG4gICAgZ2wuYWN0aXZlVGV4dHVyZSggR0xfVEVYVFVSRTAgKyB1bml0ICk7XG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlQ3ViZU1hcCggdGV4dHVyZSA/PyBudWxsICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xaSggbG9jYXRpb24sIHVuaXQgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgYXR0cmlidXRlIGxvY2F0aW9uLlxuICAgKi9cbiAgcHVibGljIGdldEF0dHJpYkxvY2F0aW9uKCBuYW1lOiBzdHJpbmcgKTogbnVtYmVyIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBpZiAoIHRoaXMuX19hdHRyaWJMb2NhdGlvbkNhY2hlWyBuYW1lIF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fYXR0cmliTG9jYXRpb25DYWNoZVsgbmFtZSBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKCB0aGlzLl9fcHJvZ3JhbSwgbmFtZSApO1xuICAgICAgLy8gaWYgKCBsb2NhdGlvbiA9PT0gLTEgKSB7XG4gICAgICAvLyAgIHRoaXMuZ2xDYXQuc3BpdCggJ0dMQ2F0UHJvZ3JhbS5nZXRBdHRyaWJMb2NhdGlvbjogQ291bGQgbm90IHJldHJpZXZlIGF0dHJpYnV0ZSBsb2NhdGlvbicgKTtcbiAgICAgIC8vICAgcmV0dXJuIC0xO1xuICAgICAgLy8gfVxuICAgICAgdGhpcy5fX2F0dHJpYkxvY2F0aW9uQ2FjaGVbIG5hbWUgXSA9IGxvY2F0aW9uO1xuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB1bmlmb3JtIGxvY2F0aW9uLlxuICAgKi9cbiAgcHVibGljIGdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZTogc3RyaW5nICk6IFdlYkdMVW5pZm9ybUxvY2F0aW9uIHwgbnVsbCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgaWYgKCB0aGlzLl9fdW5pZm9ybUxvY2F0aW9uQ2FjaGVbIG5hbWUgXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuIHRoaXMuX191bmlmb3JtTG9jYXRpb25DYWNoZVsgbmFtZSBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbiggdGhpcy5fX3Byb2dyYW0sIG5hbWUgKTtcbiAgICAgIC8vIGlmICggbG9jYXRpb24gPT09IG51bGwgKSB7XG4gICAgICAvLyAgIHRoaXMuZ2xDYXQuc3BpdCggJ0dMQ2F0UHJvZ3JhbS5nZXRVbmlmb3JtTG9jYXRpb246IENvdWxkIG5vdCByZXRyaWV2ZSB1bmlmb3JtIGxvY2F0aW9uJyApO1xuICAgICAgLy8gICByZXR1cm4gbG9jYXRpb247XG4gICAgICAvLyB9XG4gICAgICB0aGlzLl9fdW5pZm9ybUxvY2F0aW9uQ2FjaGVbIG5hbWUgXSA9IGxvY2F0aW9uO1xuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBvciBjcmVhdGUgYSB0ZXh0dXJlIHVuaXQgdGhhdCBjb3JyZXNwb25kcyB0byBnaXZlbiBuYW1lLlxuICAgKi9cbiAgcHVibGljIGdldFVuaWZvcm1UZXh0dXJlVW5pdCggbmFtZTogc3RyaW5nICk6IG51bWJlciB7XG4gICAgaWYgKCB0aGlzLl9fdW5pZm9ybVRleHR1cmVVbml0TWFwWyBuYW1lIF0gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHRoaXMuX191bmlmb3JtVGV4dHVyZVVuaXRNYXBbIG5hbWUgXSA9IHRoaXMuX191bmlmb3JtdGV4dHVyZVVuaXRJbmRleDtcbiAgICAgIHRoaXMuX191bmlmb3JtdGV4dHVyZVVuaXRJbmRleCArKztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fX3VuaWZvcm1UZXh0dXJlVW5pdE1hcFsgbmFtZSBdO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQmluZEhlbHBlcjxUVmFsdWU+IHtcbiAgcHJpdmF0ZSBfX3ByZXY6IFRWYWx1ZTtcbiAgcHJpdmF0ZSBfX2JpbmRlcjogKCB2YWx1ZTogVFZhbHVlICkgPT4gdm9pZDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoIGluaXQ6IFRWYWx1ZSwgYmluZGVyOiAoIHZhbHVlOiBUVmFsdWUgKSA9PiB2b2lkICkge1xuICAgIHRoaXMuX19wcmV2ID0gaW5pdDtcbiAgICB0aGlzLl9fYmluZGVyID0gYmluZGVyO1xuICB9XG5cbiAgcHVibGljIGJpbmQ8VD4oXG4gICAgdmFsdWU6IFRWYWx1ZSxcbiAgICBjYWxsYmFjaz86ICggdmFsdWU6IFRWYWx1ZSApID0+IFRcbiAgKTogVCB7XG4gICAgY29uc3QgcHJldiA9IHRoaXMuX19wcmV2O1xuICAgIGlmICggdmFsdWUgIT09IHByZXYgKSB7XG4gICAgICB0aGlzLl9fYmluZGVyKCB2YWx1ZSApO1xuICAgICAgdGhpcy5fX3ByZXYgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoIGNhbGxiYWNrICkge1xuICAgICAgY29uc3QgcmV0ID0gY2FsbGJhY2soIHZhbHVlICk7XG4gICAgICB0aGlzLmJpbmQoIHByZXYgKTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQgYXMgYW55O1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xfQVJSQVlfQlVGRkVSLCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiwgR0xfU1RBVElDX0RSQVcgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcblxudHlwZSBXZWJHTDEgPSBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG50eXBlIFdlYkdMMiA9IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMQnVmZmVyLlxuICovXG5leHBvcnQgY2xhc3MgR0xDYXRCdWZmZXI8VENvbnRleHQgZXh0ZW5kcyBXZWJHTDEgfCBXZWJHTDIgPSBXZWJHTDEgfCBXZWJHTDI+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19idWZmZXI6IFdlYkdMQnVmZmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgYnVmZmVyKCk6IFdlYkdMQnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2J1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRCdWZmZXIuYnVmZmVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTEJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19idWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0QnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBidWZmZXI6IFdlYkdMQnVmZmVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19idWZmZXIgPSBidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZUJ1ZmZlciggdGhpcy5fX2J1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIHNldFZlcnRleGJ1ZmZlciggc2l6ZTogR0xzaXplaXB0ciwgdXNhZ2U/OiBudW1iZXIgKTogdm9pZDtcbiAgcHVibGljIHNldFZlcnRleGJ1ZmZlciggc291cmNlOiBCdWZmZXJTb3VyY2UgfCBudWxsLCB1c2FnZT86IG51bWJlciApOiB2b2lkO1xuICBwdWJsaWMgc2V0VmVydGV4YnVmZmVyKFxuICAgIHNvdXJjZTogR0xzaXplaXB0ciB8IEJ1ZmZlclNvdXJjZSB8IG51bGwsXG4gICAgdXNhZ2U6IG51bWJlciA9IEdMX1NUQVRJQ19EUkFXXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVmVydGV4QnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5idWZmZXJEYXRhKCBHTF9BUlJBWV9CVUZGRVIsIHNvdXJjZSBhcyBhbnksIHVzYWdlICk7IC8vIHRoaXMgc3Vja3NcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyBpbmRleCBkYXRhIGludG8gdGhpcyBidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgc2V0SW5kZXhidWZmZXIoIHNpemU6IEdMc2l6ZWlwdHIsIHVzYWdlPzogbnVtYmVyICk6IHZvaWQ7XG4gIHB1YmxpYyBzZXRJbmRleGJ1ZmZlciggc291cmNlOiBCdWZmZXJTb3VyY2UgfCBudWxsLCB1c2FnZT86IG51bWJlciApOiB2b2lkO1xuICBwdWJsaWMgc2V0SW5kZXhidWZmZXIoXG4gICAgc291cmNlOiBHTHNpemVpcHRyIHwgQnVmZmVyU291cmNlIHwgbnVsbCxcbiAgICB1c2FnZTogbnVtYmVyID0gR0xfU1RBVElDX0RSQVdcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRJbmRleEJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuYnVmZmVyRGF0YSggR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHNvdXJjZSBhcyBhbnksIHVzYWdlICk7IC8vIHRoaXMgc3Vja3NcbiAgICB9ICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMX0NPTE9SX0FUVEFDSE1FTlQwLCBHTF9ERVBUSF9BVFRBQ0hNRU5ULCBHTF9GUkFNRUJVRkZFUiwgR0xfUkVOREVSQlVGRkVSLCBHTF9URVhUVVJFXzJEIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0UmVuZGVyYnVmZmVyIH0gZnJvbSAnLi9HTENhdFJlbmRlcmJ1ZmZlcic7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0VGV4dHVyZSB9IGZyb20gJy4vR0xDYXRUZXh0dXJlJztcblxudHlwZSBXZWJHTDEgPSBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG50eXBlIFdlYkdMMiA9IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMRnJhbWVidWZmZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0IGV4dGVuZHMgV2ViR0wxIHwgV2ViR0wyID0gV2ViR0wxIHwgV2ViR0wyPiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fZnJhbWVidWZmZXI6IFdlYkdMRnJhbWVidWZmZXI7XG4gIHByaXZhdGUgX19yZW5kZXJidWZmZXJNYXAgPSBuZXcgTWFwPEdMZW51bSwgR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+PigpO1xuICBwcml2YXRlIF9fdGV4dHVyZU1hcCA9IG5ldyBNYXA8R0xlbnVtLCBHTENhdFRleHR1cmU8VENvbnRleHQ+PigpO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGdldCBmcmFtZWJ1ZmZlcigpOiBXZWJHTEZyYW1lYnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2ZyYW1lYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gZnJhbWVidWZmZXIuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0RnJhbWVidWZmZXIuZnJhbWVidWZmZXJdXVxuICAgKi9cbiAgcHVibGljIGdldCByYXcoKTogV2ViR0xGcmFtZWJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19mcmFtZWJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgYXR0YWNoZWQgcmVuZGVyYnVmZmVyLlxuICAgKiBJZiB5b3Ugd2FudCB0byBncmFiIG90aGVyIHRoYW4gYERFUFRIX0FUVEFDSE1FTlRgLCB0cnkgW1tHTENhdEZyYW1lYnVmZmVyLmdldFJlbmRlcmJ1ZmZlcl1dIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlbmRlcmJ1ZmZlcigpOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fX3JlbmRlcmJ1ZmZlck1hcC5nZXQoIEdMX0RFUFRIX0FUVEFDSE1FTlQgKSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBhdHRhY2hlZCB0ZXh0dXJlLlxuICAgKiBJZiB5b3Ugd2FudCB0byBncmFiIG90aGVyIHRoYW4gYENPTE9SX0FUVEFDSE1FTlQwYCwgdHJ5IFtbR0xDYXRGcmFtZWJ1ZmZlci5nZXRUZXh0dXJlXV0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgdGV4dHVyZSgpOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX190ZXh0dXJlTWFwLmdldCggR0xfQ09MT1JfQVRUQUNITUVOVDAgKSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdEZyYW1lYnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBmcmFtZWJ1ZmZlcjogV2ViR0xGcmFtZWJ1ZmZlciApIHtcbiAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcbiAgICB0aGlzLl9fZnJhbWVidWZmZXIgPSBmcmFtZWJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSBmcmFtZWJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCBhbHNvQXR0YWNoZWQgPSBmYWxzZSApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBnbC5kZWxldGVGcmFtZWJ1ZmZlciggdGhpcy5fX2ZyYW1lYnVmZmVyICk7XG5cbiAgICBpZiAoIGFsc29BdHRhY2hlZCApIHtcbiAgICAgIGZvciAoIGNvbnN0IHJlbmRlcmJ1ZmZlciBvZiB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLnZhbHVlcygpICkge1xuICAgICAgICBnbC5kZWxldGVSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlci5yYXcgKTtcbiAgICAgIH1cblxuICAgICAgZm9yICggY29uc3QgdGV4dHVyZSBvZiB0aGlzLl9fdGV4dHVyZU1hcC52YWx1ZXMoKSApIHtcbiAgICAgICAgZ2wuZGVsZXRlVGV4dHVyZSggdGV4dHVyZS5yYXcgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgaXRzIGF0dGFjaGVkIHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXRSZW5kZXJidWZmZXIoIGF0dGFjaG1lbnQgPSBHTF9ERVBUSF9BVFRBQ0hNRU5UICk6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLmdldCggYXR0YWNobWVudCApID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgaXRzIGF0dGFjaGVkIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgZ2V0VGV4dHVyZSggYXR0YWNobWVudCA9IEdMX0NPTE9SX0FUVEFDSE1FTlQwICk6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fX3RleHR1cmVNYXAuZ2V0KCBhdHRhY2htZW50ICkgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSByZW5kZXJidWZmZXIgdG8gdGhpcyBmcmFtZWJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBhdHRhY2hSZW5kZXJidWZmZXIoXG4gICAgcmVuZGVyYnVmZmVyOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4sXG4gICAge1xuICAgICAgYXR0YWNobWVudCA9IEdMX0RFUFRIX0FUVEFDSE1FTlRcbiAgICB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRGcmFtZWJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuZnJhbWVidWZmZXJSZW5kZXJidWZmZXIoIEdMX0ZSQU1FQlVGRkVSLCBhdHRhY2htZW50LCBHTF9SRU5ERVJCVUZGRVIsIHJlbmRlcmJ1ZmZlci5yYXcgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLnNldCggYXR0YWNobWVudCwgcmVuZGVyYnVmZmVyICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGEgdGV4dHVyZSB0byB0aGlzIGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGF0dGFjaFRleHR1cmUoXG4gICAgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PixcbiAgICB7XG4gICAgICBsZXZlbCA9IDAsXG4gICAgICBhdHRhY2htZW50ID0gR0xfQ09MT1JfQVRUQUNITUVOVDBcbiAgICB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRGcmFtZWJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoIEdMX0ZSQU1FQlVGRkVSLCBhdHRhY2htZW50LCBHTF9URVhUVVJFXzJELCB0ZXh0dXJlLnJhdywgbGV2ZWwgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fdGV4dHVyZU1hcC5zZXQoIGF0dGFjaG1lbnQsIHRleHR1cmUgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBHTENhdCB9IGZyb20gJy4vR0xDYXQnO1xuaW1wb3J0IHsgR0xDYXRFcnJvcnMgfSBmcm9tICcuL0dMQ2F0RXJyb3JzJztcbmltcG9ydCB7IEdMX1JFTkRFUkJVRkZFUiB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuXG50eXBlIFdlYkdMMSA9IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcbnR5cGUgV2ViR0wyID0gV2ViR0wyUmVuZGVyaW5nQ29udGV4dDtcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xSZW5kZXJidWZmZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dCBleHRlbmRzIFdlYkdMMSB8IFdlYkdMMiA9IFdlYkdMMSB8IFdlYkdMMj4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3JlbmRlcmJ1ZmZlcjogV2ViR0xSZW5kZXJidWZmZXI7XG4gIHByaXZhdGUgX193aWR0aCA9IDA7XG4gIHByaXZhdGUgX19oZWlnaHQgPSAwO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmVuZGVyYnVmZmVyKCk6IFdlYkdMUmVuZGVyYnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3JlbmRlcmJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIHJlbmRlcmJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRSZW5kZXJCdWZmZXIucmVuZGVyYnVmZmVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTFJlbmRlcmJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19yZW5kZXJidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogSXRzIHdpZHRoLlxuICAgKi9cbiAgcHVibGljIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9fd2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGhlaWdodC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX19oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0VGV4dHVyZSBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PiwgcmVuZGVyYnVmZmVyOiBXZWJHTFJlbmRlcmJ1ZmZlciApIHtcbiAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcbiAgICB0aGlzLl9fcmVuZGVyYnVmZmVyID0gcmVuZGVyYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX19nbENhdC5nbC5kZWxldGVSZW5kZXJidWZmZXIoIHRoaXMuX19yZW5kZXJidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoaXMgcmVuZGVyYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIHJlbmRlcmJ1ZmZlclN0b3JhZ2UoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB7IGZvcm1hdCA9IHRoaXMuX19nbENhdC5wcmVmZXJyZWREZXB0aEZvcm1hdCB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRSZW5kZXJidWZmZXIoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnJlbmRlcmJ1ZmZlclN0b3JhZ2UoIEdMX1JFTkRFUkJVRkZFUiwgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgfSApO1xuXG4gICAgdGhpcy5fX3dpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5fX2hlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoaXMgcmVuZGVyYnVmZmVyIHdpdGggbXVsdGlzYW1wbGUgZW5hYmxlZC5cbiAgICogSWYgeW91IGFyZSB1c2luZyBXZWJHTDEsIGl0IHdpbGwgZmFsbGJhY2sgdG8gbm9uIG11bHRpc2FtcGxlIG9uZSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHJlbmRlcmJ1ZmZlclN0b3JhZ2VNdWx0aXNhbXBsZShcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHtcbiAgICAgIHNhbXBsZXMgPSB0aGlzLl9fZ2xDYXQucHJlZmVycmVkTXVsdGlzYW1wbGVTYW1wbGVzLFxuICAgICAgZm9ybWF0ID0gdGhpcy5fX2dsQ2F0LnByZWZlcnJlZERlcHRoRm9ybWF0LFxuICAgICAgZmFsbGJhY2tXZWJHTDEgPSB0cnVlXG4gICAgfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kUmVuZGVyYnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAgIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dFxuICAgICAgKSB7XG4gICAgICAgIGdsLnJlbmRlcmJ1ZmZlclN0b3JhZ2VNdWx0aXNhbXBsZSggR0xfUkVOREVSQlVGRkVSLCBzYW1wbGVzLCBmb3JtYXQsIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICggZmFsbGJhY2tXZWJHTDEgKSB7XG4gICAgICAgICAgZ2wucmVuZGVyYnVmZmVyU3RvcmFnZSggR0xfUkVOREVSQlVGRkVSLCBmb3JtYXQsIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBHTENhdEVycm9ycy5XZWJHTDJFeGNsdXNpdmVFcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cbn1cbiIsImltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcbmltcG9ydCB7IEdMX0NPTVBJTEVfU1RBVFVTIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5cbnR5cGUgV2ViR0wxID0gV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xudHlwZSBXZWJHTDIgPSBXZWJHTDJSZW5kZXJpbmdDb250ZXh0O1xuXG4vKipcbiAqIEl0J3MgYSBXZWJHTFNoYWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0U2hhZGVyPFRDb250ZXh0IGV4dGVuZHMgV2ViR0wxIHwgV2ViR0wyID0gV2ViR0wxIHwgV2ViR0wyPiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fc2hhZGVyOiBXZWJHTFNoYWRlcjtcbiAgcHJpdmF0ZSBfX2NvbXBpbGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gc2hhZGVyLlxuICAgKi9cbiAgcHVibGljIGdldCBzaGFkZXIoKTogV2ViR0xTaGFkZXIge1xuICAgIHJldHVybiB0aGlzLl9fc2hhZGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gc2hhZGVyLiBTaG9ydGVyIHRoYW4gW1tHTENhdFNoYWRlci5zaGFkZXJdXS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3KCk6IFdlYkdMU2hhZGVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3NoYWRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRTaGFkZXIgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIHNoYWRlcjogV2ViR0xTaGFkZXIgKSB7XG4gICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XG4gICAgdGhpcy5fX3NoYWRlciA9IHNoYWRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSBzaGFkZXIuXG4gICAqL1xuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9fZ2xDYXQuZ2wuZGVsZXRlU2hhZGVyKCB0aGlzLl9fc2hhZGVyICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHdoZXRoZXIgdGhlIGxhc3QgY29tcGlsYXRpb24gd2FzIHN1Y2Nlc3NmdWwgb3Igbm90LlxuICAgKi9cbiAgcHVibGljIGlzQ29tcGlsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX19jb21waWxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21waWxlIHRoZSBzaGFkZXIuXG4gICAqL1xuICBwdWJsaWMgY29tcGlsZSggY29kZTogc3RyaW5nICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGdsLnNoYWRlclNvdXJjZSggdGhpcy5fX3NoYWRlciwgY29kZSApO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoIHRoaXMuX19zaGFkZXIgKTtcblxuICAgIHRoaXMuX19jb21waWxlZCA9IGdsLmdldFNoYWRlclBhcmFtZXRlciggdGhpcy5fX3NoYWRlciwgR0xfQ09NUElMRV9TVEFUVVMgKTtcbiAgICBpZiAoICF0aGlzLl9fY29tcGlsZWQgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoIGdsLmdldFNoYWRlckluZm9Mb2coIHRoaXMuX19zaGFkZXIgKSEgKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMX0NMQU1QX1RPX0VER0UsIEdMX0ZMT0FULCBHTF9IQUxGX0ZMT0FULCBHTF9MSU5FQVIsIEdMX05FQVJFU1QsIEdMX1IxNkYsIEdMX1IzMkYsIEdMX1JHQkEsIEdMX1JHQkExNkYsIEdMX1JHQkEzMkYsIEdMX1JHQkE4LCBHTF9URVhUVVJFXzJELCBHTF9URVhUVVJFX0NVQkVfTUFQLCBHTF9URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1gsIEdMX1RFWFRVUkVfTUFHX0ZJTFRFUiwgR0xfVEVYVFVSRV9NSU5fRklMVEVSLCBHTF9URVhUVVJFX1dSQVBfUywgR0xfVEVYVFVSRV9XUkFQX1QsIEdMX1VOU0lHTkVEX0JZVEUgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcbmltcG9ydCB7IEdMQ2F0RXJyb3JzIH0gZnJvbSAnLi9HTENhdEVycm9ycyc7XG5cbmNvbnN0IHplcm9UZXh0dXJlQXJyYXkgPSBuZXcgVWludDhBcnJheSggWyAwLCAwLCAwLCAwIF0gKTtcblxudHlwZSBXZWJHTDEgPSBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG50eXBlIFdlYkdMMiA9IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMVGV4dHVyZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0VGV4dHVyZTxUQ29udGV4dCBleHRlbmRzIFdlYkdMMSB8IFdlYkdMMiA9IFdlYkdMMSB8IFdlYkdMMj4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3RleHR1cmU6IFdlYkdMVGV4dHVyZTtcbiAgcHJpdmF0ZSBfX3dpZHRoID0gMDtcbiAgcHJpdmF0ZSBfX2hlaWdodCA9IDA7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgdGV4dHVyZSgpOiBXZWJHTFRleHR1cmUge1xuICAgIHJldHVybiB0aGlzLl9fdGV4dHVyZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIHRleHR1cmUuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0VGV4dHVyZS50ZXh0dXJlZF1dXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTFRleHR1cmUge1xuICAgIHJldHVybiB0aGlzLl9fdGV4dHVyZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgd2lkdGguXG4gICAqL1xuICBwdWJsaWMgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX193aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgaGVpZ2h0LlxuICAgKi9cbiAgcHVibGljIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2hlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRUZXh0dXJlIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCB0ZXh0dXJlOiBXZWJHTFRleHR1cmUgKSB7XG4gICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XG4gICAgdGhpcy5fX3RleHR1cmUgPSB0ZXh0dXJlO1xuICAgIHRoaXMudGV4dHVyZUZpbHRlciggR0xfTElORUFSICk7XG4gICAgdGhpcy50ZXh0dXJlV3JhcCggR0xfQ0xBTVBfVE9fRURHRSApO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9fZ2xDYXQuZ2wuZGVsZXRlVGV4dHVyZSggdGhpcy5fX3RleHR1cmUgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0byBmaWx0ZXIgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgdGV4dHVyZUZpbHRlcigpOiB2b2lkO1xuICBwdWJsaWMgdGV4dHVyZUZpbHRlciggZmlsdGVyOiBudW1iZXIgKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVGaWx0ZXIoIGZpbHRlck1hZzogbnVtYmVyLCBmaWx0ZXJNaW46IG51bWJlciApOiB2b2lkO1xuICBwdWJsaWMgdGV4dHVyZUZpbHRlciggZmlsdGVyTWFnOiBudW1iZXIgPSBHTF9ORUFSRVNULCBmaWx0ZXJNaW46IG51bWJlciA9IGZpbHRlck1hZyApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9NQUdfRklMVEVSLCBmaWx0ZXJNYWcgKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfTUlOX0ZJTFRFUiwgZmlsdGVyTWluICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IHRvIHdyYXAgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgdGV4dHVyZVdyYXAoKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVXcmFwKCB3cmFwOiBudW1iZXIgKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVXcmFwKCB3cmFwUzogbnVtYmVyLCB3cmFwVDogbnVtYmVyICk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlV3JhcCggd3JhcFM6IG51bWJlciA9IEdMX0NMQU1QX1RPX0VER0UsIHdyYXBUOiBudW1iZXIgPSB3cmFwUyApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9XUkFQX1MsIHdyYXBTICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFXzJELCBHTF9URVhUVVJFX1dSQVBfVCwgd3JhcFQgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyB0ZXhTdG9yYWdlMkQoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB7IHRhcmdldCA9IEdMX1RFWFRVUkVfMkQsIGxldmVsID0gMSwgZm9ybWF0ID0gR0xfUkdCQTggfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICApIHtcbiAgICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICAgIGdsLnRleFN0b3JhZ2UyRCggdGFyZ2V0LCBsZXZlbCwgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICB9ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEdMQ2F0RXJyb3JzLldlYkdMMkV4Y2x1c2l2ZUVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSB2YWx1ZSBmb3IgdGhlIHBhc3NlZCBwYXJhbWV0ZXIgbmFtZS5cbiAgICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViR0xSZW5kZXJpbmdDb250ZXh0L2dldFBhcmFtZXRlclxuICAgKi9cbiAgcHVibGljIGdldFBhcmFtZXRlciggcG5hbWU6IEdMZW51bSApOiBhbnkge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHJldHVybiB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGhpcywgKCkgPT4ge1xuICAgICAgcmV0dXJuIGdsLmdldFBhcmFtZXRlciggcG5hbWUgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogU3BlY2lmeSB0aGUgcGl4ZWwgc3RvcmFnZSBtb2Rlcy5cbiAgICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViR0xSZW5kZXJpbmdDb250ZXh0L3BpeGVsU3RvcmVpXG4gICAqL1xuICBwdWJsaWMgcGl4ZWxTdG9yZWkoIHBuYW1lOiBHTGVudW0sIHBhcmFtOiBudW1iZXIgfCBib29sZWFuICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5waXhlbFN0b3JlaSggcG5hbWUsIHBhcmFtICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBzZXRUZXh0dXJlKCBzb3VyY2U6IFRleEltYWdlU291cmNlICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC50ZXhJbWFnZTJEKCBHTF9URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBzb3VyY2UgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fd2lkdGggPSBzb3VyY2Uud2lkdGg7XG4gICAgdGhpcy5fX2hlaWdodCA9IHNvdXJjZS5oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyBkYXRhIGludG8gdGhpcyB0ZXh0dXJlLlxuICAgKiBUaGlzIGZ1bmN0aW9uIHVzZXMgVHlwZWRBcnJheS4gSWYgeW91IHdhbnQgdG8gc291cmNlIGltYWdlIGRhdGEsIHVzZSBgR0xDYXQuc2V0VGV4dHVyZSgpYCBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHNldFRleHR1cmVGcm9tQXJyYXkoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBzb3VyY2U6IEFycmF5QnVmZmVyVmlldyB8IG51bGwsXG4gICAge1xuICAgICAgaW50ZXJuYWxmb3JtYXQgPSBHTF9SR0JBOCxcbiAgICAgIGZvcm1hdCA9IEdMX1JHQkEsXG4gICAgICB0eXBlID0gR0xfVU5TSUdORURfQllURVxuICAgIH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBsZXQgaWZvcm1hdCA9IGludGVybmFsZm9ybWF0O1xuICAgIGlmIChcbiAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICApIHtcbiAgICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzE1NTAyL2ZpbGVzXG4gICAgICBpZiAoXG4gICAgICAgIGludGVybmFsZm9ybWF0ID09PSBHTF9SMTZGXG4gICAgICAgIHx8IGludGVybmFsZm9ybWF0ID09PSBHTF9SMzJGXG4gICAgICAgIHx8IGludGVybmFsZm9ybWF0ID09PSBHTF9SR0JBMTZGXG4gICAgICAgIHx8IGludGVybmFsZm9ybWF0ID09PSBHTF9SR0JBMzJGXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ0VYVF9jb2xvcl9idWZmZXJfZmxvYXQnLCB0cnVlICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdFWFRfZmxvYXRfYmxlbmQnICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXInICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICggdHlwZSA9PT0gR0xfSEFMRl9GTE9BVCApIHtcbiAgICAgICAgdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ09FU190ZXh0dXJlX2hhbGZfZmxvYXQnLCB0cnVlICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0X2xpbmVhcicgKTtcbiAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09IEdMX0ZMT0FUICkge1xuICAgICAgICB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnT0VTX3RleHR1cmVfZmxvYXQnLCB0cnVlICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXInICk7XG4gICAgICB9XG5cbiAgICAgIGlmb3JtYXQgPSBmb3JtYXQ7XG4gICAgfVxuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnRleEltYWdlMkQoXG4gICAgICAgIEdMX1RFWFRVUkVfMkQsXG4gICAgICAgIDAsXG4gICAgICAgIGlmb3JtYXQsXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIDAsXG4gICAgICAgIGZvcm1hdCxcbiAgICAgICAgdHlwZSxcbiAgICAgICAgc291cmNlXG4gICAgICApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogQ29weSBwaXhlbHMgZnJvbSBjdXJyZW50IGZyYW1lYnVmZmVyIHRvIGdpdmVuIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgY29weVRleHR1cmUoIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5jb3B5VGV4SW1hZ2UyRCggR0xfVEVYVFVSRV8yRCwgMCwgR0xfUkdCQSwgMCwgMCwgd2lkdGgsIGhlaWdodCwgMCApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyBjdWJlbWFwIGRhdGEgaW50byB0aGlzIHRleHR1cmUuXG4gICAqIEBwYXJhbSB0ZXh0dXJlcyBBcnJheSBvZiBpYW1nZXMuIE9yZGVyOiBgWCtgLCBgWC1gLCBgWStgLCBgWS1gLCBgWitgLCBgWi1gXG4gICAqIEB0b2RvIGR1ZSB0byBjb21wYXRpYmlsaXR5IG9mIGl0cyBgd2lkdGhgIGFuZCBgaGVpZ2h0YCBpdCBzaG91bGQgbm90IGJlIHVzZWQgeWV0XG4gICAqL1xuICBwdWJsaWMgc2V0Q3ViZW1hcCggdGV4dHVyZXM6IFRleEltYWdlU291cmNlW10gKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlQ3ViZU1hcCggdGhpcywgKCkgPT4ge1xuICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgNjsgaSArKyApIHtcbiAgICAgICAgZ2wudGV4SW1hZ2UyRChcbiAgICAgICAgICBHTF9URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1ggKyBpLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgR0xfUkdCQSxcbiAgICAgICAgICBHTF9SR0JBLFxuICAgICAgICAgIEdMX1VOU0lHTkVEX0JZVEUsXG4gICAgICAgICAgdGV4dHVyZXNbIGkgXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9NSU5fRklMVEVSLCBHTF9MSU5FQVIgKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIEdMX1RFWFRVUkVfTUFHX0ZJTFRFUiwgR0xfTElORUFSICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFX0NVQkVfTUFQLCBHTF9URVhUVVJFX1dSQVBfUywgR0xfQ0xBTVBfVE9fRURHRSApO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9XUkFQX1QsIEdMX0NMQU1QX1RPX0VER0UgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFsgMCwgMCwgMCwgMCBdIHRvIHRoaXMgdGV4dHVyZS5cbiAgICogVXNlZnVsIGZvciB0ZW1wb3JhcnkgdXNlLi5cbiAgICovXG4gIHB1YmxpYyBzZXRaZXJvVGV4dHVyZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFRleHR1cmVGcm9tQXJyYXkoIDEsIDEsIHplcm9UZXh0dXJlQXJyYXkgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBHTENhdCB9IGZyb20gJy4vR0xDYXQnO1xuaW1wb3J0IHsgR0xDYXRCdWZmZXIgfSBmcm9tICcuL0dMQ2F0QnVmZmVyJztcblxudHlwZSBXZWJHTDEgPSBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG50eXBlIFdlYkdMMiA9IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMVHJhbnNmb3JtRmVlZGJhY2suXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdFRyYW5zZm9ybUZlZWRiYWNrPFRDb250ZXh0IGV4dGVuZHMgV2ViR0wxIHwgV2ViR0wyID0gV2ViR0wxIHwgV2ViR0wyPiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fdHJhbnNmb3JtRmVlZGJhY2s6IFdlYkdMVHJhbnNmb3JtRmVlZGJhY2s7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gdHJhbnNmb3JtIGZlZWRiYWNrLlxuICAgKi9cbiAgcHVibGljIGdldCB0cmFuc2Zvcm1GZWVkYmFjaygpOiBXZWJHTFRyYW5zZm9ybUZlZWRiYWNrIHtcbiAgICByZXR1cm4gdGhpcy5fX3RyYW5zZm9ybUZlZWRiYWNrO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gdHJhbnNmb3JtIGZlZWRiYWNrLiBTaG9ydGVyIHRoYW4ge0BsaW5rIHRyYW5zZm9ybUZlZWRiYWNrfS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3KCk6IFdlYkdMVHJhbnNmb3JtRmVlZGJhY2sge1xuICAgIHJldHVybiB0aGlzLl9fdHJhbnNmb3JtRmVlZGJhY2s7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0VHJhbnNmb3JtRmVlZGJhY2sgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIHRyYW5zZm9ybUZlZWRiYWNrOiBXZWJHTFRyYW5zZm9ybUZlZWRiYWNrICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX190cmFuc2Zvcm1GZWVkYmFjayA9IHRyYW5zZm9ybUZlZWRiYWNrO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHRyYW5zZm9ybSBmZWVkYmFjay5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICApIHtcbiAgICAgIGdsLmRlbGV0ZVRyYW5zZm9ybUZlZWRiYWNrKCB0aGlzLl9fdHJhbnNmb3JtRmVlZGJhY2sgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIGJ1ZmZlciB0byB0aGlzIHRyYW5zZm9ybSBmZWVkYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kQnVmZmVyKCBpbmRleDogR0x1aW50LCBidWZmZXI6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGwgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dFxuICAgICkge1xuICAgICAgdGhpcy5fX2dsQ2F0LmJpbmRUcmFuc2Zvcm1GZWVkYmFjayggdGhpcywgKCkgPT4ge1xuICAgICAgICBnbC5iaW5kQnVmZmVyQmFzZSggZ2wuVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUiwgaW5kZXgsIGJ1ZmZlcj8uYnVmZmVyID8/IG51bGwgKTtcbiAgICAgIH0gKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB0eXBlIHsgR0xDYXQsIEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlIH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgeyBHTF9BUlJBWV9CVUZGRVIsIEdMX0VMRU1FTlRfQVJSQVlfQlVGRkVSLCBHTF9GTE9BVCB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuaW1wb3J0IHR5cGUgeyBHTENhdEJ1ZmZlciB9IGZyb20gJy4vR0xDYXRCdWZmZXInO1xuXG50eXBlIFdlYkdMMSA9IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcbnR5cGUgV2ViR0wyID0gV2ViR0wyUmVuZGVyaW5nQ29udGV4dDtcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xWZXJ0ZXhBcnJheU9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0VmVydGV4QXJyYXk8VENvbnRleHQgZXh0ZW5kcyBXZWJHTDEgfCBXZWJHTDIgPSBXZWJHTDEgfCBXZWJHTDI+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX192ZXJ0ZXhBcnJheTogR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQ+O1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgYnVmZmVyKCk6IEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0PiB7XG4gICAgcmV0dXJuIHRoaXMuX192ZXJ0ZXhBcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRCdWZmZXIuYnVmZmVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBHTENhdFZlcnRleEFycmF5UmF3VHlwZTxUQ29udGV4dD4ge1xuICAgIHJldHVybiB0aGlzLl9fdmVydGV4QXJyYXk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0QnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCB2ZXJ0ZXhBcnJheTogR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQ+ICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX192ZXJ0ZXhBcnJheSA9IHZlcnRleEFycmF5O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICApIHtcbiAgICAgIGdsLmRlbGV0ZVZlcnRleEFycmF5KCB0aGlzLl9fdmVydGV4QXJyYXkgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JywgdHJ1ZSApO1xuICAgICAgZXh0LmRlbGV0ZVZlcnRleEFycmF5T0VTKCB0aGlzLl9fdmVydGV4QXJyYXkgYXMgYW55ICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSB2ZXJ0ZXggYnVmZmVyIHRvIHRoZSB2ZXJ0ZXggYXJyYXkuXG4gICAqL1xuICBwdWJsaWMgYmluZFZlcnRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PixcbiAgICBsb2NhdGlvbjogbnVtYmVyLFxuICAgIHNpemUgPSAxLFxuICAgIGRpdmlzb3IgPSAwLFxuICAgIHR5cGU6IG51bWJlciA9IEdMX0ZMT0FULFxuICAgIHN0cmlkZSA9IDAsXG4gICAgb2Zmc2V0ID0gMFxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFZlcnRleEFycmF5KCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5iaW5kQnVmZmVyKCBHTF9BUlJBWV9CVUZGRVIsIHNvdXJjZS5yYXcgKTtcbiAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KCBsb2NhdGlvbiApO1xuICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlciggbG9jYXRpb24sIHNpemUsIHR5cGUsIGZhbHNlLCBzdHJpZGUsIG9mZnNldCApO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAgIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dFxuICAgICAgKSB7XG4gICAgICAgIGdsLnZlcnRleEF0dHJpYkRpdmlzb3IoIGxvY2F0aW9uLCBkaXZpc29yICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBleHQgPSB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnQU5HTEVfaW5zdGFuY2VkX2FycmF5cycgKTtcbiAgICAgICAgaWYgKCBleHQgKSB7XG4gICAgICAgICAgZXh0LnZlcnRleEF0dHJpYkRpdmlzb3JBTkdMRSggbG9jYXRpb24sIGRpdmlzb3IgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGFuIGluZGV4IGJ1ZmZlciB0byB0aGUgdmVydGV4IGFycmF5LlxuICAgKi9cbiAgcHVibGljIGJpbmRJbmRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PlxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFZlcnRleEFycmF5KCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5iaW5kQnVmZmVyKCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiwgc291cmNlLnJhdyApO1xuICAgIH0gKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xDYXRQcm9ncmFtLCBHTENhdFByb2dyYW1MaW5rT3B0aW9ucyB9IGZyb20gJy4vR0xDYXRQcm9ncmFtJztcbmltcG9ydCB7IEdMX0FSUkFZX0JVRkZFUiwgR0xfQkxFTkQsIEdMX0NPTE9SX0FUVEFDSE1FTlQwLCBHTF9DT0xPUl9CVUZGRVJfQklULCBHTF9ERVBUSF9BVFRBQ0hNRU5ULCBHTF9ERVBUSF9CVUZGRVJfQklULCBHTF9ERVBUSF9DT01QT05FTlQxNiwgR0xfREVQVEhfQ09NUE9ORU5UMjQsIEdMX0RFUFRIX1RFU1QsIEdMX0RSQVdfRlJBTUVCVUZGRVIsIEdMX0VMRU1FTlRfQVJSQVlfQlVGRkVSLCBHTF9GTE9BVCwgR0xfRlJBR01FTlRfU0hBREVSLCBHTF9GUkFNRUJVRkZFUiwgR0xfTEVRVUFMLCBHTF9NQVhfRFJBV19CVUZGRVJTLCBHTF9ORUFSRVNULCBHTF9PTkVfTUlOVVNfU1JDX0FMUEhBLCBHTF9SRUFEX0ZSQU1FQlVGRkVSLCBHTF9SRU5ERVJCVUZGRVIsIEdMX1JHQkEsIEdMX1JHQkEzMkYsIEdMX1JHQkE4LCBHTF9TUkNfQUxQSEEsIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIEdMX1RSQU5TRk9STV9GRUVEQkFDSywgR0xfVkVSVEVYX1NIQURFUiB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuaW1wb3J0IHsgQmluZEhlbHBlciB9IGZyb20gJy4vdXRpbHMvQmluZEhlbHBlcic7XG5pbXBvcnQgeyBHTENhdEJ1ZmZlciB9IGZyb20gJy4vR0xDYXRCdWZmZXInO1xuaW1wb3J0IHsgR0xDYXRFcnJvcnMgfSBmcm9tICcuL0dMQ2F0RXJyb3JzJztcbmltcG9ydCB7IEdMQ2F0RnJhbWVidWZmZXIgfSBmcm9tICcuL0dMQ2F0RnJhbWVidWZmZXInO1xuaW1wb3J0IHsgR0xDYXRSZW5kZXJidWZmZXIgfSBmcm9tICcuL0dMQ2F0UmVuZGVyYnVmZmVyJztcbmltcG9ydCB7IEdMQ2F0U2hhZGVyIH0gZnJvbSAnLi9HTENhdFNoYWRlcic7XG5pbXBvcnQgeyBHTENhdFRleHR1cmUgfSBmcm9tICcuL0dMQ2F0VGV4dHVyZSc7XG5pbXBvcnQgeyBHTENhdFRyYW5zZm9ybUZlZWRiYWNrIH0gZnJvbSAnLi9HTENhdFRyYW5zZm9ybUZlZWRiYWNrJztcbmltcG9ydCB7IEdMQ2F0VmVydGV4QXJyYXkgfSBmcm9tICcuL0dMQ2F0VmVydGV4QXJyYXknO1xuXG50eXBlIFdlYkdMMSA9IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcbnR5cGUgV2ViR0wyID0gV2ViR0wyUmVuZGVyaW5nQ29udGV4dDtcblxuZXhwb3J0IHR5cGUgV2ViR0xFeHRlbnNpb24gPSBhbnk7XG5cbmV4cG9ydCB0eXBlIEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0IGV4dGVuZHMgV2ViR0wxIHwgV2ViR0wyID0gV2ViR0wxIHwgV2ViR0wyPlxuICA9IFRDb250ZXh0IGV4dGVuZHMgV2ViR0wyXG4gICAgPyBXZWJHTFZlcnRleEFycmF5T2JqZWN0XG4gICAgOiBXZWJHTFZlcnRleEFycmF5T2JqZWN0T0VTO1xuXG4vKipcbiAqIFdlYkdMIHdyYXBwZXIgd2l0aCBwbGVudHkgb2YgaGFja2FiaWxpdHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdDxUQ29udGV4dCBleHRlbmRzIFdlYkdMMSB8IFdlYkdMMiA9IFdlYkdMMSB8IFdlYkdMMj4ge1xuICBwdWJsaWMgc3RhdGljIHRocm93SWZOdWxsPFQ+KCB2OiBUIHwgbnVsbCApOiBUIHtcbiAgICBpZiAoIHYgPT0gbnVsbCApIHtcbiAgICAgIHRocm93IEdMQ2F0RXJyb3JzLlVuZXhwZWN0ZWROdWxsRXJyb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBwcmVmZXJyZWRNdWx0aXNhbXBsZVNhbXBsZXMgPSA0O1xuXG4gIHB1YmxpYyBwcmVmZXJyZWREZXB0aEZvcm1hdDogR0xlbnVtOyAvLyB3aWxsIGJlIHNldCBpbiBjb25zdHJ1Y3RvclxuXG4gIHByaXZhdGUgX19nbDogVENvbnRleHQ7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJWZXJ0ZXhCdWZmZXIgPSBuZXcgQmluZEhlbHBlcjxHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggYnVmZmVyICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kQnVmZmVyKCBHTF9BUlJBWV9CVUZGRVIsIGJ1ZmZlcj8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJJbmRleEJ1ZmZlciA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCBidWZmZXIgKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcbiAgICAgIGdsLmJpbmRCdWZmZXIoIEdMX0VMRU1FTlRfQVJSQVlfQlVGRkVSLCBidWZmZXI/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyVHJhbnNmb3JtRmVlZGJhY2sgPSBuZXcgQmluZEhlbHBlcjxHTENhdFRyYW5zZm9ybUZlZWRiYWNrPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCBidWZmZXIgKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICAgICkge1xuICAgICAgICBnbC5iaW5kVHJhbnNmb3JtRmVlZGJhY2soIEdMX1RSQU5TRk9STV9GRUVEQkFDSywgYnVmZmVyPy5yYXcgPz8gbnVsbCApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgR0xDYXRFcnJvcnMuV2ViR0wyRXhjbHVzaXZlRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyVmVydGV4QXJyYXkgPSBuZXcgQmluZEhlbHBlcjxHTENhdFZlcnRleEFycmF5PFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCB2ZXJ0ZXhBcnJheSApID0+IHtcbiAgICAgIHRoaXMucmF3QmluZFZlcnRleEFycmF5KCB2ZXJ0ZXhBcnJheT8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJUZXh0dXJlMkQgPSBuZXcgQmluZEhlbHBlcjxHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIHRleHR1cmUgKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcbiAgICAgIGdsLmJpbmRUZXh0dXJlKCBHTF9URVhUVVJFXzJELCB0ZXh0dXJlPy5yYXcgPz8gbnVsbCApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlclRleHR1cmVDdWJlTWFwID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCB0ZXh0dXJlICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kVGV4dHVyZSggR0xfVEVYVFVSRV9DVUJFX01BUCwgdGV4dHVyZT8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJSZW5kZXJidWZmZXIgPSBuZXcgQmluZEhlbHBlcjxHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggcmVuZGVyYnVmZmVyICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kUmVuZGVyYnVmZmVyKCBHTF9SRU5ERVJCVUZGRVIsIHJlbmRlcmJ1ZmZlcj8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJGcmFtZWJ1ZmZlciA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIGZyYW1lYnVmZmVyICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kRnJhbWVidWZmZXIoIEdMX0ZSQU1FQlVGRkVSLCBmcmFtZWJ1ZmZlcj8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJQcm9ncmFtID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRQcm9ncmFtPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCBwcm9ncmFtICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC51c2VQcm9ncmFtKCBwcm9ncmFtPy5yYXcgPz8gbnVsbCApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlckRyYXdCdWZmZXJzID0gbmV3IEJpbmRIZWxwZXI8R0xlbnVtW10+KFxuICAgIFsgR0xfQ09MT1JfQVRUQUNITUVOVDAgXSxcbiAgICAoIGJ1ZmZlcnMgKSA9PiB7XG4gICAgICB0aGlzLnJhd0RyYXdCdWZmZXJzKCBidWZmZXJzICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19leHRlbnNpb25DYWNoZTogeyBbIG5hbWU6IHN0cmluZyBdOiBXZWJHTEV4dGVuc2lvbiB9ID0ge307XG4gIHByaXZhdGUgX19kdW1teVRleHR1cmVDYWNoZT86IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD47XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcmVuZGVyaW5nIGNvbnRleHQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlbmRlcmluZ0NvbnRleHQoKTogVENvbnRleHQge1xuICAgIHJldHVybiB0aGlzLl9fZ2w7XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biByZW5kZXJpbmcgY29udGV4dC4gU2hvcnRlciB0aGFuIFtbR0xDYXQucmVuZGVyaW5nQ29udGV4dF1dXG4gICAqL1xuICBwdWJsaWMgZ2V0IGdsKCk6IFRDb250ZXh0IHtcbiAgICByZXR1cm4gdGhpcy5fX2dsO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdCBpbnN0YW5jZS5cbiAgICogUmVuZGVyaW5nIGNvbnRleHQgaXMgcmVxdWlyZWQuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsOiBUQ29udGV4dCApIHtcbiAgICB0aGlzLl9fZ2wgPSBnbDtcblxuICAgIGdsLmVuYWJsZSggR0xfREVQVEhfVEVTVCApO1xuICAgIGdsLmRlcHRoRnVuYyggR0xfTEVRVUFMICk7XG4gICAgZ2wuZW5hYmxlKCBHTF9CTEVORCApO1xuICAgIGdsLmJsZW5kRnVuYyggR0xfU1JDX0FMUEhBLCBHTF9PTkVfTUlOVVNfU1JDX0FMUEhBICk7XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0XG4gICAgKSB7XG4gICAgICB0aGlzLnByZWZlcnJlZERlcHRoRm9ybWF0ID0gR0xfREVQVEhfQ09NUE9ORU5UMjQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJlZmVycmVkRGVwdGhGb3JtYXQgPSBHTF9ERVBUSF9DT01QT05FTlQxNjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSBkdW1teSB0ZXh0dXJlLCAxMDAlIG9yZ2FuaWMgcHVyZSAjRkYwMEZGIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGR1bW15VGV4dHVyZSgpOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHtcbiAgICBpZiAoIHRoaXMuX19kdW1teVRleHR1cmVDYWNoZSApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fZHVtbXlUZXh0dXJlQ2FjaGU7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dHVyZSA9IHRoaXMuY3JlYXRlVGV4dHVyZSgpO1xuXG4gICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KCAxLCAxLCBuZXcgVWludDhBcnJheSggWyAyNTUsIDAsIDI1NSwgMjU1IF0gKSApO1xuICAgIHRoaXMuX19kdW1teVRleHR1cmVDYWNoZSA9IHRleHR1cmU7XG4gICAgcmV0dXJuIHRleHR1cmU7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgYW4gZXh0ZW5zaW9uLlxuICAgKiBJZiB0aGV5IGlzIHlvdXIgcHJlY2lvdXMgb25lIGFuZCB5b3UgY2Fubm90IGxpdmUgd2l0aG91dCBoaW0sIHR1cm4gb24gYHRocm93SWZOb3RGb3VuZGAuXG4gICAqL1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0IHwgbnVsbDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfaGFsZl9mbG9hdCcsXG4gICAgdGhyb3dJZk5vdEZvdW5kOiB0cnVlXG4gICk6IE9FU190ZXh0dXJlX2hhbGZfZmxvYXQ7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2hhbGZfZmxvYXRfbGluZWFyJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0X2xpbmVhciB8IG51bGw7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2hhbGZfZmxvYXRfbGluZWFyJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogT0VTX3RleHR1cmVfaGFsZl9mbG9hdF9saW5lYXI7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2Zsb2F0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBPRVNfdGV4dHVyZV9mbG9hdCB8IG51bGw7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2Zsb2F0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogT0VTX3RleHR1cmVfZmxvYXQ7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2Zsb2F0X2xpbmVhcicsXG4gICAgdGhyb3dJZk5vdEZvdW5kPzogZmFsc2VcbiAgKTogT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyIHwgbnVsbDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyO1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBBTkdMRV9pbnN0YW5jZWRfYXJyYXlzIHwgbnVsbDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnQU5HTEVfaW5zdGFuY2VkX2FycmF5cycsXG4gICAgdGhyb3dJZk5vdEZvdW5kOiB0cnVlXG4gICk6IEFOR0xFX2luc3RhbmNlZF9hcnJheXM7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBPRVNfdmVydGV4X2FycmF5X29iamVjdCB8IG51bGw7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogT0VTX3ZlcnRleF9hcnJheV9vYmplY3Q7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ1dFQkdMX2RyYXdfYnVmZmVycycsXG4gICAgdGhyb3dJZk5vdEZvdW5kPzogZmFsc2VcbiAgKTogV0VCR0xfZHJhd19idWZmZXJzIHwgbnVsbDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnV0VCR0xfZHJhd19idWZmZXJzJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogV0VCR0xfZHJhd19idWZmZXJzO1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKCBuYW1lOiBzdHJpbmcsIHRocm93SWZOb3RGb3VuZD86IGJvb2xlYW4gKTogV2ViR0xFeHRlbnNpb24gfCBudWxsO1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKCBuYW1lOiBzdHJpbmcsIHRocm93SWZOb3RGb3VuZD86IGJvb2xlYW4gKTogV2ViR0xFeHRlbnNpb24gfCBudWxsIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmICggdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF0gKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX19leHRlbnNpb25DYWNoZVsgbmFtZSBdID0gZ2wuZ2V0RXh0ZW5zaW9uKCBuYW1lICk7XG4gICAgICBpZiAoIHRoaXMuX19leHRlbnNpb25DYWNoZVsgbmFtZSBdICkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIHRocm93SWZOb3RGb3VuZCApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoICdHTENhdC5nZXRFeHRlbnNpb246IFRoZSBleHRlbnNpb24gXCInICsgbmFtZSArICdcIiBpcyBub3Qgc3VwcG9ydGVkJyApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBleHRlbnNpb25zLlxuICAgKiBJZiB0aGV5IGFyZSB5b3VyIHByZWNpb3VzIG9uZXMgYW5kIHlvdSBjYW5ub3QgbGl2ZSB3aXRob3V0IHRoZW0sIHR1cm4gb24gYHRocm93SWZOb3RGb3VuZGAuXG4gICAqL1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9ucyggbmFtZXM6IHN0cmluZ1tdLCB0aHJvd0lmTm90Rm91bmQ/OiBib29sZWFuICk6IEFycmF5PFdlYkdMRXh0ZW5zaW9uIHwgbnVsbD4ge1xuICAgIHJldHVybiBuYW1lcy5tYXAoICggbiApID0+IHRoaXMuZ2V0RXh0ZW5zaW9uKCBuLCB0aHJvd0lmTm90Rm91bmQgKSApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBzaGFkZXIgb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVNoYWRlciggdHlwZTogbnVtYmVyICk6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBjb25zdCBzaGFkZXIgPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlU2hhZGVyKCB0eXBlICkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRTaGFkZXIoIHRoaXMsIHNoYWRlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdCBwcm9ncmFtIG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVQcm9ncmFtKCk6IEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgY29uc3QgcHJvZ3JhbSA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVQcm9ncmFtKCkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRQcm9ncmFtKCB0aGlzLCBwcm9ncmFtICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IHByb2dyYW0gb2JqZWN0LCBpbiBsYXppZXIgd2F5LlxuICAgKi9cbiAgcHVibGljIGxhenlQcm9ncmFtKFxuICAgIHZlcnQ6IHN0cmluZyxcbiAgICBmcmFnOiBzdHJpbmcsXG4gICAgb3B0aW9uczogR0xDYXRQcm9ncmFtTGlua09wdGlvbnMgPSB7fSxcbiAgKTogR0xDYXRQcm9ncmFtPFRDb250ZXh0PiB7XG4gICAgbGV0IHZlcnRleFNoYWRlcjogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBmcmFnbWVudFNoYWRlcjogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBwcm9ncmFtOiBHTENhdFNoYWRlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgLy8gPT0gdmVydCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgdmVydGV4U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXIoIEdMX1ZFUlRFWF9TSEFERVIgKTtcbiAgICAgIHZlcnRleFNoYWRlci5jb21waWxlKCB2ZXJ0ICk7XG5cbiAgICAgIC8vID09IGZyYWcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXIoIEdMX0ZSQUdNRU5UX1NIQURFUiApO1xuICAgICAgZnJhZ21lbnRTaGFkZXIuY29tcGlsZSggZnJhZyApO1xuXG4gICAgICAvLyA9PSBwcm9ncmFtID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCBwcm9ncmFtID0gdGhpcy5jcmVhdGVQcm9ncmFtKCk7XG4gICAgICBwcm9ncmFtLmxpbmsoIFsgdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlciBdLCBvcHRpb25zICk7XG5cbiAgICAgIC8vID09IGFsbW9zdCBkb25lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHJldHVybiBwcm9ncmFtO1xuICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgcHJvZ3JhbT8uZGlzcG9zZSgpO1xuICAgICAgZnJhZ21lbnRTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHZlcnRleFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IHByb2dyYW0gb2JqZWN0LCBpbiBsYXppZXIgd2F5LlxuICAgKiBJdCdzIGdvbm5hIGJlIGFzeW5jaHJvbm91cyBpZiB5b3UgaGF2ZSB0aGUgS0hSX3BhcmFsbGVsX3NoYWRlcl9jb21waWxlIGV4dGVuc2lvbiBzdXBwb3J0LlxuICAgKi9cbiAgcHVibGljIGxhenlQcm9ncmFtQXN5bmMoXG4gICAgdmVydDogc3RyaW5nLFxuICAgIGZyYWc6IHN0cmluZyxcbiAgICBvcHRpb25zOiBHTENhdFByb2dyYW1MaW5rT3B0aW9ucyA9IHt9LFxuICApOiBQcm9taXNlPEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4+IHtcbiAgICBsZXQgdmVydGV4U2hhZGVyOiBHTENhdFNoYWRlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IGZyYWdtZW50U2hhZGVyOiBHTENhdFNoYWRlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IHByb2dyYW06IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICAvLyA9PSB2ZXJ0ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLmNyZWF0ZVNoYWRlciggR0xfVkVSVEVYX1NIQURFUiApO1xuICAgICAgdmVydGV4U2hhZGVyLmNvbXBpbGUoIHZlcnQgKTtcblxuICAgICAgLy8gPT0gZnJhZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLmNyZWF0ZVNoYWRlciggR0xfRlJBR01FTlRfU0hBREVSICk7XG4gICAgICBmcmFnbWVudFNoYWRlci5jb21waWxlKCBmcmFnICk7XG5cbiAgICAgIC8vID09IHByb2dyYW0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGNvbnN0IHByb2dyYW0gPSB0aGlzLmNyZWF0ZVByb2dyYW0oKTtcbiAgICAgIHJldHVybiBwcm9ncmFtLmxpbmtBc3luYyggWyB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyIF0sIG9wdGlvbnMgKS50aGVuKCAoKSA9PiB7XG4gICAgICAgIHJldHVybiBwcm9ncmFtO1xuICAgICAgfSApLmNhdGNoKCAoIGUgKSA9PiB7XG4gICAgICAgIHByb2dyYW0/LmRpc3Bvc2UoKTtcbiAgICAgICAgZnJhZ21lbnRTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgICAgdmVydGV4U2hhZGVyPy5kaXNwb3NlKCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCggZSApO1xuICAgICAgfSApO1xuICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgcHJvZ3JhbT8uZGlzcG9zZSgpO1xuICAgICAgZnJhZ21lbnRTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHZlcnRleFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCBlICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgYSBwcm9ncmFtIHRvIHVzZS5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSB1c2FnZSBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgdXNlUHJvZ3JhbTxUPihcbiAgICBwcm9ncmFtOiBHTENhdFByb2dyYW08VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggcHJvZ3JhbTogR0xDYXRQcm9ncmFtPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclByb2dyYW0uYmluZCggcHJvZ3JhbSwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgdmVydGV4IGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVCdWZmZXIoKTogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGNvbnN0IGJ1ZmZlciA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVCdWZmZXIoKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdEJ1ZmZlciggdGhpcywgYnVmZmVyICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIHZlcnRleCBidWZmZXIuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZFZlcnRleEJ1ZmZlcjxUPihcbiAgICBidWZmZXI6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIGJ1ZmZlcjogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyVmVydGV4QnVmZmVyLmJpbmQoIGJ1ZmZlciwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGFuIGluZGV4IGJ1ZmZlci5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kSW5kZXhCdWZmZXI8VD4oXG4gICAgYnVmZmVyOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCBidWZmZXI6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlckluZGV4QnVmZmVyLmJpbmQoIGJ1ZmZlciwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgdHJhbnNmb3JtIGZlZWRiYWNrLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVRyYW5zZm9ybUZlZWRiYWNrKCk6IEdMQ2F0VHJhbnNmb3JtRmVlZGJhY2s8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICApIHtcbiAgICAgIGNvbnN0IHRyYW5zZm9ybUZlZWRiYWNrID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVRyYW5zZm9ybUZlZWRiYWNrKCkgKTtcblxuICAgICAgcmV0dXJuIG5ldyBHTENhdFRyYW5zZm9ybUZlZWRiYWNrKCB0aGlzLCB0cmFuc2Zvcm1GZWVkYmFjayApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBHTENhdEVycm9ycy5XZWJHTDJFeGNsdXNpdmVFcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIHRyYW5zZm9ybSBmZWVkYmFjay5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kVHJhbnNmb3JtRmVlZGJhY2s8VD4oXG4gICAgdHJhbnNmb3JtRmVlZGJhY2s6IEdMQ2F0VHJhbnNmb3JtRmVlZGJhY2s8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggdHJhbnNmb3JtRmVlZGJhY2s6IEdMQ2F0VHJhbnNmb3JtRmVlZGJhY2s8VENvbnRleHQ+IHwgbnVsbCApID0+IFQsXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclRyYW5zZm9ybUZlZWRiYWNrLmJpbmQoIHRyYW5zZm9ybUZlZWRiYWNrLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB2ZXJ0ZXggYXJyYXkuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlVmVydGV4QXJyYXkoKTogR0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dFxuICAgICkge1xuICAgICAgY29uc3QgdmVydGV4QXJyYXkgPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlVmVydGV4QXJyYXkoKSApO1xuXG4gICAgICByZXR1cm4gbmV3IEdMQ2F0VmVydGV4QXJyYXkoIHRoaXMsIHZlcnRleEFycmF5IGFzIGFueSApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHQgPSB0aGlzLmdldEV4dGVuc2lvbiggJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JywgdHJ1ZSApO1xuXG4gICAgICBjb25zdCB2ZXJ0ZXhBcnJheSA9IEdMQ2F0LnRocm93SWZOdWxsKCBleHQuY3JlYXRlVmVydGV4QXJyYXlPRVMoKSApO1xuXG4gICAgICByZXR1cm4gbmV3IEdMQ2F0VmVydGV4QXJyYXkoIHRoaXMsIHZlcnRleEFycmF5IGFzIGFueSApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG9mIGBnbC5iaW5kVmVydGV4QXJyYXlgLlxuICAgKlxuICAgKiB7QGxpbmsgcmF3QmluZFZlcnRleEFycmF5fSBpcyBiZXR0ZXIuXG4gICAqL1xuICBwdWJsaWMgcmF3QmluZFZlcnRleEFycmF5KCBhcnJheTogR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQ+IHwgbnVsbCApOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICApIHtcbiAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSggYXJyYXkgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5nZXRFeHRlbnNpb24oICdPRVNfdmVydGV4X2FycmF5X29iamVjdCcsIHRydWUgKTtcbiAgICAgIGV4dC5iaW5kVmVydGV4QXJyYXlPRVMoIGFycmF5IGFzIGFueSApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgcmF3QmluZFZlcnRleEFycmF5fSBidXQgYmV0dGVyLlxuICAgKlxuICAgKiBCaW5kIGEgdmVydGV4IGFycmF5LlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRWZXJ0ZXhBcnJheTxUPihcbiAgICB2ZXJ0ZXhBcnJheTogR0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCB2ZXJ0ZXhBcnJheTogR0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJWZXJ0ZXhBcnJheS5iaW5kKCB2ZXJ0ZXhBcnJheSwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVUZXh0dXJlKCk6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgY29uc3QgdGV4dHVyZSA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVUZXh0dXJlKCkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRUZXh0dXJlKCB0aGlzLCB0ZXh0dXJlICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIDJEIHRleHR1cmUuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZFRleHR1cmUyRDxUPihcbiAgICB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclRleHR1cmUyRC5iaW5kKCB0ZXh0dXJlLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSBjdWJlbWFwIHRleHR1cmUuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZFRleHR1cmVDdWJlTWFwPFQ+KFxuICAgIHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyVGV4dHVyZUN1YmVNYXAuYmluZCggdGV4dHVyZSwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgcmVuZGVyYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVJlbmRlcmJ1ZmZlcigpOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgY29uc3QgcmVuZGVyYnVmZmVyID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpICk7XG5cbiAgICByZXR1cm4gbmV3IEdMQ2F0UmVuZGVyYnVmZmVyKCB0aGlzLCByZW5kZXJidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgcmVuZGVyYnVmZmVyLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRSZW5kZXJidWZmZXI8VD4oXG4gICAgcmVuZGVyYnVmZmVyOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCByZW5kZXJidWZmZXI6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclJlbmRlcmJ1ZmZlci5iaW5kKCByZW5kZXJidWZmZXIsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUZyYW1lYnVmZmVyKCk6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGNvbnN0IGZyYW1lYnVmZmVyID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZUZyYW1lYnVmZmVyKCkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRGcmFtZWJ1ZmZlciggdGhpcywgZnJhbWVidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgZnJhbWVidWZmZXIuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZEZyYW1lYnVmZmVyPFQ+KFxuICAgIGZyYW1lYnVmZmVyOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIGZyYW1lYnVmZmVyOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlckZyYW1lYnVmZmVyLmJpbmQoIGZyYW1lYnVmZmVyLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBmcmFtZWJ1ZmVyLCBpbiBsYXppZXIgd2F5LlxuICAgKi9cbiAgcHVibGljIGxhenlGcmFtZWJ1ZmZlcihcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHtcbiAgICAgIGlzRmxvYXQgPSBmYWxzZSxcbiAgICAgIGRlcHRoRm9ybWF0ID0gdGhpcy5wcmVmZXJyZWREZXB0aEZvcm1hdFxuICAgIH0gPSB7fVxuICApOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB7XG4gICAgbGV0IHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IHJlbmRlcmJ1ZmZlcjogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBmcmFtZWJ1ZmZlcjogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgLy8gPT0gZnJhbWVidWZmZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgZnJhbWVidWZmZXIgPSB0aGlzLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XG5cbiAgICAgIC8vID09IHJlbmRlcmJ1ZmZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHJlbmRlcmJ1ZmZlciA9IHRoaXMuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgICByZW5kZXJidWZmZXIucmVuZGVyYnVmZmVyU3RvcmFnZSggd2lkdGgsIGhlaWdodCwgeyBmb3JtYXQ6IGRlcHRoRm9ybWF0IH0gKTtcbiAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFJlbmRlcmJ1ZmZlciggcmVuZGVyYnVmZmVyLCB7IGF0dGFjaG1lbnQ6IEdMX0RFUFRIX0FUVEFDSE1FTlQgfSApO1xuXG4gICAgICAvLyA9PSB0ZXh0dXJlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICB0ZXh0dXJlID0gdGhpcy5jcmVhdGVUZXh0dXJlKCk7XG4gICAgICBpZiAoIGlzRmxvYXQgKSB7XG4gICAgICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21BcnJheShcbiAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICB7IGludGVybmFsZm9ybWF0OiBHTF9SR0JBMzJGLCBmb3JtYXQ6IEdMX1JHQkEsIHR5cGU6IEdMX0ZMT0FUIH1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21BcnJheSggd2lkdGgsIGhlaWdodCwgbnVsbCApO1xuICAgICAgfVxuICAgICAgZnJhbWVidWZmZXIuYXR0YWNoVGV4dHVyZSggdGV4dHVyZSApO1xuXG4gICAgICAvLyA9PSBhbG1vc3QgZG9uZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICByZXR1cm4gZnJhbWVidWZmZXI7XG4gICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICBmcmFtZWJ1ZmZlcj8uZGlzcG9zZSgpO1xuICAgICAgdGV4dHVyZT8uZGlzcG9zZSgpO1xuICAgICAgcmVuZGVyYnVmZmVyPy5kaXNwb3NlKCk7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgbXVsdGlzYW1wbGUgZnJhbWVidWZmZXIsIGluIGxhemllciB3YXkuXG4gICAqL1xuICBwdWJsaWMgbGF6eU11bHRpc2FtcGxlRnJhbWVidWZmZXIoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB7XG4gICAgICBzYW1wbGVzID0gNCxcbiAgICAgIGlzRmxvYXQgPSBmYWxzZSxcbiAgICAgIGRlcHRoRm9ybWF0ID0gdGhpcy5wcmVmZXJyZWREZXB0aEZvcm1hdCxcbiAgICAgIGZhbGxiYWNrV2ViR0wxID0gdHJ1ZVxuICAgIH0gPSB7fVxuICApOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0XG4gICAgKSB7XG4gICAgICBsZXQgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICAgIGxldCByZW5kZXJidWZmZXJEZXB0aDogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgICAgbGV0IHJlbmRlcmJ1ZmZlckNvbG9yOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgICBsZXQgZnJhbWVidWZmZXI6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyA9PSBmcmFtZWJ1ZmZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICBmcmFtZWJ1ZmZlciA9IHRoaXMuY3JlYXRlRnJhbWVidWZmZXIoKTtcblxuICAgICAgICAvLyA9PSByZW5kZXJidWZmZXIgZGVwdGggPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICByZW5kZXJidWZmZXJEZXB0aCA9IHRoaXMuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgICAgIHJlbmRlcmJ1ZmZlckRlcHRoLnJlbmRlcmJ1ZmZlclN0b3JhZ2VNdWx0aXNhbXBsZShcbiAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgeyBzYW1wbGVzLCBmb3JtYXQ6IGRlcHRoRm9ybWF0IH1cbiAgICAgICAgKTtcbiAgICAgICAgZnJhbWVidWZmZXIuYXR0YWNoUmVuZGVyYnVmZmVyKCByZW5kZXJidWZmZXJEZXB0aCwgeyBhdHRhY2htZW50OiBHTF9ERVBUSF9BVFRBQ0hNRU5UIH0gKTtcblxuICAgICAgICAvLyA9PSByZW5kZXJidWZmZXIgY29sb3IgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICBjb25zdCByZW5kZXJidWZmZXJDb2xvciA9IHRoaXMuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgICAgIGNvbnN0IGNvbG9yRm9ybWF0ID0gaXNGbG9hdCA/IEdMX1JHQkEzMkYgOiBHTF9SR0JBODtcbiAgICAgICAgcmVuZGVyYnVmZmVyQ29sb3IucmVuZGVyYnVmZmVyU3RvcmFnZU11bHRpc2FtcGxlKFxuICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICB7IHNhbXBsZXMsIGZvcm1hdDogY29sb3JGb3JtYXQgfVxuICAgICAgICApO1xuICAgICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlckNvbG9yLCB7IGF0dGFjaG1lbnQ6IEdMX0NPTE9SX0FUVEFDSE1FTlQwIH0gKTtcblxuICAgICAgICAvLyA9PSBhbG1vc3QgZG9uZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICByZXR1cm4gZnJhbWVidWZmZXI7XG4gICAgICB9IGNhdGNoICggZSApIHtcbiAgICAgICAgZnJhbWVidWZmZXI/LmRpc3Bvc2UoKTtcbiAgICAgICAgdGV4dHVyZT8uZGlzcG9zZSgpO1xuICAgICAgICByZW5kZXJidWZmZXJDb2xvcj8uZGlzcG9zZSgpO1xuICAgICAgICByZW5kZXJidWZmZXJEZXB0aD8uZGlzcG9zZSgpO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIGZhbGxiYWNrV2ViR0wxICkge1xuICAgICAgcmV0dXJuIHRoaXMubGF6eUZyYW1lYnVmZmVyKCB3aWR0aCwgaGVpZ2h0LCB7IGlzRmxvYXQgfSApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBHTENhdEVycm9ycy5XZWJHTDJFeGNsdXNpdmVFcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGRyYXcgYnVmZmVycywgaW4gbGF6aWVyIHdheS5cbiAgICogSWYgeW91IGNhbid0IGdyYWIgYFdFQkdMX2RyYXdfYnVmZmVyc2AgZXh0ZW5zaW9uLCB5b3UnbGwgZGllIGluc3RhbnRseSBhdCB0aGlzIHBvaW50LlxuICAgKi9cbiAgcHVibGljIGxhenlEcmF3YnVmZmVycyhcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIG51bUJ1ZmZlcnM6IG51bWJlcixcbiAgICB7XG4gICAgICBpc0Zsb2F0ID0gZmFsc2UsXG4gICAgICBkZXB0aEZvcm1hdCA9IHRoaXMucHJlZmVycmVkRGVwdGhGb3JtYXRcbiAgICB9ID0ge31cbiAgKTogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4ge1xuICAgIGlmICggR0xfTUFYX0RSQVdfQlVGRkVSUyA8IG51bUJ1ZmZlcnMgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoICdHTENhdDogTWF4aW11bSBkcmF3IGJ1ZmZlcnMgY291bnQgZXhjZWVkZWQnICk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dHVyZXM6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD5bXSA9IFtdO1xuICAgIGxldCByZW5kZXJidWZmZXI6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZnJhbWVidWZmZXI6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vID09IGZyYW1lYnVmZmVyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGZyYW1lYnVmZmVyID0gdGhpcy5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuXG4gICAgICAvLyA9PSByZW5kZXJidWZmZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCByZW5kZXJidWZmZXIgPSB0aGlzLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xuICAgICAgcmVuZGVyYnVmZmVyLnJlbmRlcmJ1ZmZlclN0b3JhZ2UoIHdpZHRoLCBoZWlnaHQsIHsgZm9ybWF0OiBkZXB0aEZvcm1hdCB9ICk7XG4gICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlciwgeyBhdHRhY2htZW50OiBHTF9ERVBUSF9BVFRBQ0hNRU5UIH0gKTtcblxuICAgICAgLy8gPT0gdGV4dHVyZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbnVtQnVmZmVyczsgaSArKyApIHtcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IHRoaXMuY3JlYXRlVGV4dHVyZSgpO1xuICAgICAgICBpZiAoIGlzRmxvYXQgKSB7XG4gICAgICAgICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KFxuICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgeyBpbnRlcm5hbGZvcm1hdDogR0xfUkdCQTMyRiwgZm9ybWF0OiBHTF9SR0JBLCB0eXBlOiBHTF9GTE9BVCB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkoIHdpZHRoLCBoZWlnaHQsIG51bGwgKTtcbiAgICAgICAgfVxuICAgICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hUZXh0dXJlKCB0ZXh0dXJlLCB7IGF0dGFjaG1lbnQ6IEdMX0NPTE9SX0FUVEFDSE1FTlQwICsgaSB9ICk7XG4gICAgICB9XG5cbiAgICAgIC8vID09IGFsbW9zdCBkb25lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHJldHVybiBmcmFtZWJ1ZmZlcjtcbiAgICB9IGNhdGNoICggZSApIHtcbiAgICAgIHRleHR1cmVzLmZvckVhY2goICggdGV4dHVyZSApID0+IHtcbiAgICAgICAgdGV4dHVyZS5kaXNwb3NlKCk7XG4gICAgICB9ICk7XG4gICAgICByZW5kZXJidWZmZXI/LmRpc3Bvc2UoKTtcbiAgICAgIGZyYW1lYnVmZmVyPy5kaXNwb3NlKCk7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG9mIGBnbC5kcmF3QnVmZmVyc2AuXG4gICAqXG4gICAqIHtAbGluayBkcmF3QnVmZmVyc30gaXMgYmV0dGVyLlxuICAgKi9cbiAgcHVibGljIHJhd0RyYXdCdWZmZXJzKCBidWZmZXJzOiBHTGVudW1bXSApOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICApIHtcbiAgICAgIGdsLmRyYXdCdWZmZXJzKCBidWZmZXJzICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4dCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCAnV0VCR0xfZHJhd19idWZmZXJzJyApO1xuICAgICAgZXh0Py5kcmF3QnVmZmVyc1dFQkdMKCBidWZmZXJzICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHtAbGluayByYXdEcmF3QnVmZmVyc30gYnV0IGJldHRlci5cbiAgICpcbiAgICogQ2FsbCB0aGlzIGJlZm9yZSB5b3UncmUgZ29ubmEgdXNlIGRyYXcgYnVmZmVycy5cbiAgICogSWYgeW91IGNhbid0IGdyYWIgYFdFQkdMX2RyYXdfYnVmZmVyc2AgZXh0ZW5zaW9uLCB5b3UnbGwgZGllIGluc3RhbnRseSBhdCB0aGlzIHBvaW50LlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGRyYXcgYnVmZmVycyBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgZHJhd0J1ZmZlcnM8VD4oXG4gICAgYnVmZmVyc09yTnVtQnVmZmVycz86IEdMZW51bVtdIHwgbnVtYmVyLFxuICAgIGNhbGxiYWNrPzogKCBidWZmZXJzOiBHTGVudW1bXSApID0+IFRcbiAgKTogVCB7XG4gICAgbGV0IGJ1ZmZlcnM6IEdMZW51bVtdO1xuXG4gICAgaWYgKCBBcnJheS5pc0FycmF5KCBidWZmZXJzT3JOdW1CdWZmZXJzICkgKSB7XG4gICAgICBidWZmZXJzID0gYnVmZmVyc09yTnVtQnVmZmVycztcbiAgICB9IGVsc2UgaWYgKCBidWZmZXJzT3JOdW1CdWZmZXJzICkge1xuICAgICAgYnVmZmVycyA9IFtdO1xuICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgYnVmZmVyc09yTnVtQnVmZmVyczsgaSArKyApIHtcbiAgICAgICAgYnVmZmVyc1sgaSBdID0gR0xfQ09MT1JfQVRUQUNITUVOVDAgKyBpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBidWZmZXJzID0gWyBHTF9DT0xPUl9BVFRBQ0hNRU5UMCBdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlckRyYXdCdWZmZXJzLmJpbmQoIGJ1ZmZlcnMsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogYSB3cmFwcGVyIG9mIGRyYXdFbGVtZW50c0luc3RhbmNlZC5cbiAgICovXG4gIHB1YmxpYyBkcmF3QXJyYXlzSW5zdGFuY2VkKFxuICAgIG1vZGU6IEdMZW51bSxcbiAgICBmaXJzdDogR0xpbnQsXG4gICAgY291bnQ6IEdMc2l6ZWksXG4gICAgcHJpbWNvdW50OiBHTHNpemVpXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0XG4gICAgKSB7XG4gICAgICBnbC5kcmF3QXJyYXlzSW5zdGFuY2VkKCBtb2RlLCBmaXJzdCwgY291bnQsIHByaW1jb3VudCApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHQgPSB0aGlzLmdldEV4dGVuc2lvbiggJ0FOR0xFX2luc3RhbmNlZF9hcnJheXMnLCB0cnVlICk7XG4gICAgICBleHQuZHJhd0FycmF5c0luc3RhbmNlZEFOR0xFKCBtb2RlLCBmaXJzdCwgY291bnQsIHByaW1jb3VudCApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhIHdyYXBwZXIgb2YgZHJhd0VsZW1lbnRzSW5zdGFuY2VkLlxuICAgKi9cbiAgcHVibGljIGRyYXdFbGVtZW50c0luc3RhbmNlZChcbiAgICBtb2RlOiBHTGVudW0sXG4gICAgY291bnQ6IEdMc2l6ZWksXG4gICAgdHlwZTogR0xlbnVtLFxuICAgIG9mZnNldDogR0xpbnRwdHIsXG4gICAgaW5zdGFuY2VDb3VudDogR0xzaXplaVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dFxuICAgICkge1xuICAgICAgZ2wuZHJhd0VsZW1lbnRzSW5zdGFuY2VkKCBtb2RlLCBjb3VudCwgdHlwZSwgb2Zmc2V0LCBpbnN0YW5jZUNvdW50ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4dCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCAnQU5HTEVfaW5zdGFuY2VkX2FycmF5cycsIHRydWUgKTtcbiAgICAgIGV4dC5kcmF3RWxlbWVudHNJbnN0YW5jZWRBTkdMRSggbW9kZSwgY291bnQsIHR5cGUsIG9mZnNldCwgaW5zdGFuY2VDb3VudCApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgY3VycmVudCBmcmFtZWJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBjbGVhcihcbiAgICByZWQgPSAwLjAsXG4gICAgZ3JlZW4gPSAwLjAsXG4gICAgYmx1ZSA9IDAuMCxcbiAgICBhbHBoYSA9IDEuMCxcbiAgICBkZXB0aCA9IDEuMFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGdsLmNsZWFyQ29sb3IoIHJlZCwgZ3JlZW4sIGJsdWUsIGFscGhhICk7XG4gICAgZ2wuY2xlYXJEZXB0aCggZGVwdGggKTtcbiAgICBnbC5jbGVhciggR0xfQ09MT1JfQlVGRkVSX0JJVCB8IEdMX0RFUFRIX0JVRkZFUl9CSVQgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCYXNpY2FsbHkganVzdCBhIGBnbC5ibGl0RnJhbWVidWZmZXJgLlxuICAgKi9cbiAgcHVibGljIGJsaXRGcmFtZWJ1ZmZlcihcbiAgICBzcmM6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBkc3Q6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICB7XG4gICAgICBzcmNWaWV3cG9ydCA9IFsgMCwgMCwgc3JjPy5yZW5kZXJidWZmZXI/LndpZHRoID8/IDAsIHNyYz8ucmVuZGVyYnVmZmVyPy5oZWlnaHQgPz8gMCBdLFxuICAgICAgZHN0Vmlld3BvcnQgPSBbIDAsIDAsIGRzdD8ucmVuZGVyYnVmZmVyPy53aWR0aCA/PyAwLCBkc3Q/LnJlbmRlcmJ1ZmZlcj8uaGVpZ2h0ID8/IDAgXSxcbiAgICAgIG1hc2sgPSBHTF9DT0xPUl9CVUZGRVJfQklULFxuICAgICAgZmlsdGVyID0gR0xfTkVBUkVTVFxuICAgIH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICApIHtcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlciggR0xfUkVBRF9GUkFNRUJVRkZFUiwgc3JjPy5yYXcgPz8gbnVsbCApO1xuICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKCBHTF9EUkFXX0ZSQU1FQlVGRkVSLCBkc3Q/LnJhdyA/PyBudWxsICk7XG4gICAgICBnbC5ibGl0RnJhbWVidWZmZXIoXG4gICAgICAgIHNyY1ZpZXdwb3J0WyAwIF0sXG4gICAgICAgIHNyY1ZpZXdwb3J0WyAxIF0sXG4gICAgICAgIHNyY1ZpZXdwb3J0WyAyIF0sXG4gICAgICAgIHNyY1ZpZXdwb3J0WyAzIF0sXG4gICAgICAgIGRzdFZpZXdwb3J0WyAwIF0sXG4gICAgICAgIGRzdFZpZXdwb3J0WyAxIF0sXG4gICAgICAgIGRzdFZpZXdwb3J0WyAyIF0sXG4gICAgICAgIGRzdFZpZXdwb3J0WyAzIF0sXG4gICAgICAgIG1hc2ssXG4gICAgICAgIGZpbHRlclxuICAgICAgKTtcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlciggR0xfUkVBRF9GUkFNRUJVRkZFUiwgbnVsbCApO1xuICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKCBHTF9EUkFXX0ZSQU1FQlVGRkVSLCBudWxsICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEdMQ2F0RXJyb3JzLldlYkdMMkV4Y2x1c2l2ZUVycm9yO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBWU8sTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDO0FBSS9CLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQztBQW1CeEIsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUM7QUFFaEMsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUM7QUFnQ3BDLE1BQU0sbUJBQW1CLEdBQUcsVUFBVSxDQUFDO0FBSXZDLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDO0FBQ2pDLE1BQU0sd0JBQXdCLEdBQUcsTUFBTSxDQUFDO0FBMkV4QyxNQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQztBQUVuQyxNQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FBQztBQUd2QyxNQUFNLG9CQUFvQixHQUFHLE1BQU0sQ0FBQztBQUNwQyxNQUFNLG9CQUFvQixHQUFHLE1BQU0sQ0FBQztBQU1wQyxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUM7QUFzQzdCLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDO0FBT25DLE1BQU0sdUJBQXVCLEdBQUcsTUFBTSxDQUFDO0FBSXZDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQztBQWN4QixNQUFNLGtCQUFrQixHQUFHLE1BQU0sQ0FBQztBQUdsQyxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUM7QUFtQzlCLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQztBQXlCN0IsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDO0FBS3pCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUl6QixNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUM7QUFnQjlCLE1BQU0sbUJBQW1CLEdB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Ozs7O0lBS00sVUFBVSxDQUFFLElBQVksRUFBRSxLQUFnQjtRQUMvQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUUsSUFBSSxDQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUUsSUFBSSxFQUFFO1lBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUUsUUFBUSxFQUFFLEtBQUssQ0FBRSxDQUFDO1NBQ2xDLENBQUUsQ0FBQztLQUNMOzs7O0lBS00sVUFBVSxDQUFFLElBQVksRUFBRSxLQUFnQjtRQUMvQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUUsSUFBSSxDQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUUsSUFBSSxFQUFFO1lBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUUsUUFBUSxFQUFFLEtBQUssQ0FBRSxDQUFDO1NBQ2xDLENBQUUsQ0FBQztLQUNMOzs7O0lBS00sVUFBVSxDQUFFLElBQVksRUFBRSxLQUFnQjtRQUMvQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUUsSUFBSSxDQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUUsSUFBSSxFQUFFO1lBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUUsUUFBUSxFQUFFLEtBQUssQ0FBRSxDQUFDO1NBQ2xDLENBQUUsQ0FBQztLQUNMOzs7O0lBS00sVUFBVSxDQUFFLElBQVksRUFBRSxLQUFnQjtRQUMvQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMs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
