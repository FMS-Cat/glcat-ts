/*!
* @fms-cat/glcat-ts v0.14.1
* WebGL wrapper with plenty of hackability
*
* Copyright (c) 2018-2021 FMS_Cat
* @fms-cat/glcat-ts is distributed under MIT License
* https://github.com/FMS-Cat/glcat-ts/blob/master/LICENSE
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.GLCAT = {}));
}(this, (function (exports) { 'use strict';

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
    var GL_TRANSFORM_FEEDBACK = 0x8e22;
    var GL_UNSIGNED_BYTE = 0x1401;
    var GL_VERTEX_SHADER = 0x8b31;

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
        GLCatProgram.prototype.link = function (shaders, options) {
            var _this = this;
            var _a;
            if (options === void 0) { options = {}; }
            var gl = this.__glCat.gl;
            shaders.forEach(function (shader) { return gl.attachShader(_this.__program, shader.raw); });
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
        };
        /**
         * Attach shaders and link this program.
         * It's gonna be asynchronous if you have the KHR_parallel_shader_compile extension support.
         */
        GLCatProgram.prototype.linkAsync = function (shaders, options) {
            var _this = this;
            var _a;
            if (options === void 0) { options = {}; }
            var glCat = this.__glCat;
            var gl = this.__glCat.gl;
            var extParallel = glCat.getExtension('KHR_parallel_shader_compile');
            shaders.forEach(function (shader) { return gl.attachShader(_this.__program, shader.raw); });
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
                if (typeof WebGL2RenderingContext === 'function' &&
                    gl instanceof WebGL2RenderingContext) {
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
        GLCatBuffer.prototype.setVertexbuffer = function (source, usage) {
            if (usage === void 0) { usage = GL_STATIC_DRAW; }
            var gl = this.__glCat.gl;
            this.__glCat.bindVertexBuffer(this, function () {
                gl.bufferData(GL_ARRAY_BUFFER, source, usage); // this sucks
            });
        };
        GLCatBuffer.prototype.setIndexbuffer = function (source, usage) {
            if (usage === void 0) { usage = GL_STATIC_DRAW; }
            var gl = this.__glCat.gl;
            this.__glCat.bindIndexBuffer(this, function () {
                gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, source, usage); // this sucks
            });
        };
        return GLCatBuffer;
    }());

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
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
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
     * It's a WebGLTransformFeedback.
     */
    var GLCatTransformFeedback = /** @class */ (function () {
        /**
         * Create a new GLCatTransformFeedback instance.
         */
        function GLCatTransformFeedback(glCat, transformFeedback) {
            this.__glCat = glCat;
            this.__transformFeedback = transformFeedback;
        }
        Object.defineProperty(GLCatTransformFeedback.prototype, "transformFeedback", {
            /**
             * Its own transform feedback.
             */
            get: function () {
                return this.__transformFeedback;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GLCatTransformFeedback.prototype, "raw", {
            /**
             * Its own transform feedback. Shorter than {@link transformFeedback}.
             */
            get: function () {
                return this.__transformFeedback;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Dispose the transform feedback.
         */
        GLCatTransformFeedback.prototype.dispose = function () {
            var gl = this.__glCat.gl;
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
                gl.deleteTransformFeedback(this.__transformFeedback);
            }
        };
        /**
         * Bind a buffer to this transform feedback.
         */
        GLCatTransformFeedback.prototype.bindBuffer = function (index, buffer) {
            var gl = this.__glCat.gl;
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
                this.__glCat.bindTransformFeedback(this, function () {
                    var _a;
                    gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, index, (_a = buffer === null || buffer === void 0 ? void 0 : buffer.buffer) !== null && _a !== void 0 ? _a : null);
                });
            }
        };
        return GLCatTransformFeedback;
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
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
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
                if (typeof WebGL2RenderingContext === 'function' &&
                    gl instanceof WebGL2RenderingContext) {
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
            this.__bindHelperTransformFeedback = new BindHelper(null, function (buffer) {
                var _a;
                var gl = _this.__gl;
                if (typeof WebGL2RenderingContext === 'function' &&
                    gl instanceof WebGL2RenderingContext) {
                    gl.bindTransformFeedback(GL_TRANSFORM_FEEDBACK, (_a = buffer === null || buffer === void 0 ? void 0 : buffer.raw) !== null && _a !== void 0 ? _a : null);
                }
                else {
                    throw GLCatErrors.WebGL2ExclusiveError;
                }
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
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
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
        GLCat.prototype.lazyProgram = function (vert, frag, options) {
            if (options === void 0) { options = {}; }
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
                program_1.link([vertexShader, fragmentShader_1], options);
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
        GLCat.prototype.lazyProgramAsync = function (vert, frag, options) {
            if (options === void 0) { options = {}; }
            try {
                // == vert ===================================================================================
                var vertexShader_1 = this.createShader(GL_VERTEX_SHADER);
                vertexShader_1.compile(vert);
                // == frag ===================================================================================
                var fragmentShader_2 = this.createShader(GL_FRAGMENT_SHADER);
                fragmentShader_2.compile(frag);
                // == program ================================================================================
                var program_2 = this.createProgram();
                return program_2.linkAsync([vertexShader_1, fragmentShader_2], options).then(function () {
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
         * Create a new transform feedback.
         */
        GLCat.prototype.createTransformFeedback = function () {
            var gl = this.__gl;
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
                var transformFeedback = GLCat.throwIfNull(gl.createTransformFeedback());
                return new GLCatTransformFeedback(this, transformFeedback);
            }
            else {
                throw GLCatErrors.WebGL2ExclusiveError;
            }
        };
        /**
         * Bind a transform feedback.
         * If callback is provided, it will execute the callback immediately, and undo the bind after the callback.
         */
        GLCat.prototype.bindTransformFeedback = function (transformFeedback, callback) {
            return this.__bindHelperTransformFeedback.bind(transformFeedback, callback);
        };
        /**
         * Create a new vertex array.
         */
        GLCat.prototype.createVertexArray = function () {
            var gl = this.__gl;
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
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
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
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
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
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
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
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
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
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
            if (typeof WebGL2RenderingContext === 'function' &&
                gl instanceof WebGL2RenderingContext) {
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
    exports.GLCatTransformFeedback = GLCatTransformFeedback;
    exports.GLCatVertexArray = GLCatVertexArray;
    exports.default = GLCat;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xjYXQuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvR0xDb25zdGFudHMudHMiLCIuLi9zcmMvR0xDYXRFcnJvcnMudHMiLCIuLi9zcmMvR0xDYXRQcm9ncmFtLnRzIiwiLi4vc3JjL3V0aWxzL0JpbmRIZWxwZXIudHMiLCIuLi9zcmMvR0xDYXRCdWZmZXIudHMiLCIuLi9zcmMvR0xDYXRGcmFtZWJ1ZmZlci50cyIsIi4uL3NyYy9HTENhdFJlbmRlcmJ1ZmZlci50cyIsIi4uL3NyYy9HTENhdFNoYWRlci50cyIsIi4uL3NyYy9HTENhdFRleHR1cmUudHMiLCIuLi9zcmMvR0xDYXRUcmFuc2Zvcm1GZWVkYmFjay50cyIsIi4uL3NyYy9HTENhdFZlcnRleEFycmF5LnRzIiwiLi4vc3JjL0dMQ2F0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImV4cG9ydCBjb25zdCBHTF9BQ1RJVkVfQVRUUklCVVRFUyA9IDB4OGI4OTtcbmV4cG9ydCBjb25zdCBHTF9BQ1RJVkVfVEVYVFVSRSA9IDB4ODRlMDtcbmV4cG9ydCBjb25zdCBHTF9BQ1RJVkVfVU5JRk9STV9CTE9DS1MgPSAweDhhMzY7XG5leHBvcnQgY29uc3QgR0xfQUNUSVZFX1VOSUZPUk1TID0gMHg4Yjg2O1xuZXhwb3J0IGNvbnN0IEdMX0FMSUFTRURfTElORV9XSURUSF9SQU5HRSA9IDB4ODQ2ZTtcbmV4cG9ydCBjb25zdCBHTF9BTElBU0VEX1BPSU5UX1NJWkVfUkFOR0UgPSAweDg0NmQ7XG5leHBvcnQgY29uc3QgR0xfQUxQSEEgPSAweDE5MDY7XG5leHBvcnQgY29uc3QgR0xfQUxQSEFfQklUUyA9IDB4MGQ1NTtcbmV4cG9ydCBjb25zdCBHTF9BTFJFQURZX1NJR05BTEVEID0gMHg5MTFhO1xuZXhwb3J0IGNvbnN0IEdMX0FMV0FZUyA9IDB4MDIwNztcbmV4cG9ydCBjb25zdCBHTF9BTllfU0FNUExFU19QQVNTRUQgPSAweDhjMmY7XG5leHBvcnQgY29uc3QgR0xfQU5ZX1NBTVBMRVNfUEFTU0VEX0NPTlNFUlZBVElWRSA9IDB4OGQ2YTtcbmV4cG9ydCBjb25zdCBHTF9BUlJBWV9CVUZGRVIgPSAweDg4OTI7XG5leHBvcnQgY29uc3QgR0xfQVJSQVlfQlVGRkVSX0JJTkRJTkcgPSAweDg4OTQ7XG5leHBvcnQgY29uc3QgR0xfQVRUQUNIRURfU0hBREVSUyA9IDB4OGI4NTtcbmV4cG9ydCBjb25zdCBHTF9CQUNLID0gMHgwNDA1O1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EID0gMHgwYmUyO1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX0NPTE9SID0gMHg4MDA1O1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX0RTVF9BTFBIQSA9IDB4ODBjYTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9EU1RfUkdCID0gMHg4MGM4O1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX0VRVUFUSU9OID0gMHg4MDA5O1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX0VRVUFUSU9OX0FMUEhBID0gMHg4ODNkO1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX0VRVUFUSU9OX1JHQiA9IDB4ODAwOTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9TUkNfQUxQSEEgPSAweDgwY2I7XG5leHBvcnQgY29uc3QgR0xfQkxFTkRfU1JDX1JHQiA9IDB4ODBjOTtcbmV4cG9ydCBjb25zdCBHTF9CTFVFX0JJVFMgPSAweDBkNTQ7XG5leHBvcnQgY29uc3QgR0xfQk9PTCA9IDB4OGI1NjtcbmV4cG9ydCBjb25zdCBHTF9CT09MX1ZFQzIgPSAweDhiNTc7XG5leHBvcnQgY29uc3QgR0xfQk9PTF9WRUMzID0gMHg4YjU4O1xuZXhwb3J0IGNvbnN0IEdMX0JPT0xfVkVDNCA9IDB4OGI1OTtcbmV4cG9ydCBjb25zdCBHTF9CUk9XU0VSX0RFRkFVTFRfV0VCR0wgPSAweDkyNDQ7XG5leHBvcnQgY29uc3QgR0xfQlVGRkVSX1NJWkUgPSAweDg3NjQ7XG5leHBvcnQgY29uc3QgR0xfQlVGRkVSX1VTQUdFID0gMHg4NzY1O1xuZXhwb3J0IGNvbnN0IEdMX0JZVEUgPSAweDE0MDA7XG5leHBvcnQgY29uc3QgR0xfQ0NXID0gMHgwOTAxO1xuZXhwb3J0IGNvbnN0IEdMX0NMQU1QX1RPX0VER0UgPSAweDgxMmY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1IgPSAweDE4MDA7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDAgPSAweDhjZTA7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDBfV0VCR0wgPSAweDhjZTA7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDEgPSAweDhjZTE7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDFfV0VCR0wgPSAweDhjZTE7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDEwID0gMHg4Y2VhO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMF9XRUJHTCA9IDB4OGNlYTtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTEgPSAweDhjZWI7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDExX1dFQkdMID0gMHg4Y2ViO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMiA9IDB4OGNlYztcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTJfV0VCR0wgPSAweDhjZWM7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDEzID0gMHg4Y2VkO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxM19XRUJHTCA9IDB4OGNlZDtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTQgPSAweDhjZWU7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDE0X1dFQkdMID0gMHg4Y2VlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxNSA9IDB4OGNlZjtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTVfV0VCR0wgPSAweDhjZWY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDIgPSAweDhjZTI7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDJfV0VCR0wgPSAweDhjZTI7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDMgPSAweDhjZTM7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDNfV0VCR0wgPSAweDhjZTM7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDQgPSAweDhjZTQ7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDRfV0VCR0wgPSAweDhjZTQ7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDUgPSAweDhjZTU7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDVfV0VCR0wgPSAweDhjZTU7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDYgPSAweDhjZTY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDZfV0VCR0wgPSAweDhjZTY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDcgPSAweDhjZTc7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDdfV0VCR0wgPSAweDhjZTc7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDggPSAweDhjZTg7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDhfV0VCR0wgPSAweDhjZTg7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDkgPSAweDhjZTk7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDlfV0VCR0wgPSAweDhjZTk7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQlVGRkVSX0JJVCA9IDB4MDAwMDQwMDA7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQ0xFQVJfVkFMVUUgPSAweDBjMjI7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfV1JJVEVNQVNLID0gMHgwYzIzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBBUkVfUkVGX1RPX1RFWFRVUkUgPSAweDg4NGU7XG5leHBvcnQgY29uc3QgR0xfQ09NUElMRV9TVEFUVVMgPSAweDhiODE7XG5leHBvcnQgY29uc3QgR0xfQ09NUExFVElPTl9TVEFUVVNfS0hSID0gMHg5MWIxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUjExX0VBQyA9IDB4OTI3MDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHMTFfRUFDID0gMHg5MjcyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCX0FUQ19XRUJHTCA9IDB4OGM5MjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQl9FVEMxX1dFQkdMID0gMHg4ZDY0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCX1BWUlRDXzJCUFBWMV9JTUcgPSAweDhjMDE7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JfUFZSVENfNEJQUFYxX0lNRyA9IDB4OGMwMDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQl9TM1RDX0RYVDFfRVhUID0gMHg4M2YwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCOF9FVEMyID0gMHg5Mjc0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCOF9QVU5DSFRIUk9VR0hfQUxQSEExX0VUQzIgPSAweDkyNzg7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfMTBYMTBfS0hSID0gMHg5M2JiO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEwWDVfS0hSID0gMHg5M2I4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEwWDZfS0hSID0gMHg5M2I5O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEwWDhfS0hSID0gMHg5M2JhO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEyWDEwX0tIUiA9IDB4OTNiYztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMlgxMl9LSFIgPSAweDkzYmQ7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfNFg0X0tIUiA9IDB4OTNiMDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ181WDRfS0hSID0gMHg5M2IxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzVYNV9LSFIgPSAweDkzYjI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfNlg1X0tIUiA9IDB4OTNiMztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ182WDZfS0hSID0gMHg5M2I0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzhYNV9LSFIgPSAweDkzYjU7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfOFg2X0tIUiA9IDB4OTNiNjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ184WDhfS0hSID0gMHg5M2I3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BVENfRVhQTElDSVRfQUxQSEFfV0VCR0wgPSAweDhjOTI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FUQ19JTlRFUlBPTEFURURfQUxQSEFfV0VCR0wgPSAweDg3ZWU7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX1BWUlRDXzJCUFBWMV9JTUcgPSAweDhjMDM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX1BWUlRDXzRCUFBWMV9JTUcgPSAweDhjMDI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUMV9FWFQgPSAweDgzZjE7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUM19FWFQgPSAweDgzZjI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUNV9FWFQgPSAweDgzZjM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBOF9FVEMyX0VBQyA9IDB4OTI3NTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NJR05FRF9SMTFfRUFDID0gMHg5MjcxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU0lHTkVEX1JHMTFfRUFDID0gMHg5MjczO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQl9BTFBIQV9TM1RDX0RYVDFfRVhUID0gMHg4YzRkO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQl9BTFBIQV9TM1RDX0RYVDNfRVhUID0gMHg4YzRlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQl9BTFBIQV9TM1RDX0RYVDVfRVhUID0gMHg4YzRmO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQl9TM1RDX0RYVDFfRVhUID0gMHg4YzRjO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTBYMTBfS0hSID0gMHg5M2RiO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTBYNV9LSFIgPSAweDkzZDg7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ18xMFg2X0tIUiA9IDB4OTNkOTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEwWDhfS0hSID0gMHg5M2RhO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTJYMTBfS0hSID0gMHg5M2RjO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTJYMTJfS0hSID0gMHg5M2RkO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfNFg0X0tIUiA9IDB4OTNkMDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzVYNF9LSFIgPSAweDkzZDE7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ181WDVfS0hSID0gMHg5M2QyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfNlg1X0tIUiA9IDB4OTNkMztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzZYNl9LSFIgPSAweDkzZDQ7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ184WDVfS0hSID0gMHg5M2Q1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfOFg2X0tIUiA9IDB4OTNkNjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzhYOF9LSFIgPSAweDkzZDc7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfRVRDMl9FQUMgPSAweDkyNzc7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9FVEMyID0gMHg5Mjc2O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfUFVOQ0hUSFJPVUdIX0FMUEhBMV9FVEMyID0gMHg5Mjc5O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfVEVYVFVSRV9GT1JNQVRTID0gMHg4NmEzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTkRJVElPTl9TQVRJU0ZJRUQgPSAweDkxMWM7XG5leHBvcnQgY29uc3QgR0xfQ09OU1RBTlRfQUxQSEEgPSAweDgwMDM7XG5leHBvcnQgY29uc3QgR0xfQ09OU1RBTlRfQ09MT1IgPSAweDgwMDE7XG5leHBvcnQgY29uc3QgR0xfQ09OVEVYVF9MT1NUX1dFQkdMID0gMHg5MjQyO1xuZXhwb3J0IGNvbnN0IEdMX0NPUFlfUkVBRF9CVUZGRVIgPSAweDhmMzY7XG5leHBvcnQgY29uc3QgR0xfQ09QWV9SRUFEX0JVRkZFUl9CSU5ESU5HID0gMHg4ZjM2O1xuZXhwb3J0IGNvbnN0IEdMX0NPUFlfV1JJVEVfQlVGRkVSID0gMHg4ZjM3O1xuZXhwb3J0IGNvbnN0IEdMX0NPUFlfV1JJVEVfQlVGRkVSX0JJTkRJTkcgPSAweDhmMzc7XG5leHBvcnQgY29uc3QgR0xfQ1VMTF9GQUNFID0gMHgwYjQ0O1xuZXhwb3J0IGNvbnN0IEdMX0NVTExfRkFDRV9NT0RFID0gMHgwYjQ1O1xuZXhwb3J0IGNvbnN0IEdMX0NVUlJFTlRfUFJPR1JBTSA9IDB4OGI4ZDtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1FVRVJZID0gMHg4ODY1O1xuZXhwb3J0IGNvbnN0IEdMX0NVUlJFTlRfUVVFUllfRVhUID0gMHg4ODY1O1xuZXhwb3J0IGNvbnN0IEdMX0NVUlJFTlRfVkVSVEVYX0FUVFJJQiA9IDB4ODYyNjtcbmV4cG9ydCBjb25zdCBHTF9DVyA9IDB4MDkwMDtcbmV4cG9ydCBjb25zdCBHTF9ERUNSID0gMHgxZTAzO1xuZXhwb3J0IGNvbnN0IEdMX0RFQ1JfV1JBUCA9IDB4ODUwODtcbmV4cG9ydCBjb25zdCBHTF9ERUxFVEVfU1RBVFVTID0gMHg4YjgwO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIID0gMHgxODAxO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0FUVEFDSE1FTlQgPSAweDhkMDA7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQklUUyA9IDB4MGQ1NjtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9CVUZGRVJfQklUID0gMHgwMDAwMDEwMDtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9DTEVBUl9WQUxVRSA9IDB4MGI3MztcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9DT01QT05FTlQgPSAweDE5MDI7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ09NUE9ORU5UMTYgPSAweDgxYTU7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ09NUE9ORU5UMjQgPSAweDgxYTY7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ09NUE9ORU5UMzJGID0gMHg4Y2FjO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0ZVTkMgPSAweDBiNzQ7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfUkFOR0UgPSAweDBiNzA7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfU1RFTkNJTCA9IDB4ODRmOTtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9TVEVOQ0lMX0FUVEFDSE1FTlQgPSAweDgyMWE7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfVEVTVCA9IDB4MGI3MTtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9XUklURU1BU0sgPSAweDBiNzI7XG5leHBvcnQgY29uc3QgR0xfREVQVEgyNF9TVEVOQ0lMOCA9IDB4ODhmMDtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSDMyRl9TVEVOQ0lMOCA9IDB4OGNhZDtcbmV4cG9ydCBjb25zdCBHTF9ESVRIRVIgPSAweDBiZDA7XG5leHBvcnQgY29uc3QgR0xfRE9OVF9DQVJFID0gMHgxMTAwO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMCA9IDB4ODgyNTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjBfV0VCR0wgPSAweDg4MjU7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxID0gMHg4ODI2O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMV9XRUJHTCA9IDB4ODgyNjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEwID0gMHg4ODJmO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTBfV0VCR0wgPSAweDg4MmY7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMSA9IDB4ODgzMDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjExX1dFQkdMID0gMHg4ODMwO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTIgPSAweDg4MzE7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMl9XRUJHTCA9IDB4ODgzMTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEzID0gMHg4ODMyO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTNfV0VCR0wgPSAweDg4MzI7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxNCA9IDB4ODgzMztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjE0X1dFQkdMID0gMHg4ODMzO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTUgPSAweDg4MzQ7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxNV9XRUJHTCA9IDB4ODgzNDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjIgPSAweDg4Mjc7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIyX1dFQkdMID0gMHg4ODI3O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMyA9IDB4ODgyODtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjNfV0VCR0wgPSAweDg4Mjg7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI0ID0gMHg4ODI5O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNF9XRUJHTCA9IDB4ODgyOTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjUgPSAweDg4MmE7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI1X1dFQkdMID0gMHg4ODJhO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNiA9IDB4ODgyYjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjZfV0VCR0wgPSAweDg4MmI7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI3ID0gMHg4ODJjO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSN19XRUJHTCA9IDB4ODgyYztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjggPSAweDg4MmQ7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI4X1dFQkdMID0gMHg4ODJkO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSOSA9IDB4ODgyZTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjlfV0VCR0wgPSAweDg4MmU7XG5leHBvcnQgY29uc3QgR0xfRFJBV19GUkFNRUJVRkZFUiA9IDB4OGNhOTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0ZSQU1FQlVGRkVSX0JJTkRJTkcgPSAweDhjYTY7XG5leHBvcnQgY29uc3QgR0xfRFNUX0FMUEhBID0gMHgwMzA0O1xuZXhwb3J0IGNvbnN0IEdMX0RTVF9DT0xPUiA9IDB4MDMwNjtcbmV4cG9ydCBjb25zdCBHTF9EWU5BTUlDX0NPUFkgPSAweDg4ZWE7XG5leHBvcnQgY29uc3QgR0xfRFlOQU1JQ19EUkFXID0gMHg4OGU4O1xuZXhwb3J0IGNvbnN0IEdMX0RZTkFNSUNfUkVBRCA9IDB4ODhlOTtcbmV4cG9ydCBjb25zdCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiA9IDB4ODg5MztcbmV4cG9ydCBjb25zdCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUl9CSU5ESU5HID0gMHg4ODk1O1xuZXhwb3J0IGNvbnN0IEdMX0VRVUFMID0gMHgwMjAyO1xuZXhwb3J0IGNvbnN0IEdMX0ZBU1RFU1QgPSAweDExMDE7XG5leHBvcnQgY29uc3QgR0xfRkxPQVQgPSAweDE0MDY7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfMzJfVU5TSUdORURfSU5UXzI0XzhfUkVWID0gMHg4ZGFkO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDIgPSAweDhiNWE7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUMlgzID0gMHg4YjY1O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDJYNCA9IDB4OGI2NjtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQzID0gMHg4YjViO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDNYMiA9IDB4OGI2NztcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQzWDQgPSAweDhiNjg7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUNCA9IDB4OGI1YztcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQ0WDIgPSAweDhiNjk7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUNFgzID0gMHg4YjZhO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX1ZFQzIgPSAweDhiNTA7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfVkVDMyA9IDB4OGI1MTtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9WRUM0ID0gMHg4YjUyO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQUdNRU5UX1NIQURFUiA9IDB4OGIzMDtcbmV4cG9ydCBjb25zdCBHTF9GUkFHTUVOVF9TSEFERVJfREVSSVZBVElWRV9ISU5UID0gMHg4YjhiO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQUdNRU5UX1NIQURFUl9ERVJJVkFUSVZFX0hJTlRfT0VTID0gMHg4YjhiO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSID0gMHg4ZDQwO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfQUxQSEFfU0laRSA9IDB4ODIxNTtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0JMVUVfU0laRSA9IDB4ODIxNDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0NPTE9SX0VOQ09ESU5HID0gMHg4MjEwO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfQ09MT1JfRU5DT0RJTkdfRVhUID0gMHg4MjEwO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfQ09NUE9ORU5UX1RZUEUgPSAweDgyMTE7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9DT01QT05FTlRfVFlQRV9FWFQgPSAweDgyMTE7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9ERVBUSF9TSVpFID0gMHg4MjE2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfR1JFRU5fU0laRSA9IDB4ODIxMztcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX09CSkVDVF9OQU1FID0gMHg4Y2QxO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfT0JKRUNUX1RZUEUgPSAweDhjZDA7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9SRURfU0laRSA9IDB4ODIxMjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX1NURU5DSUxfU0laRSA9IDB4ODIxNztcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX1RFWFRVUkVfQ1VCRV9NQVBfRkFDRSA9IDB4OGNkMztcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX1RFWFRVUkVfTEFZRVIgPSAweDhjZDQ7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0xFVkVMID0gMHg4Y2QyO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0JJTkRJTkcgPSAweDhjYTY7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQ09NUExFVEUgPSAweDhjZDU7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfREVGQVVMVCA9IDB4ODIxODtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX0FUVEFDSE1FTlQgPSAweDhjZDY7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfSU5DT01QTEVURV9ESU1FTlNJT05TID0gMHg4Y2Q5O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTUlTU0lOR19BVFRBQ0hNRU5UID0gMHg4Y2Q3O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTVVMVElTQU1QTEUgPSAweDhkNTY7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfVU5TVVBQT1JURUQgPSAweDhjZGQ7XG5leHBvcnQgY29uc3QgR0xfRlJPTlQgPSAweDA0MDQ7XG5leHBvcnQgY29uc3QgR0xfRlJPTlRfQU5EX0JBQ0sgPSAweDA0MDg7XG5leHBvcnQgY29uc3QgR0xfRlJPTlRfRkFDRSA9IDB4MGI0NjtcbmV4cG9ydCBjb25zdCBHTF9GVU5DX0FERCA9IDB4ODAwNjtcbmV4cG9ydCBjb25zdCBHTF9GVU5DX1JFVkVSU0VfU1VCVFJBQ1QgPSAweDgwMGI7XG5leHBvcnQgY29uc3QgR0xfRlVOQ19TVUJTVFJBQ1QgPSAweDgwMGE7XG5leHBvcnQgY29uc3QgR0xfR0VORVJBVEVfTUlQTUFQX0hJTlQgPSAweDgxOTI7XG5leHBvcnQgY29uc3QgR0xfR0VRVUFMID0gMHgwMjA2O1xuZXhwb3J0IGNvbnN0IEdMX0dQVV9ESVNKT0lOVF9FWFQgPSAweDhmYmI7XG5leHBvcnQgY29uc3QgR0xfR1JFQVRFUiA9IDB4MDIwNDtcbmV4cG9ydCBjb25zdCBHTF9HUkVFTl9CSVRTID0gMHgwZDUzO1xuZXhwb3J0IGNvbnN0IEdMX0hBTEZfRkxPQVQgPSAweDE0MGI7XG5leHBvcnQgY29uc3QgR0xfSEFMRl9GTE9BVF9PRVMgPSAweDhkNjE7XG5leHBvcnQgY29uc3QgR0xfSElHSF9GTE9BVCA9IDB4OGRmMjtcbmV4cG9ydCBjb25zdCBHTF9ISUdIX0lOVCA9IDB4OGRmNTtcbmV4cG9ydCBjb25zdCBHTF9JTVBMRU1FTlRBVElPTl9DT0xPUl9SRUFEX0ZPUk1BVCA9IDB4OGI5YjtcbmV4cG9ydCBjb25zdCBHTF9JTVBMRU1FTlRBVElPTl9DT0xPUl9SRUFEX1RZUEUgPSAweDhiOWE7XG5leHBvcnQgY29uc3QgR0xfSU5DUiA9IDB4MWUwMjtcbmV4cG9ydCBjb25zdCBHTF9JTkNSX1dSQVAgPSAweDg1MDc7XG5leHBvcnQgY29uc3QgR0xfSU5UID0gMHgxNDA0O1xuZXhwb3J0IGNvbnN0IEdMX0lOVF8yXzEwXzEwXzEwX1JFViA9IDB4OGQ5ZjtcbmV4cG9ydCBjb25zdCBHTF9JTlRfU0FNUExFUl8yRCA9IDB4OGRjYTtcbmV4cG9ydCBjb25zdCBHTF9JTlRfU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRjZjtcbmV4cG9ydCBjb25zdCBHTF9JTlRfU0FNUExFUl8zRCA9IDB4OGRjYjtcbmV4cG9ydCBjb25zdCBHTF9JTlRfU0FNUExFUl9DVUJFID0gMHg4ZGNjO1xuZXhwb3J0IGNvbnN0IEdMX0lOVF9WRUMyID0gMHg4YjUzO1xuZXhwb3J0IGNvbnN0IEdMX0lOVF9WRUMzID0gMHg4YjU0O1xuZXhwb3J0IGNvbnN0IEdMX0lOVF9WRUM0ID0gMHg4YjU1O1xuZXhwb3J0IGNvbnN0IEdMX0lOVEVSTEVBVkVEX0FUVFJJQlMgPSAweDhjOGM7XG5leHBvcnQgY29uc3QgR0xfSU5WQUxJRF9FTlVNID0gMHgwNTAwO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfRlJBTUVCVUZGRVJfT1BFUkFUSU9OID0gMHgwNTA2O1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfSU5ERVggPSAweGZmZmZmZmZmO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfT1BFUkFUSU9OID0gMHgwNTAyO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfVkFMVUUgPSAweDA1MDE7XG5leHBvcnQgY29uc3QgR0xfSU5WRVJUID0gMHgxNTBhO1xuZXhwb3J0IGNvbnN0IEdMX0tFRVAgPSAweDFlMDA7XG5leHBvcnQgY29uc3QgR0xfTEVRVUFMID0gMHgwMjAzO1xuZXhwb3J0IGNvbnN0IEdMX0xFU1MgPSAweDAyMDE7XG5leHBvcnQgY29uc3QgR0xfTElORV9MT09QID0gMHgwMDAyO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVfU1RSSVAgPSAweDAwMDM7XG5leHBvcnQgY29uc3QgR0xfTElORV9XSURUSCA9IDB4MGIyMTtcbmV4cG9ydCBjb25zdCBHTF9MSU5FQVIgPSAweDI2MDE7XG5leHBvcnQgY29uc3QgR0xfTElORUFSX01JUE1BUF9MSU5FQVIgPSAweDI3MDM7XG5leHBvcnQgY29uc3QgR0xfTElORUFSX01JUE1BUF9ORUFSRVNUID0gMHgyNzAxO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVTID0gMHgwMDAxO1xuZXhwb3J0IGNvbnN0IEdMX0xJTktfU1RBVFVTID0gMHg4YjgyO1xuZXhwb3J0IGNvbnN0IEdMX0xPV19GTE9BVCA9IDB4OGRmMDtcbmV4cG9ydCBjb25zdCBHTF9MT1dfSU5UID0gMHg4ZGYzO1xuZXhwb3J0IGNvbnN0IEdMX0xVTUlOQU5DRSA9IDB4MTkwOTtcbmV4cG9ydCBjb25zdCBHTF9MVU1JTkFOQ0VfQUxQSEEgPSAweDE5MGE7XG5leHBvcnQgY29uc3QgR0xfTUFYID0gMHg4MDA4O1xuZXhwb3J0IGNvbnN0IEdMX01BWF8zRF9URVhUVVJFX1NJWkUgPSAweDgwNzM7XG5leHBvcnQgY29uc3QgR0xfTUFYX0FSUkFZX1RFWFRVUkVfTEFZRVJTID0gMHg4OGZmO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DTElFTlRfV0FJVF9USU1FT1VUX1dFQkdMID0gMHg5MjQ3O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DT0xPUl9BVFRBQ0hNRU5UUyA9IDB4OGNkZjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ09MT1JfQVRUQUNITUVOVFNfV0VCR0wgPSAweDhjZGY7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTUJJTkVEX0ZSQUdNRU5UX1VOSUZPUk1fQ09NUE9ORU5UUyA9IDB4OGEzMztcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ09NQklORURfVEVYVFVSRV9JTUFHRV9VTklUUyA9IDB4OGI0ZDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ09NQklORURfVU5JRk9STV9CTE9DS1MgPSAweDhhMmU7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTUJJTkVEX1ZFUlRFWF9VTklGT1JNX0NPTVBPTkVOVFMgPSAweDhhMzE7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NVQkVfTUFQX1RFWFRVUkVfU0laRSA9IDB4ODUxYztcbmV4cG9ydCBjb25zdCBHTF9NQVhfRFJBV19CVUZGRVJTID0gMHg4ODI0O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9EUkFXX0JVRkZFUlNfV0VCR0wgPSAweDg4MjQ7XG5leHBvcnQgY29uc3QgR0xfTUFYX0VMRU1FTlRfSU5ERVggPSAweDhkNmI7XG5leHBvcnQgY29uc3QgR0xfTUFYX0VMRU1FTlRTX0lORElDRVMgPSAweDgwZTk7XG5leHBvcnQgY29uc3QgR0xfTUFYX0VMRU1FTlRTX1ZFUlRJQ0VTID0gMHg4MGU4O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FWFQgPSAweDgwMDg7XG5leHBvcnQgY29uc3QgR0xfTUFYX0ZSQUdNRU5UX0lOUFVUX0NPTVBPTkVOVFMgPSAweDkxMjU7XG5leHBvcnQgY29uc3QgR0xfTUFYX0ZSQUdNRU5UX1VOSUZPUk1fQkxPQ0tTID0gMHg4YTJkO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9VTklGT1JNX0NPTVBPTkVOVFMgPSAweDhiNDk7XG5leHBvcnQgY29uc3QgR0xfTUFYX0ZSQUdNRU5UX1VOSUZPUk1fVkVDVE9SUyA9IDB4OGRmZDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfUFJPR1JBTV9URVhFTF9PRkZTRVQgPSAweDg5MDU7XG5leHBvcnQgY29uc3QgR0xfTUFYX1JFTkRFUkJVRkZFUl9TSVpFID0gMHg4NGU4O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9TQU1QTEVTID0gMHg4ZDU3O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9TRVJWRVJfV0FJVF9USU1FT1VUID0gMHg5MTExO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9URVhUVVJFX0lNQUdFX1VOSVRTID0gMHg4ODcyO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9URVhUVVJFX0xPRF9CSUFTID0gMHg4NGZkO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9URVhUVVJFX01BWF9BTklTT1RST1BZX0VYVCA9IDB4ODRmZjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9TSVpFID0gMHgwZDMzO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9UUkFOU0ZPUk1fRkVFREJBQ0tfSU5URVJMRUFWRURfQ09NUE9ORU5UUyA9IDB4OGM4YTtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVFJBTlNGT1JNX0ZFRURCQUNLX1NFUEFSQVRFX0FUVFJJQlMgPSAweDhjOGI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1RSQU5TRk9STV9GRUVEQkFDS19TRVBBUkFURV9DT01QT05FTlRTID0gMHg4YzgwO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9VTklGT1JNX0JMT0NLX1NJWkUgPSAweDhhMzA7XG5leHBvcnQgY29uc3QgR0xfTUFYX1VOSUZPUk1fQlVGRkVSX0JJTkRJTkdTID0gMHg4YTJmO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WQVJZSU5HX0NPTVBPTkVOVFMgPSAweDhiNGI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZBUllJTkdfVkVDVE9SUyA9IDB4OGRmYztcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkVSVEVYX0FUVFJJQlMgPSAweDg4Njk7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9PVVRQVVRfQ09NUE9ORU5UUyA9IDB4OTEyMjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkVSVEVYX1RFWFRVUkVfSU1BR0VfVU5JVFMgPSAweDhiNGM7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9VTklGT1JNX0JMT0NLUyA9IDB4OGEyYjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkVSVEVYX1VOSUZPUk1fQ09NUE9ORU5UUyA9IDB4OGI0YTtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkVSVEVYX1VOSUZPUk1fVkVDVE9SUyA9IDB4OGRmYjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVklFV1BPUlRfRElNUyA9IDB4MGQzYTtcbmV4cG9ydCBjb25zdCBHTF9NRURJVU1fRkxPQVQgPSAweDhkZjE7XG5leHBvcnQgY29uc3QgR0xfTUVESVVNX0lOVCA9IDB4OGRmNDtcbmV4cG9ydCBjb25zdCBHTF9NSU4gPSAweDgwMDc7XG5leHBvcnQgY29uc3QgR0xfTUlOX0VYVCA9IDB4ODAwNztcbmV4cG9ydCBjb25zdCBHTF9NSU5fUFJPR1JBTV9URVhFTF9PRkZTRVQgPSAweDg5MDQ7XG5leHBvcnQgY29uc3QgR0xfTUlSUk9SRURfUkVQRUFUID0gMHg4MzcwO1xuZXhwb3J0IGNvbnN0IEdMX05FQVJFU1QgPSAweDI2MDA7XG5leHBvcnQgY29uc3QgR0xfTkVBUkVTVF9NSVBNQVBfTElORUFSID0gMHgyNzAyO1xuZXhwb3J0IGNvbnN0IEdMX05FQVJFU1RfTUlQTUFQX05FQVJFU1QgPSAweDI3MDA7XG5leHBvcnQgY29uc3QgR0xfTkVWRVIgPSAweDAyMDA7XG5leHBvcnQgY29uc3QgR0xfTklDRVNUID0gMHgxMTAyO1xuZXhwb3J0IGNvbnN0IEdMX05PX0VSUk9SID0gMDtcbmV4cG9ydCBjb25zdCBHTF9OT05FID0gMDtcbmV4cG9ydCBjb25zdCBHTF9OT1RFUVVBTCA9IDB4MDIwNTtcbmV4cG9ydCBjb25zdCBHTF9PQkpFQ1RfVFlQRSA9IDB4OTExMjtcbmV4cG9ydCBjb25zdCBHTF9PTkUgPSAxO1xuZXhwb3J0IGNvbnN0IEdMX09ORV9NSU5VU19DT05TVEFOVF9BTFBIQSA9IDB4ODAwNDtcbmV4cG9ydCBjb25zdCBHTF9PTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1IgPSAweDgwMDI7XG5leHBvcnQgY29uc3QgR0xfT05FX01JTlVTX0RTVF9BTFBIQSA9IDB4MDMwNTtcbmV4cG9ydCBjb25zdCBHTF9PTkVfTUlOVVNfRFNUX0NPTE9SID0gMHgwMzA3O1xuZXhwb3J0IGNvbnN0IEdMX09ORV9NSU5VU19TUkNfQUxQSEEgPSAweDAzMDM7XG5leHBvcnQgY29uc3QgR0xfT05FX01JTlVTX1NSQ19DT0xPUiA9IDB4MDMwMTtcbmV4cG9ydCBjb25zdCBHTF9PVVRfT0ZfTUVNT1JZID0gMHgwNTA1O1xuZXhwb3J0IGNvbnN0IEdMX1BBQ0tfQUxJR05NRU5UID0gMHgwZDA1O1xuZXhwb3J0IGNvbnN0IEdMX1BBQ0tfUk9XX0xFTkdUSCA9IDB4MGQwMjtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX1NLSVBfUElYRUxTID0gMHgwZDA0O1xuZXhwb3J0IGNvbnN0IEdMX1BBQ0tfU0tJUF9ST1dTID0gMHgwZDAzO1xuZXhwb3J0IGNvbnN0IEdMX1BJWEVMX1BBQ0tfQlVGRkVSID0gMHg4OGViO1xuZXhwb3J0IGNvbnN0IEdMX1BJWEVMX1BBQ0tfQlVGRkVSX0JJTkRJTkcgPSAweDg4ZWQ7XG5leHBvcnQgY29uc3QgR0xfUElYRUxfVU5QQUNLX0JVRkZFUiA9IDB4ODhlYztcbmV4cG9ydCBjb25zdCBHTF9QSVhFTF9VTlBBQ0tfQlVGRkVSX0JJTkRJTkcgPSAweDg4ZWY7XG5leHBvcnQgY29uc3QgR0xfUE9JTlRTID0gMHgwMDAwO1xuZXhwb3J0IGNvbnN0IEdMX1BPTFlHT05fT0ZGU0VUX0ZBQ1RPUiA9IDB4ODAzODtcbmV4cG9ydCBjb25zdCBHTF9QT0xZR09OX09GRlNFVF9GSUxMID0gMHg4MDM3O1xuZXhwb3J0IGNvbnN0IEdMX1BPTFlHT05fT0ZGU0VUX1VOSVRTID0gMHgyYTAwO1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX0NPVU5URVJfQklUU19FWFQgPSAweDg4NjQ7XG5leHBvcnQgY29uc3QgR0xfUVVFUllfUkVTVUxUID0gMHg4ODY2O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVF9BVkFJTEFCTEUgPSAweDg4Njc7XG5leHBvcnQgY29uc3QgR0xfUVVFUllfUkVTVUxUX0FWQUlMQUJMRV9FWFQgPSAweDg4Njc7XG5leHBvcnQgY29uc3QgR0xfUVVFUllfUkVTVUxUX0VYVCA9IDB4ODg2NjtcbmV4cG9ydCBjb25zdCBHTF9SMTFGX0cxMUZfQjEwRiA9IDB4OGMzYTtcbmV4cG9ydCBjb25zdCBHTF9SMTZGID0gMHg4MjJkO1xuZXhwb3J0IGNvbnN0IEdMX1IxNkkgPSAweDgyMzM7XG5leHBvcnQgY29uc3QgR0xfUjE2VUkgPSAweDgyMzQ7XG5leHBvcnQgY29uc3QgR0xfUjMyRiA9IDB4ODIyZTtcbmV4cG9ydCBjb25zdCBHTF9SMzJJID0gMHg4MjM1O1xuZXhwb3J0IGNvbnN0IEdMX1IzMlVJID0gMHg4MjM2O1xuZXhwb3J0IGNvbnN0IEdMX1I4ID0gMHg4MjI5O1xuZXhwb3J0IGNvbnN0IEdMX1I4X1NOT1JNID0gMHg4Zjk0O1xuZXhwb3J0IGNvbnN0IEdMX1I4SSA9IDB4ODIzMTtcbmV4cG9ydCBjb25zdCBHTF9SOFVJID0gMHg4MjMyO1xuZXhwb3J0IGNvbnN0IEdMX1JBU1RFUklaRVJfRElTQ0FSRCA9IDB4OGM4OTtcbmV4cG9ydCBjb25zdCBHTF9SRUFEX0JVRkZFUiA9IDB4MGMwMjtcbmV4cG9ydCBjb25zdCBHTF9SRUFEX0ZSQU1FQlVGRkVSID0gMHg4Y2E4O1xuZXhwb3J0IGNvbnN0IEdMX1JFQURfRlJBTUVCVUZGRVJfQklORElORyA9IDB4OGNhYTtcbmV4cG9ydCBjb25zdCBHTF9SRUQgPSAweDE5MDM7XG5leHBvcnQgY29uc3QgR0xfUkVEX0JJVFMgPSAweDBkNTI7XG5leHBvcnQgY29uc3QgR0xfUkVEX0lOVEVHRVIgPSAweDhkOTQ7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSID0gMHg4ZDQxO1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9BTFBIQV9TSVpFID0gMHg4ZDUzO1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9CSU5ESU5HID0gMHg4Y2E3O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9CTFVFX1NJWkUgPSAweDhkNTI7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX0RFUFRIX1NJWkUgPSAweDhkNTQ7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX0dSRUVOX1NJWkUgPSAweDhkNTE7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX0hFSUdIVCA9IDB4OGQ0MztcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfSU5URVJOQUxfRk9STUFUID0gMHg4ZDQ0O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9SRURfU0laRSA9IDB4OGQ1MDtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfU0FNUExFUyA9IDB4OGNhYjtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfU1RFTkNJTF9TSVpFID0gMHg4ZDU1O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9XSURUSCA9IDB4OGQ0MjtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJFUiA9IDB4MWYwMTtcbmV4cG9ydCBjb25zdCBHTF9SRVBFQVQgPSAweDI5MDE7XG5leHBvcnQgY29uc3QgR0xfUkVQTEFDRSA9IDB4MWUwMTtcbmV4cG9ydCBjb25zdCBHTF9SRyA9IDB4ODIyNztcbmV4cG9ydCBjb25zdCBHTF9SR19JTlRFR0VSID0gMHg4MjI4O1xuZXhwb3J0IGNvbnN0IEdMX1JHMTZGID0gMHg4MjJmO1xuZXhwb3J0IGNvbnN0IEdMX1JHMTZJID0gMHg4MjM5O1xuZXhwb3J0IGNvbnN0IEdMX1JHMTZVSSA9IDB4ODIzYTtcbmV4cG9ydCBjb25zdCBHTF9SRzMyRiA9IDB4ODIzMDtcbmV4cG9ydCBjb25zdCBHTF9SRzMySSA9IDB4ODIzYjtcbmV4cG9ydCBjb25zdCBHTF9SRzMyVUkgPSAweDgyM2M7XG5leHBvcnQgY29uc3QgR0xfUkc4ID0gMHg4MjJiO1xuZXhwb3J0IGNvbnN0IEdMX1JHOF9TTk9STSA9IDB4OGY5NTtcbmV4cG9ydCBjb25zdCBHTF9SRzhJID0gMHg4MjM3O1xuZXhwb3J0IGNvbnN0IEdMX1JHOFVJID0gMHg4MjM4O1xuZXhwb3J0IGNvbnN0IEdMX1JHQiA9IDB4MTkwNztcbmV4cG9ydCBjb25zdCBHTF9SR0JfSU5URUdFUiA9IDB4OGQ5ODtcbmV4cG9ydCBjb25zdCBHTF9SR0IxMF9BMiA9IDB4ODA1OTtcbmV4cG9ydCBjb25zdCBHTF9SR0IxMF9BMlVJID0gMHg5MDZmO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjE2RiA9IDB4ODgxYjtcbmV4cG9ydCBjb25zdCBHTF9SR0IxNkkgPSAweDhkODk7XG5leHBvcnQgY29uc3QgR0xfUkdCMTZVSSA9IDB4OGQ3NztcbmV4cG9ydCBjb25zdCBHTF9SR0IzMkYgPSAweDg4MTU7XG5leHBvcnQgY29uc3QgR0xfUkdCMzJGX0VYVCA9IDB4ODgxNTtcbmV4cG9ydCBjb25zdCBHTF9SR0IzMkkgPSAweDhkODM7XG5leHBvcnQgY29uc3QgR0xfUkdCMzJVSSA9IDB4OGQ3MTtcbmV4cG9ydCBjb25zdCBHTF9SR0I1X0ExID0gMHg4MDU3O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjU2NSA9IDB4OGQ2MjtcbmV4cG9ydCBjb25zdCBHTF9SR0I4ID0gMHg4MDUxO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjhfU05PUk0gPSAweDhmOTY7XG5leHBvcnQgY29uc3QgR0xfUkdCOEkgPSAweDhkOGY7XG5leHBvcnQgY29uc3QgR0xfUkdCOFVJID0gMHg4ZDdkO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjlfRTUgPSAweDhjM2Q7XG5leHBvcnQgY29uc3QgR0xfUkdCQSA9IDB4MTkwODtcbmV4cG9ydCBjb25zdCBHTF9SR0JBX0lOVEVHRVIgPSAweDhkOTk7XG5leHBvcnQgY29uc3QgR0xfUkdCQTE2RiA9IDB4ODgxYTtcbmV4cG9ydCBjb25zdCBHTF9SR0JBMTZJID0gMHg4ZDg4O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkExNlVJID0gMHg4ZDc2O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEzMkYgPSAweDg4MTQ7XG5leHBvcnQgY29uc3QgR0xfUkdCQTMyRl9FWFQgPSAweDg4MTQ7XG5leHBvcnQgY29uc3QgR0xfUkdCQTMySSA9IDB4OGQ4MjtcbmV4cG9ydCBjb25zdCBHTF9SR0JBMzJVSSA9IDB4OGQ3MDtcbmV4cG9ydCBjb25zdCBHTF9SR0JBNCA9IDB4ODA1NjtcbmV4cG9ydCBjb25zdCBHTF9SR0JBOCA9IDB4ODA1ODtcbmV4cG9ydCBjb25zdCBHTF9SR0JBOF9TTk9STSA9IDB4OGY5NztcbmV4cG9ydCBjb25zdCBHTF9SR0JBOEkgPSAweDhkOGU7XG5leHBvcnQgY29uc3QgR0xfUkdCQThVSSA9IDB4OGQ3YztcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVfQUxQSEFfVE9fQ09WRVJBR0UgPSAweDgwOWU7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFX0JVRkZFUlMgPSAweDgwYTg7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFX0NPVkVSQUdFID0gMHg4MGEwO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9DT1ZFUkFHRV9JTlZFUlQgPSAweDgwYWI7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFX0NPVkVSQUdFX1ZBTFVFID0gMHg4MGFhO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRVJfMkQgPSAweDhiNWU7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRjMTtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSXzJEX0FSUkFZX1NIQURPVyA9IDB4OGRjNDtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSXzJEX1NIQURPVyA9IDB4OGI2MjtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSXzNEID0gMHg4YjVmO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRVJfQklORElORyA9IDB4ODkxOTtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSX0NVQkUgPSAweDhiNjA7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl9DVUJFX1NIQURPVyA9IDB4OGRjNTtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVTID0gMHg4MGE5O1xuZXhwb3J0IGNvbnN0IEdMX1NDSVNTT1JfQk9YID0gMHgwYzEwO1xuZXhwb3J0IGNvbnN0IEdMX1NDSVNTT1JfVEVTVCA9IDB4MGMxMTtcbmV4cG9ydCBjb25zdCBHTF9TRVBBUkFURV9BVFRSSUJTID0gMHg4YzhkO1xuZXhwb3J0IGNvbnN0IEdMX1NIQURFUl9UWVBFID0gMHg4YjRmO1xuZXhwb3J0IGNvbnN0IEdMX1NIQURJTkdfTEFOR1VBR0VfVkVSU0lPTiA9IDB4OGI4YztcbmV4cG9ydCBjb25zdCBHTF9TSE9SVCA9IDB4MTQwMjtcbmV4cG9ydCBjb25zdCBHTF9TSUdOQUxFRCA9IDB4OTExOTtcbmV4cG9ydCBjb25zdCBHTF9TSUdORURfTk9STUFMSVpFRCA9IDB4OGY5YztcbmV4cG9ydCBjb25zdCBHTF9TUkNfQUxQSEEgPSAweDAzMDI7XG5leHBvcnQgY29uc3QgR0xfU1JDX0FMUEhBX1NBVFVSQVRFID0gMHgwMzA4O1xuZXhwb3J0IGNvbnN0IEdMX1NSQ19DT0xPUiA9IDB4MDMwMDtcbmV4cG9ydCBjb25zdCBHTF9TUkdCID0gMHg4YzQwO1xuZXhwb3J0IGNvbnN0IEdMX1NSR0JfQUxQSEFfRVhUID0gMHg4YzQyO1xuZXhwb3J0IGNvbnN0IEdMX1NSR0JfRVhUID0gMHg4YzQwO1xuZXhwb3J0IGNvbnN0IEdMX1NSR0I4ID0gMHg4YzQxO1xuZXhwb3J0IGNvbnN0IEdMX1NSR0I4X0FMUEhBOCA9IDB4OGM0MztcbmV4cG9ydCBjb25zdCBHTF9TUkdCOF9BTFBIQThfRVhUID0gMHg4YzQzO1xuZXhwb3J0IGNvbnN0IEdMX1NUQVRJQ19DT1BZID0gMHg4OGU2O1xuZXhwb3J0IGNvbnN0IEdMX1NUQVRJQ19EUkFXID0gMHg4OGU0O1xuZXhwb3J0IGNvbnN0IEdMX1NUQVRJQ19SRUFEID0gMHg4OGU1O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUwgPSAweDE4MDI7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9BVFRBQ0hNRU5UID0gMHg4ZDIwO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19GQUlMID0gMHg4ODAxO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19GVU5DID0gMHg4ODAwO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19QQVNTX0RFUFRIX0ZBSUwgPSAweDg4MDI7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9CQUNLX1BBU1NfREVQVEhfUEFTUyA9IDB4ODgwMztcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfUkVGID0gMHg4Y2EzO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19WQUxVRV9NQVNLID0gMHg4Y2E0O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19XUklURU1BU0sgPSAweDhjYTU7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9CSVRTID0gMHgwZDU3O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQlVGRkVSX0JJVCA9IDB4MDAwMDA0MDA7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9DTEVBUl9WQUxVRSA9IDB4MGI5MTtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0ZBSUwgPSAweDBiOTQ7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9GVU5DID0gMHgwYjkyO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfSU5ERVggPSAweDE5MDE7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9JTkRFWDggPSAweDhkNDg7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9QQVNTX0RFUFRIX0ZBSUwgPSAweDBiOTU7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9QQVNTX0RFUFRIX1BBU1MgPSAweDBiOTY7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9SRUYgPSAweDBiOTc7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9URVNUID0gMHgwYjkwO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfVkFMVUVfTUFTSyA9IDB4MGI5MztcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX1dSSVRFTUFTSyA9IDB4MGI5ODtcbmV4cG9ydCBjb25zdCBHTF9TVFJFQU1fQ09QWSA9IDB4ODhlMjtcbmV4cG9ydCBjb25zdCBHTF9TVFJFQU1fRFJBVyA9IDB4ODhlMDtcbmV4cG9ydCBjb25zdCBHTF9TVFJFQU1fUkVBRCA9IDB4ODhlMTtcbmV4cG9ydCBjb25zdCBHTF9TVUJQSVhFTF9CSVRTID0gMHgwZDUwO1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfQ09ORElUSU9OID0gMHg5MTEzO1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfRkVOQ0UgPSAweDkxMTY7XG5leHBvcnQgY29uc3QgR0xfU1lOQ19GTEFHUyA9IDB4OTExNTtcbmV4cG9ydCBjb25zdCBHTF9TWU5DX0ZMVVNIX0NPTU1BTkRTX0JJVCA9IDB4MDAwMDAwMDE7XG5leHBvcnQgY29uc3QgR0xfU1lOQ19HUFVfQ09NTUFORFNfQ09NUExFVEUgPSAweDkxMTc7XG5leHBvcnQgY29uc3QgR0xfU1lOQ19TVEFUVVMgPSAweDkxMTQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRSA9IDB4MTcwMjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFXzJEID0gMHgwZGUxO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfMkRfQVJSQVkgPSAweDhjMWE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV8zRCA9IDB4ODA2ZjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0JBU0VfTEVWRUwgPSAweDgxM2M7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9CSU5ESU5HXzJEID0gMHg4MDY5O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQklORElOR18yRF9BUlJBWSA9IDB4OGMxZDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0JJTkRJTkdfM0QgPSAweDgwNmE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9CSU5ESU5HX0NVQkVfTUFQID0gMHg4NTE0O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ09NUEFSRV9GVU5DID0gMHg4ODRkO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ09NUEFSRV9NT0RFID0gMHg4ODRjO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVAgPSAweDg1MTM7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9YID0gMHg4NTE2O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWSA9IDB4ODUxODtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1ogPSAweDg1MWE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YID0gMHg4NTE1O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWSA9IDB4ODUxNztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1ogPSAweDg1MTk7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9JTU1VVEFCTEVfRk9STUFUID0gMHg5MTJmO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfSU1NVVRBQkxFX0xFVkVMUyA9IDB4ODJkZjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX01BR19GSUxURVIgPSAweDI4MDA7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NQVhfQU5JU09UUk9QWV9FWFQgPSAweDg0ZmU7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NQVhfTEVWRUwgPSAweDgxM2Q7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NQVhfTE9EID0gMHg4MTNiO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUlOX0ZJTFRFUiA9IDB4MjgwMTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX01JTl9MT0QgPSAweDgxM2E7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9XUkFQX1IgPSAweDgwNzI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9XUkFQX1MgPSAweDI4MDI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9XUkFQX1QgPSAweDI4MDM7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTAgPSAweDg0YzA7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTEgPSAweDg0YzE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTEwID0gMHg4NGNhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxMSA9IDB4ODRjYjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTIgPSAweDg0Y2M7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTEzID0gMHg4NGNkO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxNCA9IDB4ODRjZTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTUgPSAweDg0Y2Y7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTE2ID0gMHg4NGQwO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxNyA9IDB4ODRkMTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTggPSAweDg0ZDI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTE5ID0gMHg4NGQzO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyID0gMHg4NGMyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyMCA9IDB4ODRkNDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjEgPSAweDg0ZDU7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTIyID0gMHg4NGQ2O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyMyA9IDB4ODRkNztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjQgPSAweDg0ZDg7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTI1ID0gMHg4NGQ5O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyNiA9IDB4ODRkYTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjcgPSAweDg0ZGI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTI4ID0gMHg4NGRjO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyOSA9IDB4ODRkZDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMyA9IDB4ODRjMztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMzAgPSAweDg0ZGU7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTMxID0gMHg4NGRmO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU0ID0gMHg4NGM0O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU1ID0gMHg4NGM1O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU2ID0gMHg4NGM2O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU3ID0gMHg4NGM3O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU4ID0gMHg4NGM4O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU5ID0gMHg4NGM5O1xuZXhwb3J0IGNvbnN0IEdMX1RJTUVfRUxBUFNFRF9FWFQgPSAweDg4YmY7XG5leHBvcnQgY29uc3QgR0xfVElNRU9VVF9FWFBJUkVEID0gMHg5MTFiO1xuZXhwb3J0IGNvbnN0IEdMX1RJTUVPVVRfSUdOT1JFRCA9IC0xO1xuZXhwb3J0IGNvbnN0IEdMX1RJTUVTVEFNUF9FWFQgPSAweDhlMjg7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLID0gMHg4ZTIyO1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19BQ1RJVkUgPSAweDhlMjQ7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JJTkRJTkcgPSAweDhlMjU7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUiA9IDB4OGM4ZTtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfQlVGRkVSX0JJTkRJTkcgPSAweDhjOGY7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUl9NT0RFID0gMHg4YzdmO1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CVUZGRVJfU0laRSA9IDB4OGM4NTtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfQlVGRkVSX1NUQVJUID0gMHg4Yzg0O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19QQVVTRUQgPSAweDhlMjM7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX1BSSU1JVElWRVNfV1JJVFRFTiA9IDB4OGM4ODtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfVkFSWUlOR1MgPSAweDhjODM7XG5leHBvcnQgY29uc3QgR0xfVFJJQU5HTEVfRkFOID0gMHgwMDA2O1xuZXhwb3J0IGNvbnN0IEdMX1RSSUFOR0xFX1NUUklQID0gMHgwMDA1O1xuZXhwb3J0IGNvbnN0IEdMX1RSSUFOR0xFUyA9IDB4MDAwNDtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0FSUkFZX1NUUklERSA9IDB4OGEzYztcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JMT0NLX0FDVElWRV9VTklGT1JNX0lORElDRVMgPSAweDhhNDM7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19BQ1RJVkVfVU5JRk9STVMgPSAweDhhNDI7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19CSU5ESU5HID0gMHg4YTNmO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfREFUQV9TSVpFID0gMHg4YTQwO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfSU5ERVggPSAweDhhM2E7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19SRUZFUkVOQ0VEX0JZX0ZSQUdNRU5UX1NIQURFUiA9IDB4OGE0NjtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JMT0NLX1JFRkVSRU5DRURfQllfVkVSVEVYX1NIQURFUiA9IDB4OGE0NDtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JVRkZFUiA9IDB4OGExMTtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JVRkZFUl9CSU5ESU5HID0gMHg4YTI4O1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQlVGRkVSX09GRlNFVF9BTElHTk1FTlQgPSAweDhhMzQ7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVJfU0laRSA9IDB4OGEyYTtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JVRkZFUl9TVEFSVCA9IDB4OGEyOTtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0lTX1JPV19NQUpPUiA9IDB4OGEzZTtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX01BVFJJWF9TVFJJREUgPSAweDhhM2Q7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9PRkZTRVQgPSAweDhhM2I7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9TSVpFID0gMHg4YTM4O1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fVFlQRSA9IDB4OGEzNztcbmV4cG9ydCBjb25zdCBHTF9VTk1BU0tFRF9SRU5ERVJFUl9XRUJHTCA9IDB4OTI0NjtcbmV4cG9ydCBjb25zdCBHTF9VTk1BU0tFRF9WRU5ET1JfV0VCR0wgPSAweDkyNDU7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX0FMSUdOTUVOVCA9IDB4MGNmNTtcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfQ09MT1JTUEFDRV9DT05WRVJTSU9OX1dFQkdMID0gMHg5MjQzO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19GTElQX1lfV0VCR0wgPSAweDkyNDA7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX0lNQUdFX0hFSUdIVCA9IDB4ODA2ZTtcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfUFJFTVVMVElQTFlfQUxQSEFfV0VCR0wgPSAweDkyNDE7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX1JPV19MRU5HVEggPSAweDBjZjI7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX1NLSVBfSU1BR0VTID0gMHg4MDZkO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19TS0lQX1BJWEVMUyA9IDB4MGNmNDtcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfU0tJUF9ST1dTID0gMHgwY2YzO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkFMRUQgPSAweDkxMTg7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfQllURSA9IDB4MTQwMTtcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlQgPSAweDE0MDU7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzEwRl8xMUZfMTFGX1JFViA9IDB4OGMzYjtcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfMl8xMF8xMF8xMF9SRVYgPSAweDgzNjg7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzI0XzggPSAweDg0ZmE7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzI0XzhfV0VCR0wgPSAweDg0ZmE7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzVfOV85XzlfUkVWID0gMHg4YzNlO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9TQU1QTEVSXzJEID0gMHg4ZGQyO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9TQU1QTEVSXzJEX0FSUkFZID0gMHg4ZGQ3O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9TQU1QTEVSXzNEID0gMHg4ZGQzO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9TQU1QTEVSX0NVQkUgPSAweDhkZDQ7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UX1ZFQzIgPSAweDhkYzY7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UX1ZFQzMgPSAweDhkYzc7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UX1ZFQzQgPSAweDhkYzg7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfTk9STUFMSVpFRCA9IDB4OGMxNztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9OT1JNQUxJWkVEX0VYVCA9IDB4OGMxNztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9TSE9SVCA9IDB4MTQwMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9TSE9SVF80XzRfNF80ID0gMHg4MDMzO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX1NIT1JUXzVfNV81XzEgPSAweDgwMzQ7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfU0hPUlRfNV82XzUgPSAweDgzNjM7XG5leHBvcnQgY29uc3QgR0xfVkFMSURBVEVfU1RBVFVTID0gMHg4YjgzO1xuZXhwb3J0IGNvbnN0IEdMX1ZFTkRPUiA9IDB4MWYwMDtcbmV4cG9ydCBjb25zdCBHTF9WRVJTSU9OID0gMHgxZjAyO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BUlJBWV9CSU5ESU5HID0gMHg4NWI1O1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BUlJBWV9CSU5ESU5HX09FUyA9IDB4ODViNTtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX0JVRkZFUl9CSU5ESU5HID0gMHg4ODlmO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfRElWSVNPUiA9IDB4ODhmZTtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX0RJVklTT1JfQU5HTEUgPSAweDg4ZmU7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9FTkFCTEVEID0gMHg4NjIyO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfSU5URUdFUiA9IDB4ODhmZDtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX05PUk1BTElaRUQgPSAweDg4NmE7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9QT0lOVEVSID0gMHg4NjQ1O1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfU0laRSA9IDB4ODYyMztcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX1NUUklERSA9IDB4ODYyNDtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX1RZUEUgPSAweDg2MjU7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX1NIQURFUiA9IDB4OGIzMTtcbmV4cG9ydCBjb25zdCBHTF9WSUVXUE9SVCA9IDB4MGJhMjtcbmV4cG9ydCBjb25zdCBHTF9XQUlUX0ZBSUxFRCA9IDB4OTExZDtcbmV4cG9ydCBjb25zdCBHTF9aRVJPID0gMDtcbiIsImV4cG9ydCBjb25zdCBHTENhdEVycm9ycyA9IHtcbiAgZ2V0IFVuZXhwZWN0ZWROdWxsRXJyb3IoKTogRXJyb3Ige1xuICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCAnR0xDYXQ6IFVuZXhwZWN0ZWQgbnVsbCBkZXRlY3RlZCcgKTtcbiAgICBlcnJvci5uYW1lID0gJ1VuZXhwZWN0ZWROdWxsRXJyb3InO1xuICAgIHJldHVybiBlcnJvcjtcbiAgfSxcbiAgZ2V0IFdlYkdMMkV4Y2x1c2l2ZUVycm9yKCk6IEVycm9yIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvciggJ0dMQ2F0OiBBdHRlbXB0ZWQgdG8gdXNlIFdlYkdMMiBleGNsdXNpdmUgc3R1ZmYnICk7XG4gICAgZXJyb3IubmFtZSA9ICdXZWJHTDJFeGNsdXNpdmVFcnJvcic7XG4gICAgcmV0dXJuIGVycm9yO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgR0xfQ09NUExFVElPTl9TVEFUVVNfS0hSLCBHTF9GTE9BVCwgR0xfTElOS19TVEFUVVMsIEdMX1RFWFRVUkUwIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0QnVmZmVyIH0gZnJvbSAnLi9HTENhdEJ1ZmZlcic7XG5pbXBvcnQgeyBHTENhdEVycm9ycyB9IGZyb20gJy4vR0xDYXRFcnJvcnMnO1xuaW1wb3J0IHR5cGUgeyBHTENhdFNoYWRlciB9IGZyb20gJy4vR0xDYXRTaGFkZXInO1xuaW1wb3J0IHR5cGUgeyBHTENhdFRleHR1cmUgfSBmcm9tICcuL0dMQ2F0VGV4dHVyZSc7XG5cbnR5cGUgV2ViR0wxID0gV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xudHlwZSBXZWJHTDIgPSBXZWJHTDJSZW5kZXJpbmdDb250ZXh0O1xuXG5leHBvcnQgdHlwZSBHTENhdFByb2dyYW1Vbmlmb3JtVHlwZSA9XG4gICcxZicgfCAnMmYnIHwgJzNmJyB8ICc0ZicgfFxuICAnMWknIHwgJzJpJyB8ICczaScgfCAnNGknIHxcbiAgJzFmdicgfCAnMmZ2JyB8ICczZnYnIHwgJzRmdicgfFxuICAnMWl2JyB8ICcyaXYnIHwgJzNpdicgfCAnNGl2JyB8XG4gICdNYXRyaXgyZnYnIHwgJ01hdHJpeDNmdicgfCAnTWF0cml4NGZ2JztcblxuZXhwb3J0IGludGVyZmFjZSBHTENhdFByb2dyYW1MaW5rT3B0aW9ucyB7XG4gIHRyYW5zZm9ybUZlZWRiYWNrVmFyeWluZ3M/OiBzdHJpbmdbXSxcblxuICAvKipcbiAgICogYGdsLlNFUEFSQVRFX0FUVFJJQlNgIGJ5IGRlZmF1bHRcbiAgICovXG4gIHRyYW5zZm9ybUZlZWRiYWNrQnVmZmVyTW9kZT86IG51bWJlcixcbn1cblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xQcm9ncmFtLCBidXQgaGFzIGNhY2hlIG9mIHZhcmlhYmxlIGxvY2F0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0UHJvZ3JhbTxUQ29udGV4dCBleHRlbmRzIFdlYkdMMSB8IFdlYkdMMiA9IFdlYkdMMSB8IFdlYkdMMj4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3Byb2dyYW06IFdlYkdMUHJvZ3JhbTtcbiAgcHJpdmF0ZSBfX3NoYWRlcnM6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PltdIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX19hdHRyaWJMb2NhdGlvbkNhY2hlOiB7IFsgbmFtZTogc3RyaW5nIF06IG51bWJlciB9ID0ge307XG4gIHByaXZhdGUgX191bmlmb3JtTG9jYXRpb25DYWNoZTogeyBbIG5hbWU6IHN0cmluZyBdOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB8IG51bGwgfSA9IHt9O1xuICBwcml2YXRlIF9fdW5pZm9ybVRleHR1cmVVbml0TWFwOiB7IFsgbmFtZTogc3RyaW5nIF06IG51bWJlciB9ID0ge307XG4gIHByaXZhdGUgX191bmlmb3JtdGV4dHVyZVVuaXRJbmRleCA9IDA7XG4gIHByaXZhdGUgX19saW5rZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogSXRzIG93biBwcm9ncmFtLlxuICAgKi9cbiAgcHVibGljIGdldCBwcm9ncmFtKCk6IFdlYkdMUHJvZ3JhbSB7XG4gICAgcmV0dXJuIHRoaXMuX19wcm9ncmFtO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcHJvZ3JhbS4gU2hvcnRlciB0aGFuIFtbR0xDYXRQcm9ncmFtLnByb2dyYW1dXS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3KCk6IFdlYkdMUHJvZ3JhbSB7XG4gICAgcmV0dXJuIHRoaXMuX19wcm9ncmFtO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBzaGFkZXJzLlxuICAgKi9cbiAgcHVibGljIGdldCBzaGFkZXJzKCk6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PltdIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX19zaGFkZXJzID8gdGhpcy5fX3NoYWRlcnMuY29uY2F0KCkgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGxhc3QgbGluayBvcGVyYXRpb24gd2FzIHN1Y2Nlc3NmdWwgb3Igbm90LlxuICAgKi9cbiAgcHVibGljIGdldCBpc0xpbmtlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fX2xpbmtlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRQcm9ncmFtIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBwcm9ncmFtOiBXZWJHTFByb2dyYW0gKSB7XG4gICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XG4gICAgdGhpcy5fX3Byb2dyYW0gPSBwcm9ncmFtO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHByb2dyYW0uXG4gICAqL1xuICBwdWJsaWMgZGlzcG9zZSggYWxzb0F0dGFjaGVkID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgZ2wuZGVsZXRlUHJvZ3JhbSggdGhpcy5fX3Byb2dyYW0gKTtcblxuICAgIGlmICggYWxzb0F0dGFjaGVkICkge1xuICAgICAgY29uc3Qgc2hhZGVycyA9IHRoaXMuc2hhZGVycztcbiAgICAgIGlmICggc2hhZGVycyApIHtcbiAgICAgICAgc2hhZGVycy5mb3JFYWNoKCAoIHNoYWRlciApID0+IHtcbiAgICAgICAgICBzaGFkZXIuZGlzcG9zZSgpO1xuICAgICAgICB9ICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBzaGFkZXJzIGFuZCBsaW5rIHRoaXMgcHJvZ3JhbS5cbiAgICovXG4gIHB1YmxpYyBsaW5rKFxuICAgIHNoYWRlcnM6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PltdLFxuICAgIG9wdGlvbnM6IEdMQ2F0UHJvZ3JhbUxpbmtPcHRpb25zID0ge30sXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHNoYWRlcnMuZm9yRWFjaCggKCBzaGFkZXIgKSA9PiBnbC5hdHRhY2hTaGFkZXIoIHRoaXMuX19wcm9ncmFtLCBzaGFkZXIucmF3ICkgKTtcblxuICAgIGlmICggb3B0aW9ucy50cmFuc2Zvcm1GZWVkYmFja1ZhcnlpbmdzICkge1xuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICAgICkge1xuICAgICAgICBnbC50cmFuc2Zvcm1GZWVkYmFja1ZhcnlpbmdzKFxuICAgICAgICAgIHRoaXMuX19wcm9ncmFtLFxuICAgICAgICAgIG9wdGlvbnMudHJhbnNmb3JtRmVlZGJhY2tWYXJ5aW5ncyxcbiAgICAgICAgICBvcHRpb25zLnRyYW5zZm9ybUZlZWRiYWNrQnVmZmVyTW9kZSA/PyBnbC5TRVBBUkFURV9BVFRSSUJTXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBHTENhdEVycm9ycy5XZWJHTDJFeGNsdXNpdmVFcnJvcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnbC5saW5rUHJvZ3JhbSggdGhpcy5fX3Byb2dyYW0gKTtcblxuICAgIHRoaXMuX19saW5rZWQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKCB0aGlzLl9fcHJvZ3JhbSwgR0xfTElOS19TVEFUVVMgKTtcbiAgICBpZiAoICF0aGlzLl9fbGlua2VkICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCBnbC5nZXRQcm9ncmFtSW5mb0xvZyggdGhpcy5fX3Byb2dyYW0gKSEgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9fc2hhZGVycyA9IHNoYWRlcnMuY29uY2F0KCk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIHNoYWRlcnMgYW5kIGxpbmsgdGhpcyBwcm9ncmFtLlxuICAgKiBJdCdzIGdvbm5hIGJlIGFzeW5jaHJvbm91cyBpZiB5b3UgaGF2ZSB0aGUgS0hSX3BhcmFsbGVsX3NoYWRlcl9jb21waWxlIGV4dGVuc2lvbiBzdXBwb3J0LlxuICAgKi9cbiAgcHVibGljIGxpbmtBc3luYyhcbiAgICBzaGFkZXJzOiBHTENhdFNoYWRlcjxUQ29udGV4dD5bXSxcbiAgICBvcHRpb25zOiBHTENhdFByb2dyYW1MaW5rT3B0aW9ucyA9IHt9LFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBnbENhdCA9IHRoaXMuX19nbENhdDtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG4gICAgY29uc3QgZXh0UGFyYWxsZWwgPSBnbENhdC5nZXRFeHRlbnNpb24oICdLSFJfcGFyYWxsZWxfc2hhZGVyX2NvbXBpbGUnICk7XG5cbiAgICBzaGFkZXJzLmZvckVhY2goICggc2hhZGVyICkgPT4gZ2wuYXR0YWNoU2hhZGVyKCB0aGlzLl9fcHJvZ3JhbSwgc2hhZGVyLnJhdyApICk7XG5cbiAgICBpZiAoIG9wdGlvbnMudHJhbnNmb3JtRmVlZGJhY2tWYXJ5aW5ncyApIHtcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0XG4gICAgICApIHtcbiAgICAgICAgZ2wudHJhbnNmb3JtRmVlZGJhY2tWYXJ5aW5ncyhcbiAgICAgICAgICB0aGlzLl9fcHJvZ3JhbSxcbiAgICAgICAgICBvcHRpb25zLnRyYW5zZm9ybUZlZWRiYWNrVmFyeWluZ3MsXG4gICAgICAgICAgb3B0aW9ucy50cmFuc2Zvcm1GZWVkYmFja0J1ZmZlck1vZGUgPz8gZ2wuU0VQQVJBVEVfQVRUUklCU1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgR0xDYXRFcnJvcnMuV2ViR0wyRXhjbHVzaXZlRXJyb3I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2wubGlua1Byb2dyYW0oIHRoaXMuX19wcm9ncmFtICk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgPT4ge1xuICAgICAgY29uc3QgdXBkYXRlID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWV4dFBhcmFsbGVsIHx8XG4gICAgICAgICAgZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlciggdGhpcy5fX3Byb2dyYW0sIEdMX0NPTVBMRVRJT05fU1RBVFVTX0tIUiApID09PSB0cnVlXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuX19saW5rZWQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKCB0aGlzLl9fcHJvZ3JhbSwgR0xfTElOS19TVEFUVVMgKTtcbiAgICAgICAgICBpZiAoICF0aGlzLl9fbGlua2VkICkge1xuICAgICAgICAgICAgcmVqZWN0KCBuZXcgRXJyb3IoIGdsLmdldFByb2dyYW1JbmZvTG9nKCB0aGlzLl9fcHJvZ3JhbSApID8/ICdudWxsJyApICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fX3NoYWRlcnMgPSBzaGFkZXJzLmNvbmNhdCgpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHVwZGF0ZSApO1xuICAgICAgfTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gYXR0cmlidXRlIHZhcmlhYmxlLlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdmFyaWFibGVcbiAgICogQHBhcmFtIGJ1ZmZlciBWZXJ0ZXggYnVmZmVyLiBDYW4gYmUgbnVsbCwgdG8gZGlzYWJsZSBhdHRyaWJ1dGUgYXJyYXlcbiAgICogQHBhcmFtIHNpemUgTnVtYmVyIG9mIGNvbXBvbmVudHMgcGVyIHZlcnRleC4gTXVzdCBiZSAxLCAyLCAzIG9yIDRcbiAgICovXG4gIHB1YmxpYyBhdHRyaWJ1dGUoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGJ1ZmZlcjogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBzaXplID0gMSxcbiAgICBkaXZpc29yID0gMCxcbiAgICB0eXBlOiBudW1iZXIgPSBHTF9GTE9BVCxcbiAgICBzdHJpZGUgPSAwLFxuICAgIG9mZnNldCA9IDBcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKCBuYW1lICk7XG4gICAgaWYgKCBsb2NhdGlvbiA9PT0gLTEgKSB7IHJldHVybjsgfVxuXG4gICAgaWYgKCBidWZmZXIgPT09IG51bGwgKSB7XG4gICAgICBnbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkoIGxvY2F0aW9uICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRWZXJ0ZXhCdWZmZXIoIGJ1ZmZlciwgKCkgPT4ge1xuICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoIGxvY2F0aW9uICk7XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKCBsb2NhdGlvbiwgc2l6ZSwgdHlwZSwgZmFsc2UsIHN0cmlkZSwgb2Zmc2V0ICk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0XG4gICAgICApIHtcbiAgICAgICAgZ2wudmVydGV4QXR0cmliRGl2aXNvciggbG9jYXRpb24sIGRpdmlzb3IgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4dCA9IHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJyApO1xuICAgICAgICBpZiAoIGV4dCApIHtcbiAgICAgICAgICBleHQudmVydGV4QXR0cmliRGl2aXNvckFOR0xFKCBsb2NhdGlvbiwgZGl2aXNvciApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtIHZhcmlhYmxlLlxuICAgKiBTZWUgYWxzbzogW1tHTENhdFByb2dyYW0udW5pZm9ybVZlY3Rvcl1dXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybSggbmFtZTogc3RyaW5nLCB0eXBlOiBHTENhdFByb2dyYW1Vbmlmb3JtVHlwZSwgLi4udmFsdWU6IG51bWJlcltdICk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bmMgPSAoIHRoaXMgYXMgYW55IClbICd1bmlmb3JtJyArIHR5cGUgXTtcbiAgICBmdW5jLmNhbGwoIHRoaXMsIG5hbWUsIC4uLnZhbHVlICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0gdmFyaWFibGUuXG4gICAqIFNlZSBhbHNvOiBbW0dMQ2F0UHJvZ3JhbS51bmlmb3JtXV1cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtVmVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICB0eXBlOiBHTENhdFByb2dyYW1Vbmlmb3JtVHlwZSxcbiAgICB2YWx1ZTogRmxvYXQzMkxpc3QgfCBJbnQzMkxpc3RcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgZnVuYyA9ICggdGhpcyBhcyBhbnkgKVsgJ3VuaWZvcm0nICsgdHlwZSBdO1xuICAgIGZ1bmMuY2FsbCggdGhpcywgbmFtZSwgdmFsdWUgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTFpIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0xaSggbmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFpKCBsb2NhdGlvbiwgdmFsdWUgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0yaSB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMmkoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMmkoIGxvY2F0aW9uLCB4LCB5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtM2kgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTNpKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtM2koIGxvY2F0aW9uLCB4LCB5LCB6ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtNGkgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTRpKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm00aSggbG9jYXRpb24sIHgsIHksIHosIHcgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0xaXYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTFpdiggbmFtZTogc3RyaW5nLCBhcnJheTogSW50MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFpdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMml2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0yaXYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEludDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0yaXYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTNpdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2l2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBJbnQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtM2l2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm00aXYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTRpdiggbmFtZTogc3RyaW5nLCBhcnJheTogSW50MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTRpdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMWYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTFmKCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMWYoIGxvY2F0aW9uLCB2YWx1ZSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTJmIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0yZiggbmFtZTogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0yZiggbG9jYXRpb24sIHgsIHkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0zZiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2YoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0zZiggbG9jYXRpb24sIHgsIHksIHogKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm00ZiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtNGYoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTRmKCBsb2NhdGlvbiwgeCwgeSwgeiwgdyApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTFmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMWZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTJmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMmZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0yZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTNmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2Z2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0zZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTRmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtNGZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm00ZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDJmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4MmZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCwgdHJhbnNwb3NlID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtTWF0cml4MmZ2KCBsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDNmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4M2Z2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCwgdHJhbnNwb3NlID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtTWF0cml4M2Z2KCBsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDRmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4NGZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCwgdHJhbnNwb3NlID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KCBsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBgc2FtcGxlcjJEYCB0eXBlIHVuaWZvcm0gdGV4dHVyZS5cbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgdW5pZm9ybSB0ZXh0dXJlXG4gICAqIEBwYXJhbSB0ZXh0dXJlIFRleHR1cmUgb2JqZWN0XG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybVRleHR1cmUoIG5hbWU6IHN0cmluZywgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIGNvbnN0IHVuaXQgPSB0aGlzLmdldFVuaWZvcm1UZXh0dXJlVW5pdCggbmFtZSApO1xuICAgIGdsLmFjdGl2ZVRleHR1cmUoIEdMX1RFWFRVUkUwICsgdW5pdCApO1xuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0ZXh0dXJlID8/IG51bGwgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFpKCBsb2NhdGlvbiwgdW5pdCApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBgc2FtcGxlckN1YmVgIHR5cGUgdW5pZm9ybSB0ZXh0dXJlLlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSB1bmlmb3JtIHRleHR1cmVcbiAgICogQHBhcmFtIHRleHR1cmUgVGV4dHVyZSBvYmplY3RcbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtQ3ViZW1hcCggbmFtZTogc3RyaW5nLCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgY29uc3QgdW5pdCA9IHRoaXMuZ2V0VW5pZm9ybVRleHR1cmVVbml0KCBuYW1lICk7XG4gICAgZ2wuYWN0aXZlVGV4dHVyZSggR0xfVEVYVFVSRTAgKyB1bml0ICk7XG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlQ3ViZU1hcCggdGV4dHVyZSA/PyBudWxsICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xaSggbG9jYXRpb24sIHVuaXQgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgYXR0cmlidXRlIGxvY2F0aW9uLlxuICAgKi9cbiAgcHVibGljIGdldEF0dHJpYkxvY2F0aW9uKCBuYW1lOiBzdHJpbmcgKTogbnVtYmVyIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBpZiAoIHRoaXMuX19hdHRyaWJMb2NhdGlvbkNhY2hlWyBuYW1lIF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fYXR0cmliTG9jYXRpb25DYWNoZVsgbmFtZSBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKCB0aGlzLl9fcHJvZ3JhbSwgbmFtZSApO1xuICAgICAgLy8gaWYgKCBsb2NhdGlvbiA9PT0gLTEgKSB7XG4gICAgICAvLyAgIHRoaXMuZ2xDYXQuc3BpdCggJ0dMQ2F0UHJvZ3JhbS5nZXRBdHRyaWJMb2NhdGlvbjogQ291bGQgbm90IHJldHJpZXZlIGF0dHJpYnV0ZSBsb2NhdGlvbicgKTtcbiAgICAgIC8vICAgcmV0dXJuIC0xO1xuICAgICAgLy8gfVxuICAgICAgdGhpcy5fX2F0dHJpYkxvY2F0aW9uQ2FjaGVbIG5hbWUgXSA9IGxvY2F0aW9uO1xuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB1bmlmb3JtIGxvY2F0aW9uLlxuICAgKi9cbiAgcHVibGljIGdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZTogc3RyaW5nICk6IFdlYkdMVW5pZm9ybUxvY2F0aW9uIHwgbnVsbCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgaWYgKCB0aGlzLl9fdW5pZm9ybUxvY2F0aW9uQ2FjaGVbIG5hbWUgXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuIHRoaXMuX191bmlmb3JtTG9jYXRpb25DYWNoZVsgbmFtZSBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbiggdGhpcy5fX3Byb2dyYW0sIG5hbWUgKTtcbiAgICAgIC8vIGlmICggbG9jYXRpb24gPT09IG51bGwgKSB7XG4gICAgICAvLyAgIHRoaXMuZ2xDYXQuc3BpdCggJ0dMQ2F0UHJvZ3JhbS5nZXRVbmlmb3JtTG9jYXRpb246IENvdWxkIG5vdCByZXRyaWV2ZSB1bmlmb3JtIGxvY2F0aW9uJyApO1xuICAgICAgLy8gICByZXR1cm4gbG9jYXRpb247XG4gICAgICAvLyB9XG4gICAgICB0aGlzLl9fdW5pZm9ybUxvY2F0aW9uQ2FjaGVbIG5hbWUgXSA9IGxvY2F0aW9uO1xuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBvciBjcmVhdGUgYSB0ZXh0dXJlIHVuaXQgdGhhdCBjb3JyZXNwb25kcyB0byBnaXZlbiBuYW1lLlxuICAgKi9cbiAgcHVibGljIGdldFVuaWZvcm1UZXh0dXJlVW5pdCggbmFtZTogc3RyaW5nICk6IG51bWJlciB7XG4gICAgaWYgKCB0aGlzLl9fdW5pZm9ybVRleHR1cmVVbml0TWFwWyBuYW1lIF0gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHRoaXMuX191bmlmb3JtVGV4dHVyZVVuaXRNYXBbIG5hbWUgXSA9IHRoaXMuX191bmlmb3JtdGV4dHVyZVVuaXRJbmRleDtcbiAgICAgIHRoaXMuX191bmlmb3JtdGV4dHVyZVVuaXRJbmRleCArKztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fX3VuaWZvcm1UZXh0dXJlVW5pdE1hcFsgbmFtZSBdO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQmluZEhlbHBlcjxUVmFsdWU+IHtcbiAgcHJpdmF0ZSBfX3ByZXY6IFRWYWx1ZTtcbiAgcHJpdmF0ZSBfX2JpbmRlcjogKCB2YWx1ZTogVFZhbHVlICkgPT4gdm9pZDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoIGluaXQ6IFRWYWx1ZSwgYmluZGVyOiAoIHZhbHVlOiBUVmFsdWUgKSA9PiB2b2lkICkge1xuICAgIHRoaXMuX19wcmV2ID0gaW5pdDtcbiAgICB0aGlzLl9fYmluZGVyID0gYmluZGVyO1xuICB9XG5cbiAgcHVibGljIGJpbmQ8VD4oXG4gICAgdmFsdWU6IFRWYWx1ZSxcbiAgICBjYWxsYmFjaz86ICggdmFsdWU6IFRWYWx1ZSApID0+IFRcbiAgKTogVCB7XG4gICAgY29uc3QgcHJldiA9IHRoaXMuX19wcmV2O1xuICAgIGlmICggdmFsdWUgIT09IHByZXYgKSB7XG4gICAgICB0aGlzLl9fYmluZGVyKCB2YWx1ZSApO1xuICAgICAgdGhpcy5fX3ByZXYgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoIGNhbGxiYWNrICkge1xuICAgICAgY29uc3QgcmV0ID0gY2FsbGJhY2soIHZhbHVlICk7XG4gICAgICB0aGlzLmJpbmQoIHByZXYgKTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQgYXMgYW55O1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xfQVJSQVlfQlVGRkVSLCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiwgR0xfU1RBVElDX0RSQVcgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcblxudHlwZSBXZWJHTDEgPSBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG50eXBlIFdlYkdMMiA9IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMQnVmZmVyLlxuICovXG5leHBvcnQgY2xhc3MgR0xDYXRCdWZmZXI8VENvbnRleHQgZXh0ZW5kcyBXZWJHTDEgfCBXZWJHTDIgPSBXZWJHTDEgfCBXZWJHTDI+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19idWZmZXI6IFdlYkdMQnVmZmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgYnVmZmVyKCk6IFdlYkdMQnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2J1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRCdWZmZXIuYnVmZmVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTEJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19idWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0QnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBidWZmZXI6IFdlYkdMQnVmZmVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19idWZmZXIgPSBidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZUJ1ZmZlciggdGhpcy5fX2J1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIHNldFZlcnRleGJ1ZmZlciggc2l6ZTogR0xzaXplaXB0ciwgdXNhZ2U/OiBudW1iZXIgKTogdm9pZDtcbiAgcHVibGljIHNldFZlcnRleGJ1ZmZlciggc291cmNlOiBCdWZmZXJTb3VyY2UgfCBudWxsLCB1c2FnZT86IG51bWJlciApOiB2b2lkO1xuICBwdWJsaWMgc2V0VmVydGV4YnVmZmVyKFxuICAgIHNvdXJjZTogR0xzaXplaXB0ciB8IEJ1ZmZlclNvdXJjZSB8IG51bGwsXG4gICAgdXNhZ2U6IG51bWJlciA9IEdMX1NUQVRJQ19EUkFXXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVmVydGV4QnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5idWZmZXJEYXRhKCBHTF9BUlJBWV9CVUZGRVIsIHNvdXJjZSBhcyBhbnksIHVzYWdlICk7IC8vIHRoaXMgc3Vja3NcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyBpbmRleCBkYXRhIGludG8gdGhpcyBidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgc2V0SW5kZXhidWZmZXIoIHNpemU6IEdMc2l6ZWlwdHIsIHVzYWdlPzogbnVtYmVyICk6IHZvaWQ7XG4gIHB1YmxpYyBzZXRJbmRleGJ1ZmZlciggc291cmNlOiBCdWZmZXJTb3VyY2UgfCBudWxsLCB1c2FnZT86IG51bWJlciApOiB2b2lkO1xuICBwdWJsaWMgc2V0SW5kZXhidWZmZXIoXG4gICAgc291cmNlOiBHTHNpemVpcHRyIHwgQnVmZmVyU291cmNlIHwgbnVsbCxcbiAgICB1c2FnZTogbnVtYmVyID0gR0xfU1RBVElDX0RSQVdcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRJbmRleEJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuYnVmZmVyRGF0YSggR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHNvdXJjZSBhcyBhbnksIHVzYWdlICk7IC8vIHRoaXMgc3Vja3NcbiAgICB9ICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMX0NPTE9SX0FUVEFDSE1FTlQwLCBHTF9ERVBUSF9BVFRBQ0hNRU5ULCBHTF9GUkFNRUJVRkZFUiwgR0xfUkVOREVSQlVGRkVSLCBHTF9URVhUVVJFXzJEIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0UmVuZGVyYnVmZmVyIH0gZnJvbSAnLi9HTENhdFJlbmRlcmJ1ZmZlcic7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0VGV4dHVyZSB9IGZyb20gJy4vR0xDYXRUZXh0dXJlJztcblxudHlwZSBXZWJHTDEgPSBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG50eXBlIFdlYkdMMiA9IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMRnJhbWVidWZmZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0IGV4dGVuZHMgV2ViR0wxIHwgV2ViR0wyID0gV2ViR0wxIHwgV2ViR0wyPiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fZnJhbWVidWZmZXI6IFdlYkdMRnJhbWVidWZmZXI7XG4gIHByaXZhdGUgX19yZW5kZXJidWZmZXJNYXAgPSBuZXcgTWFwPEdMZW51bSwgR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+PigpO1xuICBwcml2YXRlIF9fdGV4dHVyZU1hcCA9IG5ldyBNYXA8R0xlbnVtLCBHTENhdFRleHR1cmU8VENvbnRleHQ+PigpO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGdldCBmcmFtZWJ1ZmZlcigpOiBXZWJHTEZyYW1lYnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2ZyYW1lYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gZnJhbWVidWZmZXIuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0RnJhbWVidWZmZXIuZnJhbWVidWZmZXJdXVxuICAgKi9cbiAgcHVibGljIGdldCByYXcoKTogV2ViR0xGcmFtZWJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19mcmFtZWJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgYXR0YWNoZWQgcmVuZGVyYnVmZmVyLlxuICAgKiBJZiB5b3Ugd2FudCB0byBncmFiIG90aGVyIHRoYW4gYERFUFRIX0FUVEFDSE1FTlRgLCB0cnkgW1tHTENhdEZyYW1lYnVmZmVyLmdldFJlbmRlcmJ1ZmZlcl1dIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlbmRlcmJ1ZmZlcigpOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fX3JlbmRlcmJ1ZmZlck1hcC5nZXQoIEdMX0RFUFRIX0FUVEFDSE1FTlQgKSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBhdHRhY2hlZCB0ZXh0dXJlLlxuICAgKiBJZiB5b3Ugd2FudCB0byBncmFiIG90aGVyIHRoYW4gYENPTE9SX0FUVEFDSE1FTlQwYCwgdHJ5IFtbR0xDYXRGcmFtZWJ1ZmZlci5nZXRUZXh0dXJlXV0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgdGV4dHVyZSgpOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX190ZXh0dXJlTWFwLmdldCggR0xfQ09MT1JfQVRUQUNITUVOVDAgKSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdEZyYW1lYnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBmcmFtZWJ1ZmZlcjogV2ViR0xGcmFtZWJ1ZmZlciApIHtcbiAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcbiAgICB0aGlzLl9fZnJhbWVidWZmZXIgPSBmcmFtZWJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSBmcmFtZWJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCBhbHNvQXR0YWNoZWQgPSBmYWxzZSApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBnbC5kZWxldGVGcmFtZWJ1ZmZlciggdGhpcy5fX2ZyYW1lYnVmZmVyICk7XG5cbiAgICBpZiAoIGFsc29BdHRhY2hlZCApIHtcbiAgICAgIGZvciAoIGNvbnN0IHJlbmRlcmJ1ZmZlciBvZiB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLnZhbHVlcygpICkge1xuICAgICAgICBnbC5kZWxldGVSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlci5yYXcgKTtcbiAgICAgIH1cblxuICAgICAgZm9yICggY29uc3QgdGV4dHVyZSBvZiB0aGlzLl9fdGV4dHVyZU1hcC52YWx1ZXMoKSApIHtcbiAgICAgICAgZ2wuZGVsZXRlVGV4dHVyZSggdGV4dHVyZS5yYXcgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgaXRzIGF0dGFjaGVkIHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXRSZW5kZXJidWZmZXIoIGF0dGFjaG1lbnQgPSBHTF9ERVBUSF9BVFRBQ0hNRU5UICk6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLmdldCggYXR0YWNobWVudCApID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgaXRzIGF0dGFjaGVkIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgZ2V0VGV4dHVyZSggYXR0YWNobWVudCA9IEdMX0NPTE9SX0FUVEFDSE1FTlQwICk6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fX3RleHR1cmVNYXAuZ2V0KCBhdHRhY2htZW50ICkgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSByZW5kZXJidWZmZXIgdG8gdGhpcyBmcmFtZWJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBhdHRhY2hSZW5kZXJidWZmZXIoXG4gICAgcmVuZGVyYnVmZmVyOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4sXG4gICAge1xuICAgICAgYXR0YWNobWVudCA9IEdMX0RFUFRIX0FUVEFDSE1FTlRcbiAgICB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRGcmFtZWJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuZnJhbWVidWZmZXJSZW5kZXJidWZmZXIoIEdMX0ZSQU1FQlVGRkVSLCBhdHRhY2htZW50LCBHTF9SRU5ERVJCVUZGRVIsIHJlbmRlcmJ1ZmZlci5yYXcgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLnNldCggYXR0YWNobWVudCwgcmVuZGVyYnVmZmVyICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGEgdGV4dHVyZSB0byB0aGlzIGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGF0dGFjaFRleHR1cmUoXG4gICAgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PixcbiAgICB7XG4gICAgICBsZXZlbCA9IDAsXG4gICAgICBhdHRhY2htZW50ID0gR0xfQ09MT1JfQVRUQUNITUVOVDBcbiAgICB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRGcmFtZWJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoIEdMX0ZSQU1FQlVGRkVSLCBhdHRhY2htZW50LCBHTF9URVhUVVJFXzJELCB0ZXh0dXJlLnJhdywgbGV2ZWwgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fdGV4dHVyZU1hcC5zZXQoIGF0dGFjaG1lbnQsIHRleHR1cmUgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBHTENhdCB9IGZyb20gJy4vR0xDYXQnO1xuaW1wb3J0IHsgR0xDYXRFcnJvcnMgfSBmcm9tICcuL0dMQ2F0RXJyb3JzJztcbmltcG9ydCB7IEdMX1JFTkRFUkJVRkZFUiB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuXG50eXBlIFdlYkdMMSA9IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcbnR5cGUgV2ViR0wyID0gV2ViR0wyUmVuZGVyaW5nQ29udGV4dDtcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xSZW5kZXJidWZmZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dCBleHRlbmRzIFdlYkdMMSB8IFdlYkdMMiA9IFdlYkdMMSB8IFdlYkdMMj4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3JlbmRlcmJ1ZmZlcjogV2ViR0xSZW5kZXJidWZmZXI7XG4gIHByaXZhdGUgX193aWR0aCA9IDA7XG4gIHByaXZhdGUgX19oZWlnaHQgPSAwO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmVuZGVyYnVmZmVyKCk6IFdlYkdMUmVuZGVyYnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3JlbmRlcmJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIHJlbmRlcmJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRSZW5kZXJCdWZmZXIucmVuZGVyYnVmZmVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTFJlbmRlcmJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19yZW5kZXJidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogSXRzIHdpZHRoLlxuICAgKi9cbiAgcHVibGljIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9fd2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGhlaWdodC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX19oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0VGV4dHVyZSBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PiwgcmVuZGVyYnVmZmVyOiBXZWJHTFJlbmRlcmJ1ZmZlciApIHtcbiAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcbiAgICB0aGlzLl9fcmVuZGVyYnVmZmVyID0gcmVuZGVyYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX19nbENhdC5nbC5kZWxldGVSZW5kZXJidWZmZXIoIHRoaXMuX19yZW5kZXJidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoaXMgcmVuZGVyYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIHJlbmRlcmJ1ZmZlclN0b3JhZ2UoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB7IGZvcm1hdCA9IHRoaXMuX19nbENhdC5wcmVmZXJyZWREZXB0aEZvcm1hdCB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRSZW5kZXJidWZmZXIoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnJlbmRlcmJ1ZmZlclN0b3JhZ2UoIEdMX1JFTkRFUkJVRkZFUiwgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgfSApO1xuXG4gICAgdGhpcy5fX3dpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5fX2hlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoaXMgcmVuZGVyYnVmZmVyIHdpdGggbXVsdGlzYW1wbGUgZW5hYmxlZC5cbiAgICogSWYgeW91IGFyZSB1c2luZyBXZWJHTDEsIGl0IHdpbGwgZmFsbGJhY2sgdG8gbm9uIG11bHRpc2FtcGxlIG9uZSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHJlbmRlcmJ1ZmZlclN0b3JhZ2VNdWx0aXNhbXBsZShcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHtcbiAgICAgIHNhbXBsZXMgPSB0aGlzLl9fZ2xDYXQucHJlZmVycmVkTXVsdGlzYW1wbGVTYW1wbGVzLFxuICAgICAgZm9ybWF0ID0gdGhpcy5fX2dsQ2F0LnByZWZlcnJlZERlcHRoRm9ybWF0LFxuICAgICAgZmFsbGJhY2tXZWJHTDEgPSB0cnVlXG4gICAgfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kUmVuZGVyYnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAgIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dFxuICAgICAgKSB7XG4gICAgICAgIGdsLnJlbmRlcmJ1ZmZlclN0b3JhZ2VNdWx0aXNhbXBsZSggR0xfUkVOREVSQlVGRkVSLCBzYW1wbGVzLCBmb3JtYXQsIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICggZmFsbGJhY2tXZWJHTDEgKSB7XG4gICAgICAgICAgZ2wucmVuZGVyYnVmZmVyU3RvcmFnZSggR0xfUkVOREVSQlVGRkVSLCBmb3JtYXQsIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBHTENhdEVycm9ycy5XZWJHTDJFeGNsdXNpdmVFcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cbn1cbiIsImltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcbmltcG9ydCB7IEdMX0NPTVBJTEVfU1RBVFVTIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5cbnR5cGUgV2ViR0wxID0gV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xudHlwZSBXZWJHTDIgPSBXZWJHTDJSZW5kZXJpbmdDb250ZXh0O1xuXG4vKipcbiAqIEl0J3MgYSBXZWJHTFNoYWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0U2hhZGVyPFRDb250ZXh0IGV4dGVuZHMgV2ViR0wxIHwgV2ViR0wyID0gV2ViR0wxIHwgV2ViR0wyPiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fc2hhZGVyOiBXZWJHTFNoYWRlcjtcbiAgcHJpdmF0ZSBfX2NvbXBpbGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gc2hhZGVyLlxuICAgKi9cbiAgcHVibGljIGdldCBzaGFkZXIoKTogV2ViR0xTaGFkZXIge1xuICAgIHJldHVybiB0aGlzLl9fc2hhZGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gc2hhZGVyLiBTaG9ydGVyIHRoYW4gW1tHTENhdFNoYWRlci5zaGFkZXJdXS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3KCk6IFdlYkdMU2hhZGVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3NoYWRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRTaGFkZXIgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIHNoYWRlcjogV2ViR0xTaGFkZXIgKSB7XG4gICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XG4gICAgdGhpcy5fX3NoYWRlciA9IHNoYWRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSBzaGFkZXIuXG4gICAqL1xuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9fZ2xDYXQuZ2wuZGVsZXRlU2hhZGVyKCB0aGlzLl9fc2hhZGVyICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHdoZXRoZXIgdGhlIGxhc3QgY29tcGlsYXRpb24gd2FzIHN1Y2Nlc3NmdWwgb3Igbm90LlxuICAgKi9cbiAgcHVibGljIGlzQ29tcGlsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX19jb21waWxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21waWxlIHRoZSBzaGFkZXIuXG4gICAqL1xuICBwdWJsaWMgY29tcGlsZSggY29kZTogc3RyaW5nICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGdsLnNoYWRlclNvdXJjZSggdGhpcy5fX3NoYWRlciwgY29kZSApO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoIHRoaXMuX19zaGFkZXIgKTtcblxuICAgIHRoaXMuX19jb21waWxlZCA9IGdsLmdldFNoYWRlclBhcmFtZXRlciggdGhpcy5fX3NoYWRlciwgR0xfQ09NUElMRV9TVEFUVVMgKTtcbiAgICBpZiAoICF0aGlzLl9fY29tcGlsZWQgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoIGdsLmdldFNoYWRlckluZm9Mb2coIHRoaXMuX19zaGFkZXIgKSEgKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMX0NMQU1QX1RPX0VER0UsIEdMX0ZMT0FULCBHTF9IQUxGX0ZMT0FULCBHTF9MSU5FQVIsIEdMX05FQVJFU1QsIEdMX1IxNkYsIEdMX1IzMkYsIEdMX1JHQkEsIEdMX1JHQkExNkYsIEdMX1JHQkEzMkYsIEdMX1JHQkE4LCBHTF9URVhUVVJFXzJELCBHTF9URVhUVVJFX0NVQkVfTUFQLCBHTF9URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1gsIEdMX1RFWFRVUkVfTUFHX0ZJTFRFUiwgR0xfVEVYVFVSRV9NSU5fRklMVEVSLCBHTF9URVhUVVJFX1dSQVBfUywgR0xfVEVYVFVSRV9XUkFQX1QsIEdMX1VOU0lHTkVEX0JZVEUgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcbmltcG9ydCB7IEdMQ2F0RXJyb3JzIH0gZnJvbSAnLi9HTENhdEVycm9ycyc7XG5cbmNvbnN0IHplcm9UZXh0dXJlQXJyYXkgPSBuZXcgVWludDhBcnJheSggWyAwLCAwLCAwLCAwIF0gKTtcblxudHlwZSBXZWJHTDEgPSBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG50eXBlIFdlYkdMMiA9IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMVGV4dHVyZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0VGV4dHVyZTxUQ29udGV4dCBleHRlbmRzIFdlYkdMMSB8IFdlYkdMMiA9IFdlYkdMMSB8IFdlYkdMMj4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3RleHR1cmU6IFdlYkdMVGV4dHVyZTtcbiAgcHJpdmF0ZSBfX3dpZHRoID0gMDtcbiAgcHJpdmF0ZSBfX2hlaWdodCA9IDA7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgdGV4dHVyZSgpOiBXZWJHTFRleHR1cmUge1xuICAgIHJldHVybiB0aGlzLl9fdGV4dHVyZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIHRleHR1cmUuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0VGV4dHVyZS50ZXh0dXJlZF1dXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTFRleHR1cmUge1xuICAgIHJldHVybiB0aGlzLl9fdGV4dHVyZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgd2lkdGguXG4gICAqL1xuICBwdWJsaWMgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX193aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgaGVpZ2h0LlxuICAgKi9cbiAgcHVibGljIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2hlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRUZXh0dXJlIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCB0ZXh0dXJlOiBXZWJHTFRleHR1cmUgKSB7XG4gICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XG4gICAgdGhpcy5fX3RleHR1cmUgPSB0ZXh0dXJlO1xuICAgIHRoaXMudGV4dHVyZUZpbHRlciggR0xfTElORUFSICk7XG4gICAgdGhpcy50ZXh0dXJlV3JhcCggR0xfQ0xBTVBfVE9fRURHRSApO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9fZ2xDYXQuZ2wuZGVsZXRlVGV4dHVyZSggdGhpcy5fX3RleHR1cmUgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0byBmaWx0ZXIgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgdGV4dHVyZUZpbHRlcigpOiB2b2lkO1xuICBwdWJsaWMgdGV4dHVyZUZpbHRlciggZmlsdGVyOiBudW1iZXIgKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVGaWx0ZXIoIGZpbHRlck1hZzogbnVtYmVyLCBmaWx0ZXJNaW46IG51bWJlciApOiB2b2lkO1xuICBwdWJsaWMgdGV4dHVyZUZpbHRlciggZmlsdGVyTWFnOiBudW1iZXIgPSBHTF9ORUFSRVNULCBmaWx0ZXJNaW46IG51bWJlciA9IGZpbHRlck1hZyApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9NQUdfRklMVEVSLCBmaWx0ZXJNYWcgKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfTUlOX0ZJTFRFUiwgZmlsdGVyTWluICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgaG93IHRvIHdyYXAgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgdGV4dHVyZVdyYXAoKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVXcmFwKCB3cmFwOiBudW1iZXIgKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVXcmFwKCB3cmFwUzogbnVtYmVyLCB3cmFwVDogbnVtYmVyICk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlV3JhcCggd3JhcFM6IG51bWJlciA9IEdMX0NMQU1QX1RPX0VER0UsIHdyYXBUOiBudW1iZXIgPSB3cmFwUyApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9XUkFQX1MsIHdyYXBTICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFXzJELCBHTF9URVhUVVJFX1dSQVBfVCwgd3JhcFQgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyB0ZXhTdG9yYWdlMkQoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB7IHRhcmdldCA9IEdMX1RFWFRVUkVfMkQsIGxldmVsID0gMSwgZm9ybWF0ID0gR0xfUkdCQTggfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICApIHtcbiAgICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICAgIGdsLnRleFN0b3JhZ2UyRCggdGFyZ2V0LCBsZXZlbCwgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICB9ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEdMQ2F0RXJyb3JzLldlYkdMMkV4Y2x1c2l2ZUVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSB2YWx1ZSBmb3IgdGhlIHBhc3NlZCBwYXJhbWV0ZXIgbmFtZS5cbiAgICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViR0xSZW5kZXJpbmdDb250ZXh0L2dldFBhcmFtZXRlclxuICAgKi9cbiAgcHVibGljIGdldFBhcmFtZXRlciggcG5hbWU6IEdMZW51bSApOiBhbnkge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHJldHVybiB0aGlzLl9fZ2xDYXQuYmluZFRleHR1cmUyRCggdGhpcywgKCkgPT4ge1xuICAgICAgcmV0dXJuIGdsLmdldFBhcmFtZXRlciggcG5hbWUgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogU3BlY2lmeSB0aGUgcGl4ZWwgc3RvcmFnZSBtb2Rlcy5cbiAgICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViR0xSZW5kZXJpbmdDb250ZXh0L3BpeGVsU3RvcmVpXG4gICAqL1xuICBwdWJsaWMgcGl4ZWxTdG9yZWkoIHBuYW1lOiBHTGVudW0sIHBhcmFtOiBudW1iZXIgfCBib29sZWFuICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5waXhlbFN0b3JlaSggcG5hbWUsIHBhcmFtICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBzZXRUZXh0dXJlKCBzb3VyY2U6IFRleEltYWdlU291cmNlICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC50ZXhJbWFnZTJEKCBHTF9URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBzb3VyY2UgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fd2lkdGggPSBzb3VyY2Uud2lkdGg7XG4gICAgdGhpcy5fX2hlaWdodCA9IHNvdXJjZS5oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyBkYXRhIGludG8gdGhpcyB0ZXh0dXJlLlxuICAgKiBUaGlzIGZ1bmN0aW9uIHVzZXMgVHlwZWRBcnJheS4gSWYgeW91IHdhbnQgdG8gc291cmNlIGltYWdlIGRhdGEsIHVzZSBgR0xDYXQuc2V0VGV4dHVyZSgpYCBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHNldFRleHR1cmVGcm9tQXJyYXkoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICBzb3VyY2U6IEFycmF5QnVmZmVyVmlldyB8IG51bGwsXG4gICAge1xuICAgICAgaW50ZXJuYWxmb3JtYXQgPSBHTF9SR0JBOCxcbiAgICAgIGZvcm1hdCA9IEdMX1JHQkEsXG4gICAgICB0eXBlID0gR0xfVU5TSUdORURfQllURVxuICAgIH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBsZXQgaWZvcm1hdCA9IGludGVybmFsZm9ybWF0O1xuICAgIGlmIChcbiAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICApIHtcbiAgICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzE1NTAyL2ZpbGVzXG4gICAgICBpZiAoXG4gICAgICAgIGludGVybmFsZm9ybWF0ID09PSBHTF9SMTZGXG4gICAgICAgIHx8IGludGVybmFsZm9ybWF0ID09PSBHTF9SMzJGXG4gICAgICAgIHx8IGludGVybmFsZm9ybWF0ID09PSBHTF9SR0JBMTZGXG4gICAgICAgIHx8IGludGVybmFsZm9ybWF0ID09PSBHTF9SR0JBMzJGXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ0VYVF9jb2xvcl9idWZmZXJfZmxvYXQnLCB0cnVlICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdFWFRfZmxvYXRfYmxlbmQnICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXInICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICggdHlwZSA9PT0gR0xfSEFMRl9GTE9BVCApIHtcbiAgICAgICAgdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ09FU190ZXh0dXJlX2hhbGZfZmxvYXQnLCB0cnVlICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0X2xpbmVhcicgKTtcbiAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09IEdMX0ZMT0FUICkge1xuICAgICAgICB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnT0VTX3RleHR1cmVfZmxvYXQnLCB0cnVlICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXInICk7XG4gICAgICB9XG5cbiAgICAgIGlmb3JtYXQgPSBmb3JtYXQ7XG4gICAgfVxuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnRleEltYWdlMkQoXG4gICAgICAgIEdMX1RFWFRVUkVfMkQsXG4gICAgICAgIDAsXG4gICAgICAgIGlmb3JtYXQsXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIDAsXG4gICAgICAgIGZvcm1hdCxcbiAgICAgICAgdHlwZSxcbiAgICAgICAgc291cmNlXG4gICAgICApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogQ29weSBwaXhlbHMgZnJvbSBjdXJyZW50IGZyYW1lYnVmZmVyIHRvIGdpdmVuIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgY29weVRleHR1cmUoIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5jb3B5VGV4SW1hZ2UyRCggR0xfVEVYVFVSRV8yRCwgMCwgR0xfUkdCQSwgMCwgMCwgd2lkdGgsIGhlaWdodCwgMCApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyBjdWJlbWFwIGRhdGEgaW50byB0aGlzIHRleHR1cmUuXG4gICAqIEBwYXJhbSB0ZXh0dXJlcyBBcnJheSBvZiBpYW1nZXMuIE9yZGVyOiBgWCtgLCBgWC1gLCBgWStgLCBgWS1gLCBgWitgLCBgWi1gXG4gICAqIEB0b2RvIGR1ZSB0byBjb21wYXRpYmlsaXR5IG9mIGl0cyBgd2lkdGhgIGFuZCBgaGVpZ2h0YCBpdCBzaG91bGQgbm90IGJlIHVzZWQgeWV0XG4gICAqL1xuICBwdWJsaWMgc2V0Q3ViZW1hcCggdGV4dHVyZXM6IFRleEltYWdlU291cmNlW10gKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlQ3ViZU1hcCggdGhpcywgKCkgPT4ge1xuICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgNjsgaSArKyApIHtcbiAgICAgICAgZ2wudGV4SW1hZ2UyRChcbiAgICAgICAgICBHTF9URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1ggKyBpLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgR0xfUkdCQSxcbiAgICAgICAgICBHTF9SR0JBLFxuICAgICAgICAgIEdMX1VOU0lHTkVEX0JZVEUsXG4gICAgICAgICAgdGV4dHVyZXNbIGkgXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9NSU5fRklMVEVSLCBHTF9MSU5FQVIgKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIEdMX1RFWFRVUkVfTUFHX0ZJTFRFUiwgR0xfTElORUFSICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFX0NVQkVfTUFQLCBHTF9URVhUVVJFX1dSQVBfUywgR0xfQ0xBTVBfVE9fRURHRSApO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9XUkFQX1QsIEdMX0NMQU1QX1RPX0VER0UgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFsgMCwgMCwgMCwgMCBdIHRvIHRoaXMgdGV4dHVyZS5cbiAgICogVXNlZnVsIGZvciB0ZW1wb3JhcnkgdXNlLi5cbiAgICovXG4gIHB1YmxpYyBzZXRaZXJvVGV4dHVyZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFRleHR1cmVGcm9tQXJyYXkoIDEsIDEsIHplcm9UZXh0dXJlQXJyYXkgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBHTENhdCB9IGZyb20gJy4vR0xDYXQnO1xuaW1wb3J0IHsgR0xDYXRCdWZmZXIgfSBmcm9tICcuL0dMQ2F0QnVmZmVyJztcblxudHlwZSBXZWJHTDEgPSBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG50eXBlIFdlYkdMMiA9IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMVHJhbnNmb3JtRmVlZGJhY2suXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdFRyYW5zZm9ybUZlZWRiYWNrPFRDb250ZXh0IGV4dGVuZHMgV2ViR0wxIHwgV2ViR0wyID0gV2ViR0wxIHwgV2ViR0wyPiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fdHJhbnNmb3JtRmVlZGJhY2s6IFdlYkdMVHJhbnNmb3JtRmVlZGJhY2s7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gdHJhbnNmb3JtIGZlZWRiYWNrLlxuICAgKi9cbiAgcHVibGljIGdldCB0cmFuc2Zvcm1GZWVkYmFjaygpOiBXZWJHTFRyYW5zZm9ybUZlZWRiYWNrIHtcbiAgICByZXR1cm4gdGhpcy5fX3RyYW5zZm9ybUZlZWRiYWNrO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gdHJhbnNmb3JtIGZlZWRiYWNrLiBTaG9ydGVyIHRoYW4ge0BsaW5rIHRyYW5zZm9ybUZlZWRiYWNrfS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3KCk6IFdlYkdMVHJhbnNmb3JtRmVlZGJhY2sge1xuICAgIHJldHVybiB0aGlzLl9fdHJhbnNmb3JtRmVlZGJhY2s7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0VHJhbnNmb3JtRmVlZGJhY2sgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIHRyYW5zZm9ybUZlZWRiYWNrOiBXZWJHTFRyYW5zZm9ybUZlZWRiYWNrICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX190cmFuc2Zvcm1GZWVkYmFjayA9IHRyYW5zZm9ybUZlZWRiYWNrO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHRyYW5zZm9ybSBmZWVkYmFjay5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICApIHtcbiAgICAgIGdsLmRlbGV0ZVRyYW5zZm9ybUZlZWRiYWNrKCB0aGlzLl9fdHJhbnNmb3JtRmVlZGJhY2sgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIGJ1ZmZlciB0byB0aGlzIHRyYW5zZm9ybSBmZWVkYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kQnVmZmVyKCBpbmRleDogR0x1aW50LCBidWZmZXI6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGwgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dFxuICAgICkge1xuICAgICAgdGhpcy5fX2dsQ2F0LmJpbmRUcmFuc2Zvcm1GZWVkYmFjayggdGhpcywgKCkgPT4ge1xuICAgICAgICBnbC5iaW5kQnVmZmVyQmFzZSggZ2wuVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUiwgaW5kZXgsIGJ1ZmZlcj8uYnVmZmVyID8/IG51bGwgKTtcbiAgICAgIH0gKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB0eXBlIHsgR0xDYXQsIEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlIH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgeyBHTF9BUlJBWV9CVUZGRVIsIEdMX0VMRU1FTlRfQVJSQVlfQlVGRkVSLCBHTF9GTE9BVCB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuaW1wb3J0IHR5cGUgeyBHTENhdEJ1ZmZlciB9IGZyb20gJy4vR0xDYXRCdWZmZXInO1xuXG50eXBlIFdlYkdMMSA9IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcbnR5cGUgV2ViR0wyID0gV2ViR0wyUmVuZGVyaW5nQ29udGV4dDtcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xWZXJ0ZXhBcnJheU9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0VmVydGV4QXJyYXk8VENvbnRleHQgZXh0ZW5kcyBXZWJHTDEgfCBXZWJHTDIgPSBXZWJHTDEgfCBXZWJHTDI+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX192ZXJ0ZXhBcnJheTogR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQ+O1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgYnVmZmVyKCk6IEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0PiB7XG4gICAgcmV0dXJuIHRoaXMuX192ZXJ0ZXhBcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRCdWZmZXIuYnVmZmVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBHTENhdFZlcnRleEFycmF5UmF3VHlwZTxUQ29udGV4dD4ge1xuICAgIHJldHVybiB0aGlzLl9fdmVydGV4QXJyYXk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0QnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCB2ZXJ0ZXhBcnJheTogR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQ+ICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX192ZXJ0ZXhBcnJheSA9IHZlcnRleEFycmF5O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICApIHtcbiAgICAgIGdsLmRlbGV0ZVZlcnRleEFycmF5KCB0aGlzLl9fdmVydGV4QXJyYXkgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JywgdHJ1ZSApO1xuICAgICAgZXh0LmRlbGV0ZVZlcnRleEFycmF5T0VTKCB0aGlzLl9fdmVydGV4QXJyYXkgYXMgYW55ICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSB2ZXJ0ZXggYnVmZmVyIHRvIHRoZSB2ZXJ0ZXggYXJyYXkuXG4gICAqL1xuICBwdWJsaWMgYmluZFZlcnRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PixcbiAgICBsb2NhdGlvbjogbnVtYmVyLFxuICAgIHNpemUgPSAxLFxuICAgIGRpdmlzb3IgPSAwLFxuICAgIHR5cGU6IG51bWJlciA9IEdMX0ZMT0FULFxuICAgIHN0cmlkZSA9IDAsXG4gICAgb2Zmc2V0ID0gMFxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFZlcnRleEFycmF5KCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5iaW5kQnVmZmVyKCBHTF9BUlJBWV9CVUZGRVIsIHNvdXJjZS5yYXcgKTtcbiAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KCBsb2NhdGlvbiApO1xuICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlciggbG9jYXRpb24sIHNpemUsIHR5cGUsIGZhbHNlLCBzdHJpZGUsIG9mZnNldCApO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAgIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dFxuICAgICAgKSB7XG4gICAgICAgIGdsLnZlcnRleEF0dHJpYkRpdmlzb3IoIGxvY2F0aW9uLCBkaXZpc29yICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBleHQgPSB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnQU5HTEVfaW5zdGFuY2VkX2FycmF5cycgKTtcbiAgICAgICAgaWYgKCBleHQgKSB7XG4gICAgICAgICAgZXh0LnZlcnRleEF0dHJpYkRpdmlzb3JBTkdMRSggbG9jYXRpb24sIGRpdmlzb3IgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGFuIGluZGV4IGJ1ZmZlciB0byB0aGUgdmVydGV4IGFycmF5LlxuICAgKi9cbiAgcHVibGljIGJpbmRJbmRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PlxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFZlcnRleEFycmF5KCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5iaW5kQnVmZmVyKCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiwgc291cmNlLnJhdyApO1xuICAgIH0gKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xDYXRQcm9ncmFtLCBHTENhdFByb2dyYW1MaW5rT3B0aW9ucyB9IGZyb20gJy4vR0xDYXRQcm9ncmFtJztcbmltcG9ydCB7IEdMX0FSUkFZX0JVRkZFUiwgR0xfQkxFTkQsIEdMX0NPTE9SX0FUVEFDSE1FTlQwLCBHTF9DT0xPUl9CVUZGRVJfQklULCBHTF9ERVBUSF9BVFRBQ0hNRU5ULCBHTF9ERVBUSF9CVUZGRVJfQklULCBHTF9ERVBUSF9DT01QT05FTlQxNiwgR0xfREVQVEhfQ09NUE9ORU5UMjQsIEdMX0RFUFRIX1RFU1QsIEdMX0RSQVdfRlJBTUVCVUZGRVIsIEdMX0VMRU1FTlRfQVJSQVlfQlVGRkVSLCBHTF9GTE9BVCwgR0xfRlJBR01FTlRfU0hBREVSLCBHTF9GUkFNRUJVRkZFUiwgR0xfTEVRVUFMLCBHTF9NQVhfRFJBV19CVUZGRVJTLCBHTF9ORUFSRVNULCBHTF9PTkVfTUlOVVNfU1JDX0FMUEhBLCBHTF9SRUFEX0ZSQU1FQlVGRkVSLCBHTF9SRU5ERVJCVUZGRVIsIEdMX1JHQkEsIEdMX1JHQkEzMkYsIEdMX1JHQkE4LCBHTF9TUkNfQUxQSEEsIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIEdMX1RSQU5TRk9STV9GRUVEQkFDSywgR0xfVkVSVEVYX1NIQURFUiB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuaW1wb3J0IHsgQmluZEhlbHBlciB9IGZyb20gJy4vdXRpbHMvQmluZEhlbHBlcic7XG5pbXBvcnQgeyBHTENhdEJ1ZmZlciB9IGZyb20gJy4vR0xDYXRCdWZmZXInO1xuaW1wb3J0IHsgR0xDYXRFcnJvcnMgfSBmcm9tICcuL0dMQ2F0RXJyb3JzJztcbmltcG9ydCB7IEdMQ2F0RnJhbWVidWZmZXIgfSBmcm9tICcuL0dMQ2F0RnJhbWVidWZmZXInO1xuaW1wb3J0IHsgR0xDYXRSZW5kZXJidWZmZXIgfSBmcm9tICcuL0dMQ2F0UmVuZGVyYnVmZmVyJztcbmltcG9ydCB7IEdMQ2F0U2hhZGVyIH0gZnJvbSAnLi9HTENhdFNoYWRlcic7XG5pbXBvcnQgeyBHTENhdFRleHR1cmUgfSBmcm9tICcuL0dMQ2F0VGV4dHVyZSc7XG5pbXBvcnQgeyBHTENhdFRyYW5zZm9ybUZlZWRiYWNrIH0gZnJvbSAnLi9HTENhdFRyYW5zZm9ybUZlZWRiYWNrJztcbmltcG9ydCB7IEdMQ2F0VmVydGV4QXJyYXkgfSBmcm9tICcuL0dMQ2F0VmVydGV4QXJyYXknO1xuXG50eXBlIFdlYkdMMSA9IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcbnR5cGUgV2ViR0wyID0gV2ViR0wyUmVuZGVyaW5nQ29udGV4dDtcblxuZXhwb3J0IHR5cGUgV2ViR0xFeHRlbnNpb24gPSBhbnk7XG5cbmV4cG9ydCB0eXBlIEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0IGV4dGVuZHMgV2ViR0wxIHwgV2ViR0wyID0gV2ViR0wxIHwgV2ViR0wyPlxuICA9IFRDb250ZXh0IGV4dGVuZHMgV2ViR0wyXG4gICAgPyBXZWJHTFZlcnRleEFycmF5T2JqZWN0XG4gICAgOiBXZWJHTFZlcnRleEFycmF5T2JqZWN0T0VTO1xuXG4vKipcbiAqIFdlYkdMIHdyYXBwZXIgd2l0aCBwbGVudHkgb2YgaGFja2FiaWxpdHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdDxUQ29udGV4dCBleHRlbmRzIFdlYkdMMSB8IFdlYkdMMiA9IFdlYkdMMSB8IFdlYkdMMj4ge1xuICBwdWJsaWMgc3RhdGljIHRocm93SWZOdWxsPFQ+KCB2OiBUIHwgbnVsbCApOiBUIHtcbiAgICBpZiAoIHYgPT0gbnVsbCApIHtcbiAgICAgIHRocm93IEdMQ2F0RXJyb3JzLlVuZXhwZWN0ZWROdWxsRXJyb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBwcmVmZXJyZWRNdWx0aXNhbXBsZVNhbXBsZXMgPSA0O1xuXG4gIHB1YmxpYyBwcmVmZXJyZWREZXB0aEZvcm1hdDogR0xlbnVtOyAvLyB3aWxsIGJlIHNldCBpbiBjb25zdHJ1Y3RvclxuXG4gIHByaXZhdGUgX19nbDogVENvbnRleHQ7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJWZXJ0ZXhCdWZmZXIgPSBuZXcgQmluZEhlbHBlcjxHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggYnVmZmVyICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kQnVmZmVyKCBHTF9BUlJBWV9CVUZGRVIsIGJ1ZmZlcj8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJJbmRleEJ1ZmZlciA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCBidWZmZXIgKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcbiAgICAgIGdsLmJpbmRCdWZmZXIoIEdMX0VMRU1FTlRfQVJSQVlfQlVGRkVSLCBidWZmZXI/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyVHJhbnNmb3JtRmVlZGJhY2sgPSBuZXcgQmluZEhlbHBlcjxHTENhdFRyYW5zZm9ybUZlZWRiYWNrPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCBidWZmZXIgKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICAgICkge1xuICAgICAgICBnbC5iaW5kVHJhbnNmb3JtRmVlZGJhY2soIEdMX1RSQU5TRk9STV9GRUVEQkFDSywgYnVmZmVyPy5yYXcgPz8gbnVsbCApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgR0xDYXRFcnJvcnMuV2ViR0wyRXhjbHVzaXZlRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyVmVydGV4QXJyYXkgPSBuZXcgQmluZEhlbHBlcjxHTENhdFZlcnRleEFycmF5PFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCB2ZXJ0ZXhBcnJheSApID0+IHtcbiAgICAgIHRoaXMucmF3QmluZFZlcnRleEFycmF5KCB2ZXJ0ZXhBcnJheT8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJUZXh0dXJlMkQgPSBuZXcgQmluZEhlbHBlcjxHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIHRleHR1cmUgKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcbiAgICAgIGdsLmJpbmRUZXh0dXJlKCBHTF9URVhUVVJFXzJELCB0ZXh0dXJlPy5yYXcgPz8gbnVsbCApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlclRleHR1cmVDdWJlTWFwID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCB0ZXh0dXJlICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kVGV4dHVyZSggR0xfVEVYVFVSRV9DVUJFX01BUCwgdGV4dHVyZT8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJSZW5kZXJidWZmZXIgPSBuZXcgQmluZEhlbHBlcjxHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggcmVuZGVyYnVmZmVyICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kUmVuZGVyYnVmZmVyKCBHTF9SRU5ERVJCVUZGRVIsIHJlbmRlcmJ1ZmZlcj8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJGcmFtZWJ1ZmZlciA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIGZyYW1lYnVmZmVyICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kRnJhbWVidWZmZXIoIEdMX0ZSQU1FQlVGRkVSLCBmcmFtZWJ1ZmZlcj8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJQcm9ncmFtID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRQcm9ncmFtPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCBwcm9ncmFtICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC51c2VQcm9ncmFtKCBwcm9ncmFtPy5yYXcgPz8gbnVsbCApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlckRyYXdCdWZmZXJzID0gbmV3IEJpbmRIZWxwZXI8R0xlbnVtW10+KFxuICAgIFsgR0xfQ09MT1JfQVRUQUNITUVOVDAgXSxcbiAgICAoIGJ1ZmZlcnMgKSA9PiB7XG4gICAgICB0aGlzLnJhd0RyYXdCdWZmZXJzKCBidWZmZXJzICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19leHRlbnNpb25DYWNoZTogeyBbIG5hbWU6IHN0cmluZyBdOiBXZWJHTEV4dGVuc2lvbiB9ID0ge307XG4gIHByaXZhdGUgX19kdW1teVRleHR1cmVDYWNoZT86IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD47XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcmVuZGVyaW5nIGNvbnRleHQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlbmRlcmluZ0NvbnRleHQoKTogVENvbnRleHQge1xuICAgIHJldHVybiB0aGlzLl9fZ2w7XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biByZW5kZXJpbmcgY29udGV4dC4gU2hvcnRlciB0aGFuIFtbR0xDYXQucmVuZGVyaW5nQ29udGV4dF1dXG4gICAqL1xuICBwdWJsaWMgZ2V0IGdsKCk6IFRDb250ZXh0IHtcbiAgICByZXR1cm4gdGhpcy5fX2dsO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdCBpbnN0YW5jZS5cbiAgICogUmVuZGVyaW5nIGNvbnRleHQgaXMgcmVxdWlyZWQuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsOiBUQ29udGV4dCApIHtcbiAgICB0aGlzLl9fZ2wgPSBnbDtcblxuICAgIGdsLmVuYWJsZSggR0xfREVQVEhfVEVTVCApO1xuICAgIGdsLmRlcHRoRnVuYyggR0xfTEVRVUFMICk7XG4gICAgZ2wuZW5hYmxlKCBHTF9CTEVORCApO1xuICAgIGdsLmJsZW5kRnVuYyggR0xfU1JDX0FMUEhBLCBHTF9PTkVfTUlOVVNfU1JDX0FMUEhBICk7XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0XG4gICAgKSB7XG4gICAgICB0aGlzLnByZWZlcnJlZERlcHRoRm9ybWF0ID0gR0xfREVQVEhfQ09NUE9ORU5UMjQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJlZmVycmVkRGVwdGhGb3JtYXQgPSBHTF9ERVBUSF9DT01QT05FTlQxNjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSBkdW1teSB0ZXh0dXJlLCAxMDAlIG9yZ2FuaWMgcHVyZSAjRkYwMEZGIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGR1bW15VGV4dHVyZSgpOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHtcbiAgICBpZiAoIHRoaXMuX19kdW1teVRleHR1cmVDYWNoZSApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fZHVtbXlUZXh0dXJlQ2FjaGU7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dHVyZSA9IHRoaXMuY3JlYXRlVGV4dHVyZSgpO1xuXG4gICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KCAxLCAxLCBuZXcgVWludDhBcnJheSggWyAyNTUsIDAsIDI1NSwgMjU1IF0gKSApO1xuICAgIHRoaXMuX19kdW1teVRleHR1cmVDYWNoZSA9IHRleHR1cmU7XG4gICAgcmV0dXJuIHRleHR1cmU7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgYW4gZXh0ZW5zaW9uLlxuICAgKiBJZiB0aGV5IGlzIHlvdXIgcHJlY2lvdXMgb25lIGFuZCB5b3UgY2Fubm90IGxpdmUgd2l0aG91dCBoaW0sIHR1cm4gb24gYHRocm93SWZOb3RGb3VuZGAuXG4gICAqL1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0IHwgbnVsbDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfaGFsZl9mbG9hdCcsXG4gICAgdGhyb3dJZk5vdEZvdW5kOiB0cnVlXG4gICk6IE9FU190ZXh0dXJlX2hhbGZfZmxvYXQ7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2hhbGZfZmxvYXRfbGluZWFyJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0X2xpbmVhciB8IG51bGw7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2hhbGZfZmxvYXRfbGluZWFyJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogT0VTX3RleHR1cmVfaGFsZl9mbG9hdF9saW5lYXI7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2Zsb2F0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBPRVNfdGV4dHVyZV9mbG9hdCB8IG51bGw7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2Zsb2F0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogT0VTX3RleHR1cmVfZmxvYXQ7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2Zsb2F0X2xpbmVhcicsXG4gICAgdGhyb3dJZk5vdEZvdW5kPzogZmFsc2VcbiAgKTogT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyIHwgbnVsbDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyO1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBBTkdMRV9pbnN0YW5jZWRfYXJyYXlzIHwgbnVsbDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnQU5HTEVfaW5zdGFuY2VkX2FycmF5cycsXG4gICAgdGhyb3dJZk5vdEZvdW5kOiB0cnVlXG4gICk6IEFOR0xFX2luc3RhbmNlZF9hcnJheXM7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBPRVNfdmVydGV4X2FycmF5X29iamVjdCB8IG51bGw7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogT0VTX3ZlcnRleF9hcnJheV9vYmplY3Q7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ1dFQkdMX2RyYXdfYnVmZmVycycsXG4gICAgdGhyb3dJZk5vdEZvdW5kPzogZmFsc2VcbiAgKTogV0VCR0xfZHJhd19idWZmZXJzIHwgbnVsbDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnV0VCR0xfZHJhd19idWZmZXJzJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogV0VCR0xfZHJhd19idWZmZXJzO1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKCBuYW1lOiBzdHJpbmcsIHRocm93SWZOb3RGb3VuZD86IGJvb2xlYW4gKTogV2ViR0xFeHRlbnNpb24gfCBudWxsO1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKCBuYW1lOiBzdHJpbmcsIHRocm93SWZOb3RGb3VuZD86IGJvb2xlYW4gKTogV2ViR0xFeHRlbnNpb24gfCBudWxsIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmICggdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF0gKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX19leHRlbnNpb25DYWNoZVsgbmFtZSBdID0gZ2wuZ2V0RXh0ZW5zaW9uKCBuYW1lICk7XG4gICAgICBpZiAoIHRoaXMuX19leHRlbnNpb25DYWNoZVsgbmFtZSBdICkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIHRocm93SWZOb3RGb3VuZCApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoICdHTENhdC5nZXRFeHRlbnNpb246IFRoZSBleHRlbnNpb24gXCInICsgbmFtZSArICdcIiBpcyBub3Qgc3VwcG9ydGVkJyApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBleHRlbnNpb25zLlxuICAgKiBJZiB0aGV5IGFyZSB5b3VyIHByZWNpb3VzIG9uZXMgYW5kIHlvdSBjYW5ub3QgbGl2ZSB3aXRob3V0IHRoZW0sIHR1cm4gb24gYHRocm93SWZOb3RGb3VuZGAuXG4gICAqL1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9ucyggbmFtZXM6IHN0cmluZ1tdLCB0aHJvd0lmTm90Rm91bmQ/OiBib29sZWFuICk6IEFycmF5PFdlYkdMRXh0ZW5zaW9uIHwgbnVsbD4ge1xuICAgIHJldHVybiBuYW1lcy5tYXAoICggbiApID0+IHRoaXMuZ2V0RXh0ZW5zaW9uKCBuLCB0aHJvd0lmTm90Rm91bmQgKSApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBzaGFkZXIgb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVNoYWRlciggdHlwZTogbnVtYmVyICk6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBjb25zdCBzaGFkZXIgPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlU2hhZGVyKCB0eXBlICkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRTaGFkZXIoIHRoaXMsIHNoYWRlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdCBwcm9ncmFtIG9iamVjdC5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVQcm9ncmFtKCk6IEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgY29uc3QgcHJvZ3JhbSA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVQcm9ncmFtKCkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRQcm9ncmFtKCB0aGlzLCBwcm9ncmFtICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IHByb2dyYW0gb2JqZWN0LCBpbiBsYXppZXIgd2F5LlxuICAgKi9cbiAgcHVibGljIGxhenlQcm9ncmFtKFxuICAgIHZlcnQ6IHN0cmluZyxcbiAgICBmcmFnOiBzdHJpbmcsXG4gICAgb3B0aW9uczogR0xDYXRQcm9ncmFtTGlua09wdGlvbnMgPSB7fSxcbiAgKTogR0xDYXRQcm9ncmFtPFRDb250ZXh0PiB7XG4gICAgbGV0IHZlcnRleFNoYWRlcjogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBmcmFnbWVudFNoYWRlcjogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBwcm9ncmFtOiBHTENhdFNoYWRlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgLy8gPT0gdmVydCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgdmVydGV4U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXIoIEdMX1ZFUlRFWF9TSEFERVIgKTtcbiAgICAgIHZlcnRleFNoYWRlci5jb21waWxlKCB2ZXJ0ICk7XG5cbiAgICAgIC8vID09IGZyYWcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGNvbnN0IGZyYWdtZW50U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXIoIEdMX0ZSQUdNRU5UX1NIQURFUiApO1xuICAgICAgZnJhZ21lbnRTaGFkZXIuY29tcGlsZSggZnJhZyApO1xuXG4gICAgICAvLyA9PSBwcm9ncmFtID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCBwcm9ncmFtID0gdGhpcy5jcmVhdGVQcm9ncmFtKCk7XG4gICAgICBwcm9ncmFtLmxpbmsoIFsgdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlciBdLCBvcHRpb25zICk7XG5cbiAgICAgIC8vID09IGFsbW9zdCBkb25lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHJldHVybiBwcm9ncmFtO1xuICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgcHJvZ3JhbT8uZGlzcG9zZSgpO1xuICAgICAgZnJhZ21lbnRTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHZlcnRleFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IHByb2dyYW0gb2JqZWN0LCBpbiBsYXppZXIgd2F5LlxuICAgKiBJdCdzIGdvbm5hIGJlIGFzeW5jaHJvbm91cyBpZiB5b3UgaGF2ZSB0aGUgS0hSX3BhcmFsbGVsX3NoYWRlcl9jb21waWxlIGV4dGVuc2lvbiBzdXBwb3J0LlxuICAgKi9cbiAgcHVibGljIGxhenlQcm9ncmFtQXN5bmMoXG4gICAgdmVydDogc3RyaW5nLFxuICAgIGZyYWc6IHN0cmluZyxcbiAgICBvcHRpb25zOiBHTENhdFByb2dyYW1MaW5rT3B0aW9ucyA9IHt9LFxuICApOiBQcm9taXNlPEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4+IHtcbiAgICBsZXQgdmVydGV4U2hhZGVyOiBHTENhdFNoYWRlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IGZyYWdtZW50U2hhZGVyOiBHTENhdFNoYWRlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IHByb2dyYW06IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICAvLyA9PSB2ZXJ0ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLmNyZWF0ZVNoYWRlciggR0xfVkVSVEVYX1NIQURFUiApO1xuICAgICAgdmVydGV4U2hhZGVyLmNvbXBpbGUoIHZlcnQgKTtcblxuICAgICAgLy8gPT0gZnJhZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLmNyZWF0ZVNoYWRlciggR0xfRlJBR01FTlRfU0hBREVSICk7XG4gICAgICBmcmFnbWVudFNoYWRlci5jb21waWxlKCBmcmFnICk7XG5cbiAgICAgIC8vID09IHByb2dyYW0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGNvbnN0IHByb2dyYW0gPSB0aGlzLmNyZWF0ZVByb2dyYW0oKTtcbiAgICAgIHJldHVybiBwcm9ncmFtLmxpbmtBc3luYyggWyB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyIF0sIG9wdGlvbnMgKS50aGVuKCAoKSA9PiB7XG4gICAgICAgIHJldHVybiBwcm9ncmFtO1xuICAgICAgfSApLmNhdGNoKCAoIGUgKSA9PiB7XG4gICAgICAgIHByb2dyYW0/LmRpc3Bvc2UoKTtcbiAgICAgICAgZnJhZ21lbnRTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgICAgdmVydGV4U2hhZGVyPy5kaXNwb3NlKCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCggZSApO1xuICAgICAgfSApO1xuICAgIH0gY2F0Y2ggKCBlICkge1xuICAgICAgcHJvZ3JhbT8uZGlzcG9zZSgpO1xuICAgICAgZnJhZ21lbnRTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHZlcnRleFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCBlICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNwZWNpZnkgYSBwcm9ncmFtIHRvIHVzZS5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSB1c2FnZSBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgdXNlUHJvZ3JhbTxUPihcbiAgICBwcm9ncmFtOiBHTENhdFByb2dyYW08VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggcHJvZ3JhbTogR0xDYXRQcm9ncmFtPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclByb2dyYW0uYmluZCggcHJvZ3JhbSwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgdmVydGV4IGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVCdWZmZXIoKTogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGNvbnN0IGJ1ZmZlciA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVCdWZmZXIoKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdEJ1ZmZlciggdGhpcywgYnVmZmVyICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIHZlcnRleCBidWZmZXIuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZFZlcnRleEJ1ZmZlcjxUPihcbiAgICBidWZmZXI6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIGJ1ZmZlcjogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyVmVydGV4QnVmZmVyLmJpbmQoIGJ1ZmZlciwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGFuIGluZGV4IGJ1ZmZlci5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kSW5kZXhCdWZmZXI8VD4oXG4gICAgYnVmZmVyOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCBidWZmZXI6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlckluZGV4QnVmZmVyLmJpbmQoIGJ1ZmZlciwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgdHJhbnNmb3JtIGZlZWRiYWNrLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVRyYW5zZm9ybUZlZWRiYWNrKCk6IEdMQ2F0VHJhbnNmb3JtRmVlZGJhY2s8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICApIHtcbiAgICAgIGNvbnN0IHRyYW5zZm9ybUZlZWRiYWNrID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVRyYW5zZm9ybUZlZWRiYWNrKCkgKTtcblxuICAgICAgcmV0dXJuIG5ldyBHTENhdFRyYW5zZm9ybUZlZWRiYWNrKCB0aGlzLCB0cmFuc2Zvcm1GZWVkYmFjayApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBHTENhdEVycm9ycy5XZWJHTDJFeGNsdXNpdmVFcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIHRyYW5zZm9ybSBmZWVkYmFjay5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kVHJhbnNmb3JtRmVlZGJhY2s8VD4oXG4gICAgdHJhbnNmb3JtRmVlZGJhY2s6IEdMQ2F0VHJhbnNmb3JtRmVlZGJhY2s8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggdHJhbnNmb3JtRmVlZGJhY2s6IEdMQ2F0VHJhbnNmb3JtRmVlZGJhY2s8VENvbnRleHQ+IHwgbnVsbCApID0+IFQsXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclRyYW5zZm9ybUZlZWRiYWNrLmJpbmQoIHRyYW5zZm9ybUZlZWRiYWNrLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB2ZXJ0ZXggYXJyYXkuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlVmVydGV4QXJyYXkoKTogR0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dFxuICAgICkge1xuICAgICAgY29uc3QgdmVydGV4QXJyYXkgPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlVmVydGV4QXJyYXkoKSApO1xuXG4gICAgICByZXR1cm4gbmV3IEdMQ2F0VmVydGV4QXJyYXkoIHRoaXMsIHZlcnRleEFycmF5IGFzIGFueSApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHQgPSB0aGlzLmdldEV4dGVuc2lvbiggJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JywgdHJ1ZSApO1xuXG4gICAgICBjb25zdCB2ZXJ0ZXhBcnJheSA9IEdMQ2F0LnRocm93SWZOdWxsKCBleHQuY3JlYXRlVmVydGV4QXJyYXlPRVMoKSApO1xuXG4gICAgICByZXR1cm4gbmV3IEdMQ2F0VmVydGV4QXJyYXkoIHRoaXMsIHZlcnRleEFycmF5IGFzIGFueSApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG9mIGBnbC5iaW5kVmVydGV4QXJyYXlgLlxuICAgKlxuICAgKiB7QGxpbmsgcmF3QmluZFZlcnRleEFycmF5fSBpcyBiZXR0ZXIuXG4gICAqL1xuICBwdWJsaWMgcmF3QmluZFZlcnRleEFycmF5KCBhcnJheTogR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQ+IHwgbnVsbCApOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICApIHtcbiAgICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSggYXJyYXkgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5nZXRFeHRlbnNpb24oICdPRVNfdmVydGV4X2FycmF5X29iamVjdCcsIHRydWUgKTtcbiAgICAgIGV4dC5iaW5kVmVydGV4QXJyYXlPRVMoIGFycmF5IGFzIGFueSApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgcmF3QmluZFZlcnRleEFycmF5fSBidXQgYmV0dGVyLlxuICAgKlxuICAgKiBCaW5kIGEgdmVydGV4IGFycmF5LlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRWZXJ0ZXhBcnJheTxUPihcbiAgICB2ZXJ0ZXhBcnJheTogR0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCB2ZXJ0ZXhBcnJheTogR0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJWZXJ0ZXhBcnJheS5iaW5kKCB2ZXJ0ZXhBcnJheSwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBjcmVhdGVUZXh0dXJlKCk6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgY29uc3QgdGV4dHVyZSA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVUZXh0dXJlKCkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRUZXh0dXJlKCB0aGlzLCB0ZXh0dXJlICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIDJEIHRleHR1cmUuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZFRleHR1cmUyRDxUPihcbiAgICB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclRleHR1cmUyRC5iaW5kKCB0ZXh0dXJlLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSBjdWJlbWFwIHRleHR1cmUuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZFRleHR1cmVDdWJlTWFwPFQ+KFxuICAgIHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyVGV4dHVyZUN1YmVNYXAuYmluZCggdGV4dHVyZSwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgcmVuZGVyYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVJlbmRlcmJ1ZmZlcigpOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgY29uc3QgcmVuZGVyYnVmZmVyID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpICk7XG5cbiAgICByZXR1cm4gbmV3IEdMQ2F0UmVuZGVyYnVmZmVyKCB0aGlzLCByZW5kZXJidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgcmVuZGVyYnVmZmVyLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRSZW5kZXJidWZmZXI8VD4oXG4gICAgcmVuZGVyYnVmZmVyOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCByZW5kZXJidWZmZXI6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclJlbmRlcmJ1ZmZlci5iaW5kKCByZW5kZXJidWZmZXIsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUZyYW1lYnVmZmVyKCk6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGNvbnN0IGZyYW1lYnVmZmVyID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZUZyYW1lYnVmZmVyKCkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRGcmFtZWJ1ZmZlciggdGhpcywgZnJhbWVidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgZnJhbWVidWZmZXIuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZEZyYW1lYnVmZmVyPFQ+KFxuICAgIGZyYW1lYnVmZmVyOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIGZyYW1lYnVmZmVyOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlckZyYW1lYnVmZmVyLmJpbmQoIGZyYW1lYnVmZmVyLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBmcmFtZWJ1ZmVyLCBpbiBsYXppZXIgd2F5LlxuICAgKi9cbiAgcHVibGljIGxhenlGcmFtZWJ1ZmZlcihcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHtcbiAgICAgIGlzRmxvYXQgPSBmYWxzZSxcbiAgICAgIGRlcHRoRm9ybWF0ID0gdGhpcy5wcmVmZXJyZWREZXB0aEZvcm1hdFxuICAgIH0gPSB7fVxuICApOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB7XG4gICAgbGV0IHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IHJlbmRlcmJ1ZmZlcjogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgIGxldCBmcmFtZWJ1ZmZlcjogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgLy8gPT0gZnJhbWVidWZmZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgZnJhbWVidWZmZXIgPSB0aGlzLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XG5cbiAgICAgIC8vID09IHJlbmRlcmJ1ZmZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHJlbmRlcmJ1ZmZlciA9IHRoaXMuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgICByZW5kZXJidWZmZXIucmVuZGVyYnVmZmVyU3RvcmFnZSggd2lkdGgsIGhlaWdodCwgeyBmb3JtYXQ6IGRlcHRoRm9ybWF0IH0gKTtcbiAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFJlbmRlcmJ1ZmZlciggcmVuZGVyYnVmZmVyLCB7IGF0dGFjaG1lbnQ6IEdMX0RFUFRIX0FUVEFDSE1FTlQgfSApO1xuXG4gICAgICAvLyA9PSB0ZXh0dXJlID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICB0ZXh0dXJlID0gdGhpcy5jcmVhdGVUZXh0dXJlKCk7XG4gICAgICBpZiAoIGlzRmxvYXQgKSB7XG4gICAgICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21BcnJheShcbiAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICB7IGludGVybmFsZm9ybWF0OiBHTF9SR0JBMzJGLCBmb3JtYXQ6IEdMX1JHQkEsIHR5cGU6IEdMX0ZMT0FUIH1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21BcnJheSggd2lkdGgsIGhlaWdodCwgbnVsbCApO1xuICAgICAgfVxuICAgICAgZnJhbWVidWZmZXIuYXR0YWNoVGV4dHVyZSggdGV4dHVyZSApO1xuXG4gICAgICAvLyA9PSBhbG1vc3QgZG9uZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICByZXR1cm4gZnJhbWVidWZmZXI7XG4gICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICBmcmFtZWJ1ZmZlcj8uZGlzcG9zZSgpO1xuICAgICAgdGV4dHVyZT8uZGlzcG9zZSgpO1xuICAgICAgcmVuZGVyYnVmZmVyPy5kaXNwb3NlKCk7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgbXVsdGlzYW1wbGUgZnJhbWVidWZmZXIsIGluIGxhemllciB3YXkuXG4gICAqL1xuICBwdWJsaWMgbGF6eU11bHRpc2FtcGxlRnJhbWVidWZmZXIoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB7XG4gICAgICBzYW1wbGVzID0gNCxcbiAgICAgIGlzRmxvYXQgPSBmYWxzZSxcbiAgICAgIGRlcHRoRm9ybWF0ID0gdGhpcy5wcmVmZXJyZWREZXB0aEZvcm1hdCxcbiAgICAgIGZhbGxiYWNrV2ViR0wxID0gdHJ1ZVxuICAgIH0gPSB7fVxuICApOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0XG4gICAgKSB7XG4gICAgICBsZXQgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICAgIGxldCByZW5kZXJidWZmZXJEZXB0aDogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgICAgbGV0IHJlbmRlcmJ1ZmZlckNvbG9yOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgICBsZXQgZnJhbWVidWZmZXI6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyA9PSBmcmFtZWJ1ZmZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICBmcmFtZWJ1ZmZlciA9IHRoaXMuY3JlYXRlRnJhbWVidWZmZXIoKTtcblxuICAgICAgICAvLyA9PSByZW5kZXJidWZmZXIgZGVwdGggPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICByZW5kZXJidWZmZXJEZXB0aCA9IHRoaXMuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgICAgIHJlbmRlcmJ1ZmZlckRlcHRoLnJlbmRlcmJ1ZmZlclN0b3JhZ2VNdWx0aXNhbXBsZShcbiAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgeyBzYW1wbGVzLCBmb3JtYXQ6IGRlcHRoRm9ybWF0IH1cbiAgICAgICAgKTtcbiAgICAgICAgZnJhbWVidWZmZXIuYXR0YWNoUmVuZGVyYnVmZmVyKCByZW5kZXJidWZmZXJEZXB0aCwgeyBhdHRhY2htZW50OiBHTF9ERVBUSF9BVFRBQ0hNRU5UIH0gKTtcblxuICAgICAgICAvLyA9PSByZW5kZXJidWZmZXIgY29sb3IgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICBjb25zdCByZW5kZXJidWZmZXJDb2xvciA9IHRoaXMuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgICAgIGNvbnN0IGNvbG9yRm9ybWF0ID0gaXNGbG9hdCA/IEdMX1JHQkEzMkYgOiBHTF9SR0JBODtcbiAgICAgICAgcmVuZGVyYnVmZmVyQ29sb3IucmVuZGVyYnVmZmVyU3RvcmFnZU11bHRpc2FtcGxlKFxuICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICB7IHNhbXBsZXMsIGZvcm1hdDogY29sb3JGb3JtYXQgfVxuICAgICAgICApO1xuICAgICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlckNvbG9yLCB7IGF0dGFjaG1lbnQ6IEdMX0NPTE9SX0FUVEFDSE1FTlQwIH0gKTtcblxuICAgICAgICAvLyA9PSBhbG1vc3QgZG9uZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICByZXR1cm4gZnJhbWVidWZmZXI7XG4gICAgICB9IGNhdGNoICggZSApIHtcbiAgICAgICAgZnJhbWVidWZmZXI/LmRpc3Bvc2UoKTtcbiAgICAgICAgdGV4dHVyZT8uZGlzcG9zZSgpO1xuICAgICAgICByZW5kZXJidWZmZXJDb2xvcj8uZGlzcG9zZSgpO1xuICAgICAgICByZW5kZXJidWZmZXJEZXB0aD8uZGlzcG9zZSgpO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIGZhbGxiYWNrV2ViR0wxICkge1xuICAgICAgcmV0dXJuIHRoaXMubGF6eUZyYW1lYnVmZmVyKCB3aWR0aCwgaGVpZ2h0LCB7IGlzRmxvYXQgfSApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBHTENhdEVycm9ycy5XZWJHTDJFeGNsdXNpdmVFcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGRyYXcgYnVmZmVycywgaW4gbGF6aWVyIHdheS5cbiAgICogSWYgeW91IGNhbid0IGdyYWIgYFdFQkdMX2RyYXdfYnVmZmVyc2AgZXh0ZW5zaW9uLCB5b3UnbGwgZGllIGluc3RhbnRseSBhdCB0aGlzIHBvaW50LlxuICAgKi9cbiAgcHVibGljIGxhenlEcmF3YnVmZmVycyhcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIG51bUJ1ZmZlcnM6IG51bWJlcixcbiAgICB7XG4gICAgICBpc0Zsb2F0ID0gZmFsc2UsXG4gICAgICBkZXB0aEZvcm1hdCA9IHRoaXMucHJlZmVycmVkRGVwdGhGb3JtYXRcbiAgICB9ID0ge31cbiAgKTogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4ge1xuICAgIGlmICggR0xfTUFYX0RSQVdfQlVGRkVSUyA8IG51bUJ1ZmZlcnMgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoICdHTENhdDogTWF4aW11bSBkcmF3IGJ1ZmZlcnMgY291bnQgZXhjZWVkZWQnICk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dHVyZXM6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD5bXSA9IFtdO1xuICAgIGxldCByZW5kZXJidWZmZXI6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZnJhbWVidWZmZXI6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vID09IGZyYW1lYnVmZmVyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGZyYW1lYnVmZmVyID0gdGhpcy5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuXG4gICAgICAvLyA9PSByZW5kZXJidWZmZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCByZW5kZXJidWZmZXIgPSB0aGlzLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xuICAgICAgcmVuZGVyYnVmZmVyLnJlbmRlcmJ1ZmZlclN0b3JhZ2UoIHdpZHRoLCBoZWlnaHQsIHsgZm9ybWF0OiBkZXB0aEZvcm1hdCB9ICk7XG4gICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlciwgeyBhdHRhY2htZW50OiBHTF9ERVBUSF9BVFRBQ0hNRU5UIH0gKTtcblxuICAgICAgLy8gPT0gdGV4dHVyZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbnVtQnVmZmVyczsgaSArKyApIHtcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IHRoaXMuY3JlYXRlVGV4dHVyZSgpO1xuICAgICAgICBpZiAoIGlzRmxvYXQgKSB7XG4gICAgICAgICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KFxuICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgeyBpbnRlcm5hbGZvcm1hdDogR0xfUkdCQTMyRiwgZm9ybWF0OiBHTF9SR0JBLCB0eXBlOiBHTF9GTE9BVCB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkoIHdpZHRoLCBoZWlnaHQsIG51bGwgKTtcbiAgICAgICAgfVxuICAgICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hUZXh0dXJlKCB0ZXh0dXJlLCB7IGF0dGFjaG1lbnQ6IEdMX0NPTE9SX0FUVEFDSE1FTlQwICsgaSB9ICk7XG4gICAgICB9XG5cbiAgICAgIC8vID09IGFsbW9zdCBkb25lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHJldHVybiBmcmFtZWJ1ZmZlcjtcbiAgICB9IGNhdGNoICggZSApIHtcbiAgICAgIHRleHR1cmVzLmZvckVhY2goICggdGV4dHVyZSApID0+IHtcbiAgICAgICAgdGV4dHVyZS5kaXNwb3NlKCk7XG4gICAgICB9ICk7XG4gICAgICByZW5kZXJidWZmZXI/LmRpc3Bvc2UoKTtcbiAgICAgIGZyYW1lYnVmZmVyPy5kaXNwb3NlKCk7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG9mIGBnbC5kcmF3QnVmZmVyc2AuXG4gICAqXG4gICAqIHtAbGluayBkcmF3QnVmZmVyc30gaXMgYmV0dGVyLlxuICAgKi9cbiAgcHVibGljIHJhd0RyYXdCdWZmZXJzKCBidWZmZXJzOiBHTGVudW1bXSApOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICApIHtcbiAgICAgIGdsLmRyYXdCdWZmZXJzKCBidWZmZXJzICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4dCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCAnV0VCR0xfZHJhd19idWZmZXJzJyApO1xuICAgICAgZXh0Py5kcmF3QnVmZmVyc1dFQkdMKCBidWZmZXJzICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHtAbGluayByYXdEcmF3QnVmZmVyc30gYnV0IGJldHRlci5cbiAgICpcbiAgICogQ2FsbCB0aGlzIGJlZm9yZSB5b3UncmUgZ29ubmEgdXNlIGRyYXcgYnVmZmVycy5cbiAgICogSWYgeW91IGNhbid0IGdyYWIgYFdFQkdMX2RyYXdfYnVmZmVyc2AgZXh0ZW5zaW9uLCB5b3UnbGwgZGllIGluc3RhbnRseSBhdCB0aGlzIHBvaW50LlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGRyYXcgYnVmZmVycyBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgZHJhd0J1ZmZlcnM8VD4oXG4gICAgYnVmZmVyc09yTnVtQnVmZmVycz86IEdMZW51bVtdIHwgbnVtYmVyLFxuICAgIGNhbGxiYWNrPzogKCBidWZmZXJzOiBHTGVudW1bXSApID0+IFRcbiAgKTogVCB7XG4gICAgbGV0IGJ1ZmZlcnM6IEdMZW51bVtdO1xuXG4gICAgaWYgKCBBcnJheS5pc0FycmF5KCBidWZmZXJzT3JOdW1CdWZmZXJzICkgKSB7XG4gICAgICBidWZmZXJzID0gYnVmZmVyc09yTnVtQnVmZmVycztcbiAgICB9IGVsc2UgaWYgKCBidWZmZXJzT3JOdW1CdWZmZXJzICkge1xuICAgICAgYnVmZmVycyA9IFtdO1xuICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgYnVmZmVyc09yTnVtQnVmZmVyczsgaSArKyApIHtcbiAgICAgICAgYnVmZmVyc1sgaSBdID0gR0xfQ09MT1JfQVRUQUNITUVOVDAgKyBpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBidWZmZXJzID0gWyBHTF9DT0xPUl9BVFRBQ0hNRU5UMCBdO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlckRyYXdCdWZmZXJzLmJpbmQoIGJ1ZmZlcnMsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogYSB3cmFwcGVyIG9mIGRyYXdFbGVtZW50c0luc3RhbmNlZC5cbiAgICovXG4gIHB1YmxpYyBkcmF3QXJyYXlzSW5zdGFuY2VkKFxuICAgIG1vZGU6IEdMZW51bSxcbiAgICBmaXJzdDogR0xpbnQsXG4gICAgY291bnQ6IEdMc2l6ZWksXG4gICAgcHJpbWNvdW50OiBHTHNpemVpXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0XG4gICAgKSB7XG4gICAgICBnbC5kcmF3QXJyYXlzSW5zdGFuY2VkKCBtb2RlLCBmaXJzdCwgY291bnQsIHByaW1jb3VudCApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHQgPSB0aGlzLmdldEV4dGVuc2lvbiggJ0FOR0xFX2luc3RhbmNlZF9hcnJheXMnLCB0cnVlICk7XG4gICAgICBleHQuZHJhd0FycmF5c0luc3RhbmNlZEFOR0xFKCBtb2RlLCBmaXJzdCwgY291bnQsIHByaW1jb3VudCApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhIHdyYXBwZXIgb2YgZHJhd0VsZW1lbnRzSW5zdGFuY2VkLlxuICAgKi9cbiAgcHVibGljIGRyYXdFbGVtZW50c0luc3RhbmNlZChcbiAgICBtb2RlOiBHTGVudW0sXG4gICAgY291bnQ6IEdMc2l6ZWksXG4gICAgdHlwZTogR0xlbnVtLFxuICAgIG9mZnNldDogR0xpbnRwdHIsXG4gICAgaW5zdGFuY2VDb3VudDogR0xzaXplaVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xuXG4gICAgaWYgKFxuICAgICAgdHlwZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dFxuICAgICkge1xuICAgICAgZ2wuZHJhd0VsZW1lbnRzSW5zdGFuY2VkKCBtb2RlLCBjb3VudCwgdHlwZSwgb2Zmc2V0LCBpbnN0YW5jZUNvdW50ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4dCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCAnQU5HTEVfaW5zdGFuY2VkX2FycmF5cycsIHRydWUgKTtcbiAgICAgIGV4dC5kcmF3RWxlbWVudHNJbnN0YW5jZWRBTkdMRSggbW9kZSwgY291bnQsIHR5cGUsIG9mZnNldCwgaW5zdGFuY2VDb3VudCApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgY3VycmVudCBmcmFtZWJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBjbGVhcihcbiAgICByZWQgPSAwLjAsXG4gICAgZ3JlZW4gPSAwLjAsXG4gICAgYmx1ZSA9IDAuMCxcbiAgICBhbHBoYSA9IDEuMCxcbiAgICBkZXB0aCA9IDEuMFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGdsLmNsZWFyQ29sb3IoIHJlZCwgZ3JlZW4sIGJsdWUsIGFscGhhICk7XG4gICAgZ2wuY2xlYXJEZXB0aCggZGVwdGggKTtcbiAgICBnbC5jbGVhciggR0xfQ09MT1JfQlVGRkVSX0JJVCB8IEdMX0RFUFRIX0JVRkZFUl9CSVQgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCYXNpY2FsbHkganVzdCBhIGBnbC5ibGl0RnJhbWVidWZmZXJgLlxuICAgKi9cbiAgcHVibGljIGJsaXRGcmFtZWJ1ZmZlcihcbiAgICBzcmM6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBkc3Q6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICB7XG4gICAgICBzcmNWaWV3cG9ydCA9IFsgMCwgMCwgc3JjPy5yZW5kZXJidWZmZXI/LndpZHRoID8/IDAsIHNyYz8ucmVuZGVyYnVmZmVyPy5oZWlnaHQgPz8gMCBdLFxuICAgICAgZHN0Vmlld3BvcnQgPSBbIDAsIDAsIGRzdD8ucmVuZGVyYnVmZmVyPy53aWR0aCA/PyAwLCBkc3Q/LnJlbmRlcmJ1ZmZlcj8uaGVpZ2h0ID8/IDAgXSxcbiAgICAgIG1hc2sgPSBHTF9DT0xPUl9CVUZGRVJfQklULFxuICAgICAgZmlsdGVyID0gR0xfTkVBUkVTVFxuICAgIH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICApIHtcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlciggR0xfUkVBRF9GUkFNRUJVRkZFUiwgc3JjPy5yYXcgPz8gbnVsbCApO1xuICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKCBHTF9EUkFXX0ZSQU1FQlVGRkVSLCBkc3Q/LnJhdyA/PyBudWxsICk7XG4gICAgICBnbC5ibGl0RnJhbWVidWZmZXIoXG4gICAgICAgIHNyY1ZpZXdwb3J0WyAwIF0sXG4gICAgICAgIHNyY1ZpZXdwb3J0WyAxIF0sXG4gICAgICAgIHNyY1ZpZXdwb3J0WyAyIF0sXG4gICAgICAgIHNyY1ZpZXdwb3J0WyAzIF0sXG4gICAgICAgIGRzdFZpZXdwb3J0WyAwIF0sXG4gICAgICAgIGRzdFZpZXdwb3J0WyAxIF0sXG4gICAgICAgIGRzdFZpZXdwb3J0WyAyIF0sXG4gICAgICAgIGRzdFZpZXdwb3J0WyAzIF0sXG4gICAgICAgIG1hc2ssXG4gICAgICAgIGZpbHRlclxuICAgICAgKTtcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlciggR0xfUkVBRF9GUkFNRUJVRkZFUiwgbnVsbCApO1xuICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKCBHTF9EUkFXX0ZSQU1FQlVGRkVSLCBudWxsICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEdMQ2F0RXJyb3JzLldlYkdMMkV4Y2x1c2l2ZUVycm9yO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUE7SUFDQTtBQUNBO0lBQ0E7SUFDQTtBQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtBQXVHQTtJQUNPLFNBQVMsUUFBUSxDQUFDLENBQUMsRUFBRTtJQUM1QixJQUFJLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxD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LENBQWtCO1lBRTVCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxJQUFJLENBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBRSxJQUFJLEVBQUU7Z0JBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUUsUUFBUSxFQUFFLEtBQUssQ0FBRSxDQUFDO2FBQ2xDLENBQUUsQ0FBQztTQUNMOzs7O1FBS00saUNBQVUsR0FBakIsVUFBbUIsSUFBWSxFQUFFLEtBQWdCO1lBQ3ZDLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxJQUFJLENBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBRSxJQUFJLEVBQUU7Z0JBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUUsUUFBUSxFQUFFLEtBQUssQ0FBRSxDQUFDO2FBQ2xDLENBQUUsQ0FBQztTQUNMOzs7O1FBS00saUNBQVUsR0FBakIsVUFBbUIsSUFBWSxFQUFFLEtBQWdCO1lBQ3ZDLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxJQUFJLENBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBRSxJQUFJLEVBQUU7Z0JBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUUsUUFBUSxFQUFFLEtBQUssQ0FBRSxDQUFDO2FBQ2xDLENBQUUsQ0FBQztTQUNMOzs7O1FBS00saUNBQVUsR0FBakIsVUFBbUIsSUFBWSxFQUFFLEtBQWdCO1lBQ3ZDLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBRSxJQUFJLENBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBRSxJQUFJLEVBQUU7Z0JBQzdCLEVBQUUsQ0FBQyxVQUFVLENBQUUsUUFBUSxFQUFFLEtBQUssQ0FBRSxDQUFDO2FBQ2xDLENBQUUsQ0FBQztTQUNMOzs7O1FBS00sZ0NBQVMsR0FBaEIsVUFBa0IsSUFBWSxFQUFFLEtBQWE7WUFDbkMsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFFLElBQUksQ0FBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFFLElBQUksRUFBRTtnQkFDN0IsRUFBRSxDQUFDLFNBQVMsQ0FBRSxRQUFRLEVBQUUsS0FBSyxDQUFFLENBQUM7YUFDakMsQ0FBRSxDQUFDO1NBQ0w7Ozs7UUFLTSxnQ0FBUyxHQUFoQixVQUFrQixJQUFZLEVBQUUsQ0FBUyxFQUFFLENBQVM7WUFDMUMsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFFLElBQUksQ0FBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFFLElBQUksRUFBRTtnQkFDN0IsRUFBRSxDQUFDLFNBQVMsQ0FBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO2FBQ2hDLENBQUUsQ0FBQztTQUNMOzs7O1FBS00sZ0NBQVMsR0FBaEIsVUFBa0IsSUFBWSxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztZQUNyRCxJQUFBLEVBQUUsR0FBSyxJQUFJLENBQUMsT0FBTyxHQUFqQixDQUFrQjtZQUU1QixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUUsSUFBSSxDQUFFLENBQUM7WUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUUsSUFBSSxFQUFFO2dCQUM3QixFQUFFLENBQUMsU0FBUyxDQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO2FBQ25DLENBQUUsQ0FBQztTQUNMOzs7O1FBS00sZ0NBQVMsR0FBaEIsVUFBa0IsSUFBWSxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7WUFDaEUsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFFLElBQUksQ0FBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFFLElBQUksRUFBRTtnQkFDN0IsRUFBRSxDQUFDLFNBQVMsQ0FBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7YUFDdEMsQ0FBRSxDQUFDO1NBQ0w7Ozs7UUFLTSxpQ0FBVSxHQUFqQixVQUFtQixJQUFZLEVBQUUsS0FBa0I7WUFDekMsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFFLElBQUksQ0FBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFFLElBQUksRUFBRTtnQkFDN0IsRUFBRSxDQUFDLFVBQVUsQ0FBRSxRQUFRLEVBQUUsS0FBSyxDQUFFLENBQUM7YUFDbEMsQ0FBRSxDQUFDO1NBQ0w7Ozs7UUFLTSxpQ0FBVSxHQUFqQixVQUFtQixJQUFZLEVBQUUsS0FBa0I7WUFDekMsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFFLElBQUksQ0FBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFFLElBQUksRUFBRTtnQkFDN0IsRUFBRSxDQUFDLFVBQVUsQ0FBRSxRQUFRLEVBQUUsS0FBSyxDQUFFLENBQUM7YUFDbEMsQ0FBRSxDQUFDO1NBQ0w7Ozs7UUFLTSxpQ0FBVSxHQUFqQixVQUFtQixJQUFZLEVBQUUsS0FBa0I7WUFDekMsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFFLElBQUksQ0FBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFFLElBQUksRUFBRTtnQkFDN0IsRUFBRSxDQUFDLFVBQVUsQ0FBRSxRQUFRLEVBQUUsS0FBSyxDQUFFLENBQUM7YUFDbEMsQ0FBRSxDQUFDO1NBQ0w7Ozs7UUFLTSxpQ0FBVSxHQUFqQixVQUFtQixJQUFZLEVBQUUsS0FBa0I7WUFDekMsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFFLElBQUksQ0FBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFFLElBQUksRUFBRTtnQkFDN0IsRUFBRSxDQUFDLFVBQVUsQ0FBRSxRQUFRLEVBQUUsS0FBSyxDQUFFLENBQUM7YUFDbEMsQ0FBRSxDQUFDO1NBQ0w7Ozs7UUFLTSx1Q0FBZ0IsR0FBdkIsVUFBeUIsSUFBWSxFQUFFLEtBQWtCLEVBQUUsU0FBaUI7WUFBakIsMEJBQUEsRUFBQSxpQkFBaUI7WUFDbEUsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFFLElBQUksQ0FBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFFLElBQUksRUFBRTtnQkFDN0IsRUFBRSxDQUFDLGdCQUFnQixDQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFFLENBQUM7YUFDbkQsQ0FBRSxDQUFDO1NBQ0w7Ozs7UUFLTSx1Q0FBZ0IsR0FBdkIsVUFBeUIsSUFBWSxFQUFFLEtBQWtCLEVBQUUsU0FBaUI7WUFBakIsMEJBQUEsRUFBQSxpQkFBaUI7WUFDbEUsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFFLElBQUksQ0FBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFFLElBQUksRUFBRTtnQkFDN0IsRUFBRSxDQUFDLGdCQUFnQixDQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFFLENBQUM7YUFDbkQsQ0FBRSxDQUFDO1NBQ0w7Ozs7UUFLTSx1Q0FBZ0IsR0FBdkIsVUFBeUIsSUFBWSxFQUFFLEtBQWtCLEVBQUUsU0FBaUI7WUFBakIsMEJBQUEsRUFBQSxpQkFBaUI7WUFDbEUsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFFLElBQUksQ0FBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFFLElBQUksRUFBRTtnQkFDN0IsRUFBRSxDQUFDLGdCQUFnQixDQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFFLENBQUM7YUFDbkQsQ0FBRSxDQUFDO1NBQ0w7Ozs7OztRQU9NLHFDQUFjLEdBQXJCLFVBQXVCLElBQVksRUFBRSxPQUFzQztZQUNqRSxJQUFBLEVBQUUsR0FBSyxJQUFJLENBQUMsT0FBTyxHQUFqQixDQUFrQjtZQUU1QixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUUsSUFBSSxDQUFFLENBQUM7WUFDakQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFFLElBQUksQ0FBRSxDQUFDO1lBQ2hELEVBQUUsQ0FBQyxhQUFhLENBQUUsV0FBVyxHQUFHLElBQUksQ0FBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFFLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLElBQUksQ0FBRSxDQUFDO1lBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFFLElBQUksRUFBRTtnQkFDN0IsRUFBRSxDQUFDLFNBQVMsQ0FBRSxRQUFRLEVBQUUsSUFBSSxDQUFFLENBQUM7YUFDaEMsQ0FBRSxDQUFDO1NBQ0w7Ozs7OztRQU9NLHFDQUFjLEdBQXJCLFVBQXVCLElBQVksRUFBRSxPQUFzQztZQUNqRSxJQUFBLEVBQUUsR0FBSyxJQUFJLENBQUMsT0FBTyxHQUFqQixDQUFrQjtZQUU1QixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUUsSUFBSSxDQUFFLENBQUM7WUFDakQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFFLElBQUksQ0FBRSxDQUFDO1lBQ2hELEVBQUUsQ0FBQyxhQUFhLENBQUUsV0FBVyxHQUFHLElBQUksQ0FBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUUsT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksSUFBSSxDQUFFLENBQUM7WUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUUsSUFBSSxFQUFFO2dCQUM3QixFQUFFLENBQUMsU0FBUyxDQUFFLFFBQVEsRUFBRSxJQUFJLENBQUUsQ0FBQzthQUNoQyxDQUFFLENBQUM7U0FDTDs7OztRQUtNLHdDQUFpQixHQUF4QixVQUEwQixJQUFZO1lBQzVCLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQUssSUFBSSxDQUFDLHFCQUFxQixDQUFFLElBQUksQ0FBRSxLQUFLLFNBQVMsRUFBRztnQkFDdEQsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUUsSUFBSSxDQUFFLENBQUM7YUFDM0M7aUJBQU07Z0JBQ0wsSUFBTSxVQUFRLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFFLENBQUM7Ozs7O2dCQUs5RCxJQUFJLENBQUMscUJBQXFCLENBQUUsSUFBSSxDQUFFLEdBQUcsVUFBUSxDQUFDO2dCQUM5QyxPQUFPLFVBQVEsQ0FBQzthQUNqQjtTQUNGOzs7O1FBS00seUNBQWtCLEdBQXpCLFVBQTJCLElBQVk7WUFDN0IsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsSUFBSyxJQUFJLENBQUMsc0JBQXNCLENBQUUsSUFBSSxDQUFFLEtBQUssU0FBUyxFQUFHO2dCQUN2RCxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBRSxJQUFJLENBQUUsQ0FBQzthQUM1QztpQkFBTTtnQkFDTCxJQUFNLFVBQVEsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUUsQ0FBQzs7Ozs7Z0JBSy9ELElBQUksQ0FBQyxzQkFBc0IsQ0FBRSxJQUFJLENBQUUsR0FBRyxVQUFRLENBQUM7Z0JBQy9DLE9BQU8sVUFBUSxDQUFDO2FBQ2pCO1NBQ0Y7Ozs7UUFLTSw0Q0FBcUIsR0FBNUIsVUFBOEIsSUFBWTtZQUN4QyxJQUFLLElBQUksQ0FBQyx1QkFBdUIsQ0FBRSxJQUFJLENBQUUsS0FBSyxTQUFTLEVBQUc7Z0JBQ3hELElBQUksQ0FBQyx1QkFBdUIsQ0FBRSxJQUFJLENBQUUsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUM7Z0JBQ3RFLElBQUksQ0FBQyx5QkFBeUIsRUFBRyxDQUFDO2FBQ25DO1lBRUQsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUUsSUFBSSxDQUFFLENBQUM7U0FDN0M7UUFDSCxtQkFBQztJQUFELENBQUM7O0lDL2lCRDtRQUlFLG9CQUFvQixJQUFZLEVBQUUsTUFBaUM7WUFDakUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7U0FDeEI7UUFFTSx5QkFBSSxHQUFYLFVBQ0UsS0FBYSxFQUNiLFFBQWlDO1lBRWpDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDekIsSUFBSyxLQUFLLEtBQUssSUFBSSxFQUFHO2dCQUNwQixJQUFJLENBQUMsUUFBUSxDQUFFLEtBQUssQ0FBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUNyQjtZQUVELElBQUssUUFBUSxFQUFHO2dCQUNkLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBRSxLQUFLLENBQUUsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUUsQ0FBQztnQkFDbEIsT0FBTyxHQUFHLENBQUM7YUFDWjtpQkFBTTtnQkFDTCxPQUFPLFNBQWdCLENBQUM7YUFDekI7U0FDRjtRQUNILGlCQUFDO0lBQUQsQ0FBQzs7SUNyQkQ7Ozs7Ozs7UUF3QkUscUJBQW9CLEtBQXNCLEVBQUUsTUFBbUI7WUFDN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7U0FDeEI7UUFqQkQsc0JBQVcsK0JBQU07Ozs7aUJBQWpCO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUN0Qjs7O1dBQUE7UUFLRCxzQkFBVyw0QkFBRzs7OztpQkFBZDtnQkFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDdEI7OztXQUFBOzs7O1FBYU0sNkJBQU8sR0FBZDtZQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUM7U0FDL0M7UUFPTSxxQ0FBZSxHQUF0QixVQUNFLE1BQXdDLEVBQ3hDLEtBQThCO1lBQTlCLHNCQUFBLEVBQUEsc0JBQThCO1lBRXRCLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUUsSUFBSSxFQUFFO2dCQUNuQyxFQUFFLENBQUMsVUFBVSxDQUFFLGVBQWUsRUFBRSxNQUFhLEVBQUUsS0FBSyxDQUFFLENBQUM7YUFDeEQsQ0FBRSxDQUFDO1NBQ0w7UUFPTSxvQ0FBYyxHQUFyQixVQUNFLE1BQXdDLEVBQ3hDLEtBQThCO1lBQTlCLHNCQUFBLEVBQUEsc0JBQThCO1lBRXRCLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFFLElBQUksRUFBRTtnQkFDbEMsRUFBRSxDQUFDLFVBQVUsQ0FBRSx1QkFBdUIsRUFBRSxNQUFhLEVBQUUsS0FBSyxDQUFFLENBQUM7YUFDaEUsQ0FBRSxDQUFDO1NBQ0w7UUFDSCxrQkFBQztJQUFELENBQUM7O0lDakVEOzs7Ozs7O1FBMENFLDBCQUFvQixLQUFzQixFQUFFLFdBQTZCO1lBcENqRSxzQkFBaUIsR0FBRyxJQUFJLEdBQUcsRUFBdUMsQ0FBQztZQUNuRSxpQkFBWSxHQUFHLElBQUksR0FBRyxFQUFrQyxDQUFDO1lBb0MvRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztTQUNsQztRQWpDRCxzQkFBVyx5Q0FBVzs7OztpQkFBdEI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO2FBQzNCOzs7V0FBQTtRQUtELHNCQUFXLGlDQUFHOzs7O2lCQUFkO2dCQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQzthQUMzQjs7O1dBQUE7UUFNRCxzQkFBVywwQ0FBWTs7Ozs7aUJBQXZCOztnQkFDRSxhQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUUsbUJBQW1CLENBQUUsbUNBQUksSUFBSSxDQUFDO2FBQ2xFOzs7V0FBQTtRQU1ELHNCQUFXLHFDQUFPOzs7OztpQkFBbEI7O2dCQUNFLGFBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUUsb0JBQW9CLENBQUUsbUNBQUksSUFBSSxDQUFDO2FBQzlEOzs7V0FBQTs7OztRQWFNLGtDQUFPLEdBQWQsVUFBZ0IsWUFBb0I7O1lBQXBCLDZCQUFBLEVBQUEsb0JBQW9CO1lBQzFCLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFFLENBQUM7WUFFM0MsSUFBSyxZQUFZLEVBQUc7O29CQUNsQixLQUE0QixJQUFBLEtBQUEsU0FBQSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUEsZ0JBQUEsNEJBQUc7d0JBQXhELElBQU0sWUFBWSxXQUFBO3dCQUN0QixFQUFFLENBQUMsa0JBQWtCLENBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBRSxDQUFDO3FCQUMzQzs7Ozs7Ozs7OztvQkFFRCxLQUF1QixJQUFBLEtBQUEsU0FBQSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFBLGdCQUFBLDRCQUFHO3dCQUE5QyxJQUFNLE9BQU8sV0FBQTt3QkFDakIsRUFBRSxDQUFDLGFBQWEsQ0FBRSxPQUFPLENBQUMsR0FBRyxDQUFFLENBQUM7cUJBQ2pDOzs7Ozs7Ozs7YUFDRjtTQUNGOzs7O1FBS00sMENBQWUsR0FBdEIsVUFBd0IsVUFBZ0M7O1lBQWhDLDJCQUFBLEVBQUEsZ0NBQWdDO1lBQ3RELGFBQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBRSxVQUFVLENBQUUsbUNBQUksSUFBSSxDQUFDO1NBQ3pEOzs7O1FBS00scUNBQVUsR0FBakIsVUFBbUIsVUFBaUM7O1lBQWpDLDJCQUFBLEVBQUEsaUNBQWlDO1lBQ2xELGFBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUUsVUFBVSxDQUFFLG1DQUFJLElBQUksQ0FBQztTQUNwRDs7OztRQUtNLDZDQUFrQixHQUF6QixVQUNFLFlBQXlDLEVBQ3pDLEVBRU07Z0JBRk4scUJBRUksRUFBRSxLQUFBLEVBREosa0JBQWdDLEVBQWhDLFVBQVUsbUJBQUcsbUJBQW1CLEtBQUE7WUFHMUIsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUUsSUFBSSxFQUFFO2dCQUNsQyxFQUFFLENBQUMsdUJBQXVCLENBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBRSxDQUFDO2FBQzdGLENBQUUsQ0FBQztZQUVKLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUUsVUFBVSxFQUFFLFlBQVksQ0FBRSxDQUFDO1NBQ3hEOzs7O1FBS00sd0NBQWEsR0FBcEIsVUFDRSxPQUErQixFQUMvQixFQUdNO2dCQUhOLHFCQUdJLEVBQUUsS0FBQSxFQUZKLGFBQVMsRUFBVCxLQUFLLG1CQUFHLENBQUMsS0FBQSxFQUNULGtCQUFpQyxFQUFqQyxVQUFVLG1CQUFHLG9CQUFvQixLQUFBO1lBRzNCLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFFLElBQUksRUFBRTtnQkFDbEMsRUFBRSxDQUFDLG9CQUFvQixDQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFFLENBQUM7YUFDMUYsQ0FBRSxDQUFDO1lBRUosSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBRSxDQUFDO1NBQzlDO1FBQ0gsdUJBQUM7SUFBRCxDQUFDOztJQ3JIRDs7Ozs7OztRQXdDRSwyQkFBb0IsS0FBc0IsRUFBRSxZQUErQjtZQWxDbkUsWUFBTyxHQUFHLENBQUMsQ0FBQztZQUNaLGFBQVEsR0FBRyxDQUFDLENBQUM7WUFrQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO1NBQ3BDO1FBL0JELHNCQUFXLDJDQUFZOzs7O2lCQUF2QjtnQkFDRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7YUFDNUI7OztXQUFBO1FBS0Qsc0JBQVcsa0NBQUc7Ozs7aUJBQWQ7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQzVCOzs7V0FBQTtRQUtELHNCQUFXLG9DQUFLOzs7O2lCQUFoQjtnQkFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDckI7OztXQUFBO1FBS0Qsc0JBQVcscUNBQU07Ozs7aUJBQWpCO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUN0Qjs7O1dBQUE7Ozs7UUFhTSxtQ0FBTyxHQUFkO1lBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsa0JBQWtCLENBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBRSxDQUFDO1NBQzNEOzs7O1FBS00sK0NBQW1CLEdBQTFCLFVBQ0UsS0FBYSxFQUNiLE1BQWMsRUFDZCxFQUFtRDtnQkFBbkQscUJBQWlELEVBQUUsS0FBQSxFQUFqRCxjQUEwQyxFQUExQyxNQUFNLG1CQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEtBQUE7WUFFcEMsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBRSxJQUFJLEVBQUU7Z0JBQ25DLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUUsQ0FBQzthQUNsRSxDQUFFLENBQUM7WUFFSixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztTQUN4Qjs7Ozs7UUFNTSwwREFBOEIsR0FBckMsVUFDRSxLQUFhLEVBQ2IsTUFBYyxFQUNkLEVBSU07Z0JBSk4scUJBSUksRUFBRSxLQUFBLEVBSEosZUFBa0QsRUFBbEQsT0FBTyxtQkFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLDJCQUEyQixLQUFBLEVBQ2xELGNBQTBDLEVBQTFDLE1BQU0sbUJBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsS0FBQSxFQUMxQyxzQkFBcUIsRUFBckIsY0FBYyxtQkFBRyxJQUFJLEtBQUE7WUFHZixJQUFBLEVBQUUsR0FBSyxJQUFJLENBQUMsT0FBTyxHQUFqQixDQUFrQjtZQUU1QixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFFLElBQUksRUFBRTtnQkFDbkMsSUFDRSxPQUFPLHNCQUFzQixLQUFLLFVBQVU7b0JBQzVDLEVBQUUsWUFBWSxzQkFBc0IsRUFDcEM7b0JBQ0EsRUFBRSxDQUFDLDhCQUE4QixDQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUUsQ0FBQztpQkFDdEY7cUJBQU07b0JBQ0wsSUFBSyxjQUFjLEVBQUc7d0JBQ3BCLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUUsQ0FBQztxQkFDbEU7eUJBQU07d0JBQ0wsTUFBTSxXQUFXLENBQUMsb0JBQW9CLENBQUM7cUJBQ3hDO2lCQUNGO2FBQ0YsQ0FBRSxDQUFDO1lBRUosSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7U0FDeEI7UUFDSCx3QkFBQztJQUFELENBQUM7O0lDeEdEOzs7Ozs7O1FBeUJFLHFCQUFvQixLQUFzQixFQUFFLE1BQW1CO1lBbkJ2RCxlQUFVLEdBQUcsS0FBSyxDQUFDO1lBb0J6QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztTQUN4QjtRQWpCRCxzQkFBVywrQkFBTTs7OztpQkFBakI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3RCOzs7V0FBQTtRQUtELHNCQUFXLDRCQUFHOzs7O2lCQUFkO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUN0Qjs7O1dBQUE7Ozs7UUFhTSw2QkFBTyxHQUFkO1lBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUUsQ0FBQztTQUMvQzs7OztRQUtNLGdDQUFVLEdBQWpCO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hCOzs7O1FBS00sNkJBQU8sR0FBZCxVQUFnQixJQUFZO1lBQ2xCLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLEVBQUUsQ0FBQyxZQUFZLENBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUUsQ0FBQztZQUN2QyxFQUFFLENBQUMsYUFBYSxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUUsQ0FBQztZQUVsQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBRSxJQUFJLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFFLENBQUM7WUFDNUUsSUFBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUc7Z0JBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFFLElBQUksQ0FBQyxRQUFRLENBQUcsQ0FBRSxDQUFDO2FBQzFEO1NBQ0Y7UUFDSCxrQkFBQztJQUFELENBQUM7O0lDNURELElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxVQUFVLENBQUUsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBRSxDQUFDO0lBSzFEOzs7Ozs7O1FBd0NFLHNCQUFvQixLQUFzQixFQUFFLE9BQXFCO1lBbEN6RCxZQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ1osYUFBUSxHQUFHLENBQUMsQ0FBQztZQWtDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7WUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBRSxTQUFTLENBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFFLGdCQUFnQixDQUFFLENBQUM7U0FDdEM7UUFqQ0Qsc0JBQVcsaUNBQU87Ozs7aUJBQWxCO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUN2Qjs7O1dBQUE7UUFLRCxzQkFBVyw2QkFBRzs7OztpQkFBZDtnQkFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDdkI7OztXQUFBO1FBS0Qsc0JBQVcsK0JBQUs7Ozs7aUJBQWhCO2dCQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUNyQjs7O1dBQUE7UUFLRCxzQkFBVyxnQ0FBTTs7OztpQkFBakI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3RCOzs7V0FBQTs7OztRQWVNLDhCQUFPLEdBQWQ7WUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBRSxDQUFDO1NBQ2pEO1FBUU0sb0NBQWEsR0FBcEIsVUFBc0IsU0FBOEIsRUFBRSxTQUE2QjtZQUE3RCwwQkFBQSxFQUFBLHNCQUE4QjtZQUFFLDBCQUFBLEVBQUEscUJBQTZCO1lBQ3pFLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFFLElBQUksRUFBRTtnQkFDaEMsRUFBRSxDQUFDLGFBQWEsQ0FBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxDQUFFLENBQUM7Z0JBQ3BFLEVBQUUsQ0FBQyxhQUFhLENBQUUsYUFBYSxFQUFFLHFCQUFxQixFQUFFLFNBQVMsQ0FBRSxDQUFDO2FBQ3JFLENBQUUsQ0FBQztTQUNMO1FBUU0sa0NBQVcsR0FBbEIsVUFBb0IsS0FBZ0MsRUFBRSxLQUFxQjtZQUF2RCxzQkFBQSxFQUFBLHdCQUFnQztZQUFFLHNCQUFBLEVBQUEsYUFBcUI7WUFDakUsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUUsSUFBSSxFQUFFO2dCQUNoQyxFQUFFLENBQUMsYUFBYSxDQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLENBQUUsQ0FBQztnQkFDNUQsRUFBRSxDQUFDLGFBQWEsQ0FBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxDQUFFLENBQUM7YUFDN0QsQ0FBRSxDQUFDO1NBQ0w7Ozs7UUFLTSxtQ0FBWSxHQUFuQixVQUNFLEtBQWEsRUFDYixNQUFjLEVBQ2QsRUFBNkQ7Z0JBQTdELHFCQUEyRCxFQUFFLEtBQUEsRUFBM0QsY0FBc0IsRUFBdEIsTUFBTSxtQkFBRyxhQUFhLEtBQUEsRUFBRSxhQUFTLEVBQVQsS0FBSyxtQkFBRyxDQUFDLEtBQUEsRUFBRSxjQUFpQixFQUFqQixNQUFNLG1CQUFHLFFBQVEsS0FBQTtZQUU5QyxJQUFBLEVBQUUsR0FBSyxJQUFJLENBQUMsT0FBTyxHQUFqQixDQUFrQjtZQUU1QixJQUNFLE9BQU8sc0JBQXNCLEtBQUssVUFBVTtnQkFDNUMsRUFBRSxZQUFZLHNCQUFzQixFQUNwQztnQkFDQSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBRSxJQUFJLEVBQUU7b0JBQ2hDLEVBQUUsQ0FBQyxZQUFZLENBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBRSxDQUFDO2lCQUN6RCxDQUFFLENBQUM7YUFDTDtpQkFBTTtnQkFDTCxNQUFNLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQzthQUN4QztTQUNGOzs7OztRQU1NLG1DQUFZLEdBQW5CLFVBQXFCLEtBQWE7WUFDeEIsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBRSxJQUFJLEVBQUU7Z0JBQ3ZDLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBRSxLQUFLLENBQUUsQ0FBQzthQUNqQyxDQUFFLENBQUM7U0FDTDs7Ozs7UUFNTSxrQ0FBVyxHQUFsQixVQUFvQixLQUFhLEVBQUUsS0FBdUI7WUFDaEQsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUUsSUFBSSxFQUFFO2dCQUNoQyxFQUFFLENBQUMsV0FBVyxDQUFFLEtBQUssRUFBRSxLQUFLLENBQUUsQ0FBQzthQUNoQyxDQUFFLENBQUM7U0FDTDs7OztRQUtNLGlDQUFVLEdBQWpCLFVBQW1CLE1BQXNCO1lBQy9CLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFFLElBQUksRUFBRTtnQkFDaEMsRUFBRSxDQUFDLFVBQVUsQ0FBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBRSxDQUFDO2FBQy9FLENBQUUsQ0FBQztZQUVKLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDL0I7Ozs7O1FBTU0sMENBQW1CLEdBQTFCLFVBQ0UsS0FBYSxFQUNiLE1BQWMsRUFDZCxNQUE4QixFQUM5QixFQUlNO2dCQUpOLHFCQUlJLEVBQUUsS0FBQSxFQUhKLHNCQUF5QixFQUF6QixjQUFjLG1CQUFHLFFBQVEsS0FBQSxFQUN6QixjQUFnQixFQUFoQixNQUFNLG1CQUFHLE9BQU8sS0FBQSxFQUNoQixZQUF1QixFQUF2QixJQUFJLG1CQUFHLGdCQUFnQixLQUFBO1lBR2pCLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQUksT0FBTyxHQUFHLGNBQWMsQ0FBQztZQUM3QixJQUNFLE9BQU8sc0JBQXNCLEtBQUssVUFBVTtnQkFDNUMsRUFBRSxZQUFZLHNCQUFzQixFQUNwQzs7Z0JBRUEsSUFDRSxjQUFjLEtBQUssT0FBTzt1QkFDdkIsY0FBYyxLQUFLLE9BQU87dUJBQzFCLGNBQWMsS0FBSyxVQUFVO3VCQUM3QixjQUFjLEtBQUssVUFBVSxFQUNoQztvQkFDQSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBRSx3QkFBd0IsRUFBRSxJQUFJLENBQUUsQ0FBQztvQkFDNUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUUsaUJBQWlCLENBQUUsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUUsMEJBQTBCLENBQUUsQ0FBQztpQkFDekQ7YUFDRjtpQkFBTTtnQkFDTCxJQUFLLElBQUksS0FBSyxhQUFhLEVBQUc7b0JBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFFLHdCQUF3QixFQUFFLElBQUksQ0FBRSxDQUFDO29CQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBRSwrQkFBK0IsQ0FBRSxDQUFDO2lCQUM5RDtxQkFBTSxJQUFLLElBQUksS0FBSyxRQUFRLEVBQUc7b0JBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBRSxDQUFDO29CQUN2RCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBRSwwQkFBMEIsQ0FBRSxDQUFDO2lCQUN6RDtnQkFFRCxPQUFPLEdBQUcsTUFBTSxDQUFDO2FBQ2xCO1lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUUsSUFBSSxFQUFFO2dCQUNoQyxFQUFFLENBQUMsVUFBVSxDQUNYLGFBQWEsRUFDYixDQUFDLEVBQ0QsT0FBTyxFQUNQLEtBQUssRUFDTCxNQUFNLEVBQ04sQ0FBQyxFQUNELE1BQU0sRUFDTixJQUFJLEVBQ0osTUFBTSxDQUNQLENBQUM7YUFDSCxDQUFFLENBQUM7WUFFSixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztTQUN4Qjs7OztRQUtNLGtDQUFXLEdBQWxCLFVBQW9CLEtBQWEsRUFBRSxNQUFjO1lBQ3ZDLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFFLElBQUksRUFBRTtnQkFDaEMsRUFBRSxDQUFDLGNBQWMsQ0FBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFFLENBQUM7YUFDeEUsQ0FBRSxDQUFDO1lBRUosSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7U0FDeEI7Ozs7OztRQU9NLGlDQUFVLEdBQWpCLFVBQW1CLFFBQTBCO1lBQ25DLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUUsSUFBSSxFQUFFO2dCQUNyQyxLQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRyxFQUFHO29CQUM3QixFQUFFLENBQUMsVUFBVSxDQUNYLDhCQUE4QixHQUFHLENBQUMsRUFDbEMsQ0FBQyxFQUNELE9BQU8sRUFDUCxPQUFPLEVBQ1AsZ0JBQWdCLEVBQ2hCLFFBQVEsQ0FBRSxDQUFDLENBQUUsQ0FDZCxDQUFDO2lCQUNIO2dCQUNELEVBQUUsQ0FBQyxhQUFhLENBQUUsbUJBQW1CLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxDQUFFLENBQUM7Z0JBQzFFLEVBQUUsQ0FBQyxhQUFhLENBQUUsbUJBQW1CLEVBQUUscUJBQXFCLEVBQUUsU0FBUyxDQUFFLENBQUM7Z0JBQzFFLEVBQUUsQ0FBQyxhQUFhLENBQUUsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLENBQUUsQ0FBQztnQkFDN0UsRUFBRSxDQUFDLGFBQWEsQ0FBRSxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBRSxDQUFDO2FBQzlFLENBQUUsQ0FBQztTQUNMOzs7OztRQU1NLHFDQUFjLEdBQXJCO1lBQ0UsSUFBSSxDQUFDLG1CQUFtQixDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsZ0JBQWdCLENBQUUsQ0FBQztTQUNwRDtRQUNILG1CQUFDO0lBQUQsQ0FBQzs7SUNoUUQ7Ozs7Ozs7UUF3QkUsZ0NBQW9CLEtBQXNCLEVBQUUsaUJBQXlDO1lBQ25GLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQztTQUM5QztRQWpCRCxzQkFBVyxxREFBaUI7Ozs7aUJBQTVCO2dCQUNFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO2FBQ2pDOzs7V0FBQTtRQUtELHNCQUFXLHVDQUFHOzs7O2lCQUFkO2dCQUNFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO2FBQ2pDOzs7V0FBQTs7OztRQWFNLHdDQUFPLEdBQWQ7WUFDVSxJQUFBLEVBQUUsR0FBSyxJQUFJLENBQUMsT0FBTyxHQUFqQixDQUFrQjtZQUU1QixJQUNFLE9BQU8sc0JBQXNCLEtBQUssVUFBVTtnQkFDNUMsRUFBRSxZQUFZLHNCQUFzQixFQUNwQztnQkFDQSxFQUFFLENBQUMsdUJBQXVCLENBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFFLENBQUM7YUFDeEQ7U0FDRjs7OztRQUtNLDJDQUFVLEdBQWpCLFVBQW1CLEtBQWEsRUFBRSxNQUFvQztZQUM1RCxJQUFBLEVBQUUsR0FBSyxJQUFJLENBQUMsT0FBTyxHQUFqQixDQUFrQjtZQUU1QixJQUNFLE9BQU8sc0JBQXNCLEtBQUssVUFBVTtnQkFDNUMsRUFBRSxZQUFZLHNCQUFzQixFQUNwQztnQkFDQSxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFFLElBQUksRUFBRTs7b0JBQ3hDLEVBQUUsQ0FBQyxjQUFjLENBQUUsRUFBRSxDQUFDLHlCQUF5QixFQUFFLEtBQUssUUFBRSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsTUFBTSxtQ0FBSSxJQUFJLENBQUUsQ0FBQztpQkFDbEYsQ0FBRSxDQUFDO2FBQ0w7U0FDRjtRQUNILDZCQUFDO0lBQUQsQ0FBQzs7SUN6REQ7Ozs7Ozs7UUF3QkUsMEJBQW9CLEtBQXNCLEVBQUUsV0FBOEM7WUFDeEYsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7U0FDbEM7UUFqQkQsc0JBQVcsb0NBQU07Ozs7aUJBQWpCO2dCQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQzthQUMzQjs7O1dBQUE7UUFLRCxzQkFBVyxpQ0FBRzs7OztpQkFBZDtnQkFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7YUFDM0I7OztXQUFBOzs7O1FBYU0sa0NBQU8sR0FBZDtZQUNVLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQ0UsT0FBTyxzQkFBc0IsS0FBSyxVQUFVO2dCQUM1QyxFQUFFLFlBQVksc0JBQXNCLEVBQ3BDO2dCQUNBLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFFLENBQUM7YUFDNUM7aUJBQU07Z0JBQ0wsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUUseUJBQXlCLEVBQUUsSUFBSSxDQUFFLENBQUM7Z0JBQ3pFLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBRSxJQUFJLENBQUMsYUFBb0IsQ0FBRSxDQUFDO2FBQ3ZEO1NBQ0Y7Ozs7UUFLTSwyQ0FBZ0IsR0FBdkIsVUFDRSxNQUE2QixFQUM3QixRQUFnQixFQUNoQixJQUFRLEVBQ1IsT0FBVyxFQUNYLElBQXVCLEVBQ3ZCLE1BQVUsRUFDVixNQUFVO1lBUFosaUJBNEJDO1lBekJDLHFCQUFBLEVBQUEsUUFBUTtZQUNSLHdCQUFBLEVBQUEsV0FBVztZQUNYLHFCQUFBLEVBQUEsZUFBdUI7WUFDdkIsdUJBQUEsRUFBQSxVQUFVO1lBQ1YsdUJBQUEsRUFBQSxVQUFVO1lBRUYsSUFBQSxFQUFFLEdBQUssSUFBSSxDQUFDLE9BQU8sR0FBakIsQ0FBa0I7WUFFNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUUsSUFBSSxFQUFFO2dCQUNsQyxFQUFFLENBQUMsVUFBVSxDQUFFLGVBQWUsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFFLENBQUM7Z0JBQzdDLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBRSxRQUFRLENBQUUsQ0FBQztnQkFDdkMsRUFBRSxDQUFDLG1CQUFtQixDQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7Z0JBRXRFLElBQ0UsT0FBTyxzQkFBc0IsS0FBSyxVQUFVO29CQUM1QyxFQUFFLFlBQVksc0JBQXNCLEVBQ3BDO29CQUNBLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBRSxRQUFRLEVBQUUsT0FBTyxDQUFFLENBQUM7aUJBQzdDO3FCQUFNO29CQUNMLElBQU0sR0FBRyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFFLHdCQUF3QixDQUFFLENBQUM7b0JBQ2xFLElBQUssR0FBRyxFQUFHO3dCQUNULEdBQUcsQ0FBQyx3QkFBd0IsQ0FBRSxRQUFRLEVBQUUsT0FBTyxDQUFFLENBQUM7cUJBQ25EO2lCQUNGO2FBQ0YsQ0FBRSxDQUFDO1NBQ0w7Ozs7UUFLTSwwQ0FBZSxHQUF0QixVQUNFLE1BQTZCO1lBRXJCLElBQUEsRUFBRSxHQUFLLElBQUksQ0FBQyxPQUFPLEdBQWpCLENBQWtCO1lBRTVCLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFFLElBQUksRUFBRTtnQkFDbEMsRUFBRSxDQUFDLFVBQVUsQ0FBRSx1QkFBdUIsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFFLENBQUM7YUFDdEQsQ0FBRSxDQUFDO1NBQ0w7UUFDSCx1QkFBQztJQUFELENBQUM7O0lDNUVEOzs7Ozs7OztRQTZIRSxlQUFvQixFQUFZO1lBQWhDLGlCQWdCQztZQWpJTSxnQ0FBMkIsR0FBRyxDQUFDLENBQUM7WUFNL0IsNkJBQXdCLEdBQUcsSUFBSSxVQUFVLENBQy9DLElBQUksRUFDSixVQUFFLE1BQU07O2dCQUNOLElBQU0sRUFBRSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLEVBQUUsQ0FBQyxVQUFVLENBQUUsZUFBZSxRQUFFLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxHQUFHLG1DQUFJLElBQUksQ0FBRSxDQUFDO2FBQ3ZELENBQ0YsQ0FBQztZQUVNLDRCQUF1QixHQUFHLElBQUksVUFBVSxDQUM5QyxJQUFJLEVBQ0osVUFBRSxNQUFNOztnQkFDTixJQUFNLEVBQUUsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNyQixFQUFFLENBQUMsVUFBVSxDQUFFLHVCQUF1QixRQUFFLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxHQUFHLG1DQUFJLElBQUksQ0FBRSxDQUFDO2FBQy9ELENBQ0YsQ0FBQztZQUVNLGtDQUE2QixHQUFHLElBQUksVUFBVSxDQUNwRCxJQUFJLEVBQ0osVUFBRSxNQUFNOztnQkFDTixJQUFNLEVBQUUsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDO2dCQUVyQixJQUNFLE9BQU8sc0JBQXNCLEtBQUssVUFBVTtvQkFDNUMsRUFBRSxZQUFZLHNCQUFzQixFQUNwQztvQkFDQSxFQUFFLENBQUMscUJBQXFCLENBQUUscUJBQXFCLFFBQUUsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEdBQUcsbUNBQUksSUFBSSxDQUFFLENBQUM7aUJBQ3hFO3FCQUFNO29CQUNMLE1BQU0sV0FBVyxDQUFDLG9CQUFvQixDQUFDO2lCQUN4QzthQUNGLENBQ0YsQ0FBQztZQUVNLDRCQUF1QixHQUFHLElBQUksVUFBVSxDQUM5QyxJQUFJLEVBQ0osVUFBRSxXQUFXOztnQkFDWCxLQUFJLENBQUMsa0JBQWtCLE9BQUUsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLEdBQUcsbUNBQUksSUFBSSxDQUFFLENBQUM7YUFDckQsQ0FDRixDQUFDO1lBRU0sMEJBQXFCLEdBQUcsSUFBSSxVQUFVLENBQzVDLElBQUksRUFDSixVQUFFLE9BQU87O2dCQUNQLElBQU0sRUFBRSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLEVBQUUsQ0FBQyxXQUFXLENBQUUsYUFBYSxRQUFFLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxHQUFHLG1DQUFJLElBQUksQ0FBRSxDQUFDO2FBQ3ZELENBQ0YsQ0FBQztZQUVNLCtCQUEwQixHQUFHLElBQUksVUFBVSxDQUNqRCxJQUFJLEVBQ0osVUFBRSxPQUFPOztnQkFDUCxJQUFNLEVBQUUsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNyQixFQUFFLENBQUMsV0FBVyxDQUFFLG1CQUFtQixRQUFFLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxHQUFHLG1DQUFJLElBQUksQ0FBRSxDQUFDO2FBQzdELENBQ0YsQ0FBQztZQUVNLDZCQUF3QixHQUFHLElBQUksVUFBVSxDQUMvQyxJQUFJLEVBQ0osVUFBRSxZQUFZOztnQkFDWixJQUFNLEVBQUUsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNyQixFQUFFLENBQUMsZ0JBQWdCLENBQUUsZUFBZSxRQUFFLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxHQUFHLG1DQUFJLElBQUksQ0FBRSxDQUFDO2FBQ25FLENBQ0YsQ0FBQztZQUVNLDRCQUF1QixHQUFHLElBQUksVUFBVSxDQUM5QyxJQUFJLEVBQ0osVUFBRSxXQUFXOztnQkFDWCxJQUFNLEVBQUUsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNyQixFQUFFLENBQUMsZUFBZSxDQUFFLGNBQWMsUUFBRSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsR0FBRyxtQ0FBSSxJQUFJLENBQUUsQ0FBQzthQUNoRSxDQUNGLENBQUM7WUFFTSx3QkFBbUIsR0FBRyxJQUFJLFVBQVUsQ0FDMUMsSUFBSSxFQUNKLFVBQUUsT0FBTzs7Z0JBQ1AsSUFBTSxFQUFFLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQztnQkFDckIsRUFBRSxDQUFDLFVBQVUsT0FBRSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsR0FBRyxtQ0FBSSxJQUFJLENBQUUsQ0FBQzthQUN2QyxDQUNGLENBQUM7WUFFTSw0QkFBdUIsR0FBRyxJQUFJLFVBQVUsQ0FDOUMsQ0FBRSxvQkFBb0IsQ0FBRSxFQUN4QixVQUFFLE9BQU87Z0JBQ1AsS0FBSSxDQUFDLGNBQWMsQ0FBRSxPQUFPLENBQUUsQ0FBQzthQUNoQyxDQUNGLENBQUM7WUFFTSxxQkFBZ0IsR0FBeUMsRUFBRSxDQUFDO1lBc0JsRSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUVmLEVBQUUsQ0FBQyxNQUFNLENBQUUsYUFBYSxDQUFFLENBQUM7WUFDM0IsRUFBRSxDQUFDLFNBQVMsQ0FBRSxTQUFTLENBQUUsQ0FBQztZQUMxQixFQUFFLENBQUMsTUFBTSxDQUFFLFFBQVEsQ0FBRSxDQUFDO1lBQ3RCLEVBQUUsQ0FBQyxTQUFTLENBQUUsWUFBWSxFQUFFLHNCQUFzQixDQUFFLENBQUM7WUFFckQsSUFDRSxPQUFPLHNCQUFzQixLQUFLLFVBQVU7Z0JBQzVDLEVBQUUsWUFBWSxzQkFBc0IsRUFDcEM7Z0JBQ0EsSUFBSSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO2FBQ2xEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQzthQUNsRDtTQUNGO1FBeklhLGlCQUFXLEdBQXpCLFVBQThCLENBQVc7WUFDdkMsSUFBSyxDQUFDLElBQUksSUFBSSxFQUFHO2dCQUNmLE1BQU0sV0FBVyxDQUFDLG1CQUFtQixDQUFDO2FBQ3ZDO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxDQUFDO2FBQ1Y7U0FDRjtRQW9HRCxzQkFBVyxtQ0FBZ0I7Ozs7aUJBQTNCO2dCQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQzthQUNsQjs7O1dBQUE7UUFLRCxzQkFBVyxxQkFBRTs7OztpQkFBYjtnQkFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDbEI7OztXQUFBO1FBMkJELHNCQUFXLCtCQUFZOzs7O2lCQUF2QjtnQkFDRSxJQUFLLElBQUksQ0FBQyxtQkFBbUIsRUFBRztvQkFDOUIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7aUJBQ2pDO2dCQUVELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFckMsT0FBTyxDQUFDLG1CQUFtQixDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxVQUFVLENBQUUsQ0FBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUUsQ0FBRSxDQUFFLENBQUM7Z0JBQzVFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUM7Z0JBQ25DLE9BQU8sT0FBTyxDQUFDO2FBQ2hCOzs7V0FBQTtRQStETSw0QkFBWSxHQUFuQixVQUFxQixJQUFZLEVBQUUsZUFBeUI7WUFDMUQsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUVyQixJQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBRSxJQUFJLENBQUUsRUFBRztnQkFDbkMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUUsSUFBSSxDQUFFLENBQUM7YUFDdEM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFFLElBQUksQ0FBRSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUUsSUFBSSxDQUFFLENBQUM7Z0JBQ3hELElBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFFLElBQUksQ0FBRSxFQUFHO29CQUNuQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBRSxJQUFJLENBQUUsQ0FBQztpQkFDdEM7cUJBQU07b0JBQ0wsSUFBSyxlQUFlLEVBQUc7d0JBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUUscUNBQXFDLEdBQUcsSUFBSSxHQUFHLG9CQUFvQixDQUFFLENBQUM7cUJBQ3hGO29CQUNELE9BQU8sSUFBSSxDQUFDO2lCQUNiO2FBQ0Y7U0FDRjs7Ozs7UUFNTSw2QkFBYSxHQUFwQixVQUFzQixLQUFlLEVBQUUsZUFBeUI7WUFBaEUsaUJBRUM7WUFEQyxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUUsVUFBRSxDQUFDLElBQU0sT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFFLENBQUMsRUFBRSxlQUFlLENBQUUsR0FBQSxDQUFFLENBQUM7U0FDdEU7Ozs7UUFLTSw0QkFBWSxHQUFuQixVQUFxQixJQUFZO1lBQy9CLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFckIsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBRSxFQUFFLENBQUMsWUFBWSxDQUFFLElBQUksQ0FBRSxDQUFFLENBQUM7WUFFNUQsT0FBTyxJQUFJLFdBQVcsQ0FBRSxJQUFJLEVBQUUsTUFBTSxDQUFFLENBQUM7U0FDeEM7Ozs7UUFLTSw2QkFBYSxHQUFwQjtZQUNFLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFckIsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBRSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUUsQ0FBQztZQUV4RCxPQUFPLElBQUksWUFBWSxDQUFFLElBQUksRUFBRSxPQUFPLENBQUUsQ0FBQztTQUMxQzs7OztRQUtNLDJCQUFXLEdBQWxCLFVBQ0UsSUFBWSxFQUNaLElBQVksRUFDWixPQUFxQztZQUFyQyx3QkFBQSxFQUFBLFlBQXFDO1lBRXJDLElBQUksWUFBK0MsQ0FBQztZQUlwRCxJQUFJOztnQkFFRixZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBRSxnQkFBZ0IsQ0FBRSxDQUFDO2dCQUNyRCxZQUFZLENBQUMsT0FBTyxDQUFFLElBQUksQ0FBRSxDQUFDOztnQkFHN0IsSUFBTSxnQkFBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUUsa0JBQWtCLENBQUUsQ0FBQztnQkFDL0QsZ0JBQWMsQ0FBQyxPQUFPLENBQUUsSUFBSSxDQUFFLENBQUM7O2dCQUcvQixJQUFNLFNBQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3JDLFNBQU8sQ0FBQyxJQUFJLENBQUUsQ0FBRSxZQUFZLEVBQUUsZ0JBQWMsQ0FBRSxFQUFFLE9BQU8sQ0FBRSxDQUFDOztnQkFHMUQsT0FBTyxTQUFPLENBQUM7YUFDaEI7WUFBQyxPQUFRLENBQUMsRUFBRztnQkFHWixZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsT0FBTyxHQUFHO2dCQUN4QixNQUFNLENBQUMsQ0FBQzthQUNUO1NBQ0Y7Ozs7O1FBTU0sZ0NBQWdCLEdBQXZCLFVBQ0UsSUFBWSxFQUNaLElBQVksRUFDWixPQUFxQztZQUFyQyx3QkFBQSxFQUFBLFlBQXFDO1lBTXJDLElBQUk7O2dCQUVGLElBQU0sY0FBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUUsZ0JBQWdCLENBQUUsQ0FBQztnQkFDM0QsY0FBWSxDQUFDLE9BQU8sQ0FBRSxJQUFJLENBQUUsQ0FBQzs7Z0JBRzdCLElBQU0sZ0JBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFFLGtCQUFrQixDQUFFLENBQUM7Z0JBQy9ELGdCQUFjLENBQUMsT0FBTyxDQUFFLElBQUksQ0FBRSxDQUFDOztnQkFHL0IsSUFBTSxTQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyQyxPQUFPLFNBQU8sQ0FBQyxTQUFTLENBQUUsQ0FBRSxjQUFZLEVBQUUsZ0JBQWMsQ0FBRSxFQUFFLE9BQU8sQ0FBRSxDQUFDLElBQUksQ0FBRTtvQkFDMUUsT0FBTyxTQUFPLENBQUM7aUJBQ2hCLENBQUUsQ0FBQyxLQUFLLENBQUUsVUFBRSxDQUFDO29CQUNaLFNBQU8sYUFBUCxTQUFPLHVCQUFQLFNBQU8sQ0FBRSxPQUFPLEdBQUc7b0JBQ25CLGdCQUFjLGFBQWQsZ0JBQWMsdUJBQWQsZ0JBQWMsQ0FBRSxPQUFPLEdBQUc7b0JBQzFCLGNBQVksYUFBWixjQUFZLHVCQUFaLGNBQVksQ0FBRSxPQUFPLEdBQUc7b0JBQ3hCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUUsQ0FBQztpQkFDNUIsQ0FBRSxDQUFDO2FBQ0w7WUFBQyxPQUFRLENBQUMsRUFBRztnQkFJWixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFFLENBQUM7YUFDNUI7U0FDRjs7Ozs7UUFNTSwwQkFBVSxHQUFqQixVQUNFLE9BQXNDLEVBQ3RDLFFBQTBEO1lBRTFELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBRSxPQUFPLEVBQUUsUUFBUSxDQUFFLENBQUM7U0FDM0Q7Ozs7UUFLTSw0QkFBWSxHQUFuQjtZQUNFLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFckIsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBRSxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUUsQ0FBQztZQUV0RCxPQUFPLElBQUksV0FBVyxDQUFFLElBQUksRUFBRSxNQUFNLENBQUUsQ0FBQztTQUN4Qzs7Ozs7UUFNTSxnQ0FBZ0IsR0FBdkIsVUFDRSxNQUFvQyxFQUNwQyxRQUF3RDtZQUV4RCxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBRSxDQUFDO1NBQy9EOzs7OztRQU1NLCtCQUFlLEdBQXRCLFVBQ0UsTUFBb0MsRUFDcEMsUUFBd0Q7WUFFeEQsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFFLE1BQU0sRUFBRSxRQUFRLENBQUUsQ0FBQztTQUM5RDs7OztRQUtNLHVDQUF1QixHQUE5QjtZQUNFLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFckIsSUFDRSxPQUFPLHNCQUFzQixLQUFLLFVBQVU7Z0JBQzVDLEVBQUUsWUFBWSxzQkFBc0IsRUFDcEM7Z0JBQ0EsSUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFFLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFFLENBQUM7Z0JBRTVFLE9BQU8sSUFBSSxzQkFBc0IsQ0FBRSxJQUFJLEVBQUUsaUJBQWlCLENBQUUsQ0FBQzthQUM5RDtpQkFBTTtnQkFDTCxNQUFNLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQzthQUN4QztTQUNGOzs7OztRQU1NLHFDQUFxQixHQUE1QixVQUNFLGlCQUEwRCxFQUMxRCxRQUE4RTtZQUU5RSxPQUFPLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUUsaUJBQWlCLEVBQUUsUUFBUSxDQUFFLENBQUM7U0FDL0U7Ozs7UUFLTSxpQ0FBaUIsR0FBeEI7WUFDRSxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRXJCLElBQ0UsT0FBTyxzQkFBc0IsS0FBSyxVQUFVO2dCQUM1QyxFQUFFLFlBQVksc0JBQXNCLEVBQ3BDO2dCQUNBLElBQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUUsQ0FBQztnQkFFaEUsT0FBTyxJQUFJLGdCQUFnQixDQUFFLElBQUksRUFBRSxXQUFrQixDQUFFLENBQUM7YUFDekQ7aUJBQU07Z0JBQ0wsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBRSx5QkFBeUIsRUFBRSxJQUFJLENBQUUsQ0FBQztnQkFFakUsSUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBRSxHQUFHLENBQUMsb0JBQW9CLEVBQUUsQ0FBRSxDQUFDO2dCQUVwRSxPQUFPLElBQUksZ0JBQWdCLENBQUUsSUFBSSxFQUFFLFdBQWtCLENBQUUsQ0FBQzthQUN6RDtTQUNGOzs7Ozs7UUFPTSxrQ0FBa0IsR0FBekIsVUFBMkIsS0FBK0M7WUFDeEUsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUVyQixJQUNFLE9BQU8sc0JBQXNCLEtBQUssVUFBVTtnQkFDNUMsRUFBRSxZQUFZLHNCQUFzQixFQUNwQztnQkFDQSxFQUFFLENBQUMsZUFBZSxDQUFFLEtBQUssQ0FBRSxDQUFDO2FBQzdCO2lCQUFNO2dCQUNMLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUUseUJBQXlCLEVBQUUsSUFBSSxDQUFFLENBQUM7Z0JBQ2pFLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBRSxLQUFZLENBQUUsQ0FBQzthQUN4QztTQUNGOzs7Ozs7O1FBUU0sK0JBQWUsR0FBdEIsVUFDRSxXQUE4QyxFQUM5QyxRQUFrRTtZQUVsRSxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBRSxDQUFDO1NBQ25FOzs7O1FBS00sNkJBQWEsR0FBcEI7WUFDRSxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRXJCLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUUsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFFLENBQUM7WUFFeEQsT0FBTyxJQUFJLFlBQVksQ0FBRSxJQUFJLEVBQUUsT0FBTyxDQUFFLENBQUM7U0FDMUM7Ozs7O1FBTU0sNkJBQWEsR0FBcEIsVUFDRSxPQUFzQyxFQUN0QyxRQUEwRDtZQUUxRCxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBRSxDQUFDO1NBQzdEOzs7OztRQU1NLGtDQUFrQixHQUF6QixVQUNFLE9BQXNDLEVBQ3RDLFFBQTBEO1lBRTFELE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBRSxPQUFPLEVBQUUsUUFBUSxDQUFFLENBQUM7U0FDbEU7Ozs7UUFLTSxrQ0FBa0IsR0FBekI7WUFDRSxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRXJCLElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUUsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUUsQ0FBQztZQUVsRSxPQUFPLElBQUksaUJBQWlCLENBQUUsSUFBSSxFQUFFLFlBQVksQ0FBRSxDQUFDO1NBQ3BEOzs7OztRQU1NLGdDQUFnQixHQUF2QixVQUNFLFlBQWdELEVBQ2hELFFBQW9FO1lBRXBFLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBRSxZQUFZLEVBQUUsUUFBUSxDQUFFLENBQUM7U0FDckU7Ozs7UUFLTSxpQ0FBaUIsR0FBeEI7WUFDRSxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRXJCLElBQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUUsQ0FBQztZQUVoRSxPQUFPLElBQUksZ0JBQWdCLENBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBRSxDQUFDO1NBQ2xEOzs7OztRQU1NLCtCQUFlLEdBQXRCLFVBQ0UsV0FBOEMsRUFDOUMsUUFBa0U7WUFFbEUsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFFLFdBQVcsRUFBRSxRQUFRLENBQUUsQ0FBQztTQUNuRTs7OztRQUtNLCtCQUFlLEdBQXRCLFVBQ0UsS0FBYSxFQUNiLE1BQWMsRUFDZCxFQUdNO2dCQUhOLHFCQUdJLEVBQUUsS0FBQSxFQUZKLGVBQWUsRUFBZixPQUFPLG1CQUFHLEtBQUssS0FBQSxFQUNmLG1CQUF1QyxFQUF2QyxXQUFXLG1CQUFHLElBQUksQ0FBQyxvQkFBb0IsS0FBQTtZQUd6QyxJQUFJLE9BQTJDLENBQUM7WUFDaEQsSUFBSSxZQUFxRCxDQUFDO1lBQzFELElBQUksV0FBbUQsQ0FBQztZQUV4RCxJQUFJOztnQkFFRixXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7O2dCQUd2QyxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQ3pDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFFLENBQUM7Z0JBQzNFLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBRSxZQUFZLEVBQUUsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsQ0FBRSxDQUFDOztnQkFHcEYsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDL0IsSUFBSyxPQUFPLEVBQUc7b0JBQ2IsT0FBTyxDQUFDLG1CQUFtQixDQUN6QixLQUFLLEVBQ0wsTUFBTSxFQUNOLElBQUksRUFDSixFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQ2hFLENBQUM7aUJBQ0g7cUJBQU07b0JBQ0wsT0FBTyxDQUFDLG1CQUFtQixDQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFFLENBQUM7aUJBQ3BEO2dCQUNELFdBQVcsQ0FBQyxhQUFhLENBQUUsT0FBTyxDQUFFLENBQUM7O2dCQUdyQyxPQUFPLFdBQVcsQ0FBQzthQUNwQjtZQUFDLE9BQVEsQ0FBQyxFQUFHO2dCQUNaLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxPQUFPLEdBQUc7Z0JBQ3ZCLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxPQUFPLEdBQUc7Z0JBQ25CLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxPQUFPLEdBQUc7Z0JBQ3hCLE1BQU0sQ0FBQyxDQUFDO2FBQ1Q7U0FDRjs7OztRQUtNLDBDQUEwQixHQUFqQyxVQUNFLEtBQWEsRUFDYixNQUFjLEVBQ2QsRUFLTTtnQkFMTixxQkFLSSxFQUFFLEtBQUEsRUFKSixlQUFXLEVBQVgsT0FBTyxtQkFBRyxDQUFDLEtBQUEsRUFDWCxlQUFlLEVBQWYsT0FBTyxtQkFBRyxLQUFLLEtBQUEsRUFDZixtQkFBdUMsRUFBdkMsV0FBVyxtQkFBRyxJQUFJLENBQUMsb0JBQW9CLEtBQUEsRUFDdkMsc0JBQXFCLEVBQXJCLGNBQWMsbUJBQUcsSUFBSSxLQUFBO1lBR3ZCLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFckIsSUFDRSxPQUFPLHNCQUFzQixLQUFLLFVBQVU7Z0JBQzVDLEVBQUUsWUFBWSxzQkFBc0IsRUFDcEM7Z0JBQ0EsSUFBSSxPQUFPLFNBQW9DLENBQUM7Z0JBQ2hELElBQUksaUJBQWlCLFNBQXlDLENBQUM7Z0JBQy9ELElBQUksaUJBQWlCLFNBQXlDLENBQUM7Z0JBQy9ELElBQUksV0FBVyxTQUF3QyxDQUFDO2dCQUV4RCxJQUFJOztvQkFFRixXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7O29CQUd2QyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztvQkFDOUMsaUJBQWlCLENBQUMsOEJBQThCLENBQzlDLEtBQUssRUFDTCxNQUFNLEVBQ04sRUFBRSxPQUFPLFNBQUEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQ2pDLENBQUM7b0JBQ0YsV0FBVyxDQUFDLGtCQUFrQixDQUFFLGlCQUFpQixFQUFFLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLENBQUUsQ0FBQzs7b0JBR3pGLElBQU0sbUJBQWlCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7b0JBQ3BELElBQU0sV0FBVyxHQUFHLE9BQU8sR0FBRyxVQUFVLEdBQUcsUUFBUSxDQUFDO29CQUNwRCxtQkFBaUIsQ0FBQyw4QkFBOEIsQ0FDOUMsS0FBSyxFQUNMLE1BQU0sRUFDTixFQUFFLE9BQU8sU0FBQSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FDakMsQ0FBQztvQkFDRixXQUFXLENBQUMsa0JBQWtCLENBQUUsbUJBQWlCLEVBQUUsRUFBRSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsQ0FBRSxDQUFDOztvQkFHMUYsT0FBTyxXQUFXLENBQUM7aUJBQ3BCO2dCQUFDLE9BQVEsQ0FBQyxFQUFHO29CQUNaLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxPQUFPLEdBQUc7b0JBQ3ZCLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxPQUFPLEdBQUc7b0JBQ25CLGlCQUFpQixhQUFqQixpQkFBaUIsdUJBQWpCLGlCQUFpQixDQUFFLE9BQU8sR0FBRztvQkFDN0IsaUJBQWlCLGFBQWpCLGlCQUFpQix1QkFBakIsaUJBQWlCLENBQUUsT0FBTyxHQUFHO29CQUM3QixNQUFNLENBQUMsQ0FBQztpQkFDVDthQUNGO2lCQUFNLElBQUssY0FBYyxFQUFHO2dCQUMzQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUUsQ0FBQzthQUMzRDtpQkFBTTtnQkFDTCxNQUFNLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQzthQUN4QztTQUNGOzs7OztRQU1NLCtCQUFlLEdBQXRCLFVBQ0UsS0FBYSxFQUNiLE1BQWMsRUFDZCxVQUFrQixFQUNsQixFQUdNO2dCQUhOLHFCQUdJLEVBQUUsS0FBQSxFQUZKLGVBQWUsRUFBZixPQUFPLG1CQUFHLEtBQUssS0FBQSxFQUNmLG1CQUF1QyxFQUF2QyxXQUFXLG1CQUFHLElBQUksQ0FBQyxvQkFBb0IsS0FBQTtZQUd6QyxJQUFLLG1CQUFtQixHQUFHLFVBQVUsRUFBRztnQkFDdEMsTUFBTSxJQUFJLEtBQUssQ0FBRSw0Q0FBNEMsQ0FBRSxDQUFDO2FBQ2pFO1lBRUQsSUFBTSxRQUFRLEdBQTZCLEVBQUUsQ0FBQztZQUU5QyxJQUFJLFdBQW1ELENBQUM7WUFFeEQsSUFBSTs7Z0JBRUYsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDOztnQkFHdkMsSUFBTSxjQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQy9DLGNBQVksQ0FBQyxtQkFBbUIsQ0FBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFFLENBQUM7Z0JBQzNFLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBRSxjQUFZLEVBQUUsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsQ0FBRSxDQUFDOztnQkFHcEYsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUcsRUFBRztvQkFDdEMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUNyQyxJQUFLLE9BQU8sRUFBRzt3QkFDYixPQUFPLENBQUMsbUJBQW1CLENBQ3pCLEtBQUssRUFDTCxNQUFNLEVBQ04sSUFBSSxFQUNKLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FDaEUsQ0FBQztxQkFDSDt5QkFBTTt3QkFDTCxPQUFPLENBQUMsbUJBQW1CLENBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUUsQ0FBQztxQkFDcEQ7b0JBQ0QsV0FBVyxDQUFDLGFBQWEsQ0FBRSxPQUFPLEVBQUUsRUFBRSxVQUFVLEVBQUUsb0JBQW9CLEdBQUcsQ0FBQyxFQUFFLENBQUUsQ0FBQztpQkFDaEY7O2dCQUdELE9BQU8sV0FBVyxDQUFDO2FBQ3BCO1lBQUMsT0FBUSxDQUFDLEVBQUc7Z0JBQ1osUUFBUSxDQUFDLE9BQU8sQ0FBRSxVQUFFLE9BQU87b0JBQ3pCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDbkIsQ0FBRSxDQUFDO2dCQUVKLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxPQUFPLEdBQUc7Z0JBQ3ZCLE1BQU0sQ0FBQyxDQUFDO2FBQ1Q7U0FDRjs7Ozs7O1FBT00sOEJBQWMsR0FBckIsVUFBdUIsT0FBaUI7WUFDdEMsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUVyQixJQUNFLE9BQU8sc0JBQXNCLEtBQUssVUFBVTtnQkFDNUMsRUFBRSxZQUFZLHNCQUFzQixFQUNwQztnQkFDQSxFQUFFLENBQUMsV0FBVyxDQUFFLE9BQU8sQ0FBRSxDQUFDO2FBQzNCO2lCQUFNO2dCQUNMLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUUsb0JBQW9CLENBQUUsQ0FBQztnQkFDdEQsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLGdCQUFnQixDQUFFLE9BQU8sRUFBRzthQUNsQztTQUNGOzs7Ozs7OztRQVNNLDJCQUFXLEdBQWxCLFVBQ0UsbUJBQXVDLEVBQ3ZDLFFBQXFDO1lBRXJDLElBQUksT0FBaUIsQ0FBQztZQUV0QixJQUFLLEtBQUssQ0FBQyxPQUFPLENBQUUsbUJBQW1CLENBQUUsRUFBRztnQkFDMUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO2FBQy9CO2lCQUFNLElBQUssbUJBQW1CLEVBQUc7Z0JBQ2hDLE9BQU8sR0FBRyxFQUFFLENBQUM7Z0JBQ2IsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG1CQUFtQixFQUFFLENBQUMsRUFBRyxFQUFHO29CQUMvQyxPQUFPLENBQUUsQ0FBQyxDQUFFLEdBQUcsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO2lCQUN6QzthQUNGO2lCQUFNO2dCQUNMLE9BQU8sR0FBRyxDQUFFLG9CQUFvQixDQUFFLENBQUM7YUFDcEM7WUFFRCxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBRSxDQUFDO1NBQy9EOzs7O1FBS00sbUNBQW1CLEdBQTFCLFVBQ0UsSUFBWSxFQUNaLEtBQVksRUFDWixLQUFjLEVBQ2QsU0FBa0I7WUFFVixJQUFBLEVBQUUsR0FBSyxJQUFJLEdBQVQsQ0FBVTtZQUVwQixJQUNFLE9BQU8sc0JBQXNCLEtBQUssVUFBVTtnQkFDNUMsRUFBRSxZQUFZLHNCQUFzQixFQUNwQztnQkFDQSxFQUFFLENBQUMsbUJBQW1CLENBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFFLENBQUM7YUFDekQ7aUJBQU07Z0JBQ0wsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBRSx3QkFBd0IsRUFBRSxJQUFJLENBQUUsQ0FBQztnQkFDaEUsR0FBRyxDQUFDLHdCQUF3QixDQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBRSxDQUFDO2FBQy9EO1NBQ0Y7Ozs7UUFLTSxxQ0FBcUIsR0FBNUIsVUFDRSxJQUFZLEVBQ1osS0FBYyxFQUNkLElBQVksRUFDWixNQUFnQixFQUNoQixhQUFzQjtZQUVkLElBQUEsRUFBRSxHQUFLLElBQUksR0FBVCxDQUFVO1lBRXBCLElBQ0UsT0FBTyxzQkFBc0IsS0FBSyxVQUFVO2dCQUM1QyxFQUFFLFlBQVksc0JBQXNCLEVBQ3BDO2dCQUNBLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFFLENBQUM7YUFDdEU7aUJBQU07Z0JBQ0wsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBRSx3QkFBd0IsRUFBRSxJQUFJLENBQUUsQ0FBQztnQkFDaEUsR0FBRyxDQUFDLDBCQUEwQixDQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUUsQ0FBQzthQUM1RTtTQUNGOzs7O1FBS00scUJBQUssR0FBWixVQUNFLEdBQVMsRUFDVCxLQUFXLEVBQ1gsSUFBVSxFQUNWLEtBQVcsRUFDWCxLQUFXO1lBSlgsb0JBQUEsRUFBQSxTQUFTO1lBQ1Qsc0JBQUEsRUFBQSxXQUFXO1lBQ1gscUJBQUEsRUFBQSxVQUFVO1lBQ1Ysc0JBQUEsRUFBQSxXQUFXO1lBQ1gsc0JBQUEsRUFBQSxXQUFXO1lBRVgsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUVyQixFQUFFLENBQUMsVUFBVSxDQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBRSxDQUFDO1lBQ3pDLEVBQUUsQ0FBQyxVQUFVLENBQUUsS0FBSyxDQUFFLENBQUM7WUFDdkIsRUFBRSxDQUFDLEtBQUssQ0FBRSxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBRSxDQUFDO1NBQ3ZEOzs7O1FBS00sK0JBQWUsR0FBdEIsVUFDRSxHQUFzQyxFQUN0QyxHQUFzQyxFQUN0QyxFQUtNOztnQkFMTixxQkFLSSxFQUFFLEtBQUEsRUFKSixtQkFBcUYsRUFBckYsV0FBVyxtQkFBRyxDQUFFLENBQUMsRUFBRSxDQUFDLGNBQUUsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLFlBQVksMENBQUUsS0FBSyxtQ0FBSSxDQUFDLGNBQUUsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLFlBQVksMENBQUUsTUFBTSxtQ0FBSSxDQUFDLENBQUUsS0FBQSxFQUNyRixtQkFBcUYsRUFBckYsV0FBVyxtQkFBRyxDQUFFLENBQUMsRUFBRSxDQUFDLGNBQUUsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLFlBQVksMENBQUUsS0FBSyxtQ0FBSSxDQUFDLGNBQUUsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLFlBQVksMENBQUUsTUFBTSxtQ0FBSSxDQUFDLENBQUUsS0FBQSxFQUNyRixZQUEwQixFQUExQixJQUFJLG1CQUFHLG1CQUFtQixLQUFBLEVBQzFCLGNBQW1CLEVBQW5CLE1BQU0sbUJBQUcsVUFBVSxLQUFBO1lBR3JCLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFckIsSUFDRSxPQUFPLHNCQUFzQixLQUFLLFVBQVU7Z0JBQzVDLEVBQUUsWUFBWSxzQkFBc0IsRUFDcEM7Z0JBQ0EsRUFBRSxDQUFDLGVBQWUsQ0FBRSxtQkFBbUIsUUFBRSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsR0FBRyxtQ0FBSSxJQUFJLENBQUUsQ0FBQztnQkFDNUQsRUFBRSxDQUFDLGVBQWUsQ0FBRSxtQkFBbUIsUUFBRSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsR0FBRyxtQ0FBSSxJQUFJLENBQUUsQ0FBQztnQkFDNUQsRUFBRSxDQUFDLGVBQWUsQ0FDaEIsV0FBVyxDQUFFLENBQUMsQ0FBRSxFQUNoQixXQUFXLENBQUUsQ0FBQyxDQUFFLEVBQ2hCLFdBQVcsQ0FBRSxDQUFDLENBQUUsRUFDaEIsV0FBVyxDQUFFLENBQUMsQ0FBRSxFQUNoQixXQUFXLENBQUUsQ0FBQyxDQUFFLEVBQ2hCLFdBQVcsQ0FBRSxDQUFDLENBQUUsRUFDaEIsV0FBVyxDQUFFLENBQUMsQ0FBRSxFQUNoQixXQUFXLENBQUUsQ0FBQyxDQUFFLEVBQ2hCLElBQUksRUFDSixNQUFNLENBQ1AsQ0FBQztnQkFDRixFQUFFLENBQUMsZUFBZSxDQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBRSxDQUFDO2dCQUNoRCxFQUFFLENBQUMsZUFBZSxDQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBRSxDQUFDO2FBQ2pEO2lCQUFNO2dCQUNMLE1BQU0sV0FBVyxDQUFDLG9CQUFvQixDQUFDO2FBQ3hDO1NBQ0Y7UUFDSCxZQUFDO0lBQUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
