/*!
* @fms-cat/glcat-ts v0.14.0
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
                if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
                if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
            if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
                gl.deleteTransformFeedback(this.__transformFeedback);
            }
        };
        /**
         * Bind a buffer to this transform feedback.
         */
        GLCatTransformFeedback.prototype.bindBuffer = function (index, buffer) {
            var gl = this.__glCat.gl;
            if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
            this.__bindHelperTransformFeedback = new BindHelper(null, function (buffer) {
                var _a;
                var gl = _this.__gl;
                if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
            if (WebGL2RenderingContext && gl instanceof WebGL2RenderingContext) {
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
    exports.GLCatTransformFeedback = GLCatTransformFeedback;
    exports.GLCatVertexArray = GLCatVertexArray;
    exports.default = GLCat;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xjYXQuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvR0xDb25zdGFudHMudHMiLCIuLi9zcmMvR0xDYXRFcnJvcnMudHMiLCIuLi9zcmMvR0xDYXRQcm9ncmFtLnRzIiwiLi4vc3JjL3V0aWxzL0JpbmRIZWxwZXIudHMiLCIuLi9zcmMvR0xDYXRCdWZmZXIudHMiLCIuLi9zcmMvR0xDYXRGcmFtZWJ1ZmZlci50cyIsIi4uL3NyYy9HTENhdFJlbmRlcmJ1ZmZlci50cyIsIi4uL3NyYy9HTENhdFNoYWRlci50cyIsIi4uL3NyYy9HTENhdFRleHR1cmUudHMiLCIuLi9zcmMvR0xDYXRUcmFuc2Zvcm1GZWVkYmFjay50cyIsIi4uL3NyYy9HTENhdFZlcnRleEFycmF5LnRzIiwiLi4vc3JjL0dMQ2F0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImV4cG9ydCBjb25zdCBHTF9BQ1RJVkVfQVRUUklCVVRFUyA9IDB4OGI4OTtcbmV4cG9ydCBjb25zdCBHTF9BQ1RJVkVfVEVYVFVSRSA9IDB4ODRlMDtcbmV4cG9ydCBjb25zdCBHTF9BQ1RJVkVfVU5JRk9STV9CTE9DS1MgPSAweDhhMzY7XG5leHBvcnQgY29uc3QgR0xfQUNUSVZFX1VOSUZPUk1TID0gMHg4Yjg2O1xuZXhwb3J0IGNvbnN0IEdMX0FMSUFTRURfTElORV9XSURUSF9SQU5HRSA9IDB4ODQ2ZTtcbmV4cG9ydCBjb25zdCBHTF9BTElBU0VEX1BPSU5UX1NJWkVfUkFOR0UgPSAweDg0NmQ7XG5leHBvcnQgY29uc3QgR0xfQUxQSEEgPSAweDE5MDY7XG5leHBvcnQgY29uc3QgR0xfQUxQSEFfQklUUyA9IDB4MGQ1NTtcbmV4cG9ydCBjb25zdCBHTF9BTFJFQURZX1NJR05BTEVEID0gMHg5MTFhO1xuZXhwb3J0IGNvbnN0IEdMX0FMV0FZUyA9IDB4MDIwNztcbmV4cG9ydCBjb25zdCBHTF9BTllfU0FNUExFU19QQVNTRUQgPSAweDhjMmY7XG5leHBvcnQgY29uc3QgR0xfQU5ZX1NBTVBMRVNfUEFTU0VEX0NPTlNFUlZBVElWRSA9IDB4OGQ2YTtcbmV4cG9ydCBjb25zdCBHTF9BUlJBWV9CVUZGRVIgPSAweDg4OTI7XG5leHBvcnQgY29uc3QgR0xfQVJSQVlfQlVGRkVSX0JJTkRJTkcgPSAweDg4OTQ7XG5leHBvcnQgY29uc3QgR0xfQVRUQUNIRURfU0hBREVSUyA9IDB4OGI4NTtcbmV4cG9ydCBjb25zdCBHTF9CQUNLID0gMHgwNDA1O1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EID0gMHgwYmUyO1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX0NPTE9SID0gMHg4MDA1O1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX0RTVF9BTFBIQSA9IDB4ODBjYTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9EU1RfUkdCID0gMHg4MGM4O1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX0VRVUFUSU9OID0gMHg4MDA5O1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX0VRVUFUSU9OX0FMUEhBID0gMHg4ODNkO1xuZXhwb3J0IGNvbnN0IEdMX0JMRU5EX0VRVUFUSU9OX1JHQiA9IDB4ODAwOTtcbmV4cG9ydCBjb25zdCBHTF9CTEVORF9TUkNfQUxQSEEgPSAweDgwY2I7XG5leHBvcnQgY29uc3QgR0xfQkxFTkRfU1JDX1JHQiA9IDB4ODBjOTtcbmV4cG9ydCBjb25zdCBHTF9CTFVFX0JJVFMgPSAweDBkNTQ7XG5leHBvcnQgY29uc3QgR0xfQk9PTCA9IDB4OGI1NjtcbmV4cG9ydCBjb25zdCBHTF9CT09MX1ZFQzIgPSAweDhiNTc7XG5leHBvcnQgY29uc3QgR0xfQk9PTF9WRUMzID0gMHg4YjU4O1xuZXhwb3J0IGNvbnN0IEdMX0JPT0xfVkVDNCA9IDB4OGI1OTtcbmV4cG9ydCBjb25zdCBHTF9CUk9XU0VSX0RFRkFVTFRfV0VCR0wgPSAweDkyNDQ7XG5leHBvcnQgY29uc3QgR0xfQlVGRkVSX1NJWkUgPSAweDg3NjQ7XG5leHBvcnQgY29uc3QgR0xfQlVGRkVSX1VTQUdFID0gMHg4NzY1O1xuZXhwb3J0IGNvbnN0IEdMX0JZVEUgPSAweDE0MDA7XG5leHBvcnQgY29uc3QgR0xfQ0NXID0gMHgwOTAxO1xuZXhwb3J0IGNvbnN0IEdMX0NMQU1QX1RPX0VER0UgPSAweDgxMmY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1IgPSAweDE4MDA7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDAgPSAweDhjZTA7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDBfV0VCR0wgPSAweDhjZTA7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDEgPSAweDhjZTE7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDFfV0VCR0wgPSAweDhjZTE7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDEwID0gMHg4Y2VhO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMF9XRUJHTCA9IDB4OGNlYTtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTEgPSAweDhjZWI7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDExX1dFQkdMID0gMHg4Y2ViO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxMiA9IDB4OGNlYztcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTJfV0VCR0wgPSAweDhjZWM7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDEzID0gMHg4Y2VkO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxM19XRUJHTCA9IDB4OGNlZDtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTQgPSAweDhjZWU7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDE0X1dFQkdMID0gMHg4Y2VlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTE9SX0FUVEFDSE1FTlQxNSA9IDB4OGNlZjtcbmV4cG9ydCBjb25zdCBHTF9DT0xPUl9BVFRBQ0hNRU5UMTVfV0VCR0wgPSAweDhjZWY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDIgPSAweDhjZTI7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDJfV0VCR0wgPSAweDhjZTI7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDMgPSAweDhjZTM7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDNfV0VCR0wgPSAweDhjZTM7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDQgPSAweDhjZTQ7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDRfV0VCR0wgPSAweDhjZTQ7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDUgPSAweDhjZTU7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDVfV0VCR0wgPSAweDhjZTU7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDYgPSAweDhjZTY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDZfV0VCR0wgPSAweDhjZTY7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDcgPSAweDhjZTc7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDdfV0VCR0wgPSAweDhjZTc7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDggPSAweDhjZTg7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDhfV0VCR0wgPSAweDhjZTg7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDkgPSAweDhjZTk7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQVRUQUNITUVOVDlfV0VCR0wgPSAweDhjZTk7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQlVGRkVSX0JJVCA9IDB4MDAwMDQwMDA7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfQ0xFQVJfVkFMVUUgPSAweDBjMjI7XG5leHBvcnQgY29uc3QgR0xfQ09MT1JfV1JJVEVNQVNLID0gMHgwYzIzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBBUkVfUkVGX1RPX1RFWFRVUkUgPSAweDg4NGU7XG5leHBvcnQgY29uc3QgR0xfQ09NUElMRV9TVEFUVVMgPSAweDhiODE7XG5leHBvcnQgY29uc3QgR0xfQ09NUExFVElPTl9TVEFUVVNfS0hSID0gMHg5MWIxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUjExX0VBQyA9IDB4OTI3MDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHMTFfRUFDID0gMHg5MjcyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCX0FUQ19XRUJHTCA9IDB4OGM5MjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQl9FVEMxX1dFQkdMID0gMHg4ZDY0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCX1BWUlRDXzJCUFBWMV9JTUcgPSAweDhjMDE7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JfUFZSVENfNEJQUFYxX0lNRyA9IDB4OGMwMDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQl9TM1RDX0RYVDFfRVhUID0gMHg4M2YwO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCOF9FVEMyID0gMHg5Mjc0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCOF9QVU5DSFRIUk9VR0hfQUxQSEExX0VUQzIgPSAweDkyNzg7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfMTBYMTBfS0hSID0gMHg5M2JiO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEwWDVfS0hSID0gMHg5M2I4O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEwWDZfS0hSID0gMHg5M2I5O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEwWDhfS0hSID0gMHg5M2JhO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzEyWDEwX0tIUiA9IDB4OTNiYztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ18xMlgxMl9LSFIgPSAweDkzYmQ7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfNFg0X0tIUiA9IDB4OTNiMDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ181WDRfS0hSID0gMHg5M2IxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzVYNV9LSFIgPSAweDkzYjI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfNlg1X0tIUiA9IDB4OTNiMztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ182WDZfS0hSID0gMHg5M2I0O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BU1RDXzhYNV9LSFIgPSAweDkzYjU7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FTVENfOFg2X0tIUiA9IDB4OTNiNjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1JHQkFfQVNUQ184WDhfS0hSID0gMHg5M2I3O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfUkdCQV9BVENfRVhQTElDSVRfQUxQSEFfV0VCR0wgPSAweDhjOTI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX0FUQ19JTlRFUlBPTEFURURfQUxQSEFfV0VCR0wgPSAweDg3ZWU7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX1BWUlRDXzJCUFBWMV9JTUcgPSAweDhjMDM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX1BWUlRDXzRCUFBWMV9JTUcgPSAweDhjMDI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUMV9FWFQgPSAweDgzZjE7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUM19FWFQgPSAweDgzZjI7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUNV9FWFQgPSAweDgzZjM7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9SR0JBOF9FVEMyX0VBQyA9IDB4OTI3NTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NJR05FRF9SMTFfRUFDID0gMHg5MjcxO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU0lHTkVEX1JHMTFfRUFDID0gMHg5MjczO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQl9BTFBIQV9TM1RDX0RYVDFfRVhUID0gMHg4YzRkO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQl9BTFBIQV9TM1RDX0RYVDNfRVhUID0gMHg4YzRlO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQl9BTFBIQV9TM1RDX0RYVDVfRVhUID0gMHg4YzRmO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQl9TM1RDX0RYVDFfRVhUID0gMHg4YzRjO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTBYMTBfS0hSID0gMHg5M2RiO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTBYNV9LSFIgPSAweDkzZDg7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ18xMFg2X0tIUiA9IDB4OTNkOTtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzEwWDhfS0hSID0gMHg5M2RhO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTJYMTBfS0hSID0gMHg5M2RjO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfMTJYMTJfS0hSID0gMHg5M2RkO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfNFg0X0tIUiA9IDB4OTNkMDtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzVYNF9LSFIgPSAweDkzZDE7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ181WDVfS0hSID0gMHg5M2QyO1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfNlg1X0tIUiA9IDB4OTNkMztcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzZYNl9LSFIgPSAweDkzZDQ7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfQVNUQ184WDVfS0hSID0gMHg5M2Q1O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfQUxQSEE4X0FTVENfOFg2X0tIUiA9IDB4OTNkNjtcbmV4cG9ydCBjb25zdCBHTF9DT01QUkVTU0VEX1NSR0I4X0FMUEhBOF9BU1RDXzhYOF9LSFIgPSAweDkzZDc7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9BTFBIQThfRVRDMl9FQUMgPSAweDkyNzc7XG5leHBvcnQgY29uc3QgR0xfQ09NUFJFU1NFRF9TUkdCOF9FVEMyID0gMHg5Mjc2O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfU1JHQjhfUFVOQ0hUSFJPVUdIX0FMUEhBMV9FVEMyID0gMHg5Mjc5O1xuZXhwb3J0IGNvbnN0IEdMX0NPTVBSRVNTRURfVEVYVFVSRV9GT1JNQVRTID0gMHg4NmEzO1xuZXhwb3J0IGNvbnN0IEdMX0NPTkRJVElPTl9TQVRJU0ZJRUQgPSAweDkxMWM7XG5leHBvcnQgY29uc3QgR0xfQ09OU1RBTlRfQUxQSEEgPSAweDgwMDM7XG5leHBvcnQgY29uc3QgR0xfQ09OU1RBTlRfQ09MT1IgPSAweDgwMDE7XG5leHBvcnQgY29uc3QgR0xfQ09OVEVYVF9MT1NUX1dFQkdMID0gMHg5MjQyO1xuZXhwb3J0IGNvbnN0IEdMX0NPUFlfUkVBRF9CVUZGRVIgPSAweDhmMzY7XG5leHBvcnQgY29uc3QgR0xfQ09QWV9SRUFEX0JVRkZFUl9CSU5ESU5HID0gMHg4ZjM2O1xuZXhwb3J0IGNvbnN0IEdMX0NPUFlfV1JJVEVfQlVGRkVSID0gMHg4ZjM3O1xuZXhwb3J0IGNvbnN0IEdMX0NPUFlfV1JJVEVfQlVGRkVSX0JJTkRJTkcgPSAweDhmMzc7XG5leHBvcnQgY29uc3QgR0xfQ1VMTF9GQUNFID0gMHgwYjQ0O1xuZXhwb3J0IGNvbnN0IEdMX0NVTExfRkFDRV9NT0RFID0gMHgwYjQ1O1xuZXhwb3J0IGNvbnN0IEdMX0NVUlJFTlRfUFJPR1JBTSA9IDB4OGI4ZDtcbmV4cG9ydCBjb25zdCBHTF9DVVJSRU5UX1FVRVJZID0gMHg4ODY1O1xuZXhwb3J0IGNvbnN0IEdMX0NVUlJFTlRfUVVFUllfRVhUID0gMHg4ODY1O1xuZXhwb3J0IGNvbnN0IEdMX0NVUlJFTlRfVkVSVEVYX0FUVFJJQiA9IDB4ODYyNjtcbmV4cG9ydCBjb25zdCBHTF9DVyA9IDB4MDkwMDtcbmV4cG9ydCBjb25zdCBHTF9ERUNSID0gMHgxZTAzO1xuZXhwb3J0IGNvbnN0IEdMX0RFQ1JfV1JBUCA9IDB4ODUwODtcbmV4cG9ydCBjb25zdCBHTF9ERUxFVEVfU1RBVFVTID0gMHg4YjgwO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIID0gMHgxODAxO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0FUVEFDSE1FTlQgPSAweDhkMDA7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQklUUyA9IDB4MGQ1NjtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9CVUZGRVJfQklUID0gMHgwMDAwMDEwMDtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9DTEVBUl9WQUxVRSA9IDB4MGI3MztcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9DT01QT05FTlQgPSAweDE5MDI7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ09NUE9ORU5UMTYgPSAweDgxYTU7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ09NUE9ORU5UMjQgPSAweDgxYTY7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfQ09NUE9ORU5UMzJGID0gMHg4Y2FjO1xuZXhwb3J0IGNvbnN0IEdMX0RFUFRIX0ZVTkMgPSAweDBiNzQ7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfUkFOR0UgPSAweDBiNzA7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfU1RFTkNJTCA9IDB4ODRmOTtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9TVEVOQ0lMX0FUVEFDSE1FTlQgPSAweDgyMWE7XG5leHBvcnQgY29uc3QgR0xfREVQVEhfVEVTVCA9IDB4MGI3MTtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSF9XUklURU1BU0sgPSAweDBiNzI7XG5leHBvcnQgY29uc3QgR0xfREVQVEgyNF9TVEVOQ0lMOCA9IDB4ODhmMDtcbmV4cG9ydCBjb25zdCBHTF9ERVBUSDMyRl9TVEVOQ0lMOCA9IDB4OGNhZDtcbmV4cG9ydCBjb25zdCBHTF9ESVRIRVIgPSAweDBiZDA7XG5leHBvcnQgY29uc3QgR0xfRE9OVF9DQVJFID0gMHgxMTAwO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMCA9IDB4ODgyNTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjBfV0VCR0wgPSAweDg4MjU7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxID0gMHg4ODI2O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMV9XRUJHTCA9IDB4ODgyNjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEwID0gMHg4ODJmO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTBfV0VCR0wgPSAweDg4MmY7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMSA9IDB4ODgzMDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjExX1dFQkdMID0gMHg4ODMwO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTIgPSAweDg4MzE7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxMl9XRUJHTCA9IDB4ODgzMTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjEzID0gMHg4ODMyO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTNfV0VCR0wgPSAweDg4MzI7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxNCA9IDB4ODgzMztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjE0X1dFQkdMID0gMHg4ODMzO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMTUgPSAweDg4MzQ7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIxNV9XRUJHTCA9IDB4ODgzNDtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjIgPSAweDg4Mjc7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVIyX1dFQkdMID0gMHg4ODI3O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSMyA9IDB4ODgyODtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjNfV0VCR0wgPSAweDg4Mjg7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI0ID0gMHg4ODI5O1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNF9XRUJHTCA9IDB4ODgyOTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjUgPSAweDg4MmE7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI1X1dFQkdMID0gMHg4ODJhO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSNiA9IDB4ODgyYjtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjZfV0VCR0wgPSAweDg4MmI7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI3ID0gMHg4ODJjO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSN19XRUJHTCA9IDB4ODgyYztcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjggPSAweDg4MmQ7XG5leHBvcnQgY29uc3QgR0xfRFJBV19CVUZGRVI4X1dFQkdMID0gMHg4ODJkO1xuZXhwb3J0IGNvbnN0IEdMX0RSQVdfQlVGRkVSOSA9IDB4ODgyZTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0JVRkZFUjlfV0VCR0wgPSAweDg4MmU7XG5leHBvcnQgY29uc3QgR0xfRFJBV19GUkFNRUJVRkZFUiA9IDB4OGNhOTtcbmV4cG9ydCBjb25zdCBHTF9EUkFXX0ZSQU1FQlVGRkVSX0JJTkRJTkcgPSAweDhjYTY7XG5leHBvcnQgY29uc3QgR0xfRFNUX0FMUEhBID0gMHgwMzA0O1xuZXhwb3J0IGNvbnN0IEdMX0RTVF9DT0xPUiA9IDB4MDMwNjtcbmV4cG9ydCBjb25zdCBHTF9EWU5BTUlDX0NPUFkgPSAweDg4ZWE7XG5leHBvcnQgY29uc3QgR0xfRFlOQU1JQ19EUkFXID0gMHg4OGU4O1xuZXhwb3J0IGNvbnN0IEdMX0RZTkFNSUNfUkVBRCA9IDB4ODhlOTtcbmV4cG9ydCBjb25zdCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiA9IDB4ODg5MztcbmV4cG9ydCBjb25zdCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUl9CSU5ESU5HID0gMHg4ODk1O1xuZXhwb3J0IGNvbnN0IEdMX0VRVUFMID0gMHgwMjAyO1xuZXhwb3J0IGNvbnN0IEdMX0ZBU1RFU1QgPSAweDExMDE7XG5leHBvcnQgY29uc3QgR0xfRkxPQVQgPSAweDE0MDY7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfMzJfVU5TSUdORURfSU5UXzI0XzhfUkVWID0gMHg4ZGFkO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDIgPSAweDhiNWE7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUMlgzID0gMHg4YjY1O1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDJYNCA9IDB4OGI2NjtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQzID0gMHg4YjViO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX01BVDNYMiA9IDB4OGI2NztcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQzWDQgPSAweDhiNjg7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUNCA9IDB4OGI1YztcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9NQVQ0WDIgPSAweDhiNjk7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfTUFUNFgzID0gMHg4YjZhO1xuZXhwb3J0IGNvbnN0IEdMX0ZMT0FUX1ZFQzIgPSAweDhiNTA7XG5leHBvcnQgY29uc3QgR0xfRkxPQVRfVkVDMyA9IDB4OGI1MTtcbmV4cG9ydCBjb25zdCBHTF9GTE9BVF9WRUM0ID0gMHg4YjUyO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQUdNRU5UX1NIQURFUiA9IDB4OGIzMDtcbmV4cG9ydCBjb25zdCBHTF9GUkFHTUVOVF9TSEFERVJfREVSSVZBVElWRV9ISU5UID0gMHg4YjhiO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQUdNRU5UX1NIQURFUl9ERVJJVkFUSVZFX0hJTlRfT0VTID0gMHg4YjhiO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSID0gMHg4ZDQwO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfQUxQSEFfU0laRSA9IDB4ODIxNTtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0JMVUVfU0laRSA9IDB4ODIxNDtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX0NPTE9SX0VOQ09ESU5HID0gMHg4MjEwO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfQ09MT1JfRU5DT0RJTkdfRVhUID0gMHg4MjEwO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfQ09NUE9ORU5UX1RZUEUgPSAweDgyMTE7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9DT01QT05FTlRfVFlQRV9FWFQgPSAweDgyMTE7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9ERVBUSF9TSVpFID0gMHg4MjE2O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfR1JFRU5fU0laRSA9IDB4ODIxMztcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX09CSkVDVF9OQU1FID0gMHg4Y2QxO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfT0JKRUNUX1RZUEUgPSAweDhjZDA7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9SRURfU0laRSA9IDB4ODIxMjtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX1NURU5DSUxfU0laRSA9IDB4ODIxNztcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX1RFWFRVUkVfQ1VCRV9NQVBfRkFDRSA9IDB4OGNkMztcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX1RFWFRVUkVfTEFZRVIgPSAweDhjZDQ7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0xFVkVMID0gMHg4Y2QyO1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0JJTkRJTkcgPSAweDhjYTY7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfQ09NUExFVEUgPSAweDhjZDU7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfREVGQVVMVCA9IDB4ODIxODtcbmV4cG9ydCBjb25zdCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX0FUVEFDSE1FTlQgPSAweDhjZDY7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfSU5DT01QTEVURV9ESU1FTlNJT05TID0gMHg4Y2Q5O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTUlTU0lOR19BVFRBQ0hNRU5UID0gMHg4Y2Q3O1xuZXhwb3J0IGNvbnN0IEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTVVMVElTQU1QTEUgPSAweDhkNTY7XG5leHBvcnQgY29uc3QgR0xfRlJBTUVCVUZGRVJfVU5TVVBQT1JURUQgPSAweDhjZGQ7XG5leHBvcnQgY29uc3QgR0xfRlJPTlQgPSAweDA0MDQ7XG5leHBvcnQgY29uc3QgR0xfRlJPTlRfQU5EX0JBQ0sgPSAweDA0MDg7XG5leHBvcnQgY29uc3QgR0xfRlJPTlRfRkFDRSA9IDB4MGI0NjtcbmV4cG9ydCBjb25zdCBHTF9GVU5DX0FERCA9IDB4ODAwNjtcbmV4cG9ydCBjb25zdCBHTF9GVU5DX1JFVkVSU0VfU1VCVFJBQ1QgPSAweDgwMGI7XG5leHBvcnQgY29uc3QgR0xfRlVOQ19TVUJTVFJBQ1QgPSAweDgwMGE7XG5leHBvcnQgY29uc3QgR0xfR0VORVJBVEVfTUlQTUFQX0hJTlQgPSAweDgxOTI7XG5leHBvcnQgY29uc3QgR0xfR0VRVUFMID0gMHgwMjA2O1xuZXhwb3J0IGNvbnN0IEdMX0dQVV9ESVNKT0lOVF9FWFQgPSAweDhmYmI7XG5leHBvcnQgY29uc3QgR0xfR1JFQVRFUiA9IDB4MDIwNDtcbmV4cG9ydCBjb25zdCBHTF9HUkVFTl9CSVRTID0gMHgwZDUzO1xuZXhwb3J0IGNvbnN0IEdMX0hBTEZfRkxPQVQgPSAweDE0MGI7XG5leHBvcnQgY29uc3QgR0xfSEFMRl9GTE9BVF9PRVMgPSAweDhkNjE7XG5leHBvcnQgY29uc3QgR0xfSElHSF9GTE9BVCA9IDB4OGRmMjtcbmV4cG9ydCBjb25zdCBHTF9ISUdIX0lOVCA9IDB4OGRmNTtcbmV4cG9ydCBjb25zdCBHTF9JTVBMRU1FTlRBVElPTl9DT0xPUl9SRUFEX0ZPUk1BVCA9IDB4OGI5YjtcbmV4cG9ydCBjb25zdCBHTF9JTVBMRU1FTlRBVElPTl9DT0xPUl9SRUFEX1RZUEUgPSAweDhiOWE7XG5leHBvcnQgY29uc3QgR0xfSU5DUiA9IDB4MWUwMjtcbmV4cG9ydCBjb25zdCBHTF9JTkNSX1dSQVAgPSAweDg1MDc7XG5leHBvcnQgY29uc3QgR0xfSU5UID0gMHgxNDA0O1xuZXhwb3J0IGNvbnN0IEdMX0lOVF8yXzEwXzEwXzEwX1JFViA9IDB4OGQ5ZjtcbmV4cG9ydCBjb25zdCBHTF9JTlRfU0FNUExFUl8yRCA9IDB4OGRjYTtcbmV4cG9ydCBjb25zdCBHTF9JTlRfU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRjZjtcbmV4cG9ydCBjb25zdCBHTF9JTlRfU0FNUExFUl8zRCA9IDB4OGRjYjtcbmV4cG9ydCBjb25zdCBHTF9JTlRfU0FNUExFUl9DVUJFID0gMHg4ZGNjO1xuZXhwb3J0IGNvbnN0IEdMX0lOVF9WRUMyID0gMHg4YjUzO1xuZXhwb3J0IGNvbnN0IEdMX0lOVF9WRUMzID0gMHg4YjU0O1xuZXhwb3J0IGNvbnN0IEdMX0lOVF9WRUM0ID0gMHg4YjU1O1xuZXhwb3J0IGNvbnN0IEdMX0lOVEVSTEVBVkVEX0FUVFJJQlMgPSAweDhjOGM7XG5leHBvcnQgY29uc3QgR0xfSU5WQUxJRF9FTlVNID0gMHgwNTAwO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfRlJBTUVCVUZGRVJfT1BFUkFUSU9OID0gMHgwNTA2O1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfSU5ERVggPSAweGZmZmZmZmZmO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfT1BFUkFUSU9OID0gMHgwNTAyO1xuZXhwb3J0IGNvbnN0IEdMX0lOVkFMSURfVkFMVUUgPSAweDA1MDE7XG5leHBvcnQgY29uc3QgR0xfSU5WRVJUID0gMHgxNTBhO1xuZXhwb3J0IGNvbnN0IEdMX0tFRVAgPSAweDFlMDA7XG5leHBvcnQgY29uc3QgR0xfTEVRVUFMID0gMHgwMjAzO1xuZXhwb3J0IGNvbnN0IEdMX0xFU1MgPSAweDAyMDE7XG5leHBvcnQgY29uc3QgR0xfTElORV9MT09QID0gMHgwMDAyO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVfU1RSSVAgPSAweDAwMDM7XG5leHBvcnQgY29uc3QgR0xfTElORV9XSURUSCA9IDB4MGIyMTtcbmV4cG9ydCBjb25zdCBHTF9MSU5FQVIgPSAweDI2MDE7XG5leHBvcnQgY29uc3QgR0xfTElORUFSX01JUE1BUF9MSU5FQVIgPSAweDI3MDM7XG5leHBvcnQgY29uc3QgR0xfTElORUFSX01JUE1BUF9ORUFSRVNUID0gMHgyNzAxO1xuZXhwb3J0IGNvbnN0IEdMX0xJTkVTID0gMHgwMDAxO1xuZXhwb3J0IGNvbnN0IEdMX0xJTktfU1RBVFVTID0gMHg4YjgyO1xuZXhwb3J0IGNvbnN0IEdMX0xPV19GTE9BVCA9IDB4OGRmMDtcbmV4cG9ydCBjb25zdCBHTF9MT1dfSU5UID0gMHg4ZGYzO1xuZXhwb3J0IGNvbnN0IEdMX0xVTUlOQU5DRSA9IDB4MTkwOTtcbmV4cG9ydCBjb25zdCBHTF9MVU1JTkFOQ0VfQUxQSEEgPSAweDE5MGE7XG5leHBvcnQgY29uc3QgR0xfTUFYID0gMHg4MDA4O1xuZXhwb3J0IGNvbnN0IEdMX01BWF8zRF9URVhUVVJFX1NJWkUgPSAweDgwNzM7XG5leHBvcnQgY29uc3QgR0xfTUFYX0FSUkFZX1RFWFRVUkVfTEFZRVJTID0gMHg4OGZmO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DTElFTlRfV0FJVF9USU1FT1VUX1dFQkdMID0gMHg5MjQ3O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9DT0xPUl9BVFRBQ0hNRU5UUyA9IDB4OGNkZjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ09MT1JfQVRUQUNITUVOVFNfV0VCR0wgPSAweDhjZGY7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTUJJTkVEX0ZSQUdNRU5UX1VOSUZPUk1fQ09NUE9ORU5UUyA9IDB4OGEzMztcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ09NQklORURfVEVYVFVSRV9JTUFHRV9VTklUUyA9IDB4OGI0ZDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfQ09NQklORURfVU5JRk9STV9CTE9DS1MgPSAweDhhMmU7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NPTUJJTkVEX1ZFUlRFWF9VTklGT1JNX0NPTVBPTkVOVFMgPSAweDhhMzE7XG5leHBvcnQgY29uc3QgR0xfTUFYX0NVQkVfTUFQX1RFWFRVUkVfU0laRSA9IDB4ODUxYztcbmV4cG9ydCBjb25zdCBHTF9NQVhfRFJBV19CVUZGRVJTID0gMHg4ODI0O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9EUkFXX0JVRkZFUlNfV0VCR0wgPSAweDg4MjQ7XG5leHBvcnQgY29uc3QgR0xfTUFYX0VMRU1FTlRfSU5ERVggPSAweDhkNmI7XG5leHBvcnQgY29uc3QgR0xfTUFYX0VMRU1FTlRTX0lORElDRVMgPSAweDgwZTk7XG5leHBvcnQgY29uc3QgR0xfTUFYX0VMRU1FTlRTX1ZFUlRJQ0VTID0gMHg4MGU4O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9FWFQgPSAweDgwMDg7XG5leHBvcnQgY29uc3QgR0xfTUFYX0ZSQUdNRU5UX0lOUFVUX0NPTVBPTkVOVFMgPSAweDkxMjU7XG5leHBvcnQgY29uc3QgR0xfTUFYX0ZSQUdNRU5UX1VOSUZPUk1fQkxPQ0tTID0gMHg4YTJkO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9GUkFHTUVOVF9VTklGT1JNX0NPTVBPTkVOVFMgPSAweDhiNDk7XG5leHBvcnQgY29uc3QgR0xfTUFYX0ZSQUdNRU5UX1VOSUZPUk1fVkVDVE9SUyA9IDB4OGRmZDtcbmV4cG9ydCBjb25zdCBHTF9NQVhfUFJPR1JBTV9URVhFTF9PRkZTRVQgPSAweDg5MDU7XG5leHBvcnQgY29uc3QgR0xfTUFYX1JFTkRFUkJVRkZFUl9TSVpFID0gMHg4NGU4O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9TQU1QTEVTID0gMHg4ZDU3O1xuZXhwb3J0IGNvbnN0IEdMX01BWF9TRVJWRVJfV0FJVF9USU1FT1VUID0gMHg5MTExO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9URVhUVVJFX0lNQUdFX1VOSVRTID0gMHg4ODcyO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9URVhUVVJFX0xPRF9CSUFTID0gMHg4NGZkO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9URVhUVVJFX01BWF9BTklTT1RST1BZX0VYVCA9IDB4ODRmZjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVEVYVFVSRV9TSVpFID0gMHgwZDMzO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9UUkFOU0ZPUk1fRkVFREJBQ0tfSU5URVJMRUFWRURfQ09NUE9ORU5UUyA9IDB4OGM4YTtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVFJBTlNGT1JNX0ZFRURCQUNLX1NFUEFSQVRFX0FUVFJJQlMgPSAweDhjOGI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1RSQU5TRk9STV9GRUVEQkFDS19TRVBBUkFURV9DT01QT05FTlRTID0gMHg4YzgwO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9VTklGT1JNX0JMT0NLX1NJWkUgPSAweDhhMzA7XG5leHBvcnQgY29uc3QgR0xfTUFYX1VOSUZPUk1fQlVGRkVSX0JJTkRJTkdTID0gMHg4YTJmO1xuZXhwb3J0IGNvbnN0IEdMX01BWF9WQVJZSU5HX0NPTVBPTkVOVFMgPSAweDhiNGI7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZBUllJTkdfVkVDVE9SUyA9IDB4OGRmYztcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkVSVEVYX0FUVFJJQlMgPSAweDg4Njk7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9PVVRQVVRfQ09NUE9ORU5UUyA9IDB4OTEyMjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkVSVEVYX1RFWFRVUkVfSU1BR0VfVU5JVFMgPSAweDhiNGM7XG5leHBvcnQgY29uc3QgR0xfTUFYX1ZFUlRFWF9VTklGT1JNX0JMT0NLUyA9IDB4OGEyYjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkVSVEVYX1VOSUZPUk1fQ09NUE9ORU5UUyA9IDB4OGI0YTtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVkVSVEVYX1VOSUZPUk1fVkVDVE9SUyA9IDB4OGRmYjtcbmV4cG9ydCBjb25zdCBHTF9NQVhfVklFV1BPUlRfRElNUyA9IDB4MGQzYTtcbmV4cG9ydCBjb25zdCBHTF9NRURJVU1fRkxPQVQgPSAweDhkZjE7XG5leHBvcnQgY29uc3QgR0xfTUVESVVNX0lOVCA9IDB4OGRmNDtcbmV4cG9ydCBjb25zdCBHTF9NSU4gPSAweDgwMDc7XG5leHBvcnQgY29uc3QgR0xfTUlOX0VYVCA9IDB4ODAwNztcbmV4cG9ydCBjb25zdCBHTF9NSU5fUFJPR1JBTV9URVhFTF9PRkZTRVQgPSAweDg5MDQ7XG5leHBvcnQgY29uc3QgR0xfTUlSUk9SRURfUkVQRUFUID0gMHg4MzcwO1xuZXhwb3J0IGNvbnN0IEdMX05FQVJFU1QgPSAweDI2MDA7XG5leHBvcnQgY29uc3QgR0xfTkVBUkVTVF9NSVBNQVBfTElORUFSID0gMHgyNzAyO1xuZXhwb3J0IGNvbnN0IEdMX05FQVJFU1RfTUlQTUFQX05FQVJFU1QgPSAweDI3MDA7XG5leHBvcnQgY29uc3QgR0xfTkVWRVIgPSAweDAyMDA7XG5leHBvcnQgY29uc3QgR0xfTklDRVNUID0gMHgxMTAyO1xuZXhwb3J0IGNvbnN0IEdMX05PX0VSUk9SID0gMDtcbmV4cG9ydCBjb25zdCBHTF9OT05FID0gMDtcbmV4cG9ydCBjb25zdCBHTF9OT1RFUVVBTCA9IDB4MDIwNTtcbmV4cG9ydCBjb25zdCBHTF9PQkpFQ1RfVFlQRSA9IDB4OTExMjtcbmV4cG9ydCBjb25zdCBHTF9PTkUgPSAxO1xuZXhwb3J0IGNvbnN0IEdMX09ORV9NSU5VU19DT05TVEFOVF9BTFBIQSA9IDB4ODAwNDtcbmV4cG9ydCBjb25zdCBHTF9PTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1IgPSAweDgwMDI7XG5leHBvcnQgY29uc3QgR0xfT05FX01JTlVTX0RTVF9BTFBIQSA9IDB4MDMwNTtcbmV4cG9ydCBjb25zdCBHTF9PTkVfTUlOVVNfRFNUX0NPTE9SID0gMHgwMzA3O1xuZXhwb3J0IGNvbnN0IEdMX09ORV9NSU5VU19TUkNfQUxQSEEgPSAweDAzMDM7XG5leHBvcnQgY29uc3QgR0xfT05FX01JTlVTX1NSQ19DT0xPUiA9IDB4MDMwMTtcbmV4cG9ydCBjb25zdCBHTF9PVVRfT0ZfTUVNT1JZID0gMHgwNTA1O1xuZXhwb3J0IGNvbnN0IEdMX1BBQ0tfQUxJR05NRU5UID0gMHgwZDA1O1xuZXhwb3J0IGNvbnN0IEdMX1BBQ0tfUk9XX0xFTkdUSCA9IDB4MGQwMjtcbmV4cG9ydCBjb25zdCBHTF9QQUNLX1NLSVBfUElYRUxTID0gMHgwZDA0O1xuZXhwb3J0IGNvbnN0IEdMX1BBQ0tfU0tJUF9ST1dTID0gMHgwZDAzO1xuZXhwb3J0IGNvbnN0IEdMX1BJWEVMX1BBQ0tfQlVGRkVSID0gMHg4OGViO1xuZXhwb3J0IGNvbnN0IEdMX1BJWEVMX1BBQ0tfQlVGRkVSX0JJTkRJTkcgPSAweDg4ZWQ7XG5leHBvcnQgY29uc3QgR0xfUElYRUxfVU5QQUNLX0JVRkZFUiA9IDB4ODhlYztcbmV4cG9ydCBjb25zdCBHTF9QSVhFTF9VTlBBQ0tfQlVGRkVSX0JJTkRJTkcgPSAweDg4ZWY7XG5leHBvcnQgY29uc3QgR0xfUE9JTlRTID0gMHgwMDAwO1xuZXhwb3J0IGNvbnN0IEdMX1BPTFlHT05fT0ZGU0VUX0ZBQ1RPUiA9IDB4ODAzODtcbmV4cG9ydCBjb25zdCBHTF9QT0xZR09OX09GRlNFVF9GSUxMID0gMHg4MDM3O1xuZXhwb3J0IGNvbnN0IEdMX1BPTFlHT05fT0ZGU0VUX1VOSVRTID0gMHgyYTAwO1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX0NPVU5URVJfQklUU19FWFQgPSAweDg4NjQ7XG5leHBvcnQgY29uc3QgR0xfUVVFUllfUkVTVUxUID0gMHg4ODY2O1xuZXhwb3J0IGNvbnN0IEdMX1FVRVJZX1JFU1VMVF9BVkFJTEFCTEUgPSAweDg4Njc7XG5leHBvcnQgY29uc3QgR0xfUVVFUllfUkVTVUxUX0FWQUlMQUJMRV9FWFQgPSAweDg4Njc7XG5leHBvcnQgY29uc3QgR0xfUVVFUllfUkVTVUxUX0VYVCA9IDB4ODg2NjtcbmV4cG9ydCBjb25zdCBHTF9SMTFGX0cxMUZfQjEwRiA9IDB4OGMzYTtcbmV4cG9ydCBjb25zdCBHTF9SMTZGID0gMHg4MjJkO1xuZXhwb3J0IGNvbnN0IEdMX1IxNkkgPSAweDgyMzM7XG5leHBvcnQgY29uc3QgR0xfUjE2VUkgPSAweDgyMzQ7XG5leHBvcnQgY29uc3QgR0xfUjMyRiA9IDB4ODIyZTtcbmV4cG9ydCBjb25zdCBHTF9SMzJJID0gMHg4MjM1O1xuZXhwb3J0IGNvbnN0IEdMX1IzMlVJID0gMHg4MjM2O1xuZXhwb3J0IGNvbnN0IEdMX1I4ID0gMHg4MjI5O1xuZXhwb3J0IGNvbnN0IEdMX1I4X1NOT1JNID0gMHg4Zjk0O1xuZXhwb3J0IGNvbnN0IEdMX1I4SSA9IDB4ODIzMTtcbmV4cG9ydCBjb25zdCBHTF9SOFVJID0gMHg4MjMyO1xuZXhwb3J0IGNvbnN0IEdMX1JBU1RFUklaRVJfRElTQ0FSRCA9IDB4OGM4OTtcbmV4cG9ydCBjb25zdCBHTF9SRUFEX0JVRkZFUiA9IDB4MGMwMjtcbmV4cG9ydCBjb25zdCBHTF9SRUFEX0ZSQU1FQlVGRkVSID0gMHg4Y2E4O1xuZXhwb3J0IGNvbnN0IEdMX1JFQURfRlJBTUVCVUZGRVJfQklORElORyA9IDB4OGNhYTtcbmV4cG9ydCBjb25zdCBHTF9SRUQgPSAweDE5MDM7XG5leHBvcnQgY29uc3QgR0xfUkVEX0JJVFMgPSAweDBkNTI7XG5leHBvcnQgY29uc3QgR0xfUkVEX0lOVEVHRVIgPSAweDhkOTQ7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSID0gMHg4ZDQxO1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9BTFBIQV9TSVpFID0gMHg4ZDUzO1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9CSU5ESU5HID0gMHg4Y2E3O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9CTFVFX1NJWkUgPSAweDhkNTI7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX0RFUFRIX1NJWkUgPSAweDhkNTQ7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX0dSRUVOX1NJWkUgPSAweDhkNTE7XG5leHBvcnQgY29uc3QgR0xfUkVOREVSQlVGRkVSX0hFSUdIVCA9IDB4OGQ0MztcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfSU5URVJOQUxfRk9STUFUID0gMHg4ZDQ0O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9SRURfU0laRSA9IDB4OGQ1MDtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfU0FNUExFUyA9IDB4OGNhYjtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJCVUZGRVJfU1RFTkNJTF9TSVpFID0gMHg4ZDU1O1xuZXhwb3J0IGNvbnN0IEdMX1JFTkRFUkJVRkZFUl9XSURUSCA9IDB4OGQ0MjtcbmV4cG9ydCBjb25zdCBHTF9SRU5ERVJFUiA9IDB4MWYwMTtcbmV4cG9ydCBjb25zdCBHTF9SRVBFQVQgPSAweDI5MDE7XG5leHBvcnQgY29uc3QgR0xfUkVQTEFDRSA9IDB4MWUwMTtcbmV4cG9ydCBjb25zdCBHTF9SRyA9IDB4ODIyNztcbmV4cG9ydCBjb25zdCBHTF9SR19JTlRFR0VSID0gMHg4MjI4O1xuZXhwb3J0IGNvbnN0IEdMX1JHMTZGID0gMHg4MjJmO1xuZXhwb3J0IGNvbnN0IEdMX1JHMTZJID0gMHg4MjM5O1xuZXhwb3J0IGNvbnN0IEdMX1JHMTZVSSA9IDB4ODIzYTtcbmV4cG9ydCBjb25zdCBHTF9SRzMyRiA9IDB4ODIzMDtcbmV4cG9ydCBjb25zdCBHTF9SRzMySSA9IDB4ODIzYjtcbmV4cG9ydCBjb25zdCBHTF9SRzMyVUkgPSAweDgyM2M7XG5leHBvcnQgY29uc3QgR0xfUkc4ID0gMHg4MjJiO1xuZXhwb3J0IGNvbnN0IEdMX1JHOF9TTk9STSA9IDB4OGY5NTtcbmV4cG9ydCBjb25zdCBHTF9SRzhJID0gMHg4MjM3O1xuZXhwb3J0IGNvbnN0IEdMX1JHOFVJID0gMHg4MjM4O1xuZXhwb3J0IGNvbnN0IEdMX1JHQiA9IDB4MTkwNztcbmV4cG9ydCBjb25zdCBHTF9SR0JfSU5URUdFUiA9IDB4OGQ5ODtcbmV4cG9ydCBjb25zdCBHTF9SR0IxMF9BMiA9IDB4ODA1OTtcbmV4cG9ydCBjb25zdCBHTF9SR0IxMF9BMlVJID0gMHg5MDZmO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjE2RiA9IDB4ODgxYjtcbmV4cG9ydCBjb25zdCBHTF9SR0IxNkkgPSAweDhkODk7XG5leHBvcnQgY29uc3QgR0xfUkdCMTZVSSA9IDB4OGQ3NztcbmV4cG9ydCBjb25zdCBHTF9SR0IzMkYgPSAweDg4MTU7XG5leHBvcnQgY29uc3QgR0xfUkdCMzJGX0VYVCA9IDB4ODgxNTtcbmV4cG9ydCBjb25zdCBHTF9SR0IzMkkgPSAweDhkODM7XG5leHBvcnQgY29uc3QgR0xfUkdCMzJVSSA9IDB4OGQ3MTtcbmV4cG9ydCBjb25zdCBHTF9SR0I1X0ExID0gMHg4MDU3O1xuZXhwb3J0IGNvbnN0IEdMX1JHQjU2NSA9IDB4OGQ2MjtcbmV4cG9ydCBjb25zdCBHTF9SR0I4ID0gMHg4MDUxO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjhfU05PUk0gPSAweDhmOTY7XG5leHBvcnQgY29uc3QgR0xfUkdCOEkgPSAweDhkOGY7XG5leHBvcnQgY29uc3QgR0xfUkdCOFVJID0gMHg4ZDdkO1xuZXhwb3J0IGNvbnN0IEdMX1JHQjlfRTUgPSAweDhjM2Q7XG5leHBvcnQgY29uc3QgR0xfUkdCQSA9IDB4MTkwODtcbmV4cG9ydCBjb25zdCBHTF9SR0JBX0lOVEVHRVIgPSAweDhkOTk7XG5leHBvcnQgY29uc3QgR0xfUkdCQTE2RiA9IDB4ODgxYTtcbmV4cG9ydCBjb25zdCBHTF9SR0JBMTZJID0gMHg4ZDg4O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkExNlVJID0gMHg4ZDc2O1xuZXhwb3J0IGNvbnN0IEdMX1JHQkEzMkYgPSAweDg4MTQ7XG5leHBvcnQgY29uc3QgR0xfUkdCQTMyRl9FWFQgPSAweDg4MTQ7XG5leHBvcnQgY29uc3QgR0xfUkdCQTMySSA9IDB4OGQ4MjtcbmV4cG9ydCBjb25zdCBHTF9SR0JBMzJVSSA9IDB4OGQ3MDtcbmV4cG9ydCBjb25zdCBHTF9SR0JBNCA9IDB4ODA1NjtcbmV4cG9ydCBjb25zdCBHTF9SR0JBOCA9IDB4ODA1ODtcbmV4cG9ydCBjb25zdCBHTF9SR0JBOF9TTk9STSA9IDB4OGY5NztcbmV4cG9ydCBjb25zdCBHTF9SR0JBOEkgPSAweDhkOGU7XG5leHBvcnQgY29uc3QgR0xfUkdCQThVSSA9IDB4OGQ3YztcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVfQUxQSEFfVE9fQ09WRVJBR0UgPSAweDgwOWU7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFX0JVRkZFUlMgPSAweDgwYTg7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFX0NPVkVSQUdFID0gMHg4MGEwO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRV9DT1ZFUkFHRV9JTlZFUlQgPSAweDgwYWI7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFX0NPVkVSQUdFX1ZBTFVFID0gMHg4MGFhO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRVJfMkQgPSAweDhiNWU7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl8yRF9BUlJBWSA9IDB4OGRjMTtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSXzJEX0FSUkFZX1NIQURPVyA9IDB4OGRjNDtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSXzJEX1NIQURPVyA9IDB4OGI2MjtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSXzNEID0gMHg4YjVmO1xuZXhwb3J0IGNvbnN0IEdMX1NBTVBMRVJfQklORElORyA9IDB4ODkxOTtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVSX0NVQkUgPSAweDhiNjA7XG5leHBvcnQgY29uc3QgR0xfU0FNUExFUl9DVUJFX1NIQURPVyA9IDB4OGRjNTtcbmV4cG9ydCBjb25zdCBHTF9TQU1QTEVTID0gMHg4MGE5O1xuZXhwb3J0IGNvbnN0IEdMX1NDSVNTT1JfQk9YID0gMHgwYzEwO1xuZXhwb3J0IGNvbnN0IEdMX1NDSVNTT1JfVEVTVCA9IDB4MGMxMTtcbmV4cG9ydCBjb25zdCBHTF9TRVBBUkFURV9BVFRSSUJTID0gMHg4YzhkO1xuZXhwb3J0IGNvbnN0IEdMX1NIQURFUl9UWVBFID0gMHg4YjRmO1xuZXhwb3J0IGNvbnN0IEdMX1NIQURJTkdfTEFOR1VBR0VfVkVSU0lPTiA9IDB4OGI4YztcbmV4cG9ydCBjb25zdCBHTF9TSE9SVCA9IDB4MTQwMjtcbmV4cG9ydCBjb25zdCBHTF9TSUdOQUxFRCA9IDB4OTExOTtcbmV4cG9ydCBjb25zdCBHTF9TSUdORURfTk9STUFMSVpFRCA9IDB4OGY5YztcbmV4cG9ydCBjb25zdCBHTF9TUkNfQUxQSEEgPSAweDAzMDI7XG5leHBvcnQgY29uc3QgR0xfU1JDX0FMUEhBX1NBVFVSQVRFID0gMHgwMzA4O1xuZXhwb3J0IGNvbnN0IEdMX1NSQ19DT0xPUiA9IDB4MDMwMDtcbmV4cG9ydCBjb25zdCBHTF9TUkdCID0gMHg4YzQwO1xuZXhwb3J0IGNvbnN0IEdMX1NSR0JfQUxQSEFfRVhUID0gMHg4YzQyO1xuZXhwb3J0IGNvbnN0IEdMX1NSR0JfRVhUID0gMHg4YzQwO1xuZXhwb3J0IGNvbnN0IEdMX1NSR0I4ID0gMHg4YzQxO1xuZXhwb3J0IGNvbnN0IEdMX1NSR0I4X0FMUEhBOCA9IDB4OGM0MztcbmV4cG9ydCBjb25zdCBHTF9TUkdCOF9BTFBIQThfRVhUID0gMHg4YzQzO1xuZXhwb3J0IGNvbnN0IEdMX1NUQVRJQ19DT1BZID0gMHg4OGU2O1xuZXhwb3J0IGNvbnN0IEdMX1NUQVRJQ19EUkFXID0gMHg4OGU0O1xuZXhwb3J0IGNvbnN0IEdMX1NUQVRJQ19SRUFEID0gMHg4OGU1O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUwgPSAweDE4MDI7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9BVFRBQ0hNRU5UID0gMHg4ZDIwO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19GQUlMID0gMHg4ODAxO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19GVU5DID0gMHg4ODAwO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19QQVNTX0RFUFRIX0ZBSUwgPSAweDg4MDI7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9CQUNLX1BBU1NfREVQVEhfUEFTUyA9IDB4ODgwMztcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0JBQ0tfUkVGID0gMHg4Y2EzO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19WQUxVRV9NQVNLID0gMHg4Y2E0O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQkFDS19XUklURU1BU0sgPSAweDhjYTU7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9CSVRTID0gMHgwZDU3O1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfQlVGRkVSX0JJVCA9IDB4MDAwMDA0MDA7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9DTEVBUl9WQUxVRSA9IDB4MGI5MTtcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX0ZBSUwgPSAweDBiOTQ7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9GVU5DID0gMHgwYjkyO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfSU5ERVggPSAweDE5MDE7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9JTkRFWDggPSAweDhkNDg7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9QQVNTX0RFUFRIX0ZBSUwgPSAweDBiOTU7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9QQVNTX0RFUFRIX1BBU1MgPSAweDBiOTY7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9SRUYgPSAweDBiOTc7XG5leHBvcnQgY29uc3QgR0xfU1RFTkNJTF9URVNUID0gMHgwYjkwO1xuZXhwb3J0IGNvbnN0IEdMX1NURU5DSUxfVkFMVUVfTUFTSyA9IDB4MGI5MztcbmV4cG9ydCBjb25zdCBHTF9TVEVOQ0lMX1dSSVRFTUFTSyA9IDB4MGI5ODtcbmV4cG9ydCBjb25zdCBHTF9TVFJFQU1fQ09QWSA9IDB4ODhlMjtcbmV4cG9ydCBjb25zdCBHTF9TVFJFQU1fRFJBVyA9IDB4ODhlMDtcbmV4cG9ydCBjb25zdCBHTF9TVFJFQU1fUkVBRCA9IDB4ODhlMTtcbmV4cG9ydCBjb25zdCBHTF9TVUJQSVhFTF9CSVRTID0gMHgwZDUwO1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfQ09ORElUSU9OID0gMHg5MTEzO1xuZXhwb3J0IGNvbnN0IEdMX1NZTkNfRkVOQ0UgPSAweDkxMTY7XG5leHBvcnQgY29uc3QgR0xfU1lOQ19GTEFHUyA9IDB4OTExNTtcbmV4cG9ydCBjb25zdCBHTF9TWU5DX0ZMVVNIX0NPTU1BTkRTX0JJVCA9IDB4MDAwMDAwMDE7XG5leHBvcnQgY29uc3QgR0xfU1lOQ19HUFVfQ09NTUFORFNfQ09NUExFVEUgPSAweDkxMTc7XG5leHBvcnQgY29uc3QgR0xfU1lOQ19TVEFUVVMgPSAweDkxMTQ7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRSA9IDB4MTcwMjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFXzJEID0gMHgwZGUxO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfMkRfQVJSQVkgPSAweDhjMWE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV8zRCA9IDB4ODA2ZjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0JBU0VfTEVWRUwgPSAweDgxM2M7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9CSU5ESU5HXzJEID0gMHg4MDY5O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQklORElOR18yRF9BUlJBWSA9IDB4OGMxZDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0JJTkRJTkdfM0QgPSAweDgwNmE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9CSU5ESU5HX0NVQkVfTUFQID0gMHg4NTE0O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ09NUEFSRV9GVU5DID0gMHg4ODRkO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ09NUEFSRV9NT0RFID0gMHg4ODRjO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVAgPSAweDg1MTM7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9YID0gMHg4NTE2O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWSA9IDB4ODUxODtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1ogPSAweDg1MWE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YID0gMHg4NTE1O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWSA9IDB4ODUxNztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1ogPSAweDg1MTk7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9JTU1VVEFCTEVfRk9STUFUID0gMHg5MTJmO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfSU1NVVRBQkxFX0xFVkVMUyA9IDB4ODJkZjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX01BR19GSUxURVIgPSAweDI4MDA7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NQVhfQU5JU09UUk9QWV9FWFQgPSAweDg0ZmU7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NQVhfTEVWRUwgPSAweDgxM2Q7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9NQVhfTE9EID0gMHg4MTNiO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkVfTUlOX0ZJTFRFUiA9IDB4MjgwMTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFX01JTl9MT0QgPSAweDgxM2E7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9XUkFQX1IgPSAweDgwNzI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9XUkFQX1MgPSAweDI4MDI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRV9XUkFQX1QgPSAweDI4MDM7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTAgPSAweDg0YzA7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTEgPSAweDg0YzE7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTEwID0gMHg4NGNhO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxMSA9IDB4ODRjYjtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTIgPSAweDg0Y2M7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTEzID0gMHg4NGNkO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxNCA9IDB4ODRjZTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTUgPSAweDg0Y2Y7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTE2ID0gMHg4NGQwO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUxNyA9IDB4ODRkMTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMTggPSAweDg0ZDI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTE5ID0gMHg4NGQzO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyID0gMHg4NGMyO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyMCA9IDB4ODRkNDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjEgPSAweDg0ZDU7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTIyID0gMHg4NGQ2O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyMyA9IDB4ODRkNztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjQgPSAweDg0ZDg7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTI1ID0gMHg4NGQ5O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyNiA9IDB4ODRkYTtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMjcgPSAweDg0ZGI7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTI4ID0gMHg4NGRjO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkUyOSA9IDB4ODRkZDtcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMyA9IDB4ODRjMztcbmV4cG9ydCBjb25zdCBHTF9URVhUVVJFMzAgPSAweDg0ZGU7XG5leHBvcnQgY29uc3QgR0xfVEVYVFVSRTMxID0gMHg4NGRmO1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU0ID0gMHg4NGM0O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU1ID0gMHg4NGM1O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU2ID0gMHg4NGM2O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU3ID0gMHg4NGM3O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU4ID0gMHg4NGM4O1xuZXhwb3J0IGNvbnN0IEdMX1RFWFRVUkU5ID0gMHg4NGM5O1xuZXhwb3J0IGNvbnN0IEdMX1RJTUVfRUxBUFNFRF9FWFQgPSAweDg4YmY7XG5leHBvcnQgY29uc3QgR0xfVElNRU9VVF9FWFBJUkVEID0gMHg5MTFiO1xuZXhwb3J0IGNvbnN0IEdMX1RJTUVPVVRfSUdOT1JFRCA9IC0xO1xuZXhwb3J0IGNvbnN0IEdMX1RJTUVTVEFNUF9FWFQgPSAweDhlMjg7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLID0gMHg4ZTIyO1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19BQ1RJVkUgPSAweDhlMjQ7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JJTkRJTkcgPSAweDhlMjU7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUiA9IDB4OGM4ZTtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfQlVGRkVSX0JJTkRJTkcgPSAweDhjOGY7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX0JVRkZFUl9NT0RFID0gMHg4YzdmO1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19CVUZGRVJfU0laRSA9IDB4OGM4NTtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfQlVGRkVSX1NUQVJUID0gMHg4Yzg0O1xuZXhwb3J0IGNvbnN0IEdMX1RSQU5TRk9STV9GRUVEQkFDS19QQVVTRUQgPSAweDhlMjM7XG5leHBvcnQgY29uc3QgR0xfVFJBTlNGT1JNX0ZFRURCQUNLX1BSSU1JVElWRVNfV1JJVFRFTiA9IDB4OGM4ODtcbmV4cG9ydCBjb25zdCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0tfVkFSWUlOR1MgPSAweDhjODM7XG5leHBvcnQgY29uc3QgR0xfVFJJQU5HTEVfRkFOID0gMHgwMDA2O1xuZXhwb3J0IGNvbnN0IEdMX1RSSUFOR0xFX1NUUklQID0gMHgwMDA1O1xuZXhwb3J0IGNvbnN0IEdMX1RSSUFOR0xFUyA9IDB4MDAwNDtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0FSUkFZX1NUUklERSA9IDB4OGEzYztcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JMT0NLX0FDVElWRV9VTklGT1JNX0lORElDRVMgPSAweDhhNDM7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19BQ1RJVkVfVU5JRk9STVMgPSAweDhhNDI7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19CSU5ESU5HID0gMHg4YTNmO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfREFUQV9TSVpFID0gMHg4YTQwO1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQkxPQ0tfSU5ERVggPSAweDhhM2E7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CTE9DS19SRUZFUkVOQ0VEX0JZX0ZSQUdNRU5UX1NIQURFUiA9IDB4OGE0NjtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JMT0NLX1JFRkVSRU5DRURfQllfVkVSVEVYX1NIQURFUiA9IDB4OGE0NDtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JVRkZFUiA9IDB4OGExMTtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JVRkZFUl9CSU5ESU5HID0gMHg4YTI4O1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fQlVGRkVSX09GRlNFVF9BTElHTk1FTlQgPSAweDhhMzQ7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9CVUZGRVJfU0laRSA9IDB4OGEyYTtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0JVRkZFUl9TVEFSVCA9IDB4OGEyOTtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX0lTX1JPV19NQUpPUiA9IDB4OGEzZTtcbmV4cG9ydCBjb25zdCBHTF9VTklGT1JNX01BVFJJWF9TVFJJREUgPSAweDhhM2Q7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9PRkZTRVQgPSAweDhhM2I7XG5leHBvcnQgY29uc3QgR0xfVU5JRk9STV9TSVpFID0gMHg4YTM4O1xuZXhwb3J0IGNvbnN0IEdMX1VOSUZPUk1fVFlQRSA9IDB4OGEzNztcbmV4cG9ydCBjb25zdCBHTF9VTk1BU0tFRF9SRU5ERVJFUl9XRUJHTCA9IDB4OTI0NjtcbmV4cG9ydCBjb25zdCBHTF9VTk1BU0tFRF9WRU5ET1JfV0VCR0wgPSAweDkyNDU7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX0FMSUdOTUVOVCA9IDB4MGNmNTtcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfQ09MT1JTUEFDRV9DT05WRVJTSU9OX1dFQkdMID0gMHg5MjQzO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19GTElQX1lfV0VCR0wgPSAweDkyNDA7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX0lNQUdFX0hFSUdIVCA9IDB4ODA2ZTtcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfUFJFTVVMVElQTFlfQUxQSEFfV0VCR0wgPSAweDkyNDE7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX1JPV19MRU5HVEggPSAweDBjZjI7XG5leHBvcnQgY29uc3QgR0xfVU5QQUNLX1NLSVBfSU1BR0VTID0gMHg4MDZkO1xuZXhwb3J0IGNvbnN0IEdMX1VOUEFDS19TS0lQX1BJWEVMUyA9IDB4MGNmNDtcbmV4cG9ydCBjb25zdCBHTF9VTlBBQ0tfU0tJUF9ST1dTID0gMHgwY2YzO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkFMRUQgPSAweDkxMTg7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfQllURSA9IDB4MTQwMTtcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlQgPSAweDE0MDU7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzEwRl8xMUZfMTFGX1JFViA9IDB4OGMzYjtcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9JTlRfMl8xMF8xMF8xMF9SRVYgPSAweDgzNjg7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzI0XzggPSAweDg0ZmE7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzI0XzhfV0VCR0wgPSAweDg0ZmE7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UXzVfOV85XzlfUkVWID0gMHg4YzNlO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9TQU1QTEVSXzJEID0gMHg4ZGQyO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9TQU1QTEVSXzJEX0FSUkFZID0gMHg4ZGQ3O1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9TQU1QTEVSXzNEID0gMHg4ZGQzO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX0lOVF9TQU1QTEVSX0NVQkUgPSAweDhkZDQ7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UX1ZFQzIgPSAweDhkYzY7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UX1ZFQzMgPSAweDhkYzc7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfSU5UX1ZFQzQgPSAweDhkYzg7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfTk9STUFMSVpFRCA9IDB4OGMxNztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9OT1JNQUxJWkVEX0VYVCA9IDB4OGMxNztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9TSE9SVCA9IDB4MTQwMztcbmV4cG9ydCBjb25zdCBHTF9VTlNJR05FRF9TSE9SVF80XzRfNF80ID0gMHg4MDMzO1xuZXhwb3J0IGNvbnN0IEdMX1VOU0lHTkVEX1NIT1JUXzVfNV81XzEgPSAweDgwMzQ7XG5leHBvcnQgY29uc3QgR0xfVU5TSUdORURfU0hPUlRfNV82XzUgPSAweDgzNjM7XG5leHBvcnQgY29uc3QgR0xfVkFMSURBVEVfU1RBVFVTID0gMHg4YjgzO1xuZXhwb3J0IGNvbnN0IEdMX1ZFTkRPUiA9IDB4MWYwMDtcbmV4cG9ydCBjb25zdCBHTF9WRVJTSU9OID0gMHgxZjAyO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BUlJBWV9CSU5ESU5HID0gMHg4NWI1O1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BUlJBWV9CSU5ESU5HX09FUyA9IDB4ODViNTtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX0JVRkZFUl9CSU5ESU5HID0gMHg4ODlmO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfRElWSVNPUiA9IDB4ODhmZTtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX0RJVklTT1JfQU5HTEUgPSAweDg4ZmU7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9FTkFCTEVEID0gMHg4NjIyO1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfSU5URUdFUiA9IDB4ODhmZDtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX05PUk1BTElaRUQgPSAweDg4NmE7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX0FUVFJJQl9BUlJBWV9QT0lOVEVSID0gMHg4NjQ1O1xuZXhwb3J0IGNvbnN0IEdMX1ZFUlRFWF9BVFRSSUJfQVJSQVlfU0laRSA9IDB4ODYyMztcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX1NUUklERSA9IDB4ODYyNDtcbmV4cG9ydCBjb25zdCBHTF9WRVJURVhfQVRUUklCX0FSUkFZX1RZUEUgPSAweDg2MjU7XG5leHBvcnQgY29uc3QgR0xfVkVSVEVYX1NIQURFUiA9IDB4OGIzMTtcbmV4cG9ydCBjb25zdCBHTF9WSUVXUE9SVCA9IDB4MGJhMjtcbmV4cG9ydCBjb25zdCBHTF9XQUlUX0ZBSUxFRCA9IDB4OTExZDtcbmV4cG9ydCBjb25zdCBHTF9aRVJPID0gMDtcbiIsImV4cG9ydCBjb25zdCBHTENhdEVycm9ycyA9IHtcbiAgZ2V0IFVuZXhwZWN0ZWROdWxsRXJyb3IoKTogRXJyb3Ige1xuICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCAnR0xDYXQ6IFVuZXhwZWN0ZWQgbnVsbCBkZXRlY3RlZCcgKTtcbiAgICBlcnJvci5uYW1lID0gJ1VuZXhwZWN0ZWROdWxsRXJyb3InO1xuICAgIHJldHVybiBlcnJvcjtcbiAgfSxcbiAgZ2V0IFdlYkdMMkV4Y2x1c2l2ZUVycm9yKCk6IEVycm9yIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvciggJ0dMQ2F0OiBBdHRlbXB0ZWQgdG8gdXNlIFdlYkdMMiBleGNsdXNpdmUgc3R1ZmYnICk7XG4gICAgZXJyb3IubmFtZSA9ICdXZWJHTDJFeGNsdXNpdmVFcnJvcic7XG4gICAgcmV0dXJuIGVycm9yO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgR0xfQ09NUExFVElPTl9TVEFUVVNfS0hSLCBHTF9GTE9BVCwgR0xfTElOS19TVEFUVVMsIEdMX1RFWFRVUkUwIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0QnVmZmVyIH0gZnJvbSAnLi9HTENhdEJ1ZmZlcic7XG5pbXBvcnQgeyBHTENhdEVycm9ycyB9IGZyb20gJy4vR0xDYXRFcnJvcnMnO1xuaW1wb3J0IHR5cGUgeyBHTENhdFNoYWRlciB9IGZyb20gJy4vR0xDYXRTaGFkZXInO1xuaW1wb3J0IHR5cGUgeyBHTENhdFRleHR1cmUgfSBmcm9tICcuL0dMQ2F0VGV4dHVyZSc7XG5cbmV4cG9ydCB0eXBlIEdMQ2F0UHJvZ3JhbVVuaWZvcm1UeXBlID1cbiAgJzFmJyB8ICcyZicgfCAnM2YnIHwgJzRmJyB8XG4gICcxaScgfCAnMmknIHwgJzNpJyB8ICc0aScgfFxuICAnMWZ2JyB8ICcyZnYnIHwgJzNmdicgfCAnNGZ2JyB8XG4gICcxaXYnIHwgJzJpdicgfCAnM2l2JyB8ICc0aXYnIHxcbiAgJ01hdHJpeDJmdicgfCAnTWF0cml4M2Z2JyB8ICdNYXRyaXg0ZnYnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdMQ2F0UHJvZ3JhbUxpbmtPcHRpb25zIHtcbiAgdHJhbnNmb3JtRmVlZGJhY2tWYXJ5aW5ncz86IHN0cmluZ1tdLFxuXG4gIC8qKlxuICAgKiBgZ2wuU0VQQVJBVEVfQVRUUklCU2AgYnkgZGVmYXVsdFxuICAgKi9cbiAgdHJhbnNmb3JtRmVlZGJhY2tCdWZmZXJNb2RlPzogbnVtYmVyLFxufVxuXG4vKipcbiAqIEl0J3MgYSBXZWJHTFByb2dyYW0sIGJ1dCBoYXMgY2FjaGUgb2YgdmFyaWFibGUgbG9jYXRpb25zLlxuICovXG5leHBvcnQgY2xhc3MgR0xDYXRQcm9ncmFtPFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3Byb2dyYW06IFdlYkdMUHJvZ3JhbTtcbiAgcHJpdmF0ZSBfX3NoYWRlcnM6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PltdIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX19hdHRyaWJMb2NhdGlvbkNhY2hlOiB7IFsgbmFtZTogc3RyaW5nIF06IG51bWJlciB9ID0ge307XG4gIHByaXZhdGUgX191bmlmb3JtTG9jYXRpb25DYWNoZTogeyBbIG5hbWU6IHN0cmluZyBdOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB8IG51bGwgfSA9IHt9O1xuICBwcml2YXRlIF9fdW5pZm9ybVRleHR1cmVVbml0TWFwOiB7IFsgbmFtZTogc3RyaW5nIF06IG51bWJlciB9ID0ge307XG4gIHByaXZhdGUgX191bmlmb3JtdGV4dHVyZVVuaXRJbmRleCA9IDA7XG4gIHByaXZhdGUgX19saW5rZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogSXRzIG93biBwcm9ncmFtLlxuICAgKi9cbiAgcHVibGljIGdldCBwcm9ncmFtKCk6IFdlYkdMUHJvZ3JhbSB7XG4gICAgcmV0dXJuIHRoaXMuX19wcm9ncmFtO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcHJvZ3JhbS4gU2hvcnRlciB0aGFuIFtbR0xDYXRQcm9ncmFtLnByb2dyYW1dXS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3KCk6IFdlYkdMUHJvZ3JhbSB7XG4gICAgcmV0dXJuIHRoaXMuX19wcm9ncmFtO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBzaGFkZXJzLlxuICAgKi9cbiAgcHVibGljIGdldCBzaGFkZXJzKCk6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PltdIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX19zaGFkZXJzID8gdGhpcy5fX3NoYWRlcnMuY29uY2F0KCkgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGxhc3QgbGluayBvcGVyYXRpb24gd2FzIHN1Y2Nlc3NmdWwgb3Igbm90LlxuICAgKi9cbiAgcHVibGljIGdldCBpc0xpbmtlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fX2xpbmtlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRQcm9ncmFtIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBwcm9ncmFtOiBXZWJHTFByb2dyYW0gKSB7XG4gICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XG4gICAgdGhpcy5fX3Byb2dyYW0gPSBwcm9ncmFtO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHByb2dyYW0uXG4gICAqL1xuICBwdWJsaWMgZGlzcG9zZSggYWxzb0F0dGFjaGVkID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgZ2wuZGVsZXRlUHJvZ3JhbSggdGhpcy5fX3Byb2dyYW0gKTtcblxuICAgIGlmICggYWxzb0F0dGFjaGVkICkge1xuICAgICAgY29uc3Qgc2hhZGVycyA9IHRoaXMuc2hhZGVycztcbiAgICAgIGlmICggc2hhZGVycyApIHtcbiAgICAgICAgc2hhZGVycy5mb3JFYWNoKCAoIHNoYWRlciApID0+IHtcbiAgICAgICAgICBzaGFkZXIuZGlzcG9zZSgpO1xuICAgICAgICB9ICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBzaGFkZXJzIGFuZCBsaW5rIHRoaXMgcHJvZ3JhbS5cbiAgICovXG4gIHB1YmxpYyBsaW5rKFxuICAgIHNoYWRlcnM6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PltdLFxuICAgIG9wdGlvbnM6IEdMQ2F0UHJvZ3JhbUxpbmtPcHRpb25zID0ge30sXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHNoYWRlcnMuZm9yRWFjaCggKCBzaGFkZXIgKSA9PiBnbC5hdHRhY2hTaGFkZXIoIHRoaXMuX19wcm9ncmFtLCBzaGFkZXIucmF3ICkgKTtcblxuICAgIGlmICggb3B0aW9ucy50cmFuc2Zvcm1GZWVkYmFja1ZhcnlpbmdzICkge1xuICAgICAgaWYgKCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYmIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgICAgZ2wudHJhbnNmb3JtRmVlZGJhY2tWYXJ5aW5ncyhcbiAgICAgICAgICB0aGlzLl9fcHJvZ3JhbSxcbiAgICAgICAgICBvcHRpb25zLnRyYW5zZm9ybUZlZWRiYWNrVmFyeWluZ3MsXG4gICAgICAgICAgb3B0aW9ucy50cmFuc2Zvcm1GZWVkYmFja0J1ZmZlck1vZGUgPz8gZ2wuU0VQQVJBVEVfQVRUUklCU1xuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgR0xDYXRFcnJvcnMuV2ViR0wyRXhjbHVzaXZlRXJyb3I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2wubGlua1Byb2dyYW0oIHRoaXMuX19wcm9ncmFtICk7XG5cbiAgICB0aGlzLl9fbGlua2VkID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlciggdGhpcy5fX3Byb2dyYW0sIEdMX0xJTktfU1RBVFVTICk7XG4gICAgaWYgKCAhdGhpcy5fX2xpbmtlZCApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvciggZ2wuZ2V0UHJvZ3JhbUluZm9Mb2coIHRoaXMuX19wcm9ncmFtICkhICk7XG4gICAgfVxuXG4gICAgdGhpcy5fX3NoYWRlcnMgPSBzaGFkZXJzLmNvbmNhdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBzaGFkZXJzIGFuZCBsaW5rIHRoaXMgcHJvZ3JhbS5cbiAgICogSXQncyBnb25uYSBiZSBhc3luY2hyb25vdXMgaWYgeW91IGhhdmUgdGhlIEtIUl9wYXJhbGxlbF9zaGFkZXJfY29tcGlsZSBleHRlbnNpb24gc3VwcG9ydC5cbiAgICovXG4gIHB1YmxpYyBsaW5rQXN5bmMoXG4gICAgc2hhZGVyczogR0xDYXRTaGFkZXI8VENvbnRleHQ+W10sXG4gICAgb3B0aW9uczogR0xDYXRQcm9ncmFtTGlua09wdGlvbnMgPSB7fSxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZ2xDYXQgPSB0aGlzLl9fZ2xDYXQ7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuICAgIGNvbnN0IGV4dFBhcmFsbGVsID0gZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnS0hSX3BhcmFsbGVsX3NoYWRlcl9jb21waWxlJyApO1xuXG4gICAgc2hhZGVycy5mb3JFYWNoKCAoIHNoYWRlciApID0+IGdsLmF0dGFjaFNoYWRlciggdGhpcy5fX3Byb2dyYW0sIHNoYWRlci5yYXcgKSApO1xuXG4gICAgaWYgKCBvcHRpb25zLnRyYW5zZm9ybUZlZWRiYWNrVmFyeWluZ3MgKSB7XG4gICAgICBpZiAoIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgJiYgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgICBnbC50cmFuc2Zvcm1GZWVkYmFja1ZhcnlpbmdzKFxuICAgICAgICAgIHRoaXMuX19wcm9ncmFtLFxuICAgICAgICAgIG9wdGlvbnMudHJhbnNmb3JtRmVlZGJhY2tWYXJ5aW5ncyxcbiAgICAgICAgICBvcHRpb25zLnRyYW5zZm9ybUZlZWRiYWNrQnVmZmVyTW9kZSA/PyBnbC5TRVBBUkFURV9BVFRSSUJTXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBHTENhdEVycm9ycy5XZWJHTDJFeGNsdXNpdmVFcnJvcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnbC5saW5rUHJvZ3JhbSggdGhpcy5fX3Byb2dyYW0gKTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSggKCByZXNvbHZlLCByZWplY3QgKSA9PiB7XG4gICAgICBjb25zdCB1cGRhdGUgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhZXh0UGFyYWxsZWwgfHxcbiAgICAgICAgICBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKCB0aGlzLl9fcHJvZ3JhbSwgR0xfQ09NUExFVElPTl9TVEFUVVNfS0hSICkgPT09IHRydWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5fX2xpbmtlZCA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIoIHRoaXMuX19wcm9ncmFtLCBHTF9MSU5LX1NUQVRVUyApO1xuICAgICAgICAgIGlmICggIXRoaXMuX19saW5rZWQgKSB7XG4gICAgICAgICAgICByZWplY3QoIG5ldyBFcnJvciggZ2wuZ2V0UHJvZ3JhbUluZm9Mb2coIHRoaXMuX19wcm9ncmFtICkgPz8gJ251bGwnICkgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9fc2hhZGVycyA9IHNoYWRlcnMuY29uY2F0KCk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggdXBkYXRlICk7XG4gICAgICB9O1xuICAgICAgdXBkYXRlKCk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiBhdHRyaWJ1dGUgdmFyaWFibGUuXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB2YXJpYWJsZVxuICAgKiBAcGFyYW0gYnVmZmVyIFZlcnRleCBidWZmZXIuIENhbiBiZSBudWxsLCB0byBkaXNhYmxlIGF0dHJpYnV0ZSBhcnJheVxuICAgKiBAcGFyYW0gc2l6ZSBOdW1iZXIgb2YgY29tcG9uZW50cyBwZXIgdmVydGV4LiBNdXN0IGJlIDEsIDIsIDMgb3IgNFxuICAgKi9cbiAgcHVibGljIGF0dHJpYnV0ZShcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgYnVmZmVyOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsLFxuICAgIHNpemUgPSAxLFxuICAgIGRpdmlzb3IgPSAwLFxuICAgIHR5cGU6IG51bWJlciA9IEdMX0ZMT0FULFxuICAgIHN0cmlkZSA9IDAsXG4gICAgb2Zmc2V0ID0gMFxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0QXR0cmliTG9jYXRpb24oIG5hbWUgKTtcbiAgICBpZiAoIGxvY2F0aW9uID09PSAtMSApIHsgcmV0dXJuOyB9XG5cbiAgICBpZiAoIGJ1ZmZlciA9PT0gbnVsbCApIHtcbiAgICAgIGdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheSggbG9jYXRpb24gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFZlcnRleEJ1ZmZlciggYnVmZmVyLCAoKSA9PiB7XG4gICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSggbG9jYXRpb24gKTtcbiAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoIGxvY2F0aW9uLCBzaXplLCB0eXBlLCBmYWxzZSwgc3RyaWRlLCBvZmZzZXQgKTtcblxuICAgICAgaWYgKCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYmIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgICAgZ2wudmVydGV4QXR0cmliRGl2aXNvciggbG9jYXRpb24sIGRpdmlzb3IgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4dCA9IHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJyApO1xuICAgICAgICBpZiAoIGV4dCApIHtcbiAgICAgICAgICBleHQudmVydGV4QXR0cmliRGl2aXNvckFOR0xFKCBsb2NhdGlvbiwgZGl2aXNvciApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtIHZhcmlhYmxlLlxuICAgKiBTZWUgYWxzbzogW1tHTENhdFByb2dyYW0udW5pZm9ybVZlY3Rvcl1dXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybSggbmFtZTogc3RyaW5nLCB0eXBlOiBHTENhdFByb2dyYW1Vbmlmb3JtVHlwZSwgLi4udmFsdWU6IG51bWJlcltdICk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bmMgPSAoIHRoaXMgYXMgYW55IClbICd1bmlmb3JtJyArIHR5cGUgXTtcbiAgICBmdW5jLmNhbGwoIHRoaXMsIG5hbWUsIC4uLnZhbHVlICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0gdmFyaWFibGUuXG4gICAqIFNlZSBhbHNvOiBbW0dMQ2F0UHJvZ3JhbS51bmlmb3JtXV1cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtVmVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICB0eXBlOiBHTENhdFByb2dyYW1Vbmlmb3JtVHlwZSxcbiAgICB2YWx1ZTogRmxvYXQzMkxpc3QgfCBJbnQzMkxpc3RcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgZnVuYyA9ICggdGhpcyBhcyBhbnkgKVsgJ3VuaWZvcm0nICsgdHlwZSBdO1xuICAgIGZ1bmMuY2FsbCggdGhpcywgbmFtZSwgdmFsdWUgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTFpIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0xaSggbmFtZTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFpKCBsb2NhdGlvbiwgdmFsdWUgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0yaSB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMmkoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMmkoIGxvY2F0aW9uLCB4LCB5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtM2kgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTNpKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtM2koIGxvY2F0aW9uLCB4LCB5LCB6ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtNGkgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTRpKCBuYW1lOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm00aSggbG9jYXRpb24sIHgsIHksIHosIHcgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0xaXYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTFpdiggbmFtZTogc3RyaW5nLCBhcnJheTogSW50MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFpdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMml2IHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0yaXYoIG5hbWU6IHN0cmluZywgYXJyYXk6IEludDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0yaXYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTNpdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2l2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBJbnQzMkxpc3QgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtM2l2KCBsb2NhdGlvbiwgYXJyYXkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm00aXYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTRpdiggbmFtZTogc3RyaW5nLCBhcnJheTogSW50MzJMaXN0ICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTRpdiggbG9jYXRpb24sIGFycmF5ICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbiB1bmlmb3JtMWYgdmFyaWFibGUuXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTFmKCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtMWYoIGxvY2F0aW9uLCB2YWx1ZSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTJmIHZhcmlhYmxlLlxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0yZiggbmFtZTogc3RyaW5nLCB4OiBudW1iZXIsIHk6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0yZiggbG9jYXRpb24sIHgsIHkgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm0zZiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2YoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0zZiggbG9jYXRpb24sIHgsIHksIHogKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGFuIHVuaWZvcm00ZiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtNGYoIG5hbWU6IHN0cmluZywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24oIG5hbWUgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTRmKCBsb2NhdGlvbiwgeCwgeSwgeiwgdyApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTFmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMWZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTJmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMmZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0yZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTNmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2Z2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0zZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybTRmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtNGZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm00ZnYoIGxvY2F0aW9uLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDJmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4MmZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCwgdHJhbnNwb3NlID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtTWF0cml4MmZ2KCBsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDNmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4M2Z2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCwgdHJhbnNwb3NlID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtTWF0cml4M2Z2KCBsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDRmdiB2YXJpYWJsZS5cbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4NGZ2KCBuYW1lOiBzdHJpbmcsIGFycmF5OiBGbG9hdDMyTGlzdCwgdHJhbnNwb3NlID0gZmFsc2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIHRoaXMuX19nbENhdC51c2VQcm9ncmFtKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KCBsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBgc2FtcGxlcjJEYCB0eXBlIHVuaWZvcm0gdGV4dHVyZS5cbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgdW5pZm9ybSB0ZXh0dXJlXG4gICAqIEBwYXJhbSB0ZXh0dXJlIFRleHR1cmUgb2JqZWN0XG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybVRleHR1cmUoIG5hbWU6IHN0cmluZywgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZSApO1xuICAgIGNvbnN0IHVuaXQgPSB0aGlzLmdldFVuaWZvcm1UZXh0dXJlVW5pdCggbmFtZSApO1xuICAgIGdsLmFjdGl2ZVRleHR1cmUoIEdMX1RFWFRVUkUwICsgdW5pdCApO1xuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0ZXh0dXJlID8/IG51bGwgKTtcbiAgICB0aGlzLl9fZ2xDYXQudXNlUHJvZ3JhbSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wudW5pZm9ybTFpKCBsb2NhdGlvbiwgdW5pdCApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBgc2FtcGxlckN1YmVgIHR5cGUgdW5pZm9ybSB0ZXh0dXJlLlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSB1bmlmb3JtIHRleHR1cmVcbiAgICogQHBhcmFtIHRleHR1cmUgVGV4dHVyZSBvYmplY3RcbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtQ3ViZW1hcCggbmFtZTogc3RyaW5nLCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKCBuYW1lICk7XG4gICAgY29uc3QgdW5pdCA9IHRoaXMuZ2V0VW5pZm9ybVRleHR1cmVVbml0KCBuYW1lICk7XG4gICAgZ2wuYWN0aXZlVGV4dHVyZSggR0xfVEVYVFVSRTAgKyB1bml0ICk7XG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlQ3ViZU1hcCggdGV4dHVyZSA/PyBudWxsICk7XG4gICAgdGhpcy5fX2dsQ2F0LnVzZVByb2dyYW0oIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnVuaWZvcm0xaSggbG9jYXRpb24sIHVuaXQgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgYXR0cmlidXRlIGxvY2F0aW9uLlxuICAgKi9cbiAgcHVibGljIGdldEF0dHJpYkxvY2F0aW9uKCBuYW1lOiBzdHJpbmcgKTogbnVtYmVyIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBpZiAoIHRoaXMuX19hdHRyaWJMb2NhdGlvbkNhY2hlWyBuYW1lIF0gIT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fYXR0cmliTG9jYXRpb25DYWNoZVsgbmFtZSBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKCB0aGlzLl9fcHJvZ3JhbSwgbmFtZSApO1xuICAgICAgLy8gaWYgKCBsb2NhdGlvbiA9PT0gLTEgKSB7XG4gICAgICAvLyAgIHRoaXMuZ2xDYXQuc3BpdCggJ0dMQ2F0UHJvZ3JhbS5nZXRBdHRyaWJMb2NhdGlvbjogQ291bGQgbm90IHJldHJpZXZlIGF0dHJpYnV0ZSBsb2NhdGlvbicgKTtcbiAgICAgIC8vICAgcmV0dXJuIC0xO1xuICAgICAgLy8gfVxuICAgICAgdGhpcy5fX2F0dHJpYkxvY2F0aW9uQ2FjaGVbIG5hbWUgXSA9IGxvY2F0aW9uO1xuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB1bmlmb3JtIGxvY2F0aW9uLlxuICAgKi9cbiAgcHVibGljIGdldFVuaWZvcm1Mb2NhdGlvbiggbmFtZTogc3RyaW5nICk6IFdlYkdMVW5pZm9ybUxvY2F0aW9uIHwgbnVsbCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgaWYgKCB0aGlzLl9fdW5pZm9ybUxvY2F0aW9uQ2FjaGVbIG5hbWUgXSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgcmV0dXJuIHRoaXMuX191bmlmb3JtTG9jYXRpb25DYWNoZVsgbmFtZSBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBsb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbiggdGhpcy5fX3Byb2dyYW0sIG5hbWUgKTtcbiAgICAgIC8vIGlmICggbG9jYXRpb24gPT09IG51bGwgKSB7XG4gICAgICAvLyAgIHRoaXMuZ2xDYXQuc3BpdCggJ0dMQ2F0UHJvZ3JhbS5nZXRVbmlmb3JtTG9jYXRpb246IENvdWxkIG5vdCByZXRyaWV2ZSB1bmlmb3JtIGxvY2F0aW9uJyApO1xuICAgICAgLy8gICByZXR1cm4gbG9jYXRpb247XG4gICAgICAvLyB9XG4gICAgICB0aGlzLl9fdW5pZm9ybUxvY2F0aW9uQ2FjaGVbIG5hbWUgXSA9IGxvY2F0aW9uO1xuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBvciBjcmVhdGUgYSB0ZXh0dXJlIHVuaXQgdGhhdCBjb3JyZXNwb25kcyB0byBnaXZlbiBuYW1lLlxuICAgKi9cbiAgcHVibGljIGdldFVuaWZvcm1UZXh0dXJlVW5pdCggbmFtZTogc3RyaW5nICk6IG51bWJlciB7XG4gICAgaWYgKCB0aGlzLl9fdW5pZm9ybVRleHR1cmVVbml0TWFwWyBuYW1lIF0gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgIHRoaXMuX191bmlmb3JtVGV4dHVyZVVuaXRNYXBbIG5hbWUgXSA9IHRoaXMuX191bmlmb3JtdGV4dHVyZVVuaXRJbmRleDtcbiAgICAgIHRoaXMuX191bmlmb3JtdGV4dHVyZVVuaXRJbmRleCArKztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fX3VuaWZvcm1UZXh0dXJlVW5pdE1hcFsgbmFtZSBdO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQmluZEhlbHBlcjxUVmFsdWU+IHtcbiAgcHJpdmF0ZSBfX3ByZXY6IFRWYWx1ZTtcbiAgcHJpdmF0ZSBfX2JpbmRlcjogKCB2YWx1ZTogVFZhbHVlICkgPT4gdm9pZDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoIGluaXQ6IFRWYWx1ZSwgYmluZGVyOiAoIHZhbHVlOiBUVmFsdWUgKSA9PiB2b2lkICkge1xuICAgIHRoaXMuX19wcmV2ID0gaW5pdDtcbiAgICB0aGlzLl9fYmluZGVyID0gYmluZGVyO1xuICB9XG5cbiAgcHVibGljIGJpbmQ8VD4oXG4gICAgdmFsdWU6IFRWYWx1ZSxcbiAgICBjYWxsYmFjaz86ICggdmFsdWU6IFRWYWx1ZSApID0+IFRcbiAgKTogVCB7XG4gICAgY29uc3QgcHJldiA9IHRoaXMuX19wcmV2O1xuICAgIGlmICggdmFsdWUgIT09IHByZXYgKSB7XG4gICAgICB0aGlzLl9fYmluZGVyKCB2YWx1ZSApO1xuICAgICAgdGhpcy5fX3ByZXYgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoIGNhbGxiYWNrICkge1xuICAgICAgY29uc3QgcmV0ID0gY2FsbGJhY2soIHZhbHVlICk7XG4gICAgICB0aGlzLmJpbmQoIHByZXYgKTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQgYXMgYW55O1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgR0xfQVJSQVlfQlVGRkVSLCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiwgR0xfU1RBVElDX0RSQVcgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB0eXBlIHsgR0xDYXQgfSBmcm9tICcuL0dMQ2F0JztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xCdWZmZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdEJ1ZmZlcjxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX19idWZmZXI6IFdlYkdMQnVmZmVyO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgYnVmZmVyKCk6IFdlYkdMQnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2J1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIGJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRCdWZmZXIuYnVmZmVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTEJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19idWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0QnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBidWZmZXI6IFdlYkdMQnVmZmVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19idWZmZXIgPSBidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZUJ1ZmZlciggdGhpcy5fX2J1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIHNldFZlcnRleGJ1ZmZlciggc2l6ZTogR0xzaXplaXB0ciwgdXNhZ2U/OiBudW1iZXIgKTogdm9pZDtcbiAgcHVibGljIHNldFZlcnRleGJ1ZmZlciggc291cmNlOiBCdWZmZXJTb3VyY2UgfCBudWxsLCB1c2FnZT86IG51bWJlciApOiB2b2lkO1xuICBwdWJsaWMgc2V0VmVydGV4YnVmZmVyKFxuICAgIHNvdXJjZTogR0xzaXplaXB0ciB8IEJ1ZmZlclNvdXJjZSB8IG51bGwsXG4gICAgdXNhZ2U6IG51bWJlciA9IEdMX1NUQVRJQ19EUkFXXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVmVydGV4QnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5idWZmZXJEYXRhKCBHTF9BUlJBWV9CVUZGRVIsIHNvdXJjZSBhcyBhbnksIHVzYWdlICk7IC8vIHRoaXMgc3Vja3NcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyBpbmRleCBkYXRhIGludG8gdGhpcyBidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgc2V0SW5kZXhidWZmZXIoIHNpemU6IEdMc2l6ZWlwdHIsIHVzYWdlPzogbnVtYmVyICk6IHZvaWQ7XG4gIHB1YmxpYyBzZXRJbmRleGJ1ZmZlciggc291cmNlOiBCdWZmZXJTb3VyY2UgfCBudWxsLCB1c2FnZT86IG51bWJlciApOiB2b2lkO1xuICBwdWJsaWMgc2V0SW5kZXhidWZmZXIoXG4gICAgc291cmNlOiBHTHNpemVpcHRyIHwgQnVmZmVyU291cmNlIHwgbnVsbCxcbiAgICB1c2FnZTogbnVtYmVyID0gR0xfU1RBVElDX0RSQVdcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRJbmRleEJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuYnVmZmVyRGF0YSggR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHNvdXJjZSBhcyBhbnksIHVzYWdlICk7IC8vIHRoaXMgc3Vja3NcbiAgICB9ICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMX0NPTE9SX0FUVEFDSE1FTlQwLCBHTF9ERVBUSF9BVFRBQ0hNRU5ULCBHTF9GUkFNRUJVRkZFUiwgR0xfUkVOREVSQlVGRkVSLCBHTF9URVhUVVJFXzJEIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0UmVuZGVyYnVmZmVyIH0gZnJvbSAnLi9HTENhdFJlbmRlcmJ1ZmZlcic7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0VGV4dHVyZSB9IGZyb20gJy4vR0xDYXRUZXh0dXJlJztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xGcmFtZWJ1ZmZlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQgZXh0ZW5kcyBXZWJHTFJlbmRlcmluZ0NvbnRleHQgfCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0PiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fZnJhbWVidWZmZXI6IFdlYkdMRnJhbWVidWZmZXI7XG4gIHByaXZhdGUgX19yZW5kZXJidWZmZXJNYXAgPSBuZXcgTWFwPEdMZW51bSwgR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+PigpO1xuICBwcml2YXRlIF9fdGV4dHVyZU1hcCA9IG5ldyBNYXA8R0xlbnVtLCBHTENhdFRleHR1cmU8VENvbnRleHQ+PigpO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGdldCBmcmFtZWJ1ZmZlcigpOiBXZWJHTEZyYW1lYnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2ZyYW1lYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gZnJhbWVidWZmZXIuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0RnJhbWVidWZmZXIuZnJhbWVidWZmZXJdXVxuICAgKi9cbiAgcHVibGljIGdldCByYXcoKTogV2ViR0xGcmFtZWJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19mcmFtZWJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgYXR0YWNoZWQgcmVuZGVyYnVmZmVyLlxuICAgKiBJZiB5b3Ugd2FudCB0byBncmFiIG90aGVyIHRoYW4gYERFUFRIX0FUVEFDSE1FTlRgLCB0cnkgW1tHTENhdEZyYW1lYnVmZmVyLmdldFJlbmRlcmJ1ZmZlcl1dIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJlbmRlcmJ1ZmZlcigpOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fX3JlbmRlcmJ1ZmZlck1hcC5nZXQoIEdMX0RFUFRIX0FUVEFDSE1FTlQgKSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBhdHRhY2hlZCB0ZXh0dXJlLlxuICAgKiBJZiB5b3Ugd2FudCB0byBncmFiIG90aGVyIHRoYW4gYENPTE9SX0FUVEFDSE1FTlQwYCwgdHJ5IFtbR0xDYXRGcmFtZWJ1ZmZlci5nZXRUZXh0dXJlXV0gaW5zdGVhZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgdGV4dHVyZSgpOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX190ZXh0dXJlTWFwLmdldCggR0xfQ09MT1JfQVRUQUNITUVOVDAgKSA/PyBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBHTENhdEZyYW1lYnVmZmVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBmcmFtZWJ1ZmZlcjogV2ViR0xGcmFtZWJ1ZmZlciApIHtcbiAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcbiAgICB0aGlzLl9fZnJhbWVidWZmZXIgPSBmcmFtZWJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSBmcmFtZWJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCBhbHNvQXR0YWNoZWQgPSBmYWxzZSApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBnbC5kZWxldGVGcmFtZWJ1ZmZlciggdGhpcy5fX2ZyYW1lYnVmZmVyICk7XG5cbiAgICBpZiAoIGFsc29BdHRhY2hlZCApIHtcbiAgICAgIGZvciAoIGNvbnN0IHJlbmRlcmJ1ZmZlciBvZiB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLnZhbHVlcygpICkge1xuICAgICAgICBnbC5kZWxldGVSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlci5yYXcgKTtcbiAgICAgIH1cblxuICAgICAgZm9yICggY29uc3QgdGV4dHVyZSBvZiB0aGlzLl9fdGV4dHVyZU1hcC52YWx1ZXMoKSApIHtcbiAgICAgICAgZ2wuZGVsZXRlVGV4dHVyZSggdGV4dHVyZS5yYXcgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgaXRzIGF0dGFjaGVkIHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXRSZW5kZXJidWZmZXIoIGF0dGFjaG1lbnQgPSBHTF9ERVBUSF9BVFRBQ0hNRU5UICk6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLmdldCggYXR0YWNobWVudCApID8/IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgaXRzIGF0dGFjaGVkIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgZ2V0VGV4dHVyZSggYXR0YWNobWVudCA9IEdMX0NPTE9SX0FUVEFDSE1FTlQwICk6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fX3RleHR1cmVNYXAuZ2V0KCBhdHRhY2htZW50ICkgPz8gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSByZW5kZXJidWZmZXIgdG8gdGhpcyBmcmFtZWJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBhdHRhY2hSZW5kZXJidWZmZXIoXG4gICAgcmVuZGVyYnVmZmVyOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4sXG4gICAge1xuICAgICAgYXR0YWNobWVudCA9IEdMX0RFUFRIX0FUVEFDSE1FTlRcbiAgICB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRGcmFtZWJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuZnJhbWVidWZmZXJSZW5kZXJidWZmZXIoIEdMX0ZSQU1FQlVGRkVSLCBhdHRhY2htZW50LCBHTF9SRU5ERVJCVUZGRVIsIHJlbmRlcmJ1ZmZlci5yYXcgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fcmVuZGVyYnVmZmVyTWFwLnNldCggYXR0YWNobWVudCwgcmVuZGVyYnVmZmVyICk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGEgdGV4dHVyZSB0byB0aGlzIGZyYW1lYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGF0dGFjaFRleHR1cmUoXG4gICAgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PixcbiAgICB7XG4gICAgICBsZXZlbCA9IDAsXG4gICAgICBhdHRhY2htZW50ID0gR0xfQ09MT1JfQVRUQUNITUVOVDBcbiAgICB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRGcmFtZWJ1ZmZlciggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoIEdMX0ZSQU1FQlVGRkVSLCBhdHRhY2htZW50LCBHTF9URVhUVVJFXzJELCB0ZXh0dXJlLnJhdywgbGV2ZWwgKTtcbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fdGV4dHVyZU1hcC5zZXQoIGF0dGFjaG1lbnQsIHRleHR1cmUgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBHTENhdCB9IGZyb20gJy4vR0xDYXQnO1xuaW1wb3J0IHsgR0xDYXRFcnJvcnMgfSBmcm9tICcuL0dMQ2F0RXJyb3JzJztcbmltcG9ydCB7IEdMX1JFTkRFUkJVRkZFUiB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuXG4vKipcbiAqIEl0J3MgYSBXZWJHTFJlbmRlcmJ1ZmZlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3JlbmRlcmJ1ZmZlcjogV2ViR0xSZW5kZXJidWZmZXI7XG4gIHByaXZhdGUgX193aWR0aCA9IDA7XG4gIHByaXZhdGUgX19oZWlnaHQgPSAwO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmVuZGVyYnVmZmVyKCk6IFdlYkdMUmVuZGVyYnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3JlbmRlcmJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIHJlbmRlcmJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRSZW5kZXJCdWZmZXIucmVuZGVyYnVmZmVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTFJlbmRlcmJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX19yZW5kZXJidWZmZXI7XG4gIH1cblxuICAvKipcbiAgICogSXRzIHdpZHRoLlxuICAgKi9cbiAgcHVibGljIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9fd2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGhlaWdodC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX19oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0VGV4dHVyZSBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PiwgcmVuZGVyYnVmZmVyOiBXZWJHTFJlbmRlcmJ1ZmZlciApIHtcbiAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcbiAgICB0aGlzLl9fcmVuZGVyYnVmZmVyID0gcmVuZGVyYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHJlbmRlcmJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX19nbENhdC5nbC5kZWxldGVSZW5kZXJidWZmZXIoIHRoaXMuX19yZW5kZXJidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoaXMgcmVuZGVyYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIHJlbmRlcmJ1ZmZlclN0b3JhZ2UoXG4gICAgd2lkdGg6IG51bWJlcixcbiAgICBoZWlnaHQ6IG51bWJlcixcbiAgICB7IGZvcm1hdCA9IHRoaXMuX19nbENhdC5wcmVmZXJyZWREZXB0aEZvcm1hdCB9ID0ge31cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRSZW5kZXJidWZmZXIoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnJlbmRlcmJ1ZmZlclN0b3JhZ2UoIEdMX1JFTkRFUkJVRkZFUiwgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgfSApO1xuXG4gICAgdGhpcy5fX3dpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5fX2hlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoaXMgcmVuZGVyYnVmZmVyIHdpdGggbXVsdGlzYW1wbGUgZW5hYmxlZC5cbiAgICogSWYgeW91IGFyZSB1c2luZyBXZWJHTDEsIGl0IHdpbGwgZmFsbGJhY2sgdG8gbm9uIG11bHRpc2FtcGxlIG9uZSBpbnN0ZWFkLlxuICAgKi9cbiAgcHVibGljIHJlbmRlcmJ1ZmZlclN0b3JhZ2VNdWx0aXNhbXBsZShcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHtcbiAgICAgIHNhbXBsZXMgPSB0aGlzLl9fZ2xDYXQucHJlZmVycmVkTXVsdGlzYW1wbGVTYW1wbGVzLFxuICAgICAgZm9ybWF0ID0gdGhpcy5fX2dsQ2F0LnByZWZlcnJlZERlcHRoRm9ybWF0LFxuICAgICAgZmFsbGJhY2tXZWJHTDEgPSB0cnVlXG4gICAgfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kUmVuZGVyYnVmZmVyKCB0aGlzLCAoKSA9PiB7XG4gICAgICBpZiAoIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgJiYgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgICBnbC5yZW5kZXJidWZmZXJTdG9yYWdlTXVsdGlzYW1wbGUoIEdMX1JFTkRFUkJVRkZFUiwgc2FtcGxlcywgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIGZhbGxiYWNrV2ViR0wxICkge1xuICAgICAgICAgIGdsLnJlbmRlcmJ1ZmZlclN0b3JhZ2UoIEdMX1JFTkRFUkJVRkZFUiwgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgR0xDYXRFcnJvcnMuV2ViR0wyRXhjbHVzaXZlRXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9ICk7XG5cbiAgICB0aGlzLl9fd2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLl9faGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG59XG4iLCJpbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgeyBHTF9DT01QSUxFX1NUQVRVUyB9IGZyb20gJy4vR0xDb25zdGFudHMnO1xuXG4vKipcbiAqIEl0J3MgYSBXZWJHTFNoYWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0U2hhZGVyPFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3NoYWRlcjogV2ViR0xTaGFkZXI7XG4gIHByaXZhdGUgX19jb21waWxlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHNoYWRlci5cbiAgICovXG4gIHB1YmxpYyBnZXQgc2hhZGVyKCk6IFdlYkdMU2hhZGVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3NoYWRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgb3duIHNoYWRlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRTaGFkZXIuc2hhZGVyXV0uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhdygpOiBXZWJHTFNoYWRlciB7XG4gICAgcmV0dXJuIHRoaXMuX19zaGFkZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0U2hhZGVyIGluc3RhbmNlLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbENhdDogR0xDYXQ8VENvbnRleHQ+LCBzaGFkZXI6IFdlYkdMU2hhZGVyICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX19zaGFkZXIgPSBzaGFkZXI7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgc2hhZGVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZVNoYWRlciggdGhpcy5fX3NoYWRlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIHRoZSBsYXN0IGNvbXBpbGF0aW9uIHdhcyBzdWNjZXNzZnVsIG9yIG5vdC5cbiAgICovXG4gIHB1YmxpYyBpc0NvbXBpbGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9fY29tcGlsZWQ7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGlsZSB0aGUgc2hhZGVyLlxuICAgKi9cbiAgcHVibGljIGNvbXBpbGUoIGNvZGU6IHN0cmluZyApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBnbC5zaGFkZXJTb3VyY2UoIHRoaXMuX19zaGFkZXIsIGNvZGUgKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKCB0aGlzLl9fc2hhZGVyICk7XG5cbiAgICB0aGlzLl9fY29tcGlsZWQgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoIHRoaXMuX19zaGFkZXIsIEdMX0NPTVBJTEVfU1RBVFVTICk7XG4gICAgaWYgKCAhdGhpcy5fX2NvbXBpbGVkICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCBnbC5nZXRTaGFkZXJJbmZvTG9nKCB0aGlzLl9fc2hhZGVyICkhICk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBHTF9DTEFNUF9UT19FREdFLCBHTF9GTE9BVCwgR0xfSEFMRl9GTE9BVCwgR0xfTElORUFSLCBHTF9ORUFSRVNULCBHTF9SMTZGLCBHTF9SMzJGLCBHTF9SR0JBLCBHTF9SR0JBMTZGLCBHTF9SR0JBMzJGLCBHTF9SR0JBOCwgR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YLCBHTF9URVhUVVJFX01BR19GSUxURVIsIEdMX1RFWFRVUkVfTUlOX0ZJTFRFUiwgR0xfVEVYVFVSRV9XUkFQX1MsIEdMX1RFWFRVUkVfV1JBUF9ULCBHTF9VTlNJR05FRF9CWVRFIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0IH0gZnJvbSAnLi9HTENhdCc7XG5pbXBvcnQgeyBHTENhdEVycm9ycyB9IGZyb20gJy4vR0xDYXRFcnJvcnMnO1xuXG5jb25zdCB6ZXJvVGV4dHVyZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoIFsgMCwgMCwgMCwgMCBdICk7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMVGV4dHVyZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0VGV4dHVyZTxUQ29udGV4dCBleHRlbmRzIFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ+IHtcbiAgcHJpdmF0ZSBfX2dsQ2F0OiBHTENhdDxUQ29udGV4dD47XG4gIHByaXZhdGUgX190ZXh0dXJlOiBXZWJHTFRleHR1cmU7XG4gIHByaXZhdGUgX193aWR0aCA9IDA7XG4gIHByaXZhdGUgX19oZWlnaHQgPSAwO1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRleHR1cmUoKTogV2ViR0xUZXh0dXJlIHtcbiAgICByZXR1cm4gdGhpcy5fX3RleHR1cmU7XG4gIH1cblxuICAvKipcbiAgICogSXRzIG93biB0ZXh0dXJlLiBTaG9ydGVyIHRoYW4gW1tHTENhdFRleHR1cmUudGV4dHVyZWRdXVxuICAgKi9cbiAgcHVibGljIGdldCByYXcoKTogV2ViR0xUZXh0dXJlIHtcbiAgICByZXR1cm4gdGhpcy5fX3RleHR1cmU7XG4gIH1cblxuICAvKipcbiAgICogSXRzIHdpZHRoLlxuICAgKi9cbiAgcHVibGljIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9fd2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogSXRzIGhlaWdodC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX19oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0VGV4dHVyZSBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PiwgdGV4dHVyZTogV2ViR0xUZXh0dXJlICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX190ZXh0dXJlID0gdGV4dHVyZTtcbiAgICB0aGlzLnRleHR1cmVGaWx0ZXIoIEdMX0xJTkVBUiApO1xuICAgIHRoaXMudGV4dHVyZVdyYXAoIEdMX0NMQU1QX1RPX0VER0UgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZVRleHR1cmUoIHRoaXMuX190ZXh0dXJlICk7XG4gIH1cblxuICAvKipcbiAgICogU3BlY2lmeSBob3cgdG8gZmlsdGVyIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHRleHR1cmVGaWx0ZXIoKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVGaWx0ZXIoIGZpbHRlcjogbnVtYmVyICk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlRmlsdGVyKCBmaWx0ZXJNYWc6IG51bWJlciwgZmlsdGVyTWluOiBudW1iZXIgKTogdm9pZDtcbiAgcHVibGljIHRleHR1cmVGaWx0ZXIoIGZpbHRlck1hZzogbnVtYmVyID0gR0xfTkVBUkVTVCwgZmlsdGVyTWluOiBudW1iZXIgPSBmaWx0ZXJNYWcgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfTUFHX0ZJTFRFUiwgZmlsdGVyTWFnICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFXzJELCBHTF9URVhUVVJFX01JTl9GSUxURVIsIGZpbHRlck1pbiApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IGhvdyB0byB3cmFwIHRoZSB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHRleHR1cmVXcmFwKCk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlV3JhcCggd3JhcDogbnVtYmVyICk6IHZvaWQ7XG4gIHB1YmxpYyB0ZXh0dXJlV3JhcCggd3JhcFM6IG51bWJlciwgd3JhcFQ6IG51bWJlciApOiB2b2lkO1xuICBwdWJsaWMgdGV4dHVyZVdyYXAoIHdyYXBTOiBudW1iZXIgPSBHTF9DTEFNUF9UT19FREdFLCB3cmFwVDogbnVtYmVyID0gd3JhcFMgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfMkQsIEdMX1RFWFRVUkVfV1JBUF9TLCB3cmFwUyApO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV8yRCwgR0xfVEVYVFVSRV9XUkFQX1QsIHdyYXBUICk7XG4gICAgfSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgdGV4U3RvcmFnZTJEKFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgeyB0YXJnZXQgPSBHTF9URVhUVVJFXzJELCBsZXZlbCA9IDEsIGZvcm1hdCA9IEdMX1JHQkE4IH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICBpZiAoIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgJiYgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgICAgZ2wudGV4U3RvcmFnZTJEKCB0YXJnZXQsIGxldmVsLCBmb3JtYXQsIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgIH0gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgR0xDYXRFcnJvcnMuV2ViR0wyRXhjbHVzaXZlRXJyb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIHZhbHVlIGZvciB0aGUgcGFzc2VkIHBhcmFtZXRlciBuYW1lLlxuICAgKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJHTFJlbmRlcmluZ0NvbnRleHQvZ2V0UGFyYW1ldGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0UGFyYW1ldGVyKCBwbmFtZTogR0xlbnVtICk6IGFueSB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgcmV0dXJuIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICByZXR1cm4gZ2wuZ2V0UGFyYW1ldGVyKCBwbmFtZSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBwaXhlbCBzdG9yYWdlIG1vZGVzLlxuICAgKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJHTFJlbmRlcmluZ0NvbnRleHQvcGl4ZWxTdG9yZWlcbiAgICovXG4gIHB1YmxpYyBwaXhlbFN0b3JlaSggcG5hbWU6IEdMZW51bSwgcGFyYW06IG51bWJlciB8IGJvb2xlYW4gKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnBpeGVsU3RvcmVpKCBwbmFtZSwgcGFyYW0gKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyBkYXRhIGludG8gdGhpcyB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIHNldFRleHR1cmUoIHNvdXJjZTogVGV4SW1hZ2VTb3VyY2UgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnRleEltYWdlMkQoIEdMX1RFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIHNvdXJjZSApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHNvdXJjZS53aWR0aDtcbiAgICB0aGlzLl9faGVpZ2h0ID0gc291cmNlLmhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbmV3IGRhdGEgaW50byB0aGlzIHRleHR1cmUuXG4gICAqIFRoaXMgZnVuY3Rpb24gdXNlcyBUeXBlZEFycmF5LiBJZiB5b3Ugd2FudCB0byBzb3VyY2UgaW1hZ2UgZGF0YSwgdXNlIGBHTENhdC5zZXRUZXh0dXJlKClgIGluc3RlYWQuXG4gICAqL1xuICBwdWJsaWMgc2V0VGV4dHVyZUZyb21BcnJheShcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHNvdXJjZTogQXJyYXlCdWZmZXJWaWV3IHwgbnVsbCxcbiAgICB7XG4gICAgICBpbnRlcm5hbGZvcm1hdCA9IEdMX1JHQkE4LFxuICAgICAgZm9ybWF0ID0gR0xfUkdCQSxcbiAgICAgIHR5cGUgPSBHTF9VTlNJR05FRF9CWVRFXG4gICAgfSA9IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGxldCBpZm9ybWF0ID0gaW50ZXJuYWxmb3JtYXQ7XG4gICAgaWYgKCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYmIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9wdWxsLzE1NTAyL2ZpbGVzXG4gICAgICBpZiAoXG4gICAgICAgIGludGVybmFsZm9ybWF0ID09PSBHTF9SMTZGXG4gICAgICAgIHx8IGludGVybmFsZm9ybWF0ID09PSBHTF9SMzJGXG4gICAgICAgIHx8IGludGVybmFsZm9ybWF0ID09PSBHTF9SR0JBMTZGXG4gICAgICAgIHx8IGludGVybmFsZm9ybWF0ID09PSBHTF9SR0JBMzJGXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ0VYVF9jb2xvcl9idWZmZXJfZmxvYXQnLCB0cnVlICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdFWFRfZmxvYXRfYmxlbmQnICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXInICk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICggdHlwZSA9PT0gR0xfSEFMRl9GTE9BVCApIHtcbiAgICAgICAgdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ09FU190ZXh0dXJlX2hhbGZfZmxvYXQnLCB0cnVlICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0X2xpbmVhcicgKTtcbiAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09IEdMX0ZMT0FUICkge1xuICAgICAgICB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCAnT0VTX3RleHR1cmVfZmxvYXQnLCB0cnVlICk7XG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oICdPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXInICk7XG4gICAgICB9XG5cbiAgICAgIGlmb3JtYXQgPSBmb3JtYXQ7XG4gICAgfVxuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlMkQoIHRoaXMsICgpID0+IHtcbiAgICAgIGdsLnRleEltYWdlMkQoXG4gICAgICAgIEdMX1RFWFRVUkVfMkQsXG4gICAgICAgIDAsXG4gICAgICAgIGlmb3JtYXQsXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIDAsXG4gICAgICAgIGZvcm1hdCxcbiAgICAgICAgdHlwZSxcbiAgICAgICAgc291cmNlXG4gICAgICApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogQ29weSBwaXhlbHMgZnJvbSBjdXJyZW50IGZyYW1lYnVmZmVyIHRvIGdpdmVuIHRleHR1cmUuXG4gICAqL1xuICBwdWJsaWMgY29weVRleHR1cmUoIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIHRoaXMuX19nbENhdC5iaW5kVGV4dHVyZTJEKCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5jb3B5VGV4SW1hZ2UyRCggR0xfVEVYVFVSRV8yRCwgMCwgR0xfUkdCQSwgMCwgMCwgd2lkdGgsIGhlaWdodCwgMCApO1xuICAgIH0gKTtcblxuICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyBjdWJlbWFwIGRhdGEgaW50byB0aGlzIHRleHR1cmUuXG4gICAqIEBwYXJhbSB0ZXh0dXJlcyBBcnJheSBvZiBpYW1nZXMuIE9yZGVyOiBgWCtgLCBgWC1gLCBgWStgLCBgWS1gLCBgWitgLCBgWi1gXG4gICAqIEB0b2RvIGR1ZSB0byBjb21wYXRpYmlsaXR5IG9mIGl0cyBgd2lkdGhgIGFuZCBgaGVpZ2h0YCBpdCBzaG91bGQgbm90IGJlIHVzZWQgeWV0XG4gICAqL1xuICBwdWJsaWMgc2V0Q3ViZW1hcCggdGV4dHVyZXM6IFRleEltYWdlU291cmNlW10gKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRUZXh0dXJlQ3ViZU1hcCggdGhpcywgKCkgPT4ge1xuICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgNjsgaSArKyApIHtcbiAgICAgICAgZ2wudGV4SW1hZ2UyRChcbiAgICAgICAgICBHTF9URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1ggKyBpLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgR0xfUkdCQSxcbiAgICAgICAgICBHTF9SR0JBLFxuICAgICAgICAgIEdMX1VOU0lHTkVEX0JZVEUsXG4gICAgICAgICAgdGV4dHVyZXNbIGkgXVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9NSU5fRklMVEVSLCBHTF9MSU5FQVIgKTtcbiAgICAgIGdsLnRleFBhcmFtZXRlcmkoIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIEdMX1RFWFRVUkVfTUFHX0ZJTFRFUiwgR0xfTElORUFSICk7XG4gICAgICBnbC50ZXhQYXJhbWV0ZXJpKCBHTF9URVhUVVJFX0NVQkVfTUFQLCBHTF9URVhUVVJFX1dSQVBfUywgR0xfQ0xBTVBfVE9fRURHRSApO1xuICAgICAgZ2wudGV4UGFyYW1ldGVyaSggR0xfVEVYVFVSRV9DVUJFX01BUCwgR0xfVEVYVFVSRV9XUkFQX1QsIEdMX0NMQU1QX1RPX0VER0UgKTtcbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IFsgMCwgMCwgMCwgMCBdIHRvIHRoaXMgdGV4dHVyZS5cbiAgICogVXNlZnVsIGZvciB0ZW1wb3JhcnkgdXNlLi5cbiAgICovXG4gIHB1YmxpYyBzZXRaZXJvVGV4dHVyZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFRleHR1cmVGcm9tQXJyYXkoIDEsIDEsIHplcm9UZXh0dXJlQXJyYXkgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBHTENhdCB9IGZyb20gJy4vR0xDYXQnO1xuaW1wb3J0IHsgR0xDYXRCdWZmZXIgfSBmcm9tICcuL0dMQ2F0QnVmZmVyJztcblxuLyoqXG4gKiBJdCdzIGEgV2ViR0xUcmFuc2Zvcm1GZWVkYmFjay5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0VHJhbnNmb3JtRmVlZGJhY2s8XG4gIFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dFxuPiB7XG4gIHByaXZhdGUgX19nbENhdDogR0xDYXQ8VENvbnRleHQ+O1xuICBwcml2YXRlIF9fdHJhbnNmb3JtRmVlZGJhY2s6IFdlYkdMVHJhbnNmb3JtRmVlZGJhY2s7XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gdHJhbnNmb3JtIGZlZWRiYWNrLlxuICAgKi9cbiAgcHVibGljIGdldCB0cmFuc2Zvcm1GZWVkYmFjaygpOiBXZWJHTFRyYW5zZm9ybUZlZWRiYWNrIHtcbiAgICByZXR1cm4gdGhpcy5fX3RyYW5zZm9ybUZlZWRiYWNrO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gdHJhbnNmb3JtIGZlZWRiYWNrLiBTaG9ydGVyIHRoYW4ge0BsaW5rIHRyYW5zZm9ybUZlZWRiYWNrfS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3KCk6IFdlYkdMVHJhbnNmb3JtRmVlZGJhY2sge1xuICAgIHJldHVybiB0aGlzLl9fdHJhbnNmb3JtRmVlZGJhY2s7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0VHJhbnNmb3JtRmVlZGJhY2sgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIHRyYW5zZm9ybUZlZWRiYWNrOiBXZWJHTFRyYW5zZm9ybUZlZWRiYWNrICkge1xuICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgIHRoaXMuX190cmFuc2Zvcm1GZWVkYmFjayA9IHRyYW5zZm9ybUZlZWRiYWNrO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgdGhlIHRyYW5zZm9ybSBmZWVkYmFjay5cbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGlmICggV2ViR0wyUmVuZGVyaW5nQ29udGV4dCAmJiBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBnbC5kZWxldGVUcmFuc2Zvcm1GZWVkYmFjayggdGhpcy5fX3RyYW5zZm9ybUZlZWRiYWNrICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSBidWZmZXIgdG8gdGhpcyB0cmFuc2Zvcm0gZmVlZGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZEJ1ZmZlciggaW5kZXg6IEdMdWludCwgYnVmZmVyOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXMuX19nbENhdDtcblxuICAgIGlmICggV2ViR0wyUmVuZGVyaW5nQ29udGV4dCAmJiBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICB0aGlzLl9fZ2xDYXQuYmluZFRyYW5zZm9ybUZlZWRiYWNrKCB0aGlzLCAoKSA9PiB7XG4gICAgICAgIGdsLmJpbmRCdWZmZXJCYXNlKCBnbC5UUkFOU0ZPUk1fRkVFREJBQ0tfQlVGRkVSLCBpbmRleCwgYnVmZmVyPy5idWZmZXIgPz8gbnVsbCApO1xuICAgICAgfSApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBHTENhdCwgR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGUgfSBmcm9tICcuL0dMQ2F0JztcbmltcG9ydCB7IEdMX0FSUkFZX0JVRkZFUiwgR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIEdMX0ZMT0FUIH0gZnJvbSAnLi9HTENvbnN0YW50cyc7XG5pbXBvcnQgdHlwZSB7IEdMQ2F0QnVmZmVyIH0gZnJvbSAnLi9HTENhdEJ1ZmZlcic7XG5cbi8qKlxuICogSXQncyBhIFdlYkdMVmVydGV4QXJyYXlPYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBHTENhdFZlcnRleEFycmF5PFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD4ge1xuICBwcml2YXRlIF9fZ2xDYXQ6IEdMQ2F0PFRDb250ZXh0PjtcbiAgcHJpdmF0ZSBfX3ZlcnRleEFycmF5OiBHTENhdFZlcnRleEFycmF5UmF3VHlwZTxUQ29udGV4dD47XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGdldCBidWZmZXIoKTogR0xDYXRWZXJ0ZXhBcnJheVJhd1R5cGU8VENvbnRleHQ+IHtcbiAgICByZXR1cm4gdGhpcy5fX3ZlcnRleEFycmF5O1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gYnVmZmVyLiBTaG9ydGVyIHRoYW4gW1tHTENhdEJ1ZmZlci5idWZmZXJdXS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcmF3KCk6IEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0PiB7XG4gICAgcmV0dXJuIHRoaXMuX192ZXJ0ZXhBcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRCdWZmZXIgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsQ2F0OiBHTENhdDxUQ29udGV4dD4sIHZlcnRleEFycmF5OiBHTENhdFZlcnRleEFycmF5UmF3VHlwZTxUQ29udGV4dD4gKSB7XG4gICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XG4gICAgdGhpcy5fX3ZlcnRleEFycmF5ID0gdmVydGV4QXJyYXk7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgaWYgKCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYmIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGdsLmRlbGV0ZVZlcnRleEFycmF5KCB0aGlzLl9fdmVydGV4QXJyYXkgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JywgdHJ1ZSApO1xuICAgICAgZXh0LmRlbGV0ZVZlcnRleEFycmF5T0VTKCB0aGlzLl9fdmVydGV4QXJyYXkgYXMgYW55ICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSB2ZXJ0ZXggYnVmZmVyIHRvIHRoZSB2ZXJ0ZXggYXJyYXkuXG4gICAqL1xuICBwdWJsaWMgYmluZFZlcnRleGJ1ZmZlcihcbiAgICBzb3VyY2U6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PixcbiAgICBsb2NhdGlvbjogbnVtYmVyLFxuICAgIHNpemUgPSAxLFxuICAgIGRpdmlzb3IgPSAwLFxuICAgIHR5cGU6IG51bWJlciA9IEdMX0ZMT0FULFxuICAgIHN0cmlkZSA9IDAsXG4gICAgb2Zmc2V0ID0gMFxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzLl9fZ2xDYXQ7XG5cbiAgICB0aGlzLl9fZ2xDYXQuYmluZFZlcnRleEFycmF5KCB0aGlzLCAoKSA9PiB7XG4gICAgICBnbC5iaW5kQnVmZmVyKCBHTF9BUlJBWV9CVUZGRVIsIHNvdXJjZS5yYXcgKTtcbiAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KCBsb2NhdGlvbiApO1xuICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlciggbG9jYXRpb24sIHNpemUsIHR5cGUsIGZhbHNlLCBzdHJpZGUsIG9mZnNldCApO1xuXG4gICAgICBpZiAoIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgJiYgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJEaXZpc29yKCBsb2NhdGlvbiwgZGl2aXNvciApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXh0ID0gdGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbiggJ0FOR0xFX2luc3RhbmNlZF9hcnJheXMnICk7XG4gICAgICAgIGlmICggZXh0ICkge1xuICAgICAgICAgIGV4dC52ZXJ0ZXhBdHRyaWJEaXZpc29yQU5HTEUoIGxvY2F0aW9uLCBkaXZpc29yICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9ICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhbiBpbmRleCBidWZmZXIgdG8gdGhlIHZlcnRleCBhcnJheS5cbiAgICovXG4gIHB1YmxpYyBiaW5kSW5kZXhidWZmZXIoXG4gICAgc291cmNlOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD5cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcy5fX2dsQ2F0O1xuXG4gICAgdGhpcy5fX2dsQ2F0LmJpbmRWZXJ0ZXhBcnJheSggdGhpcywgKCkgPT4ge1xuICAgICAgZ2wuYmluZEJ1ZmZlciggR0xfRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHNvdXJjZS5yYXcgKTtcbiAgICB9ICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdMQ2F0UHJvZ3JhbSwgR0xDYXRQcm9ncmFtTGlua09wdGlvbnMgfSBmcm9tICcuL0dMQ2F0UHJvZ3JhbSc7XG5pbXBvcnQgeyBHTF9BUlJBWV9CVUZGRVIsIEdMX0JMRU5ELCBHTF9DT0xPUl9BVFRBQ0hNRU5UMCwgR0xfQ09MT1JfQlVGRkVSX0JJVCwgR0xfREVQVEhfQVRUQUNITUVOVCwgR0xfREVQVEhfQlVGRkVSX0JJVCwgR0xfREVQVEhfQ09NUE9ORU5UMTYsIEdMX0RFUFRIX0NPTVBPTkVOVDI0LCBHTF9ERVBUSF9URVNULCBHTF9EUkFXX0ZSQU1FQlVGRkVSLCBHTF9FTEVNRU5UX0FSUkFZX0JVRkZFUiwgR0xfRkxPQVQsIEdMX0ZSQUdNRU5UX1NIQURFUiwgR0xfRlJBTUVCVUZGRVIsIEdMX0xFUVVBTCwgR0xfTUFYX0RSQVdfQlVGRkVSUywgR0xfTkVBUkVTVCwgR0xfT05FX01JTlVTX1NSQ19BTFBIQSwgR0xfUkVBRF9GUkFNRUJVRkZFUiwgR0xfUkVOREVSQlVGRkVSLCBHTF9SR0JBLCBHTF9SR0JBMzJGLCBHTF9SR0JBOCwgR0xfU1JDX0FMUEhBLCBHTF9URVhUVVJFXzJELCBHTF9URVhUVVJFX0NVQkVfTUFQLCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0ssIEdMX1ZFUlRFWF9TSEFERVIgfSBmcm9tICcuL0dMQ29uc3RhbnRzJztcbmltcG9ydCB7IEJpbmRIZWxwZXIgfSBmcm9tICcuL3V0aWxzL0JpbmRIZWxwZXInO1xuaW1wb3J0IHsgR0xDYXRCdWZmZXIgfSBmcm9tICcuL0dMQ2F0QnVmZmVyJztcbmltcG9ydCB7IEdMQ2F0RXJyb3JzIH0gZnJvbSAnLi9HTENhdEVycm9ycyc7XG5pbXBvcnQgeyBHTENhdEZyYW1lYnVmZmVyIH0gZnJvbSAnLi9HTENhdEZyYW1lYnVmZmVyJztcbmltcG9ydCB7IEdMQ2F0UmVuZGVyYnVmZmVyIH0gZnJvbSAnLi9HTENhdFJlbmRlcmJ1ZmZlcic7XG5pbXBvcnQgeyBHTENhdFNoYWRlciB9IGZyb20gJy4vR0xDYXRTaGFkZXInO1xuaW1wb3J0IHsgR0xDYXRUZXh0dXJlIH0gZnJvbSAnLi9HTENhdFRleHR1cmUnO1xuaW1wb3J0IHsgR0xDYXRUcmFuc2Zvcm1GZWVkYmFjayB9IGZyb20gJy4vR0xDYXRUcmFuc2Zvcm1GZWVkYmFjayc7XG5pbXBvcnQgeyBHTENhdFZlcnRleEFycmF5IH0gZnJvbSAnLi9HTENhdFZlcnRleEFycmF5JztcblxuZXhwb3J0IHR5cGUgV2ViR0xFeHRlbnNpb24gPSBhbnk7XG5cbmV4cG9ydCB0eXBlIEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD5cbiAgPSBUQ29udGV4dCBleHRlbmRzIFdlYkdMMlJlbmRlcmluZ0NvbnRleHRcbiAgICA/IFdlYkdMVmVydGV4QXJyYXlPYmplY3RcbiAgICA6IFdlYkdMVmVydGV4QXJyYXlPYmplY3RPRVM7XG5cbi8qKlxuICogV2ViR0wgd3JhcHBlciB3aXRoIHBsZW50eSBvZiBoYWNrYWJpbGl0eS5cbiAqL1xuZXhwb3J0IGNsYXNzIEdMQ2F0PFRDb250ZXh0IGV4dGVuZHMgV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dD4ge1xuICBwdWJsaWMgc3RhdGljIHRocm93SWZOdWxsPFQ+KCB2OiBUIHwgbnVsbCApOiBUIHtcbiAgICBpZiAoIHYgPT0gbnVsbCApIHtcbiAgICAgIHRocm93IEdMQ2F0RXJyb3JzLlVuZXhwZWN0ZWROdWxsRXJyb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2O1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBwcmVmZXJyZWRNdWx0aXNhbXBsZVNhbXBsZXMgPSA0O1xuXG4gIHB1YmxpYyBwcmVmZXJyZWREZXB0aEZvcm1hdDogR0xlbnVtOyAvLyB3aWxsIGJlIHNldCBpbiBjb25zdHJ1Y3RvclxuXG4gIHByaXZhdGUgX19nbDogVENvbnRleHQ7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJWZXJ0ZXhCdWZmZXIgPSBuZXcgQmluZEhlbHBlcjxHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggYnVmZmVyICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kQnVmZmVyKCBHTF9BUlJBWV9CVUZGRVIsIGJ1ZmZlcj8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJJbmRleEJ1ZmZlciA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCBidWZmZXIgKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcbiAgICAgIGdsLmJpbmRCdWZmZXIoIEdMX0VMRU1FTlRfQVJSQVlfQlVGRkVSLCBidWZmZXI/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyVHJhbnNmb3JtRmVlZGJhY2sgPSBuZXcgQmluZEhlbHBlcjxHTENhdFRyYW5zZm9ybUZlZWRiYWNrPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCBidWZmZXIgKSA9PiB7XG4gICAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgICAgaWYgKCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYmIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgICAgZ2wuYmluZFRyYW5zZm9ybUZlZWRiYWNrKCBHTF9UUkFOU0ZPUk1fRkVFREJBQ0ssIGJ1ZmZlcj8ucmF3ID8/IG51bGwgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEdMQ2F0RXJyb3JzLldlYkdMMkV4Y2x1c2l2ZUVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fYmluZEhlbHBlclZlcnRleEFycmF5ID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggdmVydGV4QXJyYXkgKSA9PiB7XG4gICAgICB0aGlzLnJhd0JpbmRWZXJ0ZXhBcnJheSggdmVydGV4QXJyYXk/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyVGV4dHVyZTJEID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCB0ZXh0dXJlICkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICBnbC5iaW5kVGV4dHVyZSggR0xfVEVYVFVSRV8yRCwgdGV4dHVyZT8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJUZXh0dXJlQ3ViZU1hcCA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggdGV4dHVyZSApID0+IHtcbiAgICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuICAgICAgZ2wuYmluZFRleHR1cmUoIEdMX1RFWFRVUkVfQ1VCRV9NQVAsIHRleHR1cmU/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyUmVuZGVyYnVmZmVyID0gbmV3IEJpbmRIZWxwZXI8R0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgbnVsbD4oXG4gICAgbnVsbCxcbiAgICAoIHJlbmRlcmJ1ZmZlciApID0+IHtcbiAgICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuICAgICAgZ2wuYmluZFJlbmRlcmJ1ZmZlciggR0xfUkVOREVSQlVGRkVSLCByZW5kZXJidWZmZXI/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyRnJhbWVidWZmZXIgPSBuZXcgQmluZEhlbHBlcjxHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IG51bGw+KFxuICAgIG51bGwsXG4gICAgKCBmcmFtZWJ1ZmZlciApID0+IHtcbiAgICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKCBHTF9GUkFNRUJVRkZFUiwgZnJhbWVidWZmZXI/LnJhdyA/PyBudWxsICk7XG4gICAgfVxuICApO1xuXG4gIHByaXZhdGUgX19iaW5kSGVscGVyUHJvZ3JhbSA9IG5ldyBCaW5kSGVscGVyPEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4gfCBudWxsPihcbiAgICBudWxsLFxuICAgICggcHJvZ3JhbSApID0+IHtcbiAgICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuICAgICAgZ2wudXNlUHJvZ3JhbSggcHJvZ3JhbT8ucmF3ID8/IG51bGwgKTtcbiAgICB9XG4gICk7XG5cbiAgcHJpdmF0ZSBfX2JpbmRIZWxwZXJEcmF3QnVmZmVycyA9IG5ldyBCaW5kSGVscGVyPEdMZW51bVtdPihcbiAgICBbIEdMX0NPTE9SX0FUVEFDSE1FTlQwIF0sXG4gICAgKCBidWZmZXJzICkgPT4ge1xuICAgICAgdGhpcy5yYXdEcmF3QnVmZmVycyggYnVmZmVycyApO1xuICAgIH1cbiAgKTtcblxuICBwcml2YXRlIF9fZXh0ZW5zaW9uQ2FjaGU6IHsgWyBuYW1lOiBzdHJpbmcgXTogV2ViR0xFeHRlbnNpb24gfSA9IHt9O1xuICBwcml2YXRlIF9fZHVtbXlUZXh0dXJlQ2FjaGU/OiBHTENhdFRleHR1cmU8VENvbnRleHQ+O1xuXG4gIC8qKlxuICAgKiBJdHMgb3duIHJlbmRlcmluZyBjb250ZXh0LlxuICAgKi9cbiAgcHVibGljIGdldCByZW5kZXJpbmdDb250ZXh0KCk6IFRDb250ZXh0IHtcbiAgICByZXR1cm4gdGhpcy5fX2dsO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBvd24gcmVuZGVyaW5nIGNvbnRleHQuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0LnJlbmRlcmluZ0NvbnRleHRdXVxuICAgKi9cbiAgcHVibGljIGdldCBnbCgpOiBUQ29udGV4dCB7XG4gICAgcmV0dXJuIHRoaXMuX19nbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXQgaW5zdGFuY2UuXG4gICAqIFJlbmRlcmluZyBjb250ZXh0IGlzIHJlcXVpcmVkLlxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBnbDogVENvbnRleHQgKSB7XG4gICAgdGhpcy5fX2dsID0gZ2w7XG5cbiAgICBnbC5lbmFibGUoIEdMX0RFUFRIX1RFU1QgKTtcbiAgICBnbC5kZXB0aEZ1bmMoIEdMX0xFUVVBTCApO1xuICAgIGdsLmVuYWJsZSggR0xfQkxFTkQgKTtcbiAgICBnbC5ibGVuZEZ1bmMoIEdMX1NSQ19BTFBIQSwgR0xfT05FX01JTlVTX1NSQ19BTFBIQSApO1xuXG4gICAgaWYgKCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYmIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIHRoaXMucHJlZmVycmVkRGVwdGhGb3JtYXQgPSBHTF9ERVBUSF9DT01QT05FTlQyNDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcmVmZXJyZWREZXB0aEZvcm1hdCA9IEdMX0RFUFRIX0NPTVBPTkVOVDE2O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIGR1bW15IHRleHR1cmUsIDEwMCUgb3JnYW5pYyBwdXJlICNGRjAwRkYgdGV4dHVyZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgZHVtbXlUZXh0dXJlKCk6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4ge1xuICAgIGlmICggdGhpcy5fX2R1bW15VGV4dHVyZUNhY2hlICkge1xuICAgICAgcmV0dXJuIHRoaXMuX19kdW1teVRleHR1cmVDYWNoZTtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXh0dXJlID0gdGhpcy5jcmVhdGVUZXh0dXJlKCk7XG5cbiAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkoIDEsIDEsIG5ldyBVaW50OEFycmF5KCBbIDI1NSwgMCwgMjU1LCAyNTUgXSApICk7XG4gICAgdGhpcy5fX2R1bW15VGV4dHVyZUNhY2hlID0gdGV4dHVyZTtcbiAgICByZXR1cm4gdGV4dHVyZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBhbiBleHRlbnNpb24uXG4gICAqIElmIHRoZXkgaXMgeW91ciBwcmVjaW91cyBvbmUgYW5kIHlvdSBjYW5ub3QgbGl2ZSB3aXRob3V0IGhpbSwgdHVybiBvbiBgdGhyb3dJZk5vdEZvdW5kYC5cbiAgICovXG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ09FU190ZXh0dXJlX2hhbGZfZmxvYXQnLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IE9FU190ZXh0dXJlX2hhbGZfZmxvYXQgfCBudWxsO1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0JyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogT0VTX3RleHR1cmVfaGFsZl9mbG9hdDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfaGFsZl9mbG9hdF9saW5lYXInLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IE9FU190ZXh0dXJlX2hhbGZfZmxvYXRfbGluZWFyIHwgbnVsbDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfaGFsZl9mbG9hdF9saW5lYXInLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0X2xpbmVhcjtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfZmxvYXQnLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IE9FU190ZXh0dXJlX2Zsb2F0IHwgbnVsbDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfZmxvYXQnLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBPRVNfdGV4dHVyZV9mbG9hdDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXIgfCBudWxsO1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXInLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXI7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oXG4gICAgbmFtZTogJ0FOR0xFX2luc3RhbmNlZF9hcnJheXMnLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IEFOR0xFX2luc3RhbmNlZF9hcnJheXMgfCBudWxsO1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ6IHRydWVcbiAgKTogQU5HTEVfaW5zdGFuY2VkX2FycmF5cztcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnLFxuICAgIHRocm93SWZOb3RGb3VuZD86IGZhbHNlXG4gICk6IE9FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0IHwgbnVsbDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBPRVNfdmVydGV4X2FycmF5X29iamVjdDtcbiAgcHVibGljIGdldEV4dGVuc2lvbihcbiAgICBuYW1lOiAnV0VCR0xfZHJhd19idWZmZXJzJyxcbiAgICB0aHJvd0lmTm90Rm91bmQ/OiBmYWxzZVxuICApOiBXRUJHTF9kcmF3X2J1ZmZlcnMgfCBudWxsO1xuICBwdWJsaWMgZ2V0RXh0ZW5zaW9uKFxuICAgIG5hbWU6ICdXRUJHTF9kcmF3X2J1ZmZlcnMnLFxuICAgIHRocm93SWZOb3RGb3VuZDogdHJ1ZVxuICApOiBXRUJHTF9kcmF3X2J1ZmZlcnM7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oIG5hbWU6IHN0cmluZywgdGhyb3dJZk5vdEZvdW5kPzogYm9vbGVhbiApOiBXZWJHTEV4dGVuc2lvbiB8IG51bGw7XG4gIHB1YmxpYyBnZXRFeHRlbnNpb24oIG5hbWU6IHN0cmluZywgdGhyb3dJZk5vdEZvdW5kPzogYm9vbGVhbiApOiBXZWJHTEV4dGVuc2lvbiB8IG51bGwge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKCB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbIG5hbWUgXSApIHtcbiAgICAgIHJldHVybiB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbIG5hbWUgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF0gPSBnbC5nZXRFeHRlbnNpb24oIG5hbWUgKTtcbiAgICAgIGlmICggdGhpcy5fX2V4dGVuc2lvbkNhY2hlWyBuYW1lIF0gKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbIG5hbWUgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICggdGhyb3dJZk5vdEZvdW5kICkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvciggJ0dMQ2F0LmdldEV4dGVuc2lvbjogVGhlIGV4dGVuc2lvbiBcIicgKyBuYW1lICsgJ1wiIGlzIG5vdCBzdXBwb3J0ZWQnICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIGV4dGVuc2lvbnMuXG4gICAqIElmIHRoZXkgYXJlIHlvdXIgcHJlY2lvdXMgb25lcyBhbmQgeW91IGNhbm5vdCBsaXZlIHdpdGhvdXQgdGhlbSwgdHVybiBvbiBgdGhyb3dJZk5vdEZvdW5kYC5cbiAgICovXG4gIHB1YmxpYyBnZXRFeHRlbnNpb25zKCBuYW1lczogc3RyaW5nW10sIHRocm93SWZOb3RGb3VuZD86IGJvb2xlYW4gKTogQXJyYXk8V2ViR0xFeHRlbnNpb24gfCBudWxsPiB7XG4gICAgcmV0dXJuIG5hbWVzLm1hcCggKCBuICkgPT4gdGhpcy5nZXRFeHRlbnNpb24oIG4sIHRocm93SWZOb3RGb3VuZCApICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHNoYWRlciBvYmplY3QuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlU2hhZGVyKCB0eXBlOiBudW1iZXIgKTogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGNvbnN0IHNoYWRlciA9IEdMQ2F0LnRocm93SWZOdWxsKCBnbC5jcmVhdGVTaGFkZXIoIHR5cGUgKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdFNoYWRlciggdGhpcywgc2hhZGVyICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IHByb2dyYW0gb2JqZWN0LlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVByb2dyYW0oKTogR0xDYXRQcm9ncmFtPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBjb25zdCBwcm9ncmFtID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVByb2dyYW0oKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdFByb2dyYW0oIHRoaXMsIHByb2dyYW0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXQgcHJvZ3JhbSBvYmplY3QsIGluIGxhemllciB3YXkuXG4gICAqL1xuICBwdWJsaWMgbGF6eVByb2dyYW0oXG4gICAgdmVydDogc3RyaW5nLFxuICAgIGZyYWc6IHN0cmluZyxcbiAgICBvcHRpb25zOiBHTENhdFByb2dyYW1MaW5rT3B0aW9ucyA9IHt9LFxuICApOiBHTENhdFByb2dyYW08VENvbnRleHQ+IHtcbiAgICBsZXQgdmVydGV4U2hhZGVyOiBHTENhdFNoYWRlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IGZyYWdtZW50U2hhZGVyOiBHTENhdFNoYWRlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IHByb2dyYW06IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICAvLyA9PSB2ZXJ0ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLmNyZWF0ZVNoYWRlciggR0xfVkVSVEVYX1NIQURFUiApO1xuICAgICAgdmVydGV4U2hhZGVyLmNvbXBpbGUoIHZlcnQgKTtcblxuICAgICAgLy8gPT0gZnJhZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSB0aGlzLmNyZWF0ZVNoYWRlciggR0xfRlJBR01FTlRfU0hBREVSICk7XG4gICAgICBmcmFnbWVudFNoYWRlci5jb21waWxlKCBmcmFnICk7XG5cbiAgICAgIC8vID09IHByb2dyYW0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGNvbnN0IHByb2dyYW0gPSB0aGlzLmNyZWF0ZVByb2dyYW0oKTtcbiAgICAgIHByb2dyYW0ubGluayggWyB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyIF0sIG9wdGlvbnMgKTtcblxuICAgICAgLy8gPT0gYWxtb3N0IGRvbmUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgcmV0dXJuIHByb2dyYW07XG4gICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICBwcm9ncmFtPy5kaXNwb3NlKCk7XG4gICAgICBmcmFnbWVudFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgdmVydGV4U2hhZGVyPy5kaXNwb3NlKCk7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgR0xDYXQgcHJvZ3JhbSBvYmplY3QsIGluIGxhemllciB3YXkuXG4gICAqIEl0J3MgZ29ubmEgYmUgYXN5bmNocm9ub3VzIGlmIHlvdSBoYXZlIHRoZSBLSFJfcGFyYWxsZWxfc2hhZGVyX2NvbXBpbGUgZXh0ZW5zaW9uIHN1cHBvcnQuXG4gICAqL1xuICBwdWJsaWMgbGF6eVByb2dyYW1Bc3luYyhcbiAgICB2ZXJ0OiBzdHJpbmcsXG4gICAgZnJhZzogc3RyaW5nLFxuICAgIG9wdGlvbnM6IEdMQ2F0UHJvZ3JhbUxpbmtPcHRpb25zID0ge30sXG4gICk6IFByb21pc2U8R0xDYXRQcm9ncmFtPFRDb250ZXh0Pj4ge1xuICAgIGxldCB2ZXJ0ZXhTaGFkZXI6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZnJhZ21lbnRTaGFkZXI6IEdMQ2F0U2hhZGVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgcHJvZ3JhbTogR0xDYXRTaGFkZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vID09IHZlcnQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGNvbnN0IHZlcnRleFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKCBHTF9WRVJURVhfU0hBREVSICk7XG4gICAgICB2ZXJ0ZXhTaGFkZXIuY29tcGlsZSggdmVydCApO1xuXG4gICAgICAvLyA9PSBmcmFnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCBmcmFnbWVudFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKCBHTF9GUkFHTUVOVF9TSEFERVIgKTtcbiAgICAgIGZyYWdtZW50U2hhZGVyLmNvbXBpbGUoIGZyYWcgKTtcblxuICAgICAgLy8gPT0gcHJvZ3JhbSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgY29uc3QgcHJvZ3JhbSA9IHRoaXMuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgcmV0dXJuIHByb2dyYW0ubGlua0FzeW5jKCBbIHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIgXSwgb3B0aW9ucyApLnRoZW4oICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHByb2dyYW07XG4gICAgICB9ICkuY2F0Y2goICggZSApID0+IHtcbiAgICAgICAgcHJvZ3JhbT8uZGlzcG9zZSgpO1xuICAgICAgICBmcmFnbWVudFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgICB2ZXJ0ZXhTaGFkZXI/LmRpc3Bvc2UoKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCBlICk7XG4gICAgICB9ICk7XG4gICAgfSBjYXRjaCAoIGUgKSB7XG4gICAgICBwcm9ncmFtPy5kaXNwb3NlKCk7XG4gICAgICBmcmFnbWVudFNoYWRlcj8uZGlzcG9zZSgpO1xuICAgICAgdmVydGV4U2hhZGVyPy5kaXNwb3NlKCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoIGUgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3BlY2lmeSBhIHByb2dyYW0gdG8gdXNlLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIHVzYWdlIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyB1c2VQcm9ncmFtPFQ+KFxuICAgIHByb2dyYW06IEdMQ2F0UHJvZ3JhbTxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCBwcm9ncmFtOiBHTENhdFByb2dyYW08VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyUHJvZ3JhbS5iaW5kKCBwcm9ncmFtLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB2ZXJ0ZXggYnVmZmVyLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZUJ1ZmZlcigpOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgY29uc3QgYnVmZmVyID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZUJ1ZmZlcigpICk7XG5cbiAgICByZXR1cm4gbmV3IEdMQ2F0QnVmZmVyKCB0aGlzLCBidWZmZXIgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgdmVydGV4IGJ1ZmZlci5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kVmVydGV4QnVmZmVyPFQ+KFxuICAgIGJ1ZmZlcjogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggYnVmZmVyOiBHTENhdEJ1ZmZlcjxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJWZXJ0ZXhCdWZmZXIuYmluZCggYnVmZmVyLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYW4gaW5kZXggYnVmZmVyLlxuICAgKiBJZiBjYWxsYmFjayBpcyBwcm92aWRlZCwgaXQgd2lsbCBleGVjdXRlIHRoZSBjYWxsYmFjayBpbW1lZGlhdGVseSwgYW5kIHVuZG8gdGhlIGJpbmQgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGJpbmRJbmRleEJ1ZmZlcjxUPihcbiAgICBidWZmZXI6IEdMQ2F0QnVmZmVyPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIGJ1ZmZlcjogR0xDYXRCdWZmZXI8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVySW5kZXhCdWZmZXIuYmluZCggYnVmZmVyLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB0cmFuc2Zvcm0gZmVlZGJhY2suXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlVHJhbnNmb3JtRmVlZGJhY2soKTogR0xDYXRUcmFuc2Zvcm1GZWVkYmFjazxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYmIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGNvbnN0IHRyYW5zZm9ybUZlZWRiYWNrID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVRyYW5zZm9ybUZlZWRiYWNrKCkgKTtcblxuICAgICAgcmV0dXJuIG5ldyBHTENhdFRyYW5zZm9ybUZlZWRiYWNrKCB0aGlzLCB0cmFuc2Zvcm1GZWVkYmFjayApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBHTENhdEVycm9ycy5XZWJHTDJFeGNsdXNpdmVFcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIHRyYW5zZm9ybSBmZWVkYmFjay5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kVHJhbnNmb3JtRmVlZGJhY2s8VD4oXG4gICAgdHJhbnNmb3JtRmVlZGJhY2s6IEdMQ2F0VHJhbnNmb3JtRmVlZGJhY2s8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggdHJhbnNmb3JtRmVlZGJhY2s6IEdMQ2F0VHJhbnNmb3JtRmVlZGJhY2s8VENvbnRleHQ+IHwgbnVsbCApID0+IFQsXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclRyYW5zZm9ybUZlZWRiYWNrLmJpbmQoIHRyYW5zZm9ybUZlZWRiYWNrLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB2ZXJ0ZXggYXJyYXkuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlVmVydGV4QXJyYXkoKTogR0xDYXRWZXJ0ZXhBcnJheTxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgaWYgKCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYmIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGNvbnN0IHZlcnRleEFycmF5ID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVZlcnRleEFycmF5KCkgKTtcblxuICAgICAgcmV0dXJuIG5ldyBHTENhdFZlcnRleEFycmF5KCB0aGlzLCB2ZXJ0ZXhBcnJheSBhcyBhbnkgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXh0ID0gdGhpcy5nZXRFeHRlbnNpb24oICdPRVNfdmVydGV4X2FycmF5X29iamVjdCcsIHRydWUgKTtcblxuICAgICAgY29uc3QgdmVydGV4QXJyYXkgPSBHTENhdC50aHJvd0lmTnVsbCggZXh0LmNyZWF0ZVZlcnRleEFycmF5T0VTKCkgKTtcblxuICAgICAgcmV0dXJuIG5ldyBHTENhdFZlcnRleEFycmF5KCB0aGlzLCB2ZXJ0ZXhBcnJheSBhcyBhbnkgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBvZiBgZ2wuYmluZFZlcnRleEFycmF5YC5cbiAgICpcbiAgICoge0BsaW5rIHJhd0JpbmRWZXJ0ZXhBcnJheX0gaXMgYmV0dGVyLlxuICAgKi9cbiAgcHVibGljIHJhd0JpbmRWZXJ0ZXhBcnJheSggYXJyYXk6IEdMQ2F0VmVydGV4QXJyYXlSYXdUeXBlPFRDb250ZXh0PiB8IG51bGwgKTogdm9pZCB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBpZiAoIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgJiYgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgZ2wuYmluZFZlcnRleEFycmF5KCBhcnJheSApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHQgPSB0aGlzLmdldEV4dGVuc2lvbiggJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JywgdHJ1ZSApO1xuICAgICAgZXh0LmJpbmRWZXJ0ZXhBcnJheU9FUyggYXJyYXkgYXMgYW55ICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHtAbGluayByYXdCaW5kVmVydGV4QXJyYXl9IGJ1dCBiZXR0ZXIuXG4gICAqXG4gICAqIEJpbmQgYSB2ZXJ0ZXggYXJyYXkuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZFZlcnRleEFycmF5PFQ+KFxuICAgIHZlcnRleEFycmF5OiBHTENhdFZlcnRleEFycmF5PFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIHZlcnRleEFycmF5OiBHTENhdFZlcnRleEFycmF5PFRDb250ZXh0PiB8IG51bGwgKSA9PiBUXG4gICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fYmluZEhlbHBlclZlcnRleEFycmF5LmJpbmQoIHZlcnRleEFycmF5LCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyB0ZXh0dXJlLlxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVRleHR1cmUoKTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBjb25zdCB0ZXh0dXJlID0gR0xDYXQudGhyb3dJZk51bGwoIGdsLmNyZWF0ZVRleHR1cmUoKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdFRleHR1cmUoIHRoaXMsIHRleHR1cmUgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIGEgMkQgdGV4dHVyZS5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kVGV4dHVyZTJEPFQ+KFxuICAgIHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsLFxuICAgIGNhbGxiYWNrPzogKCB0ZXh0dXJlOiBHTENhdFRleHR1cmU8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyVGV4dHVyZTJELmJpbmQoIHRleHR1cmUsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBhIGN1YmVtYXAgdGV4dHVyZS5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kVGV4dHVyZUN1YmVNYXA8VD4oXG4gICAgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIHRleHR1cmU6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD4gfCBudWxsICkgPT4gVFxuICApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJUZXh0dXJlQ3ViZU1hcC5iaW5kKCB0ZXh0dXJlLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyByZW5kZXJidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlUmVuZGVyYnVmZmVyKCk6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9fZ2w7XG5cbiAgICBjb25zdCByZW5kZXJidWZmZXIgPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlUmVuZGVyYnVmZmVyKCkgKTtcblxuICAgIHJldHVybiBuZXcgR0xDYXRSZW5kZXJidWZmZXIoIHRoaXMsIHJlbmRlcmJ1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSByZW5kZXJidWZmZXIuXG4gICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBpdCB3aWxsIGV4ZWN1dGUgdGhlIGNhbGxiYWNrIGltbWVkaWF0ZWx5LCBhbmQgdW5kbyB0aGUgYmluZCBhZnRlciB0aGUgY2FsbGJhY2suXG4gICAqL1xuICBwdWJsaWMgYmluZFJlbmRlcmJ1ZmZlcjxUPihcbiAgICByZW5kZXJidWZmZXI6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IG51bGwsXG4gICAgY2FsbGJhY2s/OiAoIHJlbmRlcmJ1ZmZlcjogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyUmVuZGVyYnVmZmVyLmJpbmQoIHJlbmRlcmJ1ZmZlciwgY2FsbGJhY2sgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgZnJhbWVidWZmZXIuXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlRnJhbWVidWZmZXIoKTogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4ge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fX2dsO1xuXG4gICAgY29uc3QgZnJhbWVidWZmZXIgPSBHTENhdC50aHJvd0lmTnVsbCggZ2wuY3JlYXRlRnJhbWVidWZmZXIoKSApO1xuXG4gICAgcmV0dXJuIG5ldyBHTENhdEZyYW1lYnVmZmVyKCB0aGlzLCBmcmFtZWJ1ZmZlciApO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSBmcmFtZWJ1ZmZlci5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBiaW5kIGFmdGVyIHRoZSBjYWxsYmFjay5cbiAgICovXG4gIHB1YmxpYyBiaW5kRnJhbWVidWZmZXI8VD4oXG4gICAgZnJhbWVidWZmZXI6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBjYWxsYmFjaz86ICggZnJhbWVidWZmZXI6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgbnVsbCApID0+IFRcbiAgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19iaW5kSGVscGVyRnJhbWVidWZmZXIuYmluZCggZnJhbWVidWZmZXIsIGNhbGxiYWNrICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGZyYW1lYnVmZXIsIGluIGxhemllciB3YXkuXG4gICAqL1xuICBwdWJsaWMgbGF6eUZyYW1lYnVmZmVyKFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAge1xuICAgICAgaXNGbG9hdCA9IGZhbHNlLFxuICAgICAgZGVwdGhGb3JtYXQgPSB0aGlzLnByZWZlcnJlZERlcHRoRm9ybWF0XG4gICAgfSA9IHt9XG4gICk6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHtcbiAgICBsZXQgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgcmVuZGVyYnVmZmVyOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgbGV0IGZyYW1lYnVmZmVyOiBHTENhdEZyYW1lYnVmZmVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICAvLyA9PSBmcmFtZWJ1ZmZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBmcmFtZWJ1ZmZlciA9IHRoaXMuY3JlYXRlRnJhbWVidWZmZXIoKTtcblxuICAgICAgLy8gPT0gcmVuZGVyYnVmZmVyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgcmVuZGVyYnVmZmVyID0gdGhpcy5jcmVhdGVSZW5kZXJidWZmZXIoKTtcbiAgICAgIHJlbmRlcmJ1ZmZlci5yZW5kZXJidWZmZXJTdG9yYWdlKCB3aWR0aCwgaGVpZ2h0LCB7IGZvcm1hdDogZGVwdGhGb3JtYXQgfSApO1xuICAgICAgZnJhbWVidWZmZXIuYXR0YWNoUmVuZGVyYnVmZmVyKCByZW5kZXJidWZmZXIsIHsgYXR0YWNobWVudDogR0xfREVQVEhfQVRUQUNITUVOVCB9ICk7XG5cbiAgICAgIC8vID09IHRleHR1cmUgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHRleHR1cmUgPSB0aGlzLmNyZWF0ZVRleHR1cmUoKTtcbiAgICAgIGlmICggaXNGbG9hdCApIHtcbiAgICAgICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KFxuICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIHsgaW50ZXJuYWxmb3JtYXQ6IEdMX1JHQkEzMkYsIGZvcm1hdDogR0xfUkdCQSwgdHlwZTogR0xfRkxPQVQgfVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KCB3aWR0aCwgaGVpZ2h0LCBudWxsICk7XG4gICAgICB9XG4gICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hUZXh0dXJlKCB0ZXh0dXJlICk7XG5cbiAgICAgIC8vID09IGFsbW9zdCBkb25lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHJldHVybiBmcmFtZWJ1ZmZlcjtcbiAgICB9IGNhdGNoICggZSApIHtcbiAgICAgIGZyYW1lYnVmZmVyPy5kaXNwb3NlKCk7XG4gICAgICB0ZXh0dXJlPy5kaXNwb3NlKCk7XG4gICAgICByZW5kZXJidWZmZXI/LmRpc3Bvc2UoKTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBtdWx0aXNhbXBsZSBmcmFtZWJ1ZmZlciwgaW4gbGF6aWVyIHdheS5cbiAgICovXG4gIHB1YmxpYyBsYXp5TXVsdGlzYW1wbGVGcmFtZWJ1ZmZlcihcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIHtcbiAgICAgIHNhbXBsZXMgPSA0LFxuICAgICAgaXNGbG9hdCA9IGZhbHNlLFxuICAgICAgZGVwdGhGb3JtYXQgPSB0aGlzLnByZWZlcnJlZERlcHRoRm9ybWF0LFxuICAgICAgZmFsbGJhY2tXZWJHTDEgPSB0cnVlXG4gICAgfSA9IHt9XG4gICk6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmICggV2ViR0wyUmVuZGVyaW5nQ29udGV4dCAmJiBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBsZXQgdGV4dHVyZTogR0xDYXRUZXh0dXJlPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICAgIGxldCByZW5kZXJidWZmZXJEZXB0aDogR0xDYXRSZW5kZXJidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuICAgICAgbGV0IHJlbmRlcmJ1ZmZlckNvbG9yOiBHTENhdFJlbmRlcmJ1ZmZlcjxUQ29udGV4dD4gfCB1bmRlZmluZWQ7XG4gICAgICBsZXQgZnJhbWVidWZmZXI6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyA9PSBmcmFtZWJ1ZmZlciA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICBmcmFtZWJ1ZmZlciA9IHRoaXMuY3JlYXRlRnJhbWVidWZmZXIoKTtcblxuICAgICAgICAvLyA9PSByZW5kZXJidWZmZXIgZGVwdGggPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICByZW5kZXJidWZmZXJEZXB0aCA9IHRoaXMuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgICAgIHJlbmRlcmJ1ZmZlckRlcHRoLnJlbmRlcmJ1ZmZlclN0b3JhZ2VNdWx0aXNhbXBsZShcbiAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgeyBzYW1wbGVzLCBmb3JtYXQ6IGRlcHRoRm9ybWF0IH1cbiAgICAgICAgKTtcbiAgICAgICAgZnJhbWVidWZmZXIuYXR0YWNoUmVuZGVyYnVmZmVyKCByZW5kZXJidWZmZXJEZXB0aCwgeyBhdHRhY2htZW50OiBHTF9ERVBUSF9BVFRBQ0hNRU5UIH0gKTtcblxuICAgICAgICAvLyA9PSByZW5kZXJidWZmZXIgY29sb3IgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICBjb25zdCByZW5kZXJidWZmZXJDb2xvciA9IHRoaXMuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgICAgIGNvbnN0IGNvbG9yRm9ybWF0ID0gaXNGbG9hdCA/IEdMX1JHQkEzMkYgOiBHTF9SR0JBODtcbiAgICAgICAgcmVuZGVyYnVmZmVyQ29sb3IucmVuZGVyYnVmZmVyU3RvcmFnZU11bHRpc2FtcGxlKFxuICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICB7IHNhbXBsZXMsIGZvcm1hdDogY29sb3JGb3JtYXQgfVxuICAgICAgICApO1xuICAgICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlckNvbG9yLCB7IGF0dGFjaG1lbnQ6IEdMX0NPTE9SX0FUVEFDSE1FTlQwIH0gKTtcblxuICAgICAgICAvLyA9PSBhbG1vc3QgZG9uZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICByZXR1cm4gZnJhbWVidWZmZXI7XG4gICAgICB9IGNhdGNoICggZSApIHtcbiAgICAgICAgZnJhbWVidWZmZXI/LmRpc3Bvc2UoKTtcbiAgICAgICAgdGV4dHVyZT8uZGlzcG9zZSgpO1xuICAgICAgICByZW5kZXJidWZmZXJDb2xvcj8uZGlzcG9zZSgpO1xuICAgICAgICByZW5kZXJidWZmZXJEZXB0aD8uZGlzcG9zZSgpO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIGZhbGxiYWNrV2ViR0wxICkge1xuICAgICAgcmV0dXJuIHRoaXMubGF6eUZyYW1lYnVmZmVyKCB3aWR0aCwgaGVpZ2h0LCB7IGlzRmxvYXQgfSApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBHTENhdEVycm9ycy5XZWJHTDJFeGNsdXNpdmVFcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGRyYXcgYnVmZmVycywgaW4gbGF6aWVyIHdheS5cbiAgICogSWYgeW91IGNhbid0IGdyYWIgYFdFQkdMX2RyYXdfYnVmZmVyc2AgZXh0ZW5zaW9uLCB5b3UnbGwgZGllIGluc3RhbnRseSBhdCB0aGlzIHBvaW50LlxuICAgKi9cbiAgcHVibGljIGxhenlEcmF3YnVmZmVycyhcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxuICAgIG51bUJ1ZmZlcnM6IG51bWJlcixcbiAgICB7XG4gICAgICBpc0Zsb2F0ID0gZmFsc2UsXG4gICAgICBkZXB0aEZvcm1hdCA9IHRoaXMucHJlZmVycmVkRGVwdGhGb3JtYXRcbiAgICB9ID0ge31cbiAgKTogR0xDYXRGcmFtZWJ1ZmZlcjxUQ29udGV4dD4ge1xuICAgIGlmICggR0xfTUFYX0RSQVdfQlVGRkVSUyA8IG51bUJ1ZmZlcnMgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoICdHTENhdDogTWF4aW11bSBkcmF3IGJ1ZmZlcnMgY291bnQgZXhjZWVkZWQnICk7XG4gICAgfVxuXG4gICAgY29uc3QgdGV4dHVyZXM6IEdMQ2F0VGV4dHVyZTxUQ29udGV4dD5bXSA9IFtdO1xuICAgIGxldCByZW5kZXJidWZmZXI6IEdMQ2F0UmVuZGVyYnVmZmVyPFRDb250ZXh0PiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZnJhbWVidWZmZXI6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vID09IGZyYW1lYnVmZmVyID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGZyYW1lYnVmZmVyID0gdGhpcy5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuXG4gICAgICAvLyA9PSByZW5kZXJidWZmZXIgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBjb25zdCByZW5kZXJidWZmZXIgPSB0aGlzLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xuICAgICAgcmVuZGVyYnVmZmVyLnJlbmRlcmJ1ZmZlclN0b3JhZ2UoIHdpZHRoLCBoZWlnaHQsIHsgZm9ybWF0OiBkZXB0aEZvcm1hdCB9ICk7XG4gICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hSZW5kZXJidWZmZXIoIHJlbmRlcmJ1ZmZlciwgeyBhdHRhY2htZW50OiBHTF9ERVBUSF9BVFRBQ0hNRU5UIH0gKTtcblxuICAgICAgLy8gPT0gdGV4dHVyZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbnVtQnVmZmVyczsgaSArKyApIHtcbiAgICAgICAgY29uc3QgdGV4dHVyZSA9IHRoaXMuY3JlYXRlVGV4dHVyZSgpO1xuICAgICAgICBpZiAoIGlzRmxvYXQgKSB7XG4gICAgICAgICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KFxuICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgeyBpbnRlcm5hbGZvcm1hdDogR0xfUkdCQTMyRiwgZm9ybWF0OiBHTF9SR0JBLCB0eXBlOiBHTF9GTE9BVCB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkoIHdpZHRoLCBoZWlnaHQsIG51bGwgKTtcbiAgICAgICAgfVxuICAgICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hUZXh0dXJlKCB0ZXh0dXJlLCB7IGF0dGFjaG1lbnQ6IEdMX0NPTE9SX0FUVEFDSE1FTlQwICsgaSB9ICk7XG4gICAgICB9XG5cbiAgICAgIC8vID09IGFsbW9zdCBkb25lID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIHJldHVybiBmcmFtZWJ1ZmZlcjtcbiAgICB9IGNhdGNoICggZSApIHtcbiAgICAgIHRleHR1cmVzLmZvckVhY2goICggdGV4dHVyZSApID0+IHtcbiAgICAgICAgdGV4dHVyZS5kaXNwb3NlKCk7XG4gICAgICB9ICk7XG4gICAgICByZW5kZXJidWZmZXI/LmRpc3Bvc2UoKTtcbiAgICAgIGZyYW1lYnVmZmVyPy5kaXNwb3NlKCk7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG9mIGBnbC5kcmF3QnVmZmVyc2AuXG4gICAqXG4gICAqIHtAbGluayBkcmF3QnVmZmVyc30gaXMgYmV0dGVyLlxuICAgKi9cbiAgcHVibGljIHJhd0RyYXdCdWZmZXJzKCBidWZmZXJzOiBHTGVudW1bXSApOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmICggV2ViR0wyUmVuZGVyaW5nQ29udGV4dCAmJiBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBnbC5kcmF3QnVmZmVycyggYnVmZmVycyApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBleHQgPSB0aGlzLmdldEV4dGVuc2lvbiggJ1dFQkdMX2RyYXdfYnVmZmVycycgKTtcbiAgICAgIGV4dD8uZHJhd0J1ZmZlcnNXRUJHTCggYnVmZmVycyApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgcmF3RHJhd0J1ZmZlcnN9IGJ1dCBiZXR0ZXIuXG4gICAqXG4gICAqIENhbGwgdGhpcyBiZWZvcmUgeW91J3JlIGdvbm5hIHVzZSBkcmF3IGJ1ZmZlcnMuXG4gICAqIElmIHlvdSBjYW4ndCBncmFiIGBXRUJHTF9kcmF3X2J1ZmZlcnNgIGV4dGVuc2lvbiwgeW91J2xsIGRpZSBpbnN0YW50bHkgYXQgdGhpcyBwb2ludC5cbiAgICogSWYgY2FsbGJhY2sgaXMgcHJvdmlkZWQsIGl0IHdpbGwgZXhlY3V0ZSB0aGUgY2FsbGJhY2sgaW1tZWRpYXRlbHksIGFuZCB1bmRvIHRoZSBkcmF3IGJ1ZmZlcnMgYWZ0ZXIgdGhlIGNhbGxiYWNrLlxuICAgKi9cbiAgcHVibGljIGRyYXdCdWZmZXJzPFQ+KFxuICAgIGJ1ZmZlcnNPck51bUJ1ZmZlcnM/OiBHTGVudW1bXSB8IG51bWJlcixcbiAgICBjYWxsYmFjaz86ICggYnVmZmVyczogR0xlbnVtW10gKSA9PiBUXG4gICk6IFQge1xuICAgIGxldCBidWZmZXJzOiBHTGVudW1bXTtcblxuICAgIGlmICggQXJyYXkuaXNBcnJheSggYnVmZmVyc09yTnVtQnVmZmVycyApICkge1xuICAgICAgYnVmZmVycyA9IGJ1ZmZlcnNPck51bUJ1ZmZlcnM7XG4gICAgfSBlbHNlIGlmICggYnVmZmVyc09yTnVtQnVmZmVycyApIHtcbiAgICAgIGJ1ZmZlcnMgPSBbXTtcbiAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGJ1ZmZlcnNPck51bUJ1ZmZlcnM7IGkgKysgKSB7XG4gICAgICAgIGJ1ZmZlcnNbIGkgXSA9IEdMX0NPTE9SX0FUVEFDSE1FTlQwICsgaTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYnVmZmVycyA9IFsgR0xfQ09MT1JfQVRUQUNITUVOVDAgXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fX2JpbmRIZWxwZXJEcmF3QnVmZmVycy5iaW5kKCBidWZmZXJzLCBjYWxsYmFjayApO1xuICB9XG5cbiAgLyoqXG4gICAqIGEgd3JhcHBlciBvZiBkcmF3RWxlbWVudHNJbnN0YW5jZWQuXG4gICAqL1xuICBwdWJsaWMgZHJhd0FycmF5c0luc3RhbmNlZChcbiAgICBtb2RlOiBHTGVudW0sXG4gICAgZmlyc3Q6IEdMaW50LFxuICAgIGNvdW50OiBHTHNpemVpLFxuICAgIHByaW1jb3VudDogR0xzaXplaVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xuXG4gICAgaWYgKCBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICYmIGdsIGluc3RhbmNlb2YgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApIHtcbiAgICAgIGdsLmRyYXdBcnJheXNJbnN0YW5jZWQoIG1vZGUsIGZpcnN0LCBjb3VudCwgcHJpbWNvdW50ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4dCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCAnQU5HTEVfaW5zdGFuY2VkX2FycmF5cycsIHRydWUgKTtcbiAgICAgIGV4dC5kcmF3QXJyYXlzSW5zdGFuY2VkQU5HTEUoIG1vZGUsIGZpcnN0LCBjb3VudCwgcHJpbWNvdW50ICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGEgd3JhcHBlciBvZiBkcmF3RWxlbWVudHNJbnN0YW5jZWQuXG4gICAqL1xuICBwdWJsaWMgZHJhd0VsZW1lbnRzSW5zdGFuY2VkKFxuICAgIG1vZGU6IEdMZW51bSxcbiAgICBjb3VudDogR0xzaXplaSxcbiAgICB0eXBlOiBHTGVudW0sXG4gICAgb2Zmc2V0OiBHTGludHB0cixcbiAgICBpbnN0YW5jZUNvdW50OiBHTHNpemVpXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XG5cbiAgICBpZiAoIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgJiYgZ2wgaW5zdGFuY2VvZiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgICAgZ2wuZHJhd0VsZW1lbnRzSW5zdGFuY2VkKCBtb2RlLCBjb3VudCwgdHlwZSwgb2Zmc2V0LCBpbnN0YW5jZUNvdW50ICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4dCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCAnQU5HTEVfaW5zdGFuY2VkX2FycmF5cycsIHRydWUgKTtcbiAgICAgIGV4dC5kcmF3RWxlbWVudHNJbnN0YW5jZWRBTkdMRSggbW9kZSwgY291bnQsIHR5cGUsIG9mZnNldCwgaW5zdGFuY2VDb3VudCApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgY3VycmVudCBmcmFtZWJ1ZmZlci5cbiAgICovXG4gIHB1YmxpYyBjbGVhcihcbiAgICByZWQgPSAwLjAsXG4gICAgZ3JlZW4gPSAwLjAsXG4gICAgYmx1ZSA9IDAuMCxcbiAgICBhbHBoYSA9IDEuMCxcbiAgICBkZXB0aCA9IDEuMFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGdsLmNsZWFyQ29sb3IoIHJlZCwgZ3JlZW4sIGJsdWUsIGFscGhhICk7XG4gICAgZ2wuY2xlYXJEZXB0aCggZGVwdGggKTtcbiAgICBnbC5jbGVhciggR0xfQ09MT1JfQlVGRkVSX0JJVCB8IEdMX0RFUFRIX0JVRkZFUl9CSVQgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCYXNpY2FsbHkganVzdCBhIGBnbC5ibGl0RnJhbWVidWZmZXJgLlxuICAgKi9cbiAgcHVibGljIGJsaXRGcmFtZWJ1ZmZlcihcbiAgICBzcmM6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICBkc3Q6IEdMQ2F0RnJhbWVidWZmZXI8VENvbnRleHQ+IHwgbnVsbCxcbiAgICB7XG4gICAgICBzcmNWaWV3cG9ydCA9IFsgMCwgMCwgc3JjPy5yZW5kZXJidWZmZXI/LndpZHRoID8/IDAsIHNyYz8ucmVuZGVyYnVmZmVyPy5oZWlnaHQgPz8gMCBdLFxuICAgICAgZHN0Vmlld3BvcnQgPSBbIDAsIDAsIGRzdD8ucmVuZGVyYnVmZmVyPy53aWR0aCA/PyAwLCBkc3Q/LnJlbmRlcmJ1ZmZlcj8uaGVpZ2h0ID8/IDAgXSxcbiAgICAgIG1hc2sgPSBHTF9DT0xPUl9CVUZGRVJfQklULFxuICAgICAgZmlsdGVyID0gR0xfTkVBUkVTVFxuICAgIH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX19nbDtcblxuICAgIGlmICggV2ViR0wyUmVuZGVyaW5nQ29udGV4dCAmJiBnbCBpbnN0YW5jZW9mIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgICBnbC5iaW5kRnJhbWVidWZmZXIoIEdMX1JFQURfRlJBTUVCVUZGRVIsIHNyYz8ucmF3ID8/IG51bGwgKTtcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlciggR0xfRFJBV19GUkFNRUJVRkZFUiwgZHN0Py5yYXcgPz8gbnVsbCApO1xuICAgICAgZ2wuYmxpdEZyYW1lYnVmZmVyKFxuICAgICAgICBzcmNWaWV3cG9ydFsgMCBdLFxuICAgICAgICBzcmNWaWV3cG9ydFsgMSBdLFxuICAgICAgICBzcmNWaWV3cG9ydFsgMiBdLFxuICAgICAgICBzcmNWaWV3cG9ydFsgMyBdLFxuICAgICAgICBkc3RWaWV3cG9ydFsgMCBdLFxuICAgICAgICBkc3RWaWV3cG9ydFsgMSBdLFxuICAgICAgICBkc3RWaWV3cG9ydFsgMiBdLFxuICAgICAgICBkc3RWaWV3cG9ydFsgMyBdLFxuICAgICAgICBtYXNrLFxuICAgICAgICBmaWx0ZXJcbiAgICAgICk7XG4gICAgICBnbC5iaW5kRnJhbWVidWZmZXIoIEdMX1JFQURfRlJBTUVCVUZGRVIsIG51bGwgKTtcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlciggR0xfRFJBV19GUkFNRUJVRkZFUiwgbnVsbCApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBHTENhdEVycm9ycy5XZWJHTDJFeGNsdXNpdmVFcnJvcjtcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBO0lBQ0E7QUFDQTtJQUNBO0lBQ0E7QUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7QUF1R0E7SUFDTyxTQUFTLFFBQVEsQ0FBQyxDQUFDLEVBQUU7SUFDNUIsSUFBSSxJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xGLElBQUksSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLElBQUksSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRSxPQUFPO0lBQ2xELFFBQVEsSUFBSSxFQUFFLFlBQVk7SUFDMUIsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDL0MsWUFBWSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNwRCxTQUFTO0lBQ1QsS0FBSyxDQUFDO0lBQ04sSUFBSSxNQUFNLElBQUksU0FBUyxDQUFDLENBQUMsR0FBRyx5QkFBeUIsR0FBRyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7QUFDRDtJQUNPLFNBQVMs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
