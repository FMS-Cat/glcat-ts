/*!
* @fms-cat/glcat-ts v0.13.3
* WebGL wrapper with plenty of hackability
*
* Copyright (c) 2018-2020 FMS_Cat
* @fms-cat/glcat-ts is distributed under MIT License
* https://github.com/FMS-Cat/glcat-ts/blob/master/LICENSE
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.GLCAT = {}));
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
    var GL_DEPTH_COMPONENT24 = 0x81a6;
    var GL_DEPTH_TEST = 0x0b71;
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
    var GL_R16F = 0x822d;
    var GL_R32F = 0x822e;
    var GL_READ_FRAMEBUFFER = 0x8ca8;
    var GL_RENDERBUFFER = 0x8d41;
    var GL_RGBA = 0x1908;
    var GL_RGBA16F = 0x881a;
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
            return error;
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
            var _b = _a === void 0 ? {} : _a, _c = _b.attachment, attachment = _c === void 0 ? GL_DEPTH_ATTACHMENT : _c;
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
                    var _a;
                    if (!extParallel ||
                        gl.getProgramParameter(_this.__program, GL_COMPLETION_STATUS_KHR) === true) {
                        _this.__linked = gl.getProgramParameter(_this.__program, GL_LINK_STATUS);
                        if (!_this.__linked) {
                            reject(new Error((_a = gl.getProgramInfoLog(_this.__program)) !== null && _a !== void 0 ? _a : 'null'));
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
                if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
        GLCatRenderbuffer.prototype.renderbufferStorage = function (width, height, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.format, format = _c === void 0 ? this.__glCat.preferredDepthFormat : _c;
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
        GLCatRenderbuffer.prototype.renderbufferStorageMultisample = function (width, height, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.samples, samples = _c === void 0 ? this.__glCat.preferredMultisampleSamples : _c, _d = _b.format, format = _d === void 0 ? this.__glCat.preferredDepthFormat : _d, _e = _b.fallbackWebGL1, fallbackWebGL1 = _e === void 0 ? true : _e;
            var gl = this.__glCat.gl;
            this.__glCat.bindRenderbuffer(this, function () {
                if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
            if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
            if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
            if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
                if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
            if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
                this.preferredDepthFormat = GL_DEPTH_COMPONENT24;
            }
            else {
                this.preferredDepthFormat = GL_DEPTH_COMPONENT16;
            }
        }
        GLCat.throwIfNull = function (v) {
            if (v == null) {
                throw GLCatErrors.UnexpectedNullError;
            }
            else {
                return v;
            }
        };
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
            if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
            if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
        };
        /**
         * Create a new multisample framebuffer, in lazier way.
         */
        GLCat.prototype.lazyMultisampleFramebuffer = function (width, height, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.samples, samples = _c === void 0 ? 4 : _c, _d = _b.isFloat, isFloat = _d === void 0 ? false : _d, _e = _b.depthFormat, depthFormat = _e === void 0 ? this.preferredDepthFormat : _e, _f = _b.fallbackWebGL1, fallbackWebGL1 = _f === void 0 ? true : _f;
            var gl = this.__gl;
            if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
                var texture = void 0;
                var renderbufferDepth = void 0;
                var renderbufferColor = void 0;
                var framebuffer = void 0;
                try {
                    // == framebuffer ==========================================================================
                    framebuffer = this.createFramebuffer();
                    // == renderbuffer depth ===================================================================
                    renderbufferDepth = this.createRenderbuffer();
                    renderbufferDepth.renderbufferStorageMultisample(width, height, { samples: samples, format: depthFormat });
                    framebuffer.attachRenderbuffer(renderbufferDepth, { attachment: GL_DEPTH_ATTACHMENT });
                    // == renderbuffer color ===================================================================
                    var renderbufferColor_1 = this.createRenderbuffer();
                    var colorFormat = isFloat ? GL_RGBA32F : GL_RGBA8;
                    renderbufferColor_1.renderbufferStorageMultisample(width, height, { samples: samples, format: colorFormat });
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
                renderbuffer_1.renderbufferStorage(width, height, { format: depthFormat });
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
            if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
            if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
            if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
            if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xjYXQuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9HTENvbnN0YW50cy50cyIsIi4uL3NyYy91dGlscy9CaW5kSGVscGVyLnRzIiwiLi4vc3JjL0dMQ2F0QnVmZmVyLnRzIiwiLi4vc3JjL0dMQ2F0RXJyb3JzLnRzIiwiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy9HTENhdEZyYW1lYnVmZmVyLnRzIiwiLi4vc3JjL0dMQ2F0UHJvZ3JhbS50cyIsIi4uL3NyYy9HTENhdFJlbmRlcmJ1ZmZlci50cyIsIi4uL3NyYy9HTENhdFNoYWRlci50cyIsIi4uL3NyYy9HTENhdFRleHR1cmUudHMiLCIuLi9zcmMvR0xDYXRWZXJ0ZXhBcnJheS50cyIsIi4uL3NyYy9HTENhdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgR0xfQUNUSVZFX0FUVFJJQlVURVMgPSAweDhiODk7XG5leHBvcnQgY29uc3QgR0xfQUNUSVZFX1RFWFRVUkUgPSAweDg0ZTA7XG5leHBvcnQgY29uc3QgR0xfQUNUSVZFX1VOSUZPUk1fQkxPQ0tTID0gMHg4YTM2O1xuZXhwb3J0IGNvbnN0IEdMX0FDVElWRV9VTklGT1JNUyA9IDB4OGI4NjtcbmV4cG9ydCBjb25zdCBHTF9BTElBU0VEX0xJTkVfV0lEVEhfUkFOR0UgPSAweDg0NmU7XG5leHBvcnQgY29uc3QgR0xfQUxJQVNFRF9QT0lOVF9TSVpFX1JBTkdFID0gMHg4NDZkO1xuZXhwb3J0IGNvbnN0IEdMX0FMUEhBID0gMHgxOTA2O1xuZXhwb3J0IGNvbnN0IEdMX0FMUEhBX0JJVFMgPSAweDBkNTU7XG5leHBvcnQgY29uc3QgR0xfQUxSRUFEWV9TSUdOQUxFRCA9IDB4OTExYTtcbmV4cG9ydCBjb25zdCBHTF9BTFdBWVMgPSAweDAyMDc7XG5leHBvcnQgY29uc3QgR0xfQU5ZX1NBTVBMRVNfUEFTU0VEID0gMHg4YzJmO1xuZXhwb3J0IGNvbnN0IEdMX0FOWV9TQU1QTEVTX1BBU1NFRF9DT05TRVJWQVRJVkUgPSAweDhkNmE7XG5leHBvcnQgY29uc3QgR0xfQVJSQVlfQlVGRkVSID0gMHg4ODkyO1xuZXhwb3J0IGNvbnN0IEdMX0FSUkFZX0JVRkZFUl9CSU5ESU5HID0gMHg4ODk0O1xuZXhwb3J0IGNvbnN0IEdMX0FUVEFDSEVEX1NIQURFUlMgPSAweDhiODU7XG5leHBvcnQgY29uc3QgR0xfQkFDSyA9IDB4MDQwNTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORCA9IDB4MGJlMjtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9DT0xPUiA9IDB4ODAwNTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9EU1RfQUxQSEEgPSAweDgwY2E7XG5leHBvcnQgY29uc3QgR0xfQkxFTkRfRFNUX1JHQiA9IDB4ODBjODtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9FUVVBVElPTiA9IDB4ODAwOTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9FUVVBVElPTl9BTFBIQSA9IDB4ODgzZDtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9FUVVBVElPTl9SR0IgPSAweDgwMDk7XG5leHBvcnQgY29uc3QgR0xfQkxFTkRfU1JDX0FMUEhBID0gMHg4MGNiO1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX1NSQ19SR0IgPSAweDgwYzk7XG5leHBvcnQgY29uc3QgR0xfQkxVRV9CSVRTID0gMHgwZDU0O1xuZXhwb3J0IGNvbnN0IEdMX0JPT0wgPSAweDhiNTY7XG5leHBvcnQgY29uc3QgR0xfQk9PTF9WRUMyID0gMHg4YjU3O1xuZXhwb3J0IGNvbnN0IEdMX0JPT0xfVkVDMyA9IDB4OGI1ODtcbmV4cG9ydCBjb25zdCBHTF9CT09MX1ZFQzQgPSAweDhiNTk7XG5leHBvcnQgY29uc3QgR0xfQlJPV1NFUl9ERUZBVUxUX1dFQkdMID0gMHg5MjQ0O1xuZXhwb3J0IGNvbnN0IEdMX0JVRkZFUl9TSVpFID0gMHg4NzY0O1xuZXhwb3J0IGNvbnN0IEdMX0JVRkZFUl9VU0FHRSA9IDB4ODc2NTtcbmV4cG9ydCBjb25zdCBHTF9CWVRFID0gMHgxNDAwO1xuZXhwb3J0IGNvbnN0IEdMX0NDVyA9IDB4MDkwMTtcbmV4cG9ydCBjb25zdCBHTF9DTEFNUF9UT19FREdFID0gMHg4MTJmO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SID0gMHgxODAwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQwID0gMHg4Y2UwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQwX1dFQkdMID0gMHg4Y2UwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxID0gMHg4Y2UxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxX1dFQkdMID0gMHg4Y2UxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMCA9IDB4OGNlYTtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTBfV0VCR0wgPSAweDhjZWE7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDExID0gMHg4Y2ViO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMV9XRUJHTCA9IDB4OGNlYjtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTIgPSAweDhjZWM7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDEyX1dFQkdMID0gMHg4Y2VjO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMyA9IDB4OGNlZDtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTNfV0VCR0wgPSAweDhjZWQ7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDE0ID0gMHg4Y2VlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxNF9XRUJHTCA9IDB4OGNlZTtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTUgPSAweDhjZWY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDE1X1dFQkdMID0gMHg4Y2VmO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQyID0gMHg4Y2UyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQyX1dFQkdMID0gMHg4Y2UyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQzID0gMHg4Y2UzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQzX1dFQkdMID0gMHg4Y2UzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ0ID0gMHg4Y2U0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ0X1dFQkdMID0gMHg4Y2U0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ1ID0gMHg4Y2U1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ1X1dFQkdMID0gMHg4Y2U1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ2ID0gMHg4Y2U2O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ2X1dFQkdMID0gMHg4Y2U2O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ3ID0gMHg4Y2U3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ3X1dFQkdMID0gMHg4Y2U3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ4ID0gMHg4Y2U4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ4X1dFQkdMID0gMHg4Y2U4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ5ID0gMHg4Y2U5O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ5X1dFQkdMID0gMHg4Y2U5O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0JVRkZFUl9CSVQgPSAweDAwMDA0MDAwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0NMRUFSX1ZBTFVFID0gMHgwYzIyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX1dSSVRFTUFTSyA9IDB4MGMyMztcbmV4cG9ydCBjb25zdCBHTF9DT01QQVJFX1JFRl9UT19URVhUVVJFID0gMHg4ODRlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBJTEVfU1RBVFVTID0gMHg4YjgxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBMRVRJT05fU1RBVFVTX0tIUiA9IDB4OTFiMTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1IxMV9FQUMgPSAweDkyNzA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SRzExX0VBQyA9IDB4OTI3MjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQl9BVENfV0VCR0wgPSAweDhjOTI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JfRVRDMV9XRUJHTCA9IDB4OGQ2NDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQl9QVlJUQ18yQlBQVjFfSU1HID0gMHg4YzAxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCX1BWUlRDXzRCUFBWMV9JTUcgPSAweDhjMDA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JfUzNUQ19EWFQxX0VYVCA9IDB4ODNmMDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQjhfRVRDMiA9IDB4OTI3NDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQjhfUFVOQ0hUSFJPVUdIX0FMUEhBMV9FVEMyID0gMHg5Mjc4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEwWDEwX0tIUiA9IDB4OTNiYjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMFg1X0tIUiA9IDB4OTNiODtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMFg2X0tIUiA9IDB4OTNiOTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMFg4X0tIUiA9IDB4OTNiYTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMlgxMF9LSFIgPSAweDkzYmM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfMTJYMTJfS0hSID0gMHg5M2JkO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzRYNF9LSFIgPSAweDkzYjA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfNVg0X0tIUiA9IDB4OTNiMTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ181WDVfS0hSID0gMHg5M2IyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzZYNV9LSFIgPSAweDkzYjM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfNlg2X0tIUiA9IDB4OTNiNDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ184WDVfS0hSID0gMHg5M2I1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzhYNl9LSFIgPSAweDkzYjY7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfOFg4X0tIUiA9IDB4OTNiNztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVRDX0VYUExJQ0lUX0FMUEhBX1dFQkdMID0gMHg4YzkyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BVENfSU5URVJQT0xBVEVEX0FMUEhBX1dFQkdMID0gMHg4N2VlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9QVlJUQ18yQlBQVjFfSU1HID0gMHg4YzAzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9QVlJUQ180QlBQVjFfSU1HID0gMHg4YzAyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDFfRVhUID0gMHg4M2YxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDNfRVhUID0gMHg4M2YyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDVfRVhUID0gMHg4M2YzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQThfRVRDMl9FQUMgPSAweDkyNzU7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TSUdORURfUjExX0VBQyA9IDB4OTI3MTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NJR05FRF9SRzExX0VBQyA9IDB4OTI3MztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQxX0VYVCA9IDB4OGM0ZDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQzX0VYVCA9IDB4OGM0ZTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQ1X0VYVCA9IDB4OGM0ZjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfUzNUQ19EWFQxX0VYVCA9IDB4OGM0YztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEwWDEwX0tIUiA9IDB4OTNkYjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEwWDVfS0hSID0gMHg5M2Q4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTBYNl9LSFIgPSAweDkzZDk7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ18xMFg4X0tIUiA9IDB4OTNkYTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEyWDEwX0tIUiA9IDB4OTNkYztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEyWDEyX0tIUiA9IDB4OTNkZDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzRYNF9LSFIgPSAweDkzZDA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ181WDRfS0hSID0gMHg5M2QxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfNVg1X0tIUiA9IDB4OTNkMjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzZYNV9LSFIgPSAweDkzZDM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ182WDZfS0hSID0gMHg5M2Q0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfOFg1X0tIUiA9IDB4OTNkNTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzhYNl9LSFIgPSAweDkzZDY7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ184WDhfS0hSID0gMHg5M2Q3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0VUQzJfRUFDID0gMHg5Mjc3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfRVRDMiA9IDB4OTI3NjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X1BVTkNIVEhST1VHSF9BTFBIQTFfRVRDMiA9IDB4OTI3OTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1RFWFRVUkVfRk9STUFUUyA9IDB4ODZhMztcbmV4cG9ydCBjb25zdCBHTF9DT05ESVRJT05fU0FUSVNGSUVEID0gMHg5MTFjO1xuZXhwb3J0IGNvbnN0IEdMX0NPTlNUQU5UX0FMUEhBID0gMHg4MDAzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTlNUQU5UX0NPTE9SID0gMHg4MDAxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTlRFWFRfTE9TVF9XRUJHTCA9IDB4OTI0MjtcbmV4cG9ydCBjb25zdCBHTF9DT1BZX1JFQURfQlVGRkVSID0gMHg4ZjM2O1xuZXhwb3J0IGNvbnN0IEdMX0NPUFlfUkVBRF9CVUZGRVJfQklORElORyA9IDB4OGYzNjtcbmV4cG9ydCBjb25zdCBHTF9DT1BZX1dSSVRFX0JVRkZFUiA9IDB4OGYzNztcbmV4cG9ydCBjb25zdCBHTF9DT1BZX1dSSVRFX0JVRkZFUl9CSU5ESU5HID0gMHg4ZjM3O1xuZXhwb3J0IGNvbnN0IEdMX0NVTExfRkFDRSA9IDB4MGI0NDtcbmV4cG9ydCBjb25zdCBHTF9DVUxMX0ZBQ0VfTU9ERSA9IDB4MGI0NTtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1BST0dSQU0gPSAweDhiOGQ7XG5leHBvcnQgY29uc3QgR0xfQ1VSUkVOVF9RVUVSWSA9IDB4ODg2NTtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1FVRVJZX0VYVCA9IDB4ODg2NTtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1ZFUlRFWF9BVFRSSUIgPSAweDg2MjY7XG5leHBvcnQgY29uc3QgR0xfQ1cgPSAweDA5MDA7XG5leHBvcnQgY29uc3QgR0xfREVDUiA9IDB4MWUwMztcbmV4cG9ydCBjb25zdCBHTF9ERUNSX1dSQVAgPSAweDg1MDg7XG5leHBvcnQgY29uc3QgR0xfREVMRVRFX1NUQVRVUyA9IDB4OGI4MDtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSCA9IDB4MTgwMTtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9BVFRBQ0hNRU5UID0gMHg4ZDAwO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0JJVFMgPSAweDBkNTY7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQlVGRkVSX0JJVCA9IDB4MDAwMDAxMDA7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ0xFQVJfVkFMVUUgPSAweDBiNzM7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ09NUE9ORU5UID0gMHgxOTAyO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0NPTVBPTkVOVDE2ID0gMHg4MWE1O1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0NPTVBPTkVOVDI0ID0gMHg4MWE2O1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0NPTVBPTkVOVDMyRiA9IDB4OGNhYztcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9GVU5DID0gMHgwYjc0O1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX1JBTkdFID0gMHgwYjcwO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX1NURU5DSUwgPSAweDg0Zjk7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfU1RFTkNJTF9BVFRBQ0hNRU5UID0gMHg4MjFhO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX1RFU1QgPSAweDBiNzE7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfV1JJVEVNQVNLID0gMHgwYjcyO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIMjRfU1RFTkNJTDggPSAweDg4ZjA7XG5leHBvcnQgY29uc3QgR0xfREVQVEgzMkZfU1RFTkNJTDggPSAweDhjYWQ7XG5leHBvcnQgY29uc3QgR0xfRElUSEVSID0gMHgwYmQwO1xuZXhwb3J0IGNvbnN0IEdMX0RPTlRfQ0FSRSA9IDB4MTEwMDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjAgPSAweDg4MjU7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIwX1dFQkdMID0gMHg4ODI1O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMSA9IDB4ODgyNjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjFfV0VCR0wgPSAweDg4MjY7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMCA9IDB4ODgyZjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEwX1dFQkdMID0gMHg4ODJmO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTEgPSAweDg4MzA7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMV9XRUJHTCA9IDB4ODgzMDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEyID0gMHg4ODMxO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTJfV0VCR0wgPSAweDg4MzE7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMyA9IDB4ODgzMjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEzX1dFQkdMID0gMHg4ODMyO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTQgPSAweDg4MzM7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxNF9XRUJHTCA9IDB4ODgzMztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjE1ID0gMHg4ODM0O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTVfV0VCR0wgPSAweDg4MzQ7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIyID0gMHg4ODI3O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMl9XRUJHTCA9IDB4ODgyNztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjMgPSAweDg4Mjg7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIzX1dFQkdMID0gMHg4ODI4O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNCA9IDB4ODgyOTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjRfV0VCR0wgPSAweDg4Mjk7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI1ID0gMHg4ODJhO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNV9XRUJHTCA9IDB4ODgyYTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjYgPSAweDg4MmI7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI2X1dFQkdMID0gMHg4ODJiO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNyA9IDB4ODgyYztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjdfV0VCR0wgPSAweDg4MmM7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI4ID0gMHg4ODJkO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSOF9XRUJHTCA9IDB4ODgyZDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjkgPSAweDg4MmU7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI5X1dFQkdMID0gMHg4ODJlO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfRlJBTUVCVUZGRVIgPSAweDhjYTk7XG5leHBvcnQgY29uc3QgR0xfRFJBV19GUkFNRUJVRkZFUl9CSU5ESU5HID0gMHg4Y2E2O1xuZXhwb3J0IGNvbnN0IEdMX0RTVF9BTFBIQSA9IDB4MDMwNDtcbmV4cG9ydCBjb25zdCBHTF9EU1RfQ09MT1IgPSAweDAzMDY7XG5leHBvcnQgY29uc3QgR0xfRFlOQU1JQ19DT1BZID0gMHg4OGVhO1xuZXhwb3J0IGNvbnN0IEdMX0RZTkFNSUNfRFJBVyA9IDB4ODhlODtcbmV4cG9ydCBjb25zdCBHTF9EWU5BTUlDX1JFQUQgPSAweDg4ZTk7XG5leHBvcnQgY29uc3QgR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIgPSAweDg4OTM7XG5leHBvcnQgY29uc3QgR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVJfQklORElORyA9IDB4ODg5NTtcbmV4cG9ydCBjb25zdCBHTF9FUVVBTCA9IDB4MDIwMjtcbmV4cG9ydCBjb25zdCBHTF9GQVNURVNUID0gMHgxMTAxO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUID0gMHgxNDA2O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUXzMyX1VOU0lHTkVEX0lOVF8yNF84X1JFViA9IDB4OGRhZDtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQyID0gMHg4YjVhO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDJYMyA9IDB4OGI2NTtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQyWDQgPSAweDhiNjY7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUMyA9IDB4OGI1YjtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQzWDIgPSAweDhiNjc7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUM1g0ID0gMHg4YjY4O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDQgPSAweDhiNWM7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUNFgyID0gMHg4YjY5O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDRYMyA9IDB4OGI2YTtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9WRUMyID0gMHg4YjUwO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX1ZFQzMgPSAweDhiNTE7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfVkVDNCA9IDB4OGI1MjtcbmV4cG9ydCBjb25zdCBHTF9GUkFHTUVOVF9TSEFERVIgPSAweDhiMzA7XG5leHBvcnQgY29uc3QgR0xfRlJBR01FTlRfU0hBREVSX0RFUklWQVRJVkVfSElOVCA9IDB4OGI4YjtcbmV4cG9ydCBjb25zdCBHTF9GUkFHTUVOVF9TSEFERVJfREVSSVZBVElWRV9ISU5UX09FUyA9IDB4OGI4YjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUiA9IDB4OGQ0MDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0FMUEhBX1NJWkUgPSAweDgyMTU7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9CTFVFX1NJWkUgPSAweDgyMTQ7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9DT0xPUl9FTkNPRElORyA9IDB4ODIxMDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0NPTE9SX0VOQ09ESU5HX0VYVCA9IDB4ODIxMDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0NPTVBPTkVOVF9UWVBFID0gMHg4MjExO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfQ09NUE9ORU5UX1RZUEVfRVhUID0gMHg4MjExO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfREVQVEhfU0laRSA9IDB4ODIxNjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0dSRUVOX1NJWkUgPSAweDgyMTM7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9PQkpFQ1RfTkFNRSA9IDB4OGNkMTtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX09CSkVDVF9UWVBFID0gMHg4Y2QwO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfUkVEX1NJWkUgPSAweDgyMTI7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9TVEVOQ0lMX1NJWkUgPSAweDgyMTc7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0NVQkVfTUFQX0ZBQ0UgPSAweDhjZDM7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0xBWUVSID0gMHg4Y2Q0O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfVEVYVFVSRV9MRVZFTCA9IDB4OGNkMjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9CSU5ESU5HID0gMHg4Y2E2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0NPTVBMRVRFID0gMHg4Y2Q1O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0RFRkFVTFQgPSAweDgyMTg7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfSU5DT01QTEVURV9BVFRBQ0hNRU5UID0gMHg4Y2Q2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfRElNRU5TSU9OUyA9IDB4OGNkOTtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX01JU1NJTkdfQVRUQUNITUVOVCA9IDB4OGNkNztcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX01VTFRJU0FNUExFID0gMHg4ZDU2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX1VOU1VQUE9SVEVEID0gMHg4Y2RkO1xuZXhwb3J0IGNvbnN0IEdMX0ZST05UID0gMHgwNDA0O1xuZXhwb3J0IGNvbnN0IEdMX0ZST05UX0FORF9CQUNLID0gMHgwNDA4O1xuZXhwb3J0IGNvbnN0IEdMX0ZST05UX0ZBQ0UgPSAweDBiNDY7XG5leHBvcnQgY29uc3QgR0xfRlVOQ19BREQgPSAweDgwMDY7XG5leHBvcnQgY29uc3QgR0xfRlVOQ19SRVZFUlNFX1NVQlRSQUNUID0gMHg4MDBiO1xuZXhwb3J0IGNvbnN0IEdMX0ZVTkNfU1VCU1RSQUNUID0gMHg4MDBhO1xuZXhwb3J0IGNvbnN0IEdMX0dFTkVSQVRFX01JUE1BUF9ISU5UID0gMHg4MTkyO1xuZXhwb3J0IGNvbnN0IEdMX0dFUVVBTCA9IDB4MDIwNjtcbmV4cG9ydCBjb25zdCBHTF9HUFVfRElTSk9JTlRfRVhUID0gMHg4ZmJiO1xuZXhwb3J0IGNvbnN0IEdMX0dSRUFURVIgPSAweDAyMDQ7XG5leHBvcnQgY29uc3QgR0xfR1JFRU5fQklUUyA9IDB4MGQ1MztcbmV4cG9ydCBjb25zdCBHTF9IQUxGX0ZMT0FUID0gMHgxNDBiO1xuZXhwb3J0IGNvbnN0IEdMX0hBTEZfRkxPQVRfT0VTID0gMHg4ZDYxO1xuZXhwb3J0IGNvbnN0IEdMX0hJR0hfRkxPQVQgPSAweDhkZjI7XG5leHBvcnQgY29uc3QgR0xfSElHSF9JTlQgPSAweDhkZjU7XG5leHBvcnQgY29uc3QgR0xfSU1QTEVNRU5UQVRJT05fQ09MT1JfUkVBRF9GT1JNQVQgPSAweDhiOWI7XG5leHBvcnQgY29uc3QgR0xfSU1QTEVNRU5UQVRJT05fQ09MT1JfUkVBRF9UWVBFID0gMHg4YjlhO1xuZXhwb3J0IGNvbnN0IEdMX0lOQ1IgPSAweDFlMDI7XG5leHBvcnQgY29uc3QgR0xfSU5DUl9XUkFQID0gMHg4NTA3O1xuZXhwb3J0IGNvbnN0IEdMX0lOVCA9IDB4MTQwNDtcbmV4cG9ydCBjb25zdCBHTF9JTlRfMl8xMF8xMF8xMF9SRVYgPSAweDhkOWY7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfMkQgPSAweDhkY2E7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfMkRfQVJSQVkgPSAweDhkY2Y7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfM0QgPSAweDhkY2I7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfQ1VCRSA9IDB4OGRjYztcbmV4cG9ydCBjb25zdCBHTF9JTlRfVkVDMiA9IDB4OGI1MztcbmV4cG9ydCBjb25zdCBHTF9JTlRfVkVDMyA9IDB4OGI1NDtcbmV4cG9ydCBjb25zdCBHTF9JTlRfVkVDNCA9IDB4OGI1NTtcbmV4cG9ydCBjb25zdCBHTF9JTlRFUkxFQVZFRF9BVFRSSUJTID0gMHg4YzhjO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfRU5VTSA9IDB4MDUwMDtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX0ZSQU1FQlVGRkVSX09QRVJBVElPTiA9IDB4MDUwNjtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX0lOREVYID0gMHhmZmZmZmZmZjtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX09QRVJBVElPTiA9IDB4MDUwMjtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX1ZBTFVFID0gMHgwNTAxO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkVSVCA9IDB4MTUwYTtcbmV4cG9ydCBjb25zdCBHTF9LRUVQID0gMHgxZTAwO1xuZXhwb3J0IGNvbnN0IEdMX0xFUVVBTCA9IDB4MDIwMztcbmV4cG9ydCBjb25zdCBHTF9MRVNTID0gMHgwMjAxO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVfTE9PUCA9IDB4MDAwMjtcbmV4cG9ydCBjb25zdCBHTF9MSU5FX1NUUklQID0gMHgwMDAzO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVfV0lEVEggPSAweDBiMjE7XG5leHBvcnQgY29uc3QgR0xfTElORUFSID0gMHgyNjAxO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVBUl9NSVBNQVBfTElORUFSID0gMHgyNzAzO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVBUl9NSVBNQVBfTkVBUkVTVCA9IDB4MjcwMTtcbmV4cG9ydCBjb25zdCBHTF9MSU5FUyA9IDB4MDAwMTtcbmV4cG9ydCBjb25zdCBHTF9MSU5LX1NUQVRVUyA9IDB4OGI4MjtcbmV4cG9ydCBjb25zdCBHTF9MT1dfRkxPQVQgPSAweDhkZjA7XG5leHBvcnQgY29uc3QgR0xfTE9XX0lOVCA9IDB4OGRmMztcbmV4cG9ydCBjb25zdCBHTF9MVU1JTkFOQ0UgPSAweDE5MDk7XG5leHBvcnQgY29uc3QgR0xfTFVNSU5BTkNFX0FMUEhBID0gMHgxOTBhO1xuZXhwb3J0IGNvbnN0IEdMX01BWCA9IDB4ODAwODtcbmV4cG9ydCBjb25zdCBHTF9NQVhfM0RfVEVYVFVSRV9TSVpFID0gMHg4MDczO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9BUlJBWV9URVhUVVJFX0xBWUVSUyA9IDB4ODhmZjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ0xJRU5UX1dBSVRfVElNRU9VVF9XRUJHTCA9IDB4OTI0NztcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ09MT1JfQVRUQUNITUVOVFMgPSAweDhjZGY7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTE9SX0FUVEFDSE1FTlRTX1dFQkdMID0gMHg4Y2RmO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DT01CSU5FRF9GUkFHTUVOVF9VTklGT1JNX0NPTVBPTkVOVFMgPSAweDhhMzM7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTUJJTkVEX1RFWFRVUkVfSU1BR0VfVU5JVFMgPSAweDhiNGQ7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTUJJTkVEX1VOSUZPUk1fQkxPQ0tTID0gMHg4YTJlO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DT01CSU5FRF9WRVJURVhfVU5JRk9STV9DT01QT05FTlRTID0gMHg4YTMxO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DVUJFX01BUF9URVhUVVJFX1NJWkUgPSAweDg1MWM7XG5leHBvcnQgY29uc3QgR0xfTUFYX0RSQVdfQlVGRkVSUyA9IDB4ODgyNDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfRFJBV19CVUZGRVJTX1dFQkdMID0gMHg4ODI0O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FTEVNRU5UX0lOREVYID0gMHg4ZDZiO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FTEVNRU5UU19JTkRJQ0VTID0gMHg4MGU5O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FTEVNRU5UU19WRVJUSUNFUyA9IDB4ODBlODtcbmV4cG9ydCBjb25zdCBHTF9NQVhfRVhUID0gMHg4MDA4O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9JTlBVVF9DT01QT05FTlRTID0gMHg5MTI1O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9VTklGT1JNX0JMT0NLUyA9IDB4OGEyZDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfRlJBR01FTlRfVU5JRk9STV9DT01QT05FTlRTID0gMHg4YjQ5O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9VTklGT1JNX1ZFQ1RPUlMgPSAweDhkZmQ7XG5leHBvcnQgY29uc3QgR0xfTUFYX1BST0dSQU1fVEVYRUxfT0ZGU0VUID0gMHg4OTA1O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9SRU5ERVJCVUZGRVJfU0laRSA9IDB4ODRlODtcbmV4cG9ydCBjb25zdCBHTF9NQVhfU0FNUExFUyA9IDB4OGQ1NztcbmV4cG9ydCBjb25zdCBHTF9NQVhfU0VSVkVSX1dBSVRfVElNRU9VVCA9IDB4OTExMTtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9JTUFHRV9VTklUUyA9IDB4ODg3MjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9MT0RfQklBUyA9IDB4ODRmZDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9NQVhfQU5JU09UUk9QWV9FWFQgPSAweDg0ZmY7XG5leHBvcnQgY29uc3QgR0xfTUFYX1RFWFRVUkVfU0laRSA9IDB4MGQzMztcbmV4cG9ydCBjb25zdCBHTF9NQVhfVFJBTlNGT1JNX0ZFRURCQUNLX0lOVEVSTEVBVkVEX0NPTVBPTkVOVFMgPSAweDhjOGE7XG5leHBvcnQgY29uc3QgR0xfTUFYX1RSQU5TRk9STV9GRUVEQkFDS19TRVBBUkFURV9BVFRSSUJTID0gMHg4YzhiO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9UUkFOU0ZPUk1fRkVFREJBQ0tfU0VQQVJBVEVfQ09NUE9ORU5UUyA9IDB4OGM4MDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVU5JRk9STV9CTE9DS19TSVpFID0gMHg4YTMwO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9VTklGT1JNX0JVRkZFUl9CSU5ESU5HUyA9IDB4OGEyZjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkFSWUlOR19DT01QT05FTlRTID0gMHg4YjRiO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WQVJZSU5HX1ZFQ1RPUlMgPSAweDhkZmM7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9BVFRSSUJTID0gMHg4ODY5O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WRVJURVhfT1VUUFVUX0NPTVBPTkVOVFMgPSAweDkxMjI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9URVhUVVJFX0lNQUdFX1VOSVRTID0gMHg4YjRjO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WRVJURVhfVU5JRk9STV9CTE9DS1MgPSAweDhhMmI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9VTklGT1JNX0NPTVBPTkVOVFMgPSAweDhiNGE7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9VTklGT1JNX1ZFQ1RPUlMgPSAweDhkZmI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZJRVdQT1JUX0RJTVMgPSAweDBkM2E7XG5leHBvcnQgY29uc3QgR0xfTUVESVVNX0ZMT0FUID0gMHg4ZGYxO1xuZXhwb3J0IGNvbnN0IEdMX01FRElVTV9JTlQgPSAweDhkZjQ7XG5leHBvcnQgY29uc3QgR0xfTUlOID0gMHg4MDA3O1xuZXhwb3J0IGNvbnN0IEdMX01JTl9FWFQgPSAweDgwMDc7XG5leHBvcnQgY29uc3QgR0xfTUlOX1BST0dSQU1fVEVYRUxfT0ZGU0VUID0gMHg4OTA0O1xuZXhwb3J0IGNvbnN0IEdMX01JUlJPUkVEX1JFUEVBVCA9IDB4ODM3MDtcbmV4cG9ydCBjb25zdCBHTF9ORUFSRVNUID0gMHgyNjAwO1xuZXhwb3J0IGNvbnN0IEdMX05FQVJFU1RfTUlQTUFQX0xJTkVBUiA9IDB4MjcwMjtcbmV4cG9ydCBjb25zdCBHTF9ORUFSRVNUX01JUE1BUF9ORUFSRVNUID0gMHgyNzAwO1xuZXhwb3J0IGNvbnN0IEdMX05FVkVSID0gMHgwMjAwO1xuZXhwb3J0IGNvbnN0IEdMX05JQ0VTVCA9IDB4MTEwMjtcbmV4cG9ydCBjb25zdCBHTF9OT19FUlJPUiA9IDA7XG5leHBvcnQgY29uc3QgR0xfTk9ORSA9IDA7XG5leHBvcnQgY29uc3QgR0xfTk9URVFVQUwgPSAweDAyMDU7XG5leHBvcnQgY29uc3QgR0xfT0JKRUNUX1RZUEUgPSAweDkxMTI7XG5leHBvcnQgY29uc3QgR0xfT05FID0gMTtcbmV4cG9ydCBjb25zdCBHTF9PTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEEgPSAweDgwMDQ7XG5leHBvcnQgY29uc3QgR0xfT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SID0gMHg4MDAyO1xuZXhwb3J0IGNvbnN0IEdMX09ORV9NSU5VU19EU1RfQUxQSEEgPSAweDAzMDU7XG5leHBvcnQgY29uc3QgR0xfT05FX01JTlVTX0RTVF9DT0xPUiA9IDB4MDMwNztcbmV4cG9ydCBjb25zdCBHTF9PTkVfTUlOVVNfU1JDX0FMUEhBID0gMHgwMzAzO1xuZXhwb3J0IGNvbnN0IEdMX09ORV9NSU5VU19TUkNfQ09MT1IgPSAweDAzMDE7XG5leHBvcnQgY29uc3QgR0xfT1VUX09GX01FTU9SWSA9IDB4MDUwNTtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX0FMSUdOTUVOVCA9IDB4MGQwNTtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX1JPV19MRU5HVEggPSAweDBkMDI7XG5leHBvcnQgY29uc3QgR0xfUEFDS19TS0lQX1BJWEVMUyA9IDB4MGQwNDtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX1NLSVBfUk9XUyA9IDB4MGQwMztcbmV4cG9ydCBjb25zdCBHTF9QSVhFTF9QQUNLX0JVRkZFUiA9IDB4ODhlYjtcbmV4cG9ydCBjb25zdCBHTF9QSVhFTF9QQUNLX0JVRkZFUl9CSU5ESU5HID0gMHg4OGVkO1xuZXhwb3J0IGNvbnN0IEdMX1BJWEVMX1VOUEFDS19CVUZGRVIgPSAweDg4ZWM7XG5leHBvcnQgY29uc3QgR0xfUElYRUxfVU5QQUNLX0JVRkZFUl9CSU5ESU5HID0gMHg4OGVmO1xuZXhwb3J0IGNvbnN0IEdMX1BPSU5UUyA9IDB4MDAwMDtcbmV4cG9ydCBjb25zdCBHTF9QT0xZR09OX09GRlNFVF9GQUNUT1IgPSAweDgwMzg7XG5leHBvcnQgY29uc3QgR0xfUE9MWUdPTl9PRkZTRVRfRklMTCA9IDB4ODAzNztcbmV4cG9ydCBjb25zdCBHTF9QT0xZR09OX09GRlNFVF9VTklUUyA9IDB4MmEwMDtcbmV4cG9ydCBjb25zdCBHTF9RVUVSWV9DT1VOVEVSX0JJVFNfRVhUID0gMHg4ODY0O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVCA9IDB4ODg2NjtcbmV4cG9ydCBjb25zdCBHTF9RVUVSWV9SRVNVTFRfQVZBSUxBQkxFID0gMHg4ODY3O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVF9BVkFJTEFCTEVfRVhUID0gMHg4ODY3O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVF9FWFQgPSAweDg4NjY7XG5leHBvcnQgY29uc3QgR0xfUjExRl9HMTFGX0IxMEYgPSAweDhjM2E7XG5leHBvcnQgY29uc3QgR0xfUjE2RiA9IDB4ODIyZDtcbmV4cG9ydCBjb25zdCBHTF9SMTZJID0gMHg4MjMzO1xuZXhwb3J0IGNvbnN0IEdMX1IxNlVJID0gMHg4MjM0O1xuZXhwb3J0IGNvbnN0IEdMX1IzMkYgPSAweDgyMmU7XG5leHBvcnQgY29uc3QgR0xfUjMySSA9IDB4ODIzNTtcbmV4cG9ydCBjb25zdCBHTF9SMzJVSSA9IDB4ODIzNjtcbmV4cG9ydCBjb25zdCBHTF9SOCA9IDB4ODIyOTtcbmV4cG9ydCBjb25zdCBHTF9SOF9TTk9STSA9IDB4OGY5NDtcbmV4cG9ydCBjb25zdCBHTF9SOEkgPSAweDgyMzE7XG5leHBvcnQgY29uc3QgR0xfUjhVSSA9IDB4ODIzMjtcbmV4cG9ydCBjb25zdCBHTF9SQVNURVJJWkVSX0RJU0NBUkQgPSAweDhjODk7XG5leHBvcnQgY29uc3QgR0xfUkVBRF9CVUZGRVIgPSAweDBjMDI7XG5leHBvcnQgY29uc3QgR0xfUkVBRF9GUkFNRUJVRkZFUiA9IDB4OGNhODtcbmV4cG9ydCBjb25zdCBHTF9SRUFEX0ZSQU1FQlVGRkVSX0JJTkRJTkcgPSAweDhjYWE7XG5leHBvcnQgY29uc3QgR0xfUkVEID0gMHgxOTAzO1xuZXhwb3J0IGNvbnN0IEdMX1JFRF9CSVRTID0gMHgwZDUyO1xuZXhwb3J0IGNvbnN0IEdMX1JFRF9JTlRFR0VSID0gMHg4ZDk0O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUiA9IDB4OGQ0MTtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfQUxQSEFfU0laRSA9IDB4OGQ1MztcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfQklORElORyA9IDB4OGNhNztcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfQkxVRV9TSVpFID0gMHg4ZDUyO1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9ERVBUSF9TSVpFID0gMHg4ZDU0O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9HUkVFTl9TSVpFID0gMHg4ZDUxO1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9IRUlHSFQgPSAweDhkNDM7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX0lOVEVSTkFMX0ZPUk1BVCA9IDB4OGQ0NDtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfUkVEX1NJWkUgPSAweDhkNTA7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX1NBTVBMRVMgPSAweDhjYWI7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX1NURU5DSUxfU0laRSA9IDB4OGQ1NTtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfV0lEVEggPSAweDhkNDI7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSRVIgPSAweDFmMDE7XG5leHBvcnQgY29uc3QgR0xfUkVQRUFUID0gMHgyOTAxO1xuZXhwb3J0IGNvbnN0IEdMX1JFUExBQ0UgPSAweDFlMDE7XG5leHBvcnQgY29uc3QgR0xfUkcgPSAweDgyMjc7XG5leHBvcnQgY29uc3QgR0xfUkdfSU5URUdFUiA9IDB4ODIyODtcbmV4cG9ydCBjb25zdCBHTF9SRzE2RiA9IDB4ODIyZjtcbmV4cG9ydCBjb25zdCBHTF9SRzE2SSA9IDB4ODIzOTtcbmV4cG9ydCBjb25zdCBHTF9SRzE2VUkgPSAweDgyM2E7XG5leHBvcnQgY29uc3QgR0xfUkczMkYgPSAweDgyMzA7XG5leHBvcnQgY29uc3QgR0xfUkczMkkgPSAweDgyM2I7XG5leHBvcnQgY29uc3QgR0xfUkczMlVJID0gMHg4MjNjO1xuZXhwb3J0IGNvbnN0IEdMX1JHOCA9IDB4ODIyYjtcbmV4cG9ydCBjb25zdCBHTF9SRzhfU05PUk0gPSAweDhmOTU7XG5leHBvcnQgY29uc3QgR0xfUkc4SSA9IDB4ODIzNztcbmV4cG9ydCBjb25zdCBHTF9SRzhVSSA9IDB4ODIzODtcbmV4cG9ydCBjb25zdCBHTF9SR0IgPSAweDE5MDc7XG5leHBvcnQgY29uc3QgR0xfUkdCX0lOVEVHRVIgPSAweDhkOTg7XG5leHBvcnQgY29uc3QgR0xfUkdCMTBfQTIgPSAweDgwNTk7XG5leHBvcnQgY29uc3QgR0xfUkdCMTBfQTJVSSA9IDB4OTA2ZjtcbmV4cG9ydCBjb25zdCBHTF9SR0IxNkYgPSAweDg4MWI7XG5leHBvcnQgY29uc3QgR0xfUkdCMTZJID0gMHg4ZDg5O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjE2VUkgPSAweDhkNzc7XG5leHBvcnQgY29uc3QgR0xfUkdCMzJGID0gMHg4ODE1O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjMyRl9FWFQgPSAweDg4MTU7XG5leHBvcnQgY29uc3QgR0xfUkdCMzJJID0gMHg4ZDgzO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjMyVUkgPSAweDhkNzE7XG5leHBvcnQgY29uc3QgR0xfUkdCNV9BMSA9IDB4ODA1NztcbmV4cG9ydCBjb25zdCBHTF9SR0I1NjUgPSAweDhkNjI7XG5leHBvcnQgY29uc3QgR0xfUkdCOCA9IDB4ODA1MTtcbmV4cG9ydCBjb25zdCBHTF9SR0I4X1NOT1JNID0gMHg4Zjk2O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjhJID0gMHg4ZDhmO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjhVSSA9IDB4OGQ3ZDtcbmV4cG9ydCBjb25zdCBHTF9SR0I5X0U1ID0gMHg4YzNkO1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEgPSAweDE5MDg7XG5leHBvcnQgY29uc3QgR0xfUkdCQV9JTlRFR0VSID0gMHg4ZDk5O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkExNkYgPSAweDg4MWE7XG5leHBvcnQgY29uc3QgR0xfUkdCQTE2SSA9IDB4OGQ4ODtcbmV4cG9ydCBjb25zdCBHTF9SR0JBMTZVSSA9IDB4OGQ3NjtcbmV4cG9ydCBjb25zdCBHTF9SR0JBMzJGID0gMHg4ODE0O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEzMkZfRVhUID0gMHg4ODE0O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEzMkkgPSAweDhkODI7XG5leHBvcnQgY29uc3QgR0xfUkdCQTMyVUkgPSAweDhkNzA7XG5leHBvcnQgY29uc3QgR0xfUkdCQTQgPSAweDgwNTY7XG5leHBvcnQgY29uc3QgR0xfUkdCQTggPSAweDgwNTg7XG5leHBvcnQgY29uc3QgR0xfUkdCQThfU05PUk0gPSAweDhmOTc7XG5leHBvcnQgY29uc3QgR0xfUkdCQThJID0gMHg4ZDhlO1xuZXhwb3J0IGNvbnN0IEdMX1JHQkE4VUkgPSAweDhkN2M7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFX0FMUEhBX1RPX0NPVkVSQUdFID0gMHg4MDllO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9CVUZGRVJTID0gMHg4MGE4O1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9DT1ZFUkFHRSA9IDB4ODBhMDtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVfQ09WRVJBR0VfSU5WRVJUID0gMHg4MGFiO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9DT1ZFUkFHRV9WQUxVRSA9IDB4ODBhYTtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSXzJEID0gMHg4YjVlO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRVJfMkRfQVJSQVkgPSAweDhkYzE7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8yRF9BUlJBWV9TSEFET1cgPSAweDhkYzQ7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8yRF9TSEFET1cgPSAweDhiNjI7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8zRCA9IDB4OGI1ZjtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSX0JJTkRJTkcgPSAweDg5MTk7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl9DVUJFID0gMHg4YjYwO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRVJfQ1VCRV9TSEFET1cgPSAweDhkYzU7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUyA9IDB4ODBhOTtcbmV4cG9ydCBjb25zdCBHTF9TQ0lTU09SX0JPWCA9IDB4MGMxMDtcbmV4cG9ydCBjb25zdCBHTF9TQ0lTU09SX1RFU1QgPSAweDBjMTE7XG5leHBvcnQgY29uc3QgR0xfU0VQQVJBVEVfQVRUUklCUyA9IDB4OGM4ZDtcbmV4cG9ydCBjb25zdCBHTF9TSEFERVJfVFlQRSA9IDB4OGI0ZjtcbmV4cG9ydCBjb25zdCBHTF9TSEFESU5HX0xBTkdVQUdFX1ZFUlNJT04gPSAweDhiOGM7XG5leHBvcnQgY29uc3QgR0xfU0hPUlQgPSAweDE0MDI7XG5leHBvcnQgY29uc3QgR0xfU0lHTkFMRUQgPSAweDkxMTk7XG5leHBvcnQgY29uc3QgR0xfU0lHTkVEX05PUk1BTElaRUQgPSAweDhmOWM7XG5leHBvcnQgY29uc3QgR0xfU1JDX0FMUEhBID0gMHgwMzAyO1xuZXhwb3J0IGNvbnN0IEdMX1NSQ19BTFBIQV9TQVRVUkFURSA9IDB4MDMwODtcbmV4cG9ydCBjb25zdCBHTF9TUkNfQ09MT1IgPSAweDAzMDA7XG5leHBvcnQgY29uc3QgR0xfU1JHQiA9IDB4OGM0MDtcbmV4cG9ydCBjb25zdCBHTF9TUkdCX0FMUEhBX0VYVCA9IDB4OGM0MjtcbmV4cG9ydCBjb25zdCBHTF9TUkdCX0VYVCA9IDB4OGM0MDtcbmV4cG9ydCBjb25zdCBHTF9TUkdCOCA9IDB4OGM0MTtcbmV4cG9ydCBjb25zdCBHTF9TUkdCOF9BTFBIQTggPSAweDhjNDM7XG5leHBvcnQgY29uc3QgR0xfU1JHQjhfQUxQSEE4X0VYVCA9IDB4OGM0MztcbmV4cG9ydCBjb25zdCBHTF9TVEFUSUNfQ09QWSA9IDB4ODhlNjtcbmV4cG9ydCBjb25zdCBHTF9TVEFUSUNfRFJBVyA9IDB4ODhlNDtcbmV4cG9ydCBjb25zdCBHTF9TVEFUSUNfUkVBRCA9IDB4ODhlNTtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMID0gMHgxODAyO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQVRUQUNITUVOVCA9IDB4OGQyMDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfRkFJTCA9IDB4ODgwMTtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfRlVOQyA9IDB4ODgwMDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfUEFTU19ERVBUSF9GQUlMID0gMHg4ODAyO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19QQVNTX0RFUFRIX1BBU1MgPSAweDg4MDM7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9CQUNLX1JFRiA9IDB4OGNhMztcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfVkFMVUVfTUFTSyA9IDB4OGNhNDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfV1JJVEVNQVNLID0gMHg4Y2E1O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQklUUyA9IDB4MGQ1NztcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JVRkZFUl9CSVQgPSAweDAwMDAwNDAwO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQ0xFQVJfVkFMVUUgPSAweDBiOTE7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9GQUlMID0gMHgwYjk0O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfRlVOQyA9IDB4MGI5MjtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0lOREVYID0gMHgxOTAxO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfSU5ERVg4ID0gMHg4ZDQ4O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfUEFTU19ERVBUSF9GQUlMID0gMHgwYjk1O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfUEFTU19ERVBUSF9QQVNTID0gMHgwYjk2O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfUkVGID0gMHgwYjk3O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfVEVTVCA9IDB4MGI5MDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX1ZBTFVFX01BU0sgPSAweDBiOTM7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9XUklURU1BU0sgPSAweDBiOTg7XG5leHBvcnQgY29uc3QgR0xfU1RSRUFNX0NPUFkgPSAweDg4ZTI7XG5leHBvcnQgY29uc3QgR0xfU1RSRUFNX0RSQVcgPSAweDg4ZTA7XG5leHBvcnQgY29uc3QgR0xfU1RSRUFNX1JFQUQgPSAweDg4ZTE7XG5leHBvcnQgY29uc3QgR0xfU1VCUElYRUxfQklUUyA9IDB4MGQ1MDtcbmV4cG9ydCBjb25zdCBHTF9TWU5DX0NPTkRJVElPTiA9IDB4OTExMztcbmV4cG9ydCBjb25zdCBHTF9TWU5DX0ZFTkNFID0gMHg5MTE2O1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfRkxBR1MgPSAweDkxMTU7XG5leHBvcnQgY29uc3QgR0xfU1lOQ19GTFVTSF9DT01NQU5EU19CSVQgPSAweDAwMDAwMDAxO1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfR1BVX0NPTU1BTkRTX0NPTVBMRVRFID0gMHg5MTE3O1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfU1RBVFVTID0gMHg5MTE0O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUgPSAweDE3MDI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV8yRCA9IDB4MGRlMTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFXzJEX0FSUkFZID0gMHg4YzFhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfM0QgPSAweDgwNmY7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9CQVNFX0xFVkVMID0gMHg4MTNjO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQklORElOR18yRCA9IDB4ODA2OTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0JJTkRJTkdfMkRfQVJSQVkgPSAweDhjMWQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9CSU5ESU5HXzNEID0gMHg4MDZhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQklORElOR19DVUJFX01BUCA9IDB4ODUxNDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NPTVBBUkVfRlVOQyA9IDB4ODg0ZDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NPTVBBUkVfTU9ERSA9IDB4ODg0YztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQID0gMHg4NTEzO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWCA9IDB4ODUxNjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1kgPSAweDg1MTg7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9aID0gMHg4NTFhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWCA9IDB4ODUxNTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1kgPSAweDg1MTc7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9aID0gMHg4NTE5O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfSU1NVVRBQkxFX0ZPUk1BVCA9IDB4OTEyZjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0lNTVVUQUJMRV9MRVZFTFMgPSAweDgyZGY7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NQUdfRklMVEVSID0gMHgyODAwO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUFYX0FOSVNPVFJPUFlfRVhUID0gMHg4NGZlO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUFYX0xFVkVMID0gMHg4MTNkO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUFYX0xPRCA9IDB4ODEzYjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX01JTl9GSUxURVIgPSAweDI4MDE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NSU5fTE9EID0gMHg4MTNhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfV1JBUF9SID0gMHg4MDcyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfV1JBUF9TID0gMHgyODAyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfV1JBUF9UID0gMHgyODAzO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUwID0gMHg4NGMwO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxID0gMHg4NGMxO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxMCA9IDB4ODRjYTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTEgPSAweDg0Y2I7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTEyID0gMHg4NGNjO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxMyA9IDB4ODRjZDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTQgPSAweDg0Y2U7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTE1ID0gMHg4NGNmO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxNiA9IDB4ODRkMDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTcgPSAweDg0ZDE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTE4ID0gMHg4NGQyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxOSA9IDB4ODRkMztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMiA9IDB4ODRjMjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjAgPSAweDg0ZDQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTIxID0gMHg4NGQ1O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyMiA9IDB4ODRkNjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjMgPSAweDg0ZDc7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTI0ID0gMHg4NGQ4O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyNSA9IDB4ODRkOTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjYgPSAweDg0ZGE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTI3ID0gMHg4NGRiO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyOCA9IDB4ODRkYztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjkgPSAweDg0ZGQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTMgPSAweDg0YzM7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTMwID0gMHg4NGRlO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUzMSA9IDB4ODRkZjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNCA9IDB4ODRjNDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNSA9IDB4ODRjNTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNiA9IDB4ODRjNjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNyA9IDB4ODRjNztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFOCA9IDB4ODRjODtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFOSA9IDB4ODRjOTtcbmV4cG9ydCBjb25zdCBHTF9USU1FX0VMQVBTRURfRVhUID0gMHg4OGJmO1xuZXhwb3J0IGNvbnN0IEdMX1RJTUVPVVRfRVhQSVJFRCA9IDB4OTExYjtcbmV4cG9ydCBjb25zdCBHTF9USU1FT1VUX0lHTk9SRUQgPSAtMTtcbmV4cG9ydCBjb25zdCBHTF9USU1FU1RBTVBfRVhUID0gMHg4ZTI4O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDSyA9IDB4OGUyMjtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfQUNUSVZFID0gMHg4ZTI0O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CSU5ESU5HID0gMHg4ZTI1O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CVUZGRVIgPSAweDhjOGU7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUl9CSU5ESU5HID0gMHg4YzhmO1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CVUZGRVJfTU9ERSA9IDB4OGM3ZjtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfQlVGRkVSX1NJWkUgPSAweDhjODU7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUl9TVEFSVCA9IDB4OGM4NDtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfUEFVU0VEID0gMHg4ZTIzO1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19QUklNSVRJVkVTX1dSSVRURU4gPSAweDhjODg7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX1ZBUllJTkdTID0gMHg4YzgzO1xuZXhwb3J0IGNvbnN0IEdMX1RSSUFOR0xFX0ZBTiA9IDB4MDAwNjtcbmV4cG9ydCBjb25zdCBHTF9UUklBTkdMRV9TVFJJUCA9IDB4MDAwNTtcbmV4cG9ydCBjb25zdCBHTF9UUklBTkdMRVMgPSAweDAwMDQ7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9BUlJBWV9TVFJJREUgPSAweDhhM2M7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19BQ1RJVkVfVU5JRk9STV9JTkRJQ0VTID0gMHg4YTQzO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfQUNUSVZFX1VOSUZPUk1TID0gMHg4YTQyO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfQklORElORyA9IDB4OGEzZjtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JMT0NLX0RBVEFfU0laRSA9IDB4OGE0MDtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JMT0NLX0lOREVYID0gMHg4YTNhO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfUkVGRVJFTkNFRF9CWV9GUkFHTUVOVF9TSEFERVIgPSAweDhhNDY7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19SRUZFUkVOQ0VEX0JZX1ZFUlRFWF9TSEFERVIgPSAweDhhNDQ7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVIgPSAweDhhMTE7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVJfQklORElORyA9IDB4OGEyODtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JVRkZFUl9PRkZTRVRfQUxJR05NRU5UID0gMHg4YTM0O1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQlVGRkVSX1NJWkUgPSAweDhhMmE7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVJfU1RBUlQgPSAweDhhMjk7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9JU19ST1dfTUFKT1IgPSAweDhhM2U7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9NQVRSSVhfU1RSSURFID0gMHg4YTNkO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fT0ZGU0VUID0gMHg4YTNiO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fU0laRSA9IDB4OGEzODtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX1RZUEUgPSAweDhhMzc7XG5leHBvcnQgY29uc3QgR0xfVU5NQVNLRURfUkVOREVSRVJfV0VCR0wgPSAweDkyNDY7XG5leHBvcnQgY29uc3QgR0xfVU5NQVNLRURfVkVORE9SX1dFQkdMID0gMHg5MjQ1O1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19BTElHTk1FTlQgPSAweDBjZjU7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX0NPTE9SU1BBQ0VfQ09OVkVSU0lPTl9XRUJHTCA9IDB4OTI0MztcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfRkxJUF9ZX1dFQkdMID0gMHg5MjQwO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19JTUFHRV9IRUlHSFQgPSAweDgwNmU7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX1BSRU1VTFRJUExZX0FMUEhBX1dFQkdMID0gMHg5MjQxO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19ST1dfTEVOR1RIID0gMHgwY2YyO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19TS0lQX0lNQUdFUyA9IDB4ODA2ZDtcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfU0tJUF9QSVhFTFMgPSAweDBjZjQ7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX1NLSVBfUk9XUyA9IDB4MGNmMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05BTEVEID0gMHg5MTE4O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0JZVEUgPSAweDE0MDE7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UID0gMHgxNDA1O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF8xMEZfMTFGXzExRl9SRVYgPSAweDhjM2I7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzJfMTBfMTBfMTBfUkVWID0gMHg4MzY4O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF8yNF84ID0gMHg4NGZhO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF8yNF84X1dFQkdMID0gMHg4NGZhO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF81XzlfOV85X1JFViA9IDB4OGMzZTtcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl8yRCA9IDB4OGRkMjtcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRkNztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl8zRCA9IDB4OGRkMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl9DVUJFID0gMHg4ZGQ0O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9WRUMyID0gMHg4ZGM2O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9WRUMzID0gMHg4ZGM3O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9WRUM0ID0gMHg4ZGM4O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX05PUk1BTElaRUQgPSAweDhjMTc7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfTk9STUFMSVpFRF9FWFQgPSAweDhjMTc7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfU0hPUlQgPSAweDE0MDM7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfU0hPUlRfNF80XzRfNCA9IDB4ODAzMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9TSE9SVF81XzVfNV8xID0gMHg4MDM0O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX1NIT1JUXzVfNl81ID0gMHg4MzYzO1xuZXhwb3J0IGNvbnN0IEdMX1ZBTElEQVRFX1NUQVRVUyA9IDB4OGI4MztcbmV4cG9ydCBjb25zdCBHTF9WRU5ET1IgPSAweDFmMDA7XG5leHBvcnQgY29uc3QgR0xfVkVSU0lPTiA9IDB4MWYwMjtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVJSQVlfQklORElORyA9IDB4ODViNTtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVJSQVlfQklORElOR19PRVMgPSAweDg1YjU7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9CVUZGRVJfQklORElORyA9IDB4ODg5ZjtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX0RJVklTT1IgPSAweDg4ZmU7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9ESVZJU09SX0FOR0xFID0gMHg4OGZlO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfRU5BQkxFRCA9IDB4ODYyMjtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX0lOVEVHRVIgPSAweDg4ZmQ7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9OT1JNQUxJWkVEID0gMHg4ODZhO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfUE9JTlRFUiA9IDB4ODY0NTtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX1NJWkUgPSAweDg2MjM7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9TVFJJREUgPSAweDg2MjQ7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9UWVBFID0gMHg4NjI1O1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9TSEFERVIgPSAweDhiMzE7XG5leHBvcnQgY29uc3QgR0xfVklFV1BPUlQgPSAweDBiYTI7XG5leHBvcnQgY29uc3QgR0xfV0FJVF9GQUlMRUQgPSAweDkxMWQ7XG5leHBvcnQgY29uc3QgR0xfWkVSTyA9IDA7XG4iLCJleHBvcnQgY2xhc3MgQmluZEhlbHBlcjxUVmFsdWU+IHtcbiAgcHJpdmF0ZSBfX3ByZXY6IFRWYWx1ZTtcbiAgcHJpdmF0ZSBfX2JpbmRlcjogKCB2YWx1ZTogVFZhbHVlICkgPT4gdm9pZDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoIGluaXQ6IFRWYWx1ZSwgYmluZGVyOiAoIHZhbHVlOiBUVmFsdWUgKSA9PiB2b2lkICkge1xuICAgIHRoaXMuX19wcmV2ID0gaW5pdDtcbiAgICB0aGlzLl9fYmluZGVyID0gYmluZGVyO1xuICB9XG5cbiAgcHVibGljIGJpbmQ8VD4oXG4gICAgdmFsdWU6IFRWYWx1ZSxcbiAgICBjYWxsYmFjaz86ICggdmFsdWU6IFRWYWx1ZSApID0+IFRcbiAgKTogVCB7XG4gICAgY29uc3QgcHJldiA9IHRoaXMuX19wcmV2O1xuICAgIGlmICggdmFsdWUgIT09IHByZXYgKSB7XG4gICAgICB0aGlzLl9fYmluZGVyKCB2YWx1ZSApO1xuICAgICAgdGhpcy5fX3ByZXYgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoIGNhbGxiYWNrICkge1xuICAgICAgY29uc3QgcmV0ID0gY2FsbGJhY2soIHZhbHVlICk7XG4gICAgICB0aGlzLmJpbmQoIHByZXYgKTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQgYXMgYW55O1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xfQVJSQVlfQlVGRkVSLCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiwgR0xfU1RBVElDX0RSQVcgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xCdWZmZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdEJ1ZmZlcjxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19idWZmZXI6IFdlYkdMQnVmZmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgYnVmZmVyKCk6IFdlYkdMQnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2J1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRCdWZmZXIuYnVmZmVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTEJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19idWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0QnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBidWZmZXI6IFdlYkdMQnVmZmVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19idWZmZXIgPSBidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZUJ1ZmZlciggdGhpcy5fX2J1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIHNldFZlcnRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEFycmF5QnVmZmVyIHwgQXJyYXlCdWZmZXJWaWV3IHwgbnVsbCxcbiAgICB1c2FnZTogbnVtYmVyID0gR0xfU1RBVElDX0RSQVdcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRWZXJ0ZXhCdWZmZXIoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLmJ1ZmZlckRhdGEoIEdMX0FSUkFZX0JVRkZFUiwgc291cmNlLCB1c2FnZSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbmV3IGluZGV4IGRhdGEgaW50byB0aGlzIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBzZXRJbmRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEFycmF5QnVmZmVyIHwgQXJyYXlCdWZmZXJWaWV3IHwgbnVsbCxcbiAgICB1c2FnZTogbnVtYmVyID0gR0xfU1RBVElDX0RSQVdcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRJbmRleEJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuYnVmZmVyRGF0YSggR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHNvdXJjZSwgdXNhZ2UgKTtcbiAgICB9ICk7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBHTENhdEVycm9ycyA9IHtcbiAgZ2V0IFVuZXhwZWN0ZWROdWxsRXJyb3IoKTogRXJyb3Ige1xuICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCAnR0xDYXQ6IFVuZXhwZWN0ZWQgbnVsbCBkZXRlY3RlZCcgKTtcbiAgICBlcnJvci5uYW1lID0gJ1VuZXhwZWN0ZWROdWxsRXJyb3InO1xuICAgIHJldHVybiBlcnJvcjtcbiAgfSxcbiAgZ2V0IFdlYkdMMkV4Y2x1c2l2ZUVycm9yKCk6IEVycm9yIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvciggJ0dMQ2F0OiBBdHRlbXB0ZWQgdG8gdXNlIFdlYkdMMiBleGNsdXNpdmUgc3R1ZmYnICk7XG4gICAgZXJyb3IubmFtZSA9ICdXZWJHTDJFeGNsdXNpdmVFcnJvcic7XG4gICAgcmV0dXJuIGVycm9yO1xuICB9XG59O1xuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHsgR0xfQ09MT1JfQVRUQUNITUVOVDAsIEdMX0RFUFRIX0FUVEFDSE1FTlQsIEdMX0ZSQU1FQlVGRkVSLCBHTF9SRU5ERVJCVUZGRVIsIEdMX1RFWFRVUkVfMkQgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcbmltcG9ydCB0eXBlIHsgR0xDYXRSZW5kZXJidWZmZXIgfSBmcm9tICcuL0dMQ2F0UmVuZGVyYnVmZmVyJztcbmltcG9ydCB0eXBlIHsgR0xDYXRUZXh0dXJlIH0gZnJvbSAnLi9HTENhdFRleHR1cmUnO1xuXG4vKipcbiAqIEl0J3MgYSBXZWJHTEZyYW1lYnVmZmVyLlxuICovXG5leHBvcnQgY2xhc3MgR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19mcmFtZWJ1ZmZlcjogV2ViR0xGcmFtZWJ1ZmZlcjtcbiAgcHJpdmF0ZSBfX3JlbmRlcmJ1ZmZlck1hcCA9IG5ldyBNYXA8R0xlbnVtLCBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4+KCk7XG4gIHByaXZhdGUgX190ZXh0dXJlTWFwID0gbmV3IE1hcDxHTGVudW0sIEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4+KCk7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gZnJhbWVidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGZyYW1lYnVmZmVyKCk6IFdlYkdMRnJhbWVidWZmZXIge1xuICAgIHJldHVybiB0aGlzLl9fZnJhbWVidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biBmcmFtZWJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRGcmFtZWJ1ZmZlci5mcmFtZWJ1ZmZlcl1dXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTEZyYW1lYnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2ZyYW1lYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBhdHRhY2hlZCByZW5kZXJidWZmZXIuXG4gICAqIElmIHlvdSB3YW50IHRvIGdyYWIgb3RoZXIgdGhhbiBgREVQVEhfQVRUQUNITUVOVGAsIHRyeSBbW0dMQ2F0RnJhbWVidWZmZXIuZ2V0UmVuZGVyYnVmZmVyXV0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmVuZGVyYnVmZmVyKCk6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLmdldCggR0xfREVQVEhfQVRUQUNITUVOVCApID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGF0dGFjaGVkIHRleHR1cmUuXG4gICAqIElmIHlvdSB3YW50IHRvIGdyYWIgb3RoZXIgdGhhbiBgQ09MT1JfQVRUQUNITUVOVDBgLCB0cnkgW1tHTENhdEZyYW1lYnVmZmVyLmdldFRleHR1cmVdXSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIGdldCB0ZXh0dXJlKCk6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fX3RleHR1cmVNYXAuZ2V0KCBHTF9DT0xPUl9BVFRBQ0hNRU5UMCApID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0RnJhbWVidWZmZXIgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIGZyYW1lYnVmZmVyOiBXZWJHTEZyYW1lYnVmZmVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19mcmFtZWJ1ZmZlciA9IGZyYW1lYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoIGFsc29BdHRhY2hlZCA9IGZhbHNlICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGdsLmRlbGV0ZUZyYW1lYnVmZmVyKCB0aGlzLl9fZnJhbWVidWZmZXIgKTtcblxuICAgIGlmICggYWxzb0F0dGFjaGVkICkge1xuICAgICAgZm9yICggY29uc3QgcmVuZGVyYnVmZmVyIG9mIHRoaXMuX19yZW5kZXJidWZmZXJNYXAudmFsdWVzKCkgKSB7XG4gICAgICAgIGdsLmRlbGV0ZVJlbmRlcmJ1ZmZlciggcmVuZGVyYnVmZmVyLnJhdyApO1xuICAgICAgfVxuXG4gICAgICBmb3IgKCBjb25zdCB0ZXh0dXJlIG9mIHRoaXMuX190ZXh0dXJlTWFwLnZhbHVlcygpICkge1xuICAgICAgICBnbC5kZWxldGVUZXh0dXJlKCB0ZXh0dXJlLnJhdyApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBpdHMgYXR0YWNoZWQgcmVuZGVyYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGdldFJlbmRlcmJ1ZmZlciggYXR0YWNobWVudCA9IEdMX0RFUFRIX0FUVEFDSE1FTlQgKTogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX19yZW5kZXJidWZmZXJNYXAuZ2V0KCBhdHRhY2htZW50ICkgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBpdHMgYXR0YWNoZWQgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBnZXRUZXh0dXJlKCBhdHRhY2htZW50ID0gR0xfQ09MT1JfQVRUQUNITUVOVDAgKTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9fdGV4dHVyZU1hcC5nZXQoIGF0dGFjaG1lbnQgKSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIHJlbmRlcmJ1ZmZlciB0byB0aGlzIGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGF0dGFjaFJlbmRlcmJ1ZmZlcihcbiAgICByZW5kZXJidWZmZXI6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PixcbiAgICB7XG4gICAgICBhdHRhY2htZW50ID0gR0xfREVQVEhfQVRUQUNITUVOVFxuICAgIH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZEZyYW1lYnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5mcmFtZWJ1ZmZlclJlbmRlcmJ1ZmZlciggR0xfRlJBTUVCVUZGRVIsIGF0dGFjaG1lbnQsIEdMX1JFTkRFUkJVRkZFUiwgcmVuZGVyYnVmZmVyLnJhdyApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX19yZW5kZXJidWZmZXJNYXAuc2V0KCBhdHRhY2htZW50LCByZW5kZXJidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSB0ZXh0dXJlIHRvIHRoaXMgZnJhbWVidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgYXR0YWNoVGV4dHVyZShcbiAgICB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+LFxuICAgIHtcbiAgICAgIGxldmVsID0gMCxcbiAgICAgIGF0dGFjaG1lbnQgPSBHTF9DT0xPUl9BVFRBQ0hNRU5UMFxuICAgIH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZEZyYW1lYnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5mcmFtZWJ1ZmZlclRleHR1cmUyRCggR0xfRlJBTUVCVUZGRVIsIGF0dGFjaG1lbnQsIEdMX1RFWFRVUkVfMkQsIHRleHR1cmUucmF3LCBsZXZlbCApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX190ZXh0dXJlTWFwLnNldCggYXR0YWNobWVudCwgdGV4dHVyZSApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBHTF9DT01QTEVUSU9OX1NUQVRVU19LSFIsIEdMX0ZMT0FULCBHTF9MSU5LX1NUQVRVUywgR0xfVEVYVFVSRTAgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcbmltcG9ydCB0eXBlIHsgR0xDYXRCdWZmZXIgfSBmcm9tICcuL0dMQ2F0QnVmZmVyJztcbmltcG9ydCB0eXBlIHsgR0xDYXRTaGFkZXIgfSBmcm9tICcuL0dMQ2F0U2hhZGVyJztcbmltcG9ydCB0eXBlIHsgR0xDYXRUZXh0dXJlIH0gZnJvbSAnLi9HTENhdFRleHR1cmUnO1xuXG5leHBvcnQgdHlwZSBHTENhdFByb2dyYW1Vbmlmb3JtVHlwZSA9XG4gICcxZicgfCAnMmYnIHwgJzNmJyB8ICc0ZicgfFxuICAnMWknIHwgJzJpJyB8ICczaScgfCAnNGknIHxcbiAgJzFmdicgfCAnMmZ2JyB8ICczZnYnIHwgJzRmdicgfFxuICAnMWl2JyB8ICcyaXYnIHwgJzNpdicgfCAnNGl2JyB8XG4gICdNYXRyaXgyZnYnIHwgJ01hdHJpeDNmdicgfCAnTWF0cml4NGZ2JztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xQcm9ncmFtLCBidXQgaGFzIGNhY2hlIG9mIHZhcmlhYmxlIGxvY2F0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0UHJvZ3JhbTxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19wcm9ncmFtOiBXZWJHTFByb2dyYW07XG4gIHByaXZhdGUgX19zaGFkZXJzOiBHTENhdFNoYWRlcjxUQ29udGV4dD5bXSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9fYXR0cmliTG9jYXRpb25DYWNoZTogeyBbIG5hbWU6IHN0cmluZyBdOiBudW1iZXIgfSA9IHt9O1xuICBwcml2YXRlIF9fdW5pZm9ybUxvY2F0aW9uQ2FjaGU6IHsgWyBuYW1lOiBzdHJpbmcgXTogV2ViR0xVbmlmb3JtTG9jYXRpb24gfCBudWxsIH0gPSB7fTtcbiAgcHJpdmF0ZSBfX3VuaWZvcm1UZXh0dXJlVW5pdE1hcDogeyBbIG5hbWU6IHN0cmluZyBdOiBudW1iZXIgfSA9IHt9O1xuICBwcml2YXRlIF9fdW5pZm9ybXRleHR1cmVVbml0SW5kZXggPSAwO1xuICBwcml2YXRlIF9fbGlua2VkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcHJvZ3JhbS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcHJvZ3JhbSgpOiBXZWJHTFByb2dyYW0ge1xuICAgIHJldHVybiB0aGlzLl9fcHJvZ3JhbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIHByb2dyYW0uIFNob3J0ZXIgdGhhbiBbW0dMQ2F0UHJvZ3JhbS5wcm9ncmFtXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTFByb2dyYW0ge1xuICAgIHJldHVybiB0aGlzLl9fcHJvZ3JhbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgc2hhZGVycy5cbiAgICovXG4gIHB1YmxpYyBnZXQgc2hhZGVycygpOiBHTENhdFNoYWRlcjxUQ29udGV4dD5bXSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9fc2hhZGVycyA/IHRoaXMuX19zaGFkZXJzLmNvbmNhdCgpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBsYXN0IGxpbmsgb3BlcmF0aW9uIHdhcyBzdWNjZXNzZnVsIG9yIG5vdC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaXNMaW5rZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX19saW5rZWQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0UHJvZ3JhbSBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PiwgcHJvZ3JhbTogV2ViR0xQcm9ncmFtICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19wcm9ncmFtID0gcHJvZ3JhbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSBwcm9ncmFtLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoIGFsc29BdHRhY2hlZCA9IGZhbHNlICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGdsLmRlbGV0ZVByb2dyYW0oIHRoaXMuX19wcm9ncmFtICk7XG5cbiAgICBpZiAoIGFsc29BdHRhY2hlZCApIHtcbiAgICAgIGNvbnN0IHNoYWRlcnMgPSB0aGlzLnNoYWRlcnM7XG4gICAgICBpZiAoIHNoYWRlcnMgKSB7XG4gICAgICAgIHNoYWRlcnMuZm9yRWFjaCggKCBzaGFkZXIgKSA9PiB7XG4gICAgICAgICAgc2hhZGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgfSApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggc2hhZGVycyBhbmQgbGluayB0aGlzIHByb2dyYW0uXG4gICAqL1xuICBwdWJsaWMgbGluayggLi4uc2hhZGVyczogR0xDYXRTaGFkZXI8VENvbnRleHQ+W10gKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgc2hhZGVycy5mb3JFYWNoKCAoIHNoYWRlciApID0+IGdsLmF0dGFjaFNoYWRlciggdGhpcy5fX3Byb2dyYW0sIHNoYWRlci5yYXcgKSApO1xuICAgIGdsLmxpbmtQcm9ncmFtKCB0aGlzLl9fcHJvZ3JhbSApO1xuXG4gICAgdGhpcy5fX2xpbmtlZCA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIoIHRoaXMuX19wcm9ncmFtLCBHTF9MSU5LX1NUQVRVUyApO1xuICAgIGlmICggIXRoaXMuX19saW5rZWQgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoIGdsLmdldFByb2dyYW1JbmZvTG9nKCB0aGlzLl9fcHJvZ3JhbSApISApO1xuICAgIH1cblxuICAgIHRoaXMuX19zaGFkZXJzID0gc2hhZGVycy5jb25jYXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggc2hhZGVycyBhbmQgbGluayB0aGlzIHByb2dyYW0uXG4gICAqIEl0J3MgZ29ubmEgYmUgYXN5bmNocm9ub3VzIGlmIHlvdSBoYXZlIHRoZSBLSFJfcGFyYWxsZWxfc2hhZGVyX2NvbXBpbGUgZXh0ZW5zaW9uIHN1cHBvcnQuXG4gICAqL1xuICBwdWJsaWMgbGlua0FzeW5jKCAuLi5zaGFkZXJzOiBHTENhdFNoYWRlcjxUQ29udGV4dD5bXSApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBnbENhdCA9IHRoaXMuX19nbENhdDtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG4gICAgY29uc3QgZXh0UGFyYWxsZWwgPSBnbENhdC5nZXRFeHRlbnNpb24oICdLSFJfcGFyYWxsZWxfc2hhZGVyX2NvbXBpbGUnICk7XG5cbiAgICBzaGFkZXJzLmZvckVhY2goICggc2hhZGVyICkgPT4gZ2wuYXR0YWNoU2hhZGVyKCB0aGlzLl9fcHJvZ3JhbSwgc2hhZGVyLnJhdyApICk7XG4gICAgZ2wubGlua1Byb2dyYW0oIHRoaXMuX19wcm9ncmFtICk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgPT4ge1xuICAgICAgY29uc3QgdXBkYXRlID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWV4dFBhcmFsbGVsIHx8XG4gICAgICAgICAgZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlciggdGhpcy5fX3Byb2dyYW0sIEdMX0NPTVBMRVRJT05fU1RBVFVTX0tIUiApID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuX19saW5rZWQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKCB0aGlzLl9fcHJvZ3JhbSwgR0xfTElOS19TVEFUVVMgKTtcbiAgICAgICAgICBpZiAoICF0aGlzLl9fbGlua2VkICkge1xuICAgICAgICAgICAgcmVqZWN0KCBuZXcgRXJyb3IoIGdsLmdldFByb2dyYW1JbmZvTG9nKCB0aGlzLl9fcHJvZ3JhbSApID8/ICdudWxsJyApICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fX3NoYWRlcnMgPSBzaGFkZXJzLmNvbmNhdCgpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHVwZGF0ZSApO1xuICAgICAgfTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gYXR0cmlidXRlIHZhcmlhYmxlLlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdmFyaWFibGVcbiAgICogQHBhcmFtIGJ1ZmZlciBWZXJ0ZXggYnVmZmVyLiBDYW4gYmUgbnVsbCwgdG8gZGlzYWJsZSBhdHRyaWJ1dGUgYXJyYXlcbiAgICogQHBhcmFtIHNpemUgTnVtYmVyIG9mIGNvbXBvbmVudHMgcGVyIHZlcnRleC4gTXVzdCBiZSAxLCAyLCAzIG9yIDRcbiAgICovXG4gIHB1YmxpYyBhdHRyaWJ1dGUoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGJ1ZmZlcjogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBzaXplID0gMSxcbiAgICBkaXZpc29yID0gMCxcbiAgICB0eXBlOiBudW1iZXIgPSBHTF9GTE9BVCxcbiAgICBzdHJpZGUgPSAwLFxuICAgIG9mZnNldCA9IDBcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKCBuYW1lICk7XG4gICAgaWYgKCBsb2NhdGlvbiA9PT0gLTEgKSB7IHJldHVybjsgfVxuXG4gICAgaWYgKCBidWZmZXIgPT09IG51bGwgKSB7XG4gICAgICBnbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkoIGxvY2F0aW9uICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRWZXJ0ZXhCdWZmZXIoIGJ1ZmZlciwgKCkgPT4ge1xuICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoIGxvY2F0aW9uICk7XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKCBsb2NhdGlvbiwgc2l6ZSwgdHlwZSwgZmFsc2UsIHN0cmlkZSwgb2Zmc2V0ICk7XG5cbiAgICAgIGlmICggV2ViR0wyUmVuZGVyaW5nQ29udGV4dCAmJiBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICAgIGdsLnZlcnRleEF0dHJpYkRpdmlzb3IoIGxvY2F0aW9uLCBkaXZpc29yICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBleHQgPSB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnQU5HTEVfaW5zdGFuY2VkX2FycmF5cycgKTtcbiAgICAgICAgaWYgKCBleHQgKSB7XG4gICAgICAgICAgZXh0LnZlcnRleEF0dHJpYkRpdmlzb3JBTkdMRSggbG9jYXRpb24sIGRpdmlzb3IgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybSB2YXJpYWJsZS5cbiAgICogU2VlIGFsc286IFtbR0xDYXRQcm9ncmFtLnVuaWZvcm1WZWN0b3JdXVxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0oIG5hbWU6IHN0cmluZywgdHlwZTogR0xDYXRQcm9ncmFtVW5pZm9ybVR5cGUsIC4uLnZhbHVlOiBudW1iZXJbXSApOiB2b2lkIHtcbiAgICBjb25zdCBmdW5jID0gKCB0aGlzIGFzIGFueSApWyAndW5pZm9ybScgKyB0eXBlIF07XG4gICAgZnVuYy5jYWxsKCB0aGlzLCBuYW1lLCAuLi52YWx1ZSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtIHZhcmlhYmxlLlxuICAgKiBTZWUgYWxzbzogW1tHTENhdFByb2dyYW0udW5pZm9ybV1dXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybVZlY3RvcihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgdHlwZTogR0xDYXRQcm9ncmFtVW5pZm9ybVR5cGUsXG4gICAgdmFsdWU6IEZsb2F0MzJMaXN0IHwgSW50MzJMaXN0XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bmMgPSAoIHRoaXMgYXMgYW55IClbICd1bmlmb3JtJyArIHR5cGUgXTtcbiAgICBmdW5jLmNhbGwoIHRoaXMsIG5hbWUsIHZhbHVlICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0xaSB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMWkoIG5hbWU6IHN0cmluZywgdmFsdWU6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xaSggbG9jYXRpb24sIHZhbHVlICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMmkgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTJpKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTJpKCBsb2NhdGlvbiwgeCwgeSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTNpIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0zaSggbmFtZTogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTNpKCBsb2NhdGlvbiwgeCwgeSwgeiApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTRpIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm00aSggbmFtZTogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLCB3OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtNGkoIGxvY2F0aW9uLCB4LCB5LCB6LCB3ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMWl2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0xaXYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEludDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xaXYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTJpdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMml2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBJbnQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMml2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0zaXYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTNpdiggbmFtZTogc3RyaW5nLCBhcnJheTogSW50MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTNpdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtNGl2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm00aXYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEludDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm00aXYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTFmIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0xZiggbmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFmKCBsb2NhdGlvbiwgdmFsdWUgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0yZiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMmYoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMmYoIGxvY2F0aW9uLCB4LCB5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtM2YgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTNmKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtM2YoIGxvY2F0aW9uLCB4LCB5LCB6ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtNGYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTRmKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm00ZiggbG9jYXRpb24sIHgsIHksIHosIHcgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0xZnYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTFmdiggbmFtZTogc3RyaW5nLCBhcnJheTogRmxvYXQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMWZ2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0yZnYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTJmdiggbmFtZTogc3RyaW5nLCBhcnJheTogRmxvYXQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMmZ2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0zZnYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTNmdiggbmFtZTogc3RyaW5nLCBhcnJheTogRmxvYXQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtM2Z2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm00ZnYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTRmdiggbmFtZTogc3RyaW5nLCBhcnJheTogRmxvYXQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtNGZ2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm1NYXRyaXgyZnYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybU1hdHJpeDJmdiggbmFtZTogc3RyaW5nLCBhcnJheTogRmxvYXQzMkxpc3QsIHRyYW5zcG9zZSA9IGZhbHNlICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybU1hdHJpeDJmdiggbG9jYXRpb24sIHRyYW5zcG9zZSwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm1NYXRyaXgzZnYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybU1hdHJpeDNmdiggbmFtZTogc3RyaW5nLCBhcnJheTogRmxvYXQzMkxpc3QsIHRyYW5zcG9zZSA9IGZhbHNlICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybU1hdHJpeDNmdiggbG9jYXRpb24sIHRyYW5zcG9zZSwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm1NYXRyaXg0ZnYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybU1hdHJpeDRmdiggbmFtZTogc3RyaW5nLCBhcnJheTogRmxvYXQzMkxpc3QsIHRyYW5zcG9zZSA9IGZhbHNlICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdiggbG9jYXRpb24sIHRyYW5zcG9zZSwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGEgYHNhbXBsZXIyRGAgdHlwZSB1bmlmb3JtIHRleHR1cmUuXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIHVuaWZvcm0gdGV4dHVyZVxuICAgKiBAcGFyYW0gdGV4dHVyZSBUZXh0dXJlIG9iamVjdFxuICAgKi9cbiAgcHVibGljIHVuaWZvcm1UZXh0dXJlKCBuYW1lOiBzdHJpbmcsIHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICBjb25zdCB1bml0ID0gdGhpcy5nZXRVbmlmb3JtVGV4dHVyZVVuaXQoIG5hbWUgKTtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKCBHTF9URVhUVVJFMCArIHVuaXQgKTtcbiAgICB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGV4dHVyZSA/PyBudWxsICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xaSggbG9jYXRpb24sIHVuaXQgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGEgYHNhbXBsZXJDdWJlYCB0eXBlIHVuaWZvcm0gdGV4dHVyZS5cbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgdW5pZm9ybSB0ZXh0dXJlXG4gICAqIEBwYXJhbSB0ZXh0dXJlIFRleHR1cmUgb2JqZWN0XG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybUN1YmVtYXAoIG5hbWU6IHN0cmluZywgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIGNvbnN0IHVuaXQgPSB0aGlzLmdldFVuaWZvcm1UZXh0dXJlVW5pdCggbmFtZSApO1xuICAgIGdsLmFjdGl2ZVRleHR1cmUoIEdMX1RFWFRVUkUwICsgdW5pdCApO1xuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZUN1YmVNYXAoIHRleHR1cmUgPz8gbnVsbCApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMWkoIGxvY2F0aW9uLCB1bml0ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIGF0dHJpYnV0ZSBsb2NhdGlvbi5cbiAgICovXG4gIHB1YmxpYyBnZXRBdHRyaWJMb2NhdGlvbiggbmFtZTogc3RyaW5nICk6IG51bWJlciB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgaWYgKCB0aGlzLl9fYXR0cmliTG9jYXRpb25DYWNoZVsgbmFtZSBdICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX2F0dHJpYkxvY2F0aW9uQ2FjaGVbIG5hbWUgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbiggdGhpcy5fX3Byb2dyYW0sIG5hbWUgKTtcbiAgICAgIC8vIGlmICggbG9jYXRpb24gPT09IC0xICkge1xuICAgICAgLy8gICB0aGlzLmdsQ2F0LnNwaXQoICdHTENhdFByb2dyYW0uZ2V0QXR0cmliTG9jYXRpb246IENvdWxkIG5vdCByZXRyaWV2ZSBhdHRyaWJ1dGUgbG9jYXRpb24nICk7XG4gICAgICAvLyAgIHJldHVybiAtMTtcbiAgICAgIC8vIH1cbiAgICAgIHRoaXMuX19hdHRyaWJMb2NhdGlvbkNhY2hlWyBuYW1lIF0gPSBsb2NhdGlvbjtcbiAgICAgIHJldHVybiBsb2NhdGlvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgdW5pZm9ybSBsb2NhdGlvbi5cbiAgICovXG4gIHB1YmxpYyBnZXRVbmlmb3JtTG9jYXRpb24oIG5hbWU6IHN0cmluZyApOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB8IG51bGwge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGlmICggdGhpcy5fX3VuaWZvcm1Mb2NhdGlvbkNhY2hlWyBuYW1lIF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fdW5pZm9ybUxvY2F0aW9uQ2FjaGVbIG5hbWUgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oIHRoaXMuX19wcm9ncmFtLCBuYW1lICk7XG4gICAgICAvLyBpZiAoIGxvY2F0aW9uID09PSBudWxsICkge1xuICAgICAgLy8gICB0aGlzLmdsQ2F0LnNwaXQoICdHTENhdFByb2dyYW0uZ2V0VW5pZm9ybUxvY2F0aW9uOiBDb3VsZCBub3QgcmV0cmlldmUgdW5pZm9ybSBsb2NhdGlvbicgKTtcbiAgICAgIC8vICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgICAgLy8gfVxuICAgICAgdGhpcy5fX3VuaWZvcm1Mb2NhdGlvbkNhY2hlWyBuYW1lIF0gPSBsb2NhdGlvbjtcbiAgICAgIHJldHVybiBsb2NhdGlvbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgb3IgY3JlYXRlIGEgdGV4dHVyZSB1bml0IHRoYXQgY29ycmVzcG9uZHMgdG8gZ2l2ZW4gbmFtZS5cbiAgICovXG4gIHB1YmxpYyBnZXRVbmlmb3JtVGV4dHVyZVVuaXQoIG5hbWU6IHN0cmluZyApOiBudW1iZXIge1xuICAgIGlmICggdGhpcy5fX3VuaWZvcm1UZXh0dXJlVW5pdE1hcFsgbmFtZSBdID09PSB1bmRlZmluZWQgKSB7XG4gICAgICB0aGlzLl9fdW5pZm9ybVRleHR1cmVVbml0TWFwWyBuYW1lIF0gPSB0aGlzLl9fdW5pZm9ybXRleHR1cmVVbml0SW5kZXg7XG4gICAgICB0aGlzLl9fdW5pZm9ybXRleHR1cmVVbml0SW5kZXggKys7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX191bmlmb3JtVGV4dHVyZVVuaXRNYXBbIG5hbWUgXTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBHTENhdCB9IGZyb20gJy4vR0xDYXQnO1xuaW1wb3J0IHsgR0xDYXRFcnJvcnMgfSBmcm9tICcuL0dMQ2F0RXJyb3JzJztcbmltcG9ydCB7IEdMX1JFTkRFUkJVRkZFUiB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuXG4vKipcbiAqIEl0J3MgYSBXZWJHTFJlbmRlcmJ1ZmZlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3JlbmRlcmJ1ZmZlcjogV2ViR0xSZW5kZXJidWZmZXI7XG4gIHByaXZhdGUgX193aWR0aCA9IDA7XG4gIHByaXZhdGUgX19oZWlnaHQgPSAwO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmVuZGVyYnVmZmVyKCk6IFdlYkdMUmVuZGVyYnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3JlbmRlcmJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIHJlbmRlcmJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRSZW5kZXJCdWZmZXIucmVuZGVyYnVmZmVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTFJlbmRlcmJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19yZW5kZXJidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogSXRzIHdpZHRoLlxuICAgKi9cbiAgcHVibGljIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9fd2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGhlaWdodC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX19oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0VGV4dHVyZSBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PiwgcmVuZGVyYnVmZmVyOiBXZWJHTFJlbmRlcmJ1ZmZlciApIHtcbiAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcbiAgICB0aGlzLl9fcmVuZGVyYnVmZmVyID0gcmVuZGVyYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX19nbENhdC5nbC5kZWxldGVSZW5kZXJidWZmZXIoIHRoaXMuX19yZW5kZXJidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoaXMgcmVuZGVyYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIHJlbmRlcmJ1ZmZlclN0b3JhZ2UoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB7IGZvcm1hdCA9IHRoaXMuX19nbENhdC5wcmVmZXJyZWREZXB0aEZvcm1hdCB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRSZW5kZXJidWZmZXIoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnJlbmRlcmJ1ZmZlclN0b3JhZ2UoIEdMX1JFTkRFUkJVRkZFUiwgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgfSApO1xuXG4gICAgdGhpcy5fX3dpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5fX2hlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoaXMgcmVuZGVyYnVmZmVyIHdpdGggbXVsdGlzYW1wbGUgZW5hYmxlZC5cbiAgICogSWYgeW91IGFyZSB1c2luZyBXZWJHTDEsIGl0IHdpbGwgZmFsbGJhY2sgdG8gbm9uIG11bHRpc2FtcGxlIG9uZSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHJlbmRlcmJ1ZmZlclN0b3JhZ2VNdWx0aXNhbXBsZShcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHtcbiAgICAgIHNhbXBsZXMgPSB0aGlzLl9fZ2xDYXQucHJlZmVycmVkTXVsdGlzYW1wbGVTYW1wbGVzLFxuICAgICAgZm9ybWF0ID0gdGhpcy5fX2dsQ2F0LnByZWZlcnJlZERlcHRoRm9ybWF0LFxuICAgICAgZmFsbGJhY2tXZWJHTDEgPSB0cnVlXG4gICAgfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kUmVuZGVyYnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBpZiAoIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgJiYgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgICBnbC5yZW5kZXJidWZmZXJTdG9yYWdlTXVsdGlzYW1wbGUoIEdMX1JFTkRFUkJVRkZFUiwgc2FtcGxlcywgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIGZhbGxiYWNrV2ViR0wxICkge1xuICAgICAgICAgIGdsLnJlbmRlcmJ1ZmZlclN0b3JhZ2UoIEdMX1JFTkRFUkJVRkZFUiwgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgR0xDYXRFcnJvcnMuV2ViR0wyRXhjbHVzaXZlRXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fd2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLl9faGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgeyBHTF9DT01QSUxFX1NUQVRVUyB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuXG4vKipcbiAqIEl0J3MgYSBXZWJHTFNoYWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0U2hhZGVyPFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3NoYWRlcjogV2ViR0xTaGFkZXI7XG4gIHByaXZhdGUgX19jb21waWxlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHNoYWRlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgc2hhZGVyKCk6IFdlYkdMU2hhZGVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3NoYWRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIHNoYWRlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRTaGFkZXIuc2hhZGVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTFNoYWRlciB7XG4gICAgcmV0dXJuIHRoaXMuX19zaGFkZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0U2hhZGVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBzaGFkZXI6IFdlYkdMU2hhZGVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19zaGFkZXIgPSBzaGFkZXI7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgc2hhZGVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZVNoYWRlciggdGhpcy5fX3NoYWRlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIHRoZSBsYXN0IGNvbXBpbGF0aW9uIHdhcyBzdWNjZXNzZnVsIG9yIG5vdC5cbiAgICovXG4gIHB1YmxpYyBpc0NvbXBpbGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9fY29tcGlsZWQ7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGlsZSB0aGUgc2hhZGVyLlxuICAgKi9cbiAgcHVibGljIGNvbXBpbGUoIGNvZGU6IHN0cmluZyApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBnbC5zaGFkZXJTb3VyY2UoIHRoaXMuX19zaGFkZXIsIGNvZGUgKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKCB0aGlzLl9fc2hhZGVyICk7XG5cbiAgICB0aGlzLl9fY29tcGlsZWQgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoIHRoaXMuX19zaGFkZXIsIEdMX0NPTVBJTEVfU1RBVFVTICk7XG4gICAgaWYgKCAhdGhpcy5fX2NvbXBpbGVkICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCBnbC5nZXRTaGFkZXJJbmZvTG9nKCB0aGlzLl9fc2hhZGVyICkhICk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBHTF9DTEFNUF9UT19FREdFLCBHTF9GTE9BVCwgR0xfSEFMRl9GTE9BVCwgR0xfTElORUFSLCBHTF9ORUFSRVNULCBHTF9SMTZGLCBHTF9SMzJGLCBHTF9SR0JBLCBHTF9SR0JBMTZGLCBHTF9SR0JBMzJGLCBHTF9SR0JBOCwgR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YLCBHTF9URVhUVVJFX01BR19GSUxURVIsIEdMX1RFWFRVUkVfTUlOX0ZJTFRFUiwgR0xfVEVYVFVSRV9XUkFQX1MsIEdMX1RFWFRVUkVfV1JBUF9ULCBHTF9VTlNJR05FRF9CWVRFIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgeyBHTENhdEVycm9ycyB9IGZyb20gJy4vR0xDYXRFcnJvcnMnO1xuXG5jb25zdCB6ZXJvVGV4dHVyZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoIFsgMCwgMCwgMCwgMCBdICk7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMVGV4dHVyZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0VGV4dHVyZTxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX190ZXh0dXJlOiBXZWJHTFRleHR1cmU7XG4gIHByaXZhdGUgX193aWR0aCA9IDA7XG4gIHByaXZhdGUgX19oZWlnaHQgPSAwO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRleHR1cmUoKTogV2ViR0xUZXh0dXJlIHtcbiAgICByZXR1cm4gdGhpcy5fX3RleHR1cmU7XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biB0ZXh0dXJlLiBTaG9ydGVyIHRoYW4gW1tHTENhdFRleHR1cmUudGV4dHVyZWRdXVxuICAgKi9cbiAgcHVibGljIGdldCByYXcoKTogV2ViR0xUZXh0dXJlIHtcbiAgICByZXR1cm4gdGhpcy5fX3RleHR1cmU7XG4gIH1cblxuICAvKipcbiAgICogSXRzIHdpZHRoLlxuICAgKi9cbiAgcHVibGljIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9fd2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGhlaWdodC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX19oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0VGV4dHVyZSBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PiwgdGV4dHVyZTogV2ViR0xUZXh0dXJlICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX190ZXh0dXJlID0gdGV4dHVyZTtcbiAgICB0aGlzLnRleHR1cmVGaWx0ZXIoIEdMX0xJTkVBUiApO1xuICAgIHRoaXMudGV4dHVyZVdyYXAoIEdMX0NMQU1QX1RPX0VER0UgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZVRleHR1cmUoIHRoaXMuX190ZXh0dXJlICk7XG4gIH1cblxuICAvKipcbiAgICogU3BlY2lmeSBob3cgdG8gZmlsdGVyIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHRleHR1cmVGaWx0ZXIoKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVGaWx0ZXIoIGZpbHRlcjogbnVtYmVyICk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlRmlsdGVyKCBmaWx0ZXJNYWc6IG51bWJlciwgZmlsdGVyTWluOiBudW1iZXIgKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVGaWx0ZXIoIGZpbHRlck1hZzogbnVtYmVyID0gR0xfTkVBUkVTVCwgZmlsdGVyTWluOiBudW1iZXIgPSBmaWx0ZXJNYWcgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfTUFHX0ZJTFRFUiwgZmlsdGVyTWFnICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFXzJELCBHTF9URVhUVVJFX01JTl9GSUxURVIsIGZpbHRlck1pbiApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0byB3cmFwIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHRleHR1cmVXcmFwKCk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlV3JhcCggd3JhcDogbnVtYmVyICk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlV3JhcCggd3JhcFM6IG51bWJlciwgd3JhcFQ6IG51bWJlciApOiB2b2lkO1xuICBwdWJsaWMgdGV4dHVyZVdyYXAoIHdyYXBTOiBudW1iZXIgPSBHTF9DTEFNUF9UT19FREdFLCB3cmFwVDogbnVtYmVyID0gd3JhcFMgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfV1JBUF9TLCB3cmFwUyApO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9XUkFQX1QsIHdyYXBUICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgdGV4U3RvcmFnZTJEKFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgeyB0YXJnZXQgPSBHTF9URVhUVVJFXzJELCBsZXZlbCA9IDEsIGZvcm1hdCA9IEdMX1JHQkE4IH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBpZiAoIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgJiYgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgICAgZ2wudGV4U3RvcmFnZTJEKCB0YXJnZXQsIGxldmVsLCBmb3JtYXQsIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgIH0gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgR0xDYXRFcnJvcnMuV2ViR0wyRXhjbHVzaXZlRXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHZhbHVlIGZvciB0aGUgcGFzc2VkIHBhcmFtZXRlciBuYW1lLlxuICAgKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJHTFJlbmRlcmluZ0NvbnRleHQvZ2V0UGFyYW1ldGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0UGFyYW1ldGVyKCBwbmFtZTogR0xlbnVtICk6IGFueSB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgcmV0dXJuIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICByZXR1cm4gZ2wuZ2V0UGFyYW1ldGVyKCBwbmFtZSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBwaXhlbCBzdG9yYWdlIG1vZGVzLlxuICAgKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJHTFJlbmRlcmluZ0NvbnRleHQvcGl4ZWxTdG9yZWlcbiAgICovXG4gIHB1YmxpYyBwaXhlbFN0b3JlaSggcG5hbWU6IEdMZW51bSwgcGFyYW06IG51bWJlciB8IGJvb2xlYW4gKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnBpeGVsU3RvcmVpKCBwbmFtZSwgcGFyYW0gKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyBkYXRhIGludG8gdGhpcyB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHNldFRleHR1cmUoIHNvdXJjZTogVGV4SW1hZ2VTb3VyY2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnRleEltYWdlMkQoIEdMX1RFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIHNvdXJjZSApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHNvdXJjZS53aWR0aDtcbiAgICB0aGlzLl9faGVpZ2h0ID0gc291cmNlLmhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbmV3IGRhdGEgaW50byB0aGlzIHRleHR1cmUuXG4gICAqIFRoaXMgZnVuY3Rpb24gdXNlcyBUeXBlZEFycmF5LiBJZiB5b3Ugd2FudCB0byBzb3VyY2UgaW1hZ2UgZGF0YSwgdXNlIGBHTENhdC5zZXRUZXh0dXJlKClgIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgc2V0VGV4dHVyZUZyb21BcnJheShcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHNvdXJjZTogQXJyYXlCdWZmZXJWaWV3IHwgbnVsbCxcbiAgICB7XG4gICAgICBpbnRlcm5hbGZvcm1hdCA9IEdMX1JHQkE4LFxuICAgICAgZm9ybWF0ID0gR0xfUkdCQSxcbiAgICAgIHR5cGUgPSBHTF9VTlNJR05FRF9CWVRFXG4gICAgfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGxldCBpZm9ybWF0ID0gaW50ZXJuYWxmb3JtYXQ7XG4gICAgaWYgKCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYmIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzE1NTAyL2ZpbGVzXG4gICAgICBpZiAoXG4gICAgICAgIGludGVybmFsZm9ybWF0ID09PSBHTF9SMTZGXG4gICAgICAgIHx8IGludGVybmFsZm9ybWF0ID09PSBHTF9SMzJGXG4gICAgICAgIHx8IGludGVybmFsZm9ybWF0ID09PSBHTF9SR0JBMTZGXG4gICAgICAgIHx8IGludGVybmFsZm9ybWF0ID09PSBHTF9SR0JBMzJGXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ0VYVF9jb2xvcl9idWZmZXJfZmxvYXQnLCB0cnVlICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdFWFRfZmxvYXRfYmxlbmQnICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXInICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICggdHlwZSA9PT0gR0xfSEFMRl9GTE9BVCApIHtcbiAgICAgICAgdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ09FU190ZXh0dXJlX2hhbGZfZmxvYXQnLCB0cnVlICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0X2xpbmVhcicgKTtcbiAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09IEdMX0ZMT0FUICkge1xuICAgICAgICB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnT0VTX3RleHR1cmVfZmxvYXQnLCB0cnVlICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXInICk7XG4gICAgICB9XG5cbiAgICAgIGlmb3JtYXQgPSBmb3JtYXQ7XG4gICAgfVxuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnRleEltYWdlMkQoXG4gICAgICAgIEdMX1RFWFRVUkVfMkQsXG4gICAgICAgIDAsXG4gICAgICAgIGlmb3JtYXQsXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIDAsXG4gICAgICAgIGZvcm1hdCxcbiAgICAgICAgdHlwZSxcbiAgICAgICAgc291cmNlXG4gICAgICApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogQ29weSBwaXhlbHMgZnJvbSBjdXJyZW50IGZyYW1lYnVmZmVyIHRvIGdpdmVuIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgY29weVRleHR1cmUoIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5jb3B5VGV4SW1hZ2UyRCggR0xfVEVYVFVSRV8yRCwgMCwgR0xfUkdCQSwgMCwgMCwgd2lkdGgsIGhlaWdodCwgMCApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyBjdWJlbWFwIGRhdGEgaW50byB0aGlzIHRleHR1cmUuXG4gICAqIEBwYXJhbSB0ZXh0dXJlcyBBcnJheSBvZiBpYW1nZXMuIE9yZGVyOiBgWCtgLCBgWC1gLCBgWStgLCBgWS1gLCBgWitgLCBgWi1gXG4gICAqIEB0b2RvIGR1ZSB0byBjb21wYXRpYmlsaXR5IG9mIGl0cyBgd2lkdGhgIGFuZCBgaGVpZ2h0YCBpdCBzaG91bGQgbm90IGJlIHVzZWQgeWV0XG4gICAqL1xuICBwdWJsaWMgc2V0Q3ViZW1hcCggdGV4dHVyZXM6IFRleEltYWdlU291cmNlW10gKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlQ3ViZU1hcCggdGhpcywgKCkgPT4ge1xuICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgNjsgaSArKyApIHtcbiAgICAgICAgZ2wudGV4SW1hZ2UyRChcbiAgICAgICAgICBHTF9URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1ggKyBpLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgR0xfUkdCQSxcbiAgICAgICAgICBHTF9SR0JBLFxuICAgICAgICAgIEdMX1VOU0lHTkVEX0JZVEUsXG4gICAgICAgICAgdGV4dHVyZXNbIGkgXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9NSU5fRklMVEVSLCBHTF9MSU5FQVIgKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIEdMX1RFWFRVUkVfTUFHX0ZJTFRFUiwgR0xfTElORUFSICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFX0NVQkVfTUFQLCBHTF9URVhUVVJFX1dSQVBfUywgR0xfQ0xBTVBfVE9fRURHRSApO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9XUkFQX1QsIEdMX0NMQU1QX1RPX0VER0UgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFsgMCwgMCwgMCwgMCBdIHRvIHRoaXMgdGV4dHVyZS5cbiAgICogVXNlZnVsIGZvciB0ZW1wb3JhcnkgdXNlLi5cbiAgICovXG4gIHB1YmxpYyBzZXRaZXJvVGV4dHVyZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFRleHR1cmVGcm9tQXJyYXkoIDEsIDEsIHplcm9UZXh0dXJlQXJyYXkgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBHTENhdCwgR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGUgfSBmcm9tICcuL0dMQ2F0JztcbmltcG9ydCB7IEdMX0FSUkFZX0JVRkZFUiwgR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIEdMX0ZMT0FUIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0QnVmZmVyIH0gZnJvbSAnLi9HTENhdEJ1ZmZlcic7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMVmVydGV4QXJyYXlPYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdFZlcnRleEFycmF5PFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3ZlcnRleEFycmF5OiBHTENhdFZlcnRleEFycmF5UmF3VHlwZTxUQ29udGV4dD47XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGdldCBidWZmZXIoKTogR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQ+IHtcbiAgICByZXR1cm4gdGhpcy5fX3ZlcnRleEFycmF5O1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gYnVmZmVyLiBTaG9ydGVyIHRoYW4gW1tHTENhdEJ1ZmZlci5idWZmZXJdXS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3KCk6IEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0PiB7XG4gICAgcmV0dXJuIHRoaXMuX192ZXJ0ZXhBcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRCdWZmZXIgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIHZlcnRleEFycmF5OiBHTENhdFZlcnRleEFycmF5UmF3VHlwZTxUQ29udGV4dD4gKSB7XG4gICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XG4gICAgdGhpcy5fX3ZlcnRleEFycmF5ID0gdmVydGV4QXJyYXk7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgaWYgKCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYmIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGdsLmRlbGV0ZVZlcnRleEFycmF5KCB0aGlzLl9fdmVydGV4QXJyYXkgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JywgdHJ1ZSApO1xuICAgICAgZXh0LmRlbGV0ZVZlcnRleEFycmF5T0VTKCB0aGlzLl9fdmVydGV4QXJyYXkgYXMgYW55ICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSB2ZXJ0ZXggYnVmZmVyIHRvIHRoZSB2ZXJ0ZXggYXJyYXkuXG4gICAqL1xuICBwdWJsaWMgYmluZFZlcnRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PixcbiAgICBsb2NhdGlvbjogbnVtYmVyLFxuICAgIHNpemUgPSAxLFxuICAgIGRpdmlzb3IgPSAwLFxuICAgIHR5cGU6IG51bWJlciA9IEdMX0ZMT0FULFxuICAgIHN0cmlkZSA9IDAsXG4gICAgb2Zmc2V0ID0gMFxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFZlcnRleEFycmF5KCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5iaW5kQnVmZmVyKCBHTF9BUlJBWV9CVUZGRVIsIHNvdXJjZS5yYXcgKTtcbiAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KCBsb2NhdGlvbiApO1xuICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlciggbG9jYXRpb24sIHNpemUsIHR5cGUsIGZhbHNlLCBzdHJpZGUsIG9mZnNldCApO1xuXG4gICAgICBpZiAoIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgJiYgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJEaXZpc29yKCBsb2NhdGlvbiwgZGl2aXNvciApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXh0ID0gdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ0FOR0xFX2luc3RhbmNlZF9hcnJheXMnICk7XG4gICAgICAgIGlmICggZXh0ICkge1xuICAgICAgICAgIGV4dC52ZXJ0ZXhBdHRyaWJEaXZpc29yQU5HTEUoIGxvY2F0aW9uLCBkaXZpc29yICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhbiBpbmRleCBidWZmZXIgdG8gdGhlIHZlcnRleCBhcnJheS5cbiAgICovXG4gIHB1YmxpYyBiaW5kSW5kZXhidWZmZXIoXG4gICAgc291cmNlOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD5cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRWZXJ0ZXhBcnJheSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuYmluZEJ1ZmZlciggR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHNvdXJjZS5yYXcgKTtcbiAgICB9ICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMX0FSUkFZX0JVRkZFUiwgR0xfQkxFTkQsIEdMX0NPTE9SX0FUVEFDSE1FTlQwLCBHTF9DT0xPUl9CVUZGRVJfQklULCBHTF9ERVBUSF9BVFRBQ0hNRU5ULCBHTF9ERVBUSF9CVUZGRVJfQklULCBHTF9ERVBUSF9DT01QT05FTlQxNiwgR0xfREVQVEhfQ09NUE9ORU5UMjQsIEdMX0RFUFRIX1RFU1QsIEdMX0RSQVdfRlJBTUVCVUZGRVIsIEdMX0VMRU1FTlRfQVJSQVlfQlVGRkVSLCBHTF9GTE9BVCwgR0xfRlJBR01FTlRfU0hBREVSLCBHTF9GUkFNRUJVRkZFUiwgR0xfTEVRVUFMLCBHTF9NQVhfRFJBV19CVUZGRVJTLCBHTF9ORUFSRVNULCBHTF9PTkVfTUlOVVNfU1JDX0FMUEhBLCBHTF9SRUFEX0ZSQU1FQlVGRkVSLCBHTF9SRU5ERVJCVUZGRVIsIEdMX1JHQkEsIEdMX1JHQkEzMkYsIEdMX1JHQkE4LCBHTF9TUkNfQUxQSEEsIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIEdMX1ZFUlRFWF9TSEFERVIgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB7IEJpbmRIZWxwZXIgfSBmcm9tICcuL3V0aWxzL0JpbmRIZWxwZXInO1xuaW1wb3J0IHsgR0xDYXRCdWZmZXIgfSBmcm9tICcuL0dMQ2F0QnVmZmVyJztcbmltcG9ydCB7IEdMQ2F0RXJyb3JzIH0gZnJvbSAnLi9HTENhdEVycm9ycyc7XG5pbXBvcnQgeyBHTENhdEZyYW1lYnVmZmVyIH0gZnJvbSAnLi9HTENhdEZyYW1lYnVmZmVyJztcbmltcG9ydCB7IEdMQ2F0UHJvZ3JhbSB9IGZyb20gJy4vR0xDYXRQcm9ncmFtJztcbmltcG9ydCB7IEdMQ2F0UmVuZGVyYnVmZmVyIH0gZnJvbSAnLi9HTENhdFJlbmRlcmJ1ZmZlcic7XG5pbXBvcnQgeyBHTENhdFNoYWRlciB9IGZyb20gJy4vR0xDYXRTaGFkZXInO1xuaW1wb3J0IHsgR0xDYXRUZXh0dXJlIH0gZnJvbSAnLi9HTENhdFRleHR1cmUnO1xuaW1wb3J0IHsgR0xDYXRWZXJ0ZXhBcnJheSB9IGZyb20gJy4vR0xDYXRWZXJ0ZXhBcnJheSc7XG5cbmV4cG9ydCB0eXBlIFdlYkdMRXh0ZW5zaW9uID0gYW55O1xuXG5leHBvcnQgdHlwZSBHTENhdFZlcnRleEFycmF5UmF3VHlwZTxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+XG4gID0gVENvbnRleHQgZXh0ZW5kcyBXZWJHTDJSZW5kZXJpbmdDb250ZXh0XG4gICAgPyBXZWJHTFZlcnRleEFycmF5T2JqZWN0XG4gICAgOiBXZWJHTFZlcnRleEFycmF5T2JqZWN0T0VTO1xuXG4vKipcbiAqIFdlYkdMIHdyYXBwZXIgd2l0aCBwbGVudHkgb2YgaGFja2FiaWxpdHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdDxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHVibGljIHN0YXRpYyB0aHJvd0lmTnVsbDxUPiggdjogVCB8IG51bGwgKTogVCB7XG4gICAgaWYgKCB2ID09IG51bGwgKSB7XG4gICAgICB0aHJvdyBHTENhdEVycm9ycy5VbmV4cGVjdGVkTnVsbEVycm9yO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdjtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcHJlZmVycmVkTXVsdGlzYW1wbGVTYW1wbGVzID0gNDtcblxuICBwdWJsaWMgcHJlZmVycmVkRGVwdGhGb3JtYXQ6IEdMZW51bTsgLy8gd2lsbCBiZSBzZXQgaW4gY29uc3RydWN0b3JcblxuICBwcml2YXRlIF9fZ2w6IFRDb250ZXh0O1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyVmVydGV4QnVmZmVyID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIGJ1ZmZlciApID0+IHtcbiAgICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuICAgICAgZ2wuYmluZEJ1ZmZlciggR0xfQVJSQVlfQlVGRkVSLCBidWZmZXI/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVySW5kZXhCdWZmZXIgPSBuZXcgQmluZEhlbHBlcjxHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggYnVmZmVyICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kQnVmZmVyKCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiwgYnVmZmVyPy5yYXcgPz8gbnVsbCApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlclZlcnRleEFycmF5ID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggdmVydGV4QXJyYXkgKSA9PiB7XG4gICAgICB0aGlzLnJhd0JpbmRWZXJ0ZXhBcnJheSggdmVydGV4QXJyYXk/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyVGV4dHVyZTJEID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCB0ZXh0dXJlICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kVGV4dHVyZSggR0xfVEVYVFVSRV8yRCwgdGV4dHVyZT8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJUZXh0dXJlQ3ViZU1hcCA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggdGV4dHVyZSApID0+IHtcbiAgICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuICAgICAgZ2wuYmluZFRleHR1cmUoIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIHRleHR1cmU/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyUmVuZGVyYnVmZmVyID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIHJlbmRlcmJ1ZmZlciApID0+IHtcbiAgICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuICAgICAgZ2wuYmluZFJlbmRlcmJ1ZmZlciggR0xfUkVOREVSQlVGRkVSLCByZW5kZXJidWZmZXI/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyRnJhbWVidWZmZXIgPSBuZXcgQmluZEhlbHBlcjxHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCBmcmFtZWJ1ZmZlciApID0+IHtcbiAgICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKCBHTF9GUkFNRUJVRkZFUiwgZnJhbWVidWZmZXI/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyUHJvZ3JhbSA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggcHJvZ3JhbSApID0+IHtcbiAgICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuICAgICAgZ2wudXNlUHJvZ3JhbSggcHJvZ3JhbT8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJEcmF3QnVmZmVycyA9IG5ldyBCaW5kSGVscGVyPEdMZW51bVtdPihcbiAgICBbIEdMX0NPTE9SX0FUVEFDSE1FTlQwIF0sXG4gICAgKCBidWZmZXJzICkgPT4ge1xuICAgICAgdGhpcy5yYXdEcmF3QnVmZmVycyggYnVmZmVycyApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fZXh0ZW5zaW9uQ2FjaGU6IHsgWyBuYW1lOiBzdHJpbmcgXTogV2ViR0xFeHRlbnNpb24gfSA9IHt9O1xuICBwcml2YXRlIF9fZHVtbXlUZXh0dXJlQ2FjaGU/OiBHTENhdFRleHR1cmU8VENvbnRleHQ+O1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHJlbmRlcmluZyBjb250ZXh0LlxuICAgKi9cbiAgcHVibGljIGdldCByZW5kZXJpbmdDb250ZXh0KCk6IFRDb250ZXh0IHtcbiAgICByZXR1cm4gdGhpcy5fX2dsO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcmVuZGVyaW5nIGNvbnRleHQuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0LnJlbmRlcmluZ0NvbnRleHRdXVxuICAgKi9cbiAgcHVibGljIGdldCBnbCgpOiBUQ29udGV4dCB7XG4gICAgcmV0dXJuIHRoaXMuX19nbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXQgaW5zdGFuY2UuXG4gICAqIFJlbmRlcmluZyBjb250ZXh0IGlzIHJlcXVpcmVkLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbDogVENvbnRleHQgKSB7XG4gICAgdGhpcy5fX2dsID0gZ2w7XG5cbiAgICBnbC5lbmFibGUoIEdMX0RFUFRIX1RFU1QgKTtcbiAgICBnbC5kZXB0aEZ1bmMoIEdMX0xFUVVBTCApO1xuICAgIGdsLmVuYWJsZSggR0xfQkxFTkQgKTtcbiAgICBnbC5ibGVuZEZ1bmMoIEdMX1NSQ19BTFBIQSwgR0xfT05FX01JTlVTX1NSQ19BTFBIQSApO1xuXG4gICAgaWYgKCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYmIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIHRoaXMucHJlZmVycmVkRGVwdGhGb3JtYXQgPSBHTF9ERVBUSF9DT01QT05FTlQyNDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcmVmZXJyZWREZXB0aEZvcm1hdCA9IEdMX0RFUFRIX0NPTVBPTkVOVDE2O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIGR1bW15IHRleHR1cmUsIDEwMCUgb3JnYW5pYyBwdXJlICNGRjAwRkYgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgZHVtbXlUZXh0dXJlKCk6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4ge1xuICAgIGlmICggdGhpcy5fX2R1bW15VGV4dHVyZUNhY2hlICkge1xuICAgICAgcmV0dXJuIHRoaXMuX19kdW1teVRleHR1cmVDYWNoZTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0dXJlID0gdGhpcy5jcmVhdGVUZXh0dXJlKCk7XG5cbiAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkoIDEsIDEsIG5ldyBVaW50OEFycmF5KCBbIDI1NSwgMCwgMjU1LCAyNTUgXSApICk7XG4gICAgdGhpcy5fX2R1bW15VGV4dHVyZUNhY2hlID0gdGV4dHVyZTtcbiAgICByZXR1cm4gdGV4dHVyZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBhbiBleHRlbnNpb24uXG4gICAqIElmIHRoZXkgaXMgeW91ciBwcmVjaW91cyBvbmUgYW5kIHlvdSBjYW5ub3QgbGl2ZSB3aXRob3V0IGhpbSwgdHVybiBvbiBgdGhyb3dJZk5vdEZvdW5kYC5cbiAgICovXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2hhbGZfZmxvYXQnLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IE9FU190ZXh0dXJlX2hhbGZfZmxvYXQgfCBudWxsO1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogT0VTX3RleHR1cmVfaGFsZl9mbG9hdDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfaGFsZl9mbG9hdF9saW5lYXInLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IE9FU190ZXh0dXJlX2hhbGZfZmxvYXRfbGluZWFyIHwgbnVsbDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfaGFsZl9mbG9hdF9saW5lYXInLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0X2xpbmVhcjtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfZmxvYXQnLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IE9FU190ZXh0dXJlX2Zsb2F0IHwgbnVsbDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfZmxvYXQnLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBPRVNfdGV4dHVyZV9mbG9hdDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXIgfCBudWxsO1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXInLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXI7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ0FOR0xFX2luc3RhbmNlZF9hcnJheXMnLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IEFOR0xFX2luc3RhbmNlZF9hcnJheXMgfCBudWxsO1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogQU5HTEVfaW5zdGFuY2VkX2FycmF5cztcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IE9FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0IHwgbnVsbDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBPRVNfdmVydGV4X2FycmF5X29iamVjdDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnV0VCR0xfZHJhd19idWZmZXJzJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBXRUJHTF9kcmF3X2J1ZmZlcnMgfCBudWxsO1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdXRUJHTF9kcmF3X2J1ZmZlcnMnLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBXRUJHTF9kcmF3X2J1ZmZlcnM7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oIG5hbWU6IHN0cmluZywgdGhyb3dJZk5vdEZvdW5kPzogYm9vbGVhbiApOiBXZWJHTEV4dGVuc2lvbiB8IG51bGw7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oIG5hbWU6IHN0cmluZywgdGhyb3dJZk5vdEZvdW5kPzogYm9vbGVhbiApOiBXZWJHTEV4dGVuc2lvbiB8IG51bGwge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKCB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbIG5hbWUgXSApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbIG5hbWUgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF0gPSBnbC5nZXRFeHRlbnNpb24oIG5hbWUgKTtcbiAgICAgIGlmICggdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF0gKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbIG5hbWUgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICggdGhyb3dJZk5vdEZvdW5kICkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvciggJ0dMQ2F0LmdldEV4dGVuc2lvbjogVGhlIGV4dGVuc2lvbiBcIicgKyBuYW1lICsgJ1wiIGlzIG5vdCBzdXBwb3J0ZWQnICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIGV4dGVuc2lvbnMuXG4gICAqIElmIHRoZXkgYXJlIHlvdXIgcHJlY2lvdXMgb25lcyBhbmQgeW91IGNhbm5vdCBsaXZlIHdpdGhvdXQgdGhlbSwgdHVybiBvbiBgdGhyb3dJZk5vdEZvdW5kYC5cbiAgICovXG4gIHB1YmxpYyBnZXRFeHRlbnNpb25zKCBuYW1lczogc3RyaW5nW10sIHRocm93SWZOb3RGb3VuZD86IGJvb2xlYW4gKTogQXJyYXk8V2ViR0xFeHRlbnNpb24gfCBudWxsPiB7XG4gICAgcmV0dXJuIG5hbWVzLm1hcCggKCBuICkgPT4gdGhpcy5nZXRFeHRlbnNpb24oIG4sIHRocm93SWZOb3RGb3VuZCApICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHNoYWRlciBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlU2hhZGVyKCB0eXBlOiBudW1iZXIgKTogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGNvbnN0IHNoYWRlciA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVTaGFkZXIoIHR5cGUgKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdFNoYWRlciggdGhpcywgc2hhZGVyICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IHByb2dyYW0gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVByb2dyYW0oKTogR0xDYXRQcm9ncmFtPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBjb25zdCBwcm9ncmFtID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVByb2dyYW0oKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdFByb2dyYW0oIHRoaXMsIHByb2dyYW0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXQgcHJvZ3JhbSBvYmplY3QsIGluIGxhemllciB3YXkuXG4gICAqL1xuICBwdWJsaWMgbGF6eVByb2dyYW0oIHZlcnQ6IHN0cmluZywgZnJhZzogc3RyaW5nICk6IEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4ge1xuICAgIGxldCB2ZXJ0ZXhTaGFkZXI6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZnJhZ21lbnRTaGFkZXI6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgcHJvZ3JhbTogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vID09IHZlcnQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHZlcnRleFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKCBHTF9WRVJURVhfU0hBREVSICk7XG4gICAgICB2ZXJ0ZXhTaGFkZXIuY29tcGlsZSggdmVydCApO1xuXG4gICAgICAvLyA9PSBmcmFnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKCBHTF9GUkFHTUVOVF9TSEFERVIgKTtcbiAgICAgIGZyYWdtZW50U2hhZGVyLmNvbXBpbGUoIGZyYWcgKTtcblxuICAgICAgLy8gPT0gcHJvZ3JhbSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgY29uc3QgcHJvZ3JhbSA9IHRoaXMuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgcHJvZ3JhbS5saW5rKCB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyICk7XG5cbiAgICAgIC8vID09IGFsbW9zdCBkb25lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHJldHVybiBwcm9ncmFtO1xuICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgcHJvZ3JhbT8uZGlzcG9zZSgpO1xuICAgICAgZnJhZ21lbnRTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHZlcnRleFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IHByb2dyYW0gb2JqZWN0LCBpbiBsYXppZXIgd2F5LlxuICAgKiBJdCdzIGdvbm5hIGJlIGFzeW5jaHJvbm91cyBpZiB5b3UgaGF2ZSB0aGUgS0hSX3BhcmFsbGVsX3NoYWRlcl9jb21waWxlIGV4dGVuc2lvbiBzdXBwb3J0LlxuICAgKi9cbiAgcHVibGljIGxhenlQcm9ncmFtQXN5bmMoIHZlcnQ6IHN0cmluZywgZnJhZzogc3RyaW5nICk6IFByb21pc2U8R0xDYXRQcm9ncmFtPFRDb250ZXh0Pj4ge1xuICAgIGxldCB2ZXJ0ZXhTaGFkZXI6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZnJhZ21lbnRTaGFkZXI6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgcHJvZ3JhbTogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vID09IHZlcnQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGNvbnN0IHZlcnRleFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKCBHTF9WRVJURVhfU0hBREVSICk7XG4gICAgICB2ZXJ0ZXhTaGFkZXIuY29tcGlsZSggdmVydCApO1xuXG4gICAgICAvLyA9PSBmcmFnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKCBHTF9GUkFHTUVOVF9TSEFERVIgKTtcbiAgICAgIGZyYWdtZW50U2hhZGVyLmNvbXBpbGUoIGZyYWcgKTtcblxuICAgICAgLy8gPT0gcHJvZ3JhbSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgY29uc3QgcHJvZ3JhbSA9IHRoaXMuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgcmV0dXJuIHByb2dyYW0ubGlua0FzeW5jKCB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyICkudGhlbiggKCkgPT4ge1xuICAgICAgICByZXR1cm4gcHJvZ3JhbTtcbiAgICAgIH0gKS5jYXRjaCggKCBlICkgPT4ge1xuICAgICAgICBwcm9ncmFtPy5kaXNwb3NlKCk7XG4gICAgICAgIGZyYWdtZW50U2hhZGVyPy5kaXNwb3NlKCk7XG4gICAgICAgIHZlcnRleFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoIGUgKTtcbiAgICAgIH0gKTtcbiAgICB9IGNhdGNoICggZSApIHtcbiAgICAgIHByb2dyYW0/LmRpc3Bvc2UoKTtcbiAgICAgIGZyYWdtZW50U2hhZGVyPy5kaXNwb3NlKCk7XG4gICAgICB2ZXJ0ZXhTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCggZSApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGEgcHJvZ3JhbSB0byB1c2UuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgdXNhZ2UgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIHVzZVByb2dyYW08VD4oXG4gICAgcHJvZ3JhbTogR0xDYXRQcm9ncmFtPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIHByb2dyYW06IEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJQcm9ncmFtLmJpbmQoIHByb2dyYW0sIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHZlcnRleCBidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlQnVmZmVyKCk6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBjb25zdCBidWZmZXIgPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlQnVmZmVyKCkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRCdWZmZXIoIHRoaXMsIGJ1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSB2ZXJ0ZXggYnVmZmVyLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRWZXJ0ZXhCdWZmZXI8VD4oXG4gICAgYnVmZmVyOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCBidWZmZXI6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclZlcnRleEJ1ZmZlci5iaW5kKCBidWZmZXIsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhbiBpbmRleCBidWZmZXIuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZEluZGV4QnVmZmVyPFQ+KFxuICAgIGJ1ZmZlcjogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggYnVmZmVyOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJJbmRleEJ1ZmZlci5iaW5kKCBidWZmZXIsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHZlcnRleCBhcnJheS5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVWZXJ0ZXhBcnJheSgpOiBHTENhdFZlcnRleEFycmF5PFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBpZiAoIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgJiYgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgY29uc3QgdmVydGV4QXJyYXkgPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlVmVydGV4QXJyYXkoKSApO1xuXG4gICAgICByZXR1cm4gbmV3IEdMQ2F0VmVydGV4QXJyYXkoIHRoaXMsIHZlcnRleEFycmF5IGFzIGFueSApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHQgPSB0aGlzLmdldEV4dGVuc2lvbiggJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JywgdHJ1ZSApO1xuXG4gICAgICBjb25zdCB2ZXJ0ZXhBcnJheSA9IEdMQ2F0LnRocm93SWZOdWxsKCBleHQuY3JlYXRlVmVydGV4QXJyYXlPRVMoKSApO1xuXG4gICAgICByZXR1cm4gbmV3IEdMQ2F0VmVydGV4QXJyYXkoIHRoaXMsIHZlcnRleEFycmF5IGFzIGFueSApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG9mIGBnbC5iaW5kVmVydGV4QXJyYXlgLlxuICAgKlxuICAgKiB7QGxpbmsgcmF3QmluZFZlcnRleEFycmF5fSBpcyBiZXR0ZXIuXG4gICAqL1xuICBwdWJsaWMgcmF3QmluZFZlcnRleEFycmF5KCBhcnJheTogR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQ+IHwgbnVsbCApOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmICggV2ViR0wyUmVuZGVyaW5nQ29udGV4dCAmJiBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBnbC5iaW5kVmVydGV4QXJyYXkoIGFycmF5ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4dCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCAnT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnLCB0cnVlICk7XG4gICAgICBleHQuYmluZFZlcnRleEFycmF5T0VTKCBhcnJheSBhcyBhbnkgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIHJhd0JpbmRWZXJ0ZXhBcnJheX0gYnV0IGJldHRlci5cbiAgICpcbiAgICogQmluZCBhIHZlcnRleCBhcnJheS5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kVmVydGV4QXJyYXk8VD4oXG4gICAgdmVydGV4QXJyYXk6IEdMQ2F0VmVydGV4QXJyYXk8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggdmVydGV4QXJyYXk6IEdMQ2F0VmVydGV4QXJyYXk8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyVmVydGV4QXJyYXkuYmluZCggdmVydGV4QXJyYXksIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlVGV4dHVyZSgpOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGNvbnN0IHRleHR1cmUgPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlVGV4dHVyZSgpICk7XG5cbiAgICByZXR1cm4gbmV3IEdMQ2F0VGV4dHVyZSggdGhpcywgdGV4dHVyZSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSAyRCB0ZXh0dXJlLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRUZXh0dXJlMkQ8VD4oXG4gICAgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJUZXh0dXJlMkQuYmluZCggdGV4dHVyZSwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgY3ViZW1hcCB0ZXh0dXJlLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRUZXh0dXJlQ3ViZU1hcDxUPihcbiAgICB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclRleHR1cmVDdWJlTWFwLmJpbmQoIHRleHR1cmUsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVSZW5kZXJidWZmZXIoKTogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGNvbnN0IHJlbmRlcmJ1ZmZlciA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVSZW5kZXJidWZmZXIoKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdFJlbmRlcmJ1ZmZlciggdGhpcywgcmVuZGVyYnVmZmVyICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIHJlbmRlcmJ1ZmZlci5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kUmVuZGVyYnVmZmVyPFQ+KFxuICAgIHJlbmRlcmJ1ZmZlcjogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggcmVuZGVyYnVmZmVyOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJSZW5kZXJidWZmZXIuYmluZCggcmVuZGVyYnVmZmVyLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBmcmFtZWJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVGcmFtZWJ1ZmZlcigpOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBjb25zdCBmcmFtZWJ1ZmZlciA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVGcmFtZWJ1ZmZlcigpICk7XG5cbiAgICByZXR1cm4gbmV3IEdMQ2F0RnJhbWVidWZmZXIoIHRoaXMsIGZyYW1lYnVmZmVyICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIGZyYW1lYnVmZmVyLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRGcmFtZWJ1ZmZlcjxUPihcbiAgICBmcmFtZWJ1ZmZlcjogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCBmcmFtZWJ1ZmZlcjogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJGcmFtZWJ1ZmZlci5iaW5kKCBmcmFtZWJ1ZmZlciwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgZnJhbWVidWZlciwgaW4gbGF6aWVyIHdheS5cbiAgICovXG4gIHB1YmxpYyBsYXp5RnJhbWVidWZmZXIoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB7XG4gICAgICBpc0Zsb2F0ID0gZmFsc2UsXG4gICAgICBkZXB0aEZvcm1hdCA9IHRoaXMucHJlZmVycmVkRGVwdGhGb3JtYXRcbiAgICB9ID0ge31cbiAgKTogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4ge1xuICAgIGxldCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCByZW5kZXJidWZmZXI6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZnJhbWVidWZmZXI6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vID09IGZyYW1lYnVmZmVyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGZyYW1lYnVmZmVyID0gdGhpcy5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuXG4gICAgICAvLyA9PSByZW5kZXJidWZmZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICByZW5kZXJidWZmZXIgPSB0aGlzLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xuICAgICAgcmVuZGVyYnVmZmVyLnJlbmRlcmJ1ZmZlclN0b3JhZ2UoIHdpZHRoLCBoZWlnaHQsIHsgZm9ybWF0OiBkZXB0aEZvcm1hdCB9ICk7XG4gICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlciwgeyBhdHRhY2htZW50OiBHTF9ERVBUSF9BVFRBQ0hNRU5UIH0gKTtcblxuICAgICAgLy8gPT0gdGV4dHVyZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgdGV4dHVyZSA9IHRoaXMuY3JlYXRlVGV4dHVyZSgpO1xuICAgICAgaWYgKCBpc0Zsb2F0ICkge1xuICAgICAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkoXG4gICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgeyBpbnRlcm5hbGZvcm1hdDogR0xfUkdCQTMyRiwgZm9ybWF0OiBHTF9SR0JBLCB0eXBlOiBHTF9GTE9BVCB9XG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkoIHdpZHRoLCBoZWlnaHQsIG51bGwgKTtcbiAgICAgIH1cbiAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFRleHR1cmUoIHRleHR1cmUgKTtcblxuICAgICAgLy8gPT0gYWxtb3N0IGRvbmUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgcmV0dXJuIGZyYW1lYnVmZmVyO1xuICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgZnJhbWVidWZmZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHRleHR1cmU/LmRpc3Bvc2UoKTtcbiAgICAgIHJlbmRlcmJ1ZmZlcj8uZGlzcG9zZSgpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IG11bHRpc2FtcGxlIGZyYW1lYnVmZmVyLCBpbiBsYXppZXIgd2F5LlxuICAgKi9cbiAgcHVibGljIGxhenlNdWx0aXNhbXBsZUZyYW1lYnVmZmVyKFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAge1xuICAgICAgc2FtcGxlcyA9IDQsXG4gICAgICBpc0Zsb2F0ID0gZmFsc2UsXG4gICAgICBkZXB0aEZvcm1hdCA9IHRoaXMucHJlZmVycmVkRGVwdGhGb3JtYXQsXG4gICAgICBmYWxsYmFja1dlYkdMMSA9IHRydWVcbiAgICB9ID0ge31cbiAgKTogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYmIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGxldCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgICAgbGV0IHJlbmRlcmJ1ZmZlckRlcHRoOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgICBsZXQgcmVuZGVyYnVmZmVyQ29sb3I6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICAgIGxldCBmcmFtZWJ1ZmZlcjogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vID09IGZyYW1lYnVmZmVyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIGZyYW1lYnVmZmVyID0gdGhpcy5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuXG4gICAgICAgIC8vID09IHJlbmRlcmJ1ZmZlciBkZXB0aCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIHJlbmRlcmJ1ZmZlckRlcHRoID0gdGhpcy5jcmVhdGVSZW5kZXJidWZmZXIoKTtcbiAgICAgICAgcmVuZGVyYnVmZmVyRGVwdGgucmVuZGVyYnVmZmVyU3RvcmFnZU11bHRpc2FtcGxlKFxuICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICB7IHNhbXBsZXMsIGZvcm1hdDogZGVwdGhGb3JtYXQgfVxuICAgICAgICApO1xuICAgICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlckRlcHRoLCB7IGF0dGFjaG1lbnQ6IEdMX0RFUFRIX0FUVEFDSE1FTlQgfSApO1xuXG4gICAgICAgIC8vID09IHJlbmRlcmJ1ZmZlciBjb2xvciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIGNvbnN0IHJlbmRlcmJ1ZmZlckNvbG9yID0gdGhpcy5jcmVhdGVSZW5kZXJidWZmZXIoKTtcbiAgICAgICAgY29uc3QgY29sb3JGb3JtYXQgPSBpc0Zsb2F0ID8gR0xfUkdCQTMyRiA6IEdMX1JHQkE4O1xuICAgICAgICByZW5kZXJidWZmZXJDb2xvci5yZW5kZXJidWZmZXJTdG9yYWdlTXVsdGlzYW1wbGUoXG4gICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgIHsgc2FtcGxlcywgZm9ybWF0OiBjb2xvckZvcm1hdCB9XG4gICAgICAgICk7XG4gICAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFJlbmRlcmJ1ZmZlciggcmVuZGVyYnVmZmVyQ29sb3IsIHsgYXR0YWNobWVudDogR0xfQ09MT1JfQVRUQUNITUVOVDAgfSApO1xuXG4gICAgICAgIC8vID09IGFsbW9zdCBkb25lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIHJldHVybiBmcmFtZWJ1ZmZlcjtcbiAgICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgICBmcmFtZWJ1ZmZlcj8uZGlzcG9zZSgpO1xuICAgICAgICB0ZXh0dXJlPy5kaXNwb3NlKCk7XG4gICAgICAgIHJlbmRlcmJ1ZmZlckNvbG9yPy5kaXNwb3NlKCk7XG4gICAgICAgIHJlbmRlcmJ1ZmZlckRlcHRoPy5kaXNwb3NlKCk7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICggZmFsbGJhY2tXZWJHTDEgKSB7XG4gICAgICByZXR1cm4gdGhpcy5sYXp5RnJhbWVidWZmZXIoIHdpZHRoLCBoZWlnaHQsIHsgaXNGbG9hdCB9ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEdMQ2F0RXJyb3JzLldlYkdMMkV4Y2x1c2l2ZUVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgZHJhdyBidWZmZXJzLCBpbiBsYXppZXIgd2F5LlxuICAgKiBJZiB5b3UgY2FuJ3QgZ3JhYiBgV0VCR0xfZHJhd19idWZmZXJzYCBleHRlbnNpb24sIHlvdSdsbCBkaWUgaW5zdGFudGx5IGF0IHRoaXMgcG9pbnQuXG4gICAqL1xuICBwdWJsaWMgbGF6eURyYXdidWZmZXJzKFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgbnVtQnVmZmVyczogbnVtYmVyLFxuICAgIHtcbiAgICAgIGlzRmxvYXQgPSBmYWxzZSxcbiAgICAgIGRlcHRoRm9ybWF0ID0gdGhpcy5wcmVmZXJyZWREZXB0aEZvcm1hdFxuICAgIH0gPSB7fVxuICApOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB7XG4gICAgaWYgKCBHTF9NQVhfRFJBV19CVUZGRVJTIDwgbnVtQnVmZmVycyApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvciggJ0dMQ2F0OiBNYXhpbXVtIGRyYXcgYnVmZmVycyBjb3VudCBleGNlZWRlZCcgKTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0dXJlczogR0xDYXRUZXh0dXJlPFRDb250ZXh0PltdID0gW107XG4gICAgbGV0IHJlbmRlcmJ1ZmZlcjogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBmcmFtZWJ1ZmZlcjogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgLy8gPT0gZnJhbWVidWZmZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgZnJhbWVidWZmZXIgPSB0aGlzLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XG5cbiAgICAgIC8vID09IHJlbmRlcmJ1ZmZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGNvbnN0IHJlbmRlcmJ1ZmZlciA9IHRoaXMuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgICByZW5kZXJidWZmZXIucmVuZGVyYnVmZmVyU3RvcmFnZSggd2lkdGgsIGhlaWdodCwgeyBmb3JtYXQ6IGRlcHRoRm9ybWF0IH0gKTtcbiAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFJlbmRlcmJ1ZmZlciggcmVuZGVyYnVmZmVyLCB7IGF0dGFjaG1lbnQ6IEdMX0RFUFRIX0FUVEFDSE1FTlQgfSApO1xuXG4gICAgICAvLyA9PSB0ZXh0dXJlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBudW1CdWZmZXJzOyBpICsrICkge1xuICAgICAgICBjb25zdCB0ZXh0dXJlID0gdGhpcy5jcmVhdGVUZXh0dXJlKCk7XG4gICAgICAgIGlmICggaXNGbG9hdCApIHtcbiAgICAgICAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkoXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICB7IGludGVybmFsZm9ybWF0OiBHTF9SR0JBMzJGLCBmb3JtYXQ6IEdMX1JHQkEsIHR5cGU6IEdMX0ZMT0FUIH1cbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21BcnJheSggd2lkdGgsIGhlaWdodCwgbnVsbCApO1xuICAgICAgICB9XG4gICAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFRleHR1cmUoIHRleHR1cmUsIHsgYXR0YWNobWVudDogR0xfQ09MT1JfQVRUQUNITUVOVDAgKyBpIH0gKTtcbiAgICAgIH1cblxuICAgICAgLy8gPT0gYWxtb3N0IGRvbmUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgcmV0dXJuIGZyYW1lYnVmZmVyO1xuICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgdGV4dHVyZXMuZm9yRWFjaCggKCB0ZXh0dXJlICkgPT4ge1xuICAgICAgICB0ZXh0dXJlLmRpc3Bvc2UoKTtcbiAgICAgIH0gKTtcbiAgICAgIHJlbmRlcmJ1ZmZlcj8uZGlzcG9zZSgpO1xuICAgICAgZnJhbWVidWZmZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgb2YgYGdsLmRyYXdCdWZmZXJzYC5cbiAgICpcbiAgICoge0BsaW5rIGRyYXdCdWZmZXJzfSBpcyBiZXR0ZXIuXG4gICAqL1xuICBwdWJsaWMgcmF3RHJhd0J1ZmZlcnMoIGJ1ZmZlcnM6IEdMZW51bVtdICk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYmIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGdsLmRyYXdCdWZmZXJzKCBidWZmZXJzICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4dCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCAnV0VCR0xfZHJhd19idWZmZXJzJyApO1xuICAgICAgZXh0Py5kcmF3QnVmZmVyc1dFQkdMKCBidWZmZXJzICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHtAbGluayByYXdEcmF3QnVmZmVyc30gYnV0IGJldHRlci5cbiAgICpcbiAgICogQ2FsbCB0aGlzIGJlZm9yZSB5b3UncmUgZ29ubmEgdXNlIGRyYXcgYnVmZmVycy5cbiAgICogSWYgeW91IGNhbid0IGdyYWIgYFdFQkdMX2RyYXdfYnVmZmVyc2AgZXh0ZW5zaW9uLCB5b3UnbGwgZGllIGluc3RhbnRseSBhdCB0aGlzIHBvaW50LlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGRyYXcgYnVmZmVycyBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgZHJhd0J1ZmZlcnM8VD4oXG4gICAgYnVmZmVyc09yTnVtQnVmZmVycz86IEdMZW51bVtdIHwgbnVtYmVyLFxuICAgIGNhbGxiYWNrPzogKCBidWZmZXJzOiBHTGVudW1bXSApID0+IFRcbiAgKTogVCB7XG4gICAgbGV0IGJ1ZmZlcnM6IEdMZW51bVtdO1xuXG4gICAgaWYgKCBBcnJheS5pc0FycmF5KCBidWZmZXJzT3JOdW1CdWZmZXJzICkgKSB7XG4gICAgICBidWZmZXJzID0gYnVmZmVyc09yTnVtQnVmZmVycztcbiAgICB9IGVsc2UgaWYgKCBidWZmZXJzT3JOdW1CdWZmZXJzICkge1xuICAgICAgYnVmZmVycyA9IFtdO1xuICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgYnVmZmVyc09yTnVtQnVmZmVyczsgaSArKyApIHtcbiAgICAgICAgYnVmZmVyc1sgaSBdID0gR0xfQ09MT1JfQVRUQUNITUVOVDAgKyBpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBidWZmZXJzID0gWyBHTF9DT0xPUl9BVFRBQ0hNRU5UMCBdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlckRyYXdCdWZmZXJzLmJpbmQoIGJ1ZmZlcnMsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogYSB3cmFwcGVyIG9mIGRyYXdFbGVtZW50c0luc3RhbmNlZC5cbiAgICovXG4gIHB1YmxpYyBkcmF3QXJyYXlzSW5zdGFuY2VkKFxuICAgIG1vZGU6IEdMZW51bSxcbiAgICBmaXJzdDogR0xpbnQsXG4gICAgY291bnQ6IEdMc2l6ZWksXG4gICAgcHJpbWNvdW50OiBHTHNpemVpXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XG5cbiAgICBpZiAoIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgJiYgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgZ2wuZHJhd0FycmF5c0luc3RhbmNlZCggbW9kZSwgZmlyc3QsIGNvdW50LCBwcmltY291bnQgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5nZXRFeHRlbnNpb24oICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJywgdHJ1ZSApO1xuICAgICAgZXh0LmRyYXdBcnJheXNJbnN0YW5jZWRBTkdMRSggbW9kZSwgZmlyc3QsIGNvdW50LCBwcmltY291bnQgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYSB3cmFwcGVyIG9mIGRyYXdFbGVtZW50c0luc3RhbmNlZC5cbiAgICovXG4gIHB1YmxpYyBkcmF3RWxlbWVudHNJbnN0YW5jZWQoXG4gICAgbW9kZTogR0xlbnVtLFxuICAgIGNvdW50OiBHTHNpemVpLFxuICAgIHR5cGU6IEdMZW51bSxcbiAgICBvZmZzZXQ6IEdMaW50cHRyLFxuICAgIGluc3RhbmNlQ291bnQ6IEdMc2l6ZWlcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcztcblxuICAgIGlmICggV2ViR0wyUmVuZGVyaW5nQ29udGV4dCAmJiBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBnbC5kcmF3RWxlbWVudHNJbnN0YW5jZWQoIG1vZGUsIGNvdW50LCB0eXBlLCBvZmZzZXQsIGluc3RhbmNlQ291bnQgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5nZXRFeHRlbnNpb24oICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJywgdHJ1ZSApO1xuICAgICAgZXh0LmRyYXdFbGVtZW50c0luc3RhbmNlZEFOR0xFKCBtb2RlLCBjb3VudCwgdHlwZSwgb2Zmc2V0LCBpbnN0YW5jZUNvdW50ICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBjdXJyZW50IGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGNsZWFyKFxuICAgIHJlZCA9IDAuMCxcbiAgICBncmVlbiA9IDAuMCxcbiAgICBibHVlID0gMC4wLFxuICAgIGFscGhhID0gMS4wLFxuICAgIGRlcHRoID0gMS4wXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgZ2wuY2xlYXJDb2xvciggcmVkLCBncmVlbiwgYmx1ZSwgYWxwaGEgKTtcbiAgICBnbC5jbGVhckRlcHRoKCBkZXB0aCApO1xuICAgIGdsLmNsZWFyKCBHTF9DT0xPUl9CVUZGRVJfQklUIHwgR0xfREVQVEhfQlVGRkVSX0JJVCApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJhc2ljYWxseSBqdXN0IGEgYGdsLmJsaXRGcmFtZWJ1ZmZlcmAuXG4gICAqL1xuICBwdWJsaWMgYmxpdEZyYW1lYnVmZmVyKFxuICAgIHNyYzogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIGRzdDogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIHtcbiAgICAgIHNyY1ZpZXdwb3J0ID0gWyAwLCAwLCBzcmM/LnJlbmRlcmJ1ZmZlcj8ud2lkdGggPz8gMCwgc3JjPy5yZW5kZXJidWZmZXI/LmhlaWdodCA/PyAwIF0sXG4gICAgICBkc3RWaWV3cG9ydCA9IFsgMCwgMCwgZHN0Py5yZW5kZXJidWZmZXI/LndpZHRoID8/IDAsIGRzdD8ucmVuZGVyYnVmZmVyPy5oZWlnaHQgPz8gMCBdLFxuICAgICAgbWFzayA9IEdMX0NPTE9SX0JVRkZFUl9CSVQsXG4gICAgICBmaWx0ZXIgPSBHTF9ORUFSRVNUXG4gICAgfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYmIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlciggR0xfUkVBRF9GUkFNRUJVRkZFUiwgc3JjPy5yYXcgPz8gbnVsbCApO1xuICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKCBHTF9EUkFXX0ZSQU1FQlVGRkVSLCBkc3Q/LnJhdyA/PyBudWxsICk7XG4gICAgICBnbC5ibGl0RnJhbWVidWZmZXIoXG4gICAgICAgIHNyY1ZpZXdwb3J0WyAwIF0sXG4gICAgICAgIHNyY1ZpZXdwb3J0WyAxIF0sXG4gICAgICAgIHNyY1ZpZXdwb3J0WyAyIF0sXG4gICAgICAgIHNyY1ZpZXdwb3J0WyAzIF0sXG4gICAgICAgIGRzdFZpZXdwb3J0WyAwIF0sXG4gICAgICAgIGRzdFZpZXdwb3J0WyAxIF0sXG4gICAgICAgIGRzdFZpZXdwb3J0WyAyIF0sXG4gICAgICAgIGRzdFZpZXdwb3J0WyAzIF0sXG4gICAgICAgIG1hc2ssXG4gICAgICAgIGZpbHRlclxuICAgICAgKTtcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlciggR0xfUkVBRF9GUkFNRUJVRkZFUiwgbnVsbCApO1xuICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKCBHTF9EUkFXX0ZSQU1FQlVGRkVSLCBudWxsICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEdMQ2F0RXJyb3JzLldlYkdMMkV4Y2x1c2l2ZUVycm9yO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBWU8sSUFB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
