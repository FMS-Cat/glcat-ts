/*!
 * @fms-cat/glcat-ts v0.8.0
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
/******/ 	var hotCurrentHash = "e0fe3ad645b5e2a4f0b7";
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
    /**
     * A dummy texture, 100% organic pure #FF00FF texture.
     */
    GLCat.prototype.dummyTexture = function () {
        if (this.__dummyTextureCache) {
            return this.__dummyTextureCache;
        }
        var texture = this.createTexture();
        if (texture === null) {
            throw GLCat.unexpectedNullDetectedError;
        }
        texture.setTextureFromArray(1, 1, new Uint8Array([255, 0, 255, 255]));
        this.__dummyTextureCache = texture;
        return texture;
    };
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
            throw GLCat.unexpectedNullDetectedError;
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
            throw GLCat.unexpectedNullDetectedError;
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
            throw GLCat.unexpectedNullDetectedError;
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
            throw GLCat.unexpectedNullDetectedError;
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
            throw GLCat.unexpectedNullDetectedError;
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
            return Promise.reject(GLCat.unexpectedNullDetectedError);
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
            return Promise.reject(GLCat.unexpectedNullDetectedError);
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
            return Promise.reject(GLCat.unexpectedNullDetectedError);
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
        var gl = this.__gl;
        if (program === null) {
            throw GLCat.unexpectedNullDetectedError;
        }
        gl.useProgram(program.raw);
    };
    /**
     * Create a new vertex buffer.
     */
    GLCat.prototype.createBuffer = function () {
        var gl = this.__gl;
        var buffer = gl.createBuffer();
        if (buffer === null) {
            throw GLCat.unexpectedNullDetectedError;
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
            throw GLCat.unexpectedNullDetectedError;
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
            throw GLCat.unexpectedNullDetectedError;
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
            throw GLCat.unexpectedNullDetectedError;
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
            throw GLCat.unexpectedNullDetectedError;
        }
        var renderbuffer = this.createRenderbuffer();
        if (renderbuffer === null) {
            framebuffer.dispose();
            throw GLCat.unexpectedNullDetectedError;
        }
        renderbuffer.init(width, height);
        framebuffer.attachRenderbuffer(renderbuffer);
        var texture = this.createTexture();
        if (texture === null) {
            framebuffer.dispose();
            renderbuffer.dispose();
            throw GLCat.unexpectedNullDetectedError;
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
            throw GLCat.unexpectedNullDetectedError;
        }
        var renderbuffer = this.createRenderbuffer();
        if (renderbuffer === null) {
            framebuffer.dispose();
            throw GLCat.unexpectedNullDetectedError;
        }
        renderbuffer.init(width, height);
        framebuffer.attachRenderbuffer(renderbuffer);
        for (var i = 0; i < numBuffers; i++) {
            var texture = this.createTexture();
            if (texture === null) {
                framebuffer.dispose();
                renderbuffer.dispose();
                throw GLCat.unexpectedNullDetectedError;
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
    GLCat.unexpectedNullDetectedError = new Error('GLCat: Unexpected null detected');
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
__export(__webpack_require__(/*! ./GLCatTexture */ "./src/GLCatTexture.ts"));


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvR0wudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dMQ2F0LnRzIiwid2VicGFjazovLy8uL3NyYy9HTENhdEJ1ZmZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR0xDYXRGcmFtZWJ1ZmZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR0xDYXRQcm9ncmFtLnRzIiwid2VicGFjazovLy8uL3NyYy9HTENhdFJlbmRlcmJ1ZmZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR0xDYXRTaGFkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dMQ2F0VGV4dHVyZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEdBQUc7O1FBRUg7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLDZCQUE2QjtRQUM3Qiw2QkFBNkI7UUFDN0I7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EscUJBQXFCLGdCQUFnQjtRQUNyQztRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLHFCQUFxQixnQkFBZ0I7UUFDckM7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsS0FBSzs7UUFFTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxLQUFLOztRQUVMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQSxrQkFBa0IsOEJBQThCO1FBQ2hEO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLElBQUk7UUFDSjtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQSxPQUFPO1FBQ1A7UUFDQTtRQUNBO1FBQ0E7UUFDQSxJQUFJO1FBQ0o7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLG9CQUFvQiwyQkFBMkI7UUFDL0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0EsbUJBQW1CLGNBQWM7UUFDakM7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQixLQUFLO1FBQ3JCO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsZ0JBQWdCLFlBQVk7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQSxjQUFjLDRCQUE0QjtRQUMxQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7O1FBRUo7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7UUFDQSxlQUFlLDRCQUE0QjtRQUMzQztRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBLGVBQWUsNEJBQTRCO1FBQzNDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoVGE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RCxvQkFBb0IsbUJBQU8sQ0FBQywyQ0FBZTtBQUMzQyx5QkFBeUIsbUJBQU8sQ0FBQyxxREFBb0I7QUFDckQscUJBQXFCLG1CQUFPLENBQUMsNkNBQWdCO0FBQzdDLDBCQUEwQixtQkFBTyxDQUFDLHVEQUFxQjtBQUN2RCxvQkFBb0IsbUJBQU8sQ0FBQywyQ0FBZTtBQUMzQyxxQkFBcUIsbUJBQU8sQ0FBQyw2Q0FBZ0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QywrQ0FBK0MsRUFBRTtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxpQkFBaUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsaUJBQWlCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxtQkFBbUI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxtQkFBbUI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxtQkFBbUI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHVCQUF1QjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyx1QkFBdUI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7O0FDL0thO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsU0FBUyxtQkFBTyxDQUFDLHlCQUFNO0FBQ3ZCLFNBQVMsbUJBQU8sQ0FBQywrQkFBUztBQUMxQixTQUFTLG1CQUFPLENBQUMsMkNBQWU7QUFDaEMsU0FBUyxtQkFBTyxDQUFDLHFEQUFvQjtBQUNyQyxTQUFTLG1CQUFPLENBQUMsNkNBQWdCO0FBQ2pDLFNBQVMsbUJBQU8sQ0FBQyx1REFBcUI7QUFDdEMsU0FBUyxtQkFBTyxDQUFDLDZDQUFnQiIsImZpbGUiOiJnbGNhdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gdGhpc1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR0aGlzW1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImUwZmUzYWQ2NDViNWUyYTRmMGI3XCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcImdsY2F0LmpzXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZShcIi4vc3JjL2luZGV4LnRzXCIpKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkdMID0ge1xyXG4gICAgQUNUSVZFX0FUVFJJQlVURVM6IDM1NzIxLFxyXG4gICAgQUNUSVZFX0FUVFJJQlVURV9NQVhfTEVOR1RIOiAzNTcyMixcclxuICAgIEFDVElWRV9URVhUVVJFOiAzNDAxNixcclxuICAgIEFDVElWRV9VTklGT1JNUzogMzU3MTgsXHJcbiAgICBBQ1RJVkVfVU5JRk9STV9NQVhfTEVOR1RIOiAzNTcxOSxcclxuICAgIEFMSUFTRURfTElORV9XSURUSF9SQU5HRTogMzM5MDIsXHJcbiAgICBBTElBU0VEX1BPSU5UX1NJWkVfUkFOR0U6IDMzOTAxLFxyXG4gICAgQUxQSEE6IDY0MDYsXHJcbiAgICBBTFBIQV9CSVRTOiAzNDEzLFxyXG4gICAgQUxXQVlTOiA1MTksXHJcbiAgICBBUlJBWV9CVUZGRVI6IDM0OTYyLFxyXG4gICAgQVJSQVlfQlVGRkVSX0JJTkRJTkc6IDM0OTY0LFxyXG4gICAgQVRUQUNIRURfU0hBREVSUzogMzU3MTcsXHJcbiAgICBCQUNLOiAxMDI5LFxyXG4gICAgQkxFTkQ6IDMwNDIsXHJcbiAgICBCTEVORF9DT0xPUjogMzI3NzMsXHJcbiAgICBCTEVORF9EU1RfQUxQSEE6IDMyOTcwLFxyXG4gICAgQkxFTkRfRFNUX1JHQjogMzI5NjgsXHJcbiAgICBCTEVORF9FUVVBVElPTjogMzI3NzcsXHJcbiAgICBCTEVORF9FUVVBVElPTl9BTFBIQTogMzQ4NzcsXHJcbiAgICBCTEVORF9FUVVBVElPTl9SR0I6IDMyNzc3LFxyXG4gICAgQkxFTkRfU1JDX0FMUEhBOiAzMjk3MSxcclxuICAgIEJMRU5EX1NSQ19SR0I6IDMyOTY5LFxyXG4gICAgQkxVRV9CSVRTOiAzNDEyLFxyXG4gICAgQk9PTDogMzU2NzAsXHJcbiAgICBCT09MX1ZFQzI6IDM1NjcxLFxyXG4gICAgQk9PTF9WRUMzOiAzNTY3MixcclxuICAgIEJPT0xfVkVDNDogMzU2NzMsXHJcbiAgICBCUk9XU0VSX0RFRkFVTFRfV0VCR0w6IDM3NDQ0LFxyXG4gICAgQlVGRkVSX1NJWkU6IDM0NjYwLFxyXG4gICAgQlVGRkVSX1VTQUdFOiAzNDY2MSxcclxuICAgIEJZVEU6IDUxMjAsXHJcbiAgICBDQ1c6IDIzMDUsXHJcbiAgICBDTEFNUF9UT19FREdFOiAzMzA3MSxcclxuICAgIENPTE9SX0FUVEFDSE1FTlQwOiAzNjA2NCxcclxuICAgIENPTE9SX0JVRkZFUl9CSVQ6IDE2Mzg0LFxyXG4gICAgQ09MT1JfQ0xFQVJfVkFMVUU6IDMxMDYsXHJcbiAgICBDT0xPUl9XUklURU1BU0s6IDMxMDcsXHJcbiAgICBDT01QSUxFX1NUQVRVUzogMzU3MTMsXHJcbiAgICBDT01QUkVTU0VEX1RFWFRVUkVfRk9STUFUUzogMzQ0NjcsXHJcbiAgICBDT05TVEFOVF9BTFBIQTogMzI3NzEsXHJcbiAgICBDT05TVEFOVF9DT0xPUjogMzI3NjksXHJcbiAgICBDT05URVhUX0xPU1RfV0VCR0w6IDM3NDQyLFxyXG4gICAgQ1VMTF9GQUNFOiAyODg0LFxyXG4gICAgQ1VMTF9GQUNFX01PREU6IDI4ODUsXHJcbiAgICBDVVJSRU5UX1BST0dSQU06IDM1NzI1LFxyXG4gICAgQ1VSUkVOVF9WRVJURVhfQVRUUklCOiAzNDM0MixcclxuICAgIENXOiAyMzA0LFxyXG4gICAgREVDUjogNzY4MyxcclxuICAgIERFQ1JfV1JBUDogMzQwNTYsXHJcbiAgICBERUxFVEVfU1RBVFVTOiAzNTcxMixcclxuICAgIERFUFRIX0FUVEFDSE1FTlQ6IDM2MDk2LFxyXG4gICAgREVQVEhfQklUUzogMzQxNCxcclxuICAgIERFUFRIX0JVRkZFUl9CSVQ6IDI1NixcclxuICAgIERFUFRIX0NMRUFSX1ZBTFVFOiAyOTMxLFxyXG4gICAgREVQVEhfQ09NUE9ORU5UOiA2NDAyLFxyXG4gICAgREVQVEhfQ09NUE9ORU5UMTY6IDMzMTg5LFxyXG4gICAgREVQVEhfRlVOQzogMjkzMixcclxuICAgIERFUFRIX1JBTkdFOiAyOTI4LFxyXG4gICAgREVQVEhfU1RFTkNJTDogMzQwNDEsXHJcbiAgICBERVBUSF9TVEVOQ0lMX0FUVEFDSE1FTlQ6IDMzMzA2LFxyXG4gICAgREVQVEhfVEVTVDogMjkyOSxcclxuICAgIERFUFRIX1dSSVRFTUFTSzogMjkzMCxcclxuICAgIERJVEhFUjogMzAyNCxcclxuICAgIERPTlRfQ0FSRTogNDM1MixcclxuICAgIERTVF9BTFBIQTogNzcyLFxyXG4gICAgRFNUX0NPTE9SOiA3NzQsXHJcbiAgICBEWU5BTUlDX0RSQVc6IDM1MDQ4LFxyXG4gICAgRUxFTUVOVF9BUlJBWV9CVUZGRVI6IDM0OTYzLFxyXG4gICAgRUxFTUVOVF9BUlJBWV9CVUZGRVJfQklORElORzogMzQ5NjUsXHJcbiAgICBFUVVBTDogNTE0LFxyXG4gICAgRkFTVEVTVDogNDM1MyxcclxuICAgIEZMT0FUOiA1MTI2LFxyXG4gICAgRkxPQVRfTUFUMjogMzU2NzQsXHJcbiAgICBGTE9BVF9NQVQzOiAzNTY3NSxcclxuICAgIEZMT0FUX01BVDQ6IDM1Njc2LFxyXG4gICAgRkxPQVRfVkVDMjogMzU2NjQsXHJcbiAgICBGTE9BVF9WRUMzOiAzNTY2NSxcclxuICAgIEZMT0FUX1ZFQzQ6IDM1NjY2LFxyXG4gICAgRlJBR01FTlRfU0hBREVSOiAzNTYzMixcclxuICAgIEZSQU1FQlVGRkVSOiAzNjE2MCxcclxuICAgIEZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfT0JKRUNUX05BTUU6IDM2MDQ5LFxyXG4gICAgRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9PQkpFQ1RfVFlQRTogMzYwNDgsXHJcbiAgICBGUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX1RFWFRVUkVfQ1VCRV9NQVBfRkFDRTogMzYwNTEsXHJcbiAgICBGUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX1RFWFRVUkVfTEVWRUw6IDM2MDUwLFxyXG4gICAgRlJBTUVCVUZGRVJfQklORElORzogMzYwMDYsXHJcbiAgICBGUkFNRUJVRkZFUl9DT01QTEVURTogMzYwNTMsXHJcbiAgICBGUkFNRUJVRkZFUl9JTkNPTVBMRVRFX0FUVEFDSE1FTlQ6IDM2MDU0LFxyXG4gICAgRlJBTUVCVUZGRVJfSU5DT01QTEVURV9ESU1FTlNJT05TOiAzNjA1NyxcclxuICAgIEZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTUlTU0lOR19BVFRBQ0hNRU5UOiAzNjA1NSxcclxuICAgIEZSQU1FQlVGRkVSX1VOU1VQUE9SVEVEOiAzNjA2MSxcclxuICAgIEZST05UOiAxMDI4LFxyXG4gICAgRlJPTlRfQU5EX0JBQ0s6IDEwMzIsXHJcbiAgICBGUk9OVF9GQUNFOiAyODg2LFxyXG4gICAgRlVOQ19BREQ6IDMyNzc0LFxyXG4gICAgRlVOQ19SRVZFUlNFX1NVQlRSQUNUOiAzMjc3OSxcclxuICAgIEZVTkNfU1VCVFJBQ1Q6IDMyNzc4LFxyXG4gICAgR0VORVJBVEVfTUlQTUFQX0hJTlQ6IDMzMTcwLFxyXG4gICAgR0VRVUFMOiA1MTgsXHJcbiAgICBHUkVBVEVSOiA1MTYsXHJcbiAgICBHUkVFTl9CSVRTOiAzNDExLFxyXG4gICAgSElHSF9GTE9BVDogMzYzMzgsXHJcbiAgICBISUdIX0lOVDogMzYzNDEsXHJcbiAgICBJTkNSOiA3NjgyLFxyXG4gICAgSU5DUl9XUkFQOiAzNDA1NSxcclxuICAgIElORk9fTE9HX0xFTkdUSDogMzU3MTYsXHJcbiAgICBJTlQ6IDUxMjQsXHJcbiAgICBJTlRfVkVDMjogMzU2NjcsXHJcbiAgICBJTlRfVkVDMzogMzU2NjgsXHJcbiAgICBJTlRfVkVDNDogMzU2NjksXHJcbiAgICBJTlZBTElEX0VOVU06IDEyODAsXHJcbiAgICBJTlZBTElEX0ZSQU1FQlVGRkVSX09QRVJBVElPTjogMTI4NixcclxuICAgIElOVkFMSURfT1BFUkFUSU9OOiAxMjgyLFxyXG4gICAgSU5WQUxJRF9WQUxVRTogMTI4MSxcclxuICAgIElOVkVSVDogNTM4NixcclxuICAgIEtFRVA6IDc2ODAsXHJcbiAgICBMRVFVQUw6IDUxNSxcclxuICAgIExFU1M6IDUxMyxcclxuICAgIExJTkVBUjogOTcyOSxcclxuICAgIExJTkVBUl9NSVBNQVBfTElORUFSOiA5OTg3LFxyXG4gICAgTElORUFSX01JUE1BUF9ORUFSRVNUOiA5OTg1LFxyXG4gICAgTElORVM6IDEsXHJcbiAgICBMSU5FX0xPT1A6IDIsXHJcbiAgICBMSU5FX1NUUklQOiAzLFxyXG4gICAgTElORV9XSURUSDogMjg0OSxcclxuICAgIExJTktfU1RBVFVTOiAzNTcxNCxcclxuICAgIExPV19GTE9BVDogMzYzMzYsXHJcbiAgICBMT1dfSU5UOiAzNjMzOSxcclxuICAgIExVTUlOQU5DRTogNjQwOSxcclxuICAgIExVTUlOQU5DRV9BTFBIQTogNjQxMCxcclxuICAgIE1BWF9DT01CSU5FRF9URVhUVVJFX0lNQUdFX1VOSVRTOiAzNTY2MSxcclxuICAgIE1BWF9DVUJFX01BUF9URVhUVVJFX1NJWkU6IDM0MDc2LFxyXG4gICAgTUFYX0ZSQUdNRU5UX1VOSUZPUk1fVkVDVE9SUzogMzYzNDksXHJcbiAgICBNQVhfUkVOREVSQlVGRkVSX1NJWkU6IDM0MDI0LFxyXG4gICAgTUFYX1RFWFRVUkVfSU1BR0VfVU5JVFM6IDM0OTMwLFxyXG4gICAgTUFYX1RFWFRVUkVfU0laRTogMzM3OSxcclxuICAgIE1BWF9WQVJZSU5HX1ZFQ1RPUlM6IDM2MzQ4LFxyXG4gICAgTUFYX1ZFUlRFWF9BVFRSSUJTOiAzNDkyMSxcclxuICAgIE1BWF9WRVJURVhfVEVYVFVSRV9JTUFHRV9VTklUUzogMzU2NjAsXHJcbiAgICBNQVhfVkVSVEVYX1VOSUZPUk1fVkVDVE9SUzogMzYzNDcsXHJcbiAgICBNQVhfVklFV1BPUlRfRElNUzogMzM4NixcclxuICAgIE1FRElVTV9GTE9BVDogMzYzMzcsXHJcbiAgICBNRURJVU1fSU5UOiAzNjM0MCxcclxuICAgIE1JUlJPUkVEX1JFUEVBVDogMzM2NDgsXHJcbiAgICBORUFSRVNUOiA5NzI4LFxyXG4gICAgTkVBUkVTVF9NSVBNQVBfTElORUFSOiA5OTg2LFxyXG4gICAgTkVBUkVTVF9NSVBNQVBfTkVBUkVTVDogOTk4NCxcclxuICAgIE5FVkVSOiA1MTIsXHJcbiAgICBOSUNFU1Q6IDQzNTQsXHJcbiAgICBOT05FOiAwLFxyXG4gICAgTk9URVFVQUw6IDUxNyxcclxuICAgIE5PX0VSUk9SOiAwLFxyXG4gICAgTlVNX0NPTVBSRVNTRURfVEVYVFVSRV9GT1JNQVRTOiAzNDQ2NixcclxuICAgIE9ORTogMSxcclxuICAgIE9ORV9NSU5VU19DT05TVEFOVF9BTFBIQTogMzI3NzIsXHJcbiAgICBPTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1I6IDMyNzcwLFxyXG4gICAgT05FX01JTlVTX0RTVF9BTFBIQTogNzczLFxyXG4gICAgT05FX01JTlVTX0RTVF9DT0xPUjogNzc1LFxyXG4gICAgT05FX01JTlVTX1NSQ19BTFBIQTogNzcxLFxyXG4gICAgT05FX01JTlVTX1NSQ19DT0xPUjogNzY5LFxyXG4gICAgT1VUX09GX01FTU9SWTogMTI4NSxcclxuICAgIFBBQ0tfQUxJR05NRU5UOiAzMzMzLFxyXG4gICAgUE9JTlRTOiAwLFxyXG4gICAgUE9MWUdPTl9PRkZTRVRfRkFDVE9SOiAzMjgyNCxcclxuICAgIFBPTFlHT05fT0ZGU0VUX0ZJTEw6IDMyODIzLFxyXG4gICAgUE9MWUdPTl9PRkZTRVRfVU5JVFM6IDEwNzUyLFxyXG4gICAgUkVEX0JJVFM6IDM0MTAsXHJcbiAgICBSRU5ERVJCVUZGRVI6IDM2MTYxLFxyXG4gICAgUkVOREVSQlVGRkVSX0FMUEhBX1NJWkU6IDM2MTc5LFxyXG4gICAgUkVOREVSQlVGRkVSX0JJTkRJTkc6IDM2MDA3LFxyXG4gICAgUkVOREVSQlVGRkVSX0JMVUVfU0laRTogMzYxNzgsXHJcbiAgICBSRU5ERVJCVUZGRVJfREVQVEhfU0laRTogMzYxODAsXHJcbiAgICBSRU5ERVJCVUZGRVJfR1JFRU5fU0laRTogMzYxNzcsXHJcbiAgICBSRU5ERVJCVUZGRVJfSEVJR0hUOiAzNjE2MyxcclxuICAgIFJFTkRFUkJVRkZFUl9JTlRFUk5BTF9GT1JNQVQ6IDM2MTY0LFxyXG4gICAgUkVOREVSQlVGRkVSX1JFRF9TSVpFOiAzNjE3NixcclxuICAgIFJFTkRFUkJVRkZFUl9TVEVOQ0lMX1NJWkU6IDM2MTgxLFxyXG4gICAgUkVOREVSQlVGRkVSX1dJRFRIOiAzNjE2MixcclxuICAgIFJFTkRFUkVSOiA3OTM3LFxyXG4gICAgUkVQRUFUOiAxMDQ5NyxcclxuICAgIFJFUExBQ0U6IDc2ODEsXHJcbiAgICBSR0I6IDY0MDcsXHJcbiAgICBSR0I1X0ExOiAzMjg1NSxcclxuICAgIFJHQjU2NTogMzYxOTQsXHJcbiAgICBSR0JBOiA2NDA4LFxyXG4gICAgUkdCQTQ6IDMyODU0LFxyXG4gICAgU0FNUExFUl8yRDogMzU2NzgsXHJcbiAgICBTQU1QTEVSX0NVQkU6IDM1NjgwLFxyXG4gICAgU0FNUExFUzogMzI5MzcsXHJcbiAgICBTQU1QTEVfQUxQSEFfVE9fQ09WRVJBR0U6IDMyOTI2LFxyXG4gICAgU0FNUExFX0JVRkZFUlM6IDMyOTM2LFxyXG4gICAgU0FNUExFX0NPVkVSQUdFOiAzMjkyOCxcclxuICAgIFNBTVBMRV9DT1ZFUkFHRV9JTlZFUlQ6IDMyOTM5LFxyXG4gICAgU0FNUExFX0NPVkVSQUdFX1ZBTFVFOiAzMjkzOCxcclxuICAgIFNDSVNTT1JfQk9YOiAzMDg4LFxyXG4gICAgU0NJU1NPUl9URVNUOiAzMDg5LFxyXG4gICAgU0hBREVSX0NPTVBJTEVSOiAzNjM0NixcclxuICAgIFNIQURFUl9TT1VSQ0VfTEVOR1RIOiAzNTcyMCxcclxuICAgIFNIQURFUl9UWVBFOiAzNTY2MyxcclxuICAgIFNIQURJTkdfTEFOR1VBR0VfVkVSU0lPTjogMzU3MjQsXHJcbiAgICBTSE9SVDogNTEyMixcclxuICAgIFNSQ19BTFBIQTogNzcwLFxyXG4gICAgU1JDX0FMUEhBX1NBVFVSQVRFOiA3NzYsXHJcbiAgICBTUkNfQ09MT1I6IDc2OCxcclxuICAgIFNUQVRJQ19EUkFXOiAzNTA0NCxcclxuICAgIFNURU5DSUxfQVRUQUNITUVOVDogMzYxMjgsXHJcbiAgICBTVEVOQ0lMX0JBQ0tfRkFJTDogMzQ4MTcsXHJcbiAgICBTVEVOQ0lMX0JBQ0tfRlVOQzogMzQ4MTYsXHJcbiAgICBTVEVOQ0lMX0JBQ0tfUEFTU19ERVBUSF9GQUlMOiAzNDgxOCxcclxuICAgIFNURU5DSUxfQkFDS19QQVNTX0RFUFRIX1BBU1M6IDM0ODE5LFxyXG4gICAgU1RFTkNJTF9CQUNLX1JFRjogMzYwMDMsXHJcbiAgICBTVEVOQ0lMX0JBQ0tfVkFMVUVfTUFTSzogMzYwMDQsXHJcbiAgICBTVEVOQ0lMX0JBQ0tfV1JJVEVNQVNLOiAzNjAwNSxcclxuICAgIFNURU5DSUxfQklUUzogMzQxNSxcclxuICAgIFNURU5DSUxfQlVGRkVSX0JJVDogMTAyNCxcclxuICAgIFNURU5DSUxfQ0xFQVJfVkFMVUU6IDI5NjEsXHJcbiAgICBTVEVOQ0lMX0ZBSUw6IDI5NjQsXHJcbiAgICBTVEVOQ0lMX0ZVTkM6IDI5NjIsXHJcbiAgICBTVEVOQ0lMX0lOREVYOiA2NDAxLFxyXG4gICAgU1RFTkNJTF9JTkRFWDg6IDM2MTY4LFxyXG4gICAgU1RFTkNJTF9QQVNTX0RFUFRIX0ZBSUw6IDI5NjUsXHJcbiAgICBTVEVOQ0lMX1BBU1NfREVQVEhfUEFTUzogMjk2NixcclxuICAgIFNURU5DSUxfUkVGOiAyOTY3LFxyXG4gICAgU1RFTkNJTF9URVNUOiAyOTYwLFxyXG4gICAgU1RFTkNJTF9WQUxVRV9NQVNLOiAyOTYzLFxyXG4gICAgU1RFTkNJTF9XUklURU1BU0s6IDI5NjgsXHJcbiAgICBTVFJFQU1fRFJBVzogMzUwNDAsXHJcbiAgICBTVUJQSVhFTF9CSVRTOiAzNDA4LFxyXG4gICAgVEVYVFVSRTogNTg5MCxcclxuICAgIFRFWFRVUkUwOiAzMzk4NCxcclxuICAgIFRFWFRVUkUxOiAzMzk4NSxcclxuICAgIFRFWFRVUkUyOiAzMzk4NixcclxuICAgIFRFWFRVUkUzOiAzMzk4NyxcclxuICAgIFRFWFRVUkU0OiAzMzk4OCxcclxuICAgIFRFWFRVUkU1OiAzMzk4OSxcclxuICAgIFRFWFRVUkU2OiAzMzk5MCxcclxuICAgIFRFWFRVUkU3OiAzMzk5MSxcclxuICAgIFRFWFRVUkU4OiAzMzk5MixcclxuICAgIFRFWFRVUkU5OiAzMzk5MyxcclxuICAgIFRFWFRVUkUxMDogMzM5OTQsXHJcbiAgICBURVhUVVJFMTE6IDMzOTk1LFxyXG4gICAgVEVYVFVSRTEyOiAzMzk5NixcclxuICAgIFRFWFRVUkUxMzogMzM5OTcsXHJcbiAgICBURVhUVVJFMTQ6IDMzOTk4LFxyXG4gICAgVEVYVFVSRTE1OiAzMzk5OSxcclxuICAgIFRFWFRVUkUxNjogMzQwMDAsXHJcbiAgICBURVhUVVJFMTc6IDM0MDAxLFxyXG4gICAgVEVYVFVSRTE4OiAzNDAwMixcclxuICAgIFRFWFRVUkUxOTogMzQwMDMsXHJcbiAgICBURVhUVVJFMjA6IDM0MDA0LFxyXG4gICAgVEVYVFVSRTIxOiAzNDAwNSxcclxuICAgIFRFWFRVUkUyMjogMzQwMDYsXHJcbiAgICBURVhUVVJFMjM6IDM0MDA3LFxyXG4gICAgVEVYVFVSRTI0OiAzNDAwOCxcclxuICAgIFRFWFRVUkUyNTogMzQwMDksXHJcbiAgICBURVhUVVJFMjY6IDM0MDEwLFxyXG4gICAgVEVYVFVSRTI3OiAzNDAxMSxcclxuICAgIFRFWFRVUkUyODogMzQwMTIsXHJcbiAgICBURVhUVVJFMjk6IDM0MDEzLFxyXG4gICAgVEVYVFVSRTMwOiAzNDAxNCxcclxuICAgIFRFWFRVUkUzMTogMzQwMTUsXHJcbiAgICBURVhUVVJFXzJEOiAzNTUzLFxyXG4gICAgVEVYVFVSRV9CSU5ESU5HXzJEOiAzMjg3MyxcclxuICAgIFRFWFRVUkVfQklORElOR19DVUJFX01BUDogMzQwNjgsXHJcbiAgICBURVhUVVJFX0NVQkVfTUFQOiAzNDA2NyxcclxuICAgIFRFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWDogMzQwNzAsXHJcbiAgICBURVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1k6IDM0MDcyLFxyXG4gICAgVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9aOiAzNDA3NCxcclxuICAgIFRFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWDogMzQwNjksXHJcbiAgICBURVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1k6IDM0MDcxLFxyXG4gICAgVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9aOiAzNDA3MyxcclxuICAgIFRFWFRVUkVfTUFHX0ZJTFRFUjogMTAyNDAsXHJcbiAgICBURVhUVVJFX01JTl9GSUxURVI6IDEwMjQxLFxyXG4gICAgVEVYVFVSRV9XUkFQX1M6IDEwMjQyLFxyXG4gICAgVEVYVFVSRV9XUkFQX1Q6IDEwMjQzLFxyXG4gICAgVFJJQU5HTEVTOiA0LFxyXG4gICAgVFJJQU5HTEVfRkFOOiA2LFxyXG4gICAgVFJJQU5HTEVfU1RSSVA6IDUsXHJcbiAgICBVTlBBQ0tfQUxJR05NRU5UOiAzMzE3LFxyXG4gICAgVU5QQUNLX0NPTE9SU1BBQ0VfQ09OVkVSU0lPTl9XRUJHTDogMzc0NDMsXHJcbiAgICBVTlBBQ0tfRkxJUF9ZX1dFQkdMOiAzNzQ0MCxcclxuICAgIFVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTDogMzc0NDEsXHJcbiAgICBVTlNJR05FRF9CWVRFOiA1MTIxLFxyXG4gICAgVU5TSUdORURfSU5UOiA1MTI1LFxyXG4gICAgVU5TSUdORURfU0hPUlQ6IDUxMjMsXHJcbiAgICBVTlNJR05FRF9TSE9SVF80XzRfNF80OiAzMjgxOSxcclxuICAgIFVOU0lHTkVEX1NIT1JUXzVfNV81XzE6IDMyODIwLFxyXG4gICAgVU5TSUdORURfU0hPUlRfNV82XzU6IDMzNjM1LFxyXG4gICAgVkFMSURBVEVfU1RBVFVTOiAzNTcxNSxcclxuICAgIFZFTkRPUjogNzkzNixcclxuICAgIFZFUlNJT046IDc5MzgsXHJcbiAgICBWRVJURVhfQVRUUklCX0FSUkFZX0JVRkZFUl9CSU5ESU5HOiAzNDk3NSxcclxuICAgIFZFUlRFWF9BVFRSSUJfQVJSQVlfRU5BQkxFRDogMzQzMzgsXHJcbiAgICBWRVJURVhfQVRUUklCX0FSUkFZX05PUk1BTElaRUQ6IDM0OTIyLFxyXG4gICAgVkVSVEVYX0FUVFJJQl9BUlJBWV9QT0lOVEVSOiAzNDM3MyxcclxuICAgIFZFUlRFWF9BVFRSSUJfQVJSQVlfU0laRTogMzQzMzksXHJcbiAgICBWRVJURVhfQVRUUklCX0FSUkFZX1NUUklERTogMzQzNDAsXHJcbiAgICBWRVJURVhfQVRUUklCX0FSUkFZX1RZUEU6IDM0MzQxLFxyXG4gICAgVkVSVEVYX1NIQURFUjogMzU2MzMsXHJcbiAgICBWSUVXUE9SVDogMjk3OCxcclxuICAgIFpFUk86IDBcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIEdMQ2F0QnVmZmVyXzEgPSByZXF1aXJlKFwiLi9HTENhdEJ1ZmZlclwiKTtcclxudmFyIEdMQ2F0RnJhbWVidWZmZXJfMSA9IHJlcXVpcmUoXCIuL0dMQ2F0RnJhbWVidWZmZXJcIik7XHJcbnZhciBHTENhdFByb2dyYW1fMSA9IHJlcXVpcmUoXCIuL0dMQ2F0UHJvZ3JhbVwiKTtcclxudmFyIEdMQ2F0UmVuZGVyYnVmZmVyXzEgPSByZXF1aXJlKFwiLi9HTENhdFJlbmRlcmJ1ZmZlclwiKTtcclxudmFyIEdMQ2F0U2hhZGVyXzEgPSByZXF1aXJlKFwiLi9HTENhdFNoYWRlclwiKTtcclxudmFyIEdMQ2F0VGV4dHVyZV8xID0gcmVxdWlyZShcIi4vR0xDYXRUZXh0dXJlXCIpO1xyXG4vKipcclxuICogV2ViR0wgd3JhcHBlciB3aXRoIHBsZW50eSBvZiBoYWNrYWJpbGl0eS5cclxuICovXHJcbnZhciBHTENhdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IGluc3RhbmNlLlxyXG4gICAgICogV2ViR0xSZW5kZXJpbmdDb250ZXh0IGlzIHJlcXVpcmVkLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBHTENhdChnbCkge1xyXG4gICAgICAgIHRoaXMuX19leHRlbnNpb25DYWNoZSA9IHt9O1xyXG4gICAgICAgIHRoaXMuX19nbCA9IGdsO1xyXG4gICAgICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcclxuICAgICAgICBnbC5kZXB0aEZ1bmMoZ2wuTEVRVUFMKTtcclxuICAgICAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xyXG4gICAgICAgIGdsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdMQ2F0LnByb3RvdHlwZSwgXCJyZW5kZXJpbmdDb250ZXh0XCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJdHMgb3duIFdlYkdMUmVuZGVyaW5nQ29udGV4dC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19nbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdC5wcm90b3R5cGUsIFwiZ2xcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEl0cyBvd24gV2ViR0xSZW5kZXJpbmdDb250ZXh0LiBTaG9ydGVyIHRoYW4gW1tHTENhdC5yZW5kZXJpbmdDb250ZXh0XV1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19nbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIC8qKlxyXG4gICAgICogQSBkdW1teSB0ZXh0dXJlLCAxMDAlIG9yZ2FuaWMgcHVyZSAjRkYwMEZGIHRleHR1cmUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0LnByb3RvdHlwZS5kdW1teVRleHR1cmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX19kdW1teVRleHR1cmVDYWNoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2R1bW15VGV4dHVyZUNhY2hlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdGV4dHVyZSA9IHRoaXMuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgIGlmICh0ZXh0dXJlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KDEsIDEsIG5ldyBVaW50OEFycmF5KFsyNTUsIDAsIDI1NSwgMjU1XSkpO1xyXG4gICAgICAgIHRoaXMuX19kdW1teVRleHR1cmVDYWNoZSA9IHRleHR1cmU7XHJcbiAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZSBhbiBleHRlbnNpb24uXHJcbiAgICAgKiBJZiB0aGV5IGlzIHlvdXIgcHJlY2lvdXMgb25lIGFuZCB5b3UgY2Fubm90IGxpdmUgd2l0aG91dCBoaW0sIHR1cm4gb24gYHRocm93SWZOb3RGb3VuZGAuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0LnByb3RvdHlwZS5nZXRFeHRlbnNpb24gPSBmdW5jdGlvbiAobmFtZSwgdGhyb3dJZk5vdEZvdW5kKSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsO1xyXG4gICAgICAgIGlmICh0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbbmFtZV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19leHRlbnNpb25DYWNoZVtuYW1lXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX19leHRlbnNpb25DYWNoZVtuYW1lXSA9IGdsLmdldEV4dGVuc2lvbihuYW1lKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX19leHRlbnNpb25DYWNoZVtuYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19leHRlbnNpb25DYWNoZVtuYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aHJvd0lmTm90Rm91bmQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dMQ2F0LmdldEV4dGVuc2lvbjogVGhlIGV4dGVuc2lvbiBcIicgKyBuYW1lICsgJ1wiIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmUgZXh0ZW5zaW9ucy5cclxuICAgICAqIElmIHRoZXkgYXJlIHlvdXIgcHJlY2lvdXMgb25lcyBhbmQgeW91IGNhbm5vdCBsaXZlIHdpdGhvdXQgdGhlbSwgdHVybiBvbiBgdGhyb3dJZk5vdEZvdW5kYC5cclxuICAgICAqL1xyXG4gICAgR0xDYXQucHJvdG90eXBlLmdldEV4dGVuc2lvbnMgPSBmdW5jdGlvbiAobmFtZXMsIHRocm93SWZOb3RGb3VuZCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5hbWVzLm1hcChmdW5jdGlvbiAobikgeyByZXR1cm4gX3RoaXMuZ2V0RXh0ZW5zaW9uKG4sIHRocm93SWZOb3RGb3VuZCk7IH0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IHNoYWRlciBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0LnByb3RvdHlwZS5jcmVhdGVTaGFkZXIgPSBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbDtcclxuICAgICAgICB2YXIgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpO1xyXG4gICAgICAgIGlmIChzaGFkZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgR0xDYXQudW5leHBlY3RlZE51bGxEZXRlY3RlZEVycm9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IEdMQ2F0U2hhZGVyXzEuR0xDYXRTaGFkZXIodGhpcywgc2hhZGVyKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBHTENhdCBwcm9ncmFtIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgR0xDYXQucHJvdG90eXBlLmNyZWF0ZVByb2dyYW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsO1xyXG4gICAgICAgIHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xyXG4gICAgICAgIGlmIChwcm9ncmFtID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHTENhdFByb2dyYW1fMS5HTENhdFByb2dyYW0odGhpcywgcHJvZ3JhbSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgR0xDYXQgcHJvZ3JhbSBvYmplY3QsIGluIGxhemllciB3YXkuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0LnByb3RvdHlwZS5sYXp5UHJvZ3JhbSA9IGZ1bmN0aW9uICh2ZXJ0LCBmcmFnKSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsO1xyXG4gICAgICAgIC8vID09IHZlcnQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgIHZhciB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcclxuICAgICAgICBpZiAodmVydGV4U2hhZGVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmVydGV4U2hhZGVyLmNvbXBpbGUodmVydCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHZlcnRleFNoYWRlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vID09IGZyYWcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgIHZhciBmcmFnbWVudFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XHJcbiAgICAgICAgaWYgKGZyYWdtZW50U2hhZGVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZlcnRleFNoYWRlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRocm93IEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZnJhZ21lbnRTaGFkZXIuY29tcGlsZShmcmFnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdmVydGV4U2hhZGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgZnJhZ21lbnRTaGFkZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA9PSBwcm9ncmFtID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICB2YXIgcHJvZ3JhbSA9IHRoaXMuY3JlYXRlUHJvZ3JhbSgpO1xyXG4gICAgICAgIGlmIChwcm9ncmFtID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZlcnRleFNoYWRlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIGZyYWdtZW50U2hhZGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgdGhyb3cgR0xDYXQudW5leHBlY3RlZE51bGxEZXRlY3RlZEVycm9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBwcm9ncmFtLmxpbmsodmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHZlcnRleFNoYWRlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIGZyYWdtZW50U2hhZGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgcHJvZ3JhbS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9ncmFtO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IHByb2dyYW0gb2JqZWN0LCBpbiBsYXppZXIgd2F5LlxyXG4gICAgICogSXQncyBnb25uYSBiZSBhc3luY2hyb25vdXMgaWYgeW91IGhhdmUgdGhlIEtIUl9wYXJhbGxlbF9zaGFkZXJfY29tcGlsZSBleHRlbnNpb24gc3VwcG9ydC5cclxuICAgICAqL1xyXG4gICAgR0xDYXQucHJvdG90eXBlLmxhenlQcm9ncmFtQXN5bmMgPSBmdW5jdGlvbiAodmVydCwgZnJhZykge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbDtcclxuICAgICAgICAvLyA9PSB2ZXJ0ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICB2YXIgdmVydGV4U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XHJcbiAgICAgICAgaWYgKHZlcnRleFNoYWRlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoR0xDYXQudW5leHBlY3RlZE51bGxEZXRlY3RlZEVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmVydGV4U2hhZGVyLmNvbXBpbGUodmVydCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHZlcnRleFNoYWRlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gPT0gZnJhZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgdmFyIGZyYWdtZW50U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcclxuICAgICAgICBpZiAoZnJhZ21lbnRTaGFkZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdmVydGV4U2hhZGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZyYWdtZW50U2hhZGVyLmNvbXBpbGUoZnJhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHZlcnRleFNoYWRlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIGZyYWdtZW50U2hhZGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyA9PSBwcm9ncmFtID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICB2YXIgcHJvZ3JhbSA9IHRoaXMuY3JlYXRlUHJvZ3JhbSgpO1xyXG4gICAgICAgIGlmIChwcm9ncmFtID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZlcnRleFNoYWRlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIGZyYWdtZW50U2hhZGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9ncmFtLmxpbmtBc3luYyh2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHByb2dyYW07XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmVydGV4U2hhZGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgZnJhZ21lbnRTaGFkZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICBwcm9ncmFtLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZnkgYSBwcm9ncmFtIHRvIHVzZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXQucHJvdG90eXBlLnVzZVByb2dyYW0gPSBmdW5jdGlvbiAocHJvZ3JhbSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbDtcclxuICAgICAgICBpZiAocHJvZ3JhbSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbS5yYXcpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IHZlcnRleCBidWZmZXIuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0LnByb3RvdHlwZS5jcmVhdGVCdWZmZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsO1xyXG4gICAgICAgIHZhciBidWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgICBpZiAoYnVmZmVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHTENhdEJ1ZmZlcl8xLkdMQ2F0QnVmZmVyKHRoaXMsIGJ1ZmZlcik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgdGV4dHVyZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXQucHJvdG90eXBlLmNyZWF0ZVRleHR1cmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsO1xyXG4gICAgICAgIHZhciB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgIGlmICh0ZXh0dXJlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHTENhdFRleHR1cmVfMS5HTENhdFRleHR1cmUodGhpcywgdGV4dHVyZSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgcmVuZGVyYnVmZmVyLlxyXG4gICAgICovXHJcbiAgICBHTENhdC5wcm90b3R5cGUuY3JlYXRlUmVuZGVyYnVmZmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbDtcclxuICAgICAgICB2YXIgcmVuZGVyYnVmZmVyID0gZ2wuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XHJcbiAgICAgICAgaWYgKHJlbmRlcmJ1ZmZlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgR0xDYXRSZW5kZXJidWZmZXJfMS5HTENhdFJlbmRlcmJ1ZmZlcih0aGlzLCByZW5kZXJidWZmZXIpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IGZyYW1lYnVmZmVyLlxyXG4gICAgICogVE9ETzogRHJhd0J1ZmZlcnNcclxuICAgICAqL1xyXG4gICAgR0xDYXQucHJvdG90eXBlLmNyZWF0ZUZyYW1lYnVmZmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbDtcclxuICAgICAgICB2YXIgZnJhbWVidWZmZXIgPSBnbC5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xyXG4gICAgICAgIGlmIChmcmFtZWJ1ZmZlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgR0xDYXRGcmFtZWJ1ZmZlcl8xLkdMQ2F0RnJhbWVidWZmZXIodGhpcywgZnJhbWVidWZmZXIpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IGZyYW1lYnVmZXIsIGluIGxhemllciB3YXkuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0LnByb3RvdHlwZS5sYXp5RnJhbWVidWZmZXIgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgaXNGbG9hdCkge1xyXG4gICAgICAgIGlmIChpc0Zsb2F0ID09PSB2b2lkIDApIHsgaXNGbG9hdCA9IGZhbHNlOyB9XHJcbiAgICAgICAgdmFyIGZyYW1lYnVmZmVyID0gdGhpcy5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xyXG4gICAgICAgIGlmIChmcmFtZWJ1ZmZlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZW5kZXJidWZmZXIgPSB0aGlzLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xyXG4gICAgICAgIGlmIChyZW5kZXJidWZmZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgZnJhbWVidWZmZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aHJvdyBHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlbmRlcmJ1ZmZlci5pbml0KHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFJlbmRlcmJ1ZmZlcihyZW5kZXJidWZmZXIpO1xyXG4gICAgICAgIHZhciB0ZXh0dXJlID0gdGhpcy5jcmVhdGVUZXh0dXJlKCk7XHJcbiAgICAgICAgaWYgKHRleHR1cmUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgZnJhbWVidWZmZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICByZW5kZXJidWZmZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aHJvdyBHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0Zsb2F0KSB7XHJcbiAgICAgICAgICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21GbG9hdEFycmF5KHdpZHRoLCBoZWlnaHQsIG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KHdpZHRoLCBoZWlnaHQsIG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hUZXh0dXJlKHRleHR1cmUpO1xyXG4gICAgICAgIHJldHVybiBmcmFtZWJ1ZmZlcjtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBkcmF3IGJ1ZmZlcnMsIGluIGxhemllciB3YXkuXHJcbiAgICAgKiBJZiB5b3UgY2FuJ3QgZ3JhYiBgV0VCR0xfZHJhd19idWZmZXJzYCBleHRlbnNpb24sIHlvdSdsbCBkaWUgaW5zdGFudGx5IGF0IHRoaXMgcG9pbnQuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0LnByb3RvdHlwZS5sYXp5RHJhd2J1ZmZlcnMgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgbnVtQnVmZmVycywgaXNGbG9hdCkge1xyXG4gICAgICAgIGlmIChpc0Zsb2F0ID09PSB2b2lkIDApIHsgaXNGbG9hdCA9IGZhbHNlOyB9XHJcbiAgICAgICAgdmFyIGV4dCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCdXRUJHTF9kcmF3X2J1ZmZlcnMnLCB0cnVlKTtcclxuICAgICAgICBpZiAoZXh0Lk1BWF9EUkFXX0JVRkZFUlNfV0VCR0wgPCBudW1CdWZmZXJzKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdHTENhdDogTWF4aW11bSBkcmF3IGJ1ZmZlcnMgY291bnQgZXhjZWVkZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZyYW1lYnVmZmVyID0gdGhpcy5jcmVhdGVGcmFtZWJ1ZmZlcigpO1xyXG4gICAgICAgIGlmIChmcmFtZWJ1ZmZlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZW5kZXJidWZmZXIgPSB0aGlzLmNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xyXG4gICAgICAgIGlmIChyZW5kZXJidWZmZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgZnJhbWVidWZmZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aHJvdyBHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlbmRlcmJ1ZmZlci5pbml0KHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFJlbmRlcmJ1ZmZlcihyZW5kZXJidWZmZXIpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtQnVmZmVyczsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0dXJlID0gdGhpcy5jcmVhdGVUZXh0dXJlKCk7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0dXJlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmcmFtZWJ1ZmZlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJidWZmZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgR0xDYXQudW5leHBlY3RlZE51bGxEZXRlY3RlZEVycm9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc0Zsb2F0KSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tRmxvYXRBcnJheSh3aWR0aCwgaGVpZ2h0LCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21BcnJheSh3aWR0aCwgaGVpZ2h0LCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hUZXh0dXJlKHRleHR1cmUsIGV4dC5DT0xPUl9BVFRBQ0hNRU5UMF9XRUJHTCArIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZnJhbWVidWZmZXI7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsIHRoaXMgYmVmb3JlIHlvdSdyZSBnb25uYSB1c2UgZHJhdyBidWZmZXJzLlxyXG4gICAgICogSWYgeW91IGNhbid0IGdyYWIgYFdFQkdMX2RyYXdfYnVmZmVyc2AgZXh0ZW5zaW9uLCB5b3UnbGwgZGllIGluc3RhbnRseSBhdCB0aGlzIHBvaW50LlxyXG4gICAgICovXHJcbiAgICBHTENhdC5wcm90b3R5cGUuZHJhd0J1ZmZlcnMgPSBmdW5jdGlvbiAobnVtQnVmZmVycykge1xyXG4gICAgICAgIHZhciBleHQgPSB0aGlzLmdldEV4dGVuc2lvbignV0VCR0xfZHJhd19idWZmZXJzJywgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobnVtQnVmZmVycykpIHtcclxuICAgICAgICAgICAgZXh0LmRyYXdCdWZmZXJzV0VCR0wobnVtQnVmZmVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1CdWZmZXJzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gZXh0LkNPTE9SX0FUVEFDSE1FTlQwX1dFQkdMICsgaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBleHQuZHJhd0J1ZmZlcnNXRUJHTChhcnJheSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ2xlYXIgdGhlIGN1cnJlbnQgZnJhbWVidWZmZXIuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIChyZWQsIGdyZWVuLCBibHVlLCBhbHBoYSwgZGVwdGgpIHtcclxuICAgICAgICBpZiAocmVkID09PSB2b2lkIDApIHsgcmVkID0gMC4wOyB9XHJcbiAgICAgICAgaWYgKGdyZWVuID09PSB2b2lkIDApIHsgZ3JlZW4gPSAwLjA7IH1cclxuICAgICAgICBpZiAoYmx1ZSA9PT0gdm9pZCAwKSB7IGJsdWUgPSAwLjA7IH1cclxuICAgICAgICBpZiAoYWxwaGEgPT09IHZvaWQgMCkgeyBhbHBoYSA9IDEuMDsgfVxyXG4gICAgICAgIGlmIChkZXB0aCA9PT0gdm9pZCAwKSB7IGRlcHRoID0gMS4wOyB9XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsO1xyXG4gICAgICAgIGdsLmNsZWFyQ29sb3IocmVkLCBncmVlbiwgYmx1ZSwgYWxwaGEpO1xyXG4gICAgICAgIGdsLmNsZWFyRGVwdGgoZGVwdGgpO1xyXG4gICAgICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQgfCBnbC5ERVBUSF9CVUZGRVJfQklUKTtcclxuICAgIH07XHJcbiAgICBHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3IgPSBuZXcgRXJyb3IoJ0dMQ2F0OiBVbmV4cGVjdGVkIG51bGwgZGV0ZWN0ZWQnKTtcclxuICAgIHJldHVybiBHTENhdDtcclxufSgpKTtcclxuZXhwb3J0cy5HTENhdCA9IEdMQ2F0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgR0xfMSA9IHJlcXVpcmUoXCIuL0dMXCIpO1xyXG4vKipcclxuICogSXQncyBhIFdlYkdMQnVmZmVyLlxyXG4gKi9cclxudmFyIEdMQ2F0QnVmZmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRCdWZmZXIgaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEdMQ2F0QnVmZmVyKGdsQ2F0LCBidWZmZXIpIHtcclxuICAgICAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcclxuICAgICAgICB0aGlzLl9fYnVmZmVyID0gYnVmZmVyO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdMQ2F0QnVmZmVyLnByb3RvdHlwZSwgXCJidWZmZXJcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEl0cyBvd24gYnVmZmVyLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2J1ZmZlcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdEJ1ZmZlci5wcm90b3R5cGUsIFwicmF3XCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJdHMgb3duIGJ1ZmZlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRCdWZmZXIuYnVmZmVyXV0uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fYnVmZmVyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBidWZmZXIuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0QnVmZmVyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX19nbENhdC5nbC5kZWxldGVCdWZmZXIodGhpcy5fX2J1ZmZlcik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgbmV3IGRhdGEgaW50byB0aGlzIGJ1ZmZlci5cclxuICAgICAqL1xyXG4gICAgR0xDYXRCdWZmZXIucHJvdG90eXBlLnNldFZlcnRleGJ1ZmZlciA9IGZ1bmN0aW9uIChzb3VyY2UsIHVzYWdlKSB7XHJcbiAgICAgICAgaWYgKHVzYWdlID09PSB2b2lkIDApIHsgdXNhZ2UgPSBHTF8xLkdMLlNUQVRJQ19EUkFXOyB9XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLl9fYnVmZmVyKTtcclxuICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgc291cmNlLCB1c2FnZSk7XHJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2V0IG5ldyBpbmRleCBkYXRhIGludG8gdGhpcyBidWZmZXIuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0QnVmZmVyLnByb3RvdHlwZS5zZXRJbmRleGJ1ZmZlciA9IGZ1bmN0aW9uIChzb3VyY2UsIHVzYWdlKSB7XHJcbiAgICAgICAgaWYgKHVzYWdlID09PSB2b2lkIDApIHsgdXNhZ2UgPSBHTF8xLkdMLlNUQVRJQ19EUkFXOyB9XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuX19idWZmZXIpO1xyXG4gICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHNvdXJjZSwgdXNhZ2UpO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG51bGwpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBHTENhdEJ1ZmZlcjtcclxufSgpKTtcclxuZXhwb3J0cy5HTENhdEJ1ZmZlciA9IEdMQ2F0QnVmZmVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgR0xfMSA9IHJlcXVpcmUoXCIuL0dMXCIpO1xyXG4vKipcclxuICogSXQncyBhIFdlYkdMRnJhbWVidWZmZXIuXHJcbiAqL1xyXG52YXIgR0xDYXRGcmFtZWJ1ZmZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0RnJhbWVidWZmZXIgaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEdMQ2F0RnJhbWVidWZmZXIoZ2xDYXQsIGZyYW1lYnVmZmVyKSB7XHJcbiAgICAgICAgdGhpcy5fX3JlbmRlcmJ1ZmZlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fX3RleHR1cmVNYXAgPSB7fTtcclxuICAgICAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcclxuICAgICAgICB0aGlzLl9fZnJhbWVidWZmZXIgPSBmcmFtZWJ1ZmZlcjtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdEZyYW1lYnVmZmVyLnByb3RvdHlwZSwgXCJmcmFtZWJ1ZmZlclwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSXRzIG93biBmcmFtZWJ1ZmZlci5cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19mcmFtZWJ1ZmZlcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdEZyYW1lYnVmZmVyLnByb3RvdHlwZSwgXCJyYXdcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEl0cyBvd24gZnJhbWVidWZmZXIuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0RnJhbWVidWZmZXIuZnJhbWVidWZmZXJdXVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2ZyYW1lYnVmZmVyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdMQ2F0RnJhbWVidWZmZXIucHJvdG90eXBlLCBcInJlbmRlcmJ1ZmZlclwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSXRzIGF0dGFjaGVkIHJlbmRlcmJ1ZmZlci5cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19yZW5kZXJidWZmZXI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR0xDYXRGcmFtZWJ1ZmZlci5wcm90b3R5cGUsIFwidGV4dHVyZVwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSXRzIGF0dGFjaGVkIHRleHR1cmUuXHJcbiAgICAgICAgICogSWYgeW91IHdhbnQgdG8gcmV0cmlldmUgb3RoZXIgdGhhbiBgQ09MT1JfQVRUQUNITUVOVDBgLCB0cnkgW1tHTENhdEZyYW1lYnVmZmVyLmdldFRleHR1cmVdXSBpbnN0ZWFkLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3RleHR1cmVNYXBbR0xfMS5HTC5DT0xPUl9BVFRBQ0hNRU5UMF07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIGZyYW1lYnVmZmVyLlxyXG4gICAgICovXHJcbiAgICBHTENhdEZyYW1lYnVmZmVyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKGFsc29BdHRhY2hlZCkge1xyXG4gICAgICAgIGlmIChhbHNvQXR0YWNoZWQgPT09IHZvaWQgMCkgeyBhbHNvQXR0YWNoZWQgPSBmYWxzZTsgfVxyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcclxuICAgICAgICBnbC5kZWxldGVGcmFtZWJ1ZmZlcih0aGlzLl9fZnJhbWVidWZmZXIpO1xyXG4gICAgICAgIGlmIChhbHNvQXR0YWNoZWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX19yZW5kZXJidWZmZXIpIHtcclxuICAgICAgICAgICAgICAgIGdsLmRlbGV0ZVJlbmRlcmJ1ZmZlcih0aGlzLl9fcmVuZGVyYnVmZmVyLnJhdyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLl9fdGV4dHVyZU1hcCkuZm9yRWFjaChmdW5jdGlvbiAodGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgZ2wuZGVsZXRlVGV4dHVyZSh0ZXh0dXJlLnJhdyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlIGl0cyBhdHRhY2hlZCB0ZXh0dXJlLlxyXG4gICAgICovXHJcbiAgICBHTENhdEZyYW1lYnVmZmVyLnByb3RvdHlwZS5nZXRUZXh0dXJlID0gZnVuY3Rpb24gKGF0dGFjaG1lbnQpIHtcclxuICAgICAgICBpZiAoYXR0YWNobWVudCA9PT0gdm9pZCAwKSB7IGF0dGFjaG1lbnQgPSBHTF8xLkdMLkNPTE9SX0FUVEFDSE1FTlQwOyB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX190ZXh0dXJlTWFwW2F0dGFjaG1lbnRdO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGEgcmVuZGVyYnVmZmVyIHRvIHRoaXMgZnJhbWVidWZmZXIuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0RnJhbWVidWZmZXIucHJvdG90eXBlLmF0dGFjaFJlbmRlcmJ1ZmZlciA9IGZ1bmN0aW9uIChyZW5kZXJidWZmZXIsIGF0dGFjaG1lbnQpIHtcclxuICAgICAgICBpZiAoYXR0YWNobWVudCA9PT0gdm9pZCAwKSB7IGF0dGFjaG1lbnQgPSBHTF8xLkdMLkRFUFRIX0FUVEFDSE1FTlQ7IH1cclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XHJcbiAgICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCB0aGlzLl9fZnJhbWVidWZmZXIpO1xyXG4gICAgICAgIGdsLmZyYW1lYnVmZmVyUmVuZGVyYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBhdHRhY2htZW50LCBnbC5SRU5ERVJCVUZGRVIsIHJlbmRlcmJ1ZmZlci5yYXcpO1xyXG4gICAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5fX3JlbmRlcmJ1ZmZlciA9IHJlbmRlcmJ1ZmZlcjtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhIHRleHR1cmUgdG8gdGhpcyBmcmFtZWJ1ZmZlci5cclxuICAgICAqL1xyXG4gICAgR0xDYXRGcmFtZWJ1ZmZlci5wcm90b3R5cGUuYXR0YWNoVGV4dHVyZSA9IGZ1bmN0aW9uICh0ZXh0dXJlLCBhdHRhY2htZW50KSB7XHJcbiAgICAgICAgaWYgKGF0dGFjaG1lbnQgPT09IHZvaWQgMCkgeyBhdHRhY2htZW50ID0gR0xfMS5HTC5DT0xPUl9BVFRBQ0hNRU5UMDsgfVxyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcclxuICAgICAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIHRoaXMuX19mcmFtZWJ1ZmZlcik7XHJcbiAgICAgICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoZ2wuRlJBTUVCVUZGRVIsIGF0dGFjaG1lbnQsIGdsLlRFWFRVUkVfMkQsIHRleHR1cmUucmF3LCAwKTtcclxuICAgICAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG51bGwpO1xyXG4gICAgICAgIHRoaXMuX190ZXh0dXJlTWFwW2F0dGFjaG1lbnRdID0gdGV4dHVyZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gR0xDYXRGcmFtZWJ1ZmZlcjtcclxufSgpKTtcclxuZXhwb3J0cy5HTENhdEZyYW1lYnVmZmVyID0gR0xDYXRGcmFtZWJ1ZmZlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX3NwcmVhZEFycmF5cyA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheXMpIHx8IGZ1bmN0aW9uICgpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBHTF8xID0gcmVxdWlyZShcIi4vR0xcIik7XHJcbi8qKlxyXG4gKiBJdCdzIGEgV2ViR0xQcm9ncmFtLCBidXQgaGFzIGNhY2hlIG9mIHZhcmlhYmxlIGxvY2F0aW9ucy5cclxuICovXHJcbnZhciBHTENhdFByb2dyYW0gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBHTENhdFByb2dyYW0gaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEdMQ2F0UHJvZ3JhbShnbENhdCwgcHJvZ3JhbSkge1xyXG4gICAgICAgIHRoaXMuX19zaGFkZXJzID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9fYXR0cmliTG9jYXRpb25DYWNoZSA9IHt9O1xyXG4gICAgICAgIHRoaXMuX191bmlmb3JtTG9jYXRpb25DYWNoZSA9IHt9O1xyXG4gICAgICAgIHRoaXMuX191bmlmb3JtVGV4dHVyZVVuaXRNYXAgPSB7fTtcclxuICAgICAgICB0aGlzLl9fdW5pZm9ybXRleHR1cmVVbml0SW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuX19saW5rZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcclxuICAgICAgICB0aGlzLl9fcHJvZ3JhbSA9IHByb2dyYW07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR0xDYXRQcm9ncmFtLnByb3RvdHlwZSwgXCJwcm9ncmFtXCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJdHMgb3duIHByb2dyYW0uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcHJvZ3JhbTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdFByb2dyYW0ucHJvdG90eXBlLCBcInJhd1wiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSXRzIG93biBwcm9ncmFtLiBTaG9ydGVyIHRoYW4gW1tHTENhdFByb2dyYW0ucHJvZ3JhbV1dLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3Byb2dyYW07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR0xDYXRQcm9ncmFtLnByb3RvdHlwZSwgXCJzaGFkZXJzXCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJdHMgc2hhZGVycy5cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19zaGFkZXJzID8gdGhpcy5fX3NoYWRlcnMuY29uY2F0KCkgOiBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUsIFwiaXNMaW5rZWRcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFdoZXRoZXIgdGhlIGxhc3QgbGluayBvcGVyYXRpb24gd2FzIHN1Y2Nlc3NmdWwgb3Igbm90LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2xpbmtlZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgcHJvZ3JhbS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKGFsc29BdHRhY2hlZCkge1xyXG4gICAgICAgIGlmIChhbHNvQXR0YWNoZWQgPT09IHZvaWQgMCkgeyBhbHNvQXR0YWNoZWQgPSBmYWxzZTsgfVxyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcclxuICAgICAgICBnbC5kZWxldGVQcm9ncmFtKHRoaXMuX19wcm9ncmFtKTtcclxuICAgICAgICBpZiAoYWxzb0F0dGFjaGVkKSB7XHJcbiAgICAgICAgICAgIHZhciBzaGFkZXJzID0gdGhpcy5zaGFkZXJzO1xyXG4gICAgICAgICAgICBpZiAoc2hhZGVycykge1xyXG4gICAgICAgICAgICAgICAgc2hhZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChzaGFkZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaGFkZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggc2hhZGVycyBhbmQgbGluayB0aGlzIHByb2dyYW0uXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBzaGFkZXJzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgc2hhZGVyc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XHJcbiAgICAgICAgc2hhZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChzaGFkZXIpIHsgcmV0dXJuIGdsLmF0dGFjaFNoYWRlcihfdGhpcy5fX3Byb2dyYW0sIHNoYWRlci5yYXcpOyB9KTtcclxuICAgICAgICBnbC5saW5rUHJvZ3JhbSh0aGlzLl9fcHJvZ3JhbSk7XHJcbiAgICAgICAgdGhpcy5fX2xpbmtlZCA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5fX3Byb2dyYW0sIGdsLkxJTktfU1RBVFVTKTtcclxuICAgICAgICBpZiAoIXRoaXMuX19saW5rZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFByb2dyYW1JbmZvTG9nKHRoaXMuX19wcm9ncmFtKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX19zaGFkZXJzID0gc2hhZGVycy5jb25jYXQoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBzaGFkZXJzIGFuZCBsaW5rIHRoaXMgcHJvZ3JhbS5cclxuICAgICAqIEl0J3MgZ29ubmEgYmUgYXN5bmNocm9ub3VzIGlmIHlvdSBoYXZlIHRoZSBLSFJfcGFyYWxsZWxfc2hhZGVyX2NvbXBpbGUgZXh0ZW5zaW9uIHN1cHBvcnQuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUubGlua0FzeW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHNoYWRlcnMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBzaGFkZXJzW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBnbENhdCA9IHRoaXMuX19nbENhdDtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XHJcbiAgICAgICAgdmFyIGV4dFBhcmFsbGVsID0gZ2xDYXQuZ2V0RXh0ZW5zaW9uKCdLSFJfcGFyYWxsZWxfc2hhZGVyX2NvbXBpbGUnKTtcclxuICAgICAgICBzaGFkZXJzLmZvckVhY2goZnVuY3Rpb24gKHNoYWRlcikgeyByZXR1cm4gZ2wuYXR0YWNoU2hhZGVyKF90aGlzLl9fcHJvZ3JhbSwgc2hhZGVyLnJhdyk7IH0pO1xyXG4gICAgICAgIGdsLmxpbmtQcm9ncmFtKHRoaXMuX19wcm9ncmFtKTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICB2YXIgdXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFleHRQYXJhbGxlbCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGdsLmdldFByb2dyYW1QYXJhbWV0ZXIoX3RoaXMuX19wcm9ncmFtLCBleHRQYXJhbGxlbC5DT01QTEVUSU9OX1NUQVRVU19LSFIpID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX19saW5rZWQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKF90aGlzLl9fcHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMuX19saW5rZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGdsLmdldFByb2dyYW1JbmZvTG9nKF90aGlzLl9fcHJvZ3JhbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9fc2hhZGVycyA9IHNoYWRlcnMuY29uY2F0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB1cGRhdGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhbiBhdHRyaWJ1dGUgdmFyaWFibGUuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdmFyaWFibGVcclxuICAgICAqIEBwYXJhbSBidWZmZXIgVmVydGV4IGJ1ZmZlci4gQ2FuIGJlIG51bGwsIHRvIGRpc2FibGUgYXR0cmlidXRlIGFycmF5XHJcbiAgICAgKiBAcGFyYW0gc2l6ZSBOdW1iZXIgb2YgY29tcG9uZW50cyBwZXIgdmVydGV4LiBNdXN0IGJlIDEsIDIsIDMgb3IgNFxyXG4gICAgICovXHJcbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLmF0dHJpYnV0ZSA9IGZ1bmN0aW9uIChuYW1lLCBidWZmZXIsIHNpemUsIGRpdmlzb3IsIHR5cGUsIHN0cmlkZSwgb2Zmc2V0KSB7XHJcbiAgICAgICAgaWYgKHNpemUgPT09IHZvaWQgMCkgeyBzaXplID0gMTsgfVxyXG4gICAgICAgIGlmIChkaXZpc29yID09PSB2b2lkIDApIHsgZGl2aXNvciA9IDA7IH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gdm9pZCAwKSB7IHR5cGUgPSBHTF8xLkdMLkZMT0FUOyB9XHJcbiAgICAgICAgaWYgKHN0cmlkZSA9PT0gdm9pZCAwKSB7IHN0cmlkZSA9IDA7IH1cclxuICAgICAgICBpZiAob2Zmc2V0ID09PSB2b2lkIDApIHsgb2Zmc2V0ID0gMDsgfVxyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcclxuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldEF0dHJpYkxvY2F0aW9uKG5hbWUpO1xyXG4gICAgICAgIGlmIChsb2NhdGlvbiA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYnVmZmVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlci5yYXcpO1xyXG4gICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uKTtcclxuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY2F0aW9uLCBzaXplLCB0eXBlLCBmYWxzZSwgc3RyaWRlLCBvZmZzZXQpO1xyXG4gICAgICAgIHZhciBleHQgPSB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJyk7XHJcbiAgICAgICAgaWYgKGV4dCkge1xyXG4gICAgICAgICAgICBleHQudmVydGV4QXR0cmliRGl2aXNvckFOR0xFKGxvY2F0aW9uLCBkaXZpc29yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0gdmFyaWFibGUuXHJcbiAgICAgKiBTZWUgYWxzbzogW1tHTENhdFByb2dyYW0udW5pZm9ybVZlY3Rvcl1dXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybSA9IGZ1bmN0aW9uIChuYW1lLCB0eXBlKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFsdWVbX2kgLSAyXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmdW5jID0gdGhpc1sndW5pZm9ybScgKyB0eXBlXTtcclxuICAgICAgICBmdW5jLmNhbGwuYXBwbHkoZnVuYywgX19zcHJlYWRBcnJheXMoW3RoaXMsIG5hbWVdLCB2YWx1ZSkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0gdmFyaWFibGUuXHJcbiAgICAgKiBTZWUgYWxzbzogW1tHTENhdFByb2dyYW0udW5pZm9ybV1dXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybVZlY3RvciA9IGZ1bmN0aW9uIChuYW1lLCB0eXBlLCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciBmdW5jID0gdGhpc1sndW5pZm9ybScgKyB0eXBlXTtcclxuICAgICAgICBmdW5jLmNhbGwodGhpcywgbmFtZSwgdmFsdWUpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0xaSB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtMWkgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTFpKGxvY2F0aW9uLCB2YWx1ZSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybTJpIHZhcmlhYmxlLlxyXG4gICAgICovXHJcbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLnVuaWZvcm0yaSA9IGZ1bmN0aW9uIChuYW1lLCB4LCB5KSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xyXG4gICAgICAgIGdsLnVuaWZvcm0yaShsb2NhdGlvbiwgeCwgeSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybTNpIHZhcmlhYmxlLlxyXG4gICAgICovXHJcbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLnVuaWZvcm0zaSA9IGZ1bmN0aW9uIChuYW1lLCB4LCB5LCB6KSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xyXG4gICAgICAgIGdsLnVuaWZvcm0zaShsb2NhdGlvbiwgeCwgeSwgeik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybTRpIHZhcmlhYmxlLlxyXG4gICAgICovXHJcbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLnVuaWZvcm00aSA9IGZ1bmN0aW9uIChuYW1lLCB4LCB5LCB6LCB3KSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xyXG4gICAgICAgIGdsLnVuaWZvcm00aShsb2NhdGlvbiwgeCwgeSwgeiwgdyk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybTFpdiB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtMWl2ID0gZnVuY3Rpb24gKG5hbWUsIGFycmF5KSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xyXG4gICAgICAgIGdsLnVuaWZvcm0xaXYobG9jYXRpb24sIGFycmF5KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhbiB1bmlmb3JtMml2IHZhcmlhYmxlLlxyXG4gICAgICovXHJcbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLnVuaWZvcm0yaXYgPSBmdW5jdGlvbiAobmFtZSwgYXJyYXkpIHtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTJpdihsb2NhdGlvbiwgYXJyYXkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0zaXYgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTNpdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcclxuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbihuYW1lKTtcclxuICAgICAgICBnbC51bmlmb3JtM2l2KGxvY2F0aW9uLCBhcnJheSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybTRpdiB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtNGl2ID0gZnVuY3Rpb24gKG5hbWUsIGFycmF5KSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xyXG4gICAgICAgIGdsLnVuaWZvcm00aXYobG9jYXRpb24sIGFycmF5KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhbiB1bmlmb3JtMWYgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTFmID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xyXG4gICAgICAgIGdsLnVuaWZvcm0xZihsb2NhdGlvbiwgdmFsdWUpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0yZiB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtMmYgPSBmdW5jdGlvbiAobmFtZSwgeCwgeSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcclxuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbihuYW1lKTtcclxuICAgICAgICBnbC51bmlmb3JtMmYobG9jYXRpb24sIHgsIHkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0zZiB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtM2YgPSBmdW5jdGlvbiAobmFtZSwgeCwgeSwgeikge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcclxuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbihuYW1lKTtcclxuICAgICAgICBnbC51bmlmb3JtM2YobG9jYXRpb24sIHgsIHksIHopO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm00ZiB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtNGYgPSBmdW5jdGlvbiAobmFtZSwgeCwgeSwgeiwgdykge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcclxuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbihuYW1lKTtcclxuICAgICAgICBnbC51bmlmb3JtNGYobG9jYXRpb24sIHgsIHksIHosIHcpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0xZnYgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTFmdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcclxuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbihuYW1lKTtcclxuICAgICAgICBnbC51bmlmb3JtMWZ2KGxvY2F0aW9uLCBhcnJheSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybTJmdiB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtMmZ2ID0gZnVuY3Rpb24gKG5hbWUsIGFycmF5KSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xyXG4gICAgICAgIGdsLnVuaWZvcm0yZnYobG9jYXRpb24sIGFycmF5KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhbiB1bmlmb3JtM2Z2IHZhcmlhYmxlLlxyXG4gICAgICovXHJcbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLnVuaWZvcm0zZnYgPSBmdW5jdGlvbiAobmFtZSwgYXJyYXkpIHtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTNmdihsb2NhdGlvbiwgYXJyYXkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm00ZnYgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTRmdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcclxuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbihuYW1lKTtcclxuICAgICAgICBnbC51bmlmb3JtNGZ2KGxvY2F0aW9uLCBhcnJheSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDJmdiB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtTWF0cml4MmZ2ID0gZnVuY3Rpb24gKG5hbWUsIGFycmF5LCB0cmFuc3Bvc2UpIHtcclxuICAgICAgICBpZiAodHJhbnNwb3NlID09PSB2b2lkIDApIHsgdHJhbnNwb3NlID0gZmFsc2U7IH1cclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDJmdihsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDNmdiB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtTWF0cml4M2Z2ID0gZnVuY3Rpb24gKG5hbWUsIGFycmF5LCB0cmFuc3Bvc2UpIHtcclxuICAgICAgICBpZiAodHJhbnNwb3NlID09PSB2b2lkIDApIHsgdHJhbnNwb3NlID0gZmFsc2U7IH1cclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDNmdihsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDRmdiB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtTWF0cml4NGZ2ID0gZnVuY3Rpb24gKG5hbWUsIGFycmF5LCB0cmFuc3Bvc2UpIHtcclxuICAgICAgICBpZiAodHJhbnNwb3NlID09PSB2b2lkIDApIHsgdHJhbnNwb3NlID0gZmFsc2U7IH1cclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdihsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYSBgc2FtcGxlcjJEYCB0eXBlIHVuaWZvcm0gdGV4dHVyZS5cclxuICAgICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIHVuaWZvcm0gdGV4dHVyZVxyXG4gICAgICogQHBhcmFtIHRleHR1cmUgVGV4dHVyZSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtVGV4dHVyZSA9IGZ1bmN0aW9uIChuYW1lLCB0ZXh0dXJlKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcclxuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbihuYW1lKTtcclxuICAgICAgICB2YXIgdW5pdCA9IHRoaXMuZ2V0VW5pZm9ybVRleHR1cmVVbml0KG5hbWUpO1xyXG4gICAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyB1bml0KTtcclxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCAoKF9hID0gdGV4dHVyZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJhdykgfHwgbnVsbCk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTFpKGxvY2F0aW9uLCB1bml0KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhIGBzYW1wbGVyQ3ViZWAgdHlwZSB1bmlmb3JtIHRleHR1cmUuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSB1bmlmb3JtIHRleHR1cmVcclxuICAgICAqIEBwYXJhbSB0ZXh0dXJlIFRleHR1cmUgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybUN1YmVtYXAgPSBmdW5jdGlvbiAobmFtZSwgdGV4dHVyZSkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgdmFyIHVuaXQgPSB0aGlzLmdldFVuaWZvcm1UZXh0dXJlVW5pdChuYW1lKTtcclxuICAgICAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwICsgdW5pdCk7XHJcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV9DVUJFX01BUCwgKChfYSA9IHRleHR1cmUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yYXcpIHx8IG51bGwpO1xyXG4gICAgICAgIGdsLnVuaWZvcm0xaShsb2NhdGlvbiwgdW5pdCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZSBhdHRyaWJ1dGUgbG9jYXRpb24uXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUuZ2V0QXR0cmliTG9jYXRpb24gPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcclxuICAgICAgICBpZiAodGhpcy5fX2F0dHJpYkxvY2F0aW9uQ2FjaGVbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2F0dHJpYkxvY2F0aW9uQ2FjaGVbbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLl9fcHJvZ3JhbSwgbmFtZSk7XHJcbiAgICAgICAgICAgIC8vIGlmICggbG9jYXRpb24gPT09IC0xICkge1xyXG4gICAgICAgICAgICAvLyAgIHRoaXMuZ2xDYXQuc3BpdCggJ0dMQ2F0UHJvZ3JhbS5nZXRBdHRyaWJMb2NhdGlvbjogQ291bGQgbm90IHJldHJpZXZlIGF0dHJpYnV0ZSBsb2NhdGlvbicgKTtcclxuICAgICAgICAgICAgLy8gICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgdGhpcy5fX2F0dHJpYkxvY2F0aW9uQ2FjaGVbbmFtZV0gPSBsb2NhdGlvbjtcclxuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlIHVuaWZvcm0gbG9jYXRpb24uXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUuZ2V0VW5pZm9ybUxvY2F0aW9uID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XHJcbiAgICAgICAgaWYgKHRoaXMuX191bmlmb3JtTG9jYXRpb25DYWNoZVtuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fdW5pZm9ybUxvY2F0aW9uQ2FjaGVbbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5fX3Byb2dyYW0sIG5hbWUpO1xyXG4gICAgICAgICAgICAvLyBpZiAoIGxvY2F0aW9uID09PSBudWxsICkge1xyXG4gICAgICAgICAgICAvLyAgIHRoaXMuZ2xDYXQuc3BpdCggJ0dMQ2F0UHJvZ3JhbS5nZXRVbmlmb3JtTG9jYXRpb246IENvdWxkIG5vdCByZXRyaWV2ZSB1bmlmb3JtIGxvY2F0aW9uJyApO1xyXG4gICAgICAgICAgICAvLyAgIHJldHVybiBsb2NhdGlvbjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB0aGlzLl9fdW5pZm9ybUxvY2F0aW9uQ2FjaGVbbmFtZV0gPSBsb2NhdGlvbjtcclxuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlIG9yIGNyZWF0ZSBhIHRleHR1cmUgdW5pdCB0aGF0IGNvcnJlc3BvbmRzIHRvIGdpdmVuIG5hbWUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUuZ2V0VW5pZm9ybVRleHR1cmVVbml0ID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5fX3VuaWZvcm1UZXh0dXJlVW5pdE1hcFtuYW1lXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX191bmlmb3JtVGV4dHVyZVVuaXRNYXBbbmFtZV0gPSB0aGlzLl9fdW5pZm9ybXRleHR1cmVVbml0SW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMuX191bmlmb3JtdGV4dHVyZVVuaXRJbmRleCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fX3VuaWZvcm1UZXh0dXJlVW5pdE1hcFtuYW1lXTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gR0xDYXRQcm9ncmFtO1xyXG59KCkpO1xyXG5leHBvcnRzLkdMQ2F0UHJvZ3JhbSA9IEdMQ2F0UHJvZ3JhbTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIEdMXzEgPSByZXF1aXJlKFwiLi9HTFwiKTtcclxuLyoqXHJcbiAqIEl0J3MgYSBXZWJHTFJlbmRlcmJ1ZmZlci5cclxuICovXHJcbnZhciBHTENhdFJlbmRlcmJ1ZmZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0VGV4dHVyZSBpbnN0YW5jZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gR0xDYXRSZW5kZXJidWZmZXIoZ2xDYXQsIHJlbmRlcmJ1ZmZlcikge1xyXG4gICAgICAgIHRoaXMuX193aWR0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fX2hlaWdodCA9IDA7XHJcbiAgICAgICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XHJcbiAgICAgICAgdGhpcy5fX3JlbmRlcmJ1ZmZlciA9IHJlbmRlcmJ1ZmZlcjtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdFJlbmRlcmJ1ZmZlci5wcm90b3R5cGUsIFwicmVuZGVyYnVmZmVyXCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJdHMgb3duIHJlbmRlcmJ1ZmZlci5cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19yZW5kZXJidWZmZXI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR0xDYXRSZW5kZXJidWZmZXIucHJvdG90eXBlLCBcInJhd1wiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSXRzIG93biByZW5kZXJidWZmZXIuIFNob3J0ZXIgdGhhbiBbW0dMQ2F0UmVuZGVyQnVmZmVyLnJlbmRlcmJ1ZmZlcl1dLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3JlbmRlcmJ1ZmZlcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdFJlbmRlcmJ1ZmZlci5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEl0cyB3aWR0aC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX193aWR0aDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdFJlbmRlcmJ1ZmZlci5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJdHMgaGVpZ2h0LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2hlaWdodDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgcmVuZGVyYnVmZmVyLlxyXG4gICAgICovXHJcbiAgICBHTENhdFJlbmRlcmJ1ZmZlci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9fZ2xDYXQuZ2wuZGVsZXRlUmVuZGVyYnVmZmVyKHRoaXMuX19yZW5kZXJidWZmZXIpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIHJlbmRlcmJ1ZmZlci5cclxuICAgICAqIElmIGBmb3JtYXRgIGlzIG5vdCBnaXZlbiwgaXQgd2lsbCBiZSBpbml0aWFsaXplZCBhcyBgREVQVEhfQ09NUE9ORU5UMTZgIC5cclxuICAgICAqL1xyXG4gICAgR0xDYXRSZW5kZXJidWZmZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgZm9ybWF0KSB7XHJcbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gdm9pZCAwKSB7IGZvcm1hdCA9IEdMXzEuR0wuREVQVEhfQ09NUE9ORU5UMTY7IH1cclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XHJcbiAgICAgICAgZ2wuYmluZFJlbmRlcmJ1ZmZlcihnbC5SRU5ERVJCVUZGRVIsIHRoaXMuX19yZW5kZXJidWZmZXIpO1xyXG4gICAgICAgIGdsLnJlbmRlcmJ1ZmZlclN0b3JhZ2UoZ2wuUkVOREVSQlVGRkVSLCBmb3JtYXQsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIGdsLmJpbmRSZW5kZXJidWZmZXIoZ2wuUkVOREVSQlVGRkVSLCBudWxsKTtcclxuICAgICAgICB0aGlzLl9fd2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9faGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBHTENhdFJlbmRlcmJ1ZmZlcjtcclxufSgpKTtcclxuZXhwb3J0cy5HTENhdFJlbmRlcmJ1ZmZlciA9IEdMQ2F0UmVuZGVyYnVmZmVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vKipcclxuICogSXQncyBhIFdlYkdMU2hhZGVyLlxyXG4gKi9cclxudmFyIEdMQ2F0U2hhZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRTaGFkZXIgaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEdMQ2F0U2hhZGVyKGdsQ2F0LCBzaGFkZXIpIHtcclxuICAgICAgICB0aGlzLl9fY29tcGlsZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcclxuICAgICAgICB0aGlzLl9fc2hhZGVyID0gc2hhZGVyO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdMQ2F0U2hhZGVyLnByb3RvdHlwZSwgXCJzaGFkZXJcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEl0cyBvd24gc2hhZGVyLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3NoYWRlcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdFNoYWRlci5wcm90b3R5cGUsIFwicmF3XCIsIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJdHMgb3duIHNoYWRlci4gU2hvcnRlciB0aGFuIFtbR0xDYXRTaGFkZXIuc2hhZGVyXV0uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fc2hhZGVyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBzaGFkZXIuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0U2hhZGVyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX19nbENhdC5nbC5kZWxldGVTaGFkZXIodGhpcy5fX3NoYWRlcik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gd2hldGhlciB0aGUgbGFzdCBjb21waWxhdGlvbiB3YXMgc3VjY2Vzc2Z1bCBvciBub3QuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0U2hhZGVyLnByb3RvdHlwZS5pc0NvbXBpbGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9fY29tcGlsZWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb21waWxlIHRoZSBzaGFkZXIuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0U2hhZGVyLnByb3RvdHlwZS5jb21waWxlID0gZnVuY3Rpb24gKGNvZGUpIHtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XHJcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKHRoaXMuX19zaGFkZXIsIGNvZGUpO1xyXG4gICAgICAgIGdsLmNvbXBpbGVTaGFkZXIodGhpcy5fX3NoYWRlcik7XHJcbiAgICAgICAgdGhpcy5fX2NvbXBpbGVkID0gZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHRoaXMuX19zaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKTtcclxuICAgICAgICBpZiAoIXRoaXMuX19jb21waWxlZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyh0aGlzLl9fc2hhZGVyKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBHTENhdFNoYWRlcjtcclxufSgpKTtcclxuZXhwb3J0cy5HTENhdFNoYWRlciA9IEdMQ2F0U2hhZGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgR0xfMSA9IHJlcXVpcmUoXCIuL0dMXCIpO1xyXG4vKipcclxuICogSXQncyBhIFdlYkdMVGV4dHVyZS5cclxuICovXHJcbnZhciBHTENhdFRleHR1cmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBHTENhdFRleHR1cmUgaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEdMQ2F0VGV4dHVyZShnbENhdCwgdGV4dHVyZSkge1xyXG4gICAgICAgIHRoaXMuX193aWR0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fX2hlaWdodCA9IDA7XHJcbiAgICAgICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XHJcbiAgICAgICAgdGhpcy5fX3RleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIHRoaXMudGV4dHVyZUZpbHRlcihHTF8xLkdMLkxJTkVBUik7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlV3JhcChHTF8xLkdMLkNMQU1QX1RPX0VER0UpO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdMQ2F0VGV4dHVyZS5wcm90b3R5cGUsIFwidGV4dHVyZVwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSXRzIG93biB0ZXh0dXJlLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3RleHR1cmU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR0xDYXRUZXh0dXJlLnByb3RvdHlwZSwgXCJyYXdcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEl0cyBvd24gdGV4dHVyZS4gU2hvcnRlciB0aGFuIFtbR0xDYXRUZXh0dXJlLnRleHR1cmVkXV1cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX190ZXh0dXJlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEdMQ2F0VGV4dHVyZS5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEl0cyB3aWR0aC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX193aWR0aDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShHTENhdFRleHR1cmUucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSXRzIGhlaWdodC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19oZWlnaHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIHRleHR1cmUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0VGV4dHVyZS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9fZ2xDYXQuZ2wuZGVsZXRlVGV4dHVyZSh0aGlzLl9fdGV4dHVyZSk7XHJcbiAgICB9O1xyXG4gICAgR0xDYXRUZXh0dXJlLnByb3RvdHlwZS50ZXh0dXJlRmlsdGVyID0gZnVuY3Rpb24gKGZpbHRlck1hZywgZmlsdGVyTWluKSB7XHJcbiAgICAgICAgaWYgKGZpbHRlck1hZyA9PT0gdm9pZCAwKSB7IGZpbHRlck1hZyA9IEdMXzEuR0wuTkVBUkVTVDsgfVxyXG4gICAgICAgIGlmIChmaWx0ZXJNaW4gPT09IHZvaWQgMCkgeyBmaWx0ZXJNaW4gPSBmaWx0ZXJNYWc7IH1cclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2w7XHJcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5fX3RleHR1cmUpO1xyXG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBmaWx0ZXJNYWcpO1xyXG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBmaWx0ZXJNaW4pO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xyXG4gICAgfTtcclxuICAgIEdMQ2F0VGV4dHVyZS5wcm90b3R5cGUudGV4dHVyZVdyYXAgPSBmdW5jdGlvbiAod3JhcFMsIHdyYXBUKSB7XHJcbiAgICAgICAgaWYgKHdyYXBTID09PSB2b2lkIDApIHsgd3JhcFMgPSBHTF8xLkdMLkNMQU1QX1RPX0VER0U7IH1cclxuICAgICAgICBpZiAod3JhcFQgPT09IHZvaWQgMCkgeyB3cmFwVCA9IHdyYXBTOyB9XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMuX190ZXh0dXJlKTtcclxuICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCB3cmFwUyk7XHJcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgd3JhcFQpO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGEgdmFsdWUgZm9yIHRoZSBwYXNzZWQgcGFyYW1ldGVyIG5hbWUuXHJcbiAgICAgKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJHTFJlbmRlcmluZ0NvbnRleHQvZ2V0UGFyYW1ldGVyXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0VGV4dHVyZS5wcm90b3R5cGUuZ2V0UGFyYW1ldGVyID0gZnVuY3Rpb24gKHBuYW1lKSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMuX190ZXh0dXJlKTtcclxuICAgICAgICBnbC5nZXRQYXJhbWV0ZXIocG5hbWUpO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmeSB0aGUgcGl4ZWwgc3RvcmFnZSBtb2Rlcy5cclxuICAgICAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYkdMUmVuZGVyaW5nQ29udGV4dC9waXhlbFN0b3JlaVxyXG4gICAgICovXHJcbiAgICBHTENhdFRleHR1cmUucHJvdG90eXBlLnBpeGVsU3RvcmVpID0gZnVuY3Rpb24gKHBuYW1lLCBwYXJhbSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcclxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl9fdGV4dHVyZSk7XHJcbiAgICAgICAgZ2wucGl4ZWxTdG9yZWkocG5hbWUsIHBhcmFtKTtcclxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgdGV4dHVyZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRUZXh0dXJlLnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nbDtcclxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl9fdGV4dHVyZSk7XHJcbiAgICAgICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBzb3VyY2UpO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xyXG4gICAgICAgIHRoaXMuX193aWR0aCA9IHNvdXJjZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9faGVpZ2h0ID0gc291cmNlLmhlaWdodDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgdGV4dHVyZS5cclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXNlcyBgVWludDhBcnJheWAuIElmIHlvdSB3YW50IHRvIHNvdXJjZSBpbWFnZSBkYXRhLCB1c2UgYEdMQ2F0LnNldFRleHR1cmUoKWAgaW5zdGVhZC5cclxuICAgICAqIE9yIHlvdSB3YW50IHRvIHVzZSBmbG9hdCB0ZXh0dXJlPyBUcnkgdGhpczogYEdMQ2F0LnNldFRleHR1cmVGcm9tRmxvYXRBcnJheSgpYFxyXG4gICAgICovXHJcbiAgICBHTENhdFRleHR1cmUucHJvdG90eXBlLnNldFRleHR1cmVGcm9tQXJyYXkgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgc291cmNlLCBmb3JtYXQpIHtcclxuICAgICAgICBpZiAoZm9ybWF0ID09PSB2b2lkIDApIHsgZm9ybWF0ID0gR0xfMS5HTC5SR0JBOyB9XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMuX190ZXh0dXJlKTtcclxuICAgICAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGZvcm1hdCwgd2lkdGgsIGhlaWdodCwgMCwgZm9ybWF0LCBnbC5VTlNJR05FRF9CWVRFLCBzb3VyY2UpO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xyXG4gICAgICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgbmV3IGRhdGEgaW50byB0aGlzIHRleHR1cmUuXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVzZXMgYEZsb2F0MzJBcnJheWAuXHJcbiAgICAgKiBJZiB5b3UgY2FuJ3QgZ3JhYiBgT0VTX3RleHR1cmVfZmxvYXRgIGV4dGVuc2lvbiBoZXJlLCB5b3Ugd2lsbCBkaWUgYXQgdGhpcyBwb2ludC5cclxuICAgICAqL1xyXG4gICAgR0xDYXRUZXh0dXJlLnByb3RvdHlwZS5zZXRUZXh0dXJlRnJvbUZsb2F0QXJyYXkgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgc291cmNlLCBmb3JtYXQpIHtcclxuICAgICAgICBpZiAoZm9ybWF0ID09PSB2b2lkIDApIHsgZm9ybWF0ID0gR0xfMS5HTC5SR0JBOyB9XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xyXG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oJ09FU190ZXh0dXJlX2Zsb2F0JywgdHJ1ZSk7XHJcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5fX3RleHR1cmUpO1xyXG4gICAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0LCAwLCBmb3JtYXQsIGdsLkZMT0FULCBzb3VyY2UpO1xyXG4gICAgICAgIGlmICh0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCdPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXInKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRleHR1cmVGaWx0ZXIoZ2wuTkVBUkVTVCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xyXG4gICAgICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb3B5IHBpeGVscyBmcm9tIGN1cnJlbnQgZnJhbWVidWZmZXIgdG8gZ2l2ZW4gdGV4dHVyZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRUZXh0dXJlLnByb3RvdHlwZS5jb3B5VGV4dHVyZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMuX190ZXh0dXJlKTtcclxuICAgICAgICBnbC5jb3B5VGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCAwLCAwLCB3aWR0aCwgaGVpZ2h0LCAwKTtcclxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcclxuICAgICAgICB0aGlzLl9fd2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9faGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2V0IG5ldyBjdWJlbWFwIGRhdGEgaW50byB0aGlzIHRleHR1cmUuXHJcbiAgICAgKiBAcGFyYW0gdGV4dHVyZXMgQXJyYXkgb2YgaWFtZ2VzLiBPcmRlcjogYFgrYCwgYFgtYCwgYFkrYCwgYFktYCwgYForYCwgYFotYFxyXG4gICAgICogQHRvZG8gZHVlIHRvIGNvbXBhdGliaWxpdHkgb2YgaXRzIGB3aWR0aGAgYW5kIGBoZWlnaHRgIGl0IHNob3VsZCBub3QgYmUgdXNlZCB5ZXRcclxuICAgICAqL1xyXG4gICAgR0xDYXRUZXh0dXJlLnByb3RvdHlwZS5zZXRDdWJlbWFwID0gZnVuY3Rpb24gKHRleHR1cmVzKSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdsO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfQ1VCRV9NQVAsIHRoaXMuX190ZXh0dXJlKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgICAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWCArIGksIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIHRleHR1cmVzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFX0NVQkVfTUFQLCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLkxJTkVBUik7XHJcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFX0NVQkVfTUFQLCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLkxJTkVBUik7XHJcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFX0NVQkVfTUFQLCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFX0NVQkVfTUFQLCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV9DVUJFX01BUCwgbnVsbCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEdMQ2F0VGV4dHVyZTtcclxufSgpKTtcclxuZXhwb3J0cy5HTENhdFRleHR1cmUgPSBHTENhdFRleHR1cmU7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5fX2V4cG9ydChyZXF1aXJlKFwiLi9HTFwiKSk7XHJcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0dMQ2F0XCIpKTtcclxuX19leHBvcnQocmVxdWlyZShcIi4vR0xDYXRCdWZmZXJcIikpO1xyXG5fX2V4cG9ydChyZXF1aXJlKFwiLi9HTENhdEZyYW1lYnVmZmVyXCIpKTtcclxuX19leHBvcnQocmVxdWlyZShcIi4vR0xDYXRQcm9ncmFtXCIpKTtcclxuX19leHBvcnQocmVxdWlyZShcIi4vR0xDYXRSZW5kZXJidWZmZXJcIikpO1xyXG5fX2V4cG9ydChyZXF1aXJlKFwiLi9HTENhdFRleHR1cmVcIikpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9