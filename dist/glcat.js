/*!
 * @fms-cat/glcat-ts v0.10.0
 * WebGL wrapper with plenty of hackability
 * 
 * Copyright (c) 2019 FMS-Cat
 * @fms-cat/glcat-ts is distributed under the MIT License
 * https://opensource.org/licenses/MIT
 * 
 * Repository: https://github.com/FMS-Cat/glcat-ts
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "19bf8d566dbd203f09cb";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "glcat.js";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.ts")(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/GL.ts":
/*!*******************!*\
  !*** ./src/GL.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GL = {
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

/***/ "./src/GLCat.ts":
/*!**********************!*\
  !*** ./src/GLCat.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GLCatBuffer_1 = __webpack_require__(/*! ./GLCatBuffer */ "./src/GLCatBuffer.ts");
var GLCatFramebuffer_1 = __webpack_require__(/*! ./GLCatFramebuffer */ "./src/GLCatFramebuffer.ts");
var GLCatProgram_1 = __webpack_require__(/*! ./GLCatProgram */ "./src/GLCatProgram.ts");
var GLCatRenderbuffer_1 = __webpack_require__(/*! ./GLCatRenderbuffer */ "./src/GLCatRenderbuffer.ts");
var GLCatShader_1 = __webpack_require__(/*! ./GLCatShader */ "./src/GLCatShader.ts");
var GLCatTexture_1 = __webpack_require__(/*! ./GLCatTexture */ "./src/GLCatTexture.ts");
/**
 * WebGL wrapper with plenty of hackability.
 */
var GLCat = /** @class */ (function () {
    /**
     * Create a new GLCat instance.
     * WebGLRenderingContext is required.
     */
    function GLCat(gl) {
        this.__extensionCache = {};
        this.__gl = gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }
    Object.defineProperty(GLCat.prototype, "renderingContext", {
        /**
         * Its own WebGLRenderingContext.
         */
        get: function () {
            return this.__gl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLCat.prototype, "gl", {
        /**
         * Its own WebGLRenderingContext. Shorter than [[GLCat.renderingContext]]
         */
        get: function () {
            return this.__gl;
        },
        enumerable: true,
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
            if (texture === null) {
                throw new Error(GLCat.unexpectedNullDetectedError);
            }
            texture.setTextureFromArray(1, 1, new Uint8Array([255, 0, 255, 255]));
            this.__dummyTextureCache = texture;
            return texture;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieve an extension.
     * If they is your precious one and you cannot live without him, turn on `throwIfNotFound`.
     */
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
        var shader = gl.createShader(type);
        if (shader === null) {
            throw new Error(GLCat.unexpectedNullDetectedError);
        }
        return new GLCatShader_1.GLCatShader(this, shader);
    };
    /**
     * Create a new GLCat program object.
     */
    GLCat.prototype.createProgram = function () {
        var gl = this.__gl;
        var program = gl.createProgram();
        if (program === null) {
            throw new Error(GLCat.unexpectedNullDetectedError);
        }
        return new GLCatProgram_1.GLCatProgram(this, program);
    };
    /**
     * Create a new GLCat program object, in lazier way.
     */
    GLCat.prototype.lazyProgram = function (vert, frag) {
        var gl = this.__gl;
        // == vert =====================================================================================
        var vertexShader = this.createShader(gl.VERTEX_SHADER);
        if (vertexShader === null) {
            throw new Error(GLCat.unexpectedNullDetectedError);
        }
        try {
            vertexShader.compile(vert);
        }
        catch (e) {
            vertexShader.dispose();
            throw e;
        }
        // == frag =====================================================================================
        var fragmentShader = this.createShader(gl.FRAGMENT_SHADER);
        if (fragmentShader === null) {
            vertexShader.dispose();
            throw new Error(GLCat.unexpectedNullDetectedError);
        }
        try {
            fragmentShader.compile(frag);
        }
        catch (e) {
            vertexShader.dispose();
            fragmentShader.dispose();
            throw e;
        }
        // == program ==================================================================================
        var program = this.createProgram();
        if (program === null) {
            vertexShader.dispose();
            fragmentShader.dispose();
            throw new Error(GLCat.unexpectedNullDetectedError);
        }
        try {
            program.link(vertexShader, fragmentShader);
        }
        catch (e) {
            vertexShader.dispose();
            fragmentShader.dispose();
            program.dispose();
            throw e;
        }
        return program;
    };
    /**
     * Create a new GLCat program object, in lazier way.
     * It's gonna be asynchronous if you have the KHR_parallel_shader_compile extension support.
     */
    GLCat.prototype.lazyProgramAsync = function (vert, frag) {
        var gl = this.__gl;
        // == vert =====================================================================================
        var vertexShader = this.createShader(gl.VERTEX_SHADER);
        if (vertexShader === null) {
            return Promise.reject(new Error(GLCat.unexpectedNullDetectedError));
        }
        try {
            vertexShader.compile(vert);
        }
        catch (e) {
            vertexShader.dispose();
            return Promise.reject(e);
        }
        // == frag =====================================================================================
        var fragmentShader = this.createShader(gl.FRAGMENT_SHADER);
        if (fragmentShader === null) {
            vertexShader.dispose();
            return Promise.reject(new Error(GLCat.unexpectedNullDetectedError));
        }
        try {
            fragmentShader.compile(frag);
        }
        catch (e) {
            vertexShader.dispose();
            fragmentShader.dispose();
            return Promise.reject(e);
        }
        // == program ==================================================================================
        var program = this.createProgram();
        if (program === null) {
            vertexShader.dispose();
            fragmentShader.dispose();
            return Promise.reject(new Error(GLCat.unexpectedNullDetectedError));
        }
        return program.linkAsync(vertexShader, fragmentShader).then(function () {
            return program;
        }).catch(function (e) {
            vertexShader.dispose();
            fragmentShader.dispose();
            program.dispose();
            throw e;
        });
    };
    /**
     * Specify a program to use.
     */
    GLCat.prototype.useProgram = function (program) {
        var _a;
        var gl = this.__gl;
        gl.useProgram(((_a = program) === null || _a === void 0 ? void 0 : _a.raw) || null);
    };
    /**
     * Create a new vertex buffer.
     */
    GLCat.prototype.createBuffer = function () {
        var gl = this.__gl;
        var buffer = gl.createBuffer();
        if (buffer === null) {
            throw new Error(GLCat.unexpectedNullDetectedError);
        }
        return new GLCatBuffer_1.GLCatBuffer(this, buffer);
    };
    /**
     * Create a new texture.
     */
    GLCat.prototype.createTexture = function () {
        var gl = this.__gl;
        var texture = gl.createTexture();
        if (texture === null) {
            throw new Error(GLCat.unexpectedNullDetectedError);
        }
        return new GLCatTexture_1.GLCatTexture(this, texture);
    };
    /**
     * Create a new renderbuffer.
     */
    GLCat.prototype.createRenderbuffer = function () {
        var gl = this.__gl;
        var renderbuffer = gl.createRenderbuffer();
        if (renderbuffer === null) {
            throw new Error(GLCat.unexpectedNullDetectedError);
        }
        return new GLCatRenderbuffer_1.GLCatRenderbuffer(this, renderbuffer);
    };
    /**
     * Create a new framebuffer.
     * TODO: DrawBuffers
     */
    GLCat.prototype.createFramebuffer = function () {
        var gl = this.__gl;
        var framebuffer = gl.createFramebuffer();
        if (framebuffer === null) {
            throw new Error(GLCat.unexpectedNullDetectedError);
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
            throw new Error(GLCat.unexpectedNullDetectedError);
        }
        var renderbuffer = this.createRenderbuffer();
        if (renderbuffer === null) {
            framebuffer.dispose();
            throw new Error(GLCat.unexpectedNullDetectedError);
        }
        renderbuffer.init(width, height);
        framebuffer.attachRenderbuffer(renderbuffer);
        var texture = this.createTexture();
        if (texture === null) {
            framebuffer.dispose();
            renderbuffer.dispose();
            throw new Error(GLCat.unexpectedNullDetectedError);
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
     * Create a new draw buffers, in lazier way.
     * If you can't grab `WEBGL_draw_buffers` extension, you'll die instantly at this point.
     */
    GLCat.prototype.lazyDrawbuffers = function (width, height, numBuffers, isFloat) {
        if (isFloat === void 0) { isFloat = false; }
        var ext = this.getExtension('WEBGL_draw_buffers', true);
        if (ext.MAX_DRAW_BUFFERS_WEBGL < numBuffers) {
            throw Error('GLCat: Maximum draw buffers count exceeded');
        }
        var framebuffer = this.createFramebuffer();
        if (framebuffer === null) {
            throw new Error(GLCat.unexpectedNullDetectedError);
        }
        var renderbuffer = this.createRenderbuffer();
        if (renderbuffer === null) {
            framebuffer.dispose();
            throw new Error(GLCat.unexpectedNullDetectedError);
        }
        renderbuffer.init(width, height);
        framebuffer.attachRenderbuffer(renderbuffer);
        for (var i = 0; i < numBuffers; i++) {
            var texture = this.createTexture();
            if (texture === null) {
                framebuffer.dispose();
                renderbuffer.dispose();
                throw new Error(GLCat.unexpectedNullDetectedError);
            }
            if (isFloat) {
                texture.setTextureFromFloatArray(width, height, null);
            }
            else {
                texture.setTextureFromArray(width, height, null);
            }
            framebuffer.attachTexture(texture, ext.COLOR_ATTACHMENT0_WEBGL + i);
        }
        return framebuffer;
    };
    /**
     * Call this before you're gonna use draw buffers.
     * If you can't grab `WEBGL_draw_buffers` extension, you'll die instantly at this point.
     */
    GLCat.prototype.drawBuffers = function (numBuffers) {
        var ext = this.getExtension('WEBGL_draw_buffers', true);
        if (Array.isArray(numBuffers)) {
            ext.drawBuffersWEBGL(numBuffers);
        }
        else {
            var array = [];
            for (var i = 0; i < numBuffers; i++) {
                array[i] = ext.COLOR_ATTACHMENT0_WEBGL + i;
            }
            ext.drawBuffersWEBGL(array);
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
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };
    GLCat.unexpectedNullDetectedError = 'GLCat: Unexpected null detected';
    return GLCat;
}());
exports.GLCat = GLCat;


/***/ }),

/***/ "./src/GLCatBuffer.ts":
/*!****************************!*\
  !*** ./src/GLCatBuffer.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GL_1 = __webpack_require__(/*! ./GL */ "./src/GL.ts");
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLCatBuffer.prototype, "raw", {
        /**
         * Its own buffer. Shorter than [[GLCatBuffer.buffer]].
         */
        get: function () {
            return this.__buffer;
        },
        enumerable: true,
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
        if (usage === void 0) { usage = GL_1.GL.STATIC_DRAW; }
        var gl = this.__glCat.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__buffer);
        gl.bufferData(gl.ARRAY_BUFFER, source, usage);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    };
    /**
     * Set new index data into this buffer.
     */
    GLCatBuffer.prototype.setIndexbuffer = function (source, usage) {
        if (usage === void 0) { usage = GL_1.GL.STATIC_DRAW; }
        var gl = this.__glCat.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, source, usage);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    };
    return GLCatBuffer;
}());
exports.GLCatBuffer = GLCatBuffer;


/***/ }),

/***/ "./src/GLCatFramebuffer.ts":
/*!*********************************!*\
  !*** ./src/GLCatFramebuffer.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GL_1 = __webpack_require__(/*! ./GL */ "./src/GL.ts");
/**
 * It's a WebGLFramebuffer.
 */
var GLCatFramebuffer = /** @class */ (function () {
    /**
     * Create a new GLCatFramebuffer instance.
     */
    function GLCatFramebuffer(glCat, framebuffer) {
        this.__renderbuffer = null;
        this.__textureMap = {};
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLCatFramebuffer.prototype, "raw", {
        /**
         * Its own framebuffer. Shorter than [[GLCatFramebuffer.framebuffer]]
         */
        get: function () {
            return this.__framebuffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLCatFramebuffer.prototype, "renderbuffer", {
        /**
         * Its attached renderbuffer.
         */
        get: function () {
            return this.__renderbuffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLCatFramebuffer.prototype, "texture", {
        /**
         * Its attached texture.
         * If you want to retrieve other than `COLOR_ATTACHMENT0`, try [[GLCatFramebuffer.getTexture]] instead.
         */
        get: function () {
            return this.__textureMap[GL_1.GL.COLOR_ATTACHMENT0];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose the framebuffer.
     */
    GLCatFramebuffer.prototype.dispose = function (alsoAttached) {
        if (alsoAttached === void 0) { alsoAttached = false; }
        var gl = this.__glCat.gl;
        gl.deleteFramebuffer(this.__framebuffer);
        if (alsoAttached) {
            if (this.__renderbuffer) {
                gl.deleteRenderbuffer(this.__renderbuffer.raw);
            }
            Object.values(this.__textureMap).forEach(function (texture) {
                gl.deleteTexture(texture.raw);
            });
        }
    };
    /**
     * Retrieve its attached texture.
     */
    GLCatFramebuffer.prototype.getTexture = function (attachment) {
        if (attachment === void 0) { attachment = GL_1.GL.COLOR_ATTACHMENT0; }
        return this.__textureMap[attachment];
    };
    /**
     * Attach a renderbuffer to this framebuffer.
     */
    GLCatFramebuffer.prototype.attachRenderbuffer = function (renderbuffer, attachment) {
        if (attachment === void 0) { attachment = GL_1.GL.DEPTH_ATTACHMENT; }
        var gl = this.__glCat.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.__framebuffer);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, renderbuffer.raw);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this.__renderbuffer = renderbuffer;
    };
    /**
     * Attach a texture to this framebuffer.
     */
    GLCatFramebuffer.prototype.attachTexture = function (texture, attachment) {
        if (attachment === void 0) { attachment = GL_1.GL.COLOR_ATTACHMENT0; }
        var gl = this.__glCat.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.__framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, texture.raw, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this.__textureMap[attachment] = texture;
    };
    return GLCatFramebuffer;
}());
exports.GLCatFramebuffer = GLCatFramebuffer;


/***/ }),

/***/ "./src/GLCatProgram.ts":
/*!*****************************!*\
  !*** ./src/GLCatProgram.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GL_1 = __webpack_require__(/*! ./GL */ "./src/GL.ts");
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLCatProgram.prototype, "raw", {
        /**
         * Its own program. Shorter than [[GLCatProgram.program]].
         */
        get: function () {
            return this.__program;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLCatProgram.prototype, "shaders", {
        /**
         * Its shaders.
         */
        get: function () {
            return this.__shaders ? this.__shaders.concat() : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLCatProgram.prototype, "isLinked", {
        /**
         * Whether the last link operation was successful or not.
         */
        get: function () {
            return this.__linked;
        },
        enumerable: true,
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
        this.__linked = gl.getProgramParameter(this.__program, gl.LINK_STATUS);
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
                    gl.getProgramParameter(_this.__program, extParallel.COMPLETION_STATUS_KHR) === true) {
                    _this.__linked = gl.getProgramParameter(_this.__program, gl.LINK_STATUS);
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
        if (size === void 0) { size = 1; }
        if (divisor === void 0) { divisor = 0; }
        if (type === void 0) { type = GL_1.GL.FLOAT; }
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
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.raw);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, size, type, false, stride, offset);
        var ext = this.__glCat.getExtension('ANGLE_instanced_arrays');
        if (ext) {
            ext.vertexAttribDivisorANGLE(location, divisor);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
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
        func.call.apply(func, __spreadArrays([this, name], value));
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
        gl.uniform1i(location, value);
    };
    /**
     * Attach an uniform2i variable.
     */
    GLCatProgram.prototype.uniform2i = function (name, x, y) {
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniform2i(location, x, y);
    };
    /**
     * Attach an uniform3i variable.
     */
    GLCatProgram.prototype.uniform3i = function (name, x, y, z) {
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniform3i(location, x, y, z);
    };
    /**
     * Attach an uniform4i variable.
     */
    GLCatProgram.prototype.uniform4i = function (name, x, y, z, w) {
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniform4i(location, x, y, z, w);
    };
    /**
     * Attach an uniform1iv variable.
     */
    GLCatProgram.prototype.uniform1iv = function (name, array) {
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniform1iv(location, array);
    };
    /**
     * Attach an uniform2iv variable.
     */
    GLCatProgram.prototype.uniform2iv = function (name, array) {
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniform2iv(location, array);
    };
    /**
     * Attach an uniform3iv variable.
     */
    GLCatProgram.prototype.uniform3iv = function (name, array) {
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniform3iv(location, array);
    };
    /**
     * Attach an uniform4iv variable.
     */
    GLCatProgram.prototype.uniform4iv = function (name, array) {
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniform4iv(location, array);
    };
    /**
     * Attach an uniform1f variable.
     */
    GLCatProgram.prototype.uniform1f = function (name, value) {
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniform1f(location, value);
    };
    /**
     * Attach an uniform2f variable.
     */
    GLCatProgram.prototype.uniform2f = function (name, x, y) {
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniform2f(location, x, y);
    };
    /**
     * Attach an uniform3f variable.
     */
    GLCatProgram.prototype.uniform3f = function (name, x, y, z) {
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniform3f(location, x, y, z);
    };
    /**
     * Attach an uniform4f variable.
     */
    GLCatProgram.prototype.uniform4f = function (name, x, y, z, w) {
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniform4f(location, x, y, z, w);
    };
    /**
     * Attach an uniform1fv variable.
     */
    GLCatProgram.prototype.uniform1fv = function (name, array) {
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniform1fv(location, array);
    };
    /**
     * Attach an uniform2fv variable.
     */
    GLCatProgram.prototype.uniform2fv = function (name, array) {
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniform2fv(location, array);
    };
    /**
     * Attach an uniform3fv variable.
     */
    GLCatProgram.prototype.uniform3fv = function (name, array) {
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniform3fv(location, array);
    };
    /**
     * Attach an uniform4fv variable.
     */
    GLCatProgram.prototype.uniform4fv = function (name, array) {
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniform4fv(location, array);
    };
    /**
     * Attach an uniformMatrix2fv variable.
     */
    GLCatProgram.prototype.uniformMatrix2fv = function (name, array, transpose) {
        if (transpose === void 0) { transpose = false; }
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniformMatrix2fv(location, transpose, array);
    };
    /**
     * Attach an uniformMatrix3fv variable.
     */
    GLCatProgram.prototype.uniformMatrix3fv = function (name, array, transpose) {
        if (transpose === void 0) { transpose = false; }
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniformMatrix3fv(location, transpose, array);
    };
    /**
     * Attach an uniformMatrix4fv variable.
     */
    GLCatProgram.prototype.uniformMatrix4fv = function (name, array, transpose) {
        if (transpose === void 0) { transpose = false; }
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        gl.uniformMatrix4fv(location, transpose, array);
    };
    /**
     * Attach a `sampler2D` type uniform texture.
     * @param name Name of the uniform texture
     * @param texture Texture object
     */
    GLCatProgram.prototype.uniformTexture = function (name, texture) {
        var _a;
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        var unit = this.getUniformTextureUnit(name);
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, ((_a = texture) === null || _a === void 0 ? void 0 : _a.raw) || null);
        gl.uniform1i(location, unit);
    };
    /**
     * Attach a `samplerCube` type uniform texture.
     * @param name Name of the uniform texture
     * @param texture Texture object
     */
    GLCatProgram.prototype.uniformCubemap = function (name, texture) {
        var _a;
        var gl = this.__glCat.gl;
        var location = this.getUniformLocation(name);
        var unit = this.getUniformTextureUnit(name);
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, ((_a = texture) === null || _a === void 0 ? void 0 : _a.raw) || null);
        gl.uniform1i(location, unit);
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
            var location = gl.getAttribLocation(this.__program, name);
            // if ( location === -1 ) {
            //   this.glCat.spit( 'GLCatProgram.getAttribLocation: Could not retrieve attribute location' );
            //   return -1;
            // }
            this.__attribLocationCache[name] = location;
            return location;
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
            var location = gl.getUniformLocation(this.__program, name);
            // if ( location === null ) {
            //   this.glCat.spit( 'GLCatProgram.getUniformLocation: Could not retrieve uniform location' );
            //   return location;
            // }
            this.__uniformLocationCache[name] = location;
            return location;
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
exports.GLCatProgram = GLCatProgram;


/***/ }),

/***/ "./src/GLCatRenderbuffer.ts":
/*!**********************************!*\
  !*** ./src/GLCatRenderbuffer.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GL_1 = __webpack_require__(/*! ./GL */ "./src/GL.ts");
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLCatRenderbuffer.prototype, "raw", {
        /**
         * Its own renderbuffer. Shorter than [[GLCatRenderBuffer.renderbuffer]].
         */
        get: function () {
            return this.__renderbuffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLCatRenderbuffer.prototype, "width", {
        /**
         * Its width.
         */
        get: function () {
            return this.__width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLCatRenderbuffer.prototype, "height", {
        /**
         * Its height.
         */
        get: function () {
            return this.__height;
        },
        enumerable: true,
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
     * If `format` is not given, it will be initialized as `DEPTH_COMPONENT16` .
     */
    GLCatRenderbuffer.prototype.init = function (width, height, format) {
        if (format === void 0) { format = GL_1.GL.DEPTH_COMPONENT16; }
        var gl = this.__glCat.gl;
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.__renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, format, width, height);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        this.__width = width;
        this.__height = height;
    };
    return GLCatRenderbuffer;
}());
exports.GLCatRenderbuffer = GLCatRenderbuffer;


/***/ }),

/***/ "./src/GLCatShader.ts":
/*!****************************!*\
  !*** ./src/GLCatShader.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLCatShader.prototype, "raw", {
        /**
         * Its own shader. Shorter than [[GLCatShader.shader]].
         */
        get: function () {
            return this.__shader;
        },
        enumerable: true,
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
        this.__compiled = gl.getShaderParameter(this.__shader, gl.COMPILE_STATUS);
        if (!this.__compiled) {
            throw new Error(gl.getShaderInfoLog(this.__shader));
        }
    };
    return GLCatShader;
}());
exports.GLCatShader = GLCatShader;


/***/ }),

/***/ "./src/GLCatTexture.ts":
/*!*****************************!*\
  !*** ./src/GLCatTexture.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GL_1 = __webpack_require__(/*! ./GL */ "./src/GL.ts");
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
        this.textureFilter(GL_1.GL.LINEAR);
        this.textureWrap(GL_1.GL.CLAMP_TO_EDGE);
    }
    Object.defineProperty(GLCatTexture.prototype, "texture", {
        /**
         * Its own texture.
         */
        get: function () {
            return this.__texture;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLCatTexture.prototype, "raw", {
        /**
         * Its own texture. Shorter than [[GLCatTexture.textured]]
         */
        get: function () {
            return this.__texture;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLCatTexture.prototype, "width", {
        /**
         * Its width.
         */
        get: function () {
            return this.__width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLCatTexture.prototype, "height", {
        /**
         * Its height.
         */
        get: function () {
            return this.__height;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Dispose the texture.
     */
    GLCatTexture.prototype.dispose = function () {
        this.__glCat.gl.deleteTexture(this.__texture);
    };
    GLCatTexture.prototype.textureFilter = function (filterMag, filterMin) {
        if (filterMag === void 0) { filterMag = GL_1.GL.NEAREST; }
        if (filterMin === void 0) { filterMin = filterMag; }
        var gl = this.__glCat.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.__texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filterMag);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filterMin);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    GLCatTexture.prototype.textureWrap = function (wrapS, wrapT) {
        if (wrapS === void 0) { wrapS = GL_1.GL.CLAMP_TO_EDGE; }
        if (wrapT === void 0) { wrapT = wrapS; }
        var gl = this.__glCat.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.__texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    /**
     * Return a value for the passed parameter name.
     * See: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter
     */
    GLCatTexture.prototype.getParameter = function (pname) {
        var gl = this.__glCat.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.__texture);
        gl.getParameter(pname);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    /**
     * Specify the pixel storage modes.
     * See: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/pixelStorei
     */
    GLCatTexture.prototype.pixelStorei = function (pname, param) {
        var gl = this.__glCat.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.__texture);
        gl.pixelStorei(pname, param);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    /**
     * Set new data into this texture.
     */
    GLCatTexture.prototype.setTexture = function (source) {
        var gl = this.__glCat.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.__texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
        gl.bindTexture(gl.TEXTURE_2D, null);
        this.__width = source.width;
        this.__height = source.height;
    };
    /**
     * Set new data into this texture.
     * This function uses `Uint8Array`. If you want to source image data, use `GLCat.setTexture()` instead.
     * Or you want to use float texture? Try this: `GLCat.setTextureFromFloatArray()`
     */
    GLCatTexture.prototype.setTextureFromArray = function (width, height, source, format) {
        if (format === void 0) { format = GL_1.GL.RGBA; }
        var gl = this.__glCat.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.__texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, gl.UNSIGNED_BYTE, source);
        gl.bindTexture(gl.TEXTURE_2D, null);
        this.__width = width;
        this.__height = height;
    };
    /**
     * Set new data into this texture.
     * This function uses `Float32Array`.
     * If you can't grab `OES_texture_float` extension here, you will die at this point.
     */
    GLCatTexture.prototype.setTextureFromFloatArray = function (width, height, source, format) {
        if (format === void 0) { format = GL_1.GL.RGBA; }
        var gl = this.__glCat.gl;
        this.__glCat.getExtension('OES_texture_float', true);
        gl.bindTexture(gl.TEXTURE_2D, this.__texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, gl.FLOAT, source);
        if (this.__glCat.getExtension('OES_texture_float_linear') === null) {
            this.textureFilter(gl.NEAREST);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);
        this.__width = width;
        this.__height = height;
    };
    /**
     * Copy pixels from current framebuffer to given texture.
     */
    GLCatTexture.prototype.copyTexture = function (width, height) {
        var gl = this.__glCat.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.__texture);
        gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 0, 0, width, height, 0);
        gl.bindTexture(gl.TEXTURE_2D, null);
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
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.__texture);
        for (var i = 0; i < 6; i++) {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[i]);
        }
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
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
exports.GLCatTexture = GLCatTexture;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./GL */ "./src/GL.ts"));
__export(__webpack_require__(/*! ./GLCat */ "./src/GLCat.ts"));
__export(__webpack_require__(/*! ./GLCatBuffer */ "./src/GLCatBuffer.ts"));
__export(__webpack_require__(/*! ./GLCatFramebuffer */ "./src/GLCatFramebuffer.ts"));
__export(__webpack_require__(/*! ./GLCatProgram */ "./src/GLCatProgram.ts"));
__export(__webpack_require__(/*! ./GLCatRenderbuffer */ "./src/GLCatRenderbuffer.ts"));
__export(__webpack_require__(/*! ./GLCatShader */ "./src/GLCatShader.ts"));
__export(__webpack_require__(/*! ./GLCatTexture */ "./src/GLCatTexture.ts"));


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvR0wudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dMQ2F0LnRzIiwid2VicGFjazovLy8uL3NyYy9HTENhdEJ1ZmZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR0xDYXRGcmFtZWJ1ZmZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR0xDYXRQcm9ncmFtLnRzIiwid2VicGFjazovLy8uL3NyYy9HTENhdFJlbmRlcmJ1ZmZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR0xDYXRTaGFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dMQ2F0VGV4dHVyZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEdBQUc7O1FBRUg7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7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O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQixLQUFLO1FBQ3JCO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsZ0JBQWdCLFlBQVk7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQSxjQUFjLDRCQUE0QjtRQUMxQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7O1FBRUo7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7UUFDQSxlQUFlLDRCQUE0QjtRQUMzQztRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBLGVBQWUsNEJBQTRCO1FBQzNDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoVGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxvQkFBb0IsbUJBQU8sQ0FBQywyQ0FBZTtBQUMzQyx5QkFBeUIsbUJBQU8sQ0FBQyxxREFBb0I7QUFDckQscUJBQXFCLG1CQUFPLENBQUMsNkNBQWdCO0FBQzdDLDBCQUEwQixtQkFBTyxDQUFDLHVEQUFxQjtBQUN2RCxvQkFBb0IsbUJBQU8sQ0FBQywyQ0FBZTtBQUMzQyxxQkFBcUIsbUJBQU8sQ0FBQyw2Q0FBZ0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QywrQ0FBK0MsRUFBRTtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGlCQUFpQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxpQkFBaUI7QUFDbEQ7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG1CQUFtQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG1CQUFtQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG1CQUFtQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyx1QkFBdUI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsdUJBQXVCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7O0FDdkxhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsU0FBUyxtQkFBTyxDQUFDLHlCQUFNO0FBQ3ZCLFNBQVMsbUJBQU8sQ0FBQywrQkFBUztBQUMxQixTQUFTLG1CQUFPLENBQUMsMkNBQWU7QUFDaEMsU0FBUyxtQkFBTyxDQUFDLHFEQUFvQjtBQUNyQyxTQUFTLG1CQUFPLENBQUMsNkNBQWdCO0FBQ2pDLFNBQVMsbUJBQU8sQ0FBQyx1REFBcUI7QUFDdEMsU0FBUyxtQkFBTyxDQUFDLDJDQUFlO0FBQ2hDLFNBQVMsbUJBQU8sQ0FBQyw2Q0FBZ0IiLCJmaWxlIjoiZ2xjYXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0dGhpc1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCIxOWJmOGQ1NjZkYmQyMDNmMDljYlwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJnbGNhdC5qc1wiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQgJiZcbiBcdFx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcbiBcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdICE9PSB3YXJuVW5leHBlY3RlZFJlcXVpcmVcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoXCIuL3NyYy9pbmRleC50c1wiKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkdMID0ge1xuICAgIEFDVElWRV9BVFRSSUJVVEVTOiAzNTcyMSxcbiAgICBBQ1RJVkVfQVRUUklCVVRFX01BWF9MRU5HVEg6IDM1NzIyLFxuICAgIEFDVElWRV9URVhUVVJFOiAzNDAxNixcbiAgICBBQ1RJVkVfVU5JRk9STVM6IDM1NzE4LFxuICAgIEFDVElWRV9VTklGT1JNX01BWF9MRU5HVEg6IDM1NzE5LFxuICAgIEFMSUFTRURfTElORV9XSURUSF9SQU5HRTogMzM5MDIsXG4gICAgQUxJQVNFRF9QT0lOVF9TSVpFX1JBTkdFOiAzMzkwMSxcbiAgICBBTFBIQTogNjQwNixcbiAgICBBTFBIQV9CSVRTOiAzNDEzLFxuICAgIEFMV0FZUzogNTE5LFxuICAgIEFSUkFZX0JVRkZFUjogMzQ5NjIsXG4gICAgQVJSQVlfQlVGRkVSX0JJTkRJTkc6IDM0OTY0LFxuICAgIEFUVEFDSEVEX1NIQURFUlM6IDM1NzE3LFxuICAgIEJBQ0s6IDEwMjksXG4gICAgQkxFTkQ6IDMwNDIsXG4gICAgQkxFTkRfQ09MT1I6IDMyNzczLFxuICAgIEJMRU5EX0RTVF9BTFBIQTogMzI5NzAsXG4gICAgQkxFTkRfRFNUX1JHQjogMzI5NjgsXG4gICAgQkxFTkRfRVFVQVRJT046IDMyNzc3LFxuICAgIEJMRU5EX0VRVUFUSU9OX0FMUEhBOiAzNDg3NyxcbiAgICBCTEVORF9FUVVBVElPTl9SR0I6IDMyNzc3LFxuICAgIEJMRU5EX1NSQ19BTFBIQTogMzI5NzEsXG4gICAgQkxFTkRfU1JDX1JHQjogMzI5NjksXG4gICAgQkxVRV9CSVRTOiAzNDEyLFxuICAgIEJPT0w6IDM1NjcwLFxuICAgIEJPT0xfVkVDMjogMzU2NzEsXG4gICAgQk9PTF9WRUMzOiAzNTY3MixcbiAgICBCT09MX1ZFQzQ6IDM1NjczLFxuICAgIEJST1dTRVJfREVGQVVMVF9XRUJHTDogMzc0NDQsXG4gICAgQlVGRkVSX1NJWkU6IDM0NjYwLFxuICAgIEJVRkZFUl9VU0FHRTogMzQ2NjEsXG4gICAgQllURTogNTEyMCxcbiAgICBDQ1c6IDIzMDUsXG4gICAgQ0xBTVBfVE9fRURHRTogMzMwNzEsXG4gICAgQ09MT1JfQVRUQUNITUVOVDA6IDM2MDY0LFxuICAgIENPTE9SX0JVRkZFUl9CSVQ6IDE2Mzg0LFxuICAgIENPTE9SX0NMRUFSX1ZBTFVFOiAzMTA2LFxuICAgIENPTE9SX1dSSVRFTUFTSzogMzEwNyxcbiAgICBDT01QSUxFX1NUQVRVUzogMzU3MTMsXG4gICAgQ09NUFJFU1NFRF9URVhUVVJFX0ZPUk1BVFM6IDM0NDY3LFxuICAgIENPTlNUQU5UX0FMUEhBOiAzMjc3MSxcbiAgICBDT05TVEFOVF9DT0xPUjogMzI3NjksXG4gICAgQ09OVEVYVF9MT1NUX1dFQkdMOiAzNzQ0MixcbiAgICBDVUxMX0ZBQ0U6IDI4ODQsXG4gICAgQ1VMTF9GQUNFX01PREU6IDI4ODUsXG4gICAgQ1VSUkVOVF9QUk9HUkFNOiAzNTcyNSxcbiAgICBDVVJSRU5UX1ZFUlRFWF9BVFRSSUI6IDM0MzQyLFxuICAgIENXOiAyMzA0LFxuICAgIERFQ1I6IDc2ODMsXG4gICAgREVDUl9XUkFQOiAzNDA1NixcbiAgICBERUxFVEVfU1RBVFVTOiAzNTcxMixcbiAgICBERVBUSF9BVFRBQ0hNRU5UOiAzNjA5NixcbiAgICBERVBUSF9CSVRTOiAzNDE0LFxuICAgIERFUFRIX0JVRkZFUl9CSVQ6IDI1NixcbiAgICBERVBUSF9DTEVBUl9WQUxVRTogMjkzMSxcbiAgICBERVBUSF9DT01QT05FTlQ6IDY0MDIsXG4gICAgREVQVEhfQ09NUE9ORU5UMTY6IDMzMTg5LFxuICAgIERFUFRIX0ZVTkM6IDI5MzIsXG4gICAgREVQVEhfUkFOR0U6IDI5MjgsXG4gICAgREVQVEhfU1RFTkNJTDogMzQwNDEsXG4gICAgREVQVEhfU1RFTkNJTF9BVFRBQ0hNRU5UOiAzMzMwNixcbiAgICBERVBUSF9URVNUOiAyOTI5LFxuICAgIERFUFRIX1dSSVRFTUFTSzogMjkzMCxcbiAgICBESVRIRVI6IDMwMjQsXG4gICAgRE9OVF9DQVJFOiA0MzUyLFxuICAgIERTVF9BTFBIQTogNzcyLFxuICAgIERTVF9DT0xPUjogNzc0LFxuICAgIERZTkFNSUNfRFJBVzogMzUwNDgsXG4gICAgRUxFTUVOVF9BUlJBWV9CVUZGRVI6IDM0OTYzLFxuICAgIEVMRU1FTlRfQVJSQVlfQlVGRkVSX0JJTkRJTkc6IDM0OTY1LFxuICAgIEVRVUFMOiA1MTQsXG4gICAgRkFTVEVTVDogNDM1MyxcbiAgICBGTE9BVDogNTEyNixcbiAgICBGTE9BVF9NQVQyOiAzNTY3NCxcbiAgICBGTE9BVF9NQVQzOiAzNTY3NSxcbiAgICBGTE9BVF9NQVQ0OiAzNTY3NixcbiAgICBGTE9BVF9WRUMyOiAzNTY2NCxcbiAgICBGTE9BVF9WRUMzOiAzNTY2NSxcbiAgICBGTE9BVF9WRUM0OiAzNTY2NixcbiAgICBGUkFHTUVOVF9TSEFERVI6IDM1NjMyLFxuICAgIEZSQU1FQlVGRkVSOiAzNjE2MCxcbiAgICBGUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX09CSkVDVF9OQU1FOiAzNjA0OSxcbiAgICBGUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX09CSkVDVF9UWVBFOiAzNjA0OCxcbiAgICBGUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX1RFWFRVUkVfQ1VCRV9NQVBfRkFDRTogMzYwNTEsXG4gICAgRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0xFVkVMOiAzNjA1MCxcbiAgICBGUkFNRUJVRkZFUl9CSU5ESU5HOiAzNjAwNixcbiAgICBGUkFNRUJVRkZFUl9DT01QTEVURTogMzYwNTMsXG4gICAgRlJBTUVCVUZGRVJfSU5DT01QTEVURV9BVFRBQ0hNRU5UOiAzNjA1NCxcbiAgICBGUkFNRUJVRkZFUl9JTkNPTVBMRVRFX0RJTUVOU0lPTlM6IDM2MDU3LFxuICAgIEZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTUlTU0lOR19BVFRBQ0hNRU5UOiAzNjA1NSxcbiAgICBGUkFNRUJVRkZFUl9VTlNVUFBPUlRFRDogMzYwNjEsXG4gICAgRlJPTlQ6IDEwMjgsXG4gICAgRlJPTlRfQU5EX0JBQ0s6IDEwMzIsXG4gICAgRlJPTlRfRkFDRTogMjg4NixcbiAgICBGVU5DX0FERDogMzI3NzQsXG4gICAgRlVOQ19SRVZFUlNFX1NVQlRSQUNUOiAzMjc3OSxcbiAgICBGVU5DX1NVQlRSQUNUOiAzMjc3OCxcbiAgICBHRU5FUkFURV9NSVBNQVBfSElOVDogMzMxNzAsXG4gICAgR0VRVUFMOiA1MTgsXG4gICAgR1JFQVRFUjogNTE2LFxuICAgIEdSRUVOX0JJVFM6IDM0MTEsXG4gICAgSElHSF9GTE9BVDogMzYzMzgsXG4gICAgSElHSF9JTlQ6IDM2MzQxLFxuICAgIElOQ1I6IDc2ODIsXG4gICAgSU5DUl9XUkFQOiAzNDA1NSxcbiAgICBJTkZPX0xPR19MRU5HVEg6IDM1NzE2LFxuICAgIElOVDogNTEyNCxcbiAgICBJTlRfVkVDMjogMzU2NjcsXG4gICAgSU5UX1ZFQzM6IDM1NjY4LFxuICAgIElOVF9WRUM0OiAzNTY2OSxcbiAgICBJTlZBTElEX0VOVU06IDEyODAsXG4gICAgSU5WQUxJRF9GUkFNRUJVRkZFUl9PUEVSQVRJT046IDEyODYsXG4gICAgSU5WQUxJRF9PUEVSQVRJT046IDEyODIsXG4gICAgSU5WQUxJRF9WQUxVRTogMTI4MSxcbiAgICBJTlZFUlQ6IDUzODYsXG4gICAgS0VFUDogNzY4MCxcbiAgICBMRVFVQUw6IDUxNSxcbiAgICBMRVNTOiA1MTMsXG4gICAgTElORUFSOiA5NzI5LFxuICAgIExJTkVBUl9NSVBNQVBfTElORUFSOiA5OTg3LFxuICAgIExJTkVBUl9NSVBNQVBfTkVBUkVTVDogOTk4NSxcbiAgICBMSU5FUzogMSxcbiAgICBMSU5FX0xPT1A6IDIsXG4gICAgTElORV9TVFJJUDogMyxcbiAgICBMSU5FX1dJRFRIOiAyODQ5LFxuICAgIExJTktfU1RBVFVTOiAzNTcxNCxcbiAgICBMT1dfRkxPQVQ6IDM2MzM2LFxuICAgIExPV19JTlQ6IDM2MzM5LFxuICAgIExVTUlOQU5DRTogNjQwOSxcbiAgICBMVU1JTkFOQ0VfQUxQSEE6IDY0MTAsXG4gICAgTUFYX0NPTUJJTkVEX1RFWFRVUkVfSU1BR0VfVU5JVFM6IDM1NjYxLFxuICAgIE1BWF9DVUJFX01BUF9URVhUVVJFX1NJWkU6IDM0MDc2LFxuICAgIE1BWF9GUkFHTUVOVF9VTklGT1JNX1ZFQ1RPUlM6IDM2MzQ5LFxuICAgIE1BWF9SRU5ERVJCVUZGRVJfU0laRTogMzQwMjQsXG4gICAgTUFYX1RFWFRVUkVfSU1BR0VfVU5JVFM6IDM0OTMwLFxuICAgIE1BWF9URVhUVVJFX1NJWkU6IDMzNzksXG4gICAgTUFYX1ZBUllJTkdfVkVDVE9SUzogMzYzNDgsXG4gICAgTUFYX1ZFUlRFWF9BVFRSSUJTOiAzNDkyMSxcbiAgICBNQVhfVkVSVEVYX1RFWFRVUkVfSU1BR0VfVU5JVFM6IDM1NjYwLFxuICAgIE1BWF9WRVJURVhfVU5JRk9STV9WRUNUT1JTOiAzNjM0NyxcbiAgICBNQVhfVklFV1BPUlRfRElNUzogMzM4NixcbiAgICBNRURJVU1fRkxPQVQ6IDM2MzM3LFxuICAgIE1FRElVTV9JTlQ6IDM2MzQwLFxuICAgIE1JUlJPUkVEX1JFUEVBVDogMzM2NDgsXG4gICAgTkVBUkVTVDogOTcyOCxcbiAgICBORUFSRVNUX01JUE1BUF9MSU5FQVI6IDk5ODYsXG4gICAgTkVBUkVTVF9NSVBNQVBfTkVBUkVTVDogOTk4NCxcbiAgICBORVZFUjogNTEyLFxuICAgIE5JQ0VTVDogNDM1NCxcbiAgICBOT05FOiAwLFxuICAgIE5PVEVRVUFMOiA1MTcsXG4gICAgTk9fRVJST1I6IDAsXG4gICAgTlVNX0NPTVBSRVNTRURfVEVYVFVSRV9GT1JNQVRTOiAzNDQ2NixcbiAgICBPTkU6IDEsXG4gICAgT05FX01JTlVTX0NPTlNUQU5UX0FMUEhBOiAzMjc3MixcbiAgICBPTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1I6IDMyNzcwLFxuICAgIE9ORV9NSU5VU19EU1RfQUxQSEE6IDc3MyxcbiAgICBPTkVfTUlOVVNfRFNUX0NPTE9SOiA3NzUsXG4gICAgT05FX01JTlVTX1NSQ19BTFBIQTogNzcxLFxuICAgIE9ORV9NSU5VU19TUkNfQ09MT1I6IDc2OSxcbiAgICBPVVRfT0ZfTUVNT1JZOiAxMjg1LFxuICAgIFBBQ0tfQUxJR05NRU5UOiAzMzMzLFxuICAgIFBPSU5UUzogMCxcbiAgICBQT0xZR09OX09GRlNFVF9GQUNUT1I6IDMyODI0LFxuICAgIFBPTFlHT05fT0ZGU0VUX0ZJTEw6IDMyODIzLFxuICAgIFBPTFlHT05fT0ZGU0VUX1VOSVRTOiAxMDc1MixcbiAgICBSRURfQklUUzogMzQxMCxcbiAgICBSRU5ERVJCVUZGRVI6IDM2MTYxLFxuICAgIFJFTkRFUkJVRkZFUl9BTFBIQV9TSVpFOiAzNjE3OSxcbiAgICBSRU5ERVJCVUZGRVJfQklORElORzogMzYwMDcsXG4gICAgUkVOREVSQlVGRkVSX0JMVUVfU0laRTogMzYxNzgsXG4gICAgUkVOREVSQlVGRkVSX0RFUFRIX1NJWkU6IDM2MTgwLFxuICAgIFJFTkRFUkJVRkZFUl9HUkVFTl9TSVpFOiAzNjE3NyxcbiAgICBSRU5ERVJCVUZGRVJfSEVJR0hUOiAzNjE2MyxcbiAgICBSRU5ERVJCVUZGRVJfSU5URVJOQUxfRk9STUFUOiAzNjE2NCxcbiAgICBSRU5ERVJCVUZGRVJfUkVEX1NJWkU6IDM2MTc2LFxuICAgIFJFTkRFUkJVRkZFUl9TVEVOQ0lMX1NJWkU6IDM2MTgxLFxuICAgIFJFTkRFUkJVRkZFUl9XSURUSDogMzYxNjIsXG4gICAgUkVOREVSRVI6IDc5MzcsXG4gICAgUkVQRUFUOiAxMDQ5NyxcbiAgICBSRVBMQUNFOiA3NjgxLFxuICAgIFJHQjogNjQwNyxcbiAgICBSR0I1X0ExOiAzMjg1NSxcbiAgICBSR0I1NjU6IDM2MTk0LFxuICAgIFJHQkE6IDY0MDgsXG4gICAgUkdCQTQ6IDMyODU0LFxuICAgIFNBTVBMRVJfMkQ6IDM1Njc4LFxuICAgIFNBTVBMRVJfQ1VCRTogMzU2ODAsXG4gICAgU0FNUExFUzogMzI5MzcsXG4gICAgU0FNUExFX0FMUEhBX1RPX0NPVkVSQUdFOiAzMjkyNixcbiAgICBTQU1QTEVfQlVGRkVSUzogMzI5MzYsXG4gICAgU0FNUExFX0NPVkVSQUdFOiAzMjkyOCxcbiAgICBTQU1QTEVfQ09WRVJBR0VfSU5WRVJUOiAzMjkzOSxcbiAgICBTQU1QTEVfQ09WRVJBR0VfVkFMVUU6IDMyOTM4LFxuICAgIFNDSVNTT1JfQk9YOiAzMDg4LFxuICAgIFNDSVNTT1JfVEVTVDogMzA4OSxcbiAgICBTSEFERVJfQ09NUElMRVI6IDM2MzQ2LFxuICAgIFNIQURFUl9TT1VSQ0VfTEVOR1RIOiAzNTcyMCxcbiAgICBTSEFERVJfVFlQRTogMzU2NjMsXG4gICAgU0hBRElOR19MQU5HVUFHRV9WRVJTSU9OOiAzNTcyNCxcbiAgICBTSE9SVDogNTEyMixcbiAgICBTUkNfQUxQSEE6IDc3MCxcbiAgICBTUkNfQUxQSEFfU0FUVVJBVEU6IDc3NixcbiAgICBTUkNfQ09MT1I6IDc2OCxcbiAgICBTVEFUSUNfRFJBVzogMzUwNDQsXG4gICAgU1RFTkNJTF9BVFRBQ0hNRU5UOiAzNjEyOCxcbiAgICBTVEVOQ0lMX0JBQ0tfRkFJTDogMzQ4MTcsXG4gICAgU1RFTkNJTF9CQUNLX0ZVTkM6IDM0ODE2LFxuICAgIFNURU5DSUxfQkFDS19QQVNTX0RFUFRIX0ZBSUw6IDM0ODE4LFxuICAgIFNURU5DSUxfQkFDS19QQVNTX0RFUFRIX1BBU1M6IDM0ODE5LFxuICAgIFNURU5DSUxfQkFDS19SRUY6IDM2MDAzLFxuICAgIFNURU5DSUxfQkFDS19WQUxVRV9NQVNLOiAzNjAwNCxcbiAgICBTVEVOQ0lMX0JBQ0tfV1JJVEVNQVNLOiAzNjAwNSxcbiAgICBTVEVOQ0lMX0JJVFM6IDM0MTUsXG4gICAgU1RFTkNJTF9CVUZGRVJfQklUOiAxMDI0LFxuICAgIFNURU5DSUxfQ0xFQVJfVkFMVUU6IDI5NjEsXG4gICAgU1RFTkNJTF9GQUlMOiAyOTY0LFxuICAgIFNURU5DSUxfRlVOQzogMjk2MixcbiAgICBTVEVOQ0lMX0lOREVYOiA2NDAxLFxuICAgIFNURU5DSUxfSU5ERVg4OiAzNjE2OCxcbiAgICBTVEVOQ0lMX1BBU1NfREVQVEhfRkFJTDogMjk2NSxcbiAgICBTVEVOQ0lMX1BBU1NfREVQVEhfUEFTUzogMjk2NixcbiAgICBTVEVOQ0lMX1JFRjogMjk2NyxcbiAgICBTVEVOQ0lMX1RFU1Q6IDI5NjAsXG4gICAgU1RFTkNJTF9WQUxVRV9NQVNLOiAyOTYzLFxuICAgIFNURU5DSUxfV1JJVEVNQVNLOiAyOTY4LFxuICAgIFNUUkVBTV9EUkFXOiAzNTA0MCxcbiAgICBTVUJQSVhFTF9CSVRTOiAzNDA4LFxuICAgIFRFWFRVUkU6IDU4OTAsXG4gICAgVEVYVFVSRTA6IDMzOTg0LFxuICAgIFRFWFRVUkUxOiAzMzk4NSxcbiAgICBURVhUVVJFMjogMzM5ODYsXG4gICAgVEVYVFVSRTM6IDMzOTg3LFxuICAgIFRFWFRVUkU0OiAzMzk4OCxcbiAgICBURVhUVVJFNTogMzM5ODksXG4gICAgVEVYVFVSRTY6IDMzOTkwLFxuICAgIFRFWFRVUkU3OiAzMzk5MSxcbiAgICBURVhUVVJFODogMzM5OTIsXG4gICAgVEVYVFVSRTk6IDMzOTkzLFxuICAgIFRFWFRVUkUxMDogMzM5OTQsXG4gICAgVEVYVFVSRTExOiAzMzk5NSxcbiAgICBURVhUVVJFMTI6IDMzOTk2LFxuICAgIFRFWFRVUkUxMzogMzM5OTcsXG4gICAgVEVYVFVSRTE0OiAzMzk5OCxcbiAgICBURVhUVVJFMTU6IDMzOTk5LFxuICAgIFRFWFRVUkUxNjogMzQwMDAsXG4gICAgVEVYVFVSRTE3OiAzNDAwMSxcbiAgICBURVhUVVJFMTg6IDM0MDAyLFxuICAgIFRFWFRVUkUxOTogMzQwMDMsXG4gICAgVEVYVFVSRTIwOiAzNDAwNCxcbiAgICBURVhUVVJFMjE6IDM0MDA1LFxuICAgIFRFWFRVUkUyMjogMzQwMDYsXG4gICAgVEVYVFVSRTIzOiAzNDAwNyxcbiAgICBURVhUVVJFMjQ6IDM0MDA4LFxuICAgIFRFWFRVUkUyNTogMzQwMDksXG4gICAgVEVYVFVSRTI2OiAzNDAxMCxcbiAgICBURVhUVVJFMjc6IDM0MDExLFxuICAgIFRFWFRVUkUyODogMzQwMTIsXG4gICAgVEVYVFVSRTI5OiAzNDAxMyxcbiAgICBURVhUVVJFMzA6IDM0MDE0LFxuICAgIFRFWFRVUkUzMTogMzQwMTUsXG4gICAgVEVYVFVSRV8yRDogMzU1MyxcbiAgICBURVhUVVJFX0JJTkRJTkdfMkQ6IDMyODczLFxuICAgIFRFWFRVUkVfQklORElOR19DVUJFX01BUDogMzQwNjgsXG4gICAgVEVYVFVSRV9DVUJFX01BUDogMzQwNjcsXG4gICAgVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9YOiAzNDA3MCxcbiAgICBURVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1k6IDM0MDcyLFxuICAgIFRFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWjogMzQwNzQsXG4gICAgVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YOiAzNDA2OSxcbiAgICBURVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1k6IDM0MDcxLFxuICAgIFRFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWjogMzQwNzMsXG4gICAgVEVYVFVSRV9NQUdfRklMVEVSOiAxMDI0MCxcbiAgICBURVhUVVJFX01JTl9GSUxURVI6IDEwMjQxLFxuICAgIFRFWFRVUkVfV1JBUF9TOiAxMDI0MixcbiAgICBURVhUVVJFX1dSQVBfVDogMTAyNDMsXG4gICAgVFJJQU5HTEVTOiA0LFxuICAgIFRSSUFOR0xFX0ZBTjogNixcbiAgICBUUklBTkdMRV9TVFJJUDogNSxcbiAgICBVTlBBQ0tfQUxJR05NRU5UOiAzMzE3LFxuICAgIFVOUEFDS19DT0xPUlNQQUNFX0NPTlZFUlNJT05fV0VCR0w6IDM3NDQzLFxuICAgIFVOUEFDS19GTElQX1lfV0VCR0w6IDM3NDQwLFxuICAgIFVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTDogMzc0NDEsXG4gICAgVU5TSUdORURfQllURTogNTEyMSxcbiAgICBVTlNJR05FRF9JTlQ6IDUxMjUsXG4gICAgVU5TSUdORURfU0hPUlQ6IDUxMjMsXG4gICAgVU5TSUdORURfU0hPUlRfNF80XzRfNDogMzI4MTksXG4gICAgVU5TSUdORURfU0hPUlRfNV81XzVfMTogMzI4MjAsXG4gICAgVU5TSUdORURfU0hPUlRfNV82XzU6IDMzNjM1LFxuICAgIFZBTElEQVRFX1NUQVRVUzogMzU3MTUsXG4gICAgVkVORE9SOiA3OTM2LFxuICAgIFZFUlNJT046IDc5MzgsXG4gICAgVkVSVEVYX0FUVFJJQl9BUlJBWV9CVUZGRVJfQklORElORzogMzQ5NzUsXG4gICAgVkVSVEVYX0FUVFJJQl9BUlJBWV9FTkFCTEVEOiAzNDMzOCxcbiAgICBWRVJURVhfQVRUUklCX0FSUkFZX05PUk1BTElaRUQ6IDM0OTIyLFxuICAgIFZFUlRFWF9BVFRSSUJfQVJSQVlfUE9JTlRFUjogMzQzNzMsXG4gICAgVkVSVEVYX0FUVFJJQl9BUlJBWV9TSVpFOiAzNDMzOSxcbiAgICBWRVJURVhfQVRUUklCX0FSUkFZX1NUUklERTogMzQzNDAsXG4gICAgVkVSVEVYX0FUVFJJQl9BUlJBWV9UWVBFOiAzNDM0MSxcbiAgICBWRVJURVhfU0hBREVSOiAzNTYzMyxcbiAgICBWSUVXUE9SVDogMjk3OCxcbiAgICBaRVJPOiAwXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgR0xDYXRCdWZmZXJfMSA9IHJlcXVpcmUoXCIuL0dMQ2F0QnVmZmVyXCIpO1xudmFyIEdMQ2F0RnJhbWVidWZmZXJfMSA9IHJlcXVpcmUoXCIuL0dMQ2F0RnJhbWVidWZmZXJcIik7XG52YXIgR0xDYXRQcm9ncmFtXzEgPSByZXF1aXJlKFwiLi9HTENhdFByb2dyYW1cIik7XG52YXIgR0xDYXRSZW5kZXJidWZmZXJfMSA9IHJlcXVpcmUoXCIuL0dMQ2F0UmVuZGVyYnVmZmVyXCIpO1xudmFyIEdMQ2F0U2hhZGVyXzEgPSByZXF1aXJlKFwiLi9HTENhdFNoYWRlclwiKTtcbnZhciBHTENhdFRleHR1cmVfMSA9IHJlcXVpcmUoXCIuL0dMQ2F0VGV4dHVyZVwiKTtcbi8qKlxuICogV2ViR0wgd3JhcHBlciB3aXRoIHBsZW50eSBvZiBoYWNrYWJpbGl0eS5cbiAqL1xudmFyIEdMQ2F0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBHTENhdCBpbnN0YW5jZS5cbiAgICAgKiBXZWJHTFJlbmRlcmluZ0NvbnRleHQgaXMgcmVxdWlyZWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gR0xDYXQoZ2wpIHtcbiAgICAgICAgdGhpcy5fX2V4dGVuc2lvbkNhY2hlID0ge307XG4gICAgICAgIHRoaXMuX19nbCA9IGdsO1xuICAgICAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgICAgIGdsLmRlcHRoRnVuYyhnbC5MRVFVQUwpO1xuICAgICAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgICAgICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdMQ2F0LnByb3RvdHlwZSwgXCJyZW5kZXJpbmdDb250ZXh0XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEl0cyBvd24gV2ViR0xSZW5kZXJpbmdDb250ZXh0LlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2dsO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR0xDYXQucHJvdG90eXBlLCBcImdsXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEl0cyBvd24gV2ViR0xSZW5kZXJpbmdDb250ZXh0LiBTaG9ydGVyIHRoYW4gW1tHTENhdC5yZW5kZXJpbmdDb250ZXh0XV1cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19nbDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdMQ2F0LnByb3RvdHlwZSwgXCJkdW1teVRleHR1cmVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBkdW1teSB0ZXh0dXJlLCAxMDAlIG9yZ2FuaWMgcHVyZSAjRkYwMEZGIHRleHR1cmUuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fZHVtbXlUZXh0dXJlQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2R1bW15VGV4dHVyZUNhY2hlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRleHR1cmUgPSB0aGlzLmNyZWF0ZVRleHR1cmUoKTtcbiAgICAgICAgICAgIGlmICh0ZXh0dXJlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkoMSwgMSwgbmV3IFVpbnQ4QXJyYXkoWzI1NSwgMCwgMjU1LCAyNTVdKSk7XG4gICAgICAgICAgICB0aGlzLl9fZHVtbXlUZXh0dXJlQ2FjaGUgPSB0ZXh0dXJlO1xuICAgICAgICAgICAgcmV0dXJuIHRleHR1cmU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIGFuIGV4dGVuc2lvbi5cbiAgICAgKiBJZiB0aGV5IGlzIHlvdXIgcHJlY2lvdXMgb25lIGFuZCB5b3UgY2Fubm90IGxpdmUgd2l0aG91dCBoaW0sIHR1cm4gb24gYHRocm93SWZOb3RGb3VuZGAuXG4gICAgICovXG4gICAgR0xDYXQucHJvdG90eXBlLmdldEV4dGVuc2lvbiA9IGZ1bmN0aW9uIChuYW1lLCB0aHJvd0lmTm90Rm91bmQpIHtcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsO1xuICAgICAgICBpZiAodGhpcy5fX2V4dGVuc2lvbkNhY2hlW25hbWVdKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2V4dGVuc2lvbkNhY2hlW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fX2V4dGVuc2lvbkNhY2hlW25hbWVdID0gZ2wuZ2V0RXh0ZW5zaW9uKG5hbWUpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX19leHRlbnNpb25DYWNoZVtuYW1lXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbbmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhyb3dJZk5vdEZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignR0xDYXQuZ2V0RXh0ZW5zaW9uOiBUaGUgZXh0ZW5zaW9uIFwiJyArIG5hbWUgKyAnXCIgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0cmlldmUgZXh0ZW5zaW9ucy5cbiAgICAgKiBJZiB0aGV5IGFyZSB5b3VyIHByZWNpb3VzIG9uZXMgYW5kIHlvdSBjYW5ub3QgbGl2ZSB3aXRob3V0IHRoZW0sIHR1cm4gb24gYHRocm93SWZOb3RGb3VuZGAuXG4gICAgICovXG4gICAgR0xDYXQucHJvdG90eXBlLmdldEV4dGVuc2lvbnMgPSBmdW5jdGlvbiAobmFtZXMsIHRocm93SWZOb3RGb3VuZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmFtZXMubWFwKGZ1bmN0aW9uIChuKSB7IHJldHVybiBfdGhpcy5nZXRFeHRlbnNpb24obiwgdGhyb3dJZk5vdEZvdW5kKTsgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgc2hhZGVyIG9iamVjdC5cbiAgICAgKi9cbiAgICBHTENhdC5wcm90b3R5cGUuY3JlYXRlU2hhZGVyID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsO1xuICAgICAgICB2YXIgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xuICAgICAgICBpZiAoc2hhZGVyID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoR0xDYXQudW5leHBlY3RlZE51bGxEZXRlY3RlZEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEdMQ2F0U2hhZGVyXzEuR0xDYXRTaGFkZXIodGhpcywgc2hhZGVyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBHTENhdCBwcm9ncmFtIG9iamVjdC5cbiAgICAgKi9cbiAgICBHTENhdC5wcm90b3R5cGUuY3JlYXRlUHJvZ3JhbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsO1xuICAgICAgICB2YXIgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICAgICAgaWYgKHByb2dyYW0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgR0xDYXRQcm9ncmFtXzEuR0xDYXRQcm9ncmFtKHRoaXMsIHByb2dyYW0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IHByb2dyYW0gb2JqZWN0LCBpbiBsYXppZXIgd2F5LlxuICAgICAqL1xuICAgIEdMQ2F0LnByb3RvdHlwZS5sYXp5UHJvZ3JhbSA9IGZ1bmN0aW9uICh2ZXJ0LCBmcmFnKSB7XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbDtcbiAgICAgICAgLy8gPT0gdmVydCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIHZhciB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICAgICAgaWYgKHZlcnRleFNoYWRlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZlcnRleFNoYWRlci5jb21waWxlKHZlcnQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB2ZXJ0ZXhTaGFkZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgICAvLyA9PSBmcmFnID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgdmFyIGZyYWdtZW50U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcbiAgICAgICAgaWYgKGZyYWdtZW50U2hhZGVyID09PSBudWxsKSB7XG4gICAgICAgICAgICB2ZXJ0ZXhTaGFkZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZyYWdtZW50U2hhZGVyLmNvbXBpbGUoZnJhZyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHZlcnRleFNoYWRlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICBmcmFnbWVudFNoYWRlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICAgIC8vID09IHByb2dyYW0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICB2YXIgcHJvZ3JhbSA9IHRoaXMuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgICBpZiAocHJvZ3JhbSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdmVydGV4U2hhZGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIGZyYWdtZW50U2hhZGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwcm9ncmFtLmxpbmsodmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHZlcnRleFNoYWRlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICBmcmFnbWVudFNoYWRlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICBwcm9ncmFtLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb2dyYW07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgR0xDYXQgcHJvZ3JhbSBvYmplY3QsIGluIGxhemllciB3YXkuXG4gICAgICogSXQncyBnb25uYSBiZSBhc3luY2hyb25vdXMgaWYgeW91IGhhdmUgdGhlIEtIUl9wYXJhbGxlbF9zaGFkZXJfY29tcGlsZSBleHRlbnNpb24gc3VwcG9ydC5cbiAgICAgKi9cbiAgICBHTENhdC5wcm90b3R5cGUubGF6eVByb2dyYW1Bc3luYyA9IGZ1bmN0aW9uICh2ZXJ0LCBmcmFnKSB7XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbDtcbiAgICAgICAgLy8gPT0gdmVydCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIHZhciB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICAgICAgaWYgKHZlcnRleFNoYWRlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3IpKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmVydGV4U2hhZGVyLmNvbXBpbGUodmVydCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHZlcnRleFNoYWRlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gPT0gZnJhZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIHZhciBmcmFnbWVudFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XG4gICAgICAgIGlmIChmcmFnbWVudFNoYWRlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdmVydGV4U2hhZGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoR0xDYXQudW5leHBlY3RlZE51bGxEZXRlY3RlZEVycm9yKSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZyYWdtZW50U2hhZGVyLmNvbXBpbGUoZnJhZyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHZlcnRleFNoYWRlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICBmcmFnbWVudFNoYWRlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gPT0gcHJvZ3JhbSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIHZhciBwcm9ncmFtID0gdGhpcy5jcmVhdGVQcm9ncmFtKCk7XG4gICAgICAgIGlmIChwcm9ncmFtID09PSBudWxsKSB7XG4gICAgICAgICAgICB2ZXJ0ZXhTaGFkZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgZnJhZ21lbnRTaGFkZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3IpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvZ3JhbS5saW5rQXN5bmModmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcikudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvZ3JhbTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZlcnRleFNoYWRlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICBmcmFnbWVudFNoYWRlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICBwcm9ncmFtLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBhIHByb2dyYW0gdG8gdXNlLlxuICAgICAqL1xuICAgIEdMQ2F0LnByb3RvdHlwZS51c2VQcm9ncmFtID0gZnVuY3Rpb24gKHByb2dyYW0pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICAgIGdsLnVzZVByb2dyYW0oKChfYSA9IHByb2dyYW0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yYXcpIHx8IG51bGwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHZlcnRleCBidWZmZXIuXG4gICAgICovXG4gICAgR0xDYXQucHJvdG90eXBlLmNyZWF0ZUJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsO1xuICAgICAgICB2YXIgYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgICAgIGlmIChidWZmZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgR0xDYXRCdWZmZXJfMS5HTENhdEJ1ZmZlcih0aGlzLCBidWZmZXIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHRleHR1cmUuXG4gICAgICovXG4gICAgR0xDYXQucHJvdG90eXBlLmNyZWF0ZVRleHR1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbDtcbiAgICAgICAgdmFyIHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgICAgIGlmICh0ZXh0dXJlID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoR0xDYXQudW5leHBlY3RlZE51bGxEZXRlY3RlZEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEdMQ2F0VGV4dHVyZV8xLkdMQ2F0VGV4dHVyZSh0aGlzLCB0ZXh0dXJlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyByZW5kZXJidWZmZXIuXG4gICAgICovXG4gICAgR0xDYXQucHJvdG90eXBlLmNyZWF0ZVJlbmRlcmJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsO1xuICAgICAgICB2YXIgcmVuZGVyYnVmZmVyID0gZ2wuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gICAgICAgIGlmIChyZW5kZXJidWZmZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgR0xDYXRSZW5kZXJidWZmZXJfMS5HTENhdFJlbmRlcmJ1ZmZlcih0aGlzLCByZW5kZXJidWZmZXIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGZyYW1lYnVmZmVyLlxuICAgICAqIFRPRE86IERyYXdCdWZmZXJzXG4gICAgICovXG4gICAgR0xDYXQucHJvdG90eXBlLmNyZWF0ZUZyYW1lYnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2w7XG4gICAgICAgIHZhciBmcmFtZWJ1ZmZlciA9IGdsLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XG4gICAgICAgIGlmIChmcmFtZWJ1ZmZlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBHTENhdEZyYW1lYnVmZmVyXzEuR0xDYXRGcmFtZWJ1ZmZlcih0aGlzLCBmcmFtZWJ1ZmZlcik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgZnJhbWVidWZlciwgaW4gbGF6aWVyIHdheS5cbiAgICAgKi9cbiAgICBHTENhdC5wcm90b3R5cGUubGF6eUZyYW1lYnVmZmVyID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIGlzRmxvYXQpIHtcbiAgICAgICAgaWYgKGlzRmxvYXQgPT09IHZvaWQgMCkgeyBpc0Zsb2F0ID0gZmFsc2U7IH1cbiAgICAgICAgdmFyIGZyYW1lYnVmZmVyID0gdGhpcy5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuICAgICAgICBpZiAoZnJhbWVidWZmZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZW5kZXJidWZmZXIgPSB0aGlzLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xuICAgICAgICBpZiAocmVuZGVyYnVmZmVyID09PSBudWxsKSB7XG4gICAgICAgICAgICBmcmFtZWJ1ZmZlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoR0xDYXQudW5leHBlY3RlZE51bGxEZXRlY3RlZEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICByZW5kZXJidWZmZXIuaW5pdCh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgZnJhbWVidWZmZXIuYXR0YWNoUmVuZGVyYnVmZmVyKHJlbmRlcmJ1ZmZlcik7XG4gICAgICAgIHZhciB0ZXh0dXJlID0gdGhpcy5jcmVhdGVUZXh0dXJlKCk7XG4gICAgICAgIGlmICh0ZXh0dXJlID09PSBudWxsKSB7XG4gICAgICAgICAgICBmcmFtZWJ1ZmZlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICByZW5kZXJidWZmZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRmxvYXQpIHtcbiAgICAgICAgICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21GbG9hdEFycmF5KHdpZHRoLCBoZWlnaHQsIG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KHdpZHRoLCBoZWlnaHQsIG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFRleHR1cmUodGV4dHVyZSk7XG4gICAgICAgIHJldHVybiBmcmFtZWJ1ZmZlcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBkcmF3IGJ1ZmZlcnMsIGluIGxhemllciB3YXkuXG4gICAgICogSWYgeW91IGNhbid0IGdyYWIgYFdFQkdMX2RyYXdfYnVmZmVyc2AgZXh0ZW5zaW9uLCB5b3UnbGwgZGllIGluc3RhbnRseSBhdCB0aGlzIHBvaW50LlxuICAgICAqL1xuICAgIEdMQ2F0LnByb3RvdHlwZS5sYXp5RHJhd2J1ZmZlcnMgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgbnVtQnVmZmVycywgaXNGbG9hdCkge1xuICAgICAgICBpZiAoaXNGbG9hdCA9PT0gdm9pZCAwKSB7IGlzRmxvYXQgPSBmYWxzZTsgfVxuICAgICAgICB2YXIgZXh0ID0gdGhpcy5nZXRFeHRlbnNpb24oJ1dFQkdMX2RyYXdfYnVmZmVycycsIHRydWUpO1xuICAgICAgICBpZiAoZXh0Lk1BWF9EUkFXX0JVRkZFUlNfV0VCR0wgPCBudW1CdWZmZXJzKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignR0xDYXQ6IE1heGltdW0gZHJhdyBidWZmZXJzIGNvdW50IGV4Y2VlZGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZyYW1lYnVmZmVyID0gdGhpcy5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xuICAgICAgICBpZiAoZnJhbWVidWZmZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZW5kZXJidWZmZXIgPSB0aGlzLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xuICAgICAgICBpZiAocmVuZGVyYnVmZmVyID09PSBudWxsKSB7XG4gICAgICAgICAgICBmcmFtZWJ1ZmZlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoR0xDYXQudW5leHBlY3RlZE51bGxEZXRlY3RlZEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICByZW5kZXJidWZmZXIuaW5pdCh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgZnJhbWVidWZmZXIuYXR0YWNoUmVuZGVyYnVmZmVyKHJlbmRlcmJ1ZmZlcik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtQnVmZmVyczsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdGV4dHVyZSA9IHRoaXMuY3JlYXRlVGV4dHVyZSgpO1xuICAgICAgICAgICAgaWYgKHRleHR1cmUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmcmFtZWJ1ZmZlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyYnVmZmVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoR0xDYXQudW5leHBlY3RlZE51bGxEZXRlY3RlZEVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0Zsb2F0KSB7XG4gICAgICAgICAgICAgICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUZsb2F0QXJyYXkod2lkdGgsIGhlaWdodCwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkod2lkdGgsIGhlaWdodCwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hUZXh0dXJlKHRleHR1cmUsIGV4dC5DT0xPUl9BVFRBQ0hNRU5UMF9XRUJHTCArIGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcmFtZWJ1ZmZlcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENhbGwgdGhpcyBiZWZvcmUgeW91J3JlIGdvbm5hIHVzZSBkcmF3IGJ1ZmZlcnMuXG4gICAgICogSWYgeW91IGNhbid0IGdyYWIgYFdFQkdMX2RyYXdfYnVmZmVyc2AgZXh0ZW5zaW9uLCB5b3UnbGwgZGllIGluc3RhbnRseSBhdCB0aGlzIHBvaW50LlxuICAgICAqL1xuICAgIEdMQ2F0LnByb3RvdHlwZS5kcmF3QnVmZmVycyA9IGZ1bmN0aW9uIChudW1CdWZmZXJzKSB7XG4gICAgICAgIHZhciBleHQgPSB0aGlzLmdldEV4dGVuc2lvbignV0VCR0xfZHJhd19idWZmZXJzJywgdHJ1ZSk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG51bUJ1ZmZlcnMpKSB7XG4gICAgICAgICAgICBleHQuZHJhd0J1ZmZlcnNXRUJHTChudW1CdWZmZXJzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1CdWZmZXJzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBhcnJheVtpXSA9IGV4dC5DT0xPUl9BVFRBQ0hNRU5UMF9XRUJHTCArIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHQuZHJhd0J1ZmZlcnNXRUJHTChhcnJheSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENsZWFyIHRoZSBjdXJyZW50IGZyYW1lYnVmZmVyLlxuICAgICAqL1xuICAgIEdMQ2F0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIChyZWQsIGdyZWVuLCBibHVlLCBhbHBoYSwgZGVwdGgpIHtcbiAgICAgICAgaWYgKHJlZCA9PT0gdm9pZCAwKSB7IHJlZCA9IDAuMDsgfVxuICAgICAgICBpZiAoZ3JlZW4gPT09IHZvaWQgMCkgeyBncmVlbiA9IDAuMDsgfVxuICAgICAgICBpZiAoYmx1ZSA9PT0gdm9pZCAwKSB7IGJsdWUgPSAwLjA7IH1cbiAgICAgICAgaWYgKGFscGhhID09PSB2b2lkIDApIHsgYWxwaGEgPSAxLjA7IH1cbiAgICAgICAgaWYgKGRlcHRoID09PSB2b2lkIDApIHsgZGVwdGggPSAxLjA7IH1cbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsO1xuICAgICAgICBnbC5jbGVhckNvbG9yKHJlZCwgZ3JlZW4sIGJsdWUsIGFscGhhKTtcbiAgICAgICAgZ2wuY2xlYXJEZXB0aChkZXB0aCk7XG4gICAgICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQgfCBnbC5ERVBUSF9CVUZGRVJfQklUKTtcbiAgICB9O1xuICAgIEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvciA9ICdHTENhdDogVW5leHBlY3RlZCBudWxsIGRldGVjdGVkJztcbiAgICByZXR1cm4gR0xDYXQ7XG59KCkpO1xuZXhwb3J0cy5HTENhdCA9IEdMQ2F0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgR0xfMSA9IHJlcXVpcmUoXCIuL0dMXCIpO1xuLyoqXG4gKiBJdCdzIGEgV2ViR0xCdWZmZXIuXG4gKi9cbnZhciBHTENhdEJ1ZmZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRCdWZmZXIgaW5zdGFuY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gR0xDYXRCdWZmZXIoZ2xDYXQsIGJ1ZmZlcikge1xuICAgICAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcbiAgICAgICAgdGhpcy5fX2J1ZmZlciA9IGJ1ZmZlcjtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdMQ2F0QnVmZmVyLnByb3RvdHlwZSwgXCJidWZmZXJcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogSXRzIG93biBidWZmZXIuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fYnVmZmVyO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR0xDYXRCdWZmZXIucHJvdG90eXBlLCBcInJhd1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdHMgb3duIGJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRCdWZmZXIuYnVmZmVyXV0uXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fYnVmZmVyO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIHRoZSBidWZmZXIuXG4gICAgICovXG4gICAgR0xDYXRCdWZmZXIucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX19nbENhdC5nbC5kZWxldGVCdWZmZXIodGhpcy5fX2J1ZmZlcik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXQgbmV3IGRhdGEgaW50byB0aGlzIGJ1ZmZlci5cbiAgICAgKi9cbiAgICBHTENhdEJ1ZmZlci5wcm90b3R5cGUuc2V0VmVydGV4YnVmZmVyID0gZnVuY3Rpb24gKHNvdXJjZSwgdXNhZ2UpIHtcbiAgICAgICAgaWYgKHVzYWdlID09PSB2b2lkIDApIHsgdXNhZ2UgPSBHTF8xLkdMLlNUQVRJQ19EUkFXOyB9XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMuX19idWZmZXIpO1xuICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgc291cmNlLCB1c2FnZSk7XG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBudWxsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldCBuZXcgaW5kZXggZGF0YSBpbnRvIHRoaXMgYnVmZmVyLlxuICAgICAqL1xuICAgIEdMQ2F0QnVmZmVyLnByb3RvdHlwZS5zZXRJbmRleGJ1ZmZlciA9IGZ1bmN0aW9uIChzb3VyY2UsIHVzYWdlKSB7XG4gICAgICAgIGlmICh1c2FnZSA9PT0gdm9pZCAwKSB7IHVzYWdlID0gR0xfMS5HTC5TVEFUSUNfRFJBVzsgfVxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuX19idWZmZXIpO1xuICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBzb3VyY2UsIHVzYWdlKTtcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbnVsbCk7XG4gICAgfTtcbiAgICByZXR1cm4gR0xDYXRCdWZmZXI7XG59KCkpO1xuZXhwb3J0cy5HTENhdEJ1ZmZlciA9IEdMQ2F0QnVmZmVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgR0xfMSA9IHJlcXVpcmUoXCIuL0dMXCIpO1xuLyoqXG4gKiBJdCdzIGEgV2ViR0xGcmFtZWJ1ZmZlci5cbiAqL1xudmFyIEdMQ2F0RnJhbWVidWZmZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0RnJhbWVidWZmZXIgaW5zdGFuY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gR0xDYXRGcmFtZWJ1ZmZlcihnbENhdCwgZnJhbWVidWZmZXIpIHtcbiAgICAgICAgdGhpcy5fX3JlbmRlcmJ1ZmZlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX190ZXh0dXJlTWFwID0ge307XG4gICAgICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgICAgICB0aGlzLl9fZnJhbWVidWZmZXIgPSBmcmFtZWJ1ZmZlcjtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdMQ2F0RnJhbWVidWZmZXIucHJvdG90eXBlLCBcImZyYW1lYnVmZmVyXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEl0cyBvd24gZnJhbWVidWZmZXIuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZnJhbWVidWZmZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdEZyYW1lYnVmZmVyLnByb3RvdHlwZSwgXCJyYXdcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogSXRzIG93biBmcmFtZWJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRGcmFtZWJ1ZmZlci5mcmFtZWJ1ZmZlcl1dXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZnJhbWVidWZmZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdEZyYW1lYnVmZmVyLnByb3RvdHlwZSwgXCJyZW5kZXJidWZmZXJcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogSXRzIGF0dGFjaGVkIHJlbmRlcmJ1ZmZlci5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19yZW5kZXJidWZmZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdEZyYW1lYnVmZmVyLnByb3RvdHlwZSwgXCJ0ZXh0dXJlXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEl0cyBhdHRhY2hlZCB0ZXh0dXJlLlxuICAgICAgICAgKiBJZiB5b3Ugd2FudCB0byByZXRyaWV2ZSBvdGhlciB0aGFuIGBDT0xPUl9BVFRBQ0hNRU5UMGAsIHRyeSBbW0dMQ2F0RnJhbWVidWZmZXIuZ2V0VGV4dHVyZV1dIGluc3RlYWQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fdGV4dHVyZU1hcFtHTF8xLkdMLkNPTE9SX0FUVEFDSE1FTlQwXTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSB0aGUgZnJhbWVidWZmZXIuXG4gICAgICovXG4gICAgR0xDYXRGcmFtZWJ1ZmZlci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uIChhbHNvQXR0YWNoZWQpIHtcbiAgICAgICAgaWYgKGFsc29BdHRhY2hlZCA9PT0gdm9pZCAwKSB7IGFsc29BdHRhY2hlZCA9IGZhbHNlOyB9XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgZ2wuZGVsZXRlRnJhbWVidWZmZXIodGhpcy5fX2ZyYW1lYnVmZmVyKTtcbiAgICAgICAgaWYgKGFsc29BdHRhY2hlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX19yZW5kZXJidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBnbC5kZWxldGVSZW5kZXJidWZmZXIodGhpcy5fX3JlbmRlcmJ1ZmZlci5yYXcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLl9fdGV4dHVyZU1hcCkuZm9yRWFjaChmdW5jdGlvbiAodGV4dHVyZSkge1xuICAgICAgICAgICAgICAgIGdsLmRlbGV0ZVRleHR1cmUodGV4dHVyZS5yYXcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIGl0cyBhdHRhY2hlZCB0ZXh0dXJlLlxuICAgICAqL1xuICAgIEdMQ2F0RnJhbWVidWZmZXIucHJvdG90eXBlLmdldFRleHR1cmUgPSBmdW5jdGlvbiAoYXR0YWNobWVudCkge1xuICAgICAgICBpZiAoYXR0YWNobWVudCA9PT0gdm9pZCAwKSB7IGF0dGFjaG1lbnQgPSBHTF8xLkdMLkNPTE9SX0FUVEFDSE1FTlQwOyB9XG4gICAgICAgIHJldHVybiB0aGlzLl9fdGV4dHVyZU1hcFthdHRhY2htZW50XTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhIHJlbmRlcmJ1ZmZlciB0byB0aGlzIGZyYW1lYnVmZmVyLlxuICAgICAqL1xuICAgIEdMQ2F0RnJhbWVidWZmZXIucHJvdG90eXBlLmF0dGFjaFJlbmRlcmJ1ZmZlciA9IGZ1bmN0aW9uIChyZW5kZXJidWZmZXIsIGF0dGFjaG1lbnQpIHtcbiAgICAgICAgaWYgKGF0dGFjaG1lbnQgPT09IHZvaWQgMCkgeyBhdHRhY2htZW50ID0gR0xfMS5HTC5ERVBUSF9BVFRBQ0hNRU5UOyB9XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCB0aGlzLl9fZnJhbWVidWZmZXIpO1xuICAgICAgICBnbC5mcmFtZWJ1ZmZlclJlbmRlcmJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgYXR0YWNobWVudCwgZ2wuUkVOREVSQlVGRkVSLCByZW5kZXJidWZmZXIucmF3KTtcbiAgICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKTtcbiAgICAgICAgdGhpcy5fX3JlbmRlcmJ1ZmZlciA9IHJlbmRlcmJ1ZmZlcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhIHRleHR1cmUgdG8gdGhpcyBmcmFtZWJ1ZmZlci5cbiAgICAgKi9cbiAgICBHTENhdEZyYW1lYnVmZmVyLnByb3RvdHlwZS5hdHRhY2hUZXh0dXJlID0gZnVuY3Rpb24gKHRleHR1cmUsIGF0dGFjaG1lbnQpIHtcbiAgICAgICAgaWYgKGF0dGFjaG1lbnQgPT09IHZvaWQgMCkgeyBhdHRhY2htZW50ID0gR0xfMS5HTC5DT0xPUl9BVFRBQ0hNRU5UMDsgfVxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XG4gICAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgdGhpcy5fX2ZyYW1lYnVmZmVyKTtcbiAgICAgICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoZ2wuRlJBTUVCVUZGRVIsIGF0dGFjaG1lbnQsIGdsLlRFWFRVUkVfMkQsIHRleHR1cmUucmF3LCAwKTtcbiAgICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKTtcbiAgICAgICAgdGhpcy5fX3RleHR1cmVNYXBbYXR0YWNobWVudF0gPSB0ZXh0dXJlO1xuICAgIH07XG4gICAgcmV0dXJuIEdMQ2F0RnJhbWVidWZmZXI7XG59KCkpO1xuZXhwb3J0cy5HTENhdEZyYW1lYnVmZmVyID0gR0xDYXRGcmFtZWJ1ZmZlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fc3ByZWFkQXJyYXlzID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5cykgfHwgZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcbiAgICByZXR1cm4gcjtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgR0xfMSA9IHJlcXVpcmUoXCIuL0dMXCIpO1xuLyoqXG4gKiBJdCdzIGEgV2ViR0xQcm9ncmFtLCBidXQgaGFzIGNhY2hlIG9mIHZhcmlhYmxlIGxvY2F0aW9ucy5cbiAqL1xudmFyIEdMQ2F0UHJvZ3JhbSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRQcm9ncmFtIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEdMQ2F0UHJvZ3JhbShnbENhdCwgcHJvZ3JhbSkge1xuICAgICAgICB0aGlzLl9fc2hhZGVycyA9IG51bGw7XG4gICAgICAgIHRoaXMuX19hdHRyaWJMb2NhdGlvbkNhY2hlID0ge307XG4gICAgICAgIHRoaXMuX191bmlmb3JtTG9jYXRpb25DYWNoZSA9IHt9O1xuICAgICAgICB0aGlzLl9fdW5pZm9ybVRleHR1cmVVbml0TWFwID0ge307XG4gICAgICAgIHRoaXMuX191bmlmb3JtdGV4dHVyZVVuaXRJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX19saW5rZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XG4gICAgICAgIHRoaXMuX19wcm9ncmFtID0gcHJvZ3JhbTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUsIFwicHJvZ3JhbVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdHMgb3duIHByb2dyYW0uXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcHJvZ3JhbTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUsIFwicmF3XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEl0cyBvd24gcHJvZ3JhbS4gU2hvcnRlciB0aGFuIFtbR0xDYXRQcm9ncmFtLnByb2dyYW1dXS5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19wcm9ncmFtO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR0xDYXRQcm9ncmFtLnByb3RvdHlwZSwgXCJzaGFkZXJzXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEl0cyBzaGFkZXJzLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3NoYWRlcnMgPyB0aGlzLl9fc2hhZGVycy5jb25jYXQoKSA6IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdFByb2dyYW0ucHJvdG90eXBlLCBcImlzTGlua2VkXCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZXRoZXIgdGhlIGxhc3QgbGluayBvcGVyYXRpb24gd2FzIHN1Y2Nlc3NmdWwgb3Igbm90LlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2xpbmtlZDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSB0aGUgcHJvZ3JhbS5cbiAgICAgKi9cbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoYWxzb0F0dGFjaGVkKSB7XG4gICAgICAgIGlmIChhbHNvQXR0YWNoZWQgPT09IHZvaWQgMCkgeyBhbHNvQXR0YWNoZWQgPSBmYWxzZTsgfVxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XG4gICAgICAgIGdsLmRlbGV0ZVByb2dyYW0odGhpcy5fX3Byb2dyYW0pO1xuICAgICAgICBpZiAoYWxzb0F0dGFjaGVkKSB7XG4gICAgICAgICAgICB2YXIgc2hhZGVycyA9IHRoaXMuc2hhZGVycztcbiAgICAgICAgICAgIGlmIChzaGFkZXJzKSB7XG4gICAgICAgICAgICAgICAgc2hhZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChzaGFkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhZGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQXR0YWNoIHNoYWRlcnMgYW5kIGxpbmsgdGhpcyBwcm9ncmFtLlxuICAgICAqL1xuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHNoYWRlcnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHNoYWRlcnNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XG4gICAgICAgIHNoYWRlcnMuZm9yRWFjaChmdW5jdGlvbiAoc2hhZGVyKSB7IHJldHVybiBnbC5hdHRhY2hTaGFkZXIoX3RoaXMuX19wcm9ncmFtLCBzaGFkZXIucmF3KTsgfSk7XG4gICAgICAgIGdsLmxpbmtQcm9ncmFtKHRoaXMuX19wcm9ncmFtKTtcbiAgICAgICAgdGhpcy5fX2xpbmtlZCA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5fX3Byb2dyYW0sIGdsLkxJTktfU1RBVFVTKTtcbiAgICAgICAgaWYgKCF0aGlzLl9fbGlua2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0UHJvZ3JhbUluZm9Mb2codGhpcy5fX3Byb2dyYW0pKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fc2hhZGVycyA9IHNoYWRlcnMuY29uY2F0KCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBdHRhY2ggc2hhZGVycyBhbmQgbGluayB0aGlzIHByb2dyYW0uXG4gICAgICogSXQncyBnb25uYSBiZSBhc3luY2hyb25vdXMgaWYgeW91IGhhdmUgdGhlIEtIUl9wYXJhbGxlbF9zaGFkZXJfY29tcGlsZSBleHRlbnNpb24gc3VwcG9ydC5cbiAgICAgKi9cbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLmxpbmtBc3luYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHNoYWRlcnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHNoYWRlcnNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZ2xDYXQgPSB0aGlzLl9fZ2xDYXQ7XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgdmFyIGV4dFBhcmFsbGVsID0gZ2xDYXQuZ2V0RXh0ZW5zaW9uKCdLSFJfcGFyYWxsZWxfc2hhZGVyX2NvbXBpbGUnKTtcbiAgICAgICAgc2hhZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChzaGFkZXIpIHsgcmV0dXJuIGdsLmF0dGFjaFNoYWRlcihfdGhpcy5fX3Byb2dyYW0sIHNoYWRlci5yYXcpOyB9KTtcbiAgICAgICAgZ2wubGlua1Byb2dyYW0odGhpcy5fX3Byb2dyYW0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWV4dFBhcmFsbGVsIHx8XG4gICAgICAgICAgICAgICAgICAgIGdsLmdldFByb2dyYW1QYXJhbWV0ZXIoX3RoaXMuX19wcm9ncmFtLCBleHRQYXJhbGxlbC5DT01QTEVUSU9OX1NUQVRVU19LSFIpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9fbGlua2VkID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihfdGhpcy5fX3Byb2dyYW0sIGdsLkxJTktfU1RBVFVTKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5fX2xpbmtlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGdsLmdldFByb2dyYW1JbmZvTG9nKF90aGlzLl9fcHJvZ3JhbSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9fc2hhZGVycyA9IHNoYWRlcnMuY29uY2F0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBdHRhY2ggYW4gYXR0cmlidXRlIHZhcmlhYmxlLlxuICAgICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB2YXJpYWJsZVxuICAgICAqIEBwYXJhbSBidWZmZXIgVmVydGV4IGJ1ZmZlci4gQ2FuIGJlIG51bGwsIHRvIGRpc2FibGUgYXR0cmlidXRlIGFycmF5XG4gICAgICogQHBhcmFtIHNpemUgTnVtYmVyIG9mIGNvbXBvbmVudHMgcGVyIHZlcnRleC4gTXVzdCBiZSAxLCAyLCAzIG9yIDRcbiAgICAgKi9cbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLmF0dHJpYnV0ZSA9IGZ1bmN0aW9uIChuYW1lLCBidWZmZXIsIHNpemUsIGRpdmlzb3IsIHR5cGUsIHN0cmlkZSwgb2Zmc2V0KSB7XG4gICAgICAgIGlmIChzaXplID09PSB2b2lkIDApIHsgc2l6ZSA9IDE7IH1cbiAgICAgICAgaWYgKGRpdmlzb3IgPT09IHZvaWQgMCkgeyBkaXZpc29yID0gMDsgfVxuICAgICAgICBpZiAodHlwZSA9PT0gdm9pZCAwKSB7IHR5cGUgPSBHTF8xLkdMLkZMT0FUOyB9XG4gICAgICAgIGlmIChzdHJpZGUgPT09IHZvaWQgMCkgeyBzdHJpZGUgPSAwOyB9XG4gICAgICAgIGlmIChvZmZzZXQgPT09IHZvaWQgMCkgeyBvZmZzZXQgPSAwOyB9XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihuYW1lKTtcbiAgICAgICAgaWYgKGxvY2F0aW9uID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChidWZmZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlci5yYXcpO1xuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbik7XG4gICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobG9jYXRpb24sIHNpemUsIHR5cGUsIGZhbHNlLCBzdHJpZGUsIG9mZnNldCk7XG4gICAgICAgIHZhciBleHQgPSB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJyk7XG4gICAgICAgIGlmIChleHQpIHtcbiAgICAgICAgICAgIGV4dC52ZXJ0ZXhBdHRyaWJEaXZpc29yQU5HTEUobG9jYXRpb24sIGRpdmlzb3IpO1xuICAgICAgICB9XG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBudWxsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhbiB1bmlmb3JtIHZhcmlhYmxlLlxuICAgICAqIFNlZSBhbHNvOiBbW0dMQ2F0UHJvZ3JhbS51bmlmb3JtVmVjdG9yXV1cbiAgICAgKi9cbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLnVuaWZvcm0gPSBmdW5jdGlvbiAobmFtZSwgdHlwZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhbHVlW19pIC0gMl0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmdW5jID0gdGhpc1sndW5pZm9ybScgKyB0eXBlXTtcbiAgICAgICAgZnVuYy5jYWxsLmFwcGx5KGZ1bmMsIF9fc3ByZWFkQXJyYXlzKFt0aGlzLCBuYW1lXSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhbiB1bmlmb3JtIHZhcmlhYmxlLlxuICAgICAqIFNlZSBhbHNvOiBbW0dMQ2F0UHJvZ3JhbS51bmlmb3JtXV1cbiAgICAgKi9cbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLnVuaWZvcm1WZWN0b3IgPSBmdW5jdGlvbiAobmFtZSwgdHlwZSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGZ1bmMgPSB0aGlzWyd1bmlmb3JtJyArIHR5cGVdO1xuICAgICAgICBmdW5jLmNhbGwodGhpcywgbmFtZSwgdmFsdWUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0xaSB2YXJpYWJsZS5cbiAgICAgKi9cbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLnVuaWZvcm0xaSA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xuICAgICAgICBnbC51bmlmb3JtMWkobG9jYXRpb24sIHZhbHVlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhbiB1bmlmb3JtMmkgdmFyaWFibGUuXG4gICAgICovXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtMmkgPSBmdW5jdGlvbiAobmFtZSwgeCwgeSkge1xuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xuICAgICAgICBnbC51bmlmb3JtMmkobG9jYXRpb24sIHgsIHkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0zaSB2YXJpYWJsZS5cbiAgICAgKi9cbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLnVuaWZvcm0zaSA9IGZ1bmN0aW9uIChuYW1lLCB4LCB5LCB6KSB7XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XG4gICAgICAgIGdsLnVuaWZvcm0zaShsb2NhdGlvbiwgeCwgeSwgeik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybTRpIHZhcmlhYmxlLlxuICAgICAqL1xuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTRpID0gZnVuY3Rpb24gKG5hbWUsIHgsIHksIHosIHcpIHtcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbihuYW1lKTtcbiAgICAgICAgZ2wudW5pZm9ybTRpKGxvY2F0aW9uLCB4LCB5LCB6LCB3KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhbiB1bmlmb3JtMWl2IHZhcmlhYmxlLlxuICAgICAqL1xuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTFpdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSkge1xuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xuICAgICAgICBnbC51bmlmb3JtMWl2KGxvY2F0aW9uLCBhcnJheSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybTJpdiB2YXJpYWJsZS5cbiAgICAgKi9cbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLnVuaWZvcm0yaXYgPSBmdW5jdGlvbiAobmFtZSwgYXJyYXkpIHtcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbihuYW1lKTtcbiAgICAgICAgZ2wudW5pZm9ybTJpdihsb2NhdGlvbiwgYXJyYXkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0zaXYgdmFyaWFibGUuXG4gICAgICovXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtM2l2ID0gZnVuY3Rpb24gKG5hbWUsIGFycmF5KSB7XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XG4gICAgICAgIGdsLnVuaWZvcm0zaXYobG9jYXRpb24sIGFycmF5KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhbiB1bmlmb3JtNGl2IHZhcmlhYmxlLlxuICAgICAqL1xuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTRpdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSkge1xuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xuICAgICAgICBnbC51bmlmb3JtNGl2KGxvY2F0aW9uLCBhcnJheSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybTFmIHZhcmlhYmxlLlxuICAgICAqL1xuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTFmID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XG4gICAgICAgIGdsLnVuaWZvcm0xZihsb2NhdGlvbiwgdmFsdWUpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0yZiB2YXJpYWJsZS5cbiAgICAgKi9cbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLnVuaWZvcm0yZiA9IGZ1bmN0aW9uIChuYW1lLCB4LCB5KSB7XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XG4gICAgICAgIGdsLnVuaWZvcm0yZihsb2NhdGlvbiwgeCwgeSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybTNmIHZhcmlhYmxlLlxuICAgICAqL1xuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTNmID0gZnVuY3Rpb24gKG5hbWUsIHgsIHksIHopIHtcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbihuYW1lKTtcbiAgICAgICAgZ2wudW5pZm9ybTNmKGxvY2F0aW9uLCB4LCB5LCB6KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhbiB1bmlmb3JtNGYgdmFyaWFibGUuXG4gICAgICovXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtNGYgPSBmdW5jdGlvbiAobmFtZSwgeCwgeSwgeiwgdykge1xuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xuICAgICAgICBnbC51bmlmb3JtNGYobG9jYXRpb24sIHgsIHksIHosIHcpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0xZnYgdmFyaWFibGUuXG4gICAgICovXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtMWZ2ID0gZnVuY3Rpb24gKG5hbWUsIGFycmF5KSB7XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XG4gICAgICAgIGdsLnVuaWZvcm0xZnYobG9jYXRpb24sIGFycmF5KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhbiB1bmlmb3JtMmZ2IHZhcmlhYmxlLlxuICAgICAqL1xuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTJmdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSkge1xuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xuICAgICAgICBnbC51bmlmb3JtMmZ2KGxvY2F0aW9uLCBhcnJheSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybTNmdiB2YXJpYWJsZS5cbiAgICAgKi9cbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLnVuaWZvcm0zZnYgPSBmdW5jdGlvbiAobmFtZSwgYXJyYXkpIHtcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbihuYW1lKTtcbiAgICAgICAgZ2wudW5pZm9ybTNmdihsb2NhdGlvbiwgYXJyYXkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm00ZnYgdmFyaWFibGUuXG4gICAgICovXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtNGZ2ID0gZnVuY3Rpb24gKG5hbWUsIGFycmF5KSB7XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XG4gICAgICAgIGdsLnVuaWZvcm00ZnYobG9jYXRpb24sIGFycmF5KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhbiB1bmlmb3JtTWF0cml4MmZ2IHZhcmlhYmxlLlxuICAgICAqL1xuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybU1hdHJpeDJmdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSwgdHJhbnNwb3NlKSB7XG4gICAgICAgIGlmICh0cmFuc3Bvc2UgPT09IHZvaWQgMCkgeyB0cmFuc3Bvc2UgPSBmYWxzZTsgfVxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xuICAgICAgICBnbC51bmlmb3JtTWF0cml4MmZ2KGxvY2F0aW9uLCB0cmFuc3Bvc2UsIGFycmF5KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhbiB1bmlmb3JtTWF0cml4M2Z2IHZhcmlhYmxlLlxuICAgICAqL1xuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybU1hdHJpeDNmdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSwgdHJhbnNwb3NlKSB7XG4gICAgICAgIGlmICh0cmFuc3Bvc2UgPT09IHZvaWQgMCkgeyB0cmFuc3Bvc2UgPSBmYWxzZTsgfVxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xuICAgICAgICBnbC51bmlmb3JtTWF0cml4M2Z2KGxvY2F0aW9uLCB0cmFuc3Bvc2UsIGFycmF5KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhbiB1bmlmb3JtTWF0cml4NGZ2IHZhcmlhYmxlLlxuICAgICAqL1xuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybU1hdHJpeDRmdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSwgdHJhbnNwb3NlKSB7XG4gICAgICAgIGlmICh0cmFuc3Bvc2UgPT09IHZvaWQgMCkgeyB0cmFuc3Bvc2UgPSBmYWxzZTsgfVxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xuICAgICAgICBnbC51bmlmb3JtTWF0cml4NGZ2KGxvY2F0aW9uLCB0cmFuc3Bvc2UsIGFycmF5KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEF0dGFjaCBhIGBzYW1wbGVyMkRgIHR5cGUgdW5pZm9ybSB0ZXh0dXJlLlxuICAgICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIHVuaWZvcm0gdGV4dHVyZVxuICAgICAqIEBwYXJhbSB0ZXh0dXJlIFRleHR1cmUgb2JqZWN0XG4gICAgICovXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtVGV4dHVyZSA9IGZ1bmN0aW9uIChuYW1lLCB0ZXh0dXJlKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbihuYW1lKTtcbiAgICAgICAgdmFyIHVuaXQgPSB0aGlzLmdldFVuaWZvcm1UZXh0dXJlVW5pdChuYW1lKTtcbiAgICAgICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCArIHVuaXQpO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCAoKF9hID0gdGV4dHVyZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJhdykgfHwgbnVsbCk7XG4gICAgICAgIGdsLnVuaWZvcm0xaShsb2NhdGlvbiwgdW5pdCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBdHRhY2ggYSBgc2FtcGxlckN1YmVgIHR5cGUgdW5pZm9ybSB0ZXh0dXJlLlxuICAgICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIHVuaWZvcm0gdGV4dHVyZVxuICAgICAqIEBwYXJhbSB0ZXh0dXJlIFRleHR1cmUgb2JqZWN0XG4gICAgICovXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtQ3ViZW1hcCA9IGZ1bmN0aW9uIChuYW1lLCB0ZXh0dXJlKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbihuYW1lKTtcbiAgICAgICAgdmFyIHVuaXQgPSB0aGlzLmdldFVuaWZvcm1UZXh0dXJlVW5pdChuYW1lKTtcbiAgICAgICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCArIHVuaXQpO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFX0NVQkVfTUFQLCAoKF9hID0gdGV4dHVyZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJhdykgfHwgbnVsbCk7XG4gICAgICAgIGdsLnVuaWZvcm0xaShsb2NhdGlvbiwgdW5pdCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZSBhdHRyaWJ1dGUgbG9jYXRpb24uXG4gICAgICovXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS5nZXRBdHRyaWJMb2NhdGlvbiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgaWYgKHRoaXMuX19hdHRyaWJMb2NhdGlvbkNhY2hlW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fYXR0cmliTG9jYXRpb25DYWNoZVtuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuX19wcm9ncmFtLCBuYW1lKTtcbiAgICAgICAgICAgIC8vIGlmICggbG9jYXRpb24gPT09IC0xICkge1xuICAgICAgICAgICAgLy8gICB0aGlzLmdsQ2F0LnNwaXQoICdHTENhdFByb2dyYW0uZ2V0QXR0cmliTG9jYXRpb246IENvdWxkIG5vdCByZXRyaWV2ZSBhdHRyaWJ1dGUgbG9jYXRpb24nICk7XG4gICAgICAgICAgICAvLyAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMuX19hdHRyaWJMb2NhdGlvbkNhY2hlW25hbWVdID0gbG9jYXRpb247XG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb247XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIHVuaWZvcm0gbG9jYXRpb24uXG4gICAgICovXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS5nZXRVbmlmb3JtTG9jYXRpb24gPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XG4gICAgICAgIGlmICh0aGlzLl9fdW5pZm9ybUxvY2F0aW9uQ2FjaGVbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX191bmlmb3JtTG9jYXRpb25DYWNoZVtuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLl9fcHJvZ3JhbSwgbmFtZSk7XG4gICAgICAgICAgICAvLyBpZiAoIGxvY2F0aW9uID09PSBudWxsICkge1xuICAgICAgICAgICAgLy8gICB0aGlzLmdsQ2F0LnNwaXQoICdHTENhdFByb2dyYW0uZ2V0VW5pZm9ybUxvY2F0aW9uOiBDb3VsZCBub3QgcmV0cmlldmUgdW5pZm9ybSBsb2NhdGlvbicgKTtcbiAgICAgICAgICAgIC8vICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5fX3VuaWZvcm1Mb2NhdGlvbkNhY2hlW25hbWVdID0gbG9jYXRpb247XG4gICAgICAgICAgICByZXR1cm4gbG9jYXRpb247XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHJpZXZlIG9yIGNyZWF0ZSBhIHRleHR1cmUgdW5pdCB0aGF0IGNvcnJlc3BvbmRzIHRvIGdpdmVuIG5hbWUuXG4gICAgICovXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS5nZXRVbmlmb3JtVGV4dHVyZVVuaXQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBpZiAodGhpcy5fX3VuaWZvcm1UZXh0dXJlVW5pdE1hcFtuYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9fdW5pZm9ybVRleHR1cmVVbml0TWFwW25hbWVdID0gdGhpcy5fX3VuaWZvcm10ZXh0dXJlVW5pdEluZGV4O1xuICAgICAgICAgICAgdGhpcy5fX3VuaWZvcm10ZXh0dXJlVW5pdEluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX191bmlmb3JtVGV4dHVyZVVuaXRNYXBbbmFtZV07XG4gICAgfTtcbiAgICByZXR1cm4gR0xDYXRQcm9ncmFtO1xufSgpKTtcbmV4cG9ydHMuR0xDYXRQcm9ncmFtID0gR0xDYXRQcm9ncmFtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgR0xfMSA9IHJlcXVpcmUoXCIuL0dMXCIpO1xuLyoqXG4gKiBJdCdzIGEgV2ViR0xSZW5kZXJidWZmZXIuXG4gKi9cbnZhciBHTENhdFJlbmRlcmJ1ZmZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRUZXh0dXJlIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEdMQ2F0UmVuZGVyYnVmZmVyKGdsQ2F0LCByZW5kZXJidWZmZXIpIHtcbiAgICAgICAgdGhpcy5fX3dpZHRoID0gMDtcbiAgICAgICAgdGhpcy5fX2hlaWdodCA9IDA7XG4gICAgICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgICAgICB0aGlzLl9fcmVuZGVyYnVmZmVyID0gcmVuZGVyYnVmZmVyO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR0xDYXRSZW5kZXJidWZmZXIucHJvdG90eXBlLCBcInJlbmRlcmJ1ZmZlclwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdHMgb3duIHJlbmRlcmJ1ZmZlci5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19yZW5kZXJidWZmZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdFJlbmRlcmJ1ZmZlci5wcm90b3R5cGUsIFwicmF3XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEl0cyBvd24gcmVuZGVyYnVmZmVyLiBTaG9ydGVyIHRoYW4gW1tHTENhdFJlbmRlckJ1ZmZlci5yZW5kZXJidWZmZXJdXS5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19yZW5kZXJidWZmZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdFJlbmRlcmJ1ZmZlci5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogSXRzIHdpZHRoLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3dpZHRoO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR0xDYXRSZW5kZXJidWZmZXIucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdHMgaGVpZ2h0LlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2hlaWdodDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSB0aGUgcmVuZGVyYnVmZmVyLlxuICAgICAqL1xuICAgIEdMQ2F0UmVuZGVyYnVmZmVyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9fZ2xDYXQuZ2wuZGVsZXRlUmVuZGVyYnVmZmVyKHRoaXMuX19yZW5kZXJidWZmZXIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIHJlbmRlcmJ1ZmZlci5cbiAgICAgKiBJZiBgZm9ybWF0YCBpcyBub3QgZ2l2ZW4sIGl0IHdpbGwgYmUgaW5pdGlhbGl6ZWQgYXMgYERFUFRIX0NPTVBPTkVOVDE2YCAuXG4gICAgICovXG4gICAgR0xDYXRSZW5kZXJidWZmZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgZm9ybWF0KSB7XG4gICAgICAgIGlmIChmb3JtYXQgPT09IHZvaWQgMCkgeyBmb3JtYXQgPSBHTF8xLkdMLkRFUFRIX0NPTVBPTkVOVDE2OyB9XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgZ2wuYmluZFJlbmRlcmJ1ZmZlcihnbC5SRU5ERVJCVUZGRVIsIHRoaXMuX19yZW5kZXJidWZmZXIpO1xuICAgICAgICBnbC5yZW5kZXJidWZmZXJTdG9yYWdlKGdsLlJFTkRFUkJVRkZFUiwgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgZ2wuYmluZFJlbmRlcmJ1ZmZlcihnbC5SRU5ERVJCVUZGRVIsIG51bGwpO1xuICAgICAgICB0aGlzLl9fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5fX2hlaWdodCA9IGhlaWdodDtcbiAgICB9O1xuICAgIHJldHVybiBHTENhdFJlbmRlcmJ1ZmZlcjtcbn0oKSk7XG5leHBvcnRzLkdMQ2F0UmVuZGVyYnVmZmVyID0gR0xDYXRSZW5kZXJidWZmZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogSXQncyBhIFdlYkdMU2hhZGVyLlxuICovXG52YXIgR0xDYXRTaGFkZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0U2hhZGVyIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEdMQ2F0U2hhZGVyKGdsQ2F0LCBzaGFkZXIpIHtcbiAgICAgICAgdGhpcy5fX2NvbXBpbGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xuICAgICAgICB0aGlzLl9fc2hhZGVyID0gc2hhZGVyO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR0xDYXRTaGFkZXIucHJvdG90eXBlLCBcInNoYWRlclwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdHMgb3duIHNoYWRlci5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19zaGFkZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdFNoYWRlci5wcm90b3R5cGUsIFwicmF3XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEl0cyBvd24gc2hhZGVyLiBTaG9ydGVyIHRoYW4gW1tHTENhdFNoYWRlci5zaGFkZXJdXS5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19zaGFkZXI7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIERpc3Bvc2UgdGhlIHNoYWRlci5cbiAgICAgKi9cbiAgICBHTENhdFNoYWRlci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fX2dsQ2F0LmdsLmRlbGV0ZVNoYWRlcih0aGlzLl9fc2hhZGVyKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybiB3aGV0aGVyIHRoZSBsYXN0IGNvbXBpbGF0aW9uIHdhcyBzdWNjZXNzZnVsIG9yIG5vdC5cbiAgICAgKi9cbiAgICBHTENhdFNoYWRlci5wcm90b3R5cGUuaXNDb21waWxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX19jb21waWxlZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbXBpbGUgdGhlIHNoYWRlci5cbiAgICAgKi9cbiAgICBHTENhdFNoYWRlci5wcm90b3R5cGUuY29tcGlsZSA9IGZ1bmN0aW9uIChjb2RlKSB7XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKHRoaXMuX19zaGFkZXIsIGNvZGUpO1xuICAgICAgICBnbC5jb21waWxlU2hhZGVyKHRoaXMuX19zaGFkZXIpO1xuICAgICAgICB0aGlzLl9fY29tcGlsZWQgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodGhpcy5fX3NoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpO1xuICAgICAgICBpZiAoIXRoaXMuX19jb21waWxlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFNoYWRlckluZm9Mb2codGhpcy5fX3NoYWRlcikpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gR0xDYXRTaGFkZXI7XG59KCkpO1xuZXhwb3J0cy5HTENhdFNoYWRlciA9IEdMQ2F0U2hhZGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgR0xfMSA9IHJlcXVpcmUoXCIuL0dMXCIpO1xudmFyIHplcm9UZXh0dXJlQXJyYXkgPSBuZXcgVWludDhBcnJheShbMCwgMCwgMCwgMF0pO1xuLyoqXG4gKiBJdCdzIGEgV2ViR0xUZXh0dXJlLlxuICovXG52YXIgR0xDYXRUZXh0dXJlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBHTENhdFRleHR1cmUgaW5zdGFuY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gR0xDYXRUZXh0dXJlKGdsQ2F0LCB0ZXh0dXJlKSB7XG4gICAgICAgIHRoaXMuX193aWR0aCA9IDA7XG4gICAgICAgIHRoaXMuX19oZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcbiAgICAgICAgdGhpcy5fX3RleHR1cmUgPSB0ZXh0dXJlO1xuICAgICAgICB0aGlzLnRleHR1cmVGaWx0ZXIoR0xfMS5HTC5MSU5FQVIpO1xuICAgICAgICB0aGlzLnRleHR1cmVXcmFwKEdMXzEuR0wuQ0xBTVBfVE9fRURHRSk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdFRleHR1cmUucHJvdG90eXBlLCBcInRleHR1cmVcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogSXRzIG93biB0ZXh0dXJlLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3RleHR1cmU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdFRleHR1cmUucHJvdG90eXBlLCBcInJhd1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJdHMgb3duIHRleHR1cmUuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0VGV4dHVyZS50ZXh0dXJlZF1dXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fdGV4dHVyZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdMQ2F0VGV4dHVyZS5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogSXRzIHdpZHRoLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3dpZHRoO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR0xDYXRUZXh0dXJlLnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xuICAgICAgICAvKipcbiAgICAgICAgICogSXRzIGhlaWdodC5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19oZWlnaHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIERpc3Bvc2UgdGhlIHRleHR1cmUuXG4gICAgICovXG4gICAgR0xDYXRUZXh0dXJlLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9fZ2xDYXQuZ2wuZGVsZXRlVGV4dHVyZSh0aGlzLl9fdGV4dHVyZSk7XG4gICAgfTtcbiAgICBHTENhdFRleHR1cmUucHJvdG90eXBlLnRleHR1cmVGaWx0ZXIgPSBmdW5jdGlvbiAoZmlsdGVyTWFnLCBmaWx0ZXJNaW4pIHtcbiAgICAgICAgaWYgKGZpbHRlck1hZyA9PT0gdm9pZCAwKSB7IGZpbHRlck1hZyA9IEdMXzEuR0wuTkVBUkVTVDsgfVxuICAgICAgICBpZiAoZmlsdGVyTWluID09PSB2b2lkIDApIHsgZmlsdGVyTWluID0gZmlsdGVyTWFnOyB9XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5fX3RleHR1cmUpO1xuICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZmlsdGVyTWFnKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGZpbHRlck1pbik7XG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xuICAgIH07XG4gICAgR0xDYXRUZXh0dXJlLnByb3RvdHlwZS50ZXh0dXJlV3JhcCA9IGZ1bmN0aW9uICh3cmFwUywgd3JhcFQpIHtcbiAgICAgICAgaWYgKHdyYXBTID09PSB2b2lkIDApIHsgd3JhcFMgPSBHTF8xLkdMLkNMQU1QX1RPX0VER0U7IH1cbiAgICAgICAgaWYgKHdyYXBUID09PSB2b2lkIDApIHsgd3JhcFQgPSB3cmFwUzsgfVxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMuX190ZXh0dXJlKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgd3JhcFMpO1xuICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCB3cmFwVCk7XG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgdmFsdWUgZm9yIHRoZSBwYXNzZWQgcGFyYW1ldGVyIG5hbWUuXG4gICAgICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViR0xSZW5kZXJpbmdDb250ZXh0L2dldFBhcmFtZXRlclxuICAgICAqL1xuICAgIEdMQ2F0VGV4dHVyZS5wcm90b3R5cGUuZ2V0UGFyYW1ldGVyID0gZnVuY3Rpb24gKHBuYW1lKSB7XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5fX3RleHR1cmUpO1xuICAgICAgICBnbC5nZXRQYXJhbWV0ZXIocG5hbWUpO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNwZWNpZnkgdGhlIHBpeGVsIHN0b3JhZ2UgbW9kZXMuXG4gICAgICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViR0xSZW5kZXJpbmdDb250ZXh0L3BpeGVsU3RvcmVpXG4gICAgICovXG4gICAgR0xDYXRUZXh0dXJlLnByb3RvdHlwZS5waXhlbFN0b3JlaSA9IGZ1bmN0aW9uIChwbmFtZSwgcGFyYW0pIHtcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl9fdGV4dHVyZSk7XG4gICAgICAgIGdsLnBpeGVsU3RvcmVpKHBuYW1lLCBwYXJhbSk7XG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0IG5ldyBkYXRhIGludG8gdGhpcyB0ZXh0dXJlLlxuICAgICAqL1xuICAgIEdMQ2F0VGV4dHVyZS5wcm90b3R5cGUuc2V0VGV4dHVyZSA9IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl9fdGV4dHVyZSk7XG4gICAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgc291cmNlKTtcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XG4gICAgICAgIHRoaXMuX193aWR0aCA9IHNvdXJjZS53aWR0aDtcbiAgICAgICAgdGhpcy5fX2hlaWdodCA9IHNvdXJjZS5oZWlnaHQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXQgbmV3IGRhdGEgaW50byB0aGlzIHRleHR1cmUuXG4gICAgICogVGhpcyBmdW5jdGlvbiB1c2VzIGBVaW50OEFycmF5YC4gSWYgeW91IHdhbnQgdG8gc291cmNlIGltYWdlIGRhdGEsIHVzZSBgR0xDYXQuc2V0VGV4dHVyZSgpYCBpbnN0ZWFkLlxuICAgICAqIE9yIHlvdSB3YW50IHRvIHVzZSBmbG9hdCB0ZXh0dXJlPyBUcnkgdGhpczogYEdMQ2F0LnNldFRleHR1cmVGcm9tRmxvYXRBcnJheSgpYFxuICAgICAqL1xuICAgIEdMQ2F0VGV4dHVyZS5wcm90b3R5cGUuc2V0VGV4dHVyZUZyb21BcnJheSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBzb3VyY2UsIGZvcm1hdCkge1xuICAgICAgICBpZiAoZm9ybWF0ID09PSB2b2lkIDApIHsgZm9ybWF0ID0gR0xfMS5HTC5SR0JBOyB9XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5fX3RleHR1cmUpO1xuICAgICAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGZvcm1hdCwgd2lkdGgsIGhlaWdodCwgMCwgZm9ybWF0LCBnbC5VTlNJR05FRF9CWVRFLCBzb3VyY2UpO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcbiAgICAgICAgdGhpcy5fX3dpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXQgbmV3IGRhdGEgaW50byB0aGlzIHRleHR1cmUuXG4gICAgICogVGhpcyBmdW5jdGlvbiB1c2VzIGBGbG9hdDMyQXJyYXlgLlxuICAgICAqIElmIHlvdSBjYW4ndCBncmFiIGBPRVNfdGV4dHVyZV9mbG9hdGAgZXh0ZW5zaW9uIGhlcmUsIHlvdSB3aWxsIGRpZSBhdCB0aGlzIHBvaW50LlxuICAgICAqL1xuICAgIEdMQ2F0VGV4dHVyZS5wcm90b3R5cGUuc2V0VGV4dHVyZUZyb21GbG9hdEFycmF5ID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIHNvdXJjZSwgZm9ybWF0KSB7XG4gICAgICAgIGlmIChmb3JtYXQgPT09IHZvaWQgMCkgeyBmb3JtYXQgPSBHTF8xLkdMLlJHQkE7IH1cbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xuICAgICAgICB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCdPRVNfdGV4dHVyZV9mbG9hdCcsIHRydWUpO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl9fdGV4dHVyZSk7XG4gICAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0LCAwLCBmb3JtYXQsIGdsLkZMT0FULCBzb3VyY2UpO1xuICAgICAgICBpZiAodGhpcy5fX2dsQ2F0LmdldEV4dGVuc2lvbignT0VTX3RleHR1cmVfZmxvYXRfbGluZWFyJykgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZUZpbHRlcihnbC5ORUFSRVNUKTtcbiAgICAgICAgfVxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcbiAgICAgICAgdGhpcy5fX3dpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDb3B5IHBpeGVscyBmcm9tIGN1cnJlbnQgZnJhbWVidWZmZXIgdG8gZ2l2ZW4gdGV4dHVyZS5cbiAgICAgKi9cbiAgICBHTENhdFRleHR1cmUucHJvdG90eXBlLmNvcHlUZXh0dXJlID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl9fdGV4dHVyZSk7XG4gICAgICAgIGdsLmNvcHlUZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIDAsIDAsIHdpZHRoLCBoZWlnaHQsIDApO1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcbiAgICAgICAgdGhpcy5fX3dpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXQgbmV3IGN1YmVtYXAgZGF0YSBpbnRvIHRoaXMgdGV4dHVyZS5cbiAgICAgKiBAcGFyYW0gdGV4dHVyZXMgQXJyYXkgb2YgaWFtZ2VzLiBPcmRlcjogYFgrYCwgYFgtYCwgYFkrYCwgYFktYCwgYForYCwgYFotYFxuICAgICAqIEB0b2RvIGR1ZSB0byBjb21wYXRpYmlsaXR5IG9mIGl0cyBgd2lkdGhgIGFuZCBgaGVpZ2h0YCBpdCBzaG91bGQgbm90IGJlIHVzZWQgeWV0XG4gICAgICovXG4gICAgR0xDYXRUZXh0dXJlLnByb3RvdHlwZS5zZXRDdWJlbWFwID0gZnVuY3Rpb24gKHRleHR1cmVzKSB7XG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV9DVUJFX01BUCwgdGhpcy5fX3RleHR1cmUpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1ggKyBpLCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCB0ZXh0dXJlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFX0NVQkVfTUFQLCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLkxJTkVBUik7XG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV9DVUJFX01BUCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5MSU5FQVIpO1xuICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfQ1VCRV9NQVAsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFX0NVQkVfTUFQLCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfQ1VCRV9NQVAsIG51bGwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0IFsgMCwgMCwgMCwgMCBdIHRvIHRoaXMgdGV4dHVyZS5cbiAgICAgKiBVc2VmdWwgZm9yIHRlbXBvcmFyeSB1c2UuLlxuICAgICAqL1xuICAgIEdMQ2F0VGV4dHVyZS5wcm90b3R5cGUuc2V0WmVyb1RleHR1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2V0VGV4dHVyZUZyb21BcnJheSgxLCAxLCB6ZXJvVGV4dHVyZUFycmF5KTtcbiAgICB9O1xuICAgIHJldHVybiBHTENhdFRleHR1cmU7XG59KCkpO1xuZXhwb3J0cy5HTENhdFRleHR1cmUgPSBHTENhdFRleHR1cmU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9HTFwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9HTENhdFwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9HTENhdEJ1ZmZlclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9HTENhdEZyYW1lYnVmZmVyXCIpKTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0dMQ2F0UHJvZ3JhbVwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9HTENhdFJlbmRlcmJ1ZmZlclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9HTENhdFNoYWRlclwiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9HTENhdFRleHR1cmVcIikpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==