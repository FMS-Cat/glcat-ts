/*!
* @fms-cat/glcat-ts v0.13.0
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
        GLCatRenderbuffer.prototype.renderbufferStorage = function (width, height, _a) {
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
        GLCatRenderbuffer.prototype.renderbufferStorageMultisample = function (width, height, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.samples, samples = _c === void 0 ? this.__glCat.preferredMultisampleSamples : _c, _d = _b.format, format = _d === void 0 ? GL_DEPTH_ATTACHMENT : _d, _e = _b.fallbackWebGL1, fallbackWebGL1 = _e === void 0 ? true : _e;
            var gl = this.__glCat.gl;
            this.__glCat.bindRenderbuffer(this, function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xjYXQuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9HTENvbnN0YW50cy50cyIsIi4uL3NyYy91dGlscy9CaW5kSGVscGVyLnRzIiwiLi4vc3JjL0dMQ2F0QnVmZmVyLnRzIiwiLi4vc3JjL0dMQ2F0RXJyb3JzLnRzIiwiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy9HTENhdEZyYW1lYnVmZmVyLnRzIiwiLi4vc3JjL0dMQ2F0UHJvZ3JhbS50cyIsIi4uL3NyYy9HTENhdFJlbmRlcmJ1ZmZlci50cyIsIi4uL3NyYy9HTENhdFNoYWRlci50cyIsIi4uL3NyYy9HTENhdFRleHR1cmUudHMiLCIuLi9zcmMvR0xDYXRWZXJ0ZXhBcnJheS50cyIsIi4uL3NyYy9HTENhdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgR0xfQUNUSVZFX0FUVFJJQlVURVMgPSAweDhiODk7XG5leHBvcnQgY29uc3QgR0xfQUNUSVZFX1RFWFRVUkUgPSAweDg0ZTA7XG5leHBvcnQgY29uc3QgR0xfQUNUSVZFX1VOSUZPUk1fQkxPQ0tTID0gMHg4YTM2O1xuZXhwb3J0IGNvbnN0IEdMX0FDVElWRV9VTklGT1JNUyA9IDB4OGI4NjtcbmV4cG9ydCBjb25zdCBHTF9BTElBU0VEX0xJTkVfV0lEVEhfUkFOR0UgPSAweDg0NmU7XG5leHBvcnQgY29uc3QgR0xfQUxJQVNFRF9QT0lOVF9TSVpFX1JBTkdFID0gMHg4NDZkO1xuZXhwb3J0IGNvbnN0IEdMX0FMUEhBID0gMHgxOTA2O1xuZXhwb3J0IGNvbnN0IEdMX0FMUEhBX0JJVFMgPSAweDBkNTU7XG5leHBvcnQgY29uc3QgR0xfQUxSRUFEWV9TSUdOQUxFRCA9IDB4OTExYTtcbmV4cG9ydCBjb25zdCBHTF9BTFdBWVMgPSAweDAyMDc7XG5leHBvcnQgY29uc3QgR0xfQU5ZX1NBTVBMRVNfUEFTU0VEID0gMHg4YzJmO1xuZXhwb3J0IGNvbnN0IEdMX0FOWV9TQU1QTEVTX1BBU1NFRF9DT05TRVJWQVRJVkUgPSAweDhkNmE7XG5leHBvcnQgY29uc3QgR0xfQVJSQVlfQlVGRkVSID0gMHg4ODkyO1xuZXhwb3J0IGNvbnN0IEdMX0FSUkFZX0JVRkZFUl9CSU5ESU5HID0gMHg4ODk0O1xuZXhwb3J0IGNvbnN0IEdMX0FUVEFDSEVEX1NIQURFUlMgPSAweDhiODU7XG5leHBvcnQgY29uc3QgR0xfQkFDSyA9IDB4MDQwNTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORCA9IDB4MGJlMjtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9DT0xPUiA9IDB4ODAwNTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9EU1RfQUxQSEEgPSAweDgwY2E7XG5leHBvcnQgY29uc3QgR0xfQkxFTkRfRFNUX1JHQiA9IDB4ODBjODtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9FUVVBVElPTiA9IDB4ODAwOTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9FUVVBVElPTl9BTFBIQSA9IDB4ODgzZDtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9FUVVBVElPTl9SR0IgPSAweDgwMDk7XG5leHBvcnQgY29uc3QgR0xfQkxFTkRfU1JDX0FMUEhBID0gMHg4MGNiO1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX1NSQ19SR0IgPSAweDgwYzk7XG5leHBvcnQgY29uc3QgR0xfQkxVRV9CSVRTID0gMHgwZDU0O1xuZXhwb3J0IGNvbnN0IEdMX0JPT0wgPSAweDhiNTY7XG5leHBvcnQgY29uc3QgR0xfQk9PTF9WRUMyID0gMHg4YjU3O1xuZXhwb3J0IGNvbnN0IEdMX0JPT0xfVkVDMyA9IDB4OGI1ODtcbmV4cG9ydCBjb25zdCBHTF9CT09MX1ZFQzQgPSAweDhiNTk7XG5leHBvcnQgY29uc3QgR0xfQlJPV1NFUl9ERUZBVUxUX1dFQkdMID0gMHg5MjQ0O1xuZXhwb3J0IGNvbnN0IEdMX0JVRkZFUl9TSVpFID0gMHg4NzY0O1xuZXhwb3J0IGNvbnN0IEdMX0JVRkZFUl9VU0FHRSA9IDB4ODc2NTtcbmV4cG9ydCBjb25zdCBHTF9CWVRFID0gMHgxNDAwO1xuZXhwb3J0IGNvbnN0IEdMX0NDVyA9IDB4MDkwMTtcbmV4cG9ydCBjb25zdCBHTF9DTEFNUF9UT19FREdFID0gMHg4MTJmO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SID0gMHgxODAwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQwID0gMHg4Y2UwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQwX1dFQkdMID0gMHg4Y2UwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxID0gMHg4Y2UxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxX1dFQkdMID0gMHg4Y2UxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMCA9IDB4OGNlYTtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTBfV0VCR0wgPSAweDhjZWE7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDExID0gMHg4Y2ViO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMV9XRUJHTCA9IDB4OGNlYjtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTIgPSAweDhjZWM7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDEyX1dFQkdMID0gMHg4Y2VjO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMyA9IDB4OGNlZDtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTNfV0VCR0wgPSAweDhjZWQ7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDE0ID0gMHg4Y2VlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxNF9XRUJHTCA9IDB4OGNlZTtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTUgPSAweDhjZWY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDE1X1dFQkdMID0gMHg4Y2VmO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQyID0gMHg4Y2UyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQyX1dFQkdMID0gMHg4Y2UyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQzID0gMHg4Y2UzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQzX1dFQkdMID0gMHg4Y2UzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ0ID0gMHg4Y2U0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ0X1dFQkdMID0gMHg4Y2U0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ1ID0gMHg4Y2U1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ1X1dFQkdMID0gMHg4Y2U1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ2ID0gMHg4Y2U2O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ2X1dFQkdMID0gMHg4Y2U2O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ3ID0gMHg4Y2U3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ3X1dFQkdMID0gMHg4Y2U3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ4ID0gMHg4Y2U4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ4X1dFQkdMID0gMHg4Y2U4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ5ID0gMHg4Y2U5O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQ5X1dFQkdMID0gMHg4Y2U5O1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0JVRkZFUl9CSVQgPSAweDAwMDA0MDAwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0NMRUFSX1ZBTFVFID0gMHgwYzIyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX1dSSVRFTUFTSyA9IDB4MGMyMztcbmV4cG9ydCBjb25zdCBHTF9DT01QQVJFX1JFRl9UT19URVhUVVJFID0gMHg4ODRlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBJTEVfU1RBVFVTID0gMHg4YjgxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBMRVRJT05fU1RBVFVTX0tIUiA9IDB4OTFiMTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1IxMV9FQUMgPSAweDkyNzA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SRzExX0VBQyA9IDB4OTI3MjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQl9BVENfV0VCR0wgPSAweDhjOTI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JfRVRDMV9XRUJHTCA9IDB4OGQ2NDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQl9QVlJUQ18yQlBQVjFfSU1HID0gMHg4YzAxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCX1BWUlRDXzRCUFBWMV9JTUcgPSAweDhjMDA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JfUzNUQ19EWFQxX0VYVCA9IDB4ODNmMDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQjhfRVRDMiA9IDB4OTI3NDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQjhfUFVOQ0hUSFJPVUdIX0FMUEhBMV9FVEMyID0gMHg5Mjc4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEwWDEwX0tIUiA9IDB4OTNiYjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMFg1X0tIUiA9IDB4OTNiODtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMFg2X0tIUiA9IDB4OTNiOTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMFg4X0tIUiA9IDB4OTNiYTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMlgxMF9LSFIgPSAweDkzYmM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfMTJYMTJfS0hSID0gMHg5M2JkO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzRYNF9LSFIgPSAweDkzYjA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfNVg0X0tIUiA9IDB4OTNiMTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ181WDVfS0hSID0gMHg5M2IyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzZYNV9LSFIgPSAweDkzYjM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfNlg2X0tIUiA9IDB4OTNiNDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ184WDVfS0hSID0gMHg5M2I1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzhYNl9LSFIgPSAweDkzYjY7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfOFg4X0tIUiA9IDB4OTNiNztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVRDX0VYUExJQ0lUX0FMUEhBX1dFQkdMID0gMHg4YzkyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BVENfSU5URVJQT0xBVEVEX0FMUEhBX1dFQkdMID0gMHg4N2VlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9QVlJUQ18yQlBQVjFfSU1HID0gMHg4YzAzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9QVlJUQ180QlBQVjFfSU1HID0gMHg4YzAyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDFfRVhUID0gMHg4M2YxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDNfRVhUID0gMHg4M2YyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDVfRVhUID0gMHg4M2YzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQThfRVRDMl9FQUMgPSAweDkyNzU7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TSUdORURfUjExX0VBQyA9IDB4OTI3MTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NJR05FRF9SRzExX0VBQyA9IDB4OTI3MztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQxX0VYVCA9IDB4OGM0ZDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQzX0VYVCA9IDB4OGM0ZTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQ1X0VYVCA9IDB4OGM0ZjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0JfUzNUQ19EWFQxX0VYVCA9IDB4OGM0YztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEwWDEwX0tIUiA9IDB4OTNkYjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEwWDVfS0hSID0gMHg5M2Q4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTBYNl9LSFIgPSAweDkzZDk7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ18xMFg4X0tIUiA9IDB4OTNkYTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEyWDEwX0tIUiA9IDB4OTNkYztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEyWDEyX0tIUiA9IDB4OTNkZDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzRYNF9LSFIgPSAweDkzZDA7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ181WDRfS0hSID0gMHg5M2QxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfNVg1X0tIUiA9IDB4OTNkMjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzZYNV9LSFIgPSAweDkzZDM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ182WDZfS0hSID0gMHg5M2Q0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfOFg1X0tIUiA9IDB4OTNkNTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzhYNl9LSFIgPSAweDkzZDY7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ184WDhfS0hSID0gMHg5M2Q3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0VUQzJfRUFDID0gMHg5Mjc3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfRVRDMiA9IDB4OTI3NjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X1BVTkNIVEhST1VHSF9BTFBIQTFfRVRDMiA9IDB4OTI3OTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1RFWFRVUkVfRk9STUFUUyA9IDB4ODZhMztcbmV4cG9ydCBjb25zdCBHTF9DT05ESVRJT05fU0FUSVNGSUVEID0gMHg5MTFjO1xuZXhwb3J0IGNvbnN0IEdMX0NPTlNUQU5UX0FMUEhBID0gMHg4MDAzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTlNUQU5UX0NPTE9SID0gMHg4MDAxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTlRFWFRfTE9TVF9XRUJHTCA9IDB4OTI0MjtcbmV4cG9ydCBjb25zdCBHTF9DT1BZX1JFQURfQlVGRkVSID0gMHg4ZjM2O1xuZXhwb3J0IGNvbnN0IEdMX0NPUFlfUkVBRF9CVUZGRVJfQklORElORyA9IDB4OGYzNjtcbmV4cG9ydCBjb25zdCBHTF9DT1BZX1dSSVRFX0JVRkZFUiA9IDB4OGYzNztcbmV4cG9ydCBjb25zdCBHTF9DT1BZX1dSSVRFX0JVRkZFUl9CSU5ESU5HID0gMHg4ZjM3O1xuZXhwb3J0IGNvbnN0IEdMX0NVTExfRkFDRSA9IDB4MGI0NDtcbmV4cG9ydCBjb25zdCBHTF9DVUxMX0ZBQ0VfTU9ERSA9IDB4MGI0NTtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1BST0dSQU0gPSAweDhiOGQ7XG5leHBvcnQgY29uc3QgR0xfQ1VSUkVOVF9RVUVSWSA9IDB4ODg2NTtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1FVRVJZX0VYVCA9IDB4ODg2NTtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1ZFUlRFWF9BVFRSSUIgPSAweDg2MjY7XG5leHBvcnQgY29uc3QgR0xfQ1cgPSAweDA5MDA7XG5leHBvcnQgY29uc3QgR0xfREVDUiA9IDB4MWUwMztcbmV4cG9ydCBjb25zdCBHTF9ERUNSX1dSQVAgPSAweDg1MDg7XG5leHBvcnQgY29uc3QgR0xfREVMRVRFX1NUQVRVUyA9IDB4OGI4MDtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSCA9IDB4MTgwMTtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9BVFRBQ0hNRU5UID0gMHg4ZDAwO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0JJVFMgPSAweDBkNTY7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQlVGRkVSX0JJVCA9IDB4MDAwMDAxMDA7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ0xFQVJfVkFMVUUgPSAweDBiNzM7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ09NUE9ORU5UID0gMHgxOTAyO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0NPTVBPTkVOVDE2ID0gMHg4MWE1O1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0NPTVBPTkVOVDI0ID0gMHg4MWE2O1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0NPTVBPTkVOVDMyRiA9IDB4OGNhYztcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9GVU5DID0gMHgwYjc0O1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX1JBTkdFID0gMHgwYjcwO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX1NURU5DSUwgPSAweDg0Zjk7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfU1RFTkNJTF9BVFRBQ0hNRU5UID0gMHg4MjFhO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX1RFU1QgPSAweDBiNzE7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfV1JJVEVNQVNLID0gMHgwYjcyO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIMjRfU1RFTkNJTDggPSAweDg4ZjA7XG5leHBvcnQgY29uc3QgR0xfREVQVEgzMkZfU1RFTkNJTDggPSAweDhjYWQ7XG5leHBvcnQgY29uc3QgR0xfRElUSEVSID0gMHgwYmQwO1xuZXhwb3J0IGNvbnN0IEdMX0RPTlRfQ0FSRSA9IDB4MTEwMDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjAgPSAweDg4MjU7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIwX1dFQkdMID0gMHg4ODI1O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMSA9IDB4ODgyNjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjFfV0VCR0wgPSAweDg4MjY7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMCA9IDB4ODgyZjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEwX1dFQkdMID0gMHg4ODJmO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTEgPSAweDg4MzA7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMV9XRUJHTCA9IDB4ODgzMDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEyID0gMHg4ODMxO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTJfV0VCR0wgPSAweDg4MzE7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMyA9IDB4ODgzMjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEzX1dFQkdMID0gMHg4ODMyO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTQgPSAweDg4MzM7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxNF9XRUJHTCA9IDB4ODgzMztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjE1ID0gMHg4ODM0O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTVfV0VCR0wgPSAweDg4MzQ7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIyID0gMHg4ODI3O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMl9XRUJHTCA9IDB4ODgyNztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjMgPSAweDg4Mjg7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIzX1dFQkdMID0gMHg4ODI4O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNCA9IDB4ODgyOTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjRfV0VCR0wgPSAweDg4Mjk7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI1ID0gMHg4ODJhO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNV9XRUJHTCA9IDB4ODgyYTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjYgPSAweDg4MmI7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI2X1dFQkdMID0gMHg4ODJiO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNyA9IDB4ODgyYztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjdfV0VCR0wgPSAweDg4MmM7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI4ID0gMHg4ODJkO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSOF9XRUJHTCA9IDB4ODgyZDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjkgPSAweDg4MmU7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI5X1dFQkdMID0gMHg4ODJlO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfRlJBTUVCVUZGRVIgPSAweDhjYTk7XG5leHBvcnQgY29uc3QgR0xfRFJBV19GUkFNRUJVRkZFUl9CSU5ESU5HID0gMHg4Y2E2O1xuZXhwb3J0IGNvbnN0IEdMX0RTVF9BTFBIQSA9IDB4MDMwNDtcbmV4cG9ydCBjb25zdCBHTF9EU1RfQ09MT1IgPSAweDAzMDY7XG5leHBvcnQgY29uc3QgR0xfRFlOQU1JQ19DT1BZID0gMHg4OGVhO1xuZXhwb3J0IGNvbnN0IEdMX0RZTkFNSUNfRFJBVyA9IDB4ODhlODtcbmV4cG9ydCBjb25zdCBHTF9EWU5BTUlDX1JFQUQgPSAweDg4ZTk7XG5leHBvcnQgY29uc3QgR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIgPSAweDg4OTM7XG5leHBvcnQgY29uc3QgR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVJfQklORElORyA9IDB4ODg5NTtcbmV4cG9ydCBjb25zdCBHTF9FUVVBTCA9IDB4MDIwMjtcbmV4cG9ydCBjb25zdCBHTF9GQVNURVNUID0gMHgxMTAxO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUID0gMHgxNDA2O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUXzMyX1VOU0lHTkVEX0lOVF8yNF84X1JFViA9IDB4OGRhZDtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQyID0gMHg4YjVhO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDJYMyA9IDB4OGI2NTtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQyWDQgPSAweDhiNjY7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUMyA9IDB4OGI1YjtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQzWDIgPSAweDhiNjc7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUM1g0ID0gMHg4YjY4O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDQgPSAweDhiNWM7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUNFgyID0gMHg4YjY5O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDRYMyA9IDB4OGI2YTtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9WRUMyID0gMHg4YjUwO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX1ZFQzMgPSAweDhiNTE7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfVkVDNCA9IDB4OGI1MjtcbmV4cG9ydCBjb25zdCBHTF9GUkFHTUVOVF9TSEFERVIgPSAweDhiMzA7XG5leHBvcnQgY29uc3QgR0xfRlJBR01FTlRfU0hBREVSX0RFUklWQVRJVkVfSElOVCA9IDB4OGI4YjtcbmV4cG9ydCBjb25zdCBHTF9GUkFHTUVOVF9TSEFERVJfREVSSVZBVElWRV9ISU5UX09FUyA9IDB4OGI4YjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUiA9IDB4OGQ0MDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0FMUEhBX1NJWkUgPSAweDgyMTU7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9CTFVFX1NJWkUgPSAweDgyMTQ7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9DT0xPUl9FTkNPRElORyA9IDB4ODIxMDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0NPTE9SX0VOQ09ESU5HX0VYVCA9IDB4ODIxMDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0NPTVBPTkVOVF9UWVBFID0gMHg4MjExO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfQ09NUE9ORU5UX1RZUEVfRVhUID0gMHg4MjExO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfREVQVEhfU0laRSA9IDB4ODIxNjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0dSRUVOX1NJWkUgPSAweDgyMTM7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9PQkpFQ1RfTkFNRSA9IDB4OGNkMTtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX09CSkVDVF9UWVBFID0gMHg4Y2QwO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfUkVEX1NJWkUgPSAweDgyMTI7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9TVEVOQ0lMX1NJWkUgPSAweDgyMTc7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0NVQkVfTUFQX0ZBQ0UgPSAweDhjZDM7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0xBWUVSID0gMHg4Y2Q0O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfVEVYVFVSRV9MRVZFTCA9IDB4OGNkMjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9CSU5ESU5HID0gMHg4Y2E2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0NPTVBMRVRFID0gMHg4Y2Q1O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0RFRkFVTFQgPSAweDgyMTg7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfSU5DT01QTEVURV9BVFRBQ0hNRU5UID0gMHg4Y2Q2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfRElNRU5TSU9OUyA9IDB4OGNkOTtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX01JU1NJTkdfQVRUQUNITUVOVCA9IDB4OGNkNztcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX01VTFRJU0FNUExFID0gMHg4ZDU2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX1VOU1VQUE9SVEVEID0gMHg4Y2RkO1xuZXhwb3J0IGNvbnN0IEdMX0ZST05UID0gMHgwNDA0O1xuZXhwb3J0IGNvbnN0IEdMX0ZST05UX0FORF9CQUNLID0gMHgwNDA4O1xuZXhwb3J0IGNvbnN0IEdMX0ZST05UX0ZBQ0UgPSAweDBiNDY7XG5leHBvcnQgY29uc3QgR0xfRlVOQ19BREQgPSAweDgwMDY7XG5leHBvcnQgY29uc3QgR0xfRlVOQ19SRVZFUlNFX1NVQlRSQUNUID0gMHg4MDBiO1xuZXhwb3J0IGNvbnN0IEdMX0ZVTkNfU1VCU1RSQUNUID0gMHg4MDBhO1xuZXhwb3J0IGNvbnN0IEdMX0dFTkVSQVRFX01JUE1BUF9ISU5UID0gMHg4MTkyO1xuZXhwb3J0IGNvbnN0IEdMX0dFUVVBTCA9IDB4MDIwNjtcbmV4cG9ydCBjb25zdCBHTF9HUFVfRElTSk9JTlRfRVhUID0gMHg4ZmJiO1xuZXhwb3J0IGNvbnN0IEdMX0dSRUFURVIgPSAweDAyMDQ7XG5leHBvcnQgY29uc3QgR0xfR1JFRU5fQklUUyA9IDB4MGQ1MztcbmV4cG9ydCBjb25zdCBHTF9IQUxGX0ZMT0FUID0gMHgxNDBiO1xuZXhwb3J0IGNvbnN0IEdMX0hBTEZfRkxPQVRfT0VTID0gMHg4ZDYxO1xuZXhwb3J0IGNvbnN0IEdMX0hJR0hfRkxPQVQgPSAweDhkZjI7XG5leHBvcnQgY29uc3QgR0xfSElHSF9JTlQgPSAweDhkZjU7XG5leHBvcnQgY29uc3QgR0xfSU1QTEVNRU5UQVRJT05fQ09MT1JfUkVBRF9GT1JNQVQgPSAweDhiOWI7XG5leHBvcnQgY29uc3QgR0xfSU1QTEVNRU5UQVRJT05fQ09MT1JfUkVBRF9UWVBFID0gMHg4YjlhO1xuZXhwb3J0IGNvbnN0IEdMX0lOQ1IgPSAweDFlMDI7XG5leHBvcnQgY29uc3QgR0xfSU5DUl9XUkFQID0gMHg4NTA3O1xuZXhwb3J0IGNvbnN0IEdMX0lOVCA9IDB4MTQwNDtcbmV4cG9ydCBjb25zdCBHTF9JTlRfMl8xMF8xMF8xMF9SRVYgPSAweDhkOWY7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfMkQgPSAweDhkY2E7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfMkRfQVJSQVkgPSAweDhkY2Y7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfM0QgPSAweDhkY2I7XG5leHBvcnQgY29uc3QgR0xfSU5UX1NBTVBMRVJfQ1VCRSA9IDB4OGRjYztcbmV4cG9ydCBjb25zdCBHTF9JTlRfVkVDMiA9IDB4OGI1MztcbmV4cG9ydCBjb25zdCBHTF9JTlRfVkVDMyA9IDB4OGI1NDtcbmV4cG9ydCBjb25zdCBHTF9JTlRfVkVDNCA9IDB4OGI1NTtcbmV4cG9ydCBjb25zdCBHTF9JTlRFUkxFQVZFRF9BVFRSSUJTID0gMHg4YzhjO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfRU5VTSA9IDB4MDUwMDtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX0ZSQU1FQlVGRkVSX09QRVJBVElPTiA9IDB4MDUwNjtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX0lOREVYID0gMHhmZmZmZmZmZjtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX09QRVJBVElPTiA9IDB4MDUwMjtcbmV4cG9ydCBjb25zdCBHTF9JTlZBTElEX1ZBTFVFID0gMHgwNTAxO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkVSVCA9IDB4MTUwYTtcbmV4cG9ydCBjb25zdCBHTF9LRUVQID0gMHgxZTAwO1xuZXhwb3J0IGNvbnN0IEdMX0xFUVVBTCA9IDB4MDIwMztcbmV4cG9ydCBjb25zdCBHTF9MRVNTID0gMHgwMjAxO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVfTE9PUCA9IDB4MDAwMjtcbmV4cG9ydCBjb25zdCBHTF9MSU5FX1NUUklQID0gMHgwMDAzO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVfV0lEVEggPSAweDBiMjE7XG5leHBvcnQgY29uc3QgR0xfTElORUFSID0gMHgyNjAxO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVBUl9NSVBNQVBfTElORUFSID0gMHgyNzAzO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVBUl9NSVBNQVBfTkVBUkVTVCA9IDB4MjcwMTtcbmV4cG9ydCBjb25zdCBHTF9MSU5FUyA9IDB4MDAwMTtcbmV4cG9ydCBjb25zdCBHTF9MSU5LX1NUQVRVUyA9IDB4OGI4MjtcbmV4cG9ydCBjb25zdCBHTF9MT1dfRkxPQVQgPSAweDhkZjA7XG5leHBvcnQgY29uc3QgR0xfTE9XX0lOVCA9IDB4OGRmMztcbmV4cG9ydCBjb25zdCBHTF9MVU1JTkFOQ0UgPSAweDE5MDk7XG5leHBvcnQgY29uc3QgR0xfTFVNSU5BTkNFX0FMUEhBID0gMHgxOTBhO1xuZXhwb3J0IGNvbnN0IEdMX01BWCA9IDB4ODAwODtcbmV4cG9ydCBjb25zdCBHTF9NQVhfM0RfVEVYVFVSRV9TSVpFID0gMHg4MDczO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9BUlJBWV9URVhUVVJFX0xBWUVSUyA9IDB4ODhmZjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ0xJRU5UX1dBSVRfVElNRU9VVF9XRUJHTCA9IDB4OTI0NztcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ09MT1JfQVRUQUNITUVOVFMgPSAweDhjZGY7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTE9SX0FUVEFDSE1FTlRTX1dFQkdMID0gMHg4Y2RmO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DT01CSU5FRF9GUkFHTUVOVF9VTklGT1JNX0NPTVBPTkVOVFMgPSAweDhhMzM7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTUJJTkVEX1RFWFRVUkVfSU1BR0VfVU5JVFMgPSAweDhiNGQ7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTUJJTkVEX1VOSUZPUk1fQkxPQ0tTID0gMHg4YTJlO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DT01CSU5FRF9WRVJURVhfVU5JRk9STV9DT01QT05FTlRTID0gMHg4YTMxO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DVUJFX01BUF9URVhUVVJFX1NJWkUgPSAweDg1MWM7XG5leHBvcnQgY29uc3QgR0xfTUFYX0RSQVdfQlVGRkVSUyA9IDB4ODgyNDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfRFJBV19CVUZGRVJTX1dFQkdMID0gMHg4ODI0O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FTEVNRU5UX0lOREVYID0gMHg4ZDZiO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FTEVNRU5UU19JTkRJQ0VTID0gMHg4MGU5O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FTEVNRU5UU19WRVJUSUNFUyA9IDB4ODBlODtcbmV4cG9ydCBjb25zdCBHTF9NQVhfRVhUID0gMHg4MDA4O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9JTlBVVF9DT01QT05FTlRTID0gMHg5MTI1O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9VTklGT1JNX0JMT0NLUyA9IDB4OGEyZDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfRlJBR01FTlRfVU5JRk9STV9DT01QT05FTlRTID0gMHg4YjQ5O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9VTklGT1JNX1ZFQ1RPUlMgPSAweDhkZmQ7XG5leHBvcnQgY29uc3QgR0xfTUFYX1BST0dSQU1fVEVYRUxfT0ZGU0VUID0gMHg4OTA1O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9SRU5ERVJCVUZGRVJfU0laRSA9IDB4ODRlODtcbmV4cG9ydCBjb25zdCBHTF9NQVhfU0FNUExFUyA9IDB4OGQ1NztcbmV4cG9ydCBjb25zdCBHTF9NQVhfU0VSVkVSX1dBSVRfVElNRU9VVCA9IDB4OTExMTtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9JTUFHRV9VTklUUyA9IDB4ODg3MjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9MT0RfQklBUyA9IDB4ODRmZDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9NQVhfQU5JU09UUk9QWV9FWFQgPSAweDg0ZmY7XG5leHBvcnQgY29uc3QgR0xfTUFYX1RFWFRVUkVfU0laRSA9IDB4MGQzMztcbmV4cG9ydCBjb25zdCBHTF9NQVhfVFJBTlNGT1JNX0ZFRURCQUNLX0lOVEVSTEVBVkVEX0NPTVBPTkVOVFMgPSAweDhjOGE7XG5leHBvcnQgY29uc3QgR0xfTUFYX1RSQU5TRk9STV9GRUVEQkFDS19TRVBBUkFURV9BVFRSSUJTID0gMHg4YzhiO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9UUkFOU0ZPUk1fRkVFREJBQ0tfU0VQQVJBVEVfQ09NUE9ORU5UUyA9IDB4OGM4MDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVU5JRk9STV9CTE9DS19TSVpFID0gMHg4YTMwO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9VTklGT1JNX0JVRkZFUl9CSU5ESU5HUyA9IDB4OGEyZjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkFSWUlOR19DT01QT05FTlRTID0gMHg4YjRiO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WQVJZSU5HX1ZFQ1RPUlMgPSAweDhkZmM7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9BVFRSSUJTID0gMHg4ODY5O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WRVJURVhfT1VUUFVUX0NPTVBPTkVOVFMgPSAweDkxMjI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9URVhUVVJFX0lNQUdFX1VOSVRTID0gMHg4YjRjO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WRVJURVhfVU5JRk9STV9CTE9DS1MgPSAweDhhMmI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9VTklGT1JNX0NPTVBPTkVOVFMgPSAweDhiNGE7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9VTklGT1JNX1ZFQ1RPUlMgPSAweDhkZmI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZJRVdQT1JUX0RJTVMgPSAweDBkM2E7XG5leHBvcnQgY29uc3QgR0xfTUVESVVNX0ZMT0FUID0gMHg4ZGYxO1xuZXhwb3J0IGNvbnN0IEdMX01FRElVTV9JTlQgPSAweDhkZjQ7XG5leHBvcnQgY29uc3QgR0xfTUlOID0gMHg4MDA3O1xuZXhwb3J0IGNvbnN0IEdMX01JTl9FWFQgPSAweDgwMDc7XG5leHBvcnQgY29uc3QgR0xfTUlOX1BST0dSQU1fVEVYRUxfT0ZGU0VUID0gMHg4OTA0O1xuZXhwb3J0IGNvbnN0IEdMX01JUlJPUkVEX1JFUEVBVCA9IDB4ODM3MDtcbmV4cG9ydCBjb25zdCBHTF9ORUFSRVNUID0gMHgyNjAwO1xuZXhwb3J0IGNvbnN0IEdMX05FQVJFU1RfTUlQTUFQX0xJTkVBUiA9IDB4MjcwMjtcbmV4cG9ydCBjb25zdCBHTF9ORUFSRVNUX01JUE1BUF9ORUFSRVNUID0gMHgyNzAwO1xuZXhwb3J0IGNvbnN0IEdMX05FVkVSID0gMHgwMjAwO1xuZXhwb3J0IGNvbnN0IEdMX05JQ0VTVCA9IDB4MTEwMjtcbmV4cG9ydCBjb25zdCBHTF9OT19FUlJPUiA9IDA7XG5leHBvcnQgY29uc3QgR0xfTk9ORSA9IDA7XG5leHBvcnQgY29uc3QgR0xfTk9URVFVQUwgPSAweDAyMDU7XG5leHBvcnQgY29uc3QgR0xfT0JKRUNUX1RZUEUgPSAweDkxMTI7XG5leHBvcnQgY29uc3QgR0xfT05FID0gMTtcbmV4cG9ydCBjb25zdCBHTF9PTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEEgPSAweDgwMDQ7XG5leHBvcnQgY29uc3QgR0xfT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SID0gMHg4MDAyO1xuZXhwb3J0IGNvbnN0IEdMX09ORV9NSU5VU19EU1RfQUxQSEEgPSAweDAzMDU7XG5leHBvcnQgY29uc3QgR0xfT05FX01JTlVTX0RTVF9DT0xPUiA9IDB4MDMwNztcbmV4cG9ydCBjb25zdCBHTF9PTkVfTUlOVVNfU1JDX0FMUEhBID0gMHgwMzAzO1xuZXhwb3J0IGNvbnN0IEdMX09ORV9NSU5VU19TUkNfQ09MT1IgPSAweDAzMDE7XG5leHBvcnQgY29uc3QgR0xfT1VUX09GX01FTU9SWSA9IDB4MDUwNTtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX0FMSUdOTUVOVCA9IDB4MGQwNTtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX1JPV19MRU5HVEggPSAweDBkMDI7XG5leHBvcnQgY29uc3QgR0xfUEFDS19TS0lQX1BJWEVMUyA9IDB4MGQwNDtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX1NLSVBfUk9XUyA9IDB4MGQwMztcbmV4cG9ydCBjb25zdCBHTF9QSVhFTF9QQUNLX0JVRkZFUiA9IDB4ODhlYjtcbmV4cG9ydCBjb25zdCBHTF9QSVhFTF9QQUNLX0JVRkZFUl9CSU5ESU5HID0gMHg4OGVkO1xuZXhwb3J0IGNvbnN0IEdMX1BJWEVMX1VOUEFDS19CVUZGRVIgPSAweDg4ZWM7XG5leHBvcnQgY29uc3QgR0xfUElYRUxfVU5QQUNLX0JVRkZFUl9CSU5ESU5HID0gMHg4OGVmO1xuZXhwb3J0IGNvbnN0IEdMX1BPSU5UUyA9IDB4MDAwMDtcbmV4cG9ydCBjb25zdCBHTF9QT0xZR09OX09GRlNFVF9GQUNUT1IgPSAweDgwMzg7XG5leHBvcnQgY29uc3QgR0xfUE9MWUdPTl9PRkZTRVRfRklMTCA9IDB4ODAzNztcbmV4cG9ydCBjb25zdCBHTF9QT0xZR09OX09GRlNFVF9VTklUUyA9IDB4MmEwMDtcbmV4cG9ydCBjb25zdCBHTF9RVUVSWV9DT1VOVEVSX0JJVFNfRVhUID0gMHg4ODY0O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVCA9IDB4ODg2NjtcbmV4cG9ydCBjb25zdCBHTF9RVUVSWV9SRVNVTFRfQVZBSUxBQkxFID0gMHg4ODY3O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVF9BVkFJTEFCTEVfRVhUID0gMHg4ODY3O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVF9FWFQgPSAweDg4NjY7XG5leHBvcnQgY29uc3QgR0xfUjExRl9HMTFGX0IxMEYgPSAweDhjM2E7XG5leHBvcnQgY29uc3QgR0xfUjE2RiA9IDB4ODIyZDtcbmV4cG9ydCBjb25zdCBHTF9SMTZJID0gMHg4MjMzO1xuZXhwb3J0IGNvbnN0IEdMX1IxNlVJID0gMHg4MjM0O1xuZXhwb3J0IGNvbnN0IEdMX1IzMkYgPSAweDgyMmU7XG5leHBvcnQgY29uc3QgR0xfUjMySSA9IDB4ODIzNTtcbmV4cG9ydCBjb25zdCBHTF9SMzJVSSA9IDB4ODIzNjtcbmV4cG9ydCBjb25zdCBHTF9SOCA9IDB4ODIyOTtcbmV4cG9ydCBjb25zdCBHTF9SOF9TTk9STSA9IDB4OGY5NDtcbmV4cG9ydCBjb25zdCBHTF9SOEkgPSAweDgyMzE7XG5leHBvcnQgY29uc3QgR0xfUjhVSSA9IDB4ODIzMjtcbmV4cG9ydCBjb25zdCBHTF9SQVNURVJJWkVSX0RJU0NBUkQgPSAweDhjODk7XG5leHBvcnQgY29uc3QgR0xfUkVBRF9CVUZGRVIgPSAweDBjMDI7XG5leHBvcnQgY29uc3QgR0xfUkVBRF9GUkFNRUJVRkZFUiA9IDB4OGNhODtcbmV4cG9ydCBjb25zdCBHTF9SRUFEX0ZSQU1FQlVGRkVSX0JJTkRJTkcgPSAweDhjYWE7XG5leHBvcnQgY29uc3QgR0xfUkVEID0gMHgxOTAzO1xuZXhwb3J0IGNvbnN0IEdMX1JFRF9CSVRTID0gMHgwZDUyO1xuZXhwb3J0IGNvbnN0IEdMX1JFRF9JTlRFR0VSID0gMHg4ZDk0O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUiA9IDB4OGQ0MTtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfQUxQSEFfU0laRSA9IDB4OGQ1MztcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfQklORElORyA9IDB4OGNhNztcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfQkxVRV9TSVpFID0gMHg4ZDUyO1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9ERVBUSF9TSVpFID0gMHg4ZDU0O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9HUkVFTl9TSVpFID0gMHg4ZDUxO1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9IRUlHSFQgPSAweDhkNDM7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX0lOVEVSTkFMX0ZPUk1BVCA9IDB4OGQ0NDtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfUkVEX1NJWkUgPSAweDhkNTA7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX1NBTVBMRVMgPSAweDhjYWI7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX1NURU5DSUxfU0laRSA9IDB4OGQ1NTtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfV0lEVEggPSAweDhkNDI7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSRVIgPSAweDFmMDE7XG5leHBvcnQgY29uc3QgR0xfUkVQRUFUID0gMHgyOTAxO1xuZXhwb3J0IGNvbnN0IEdMX1JFUExBQ0UgPSAweDFlMDE7XG5leHBvcnQgY29uc3QgR0xfUkcgPSAweDgyMjc7XG5leHBvcnQgY29uc3QgR0xfUkdfSU5URUdFUiA9IDB4ODIyODtcbmV4cG9ydCBjb25zdCBHTF9SRzE2RiA9IDB4ODIyZjtcbmV4cG9ydCBjb25zdCBHTF9SRzE2SSA9IDB4ODIzOTtcbmV4cG9ydCBjb25zdCBHTF9SRzE2VUkgPSAweDgyM2E7XG5leHBvcnQgY29uc3QgR0xfUkczMkYgPSAweDgyMzA7XG5leHBvcnQgY29uc3QgR0xfUkczMkkgPSAweDgyM2I7XG5leHBvcnQgY29uc3QgR0xfUkczMlVJID0gMHg4MjNjO1xuZXhwb3J0IGNvbnN0IEdMX1JHOCA9IDB4ODIyYjtcbmV4cG9ydCBjb25zdCBHTF9SRzhfU05PUk0gPSAweDhmOTU7XG5leHBvcnQgY29uc3QgR0xfUkc4SSA9IDB4ODIzNztcbmV4cG9ydCBjb25zdCBHTF9SRzhVSSA9IDB4ODIzODtcbmV4cG9ydCBjb25zdCBHTF9SR0IgPSAweDE5MDc7XG5leHBvcnQgY29uc3QgR0xfUkdCX0lOVEVHRVIgPSAweDhkOTg7XG5leHBvcnQgY29uc3QgR0xfUkdCMTBfQTIgPSAweDgwNTk7XG5leHBvcnQgY29uc3QgR0xfUkdCMTBfQTJVSSA9IDB4OTA2ZjtcbmV4cG9ydCBjb25zdCBHTF9SR0IxNkYgPSAweDg4MWI7XG5leHBvcnQgY29uc3QgR0xfUkdCMTZJID0gMHg4ZDg5O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjE2VUkgPSAweDhkNzc7XG5leHBvcnQgY29uc3QgR0xfUkdCMzJGID0gMHg4ODE1O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjMyRl9FWFQgPSAweDg4MTU7XG5leHBvcnQgY29uc3QgR0xfUkdCMzJJID0gMHg4ZDgzO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjMyVUkgPSAweDhkNzE7XG5leHBvcnQgY29uc3QgR0xfUkdCNV9BMSA9IDB4ODA1NztcbmV4cG9ydCBjb25zdCBHTF9SR0I1NjUgPSAweDhkNjI7XG5leHBvcnQgY29uc3QgR0xfUkdCOCA9IDB4ODA1MTtcbmV4cG9ydCBjb25zdCBHTF9SR0I4X1NOT1JNID0gMHg4Zjk2O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjhJID0gMHg4ZDhmO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjhVSSA9IDB4OGQ3ZDtcbmV4cG9ydCBjb25zdCBHTF9SR0I5X0U1ID0gMHg4YzNkO1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEgPSAweDE5MDg7XG5leHBvcnQgY29uc3QgR0xfUkdCQV9JTlRFR0VSID0gMHg4ZDk5O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkExNkYgPSAweDg4MWE7XG5leHBvcnQgY29uc3QgR0xfUkdCQTE2SSA9IDB4OGQ4ODtcbmV4cG9ydCBjb25zdCBHTF9SR0JBMTZVSSA9IDB4OGQ3NjtcbmV4cG9ydCBjb25zdCBHTF9SR0JBMzJGID0gMHg4ODE0O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEzMkZfRVhUID0gMHg4ODE0O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEzMkkgPSAweDhkODI7XG5leHBvcnQgY29uc3QgR0xfUkdCQTMyVUkgPSAweDhkNzA7XG5leHBvcnQgY29uc3QgR0xfUkdCQTQgPSAweDgwNTY7XG5leHBvcnQgY29uc3QgR0xfUkdCQTggPSAweDgwNTg7XG5leHBvcnQgY29uc3QgR0xfUkdCQThfU05PUk0gPSAweDhmOTc7XG5leHBvcnQgY29uc3QgR0xfUkdCQThJID0gMHg4ZDhlO1xuZXhwb3J0IGNvbnN0IEdMX1JHQkE4VUkgPSAweDhkN2M7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFX0FMUEhBX1RPX0NPVkVSQUdFID0gMHg4MDllO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9CVUZGRVJTID0gMHg4MGE4O1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9DT1ZFUkFHRSA9IDB4ODBhMDtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVfQ09WRVJBR0VfSU5WRVJUID0gMHg4MGFiO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9DT1ZFUkFHRV9WQUxVRSA9IDB4ODBhYTtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSXzJEID0gMHg4YjVlO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRVJfMkRfQVJSQVkgPSAweDhkYzE7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8yRF9BUlJBWV9TSEFET1cgPSAweDhkYzQ7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8yRF9TSEFET1cgPSAweDhiNjI7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8zRCA9IDB4OGI1ZjtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSX0JJTkRJTkcgPSAweDg5MTk7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl9DVUJFID0gMHg4YjYwO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRVJfQ1VCRV9TSEFET1cgPSAweDhkYzU7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUyA9IDB4ODBhOTtcbmV4cG9ydCBjb25zdCBHTF9TQ0lTU09SX0JPWCA9IDB4MGMxMDtcbmV4cG9ydCBjb25zdCBHTF9TQ0lTU09SX1RFU1QgPSAweDBjMTE7XG5leHBvcnQgY29uc3QgR0xfU0VQQVJBVEVfQVRUUklCUyA9IDB4OGM4ZDtcbmV4cG9ydCBjb25zdCBHTF9TSEFERVJfVFlQRSA9IDB4OGI0ZjtcbmV4cG9ydCBjb25zdCBHTF9TSEFESU5HX0xBTkdVQUdFX1ZFUlNJT04gPSAweDhiOGM7XG5leHBvcnQgY29uc3QgR0xfU0hPUlQgPSAweDE0MDI7XG5leHBvcnQgY29uc3QgR0xfU0lHTkFMRUQgPSAweDkxMTk7XG5leHBvcnQgY29uc3QgR0xfU0lHTkVEX05PUk1BTElaRUQgPSAweDhmOWM7XG5leHBvcnQgY29uc3QgR0xfU1JDX0FMUEhBID0gMHgwMzAyO1xuZXhwb3J0IGNvbnN0IEdMX1NSQ19BTFBIQV9TQVRVUkFURSA9IDB4MDMwODtcbmV4cG9ydCBjb25zdCBHTF9TUkNfQ09MT1IgPSAweDAzMDA7XG5leHBvcnQgY29uc3QgR0xfU1JHQiA9IDB4OGM0MDtcbmV4cG9ydCBjb25zdCBHTF9TUkdCX0FMUEhBX0VYVCA9IDB4OGM0MjtcbmV4cG9ydCBjb25zdCBHTF9TUkdCX0VYVCA9IDB4OGM0MDtcbmV4cG9ydCBjb25zdCBHTF9TUkdCOCA9IDB4OGM0MTtcbmV4cG9ydCBjb25zdCBHTF9TUkdCOF9BTFBIQTggPSAweDhjNDM7XG5leHBvcnQgY29uc3QgR0xfU1JHQjhfQUxQSEE4X0VYVCA9IDB4OGM0MztcbmV4cG9ydCBjb25zdCBHTF9TVEFUSUNfQ09QWSA9IDB4ODhlNjtcbmV4cG9ydCBjb25zdCBHTF9TVEFUSUNfRFJBVyA9IDB4ODhlNDtcbmV4cG9ydCBjb25zdCBHTF9TVEFUSUNfUkVBRCA9IDB4ODhlNTtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMID0gMHgxODAyO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQVRUQUNITUVOVCA9IDB4OGQyMDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfRkFJTCA9IDB4ODgwMTtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfRlVOQyA9IDB4ODgwMDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfUEFTU19ERVBUSF9GQUlMID0gMHg4ODAyO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19QQVNTX0RFUFRIX1BBU1MgPSAweDg4MDM7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9CQUNLX1JFRiA9IDB4OGNhMztcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfVkFMVUVfTUFTSyA9IDB4OGNhNDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfV1JJVEVNQVNLID0gMHg4Y2E1O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQklUUyA9IDB4MGQ1NztcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JVRkZFUl9CSVQgPSAweDAwMDAwNDAwO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQ0xFQVJfVkFMVUUgPSAweDBiOTE7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9GQUlMID0gMHgwYjk0O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfRlVOQyA9IDB4MGI5MjtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0lOREVYID0gMHgxOTAxO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfSU5ERVg4ID0gMHg4ZDQ4O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfUEFTU19ERVBUSF9GQUlMID0gMHgwYjk1O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfUEFTU19ERVBUSF9QQVNTID0gMHgwYjk2O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfUkVGID0gMHgwYjk3O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfVEVTVCA9IDB4MGI5MDtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX1ZBTFVFX01BU0sgPSAweDBiOTM7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9XUklURU1BU0sgPSAweDBiOTg7XG5leHBvcnQgY29uc3QgR0xfU1RSRUFNX0NPUFkgPSAweDg4ZTI7XG5leHBvcnQgY29uc3QgR0xfU1RSRUFNX0RSQVcgPSAweDg4ZTA7XG5leHBvcnQgY29uc3QgR0xfU1RSRUFNX1JFQUQgPSAweDg4ZTE7XG5leHBvcnQgY29uc3QgR0xfU1VCUElYRUxfQklUUyA9IDB4MGQ1MDtcbmV4cG9ydCBjb25zdCBHTF9TWU5DX0NPTkRJVElPTiA9IDB4OTExMztcbmV4cG9ydCBjb25zdCBHTF9TWU5DX0ZFTkNFID0gMHg5MTE2O1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfRkxBR1MgPSAweDkxMTU7XG5leHBvcnQgY29uc3QgR0xfU1lOQ19GTFVTSF9DT01NQU5EU19CSVQgPSAweDAwMDAwMDAxO1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfR1BVX0NPTU1BTkRTX0NPTVBMRVRFID0gMHg5MTE3O1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfU1RBVFVTID0gMHg5MTE0O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUgPSAweDE3MDI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV8yRCA9IDB4MGRlMTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFXzJEX0FSUkFZID0gMHg4YzFhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfM0QgPSAweDgwNmY7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9CQVNFX0xFVkVMID0gMHg4MTNjO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQklORElOR18yRCA9IDB4ODA2OTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0JJTkRJTkdfMkRfQVJSQVkgPSAweDhjMWQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9CSU5ESU5HXzNEID0gMHg4MDZhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQklORElOR19DVUJFX01BUCA9IDB4ODUxNDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NPTVBBUkVfRlVOQyA9IDB4ODg0ZDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NPTVBBUkVfTU9ERSA9IDB4ODg0YztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQID0gMHg4NTEzO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWCA9IDB4ODUxNjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1kgPSAweDg1MTg7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9aID0gMHg4NTFhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWCA9IDB4ODUxNTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1kgPSAweDg1MTc7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9aID0gMHg4NTE5O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfSU1NVVRBQkxFX0ZPUk1BVCA9IDB4OTEyZjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0lNTVVUQUJMRV9MRVZFTFMgPSAweDgyZGY7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NQUdfRklMVEVSID0gMHgyODAwO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUFYX0FOSVNPVFJPUFlfRVhUID0gMHg4NGZlO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUFYX0xFVkVMID0gMHg4MTNkO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUFYX0xPRCA9IDB4ODEzYjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX01JTl9GSUxURVIgPSAweDI4MDE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NSU5fTE9EID0gMHg4MTNhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfV1JBUF9SID0gMHg4MDcyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfV1JBUF9TID0gMHgyODAyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfV1JBUF9UID0gMHgyODAzO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUwID0gMHg4NGMwO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxID0gMHg4NGMxO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxMCA9IDB4ODRjYTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTEgPSAweDg0Y2I7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTEyID0gMHg4NGNjO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxMyA9IDB4ODRjZDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTQgPSAweDg0Y2U7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTE1ID0gMHg4NGNmO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxNiA9IDB4ODRkMDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTcgPSAweDg0ZDE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTE4ID0gMHg4NGQyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxOSA9IDB4ODRkMztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMiA9IDB4ODRjMjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjAgPSAweDg0ZDQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTIxID0gMHg4NGQ1O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyMiA9IDB4ODRkNjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjMgPSAweDg0ZDc7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTI0ID0gMHg4NGQ4O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyNSA9IDB4ODRkOTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjYgPSAweDg0ZGE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTI3ID0gMHg4NGRiO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyOCA9IDB4ODRkYztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjkgPSAweDg0ZGQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTMgPSAweDg0YzM7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTMwID0gMHg4NGRlO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUzMSA9IDB4ODRkZjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNCA9IDB4ODRjNDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNSA9IDB4ODRjNTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNiA9IDB4ODRjNjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFNyA9IDB4ODRjNztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFOCA9IDB4ODRjODtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFOSA9IDB4ODRjOTtcbmV4cG9ydCBjb25zdCBHTF9USU1FX0VMQVBTRURfRVhUID0gMHg4OGJmO1xuZXhwb3J0IGNvbnN0IEdMX1RJTUVPVVRfRVhQSVJFRCA9IDB4OTExYjtcbmV4cG9ydCBjb25zdCBHTF9USU1FT1VUX0lHTk9SRUQgPSAtMTtcbmV4cG9ydCBjb25zdCBHTF9USU1FU1RBTVBfRVhUID0gMHg4ZTI4O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDSyA9IDB4OGUyMjtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfQUNUSVZFID0gMHg4ZTI0O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CSU5ESU5HID0gMHg4ZTI1O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CVUZGRVIgPSAweDhjOGU7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUl9CSU5ESU5HID0gMHg4YzhmO1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CVUZGRVJfTU9ERSA9IDB4OGM3ZjtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfQlVGRkVSX1NJWkUgPSAweDhjODU7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUl9TVEFSVCA9IDB4OGM4NDtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfUEFVU0VEID0gMHg4ZTIzO1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19QUklNSVRJVkVTX1dSSVRURU4gPSAweDhjODg7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX1ZBUllJTkdTID0gMHg4YzgzO1xuZXhwb3J0IGNvbnN0IEdMX1RSSUFOR0xFX0ZBTiA9IDB4MDAwNjtcbmV4cG9ydCBjb25zdCBHTF9UUklBTkdMRV9TVFJJUCA9IDB4MDAwNTtcbmV4cG9ydCBjb25zdCBHTF9UUklBTkdMRVMgPSAweDAwMDQ7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9BUlJBWV9TVFJJREUgPSAweDhhM2M7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19BQ1RJVkVfVU5JRk9STV9JTkRJQ0VTID0gMHg4YTQzO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfQUNUSVZFX1VOSUZPUk1TID0gMHg4YTQyO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfQklORElORyA9IDB4OGEzZjtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JMT0NLX0RBVEFfU0laRSA9IDB4OGE0MDtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JMT0NLX0lOREVYID0gMHg4YTNhO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfUkVGRVJFTkNFRF9CWV9GUkFHTUVOVF9TSEFERVIgPSAweDhhNDY7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19SRUZFUkVOQ0VEX0JZX1ZFUlRFWF9TSEFERVIgPSAweDhhNDQ7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVIgPSAweDhhMTE7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVJfQklORElORyA9IDB4OGEyODtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JVRkZFUl9PRkZTRVRfQUxJR05NRU5UID0gMHg4YTM0O1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQlVGRkVSX1NJWkUgPSAweDhhMmE7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVJfU1RBUlQgPSAweDhhMjk7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9JU19ST1dfTUFKT1IgPSAweDhhM2U7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9NQVRSSVhfU1RSSURFID0gMHg4YTNkO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fT0ZGU0VUID0gMHg4YTNiO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fU0laRSA9IDB4OGEzODtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX1RZUEUgPSAweDhhMzc7XG5leHBvcnQgY29uc3QgR0xfVU5NQVNLRURfUkVOREVSRVJfV0VCR0wgPSAweDkyNDY7XG5leHBvcnQgY29uc3QgR0xfVU5NQVNLRURfVkVORE9SX1dFQkdMID0gMHg5MjQ1O1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19BTElHTk1FTlQgPSAweDBjZjU7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX0NPTE9SU1BBQ0VfQ09OVkVSU0lPTl9XRUJHTCA9IDB4OTI0MztcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfRkxJUF9ZX1dFQkdMID0gMHg5MjQwO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19JTUFHRV9IRUlHSFQgPSAweDgwNmU7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX1BSRU1VTFRJUExZX0FMUEhBX1dFQkdMID0gMHg5MjQxO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19ST1dfTEVOR1RIID0gMHgwY2YyO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19TS0lQX0lNQUdFUyA9IDB4ODA2ZDtcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfU0tJUF9QSVhFTFMgPSAweDBjZjQ7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX1NLSVBfUk9XUyA9IDB4MGNmMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05BTEVEID0gMHg5MTE4O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0JZVEUgPSAweDE0MDE7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UID0gMHgxNDA1O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF8xMEZfMTFGXzExRl9SRVYgPSAweDhjM2I7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzJfMTBfMTBfMTBfUkVWID0gMHg4MzY4O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF8yNF84ID0gMHg4NGZhO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF8yNF84X1dFQkdMID0gMHg4NGZhO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF81XzlfOV85X1JFViA9IDB4OGMzZTtcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl8yRCA9IDB4OGRkMjtcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRkNztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl8zRCA9IDB4OGRkMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfU0FNUExFUl9DVUJFID0gMHg4ZGQ0O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9WRUMyID0gMHg4ZGM2O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9WRUMzID0gMHg4ZGM3O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9WRUM0ID0gMHg4ZGM4O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX05PUk1BTElaRUQgPSAweDhjMTc7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfTk9STUFMSVpFRF9FWFQgPSAweDhjMTc7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfU0hPUlQgPSAweDE0MDM7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfU0hPUlRfNF80XzRfNCA9IDB4ODAzMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9TSE9SVF81XzVfNV8xID0gMHg4MDM0O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX1NIT1JUXzVfNl81ID0gMHg4MzYzO1xuZXhwb3J0IGNvbnN0IEdMX1ZBTElEQVRFX1NUQVRVUyA9IDB4OGI4MztcbmV4cG9ydCBjb25zdCBHTF9WRU5ET1IgPSAweDFmMDA7XG5leHBvcnQgY29uc3QgR0xfVkVSU0lPTiA9IDB4MWYwMjtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVJSQVlfQklORElORyA9IDB4ODViNTtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVJSQVlfQklORElOR19PRVMgPSAweDg1YjU7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9CVUZGRVJfQklORElORyA9IDB4ODg5ZjtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX0RJVklTT1IgPSAweDg4ZmU7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9ESVZJU09SX0FOR0xFID0gMHg4OGZlO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfRU5BQkxFRCA9IDB4ODYyMjtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX0lOVEVHRVIgPSAweDg4ZmQ7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9OT1JNQUxJWkVEID0gMHg4ODZhO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfUE9JTlRFUiA9IDB4ODY0NTtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX1NJWkUgPSAweDg2MjM7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9TVFJJREUgPSAweDg2MjQ7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9UWVBFID0gMHg4NjI1O1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9TSEFERVIgPSAweDhiMzE7XG5leHBvcnQgY29uc3QgR0xfVklFV1BPUlQgPSAweDBiYTI7XG5leHBvcnQgY29uc3QgR0xfV0FJVF9GQUlMRUQgPSAweDkxMWQ7XG5leHBvcnQgY29uc3QgR0xfWkVSTyA9IDA7XG4iLCJleHBvcnQgY2xhc3MgQmluZEhlbHBlcjxUVmFsdWU+IHtcbiAgcHJpdmF0ZSBfX3ByZXY6IFRWYWx1ZTtcbiAgcHJpdmF0ZSBfX2JpbmRlcjogKCB2YWx1ZTogVFZhbHVlICkgPT4gdm9pZDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoIGluaXQ6IFRWYWx1ZSwgYmluZGVyOiAoIHZhbHVlOiBUVmFsdWUgKSA9PiB2b2lkICkge1xuICAgIHRoaXMuX19wcmV2ID0gaW5pdDtcbiAgICB0aGlzLl9fYmluZGVyID0gYmluZGVyO1xuICB9XG5cbiAgcHVibGljIGJpbmQ8VD4oXG4gICAgdmFsdWU6IFRWYWx1ZSxcbiAgICBjYWxsYmFjaz86ICggdmFsdWU6IFRWYWx1ZSApID0+IFRcbiAgKTogVCB7XG4gICAgY29uc3QgcHJldiA9IHRoaXMuX19wcmV2O1xuICAgIGlmICggdmFsdWUgIT09IHByZXYgKSB7XG4gICAgICB0aGlzLl9fYmluZGVyKCB2YWx1ZSApO1xuICAgICAgdGhpcy5fX3ByZXYgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoIGNhbGxiYWNrICkge1xuICAgICAgY29uc3QgcmV0ID0gY2FsbGJhY2soIHZhbHVlICk7XG4gICAgICB0aGlzLmJpbmQoIHByZXYgKTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQgYXMgYW55O1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xfQVJSQVlfQlVGRkVSLCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiwgR0xfU1RBVElDX0RSQVcgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xCdWZmZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdEJ1ZmZlcjxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19idWZmZXI6IFdlYkdMQnVmZmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgYnVmZmVyKCk6IFdlYkdMQnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2J1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRCdWZmZXIuYnVmZmVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTEJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19idWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0QnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBidWZmZXI6IFdlYkdMQnVmZmVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19idWZmZXIgPSBidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZUJ1ZmZlciggdGhpcy5fX2J1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIHNldFZlcnRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEFycmF5QnVmZmVyIHwgQXJyYXlCdWZmZXJWaWV3IHwgbnVsbCxcbiAgICB1c2FnZTogbnVtYmVyID0gR0xfU1RBVElDX0RSQVdcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRWZXJ0ZXhCdWZmZXIoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLmJ1ZmZlckRhdGEoIEdMX0FSUkFZX0JVRkZFUiwgc291cmNlLCB1c2FnZSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbmV3IGluZGV4IGRhdGEgaW50byB0aGlzIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBzZXRJbmRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEFycmF5QnVmZmVyIHwgQXJyYXlCdWZmZXJWaWV3IHwgbnVsbCxcbiAgICB1c2FnZTogbnVtYmVyID0gR0xfU1RBVElDX0RSQVdcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRJbmRleEJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuYnVmZmVyRGF0YSggR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHNvdXJjZSwgdXNhZ2UgKTtcbiAgICB9ICk7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBHTENhdEVycm9ycyA9IHtcbiAgZ2V0IFVuZXhwZWN0ZWROdWxsRXJyb3IoKSB7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoICdHTENhdDogVW5leHBlY3RlZCBudWxsIGRldGVjdGVkJyApO1xuICAgIGVycm9yLm5hbWUgPSAnVW5leHBlY3RlZE51bGxFcnJvcic7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH0sXG4gIGdldCBXZWJHTDJFeGNsdXNpdmVFcnJvcigpIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvciggJ0dMQ2F0OiBBdHRlbXB0ZWQgdG8gdXNlIFdlYkdMMiBleGNsdXNpdmUgc3R1ZmYnICk7XG4gICAgZXJyb3IubmFtZSA9ICdXZWJHTDJFeGNsdXNpdmVFcnJvcic7XG4gICAgcmV0dXJuIGVycm9yO1xuICB9XG59O1xuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImltcG9ydCB7IEdMX0NPTE9SX0FUVEFDSE1FTlQwLCBHTF9ERVBUSF9BVFRBQ0hNRU5ULCBHTF9GUkFNRUJVRkZFUiwgR0xfUkVOREVSQlVGRkVSLCBHTF9URVhUVVJFXzJEIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0UmVuZGVyYnVmZmVyIH0gZnJvbSAnLi9HTENhdFJlbmRlcmJ1ZmZlcic7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0VGV4dHVyZSB9IGZyb20gJy4vR0xDYXRUZXh0dXJlJztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xGcmFtZWJ1ZmZlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQgZXh0ZW5kcyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0PiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fZnJhbWVidWZmZXI6IFdlYkdMRnJhbWVidWZmZXI7XG4gIHByaXZhdGUgX19yZW5kZXJidWZmZXJNYXAgPSBuZXcgTWFwPEdMZW51bSwgR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+PigpO1xuICBwcml2YXRlIF9fdGV4dHVyZU1hcCA9IG5ldyBNYXA8R0xlbnVtLCBHTENhdFRleHR1cmU8VENvbnRleHQ+PigpO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGdldCBmcmFtZWJ1ZmZlcigpOiBXZWJHTEZyYW1lYnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2ZyYW1lYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gZnJhbWVidWZmZXIuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0RnJhbWVidWZmZXIuZnJhbWVidWZmZXJdXVxuICAgKi9cbiAgcHVibGljIGdldCByYXcoKTogV2ViR0xGcmFtZWJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19mcmFtZWJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgYXR0YWNoZWQgcmVuZGVyYnVmZmVyLlxuICAgKiBJZiB5b3Ugd2FudCB0byBncmFiIG90aGVyIHRoYW4gYERFUFRIX0FUVEFDSE1FTlRgLCB0cnkgW1tHTENhdEZyYW1lYnVmZmVyLmdldFJlbmRlcmJ1ZmZlcl1dIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlbmRlcmJ1ZmZlcigpOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fX3JlbmRlcmJ1ZmZlck1hcC5nZXQoIEdMX0RFUFRIX0FUVEFDSE1FTlQgKSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBhdHRhY2hlZCB0ZXh0dXJlLlxuICAgKiBJZiB5b3Ugd2FudCB0byBncmFiIG90aGVyIHRoYW4gYENPTE9SX0FUVEFDSE1FTlQwYCwgdHJ5IFtbR0xDYXRGcmFtZWJ1ZmZlci5nZXRUZXh0dXJlXV0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgdGV4dHVyZSgpOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX190ZXh0dXJlTWFwLmdldCggR0xfQ09MT1JfQVRUQUNITUVOVDAgKSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdEZyYW1lYnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBmcmFtZWJ1ZmZlcjogV2ViR0xGcmFtZWJ1ZmZlciApIHtcbiAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcbiAgICB0aGlzLl9fZnJhbWVidWZmZXIgPSBmcmFtZWJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSBmcmFtZWJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCBhbHNvQXR0YWNoZWQgPSBmYWxzZSApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBnbC5kZWxldGVGcmFtZWJ1ZmZlciggdGhpcy5fX2ZyYW1lYnVmZmVyICk7XG5cbiAgICBpZiAoIGFsc29BdHRhY2hlZCApIHtcbiAgICAgIGZvciAoIGNvbnN0IHJlbmRlcmJ1ZmZlciBvZiB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLnZhbHVlcygpICkge1xuICAgICAgICBnbC5kZWxldGVSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlci5yYXcgKTtcbiAgICAgIH1cblxuICAgICAgZm9yICggY29uc3QgdGV4dHVyZSBvZiB0aGlzLl9fdGV4dHVyZU1hcC52YWx1ZXMoKSApIHtcbiAgICAgICAgZ2wuZGVsZXRlVGV4dHVyZSggdGV4dHVyZS5yYXcgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgaXRzIGF0dGFjaGVkIHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXRSZW5kZXJidWZmZXIoIGF0dGFjaG1lbnQgPSBHTF9ERVBUSF9BVFRBQ0hNRU5UICk6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLmdldCggYXR0YWNobWVudCApID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgaXRzIGF0dGFjaGVkIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgZ2V0VGV4dHVyZSggYXR0YWNobWVudCA9IEdMX0NPTE9SX0FUVEFDSE1FTlQwICk6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fX3RleHR1cmVNYXAuZ2V0KCBhdHRhY2htZW50ICkgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSByZW5kZXJidWZmZXIgdG8gdGhpcyBmcmFtZWJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBhdHRhY2hSZW5kZXJidWZmZXIoXG4gICAgcmVuZGVyYnVmZmVyOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4sXG4gICAge1xuICAgICAgYXR0YWNobWVudCA9IEdMX0RFUFRIX0FUVEFDSE1FTlRcbiAgICB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRGcmFtZWJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuZnJhbWVidWZmZXJSZW5kZXJidWZmZXIoIEdMX0ZSQU1FQlVGRkVSLCBhdHRhY2htZW50LCBHTF9SRU5ERVJCVUZGRVIsIHJlbmRlcmJ1ZmZlci5yYXcgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLnNldCggYXR0YWNobWVudCwgcmVuZGVyYnVmZmVyICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGEgdGV4dHVyZSB0byB0aGlzIGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGF0dGFjaFRleHR1cmUoXG4gICAgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PixcbiAgICB7XG4gICAgICBsZXZlbCA9IDAsXG4gICAgICBhdHRhY2htZW50ID0gR0xfQ09MT1JfQVRUQUNITUVOVDBcbiAgICB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRGcmFtZWJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoIEdMX0ZSQU1FQlVGRkVSLCBhdHRhY2htZW50LCBHTF9URVhUVVJFXzJELCB0ZXh0dXJlLnJhdywgbGV2ZWwgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fdGV4dHVyZU1hcC5zZXQoIGF0dGFjaG1lbnQsIHRleHR1cmUgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xfQ09NUExFVElPTl9TVEFUVVNfS0hSLCBHTF9GTE9BVCwgR0xfTElOS19TVEFUVVMsIEdMX1RFWFRVUkUwIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0QnVmZmVyIH0gZnJvbSAnLi9HTENhdEJ1ZmZlcic7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0U2hhZGVyIH0gZnJvbSAnLi9HTENhdFNoYWRlcic7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0VGV4dHVyZSB9IGZyb20gJy4vR0xDYXRUZXh0dXJlJztcblxuZXhwb3J0IHR5cGUgR0xDYXRQcm9ncmFtVW5pZm9ybVR5cGUgPVxuICAnMWYnIHwgJzJmJyB8ICczZicgfCAnNGYnIHxcbiAgJzFpJyB8ICcyaScgfCAnM2knIHwgJzRpJyB8XG4gICcxZnYnIHwgJzJmdicgfCAnM2Z2JyB8ICc0ZnYnIHxcbiAgJzFpdicgfCAnMml2JyB8ICczaXYnIHwgJzRpdicgfFxuICAnTWF0cml4MmZ2JyB8ICdNYXRyaXgzZnYnIHwgJ01hdHJpeDRmdic7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMUHJvZ3JhbSwgYnV0IGhhcyBjYWNoZSBvZiB2YXJpYWJsZSBsb2NhdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdFByb2dyYW08VENvbnRleHQgZXh0ZW5kcyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0PiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fcHJvZ3JhbTogV2ViR0xQcm9ncmFtO1xuICBwcml2YXRlIF9fc2hhZGVyczogR0xDYXRTaGFkZXI8VENvbnRleHQ+W10gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfX2F0dHJpYkxvY2F0aW9uQ2FjaGU6IHsgWyBuYW1lOiBzdHJpbmcgXTogbnVtYmVyIH0gPSB7fTtcbiAgcHJpdmF0ZSBfX3VuaWZvcm1Mb2NhdGlvbkNhY2hlOiB7IFsgbmFtZTogc3RyaW5nIF06IFdlYkdMVW5pZm9ybUxvY2F0aW9uIHwgbnVsbCB9ID0ge307XG4gIHByaXZhdGUgX191bmlmb3JtVGV4dHVyZVVuaXRNYXA6IHsgWyBuYW1lOiBzdHJpbmcgXTogbnVtYmVyIH0gPSB7fTtcbiAgcHJpdmF0ZSBfX3VuaWZvcm10ZXh0dXJlVW5pdEluZGV4ID0gMDtcbiAgcHJpdmF0ZSBfX2xpbmtlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHByb2dyYW0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHByb2dyYW0oKTogV2ViR0xQcm9ncmFtIHtcbiAgICByZXR1cm4gdGhpcy5fX3Byb2dyYW07XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biBwcm9ncmFtLiBTaG9ydGVyIHRoYW4gW1tHTENhdFByb2dyYW0ucHJvZ3JhbV1dLlxuICAgKi9cbiAgcHVibGljIGdldCByYXcoKTogV2ViR0xQcm9ncmFtIHtcbiAgICByZXR1cm4gdGhpcy5fX3Byb2dyYW07XG4gIH1cblxuICAvKipcbiAgICogSXRzIHNoYWRlcnMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHNoYWRlcnMoKTogR0xDYXRTaGFkZXI8VENvbnRleHQ+W10gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fX3NoYWRlcnMgPyB0aGlzLl9fc2hhZGVycy5jb25jYXQoKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGUgbGFzdCBsaW5rIG9wZXJhdGlvbiB3YXMgc3VjY2Vzc2Z1bCBvciBub3QuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGlzTGlua2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9fbGlua2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdFByb2dyYW0gaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIHByb2dyYW06IFdlYkdMUHJvZ3JhbSApIHtcbiAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcbiAgICB0aGlzLl9fcHJvZ3JhbSA9IHByb2dyYW07XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgcHJvZ3JhbS5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCBhbHNvQXR0YWNoZWQgPSBmYWxzZSApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBnbC5kZWxldGVQcm9ncmFtKCB0aGlzLl9fcHJvZ3JhbSApO1xuXG4gICAgaWYgKCBhbHNvQXR0YWNoZWQgKSB7XG4gICAgICBjb25zdCBzaGFkZXJzID0gdGhpcy5zaGFkZXJzO1xuICAgICAgaWYgKCBzaGFkZXJzICkge1xuICAgICAgICBzaGFkZXJzLmZvckVhY2goICggc2hhZGVyICkgPT4ge1xuICAgICAgICAgIHNoYWRlci5kaXNwb3NlKCk7XG4gICAgICAgIH0gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIHNoYWRlcnMgYW5kIGxpbmsgdGhpcyBwcm9ncmFtLlxuICAgKi9cbiAgcHVibGljIGxpbmsoIC4uLnNoYWRlcnM6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PltdICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHNoYWRlcnMuZm9yRWFjaCggKCBzaGFkZXIgKSA9PiBnbC5hdHRhY2hTaGFkZXIoIHRoaXMuX19wcm9ncmFtLCBzaGFkZXIucmF3ICkgKTtcbiAgICBnbC5saW5rUHJvZ3JhbSggdGhpcy5fX3Byb2dyYW0gKTtcblxuICAgIHRoaXMuX19saW5rZWQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKCB0aGlzLl9fcHJvZ3JhbSwgR0xfTElOS19TVEFUVVMgKTtcbiAgICBpZiAoICF0aGlzLl9fbGlua2VkICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCBnbC5nZXRQcm9ncmFtSW5mb0xvZyggdGhpcy5fX3Byb2dyYW0gKSEgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9fc2hhZGVycyA9IHNoYWRlcnMuY29uY2F0KCk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIHNoYWRlcnMgYW5kIGxpbmsgdGhpcyBwcm9ncmFtLlxuICAgKiBJdCdzIGdvbm5hIGJlIGFzeW5jaHJvbm91cyBpZiB5b3UgaGF2ZSB0aGUgS0hSX3BhcmFsbGVsX3NoYWRlcl9jb21waWxlIGV4dGVuc2lvbiBzdXBwb3J0LlxuICAgKi9cbiAgcHVibGljIGxpbmtBc3luYyggLi4uc2hhZGVyczogR0xDYXRTaGFkZXI8VENvbnRleHQ+W10gKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZ2xDYXQgPSB0aGlzLl9fZ2xDYXQ7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuICAgIGNvbnN0IGV4dFBhcmFsbGVsID0gZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnS0hSX3BhcmFsbGVsX3NoYWRlcl9jb21waWxlJyApO1xuXG4gICAgc2hhZGVycy5mb3JFYWNoKCAoIHNoYWRlciApID0+IGdsLmF0dGFjaFNoYWRlciggdGhpcy5fX3Byb2dyYW0sIHNoYWRlci5yYXcgKSApO1xuICAgIGdsLmxpbmtQcm9ncmFtKCB0aGlzLl9fcHJvZ3JhbSApO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKCAoIHJlc29sdmUsIHJlamVjdCApID0+IHtcbiAgICAgIGNvbnN0IHVwZGF0ZSA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFleHRQYXJhbGxlbCB8fFxuICAgICAgICAgIGdsLmdldFByb2dyYW1QYXJhbWV0ZXIoIHRoaXMuX19wcm9ncmFtLCBHTF9DT01QTEVUSU9OX1NUQVRVU19LSFIgKSA9PT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLl9fbGlua2VkID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlciggdGhpcy5fX3Byb2dyYW0sIEdMX0xJTktfU1RBVFVTICk7XG4gICAgICAgICAgaWYgKCAhdGhpcy5fX2xpbmtlZCApIHtcbiAgICAgICAgICAgIHJlamVjdCggbmV3IEVycm9yKCBnbC5nZXRQcm9ncmFtSW5mb0xvZyggdGhpcy5fX3Byb2dyYW0gKSA/PyAnbnVsbCcgKSApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX19zaGFkZXJzID0gc2hhZGVycy5jb25jYXQoKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCB1cGRhdGUgKTtcbiAgICAgIH07XG4gICAgICB1cGRhdGUoKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIGF0dHJpYnV0ZSB2YXJpYWJsZS5cbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgYXR0cmlidXRlIHZhcmlhYmxlXG4gICAqIEBwYXJhbSBidWZmZXIgVmVydGV4IGJ1ZmZlci4gQ2FuIGJlIG51bGwsIHRvIGRpc2FibGUgYXR0cmlidXRlIGFycmF5XG4gICAqIEBwYXJhbSBzaXplIE51bWJlciBvZiBjb21wb25lbnRzIHBlciB2ZXJ0ZXguIE11c3QgYmUgMSwgMiwgMyBvciA0XG4gICAqL1xuICBwdWJsaWMgYXR0cmlidXRlKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBidWZmZXI6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGwsXG4gICAgc2l6ZSA9IDEsXG4gICAgZGl2aXNvciA9IDAsXG4gICAgdHlwZTogbnVtYmVyID0gR0xfRkxPQVQsXG4gICAgc3RyaWRlID0gMCxcbiAgICBvZmZzZXQgPSAwXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRBdHRyaWJMb2NhdGlvbiggbmFtZSApO1xuICAgIGlmICggbG9jYXRpb24gPT09IC0xICkgeyByZXR1cm47IH1cblxuICAgIGlmICggYnVmZmVyID09PSBudWxsICkge1xuICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KCBsb2NhdGlvbiApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX19nbENhdC5iaW5kVmVydGV4QnVmZmVyKCBidWZmZXIsICgpID0+IHtcbiAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KCBsb2NhdGlvbiApO1xuICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlciggbG9jYXRpb24sIHNpemUsIHR5cGUsIGZhbHNlLCBzdHJpZGUsIG9mZnNldCApO1xuXG4gICAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgICAgZ2wudmVydGV4QXR0cmliRGl2aXNvciggbG9jYXRpb24sIGRpdmlzb3IgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4dCA9IHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJyApO1xuICAgICAgICBpZiAoIGV4dCApIHtcbiAgICAgICAgICBleHQudmVydGV4QXR0cmliRGl2aXNvckFOR0xFKCBsb2NhdGlvbiwgZGl2aXNvciApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtIHZhcmlhYmxlLlxuICAgKiBTZWUgYWxzbzogW1tHTENhdFByb2dyYW0udW5pZm9ybVZlY3Rvcl1dXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybSggbmFtZTogc3RyaW5nLCB0eXBlOiBHTENhdFByb2dyYW1Vbmlmb3JtVHlwZSwgLi4udmFsdWU6IG51bWJlcltdICk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bmMgPSAoIHRoaXMgYXMgYW55IClbICd1bmlmb3JtJyArIHR5cGUgXTtcbiAgICBmdW5jLmNhbGwoIHRoaXMsIG5hbWUsIC4uLnZhbHVlICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0gdmFyaWFibGUuXG4gICAqIFNlZSBhbHNvOiBbW0dMQ2F0UHJvZ3JhbS51bmlmb3JtXV1cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtVmVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICB0eXBlOiBHTENhdFByb2dyYW1Vbmlmb3JtVHlwZSxcbiAgICB2YWx1ZTogRmxvYXQzMkxpc3QgfCBJbnQzMkxpc3RcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgZnVuYyA9ICggdGhpcyBhcyBhbnkgKVsgJ3VuaWZvcm0nICsgdHlwZSBdO1xuICAgIGZ1bmMuY2FsbCggdGhpcywgbmFtZSwgdmFsdWUgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTFpIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0xaSggbmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFpKCBsb2NhdGlvbiwgdmFsdWUgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0yaSB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMmkoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMmkoIGxvY2F0aW9uLCB4LCB5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtM2kgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTNpKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtM2koIGxvY2F0aW9uLCB4LCB5LCB6ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtNGkgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTRpKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm00aSggbG9jYXRpb24sIHgsIHksIHosIHcgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0xaXYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTFpdiggbmFtZTogc3RyaW5nLCBhcnJheTogSW50MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFpdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMml2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0yaXYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEludDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0yaXYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTNpdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2l2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBJbnQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtM2l2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm00aXYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTRpdiggbmFtZTogc3RyaW5nLCBhcnJheTogSW50MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTRpdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMWYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTFmKCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMWYoIGxvY2F0aW9uLCB2YWx1ZSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTJmIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0yZiggbmFtZTogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0yZiggbG9jYXRpb24sIHgsIHkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0zZiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2YoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0zZiggbG9jYXRpb24sIHgsIHksIHogKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm00ZiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtNGYoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTRmKCBsb2NhdGlvbiwgeCwgeSwgeiwgdyApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTFmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMWZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTJmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMmZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0yZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTNmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2Z2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0zZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTRmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtNGZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm00ZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDJmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4MmZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCwgdHJhbnNwb3NlID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtTWF0cml4MmZ2KCBsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDNmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4M2Z2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCwgdHJhbnNwb3NlID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtTWF0cml4M2Z2KCBsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDRmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4NGZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCwgdHJhbnNwb3NlID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KCBsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBgc2FtcGxlcjJEYCB0eXBlIHVuaWZvcm0gdGV4dHVyZS5cbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgdW5pZm9ybSB0ZXh0dXJlXG4gICAqIEBwYXJhbSB0ZXh0dXJlIFRleHR1cmUgb2JqZWN0XG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybVRleHR1cmUoIG5hbWU6IHN0cmluZywgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIGNvbnN0IHVuaXQgPSB0aGlzLmdldFVuaWZvcm1UZXh0dXJlVW5pdCggbmFtZSApO1xuICAgIGdsLmFjdGl2ZVRleHR1cmUoIEdMX1RFWFRVUkUwICsgdW5pdCApO1xuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0ZXh0dXJlID8/IG51bGwgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFpKCBsb2NhdGlvbiwgdW5pdCApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBgc2FtcGxlckN1YmVgIHR5cGUgdW5pZm9ybSB0ZXh0dXJlLlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSB1bmlmb3JtIHRleHR1cmVcbiAgICogQHBhcmFtIHRleHR1cmUgVGV4dHVyZSBvYmplY3RcbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtQ3ViZW1hcCggbmFtZTogc3RyaW5nLCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgY29uc3QgdW5pdCA9IHRoaXMuZ2V0VW5pZm9ybVRleHR1cmVVbml0KCBuYW1lICk7XG4gICAgZ2wuYWN0aXZlVGV4dHVyZSggR0xfVEVYVFVSRTAgKyB1bml0ICk7XG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlQ3ViZU1hcCggdGV4dHVyZSA/PyBudWxsICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xaSggbG9jYXRpb24sIHVuaXQgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgYXR0cmlidXRlIGxvY2F0aW9uLlxuICAgKi9cbiAgcHVibGljIGdldEF0dHJpYkxvY2F0aW9uKCBuYW1lOiBzdHJpbmcgKTogbnVtYmVyIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBpZiAoIHRoaXMuX19hdHRyaWJMb2NhdGlvbkNhY2hlWyBuYW1lIF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fYXR0cmliTG9jYXRpb25DYWNoZVsgbmFtZSBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKCB0aGlzLl9fcHJvZ3JhbSwgbmFtZSApO1xuICAgICAgLy8gaWYgKCBsb2NhdGlvbiA9PT0gLTEgKSB7XG4gICAgICAvLyAgIHRoaXMuZ2xDYXQuc3BpdCggJ0dMQ2F0UHJvZ3JhbS5nZXRBdHRyaWJMb2NhdGlvbjogQ291bGQgbm90IHJldHJpZXZlIGF0dHJpYnV0ZSBsb2NhdGlvbicgKTtcbiAgICAgIC8vICAgcmV0dXJuIC0xO1xuICAgICAgLy8gfVxuICAgICAgdGhpcy5fX2F0dHJpYkxvY2F0aW9uQ2FjaGVbIG5hbWUgXSA9IGxvY2F0aW9uO1xuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB1bmlmb3JtIGxvY2F0aW9uLlxuICAgKi9cbiAgcHVibGljIGdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZTogc3RyaW5nICk6IFdlYkdMVW5pZm9ybUxvY2F0aW9uIHwgbnVsbCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgaWYgKCB0aGlzLl9fdW5pZm9ybUxvY2F0aW9uQ2FjaGVbIG5hbWUgXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuIHRoaXMuX191bmlmb3JtTG9jYXRpb25DYWNoZVsgbmFtZSBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbiggdGhpcy5fX3Byb2dyYW0sIG5hbWUgKTtcbiAgICAgIC8vIGlmICggbG9jYXRpb24gPT09IG51bGwgKSB7XG4gICAgICAvLyAgIHRoaXMuZ2xDYXQuc3BpdCggJ0dMQ2F0UHJvZ3JhbS5nZXRVbmlmb3JtTG9jYXRpb246IENvdWxkIG5vdCByZXRyaWV2ZSB1bmlmb3JtIGxvY2F0aW9uJyApO1xuICAgICAgLy8gICByZXR1cm4gbG9jYXRpb247XG4gICAgICAvLyB9XG4gICAgICB0aGlzLl9fdW5pZm9ybUxvY2F0aW9uQ2FjaGVbIG5hbWUgXSA9IGxvY2F0aW9uO1xuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBvciBjcmVhdGUgYSB0ZXh0dXJlIHVuaXQgdGhhdCBjb3JyZXNwb25kcyB0byBnaXZlbiBuYW1lLlxuICAgKi9cbiAgcHVibGljIGdldFVuaWZvcm1UZXh0dXJlVW5pdCggbmFtZTogc3RyaW5nICk6IG51bWJlciB7XG4gICAgaWYgKCB0aGlzLl9fdW5pZm9ybVRleHR1cmVVbml0TWFwWyBuYW1lIF0gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHRoaXMuX191bmlmb3JtVGV4dHVyZVVuaXRNYXBbIG5hbWUgXSA9IHRoaXMuX191bmlmb3JtdGV4dHVyZVVuaXRJbmRleDtcbiAgICAgIHRoaXMuX191bmlmb3JtdGV4dHVyZVVuaXRJbmRleCArKztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fX3VuaWZvcm1UZXh0dXJlVW5pdE1hcFsgbmFtZSBdO1xuICB9XG59XG4iLCJpbXBvcnQgeyBHTF9ERVBUSF9BVFRBQ0hNRU5ULCBHTF9SRU5ERVJCVUZGRVIgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcbmltcG9ydCB7IEdMQ2F0RXJyb3JzIH0gZnJvbSAnLi9HTENhdEVycm9ycyc7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMUmVuZGVyYnVmZmVyLlxuICovXG5leHBvcnQgY2xhc3MgR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQgZXh0ZW5kcyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0PiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fcmVuZGVyYnVmZmVyOiBXZWJHTFJlbmRlcmJ1ZmZlcjtcbiAgcHJpdmF0ZSBfX3dpZHRoID0gMDtcbiAgcHJpdmF0ZSBfX2hlaWdodCA9IDA7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcmVuZGVyYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGdldCByZW5kZXJidWZmZXIoKTogV2ViR0xSZW5kZXJidWZmZXIge1xuICAgIHJldHVybiB0aGlzLl9fcmVuZGVyYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcmVuZGVyYnVmZmVyLiBTaG9ydGVyIHRoYW4gW1tHTENhdFJlbmRlckJ1ZmZlci5yZW5kZXJidWZmZXJdXS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3KCk6IFdlYkdMUmVuZGVyYnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3JlbmRlcmJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgd2lkdGguXG4gICAqL1xuICBwdWJsaWMgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX193aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgaGVpZ2h0LlxuICAgKi9cbiAgcHVibGljIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2hlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRUZXh0dXJlIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCByZW5kZXJidWZmZXI6IFdlYkdMUmVuZGVyYnVmZmVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19yZW5kZXJidWZmZXIgPSByZW5kZXJidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgcmVuZGVyYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZVJlbmRlcmJ1ZmZlciggdGhpcy5fX3JlbmRlcmJ1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhpcyByZW5kZXJidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgcmVuZGVyYnVmZmVyU3RvcmFnZShcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHsgZm9ybWF0ID0gdGhpcy5fX2dsQ2F0LnByZWZlcnJlZERlcHRoRm9ybWF0IH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFJlbmRlcmJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wucmVuZGVyYnVmZmVyU3RvcmFnZSggR0xfUkVOREVSQlVGRkVSLCBmb3JtYXQsIHdpZHRoLCBoZWlnaHQgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fd2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLl9faGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhpcyByZW5kZXJidWZmZXIgd2l0aCBtdWx0aXNhbXBsZSBlbmFibGVkLlxuICAgKiBJZiB5b3UgYXJlIHVzaW5nIFdlYkdMMSwgaXQgd2lsbCBmYWxsYmFjayB0byBub24gbXVsdGlzYW1wbGUgb25lIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgcmVuZGVyYnVmZmVyU3RvcmFnZU11bHRpc2FtcGxlKFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAge1xuICAgICAgc2FtcGxlcyA9IHRoaXMuX19nbENhdC5wcmVmZXJyZWRNdWx0aXNhbXBsZVNhbXBsZXMsXG4gICAgICBmb3JtYXQgPSBHTF9ERVBUSF9BVFRBQ0hNRU5ULFxuICAgICAgZmFsbGJhY2tXZWJHTDEgPSB0cnVlXG4gICAgfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kUmVuZGVyYnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgICAgZ2wucmVuZGVyYnVmZmVyU3RvcmFnZU11bHRpc2FtcGxlKCBHTF9SRU5ERVJCVUZGRVIsIHNhbXBsZXMsIGZvcm1hdCwgd2lkdGgsIGhlaWdodCApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCBmYWxsYmFja1dlYkdMMSApIHtcbiAgICAgICAgICBnbC5yZW5kZXJidWZmZXJTdG9yYWdlKCBHTF9SRU5ERVJCVUZGRVIsIGZvcm1hdCwgd2lkdGgsIGhlaWdodCApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IEdMQ2F0RXJyb3JzLldlYkdMMkV4Y2x1c2l2ZUVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSApO1xuXG4gICAgdGhpcy5fX3dpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5fX2hlaWdodCA9IGhlaWdodDtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBHTENhdCB9IGZyb20gJy4vR0xDYXQnO1xuaW1wb3J0IHsgR0xfQ09NUElMRV9TVEFUVVMgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xTaGFkZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdFNoYWRlcjxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19zaGFkZXI6IFdlYkdMU2hhZGVyO1xuICBwcml2YXRlIF9fY29tcGlsZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogSXRzIG93biBzaGFkZXIuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHNoYWRlcigpOiBXZWJHTFNoYWRlciB7XG4gICAgcmV0dXJuIHRoaXMuX19zaGFkZXI7XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biBzaGFkZXIuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0U2hhZGVyLnNoYWRlcl1dLlxuICAgKi9cbiAgcHVibGljIGdldCByYXcoKTogV2ViR0xTaGFkZXIge1xuICAgIHJldHVybiB0aGlzLl9fc2hhZGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdFNoYWRlciBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0Piwgc2hhZGVyOiBXZWJHTFNoYWRlciApIHtcbiAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcbiAgICB0aGlzLl9fc2hhZGVyID0gc2hhZGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHNoYWRlci5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX19nbENhdC5nbC5kZWxldGVTaGFkZXIoIHRoaXMuX19zaGFkZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGUgbGFzdCBjb21waWxhdGlvbiB3YXMgc3VjY2Vzc2Z1bCBvciBub3QuXG4gICAqL1xuICBwdWJsaWMgaXNDb21waWxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fX2NvbXBpbGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBpbGUgdGhlIHNoYWRlci5cbiAgICovXG4gIHB1YmxpYyBjb21waWxlKCBjb2RlOiBzdHJpbmcgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgZ2wuc2hhZGVyU291cmNlKCB0aGlzLl9fc2hhZGVyLCBjb2RlICk7XG4gICAgZ2wuY29tcGlsZVNoYWRlciggdGhpcy5fX3NoYWRlciApO1xuXG4gICAgdGhpcy5fX2NvbXBpbGVkID0gZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKCB0aGlzLl9fc2hhZGVyLCBHTF9DT01QSUxFX1NUQVRVUyApO1xuICAgIGlmICggIXRoaXMuX19jb21waWxlZCApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvciggZ2wuZ2V0U2hhZGVySW5mb0xvZyggdGhpcy5fX3NoYWRlciApISApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xfQ0xBTVBfVE9fRURHRSwgR0xfRkxPQVQsIEdMX0hBTEZfRkxPQVQsIEdMX0xJTkVBUiwgR0xfTkVBUkVTVCwgR0xfUkdCQSwgR0xfUkdCQTgsIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIEdMX1RFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWCwgR0xfVEVYVFVSRV9NQUdfRklMVEVSLCBHTF9URVhUVVJFX01JTl9GSUxURVIsIEdMX1RFWFRVUkVfV1JBUF9TLCBHTF9URVhUVVJFX1dSQVBfVCwgR0xfVU5TSUdORURfQllURSB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuaW1wb3J0IHR5cGUgeyBHTENhdCB9IGZyb20gJy4vR0xDYXQnO1xuaW1wb3J0IHsgR0xDYXRFcnJvcnMgfSBmcm9tICcuL0dMQ2F0RXJyb3JzJztcblxuY29uc3QgemVyb1RleHR1cmVBcnJheSA9IG5ldyBVaW50OEFycmF5KCBbIDAsIDAsIDAsIDAgXSApO1xuXG4vKipcbiAqIEl0J3MgYSBXZWJHTFRleHR1cmUuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdFRleHR1cmU8VENvbnRleHQgZXh0ZW5kcyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0PiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fdGV4dHVyZTogV2ViR0xUZXh0dXJlO1xuICBwcml2YXRlIF9fd2lkdGggPSAwO1xuICBwcml2YXRlIF9faGVpZ2h0ID0gMDtcblxuICAvKipcbiAgICogSXRzIG93biB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIGdldCB0ZXh0dXJlKCk6IFdlYkdMVGV4dHVyZSB7XG4gICAgcmV0dXJuIHRoaXMuX190ZXh0dXJlO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gdGV4dHVyZS4gU2hvcnRlciB0aGFuIFtbR0xDYXRUZXh0dXJlLnRleHR1cmVkXV1cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3KCk6IFdlYkdMVGV4dHVyZSB7XG4gICAgcmV0dXJuIHRoaXMuX190ZXh0dXJlO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyB3aWR0aC5cbiAgICovXG4gIHB1YmxpYyBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3dpZHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBoZWlnaHQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9faGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdFRleHR1cmUgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIHRleHR1cmU6IFdlYkdMVGV4dHVyZSApIHtcbiAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcbiAgICB0aGlzLl9fdGV4dHVyZSA9IHRleHR1cmU7XG4gICAgdGhpcy50ZXh0dXJlRmlsdGVyKCBHTF9MSU5FQVIgKTtcbiAgICB0aGlzLnRleHR1cmVXcmFwKCBHTF9DTEFNUF9UT19FREdFICk7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX19nbENhdC5nbC5kZWxldGVUZXh0dXJlKCB0aGlzLl9fdGV4dHVyZSApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IHRvIGZpbHRlciB0aGUgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyB0ZXh0dXJlRmlsdGVyKCk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlRmlsdGVyKCBmaWx0ZXI6IG51bWJlciApOiB2b2lkO1xuICBwdWJsaWMgdGV4dHVyZUZpbHRlciggZmlsdGVyTWFnOiBudW1iZXIsIGZpbHRlck1pbjogbnVtYmVyICk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlRmlsdGVyKCBmaWx0ZXJNYWc6IG51bWJlciA9IEdMX05FQVJFU1QsIGZpbHRlck1pbjogbnVtYmVyID0gZmlsdGVyTWFnICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFXzJELCBHTF9URVhUVVJFX01BR19GSUxURVIsIGZpbHRlck1hZyApO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9NSU5fRklMVEVSLCBmaWx0ZXJNaW4gKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogU3BlY2lmeSBob3cgdG8gd3JhcCB0aGUgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyB0ZXh0dXJlV3JhcCgpOiB2b2lkO1xuICBwdWJsaWMgdGV4dHVyZVdyYXAoIHdyYXA6IG51bWJlciApOiB2b2lkO1xuICBwdWJsaWMgdGV4dHVyZVdyYXAoIHdyYXBTOiBudW1iZXIsIHdyYXBUOiBudW1iZXIgKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVXcmFwKCB3cmFwUzogbnVtYmVyID0gR0xfQ0xBTVBfVE9fRURHRSwgd3JhcFQ6IG51bWJlciA9IHdyYXBTICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFXzJELCBHTF9URVhUVVJFX1dSQVBfUywgd3JhcFMgKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfV1JBUF9ULCB3cmFwVCApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHRleFN0b3JhZ2UyRChcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHsgdGFyZ2V0ID0gR0xfVEVYVFVSRV8yRCwgbGV2ZWwgPSAxLCBmb3JtYXQgPSBHTF9SR0JBOCB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgaWYgKCBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGhpcywgKCkgPT4ge1xuICAgICAgICBnbC50ZXhTdG9yYWdlMkQoIHRhcmdldCwgbGV2ZWwsIGZvcm1hdCwgd2lkdGgsIGhlaWdodCApO1xuICAgICAgfSApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBHTENhdEVycm9ycy5XZWJHTDJFeGNsdXNpdmVFcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgdmFsdWUgZm9yIHRoZSBwYXNzZWQgcGFyYW1ldGVyIG5hbWUuXG4gICAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYkdMUmVuZGVyaW5nQ29udGV4dC9nZXRQYXJhbWV0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXRQYXJhbWV0ZXIoIHBuYW1lOiBHTGVudW0gKTogYW55IHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICByZXR1cm4gdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIHJldHVybiBnbC5nZXRQYXJhbWV0ZXIoIHBuYW1lICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIHBpeGVsIHN0b3JhZ2UgbW9kZXMuXG4gICAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYkdMUmVuZGVyaW5nQ29udGV4dC9waXhlbFN0b3JlaVxuICAgKi9cbiAgcHVibGljIHBpeGVsU3RvcmVpKCBwbmFtZTogR0xlbnVtLCBwYXJhbTogbnVtYmVyIHwgYm9vbGVhbiApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wucGl4ZWxTdG9yZWkoIHBuYW1lLCBwYXJhbSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbmV3IGRhdGEgaW50byB0aGlzIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgc2V0VGV4dHVyZSggc291cmNlOiBUZXhJbWFnZVNvdXJjZSApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudGV4SW1hZ2UyRCggR0xfVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgc291cmNlICk7XG4gICAgfSApO1xuXG4gICAgdGhpcy5fX3dpZHRoID0gc291cmNlLndpZHRoO1xuICAgIHRoaXMuX19oZWlnaHQgPSBzb3VyY2UuaGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgdGV4dHVyZS5cbiAgICogVGhpcyBmdW5jdGlvbiB1c2VzIFR5cGVkQXJyYXkuIElmIHlvdSB3YW50IHRvIHNvdXJjZSBpbWFnZSBkYXRhLCB1c2UgYEdMQ2F0LnNldFRleHR1cmUoKWAgaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBzZXRUZXh0dXJlRnJvbUFycmF5KFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgc291cmNlOiBBcnJheUJ1ZmZlclZpZXcgfCBudWxsLFxuICAgIHtcbiAgICAgIGludGVybmFsZm9ybWF0ID0gR0xfUkdCQTgsXG4gICAgICBmb3JtYXQgPSBHTF9SR0JBLFxuICAgICAgdHlwZSA9IEdMX1VOU0lHTkVEX0JZVEVcbiAgICB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgbGV0IGlmb3JtYXQgPSBpbnRlcm5hbGZvcm1hdDtcbiAgICBpZiAoICEoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApICkge1xuICAgICAgaWYgKCB0eXBlID09PSBHTF9IQUxGX0ZMT0FUICkge1xuICAgICAgICB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnT0VTX3RleHR1cmVfaGFsZl9mbG9hdCcsIHRydWUgKTtcbiAgICAgICAgdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ09FU190ZXh0dXJlX2hhbGZfZmxvYXRfbGluZWFyJyApO1xuICAgICAgfSBlbHNlIGlmICggdHlwZSA9PT0gR0xfRkxPQVQgKSB7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9mbG9hdCcsIHRydWUgKTtcbiAgICAgICAgdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ09FU190ZXh0dXJlX2Zsb2F0X2xpbmVhcicgKTtcbiAgICAgIH1cblxuICAgICAgaWZvcm1hdCA9IGZvcm1hdDtcbiAgICB9XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudGV4SW1hZ2UyRChcbiAgICAgICAgR0xfVEVYVFVSRV8yRCxcbiAgICAgICAgMCxcbiAgICAgICAgaWZvcm1hdCxcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgMCxcbiAgICAgICAgZm9ybWF0LFxuICAgICAgICB0eXBlLFxuICAgICAgICBzb3VyY2VcbiAgICAgICk7XG4gICAgfSApO1xuXG4gICAgdGhpcy5fX3dpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5fX2hlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHBpeGVscyBmcm9tIGN1cnJlbnQgZnJhbWVidWZmZXIgdG8gZ2l2ZW4gdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBjb3B5VGV4dHVyZSggd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLmNvcHlUZXhJbWFnZTJEKCBHTF9URVhUVVJFXzJELCAwLCBHTF9SR0JBLCAwLCAwLCB3aWR0aCwgaGVpZ2h0LCAwICk7XG4gICAgfSApO1xuXG4gICAgdGhpcy5fX3dpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5fX2hlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbmV3IGN1YmVtYXAgZGF0YSBpbnRvIHRoaXMgdGV4dHVyZS5cbiAgICogQHBhcmFtIHRleHR1cmVzIEFycmF5IG9mIGlhbWdlcy4gT3JkZXI6IGBYK2AsIGBYLWAsIGBZK2AsIGBZLWAsIGBaK2AsIGBaLWBcbiAgICogQHRvZG8gZHVlIHRvIGNvbXBhdGliaWxpdHkgb2YgaXRzIGB3aWR0aGAgYW5kIGBoZWlnaHRgIGl0IHNob3VsZCBub3QgYmUgdXNlZCB5ZXRcbiAgICovXG4gIHB1YmxpYyBzZXRDdWJlbWFwKCB0ZXh0dXJlczogVGV4SW1hZ2VTb3VyY2VbXSApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmVDdWJlTWFwKCB0aGlzLCAoKSA9PiB7XG4gICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCA2OyBpICsrICkge1xuICAgICAgICBnbC50ZXhJbWFnZTJEKFxuICAgICAgICAgIEdMX1RFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWCArIGksXG4gICAgICAgICAgMCxcbiAgICAgICAgICBHTF9SR0JBLFxuICAgICAgICAgIEdMX1JHQkEsXG4gICAgICAgICAgR0xfVU5TSUdORURfQllURSxcbiAgICAgICAgICB0ZXh0dXJlc1sgaSBdXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFX0NVQkVfTUFQLCBHTF9URVhUVVJFX01JTl9GSUxURVIsIEdMX0xJTkVBUiApO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9NQUdfRklMVEVSLCBHTF9MSU5FQVIgKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIEdMX1RFWFRVUkVfV1JBUF9TLCBHTF9DTEFNUF9UT19FREdFICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFX0NVQkVfTUFQLCBHTF9URVhUVVJFX1dSQVBfVCwgR0xfQ0xBTVBfVE9fRURHRSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgWyAwLCAwLCAwLCAwIF0gdG8gdGhpcyB0ZXh0dXJlLlxuICAgKiBVc2VmdWwgZm9yIHRlbXBvcmFyeSB1c2UuLlxuICAgKi9cbiAgcHVibGljIHNldFplcm9UZXh0dXJlKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0VGV4dHVyZUZyb21BcnJheSggMSwgMSwgemVyb1RleHR1cmVBcnJheSApO1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSB7IEdMQ2F0LCBHTENhdFZlcnRleEFycmF5UmF3VHlwZSB9IGZyb20gJy4vR0xDYXQnO1xuaW1wb3J0IHsgR0xfQVJSQVlfQlVGRkVSLCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiwgR0xfRkxPQVQgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXRCdWZmZXIgfSBmcm9tICcuL0dMQ2F0QnVmZmVyJztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xWZXJ0ZXhBcnJheU9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0VmVydGV4QXJyYXk8VENvbnRleHQgZXh0ZW5kcyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0PiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fdmVydGV4QXJyYXk6IEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0PjtcblxuICAvKipcbiAgICogSXRzIG93biBidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGJ1ZmZlcigpOiBHTENhdFZlcnRleEFycmF5UmF3VHlwZTxUQ29udGV4dD4ge1xuICAgIHJldHVybiB0aGlzLl9fdmVydGV4QXJyYXk7XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biBidWZmZXIuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0QnVmZmVyLmJ1ZmZlcl1dLlxuICAgKi9cbiAgcHVibGljIGdldCByYXcoKTogR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQ+IHtcbiAgICByZXR1cm4gdGhpcy5fX3ZlcnRleEFycmF5O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdEJ1ZmZlciBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PiwgdmVydGV4QXJyYXk6IEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0PiApIHtcbiAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcbiAgICB0aGlzLl9fdmVydGV4QXJyYXkgPSB2ZXJ0ZXhBcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSBidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGdsLmRlbGV0ZVZlcnRleEFycmF5KCB0aGlzLl9fdmVydGV4QXJyYXkgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JywgdHJ1ZSApO1xuICAgICAgZXh0LmRlbGV0ZVZlcnRleEFycmF5T0VTKCB0aGlzLl9fdmVydGV4QXJyYXkgYXMgYW55ICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSB2ZXJ0ZXggYnVmZmVyIHRvIHRoZSB2ZXJ0ZXggYXJyYXkuXG4gICAqL1xuICBwdWJsaWMgYmluZFZlcnRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PixcbiAgICBsb2NhdGlvbjogbnVtYmVyLFxuICAgIHNpemUgPSAxLFxuICAgIGRpdmlzb3IgPSAwLFxuICAgIHR5cGU6IG51bWJlciA9IEdMX0ZMT0FULFxuICAgIHN0cmlkZSA9IDAsXG4gICAgb2Zmc2V0ID0gMFxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFZlcnRleEFycmF5KCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5iaW5kQnVmZmVyKCBHTF9BUlJBWV9CVUZGRVIsIHNvdXJjZS5yYXcgKTtcbiAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KCBsb2NhdGlvbiApO1xuICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlciggbG9jYXRpb24sIHNpemUsIHR5cGUsIGZhbHNlLCBzdHJpZGUsIG9mZnNldCApO1xuXG4gICAgICBpZiAoIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgICAgZ2wudmVydGV4QXR0cmliRGl2aXNvciggbG9jYXRpb24sIGRpdmlzb3IgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4dCA9IHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJyApO1xuICAgICAgICBpZiAoIGV4dCApIHtcbiAgICAgICAgICBleHQudmVydGV4QXR0cmliRGl2aXNvckFOR0xFKCBsb2NhdGlvbiwgZGl2aXNvciApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYW4gaW5kZXggYnVmZmVyIHRvIHRoZSB2ZXJ0ZXggYXJyYXkuXG4gICAqL1xuICBwdWJsaWMgYmluZEluZGV4YnVmZmVyKFxuICAgIHNvdXJjZTogR0xDYXRCdWZmZXI8VENvbnRleHQ+XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVmVydGV4QXJyYXkoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLmJpbmRCdWZmZXIoIEdMX0VMRU1FTlRfQVJSQVlfQlVGRkVSLCBzb3VyY2UucmF3ICk7XG4gICAgfSApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBHTF9BUlJBWV9CVUZGRVIsIEdMX0JMRU5ELCBHTF9DT0xPUl9BVFRBQ0hNRU5UMCwgR0xfQ09MT1JfQlVGRkVSX0JJVCwgR0xfREVQVEgyNF9TVEVOQ0lMOCwgR0xfREVQVEhfQVRUQUNITUVOVCwgR0xfREVQVEhfQlVGRkVSX0JJVCwgR0xfREVQVEhfQ09NUE9ORU5UMTYsIEdMX0RFUFRIX1RFU1QsIEdMX0RSQVdfRlJBTUVCVUZGRVIsIEdMX0VMRU1FTlRfQVJSQVlfQlVGRkVSLCBHTF9GTE9BVCwgR0xfRlJBR01FTlRfU0hBREVSLCBHTF9GUkFNRUJVRkZFUiwgR0xfTEVRVUFMLCBHTF9NQVhfRFJBV19CVUZGRVJTLCBHTF9ORUFSRVNULCBHTF9PTkVfTUlOVVNfU1JDX0FMUEhBLCBHTF9SRUFEX0ZSQU1FQlVGRkVSLCBHTF9SRU5ERVJCVUZGRVIsIEdMX1JHQkEsIEdMX1JHQkEzMkYsIEdMX1JHQkE4LCBHTF9TUkNfQUxQSEEsIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIEdMX1ZFUlRFWF9TSEFERVIgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB7IEJpbmRIZWxwZXIgfSBmcm9tICcuL3V0aWxzL0JpbmRIZWxwZXInO1xuaW1wb3J0IHsgR0xDYXRCdWZmZXIgfSBmcm9tICcuL0dMQ2F0QnVmZmVyJztcbmltcG9ydCB7IEdMQ2F0RXJyb3JzIH0gZnJvbSAnLi9HTENhdEVycm9ycyc7XG5pbXBvcnQgeyBHTENhdEZyYW1lYnVmZmVyIH0gZnJvbSAnLi9HTENhdEZyYW1lYnVmZmVyJztcbmltcG9ydCB7IEdMQ2F0UHJvZ3JhbSB9IGZyb20gJy4vR0xDYXRQcm9ncmFtJztcbmltcG9ydCB7IEdMQ2F0UmVuZGVyYnVmZmVyIH0gZnJvbSAnLi9HTENhdFJlbmRlcmJ1ZmZlcic7XG5pbXBvcnQgeyBHTENhdFNoYWRlciB9IGZyb20gJy4vR0xDYXRTaGFkZXInO1xuaW1wb3J0IHsgR0xDYXRUZXh0dXJlIH0gZnJvbSAnLi9HTENhdFRleHR1cmUnO1xuaW1wb3J0IHsgR0xDYXRWZXJ0ZXhBcnJheSB9IGZyb20gJy4vR0xDYXRWZXJ0ZXhBcnJheSc7XG5cbmV4cG9ydCB0eXBlIFdlYkdMRXh0ZW5zaW9uID0gYW55O1xuXG5leHBvcnQgdHlwZSBHTENhdFZlcnRleEFycmF5UmF3VHlwZTxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+XG4gID0gVENvbnRleHQgZXh0ZW5kcyBXZWJHTDJSZW5kZXJpbmdDb250ZXh0XG4gICAgPyBXZWJHTFZlcnRleEFycmF5T2JqZWN0XG4gICAgOiBXZWJHTFZlcnRleEFycmF5T2JqZWN0T0VTO1xuXG4vKipcbiAqIFdlYkdMIHdyYXBwZXIgd2l0aCBwbGVudHkgb2YgaGFja2FiaWxpdHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdDxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHVibGljIHN0YXRpYyB0aHJvd0lmTnVsbDxUPiggdjogVCB8IG51bGwgKTogVCB7XG4gICAgaWYgKCB2ID09IG51bGwgKSB7XG4gICAgICB0aHJvdyBHTENhdEVycm9ycy5VbmV4cGVjdGVkTnVsbEVycm9yO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdjtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcHJlZmVycmVkTXVsdGlzYW1wbGVTYW1wbGVzID0gNDtcblxuICBwcml2YXRlIF9fcHJlZmVycmVkRGVwdGhGb3JtYXQ6IEdMZW51bSB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgZ2V0IHByZWZlcnJlZERlcHRoRm9ybWF0KCk6IEdMZW51bSB7XG4gICAgaWYgKCB0aGlzLl9fcHJlZmVycmVkRGVwdGhGb3JtYXQgIT09IG51bGwgKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3ByZWZlcnJlZERlcHRoRm9ybWF0O1xuICAgIH0gZWxzZSBpZiAoIHRoaXMuX19nbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICByZXR1cm4gR0xfREVQVEgyNF9TVEVOQ0lMODtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEdMX0RFUFRIX0NPTVBPTkVOVDE2O1xuICAgIH1cbiAgfVxuICBwdWJsaWMgc2V0IHByZWZlcnJlZERlcHRoRm9ybWF0KCBmb3JtYXQ6IEdMZW51bSApIHtcbiAgICB0aGlzLl9fcHJlZmVycmVkRGVwdGhGb3JtYXQgPSBmb3JtYXQ7XG4gIH1cblxuICBwcml2YXRlIF9fZ2w6IFRDb250ZXh0O1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyVmVydGV4QnVmZmVyID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIGJ1ZmZlciApID0+IHtcbiAgICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuICAgICAgZ2wuYmluZEJ1ZmZlciggR0xfQVJSQVlfQlVGRkVSLCBidWZmZXI/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVySW5kZXhCdWZmZXIgPSBuZXcgQmluZEhlbHBlcjxHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggYnVmZmVyICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kQnVmZmVyKCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiwgYnVmZmVyPy5yYXcgPz8gbnVsbCApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlclZlcnRleEFycmF5ID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggdmVydGV4QXJyYXkgKSA9PiB7XG4gICAgICB0aGlzLnJhd0JpbmRWZXJ0ZXhBcnJheSggdmVydGV4QXJyYXk/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyVGV4dHVyZTJEID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCB0ZXh0dXJlICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kVGV4dHVyZSggR0xfVEVYVFVSRV8yRCwgdGV4dHVyZT8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJUZXh0dXJlQ3ViZU1hcCA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggdGV4dHVyZSApID0+IHtcbiAgICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuICAgICAgZ2wuYmluZFRleHR1cmUoIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIHRleHR1cmU/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyUmVuZGVyYnVmZmVyID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIHJlbmRlcmJ1ZmZlciApID0+IHtcbiAgICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuICAgICAgZ2wuYmluZFJlbmRlcmJ1ZmZlciggR0xfUkVOREVSQlVGRkVSLCByZW5kZXJidWZmZXI/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyRnJhbWVidWZmZXIgPSBuZXcgQmluZEhlbHBlcjxHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCBmcmFtZWJ1ZmZlciApID0+IHtcbiAgICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKCBHTF9GUkFNRUJVRkZFUiwgZnJhbWVidWZmZXI/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyUHJvZ3JhbSA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggcHJvZ3JhbSApID0+IHtcbiAgICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuICAgICAgZ2wudXNlUHJvZ3JhbSggcHJvZ3JhbT8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJEcmF3QnVmZmVycyA9IG5ldyBCaW5kSGVscGVyPEdMZW51bVtdPihcbiAgICBbIEdMX0NPTE9SX0FUVEFDSE1FTlQwIF0sXG4gICAgKCBidWZmZXJzICkgPT4ge1xuICAgICAgdGhpcy5yYXdEcmF3QnVmZmVycyggYnVmZmVycyApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fZXh0ZW5zaW9uQ2FjaGU6IHsgWyBuYW1lOiBzdHJpbmcgXTogV2ViR0xFeHRlbnNpb24gfSA9IHt9O1xuICBwcml2YXRlIF9fZHVtbXlUZXh0dXJlQ2FjaGU/OiBHTENhdFRleHR1cmU8VENvbnRleHQ+O1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHJlbmRlcmluZyBjb250ZXh0LlxuICAgKi9cbiAgcHVibGljIGdldCByZW5kZXJpbmdDb250ZXh0KCk6IFRDb250ZXh0IHtcbiAgICByZXR1cm4gdGhpcy5fX2dsO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcmVuZGVyaW5nIGNvbnRleHQuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0LnJlbmRlcmluZ0NvbnRleHRdXVxuICAgKi9cbiAgcHVibGljIGdldCBnbCgpOiBUQ29udGV4dCB7XG4gICAgcmV0dXJuIHRoaXMuX19nbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXQgaW5zdGFuY2UuXG4gICAqIFJlbmRlcmluZyBjb250ZXh0IGlzIHJlcXVpcmVkLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbDogVENvbnRleHQgKSB7XG4gICAgdGhpcy5fX2dsID0gZ2w7XG5cbiAgICBnbC5lbmFibGUoIEdMX0RFUFRIX1RFU1QgKTtcbiAgICBnbC5kZXB0aEZ1bmMoIEdMX0xFUVVBTCApO1xuICAgIGdsLmVuYWJsZSggR0xfQkxFTkQgKTtcbiAgICBnbC5ibGVuZEZ1bmMoIEdMX1NSQ19BTFBIQSwgR0xfT05FX01JTlVTX1NSQ19BTFBIQSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgZHVtbXkgdGV4dHVyZSwgMTAwJSBvcmdhbmljIHB1cmUgI0ZGMDBGRiB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIGdldCBkdW1teVRleHR1cmUoKTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB7XG4gICAgaWYgKCB0aGlzLl9fZHVtbXlUZXh0dXJlQ2FjaGUgKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX2R1bW15VGV4dHVyZUNhY2hlO1xuICAgIH1cblxuICAgIGNvbnN0IHRleHR1cmUgPSB0aGlzLmNyZWF0ZVRleHR1cmUoKTtcblxuICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21BcnJheSggMSwgMSwgbmV3IFVpbnQ4QXJyYXkoIFsgMjU1LCAwLCAyNTUsIDI1NSBdICkgKTtcbiAgICB0aGlzLl9fZHVtbXlUZXh0dXJlQ2FjaGUgPSB0ZXh0dXJlO1xuICAgIHJldHVybiB0ZXh0dXJlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIGFuIGV4dGVuc2lvbi5cbiAgICogSWYgdGhleSBpcyB5b3VyIHByZWNpb3VzIG9uZSBhbmQgeW91IGNhbm5vdCBsaXZlIHdpdGhvdXQgaGltLCB0dXJuIG9uIGB0aHJvd0lmTm90Rm91bmRgLlxuICAgKi9cbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfaGFsZl9mbG9hdCcsXG4gICAgdGhyb3dJZk5vdEZvdW5kPzogZmFsc2VcbiAgKTogT0VTX3RleHR1cmVfaGFsZl9mbG9hdCB8IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogT0VTX3RleHR1cmVfaGFsZl9mbG9hdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2hhbGZfZmxvYXRfbGluZWFyJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0X2xpbmVhciB8IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0X2xpbmVhcicsXG4gICAgdGhyb3dJZk5vdEZvdW5kOiB0cnVlXG4gICk6IE9FU190ZXh0dXJlX2hhbGZfZmxvYXRfbGluZWFyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfZmxvYXQnLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IE9FU190ZXh0dXJlX2Zsb2F0IHwgbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2Zsb2F0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogT0VTX3RleHR1cmVfZmxvYXQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXInLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IE9FU190ZXh0dXJlX2Zsb2F0X2xpbmVhciB8IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXInLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBBTkdMRV9pbnN0YW5jZWRfYXJyYXlzIHwgbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ0FOR0xFX2luc3RhbmNlZF9hcnJheXMnLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBBTkdMRV9pbnN0YW5jZWRfYXJyYXlzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2VcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IE9FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0IHwgbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogT0VTX3ZlcnRleF9hcnJheV9vYmplY3Q7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdXRUJHTF9kcmF3X2J1ZmZlcnMnLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IFdFQkdMX2RyYXdfYnVmZmVycyB8IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdXRUJHTF9kcmF3X2J1ZmZlcnMnLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBXRUJHTF9kcmF3X2J1ZmZlcnM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKCBuYW1lOiBzdHJpbmcsIHRocm93SWZOb3RGb3VuZD86IGJvb2xlYW4gKTogV2ViR0xFeHRlbnNpb24gfCBudWxsO1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKCBuYW1lOiBzdHJpbmcsIHRocm93SWZOb3RGb3VuZD86IGJvb2xlYW4gKTogV2ViR0xFeHRlbnNpb24gfCBudWxsIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmICggdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF0gKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX19leHRlbnNpb25DYWNoZVsgbmFtZSBdID0gZ2wuZ2V0RXh0ZW5zaW9uKCBuYW1lICk7XG4gICAgICBpZiAoIHRoaXMuX19leHRlbnNpb25DYWNoZVsgbmFtZSBdICkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIHRocm93SWZOb3RGb3VuZCApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoICdHTENhdC5nZXRFeHRlbnNpb246IFRoZSBleHRlbnNpb24gXCInICsgbmFtZSArICdcIiBpcyBub3Qgc3VwcG9ydGVkJyApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBleHRlbnNpb25zLlxuICAgKiBJZiB0aGV5IGFyZSB5b3VyIHByZWNpb3VzIG9uZXMgYW5kIHlvdSBjYW5ub3QgbGl2ZSB3aXRob3V0IHRoZW0sIHR1cm4gb24gYHRocm93SWZOb3RGb3VuZGAuXG4gICAqL1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9ucyggbmFtZXM6IHN0cmluZ1tdLCB0aHJvd0lmTm90Rm91bmQ/OiBib29sZWFuICk6IEFycmF5PFdlYkdMRXh0ZW5zaW9uIHwgbnVsbD4ge1xuICAgIHJldHVybiBuYW1lcy5tYXAoICggbiApID0+IHRoaXMuZ2V0RXh0ZW5zaW9uKCBuLCB0aHJvd0lmTm90Rm91bmQgKSApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBzaGFkZXIgb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVNoYWRlciggdHlwZTogbnVtYmVyICk6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBjb25zdCBzaGFkZXIgPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlU2hhZGVyKCB0eXBlICkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRTaGFkZXIoIHRoaXMsIHNoYWRlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdCBwcm9ncmFtIG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVQcm9ncmFtKCk6IEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgY29uc3QgcHJvZ3JhbSA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVQcm9ncmFtKCkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRQcm9ncmFtKCB0aGlzLCBwcm9ncmFtICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IHByb2dyYW0gb2JqZWN0LCBpbiBsYXppZXIgd2F5LlxuICAgKi9cbiAgcHVibGljIGxhenlQcm9ncmFtKCB2ZXJ0OiBzdHJpbmcsIGZyYWc6IHN0cmluZyApOiBHTENhdFByb2dyYW08VENvbnRleHQ+IHtcbiAgICBsZXQgdmVydGV4U2hhZGVyOiBHTENhdFNoYWRlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IGZyYWdtZW50U2hhZGVyOiBHTENhdFNoYWRlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IHByb2dyYW06IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICAvLyA9PSB2ZXJ0ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLmNyZWF0ZVNoYWRlciggR0xfVkVSVEVYX1NIQURFUiApO1xuICAgICAgdmVydGV4U2hhZGVyLmNvbXBpbGUoIHZlcnQgKTtcblxuICAgICAgLy8gPT0gZnJhZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLmNyZWF0ZVNoYWRlciggR0xfRlJBR01FTlRfU0hBREVSICk7XG4gICAgICBmcmFnbWVudFNoYWRlci5jb21waWxlKCBmcmFnICk7XG5cbiAgICAgIC8vID09IHByb2dyYW0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGNvbnN0IHByb2dyYW0gPSB0aGlzLmNyZWF0ZVByb2dyYW0oKTtcbiAgICAgIHByb2dyYW0ubGluayggdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlciApO1xuXG4gICAgICAvLyA9PSBhbG1vc3QgZG9uZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICByZXR1cm4gcHJvZ3JhbTtcbiAgICB9IGNhdGNoICggZSApIHtcbiAgICAgIHByb2dyYW0/LmRpc3Bvc2UoKTtcbiAgICAgIGZyYWdtZW50U2hhZGVyPy5kaXNwb3NlKCk7XG4gICAgICB2ZXJ0ZXhTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdCBwcm9ncmFtIG9iamVjdCwgaW4gbGF6aWVyIHdheS5cbiAgICogSXQncyBnb25uYSBiZSBhc3luY2hyb25vdXMgaWYgeW91IGhhdmUgdGhlIEtIUl9wYXJhbGxlbF9zaGFkZXJfY29tcGlsZSBleHRlbnNpb24gc3VwcG9ydC5cbiAgICovXG4gIHB1YmxpYyBsYXp5UHJvZ3JhbUFzeW5jKCB2ZXJ0OiBzdHJpbmcsIGZyYWc6IHN0cmluZyApOiBQcm9taXNlPEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4+IHtcbiAgICBsZXQgdmVydGV4U2hhZGVyOiBHTENhdFNoYWRlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IGZyYWdtZW50U2hhZGVyOiBHTENhdFNoYWRlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IHByb2dyYW06IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICAvLyA9PSB2ZXJ0ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLmNyZWF0ZVNoYWRlciggR0xfVkVSVEVYX1NIQURFUiApO1xuICAgICAgdmVydGV4U2hhZGVyLmNvbXBpbGUoIHZlcnQgKTtcblxuICAgICAgLy8gPT0gZnJhZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLmNyZWF0ZVNoYWRlciggR0xfRlJBR01FTlRfU0hBREVSICk7XG4gICAgICBmcmFnbWVudFNoYWRlci5jb21waWxlKCBmcmFnICk7XG5cbiAgICAgIC8vID09IHByb2dyYW0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGNvbnN0IHByb2dyYW0gPSB0aGlzLmNyZWF0ZVByb2dyYW0oKTtcbiAgICAgIHJldHVybiBwcm9ncmFtLmxpbmtBc3luYyggdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlciApLnRoZW4oICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHByb2dyYW07XG4gICAgICB9ICkuY2F0Y2goICggZSApID0+IHtcbiAgICAgICAgcHJvZ3JhbT8uZGlzcG9zZSgpO1xuICAgICAgICBmcmFnbWVudFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgICB2ZXJ0ZXhTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCBlICk7XG4gICAgICB9ICk7XG4gICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICBwcm9ncmFtPy5kaXNwb3NlKCk7XG4gICAgICBmcmFnbWVudFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgdmVydGV4U2hhZGVyPy5kaXNwb3NlKCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoIGUgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3BlY2lmeSBhIHByb2dyYW0gdG8gdXNlLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIHVzYWdlIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyB1c2VQcm9ncmFtPFQ+KFxuICAgIHByb2dyYW06IEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCBwcm9ncmFtOiBHTENhdFByb2dyYW08VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyUHJvZ3JhbS5iaW5kKCBwcm9ncmFtLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB2ZXJ0ZXggYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUJ1ZmZlcigpOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgY29uc3QgYnVmZmVyID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZUJ1ZmZlcigpICk7XG5cbiAgICByZXR1cm4gbmV3IEdMQ2F0QnVmZmVyKCB0aGlzLCBidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgdmVydGV4IGJ1ZmZlci5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kVmVydGV4QnVmZmVyPFQ+KFxuICAgIGJ1ZmZlcjogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggYnVmZmVyOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJWZXJ0ZXhCdWZmZXIuYmluZCggYnVmZmVyLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYW4gaW5kZXggYnVmZmVyLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRJbmRleEJ1ZmZlcjxUPihcbiAgICBidWZmZXI6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIGJ1ZmZlcjogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVySW5kZXhCdWZmZXIuYmluZCggYnVmZmVyLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB2ZXJ0ZXggYXJyYXkuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlVmVydGV4QXJyYXkoKTogR0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKCBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBjb25zdCB2ZXJ0ZXhBcnJheSA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVWZXJ0ZXhBcnJheSgpICk7XG5cbiAgICAgIHJldHVybiBuZXcgR0xDYXRWZXJ0ZXhBcnJheSggdGhpcywgdmVydGV4QXJyYXkgYXMgYW55ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4dCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCAnT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnLCB0cnVlICk7XG5cbiAgICAgIGNvbnN0IHZlcnRleEFycmF5ID0gR0xDYXQudGhyb3dJZk51bGwoIGV4dC5jcmVhdGVWZXJ0ZXhBcnJheU9FUygpICk7XG5cbiAgICAgIHJldHVybiBuZXcgR0xDYXRWZXJ0ZXhBcnJheSggdGhpcywgdmVydGV4QXJyYXkgYXMgYW55ICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgb2YgYGdsLmJpbmRWZXJ0ZXhBcnJheWAuXG4gICAqXG4gICAqIHtAbGluayByYXdCaW5kVmVydGV4QXJyYXl9IGlzIGJldHRlci5cbiAgICovXG4gIHB1YmxpYyByYXdCaW5kVmVydGV4QXJyYXkoIGFycmF5OiBHTENhdFZlcnRleEFycmF5UmF3VHlwZTxUQ29udGV4dD4gfCBudWxsICk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKCBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBnbC5iaW5kVmVydGV4QXJyYXkoIGFycmF5ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4dCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCAnT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnLCB0cnVlICk7XG4gICAgICBleHQuYmluZFZlcnRleEFycmF5T0VTKCBhcnJheSBhcyBhbnkgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIHJhd0JpbmRWZXJ0ZXhBcnJheX0gYnV0IGJldHRlci5cbiAgICpcbiAgICogQmluZCBhIHZlcnRleCBhcnJheS5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kVmVydGV4QXJyYXk8VD4oXG4gICAgdmVydGV4QXJyYXk6IEdMQ2F0VmVydGV4QXJyYXk8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggdmVydGV4QXJyYXk6IEdMQ2F0VmVydGV4QXJyYXk8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyVmVydGV4QXJyYXkuYmluZCggdmVydGV4QXJyYXksIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlVGV4dHVyZSgpOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGNvbnN0IHRleHR1cmUgPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlVGV4dHVyZSgpICk7XG5cbiAgICByZXR1cm4gbmV3IEdMQ2F0VGV4dHVyZSggdGhpcywgdGV4dHVyZSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSAyRCB0ZXh0dXJlLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRUZXh0dXJlMkQ8VD4oXG4gICAgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJUZXh0dXJlMkQuYmluZCggdGV4dHVyZSwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgY3ViZW1hcCB0ZXh0dXJlLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRUZXh0dXJlQ3ViZU1hcDxUPihcbiAgICB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclRleHR1cmVDdWJlTWFwLmJpbmQoIHRleHR1cmUsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVSZW5kZXJidWZmZXIoKTogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGNvbnN0IHJlbmRlcmJ1ZmZlciA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVSZW5kZXJidWZmZXIoKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdFJlbmRlcmJ1ZmZlciggdGhpcywgcmVuZGVyYnVmZmVyICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIHJlbmRlcmJ1ZmZlci5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kUmVuZGVyYnVmZmVyPFQ+KFxuICAgIHJlbmRlcmJ1ZmZlcjogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggcmVuZGVyYnVmZmVyOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJSZW5kZXJidWZmZXIuYmluZCggcmVuZGVyYnVmZmVyLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBmcmFtZWJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVGcmFtZWJ1ZmZlcigpOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBjb25zdCBmcmFtZWJ1ZmZlciA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVGcmFtZWJ1ZmZlcigpICk7XG5cbiAgICByZXR1cm4gbmV3IEdMQ2F0RnJhbWVidWZmZXIoIHRoaXMsIGZyYW1lYnVmZmVyICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIGZyYW1lYnVmZmVyLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRGcmFtZWJ1ZmZlcjxUPihcbiAgICBmcmFtZWJ1ZmZlcjogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCBmcmFtZWJ1ZmZlcjogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJGcmFtZWJ1ZmZlci5iaW5kKCBmcmFtZWJ1ZmZlciwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgZnJhbWVidWZlciwgaW4gbGF6aWVyIHdheS5cbiAgICovXG4gIHB1YmxpYyBsYXp5RnJhbWVidWZmZXIoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB7XG4gICAgICBpc0Zsb2F0ID0gZmFsc2UsXG4gICAgICBkZXB0aEZvcm1hdCA9IHRoaXMucHJlZmVycmVkRGVwdGhGb3JtYXRcbiAgICB9ID0ge31cbiAgKTogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4ge1xuICAgIGxldCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCByZW5kZXJidWZmZXI6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZnJhbWVidWZmZXI6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vID09IGZyYW1lYnVmZmVyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGZyYW1lYnVmZmVyID0gdGhpcy5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuXG4gICAgICAvLyA9PSByZW5kZXJidWZmZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICByZW5kZXJidWZmZXIgPSB0aGlzLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xuICAgICAgcmVuZGVyYnVmZmVyLnJlbmRlcmJ1ZmZlclN0b3JhZ2UoIHdpZHRoLCBoZWlnaHQsIHsgZm9ybWF0OiBkZXB0aEZvcm1hdCB9ICk7XG4gICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlciwgeyBhdHRhY2htZW50OiBHTF9ERVBUSF9BVFRBQ0hNRU5UIH0gKTtcblxuICAgICAgLy8gPT0gdGV4dHVyZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgdGV4dHVyZSA9IHRoaXMuY3JlYXRlVGV4dHVyZSgpO1xuICAgICAgaWYgKCBpc0Zsb2F0ICkge1xuICAgICAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkoXG4gICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgeyBpbnRlcm5hbGZvcm1hdDogR0xfUkdCQTMyRiwgZm9ybWF0OiBHTF9SR0JBLCB0eXBlOiBHTF9GTE9BVCB9XG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkoIHdpZHRoLCBoZWlnaHQsIG51bGwgKTtcbiAgICAgIH1cbiAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFRleHR1cmUoIHRleHR1cmUgKTtcblxuICAgICAgLy8gPT0gYWxtb3N0IGRvbmUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgcmV0dXJuIGZyYW1lYnVmZmVyO1xuICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgZnJhbWVidWZmZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHRleHR1cmU/LmRpc3Bvc2UoKTtcbiAgICAgIHJlbmRlcmJ1ZmZlcj8uZGlzcG9zZSgpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IG11bHRpc2FtcGxlIGZyYW1lYnVmZmVyLCBpbiBsYXppZXIgd2F5LlxuICAgKi9cbiAgcHVibGljIGxhenlNdWx0aXNhbXBsZUZyYW1lYnVmZmVyKFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAge1xuICAgICAgc2FtcGxlcyA9IDQsXG4gICAgICBpc0Zsb2F0ID0gZmFsc2UsXG4gICAgICBkZXB0aEZvcm1hdCA9IHRoaXMucHJlZmVycmVkRGVwdGhGb3JtYXQsXG4gICAgICBmYWxsYmFja1dlYkdMMSA9IHRydWVcbiAgICB9ID0ge31cbiAgKTogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKCBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBsZXQgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICAgIGxldCByZW5kZXJidWZmZXJEZXB0aDogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgICAgbGV0IHJlbmRlcmJ1ZmZlckNvbG9yOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgICBsZXQgZnJhbWVidWZmZXI6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyA9PSBmcmFtZWJ1ZmZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICBmcmFtZWJ1ZmZlciA9IHRoaXMuY3JlYXRlRnJhbWVidWZmZXIoKTtcblxuICAgICAgICAvLyA9PSByZW5kZXJidWZmZXIgZGVwdGggPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICByZW5kZXJidWZmZXJEZXB0aCA9IHRoaXMuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgICAgIHJlbmRlcmJ1ZmZlckRlcHRoLnJlbmRlcmJ1ZmZlclN0b3JhZ2VNdWx0aXNhbXBsZShcbiAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgeyBzYW1wbGVzLCBmb3JtYXQ6IGRlcHRoRm9ybWF0IH1cbiAgICAgICAgKTtcbiAgICAgICAgZnJhbWVidWZmZXIuYXR0YWNoUmVuZGVyYnVmZmVyKCByZW5kZXJidWZmZXJEZXB0aCwgeyBhdHRhY2htZW50OiBHTF9ERVBUSF9BVFRBQ0hNRU5UIH0gKTtcblxuICAgICAgICAvLyA9PSByZW5kZXJidWZmZXIgY29sb3IgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICBjb25zdCByZW5kZXJidWZmZXJDb2xvciA9IHRoaXMuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgICAgIGNvbnN0IGNvbG9yRm9ybWF0ID0gaXNGbG9hdCA/IEdMX1JHQkEzMkYgOiBHTF9SR0JBODtcbiAgICAgICAgcmVuZGVyYnVmZmVyQ29sb3IucmVuZGVyYnVmZmVyU3RvcmFnZU11bHRpc2FtcGxlKFxuICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICB7IHNhbXBsZXMsIGZvcm1hdDogY29sb3JGb3JtYXQgfVxuICAgICAgICApO1xuICAgICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlckNvbG9yLCB7IGF0dGFjaG1lbnQ6IEdMX0NPTE9SX0FUVEFDSE1FTlQwIH0gKTtcblxuICAgICAgICAvLyA9PSBhbG1vc3QgZG9uZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICByZXR1cm4gZnJhbWVidWZmZXI7XG4gICAgICB9IGNhdGNoICggZSApIHtcbiAgICAgICAgZnJhbWVidWZmZXI/LmRpc3Bvc2UoKTtcbiAgICAgICAgdGV4dHVyZT8uZGlzcG9zZSgpO1xuICAgICAgICByZW5kZXJidWZmZXJDb2xvcj8uZGlzcG9zZSgpO1xuICAgICAgICByZW5kZXJidWZmZXJEZXB0aD8uZGlzcG9zZSgpO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIGZhbGxiYWNrV2ViR0wxICkge1xuICAgICAgcmV0dXJuIHRoaXMubGF6eUZyYW1lYnVmZmVyKCB3aWR0aCwgaGVpZ2h0LCB7IGlzRmxvYXQgfSApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBHTENhdEVycm9ycy5XZWJHTDJFeGNsdXNpdmVFcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGRyYXcgYnVmZmVycywgaW4gbGF6aWVyIHdheS5cbiAgICogSWYgeW91IGNhbid0IGdyYWIgYFdFQkdMX2RyYXdfYnVmZmVyc2AgZXh0ZW5zaW9uLCB5b3UnbGwgZGllIGluc3RhbnRseSBhdCB0aGlzIHBvaW50LlxuICAgKi9cbiAgcHVibGljIGxhenlEcmF3YnVmZmVycyhcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIG51bUJ1ZmZlcnM6IG51bWJlcixcbiAgICB7XG4gICAgICBpc0Zsb2F0ID0gZmFsc2UsXG4gICAgICBkZXB0aEZvcm1hdCA9IHRoaXMucHJlZmVycmVkRGVwdGhGb3JtYXRcbiAgICB9ID0ge31cbiAgKTogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4ge1xuICAgIGlmICggR0xfTUFYX0RSQVdfQlVGRkVSUyA8IG51bUJ1ZmZlcnMgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoICdHTENhdDogTWF4aW11bSBkcmF3IGJ1ZmZlcnMgY291bnQgZXhjZWVkZWQnICk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dHVyZXM6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD5bXSA9IFtdO1xuICAgIGxldCByZW5kZXJidWZmZXI6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZnJhbWVidWZmZXI6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vID09IGZyYW1lYnVmZmVyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGZyYW1lYnVmZmVyID0gdGhpcy5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuXG4gICAgICAvLyA9PSByZW5kZXJidWZmZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCByZW5kZXJidWZmZXIgPSB0aGlzLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xuICAgICAgcmVuZGVyYnVmZmVyLnJlbmRlcmJ1ZmZlclN0b3JhZ2UoIHdpZHRoLCBoZWlnaHQsIHsgZm9ybWF0OiBkZXB0aEZvcm1hdCB9ICk7XG4gICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlciwgeyBhdHRhY2htZW50OiBHTF9ERVBUSF9BVFRBQ0hNRU5UIH0gKTtcblxuICAgICAgLy8gPT0gdGV4dHVyZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbnVtQnVmZmVyczsgaSArKyApIHtcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IHRoaXMuY3JlYXRlVGV4dHVyZSgpO1xuICAgICAgICBpZiAoIGlzRmxvYXQgKSB7XG4gICAgICAgICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KFxuICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgeyBpbnRlcm5hbGZvcm1hdDogR0xfUkdCQTMyRiwgZm9ybWF0OiBHTF9SR0JBLCB0eXBlOiBHTF9GTE9BVCB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkoIHdpZHRoLCBoZWlnaHQsIG51bGwgKTtcbiAgICAgICAgfVxuICAgICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hUZXh0dXJlKCB0ZXh0dXJlLCB7IGF0dGFjaG1lbnQ6IEdMX0NPTE9SX0FUVEFDSE1FTlQwICsgaSB9ICk7XG4gICAgICB9XG5cbiAgICAgIC8vID09IGFsbW9zdCBkb25lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHJldHVybiBmcmFtZWJ1ZmZlcjtcbiAgICB9IGNhdGNoICggZSApIHtcbiAgICAgIHRleHR1cmVzLmZvckVhY2goICggdGV4dHVyZSApID0+IHtcbiAgICAgICAgdGV4dHVyZS5kaXNwb3NlKCk7XG4gICAgICB9ICk7XG4gICAgICByZW5kZXJidWZmZXI/LmRpc3Bvc2UoKTtcbiAgICAgIGZyYW1lYnVmZmVyPy5kaXNwb3NlKCk7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG9mIGBnbC5kcmF3QnVmZmVyc2AuXG4gICAqXG4gICAqIHtAbGluayBkcmF3QnVmZmVyc30gaXMgYmV0dGVyLlxuICAgKi9cbiAgcHVibGljIHJhd0RyYXdCdWZmZXJzKCBidWZmZXJzOiBHTGVudW1bXSApOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmICggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgZ2wuZHJhd0J1ZmZlcnMoIGJ1ZmZlcnMgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5nZXRFeHRlbnNpb24oICdXRUJHTF9kcmF3X2J1ZmZlcnMnICk7XG4gICAgICBleHQ/LmRyYXdCdWZmZXJzV0VCR0woIGJ1ZmZlcnMgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICoge0BsaW5rIHJhd0RyYXdCdWZmZXJzfSBidXQgYmV0dGVyLlxuICAgKlxuICAgKiBDYWxsIHRoaXMgYmVmb3JlIHlvdSdyZSBnb25uYSB1c2UgZHJhdyBidWZmZXJzLlxuICAgKiBJZiB5b3UgY2FuJ3QgZ3JhYiBgV0VCR0xfZHJhd19idWZmZXJzYCBleHRlbnNpb24sIHlvdSdsbCBkaWUgaW5zdGFudGx5IGF0IHRoaXMgcG9pbnQuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgZHJhdyBidWZmZXJzIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBkcmF3QnVmZmVyczxUPihcbiAgICBidWZmZXJzT3JOdW1CdWZmZXJzPzogR0xlbnVtW10gfCBudW1iZXIsXG4gICAgY2FsbGJhY2s/OiAoIGJ1ZmZlcnM6IEdMZW51bVtdICkgPT4gVFxuICApOiBUIHtcbiAgICBsZXQgYnVmZmVyczogR0xlbnVtW107XG5cbiAgICBpZiAoIEFycmF5LmlzQXJyYXkoIGJ1ZmZlcnNPck51bUJ1ZmZlcnMgKSApIHtcbiAgICAgIGJ1ZmZlcnMgPSBidWZmZXJzT3JOdW1CdWZmZXJzO1xuICAgIH0gZWxzZSBpZiAoIGJ1ZmZlcnNPck51bUJ1ZmZlcnMgKSB7XG4gICAgICBidWZmZXJzID0gW107XG4gICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBidWZmZXJzT3JOdW1CdWZmZXJzOyBpICsrICkge1xuICAgICAgICBidWZmZXJzWyBpIF0gPSBHTF9DT0xPUl9BVFRBQ0hNRU5UMCArIGk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1ZmZlcnMgPSBbIEdMX0NPTE9SX0FUVEFDSE1FTlQwIF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyRHJhd0J1ZmZlcnMuYmluZCggYnVmZmVycywgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhIHdyYXBwZXIgb2YgZHJhd0VsZW1lbnRzSW5zdGFuY2VkLlxuICAgKi9cbiAgcHVibGljIGRyYXdBcnJheXNJbnN0YW5jZWQoXG4gICAgbW9kZTogR0xlbnVtLFxuICAgIGZpcnN0OiBHTGludCxcbiAgICBjb3VudDogR0xzaXplaSxcbiAgICBwcmltY291bnQ6IEdMc2l6ZWlcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcztcblxuICAgIGlmICggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgZ2wuZHJhd0FycmF5c0luc3RhbmNlZCggbW9kZSwgZmlyc3QsIGNvdW50LCBwcmltY291bnQgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5nZXRFeHRlbnNpb24oICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJywgdHJ1ZSApO1xuICAgICAgZXh0LmRyYXdBcnJheXNJbnN0YW5jZWRBTkdMRSggbW9kZSwgZmlyc3QsIGNvdW50LCBwcmltY291bnQgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYSB3cmFwcGVyIG9mIGRyYXdFbGVtZW50c0luc3RhbmNlZC5cbiAgICovXG4gIHB1YmxpYyBkcmF3RWxlbWVudHNJbnN0YW5jZWQoXG4gICAgbW9kZTogR0xlbnVtLFxuICAgIGNvdW50OiBHTHNpemVpLFxuICAgIHR5cGU6IEdMZW51bSxcbiAgICBvZmZzZXQ6IEdMaW50cHRyLFxuICAgIGluc3RhbmNlQ291bnQ6IEdMc2l6ZWlcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcztcblxuICAgIGlmICggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgZ2wuZHJhd0VsZW1lbnRzSW5zdGFuY2VkKCBtb2RlLCBjb3VudCwgdHlwZSwgb2Zmc2V0LCBpbnN0YW5jZUNvdW50ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4dCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCAnQU5HTEVfaW5zdGFuY2VkX2FycmF5cycsIHRydWUgKTtcbiAgICAgIGV4dC5kcmF3RWxlbWVudHNJbnN0YW5jZWRBTkdMRSggbW9kZSwgY291bnQsIHR5cGUsIG9mZnNldCwgaW5zdGFuY2VDb3VudCApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgY3VycmVudCBmcmFtZWJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBjbGVhcihcbiAgICByZWQgPSAwLjAsXG4gICAgZ3JlZW4gPSAwLjAsXG4gICAgYmx1ZSA9IDAuMCxcbiAgICBhbHBoYSA9IDEuMCxcbiAgICBkZXB0aCA9IDEuMFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGdsLmNsZWFyQ29sb3IoIHJlZCwgZ3JlZW4sIGJsdWUsIGFscGhhICk7XG4gICAgZ2wuY2xlYXJEZXB0aCggZGVwdGggKTtcbiAgICBnbC5jbGVhciggR0xfQ09MT1JfQlVGRkVSX0JJVCB8IEdMX0RFUFRIX0JVRkZFUl9CSVQgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCYXNpY2FsbHkganVzdCBhIGBnbC5ibGl0RnJhbWVidWZmZXJgLlxuICAgKi9cbiAgcHVibGljIGJsaXRGcmFtZWJ1ZmZlcihcbiAgICBzcmM6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBkc3Q6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICB7XG4gICAgICBzcmNWaWV3cG9ydCA9IFsgMCwgMCwgc3JjPy5yZW5kZXJidWZmZXI/LndpZHRoID8/IDAsIHNyYz8ucmVuZGVyYnVmZmVyPy5oZWlnaHQgPz8gMCBdLFxuICAgICAgZHN0Vmlld3BvcnQgPSBbIDAsIDAsIGRzdD8ucmVuZGVyYnVmZmVyPy53aWR0aCA/PyAwLCBkc3Q/LnJlbmRlcmJ1ZmZlcj8uaGVpZ2h0ID8/IDAgXSxcbiAgICAgIG1hc2sgPSBHTF9DT0xPUl9CVUZGRVJfQklULFxuICAgICAgZmlsdGVyID0gR0xfTkVBUkVTVFxuICAgIH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmICggZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKCBHTF9SRUFEX0ZSQU1FQlVGRkVSLCBzcmM/LnJhdyA/PyBudWxsICk7XG4gICAgICBnbC5iaW5kRnJhbWVidWZmZXIoIEdMX0RSQVdfRlJBTUVCVUZGRVIsIGRzdD8ucmF3ID8/IG51bGwgKTtcbiAgICAgIGdsLmJsaXRGcmFtZWJ1ZmZlcihcbiAgICAgICAgc3JjVmlld3BvcnRbIDAgXSxcbiAgICAgICAgc3JjVmlld3BvcnRbIDEgXSxcbiAgICAgICAgc3JjVmlld3BvcnRbIDIgXSxcbiAgICAgICAgc3JjVmlld3BvcnRbIDMgXSxcbiAgICAgICAgZHN0Vmlld3BvcnRbIDAgXSxcbiAgICAgICAgZHN0Vmlld3BvcnRbIDEgXSxcbiAgICAgICAgZHN0Vmlld3BvcnRbIDIgXSxcbiAgICAgICAgZHN0Vmlld3BvcnRbIDMgXSxcbiAgICAgICAgbWFzayxcbiAgICAgICAgZmlsdGVyXG4gICAgICApO1xuICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKCBHTF9SRUFEX0ZSQU1FQlVGRkVSLCBudWxsICk7XG4gICAgICBnbC5iaW5kRnJhbWVidWZmZXIoIEdMX0RSQVdfRlJBTUVCVUZGRVIsIG51bGwgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgR0xDYXRFcnJvcnMuV2ViR0wyRXhjbHVzaXZlRXJyb3I7XG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFZTyxJQUFN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LElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxJQUFJLENBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBRSxJQUFJLEVBQUU7Z0JBQzdCLEVBQUUsQ0FBQyxTQUFTLENBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO2FBQ3RDLENBQUUsQ0FBQztTQUNMOzs7O1FBS00saUNBQVUsR0FBakIsVUFBbUIsSUFBWSxFQUFFLEtBQWdCO1lBQ3ZDLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxJQUFJLENBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBRSxJQUFJLEVBQUU7Z0JBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUUsUUFBUSxFQUFFLEtBQUssQ0FBRSxDQUFDO2FBQ2xDLENBQUUsQ0FBQztTQUNMOzs7O1FBS00saUNBQVUsR0FBakIsVUFBbUIsSUFBWSxFQUFFLEtBQWdCO1lBQ3ZDLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxJQUFJLENBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBRSxJQUFJLEVBQUU7Z0JBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUUsUUFBUSxFQUFFLEtBQUssQ0FBRSxDQUFDO2FBQ2xDLENBQUUsQ0FBQztTQUNMOzs7O1FBS00saUNBQVUsR0FBakIsVUFBbUIsSUFBWSxFQUFFLEtBQWdCO1lBQ3ZDLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FB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