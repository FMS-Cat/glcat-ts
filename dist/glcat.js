/*!
* @fms-cat/glcat-ts v0.12.1
* WebGL wrapper with plenty of hackability
*
* Copyright (c) 2018-2020 FMS_Cat
* @fms-cat/glcat-ts is distributed under MIT License
* https://github.com/FMS-Cat/glcat-ts/blob/master/LICENSE
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.GLCAT = {}));
}(this, (function (exports) { 'use strict';

    var GL_ARRAY_BUFFER = 0x8892;
    var GL_BLEND = 0x0be2;
    var GL_CLAMP_TO_EDGE = 0x812f;
    var GL_COLOR_ATTACHMENT0 = 0x8ce0;
    var GL_COLOR_BUFFER_BIT = 0x00004000;
    var GL_COMPILE_STATUS = 0x8b81;
    var GL_COMPLETION_STATUS_KHR = 0x91b1;
    var GL_DEPTH_ATTACHMENT = 0x8d00;
    var GL_DEPTH_BUFFER_BIT = 0x00000100;
    var GL_DEPTH_COMPONENT16 = 0x81a5;
    var GL_DEPTH_TEST = 0x0b71;
    var GL_DEPTH24_STENCIL8 = 0x88f0;
    var GL_DRAW_FRAMEBUFFER = 0x8ca9;
    var GL_ELEMENT_ARRAY_BUFFER = 0x8893;
    var GL_FLOAT = 0x1406;
    var GL_FRAGMENT_SHADER = 0x8b30;
    var GL_FRAMEBUFFER = 0x8d40;
    var GL_HALF_FLOAT = 0x140b;
    var GL_LEQUAL = 0x0203;
    var GL_LINEAR = 0x2601;
    var GL_LINK_STATUS = 0x8b82;
    var GL_MAX_DRAW_BUFFERS = 0x8824;
    var GL_NEAREST = 0x2600;
    var GL_ONE_MINUS_SRC_ALPHA = 0x0303;
    var GL_READ_FRAMEBUFFER = 0x8ca8;
    var GL_RENDERBUFFER = 0x8d41;
    var GL_RGBA = 0x1908;
    var GL_RGBA32F = 0x8814;
    var GL_RGBA8 = 0x8058;
    var GL_SRC_ALPHA = 0x0302;
    var GL_STATIC_DRAW = 0x88e4;
    var GL_TEXTURE_2D = 0x0de1;
    var GL_TEXTURE_CUBE_MAP = 0x8513;
    var GL_TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
    var GL_TEXTURE_MAG_FILTER = 0x2800;
    var GL_TEXTURE_MIN_FILTER = 0x2801;
    var GL_TEXTURE_WRAP_S = 0x2802;
    var GL_TEXTURE_WRAP_T = 0x2803;
    var GL_TEXTURE0 = 0x84c0;
    var GL_UNSIGNED_BYTE = 0x1401;
    var GL_VERTEX_SHADER = 0x8b31;

    var BindHelper = /** @class */ (function () {
        function BindHelper(init, binder) {
            this.__prev = init;
            this.__binder = binder;
        }
        BindHelper.prototype.bind = function (value, callback) {
            var prev = this.__prev;
            if (value !== prev) {
                this.__binder(value);
                this.__prev = value;
            }
            if (callback) {
                var ret = callback(value);
                this.bind(prev);
                return ret;
            }
            else {
                return undefined;
            }
        };
        return BindHelper;
    }());

    /**
     * It's a WebGLBuffer.
     */
    var GLCatBuffer = /** @class */ (function () {
        /**
         * Create a new GLCatBuffer instance.
         */
        function GLCatBuffer(glCat, buffer) {
            this.__glCat = glCat;
            this.__buffer = buffer;
        }
        Object.defineProperty(GLCatBuffer.prototype, "buffer", {
            /**
             * Its own buffer.
             */
            get: function () {
                return this.__buffer;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCatBuffer.prototype, "raw", {
            /**
             * Its own buffer. Shorter than [[GLCatBuffer.buffer]].
             */
            get: function () {
                return this.__buffer;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Dispose the buffer.
         */
        GLCatBuffer.prototype.dispose = function () {
            this.__glCat.gl.deleteBuffer(this.__buffer);
        };
        /**
         * Set new data into this buffer.
         */
        GLCatBuffer.prototype.setVertexbuffer = function (source, usage) {
            if (usage === void 0) { usage = GL_STATIC_DRAW; }
            var gl = this.__glCat.gl;
            this.__glCat.bindVertexBuffer(this, function () {
                gl.bufferData(GL_ARRAY_BUFFER, source, usage);
            });
        };
        /**
         * Set new index data into this buffer.
         */
        GLCatBuffer.prototype.setIndexbuffer = function (source, usage) {
            if (usage === void 0) { usage = GL_STATIC_DRAW; }
            var gl = this.__glCat.gl;
            this.__glCat.bindIndexBuffer(this, function () {
                gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, source, usage);
            });
        };
        return GLCatBuffer;
    }());

    var GLCatErrors = {
        get UnexpectedNullError() {
            var error = new Error('GLCat: Unexpected null detected');
            error.name = 'UnexpectedNullError';
            throw error;
        },
        get WebGL2ExclusiveError() {
            var error = new Error('GLCat: Attempted to use WebGL2 exclusive stuff');
            error.name = 'WebGL2ExclusiveError';
            return error;
        }
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * It's a WebGLFramebuffer.
     */
    var GLCatFramebuffer = /** @class */ (function () {
        /**
         * Create a new GLCatFramebuffer instance.
         */
        function GLCatFramebuffer(glCat, framebuffer) {
            this.__renderbufferMap = new Map();
            this.__textureMap = new Map();
            this.__glCat = glCat;
            this.__framebuffer = framebuffer;
        }
        Object.defineProperty(GLCatFramebuffer.prototype, "framebuffer", {
            /**
             * Its own framebuffer.
             */
            get: function () {
                return this.__framebuffer;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCatFramebuffer.prototype, "raw", {
            /**
             * Its own framebuffer. Shorter than [[GLCatFramebuffer.framebuffer]]
             */
            get: function () {
                return this.__framebuffer;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCatFramebuffer.prototype, "renderbuffer", {
            /**
             * Its attached renderbuffer.
             * If you want to grab other than `DEPTH_ATTACHMENT`, try [[GLCatFramebuffer.getRenderbuffer]] instead.
             */
            get: function () {
                var _a;
                return (_a = this.__renderbufferMap.get(GL_DEPTH_ATTACHMENT)) !== null && _a !== void 0 ? _a : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCatFramebuffer.prototype, "texture", {
            /**
             * Its attached texture.
             * If you want to grab other than `COLOR_ATTACHMENT0`, try [[GLCatFramebuffer.getTexture]] instead.
             */
            get: function () {
                var _a;
                return (_a = this.__textureMap.get(GL_COLOR_ATTACHMENT0)) !== null && _a !== void 0 ? _a : null;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Dispose the framebuffer.
         */
        GLCatFramebuffer.prototype.dispose = function (alsoAttached) {
            var e_1, _a, e_2, _b;
            if (alsoAttached === void 0) { alsoAttached = false; }
            var gl = this.__glCat.gl;
            gl.deleteFramebuffer(this.__framebuffer);
            if (alsoAttached) {
                try {
                    for (var _c = __values(this.__renderbufferMap.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var renderbuffer = _d.value;
                        gl.deleteRenderbuffer(renderbuffer.raw);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    for (var _e = __values(this.__textureMap.values()), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var texture = _f.value;
                        gl.deleteTexture(texture.raw);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        };
        /**
         * Retrieve its attached renderbuffer.
         */
        GLCatFramebuffer.prototype.getRenderbuffer = function (attachment) {
            var _a;
            if (attachment === void 0) { attachment = GL_DEPTH_ATTACHMENT; }
            return (_a = this.__renderbufferMap.get(attachment)) !== null && _a !== void 0 ? _a : null;
        };
        /**
         * Retrieve its attached texture.
         */
        GLCatFramebuffer.prototype.getTexture = function (attachment) {
            var _a;
            if (attachment === void 0) { attachment = GL_COLOR_ATTACHMENT0; }
            return (_a = this.__textureMap.get(attachment)) !== null && _a !== void 0 ? _a : null;
        };
        /**
         * Attach a renderbuffer to this framebuffer.
         */
        GLCatFramebuffer.prototype.attachRenderbuffer = function (renderbuffer, _a) {
            var _b = (_a === void 0 ? {} : _a).attachment, attachment = _b === void 0 ? GL_DEPTH_ATTACHMENT : _b;
            var gl = this.__glCat.gl;
            this.__glCat.bindFramebuffer(this, function () {
                gl.framebufferRenderbuffer(GL_FRAMEBUFFER, attachment, GL_RENDERBUFFER, renderbuffer.raw);
            });
            this.__renderbufferMap.set(attachment, renderbuffer);
        };
        /**
         * Attach a texture to this framebuffer.
         */
        GLCatFramebuffer.prototype.attachTexture = function (texture, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.level, level = _c === void 0 ? 0 : _c, _d = _b.attachment, attachment = _d === void 0 ? GL_COLOR_ATTACHMENT0 : _d;
            var gl = this.__glCat.gl;
            this.__glCat.bindFramebuffer(this, function () {
                gl.framebufferTexture2D(GL_FRAMEBUFFER, attachment, GL_TEXTURE_2D, texture.raw, level);
            });
            this.__textureMap.set(attachment, texture);
        };
        return GLCatFramebuffer;
    }());

    /**
     * It's a WebGLProgram, but has cache of variable locations.
     */
    var GLCatProgram = /** @class */ (function () {
        /**
         * Create a new GLCatProgram instance.
         */
        function GLCatProgram(glCat, program) {
            this.__shaders = null;
            this.__attribLocationCache = {};
            this.__uniformLocationCache = {};
            this.__uniformTextureUnitMap = {};
            this.__uniformtextureUnitIndex = 0;
            this.__linked = false;
            this.__glCat = glCat;
            this.__program = program;
        }
        Object.defineProperty(GLCatProgram.prototype, "program", {
            /**
             * Its own program.
             */
            get: function () {
                return this.__program;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCatProgram.prototype, "raw", {
            /**
             * Its own program. Shorter than [[GLCatProgram.program]].
             */
            get: function () {
                return this.__program;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCatProgram.prototype, "shaders", {
            /**
             * Its shaders.
             */
            get: function () {
                return this.__shaders ? this.__shaders.concat() : null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCatProgram.prototype, "isLinked", {
            /**
             * Whether the last link operation was successful or not.
             */
            get: function () {
                return this.__linked;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Dispose the program.
         */
        GLCatProgram.prototype.dispose = function (alsoAttached) {
            if (alsoAttached === void 0) { alsoAttached = false; }
            var gl = this.__glCat.gl;
            gl.deleteProgram(this.__program);
            if (alsoAttached) {
                var shaders = this.shaders;
                if (shaders) {
                    shaders.forEach(function (shader) {
                        shader.dispose();
                    });
                }
            }
        };
        /**
         * Attach shaders and link this program.
         */
        GLCatProgram.prototype.link = function () {
            var _this = this;
            var shaders = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                shaders[_i] = arguments[_i];
            }
            var gl = this.__glCat.gl;
            shaders.forEach(function (shader) { return gl.attachShader(_this.__program, shader.raw); });
            gl.linkProgram(this.__program);
            this.__linked = gl.getProgramParameter(this.__program, GL_LINK_STATUS);
            if (!this.__linked) {
                throw new Error(gl.getProgramInfoLog(this.__program));
            }
            this.__shaders = shaders.concat();
        };
        /**
         * Attach shaders and link this program.
         * It's gonna be asynchronous if you have the KHR_parallel_shader_compile extension support.
         */
        GLCatProgram.prototype.linkAsync = function () {
            var _this = this;
            var shaders = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                shaders[_i] = arguments[_i];
            }
            var glCat = this.__glCat;
            var gl = this.__glCat.gl;
            var extParallel = glCat.getExtension('KHR_parallel_shader_compile');
            shaders.forEach(function (shader) { return gl.attachShader(_this.__program, shader.raw); });
            gl.linkProgram(this.__program);
            return new Promise(function (resolve, reject) {
                var update = function () {
                    if (!extParallel ||
                        gl.getProgramParameter(_this.__program, GL_COMPLETION_STATUS_KHR) === true) {
                        _this.__linked = gl.getProgramParameter(_this.__program, GL_LINK_STATUS);
                        if (!_this.__linked) {
                            reject(gl.getProgramInfoLog(_this.__program));
                            return;
                        }
                        _this.__shaders = shaders.concat();
                        resolve();
                        return;
                    }
                    requestAnimationFrame(update);
                };
                update();
            });
        };
        /**
         * Attach an attribute variable.
         * @param name Name of the attribute variable
         * @param buffer Vertex buffer. Can be null, to disable attribute array
         * @param size Number of components per vertex. Must be 1, 2, 3 or 4
         */
        GLCatProgram.prototype.attribute = function (name, buffer, size, divisor, type, stride, offset) {
            var _this = this;
            if (size === void 0) { size = 1; }
            if (divisor === void 0) { divisor = 0; }
            if (type === void 0) { type = GL_FLOAT; }
            if (stride === void 0) { stride = 0; }
            if (offset === void 0) { offset = 0; }
            var gl = this.__glCat.gl;
            var location = this.getAttribLocation(name);
            if (location === -1) {
                return;
            }
            if (buffer === null) {
                gl.disableVertexAttribArray(location);
                return;
            }
            this.__glCat.bindVertexBuffer(buffer, function () {
                gl.enableVertexAttribArray(location);
                gl.vertexAttribPointer(location, size, type, false, stride, offset);
                if (gl instanceof WebGL2RenderingContext) {
                    gl.vertexAttribDivisor(location, divisor);
                }
                else {
                    var ext = _this.__glCat.getExtension('ANGLE_instanced_arrays');
                    if (ext) {
                        ext.vertexAttribDivisorANGLE(location, divisor);
                    }
                }
            });
        };
        /**
         * Attach an uniform variable.
         * See also: [[GLCatProgram.uniformVector]]
         */
        GLCatProgram.prototype.uniform = function (name, type) {
            var value = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                value[_i - 2] = arguments[_i];
            }
            var func = this['uniform' + type];
            func.call.apply(func, __spread([this, name], value));
        };
        /**
         * Attach an uniform variable.
         * See also: [[GLCatProgram.uniform]]
         */
        GLCatProgram.prototype.uniformVector = function (name, type, value) {
            var func = this['uniform' + type];
            func.call(this, name, value);
        };
        /**
         * Attach an uniform1i variable.
         */
        GLCatProgram.prototype.uniform1i = function (name, value) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniform1i(location, value);
            });
        };
        /**
         * Attach an uniform2i variable.
         */
        GLCatProgram.prototype.uniform2i = function (name, x, y) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniform2i(location, x, y);
            });
        };
        /**
         * Attach an uniform3i variable.
         */
        GLCatProgram.prototype.uniform3i = function (name, x, y, z) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniform3i(location, x, y, z);
            });
        };
        /**
         * Attach an uniform4i variable.
         */
        GLCatProgram.prototype.uniform4i = function (name, x, y, z, w) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniform4i(location, x, y, z, w);
            });
        };
        /**
         * Attach an uniform1iv variable.
         */
        GLCatProgram.prototype.uniform1iv = function (name, array) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniform1iv(location, array);
            });
        };
        /**
         * Attach an uniform2iv variable.
         */
        GLCatProgram.prototype.uniform2iv = function (name, array) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniform2iv(location, array);
            });
        };
        /**
         * Attach an uniform3iv variable.
         */
        GLCatProgram.prototype.uniform3iv = function (name, array) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniform3iv(location, array);
            });
        };
        /**
         * Attach an uniform4iv variable.
         */
        GLCatProgram.prototype.uniform4iv = function (name, array) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniform4iv(location, array);
            });
        };
        /**
         * Attach an uniform1f variable.
         */
        GLCatProgram.prototype.uniform1f = function (name, value) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniform1f(location, value);
            });
        };
        /**
         * Attach an uniform2f variable.
         */
        GLCatProgram.prototype.uniform2f = function (name, x, y) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniform2f(location, x, y);
            });
        };
        /**
         * Attach an uniform3f variable.
         */
        GLCatProgram.prototype.uniform3f = function (name, x, y, z) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniform3f(location, x, y, z);
            });
        };
        /**
         * Attach an uniform4f variable.
         */
        GLCatProgram.prototype.uniform4f = function (name, x, y, z, w) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniform4f(location, x, y, z, w);
            });
        };
        /**
         * Attach an uniform1fv variable.
         */
        GLCatProgram.prototype.uniform1fv = function (name, array) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniform1fv(location, array);
            });
        };
        /**
         * Attach an uniform2fv variable.
         */
        GLCatProgram.prototype.uniform2fv = function (name, array) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniform2fv(location, array);
            });
        };
        /**
         * Attach an uniform3fv variable.
         */
        GLCatProgram.prototype.uniform3fv = function (name, array) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniform3fv(location, array);
            });
        };
        /**
         * Attach an uniform4fv variable.
         */
        GLCatProgram.prototype.uniform4fv = function (name, array) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniform4fv(location, array);
            });
        };
        /**
         * Attach an uniformMatrix2fv variable.
         */
        GLCatProgram.prototype.uniformMatrix2fv = function (name, array, transpose) {
            if (transpose === void 0) { transpose = false; }
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniformMatrix2fv(location, transpose, array);
            });
        };
        /**
         * Attach an uniformMatrix3fv variable.
         */
        GLCatProgram.prototype.uniformMatrix3fv = function (name, array, transpose) {
            if (transpose === void 0) { transpose = false; }
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniformMatrix3fv(location, transpose, array);
            });
        };
        /**
         * Attach an uniformMatrix4fv variable.
         */
        GLCatProgram.prototype.uniformMatrix4fv = function (name, array, transpose) {
            if (transpose === void 0) { transpose = false; }
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            this.__glCat.useProgram(this, function () {
                gl.uniformMatrix4fv(location, transpose, array);
            });
        };
        /**
         * Attach a `sampler2D` type uniform texture.
         * @param name Name of the uniform texture
         * @param texture Texture object
         */
        GLCatProgram.prototype.uniformTexture = function (name, texture) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            var unit = this.getUniformTextureUnit(name);
            gl.activeTexture(GL_TEXTURE0 + unit);
            this.__glCat.bindTexture2D(texture !== null && texture !== void 0 ? texture : null);
            this.__glCat.useProgram(this, function () {
                gl.uniform1i(location, unit);
            });
        };
        /**
         * Attach a `samplerCube` type uniform texture.
         * @param name Name of the uniform texture
         * @param texture Texture object
         */
        GLCatProgram.prototype.uniformCubemap = function (name, texture) {
            var gl = this.__glCat.gl;
            var location = this.getUniformLocation(name);
            var unit = this.getUniformTextureUnit(name);
            gl.activeTexture(GL_TEXTURE0 + unit);
            this.__glCat.bindTextureCubeMap(texture !== null && texture !== void 0 ? texture : null);
            this.__glCat.useProgram(this, function () {
                gl.uniform1i(location, unit);
            });
        };
        /**
         * Retrieve attribute location.
         */
        GLCatProgram.prototype.getAttribLocation = function (name) {
            var gl = this.__glCat.gl;
            if (this.__attribLocationCache[name] !== undefined) {
                return this.__attribLocationCache[name];
            }
            else {
                var location_1 = gl.getAttribLocation(this.__program, name);
                // if ( location === -1 ) {
                //   this.glCat.spit( 'GLCatProgram.getAttribLocation: Could not retrieve attribute location' );
                //   return -1;
                // }
                this.__attribLocationCache[name] = location_1;
                return location_1;
            }
        };
        /**
         * Retrieve uniform location.
         */
        GLCatProgram.prototype.getUniformLocation = function (name) {
            var gl = this.__glCat.gl;
            if (this.__uniformLocationCache[name] !== undefined) {
                return this.__uniformLocationCache[name];
            }
            else {
                var location_2 = gl.getUniformLocation(this.__program, name);
                // if ( location === null ) {
                //   this.glCat.spit( 'GLCatProgram.getUniformLocation: Could not retrieve uniform location' );
                //   return location;
                // }
                this.__uniformLocationCache[name] = location_2;
                return location_2;
            }
        };
        /**
         * Retrieve or create a texture unit that corresponds to given name.
         */
        GLCatProgram.prototype.getUniformTextureUnit = function (name) {
            if (this.__uniformTextureUnitMap[name] === undefined) {
                this.__uniformTextureUnitMap[name] = this.__uniformtextureUnitIndex;
                this.__uniformtextureUnitIndex++;
            }
            return this.__uniformTextureUnitMap[name];
        };
        return GLCatProgram;
    }());

    /**
     * It's a WebGLRenderbuffer.
     */
    var GLCatRenderbuffer = /** @class */ (function () {
        /**
         * Create a new GLCatTexture instance.
         */
        function GLCatRenderbuffer(glCat, renderbuffer) {
            this.__width = 0;
            this.__height = 0;
            this.__glCat = glCat;
            this.__renderbuffer = renderbuffer;
        }
        Object.defineProperty(GLCatRenderbuffer.prototype, "renderbuffer", {
            /**
             * Its own renderbuffer.
             */
            get: function () {
                return this.__renderbuffer;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCatRenderbuffer.prototype, "raw", {
            /**
             * Its own renderbuffer. Shorter than [[GLCatRenderBuffer.renderbuffer]].
             */
            get: function () {
                return this.__renderbuffer;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCatRenderbuffer.prototype, "width", {
            /**
             * Its width.
             */
            get: function () {
                return this.__width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCatRenderbuffer.prototype, "height", {
            /**
             * Its height.
             */
            get: function () {
                return this.__height;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Dispose the renderbuffer.
         */
        GLCatRenderbuffer.prototype.dispose = function () {
            this.__glCat.gl.deleteRenderbuffer(this.__renderbuffer);
        };
        /**
         * Initialize this renderbuffer.
         */
        GLCatRenderbuffer.prototype.init = function (width, height, _a) {
            var _b = (_a === void 0 ? {} : _a).format, format = _b === void 0 ? this.__glCat.preferredDepthFormat : _b;
            var gl = this.__glCat.gl;
            this.__glCat.bindRenderbuffer(this, function () {
                gl.renderbufferStorage(GL_RENDERBUFFER, format, width, height);
            });
            this.__width = width;
            this.__height = height;
        };
        /**
         * Initialize this renderbuffer with multisample enabled.
         * If you are using WebGL1, it will fallback to non multisample one instead.
         */
        GLCatRenderbuffer.prototype.initMultisample = function (width, height, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.samples, samples = _c === void 0 ? this.__glCat.preferredMultisampleSamples : _c, _d = _b.format, format = _d === void 0 ? GL_DEPTH_ATTACHMENT : _d;
            var gl = this.__glCat.gl;
            this.__glCat.bindRenderbuffer(this, function () {
                if (gl instanceof WebGL2RenderingContext) {
                    gl.renderbufferStorageMultisample(GL_RENDERBUFFER, samples, format, width, height);
                }
                else {
                    gl.renderbufferStorage(GL_RENDERBUFFER, format, width, height);
                }
            });
            this.__width = width;
            this.__height = height;
        };
        return GLCatRenderbuffer;
    }());

    /**
     * It's a WebGLShader.
     */
    var GLCatShader = /** @class */ (function () {
        /**
         * Create a new GLCatShader instance.
         */
        function GLCatShader(glCat, shader) {
            this.__compiled = false;
            this.__glCat = glCat;
            this.__shader = shader;
        }
        Object.defineProperty(GLCatShader.prototype, "shader", {
            /**
             * Its own shader.
             */
            get: function () {
                return this.__shader;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCatShader.prototype, "raw", {
            /**
             * Its own shader. Shorter than [[GLCatShader.shader]].
             */
            get: function () {
                return this.__shader;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Dispose the shader.
         */
        GLCatShader.prototype.dispose = function () {
            this.__glCat.gl.deleteShader(this.__shader);
        };
        /**
         * Return whether the last compilation was successful or not.
         */
        GLCatShader.prototype.isCompiled = function () {
            return this.__compiled;
        };
        /**
         * Compile the shader.
         */
        GLCatShader.prototype.compile = function (code) {
            var gl = this.__glCat.gl;
            gl.shaderSource(this.__shader, code);
            gl.compileShader(this.__shader);
            this.__compiled = gl.getShaderParameter(this.__shader, GL_COMPILE_STATUS);
            if (!this.__compiled) {
                throw new Error(gl.getShaderInfoLog(this.__shader));
            }
        };
        return GLCatShader;
    }());

    var zeroTextureArray = new Uint8Array([0, 0, 0, 0]);
    /**
     * It's a WebGLTexture.
     */
    var GLCatTexture = /** @class */ (function () {
        /**
         * Create a new GLCatTexture instance.
         */
        function GLCatTexture(glCat, texture) {
            this.__width = 0;
            this.__height = 0;
            this.__glCat = glCat;
            this.__texture = texture;
            this.textureFilter(GL_LINEAR);
            this.textureWrap(GL_CLAMP_TO_EDGE);
        }
        Object.defineProperty(GLCatTexture.prototype, "texture", {
            /**
             * Its own texture.
             */
            get: function () {
                return this.__texture;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCatTexture.prototype, "raw", {
            /**
             * Its own texture. Shorter than [[GLCatTexture.textured]]
             */
            get: function () {
                return this.__texture;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCatTexture.prototype, "width", {
            /**
             * Its width.
             */
            get: function () {
                return this.__width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCatTexture.prototype, "height", {
            /**
             * Its height.
             */
            get: function () {
                return this.__height;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Dispose the texture.
         */
        GLCatTexture.prototype.dispose = function () {
            this.__glCat.gl.deleteTexture(this.__texture);
        };
        GLCatTexture.prototype.textureFilter = function (filterMag, filterMin) {
            if (filterMag === void 0) { filterMag = GL_NEAREST; }
            if (filterMin === void 0) { filterMin = filterMag; }
            var gl = this.__glCat.gl;
            this.__glCat.bindTexture2D(this, function () {
                gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, filterMag);
                gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, filterMin);
            });
        };
        GLCatTexture.prototype.textureWrap = function (wrapS, wrapT) {
            if (wrapS === void 0) { wrapS = GL_CLAMP_TO_EDGE; }
            if (wrapT === void 0) { wrapT = wrapS; }
            var gl = this.__glCat.gl;
            this.__glCat.bindTexture2D(this, function () {
                gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, wrapS);
                gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, wrapT);
            });
        };
        /**
         * Initialize the texture.
         */
        GLCatTexture.prototype.texStorage2D = function (width, height, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.target, target = _c === void 0 ? GL_TEXTURE_2D : _c, _d = _b.level, level = _d === void 0 ? 1 : _d, _e = _b.format, format = _e === void 0 ? GL_RGBA8 : _e;
            var gl = this.__glCat.gl;
            if (gl instanceof WebGL2RenderingContext) {
                this.__glCat.bindTexture2D(this, function () {
                    gl.texStorage2D(target, level, format, width, height);
                });
            }
            else {
                throw GLCatErrors.WebGL2ExclusiveError;
            }
        };
        /**
         * Return a value for the passed parameter name.
         * See: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter
         */
        GLCatTexture.prototype.getParameter = function (pname) {
            var gl = this.__glCat.gl;
            return this.__glCat.bindTexture2D(this, function () {
                return gl.getParameter(pname);
            });
        };
        /**
         * Specify the pixel storage modes.
         * See: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/pixelStorei
         */
        GLCatTexture.prototype.pixelStorei = function (pname, param) {
            var gl = this.__glCat.gl;
            this.__glCat.bindTexture2D(this, function () {
                gl.pixelStorei(pname, param);
            });
        };
        /**
         * Set new data into this texture.
         */
        GLCatTexture.prototype.setTexture = function (source) {
            var gl = this.__glCat.gl;
            this.__glCat.bindTexture2D(this, function () {
                gl.texImage2D(GL_TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
            });
            this.__width = source.width;
            this.__height = source.height;
        };
        /**
         * Set new data into this texture.
         * This function uses TypedArray. If you want to source image data, use `GLCat.setTexture()` instead.
         */
        GLCatTexture.prototype.setTextureFromArray = function (width, height, source, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.internalformat, internalformat = _c === void 0 ? GL_RGBA8 : _c, _d = _b.format, format = _d === void 0 ? GL_RGBA : _d, _e = _b.type, type = _e === void 0 ? GL_UNSIGNED_BYTE : _e;
            var gl = this.__glCat.gl;
            var iformat = internalformat;
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
            this.__glCat.bindTexture2D(this, function () {
                gl.texImage2D(GL_TEXTURE_2D, 0, iformat, width, height, 0, format, type, source);
            });
            this.__width = width;
            this.__height = height;
        };
        /**
         * Copy pixels from current framebuffer to given texture.
         */
        GLCatTexture.prototype.copyTexture = function (width, height) {
            var gl = this.__glCat.gl;
            this.__glCat.bindTexture2D(this, function () {
                gl.copyTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, 0, 0, width, height, 0);
            });
            this.__width = width;
            this.__height = height;
        };
        /**
         * Set new cubemap data into this texture.
         * @param textures Array of iamges. Order: `X+`, `X-`, `Y+`, `Y-`, `Z+`, `Z-`
         * @todo due to compatibility of its `width` and `height` it should not be used yet
         */
        GLCatTexture.prototype.setCubemap = function (textures) {
            var gl = this.__glCat.gl;
            this.__glCat.bindTextureCubeMap(this, function () {
                for (var i = 0; i < 6; i++) {
                    gl.texImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, GL_RGBA, GL_RGBA, GL_UNSIGNED_BYTE, textures[i]);
                }
                gl.texParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
                gl.texParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
                gl.texParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
                gl.texParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
            });
        };
        /**
         * Set [ 0, 0, 0, 0 ] to this texture.
         * Useful for temporary use..
         */
        GLCatTexture.prototype.setZeroTexture = function () {
            this.setTextureFromArray(1, 1, zeroTextureArray);
        };
        return GLCatTexture;
    }());

    /**
     * It's a WebGLVertexArrayObject.
     */
    var GLCatVertexArray = /** @class */ (function () {
        /**
         * Create a new GLCatBuffer instance.
         */
        function GLCatVertexArray(glCat, vertexArray) {
            this.__glCat = glCat;
            this.__vertexArray = vertexArray;
        }
        Object.defineProperty(GLCatVertexArray.prototype, "buffer", {
            /**
             * Its own buffer.
             */
            get: function () {
                return this.__vertexArray;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCatVertexArray.prototype, "raw", {
            /**
             * Its own buffer. Shorter than [[GLCatBuffer.buffer]].
             */
            get: function () {
                return this.__vertexArray;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Dispose the buffer.
         */
        GLCatVertexArray.prototype.dispose = function () {
            var gl = this.__glCat.gl;
            if (gl instanceof WebGL2RenderingContext) {
                gl.deleteVertexArray(this.__vertexArray);
            }
            else {
                var ext = this.__glCat.getExtension('OES_vertex_array_object', true);
                ext.deleteVertexArrayOES(this.__vertexArray);
            }
        };
        /**
         * Bind a vertex buffer to the vertex array.
         */
        GLCatVertexArray.prototype.bindVertexbuffer = function (source, location, size, divisor, type, stride, offset) {
            var _this = this;
            if (size === void 0) { size = 1; }
            if (divisor === void 0) { divisor = 0; }
            if (type === void 0) { type = GL_FLOAT; }
            if (stride === void 0) { stride = 0; }
            if (offset === void 0) { offset = 0; }
            var gl = this.__glCat.gl;
            this.__glCat.bindVertexArray(this, function () {
                gl.bindBuffer(GL_ARRAY_BUFFER, source.raw);
                gl.enableVertexAttribArray(location);
                gl.vertexAttribPointer(location, size, type, false, stride, offset);
                if (gl instanceof WebGL2RenderingContext) {
                    gl.vertexAttribDivisor(location, divisor);
                }
                else {
                    var ext = _this.__glCat.getExtension('ANGLE_instanced_arrays');
                    if (ext) {
                        ext.vertexAttribDivisorANGLE(location, divisor);
                    }
                }
            });
        };
        /**
         * Bind an index buffer to the vertex array.
         */
        GLCatVertexArray.prototype.bindIndexbuffer = function (source) {
            var gl = this.__glCat.gl;
            this.__glCat.bindVertexArray(this, function () {
                gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, source.raw);
            });
        };
        return GLCatVertexArray;
    }());

    /**
     * WebGL wrapper with plenty of hackability.
     */
    var GLCat = /** @class */ (function () {
        /**
         * Create a new GLCat instance.
         * Rendering context is required.
         */
        function GLCat(gl) {
            var _this = this;
            this.preferredMultisampleSamples = 4;
            this.__preferredDepthFormat = null;
            this.__bindHelperVertexBuffer = new BindHelper(null, function (buffer) {
                var _a;
                var gl = _this.__gl;
                gl.bindBuffer(GL_ARRAY_BUFFER, (_a = buffer === null || buffer === void 0 ? void 0 : buffer.raw) !== null && _a !== void 0 ? _a : null);
            });
            this.__bindHelperIndexBuffer = new BindHelper(null, function (buffer) {
                var _a;
                var gl = _this.__gl;
                gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, (_a = buffer === null || buffer === void 0 ? void 0 : buffer.raw) !== null && _a !== void 0 ? _a : null);
            });
            this.__bindHelperVertexArray = new BindHelper(null, function (vertexArray) {
                var _a;
                _this.rawBindVertexArray((_a = vertexArray === null || vertexArray === void 0 ? void 0 : vertexArray.raw) !== null && _a !== void 0 ? _a : null);
            });
            this.__bindHelperTexture2D = new BindHelper(null, function (texture) {
                var _a;
                var gl = _this.__gl;
                gl.bindTexture(GL_TEXTURE_2D, (_a = texture === null || texture === void 0 ? void 0 : texture.raw) !== null && _a !== void 0 ? _a : null);
            });
            this.__bindHelperTextureCubeMap = new BindHelper(null, function (texture) {
                var _a;
                var gl = _this.__gl;
                gl.bindTexture(GL_TEXTURE_CUBE_MAP, (_a = texture === null || texture === void 0 ? void 0 : texture.raw) !== null && _a !== void 0 ? _a : null);
            });
            this.__bindHelperRenderbuffer = new BindHelper(null, function (renderbuffer) {
                var _a;
                var gl = _this.__gl;
                gl.bindRenderbuffer(GL_RENDERBUFFER, (_a = renderbuffer === null || renderbuffer === void 0 ? void 0 : renderbuffer.raw) !== null && _a !== void 0 ? _a : null);
            });
            this.__bindHelperFramebuffer = new BindHelper(null, function (framebuffer) {
                var _a;
                var gl = _this.__gl;
                gl.bindFramebuffer(GL_FRAMEBUFFER, (_a = framebuffer === null || framebuffer === void 0 ? void 0 : framebuffer.raw) !== null && _a !== void 0 ? _a : null);
            });
            this.__bindHelperProgram = new BindHelper(null, function (program) {
                var _a;
                var gl = _this.__gl;
                gl.useProgram((_a = program === null || program === void 0 ? void 0 : program.raw) !== null && _a !== void 0 ? _a : null);
            });
            this.__bindHelperDrawBuffers = new BindHelper([GL_COLOR_ATTACHMENT0], function (buffers) {
                _this.rawDrawBuffers(buffers);
            });
            this.__extensionCache = {};
            this.__gl = gl;
            gl.enable(GL_DEPTH_TEST);
            gl.depthFunc(GL_LEQUAL);
            gl.enable(GL_BLEND);
            gl.blendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
        }
        GLCat.throwIfNull = function (v) {
            if (v == null) {
                throw GLCatErrors.UnexpectedNullError;
            }
            else {
                return v;
            }
        };
        Object.defineProperty(GLCat.prototype, "preferredDepthFormat", {
            get: function () {
                if (this.__preferredDepthFormat !== null) {
                    return this.__preferredDepthFormat;
                }
                else if (this.__gl instanceof WebGL2RenderingContext) {
                    return GL_DEPTH24_STENCIL8;
                }
                else {
                    return GL_DEPTH_COMPONENT16;
                }
            },
            set: function (format) {
                this.__preferredDepthFormat = format;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCat.prototype, "renderingContext", {
            /**
             * Its own rendering context.
             */
            get: function () {
                return this.__gl;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCat.prototype, "gl", {
            /**
             * Its own rendering context. Shorter than [[GLCat.renderingContext]]
             */
            get: function () {
                return this.__gl;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCat.prototype, "dummyTexture", {
            /**
             * A dummy texture, 100% organic pure #FF00FF texture.
             */
            get: function () {
                if (this.__dummyTextureCache) {
                    return this.__dummyTextureCache;
                }
                var texture = this.createTexture();
                texture.setTextureFromArray(1, 1, new Uint8Array([255, 0, 255, 255]));
                this.__dummyTextureCache = texture;
                return texture;
            },
            enumerable: false,
            configurable: true
        });
        GLCat.prototype.getExtension = function (name, throwIfNotFound) {
            var gl = this.__gl;
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
        };
        /**
         * Retrieve extensions.
         * If they are your precious ones and you cannot live without them, turn on `throwIfNotFound`.
         */
        GLCat.prototype.getExtensions = function (names, throwIfNotFound) {
            var _this = this;
            return names.map(function (n) { return _this.getExtension(n, throwIfNotFound); });
        };
        /**
         * Create a new shader object.
         */
        GLCat.prototype.createShader = function (type) {
            var gl = this.__gl;
            var shader = GLCat.throwIfNull(gl.createShader(type));
            return new GLCatShader(this, shader);
        };
        /**
         * Create a new GLCat program object.
         */
        GLCat.prototype.createProgram = function () {
            var gl = this.__gl;
            var program = GLCat.throwIfNull(gl.createProgram());
            return new GLCatProgram(this, program);
        };
        /**
         * Create a new GLCat program object, in lazier way.
         */
        GLCat.prototype.lazyProgram = function (vert, frag) {
            var vertexShader;
            try {
                // == vert ===================================================================================
                vertexShader = this.createShader(GL_VERTEX_SHADER);
                vertexShader.compile(vert);
                // == frag ===================================================================================
                var fragmentShader_1 = this.createShader(GL_FRAGMENT_SHADER);
                fragmentShader_1.compile(frag);
                // == program ================================================================================
                var program_1 = this.createProgram();
                program_1.link(vertexShader, fragmentShader_1);
                // == almost done ============================================================================
                return program_1;
            }
            catch (e) {
                vertexShader === null || vertexShader === void 0 ? void 0 : vertexShader.dispose();
                throw e;
            }
        };
        /**
         * Create a new GLCat program object, in lazier way.
         * It's gonna be asynchronous if you have the KHR_parallel_shader_compile extension support.
         */
        GLCat.prototype.lazyProgramAsync = function (vert, frag) {
            try {
                // == vert ===================================================================================
                var vertexShader_1 = this.createShader(GL_VERTEX_SHADER);
                vertexShader_1.compile(vert);
                // == frag ===================================================================================
                var fragmentShader_2 = this.createShader(GL_FRAGMENT_SHADER);
                fragmentShader_2.compile(frag);
                // == program ================================================================================
                var program_2 = this.createProgram();
                return program_2.linkAsync(vertexShader_1, fragmentShader_2).then(function () {
                    return program_2;
                }).catch(function (e) {
                    program_2 === null || program_2 === void 0 ? void 0 : program_2.dispose();
                    fragmentShader_2 === null || fragmentShader_2 === void 0 ? void 0 : fragmentShader_2.dispose();
                    vertexShader_1 === null || vertexShader_1 === void 0 ? void 0 : vertexShader_1.dispose();
                    return Promise.reject(e);
                });
            }
            catch (e) {
                return Promise.reject(e);
            }
        };
        /**
         * Specify a program to use.
         * If callback is provided, it will execute the callback immediately, and undo the usage after the callback.
         */
        GLCat.prototype.useProgram = function (program, callback) {
            return this.__bindHelperProgram.bind(program, callback);
        };
        /**
         * Create a new vertex buffer.
         */
        GLCat.prototype.createBuffer = function () {
            var gl = this.__gl;
            var buffer = GLCat.throwIfNull(gl.createBuffer());
            return new GLCatBuffer(this, buffer);
        };
        /**
         * Bind a vertex buffer.
         * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
         */
        GLCat.prototype.bindVertexBuffer = function (buffer, callback) {
            return this.__bindHelperVertexBuffer.bind(buffer, callback);
        };
        /**
         * Bind an index buffer.
         * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
         */
        GLCat.prototype.bindIndexBuffer = function (buffer, callback) {
            return this.__bindHelperIndexBuffer.bind(buffer, callback);
        };
        /**
         * Create a new vertex array.
         */
        GLCat.prototype.createVertexArray = function () {
            var gl = this.__gl;
            if (gl instanceof WebGL2RenderingContext) {
                var vertexArray = GLCat.throwIfNull(gl.createVertexArray());
                return new GLCatVertexArray(this, vertexArray);
            }
            else {
                var ext = this.getExtension('OES_vertex_array_object', true);
                var vertexArray = GLCat.throwIfNull(ext.createVertexArrayOES());
                return new GLCatVertexArray(this, vertexArray);
            }
        };
        /**
         * Wrapper of `gl.bindVertexArray`.
         *
         * {@link rawBindVertexArray} is better.
         */
        GLCat.prototype.rawBindVertexArray = function (array) {
            var gl = this.__gl;
            if (gl instanceof WebGL2RenderingContext) {
                gl.bindVertexArray(array);
            }
            else {
                var ext = this.getExtension('OES_vertex_array_object', true);
                ext.bindVertexArrayOES(array);
            }
        };
        /**
         * {@link rawBindVertexArray} but better.
         *
         * Bind a vertex array.
         * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
         */
        GLCat.prototype.bindVertexArray = function (vertexArray, callback) {
            return this.__bindHelperVertexArray.bind(vertexArray, callback);
        };
        /**
         * Create a new texture.
         */
        GLCat.prototype.createTexture = function () {
            var gl = this.__gl;
            var texture = GLCat.throwIfNull(gl.createTexture());
            return new GLCatTexture(this, texture);
        };
        /**
         * Bind a 2D texture.
         * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
         */
        GLCat.prototype.bindTexture2D = function (texture, callback) {
            return this.__bindHelperTexture2D.bind(texture, callback);
        };
        /**
         * Bind a cubemap texture.
         * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
         */
        GLCat.prototype.bindTextureCubeMap = function (texture, callback) {
            return this.__bindHelperTextureCubeMap.bind(texture, callback);
        };
        /**
         * Create a new renderbuffer.
         */
        GLCat.prototype.createRenderbuffer = function () {
            var gl = this.__gl;
            var renderbuffer = GLCat.throwIfNull(gl.createRenderbuffer());
            return new GLCatRenderbuffer(this, renderbuffer);
        };
        /**
         * Bind a renderbuffer.
         * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
         */
        GLCat.prototype.bindRenderbuffer = function (renderbuffer, callback) {
            return this.__bindHelperRenderbuffer.bind(renderbuffer, callback);
        };
        /**
         * Create a new framebuffer.
         */
        GLCat.prototype.createFramebuffer = function () {
            var gl = this.__gl;
            var framebuffer = GLCat.throwIfNull(gl.createFramebuffer());
            return new GLCatFramebuffer(this, framebuffer);
        };
        /**
         * Bind a framebuffer.
         * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
         */
        GLCat.prototype.bindFramebuffer = function (framebuffer, callback) {
            return this.__bindHelperFramebuffer.bind(framebuffer, callback);
        };
        /**
         * Create a new framebufer, in lazier way.
         */
        GLCat.prototype.lazyFramebuffer = function (width, height, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.isFloat, isFloat = _c === void 0 ? false : _c, _d = _b.depthFormat, depthFormat = _d === void 0 ? this.preferredDepthFormat : _d;
            var texture;
            var renderbuffer;
            var framebuffer;
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
        };
        /**
         * Create a new multisample framebuffer, in lazier way.
         */
        GLCat.prototype.lazyMultisampleFramebuffer = function (width, height, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.samples, samples = _c === void 0 ? 4 : _c, _d = _b.isFloat, isFloat = _d === void 0 ? false : _d, _e = _b.depthFormat, depthFormat = _e === void 0 ? this.preferredDepthFormat : _e, _f = _b.fallbackWebGL1, fallbackWebGL1 = _f === void 0 ? true : _f;
            var gl = this.__gl;
            if (gl instanceof WebGL2RenderingContext) {
                var texture = void 0;
                var renderbufferDepth = void 0;
                var renderbufferColor = void 0;
                var framebuffer = void 0;
                try {
                    // == framebuffer ==========================================================================
                    framebuffer = this.createFramebuffer();
                    // == renderbuffer depth ===================================================================
                    renderbufferDepth = this.createRenderbuffer();
                    renderbufferDepth.initMultisample(width, height, { samples: samples, format: depthFormat });
                    framebuffer.attachRenderbuffer(renderbufferDepth, { attachment: GL_DEPTH_ATTACHMENT });
                    // == renderbuffer color ===================================================================
                    var renderbufferColor_1 = this.createRenderbuffer();
                    var colorFormat = isFloat ? GL_RGBA32F : GL_RGBA8;
                    renderbufferColor_1.initMultisample(width, height, { samples: samples, format: colorFormat });
                    framebuffer.attachRenderbuffer(renderbufferColor_1, { attachment: GL_COLOR_ATTACHMENT0 });
                    // == almost done ==========================================================================
                    return framebuffer;
                }
                catch (e) {
                    framebuffer === null || framebuffer === void 0 ? void 0 : framebuffer.dispose();
                    texture === null || texture === void 0 ? void 0 : texture.dispose();
                    renderbufferColor === null || renderbufferColor === void 0 ? void 0 : renderbufferColor.dispose();
                    renderbufferDepth === null || renderbufferDepth === void 0 ? void 0 : renderbufferDepth.dispose();
                    throw e;
                }
            }
            else if (fallbackWebGL1) {
                return this.lazyFramebuffer(width, height, { isFloat: isFloat });
            }
            else {
                throw GLCatErrors.WebGL2ExclusiveError;
            }
        };
        /**
         * Create a new draw buffers, in lazier way.
         * If you can't grab `WEBGL_draw_buffers` extension, you'll die instantly at this point.
         */
        GLCat.prototype.lazyDrawbuffers = function (width, height, numBuffers, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.isFloat, isFloat = _c === void 0 ? false : _c, _d = _b.depthFormat, depthFormat = _d === void 0 ? this.preferredDepthFormat : _d;
            if (GL_MAX_DRAW_BUFFERS < numBuffers) {
                throw new Error('GLCat: Maximum draw buffers count exceeded');
            }
            var textures = [];
            var framebuffer;
            try {
                // == framebuffer ============================================================================
                framebuffer = this.createFramebuffer();
                // == renderbuffer ===========================================================================
                var renderbuffer_1 = this.createRenderbuffer();
                renderbuffer_1.init(width, height, { format: depthFormat });
                framebuffer.attachRenderbuffer(renderbuffer_1, { attachment: GL_DEPTH_ATTACHMENT });
                // == texture ================================================================================
                for (var i = 0; i < numBuffers; i++) {
                    var texture = this.createTexture();
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
                textures.forEach(function (texture) {
                    texture.dispose();
                });
                framebuffer === null || framebuffer === void 0 ? void 0 : framebuffer.dispose();
                throw e;
            }
        };
        /**
         * Wrapper of `gl.drawBuffers`.
         *
         * {@link drawBuffers} is better.
         */
        GLCat.prototype.rawDrawBuffers = function (buffers) {
            var gl = this.__gl;
            if (gl instanceof WebGL2RenderingContext) {
                gl.drawBuffers(buffers);
            }
            else {
                var ext = this.getExtension('WEBGL_draw_buffers');
                ext === null || ext === void 0 ? void 0 : ext.drawBuffersWEBGL(buffers);
            }
        };
        /**
         * {@link rawDrawBuffers} but better.
         *
         * Call this before you're gonna use draw buffers.
         * If you can't grab `WEBGL_draw_buffers` extension, you'll die instantly at this point.
         * If callback is provided, it will execute the callback immediately, and undo the draw buffers after the callback.
         */
        GLCat.prototype.drawBuffers = function (buffersOrNumBuffers, callback) {
            var buffers;
            if (Array.isArray(buffersOrNumBuffers)) {
                buffers = buffersOrNumBuffers;
            }
            else if (buffersOrNumBuffers) {
                buffers = [];
                for (var i = 0; i < buffersOrNumBuffers; i++) {
                    buffers[i] = GL_COLOR_ATTACHMENT0 + i;
                }
            }
            else {
                buffers = [GL_COLOR_ATTACHMENT0];
            }
            return this.__bindHelperDrawBuffers.bind(buffers, callback);
        };
        /**
         * a wrapper of drawElementsInstanced.
         */
        GLCat.prototype.drawArraysInstanced = function (mode, first, count, primcount) {
            var gl = this.gl;
            if (gl instanceof WebGL2RenderingContext) {
                gl.drawArraysInstanced(mode, first, count, primcount);
            }
            else {
                var ext = this.getExtension('ANGLE_instanced_arrays', true);
                ext.drawArraysInstancedANGLE(mode, first, count, primcount);
            }
        };
        /**
         * a wrapper of drawElementsInstanced.
         */
        GLCat.prototype.drawElementsInstanced = function (mode, count, type, offset, instanceCount) {
            var gl = this.gl;
            if (gl instanceof WebGL2RenderingContext) {
                gl.drawElementsInstanced(mode, count, type, offset, instanceCount);
            }
            else {
                var ext = this.getExtension('ANGLE_instanced_arrays', true);
                ext.drawElementsInstancedANGLE(mode, count, type, offset, instanceCount);
            }
        };
        /**
         * Clear the current framebuffer.
         */
        GLCat.prototype.clear = function (red, green, blue, alpha, depth) {
            if (red === void 0) { red = 0.0; }
            if (green === void 0) { green = 0.0; }
            if (blue === void 0) { blue = 0.0; }
            if (alpha === void 0) { alpha = 1.0; }
            if (depth === void 0) { depth = 1.0; }
            var gl = this.__gl;
            gl.clearColor(red, green, blue, alpha);
            gl.clearDepth(depth);
            gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        };
        /**
         * Basically just a `gl.blitFramebuffer`.
         */
        GLCat.prototype.blitFramebuffer = function (src, dst, _a) {
            var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            var _m = _a === void 0 ? {} : _a, _o = _m.srcViewport, srcViewport = _o === void 0 ? [0, 0, (_c = (_b = src === null || src === void 0 ? void 0 : src.renderbuffer) === null || _b === void 0 ? void 0 : _b.width) !== null && _c !== void 0 ? _c : 0, (_e = (_d = src === null || src === void 0 ? void 0 : src.renderbuffer) === null || _d === void 0 ? void 0 : _d.height) !== null && _e !== void 0 ? _e : 0] : _o, _p = _m.dstViewport, dstViewport = _p === void 0 ? [0, 0, (_g = (_f = dst === null || dst === void 0 ? void 0 : dst.renderbuffer) === null || _f === void 0 ? void 0 : _f.width) !== null && _g !== void 0 ? _g : 0, (_j = (_h = dst === null || dst === void 0 ? void 0 : dst.renderbuffer) === null || _h === void 0 ? void 0 : _h.height) !== null && _j !== void 0 ? _j : 0] : _p, _q = _m.mask, mask = _q === void 0 ? GL_COLOR_BUFFER_BIT : _q, _r = _m.filter, filter = _r === void 0 ? GL_NEAREST : _r;
            var gl = this.__gl;
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
        };
        return GLCat;
    }());

    exports.GLCat = GLCat;
    exports.GLCatBuffer = GLCatBuffer;
    exports.GLCatFramebuffer = GLCatFramebuffer;
    exports.GLCatProgram = GLCatProgram;
    exports.GLCatRenderbuffer = GLCatRenderbuffer;
    exports.GLCatShader = GLCatShader;
    exports.GLCatTexture = GLCatTexture;
    exports.GLCatVertexArray = GLCatVertexArray;
    exports.default = GLCat;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xjYXQuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9HTENvbnN0YW50cy50cyIsIi4uL3NyYy91dGlscy9CaW5kSGVscGVyLnRzIiwiLi4vc3JjL0dMQ2F0QnVmZmVyLnRzIiwiLi4vc3JjL0dMQ2F0RXJyb3JzLnRzIiwiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy9HTENhdEZyYW1lYnVmZmVyLnRzIiwiLi4vc3JjL0dMQ2F0UHJvZ3JhbS50cyIsIi4uL3NyYy9HTENhdFJlbmRlcmJ1ZmZlci50cyIsIi4uL3NyYy9HTENhdFNoYWRlci50cyIsIi4uL3NyYy9HTENhdFRleHR1cmUudHMiLCIuLi9zcmMvR0xDYXRWZXJ0ZXhBcnJheS50cyIsIi4uL3NyYy9HTENhdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgR0xfQUNUSVZFX0FUVFJJQlVURVMgPSAweDhiODk7XG5leHBvcnQgY29uc3QgR0xfQUNUSVZFX1RFWFRVUkUgPSAweDg0ZTA7XG5leHBvcnQgY29uc3QgR0xfQUNUSVZFX1VOSUZPUk1fQkxPQ0tTID0gMHg4YTM2O1xuZXhwb3J0IGNvbnN0IEdMX0FDVElWRV9VTklGT1JNUyA9IDB4OGI4NjtcbmV4cG9ydCBjb25zdCBHTF9BTElBU0VEX0xJTkVfV0lEVEhfUkFOR0UgPSAweDg0NmU7XG5leHBvcnQgY29uc3QgR0xfQUxJQVNFRF9QT0lOVF9TSVpFX1JBTkdFID0gMHg4NDZkO1xuZXhwb3J0IGNvbnN0IEdMX0FMUEhBID0gMHgxOTA2O1xuZXhwb3J0IGNvbnN0IEdMX0FMUEhBX0JJVFMgPSAweDBkNTU7XG5leHBvcnQgY29uc3QgR0xfQUxSRUFEWV9TSUdOQUxFRCA9IDB4OTExYTtcbmV4cG9ydCBjb25zdCBHTF9BTFdBWVMgPSAweDAyMDc7XG5leHBvcnQgY29uc3QgR0xfQU5ZX1NBTVBMRVNfUEFTU0VEID0gMHg4YzJmO1xuZXhwb3J0IGNvbnN0IEdMX0FOWV9TQU1QTEVTX1BBU1NFRF9DT05TRVJWQVRJVkUgPSAweDhkNmE7XG5leHBvcnQgY29uc3QgR0xfQVJSQVlfQlVGRkVSID0gMHg4ODkyO1xuZXhwb3J0IGNvbnN0IEdMX0FSUkFZX0JVRkZFUl9CSU5ESU5HID0gMHg4ODk0O1xuZXhwb3J0IGNvbnN0IEdMX0FUVEFDSEVEX1NIQURFUlMgPSAweDhiODU7XG5leHBvcnQgY29uc3QgR0xfQkFDSyA9IDB4MDQwNTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORCA9IDB4MGJlMjtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9DT0xPUiA9IDB4ODAwNTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9EU1RfQUxQSEEgPSAweDgwY2E7XG5leHBvcnQgY29uc3QgR0xfQkxFTkRfRFNUX1JHQiA9IDB4ODBjODtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9FUVVBVElPTiA9IDB4ODAwOTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9FUVVBVElPTl9BTFBIQSA9IDB4ODgzZDtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9FUVVBVElPTl9SR0IgPSAweDgwMDk7XG5leHBvcnQgY29uc3QgR0xfQkxFTkRfU1JDX0FMUEhBID0gMHg4MGNiO1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX1NSQ19SR0IgPSAweDgwYzk7XG5leHBvcnQgY29uc3QgR0xfQkxVRV9CSVRTID0gMHgwZDU0O1xuZXhwb3J0IGNvbnN0IEdMX0JPT0wgPSAweDhiNTY7XG5leHBvcnQgY29uc3QgR0xfQk9PTF9WRUMyID0gMHg4YjU3O1xuZXhwb3J0IGNvbnN0IEdMX0JPT0xfVkVDMyA9IDB4OGI1ODtcbmV4cG9ydCBjb25zdCBHTF9CT09MX1ZFQzQgPSAweDhiNTk7XG5leHBvcnQgY29uc3QgR0xfQlJPV1NFUl9ERUZBVUxUX1dFQkdMID0gMHg5MjQ0O1xuZXhwb3J0IGNvbnN0IEdMX0JVRkZFUl9TSVpFID0gMHg4NzY0O1xuZXhwb3J0IGNvbnN0IEdMX0JVRkZFUl9VU0FHRSA9IDB4ODc2NTtcbmV4cG9ydCBjb25zdCBHTF9CWVRFID0gMHgxNDAwO1xuZXhwb3J0IGNvbnN0IEdMX0NDVyA9IDB4MDkwMTtcbmV4cG9ydCBjb25zdCBHTF9DTEFNUF9UT19FREdFID0gMHg4MTJmO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SID0gMHgxODAwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQwID0gMHg4Y2UwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQwX1dFQkdMID0gMHg4Y2UwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxID0gMHg4Y2UxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxX1dFQkdMID0gMHg4Y2UxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMCA9IDB4OGNlYTtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTBfV0VCR0wgPSAweDhjZWE7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDExID0gMHg4Y2ViO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMV9XRUJHTCA9IDB4OGNlYjtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTIgPSAweDhjZWM7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDEyX1dFQkdMID0gMHg4Y2VjO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMyA9IDB4OGNlZDtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTNfV0VCR0wgPSAweDhjZWQ7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDE0ID0gMHg4Y2VlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxNF9XRUJHTCA9IDB4OGNlZTtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTUgPSAweDhjZWY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDE1X1dFQkdMID0gMHg4Y2VmO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQyID0gMHg4Y2UyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQyX1dFQkdMID0gMHg4Y2UyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQzID0gMHg4Y2UzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQzX1dFQkdMID0gMHg4Y2UzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ0ID0gMHg4Y2U0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ0X1dFQkdMID0gMHg4Y2U0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ1ID0gMHg4Y2U1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ1X1dFQkdMID0gMHg4Y2U1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ2ID0gMHg4Y2U2O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ2X1dFQkdMID0gMHg4Y2U2O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ3ID0gMHg4Y2U3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ3X1dFQkdMID0gMHg4Y2U3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ4ID0gMHg4Y2U4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ4X1dFQkdMID0gMHg4Y2U4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ5ID0gMHg4Y2U5O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ5X1dFQkdMID0gMHg4Y2U5O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0JVRkZFUl9CSVQgPSAweDAwMDA0MDAwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0NMRUFSX1ZBTFVFID0gMHgwYzIyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX1dSSVRFTUFTSyA9IDB4MGMyMztcbmV4cG9ydCBjb25zdCBHTF9DT01QQVJFX1JFRl9UT19URVhUVVJFID0gMHg4ODRlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBJTEVfU1RBVFVTID0gMHg4YjgxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBMRVRJT05fU1RBVFVTX0tIUiA9IDB4OTFiMTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1IxMV9FQUMgPSAweDkyNzA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SRzExX0VBQyA9IDB4OTI3MjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQl9BVENfV0VCR0wgPSAweDhjOTI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JfRVRDMV9XRUJHTCA9IDB4OGQ2NDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQl9QVlJUQ18yQlBQVjFfSU1HID0gMHg4YzAxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCX1BWUlRDXzRCUFBWMV9JTUcgPSAweDhjMDA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JfUzNUQ19EWFQxX0VYVCA9IDB4ODNmMDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQjhfRVRDMiA9IDB4OTI3NDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQjhfUFVOQ0hUSFJPVUdIX0FMUEhBMV9FVEMyID0gMHg5Mjc4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEwWDEwX0tIUiA9IDB4OTNiYjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMFg1X0tIUiA9IDB4OTNiODtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMFg2X0tIUiA9IDB4OTNiOTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMFg4X0tIUiA9IDB4OTNiYTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMlgxMF9LSFIgPSAweDkzYmM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfMTJYMTJfS0hSID0gMHg5M2JkO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzRYNF9LSFIgPSAweDkzYjA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfNVg0X0tIUiA9IDB4OTNiMTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ181WDVfS0hSID0gMHg5M2IyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzZYNV9LSFIgPSAweDkzYjM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfNlg2X0tIUiA9IDB4OTNiNDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ184WDVfS0hSID0gMHg5M2I1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzhYNl9LSFIgPSAweDkzYjY7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfOFg4X0tIUiA9IDB4OTNiNztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVRDX0VYUExJQ0lUX0FMUEhBX1dFQkdMID0gMHg4YzkyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BVENfSU5URVJQT0xBVEVEX0FMUEhBX1dFQkdMID0gMHg4N2VlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9QVlJUQ18yQlBQVjFfSU1HID0gMHg4YzAzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9QVlJUQ180QlBQVjFfSU1HID0gMHg4YzAyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDFfRVhUID0gMHg4M2YxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDNfRVhUID0gMHg4M2YyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDVfRVhUID0gMHg4M2YzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQThfRVRDMl9FQUMgPSAweDkyNzU7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TSUdORURfUjExX0VBQyA9IDB4OTI3MTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NJR05FRF9SRzExX0VBQyA9IDB4OTI3MztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQxX0VYVCA9IDB4OGM0ZDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQzX0VYVCA9IDB4OGM0ZTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQ1X0VYVCA9IDB4OGM0ZjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfUzNUQ19EWFQxX0VYVCA9IDB4OGM0YztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEwWDEwX0tIUiA9IDB4OTNkYjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEwWDVfS0hSID0gMHg5M2Q4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTBYNl9LSFIgPSAweDkzZDk7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ18xMFg4X0tIUiA9IDB4OTNkYTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEyWDEwX0tIUiA9IDB4OTNkYztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEyWDEyX0tIUiA9IDB4OTNkZDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzRYNF9LSFIgPSAweDkzZDA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ181WDRfS0hSID0gMHg5M2QxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfNVg1X0tIUiA9IDB4OTNkMjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzZYNV9LSFIgPSAweDkzZDM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ182WDZfS0hSID0gMHg5M2Q0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfOFg1X0tIUiA9IDB4OTNkNTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzhYNl9LSFIgPSAweDkzZDY7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ184WDhfS0hSID0gMHg5M2Q3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0VUQzJfRUFDID0gMHg5Mjc3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfRVRDMiA9IDB4OTI3NjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X1BVTkNIVEhST1VHSF9BTFBIQTFfRVRDMiA9IDB4OTI3OTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1RFWFRVUkVfRk9STUFUUyA9IDB4ODZhMztcbmV4cG9ydCBjb25zdCBHTF9DT05ESVRJT05fU0FUSVNGSUVEID0gMHg5MTFjO1xuZXhwb3J0IGNvbnN0IEdMX0NPTlNUQU5UX0FMUEhBID0gMHg4MDAzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTlNUQU5UX0NPTE9SID0gMHg4MDAxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTlRFWFRfTE9TVF9XRUJHTCA9IDB4OTI0MjtcbmV4cG9ydCBjb25zdCBHTF9DT1BZX1JFQURfQlVGRkVSID0gMHg4ZjM2O1xuZXhwb3J0IGNvbnN0IEdMX0NPUFlfUkVBRF9CVUZGRVJfQklORElORyA9IDB4OGYzNjtcbmV4cG9ydCBjb25zdCBHTF9DT1BZX1dSSVRFX0JVRkZFUiA9IDB4OGYzNztcbmV4cG9ydCBjb25zdCBHTF9DT1BZX1dSSVRFX0JVRkZFUl9CSU5ESU5HID0gMHg4ZjM3O1xuZXhwb3J0IGNvbnN0IEdMX0NVTExfRkFDRSA9IDB4MGI0NDtcbmV4cG9ydCBjb25zdCBHTF9DVUxMX0ZBQ0VfTU9ERSA9IDB4MGI0NTtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1BST0dSQU0gPSAweDhiOGQ7XG5leHBvcnQgY29uc3QgR0xfQ1VSUkVOVF9RVUVSWSA9IDB4ODg2NTtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1FVRVJZX0VYVCA9IDB4ODg2NTtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1ZFUlRFWF9BVFRSSUIgPSAweDg2MjY7XG5leHBvcnQgY29uc3QgR0xfQ1cgPSAweDA5MDA7XG5leHBvcnQgY29uc3QgR0xfREVDUiA9IDB4MWUwMztcbmV4cG9ydCBjb25zdCBHTF9ERUNSX1dSQVAgPSAweDg1MDg7XG5leHBvcnQgY29uc3QgR0xfREVMRVRFX1NUQVRVUyA9IDB4OGI4MDtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSCA9IDB4MTgwMTtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9BVFRBQ0hNRU5UID0gMHg4ZDAwO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0JJVFMgPSAweDBkNTY7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQlVGRkVSX0JJVCA9IDB4MDAwMDAxMDA7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ0xFQVJfVkFMVUUgPSAweDBiNzM7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ09NUE9ORU5UID0gMHgxOTAyO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0NPTVBPTkVOVDE2ID0gMHg4MWE1O1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0NPTVBPTkVOVDI0ID0gMHg4MWE2O1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0NPTVBPTkVOVDMyRiA9IDB4OGNhYztcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9GVU5DID0gMHgwYjc0O1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX1JBTkdFID0gMHgwYjcwO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX1NURU5DSUwgPSAweDg0Zjk7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfU1RFTkNJTF9BVFRBQ0hNRU5UID0gMHg4MjFhO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX1RFU1QgPSAweDBiNzE7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfV1JJVEVNQVNLID0gMHgwYjcyO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIMjRfU1RFTkNJTDggPSAweDg4ZjA7XG5leHBvcnQgY29uc3QgR0xfREVQVEgzMkZfU1RFTkNJTDggPSAweDhjYWQ7XG5leHBvcnQgY29uc3QgR0xfRElUSEVSID0gMHgwYmQwO1xuZXhwb3J0IGNvbnN0IEdMX0RPTlRfQ0FSRSA9IDB4MTEwMDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjAgPSAweDg4MjU7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIwX1dFQkdMID0gMHg4ODI1O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMSA9IDB4ODgyNjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjFfV0VCR0wgPSAweDg4MjY7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMCA9IDB4ODgyZjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEwX1dFQkdMID0gMHg4ODJmO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTEgPSAweDg4MzA7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMV9XRUJHTCA9IDB4ODgzMDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEyID0gMHg4ODMxO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTJfV0VCR0wgPSAweDg4MzE7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMyA9IDB4ODgzMjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEzX1dFQkdMID0gMHg4ODMyO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTQgPSAweDg4MzM7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxNF9XRUJHTCA9IDB4ODgzMztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjE1ID0gMHg4ODM0O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTVfV0VCR0wgPSAweDg4MzQ7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIyID0gMHg4ODI3O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMl9XRUJHTCA9IDB4ODgyNztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjMgPSAweDg4Mjg7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIzX1dFQkdMID0gMHg4ODI4O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNCA9IDB4ODgyOTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjRfV0VCR0wgPSAweDg4Mjk7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI1ID0gMHg4ODJhO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNV9XRUJHTCA9IDB4ODgyYTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjYgPSAweDg4MmI7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI2X1dFQkdMID0gMHg4ODJiO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNyA9IDB4ODgyYztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjdfV0VCR0wgPSAweDg4MmM7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI4ID0gMHg4ODJkO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSOF9XRUJHTCA9IDB4ODgyZDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjkgPSAweDg4MmU7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI5X1dFQkdMID0gMHg4ODJlO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfRlJBTUVCVUZGRVIgPSAweDhjYTk7XG5leHBvcnQgY29uc3QgR0xfRFJBV19GUkFNRUJVRkZFUl9CSU5ESU5HID0gMHg4Y2E2O1xuZXhwb3J0IGNvbnN0IEdMX0RTVF9BTFBIQSA9IDB4MDMwNDtcbmV4cG9ydCBjb25zdCBHTF9EU1RfQ09MT1IgPSAweDAzMDY7XG5leHBvcnQgY29uc3QgR0xfRFlOQU1JQ19DT1BZID0gMHg4OGVhO1xuZXhwb3J0IGNvbnN0IEdMX0RZTkFNSUNfRFJBVyA9IDB4ODhlODtcbmV4cG9ydCBjb25zdCBHTF9EWU5BTUlDX1JFQUQgPSAweDg4ZTk7XG5leHBvcnQgY29uc3QgR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIgPSAweDg4OTM7XG5leHBvcnQgY29uc3QgR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVJfQklORElORyA9IDB4ODg5NTtcbmV4cG9ydCBjb25zdCBHTF9FUVVBTCA9IDB4MDIwMjtcbmV4cG9ydCBjb25zdCBHTF9GQVNURVNUID0gMHgxMTAxO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUID0gMHgxNDA2O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUXzMyX1VOU0lHTkVEX0lOVF8yNF84X1JFViA9IDB4OGRhZDtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQyID0gMHg4YjVhO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDJYMyA9IDB4OGI2NTtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQyWDQgPSAweDhiNjY7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUMyA9IDB4OGI1YjtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQzWDIgPSAweDhiNjc7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUM1g0ID0gMHg4YjY4O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDQgPSAweDhiNWM7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUNFgyID0gMHg4YjY5O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDRYMyA9IDB4OGI2YTtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9WRUMyID0gMHg4YjUwO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX1ZFQzMgPSAweDhiNTE7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfVkVDNCA9IDB4OGI1MjtcbmV4cG9ydCBjb25zdCBHTF9GUkFHTUVOVF9TSEFERVIgPSAweDhiMzA7XG5leHBvcnQgY29uc3QgR0xfRlJBR01FTlRfU0hBREVSX0RFUklWQVRJVkVfSElOVCA9IDB4OGI4YjtcbmV4cG9ydCBjb25zdCBHTF9GUkFHTUVOVF9TSEFERVJfREVSSVZBVElWRV9ISU5UX09FUyA9IDB4OGI4YjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUiA9IDB4OGQ0MDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0FMUEhBX1NJWkUgPSAweDgyMTU7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9CTFVFX1NJWkUgPSAweDgyMTQ7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9DT0xPUl9FTkNPRElORyA9IDB4ODIxMDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0NPTE9SX0VOQ09ESU5HX0VYVCA9IDB4ODIxMDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0NPTVBPTkVOVF9UWVBFID0gMHg4MjExO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfQ09NUE9ORU5UX1RZUEVfRVhUID0gMHg4MjExO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfREVQVEhfU0laRSA9IDB4ODIxNjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0dSRUVOX1NJWkUgPSAweDgyMTM7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9PQkpFQ1RfTkFNRSA9IDB4OGNkMTtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX09CSkVDVF9UWVBFID0gMHg4Y2QwO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfUkVEX1NJWkUgPSAweDgyMTI7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9TVEVOQ0lMX1NJWkUgPSAweDgyMTc7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0NVQkVfTUFQX0ZBQ0UgPSAweDhjZDM7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0xBWUVSID0gMHg4Y2Q0O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfVEVYVFVSRV9MRVZFTCA9IDB4OGNkMjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9CSU5ESU5HID0gMHg4Y2E2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0NPTVBMRVRFID0gMHg4Y2Q1O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0RFRkFVTFQgPSAweDgyMTg7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfSU5DT01QTEVURV9BVFRBQ0hNRU5UID0gMHg4Y2Q2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfRElNRU5TSU9OUyA9IDB4OGNkOTtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX01JU1NJTkdfQVRUQUNITUVOVCA9IDB4OGNkNztcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX01VTFRJU0FNUExFID0gMHg4ZDU2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX1VOU1VQUE9SVEVEID0gMHg4Y2RkO1xuZXhwb3J0IGNvbnN0IEdMX0ZST05UID0gMHgwNDA0O1xuZXhwb3J0IGNvbnN0IEdMX0ZST05UX0FORF9CQUNLID0gMHgwNDA4O1xuZXhwb3J0IGNvbnN0IEdMX0ZST05UX0ZBQ0UgPSAweDBiNDY7XG5leHBvcnQgY29uc3QgR0xfRlVOQ19BREQgPSAweDgwMDY7XG5leHBvcnQgY29uc3QgR0xfRlVOQ19SRVZFUlNFX1NVQlRSQUNUID0gMHg4MDBiO1xuZXhwb3J0IGNvbnN0IEdMX0ZVTkNfU1VCU1RSQUNUID0gMHg4MDBhO1xuZXhwb3J0IGNvbnN0IEdMX0dFTkVSQVRFX01JUE1BUF9ISU5UID0gMHg4MTkyO1xuZXhwb3J0IGNvbnN0IEdMX0dFUVVBTCA9IDB4MDIwNjtcbmV4cG9ydCBjb25zdCBHTF9HUFVfRElTSk9JTlRfRVhUID0gMHg4ZmJiO1xuZXhwb3J0IGNvbnN0IEdMX0dSRUFURVIgPSAweDAyMDQ7XG5leHBvcnQgY29uc3QgR0xfR1JFRU5fQklUUyA9IDB4MGQ1MztcbmV4cG9ydCBjb25zdCBHTF9IQUxGX0ZMT0FUID0gMHgxNDBiO1xuZXhwb3J0IGNvbnN0IEdMX0hBTEZfRkxPQVRfT0VTID0gMHg4ZDYxO1xuZXhwb3J0IGNvbnN0IEdMX0hJR0hfRkxPQVQgPSAweDhkZjI7XG5leHBvcnQgY29uc3QgR0xfSElHSF9JTlQgPSAweDhkZjU7XG5leHBvcnQgY29uc3QgR0xfSU1QTEVNRU5UQVRJT05fQ09MT1JfUkVBRF9GT1JNQVQgPSAweDhiOWI7XG5leHBvcnQgY29uc3QgR0xfSU1QTEVNRU5UQVRJT05fQ09MT1JfUkVBRF9UWVBFID0gMHg4YjlhO1xuZXhwb3J0IGNvbnN0IEdMX0lOQ1IgPSAweDFlMDI7XG5leHBvcnQgY29uc3QgR0xfSU5DUl9XUkFQID0gMHg4NTA3O1xuZXhwb3J0IGNvbnN0IEdMX0lOVCA9IDB4MTQwNDtcbmV4cG9ydCBjb25zdCBHTF9JTlRfMl8xMF8xMF8xMF9SRVYgPSAweDhkOWY7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfMkQgPSAweDhkY2E7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfMkRfQVJSQVkgPSAweDhkY2Y7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfM0QgPSAweDhkY2I7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfQ1VCRSA9IDB4OGRjYztcbmV4cG9ydCBjb25zdCBHTF9JTlRfVkVDMiA9IDB4OGI1MztcbmV4cG9ydCBjb25zdCBHTF9JTlRfVkVDMyA9IDB4OGI1NDtcbmV4cG9ydCBjb25zdCBHTF9JTlRfVkVDNCA9IDB4OGI1NTtcbmV4cG9ydCBjb25zdCBHTF9JTlRFUkxFQVZFRF9BVFRSSUJTID0gMHg4YzhjO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfRU5VTSA9IDB4MDUwMDtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX0ZSQU1FQlVGRkVSX09QRVJBVElPTiA9IDB4MDUwNjtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX0lOREVYID0gMHhmZmZmZmZmZjtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX09QRVJBVElPTiA9IDB4MDUwMjtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX1ZBTFVFID0gMHgwNTAxO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkVSVCA9IDB4MTUwYTtcbmV4cG9ydCBjb25zdCBHTF9LRUVQID0gMHgxZTAwO1xuZXhwb3J0IGNvbnN0IEdMX0xFUVVBTCA9IDB4MDIwMztcbmV4cG9ydCBjb25zdCBHTF9MRVNTID0gMHgwMjAxO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVfTE9PUCA9IDB4MDAwMjtcbmV4cG9ydCBjb25zdCBHTF9MSU5FX1NUUklQID0gMHgwMDAzO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVfV0lEVEggPSAweDBiMjE7XG5leHBvcnQgY29uc3QgR0xfTElORUFSID0gMHgyNjAxO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVBUl9NSVBNQVBfTElORUFSID0gMHgyNzAzO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVBUl9NSVBNQVBfTkVBUkVTVCA9IDB4MjcwMTtcbmV4cG9ydCBjb25zdCBHTF9MSU5FUyA9IDB4MDAwMTtcbmV4cG9ydCBjb25zdCBHTF9MSU5LX1NUQVRVUyA9IDB4OGI4MjtcbmV4cG9ydCBjb25zdCBHTF9MT1dfRkxPQVQgPSAweDhkZjA7XG5leHBvcnQgY29uc3QgR0xfTE9XX0lOVCA9IDB4OGRmMztcbmV4cG9ydCBjb25zdCBHTF9MVU1JTkFOQ0UgPSAweDE5MDk7XG5leHBvcnQgY29uc3QgR0xfTFVNSU5BTkNFX0FMUEhBID0gMHgxOTBhO1xuZXhwb3J0IGNvbnN0IEdMX01BWCA9IDB4ODAwODtcbmV4cG9ydCBjb25zdCBHTF9NQVhfM0RfVEVYVFVSRV9TSVpFID0gMHg4MDczO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9BUlJBWV9URVhUVVJFX0xBWUVSUyA9IDB4ODhmZjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ0xJRU5UX1dBSVRfVElNRU9VVF9XRUJHTCA9IDB4OTI0NztcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ09MT1JfQVRUQUNITUVOVFMgPSAweDhjZGY7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTE9SX0FUVEFDSE1FTlRTX1dFQkdMID0gMHg4Y2RmO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DT01CSU5FRF9GUkFHTUVOVF9VTklGT1JNX0NPTVBPTkVOVFMgPSAweDhhMzM7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTUJJTkVEX1RFWFRVUkVfSU1BR0VfVU5JVFMgPSAweDhiNGQ7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTUJJTkVEX1VOSUZPUk1fQkxPQ0tTID0gMHg4YTJlO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DT01CSU5FRF9WRVJURVhfVU5JRk9STV9DT01QT05FTlRTID0gMHg4YTMxO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DVUJFX01BUF9URVhUVVJFX1NJWkUgPSAweDg1MWM7XG5leHBvcnQgY29uc3QgR0xfTUFYX0RSQVdfQlVGRkVSUyA9IDB4ODgyNDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfRFJBV19CVUZGRVJTX1dFQkdMID0gMHg4ODI0O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FTEVNRU5UX0lOREVYID0gMHg4ZDZiO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FTEVNRU5UU19JTkRJQ0VTID0gMHg4MGU5O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FTEVNRU5UU19WRVJUSUNFUyA9IDB4ODBlODtcbmV4cG9ydCBjb25zdCBHTF9NQVhfRVhUID0gMHg4MDA4O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9JTlBVVF9DT01QT05FTlRTID0gMHg5MTI1O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9VTklGT1JNX0JMT0NLUyA9IDB4OGEyZDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfRlJBR01FTlRfVU5JRk9STV9DT01QT05FTlRTID0gMHg4YjQ5O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9VTklGT1JNX1ZFQ1RPUlMgPSAweDhkZmQ7XG5leHBvcnQgY29uc3QgR0xfTUFYX1BST0dSQU1fVEVYRUxfT0ZGU0VUID0gMHg4OTA1O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9SRU5ERVJCVUZGRVJfU0laRSA9IDB4ODRlODtcbmV4cG9ydCBjb25zdCBHTF9NQVhfU0FNUExFUyA9IDB4OGQ1NztcbmV4cG9ydCBjb25zdCBHTF9NQVhfU0VSVkVSX1dBSVRfVElNRU9VVCA9IDB4OTExMTtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9JTUFHRV9VTklUUyA9IDB4ODg3MjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9MT0RfQklBUyA9IDB4ODRmZDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9NQVhfQU5JU09UUk9QWV9FWFQgPSAweDg0ZmY7XG5leHBvcnQgY29uc3QgR0xfTUFYX1RFWFRVUkVfU0laRSA9IDB4MGQzMztcbmV4cG9ydCBjb25zdCBHTF9NQVhfVFJBTlNGT1JNX0ZFRURCQUNLX0lOVEVSTEVBVkVEX0NPTVBPTkVOVFMgPSAweDhjOGE7XG5leHBvcnQgY29uc3QgR0xfTUFYX1RSQU5TRk9STV9GRUVEQkFDS19TRVBBUkFURV9BVFRSSUJTID0gMHg4YzhiO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9UUkFOU0ZPUk1fRkVFREJBQ0tfU0VQQVJBVEVfQ09NUE9ORU5UUyA9IDB4OGM4MDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVU5JRk9STV9CTE9DS19TSVpFID0gMHg4YTMwO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9VTklGT1JNX0JVRkZFUl9CSU5ESU5HUyA9IDB4OGEyZjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkFSWUlOR19DT01QT05FTlRTID0gMHg4YjRiO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WQVJZSU5HX1ZFQ1RPUlMgPSAweDhkZmM7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9BVFRSSUJTID0gMHg4ODY5O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WRVJURVhfT1VUUFVUX0NPTVBPTkVOVFMgPSAweDkxMjI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9URVhUVVJFX0lNQUdFX1VOSVRTID0gMHg4YjRjO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WRVJURVhfVU5JRk9STV9CTE9DS1MgPSAweDhhMmI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9VTklGT1JNX0NPTVBPTkVOVFMgPSAweDhiNGE7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9VTklGT1JNX1ZFQ1RPUlMgPSAweDhkZmI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZJRVdQT1JUX0RJTVMgPSAweDBkM2E7XG5leHBvcnQgY29uc3QgR0xfTUVESVVNX0ZMT0FUID0gMHg4ZGYxO1xuZXhwb3J0IGNvbnN0IEdMX01FRElVTV9JTlQgPSAweDhkZjQ7XG5leHBvcnQgY29uc3QgR0xfTUlOID0gMHg4MDA3O1xuZXhwb3J0IGNvbnN0IEdMX01JTl9FWFQgPSAweDgwMDc7XG5leHBvcnQgY29uc3QgR0xfTUlOX1BST0dSQU1fVEVYRUxfT0ZGU0VUID0gMHg4OTA0O1xuZXhwb3J0IGNvbnN0IEdMX01JUlJPUkVEX1JFUEVBVCA9IDB4ODM3MDtcbmV4cG9ydCBjb25zdCBHTF9ORUFSRVNUID0gMHgyNjAwO1xuZXhwb3J0IGNvbnN0IEdMX05FQVJFU1RfTUlQTUFQX0xJTkVBUiA9IDB4MjcwMjtcbmV4cG9ydCBjb25zdCBHTF9ORUFSRVNUX01JUE1BUF9ORUFSRVNUID0gMHgyNzAwO1xuZXhwb3J0IGNvbnN0IEdMX05FVkVSID0gMHgwMjAwO1xuZXhwb3J0IGNvbnN0IEdMX05JQ0VTVCA9IDB4MTEwMjtcbmV4cG9ydCBjb25zdCBHTF9OT19FUlJPUiA9IDA7XG5leHBvcnQgY29uc3QgR0xfTk9ORSA9IDA7XG5leHBvcnQgY29uc3QgR0xfTk9URVFVQUwgPSAweDAyMDU7XG5leHBvcnQgY29uc3QgR0xfT0JKRUNUX1RZUEUgPSAweDkxMTI7XG5leHBvcnQgY29uc3QgR0xfT05FID0gMTtcbmV4cG9ydCBjb25zdCBHTF9PTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEEgPSAweDgwMDQ7XG5leHBvcnQgY29uc3QgR0xfT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SID0gMHg4MDAyO1xuZXhwb3J0IGNvbnN0IEdMX09ORV9NSU5VU19EU1RfQUxQSEEgPSAweDAzMDU7XG5leHBvcnQgY29uc3QgR0xfT05FX01JTlVTX0RTVF9DT0xPUiA9IDB4MDMwNztcbmV4cG9ydCBjb25zdCBHTF9PTkVfTUlOVVNfU1JDX0FMUEhBID0gMHgwMzAzO1xuZXhwb3J0IGNvbnN0IEdMX09ORV9NSU5VU19TUkNfQ09MT1IgPSAweDAzMDE7XG5leHBvcnQgY29uc3QgR0xfT1VUX09GX01FTU9SWSA9IDB4MDUwNTtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX0FMSUdOTUVOVCA9IDB4MGQwNTtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX1JPV19MRU5HVEggPSAweDBkMDI7XG5leHBvcnQgY29uc3QgR0xfUEFDS19TS0lQX1BJWEVMUyA9IDB4MGQwNDtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX1NLSVBfUk9XUyA9IDB4MGQwMztcbmV4cG9ydCBjb25zdCBHTF9QSVhFTF9QQUNLX0JVRkZFUiA9IDB4ODhlYjtcbmV4cG9ydCBjb25zdCBHTF9QSVhFTF9QQUNLX0JVRkZFUl9CSU5ESU5HID0gMHg4OGVkO1xuZXhwb3J0IGNvbnN0IEdMX1BJWEVMX1VOUEFDS19CVUZGRVIgPSAweDg4ZWM7XG5leHBvcnQgY29uc3QgR0xfUElYRUxfVU5QQUNLX0JVRkZFUl9CSU5ESU5HID0gMHg4OGVmO1xuZXhwb3J0IGNvbnN0IEdMX1BPSU5UUyA9IDB4MDAwMDtcbmV4cG9ydCBjb25zdCBHTF9QT0xZR09OX09GRlNFVF9GQUNUT1IgPSAweDgwMzg7XG5leHBvcnQgY29uc3QgR0xfUE9MWUdPTl9PRkZTRVRfRklMTCA9IDB4ODAzNztcbmV4cG9ydCBjb25zdCBHTF9QT0xZR09OX09GRlNFVF9VTklUUyA9IDB4MmEwMDtcbmV4cG9ydCBjb25zdCBHTF9RVUVSWV9DT1VOVEVSX0JJVFNfRVhUID0gMHg4ODY0O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVCA9IDB4ODg2NjtcbmV4cG9ydCBjb25zdCBHTF9RVUVSWV9SRVNVTFRfQVZBSUxBQkxFID0gMHg4ODY3O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVF9BVkFJTEFCTEVfRVhUID0gMHg4ODY3O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVF9FWFQgPSAweDg4NjY7XG5leHBvcnQgY29uc3QgR0xfUjExRl9HMTFGX0IxMEYgPSAweDhjM2E7XG5leHBvcnQgY29uc3QgR0xfUjE2RiA9IDB4ODIyZDtcbmV4cG9ydCBjb25zdCBHTF9SMTZJID0gMHg4MjMzO1xuZXhwb3J0IGNvbnN0IEdMX1IxNlVJID0gMHg4MjM0O1xuZXhwb3J0IGNvbnN0IEdMX1IzMkYgPSAweDgyMmU7XG5leHBvcnQgY29uc3QgR0xfUjMySSA9IDB4ODIzNTtcbmV4cG9ydCBjb25zdCBHTF9SMzJVSSA9IDB4ODIzNjtcbmV4cG9ydCBjb25zdCBHTF9SOCA9IDB4ODIyOTtcbmV4cG9ydCBjb25zdCBHTF9SOF9TTk9STSA9IDB4OGY5NDtcbmV4cG9ydCBjb25zdCBHTF9SOEkgPSAweDgyMzE7XG5leHBvcnQgY29uc3QgR0xfUjhVSSA9IDB4ODIzMjtcbmV4cG9ydCBjb25zdCBHTF9SQVNURVJJWkVSX0RJU0NBUkQgPSAweDhjODk7XG5leHBvcnQgY29uc3QgR0xfUkVBRF9CVUZGRVIgPSAweDBjMDI7XG5leHBvcnQgY29uc3QgR0xfUkVBRF9GUkFNRUJVRkZFUiA9IDB4OGNhODtcbmV4cG9ydCBjb25zdCBHTF9SRUFEX0ZSQU1FQlVGRkVSX0JJTkRJTkcgPSAweDhjYWE7XG5leHBvcnQgY29uc3QgR0xfUkVEID0gMHgxOTAzO1xuZXhwb3J0IGNvbnN0IEdMX1JFRF9CSVRTID0gMHgwZDUyO1xuZXhwb3J0IGNvbnN0IEdMX1JFRF9JTlRFR0VSID0gMHg4ZDk0O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUiA9IDB4OGQ0MTtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfQUxQSEFfU0laRSA9IDB4OGQ1MztcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfQklORElORyA9IDB4OGNhNztcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfQkxVRV9TSVpFID0gMHg4ZDUyO1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9ERVBUSF9TSVpFID0gMHg4ZDU0O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9HUkVFTl9TSVpFID0gMHg4ZDUxO1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9IRUlHSFQgPSAweDhkNDM7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX0lOVEVSTkFMX0ZPUk1BVCA9IDB4OGQ0NDtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfUkVEX1NJWkUgPSAweDhkNTA7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX1NBTVBMRVMgPSAweDhjYWI7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX1NURU5DSUxfU0laRSA9IDB4OGQ1NTtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfV0lEVEggPSAweDhkNDI7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSRVIgPSAweDFmMDE7XG5leHBvcnQgY29uc3QgR0xfUkVQRUFUID0gMHgyOTAxO1xuZXhwb3J0IGNvbnN0IEdMX1JFUExBQ0UgPSAweDFlMDE7XG5leHBvcnQgY29uc3QgR0xfUkcgPSAweDgyMjc7XG5leHBvcnQgY29uc3QgR0xfUkdfSU5URUdFUiA9IDB4ODIyODtcbmV4cG9ydCBjb25zdCBHTF9SRzE2RiA9IDB4ODIyZjtcbmV4cG9ydCBjb25zdCBHTF9SRzE2SSA9IDB4ODIzOTtcbmV4cG9ydCBjb25zdCBHTF9SRzE2VUkgPSAweDgyM2E7XG5leHBvcnQgY29uc3QgR0xfUkczMkYgPSAweDgyMzA7XG5leHBvcnQgY29uc3QgR0xfUkczMkkgPSAweDgyM2I7XG5leHBvcnQgY29uc3QgR0xfUkczMlVJID0gMHg4MjNjO1xuZXhwb3J0IGNvbnN0IEdMX1JHOCA9IDB4ODIyYjtcbmV4cG9ydCBjb25zdCBHTF9SRzhfU05PUk0gPSAweDhmOTU7XG5leHBvcnQgY29uc3QgR0xfUkc4SSA9IDB4ODIzNztcbmV4cG9ydCBjb25zdCBHTF9SRzhVSSA9IDB4ODIzODtcbmV4cG9ydCBjb25zdCBHTF9SR0IgPSAweDE5MDc7XG5leHBvcnQgY29uc3QgR0xfUkdCX0lOVEVHRVIgPSAweDhkOTg7XG5leHBvcnQgY29uc3QgR0xfUkdCMTBfQTIgPSAweDgwNTk7XG5leHBvcnQgY29uc3QgR0xfUkdCMTBfQTJVSSA9IDB4OTA2ZjtcbmV4cG9ydCBjb25zdCBHTF9SR0IxNkYgPSAweDg4MWI7XG5leHBvcnQgY29uc3QgR0xfUkdCMTZJID0gMHg4ZDg5O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjE2VUkgPSAweDhkNzc7XG5leHBvcnQgY29uc3QgR0xfUkdCMzJGID0gMHg4ODE1O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjMyRl9FWFQgPSAweDg4MTU7XG5leHBvcnQgY29uc3QgR0xfUkdCMzJJID0gMHg4ZDgzO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjMyVUkgPSAweDhkNzE7XG5leHBvcnQgY29uc3QgR0xfUkdCNV9BMSA9IDB4ODA1NztcbmV4cG9ydCBjb25zdCBHTF9SR0I1NjUgPSAweDhkNjI7XG5leHBvcnQgY29uc3QgR0xfUkdCOCA9IDB4ODA1MTtcbmV4cG9ydCBjb25zdCBHTF9SR0I4X1NOT1JNID0gMHg4Zjk2O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjhJID0gMHg4ZDhmO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjhVSSA9IDB4OGQ3ZDtcbmV4cG9ydCBjb25zdCBHTF9SR0I5X0U1ID0gMHg4YzNkO1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEgPSAweDE5MDg7XG5leHBvcnQgY29uc3QgR0xfUkdCQV9JTlRFR0VSID0gMHg4ZDk5O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkExNkYgPSAweDg4MWE7XG5leHBvcnQgY29uc3QgR0xfUkdCQTE2SSA9IDB4OGQ4ODtcbmV4cG9ydCBjb25zdCBHTF9SR0JBMTZVSSA9IDB4OGQ3NjtcbmV4cG9ydCBjb25zdCBHTF9SR0JBMzJGID0gMHg4ODE0O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEzMkZfRVhUID0gMHg4ODE0O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEzMkkgPSAweDhkODI7XG5leHBvcnQgY29uc3QgR0xfUkdCQTMyVUkgPSAweDhkNzA7XG5leHBvcnQgY29uc3QgR0xfUkdCQTQgPSAweDgwNTY7XG5leHBvcnQgY29uc3QgR0xfUkdCQTggPSAweDgwNTg7XG5leHBvcnQgY29uc3QgR0xfUkdCQThfU05PUk0gPSAweDhmOTc7XG5leHBvcnQgY29uc3QgR0xfUkdCQThJID0gMHg4ZDhlO1xuZXhwb3J0IGNvbnN0IEdMX1JHQkE4VUkgPSAweDhkN2M7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFX0FMUEhBX1RPX0NPVkVSQUdFID0gMHg4MDllO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9CVUZGRVJTID0gMHg4MGE4O1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9DT1ZFUkFHRSA9IDB4ODBhMDtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVfQ09WRVJBR0VfSU5WRVJUID0gMHg4MGFiO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9DT1ZFUkFHRV9WQUxVRSA9IDB4ODBhYTtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSXzJEID0gMHg4YjVlO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRVJfMkRfQVJSQVkgPSAweDhkYzE7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8yRF9BUlJBWV9TSEFET1cgPSAweDhkYzQ7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8yRF9TSEFET1cgPSAweDhiNjI7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8zRCA9IDB4OGI1ZjtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSX0JJTkRJTkcgPSAweDg5MTk7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl9DVUJFID0gMHg4YjYwO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRVJfQ1VCRV9TSEFET1cgPSAweDhkYzU7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUyA9IDB4ODBhOTtcbmV4cG9ydCBjb25zdCBHTF9TQ0lTU09SX0JPWCA9IDB4MGMxMDtcbmV4cG9ydCBjb25zdCBHTF9TQ0lTU09SX1RFU1QgPSAweDBjMTE7XG5leHBvcnQgY29uc3QgR0xfU0VQQVJBVEVfQVRUUklCUyA9IDB4OGM4ZDtcbmV4cG9ydCBjb25zdCBHTF9TSEFERVJfVFlQRSA9IDB4OGI0ZjtcbmV4cG9ydCBjb25zdCBHTF9TSEFESU5HX0xBTkdVQUdFX1ZFUlNJT04gPSAweDhiOGM7XG5leHBvcnQgY29uc3QgR0xfU0hPUlQgPSAweDE0MDI7XG5leHBvcnQgY29uc3QgR0xfU0lHTkFMRUQgPSAweDkxMTk7XG5leHBvcnQgY29uc3QgR0xfU0lHTkVEX05PUk1BTElaRUQgPSAweDhmOWM7XG5leHBvcnQgY29uc3QgR0xfU1JDX0FMUEhBID0gMHgwMzAyO1xuZXhwb3J0IGNvbnN0IEdMX1NSQ19BTFBIQV9TQVRVUkFURSA9IDB4MDMwODtcbmV4cG9ydCBjb25zdCBHTF9TUkNfQ09MT1IgPSAweDAzMDA7XG5leHBvcnQgY29uc3QgR0xfU1JHQiA9IDB4OGM0MDtcbmV4cG9ydCBjb25zdCBHTF9TUkdCX0FMUEhBX0VYVCA9IDB4OGM0MjtcbmV4cG9ydCBjb25zdCBHTF9TUkdCX0VYVCA9IDB4OGM0MDtcbmV4cG9ydCBjb25zdCBHTF9TUkdCOCA9IDB4OGM0MTtcbmV4cG9ydCBjb25zdCBHTF9TUkdCOF9BTFBIQTggPSAweDhjNDM7XG5leHBvcnQgY29uc3QgR0xfU1JHQjhfQUxQSEE4X0VYVCA9IDB4OGM0MztcbmV4cG9ydCBjb25zdCBHTF9TVEFUSUNfQ09QWSA9IDB4ODhlNjtcbmV4cG9ydCBjb25zdCBHTF9TVEFUSUNfRFJBVyA9IDB4ODhlNDtcbmV4cG9ydCBjb25zdCBHTF9TVEFUSUNfUkVBRCA9IDB4ODhlNTtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMID0gMHgxODAyO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQVRUQUNITUVOVCA9IDB4OGQyMDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfRkFJTCA9IDB4ODgwMTtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfRlVOQyA9IDB4ODgwMDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfUEFTU19ERVBUSF9GQUlMID0gMHg4ODAyO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19QQVNTX0RFUFRIX1BBU1MgPSAweDg4MDM7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9CQUNLX1JFRiA9IDB4OGNhMztcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfVkFMVUVfTUFTSyA9IDB4OGNhNDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfV1JJVEVNQVNLID0gMHg4Y2E1O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQklUUyA9IDB4MGQ1NztcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JVRkZFUl9CSVQgPSAweDAwMDAwNDAwO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQ0xFQVJfVkFMVUUgPSAweDBiOTE7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9GQUlMID0gMHgwYjk0O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfRlVOQyA9IDB4MGI5MjtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0lOREVYID0gMHgxOTAxO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfSU5ERVg4ID0gMHg4ZDQ4O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfUEFTU19ERVBUSF9GQUlMID0gMHgwYjk1O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfUEFTU19ERVBUSF9QQVNTID0gMHgwYjk2O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfUkVGID0gMHgwYjk3O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfVEVTVCA9IDB4MGI5MDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX1ZBTFVFX01BU0sgPSAweDBiOTM7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9XUklURU1BU0sgPSAweDBiOTg7XG5leHBvcnQgY29uc3QgR0xfU1RSRUFNX0NPUFkgPSAweDg4ZTI7XG5leHBvcnQgY29uc3QgR0xfU1RSRUFNX0RSQVcgPSAweDg4ZTA7XG5leHBvcnQgY29uc3QgR0xfU1RSRUFNX1JFQUQgPSAweDg4ZTE7XG5leHBvcnQgY29uc3QgR0xfU1VCUElYRUxfQklUUyA9IDB4MGQ1MDtcbmV4cG9ydCBjb25zdCBHTF9TWU5DX0NPTkRJVElPTiA9IDB4OTExMztcbmV4cG9ydCBjb25zdCBHTF9TWU5DX0ZFTkNFID0gMHg5MTE2O1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfRkxBR1MgPSAweDkxMTU7XG5leHBvcnQgY29uc3QgR0xfU1lOQ19GTFVTSF9DT01NQU5EU19CSVQgPSAweDAwMDAwMDAxO1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfR1BVX0NPTU1BTkRTX0NPTVBMRVRFID0gMHg5MTE3O1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfU1RBVFVTID0gMHg5MTE0O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUgPSAweDE3MDI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV8yRCA9IDB4MGRlMTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFXzJEX0FSUkFZID0gMHg4YzFhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfM0QgPSAweDgwNmY7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9CQVNFX0xFVkVMID0gMHg4MTNjO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQklORElOR18yRCA9IDB4ODA2OTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0JJTkRJTkdfMkRfQVJSQVkgPSAweDhjMWQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9CSU5ESU5HXzNEID0gMHg4MDZhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQklORElOR19DVUJFX01BUCA9IDB4ODUxNDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NPTVBBUkVfRlVOQyA9IDB4ODg0ZDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NPTVBBUkVfTU9ERSA9IDB4ODg0YztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQID0gMHg4NTEzO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWCA9IDB4ODUxNjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1kgPSAweDg1MTg7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9aID0gMHg4NTFhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWCA9IDB4ODUxNTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1kgPSAweDg1MTc7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9aID0gMHg4NTE5O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfSU1NVVRBQkxFX0ZPUk1BVCA9IDB4OTEyZjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0lNTVVUQUJMRV9MRVZFTFMgPSAweDgyZGY7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NQUdfRklMVEVSID0gMHgyODAwO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUFYX0FOSVNPVFJPUFlfRVhUID0gMHg4NGZlO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUFYX0xFVkVMID0gMHg4MTNkO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUFYX0xPRCA9IDB4ODEzYjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX01JTl9GSUxURVIgPSAweDI4MDE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NSU5fTE9EID0gMHg4MTNhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfV1JBUF9SID0gMHg4MDcyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfV1JBUF9TID0gMHgyODAyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfV1JBUF9UID0gMHgyODAzO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUwID0gMHg4NGMwO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxID0gMHg4NGMxO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxMCA9IDB4ODRjYTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTEgPSAweDg0Y2I7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTEyID0gMHg4NGNjO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxMyA9IDB4ODRjZDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTQgPSAweDg0Y2U7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTE1ID0gMHg4NGNmO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxNiA9IDB4ODRkMDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTcgPSAweDg0ZDE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTE4ID0gMHg4NGQyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxOSA9IDB4ODRkMztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMiA9IDB4ODRjMjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjAgPSAweDg0ZDQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTIxID0gMHg4NGQ1O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyMiA9IDB4ODRkNjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjMgPSAweDg0ZDc7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTI0ID0gMHg4NGQ4O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyNSA9IDB4ODRkOTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjYgPSAweDg0ZGE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTI3ID0gMHg4NGRiO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyOCA9IDB4ODRkYztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjkgPSAweDg0ZGQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTMgPSAweDg0YzM7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTMwID0gMHg4NGRlO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUzMSA9IDB4ODRkZjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNCA9IDB4ODRjNDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNSA9IDB4ODRjNTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNiA9IDB4ODRjNjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNyA9IDB4ODRjNztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFOCA9IDB4ODRjODtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFOSA9IDB4ODRjOTtcbmV4cG9ydCBjb25zdCBHTF9USU1FX0VMQVBTRURfRVhUID0gMHg4OGJmO1xuZXhwb3J0IGNvbnN0IEdMX1RJTUVPVVRfRVhQSVJFRCA9IDB4OTExYjtcbmV4cG9ydCBjb25zdCBHTF9USU1FT1VUX0lHTk9SRUQgPSAtMTtcbmV4cG9ydCBjb25zdCBHTF9USU1FU1RBTVBfRVhUID0gMHg4ZTI4O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDSyA9IDB4OGUyMjtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfQUNUSVZFID0gMHg4ZTI0O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CSU5ESU5HID0gMHg4ZTI1O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CVUZGRVIgPSAweDhjOGU7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUl9CSU5ESU5HID0gMHg4YzhmO1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CVUZGRVJfTU9ERSA9IDB4OGM3ZjtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfQlVGRkVSX1NJWkUgPSAweDhjODU7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUl9TVEFSVCA9IDB4OGM4NDtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfUEFVU0VEID0gMHg4ZTIzO1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19QUklNSVRJVkVTX1dSSVRURU4gPSAweDhjODg7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX1ZBUllJTkdTID0gMHg4YzgzO1xuZXhwb3J0IGNvbnN0IEdMX1RSSUFOR0xFX0ZBTiA9IDB4MDAwNjtcbmV4cG9ydCBjb25zdCBHTF9UUklBTkdMRV9TVFJJUCA9IDB4MDAwNTtcbmV4cG9ydCBjb25zdCBHTF9UUklBTkdMRVMgPSAweDAwMDQ7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9BUlJBWV9TVFJJREUgPSAweDhhM2M7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19BQ1RJVkVfVU5JRk9STV9JTkRJQ0VTID0gMHg4YTQzO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfQUNUSVZFX1VOSUZPUk1TID0gMHg4YTQyO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfQklORElORyA9IDB4OGEzZjtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JMT0NLX0RBVEFfU0laRSA9IDB4OGE0MDtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JMT0NLX0lOREVYID0gMHg4YTNhO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfUkVGRVJFTkNFRF9CWV9GUkFHTUVOVF9TSEFERVIgPSAweDhhNDY7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19SRUZFUkVOQ0VEX0JZX1ZFUlRFWF9TSEFERVIgPSAweDhhNDQ7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVIgPSAweDhhMTE7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVJfQklORElORyA9IDB4OGEyODtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JVRkZFUl9PRkZTRVRfQUxJR05NRU5UID0gMHg4YTM0O1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQlVGRkVSX1NJWkUgPSAweDhhMmE7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVJfU1RBUlQgPSAweDhhMjk7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9JU19ST1dfTUFKT1IgPSAweDhhM2U7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9NQVRSSVhfU1RSSURFID0gMHg4YTNkO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fT0ZGU0VUID0gMHg4YTNiO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fU0laRSA9IDB4OGEzODtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX1RZUEUgPSAweDhhMzc7XG5leHBvcnQgY29uc3QgR0xfVU5NQVNLRURfUkVOREVSRVJfV0VCR0wgPSAweDkyNDY7XG5leHBvcnQgY29uc3QgR0xfVU5NQVNLRURfVkVORE9SX1dFQkdMID0gMHg5MjQ1O1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19BTElHTk1FTlQgPSAweDBjZjU7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX0NPTE9SU1BBQ0VfQ09OVkVSU0lPTl9XRUJHTCA9IDB4OTI0MztcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfRkxJUF9ZX1dFQkdMID0gMHg5MjQwO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19JTUFHRV9IRUlHSFQgPSAweDgwNmU7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX1BSRU1VTFRJUExZX0FMUEhBX1dFQkdMID0gMHg5MjQxO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19ST1dfTEVOR1RIID0gMHgwY2YyO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19TS0lQX0lNQUdFUyA9IDB4ODA2ZDtcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfU0tJUF9QSVhFTFMgPSAweDBjZjQ7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX1NLSVBfUk9XUyA9IDB4MGNmMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05BTEVEID0gMHg5MTE4O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0JZVEUgPSAweDE0MDE7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UID0gMHgxNDA1O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF8xMEZfMTFGXzExRl9SRVYgPSAweDhjM2I7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzJfMTBfMTBfMTBfUkVWID0gMHg4MzY4O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF8yNF84ID0gMHg4NGZhO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF8yNF84X1dFQkdMID0gMHg4NGZhO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF81XzlfOV85X1JFViA9IDB4OGMzZTtcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl8yRCA9IDB4OGRkMjtcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRkNztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl8zRCA9IDB4OGRkMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl9DVUJFID0gMHg4ZGQ0O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9WRUMyID0gMHg4ZGM2O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9WRUMzID0gMHg4ZGM3O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9WRUM0ID0gMHg4ZGM4O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX05PUk1BTElaRUQgPSAweDhjMTc7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfTk9STUFMSVpFRF9FWFQgPSAweDhjMTc7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfU0hPUlQgPSAweDE0MDM7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfU0hPUlRfNF80XzRfNCA9IDB4ODAzMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9TSE9SVF81XzVfNV8xID0gMHg4MDM0O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX1NIT1JUXzVfNl81ID0gMHg4MzYzO1xuZXhwb3J0IGNvbnN0IEdMX1ZBTElEQVRFX1NUQVRVUyA9IDB4OGI4MztcbmV4cG9ydCBjb25zdCBHTF9WRU5ET1IgPSAweDFmMDA7XG5leHBvcnQgY29uc3QgR0xfVkVSU0lPTiA9IDB4MWYwMjtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVJSQVlfQklORElORyA9IDB4ODViNTtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVJSQVlfQklORElOR19PRVMgPSAweDg1YjU7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9CVUZGRVJfQklORElORyA9IDB4ODg5ZjtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX0RJVklTT1IgPSAweDg4ZmU7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9ESVZJU09SX0FOR0xFID0gMHg4OGZlO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfRU5BQkxFRCA9IDB4ODYyMjtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX0lOVEVHRVIgPSAweDg4ZmQ7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9OT1JNQUxJWkVEID0gMHg4ODZhO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfUE9JTlRFUiA9IDB4ODY0NTtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX1NJWkUgPSAweDg2MjM7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9TVFJJREUgPSAweDg2MjQ7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9UWVBFID0gMHg4NjI1O1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9TSEFERVIgPSAweDhiMzE7XG5leHBvcnQgY29uc3QgR0xfVklFV1BPUlQgPSAweDBiYTI7XG5leHBvcnQgY29uc3QgR0xfV0FJVF9GQUlMRUQgPSAweDkxMWQ7XG5leHBvcnQgY29uc3QgR0xfWkVSTyA9IDA7XG4iLCJleHBvcnQgY2xhc3MgQmluZEhlbHBlcjxUVmFsdWU+IHtcbiAgcHJpdmF0ZSBfX3ByZXY6IFRWYWx1ZTtcbiAgcHJpdmF0ZSBfX2JpbmRlcjogKCB2YWx1ZTogVFZhbHVlICkgPT4gdm9pZDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoIGluaXQ6IFRWYWx1ZSwgYmluZGVyOiAoIHZhbHVlOiBUVmFsdWUgKSA9PiB2b2lkICkge1xuICAgIHRoaXMuX19wcmV2ID0gaW5pdDtcbiAgICB0aGlzLl9fYmluZGVyID0gYmluZGVyO1xuICB9XG5cbiAgcHVibGljIGJpbmQ8VD4oXG4gICAgdmFsdWU6IFRWYWx1ZSxcbiAgICBjYWxsYmFjaz86ICggdmFsdWU6IFRWYWx1ZSApID0+IFRcbiAgKTogVCB7XG4gICAgY29uc3QgcHJldiA9IHRoaXMuX19wcmV2O1xuICAgIGlmICggdmFsdWUgIT09IHByZXYgKSB7XG4gICAgICB0aGlzLl9fYmluZGVyKCB2YWx1ZSApO1xuICAgICAgdGhpcy5fX3ByZXYgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoIGNhbGxiYWNrICkge1xuICAgICAgY29uc3QgcmV0ID0gY2FsbGJhY2soIHZhbHVlICk7XG4gICAgICB0aGlzLmJpbmQoIHByZXYgKTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQgYXMgYW55O1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xfQVJSQVlfQlVGRkVSLCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiwgR0xfU1RBVElDX0RSQVcgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xCdWZmZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdEJ1ZmZlcjxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19idWZmZXI6IFdlYkdMQnVmZmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgYnVmZmVyKCk6IFdlYkdMQnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2J1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRCdWZmZXIuYnVmZmVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTEJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19idWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0QnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBidWZmZXI6IFdlYkdMQnVmZmVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19idWZmZXIgPSBidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZUJ1ZmZlciggdGhpcy5fX2J1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIHNldFZlcnRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEFycmF5QnVmZmVyIHwgQXJyYXlCdWZmZXJWaWV3IHwgbnVsbCxcbiAgICB1c2FnZTogbnVtYmVyID0gR0xfU1RBVElDX0RSQVdcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRWZXJ0ZXhCdWZmZXIoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLmJ1ZmZlckRhdGEoIEdMX0FSUkFZX0JVRkZFUiwgc291cmNlLCB1c2FnZSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbmV3IGluZGV4IGRhdGEgaW50byB0aGlzIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBzZXRJbmRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEFycmF5QnVmZmVyIHwgQXJyYXlCdWZmZXJWaWV3IHwgbnVsbCxcbiAgICB1c2FnZTogbnVtYmVyID0gR0xfU1RBVElDX0RSQVdcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRJbmRleEJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuYnVmZmVyRGF0YSggR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHNvdXJjZSwgdXNhZ2UgKTtcbiAgICB9ICk7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBHTENhdEVycm9ycyA9IHtcbiAgZ2V0IFVuZXhwZWN0ZWROdWxsRXJyb3IoKSB7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoICdHTENhdDogVW5leHBlY3RlZCBudWxsIGRldGVjdGVkJyApO1xuICAgIGVycm9yLm5hbWUgPSAnVW5leHBlY3RlZE51bGxFcnJvcic7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH0sXG4gIGdldCBXZWJHTDJFeGNsdXNpdmVFcnJvcigpIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvciggJ0dMQ2F0OiBBdHRlbXB0ZWQgdG8gdXNlIFdlYkdMMiBleGNsdXNpdmUgc3R1ZmYnICk7XG4gICAgZXJyb3IubmFtZSA9ICdXZWJHTDJFeGNsdXNpdmVFcnJvcic7XG4gICAgcmV0dXJuIGVycm9yO1xuICB9XG59O1xuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImltcG9ydCB7IEdMX0NPTE9SX0FUVEFDSE1FTlQwLCBHTF9ERVBUSF9BVFRBQ0hNRU5ULCBHTF9GUkFNRUJVRkZFUiwgR0xfUkVOREVSQlVGRkVSLCBHTF9URVhUVVJFXzJEIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0UmVuZGVyYnVmZmVyIH0gZnJvbSAnLi9HTENhdFJlbmRlcmJ1ZmZlcic7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0VGV4dHVyZSB9IGZyb20gJy4vR0xDYXRUZXh0dXJlJztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xGcmFtZWJ1ZmZlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQgZXh0ZW5kcyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0PiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fZnJhbWVidWZmZXI6IFdlYkdMRnJhbWVidWZmZXI7XG4gIHByaXZhdGUgX19yZW5kZXJidWZmZXJNYXAgPSBuZXcgTWFwPEdMZW51bSwgR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+PigpO1xuICBwcml2YXRlIF9fdGV4dHVyZU1hcCA9IG5ldyBNYXA8R0xlbnVtLCBHTENhdFRleHR1cmU8VENvbnRleHQ+PigpO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGdldCBmcmFtZWJ1ZmZlcigpOiBXZWJHTEZyYW1lYnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2ZyYW1lYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gZnJhbWVidWZmZXIuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0RnJhbWVidWZmZXIuZnJhbWVidWZmZXJdXVxuICAgKi9cbiAgcHVibGljIGdldCByYXcoKTogV2ViR0xGcmFtZWJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19mcmFtZWJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgYXR0YWNoZWQgcmVuZGVyYnVmZmVyLlxuICAgKiBJZiB5b3Ugd2FudCB0byBncmFiIG90aGVyIHRoYW4gYERFUFRIX0FUVEFDSE1FTlRgLCB0cnkgW1tHTENhdEZyYW1lYnVmZmVyLmdldFJlbmRlcmJ1ZmZlcl1dIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlbmRlcmJ1ZmZlcigpOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fX3JlbmRlcmJ1ZmZlck1hcC5nZXQoIEdMX0RFUFRIX0FUVEFDSE1FTlQgKSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBhdHRhY2hlZCB0ZXh0dXJlLlxuICAgKiBJZiB5b3Ugd2FudCB0byBncmFiIG90aGVyIHRoYW4gYENPTE9SX0FUVEFDSE1FTlQwYCwgdHJ5IFtbR0xDYXRGcmFtZWJ1ZmZlci5nZXRUZXh0dXJlXV0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgdGV4dHVyZSgpOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX190ZXh0dXJlTWFwLmdldCggR0xfQ09MT1JfQVRUQUNITUVOVDAgKSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdEZyYW1lYnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBmcmFtZWJ1ZmZlcjogV2ViR0xGcmFtZWJ1ZmZlciApIHtcbiAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcbiAgICB0aGlzLl9fZnJhbWVidWZmZXIgPSBmcmFtZWJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSBmcmFtZWJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCBhbHNvQXR0YWNoZWQgPSBmYWxzZSApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBnbC5kZWxldGVGcmFtZWJ1ZmZlciggdGhpcy5fX2ZyYW1lYnVmZmVyICk7XG5cbiAgICBpZiAoIGFsc29BdHRhY2hlZCApIHtcbiAgICAgIGZvciAoIGNvbnN0IHJlbmRlcmJ1ZmZlciBvZiB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLnZhbHVlcygpICkge1xuICAgICAgICBnbC5kZWxldGVSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlci5yYXcgKTtcbiAgICAgIH1cblxuICAgICAgZm9yICggY29uc3QgdGV4dHVyZSBvZiB0aGlzLl9fdGV4dHVyZU1hcC52YWx1ZXMoKSApIHtcbiAgICAgICAgZ2wuZGVsZXRlVGV4dHVyZSggdGV4dHVyZS5yYXcgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgaXRzIGF0dGFjaGVkIHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXRSZW5kZXJidWZmZXIoIGF0dGFjaG1lbnQgPSBHTF9ERVBUSF9BVFRBQ0hNRU5UICk6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLmdldCggYXR0YWNobWVudCApID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgaXRzIGF0dGFjaGVkIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgZ2V0VGV4dHVyZSggYXR0YWNobWVudCA9IEdMX0NPTE9SX0FUVEFDSE1FTlQwICk6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fX3RleHR1cmVNYXAuZ2V0KCBhdHRhY2htZW50ICkgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSByZW5kZXJidWZmZXIgdG8gdGhpcyBmcmFtZWJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBhdHRhY2hSZW5kZXJidWZmZXIoXG4gICAgcmVuZGVyYnVmZmVyOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4sXG4gICAge1xuICAgICAgYXR0YWNobWVudCA9IEdMX0RFUFRIX0FUVEFDSE1FTlRcbiAgICB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRGcmFtZWJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuZnJhbWVidWZmZXJSZW5kZXJidWZmZXIoIEdMX0ZSQU1FQlVGRkVSLCBhdHRhY2htZW50LCBHTF9SRU5ERVJCVUZGRVIsIHJlbmRlcmJ1ZmZlci5yYXcgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLnNldCggYXR0YWNobWVudCwgcmVuZGVyYnVmZmVyICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGEgdGV4dHVyZSB0byB0aGlzIGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGF0dGFjaFRleHR1cmUoXG4gICAgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PixcbiAgICB7XG4gICAgICBsZXZlbCA9IDAsXG4gICAgICBhdHRhY2htZW50ID0gR0xfQ09MT1JfQVRUQUNITUVOVDBcbiAgICB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRGcmFtZWJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoIEdMX0ZSQU1FQlVGRkVSLCBhdHRhY2htZW50LCBHTF9URVhUVVJFXzJELCB0ZXh0dXJlLnJhdywgbGV2ZWwgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fdGV4dHVyZU1hcC5zZXQoIGF0dGFjaG1lbnQsIHRleHR1cmUgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xfQ09NUExFVElPTl9TVEFUVVNfS0hSLCBHTF9GTE9BVCwgR0xfTElOS19TVEFUVVMsIEdMX1RFWFRVUkUwIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0QnVmZmVyIH0gZnJvbSAnLi9HTENhdEJ1ZmZlcic7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0U2hhZGVyIH0gZnJvbSAnLi9HTENhdFNoYWRlcic7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0VGV4dHVyZSB9IGZyb20gJy4vR0xDYXRUZXh0dXJlJztcblxuZXhwb3J0IHR5cGUgR0xDYXRQcm9ncmFtVW5pZm9ybVR5cGUgPVxuICAnMWYnIHwgJzJmJyB8ICczZicgfCAnNGYnIHxcbiAgJzFpJyB8ICcyaScgfCAnM2knIHwgJzRpJyB8XG4gICcxZnYnIHwgJzJmdicgfCAnM2Z2JyB8ICc0ZnYnIHxcbiAgJzFpdicgfCAnMml2JyB8ICczaXYnIHwgJzRpdicgfFxuICAnTWF0cml4MmZ2JyB8ICdNYXRyaXgzZnYnIHwgJ01hdHJpeDRmdic7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMUHJvZ3JhbSwgYnV0IGhhcyBjYWNoZSBvZiB2YXJpYWJsZSBsb2NhdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdFByb2dyYW08VENvbnRleHQgZXh0ZW5kcyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0PiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fcHJvZ3JhbTogV2ViR0xQcm9ncmFtO1xuICBwcml2YXRlIF9fc2hhZGVyczogR0xDYXRTaGFkZXI8VENvbnRleHQ+W10gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfX2F0dHJpYkxvY2F0aW9uQ2FjaGU6IHsgWyBuYW1lOiBzdHJpbmcgXTogbnVtYmVyIH0gPSB7fTtcbiAgcHJpdmF0ZSBfX3VuaWZvcm1Mb2NhdGlvbkNhY2hlOiB7IFsgbmFtZTogc3RyaW5nIF06IFdlYkdMVW5pZm9ybUxvY2F0aW9uIHwgbnVsbCB9ID0ge307XG4gIHByaXZhdGUgX191bmlmb3JtVGV4dHVyZVVuaXRNYXA6IHsgWyBuYW1lOiBzdHJpbmcgXTogbnVtYmVyIH0gPSB7fTtcbiAgcHJpdmF0ZSBfX3VuaWZvcm10ZXh0dXJlVW5pdEluZGV4ID0gMDtcbiAgcHJpdmF0ZSBfX2xpbmtlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHByb2dyYW0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHByb2dyYW0oKTogV2ViR0xQcm9ncmFtIHtcbiAgICByZXR1cm4gdGhpcy5fX3Byb2dyYW07XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biBwcm9ncmFtLiBTaG9ydGVyIHRoYW4gW1tHTENhdFByb2dyYW0ucHJvZ3JhbV1dLlxuICAgKi9cbiAgcHVibGljIGdldCByYXcoKTogV2ViR0xQcm9ncmFtIHtcbiAgICByZXR1cm4gdGhpcy5fX3Byb2dyYW07XG4gIH1cblxuICAvKipcbiAgICogSXRzIHNoYWRlcnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHNoYWRlcnMoKTogR0xDYXRTaGFkZXI8VENvbnRleHQ+W10gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fX3NoYWRlcnMgPyB0aGlzLl9fc2hhZGVycy5jb25jYXQoKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGUgbGFzdCBsaW5rIG9wZXJhdGlvbiB3YXMgc3VjY2Vzc2Z1bCBvciBub3QuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGlzTGlua2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9fbGlua2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdFByb2dyYW0gaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIHByb2dyYW06IFdlYkdMUHJvZ3JhbSApIHtcbiAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcbiAgICB0aGlzLl9fcHJvZ3JhbSA9IHByb2dyYW07XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgcHJvZ3JhbS5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCBhbHNvQXR0YWNoZWQgPSBmYWxzZSApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBnbC5kZWxldGVQcm9ncmFtKCB0aGlzLl9fcHJvZ3JhbSApO1xuXG4gICAgaWYgKCBhbHNvQXR0YWNoZWQgKSB7XG4gICAgICBjb25zdCBzaGFkZXJzID0gdGhpcy5zaGFkZXJzO1xuICAgICAgaWYgKCBzaGFkZXJzICkge1xuICAgICAgICBzaGFkZXJzLmZvckVhY2goICggc2hhZGVyICkgPT4ge1xuICAgICAgICAgIHNoYWRlci5kaXNwb3NlKCk7XG4gICAgICAgIH0gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIHNoYWRlcnMgYW5kIGxpbmsgdGhpcyBwcm9ncmFtLlxuICAgKi9cbiAgcHVibGljIGxpbmsoIC4uLnNoYWRlcnM6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PltdICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHNoYWRlcnMuZm9yRWFjaCggKCBzaGFkZXIgKSA9PiBnbC5hdHRhY2hTaGFkZXIoIHRoaXMuX19wcm9ncmFtLCBzaGFkZXIucmF3ICkgKTtcbiAgICBnbC5saW5rUHJvZ3JhbSggdGhpcy5fX3Byb2dyYW0gKTtcblxuICAgIHRoaXMuX19saW5rZWQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKCB0aGlzLl9fcHJvZ3JhbSwgR0xfTElOS19TVEFUVVMgKTtcbiAgICBpZiAoICF0aGlzLl9fbGlua2VkICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCBnbC5nZXRQcm9ncmFtSW5mb0xvZyggdGhpcy5fX3Byb2dyYW0gKSEgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9fc2hhZGVycyA9IHNoYWRlcnMuY29uY2F0KCk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIHNoYWRlcnMgYW5kIGxpbmsgdGhpcyBwcm9ncmFtLlxuICAgKiBJdCdzIGdvbm5hIGJlIGFzeW5jaHJvbm91cyBpZiB5b3UgaGF2ZSB0aGUgS0hSX3BhcmFsbGVsX3NoYWRlcl9jb21waWxlIGV4dGVuc2lvbiBzdXBwb3J0LlxuICAgKi9cbiAgcHVibGljIGxpbmtBc3luYyggLi4uc2hhZGVyczogR0xDYXRTaGFkZXI8VENvbnRleHQ+W10gKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZ2xDYXQgPSB0aGlzLl9fZ2xDYXQ7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuICAgIGNvbnN0IGV4dFBhcmFsbGVsID0gZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnS0hSX3BhcmFsbGVsX3NoYWRlcl9jb21waWxlJyApO1xuXG4gICAgc2hhZGVycy5mb3JFYWNoKCAoIHNoYWRlciApID0+IGdsLmF0dGFjaFNoYWRlciggdGhpcy5fX3Byb2dyYW0sIHNoYWRlci5yYXcgKSApO1xuICAgIGdsLmxpbmtQcm9ncmFtKCB0aGlzLl9fcHJvZ3JhbSApO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKCAoIHJlc29sdmUsIHJlamVjdCApID0+IHtcbiAgICAgIGNvbnN0IHVwZGF0ZSA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFleHRQYXJhbGxlbCB8fFxuICAgICAgICAgIGdsLmdldFByb2dyYW1QYXJhbWV0ZXIoIHRoaXMuX19wcm9ncmFtLCBHTF9DT01QTEVUSU9OX1NUQVRVU19LSFIgKSA9PT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLl9fbGlua2VkID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlciggdGhpcy5fX3Byb2dyYW0sIEdMX0xJTktfU1RBVFVTICk7XG4gICAgICAgICAgaWYgKCAhdGhpcy5fX2xpbmtlZCApIHtcbiAgICAgICAgICAgIHJlamVjdCggZ2wuZ2V0UHJvZ3JhbUluZm9Mb2coIHRoaXMuX19wcm9ncmFtICkgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9fc2hhZGVycyA9IHNoYWRlcnMuY29uY2F0KCk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggdXBkYXRlICk7XG4gICAgICB9O1xuICAgICAgdXBkYXRlKCk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiBhdHRyaWJ1dGUgdmFyaWFibGUuXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB2YXJpYWJsZVxuICAgKiBAcGFyYW0gYnVmZmVyIFZlcnRleCBidWZmZXIuIENhbiBiZSBudWxsLCB0byBkaXNhYmxlIGF0dHJpYnV0ZSBhcnJheVxuICAgKiBAcGFyYW0gc2l6ZSBOdW1iZXIgb2YgY29tcG9uZW50cyBwZXIgdmVydGV4LiBNdXN0IGJlIDEsIDIsIDMgb3IgNFxuICAgKi9cbiAgcHVibGljIGF0dHJpYnV0ZShcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgYnVmZmVyOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIHNpemUgPSAxLFxuICAgIGRpdmlzb3IgPSAwLFxuICAgIHR5cGU6IG51bWJlciA9IEdMX0ZMT0FULFxuICAgIHN0cmlkZSA9IDAsXG4gICAgb2Zmc2V0ID0gMFxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0QXR0cmliTG9jYXRpb24oIG5hbWUgKTtcbiAgICBpZiAoIGxvY2F0aW9uID09PSAtMSApIHsgcmV0dXJuOyB9XG5cbiAgICBpZiAoIGJ1ZmZlciA9PT0gbnVsbCApIHtcbiAgICAgIGdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheSggbG9jYXRpb24gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFZlcnRleEJ1ZmZlciggYnVmZmVyLCAoKSA9PiB7XG4gICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSggbG9jYXRpb24gKTtcbiAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoIGxvY2F0aW9uLCBzaXplLCB0eXBlLCBmYWxzZSwgc3RyaWRlLCBvZmZzZXQgKTtcblxuICAgICAgaWYgKCBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICAgIGdsLnZlcnRleEF0dHJpYkRpdmlzb3IoIGxvY2F0aW9uLCBkaXZpc29yICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBleHQgPSB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnQU5HTEVfaW5zdGFuY2VkX2FycmF5cycgKTtcbiAgICAgICAgaWYgKCBleHQgKSB7XG4gICAgICAgICAgZXh0LnZlcnRleEF0dHJpYkRpdmlzb3JBTkdMRSggbG9jYXRpb24sIGRpdmlzb3IgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybSB2YXJpYWJsZS5cbiAgICogU2VlIGFsc286IFtbR0xDYXRQcm9ncmFtLnVuaWZvcm1WZWN0b3JdXVxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0oIG5hbWU6IHN0cmluZywgdHlwZTogR0xDYXRQcm9ncmFtVW5pZm9ybVR5cGUsIC4uLnZhbHVlOiBudW1iZXJbXSApOiB2b2lkIHtcbiAgICBjb25zdCBmdW5jID0gKCB0aGlzIGFzIGFueSApWyAndW5pZm9ybScgKyB0eXBlIF07XG4gICAgZnVuYy5jYWxsKCB0aGlzLCBuYW1lLCAuLi52YWx1ZSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtIHZhcmlhYmxlLlxuICAgKiBTZWUgYWxzbzogW1tHTENhdFByb2dyYW0udW5pZm9ybV1dXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybVZlY3RvcihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgdHlwZTogR0xDYXRQcm9ncmFtVW5pZm9ybVR5cGUsXG4gICAgdmFsdWU6IEZsb2F0MzJMaXN0IHwgSW50MzJMaXN0XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bmMgPSAoIHRoaXMgYXMgYW55IClbICd1bmlmb3JtJyArIHR5cGUgXTtcbiAgICBmdW5jLmNhbGwoIHRoaXMsIG5hbWUsIHZhbHVlICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0xaSB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMWkoIG5hbWU6IHN0cmluZywgdmFsdWU6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xaSggbG9jYXRpb24sIHZhbHVlICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMmkgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTJpKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTJpKCBsb2NhdGlvbiwgeCwgeSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTNpIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0zaSggbmFtZTogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTNpKCBsb2NhdGlvbiwgeCwgeSwgeiApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTRpIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm00aSggbmFtZTogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLCB3OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtNGkoIGxvY2F0aW9uLCB4LCB5LCB6LCB3ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMWl2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0xaXYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEludDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xaXYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTJpdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMml2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBJbnQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMml2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0zaXYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTNpdiggbmFtZTogc3RyaW5nLCBhcnJheTogSW50MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTNpdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtNGl2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm00aXYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEludDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm00aXYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTFmIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0xZiggbmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFmKCBsb2NhdGlvbiwgdmFsdWUgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0yZiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMmYoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMmYoIGxvY2F0aW9uLCB4LCB5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtM2YgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTNmKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtM2YoIGxvY2F0aW9uLCB4LCB5LCB6ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtNGYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTRmKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm00ZiggbG9jYXRpb24sIHgsIHksIHosIHcgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0xZnYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTFmdiggbmFtZTogc3RyaW5nLCBhcnJheTogRmxvYXQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMWZ2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0yZnYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTJmdiggbmFtZTogc3RyaW5nLCBhcnJheTogRmxvYXQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMmZ2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0zZnYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTNmdiggbmFtZTogc3RyaW5nLCBhcnJheTogRmxvYXQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtM2Z2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm00ZnYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTRmdiggbmFtZTogc3RyaW5nLCBhcnJheTogRmxvYXQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtNGZ2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm1NYXRyaXgyZnYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybU1hdHJpeDJmdiggbmFtZTogc3RyaW5nLCBhcnJheTogRmxvYXQzMkxpc3QsIHRyYW5zcG9zZSA9IGZhbHNlICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybU1hdHJpeDJmdiggbG9jYXRpb24sIHRyYW5zcG9zZSwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm1NYXRyaXgzZnYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybU1hdHJpeDNmdiggbmFtZTogc3RyaW5nLCBhcnJheTogRmxvYXQzMkxpc3QsIHRyYW5zcG9zZSA9IGZhbHNlICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybU1hdHJpeDNmdiggbG9jYXRpb24sIHRyYW5zcG9zZSwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm1NYXRyaXg0ZnYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybU1hdHJpeDRmdiggbmFtZTogc3RyaW5nLCBhcnJheTogRmxvYXQzMkxpc3QsIHRyYW5zcG9zZSA9IGZhbHNlICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdiggbG9jYXRpb24sIHRyYW5zcG9zZSwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGEgYHNhbXBsZXIyRGAgdHlwZSB1bmlmb3JtIHRleHR1cmUuXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIHVuaWZvcm0gdGV4dHVyZVxuICAgKiBAcGFyYW0gdGV4dHVyZSBUZXh0dXJlIG9iamVjdFxuICAgKi9cbiAgcHVibGljIHVuaWZvcm1UZXh0dXJlKCBuYW1lOiBzdHJpbmcsIHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICBjb25zdCB1bml0ID0gdGhpcy5nZXRVbmlmb3JtVGV4dHVyZVVuaXQoIG5hbWUgKTtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKCBHTF9URVhUVVJFMCArIHVuaXQgKTtcbiAgICB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGV4dHVyZSA/PyBudWxsICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xaSggbG9jYXRpb24sIHVuaXQgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGEgYHNhbXBsZXJDdWJlYCB0eXBlIHVuaWZvcm0gdGV4dHVyZS5cbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgdW5pZm9ybSB0ZXh0dXJlXG4gICAqIEBwYXJhbSB0ZXh0dXJlIFRleHR1cmUgb2JqZWN0XG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybUN1YmVtYXAoIG5hbWU6IHN0cmluZywgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIGNvbnN0IHVuaXQgPSB0aGlzLmdldFVuaWZvcm1UZXh0dXJlVW5pdCggbmFtZSApO1xuICAgIGdsLmFjdGl2ZVRleHR1cmUoIEdMX1RFWFRVUkUwICsgdW5pdCApO1xuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZUN1YmVNYXAoIHRleHR1cmUgPz8gbnVsbCApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMWkoIGxvY2F0aW9uLCB1bml0ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIGF0dHJpYnV0ZSBsb2NhdGlvbi5cbiAgICovXG4gIHB1YmxpYyBnZXRBdHRyaWJMb2NhdGlvbiggbmFtZTogc3RyaW5nICk6IG51bWJlciB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgaWYgKCB0aGlzLl9fYXR0cmliTG9jYXRpb25DYWNoZVsgbmFtZSBdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX2F0dHJpYkxvY2F0aW9uQ2FjaGVbIG5hbWUgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbiggdGhpcy5fX3Byb2dyYW0sIG5hbWUgKTtcbiAgICAgIC8vIGlmICggbG9jYXRpb24gPT09IC0xICkge1xuICAgICAgLy8gICB0aGlzLmdsQ2F0LnNwaXQoICdHTENhdFByb2dyYW0uZ2V0QXR0cmliTG9jYXRpb246IENvdWxkIG5vdCByZXRyaWV2ZSBhdHRyaWJ1dGUgbG9jYXRpb24nICk7XG4gICAgICAvLyAgIHJldHVybiAtMTtcbiAgICAgIC8vIH1cbiAgICAgIHRoaXMuX19hdHRyaWJMb2NhdGlvbkNhY2hlWyBuYW1lIF0gPSBsb2NhdGlvbjtcbiAgICAgIHJldHVybiBsb2NhdGlvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgdW5pZm9ybSBsb2NhdGlvbi5cbiAgICovXG4gIHB1YmxpYyBnZXRVbmlmb3JtTG9jYXRpb24oIG5hbWU6IHN0cmluZyApOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB8IG51bGwge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGlmICggdGhpcy5fX3VuaWZvcm1Mb2NhdGlvbkNhY2hlWyBuYW1lIF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fdW5pZm9ybUxvY2F0aW9uQ2FjaGVbIG5hbWUgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oIHRoaXMuX19wcm9ncmFtLCBuYW1lICk7XG4gICAgICAvLyBpZiAoIGxvY2F0aW9uID09PSBudWxsICkge1xuICAgICAgLy8gICB0aGlzLmdsQ2F0LnNwaXQoICdHTENhdFByb2dyYW0uZ2V0VW5pZm9ybUxvY2F0aW9uOiBDb3VsZCBub3QgcmV0cmlldmUgdW5pZm9ybSBsb2NhdGlvbicgKTtcbiAgICAgIC8vICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgICAgLy8gfVxuICAgICAgdGhpcy5fX3VuaWZvcm1Mb2NhdGlvbkNhY2hlWyBuYW1lIF0gPSBsb2NhdGlvbjtcbiAgICAgIHJldHVybiBsb2NhdGlvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgb3IgY3JlYXRlIGEgdGV4dHVyZSB1bml0IHRoYXQgY29ycmVzcG9uZHMgdG8gZ2l2ZW4gbmFtZS5cbiAgICovXG4gIHB1YmxpYyBnZXRVbmlmb3JtVGV4dHVyZVVuaXQoIG5hbWU6IHN0cmluZyApOiBudW1iZXIge1xuICAgIGlmICggdGhpcy5fX3VuaWZvcm1UZXh0dXJlVW5pdE1hcFsgbmFtZSBdID09PSB1bmRlZmluZWQgKSB7XG4gICAgICB0aGlzLl9fdW5pZm9ybVRleHR1cmVVbml0TWFwWyBuYW1lIF0gPSB0aGlzLl9fdW5pZm9ybXRleHR1cmVVbml0SW5kZXg7XG4gICAgICB0aGlzLl9fdW5pZm9ybXRleHR1cmVVbml0SW5kZXggKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX191bmlmb3JtVGV4dHVyZVVuaXRNYXBbIG5hbWUgXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xfREVQVEhfQVRUQUNITUVOVCwgR0xfUkVOREVSQlVGRkVSIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMUmVuZGVyYnVmZmVyLlxuICovXG5leHBvcnQgY2xhc3MgR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQgZXh0ZW5kcyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0PiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fcmVuZGVyYnVmZmVyOiBXZWJHTFJlbmRlcmJ1ZmZlcjtcbiAgcHJpdmF0ZSBfX3dpZHRoID0gMDtcbiAgcHJpdmF0ZSBfX2hlaWdodCA9IDA7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcmVuZGVyYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGdldCByZW5kZXJidWZmZXIoKTogV2ViR0xSZW5kZXJidWZmZXIge1xuICAgIHJldHVybiB0aGlzLl9fcmVuZGVyYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcmVuZGVyYnVmZmVyLiBTaG9ydGVyIHRoYW4gW1tHTENhdFJlbmRlckJ1ZmZlci5yZW5kZXJidWZmZXJdXS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3KCk6IFdlYkdMUmVuZGVyYnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3JlbmRlcmJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgd2lkdGguXG4gICAqL1xuICBwdWJsaWMgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX193aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgaGVpZ2h0LlxuICAgKi9cbiAgcHVibGljIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2hlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRUZXh0dXJlIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCByZW5kZXJidWZmZXI6IFdlYkdMUmVuZGVyYnVmZmVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19yZW5kZXJidWZmZXIgPSByZW5kZXJidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgcmVuZGVyYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZVJlbmRlcmJ1ZmZlciggdGhpcy5fX3JlbmRlcmJ1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhpcyByZW5kZXJidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgaW5pdChcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHsgZm9ybWF0ID0gdGhpcy5fX2dsQ2F0LnByZWZlcnJlZERlcHRoRm9ybWF0IH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFJlbmRlcmJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wucmVuZGVyYnVmZmVyU3RvcmFnZSggR0xfUkVOREVSQlVGRkVSLCBmb3JtYXQsIHdpZHRoLCBoZWlnaHQgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fd2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLl9faGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhpcyByZW5kZXJidWZmZXIgd2l0aCBtdWx0aXNhbXBsZSBlbmFibGVkLlxuICAgKiBJZiB5b3UgYXJlIHVzaW5nIFdlYkdMMSwgaXQgd2lsbCBmYWxsYmFjayB0byBub24gbXVsdGlzYW1wbGUgb25lIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgaW5pdE11bHRpc2FtcGxlKFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAge1xuICAgICAgc2FtcGxlcyA9IHRoaXMuX19nbENhdC5wcmVmZXJyZWRNdWx0aXNhbXBsZVNhbXBsZXMsXG4gICAgICBmb3JtYXQgPSBHTF9ERVBUSF9BVFRBQ0hNRU5UXG4gICAgfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kUmVuZGVyYnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgICAgZ2wucmVuZGVyYnVmZmVyU3RvcmFnZU11bHRpc2FtcGxlKCBHTF9SRU5ERVJCVUZGRVIsIHNhbXBsZXMsIGZvcm1hdCwgd2lkdGgsIGhlaWdodCApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ2wucmVuZGVyYnVmZmVyU3RvcmFnZSggR0xfUkVOREVSQlVGRkVSLCBmb3JtYXQsIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgIH1cbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fd2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLl9faGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgeyBHTF9DT01QSUxFX1NUQVRVUyB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuXG4vKipcbiAqIEl0J3MgYSBXZWJHTFNoYWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0U2hhZGVyPFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3NoYWRlcjogV2ViR0xTaGFkZXI7XG4gIHByaXZhdGUgX19jb21waWxlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHNoYWRlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgc2hhZGVyKCk6IFdlYkdMU2hhZGVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3NoYWRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIHNoYWRlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRTaGFkZXIuc2hhZGVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTFNoYWRlciB7XG4gICAgcmV0dXJuIHRoaXMuX19zaGFkZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0U2hhZGVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBzaGFkZXI6IFdlYkdMU2hhZGVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19zaGFkZXIgPSBzaGFkZXI7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgc2hhZGVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZVNoYWRlciggdGhpcy5fX3NoYWRlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIHRoZSBsYXN0IGNvbXBpbGF0aW9uIHdhcyBzdWNjZXNzZnVsIG9yIG5vdC5cbiAgICovXG4gIHB1YmxpYyBpc0NvbXBpbGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9fY29tcGlsZWQ7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGlsZSB0aGUgc2hhZGVyLlxuICAgKi9cbiAgcHVibGljIGNvbXBpbGUoIGNvZGU6IHN0cmluZyApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBnbC5zaGFkZXJTb3VyY2UoIHRoaXMuX19zaGFkZXIsIGNvZGUgKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKCB0aGlzLl9fc2hhZGVyICk7XG5cbiAgICB0aGlzLl9fY29tcGlsZWQgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoIHRoaXMuX19zaGFkZXIsIEdMX0NPTVBJTEVfU1RBVFVTICk7XG4gICAgaWYgKCAhdGhpcy5fX2NvbXBpbGVkICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCBnbC5nZXRTaGFkZXJJbmZvTG9nKCB0aGlzLl9fc2hhZGVyICkhICk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBHTF9DTEFNUF9UT19FREdFLCBHTF9GTE9BVCwgR0xfSEFMRl9GTE9BVCwgR0xfTElORUFSLCBHTF9ORUFSRVNULCBHTF9SR0JBLCBHTF9SR0JBOCwgR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YLCBHTF9URVhUVVJFX01BR19GSUxURVIsIEdMX1RFWFRVUkVfTUlOX0ZJTFRFUiwgR0xfVEVYVFVSRV9XUkFQX1MsIEdMX1RFWFRVUkVfV1JBUF9ULCBHTF9VTlNJR05FRF9CWVRFIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgeyBHTENhdEVycm9ycyB9IGZyb20gJy4vR0xDYXRFcnJvcnMnO1xuXG5jb25zdCB6ZXJvVGV4dHVyZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoIFsgMCwgMCwgMCwgMCBdICk7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMVGV4dHVyZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0VGV4dHVyZTxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX190ZXh0dXJlOiBXZWJHTFRleHR1cmU7XG4gIHByaXZhdGUgX193aWR0aCA9IDA7XG4gIHByaXZhdGUgX19oZWlnaHQgPSAwO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRleHR1cmUoKTogV2ViR0xUZXh0dXJlIHtcbiAgICByZXR1cm4gdGhpcy5fX3RleHR1cmU7XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biB0ZXh0dXJlLiBTaG9ydGVyIHRoYW4gW1tHTENhdFRleHR1cmUudGV4dHVyZWRdXVxuICAgKi9cbiAgcHVibGljIGdldCByYXcoKTogV2ViR0xUZXh0dXJlIHtcbiAgICByZXR1cm4gdGhpcy5fX3RleHR1cmU7XG4gIH1cblxuICAvKipcbiAgICogSXRzIHdpZHRoLlxuICAgKi9cbiAgcHVibGljIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9fd2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGhlaWdodC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX19oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0VGV4dHVyZSBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PiwgdGV4dHVyZTogV2ViR0xUZXh0dXJlICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX190ZXh0dXJlID0gdGV4dHVyZTtcbiAgICB0aGlzLnRleHR1cmVGaWx0ZXIoIEdMX0xJTkVBUiApO1xuICAgIHRoaXMudGV4dHVyZVdyYXAoIEdMX0NMQU1QX1RPX0VER0UgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZVRleHR1cmUoIHRoaXMuX190ZXh0dXJlICk7XG4gIH1cblxuICAvKipcbiAgICogU3BlY2lmeSBob3cgdG8gZmlsdGVyIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHRleHR1cmVGaWx0ZXIoKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVGaWx0ZXIoIGZpbHRlcjogbnVtYmVyICk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlRmlsdGVyKCBmaWx0ZXJNYWc6IG51bWJlciwgZmlsdGVyTWluOiBudW1iZXIgKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVGaWx0ZXIoIGZpbHRlck1hZzogbnVtYmVyID0gR0xfTkVBUkVTVCwgZmlsdGVyTWluOiBudW1iZXIgPSBmaWx0ZXJNYWcgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfTUFHX0ZJTFRFUiwgZmlsdGVyTWFnICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFXzJELCBHTF9URVhUVVJFX01JTl9GSUxURVIsIGZpbHRlck1pbiApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0byB3cmFwIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHRleHR1cmVXcmFwKCk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlV3JhcCggd3JhcDogbnVtYmVyICk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlV3JhcCggd3JhcFM6IG51bWJlciwgd3JhcFQ6IG51bWJlciApOiB2b2lkO1xuICBwdWJsaWMgdGV4dHVyZVdyYXAoIHdyYXBTOiBudW1iZXIgPSBHTF9DTEFNUF9UT19FREdFLCB3cmFwVDogbnVtYmVyID0gd3JhcFMgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfV1JBUF9TLCB3cmFwUyApO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9XUkFQX1QsIHdyYXBUICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgdGV4U3RvcmFnZTJEKFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgeyB0YXJnZXQgPSBHTF9URVhUVVJFXzJELCBsZXZlbCA9IDEsIGZvcm1hdCA9IEdMX1JHQkE4IH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICAgIGdsLnRleFN0b3JhZ2UyRCggdGFyZ2V0LCBsZXZlbCwgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICB9ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEdMQ2F0RXJyb3JzLldlYkdMMkV4Y2x1c2l2ZUVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSB2YWx1ZSBmb3IgdGhlIHBhc3NlZCBwYXJhbWV0ZXIgbmFtZS5cbiAgICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViR0xSZW5kZXJpbmdDb250ZXh0L2dldFBhcmFtZXRlclxuICAgKi9cbiAgcHVibGljIGdldFBhcmFtZXRlciggcG5hbWU6IEdMZW51bSApOiBhbnkge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHJldHVybiB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGhpcywgKCkgPT4ge1xuICAgICAgcmV0dXJuIGdsLmdldFBhcmFtZXRlciggcG5hbWUgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogU3BlY2lmeSB0aGUgcGl4ZWwgc3RvcmFnZSBtb2Rlcy5cbiAgICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViR0xSZW5kZXJpbmdDb250ZXh0L3BpeGVsU3RvcmVpXG4gICAqL1xuICBwdWJsaWMgcGl4ZWxTdG9yZWkoIHBuYW1lOiBHTGVudW0sIHBhcmFtOiBudW1iZXIgfCBib29sZWFuICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5waXhlbFN0b3JlaSggcG5hbWUsIHBhcmFtICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBzZXRUZXh0dXJlKCBzb3VyY2U6IFRleEltYWdlU291cmNlICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC50ZXhJbWFnZTJEKCBHTF9URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBzb3VyY2UgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fd2lkdGggPSBzb3VyY2Uud2lkdGg7XG4gICAgdGhpcy5fX2hlaWdodCA9IHNvdXJjZS5oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyBkYXRhIGludG8gdGhpcyB0ZXh0dXJlLlxuICAgKiBUaGlzIGZ1bmN0aW9uIHVzZXMgVHlwZWRBcnJheS4gSWYgeW91IHdhbnQgdG8gc291cmNlIGltYWdlIGRhdGEsIHVzZSBgR0xDYXQuc2V0VGV4dHVyZSgpYCBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHNldFRleHR1cmVGcm9tQXJyYXkoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBzb3VyY2U6IEFycmF5QnVmZmVyVmlldyB8IG51bGwsXG4gICAge1xuICAgICAgaW50ZXJuYWxmb3JtYXQgPSBHTF9SR0JBOCxcbiAgICAgIGZvcm1hdCA9IEdMX1JHQkEsXG4gICAgICB0eXBlID0gR0xfVU5TSUdORURfQllURVxuICAgIH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBsZXQgaWZvcm1hdCA9IGludGVybmFsZm9ybWF0O1xuICAgIGlmICggISggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkgKSB7XG4gICAgICBpZiAoIHR5cGUgPT09IEdMX0hBTEZfRkxPQVQgKSB7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0JywgdHJ1ZSApO1xuICAgICAgICB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnT0VTX3RleHR1cmVfaGFsZl9mbG9hdF9saW5lYXInICk7XG4gICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSBHTF9GTE9BVCApIHtcbiAgICAgICAgdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ09FU190ZXh0dXJlX2Zsb2F0JywgdHJ1ZSApO1xuICAgICAgICB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyJyApO1xuICAgICAgfVxuXG4gICAgICBpZm9ybWF0ID0gZm9ybWF0O1xuICAgIH1cblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC50ZXhJbWFnZTJEKFxuICAgICAgICBHTF9URVhUVVJFXzJELFxuICAgICAgICAwLFxuICAgICAgICBpZm9ybWF0LFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICAwLFxuICAgICAgICBmb3JtYXQsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIHNvdXJjZVxuICAgICAgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fd2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLl9faGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIENvcHkgcGl4ZWxzIGZyb20gY3VycmVudCBmcmFtZWJ1ZmZlciB0byBnaXZlbiB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIGNvcHlUZXh0dXJlKCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuY29weVRleEltYWdlMkQoIEdMX1RFWFRVUkVfMkQsIDAsIEdMX1JHQkEsIDAsIDAsIHdpZHRoLCBoZWlnaHQsIDAgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fd2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLl9faGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgY3ViZW1hcCBkYXRhIGludG8gdGhpcyB0ZXh0dXJlLlxuICAgKiBAcGFyYW0gdGV4dHVyZXMgQXJyYXkgb2YgaWFtZ2VzLiBPcmRlcjogYFgrYCwgYFgtYCwgYFkrYCwgYFktYCwgYForYCwgYFotYFxuICAgKiBAdG9kbyBkdWUgdG8gY29tcGF0aWJpbGl0eSBvZiBpdHMgYHdpZHRoYCBhbmQgYGhlaWdodGAgaXQgc2hvdWxkIG5vdCBiZSB1c2VkIHlldFxuICAgKi9cbiAgcHVibGljIHNldEN1YmVtYXAoIHRleHR1cmVzOiBUZXhJbWFnZVNvdXJjZVtdICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZUN1YmVNYXAoIHRoaXMsICgpID0+IHtcbiAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IDY7IGkgKysgKSB7XG4gICAgICAgIGdsLnRleEltYWdlMkQoXG4gICAgICAgICAgR0xfVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YICsgaSxcbiAgICAgICAgICAwLFxuICAgICAgICAgIEdMX1JHQkEsXG4gICAgICAgICAgR0xfUkdCQSxcbiAgICAgICAgICBHTF9VTlNJR05FRF9CWVRFLFxuICAgICAgICAgIHRleHR1cmVzWyBpIF1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIEdMX1RFWFRVUkVfTUlOX0ZJTFRFUiwgR0xfTElORUFSICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFX0NVQkVfTUFQLCBHTF9URVhUVVJFX01BR19GSUxURVIsIEdMX0xJTkVBUiApO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9XUkFQX1MsIEdMX0NMQU1QX1RPX0VER0UgKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIEdMX1RFWFRVUkVfV1JBUF9ULCBHTF9DTEFNUF9UT19FREdFICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBbIDAsIDAsIDAsIDAgXSB0byB0aGlzIHRleHR1cmUuXG4gICAqIFVzZWZ1bCBmb3IgdGVtcG9yYXJ5IHVzZS4uXG4gICAqL1xuICBwdWJsaWMgc2V0WmVyb1RleHR1cmUoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRUZXh0dXJlRnJvbUFycmF5KCAxLCAxLCB6ZXJvVGV4dHVyZUFycmF5ICk7XG4gIH1cbn1cbiIsImltcG9ydCB0eXBlIHsgR0xDYXQsIEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlIH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgeyBHTF9BUlJBWV9CVUZGRVIsIEdMX0VMRU1FTlRfQVJSQVlfQlVGRkVSLCBHTF9GTE9BVCB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuaW1wb3J0IHR5cGUgeyBHTENhdEJ1ZmZlciB9IGZyb20gJy4vR0xDYXRCdWZmZXInO1xuXG4vKipcbiAqIEl0J3MgYSBXZWJHTFZlcnRleEFycmF5T2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgR0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX192ZXJ0ZXhBcnJheTogR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQ+O1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgYnVmZmVyKCk6IEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0PiB7XG4gICAgcmV0dXJuIHRoaXMuX192ZXJ0ZXhBcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRCdWZmZXIuYnVmZmVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBHTENhdFZlcnRleEFycmF5UmF3VHlwZTxUQ29udGV4dD4ge1xuICAgIHJldHVybiB0aGlzLl9fdmVydGV4QXJyYXk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0QnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCB2ZXJ0ZXhBcnJheTogR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQ+ICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX192ZXJ0ZXhBcnJheSA9IHZlcnRleEFycmF5O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGlmICggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgZ2wuZGVsZXRlVmVydGV4QXJyYXkoIHRoaXMuX192ZXJ0ZXhBcnJheSApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHQgPSB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnLCB0cnVlICk7XG4gICAgICBleHQuZGVsZXRlVmVydGV4QXJyYXlPRVMoIHRoaXMuX192ZXJ0ZXhBcnJheSBhcyBhbnkgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIHZlcnRleCBidWZmZXIgdG8gdGhlIHZlcnRleCBhcnJheS5cbiAgICovXG4gIHB1YmxpYyBiaW5kVmVydGV4YnVmZmVyKFxuICAgIHNvdXJjZTogR0xDYXRCdWZmZXI8VENvbnRleHQ+LFxuICAgIGxvY2F0aW9uOiBudW1iZXIsXG4gICAgc2l6ZSA9IDEsXG4gICAgZGl2aXNvciA9IDAsXG4gICAgdHlwZTogbnVtYmVyID0gR0xfRkxPQVQsXG4gICAgc3RyaWRlID0gMCxcbiAgICBvZmZzZXQgPSAwXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVmVydGV4QXJyYXkoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLmJpbmRCdWZmZXIoIEdMX0FSUkFZX0JVRkZFUiwgc291cmNlLnJhdyApO1xuICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoIGxvY2F0aW9uICk7XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKCBsb2NhdGlvbiwgc2l6ZSwgdHlwZSwgZmFsc2UsIHN0cmlkZSwgb2Zmc2V0ICk7XG5cbiAgICAgIGlmICggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJEaXZpc29yKCBsb2NhdGlvbiwgZGl2aXNvciApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXh0ID0gdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ0FOR0xFX2luc3RhbmNlZF9hcnJheXMnICk7XG4gICAgICAgIGlmICggZXh0ICkge1xuICAgICAgICAgIGV4dC52ZXJ0ZXhBdHRyaWJEaXZpc29yQU5HTEUoIGxvY2F0aW9uLCBkaXZpc29yICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhbiBpbmRleCBidWZmZXIgdG8gdGhlIHZlcnRleCBhcnJheS5cbiAgICovXG4gIHB1YmxpYyBiaW5kSW5kZXhidWZmZXIoXG4gICAgc291cmNlOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD5cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRWZXJ0ZXhBcnJheSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuYmluZEJ1ZmZlciggR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHNvdXJjZS5yYXcgKTtcbiAgICB9ICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMX0FSUkFZX0JVRkZFUiwgR0xfQkxFTkQsIEdMX0NPTE9SX0FUVEFDSE1FTlQwLCBHTF9DT0xPUl9CVUZGRVJfQklULCBHTF9ERVBUSDI0X1NURU5DSUw4LCBHTF9ERVBUSF9BVFRBQ0hNRU5ULCBHTF9ERVBUSF9CVUZGRVJfQklULCBHTF9ERVBUSF9DT01QT05FTlQxNiwgR0xfREVQVEhfVEVTVCwgR0xfRFJBV19GUkFNRUJVRkZFUiwgR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIEdMX0ZMT0FULCBHTF9GUkFHTUVOVF9TSEFERVIsIEdMX0ZSQU1FQlVGRkVSLCBHTF9MRVFVQUwsIEdMX01BWF9EUkFXX0JVRkZFUlMsIEdMX05FQVJFU1QsIEdMX09ORV9NSU5VU19TUkNfQUxQSEEsIEdMX1JFQURfRlJBTUVCVUZGRVIsIEdMX1JFTkRFUkJVRkZFUiwgR0xfUkdCQSwgR0xfUkdCQTMyRiwgR0xfUkdCQTgsIEdMX1NSQ19BTFBIQSwgR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVkVSVEVYX1NIQURFUiB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuaW1wb3J0IHsgQmluZEhlbHBlciB9IGZyb20gJy4vdXRpbHMvQmluZEhlbHBlcic7XG5pbXBvcnQgeyBHTENhdEJ1ZmZlciB9IGZyb20gJy4vR0xDYXRCdWZmZXInO1xuaW1wb3J0IHsgR0xDYXRFcnJvcnMgfSBmcm9tICcuL0dMQ2F0RXJyb3JzJztcbmltcG9ydCB7IEdMQ2F0RnJhbWVidWZmZXIgfSBmcm9tICcuL0dMQ2F0RnJhbWVidWZmZXInO1xuaW1wb3J0IHsgR0xDYXRQcm9ncmFtIH0gZnJvbSAnLi9HTENhdFByb2dyYW0nO1xuaW1wb3J0IHsgR0xDYXRSZW5kZXJidWZmZXIgfSBmcm9tICcuL0dMQ2F0UmVuZGVyYnVmZmVyJztcbmltcG9ydCB7IEdMQ2F0U2hhZGVyIH0gZnJvbSAnLi9HTENhdFNoYWRlcic7XG5pbXBvcnQgeyBHTENhdFRleHR1cmUgfSBmcm9tICcuL0dMQ2F0VGV4dHVyZSc7XG5pbXBvcnQgeyBHTENhdFZlcnRleEFycmF5IH0gZnJvbSAnLi9HTENhdFZlcnRleEFycmF5JztcblxuZXhwb3J0IHR5cGUgV2ViR0xFeHRlbnNpb24gPSBhbnk7XG5cbmV4cG9ydCB0eXBlIEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD5cbiAgPSBUQ29udGV4dCBleHRlbmRzIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICA/IFdlYkdMVmVydGV4QXJyYXlPYmplY3RcbiAgICA6IFdlYkdMVmVydGV4QXJyYXlPYmplY3RPRVM7XG5cbi8qKlxuICogV2ViR0wgd3JhcHBlciB3aXRoIHBsZW50eSBvZiBoYWNrYWJpbGl0eS5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0PFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD4ge1xuICBwdWJsaWMgc3RhdGljIHRocm93SWZOdWxsPFQ+KCB2OiBUIHwgbnVsbCApOiBUIHtcbiAgICBpZiAoIHYgPT0gbnVsbCApIHtcbiAgICAgIHRocm93IEdMQ2F0RXJyb3JzLlVuZXhwZWN0ZWROdWxsRXJyb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBwcmVmZXJyZWRNdWx0aXNhbXBsZVNhbXBsZXMgPSA0O1xuXG4gIHByaXZhdGUgX19wcmVmZXJyZWREZXB0aEZvcm1hdDogR0xlbnVtIHwgbnVsbCA9IG51bGw7XG4gIHB1YmxpYyBnZXQgcHJlZmVycmVkRGVwdGhGb3JtYXQoKTogR0xlbnVtIHtcbiAgICBpZiAoIHRoaXMuX19wcmVmZXJyZWREZXB0aEZvcm1hdCAhPT0gbnVsbCApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fcHJlZmVycmVkRGVwdGhGb3JtYXQ7XG4gICAgfSBlbHNlIGlmICggdGhpcy5fX2dsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIHJldHVybiBHTF9ERVBUSDI0X1NURU5DSUw4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gR0xfREVQVEhfQ09NUE9ORU5UMTY7XG4gICAgfVxuICB9XG4gIHB1YmxpYyBzZXQgcHJlZmVycmVkRGVwdGhGb3JtYXQoIGZvcm1hdDogR0xlbnVtICkge1xuICAgIHRoaXMuX19wcmVmZXJyZWREZXB0aEZvcm1hdCA9IGZvcm1hdDtcbiAgfVxuXG4gIHByaXZhdGUgX19nbDogVENvbnRleHQ7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJWZXJ0ZXhCdWZmZXIgPSBuZXcgQmluZEhlbHBlcjxHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggYnVmZmVyICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kQnVmZmVyKCBHTF9BUlJBWV9CVUZGRVIsIGJ1ZmZlcj8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJJbmRleEJ1ZmZlciA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCBidWZmZXIgKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcbiAgICAgIGdsLmJpbmRCdWZmZXIoIEdMX0VMRU1FTlRfQVJSQVlfQlVGRkVSLCBidWZmZXI/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyVmVydGV4QXJyYXkgPSBuZXcgQmluZEhlbHBlcjxHTENhdFZlcnRleEFycmF5PFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCB2ZXJ0ZXhBcnJheSApID0+IHtcbiAgICAgIHRoaXMucmF3QmluZFZlcnRleEFycmF5KCB2ZXJ0ZXhBcnJheT8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJUZXh0dXJlMkQgPSBuZXcgQmluZEhlbHBlcjxHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIHRleHR1cmUgKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcbiAgICAgIGdsLmJpbmRUZXh0dXJlKCBHTF9URVhUVVJFXzJELCB0ZXh0dXJlPy5yYXcgPz8gbnVsbCApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlclRleHR1cmVDdWJlTWFwID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCB0ZXh0dXJlICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kVGV4dHVyZSggR0xfVEVYVFVSRV9DVUJFX01BUCwgdGV4dHVyZT8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJSZW5kZXJidWZmZXIgPSBuZXcgQmluZEhlbHBlcjxHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggcmVuZGVyYnVmZmVyICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kUmVuZGVyYnVmZmVyKCBHTF9SRU5ERVJCVUZGRVIsIHJlbmRlcmJ1ZmZlcj8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJGcmFtZWJ1ZmZlciA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIGZyYW1lYnVmZmVyICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kRnJhbWVidWZmZXIoIEdMX0ZSQU1FQlVGRkVSLCBmcmFtZWJ1ZmZlcj8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJQcm9ncmFtID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRQcm9ncmFtPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCBwcm9ncmFtICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC51c2VQcm9ncmFtKCBwcm9ncmFtPy5yYXcgPz8gbnVsbCApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlckRyYXdCdWZmZXJzID0gbmV3IEJpbmRIZWxwZXI8R0xlbnVtW10+KFxuICAgIFsgR0xfQ09MT1JfQVRUQUNITUVOVDAgXSxcbiAgICAoIGJ1ZmZlcnMgKSA9PiB7XG4gICAgICB0aGlzLnJhd0RyYXdCdWZmZXJzKCBidWZmZXJzICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19leHRlbnNpb25DYWNoZTogeyBbIG5hbWU6IHN0cmluZyBdOiBXZWJHTEV4dGVuc2lvbiB9ID0ge307XG4gIHByaXZhdGUgX19kdW1teVRleHR1cmVDYWNoZT86IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD47XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcmVuZGVyaW5nIGNvbnRleHQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlbmRlcmluZ0NvbnRleHQoKTogVENvbnRleHQge1xuICAgIHJldHVybiB0aGlzLl9fZ2w7XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biByZW5kZXJpbmcgY29udGV4dC4gU2hvcnRlciB0aGFuIFtbR0xDYXQucmVuZGVyaW5nQ29udGV4dF1dXG4gICAqL1xuICBwdWJsaWMgZ2V0IGdsKCk6IFRDb250ZXh0IHtcbiAgICByZXR1cm4gdGhpcy5fX2dsO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdCBpbnN0YW5jZS5cbiAgICogUmVuZGVyaW5nIGNvbnRleHQgaXMgcmVxdWlyZWQuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsOiBUQ29udGV4dCApIHtcbiAgICB0aGlzLl9fZ2wgPSBnbDtcblxuICAgIGdsLmVuYWJsZSggR0xfREVQVEhfVEVTVCApO1xuICAgIGdsLmRlcHRoRnVuYyggR0xfTEVRVUFMICk7XG4gICAgZ2wuZW5hYmxlKCBHTF9CTEVORCApO1xuICAgIGdsLmJsZW5kRnVuYyggR0xfU1JDX0FMUEhBLCBHTF9PTkVfTUlOVVNfU1JDX0FMUEhBICk7XG4gIH1cblxuICAvKipcbiAgICogQSBkdW1teSB0ZXh0dXJlLCAxMDAlIG9yZ2FuaWMgcHVyZSAjRkYwMEZGIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGR1bW15VGV4dHVyZSgpOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHtcbiAgICBpZiAoIHRoaXMuX19kdW1teVRleHR1cmVDYWNoZSApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fZHVtbXlUZXh0dXJlQ2FjaGU7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dHVyZSA9IHRoaXMuY3JlYXRlVGV4dHVyZSgpO1xuXG4gICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KCAxLCAxLCBuZXcgVWludDhBcnJheSggWyAyNTUsIDAsIDI1NSwgMjU1IF0gKSApO1xuICAgIHRoaXMuX19kdW1teVRleHR1cmVDYWNoZSA9IHRleHR1cmU7XG4gICAgcmV0dXJuIHRleHR1cmU7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgYW4gZXh0ZW5zaW9uLlxuICAgKiBJZiB0aGV5IGlzIHlvdXIgcHJlY2lvdXMgb25lIGFuZCB5b3UgY2Fubm90IGxpdmUgd2l0aG91dCBoaW0sIHR1cm4gb24gYHRocm93SWZOb3RGb3VuZGAuXG4gICAqL1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0IHwgbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2hhbGZfZmxvYXQnLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfaGFsZl9mbG9hdF9saW5lYXInLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IE9FU190ZXh0dXJlX2hhbGZfZmxvYXRfbGluZWFyIHwgbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2hhbGZfZmxvYXRfbGluZWFyJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogT0VTX3RleHR1cmVfaGFsZl9mbG9hdF9saW5lYXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdGV4dHVyZV9mbG9hdCcsXG4gICAgdGhyb3dJZk5vdEZvdW5kPzogZmFsc2VcbiAgKTogT0VTX3RleHR1cmVfZmxvYXQgfCBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfZmxvYXQnLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBPRVNfdGV4dHVyZV9mbG9hdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2Zsb2F0X2xpbmVhcicsXG4gICAgdGhyb3dJZk5vdEZvdW5kPzogZmFsc2VcbiAgKTogT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyIHwgbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2Zsb2F0X2xpbmVhcicsXG4gICAgdGhyb3dJZk5vdEZvdW5kOiB0cnVlXG4gICk6IE9FU190ZXh0dXJlX2Zsb2F0X2xpbmVhcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ0FOR0xFX2luc3RhbmNlZF9hcnJheXMnLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IEFOR0xFX2luc3RhbmNlZF9hcnJheXMgfCBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnQU5HTEVfaW5zdGFuY2VkX2FycmF5cycsXG4gICAgdGhyb3dJZk5vdEZvdW5kOiB0cnVlXG4gICk6IEFOR0xFX2luc3RhbmNlZF9hcnJheXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdmVydGV4X2FycmF5X29iamVjdCcsXG4gICAgdGhyb3dJZk5vdEZvdW5kPzogZmFsc2VcbiAgKTogT0VTX3ZlcnRleF9hcnJheV9vYmplY3QgfCBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBPRVNfdmVydGV4X2FycmF5X29iamVjdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ1dFQkdMX2RyYXdfYnVmZmVycycsXG4gICAgdGhyb3dJZk5vdEZvdW5kPzogZmFsc2VcbiAgKTogV0VCR0xfZHJhd19idWZmZXJzIHwgbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ1dFQkdMX2RyYXdfYnVmZmVycycsXG4gICAgdGhyb3dJZk5vdEZvdW5kOiB0cnVlXG4gICk6IFdFQkdMX2RyYXdfYnVmZmVyczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oIG5hbWU6IHN0cmluZywgdGhyb3dJZk5vdEZvdW5kPzogYm9vbGVhbiApOiBXZWJHTEV4dGVuc2lvbiB8IG51bGw7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oIG5hbWU6IHN0cmluZywgdGhyb3dJZk5vdEZvdW5kPzogYm9vbGVhbiApOiBXZWJHTEV4dGVuc2lvbiB8IG51bGwge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKCB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbIG5hbWUgXSApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbIG5hbWUgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF0gPSBnbC5nZXRFeHRlbnNpb24oIG5hbWUgKTtcbiAgICAgIGlmICggdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF0gKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbIG5hbWUgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICggdGhyb3dJZk5vdEZvdW5kICkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvciggJ0dMQ2F0LmdldEV4dGVuc2lvbjogVGhlIGV4dGVuc2lvbiBcIicgKyBuYW1lICsgJ1wiIGlzIG5vdCBzdXBwb3J0ZWQnICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIGV4dGVuc2lvbnMuXG4gICAqIElmIHRoZXkgYXJlIHlvdXIgcHJlY2lvdXMgb25lcyBhbmQgeW91IGNhbm5vdCBsaXZlIHdpdGhvdXQgdGhlbSwgdHVybiBvbiBgdGhyb3dJZk5vdEZvdW5kYC5cbiAgICovXG4gIHB1YmxpYyBnZXRFeHRlbnNpb25zKCBuYW1lczogc3RyaW5nW10sIHRocm93SWZOb3RGb3VuZD86IGJvb2xlYW4gKTogQXJyYXk8V2ViR0xFeHRlbnNpb24gfCBudWxsPiB7XG4gICAgcmV0dXJuIG5hbWVzLm1hcCggKCBuICkgPT4gdGhpcy5nZXRFeHRlbnNpb24oIG4sIHRocm93SWZOb3RGb3VuZCApICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHNoYWRlciBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlU2hhZGVyKCB0eXBlOiBudW1iZXIgKTogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGNvbnN0IHNoYWRlciA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVTaGFkZXIoIHR5cGUgKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdFNoYWRlciggdGhpcywgc2hhZGVyICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IHByb2dyYW0gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVByb2dyYW0oKTogR0xDYXRQcm9ncmFtPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBjb25zdCBwcm9ncmFtID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVByb2dyYW0oKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdFByb2dyYW0oIHRoaXMsIHByb2dyYW0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXQgcHJvZ3JhbSBvYmplY3QsIGluIGxhemllciB3YXkuXG4gICAqL1xuICBwdWJsaWMgbGF6eVByb2dyYW0oIHZlcnQ6IHN0cmluZywgZnJhZzogc3RyaW5nICk6IEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4ge1xuICAgIGxldCB2ZXJ0ZXhTaGFkZXI6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZnJhZ21lbnRTaGFkZXI6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgcHJvZ3JhbTogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vID09IHZlcnQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHZlcnRleFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKCBHTF9WRVJURVhfU0hBREVSICk7XG4gICAgICB2ZXJ0ZXhTaGFkZXIuY29tcGlsZSggdmVydCApO1xuXG4gICAgICAvLyA9PSBmcmFnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKCBHTF9GUkFHTUVOVF9TSEFERVIgKTtcbiAgICAgIGZyYWdtZW50U2hhZGVyLmNvbXBpbGUoIGZyYWcgKTtcblxuICAgICAgLy8gPT0gcHJvZ3JhbSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgY29uc3QgcHJvZ3JhbSA9IHRoaXMuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgcHJvZ3JhbS5saW5rKCB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyICk7XG5cbiAgICAgIC8vID09IGFsbW9zdCBkb25lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHJldHVybiBwcm9ncmFtO1xuICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgcHJvZ3JhbT8uZGlzcG9zZSgpO1xuICAgICAgZnJhZ21lbnRTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHZlcnRleFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IHByb2dyYW0gb2JqZWN0LCBpbiBsYXppZXIgd2F5LlxuICAgKiBJdCdzIGdvbm5hIGJlIGFzeW5jaHJvbm91cyBpZiB5b3UgaGF2ZSB0aGUgS0hSX3BhcmFsbGVsX3NoYWRlcl9jb21waWxlIGV4dGVuc2lvbiBzdXBwb3J0LlxuICAgKi9cbiAgcHVibGljIGxhenlQcm9ncmFtQXN5bmMoIHZlcnQ6IHN0cmluZywgZnJhZzogc3RyaW5nICk6IFByb21pc2U8R0xDYXRQcm9ncmFtPFRDb250ZXh0Pj4ge1xuICAgIGxldCB2ZXJ0ZXhTaGFkZXI6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZnJhZ21lbnRTaGFkZXI6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgcHJvZ3JhbTogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vID09IHZlcnQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGNvbnN0IHZlcnRleFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKCBHTF9WRVJURVhfU0hBREVSICk7XG4gICAgICB2ZXJ0ZXhTaGFkZXIuY29tcGlsZSggdmVydCApO1xuXG4gICAgICAvLyA9PSBmcmFnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKCBHTF9GUkFHTUVOVF9TSEFERVIgKTtcbiAgICAgIGZyYWdtZW50U2hhZGVyLmNvbXBpbGUoIGZyYWcgKTtcblxuICAgICAgLy8gPT0gcHJvZ3JhbSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgY29uc3QgcHJvZ3JhbSA9IHRoaXMuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgcmV0dXJuIHByb2dyYW0ubGlua0FzeW5jKCB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyICkudGhlbiggKCkgPT4ge1xuICAgICAgICByZXR1cm4gcHJvZ3JhbTtcbiAgICAgIH0gKS5jYXRjaCggKCBlICkgPT4ge1xuICAgICAgICBwcm9ncmFtPy5kaXNwb3NlKCk7XG4gICAgICAgIGZyYWdtZW50U2hhZGVyPy5kaXNwb3NlKCk7XG4gICAgICAgIHZlcnRleFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoIGUgKTtcbiAgICAgIH0gKTtcbiAgICB9IGNhdGNoICggZSApIHtcbiAgICAgIHByb2dyYW0/LmRpc3Bvc2UoKTtcbiAgICAgIGZyYWdtZW50U2hhZGVyPy5kaXNwb3NlKCk7XG4gICAgICB2ZXJ0ZXhTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCggZSApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGEgcHJvZ3JhbSB0byB1c2UuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgdXNhZ2UgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIHVzZVByb2dyYW08VD4oXG4gICAgcHJvZ3JhbTogR0xDYXRQcm9ncmFtPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIHByb2dyYW06IEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJQcm9ncmFtLmJpbmQoIHByb2dyYW0sIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHZlcnRleCBidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQnVmZmVyKCk6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBjb25zdCBidWZmZXIgPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlQnVmZmVyKCkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRCdWZmZXIoIHRoaXMsIGJ1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSB2ZXJ0ZXggYnVmZmVyLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRWZXJ0ZXhCdWZmZXI8VD4oXG4gICAgYnVmZmVyOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCBidWZmZXI6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclZlcnRleEJ1ZmZlci5iaW5kKCBidWZmZXIsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhbiBpbmRleCBidWZmZXIuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZEluZGV4QnVmZmVyPFQ+KFxuICAgIGJ1ZmZlcjogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggYnVmZmVyOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJJbmRleEJ1ZmZlci5iaW5kKCBidWZmZXIsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHZlcnRleCBhcnJheS5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVWZXJ0ZXhBcnJheSgpOiBHTENhdFZlcnRleEFycmF5PFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGNvbnN0IHZlcnRleEFycmF5ID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVZlcnRleEFycmF5KCkgKTtcblxuICAgICAgcmV0dXJuIG5ldyBHTENhdFZlcnRleEFycmF5KCB0aGlzLCB2ZXJ0ZXhBcnJheSBhcyBhbnkgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5nZXRFeHRlbnNpb24oICdPRVNfdmVydGV4X2FycmF5X29iamVjdCcsIHRydWUgKTtcblxuICAgICAgY29uc3QgdmVydGV4QXJyYXkgPSBHTENhdC50aHJvd0lmTnVsbCggZXh0LmNyZWF0ZVZlcnRleEFycmF5T0VTKCkgKTtcblxuICAgICAgcmV0dXJuIG5ldyBHTENhdFZlcnRleEFycmF5KCB0aGlzLCB2ZXJ0ZXhBcnJheSBhcyBhbnkgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBvZiBgZ2wuYmluZFZlcnRleEFycmF5YC5cbiAgICpcbiAgICoge0BsaW5rIHJhd0JpbmRWZXJ0ZXhBcnJheX0gaXMgYmV0dGVyLlxuICAgKi9cbiAgcHVibGljIHJhd0JpbmRWZXJ0ZXhBcnJheSggYXJyYXk6IEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0PiB8IG51bGwgKTogdm9pZCB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSggYXJyYXkgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5nZXRFeHRlbnNpb24oICdPRVNfdmVydGV4X2FycmF5X29iamVjdCcsIHRydWUgKTtcbiAgICAgIGV4dC5iaW5kVmVydGV4QXJyYXlPRVMoIGFycmF5IGFzIGFueSApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgcmF3QmluZFZlcnRleEFycmF5fSBidXQgYmV0dGVyLlxuICAgKlxuICAgKiBCaW5kIGEgdmVydGV4IGFycmF5LlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRWZXJ0ZXhBcnJheTxUPihcbiAgICB2ZXJ0ZXhBcnJheTogR0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCB2ZXJ0ZXhBcnJheTogR0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJWZXJ0ZXhBcnJheS5iaW5kKCB2ZXJ0ZXhBcnJheSwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVUZXh0dXJlKCk6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgY29uc3QgdGV4dHVyZSA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVUZXh0dXJlKCkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRUZXh0dXJlKCB0aGlzLCB0ZXh0dXJlICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIDJEIHRleHR1cmUuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZFRleHR1cmUyRDxUPihcbiAgICB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclRleHR1cmUyRC5iaW5kKCB0ZXh0dXJlLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSBjdWJlbWFwIHRleHR1cmUuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZFRleHR1cmVDdWJlTWFwPFQ+KFxuICAgIHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyVGV4dHVyZUN1YmVNYXAuYmluZCggdGV4dHVyZSwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgcmVuZGVyYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVJlbmRlcmJ1ZmZlcigpOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgY29uc3QgcmVuZGVyYnVmZmVyID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpICk7XG5cbiAgICByZXR1cm4gbmV3IEdMQ2F0UmVuZGVyYnVmZmVyKCB0aGlzLCByZW5kZXJidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgcmVuZGVyYnVmZmVyLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRSZW5kZXJidWZmZXI8VD4oXG4gICAgcmVuZGVyYnVmZmVyOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCByZW5kZXJidWZmZXI6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclJlbmRlcmJ1ZmZlci5iaW5kKCByZW5kZXJidWZmZXIsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUZyYW1lYnVmZmVyKCk6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGNvbnN0IGZyYW1lYnVmZmVyID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZUZyYW1lYnVmZmVyKCkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRGcmFtZWJ1ZmZlciggdGhpcywgZnJhbWVidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgZnJhbWVidWZmZXIuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZEZyYW1lYnVmZmVyPFQ+KFxuICAgIGZyYW1lYnVmZmVyOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIGZyYW1lYnVmZmVyOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlckZyYW1lYnVmZmVyLmJpbmQoIGZyYW1lYnVmZmVyLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBmcmFtZWJ1ZmVyLCBpbiBsYXppZXIgd2F5LlxuICAgKi9cbiAgcHVibGljIGxhenlGcmFtZWJ1ZmZlcihcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHtcbiAgICAgIGlzRmxvYXQgPSBmYWxzZSxcbiAgICAgIGRlcHRoRm9ybWF0ID0gdGhpcy5wcmVmZXJyZWREZXB0aEZvcm1hdFxuICAgIH0gPSB7fVxuICApOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB7XG4gICAgbGV0IHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IHJlbmRlcmJ1ZmZlcjogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBmcmFtZWJ1ZmZlcjogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgLy8gPT0gZnJhbWVidWZmZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgZnJhbWVidWZmZXIgPSB0aGlzLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XG5cbiAgICAgIC8vID09IHJlbmRlcmJ1ZmZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHJlbmRlcmJ1ZmZlciA9IHRoaXMuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgICByZW5kZXJidWZmZXIuaW5pdCggd2lkdGgsIGhlaWdodCwgeyBmb3JtYXQ6IGRlcHRoRm9ybWF0IH0gKTtcbiAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFJlbmRlcmJ1ZmZlciggcmVuZGVyYnVmZmVyLCB7IGF0dGFjaG1lbnQ6IEdMX0RFUFRIX0FUVEFDSE1FTlQgfSApO1xuXG4gICAgICAvLyA9PSB0ZXh0dXJlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICB0ZXh0dXJlID0gdGhpcy5jcmVhdGVUZXh0dXJlKCk7XG4gICAgICBpZiAoIGlzRmxvYXQgKSB7XG4gICAgICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21BcnJheShcbiAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICB7IGludGVybmFsZm9ybWF0OiBHTF9SR0JBMzJGLCBmb3JtYXQ6IEdMX1JHQkEsIHR5cGU6IEdMX0ZMT0FUIH1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21BcnJheSggd2lkdGgsIGhlaWdodCwgbnVsbCApO1xuICAgICAgfVxuICAgICAgZnJhbWVidWZmZXIuYXR0YWNoVGV4dHVyZSggdGV4dHVyZSApO1xuXG4gICAgICAvLyA9PSBhbG1vc3QgZG9uZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICByZXR1cm4gZnJhbWVidWZmZXI7XG4gICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICBmcmFtZWJ1ZmZlcj8uZGlzcG9zZSgpO1xuICAgICAgdGV4dHVyZT8uZGlzcG9zZSgpO1xuICAgICAgcmVuZGVyYnVmZmVyPy5kaXNwb3NlKCk7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgbXVsdGlzYW1wbGUgZnJhbWVidWZmZXIsIGluIGxhemllciB3YXkuXG4gICAqL1xuICBwdWJsaWMgbGF6eU11bHRpc2FtcGxlRnJhbWVidWZmZXIoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB7XG4gICAgICBzYW1wbGVzID0gNCxcbiAgICAgIGlzRmxvYXQgPSBmYWxzZSxcbiAgICAgIGRlcHRoRm9ybWF0ID0gdGhpcy5wcmVmZXJyZWREZXB0aEZvcm1hdCxcbiAgICAgIGZhbGxiYWNrV2ViR0wxID0gdHJ1ZVxuICAgIH0gPSB7fVxuICApOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGxldCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgICAgbGV0IHJlbmRlcmJ1ZmZlckRlcHRoOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgICBsZXQgcmVuZGVyYnVmZmVyQ29sb3I6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICAgIGxldCBmcmFtZWJ1ZmZlcjogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vID09IGZyYW1lYnVmZmVyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIGZyYW1lYnVmZmVyID0gdGhpcy5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuXG4gICAgICAgIC8vID09IHJlbmRlcmJ1ZmZlciBkZXB0aCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIHJlbmRlcmJ1ZmZlckRlcHRoID0gdGhpcy5jcmVhdGVSZW5kZXJidWZmZXIoKTtcbiAgICAgICAgcmVuZGVyYnVmZmVyRGVwdGguaW5pdE11bHRpc2FtcGxlKFxuICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICB7IHNhbXBsZXMsIGZvcm1hdDogZGVwdGhGb3JtYXQgfVxuICAgICAgICApO1xuICAgICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlckRlcHRoLCB7IGF0dGFjaG1lbnQ6IEdMX0RFUFRIX0FUVEFDSE1FTlQgfSApO1xuXG4gICAgICAgIC8vID09IHJlbmRlcmJ1ZmZlciBjb2xvciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIGNvbnN0IHJlbmRlcmJ1ZmZlckNvbG9yID0gdGhpcy5jcmVhdGVSZW5kZXJidWZmZXIoKTtcbiAgICAgICAgY29uc3QgY29sb3JGb3JtYXQgPSBpc0Zsb2F0ID8gR0xfUkdCQTMyRiA6IEdMX1JHQkE4O1xuICAgICAgICByZW5kZXJidWZmZXJDb2xvci5pbml0TXVsdGlzYW1wbGUoXG4gICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgIHsgc2FtcGxlcywgZm9ybWF0OiBjb2xvckZvcm1hdCB9XG4gICAgICAgICk7XG4gICAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFJlbmRlcmJ1ZmZlciggcmVuZGVyYnVmZmVyQ29sb3IsIHsgYXR0YWNobWVudDogR0xfQ09MT1JfQVRUQUNITUVOVDAgfSApO1xuXG4gICAgICAgIC8vID09IGFsbW9zdCBkb25lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIHJldHVybiBmcmFtZWJ1ZmZlcjtcbiAgICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgICBmcmFtZWJ1ZmZlcj8uZGlzcG9zZSgpO1xuICAgICAgICB0ZXh0dXJlPy5kaXNwb3NlKCk7XG4gICAgICAgIHJlbmRlcmJ1ZmZlckNvbG9yPy5kaXNwb3NlKCk7XG4gICAgICAgIHJlbmRlcmJ1ZmZlckRlcHRoPy5kaXNwb3NlKCk7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICggZmFsbGJhY2tXZWJHTDEgKSB7XG4gICAgICByZXR1cm4gdGhpcy5sYXp5RnJhbWVidWZmZXIoIHdpZHRoLCBoZWlnaHQsIHsgaXNGbG9hdCB9ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEdMQ2F0RXJyb3JzLldlYkdMMkV4Y2x1c2l2ZUVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgZHJhdyBidWZmZXJzLCBpbiBsYXppZXIgd2F5LlxuICAgKiBJZiB5b3UgY2FuJ3QgZ3JhYiBgV0VCR0xfZHJhd19idWZmZXJzYCBleHRlbnNpb24sIHlvdSdsbCBkaWUgaW5zdGFudGx5IGF0IHRoaXMgcG9pbnQuXG4gICAqL1xuICBwdWJsaWMgbGF6eURyYXdidWZmZXJzKFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgbnVtQnVmZmVyczogbnVtYmVyLFxuICAgIHtcbiAgICAgIGlzRmxvYXQgPSBmYWxzZSxcbiAgICAgIGRlcHRoRm9ybWF0ID0gdGhpcy5wcmVmZXJyZWREZXB0aEZvcm1hdFxuICAgIH0gPSB7fVxuICApOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB7XG4gICAgaWYgKCBHTF9NQVhfRFJBV19CVUZGRVJTIDwgbnVtQnVmZmVycyApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvciggJ0dMQ2F0OiBNYXhpbXVtIGRyYXcgYnVmZmVycyBjb3VudCBleGNlZWRlZCcgKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0dXJlczogR0xDYXRUZXh0dXJlPFRDb250ZXh0PltdID0gW107XG4gICAgbGV0IHJlbmRlcmJ1ZmZlcjogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBmcmFtZWJ1ZmZlcjogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgLy8gPT0gZnJhbWVidWZmZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgZnJhbWVidWZmZXIgPSB0aGlzLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XG5cbiAgICAgIC8vID09IHJlbmRlcmJ1ZmZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGNvbnN0IHJlbmRlcmJ1ZmZlciA9IHRoaXMuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgICByZW5kZXJidWZmZXIuaW5pdCggd2lkdGgsIGhlaWdodCwgeyBmb3JtYXQ6IGRlcHRoRm9ybWF0IH0gKTtcbiAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFJlbmRlcmJ1ZmZlciggcmVuZGVyYnVmZmVyLCB7IGF0dGFjaG1lbnQ6IEdMX0RFUFRIX0FUVEFDSE1FTlQgfSApO1xuXG4gICAgICAvLyA9PSB0ZXh0dXJlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBudW1CdWZmZXJzOyBpICsrICkge1xuICAgICAgICBjb25zdCB0ZXh0dXJlID0gdGhpcy5jcmVhdGVUZXh0dXJlKCk7XG4gICAgICAgIGlmICggaXNGbG9hdCApIHtcbiAgICAgICAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkoXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICB7IGludGVybmFsZm9ybWF0OiBHTF9SR0JBMzJGLCBmb3JtYXQ6IEdMX1JHQkEsIHR5cGU6IEdMX0ZMT0FUIH1cbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21BcnJheSggd2lkdGgsIGhlaWdodCwgbnVsbCApO1xuICAgICAgICB9XG4gICAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFRleHR1cmUoIHRleHR1cmUsIHsgYXR0YWNobWVudDogR0xfQ09MT1JfQVRUQUNITUVOVDAgKyBpIH0gKTtcbiAgICAgIH1cblxuICAgICAgLy8gPT0gYWxtb3N0IGRvbmUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgcmV0dXJuIGZyYW1lYnVmZmVyO1xuICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgdGV4dHVyZXMuZm9yRWFjaCggKCB0ZXh0dXJlICkgPT4ge1xuICAgICAgICB0ZXh0dXJlLmRpc3Bvc2UoKTtcbiAgICAgIH0gKTtcbiAgICAgIHJlbmRlcmJ1ZmZlcj8uZGlzcG9zZSgpO1xuICAgICAgZnJhbWVidWZmZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgb2YgYGdsLmRyYXdCdWZmZXJzYC5cbiAgICpcbiAgICoge0BsaW5rIGRyYXdCdWZmZXJzfSBpcyBiZXR0ZXIuXG4gICAqL1xuICBwdWJsaWMgcmF3RHJhd0J1ZmZlcnMoIGJ1ZmZlcnM6IEdMZW51bVtdICk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKCBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBnbC5kcmF3QnVmZmVycyggYnVmZmVycyApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHQgPSB0aGlzLmdldEV4dGVuc2lvbiggJ1dFQkdMX2RyYXdfYnVmZmVycycgKTtcbiAgICAgIGV4dD8uZHJhd0J1ZmZlcnNXRUJHTCggYnVmZmVycyApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgcmF3RHJhd0J1ZmZlcnN9IGJ1dCBiZXR0ZXIuXG4gICAqXG4gICAqIENhbGwgdGhpcyBiZWZvcmUgeW91J3JlIGdvbm5hIHVzZSBkcmF3IGJ1ZmZlcnMuXG4gICAqIElmIHlvdSBjYW4ndCBncmFiIGBXRUJHTF9kcmF3X2J1ZmZlcnNgIGV4dGVuc2lvbiwgeW91J2xsIGRpZSBpbnN0YW50bHkgYXQgdGhpcyBwb2ludC5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBkcmF3IGJ1ZmZlcnMgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGRyYXdCdWZmZXJzPFQ+KFxuICAgIGJ1ZmZlcnNPck51bUJ1ZmZlcnM/OiBHTGVudW1bXSB8IG51bWJlcixcbiAgICBjYWxsYmFjaz86ICggYnVmZmVyczogR0xlbnVtW10gKSA9PiBUXG4gICk6IFQge1xuICAgIGxldCBidWZmZXJzOiBHTGVudW1bXTtcblxuICAgIGlmICggQXJyYXkuaXNBcnJheSggYnVmZmVyc09yTnVtQnVmZmVycyApICkge1xuICAgICAgYnVmZmVycyA9IGJ1ZmZlcnNPck51bUJ1ZmZlcnM7XG4gICAgfSBlbHNlIGlmICggYnVmZmVyc09yTnVtQnVmZmVycyApIHtcbiAgICAgIGJ1ZmZlcnMgPSBbXTtcbiAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGJ1ZmZlcnNPck51bUJ1ZmZlcnM7IGkgKysgKSB7XG4gICAgICAgIGJ1ZmZlcnNbIGkgXSA9IEdMX0NPTE9SX0FUVEFDSE1FTlQwICsgaTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYnVmZmVycyA9IFsgR0xfQ09MT1JfQVRUQUNITUVOVDAgXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJEcmF3QnVmZmVycy5iaW5kKCBidWZmZXJzLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIGEgd3JhcHBlciBvZiBkcmF3RWxlbWVudHNJbnN0YW5jZWQuXG4gICAqL1xuICBwdWJsaWMgZHJhd0FycmF5c0luc3RhbmNlZChcbiAgICBtb2RlOiBHTGVudW0sXG4gICAgZmlyc3Q6IEdMaW50LFxuICAgIGNvdW50OiBHTHNpemVpLFxuICAgIHByaW1jb3VudDogR0xzaXplaVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xuXG4gICAgaWYgKCBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBnbC5kcmF3QXJyYXlzSW5zdGFuY2VkKCBtb2RlLCBmaXJzdCwgY291bnQsIHByaW1jb3VudCApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHQgPSB0aGlzLmdldEV4dGVuc2lvbiggJ0FOR0xFX2luc3RhbmNlZF9hcnJheXMnLCB0cnVlICk7XG4gICAgICBleHQuZHJhd0FycmF5c0luc3RhbmNlZEFOR0xFKCBtb2RlLCBmaXJzdCwgY291bnQsIHByaW1jb3VudCApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhIHdyYXBwZXIgb2YgZHJhd0VsZW1lbnRzSW5zdGFuY2VkLlxuICAgKi9cbiAgcHVibGljIGRyYXdFbGVtZW50c0luc3RhbmNlZChcbiAgICBtb2RlOiBHTGVudW0sXG4gICAgY291bnQ6IEdMc2l6ZWksXG4gICAgdHlwZTogR0xlbnVtLFxuICAgIG9mZnNldDogR0xpbnRwdHIsXG4gICAgaW5zdGFuY2VDb3VudDogR0xzaXplaVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xuXG4gICAgaWYgKCBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBnbC5kcmF3RWxlbWVudHNJbnN0YW5jZWQoIG1vZGUsIGNvdW50LCB0eXBlLCBvZmZzZXQsIGluc3RhbmNlQ291bnQgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5nZXRFeHRlbnNpb24oICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJywgdHJ1ZSApO1xuICAgICAgZXh0LmRyYXdFbGVtZW50c0luc3RhbmNlZEFOR0xFKCBtb2RlLCBjb3VudCwgdHlwZSwgb2Zmc2V0LCBpbnN0YW5jZUNvdW50ICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBjdXJyZW50IGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGNsZWFyKFxuICAgIHJlZCA9IDAuMCxcbiAgICBncmVlbiA9IDAuMCxcbiAgICBibHVlID0gMC4wLFxuICAgIGFscGhhID0gMS4wLFxuICAgIGRlcHRoID0gMS4wXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgZ2wuY2xlYXJDb2xvciggcmVkLCBncmVlbiwgYmx1ZSwgYWxwaGEgKTtcbiAgICBnbC5jbGVhckRlcHRoKCBkZXB0aCApO1xuICAgIGdsLmNsZWFyKCBHTF9DT0xPUl9CVUZGRVJfQklUIHwgR0xfREVQVEhfQlVGRkVSX0JJVCApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJhc2ljYWxseSBqdXN0IGEgYGdsLmJsaXRGcmFtZWJ1ZmZlcmAuXG4gICAqL1xuICBwdWJsaWMgYmxpdEZyYW1lYnVmZmVyKFxuICAgIHNyYzogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIGRzdDogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIHtcbiAgICAgIHNyY1ZpZXdwb3J0ID0gWyAwLCAwLCBzcmM/LnJlbmRlcmJ1ZmZlcj8ud2lkdGggPz8gMCwgc3JjPy5yZW5kZXJidWZmZXI/LmhlaWdodCA/PyAwIF0sXG4gICAgICBkc3RWaWV3cG9ydCA9IFsgMCwgMCwgZHN0Py5yZW5kZXJidWZmZXI/LndpZHRoID8/IDAsIGRzdD8ucmVuZGVyYnVmZmVyPy5oZWlnaHQgPz8gMCBdLFxuICAgICAgbWFzayA9IEdMX0NPTE9SX0JVRkZFUl9CSVQsXG4gICAgICBmaWx0ZXIgPSBHTF9ORUFSRVNUXG4gICAgfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKCBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBnbC5iaW5kRnJhbWVidWZmZXIoIEdMX1JFQURfRlJBTUVCVUZGRVIsIHNyYz8ucmF3ID8/IG51bGwgKTtcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlciggR0xfRFJBV19GUkFNRUJVRkZFUiwgZHN0Py5yYXcgPz8gbnVsbCApO1xuICAgICAgZ2wuYmxpdEZyYW1lYnVmZmVyKFxuICAgICAgICBzcmNWaWV3cG9ydFsgMCBdLFxuICAgICAgICBzcmNWaWV3cG9ydFsgMSBdLFxuICAgICAgICBzcmNWaWV3cG9ydFsgMiBdLFxuICAgICAgICBzcmNWaWV3cG9ydFsgMyBdLFxuICAgICAgICBkc3RWaWV3cG9ydFsgMCBdLFxuICAgICAgICBkc3RWaWV3cG9ydFsgMSBdLFxuICAgICAgICBkc3RWaWV3cG9ydFsgMiBdLFxuICAgICAgICBkc3RWaWV3cG9ydFsgMyBdLFxuICAgICAgICBtYXNrLFxuICAgICAgICBmaWx0ZXJcbiAgICAgICk7XG4gICAgICBnbC5iaW5kRnJhbWVidWZmZXIoIEdMX1JFQURfRlJBTUVCVUZGRVIsIG51bGwgKTtcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlciggR0xfRFJBV19GUkFNRUJVRkZFUiwgbnVsbCApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBHTENhdEVycm9ycy5XZWJHTDJFeGNsdXNpdmVFcnJvcjtcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQVlPLElBQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQztJQUkvQixJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUM7SUFtQnhCLElBQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDO0lBRWhDLElBQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDO0lBZ0NwQyxJQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FBQztJQUl2QyxJQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztJQUNqQyxJQUFNLHdCQUF3QixHQUFHLE1BQU0sQ0FBQztJQTJFeEMsSUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUM7SUFFbkMsSUFBTSxtQkFBbUIsR0FBRyxVQUFVLENBQUM7SUFHdkMsSUFBTSxvQkFBb0Is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UUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxJQUFJLENBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBRSxJQUFJLEVBQUU7Z0JBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUUsUUFBUSxFQUFFLEtBQUssQ0FBRSxDQUFDO2FBQ2xDLENBQUUsQ0FBQztTQUNMOzs7O1FBS00saUNBQVUsR0FBakIsVUFBbUIsSUFBWSxFQUFFLEtBQWdCO1lBQ3ZDLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxJQUFJLENBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBRSxJQUFJLEVBQUU7Z0JBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUUsUUFBUSxFQUFFLEtBQUssQ0FBRSxDQUFDO2FBQ2xDLENBQUUsQ0FBQztTQUNMOzs7O1FBS00saUNBQVUsR0FBakIsVUFBbUIsSUFBWSxFQUFFLEtBQWdCO1lBQ3ZDLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxJQUFJLENBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBRSxJQUFJLEVBQUU7Z0JBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUUsUUFBUSxFQUFFLEtBQUssQ0FBRSxDQUFDO2FBQ2xDLENBQUUsQ0FBQztTQUNMOzs7O1FBS00saUNBQVUsR0FBakIsVUFBbUIsSUFBWSxFQUFFLEtBQWdCO1lBQ3ZDLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxJQUFJLENBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBRSxJQUFJLEVBQUU7Z0JBQzdC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
