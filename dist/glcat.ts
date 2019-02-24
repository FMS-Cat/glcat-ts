(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["GLCat"] = factory();
	else
		root["GLCat"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    ACTIVE_ATTRIBUTES: 35721,
    ACTIVE_ATTRIBUTE_MAX_LENGTH: 35722,
    ACTIVE_TEXTURE: 34016,
    ACTIVE_UNIFORMS: 35718,
    ACTIVE_UNIFORM_MAX_LENGTH: 35719,
    ALIASED_LINE_WIDTH_RANGE: 33902,
    ALIASED_POINT_SIZE_RANGE: 33901,
    ALPHA: 6406,
    ALPHA_BITS: 3413,
    ALWAYS: 519,
    ARRAY_BUFFER: 34962,
    ARRAY_BUFFER_BINDING: 34964,
    ATTACHED_SHADERS: 35717,
    BACK: 1029,
    BLEND: 3042,
    BLEND_COLOR: 32773,
    BLEND_DST_ALPHA: 32970,
    BLEND_DST_RGB: 32968,
    BLEND_EQUATION: 32777,
    BLEND_EQUATION_ALPHA: 34877,
    BLEND_EQUATION_RGB: 32777,
    BLEND_SRC_ALPHA: 32971,
    BLEND_SRC_RGB: 32969,
    BLUE_BITS: 3412,
    BOOL: 35670,
    BOOL_VEC2: 35671,
    BOOL_VEC3: 35672,
    BOOL_VEC4: 35673,
    BROWSER_DEFAULT_WEBGL: 37444,
    BUFFER_SIZE: 34660,
    BUFFER_USAGE: 34661,
    BYTE: 5120,
    CCW: 2305,
    CLAMP_TO_EDGE: 33071,
    COLOR_ATTACHMENT0: 36064,
    COLOR_BUFFER_BIT: 16384,
    COLOR_CLEAR_VALUE: 3106,
    COLOR_WRITEMASK: 3107,
    COMPILE_STATUS: 35713,
    COMPRESSED_TEXTURE_FORMATS: 34467,
    CONSTANT_ALPHA: 32771,
    CONSTANT_COLOR: 32769,
    CONTEXT_LOST_WEBGL: 37442,
    CULL_FACE: 2884,
    CULL_FACE_MODE: 2885,
    CURRENT_PROGRAM: 35725,
    CURRENT_VERTEX_ATTRIB: 34342,
    CW: 2304,
    DECR: 7683,
    DECR_WRAP: 34056,
    DELETE_STATUS: 35712,
    DEPTH_ATTACHMENT: 36096,
    DEPTH_BITS: 3414,
    DEPTH_BUFFER_BIT: 256,
    DEPTH_CLEAR_VALUE: 2931,
    DEPTH_COMPONENT: 6402,
    DEPTH_COMPONENT16: 33189,
    DEPTH_FUNC: 2932,
    DEPTH_RANGE: 2928,
    DEPTH_STENCIL: 34041,
    DEPTH_STENCIL_ATTACHMENT: 33306,
    DEPTH_TEST: 2929,
    DEPTH_WRITEMASK: 2930,
    DITHER: 3024,
    DONT_CARE: 4352,
    DST_ALPHA: 772,
    DST_COLOR: 774,
    DYNAMIC_DRAW: 35048,
    ELEMENT_ARRAY_BUFFER: 34963,
    ELEMENT_ARRAY_BUFFER_BINDING: 34965,
    EQUAL: 514,
    FASTEST: 4353,
    FLOAT: 5126,
    FLOAT_MAT2: 35674,
    FLOAT_MAT3: 35675,
    FLOAT_MAT4: 35676,
    FLOAT_VEC2: 35664,
    FLOAT_VEC3: 35665,
    FLOAT_VEC4: 35666,
    FRAGMENT_SHADER: 35632,
    FRAMEBUFFER: 36160,
    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 36049,
    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 36048,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 36051,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 36050,
    FRAMEBUFFER_BINDING: 36006,
    FRAMEBUFFER_COMPLETE: 36053,
    FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 36054,
    FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 36057,
    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 36055,
    FRAMEBUFFER_UNSUPPORTED: 36061,
    FRONT: 1028,
    FRONT_AND_BACK: 1032,
    FRONT_FACE: 2886,
    FUNC_ADD: 32774,
    FUNC_REVERSE_SUBTRACT: 32779,
    FUNC_SUBTRACT: 32778,
    GENERATE_MIPMAP_HINT: 33170,
    GEQUAL: 518,
    GREATER: 516,
    GREEN_BITS: 3411,
    HIGH_FLOAT: 36338,
    HIGH_INT: 36341,
    INCR: 7682,
    INCR_WRAP: 34055,
    INFO_LOG_LENGTH: 35716,
    INT: 5124,
    INT_VEC2: 35667,
    INT_VEC3: 35668,
    INT_VEC4: 35669,
    INVALID_ENUM: 1280,
    INVALID_FRAMEBUFFER_OPERATION: 1286,
    INVALID_OPERATION: 1282,
    INVALID_VALUE: 1281,
    INVERT: 5386,
    KEEP: 7680,
    LEQUAL: 515,
    LESS: 513,
    LINEAR: 9729,
    LINEAR_MIPMAP_LINEAR: 9987,
    LINEAR_MIPMAP_NEAREST: 9985,
    LINES: 1,
    LINE_LOOP: 2,
    LINE_STRIP: 3,
    LINE_WIDTH: 2849,
    LINK_STATUS: 35714,
    LOW_FLOAT: 36336,
    LOW_INT: 36339,
    LUMINANCE: 6409,
    LUMINANCE_ALPHA: 6410,
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: 35661,
    MAX_CUBE_MAP_TEXTURE_SIZE: 34076,
    MAX_FRAGMENT_UNIFORM_VECTORS: 36349,
    MAX_RENDERBUFFER_SIZE: 34024,
    MAX_TEXTURE_IMAGE_UNITS: 34930,
    MAX_TEXTURE_SIZE: 3379,
    MAX_VARYING_VECTORS: 36348,
    MAX_VERTEX_ATTRIBS: 34921,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660,
    MAX_VERTEX_UNIFORM_VECTORS: 36347,
    MAX_VIEWPORT_DIMS: 3386,
    MEDIUM_FLOAT: 36337,
    MEDIUM_INT: 36340,
    MIRRORED_REPEAT: 33648,
    NEAREST: 9728,
    NEAREST_MIPMAP_LINEAR: 9986,
    NEAREST_MIPMAP_NEAREST: 9984,
    NEVER: 512,
    NICEST: 4354,
    NONE: 0,
    NOTEQUAL: 517,
    NO_ERROR: 0,
    NUM_COMPRESSED_TEXTURE_FORMATS: 34466,
    ONE: 1,
    ONE_MINUS_CONSTANT_ALPHA: 32772,
    ONE_MINUS_CONSTANT_COLOR: 32770,
    ONE_MINUS_DST_ALPHA: 773,
    ONE_MINUS_DST_COLOR: 775,
    ONE_MINUS_SRC_ALPHA: 771,
    ONE_MINUS_SRC_COLOR: 769,
    OUT_OF_MEMORY: 1285,
    PACK_ALIGNMENT: 3333,
    POINTS: 0,
    POLYGON_OFFSET_FACTOR: 32824,
    POLYGON_OFFSET_FILL: 32823,
    POLYGON_OFFSET_UNITS: 10752,
    RED_BITS: 3410,
    RENDERBUFFER: 36161,
    RENDERBUFFER_ALPHA_SIZE: 36179,
    RENDERBUFFER_BINDING: 36007,
    RENDERBUFFER_BLUE_SIZE: 36178,
    RENDERBUFFER_DEPTH_SIZE: 36180,
    RENDERBUFFER_GREEN_SIZE: 36177,
    RENDERBUFFER_HEIGHT: 36163,
    RENDERBUFFER_INTERNAL_FORMAT: 36164,
    RENDERBUFFER_RED_SIZE: 36176,
    RENDERBUFFER_STENCIL_SIZE: 36181,
    RENDERBUFFER_WIDTH: 36162,
    RENDERER: 7937,
    REPEAT: 10497,
    REPLACE: 7681,
    RGB: 6407,
    RGB5_A1: 32855,
    RGB565: 36194,
    RGBA: 6408,
    RGBA4: 32854,
    SAMPLER_2D: 35678,
    SAMPLER_CUBE: 35680,
    SAMPLES: 32937,
    SAMPLE_ALPHA_TO_COVERAGE: 32926,
    SAMPLE_BUFFERS: 32936,
    SAMPLE_COVERAGE: 32928,
    SAMPLE_COVERAGE_INVERT: 32939,
    SAMPLE_COVERAGE_VALUE: 32938,
    SCISSOR_BOX: 3088,
    SCISSOR_TEST: 3089,
    SHADER_COMPILER: 36346,
    SHADER_SOURCE_LENGTH: 35720,
    SHADER_TYPE: 35663,
    SHADING_LANGUAGE_VERSION: 35724,
    SHORT: 5122,
    SRC_ALPHA: 770,
    SRC_ALPHA_SATURATE: 776,
    SRC_COLOR: 768,
    STATIC_DRAW: 35044,
    STENCIL_ATTACHMENT: 36128,
    STENCIL_BACK_FAIL: 34817,
    STENCIL_BACK_FUNC: 34816,
    STENCIL_BACK_PASS_DEPTH_FAIL: 34818,
    STENCIL_BACK_PASS_DEPTH_PASS: 34819,
    STENCIL_BACK_REF: 36003,
    STENCIL_BACK_VALUE_MASK: 36004,
    STENCIL_BACK_WRITEMASK: 36005,
    STENCIL_BITS: 3415,
    STENCIL_BUFFER_BIT: 1024,
    STENCIL_CLEAR_VALUE: 2961,
    STENCIL_FAIL: 2964,
    STENCIL_FUNC: 2962,
    STENCIL_INDEX: 6401,
    STENCIL_INDEX8: 36168,
    STENCIL_PASS_DEPTH_FAIL: 2965,
    STENCIL_PASS_DEPTH_PASS: 2966,
    STENCIL_REF: 2967,
    STENCIL_TEST: 2960,
    STENCIL_VALUE_MASK: 2963,
    STENCIL_WRITEMASK: 2968,
    STREAM_DRAW: 35040,
    SUBPIXEL_BITS: 3408,
    TEXTURE: 5890,
    TEXTURE0: 33984,
    TEXTURE1: 33985,
    TEXTURE2: 33986,
    TEXTURE3: 33987,
    TEXTURE4: 33988,
    TEXTURE5: 33989,
    TEXTURE6: 33990,
    TEXTURE7: 33991,
    TEXTURE8: 33992,
    TEXTURE9: 33993,
    TEXTURE10: 33994,
    TEXTURE11: 33995,
    TEXTURE12: 33996,
    TEXTURE13: 33997,
    TEXTURE14: 33998,
    TEXTURE15: 33999,
    TEXTURE16: 34000,
    TEXTURE17: 34001,
    TEXTURE18: 34002,
    TEXTURE19: 34003,
    TEXTURE20: 34004,
    TEXTURE21: 34005,
    TEXTURE22: 34006,
    TEXTURE23: 34007,
    TEXTURE24: 34008,
    TEXTURE25: 34009,
    TEXTURE26: 34010,
    TEXTURE27: 34011,
    TEXTURE28: 34012,
    TEXTURE29: 34013,
    TEXTURE30: 34014,
    TEXTURE31: 34015,
    TEXTURE_2D: 3553,
    TEXTURE_BINDING_2D: 32873,
    TEXTURE_BINDING_CUBE_MAP: 34068,
    TEXTURE_CUBE_MAP: 34067,
    TEXTURE_CUBE_MAP_NEGATIVE_X: 34070,
    TEXTURE_CUBE_MAP_NEGATIVE_Y: 34072,
    TEXTURE_CUBE_MAP_NEGATIVE_Z: 34074,
    TEXTURE_CUBE_MAP_POSITIVE_X: 34069,
    TEXTURE_CUBE_MAP_POSITIVE_Y: 34071,
    TEXTURE_CUBE_MAP_POSITIVE_Z: 34073,
    TEXTURE_MAG_FILTER: 10240,
    TEXTURE_MIN_FILTER: 10241,
    TEXTURE_WRAP_S: 10242,
    TEXTURE_WRAP_T: 10243,
    TRIANGLES: 4,
    TRIANGLE_FAN: 6,
    TRIANGLE_STRIP: 5,
    UNPACK_ALIGNMENT: 3317,
    UNPACK_COLORSPACE_CONVERSION_WEBGL: 37443,
    UNPACK_FLIP_Y_WEBGL: 37440,
    UNPACK_PREMULTIPLY_ALPHA_WEBGL: 37441,
    UNSIGNED_BYTE: 5121,
    UNSIGNED_INT: 5125,
    UNSIGNED_SHORT: 5123,
    UNSIGNED_SHORT_4_4_4_4: 32819,
    UNSIGNED_SHORT_5_5_5_1: 32820,
    UNSIGNED_SHORT_5_6_5: 33635,
    VALIDATE_STATUS: 35715,
    VENDOR: 7936,
    VERSION: 7938,
    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 34975,
    VERTEX_ATTRIB_ARRAY_ENABLED: 34338,
    VERTEX_ATTRIB_ARRAY_NORMALIZED: 34922,
    VERTEX_ATTRIB_ARRAY_POINTER: 34373,
    VERTEX_ATTRIB_ARRAY_SIZE: 34339,
    VERTEX_ATTRIB_ARRAY_STRIDE: 34340,
    VERTEX_ATTRIB_ARRAY_TYPE: 34341,
    VERTEX_SHADER: 35633,
    VIEWPORT: 2978,
    ZERO: 0
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(__webpack_require__(0));
/**
 * It's a WebGLBuffer.
 */
var GLCatBuffer = /** @class */ (function () {
    /**
     * Create a new GLCatBuffer instance.
     */
    function GLCatBuffer(glCat, buffer) {
        this.glCat = glCat;
        this.buffer = buffer;
    }
    /**
     * Dispose the buffer.
     */
    GLCatBuffer.prototype.dispose = function () {
        this.glCat.getRenderingContext().deleteBuffer(this.buffer);
    };
    /**
     * Retrieve its own buffer.
     */
    GLCatBuffer.prototype.getBuffer = function () {
        return this.buffer;
    };
    /**
     * Set new data into this buffer.
     */
    GLCatBuffer.prototype.setVertexbuffer = function (source, usage) {
        if (usage === void 0) { usage = constants_1.default.STATIC_DRAW; }
        var gl = this.glCat.getRenderingContext();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, source, usage);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    };
    /**
     * Set new index data into this buffer.
     */
    GLCatBuffer.prototype.setIndexbuffer = function (source, usage) {
        if (usage === void 0) { usage = constants_1.default.STATIC_DRAW; }
        var gl = this.glCat.getRenderingContext();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, source, usage);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    };
    return GLCatBuffer;
}());
exports.GLCatBuffer = GLCatBuffer;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(__webpack_require__(0));
/**
 * It's a WebGLFramebuffer.
 */
var GLCatFramebuffer = /** @class */ (function () {
    /**
     * Create a new GLCatFramebuffer instance.
     */
    function GLCatFramebuffer(glCat, framebuffer) {
        this.renderbuffer = null;
        this.texture = null;
        this.glCat = glCat;
        this.framebuffer = framebuffer;
    }
    /**
     * Dispose the framebuffer.
     */
    GLCatFramebuffer.prototype.dispose = function () {
        this.glCat.getRenderingContext().deleteFramebuffer(this.framebuffer);
    };
    /**
     * Return its own framebuffer.
     */
    GLCatFramebuffer.prototype.getFramebuffer = function () {
        return this.framebuffer;
    };
    /**
     * Return its attached renderbuffer.
     */
    GLCatFramebuffer.prototype.getRenderbuffer = function () {
        return this.renderbuffer;
    };
    /**
     * Return its attached texture.
     */
    GLCatFramebuffer.prototype.getTexture = function () {
        return this.texture;
    };
    /**
     * Attach a renderbuffer to this framebuffer.
     */
    GLCatFramebuffer.prototype.attachRenderbuffer = function (renderbuffer, attachment) {
        if (attachment === void 0) { attachment = constants_1.default.DEPTH_ATTACHMENT; }
        var gl = this.glCat.getRenderingContext();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, renderbuffer.getRenderbuffer());
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this.renderbuffer = renderbuffer;
    };
    /**
     * Attach a texture to this framebuffer.
     */
    GLCatFramebuffer.prototype.attachTexture = function (texture, attachment) {
        if (attachment === void 0) { attachment = constants_1.default.COLOR_ATTACHMENT0; }
        var gl = this.glCat.getRenderingContext();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, texture.getTexture(), 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this.texture = texture;
    };
    return GLCatFramebuffer;
}());
exports.GLCatFramebuffer = GLCatFramebuffer;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(__webpack_require__(0));
/**
 * It's a WebGLProgram, but has cache of variable locations.
 */
var GLCatProgram = /** @class */ (function () {
    /**
     * Create a new GLCatProgram instance.
     */
    function GLCatProgram(glCat, program) {
        this.attribLocationCache = {};
        this.uniformLocationCache = {};
        this.glCat = glCat;
        this.program = program;
    }
    /**
     * Dispose the program.
     */
    GLCatProgram.prototype.dispose = function () {
        this.glCat.getRenderingContext().deleteProgram(this.program);
    };
    /**
     * Retrieve its own program.
     */
    GLCatProgram.prototype.getProgram = function () {
        return this.program;
    };
    /**
     * Attach an attribute variable.
     * @param name Name of the attribute variable
     * @param buffer Vertex buffer. Can be null, to disable attribute array
     * @param size Number of components per vertex. Must be 1, 2, 3 or 4
     */
    GLCatProgram.prototype.attribute = function (name, buffer, size, divisor, type, stride, offset) {
        if (size === void 0) { size = 1; }
        if (divisor === void 0) { divisor = 0; }
        if (type === void 0) { type = constants_1.default.FLOAT; }
        if (stride === void 0) { stride = 0; }
        if (offset === void 0) { offset = 0; }
        var gl = this.glCat.getRenderingContext();
        var location = this.getAttribLocation(name);
        if (location === -1) {
            return;
        }
        if (buffer === null) {
            gl.disableVertexAttribArray(location);
            return;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.getBuffer());
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, size, type, false, stride, offset);
        var ext = this.glCat.getExtension('ANGLE_instanced_arrays');
        if (ext) {
            ext.vertexAttribDivisorANGLE(location, divisor);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    };
    /**
     * Attach an uniform1i variable.
     */
    GLCatProgram.prototype.uniform1i = function (name, value) {
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform1i(location, value);
    };
    /**
     * Attach an uniform2i variable.
     */
    GLCatProgram.prototype.uniform2i = function (name, x, y) {
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform2i(location, x, y);
    };
    /**
     * Attach an uniform3i variable.
     */
    GLCatProgram.prototype.uniform3i = function (name, x, y, z) {
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform3i(location, x, y, z);
    };
    /**
     * Attach an uniform4i variable.
     */
    GLCatProgram.prototype.uniform4i = function (name, x, y, z, w) {
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform4i(location, x, y, z, w);
    };
    /**
     * Attach an uniform1iv variable.
     */
    GLCatProgram.prototype.uniform1iv = function (name, array) {
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform1iv(location, array);
    };
    /**
     * Attach an uniform2iv variable.
     */
    GLCatProgram.prototype.uniform2iv = function (name, array) {
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform2iv(location, array);
    };
    /**
     * Attach an uniform3iv variable.
     */
    GLCatProgram.prototype.uniform3iv = function (name, array) {
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform3iv(location, array);
    };
    /**
     * Attach an uniform4iv variable.
     */
    GLCatProgram.prototype.uniform4iv = function (name, array) {
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform4iv(location, array);
    };
    /**
     * Attach an uniform1f variable.
     */
    GLCatProgram.prototype.uniform1f = function (name, value) {
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform1f(location, value);
    };
    /**
     * Attach an uniform2f variable.
     */
    GLCatProgram.prototype.uniform2f = function (name, x, y) {
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform2f(location, x, y);
    };
    /**
     * Attach an uniform3f variable.
     */
    GLCatProgram.prototype.uniform3f = function (name, x, y, z) {
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform3f(location, x, y, z);
    };
    /**
     * Attach an uniform4f variable.
     */
    GLCatProgram.prototype.uniform4f = function (name, x, y, z, w) {
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform4f(location, x, y, z, w);
    };
    /**
     * Attach an uniform1fv variable.
     */
    GLCatProgram.prototype.uniform1fv = function (name, array) {
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform1fv(location, array);
    };
    /**
     * Attach an uniform2fv variable.
     */
    GLCatProgram.prototype.uniform2fv = function (name, array) {
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform2fv(location, array);
    };
    /**
     * Attach an uniform3fv variable.
     */
    GLCatProgram.prototype.uniform3fv = function (name, array) {
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform3fv(location, array);
    };
    /**
     * Attach an uniform4fv variable.
     */
    GLCatProgram.prototype.uniform4fv = function (name, array) {
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform4fv(location, array);
    };
    /**
     * Attach an uniformMatrix2fv variable.
     */
    GLCatProgram.prototype.uniformMatrix2fv = function (name, array, transpose) {
        if (transpose === void 0) { transpose = false; }
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniformMatrix2fv(location, transpose, array);
    };
    /**
     * Attach an uniformMatrix3fv variable.
     */
    GLCatProgram.prototype.uniformMatrix3fv = function (name, array, transpose) {
        if (transpose === void 0) { transpose = false; }
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniformMatrix3fv(location, transpose, array);
    };
    /**
     * Attach an uniformMatrix4fv variable.
     */
    GLCatProgram.prototype.uniformMatrix4fv = function (name, array, transpose) {
        if (transpose === void 0) { transpose = false; }
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniformMatrix4fv(location, transpose, array);
    };
    /**
     * Attach a `sampler2D` type uniform texture.
     * @param name Name of the uniform texture
     * @param texture Texture object
     * @param number Specify a texture unit, in integer
     */
    GLCatProgram.prototype.uniformTexture = function (name, texture, number) {
        if (number === void 0) { number = 0; }
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.activeTexture(gl.TEXTURE0 + number);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(location, number);
    };
    /**
     * Attach a `samplerCube` type uniform texture.
     * @param name Name of the uniform texture
     * @param texture Texture object
     * @param number Specify a texture unit, in integer
     */
    GLCatProgram.prototype.uniformCubemap = function (name, texture, number) {
        if (number === void 0) { number = 0; }
        var gl = this.glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.activeTexture(gl.TEXTURE0 + number);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        gl.uniform1i(location, number);
    };
    /**
     * Retrieve attribute location.
     */
    GLCatProgram.prototype.getAttribLocation = function (name) {
        var gl = this.glCat.getRenderingContext();
        if (this.attribLocationCache[name] !== undefined) {
            return this.attribLocationCache[name];
        }
        else {
            var location = gl.getAttribLocation(this.program, name);
            // if ( location === -1 ) {
            //   this.glCat.spit( 'GLCatProgram.getAttribLocation: Could not retrieve attribute location' );
            //   return -1;
            // }
            this.attribLocationCache[name] = location;
            return location;
        }
    };
    /**
     * Retrieve uniform location.
     */
    GLCatProgram.prototype.getUniformLocation = function (name) {
        var gl = this.glCat.getRenderingContext();
        if (this.uniformLocationCache[name] !== undefined) {
            return this.uniformLocationCache[name];
        }
        else {
            var location = gl.getUniformLocation(this.program, name);
            // if ( location === null ) {
            //   this.glCat.spit( 'GLCatProgram.getUniformLocation: Could not retrieve uniform location' );
            //   return location;
            // }
            this.uniformLocationCache[name] = location;
            return location;
        }
    };
    return GLCatProgram;
}());
exports.GLCatProgram = GLCatProgram;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(__webpack_require__(0));
/**
 * It's a WebGLRenderbuffer.
 */
var GLCatRenderbuffer = /** @class */ (function () {
    /**
     * Create a new GLCatTexture instance.
     */
    function GLCatRenderbuffer(glCat, renderbuffer) {
        this.width = 0;
        this.height = 0;
        this.glCat = glCat;
        this.renderbuffer = renderbuffer;
    }
    /**
     * Dispose the renderbuffer.
     */
    GLCatRenderbuffer.prototype.dispose = function () {
        this.glCat.getRenderingContext().deleteRenderbuffer(this.renderbuffer);
    };
    /**
     * Return its own renderbuffer.
     */
    GLCatRenderbuffer.prototype.getRenderbuffer = function () {
        return this.renderbuffer;
    };
    /**
     * Return its width.
     */
    GLCatRenderbuffer.prototype.getWidth = function () {
        return this.width;
    };
    /**
     * Return its height.
     */
    GLCatRenderbuffer.prototype.getHeight = function () {
        return this.height;
    };
    /**
     * Initialize this renderbuffer.
     * If `format` is not given, it will be initialized as `DEPTH_COMPONENT16` .
     */
    GLCatRenderbuffer.prototype.init = function (width, height, format) {
        if (format === void 0) { format = constants_1.default.DEPTH_COMPONENT16; }
        var gl = this.glCat.getRenderingContext();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, format, width, height);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        this.width = width;
        this.height = height;
    };
    return GLCatRenderbuffer;
}());
exports.GLCatRenderbuffer = GLCatRenderbuffer;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(__webpack_require__(0));
/**
 * It's a WebGLTexture.
 */
var GLCatTexture = /** @class */ (function () {
    /**
     * Create a new GLCatTexture instance.
     */
    function GLCatTexture(glCat, texture) {
        this.width = 0;
        this.height = 0;
        this.glCat = glCat;
        this.texture = texture;
    }
    /**
     * Dispose the texture.
     */
    GLCatTexture.prototype.dispose = function () {
        this.glCat.getRenderingContext().deleteTexture(this.texture);
    };
    /**
     * Retrieve its own texture.
     */
    GLCatTexture.prototype.getTexture = function () {
        return this.texture;
    };
    /**
     * Return its width.
     */
    GLCatTexture.prototype.getWidth = function () {
        return this.width;
    };
    /**
     * Return its height.
     */
    GLCatTexture.prototype.getHeight = function () {
        return this.height;
    };
    GLCatTexture.prototype.textureFilter = function (filterMag, filterMin) {
        if (filterMag === void 0) { filterMag = constants_1.default.NEAREST; }
        if (filterMin === void 0) { filterMin = filterMag; }
        var gl = this.glCat.getRenderingContext();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filterMag);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filterMin);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    GLCatTexture.prototype.textureWrap = function (wrapS, wrapT) {
        if (wrapS === void 0) { wrapS = constants_1.default.CLAMP_TO_EDGE; }
        if (wrapT === void 0) { wrapT = wrapS; }
        var gl = this.glCat.getRenderingContext();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    /**
     * Set new data into this texture.
     */
    GLCatTexture.prototype.setTexture = function (source) {
        var gl = this.glCat.getRenderingContext();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
        gl.bindTexture(gl.TEXTURE_2D, null);
        this.width = source.width;
        this.height = source.height;
    };
    /**
     * Set new data into this texture.
     * This function uses `Uint8Array`. If you want to source image data, use `GLCat.setTexture()` instead.
     * Or you want to use float texture? Try this: `GLCat.setTextureFromFloatArray()`
     */
    GLCatTexture.prototype.setTextureFromArray = function (width, height, source, format) {
        if (format === void 0) { format = constants_1.default.RGBA; }
        var gl = this.glCat.getRenderingContext();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, gl.UNSIGNED_BYTE, source);
        gl.bindTexture(gl.TEXTURE_2D, null);
        this.width = width;
        this.height = height;
    };
    /**
     * Set new data into this texture.
     * This function uses `Float32Array`.
     * If you can't grab `OES_texture_float` extension here, you will die at this point.
     */
    GLCatTexture.prototype.setTextureFromFloatArray = function (width, height, source, format) {
        if (format === void 0) { format = constants_1.default.RGBA; }
        var gl = this.glCat.getRenderingContext();
        this.glCat.getExtension('OES_texture_float', true);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, gl.FLOAT, source);
        if (this.glCat.getExtension('OES_texture_float_linear') === null) {
            this.textureFilter(gl.NEAREST);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);
        this.width = width;
        this.height = height;
    };
    /**
     * Copy pixels from current framebuffer to given texture.
     */
    GLCatTexture.prototype.copyTexture = function (width, height) {
        var gl = this.glCat.getRenderingContext();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, width, height, 0);
        gl.bindTexture(gl.TEXTURE_2D, null);
        this.width = width;
        this.height = height;
    };
    /**
     * Set new cubemap data into this texture.
     * @param textures Array of iamges. Order: `X+`, `X-`, `Y+`, `Y-`, `Z+`, `Z-`
     * @todo due to compatibility of its `width` and `height` it should not be used yet
     */
    GLCatTexture.prototype.setCubemap = function (textures) {
        var gl = this.glCat.getRenderingContext();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
        for (var i = 0; i < 6; i++) {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[i]);
        }
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
    };
    return GLCatTexture;
}());
exports.GLCatTexture = GLCatTexture;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(__webpack_require__(0));
exports.GL = constants_1.default;
__export(__webpack_require__(7));
__export(__webpack_require__(1));
__export(__webpack_require__(2));
__export(__webpack_require__(3));
__export(__webpack_require__(4));
__export(__webpack_require__(5));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var eventemitter3_1 = __webpack_require__(8);
var GLCatBuffer_1 = __webpack_require__(1);
var GLCatFramebuffer_1 = __webpack_require__(2);
var GLCatProgram_1 = __webpack_require__(3);
var GLCatRenderbuffer_1 = __webpack_require__(4);
var GLCatTexture_1 = __webpack_require__(5);
/**
 * WebGL wrapper with plenty of hackability.
 */
var GLCat = /** @class */ (function (_super) {
    __extends(GLCat, _super);
    /**
     * Create a new GLCat instance.
     * WebGLRenderingContext is required.
     */
    function GLCat(gl) {
        var _this = _super.call(this) || this;
        _this.extensionCache = {};
        _this.gl = gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        return _this;
    }
    /**
     * It's... just an `emit( 'error', ...args )`.
     * But, if there are no listeners subscribed to 'error' event,
     * it will throw an error instead. What a cool!
     */
    GLCat.prototype.spit = function (error) {
        var bool = _super.prototype.emit.call(this, 'error', error);
        if (!bool) {
            if (typeof error === 'string') {
                throw new Error(error);
            }
            else if (error) {
                throw error;
            }
            else {
                throw new Error('Something went wrong');
            }
        }
    };
    /**
     * Return its own WebGLRenderingContext.
     */
    GLCat.prototype.getRenderingContext = function () {
        return this.gl;
    };
    /**
     * Retrieve an extension.
     * If they is your precious one and you cannot live without him, turn on `throwIfNotFound`.
     */
    GLCat.prototype.getExtension = function (name, throwIfNotFound) {
        var gl = this.gl;
        if (this.extensionCache[name]) {
            return this.extensionCache[name];
        }
        else {
            this.extensionCache[name] = gl.getExtension(name);
            if (this.extensionCache[name]) {
                return this.extensionCache[name];
            }
            else {
                if (throwIfNotFound) {
                    this.spit('GLCat.getExtension: The extension "' + name + '" is not supported');
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
    GLCat.prototype.createShader = function (type, code) {
        var gl = this.gl;
        var shader = gl.createShader(type);
        if (shader === null) {
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        gl.shaderSource(shader, code);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            gl.deleteShader(shader);
            this.spit(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    };
    /**
     * Create a new GLCat program object.
     */
    GLCat.prototype.createProgram = function (vert, frag) {
        var gl = this.gl;
        var vertShader = this.createShader(gl.VERTEX_SHADER, vert);
        if (vertShader === null) {
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        var fragShader = this.createShader(gl.FRAGMENT_SHADER, frag);
        if (fragShader === null) {
            gl.deleteShader(vertShader);
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        var program = gl.createProgram();
        if (program === null) {
            gl.deleteShader(vertShader);
            gl.deleteShader(fragShader);
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            gl.deleteShader(vertShader);
            gl.deleteShader(fragShader);
            gl.deleteProgram(program);
            this.spit(gl.getProgramInfoLog(program));
            return null;
        }
        return new GLCatProgram_1.GLCatProgram(this, program);
    };
    /**
     * Specify a program to use.
     */
    GLCat.prototype.useProgram = function (program) {
        var gl = this.gl;
        if (program === null) {
            this.spit(GLCat.unexpectedNullDetectedError);
            return;
        }
        gl.useProgram(program.getProgram());
    };
    /**
     * Create a new vertex buffer.
     */
    GLCat.prototype.createBuffer = function () {
        var gl = this.gl;
        var buffer = gl.createBuffer();
        if (buffer === null) {
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        return new GLCatBuffer_1.GLCatBuffer(this, buffer);
    };
    /**
     * Create a new texture.
     */
    GLCat.prototype.createTexture = function () {
        var gl = this.gl;
        var texture = gl.createTexture();
        if (texture === null) {
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        return new GLCatTexture_1.GLCatTexture(this, texture);
    };
    /**
     * Create a new renderbuffer.
     */
    GLCat.prototype.createRenderbuffer = function () {
        var gl = this.gl;
        var renderbuffer = gl.createRenderbuffer();
        if (renderbuffer === null) {
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        return new GLCatRenderbuffer_1.GLCatRenderbuffer(this, renderbuffer);
    };
    /**
     * Create a new framebuffer.
     * TODO: DrawBuffers
     */
    GLCat.prototype.createFramebuffer = function () {
        var gl = this.gl;
        var framebuffer = gl.createFramebuffer();
        if (framebuffer === null) {
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        return new GLCatFramebuffer_1.GLCatFramebuffer(this, framebuffer);
    };
    /**
     * Create a new framebufer, in lazier way.
     */
    GLCat.prototype.lazyFramebuffer = function (width, height, isFloat) {
        if (isFloat === void 0) { isFloat = false; }
        var framebuffer = this.createFramebuffer();
        if (framebuffer === null) {
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        var renderbuffer = this.createRenderbuffer();
        if (renderbuffer === null) {
            this.spit(GLCat.unexpectedNullDetectedError);
            return framebuffer;
        }
        renderbuffer.init(width, height);
        framebuffer.attachRenderbuffer(renderbuffer);
        var texture = this.createTexture();
        if (texture === null) {
            this.spit(GLCat.unexpectedNullDetectedError);
            return framebuffer;
        }
        if (isFloat) {
            texture.setTextureFromFloatArray(width, height, null);
        }
        else {
            texture.setTextureFromArray(width, height, null);
        }
        framebuffer.attachTexture(texture);
        return framebuffer;
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
        var gl = this.gl;
        gl.clearColor(red, green, blue, alpha);
        gl.clearDepth(depth);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };
    GLCat.unexpectedNullDetectedError = new Error('GLCat: Unexpected null detected');
    return GLCat;
}(eventemitter3_1.EventEmitter));
exports.GLCat = GLCat;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ })
/******/ ]);
});