/*!
 * @fms-cat/glcat-ts v0.5.0
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
/******/ 	var hotCurrentHash = "bf7c3746b0851dc5357b";
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
/******/ 			var queue = outdatedModules.slice().map(function(id) {
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
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
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
/******/ 		// Not in "apply" phase
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

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
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


/***/ }),

/***/ "./src/GLCat.ts":
/*!**********************!*\
  !*** ./src/GLCat.ts ***!
  \**********************/
/*! no static exports found */
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
var eventemitter3_1 = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
var GLCatBuffer_1 = __webpack_require__(/*! ./GLCatBuffer */ "./src/GLCatBuffer.ts");
var GLCatFramebuffer_1 = __webpack_require__(/*! ./GLCatFramebuffer */ "./src/GLCatFramebuffer.ts");
var GLCatProgram_1 = __webpack_require__(/*! ./GLCatProgram */ "./src/GLCatProgram.ts");
var GLCatRenderbuffer_1 = __webpack_require__(/*! ./GLCatRenderbuffer */ "./src/GLCatRenderbuffer.ts");
var GLCatShader_1 = __webpack_require__(/*! ./GLCatShader */ "./src/GLCatShader.ts");
var GLCatTexture_1 = __webpack_require__(/*! ./GLCatTexture */ "./src/GLCatTexture.ts");
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
        _this.__extensionCache = {};
        _this.__gl = gl;
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
                throw new Error('GLCat: Something went wrong');
            }
        }
    };
    /**
     * Return its own WebGLRenderingContext.
     */
    GLCat.prototype.getRenderingContext = function () {
        return this.__gl;
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
    GLCat.prototype.createShader = function (type) {
        var gl = this.__gl;
        var shader = gl.createShader(type);
        if (shader === null) {
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
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
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
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
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        vertexShader.compile(vert);
        if (!vertexShader.isCompiled()) {
            vertexShader.dispose();
            return null;
        }
        // == frag =====================================================================================
        var fragmentShader = this.createShader(gl.FRAGMENT_SHADER);
        if (fragmentShader === null) {
            vertexShader.dispose();
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        fragmentShader.compile(frag);
        if (!fragmentShader.isCompiled()) {
            vertexShader.dispose();
            fragmentShader.dispose();
            return null;
        }
        // == program ==================================================================================
        var program = this.createProgram();
        if (program === null) {
            vertexShader.dispose();
            fragmentShader.dispose();
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        program.link(vertexShader, fragmentShader);
        if (!program.isLinked()) {
            vertexShader.dispose();
            fragmentShader.dispose();
            program.dispose();
            return null;
        }
        return program;
    };
    /**
     * Specify a program to use.
     */
    GLCat.prototype.useProgram = function (program) {
        var gl = this.__gl;
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
        var gl = this.__gl;
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
        var gl = this.__gl;
        var texture = gl.createTexture();
        if (texture === null) {
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        return new GLCatTexture_1.GLCatTexture(this, texture);
    };
    /**
     * Create/retrieve a dummy texture, 100% organic pure #FF00FF texture.
     */
    GLCat.prototype.getDummyTexture = function () {
        if (this.__dummyTextureCache) {
            return this.__dummyTextureCache;
        }
        var texture = this.createTexture();
        if (texture === null) {
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        texture.setTextureFromArray(1, 1, new Uint8Array([255, 0, 255, 255]));
        this.__dummyTextureCache = texture;
        return texture;
    };
    /**
     * Create a new renderbuffer.
     */
    GLCat.prototype.createRenderbuffer = function () {
        var gl = this.__gl;
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
        var gl = this.__gl;
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
            framebuffer.dispose();
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        renderbuffer.init(width, height);
        framebuffer.attachRenderbuffer(renderbuffer);
        var texture = this.createTexture();
        if (texture === null) {
            framebuffer.dispose();
            renderbuffer.dispose();
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
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
            this.spit(Error('GLCat: Maximum draw buffers count exceeded'));
        }
        var framebuffer = this.createFramebuffer();
        if (framebuffer === null) {
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        var renderbuffer = this.createRenderbuffer();
        if (renderbuffer === null) {
            framebuffer.dispose();
            this.spit(GLCat.unexpectedNullDetectedError);
            return null;
        }
        renderbuffer.init(width, height);
        framebuffer.attachRenderbuffer(renderbuffer);
        for (var i = 0; i < numBuffers; i++) {
            var texture = this.createTexture();
            if (texture === null) {
                framebuffer.dispose();
                renderbuffer.dispose();
                this.spit(GLCat.unexpectedNullDetectedError);
                return null;
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
}(eventemitter3_1.EventEmitter));
exports.GLCat = GLCat;


/***/ }),

/***/ "./src/GLCatBuffer.ts":
/*!****************************!*\
  !*** ./src/GLCatBuffer.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(__webpack_require__(/*! ./constants */ "./src/constants.ts"));
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
    /**
     * Dispose the buffer.
     */
    GLCatBuffer.prototype.dispose = function () {
        this.__glCat.getRenderingContext().deleteBuffer(this.__buffer);
    };
    /**
     * Retrieve its own buffer.
     */
    GLCatBuffer.prototype.getBuffer = function () {
        return this.__buffer;
    };
    /**
     * Set new data into this buffer.
     */
    GLCatBuffer.prototype.setVertexbuffer = function (source, usage) {
        if (usage === void 0) { usage = constants_1.default.STATIC_DRAW; }
        var gl = this.__glCat.getRenderingContext();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.__buffer);
        gl.bufferData(gl.ARRAY_BUFFER, source, usage);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    };
    /**
     * Set new index data into this buffer.
     */
    GLCatBuffer.prototype.setIndexbuffer = function (source, usage) {
        if (usage === void 0) { usage = constants_1.default.STATIC_DRAW; }
        var gl = this.__glCat.getRenderingContext();
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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(__webpack_require__(/*! ./constants */ "./src/constants.ts"));
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
    /**
     * Dispose the framebuffer.
     */
    GLCatFramebuffer.prototype.dispose = function (alsoAttached) {
        if (alsoAttached === void 0) { alsoAttached = false; }
        var gl = this.__glCat.getRenderingContext();
        gl.deleteFramebuffer(this.__framebuffer);
        if (alsoAttached) {
            if (this.__renderbuffer) {
                gl.deleteRenderbuffer(this.__renderbuffer.getRenderbuffer());
            }
            Object.values(this.__textureMap).forEach(function (texture) {
                gl.deleteTexture(texture.getTexture());
            });
        }
    };
    /**
     * Return its own framebuffer.
     */
    GLCatFramebuffer.prototype.getFramebuffer = function () {
        return this.__framebuffer;
    };
    /**
     * Return its attached renderbuffer.
     */
    GLCatFramebuffer.prototype.getRenderbuffer = function () {
        return this.__renderbuffer;
    };
    /**
     * Return its attached texture.
     */
    GLCatFramebuffer.prototype.getTexture = function (attachment) {
        if (attachment === void 0) { attachment = constants_1.default.COLOR_ATTACHMENT0; }
        return this.__textureMap[attachment];
    };
    /**
     * Attach a renderbuffer to this framebuffer.
     */
    GLCatFramebuffer.prototype.attachRenderbuffer = function (renderbuffer, attachment) {
        if (attachment === void 0) { attachment = constants_1.default.DEPTH_ATTACHMENT; }
        var gl = this.__glCat.getRenderingContext();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.__framebuffer);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachment, gl.RENDERBUFFER, renderbuffer.getRenderbuffer());
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this.__renderbuffer = renderbuffer;
    };
    /**
     * Attach a texture to this framebuffer.
     */
    GLCatFramebuffer.prototype.attachTexture = function (texture, attachment) {
        if (attachment === void 0) { attachment = constants_1.default.COLOR_ATTACHMENT0; }
        var gl = this.__glCat.getRenderingContext();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.__framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, texture.getTexture(), 0);
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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(__webpack_require__(/*! ./constants */ "./src/constants.ts"));
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
        this.__linked = false;
        this.__glCat = glCat;
        this.__program = program;
    }
    /**
     * Dispose the program.
     */
    GLCatProgram.prototype.dispose = function () {
        this.__glCat.getRenderingContext().deleteProgram(this.__program);
    };
    /**
     * Return whether the last link operation was successful or not.
     */
    GLCatProgram.prototype.isLinked = function () {
        return this.__linked;
    };
    /**
     * Retrieve its own program.
     */
    GLCatProgram.prototype.getProgram = function () {
        return this.__program;
    };
    /**
     * Retrieve its shaders.
     */
    GLCatProgram.prototype.getShaders = function () {
        return this.__shaders ? this.__shaders.concat() : null;
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
        var gl = this.__glCat.getRenderingContext();
        shaders.forEach(function (shader) { return gl.attachShader(_this.__program, shader.getShader()); });
        gl.linkProgram(this.__program);
        this.__linked = gl.getProgramParameter(this.__program, gl.LINK_STATUS);
        if (!this.__linked) {
            this.__glCat.spit(gl.getProgramInfoLog(this.__program));
            return;
        }
        this.__shaders = shaders.concat();
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
        var gl = this.__glCat.getRenderingContext();
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
        var ext = this.__glCat.getExtension('ANGLE_instanced_arrays');
        if (ext) {
            ext.vertexAttribDivisorANGLE(location, divisor);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    };
    /**
     * Attach an uniform1i variable.
     */
    GLCatProgram.prototype.uniform1i = function (name, value) {
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform1i(location, value);
    };
    /**
     * Attach an uniform2i variable.
     */
    GLCatProgram.prototype.uniform2i = function (name, x, y) {
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform2i(location, x, y);
    };
    /**
     * Attach an uniform3i variable.
     */
    GLCatProgram.prototype.uniform3i = function (name, x, y, z) {
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform3i(location, x, y, z);
    };
    /**
     * Attach an uniform4i variable.
     */
    GLCatProgram.prototype.uniform4i = function (name, x, y, z, w) {
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform4i(location, x, y, z, w);
    };
    /**
     * Attach an uniform1iv variable.
     */
    GLCatProgram.prototype.uniform1iv = function (name, array) {
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform1iv(location, array);
    };
    /**
     * Attach an uniform2iv variable.
     */
    GLCatProgram.prototype.uniform2iv = function (name, array) {
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform2iv(location, array);
    };
    /**
     * Attach an uniform3iv variable.
     */
    GLCatProgram.prototype.uniform3iv = function (name, array) {
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform3iv(location, array);
    };
    /**
     * Attach an uniform4iv variable.
     */
    GLCatProgram.prototype.uniform4iv = function (name, array) {
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform4iv(location, array);
    };
    /**
     * Attach an uniform1f variable.
     */
    GLCatProgram.prototype.uniform1f = function (name, value) {
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform1f(location, value);
    };
    /**
     * Attach an uniform2f variable.
     */
    GLCatProgram.prototype.uniform2f = function (name, x, y) {
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform2f(location, x, y);
    };
    /**
     * Attach an uniform3f variable.
     */
    GLCatProgram.prototype.uniform3f = function (name, x, y, z) {
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform3f(location, x, y, z);
    };
    /**
     * Attach an uniform4f variable.
     */
    GLCatProgram.prototype.uniform4f = function (name, x, y, z, w) {
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform4f(location, x, y, z, w);
    };
    /**
     * Attach an uniform1fv variable.
     */
    GLCatProgram.prototype.uniform1fv = function (name, array) {
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform1fv(location, array);
    };
    /**
     * Attach an uniform2fv variable.
     */
    GLCatProgram.prototype.uniform2fv = function (name, array) {
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform2fv(location, array);
    };
    /**
     * Attach an uniform3fv variable.
     */
    GLCatProgram.prototype.uniform3fv = function (name, array) {
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform3fv(location, array);
    };
    /**
     * Attach an uniform4fv variable.
     */
    GLCatProgram.prototype.uniform4fv = function (name, array) {
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniform4fv(location, array);
    };
    /**
     * Attach an uniformMatrix2fv variable.
     */
    GLCatProgram.prototype.uniformMatrix2fv = function (name, array, transpose) {
        if (transpose === void 0) { transpose = false; }
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniformMatrix2fv(location, transpose, array);
    };
    /**
     * Attach an uniformMatrix3fv variable.
     */
    GLCatProgram.prototype.uniformMatrix3fv = function (name, array, transpose) {
        if (transpose === void 0) { transpose = false; }
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.uniformMatrix3fv(location, transpose, array);
    };
    /**
     * Attach an uniformMatrix4fv variable.
     */
    GLCatProgram.prototype.uniformMatrix4fv = function (name, array, transpose) {
        if (transpose === void 0) { transpose = false; }
        var gl = this.__glCat.getRenderingContext();
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
        var gl = this.__glCat.getRenderingContext();
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
        var gl = this.__glCat.getRenderingContext();
        var location = this.getUniformLocation(name);
        gl.activeTexture(gl.TEXTURE0 + number);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        gl.uniform1i(location, number);
    };
    /**
     * Retrieve attribute location.
     */
    GLCatProgram.prototype.getAttribLocation = function (name) {
        var gl = this.__glCat.getRenderingContext();
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
        var gl = this.__glCat.getRenderingContext();
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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(__webpack_require__(/*! ./constants */ "./src/constants.ts"));
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
    /**
     * Dispose the renderbuffer.
     */
    GLCatRenderbuffer.prototype.dispose = function () {
        this.__glCat.getRenderingContext().deleteRenderbuffer(this.__renderbuffer);
    };
    /**
     * Return its own renderbuffer.
     */
    GLCatRenderbuffer.prototype.getRenderbuffer = function () {
        return this.__renderbuffer;
    };
    /**
     * Return its width.
     */
    GLCatRenderbuffer.prototype.getWidth = function () {
        return this.__width;
    };
    /**
     * Return its height.
     */
    GLCatRenderbuffer.prototype.getHeight = function () {
        return this.__height;
    };
    /**
     * Initialize this renderbuffer.
     * If `format` is not given, it will be initialized as `DEPTH_COMPONENT16` .
     */
    GLCatRenderbuffer.prototype.init = function (width, height, format) {
        if (format === void 0) { format = constants_1.default.DEPTH_COMPONENT16; }
        var gl = this.__glCat.getRenderingContext();
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
    /**
     * Dispose the shader.
     */
    GLCatShader.prototype.dispose = function () {
        this.__glCat.getRenderingContext().deleteShader(this.__shader);
    };
    /**
     * Return whether the last compilation was successful or not.
     */
    GLCatShader.prototype.isCompiled = function () {
        return this.__compiled;
    };
    /**
     * Retrieve its own shader.
     */
    GLCatShader.prototype.getShader = function () {
        return this.__shader;
    };
    /**
     * Compile the shader.
     */
    GLCatShader.prototype.compile = function (code) {
        var gl = this.__glCat.getRenderingContext();
        gl.shaderSource(this.__shader, code);
        gl.compileShader(this.__shader);
        this.__compiled = gl.getShaderParameter(this.__shader, gl.COMPILE_STATUS);
        if (!this.__compiled) {
            this.__glCat.spit(gl.getShaderInfoLog(this.__shader));
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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(__webpack_require__(/*! ./constants */ "./src/constants.ts"));
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
        this.textureFilter(constants_1.default.LINEAR);
        this.textureWrap(constants_1.default.CLAMP_TO_EDGE);
    }
    /**
     * Dispose the texture.
     */
    GLCatTexture.prototype.dispose = function () {
        this.__glCat.getRenderingContext().deleteTexture(this.__texture);
    };
    /**
     * Retrieve its own texture.
     */
    GLCatTexture.prototype.getTexture = function () {
        return this.__texture;
    };
    /**
     * Return its width.
     */
    GLCatTexture.prototype.getWidth = function () {
        return this.__width;
    };
    /**
     * Return its height.
     */
    GLCatTexture.prototype.getHeight = function () {
        return this.__height;
    };
    GLCatTexture.prototype.textureFilter = function (filterMag, filterMin) {
        if (filterMag === void 0) { filterMag = constants_1.default.NEAREST; }
        if (filterMin === void 0) { filterMin = filterMag; }
        var gl = this.__glCat.getRenderingContext();
        gl.bindTexture(gl.TEXTURE_2D, this.__texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filterMag);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filterMin);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    GLCatTexture.prototype.textureWrap = function (wrapS, wrapT) {
        if (wrapS === void 0) { wrapS = constants_1.default.CLAMP_TO_EDGE; }
        if (wrapT === void 0) { wrapT = wrapS; }
        var gl = this.__glCat.getRenderingContext();
        gl.bindTexture(gl.TEXTURE_2D, this.__texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    /**
     * Set new data into this texture.
     */
    GLCatTexture.prototype.setTexture = function (source) {
        var gl = this.__glCat.getRenderingContext();
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
        if (format === void 0) { format = constants_1.default.RGBA; }
        var gl = this.__glCat.getRenderingContext();
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
        if (format === void 0) { format = constants_1.default.RGBA; }
        var gl = this.__glCat.getRenderingContext();
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
        var gl = this.__glCat.getRenderingContext();
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
        var gl = this.__glCat.getRenderingContext();
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

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __importDefault(__webpack_require__(/*! ./constants */ "./src/constants.ts"));
exports.GL = constants_1.default;
__export(__webpack_require__(/*! ./GLCat */ "./src/GLCat.ts"));
__export(__webpack_require__(/*! ./GLCatBuffer */ "./src/GLCatBuffer.ts"));
__export(__webpack_require__(/*! ./GLCatFramebuffer */ "./src/GLCatFramebuffer.ts"));
__export(__webpack_require__(/*! ./GLCatProgram */ "./src/GLCatProgram.ts"));
__export(__webpack_require__(/*! ./GLCatRenderbuffer */ "./src/GLCatRenderbuffer.ts"));
__export(__webpack_require__(/*! ./GLCatTexture */ "./src/GLCatTexture.ts"));


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXZlbnRlbWl0dGVyMy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvR0xDYXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dMQ2F0QnVmZmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9HTENhdEZyYW1lYnVmZmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9HTENhdFByb2dyYW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dMQ2F0UmVuZGVyYnVmZmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9HTENhdFNoYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvR0xDYXRUZXh0dXJlLnRzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQWMsNEJBQTRCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsK0NBQStDLEVBQUU7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsbUJBQW1CO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsbUJBQW1CO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsbUJBQW1CO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7O0FDelRhO0FBQ2I7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSw4Q0FBOEMsY0FBYztBQUM1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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoVGE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBLDhDQUE4QyxjQUFjO0FBQzVELGtDQUFrQyxtQkFBTyxDQUFDLHVDQUFhO0FBQ3ZEO0FBQ0EsU0FBUyxtQkFBTyxDQUFDLCtCQUFTO0FBQzFCLFNBQVMsbUJBQU8sQ0FBQywyQ0FBZTtBQUNoQyxTQUFTLG1CQUFPLENBQUMscURBQW9CO0FBQ3JDLFNBQVMsbUJBQU8sQ0FBQyw2Q0FBZ0I7QUFDakMsU0FBUyxtQkFBTyxDQUFDLHVEQUFxQjtBQUN0QyxTQUFTLG1CQUFPLENBQUMsNkNBQWdCIiwiZmlsZSI6ImdsY2F0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB0aGlzW1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiO1xuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xuIFx0XHRcdFx0cmVxdWVzdC5zZW5kKG51bGwpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnIpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0aWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuIFx0XHRcdFx0aWYgKHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcbiBcdFx0XHRcdFx0cmVqZWN0KFxuIFx0XHRcdFx0XHRcdG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIilcbiBcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xuIFx0XHRcdFx0XHQvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcbiBcdFx0XHRcdH0gZWxzZSBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyAhPT0gMzA0KSB7XG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdHZhciB1cGRhdGUgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdFx0XHRcdHJlamVjdChlKTtcbiBcdFx0XHRcdFx0XHRyZXR1cm47XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0cmVzb2x2ZSh1cGRhdGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiYmY3YzM3NDZiMDg1MWRjNTM1N2JcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwiZ2xjYXQuanNcIjtcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoXCIuL3NyYy9pbmRleC50c1wiKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIHByZWZpeCA9ICd+JztcblxuLyoqXG4gKiBDb25zdHJ1Y3RvciB0byBjcmVhdGUgYSBzdG9yYWdlIGZvciBvdXIgYEVFYCBvYmplY3RzLlxuICogQW4gYEV2ZW50c2AgaW5zdGFuY2UgaXMgYSBwbGFpbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgZXZlbnQgbmFtZXMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFdmVudHMoKSB7fVxuXG4vL1xuLy8gV2UgdHJ5IHRvIG5vdCBpbmhlcml0IGZyb20gYE9iamVjdC5wcm90b3R5cGVgLiBJbiBzb21lIGVuZ2luZXMgY3JlYXRpbmcgYW5cbi8vIGluc3RhbmNlIGluIHRoaXMgd2F5IGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgYE9iamVjdC5jcmVhdGUobnVsbClgIGRpcmVjdGx5LlxuLy8gSWYgYE9iamVjdC5jcmVhdGUobnVsbClgIGlzIG5vdCBzdXBwb3J0ZWQgd2UgcHJlZml4IHRoZSBldmVudCBuYW1lcyB3aXRoIGFcbi8vIGNoYXJhY3RlciB0byBtYWtlIHN1cmUgdGhhdCB0aGUgYnVpbHQtaW4gb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdFxuLy8gb3ZlcnJpZGRlbiBvciB1c2VkIGFzIGFuIGF0dGFjayB2ZWN0b3IuXG4vL1xuaWYgKE9iamVjdC5jcmVhdGUpIHtcbiAgRXZlbnRzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgLy9cbiAgLy8gVGhpcyBoYWNrIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBgX19wcm90b19fYCBwcm9wZXJ0eSBpcyBzdGlsbCBpbmhlcml0ZWQgaW5cbiAgLy8gc29tZSBvbGQgYnJvd3NlcnMgbGlrZSBBbmRyb2lkIDQsIGlQaG9uZSA1LjEsIE9wZXJhIDExIGFuZCBTYWZhcmkgNS5cbiAgLy9cbiAgaWYgKCFuZXcgRXZlbnRzKCkuX19wcm90b19fKSBwcmVmaXggPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBldmVudCBsaXN0ZW5lci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBbb25jZT1mYWxzZV0gU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBlbWl0dGVyIFJlZmVyZW5jZSB0byB0aGUgYEV2ZW50RW1pdHRlcmAgaW5zdGFuY2UuXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXIoZW1pdHRlciwgZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgZW1pdHRlciwgb25jZSlcbiAgICAsIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XSkgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBsaXN0ZW5lciwgZW1pdHRlci5fZXZlbnRzQ291bnQrKztcbiAgZWxzZSBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdLmZuKSBlbWl0dGVyLl9ldmVudHNbZXZ0XS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IFtlbWl0dGVyLl9ldmVudHNbZXZ0XSwgbGlzdGVuZXJdO1xuXG4gIHJldHVybiBlbWl0dGVyO1xufVxuXG4vKipcbiAqIENsZWFyIGV2ZW50IGJ5IG5hbWUuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldnQgVGhlIEV2ZW50IG5hbWUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjbGVhckV2ZW50KGVtaXR0ZXIsIGV2dCkge1xuICBpZiAoLS1lbWl0dGVyLl9ldmVudHNDb3VudCA9PT0gMCkgZW1pdHRlci5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICBlbHNlIGRlbGV0ZSBlbWl0dGVyLl9ldmVudHNbZXZ0XTtcbn1cblxuLyoqXG4gKiBNaW5pbWFsIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG59XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGxpc3RpbmcgdGhlIGV2ZW50cyBmb3Igd2hpY2ggdGhlIGVtaXR0ZXIgaGFzIHJlZ2lzdGVyZWRcbiAqIGxpc3RlbmVycy5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHZhciBuYW1lcyA9IFtdXG4gICAgLCBldmVudHNcbiAgICAsIG5hbWU7XG5cbiAgaWYgKHRoaXMuX2V2ZW50c0NvdW50ID09PSAwKSByZXR1cm4gbmFtZXM7XG5cbiAgZm9yIChuYW1lIGluIChldmVudHMgPSB0aGlzLl9ldmVudHMpKSB7XG4gICAgaWYgKGhhcy5jYWxsKGV2ZW50cywgbmFtZSkpIG5hbWVzLnB1c2gocHJlZml4ID8gbmFtZS5zbGljZSgxKSA6IG5hbWUpO1xuICB9XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICByZXR1cm4gbmFtZXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZXZlbnRzKSk7XG4gIH1cblxuICByZXR1cm4gbmFtZXM7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0FycmF5fSBUaGUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBoYW5kbGVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghaGFuZGxlcnMpIHJldHVybiBbXTtcbiAgaWYgKGhhbmRsZXJzLmZuKSByZXR1cm4gW2hhbmRsZXJzLmZuXTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGhhbmRsZXJzLmxlbmd0aCwgZWUgPSBuZXcgQXJyYXkobCk7IGkgPCBsOyBpKyspIHtcbiAgICBlZVtpXSA9IGhhbmRsZXJzW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgbGlzdGVuaW5nIHRvIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWJlciBvZiBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIGxpc3RlbmVyQ291bnQoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghbGlzdGVuZXJzKSByZXR1cm4gMDtcbiAgaWYgKGxpc3RlbmVycy5mbikgcmV0dXJuIDE7XG4gIHJldHVybiBsaXN0ZW5lcnMubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBDYWxscyBlYWNoIG9mIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBhcmdzXG4gICAgLCBpO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCksIHRydWU7XG4gICAgICBjYXNlIDI6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEpLCB0cnVlO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiksIHRydWU7XG4gICAgICBjYXNlIDQ6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMyksIHRydWU7XG4gICAgICBjYXNlIDU6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQpLCB0cnVlO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0LCBhNSksIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mbi5hcHBseShsaXN0ZW5lcnMuY29udGV4dCwgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGhcbiAgICAgICwgajtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgNDogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMiwgYTMpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoIWFyZ3MpIGZvciAoaiA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCBmYWxzZSk7XG59O1xuXG4vKipcbiAqIEFkZCBhIG9uZS10aW1lIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCB0cnVlKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBsaXN0ZW5lcnMgb2YgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgbWF0Y2ggdGhpcyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgaGF2ZSB0aGlzIGNvbnRleHQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSByZW1vdmUgb25lLXRpbWUgbGlzdGVuZXJzLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiB0aGlzO1xuICBpZiAoIWZuKSB7XG4gICAgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAoXG4gICAgICBsaXN0ZW5lcnMuZm4gPT09IGZuICYmXG4gICAgICAoIW9uY2UgfHwgbGlzdGVuZXJzLm9uY2UpICYmXG4gICAgICAoIWNvbnRleHQgfHwgbGlzdGVuZXJzLmNvbnRleHQgPT09IGNvbnRleHQpXG4gICAgKSB7XG4gICAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBldmVudHMgPSBbXSwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHxcbiAgICAgICAgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKSB8fFxuICAgICAgICAoY29udGV4dCAmJiBsaXN0ZW5lcnNbaV0uY29udGV4dCAhPT0gY29udGV4dClcbiAgICAgICkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxuICAgIC8vXG4gICAgaWYgKGV2ZW50cy5sZW5ndGgpIHRoaXMuX2V2ZW50c1tldnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgICBlbHNlIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycywgb3IgdGhvc2Ugb2YgdGhlIHNwZWNpZmllZCBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gW2V2ZW50XSBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dDtcblxuICBpZiAoZXZlbnQpIHtcbiAgICBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuICAgIGlmICh0aGlzLl9ldmVudHNbZXZ0XSkgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBBbGlhcyBtZXRob2RzIG5hbWVzIGJlY2F1c2UgcGVvcGxlIHJvbGwgbGlrZSB0aGF0LlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBwcmVmaXguXG4vL1xuRXZlbnRFbWl0dGVyLnByZWZpeGVkID0gcHJlZml4O1xuXG4vL1xuLy8gQWxsb3cgYEV2ZW50RW1pdHRlcmAgdG8gYmUgaW1wb3J0ZWQgYXMgbW9kdWxlIG5hbWVzcGFjZS5cbi8vXG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbW9kdWxlKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBldmVudGVtaXR0ZXIzXzEgPSByZXF1aXJlKFwiZXZlbnRlbWl0dGVyM1wiKTtcclxudmFyIEdMQ2F0QnVmZmVyXzEgPSByZXF1aXJlKFwiLi9HTENhdEJ1ZmZlclwiKTtcclxudmFyIEdMQ2F0RnJhbWVidWZmZXJfMSA9IHJlcXVpcmUoXCIuL0dMQ2F0RnJhbWVidWZmZXJcIik7XHJcbnZhciBHTENhdFByb2dyYW1fMSA9IHJlcXVpcmUoXCIuL0dMQ2F0UHJvZ3JhbVwiKTtcclxudmFyIEdMQ2F0UmVuZGVyYnVmZmVyXzEgPSByZXF1aXJlKFwiLi9HTENhdFJlbmRlcmJ1ZmZlclwiKTtcclxudmFyIEdMQ2F0U2hhZGVyXzEgPSByZXF1aXJlKFwiLi9HTENhdFNoYWRlclwiKTtcclxudmFyIEdMQ2F0VGV4dHVyZV8xID0gcmVxdWlyZShcIi4vR0xDYXRUZXh0dXJlXCIpO1xyXG4vKipcclxuICogV2ViR0wgd3JhcHBlciB3aXRoIHBsZW50eSBvZiBoYWNrYWJpbGl0eS5cclxuICovXHJcbnZhciBHTENhdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhHTENhdCwgX3N1cGVyKTtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IGluc3RhbmNlLlxyXG4gICAgICogV2ViR0xSZW5kZXJpbmdDb250ZXh0IGlzIHJlcXVpcmVkLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBHTENhdChnbCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuX19leHRlbnNpb25DYWNoZSA9IHt9O1xyXG4gICAgICAgIF90aGlzLl9fZ2wgPSBnbDtcclxuICAgICAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XHJcbiAgICAgICAgZ2wuZGVwdGhGdW5jKGdsLkxFUVVBTCk7XHJcbiAgICAgICAgZ2wuZW5hYmxlKGdsLkJMRU5EKTtcclxuICAgICAgICBnbC5ibGVuZEZ1bmMoZ2wuU1JDX0FMUEhBLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEl0J3MuLi4ganVzdCBhbiBgZW1pdCggJ2Vycm9yJywgLi4uYXJncyApYC5cclxuICAgICAqIEJ1dCwgaWYgdGhlcmUgYXJlIG5vIGxpc3RlbmVycyBzdWJzY3JpYmVkIHRvICdlcnJvcicgZXZlbnQsXHJcbiAgICAgKiBpdCB3aWxsIHRocm93IGFuIGVycm9yIGluc3RlYWQuIFdoYXQgYSBjb29sIVxyXG4gICAgICovXHJcbiAgICBHTENhdC5wcm90b3R5cGUuc3BpdCA9IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgIHZhciBib29sID0gX3N1cGVyLnByb3RvdHlwZS5lbWl0LmNhbGwodGhpcywgJ2Vycm9yJywgZXJyb3IpO1xyXG4gICAgICAgIGlmICghYm9vbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGVycm9yID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dMQ2F0OiBTb21ldGhpbmcgd2VudCB3cm9uZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGl0cyBvd24gV2ViR0xSZW5kZXJpbmdDb250ZXh0LlxyXG4gICAgICovXHJcbiAgICBHTENhdC5wcm90b3R5cGUuZ2V0UmVuZGVyaW5nQ29udGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX2dsO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0cmlldmUgYW4gZXh0ZW5zaW9uLlxyXG4gICAgICogSWYgdGhleSBpcyB5b3VyIHByZWNpb3VzIG9uZSBhbmQgeW91IGNhbm5vdCBsaXZlIHdpdGhvdXQgaGltLCB0dXJuIG9uIGB0aHJvd0lmTm90Rm91bmRgLlxyXG4gICAgICovXHJcbiAgICBHTENhdC5wcm90b3R5cGUuZ2V0RXh0ZW5zaW9uID0gZnVuY3Rpb24gKG5hbWUsIHRocm93SWZOb3RGb3VuZCkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbDtcclxuICAgICAgICBpZiAodGhpcy5fX2V4dGVuc2lvbkNhY2hlW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbbmFtZV0gPSBnbC5nZXRFeHRlbnNpb24obmFtZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbbmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZXh0ZW5zaW9uQ2FjaGVbbmFtZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhyb3dJZk5vdEZvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGl0KCdHTENhdC5nZXRFeHRlbnNpb246IFRoZSBleHRlbnNpb24gXCInICsgbmFtZSArICdcIiBpcyBub3Qgc3VwcG9ydGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlIGV4dGVuc2lvbnMuXHJcbiAgICAgKiBJZiB0aGV5IGFyZSB5b3VyIHByZWNpb3VzIG9uZXMgYW5kIHlvdSBjYW5ub3QgbGl2ZSB3aXRob3V0IHRoZW0sIHR1cm4gb24gYHRocm93SWZOb3RGb3VuZGAuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0LnByb3RvdHlwZS5nZXRFeHRlbnNpb25zID0gZnVuY3Rpb24gKG5hbWVzLCB0aHJvd0lmTm90Rm91bmQpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuYW1lcy5tYXAoZnVuY3Rpb24gKG4pIHsgcmV0dXJuIF90aGlzLmdldEV4dGVuc2lvbihuLCB0aHJvd0lmTm90Rm91bmQpOyB9KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBzaGFkZXIgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBHTENhdC5wcm90b3R5cGUuY3JlYXRlU2hhZGVyID0gZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2w7XHJcbiAgICAgICAgdmFyIHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcclxuICAgICAgICBpZiAoc2hhZGVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpdChHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHTENhdFNoYWRlcl8xLkdMQ2F0U2hhZGVyKHRoaXMsIHNoYWRlcik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgR0xDYXQgcHJvZ3JhbSBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0LnByb3RvdHlwZS5jcmVhdGVQcm9ncmFtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbDtcclxuICAgICAgICB2YXIgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcclxuICAgICAgICBpZiAocHJvZ3JhbSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNwaXQoR0xDYXQudW5leHBlY3RlZE51bGxEZXRlY3RlZEVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgR0xDYXRQcm9ncmFtXzEuR0xDYXRQcm9ncmFtKHRoaXMsIHByb2dyYW0pO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0IHByb2dyYW0gb2JqZWN0LCBpbiBsYXppZXIgd2F5LlxyXG4gICAgICovXHJcbiAgICBHTENhdC5wcm90b3R5cGUubGF6eVByb2dyYW0gPSBmdW5jdGlvbiAodmVydCwgZnJhZykge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbDtcclxuICAgICAgICAvLyA9PSB2ZXJ0ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgICB2YXIgdmVydGV4U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XHJcbiAgICAgICAgaWYgKHZlcnRleFNoYWRlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNwaXQoR0xDYXQudW5leHBlY3RlZE51bGxEZXRlY3RlZEVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZlcnRleFNoYWRlci5jb21waWxlKHZlcnQpO1xyXG4gICAgICAgIGlmICghdmVydGV4U2hhZGVyLmlzQ29tcGlsZWQoKSkge1xyXG4gICAgICAgICAgICB2ZXJ0ZXhTaGFkZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gPT0gZnJhZyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICAgdmFyIGZyYWdtZW50U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcclxuICAgICAgICBpZiAoZnJhZ21lbnRTaGFkZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdmVydGV4U2hhZGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5zcGl0KEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmcmFnbWVudFNoYWRlci5jb21waWxlKGZyYWcpO1xyXG4gICAgICAgIGlmICghZnJhZ21lbnRTaGFkZXIuaXNDb21waWxlZCgpKSB7XHJcbiAgICAgICAgICAgIHZlcnRleFNoYWRlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIGZyYWdtZW50U2hhZGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vID09IHByb2dyYW0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgIHZhciBwcm9ncmFtID0gdGhpcy5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgICAgICAgaWYgKHByb2dyYW0gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdmVydGV4U2hhZGVyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgZnJhZ21lbnRTaGFkZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNwaXQoR0xDYXQudW5leHBlY3RlZE51bGxEZXRlY3RlZEVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb2dyYW0ubGluayh2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKTtcclxuICAgICAgICBpZiAoIXByb2dyYW0uaXNMaW5rZWQoKSkge1xyXG4gICAgICAgICAgICB2ZXJ0ZXhTaGFkZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICBmcmFnbWVudFNoYWRlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHByb2dyYW0uZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb2dyYW07XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZ5IGEgcHJvZ3JhbSB0byB1c2UuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0LnByb3RvdHlwZS51c2VQcm9ncmFtID0gZnVuY3Rpb24gKHByb2dyYW0pIHtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2w7XHJcbiAgICAgICAgaWYgKHByb2dyYW0gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGl0KEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtLmdldFByb2dyYW0oKSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgdmVydGV4IGJ1ZmZlci5cclxuICAgICAqL1xyXG4gICAgR0xDYXQucHJvdG90eXBlLmNyZWF0ZUJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2w7XHJcbiAgICAgICAgdmFyIGJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgICAgIGlmIChidWZmZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGl0KEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IEdMQ2F0QnVmZmVyXzEuR0xDYXRCdWZmZXIodGhpcywgYnVmZmVyKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyB0ZXh0dXJlLlxyXG4gICAgICovXHJcbiAgICBHTENhdC5wcm90b3R5cGUuY3JlYXRlVGV4dHVyZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2w7XHJcbiAgICAgICAgdmFyIHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XHJcbiAgICAgICAgaWYgKHRleHR1cmUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGl0KEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IEdMQ2F0VGV4dHVyZV8xLkdMQ2F0VGV4dHVyZSh0aGlzLCB0ZXh0dXJlKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZS9yZXRyaWV2ZSBhIGR1bW15IHRleHR1cmUsIDEwMCUgb3JnYW5pYyBwdXJlICNGRjAwRkYgdGV4dHVyZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXQucHJvdG90eXBlLmdldER1bW15VGV4dHVyZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fX2R1bW15VGV4dHVyZUNhY2hlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fZHVtbXlUZXh0dXJlQ2FjaGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB0ZXh0dXJlID0gdGhpcy5jcmVhdGVUZXh0dXJlKCk7XHJcbiAgICAgICAgaWYgKHRleHR1cmUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGl0KEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkoMSwgMSwgbmV3IFVpbnQ4QXJyYXkoWzI1NSwgMCwgMjU1LCAyNTVdKSk7XHJcbiAgICAgICAgdGhpcy5fX2R1bW15VGV4dHVyZUNhY2hlID0gdGV4dHVyZTtcclxuICAgICAgICByZXR1cm4gdGV4dHVyZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyByZW5kZXJidWZmZXIuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0LnByb3RvdHlwZS5jcmVhdGVSZW5kZXJidWZmZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsO1xyXG4gICAgICAgIHZhciByZW5kZXJidWZmZXIgPSBnbC5jcmVhdGVSZW5kZXJidWZmZXIoKTtcclxuICAgICAgICBpZiAocmVuZGVyYnVmZmVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpdChHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHTENhdFJlbmRlcmJ1ZmZlcl8xLkdMQ2F0UmVuZGVyYnVmZmVyKHRoaXMsIHJlbmRlcmJ1ZmZlcik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgZnJhbWVidWZmZXIuXHJcbiAgICAgKiBUT0RPOiBEcmF3QnVmZmVyc1xyXG4gICAgICovXHJcbiAgICBHTENhdC5wcm90b3R5cGUuY3JlYXRlRnJhbWVidWZmZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsO1xyXG4gICAgICAgIHZhciBmcmFtZWJ1ZmZlciA9IGdsLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XHJcbiAgICAgICAgaWYgKGZyYW1lYnVmZmVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpdChHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHTENhdEZyYW1lYnVmZmVyXzEuR0xDYXRGcmFtZWJ1ZmZlcih0aGlzLCBmcmFtZWJ1ZmZlcik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgZnJhbWVidWZlciwgaW4gbGF6aWVyIHdheS5cclxuICAgICAqL1xyXG4gICAgR0xDYXQucHJvdG90eXBlLmxhenlGcmFtZWJ1ZmZlciA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBpc0Zsb2F0KSB7XHJcbiAgICAgICAgaWYgKGlzRmxvYXQgPT09IHZvaWQgMCkgeyBpc0Zsb2F0ID0gZmFsc2U7IH1cclxuICAgICAgICB2YXIgZnJhbWVidWZmZXIgPSB0aGlzLmNyZWF0ZUZyYW1lYnVmZmVyKCk7XHJcbiAgICAgICAgaWYgKGZyYW1lYnVmZmVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpdChHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJlbmRlcmJ1ZmZlciA9IHRoaXMuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XHJcbiAgICAgICAgaWYgKHJlbmRlcmJ1ZmZlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmcmFtZWJ1ZmZlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpdChHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVuZGVyYnVmZmVyLmluaXQod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgZnJhbWVidWZmZXIuYXR0YWNoUmVuZGVyYnVmZmVyKHJlbmRlcmJ1ZmZlcik7XHJcbiAgICAgICAgdmFyIHRleHR1cmUgPSB0aGlzLmNyZWF0ZVRleHR1cmUoKTtcclxuICAgICAgICBpZiAodGV4dHVyZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmcmFtZWJ1ZmZlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHJlbmRlcmJ1ZmZlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpdChHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzRmxvYXQpIHtcclxuICAgICAgICAgICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUZsb2F0QXJyYXkod2lkdGgsIGhlaWdodCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXh0dXJlLnNldFRleHR1cmVGcm9tQXJyYXkod2lkdGgsIGhlaWdodCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFRleHR1cmUodGV4dHVyZSk7XHJcbiAgICAgICAgcmV0dXJuIGZyYW1lYnVmZmVyO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IGRyYXcgYnVmZmVycywgaW4gbGF6aWVyIHdheS5cclxuICAgICAqIElmIHlvdSBjYW4ndCBncmFiIGBXRUJHTF9kcmF3X2J1ZmZlcnNgIGV4dGVuc2lvbiwgeW91J2xsIGRpZSBpbnN0YW50bHkgYXQgdGhpcyBwb2ludC5cclxuICAgICAqL1xyXG4gICAgR0xDYXQucHJvdG90eXBlLmxhenlEcmF3YnVmZmVycyA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBudW1CdWZmZXJzLCBpc0Zsb2F0KSB7XHJcbiAgICAgICAgaWYgKGlzRmxvYXQgPT09IHZvaWQgMCkgeyBpc0Zsb2F0ID0gZmFsc2U7IH1cclxuICAgICAgICB2YXIgZXh0ID0gdGhpcy5nZXRFeHRlbnNpb24oJ1dFQkdMX2RyYXdfYnVmZmVycycsIHRydWUpO1xyXG4gICAgICAgIGlmIChleHQuTUFYX0RSQVdfQlVGRkVSU19XRUJHTCA8IG51bUJ1ZmZlcnMpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGl0KEVycm9yKCdHTENhdDogTWF4aW11bSBkcmF3IGJ1ZmZlcnMgY291bnQgZXhjZWVkZWQnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmcmFtZWJ1ZmZlciA9IHRoaXMuY3JlYXRlRnJhbWVidWZmZXIoKTtcclxuICAgICAgICBpZiAoZnJhbWVidWZmZXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGl0KEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmVuZGVyYnVmZmVyID0gdGhpcy5jcmVhdGVSZW5kZXJidWZmZXIoKTtcclxuICAgICAgICBpZiAocmVuZGVyYnVmZmVyID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZyYW1lYnVmZmVyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5zcGl0KEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZW5kZXJidWZmZXIuaW5pdCh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBmcmFtZWJ1ZmZlci5hdHRhY2hSZW5kZXJidWZmZXIocmVuZGVyYnVmZmVyKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bUJ1ZmZlcnM7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgdGV4dHVyZSA9IHRoaXMuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgICAgICBpZiAodGV4dHVyZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZnJhbWVidWZmZXIuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyYnVmZmVyLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BpdChHTENhdC51bmV4cGVjdGVkTnVsbERldGVjdGVkRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzRmxvYXQpIHtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUuc2V0VGV4dHVyZUZyb21GbG9hdEFycmF5KHdpZHRoLCBoZWlnaHQsIG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5zZXRUZXh0dXJlRnJvbUFycmF5KHdpZHRoLCBoZWlnaHQsIG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZyYW1lYnVmZmVyLmF0dGFjaFRleHR1cmUodGV4dHVyZSwgZXh0LkNPTE9SX0FUVEFDSE1FTlQwX1dFQkdMICsgaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmcmFtZWJ1ZmZlcjtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENhbGwgdGhpcyBiZWZvcmUgeW91J3JlIGdvbm5hIHVzZSBkcmF3IGJ1ZmZlcnMuXHJcbiAgICAgKiBJZiB5b3UgY2FuJ3QgZ3JhYiBgV0VCR0xfZHJhd19idWZmZXJzYCBleHRlbnNpb24sIHlvdSdsbCBkaWUgaW5zdGFudGx5IGF0IHRoaXMgcG9pbnQuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0LnByb3RvdHlwZS5kcmF3QnVmZmVycyA9IGZ1bmN0aW9uIChudW1CdWZmZXJzKSB7XHJcbiAgICAgICAgdmFyIGV4dCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKCdXRUJHTF9kcmF3X2J1ZmZlcnMnLCB0cnVlKTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShudW1CdWZmZXJzKSkge1xyXG4gICAgICAgICAgICBleHQuZHJhd0J1ZmZlcnNXRUJHTChudW1CdWZmZXJzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bUJ1ZmZlcnM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgYXJyYXlbaV0gPSBleHQuQ09MT1JfQVRUQUNITUVOVDBfV0VCR0wgKyBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV4dC5kcmF3QnVmZmVyc1dFQkdMKGFycmF5KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhciB0aGUgY3VycmVudCBmcmFtZWJ1ZmZlci5cclxuICAgICAqL1xyXG4gICAgR0xDYXQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKHJlZCwgZ3JlZW4sIGJsdWUsIGFscGhhLCBkZXB0aCkge1xyXG4gICAgICAgIGlmIChyZWQgPT09IHZvaWQgMCkgeyByZWQgPSAwLjA7IH1cclxuICAgICAgICBpZiAoZ3JlZW4gPT09IHZvaWQgMCkgeyBncmVlbiA9IDAuMDsgfVxyXG4gICAgICAgIGlmIChibHVlID09PSB2b2lkIDApIHsgYmx1ZSA9IDAuMDsgfVxyXG4gICAgICAgIGlmIChhbHBoYSA9PT0gdm9pZCAwKSB7IGFscGhhID0gMS4wOyB9XHJcbiAgICAgICAgaWYgKGRlcHRoID09PSB2b2lkIDApIHsgZGVwdGggPSAxLjA7IH1cclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2w7XHJcbiAgICAgICAgZ2wuY2xlYXJDb2xvcihyZWQsIGdyZWVuLCBibHVlLCBhbHBoYSk7XHJcbiAgICAgICAgZ2wuY2xlYXJEZXB0aChkZXB0aCk7XHJcbiAgICAgICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQpO1xyXG4gICAgfTtcclxuICAgIEdMQ2F0LnVuZXhwZWN0ZWROdWxsRGV0ZWN0ZWRFcnJvciA9IG5ldyBFcnJvcignR0xDYXQ6IFVuZXhwZWN0ZWQgbnVsbCBkZXRlY3RlZCcpO1xyXG4gICAgcmV0dXJuIEdMQ2F0O1xyXG59KGV2ZW50ZW1pdHRlcjNfMS5FdmVudEVtaXR0ZXIpKTtcclxuZXhwb3J0cy5HTENhdCA9IEdMQ2F0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29uc3RhbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vY29uc3RhbnRzXCIpKTtcclxuLyoqXHJcbiAqIEl0J3MgYSBXZWJHTEJ1ZmZlci5cclxuICovXHJcbnZhciBHTENhdEJ1ZmZlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0QnVmZmVyIGluc3RhbmNlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBHTENhdEJ1ZmZlcihnbENhdCwgYnVmZmVyKSB7XHJcbiAgICAgICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XHJcbiAgICAgICAgdGhpcy5fX2J1ZmZlciA9IGJ1ZmZlcjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgYnVmZmVyLlxyXG4gICAgICovXHJcbiAgICBHTENhdEJ1ZmZlci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9fZ2xDYXQuZ2V0UmVuZGVyaW5nQ29udGV4dCgpLmRlbGV0ZUJ1ZmZlcih0aGlzLl9fYnVmZmVyKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlIGl0cyBvd24gYnVmZmVyLlxyXG4gICAgICovXHJcbiAgICBHTENhdEJ1ZmZlci5wcm90b3R5cGUuZ2V0QnVmZmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9fYnVmZmVyO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2V0IG5ldyBkYXRhIGludG8gdGhpcyBidWZmZXIuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0QnVmZmVyLnByb3RvdHlwZS5zZXRWZXJ0ZXhidWZmZXIgPSBmdW5jdGlvbiAoc291cmNlLCB1c2FnZSkge1xyXG4gICAgICAgIGlmICh1c2FnZSA9PT0gdm9pZCAwKSB7IHVzYWdlID0gY29uc3RhbnRzXzEuZGVmYXVsdC5TVEFUSUNfRFJBVzsgfVxyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMuX19idWZmZXIpO1xyXG4gICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBzb3VyY2UsIHVzYWdlKTtcclxuICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbnVsbCk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgbmV3IGluZGV4IGRhdGEgaW50byB0aGlzIGJ1ZmZlci5cclxuICAgICAqL1xyXG4gICAgR0xDYXRCdWZmZXIucHJvdG90eXBlLnNldEluZGV4YnVmZmVyID0gZnVuY3Rpb24gKHNvdXJjZSwgdXNhZ2UpIHtcclxuICAgICAgICBpZiAodXNhZ2UgPT09IHZvaWQgMCkgeyB1c2FnZSA9IGNvbnN0YW50c18xLmRlZmF1bHQuU1RBVElDX0RSQVc7IH1cclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2V0UmVuZGVyaW5nQ29udGV4dCgpO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuX19idWZmZXIpO1xyXG4gICAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHNvdXJjZSwgdXNhZ2UpO1xyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG51bGwpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBHTENhdEJ1ZmZlcjtcclxufSgpKTtcclxuZXhwb3J0cy5HTENhdEJ1ZmZlciA9IEdMQ2F0QnVmZmVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29uc3RhbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vY29uc3RhbnRzXCIpKTtcclxuLyoqXHJcbiAqIEl0J3MgYSBXZWJHTEZyYW1lYnVmZmVyLlxyXG4gKi9cclxudmFyIEdMQ2F0RnJhbWVidWZmZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBHTENhdEZyYW1lYnVmZmVyIGluc3RhbmNlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBHTENhdEZyYW1lYnVmZmVyKGdsQ2F0LCBmcmFtZWJ1ZmZlcikge1xyXG4gICAgICAgIHRoaXMuX19yZW5kZXJidWZmZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX190ZXh0dXJlTWFwID0ge307XHJcbiAgICAgICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XHJcbiAgICAgICAgdGhpcy5fX2ZyYW1lYnVmZmVyID0gZnJhbWVidWZmZXI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIGZyYW1lYnVmZmVyLlxyXG4gICAgICovXHJcbiAgICBHTENhdEZyYW1lYnVmZmVyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKGFsc29BdHRhY2hlZCkge1xyXG4gICAgICAgIGlmIChhbHNvQXR0YWNoZWQgPT09IHZvaWQgMCkgeyBhbHNvQXR0YWNoZWQgPSBmYWxzZTsgfVxyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgZ2wuZGVsZXRlRnJhbWVidWZmZXIodGhpcy5fX2ZyYW1lYnVmZmVyKTtcclxuICAgICAgICBpZiAoYWxzb0F0dGFjaGVkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9fcmVuZGVyYnVmZmVyKSB7XHJcbiAgICAgICAgICAgICAgICBnbC5kZWxldGVSZW5kZXJidWZmZXIodGhpcy5fX3JlbmRlcmJ1ZmZlci5nZXRSZW5kZXJidWZmZXIoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLl9fdGV4dHVyZU1hcCkuZm9yRWFjaChmdW5jdGlvbiAodGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgZ2wuZGVsZXRlVGV4dHVyZSh0ZXh0dXJlLmdldFRleHR1cmUoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBpdHMgb3duIGZyYW1lYnVmZmVyLlxyXG4gICAgICovXHJcbiAgICBHTENhdEZyYW1lYnVmZmVyLnByb3RvdHlwZS5nZXRGcmFtZWJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX2ZyYW1lYnVmZmVyO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGl0cyBhdHRhY2hlZCByZW5kZXJidWZmZXIuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0RnJhbWVidWZmZXIucHJvdG90eXBlLmdldFJlbmRlcmJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX3JlbmRlcmJ1ZmZlcjtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBpdHMgYXR0YWNoZWQgdGV4dHVyZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRGcmFtZWJ1ZmZlci5wcm90b3R5cGUuZ2V0VGV4dHVyZSA9IGZ1bmN0aW9uIChhdHRhY2htZW50KSB7XHJcbiAgICAgICAgaWYgKGF0dGFjaG1lbnQgPT09IHZvaWQgMCkgeyBhdHRhY2htZW50ID0gY29uc3RhbnRzXzEuZGVmYXVsdC5DT0xPUl9BVFRBQ0hNRU5UMDsgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9fdGV4dHVyZU1hcFthdHRhY2htZW50XTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhIHJlbmRlcmJ1ZmZlciB0byB0aGlzIGZyYW1lYnVmZmVyLlxyXG4gICAgICovXHJcbiAgICBHTENhdEZyYW1lYnVmZmVyLnByb3RvdHlwZS5hdHRhY2hSZW5kZXJidWZmZXIgPSBmdW5jdGlvbiAocmVuZGVyYnVmZmVyLCBhdHRhY2htZW50KSB7XHJcbiAgICAgICAgaWYgKGF0dGFjaG1lbnQgPT09IHZvaWQgMCkgeyBhdHRhY2htZW50ID0gY29uc3RhbnRzXzEuZGVmYXVsdC5ERVBUSF9BVFRBQ0hNRU5UOyB9XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdldFJlbmRlcmluZ0NvbnRleHQoKTtcclxuICAgICAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIHRoaXMuX19mcmFtZWJ1ZmZlcik7XHJcbiAgICAgICAgZ2wuZnJhbWVidWZmZXJSZW5kZXJidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIGF0dGFjaG1lbnQsIGdsLlJFTkRFUkJVRkZFUiwgcmVuZGVyYnVmZmVyLmdldFJlbmRlcmJ1ZmZlcigpKTtcclxuICAgICAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG51bGwpO1xyXG4gICAgICAgIHRoaXMuX19yZW5kZXJidWZmZXIgPSByZW5kZXJidWZmZXI7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYSB0ZXh0dXJlIHRvIHRoaXMgZnJhbWVidWZmZXIuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0RnJhbWVidWZmZXIucHJvdG90eXBlLmF0dGFjaFRleHR1cmUgPSBmdW5jdGlvbiAodGV4dHVyZSwgYXR0YWNobWVudCkge1xyXG4gICAgICAgIGlmIChhdHRhY2htZW50ID09PSB2b2lkIDApIHsgYXR0YWNobWVudCA9IGNvbnN0YW50c18xLmRlZmF1bHQuQ09MT1JfQVRUQUNITUVOVDA7IH1cclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2V0UmVuZGVyaW5nQ29udGV4dCgpO1xyXG4gICAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgdGhpcy5fX2ZyYW1lYnVmZmVyKTtcclxuICAgICAgICBnbC5mcmFtZWJ1ZmZlclRleHR1cmUyRChnbC5GUkFNRUJVRkZFUiwgYXR0YWNobWVudCwgZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZS5nZXRUZXh0dXJlKCksIDApO1xyXG4gICAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5fX3RleHR1cmVNYXBbYXR0YWNobWVudF0gPSB0ZXh0dXJlO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBHTENhdEZyYW1lYnVmZmVyO1xyXG59KCkpO1xyXG5leHBvcnRzLkdMQ2F0RnJhbWVidWZmZXIgPSBHTENhdEZyYW1lYnVmZmVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29uc3RhbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vY29uc3RhbnRzXCIpKTtcclxuLyoqXHJcbiAqIEl0J3MgYSBXZWJHTFByb2dyYW0sIGJ1dCBoYXMgY2FjaGUgb2YgdmFyaWFibGUgbG9jYXRpb25zLlxyXG4gKi9cclxudmFyIEdMQ2F0UHJvZ3JhbSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IEdMQ2F0UHJvZ3JhbSBpbnN0YW5jZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gR0xDYXRQcm9ncmFtKGdsQ2F0LCBwcm9ncmFtKSB7XHJcbiAgICAgICAgdGhpcy5fX3NoYWRlcnMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX19hdHRyaWJMb2NhdGlvbkNhY2hlID0ge307XHJcbiAgICAgICAgdGhpcy5fX3VuaWZvcm1Mb2NhdGlvbkNhY2hlID0ge307XHJcbiAgICAgICAgdGhpcy5fX2xpbmtlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xyXG4gICAgICAgIHRoaXMuX19wcm9ncmFtID0gcHJvZ3JhbTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogRGlzcG9zZSB0aGUgcHJvZ3JhbS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCkuZGVsZXRlUHJvZ3JhbSh0aGlzLl9fcHJvZ3JhbSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gd2hldGhlciB0aGUgbGFzdCBsaW5rIG9wZXJhdGlvbiB3YXMgc3VjY2Vzc2Z1bCBvciBub3QuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUuaXNMaW5rZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX19saW5rZWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZSBpdHMgb3duIHByb2dyYW0uXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUuZ2V0UHJvZ3JhbSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX3Byb2dyYW07XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZSBpdHMgc2hhZGVycy5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS5nZXRTaGFkZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9fc2hhZGVycyA/IHRoaXMuX19zaGFkZXJzLmNvbmNhdCgpIDogbnVsbDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBzaGFkZXJzIGFuZCBsaW5rIHRoaXMgcHJvZ3JhbS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHNoYWRlcnMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBzaGFkZXJzW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgc2hhZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChzaGFkZXIpIHsgcmV0dXJuIGdsLmF0dGFjaFNoYWRlcihfdGhpcy5fX3Byb2dyYW0sIHNoYWRlci5nZXRTaGFkZXIoKSk7IH0pO1xyXG4gICAgICAgIGdsLmxpbmtQcm9ncmFtKHRoaXMuX19wcm9ncmFtKTtcclxuICAgICAgICB0aGlzLl9fbGlua2VkID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLl9fcHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpO1xyXG4gICAgICAgIGlmICghdGhpcy5fX2xpbmtlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9fZ2xDYXQuc3BpdChnbC5nZXRQcm9ncmFtSW5mb0xvZyh0aGlzLl9fcHJvZ3JhbSkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX19zaGFkZXJzID0gc2hhZGVycy5jb25jYXQoKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhbiBhdHRyaWJ1dGUgdmFyaWFibGUuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdmFyaWFibGVcclxuICAgICAqIEBwYXJhbSBidWZmZXIgVmVydGV4IGJ1ZmZlci4gQ2FuIGJlIG51bGwsIHRvIGRpc2FibGUgYXR0cmlidXRlIGFycmF5XHJcbiAgICAgKiBAcGFyYW0gc2l6ZSBOdW1iZXIgb2YgY29tcG9uZW50cyBwZXIgdmVydGV4LiBNdXN0IGJlIDEsIDIsIDMgb3IgNFxyXG4gICAgICovXHJcbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLmF0dHJpYnV0ZSA9IGZ1bmN0aW9uIChuYW1lLCBidWZmZXIsIHNpemUsIGRpdmlzb3IsIHR5cGUsIHN0cmlkZSwgb2Zmc2V0KSB7XHJcbiAgICAgICAgaWYgKHNpemUgPT09IHZvaWQgMCkgeyBzaXplID0gMTsgfVxyXG4gICAgICAgIGlmIChkaXZpc29yID09PSB2b2lkIDApIHsgZGl2aXNvciA9IDA7IH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gdm9pZCAwKSB7IHR5cGUgPSBjb25zdGFudHNfMS5kZWZhdWx0LkZMT0FUOyB9XHJcbiAgICAgICAgaWYgKHN0cmlkZSA9PT0gdm9pZCAwKSB7IHN0cmlkZSA9IDA7IH1cclxuICAgICAgICBpZiAob2Zmc2V0ID09PSB2b2lkIDApIHsgb2Zmc2V0ID0gMDsgfVxyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRBdHRyaWJMb2NhdGlvbihuYW1lKTtcclxuICAgICAgICBpZiAobG9jYXRpb24gPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJ1ZmZlciA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBnbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkobG9jYXRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIuZ2V0QnVmZmVyKCkpO1xyXG4gICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uKTtcclxuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGxvY2F0aW9uLCBzaXplLCB0eXBlLCBmYWxzZSwgc3RyaWRlLCBvZmZzZXQpO1xyXG4gICAgICAgIHZhciBleHQgPSB0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCdBTkdMRV9pbnN0YW5jZWRfYXJyYXlzJyk7XHJcbiAgICAgICAgaWYgKGV4dCkge1xyXG4gICAgICAgICAgICBleHQudmVydGV4QXR0cmliRGl2aXNvckFOR0xFKGxvY2F0aW9uLCBkaXZpc29yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0xaSB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtMWkgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2V0UmVuZGVyaW5nQ29udGV4dCgpO1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xyXG4gICAgICAgIGdsLnVuaWZvcm0xaShsb2NhdGlvbiwgdmFsdWUpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0yaSB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtMmkgPSBmdW5jdGlvbiAobmFtZSwgeCwgeSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTJpKGxvY2F0aW9uLCB4LCB5KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhbiB1bmlmb3JtM2kgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTNpID0gZnVuY3Rpb24gKG5hbWUsIHgsIHksIHopIHtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2V0UmVuZGVyaW5nQ29udGV4dCgpO1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xyXG4gICAgICAgIGdsLnVuaWZvcm0zaShsb2NhdGlvbiwgeCwgeSwgeik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybTRpIHZhcmlhYmxlLlxyXG4gICAgICovXHJcbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLnVuaWZvcm00aSA9IGZ1bmN0aW9uIChuYW1lLCB4LCB5LCB6LCB3KSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdldFJlbmRlcmluZ0NvbnRleHQoKTtcclxuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbihuYW1lKTtcclxuICAgICAgICBnbC51bmlmb3JtNGkobG9jYXRpb24sIHgsIHksIHosIHcpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0xaXYgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTFpdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTFpdihsb2NhdGlvbiwgYXJyYXkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0yaXYgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTJpdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTJpdihsb2NhdGlvbiwgYXJyYXkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0zaXYgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTNpdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTNpdihsb2NhdGlvbiwgYXJyYXkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm00aXYgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTRpdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTRpdihsb2NhdGlvbiwgYXJyYXkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0xZiB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtMWYgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2V0UmVuZGVyaW5nQ29udGV4dCgpO1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xyXG4gICAgICAgIGdsLnVuaWZvcm0xZihsb2NhdGlvbiwgdmFsdWUpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0yZiB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtMmYgPSBmdW5jdGlvbiAobmFtZSwgeCwgeSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTJmKGxvY2F0aW9uLCB4LCB5KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhbiB1bmlmb3JtM2YgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTNmID0gZnVuY3Rpb24gKG5hbWUsIHgsIHksIHopIHtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2V0UmVuZGVyaW5nQ29udGV4dCgpO1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xyXG4gICAgICAgIGdsLnVuaWZvcm0zZihsb2NhdGlvbiwgeCwgeSwgeik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybTRmIHZhcmlhYmxlLlxyXG4gICAgICovXHJcbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLnVuaWZvcm00ZiA9IGZ1bmN0aW9uIChuYW1lLCB4LCB5LCB6LCB3KSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdldFJlbmRlcmluZ0NvbnRleHQoKTtcclxuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbihuYW1lKTtcclxuICAgICAgICBnbC51bmlmb3JtNGYobG9jYXRpb24sIHgsIHksIHosIHcpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0xZnYgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTFmdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTFmdihsb2NhdGlvbiwgYXJyYXkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0yZnYgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTJmdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTJmdihsb2NhdGlvbiwgYXJyYXkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm0zZnYgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTNmdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTNmdihsb2NhdGlvbiwgYXJyYXkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm00ZnYgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybTRmdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybTRmdihsb2NhdGlvbiwgYXJyYXkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGFuIHVuaWZvcm1NYXRyaXgyZnYgdmFyaWFibGUuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUudW5pZm9ybU1hdHJpeDJmdiA9IGZ1bmN0aW9uIChuYW1lLCBhcnJheSwgdHJhbnNwb3NlKSB7XHJcbiAgICAgICAgaWYgKHRyYW5zcG9zZSA9PT0gdm9pZCAwKSB7IHRyYW5zcG9zZSA9IGZhbHNlOyB9XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdldFJlbmRlcmluZ0NvbnRleHQoKTtcclxuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldFVuaWZvcm1Mb2NhdGlvbihuYW1lKTtcclxuICAgICAgICBnbC51bmlmb3JtTWF0cml4MmZ2KGxvY2F0aW9uLCB0cmFuc3Bvc2UsIGFycmF5KTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhbiB1bmlmb3JtTWF0cml4M2Z2IHZhcmlhYmxlLlxyXG4gICAgICovXHJcbiAgICBHTENhdFByb2dyYW0ucHJvdG90eXBlLnVuaWZvcm1NYXRyaXgzZnYgPSBmdW5jdGlvbiAobmFtZSwgYXJyYXksIHRyYW5zcG9zZSkge1xyXG4gICAgICAgIGlmICh0cmFuc3Bvc2UgPT09IHZvaWQgMCkgeyB0cmFuc3Bvc2UgPSBmYWxzZTsgfVxyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XHJcbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDNmdihsb2NhdGlvbiwgdHJhbnNwb3NlLCBhcnJheSk7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBBdHRhY2ggYW4gdW5pZm9ybU1hdHJpeDRmdiB2YXJpYWJsZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtTWF0cml4NGZ2ID0gZnVuY3Rpb24gKG5hbWUsIGFycmF5LCB0cmFuc3Bvc2UpIHtcclxuICAgICAgICBpZiAodHJhbnNwb3NlID09PSB2b2lkIDApIHsgdHJhbnNwb3NlID0gZmFsc2U7IH1cclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2V0UmVuZGVyaW5nQ29udGV4dCgpO1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xyXG4gICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYobG9jYXRpb24sIHRyYW5zcG9zZSwgYXJyYXkpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGEgYHNhbXBsZXIyRGAgdHlwZSB1bmlmb3JtIHRleHR1cmUuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSB1bmlmb3JtIHRleHR1cmVcclxuICAgICAqIEBwYXJhbSB0ZXh0dXJlIFRleHR1cmUgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gbnVtYmVyIFNwZWNpZnkgYSB0ZXh0dXJlIHVuaXQsIGluIGludGVnZXJcclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtVGV4dHVyZSA9IGZ1bmN0aW9uIChuYW1lLCB0ZXh0dXJlLCBudW1iZXIpIHtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2V0UmVuZGVyaW5nQ29udGV4dCgpO1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xyXG4gICAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyBudW1iZXIpO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xyXG4gICAgICAgIGdsLnVuaWZvcm0xaShsb2NhdGlvbiwgbnVtYmVyKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhIGBzYW1wbGVyQ3ViZWAgdHlwZSB1bmlmb3JtIHRleHR1cmUuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSB1bmlmb3JtIHRleHR1cmVcclxuICAgICAqIEBwYXJhbSB0ZXh0dXJlIFRleHR1cmUgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gbnVtYmVyIFNwZWNpZnkgYSB0ZXh0dXJlIHVuaXQsIGluIGludGVnZXJcclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS51bmlmb3JtQ3ViZW1hcCA9IGZ1bmN0aW9uIChuYW1lLCB0ZXh0dXJlLCBudW1iZXIpIHtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2V0UmVuZGVyaW5nQ29udGV4dCgpO1xyXG4gICAgICAgIHZhciBsb2NhdGlvbiA9IHRoaXMuZ2V0VW5pZm9ybUxvY2F0aW9uKG5hbWUpO1xyXG4gICAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyBudW1iZXIpO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfQ1VCRV9NQVAsIHRleHR1cmUpO1xyXG4gICAgICAgIGdsLnVuaWZvcm0xaShsb2NhdGlvbiwgbnVtYmVyKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlIGF0dHJpYnV0ZSBsb2NhdGlvbi5cclxuICAgICAqL1xyXG4gICAgR0xDYXRQcm9ncmFtLnByb3RvdHlwZS5nZXRBdHRyaWJMb2NhdGlvbiA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdldFJlbmRlcmluZ0NvbnRleHQoKTtcclxuICAgICAgICBpZiAodGhpcy5fX2F0dHJpYkxvY2F0aW9uQ2FjaGVbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2F0dHJpYkxvY2F0aW9uQ2FjaGVbbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLl9fcHJvZ3JhbSwgbmFtZSk7XHJcbiAgICAgICAgICAgIC8vIGlmICggbG9jYXRpb24gPT09IC0xICkge1xyXG4gICAgICAgICAgICAvLyAgIHRoaXMuZ2xDYXQuc3BpdCggJ0dMQ2F0UHJvZ3JhbS5nZXRBdHRyaWJMb2NhdGlvbjogQ291bGQgbm90IHJldHJpZXZlIGF0dHJpYnV0ZSBsb2NhdGlvbicgKTtcclxuICAgICAgICAgICAgLy8gICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgdGhpcy5fX2F0dHJpYkxvY2F0aW9uQ2FjaGVbbmFtZV0gPSBsb2NhdGlvbjtcclxuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlIHVuaWZvcm0gbG9jYXRpb24uXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UHJvZ3JhbS5wcm90b3R5cGUuZ2V0VW5pZm9ybUxvY2F0aW9uID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2V0UmVuZGVyaW5nQ29udGV4dCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9fdW5pZm9ybUxvY2F0aW9uQ2FjaGVbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3VuaWZvcm1Mb2NhdGlvbkNhY2hlW25hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuX19wcm9ncmFtLCBuYW1lKTtcclxuICAgICAgICAgICAgLy8gaWYgKCBsb2NhdGlvbiA9PT0gbnVsbCApIHtcclxuICAgICAgICAgICAgLy8gICB0aGlzLmdsQ2F0LnNwaXQoICdHTENhdFByb2dyYW0uZ2V0VW5pZm9ybUxvY2F0aW9uOiBDb3VsZCBub3QgcmV0cmlldmUgdW5pZm9ybSBsb2NhdGlvbicgKTtcclxuICAgICAgICAgICAgLy8gICByZXR1cm4gbG9jYXRpb247XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgdGhpcy5fX3VuaWZvcm1Mb2NhdGlvbkNhY2hlW25hbWVdID0gbG9jYXRpb247XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEdMQ2F0UHJvZ3JhbTtcclxufSgpKTtcclxuZXhwb3J0cy5HTENhdFByb2dyYW0gPSBHTENhdFByb2dyYW07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb25zdGFudHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9jb25zdGFudHNcIikpO1xyXG4vKipcclxuICogSXQncyBhIFdlYkdMUmVuZGVyYnVmZmVyLlxyXG4gKi9cclxudmFyIEdMQ2F0UmVuZGVyYnVmZmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgR0xDYXRUZXh0dXJlIGluc3RhbmNlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBHTENhdFJlbmRlcmJ1ZmZlcihnbENhdCwgcmVuZGVyYnVmZmVyKSB7XHJcbiAgICAgICAgdGhpcy5fX3dpZHRoID0gMDtcclxuICAgICAgICB0aGlzLl9faGVpZ2h0ID0gMDtcclxuICAgICAgICB0aGlzLl9fZ2xDYXQgPSBnbENhdDtcclxuICAgICAgICB0aGlzLl9fcmVuZGVyYnVmZmVyID0gcmVuZGVyYnVmZmVyO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSByZW5kZXJidWZmZXIuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UmVuZGVyYnVmZmVyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCkuZGVsZXRlUmVuZGVyYnVmZmVyKHRoaXMuX19yZW5kZXJidWZmZXIpO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGl0cyBvd24gcmVuZGVyYnVmZmVyLlxyXG4gICAgICovXHJcbiAgICBHTENhdFJlbmRlcmJ1ZmZlci5wcm90b3R5cGUuZ2V0UmVuZGVyYnVmZmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9fcmVuZGVyYnVmZmVyO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGl0cyB3aWR0aC5cclxuICAgICAqL1xyXG4gICAgR0xDYXRSZW5kZXJidWZmZXIucHJvdG90eXBlLmdldFdpZHRoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9fd2lkdGg7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gaXRzIGhlaWdodC5cclxuICAgICAqL1xyXG4gICAgR0xDYXRSZW5kZXJidWZmZXIucHJvdG90eXBlLmdldEhlaWdodCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX2hlaWdodDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemUgdGhpcyByZW5kZXJidWZmZXIuXHJcbiAgICAgKiBJZiBgZm9ybWF0YCBpcyBub3QgZ2l2ZW4sIGl0IHdpbGwgYmUgaW5pdGlhbGl6ZWQgYXMgYERFUFRIX0NPTVBPTkVOVDE2YCAuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0UmVuZGVyYnVmZmVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIGZvcm1hdCkge1xyXG4gICAgICAgIGlmIChmb3JtYXQgPT09IHZvaWQgMCkgeyBmb3JtYXQgPSBjb25zdGFudHNfMS5kZWZhdWx0LkRFUFRIX0NPTVBPTkVOVDE2OyB9XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdldFJlbmRlcmluZ0NvbnRleHQoKTtcclxuICAgICAgICBnbC5iaW5kUmVuZGVyYnVmZmVyKGdsLlJFTkRFUkJVRkZFUiwgdGhpcy5fX3JlbmRlcmJ1ZmZlcik7XHJcbiAgICAgICAgZ2wucmVuZGVyYnVmZmVyU3RvcmFnZShnbC5SRU5ERVJCVUZGRVIsIGZvcm1hdCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgZ2wuYmluZFJlbmRlcmJ1ZmZlcihnbC5SRU5ERVJCVUZGRVIsIG51bGwpO1xyXG4gICAgICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEdMQ2F0UmVuZGVyYnVmZmVyO1xyXG59KCkpO1xyXG5leHBvcnRzLkdMQ2F0UmVuZGVyYnVmZmVyID0gR0xDYXRSZW5kZXJidWZmZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8qKlxyXG4gKiBJdCdzIGEgV2ViR0xTaGFkZXIuXHJcbiAqL1xyXG52YXIgR0xDYXRTaGFkZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBHTENhdFNoYWRlciBpbnN0YW5jZS5cclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gR0xDYXRTaGFkZXIoZ2xDYXQsIHNoYWRlcikge1xyXG4gICAgICAgIHRoaXMuX19jb21waWxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX19nbENhdCA9IGdsQ2F0O1xyXG4gICAgICAgIHRoaXMuX19zaGFkZXIgPSBzaGFkZXI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2UgdGhlIHNoYWRlci5cclxuICAgICAqL1xyXG4gICAgR0xDYXRTaGFkZXIucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fX2dsQ2F0LmdldFJlbmRlcmluZ0NvbnRleHQoKS5kZWxldGVTaGFkZXIodGhpcy5fX3NoYWRlcik7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gd2hldGhlciB0aGUgbGFzdCBjb21waWxhdGlvbiB3YXMgc3VjY2Vzc2Z1bCBvciBub3QuXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0U2hhZGVyLnByb3RvdHlwZS5pc0NvbXBpbGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9fY29tcGlsZWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZSBpdHMgb3duIHNoYWRlci5cclxuICAgICAqL1xyXG4gICAgR0xDYXRTaGFkZXIucHJvdG90eXBlLmdldFNoYWRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX3NoYWRlcjtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENvbXBpbGUgdGhlIHNoYWRlci5cclxuICAgICAqL1xyXG4gICAgR0xDYXRTaGFkZXIucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbiAoY29kZSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgZ2wuc2hhZGVyU291cmNlKHRoaXMuX19zaGFkZXIsIGNvZGUpO1xyXG4gICAgICAgIGdsLmNvbXBpbGVTaGFkZXIodGhpcy5fX3NoYWRlcik7XHJcbiAgICAgICAgdGhpcy5fX2NvbXBpbGVkID0gZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHRoaXMuX19zaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKTtcclxuICAgICAgICBpZiAoIXRoaXMuX19jb21waWxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9fZ2xDYXQuc3BpdChnbC5nZXRTaGFkZXJJbmZvTG9nKHRoaXMuX19zaGFkZXIpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEdMQ2F0U2hhZGVyO1xyXG59KCkpO1xyXG5leHBvcnRzLkdMQ2F0U2hhZGVyID0gR0xDYXRTaGFkZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb25zdGFudHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9jb25zdGFudHNcIikpO1xyXG4vKipcclxuICogSXQncyBhIFdlYkdMVGV4dHVyZS5cclxuICovXHJcbnZhciBHTENhdFRleHR1cmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBHTENhdFRleHR1cmUgaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIEdMQ2F0VGV4dHVyZShnbENhdCwgdGV4dHVyZSkge1xyXG4gICAgICAgIHRoaXMuX193aWR0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fX2hlaWdodCA9IDA7XHJcbiAgICAgICAgdGhpcy5fX2dsQ2F0ID0gZ2xDYXQ7XHJcbiAgICAgICAgdGhpcy5fX3RleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIHRoaXMudGV4dHVyZUZpbHRlcihjb25zdGFudHNfMS5kZWZhdWx0LkxJTkVBUik7XHJcbiAgICAgICAgdGhpcy50ZXh0dXJlV3JhcChjb25zdGFudHNfMS5kZWZhdWx0LkNMQU1QX1RPX0VER0UpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSB0ZXh0dXJlLlxyXG4gICAgICovXHJcbiAgICBHTENhdFRleHR1cmUucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fX2dsQ2F0LmdldFJlbmRlcmluZ0NvbnRleHQoKS5kZWxldGVUZXh0dXJlKHRoaXMuX190ZXh0dXJlKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlIGl0cyBvd24gdGV4dHVyZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRUZXh0dXJlLnByb3RvdHlwZS5nZXRUZXh0dXJlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9fdGV4dHVyZTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBpdHMgd2lkdGguXHJcbiAgICAgKi9cclxuICAgIEdMQ2F0VGV4dHVyZS5wcm90b3R5cGUuZ2V0V2lkdGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX193aWR0aDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBpdHMgaGVpZ2h0LlxyXG4gICAgICovXHJcbiAgICBHTENhdFRleHR1cmUucHJvdG90eXBlLmdldEhlaWdodCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX2hlaWdodDtcclxuICAgIH07XHJcbiAgICBHTENhdFRleHR1cmUucHJvdG90eXBlLnRleHR1cmVGaWx0ZXIgPSBmdW5jdGlvbiAoZmlsdGVyTWFnLCBmaWx0ZXJNaW4pIHtcclxuICAgICAgICBpZiAoZmlsdGVyTWFnID09PSB2b2lkIDApIHsgZmlsdGVyTWFnID0gY29uc3RhbnRzXzEuZGVmYXVsdC5ORUFSRVNUOyB9XHJcbiAgICAgICAgaWYgKGZpbHRlck1pbiA9PT0gdm9pZCAwKSB7IGZpbHRlck1pbiA9IGZpbHRlck1hZzsgfVxyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5fX3RleHR1cmUpO1xyXG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBmaWx0ZXJNYWcpO1xyXG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBmaWx0ZXJNaW4pO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xyXG4gICAgfTtcclxuICAgIEdMQ2F0VGV4dHVyZS5wcm90b3R5cGUudGV4dHVyZVdyYXAgPSBmdW5jdGlvbiAod3JhcFMsIHdyYXBUKSB7XHJcbiAgICAgICAgaWYgKHdyYXBTID09PSB2b2lkIDApIHsgd3JhcFMgPSBjb25zdGFudHNfMS5kZWZhdWx0LkNMQU1QX1RPX0VER0U7IH1cclxuICAgICAgICBpZiAod3JhcFQgPT09IHZvaWQgMCkgeyB3cmFwVCA9IHdyYXBTOyB9XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdldFJlbmRlcmluZ0NvbnRleHQoKTtcclxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl9fdGV4dHVyZSk7XHJcbiAgICAgICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgd3JhcFMpO1xyXG4gICAgICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIHdyYXBUKTtcclxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgdGV4dHVyZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRUZXh0dXJlLnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5fX3RleHR1cmUpO1xyXG4gICAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgc291cmNlKTtcclxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcclxuICAgICAgICB0aGlzLl9fd2lkdGggPSBzb3VyY2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fX2hlaWdodCA9IHNvdXJjZS5oZWlnaHQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgbmV3IGRhdGEgaW50byB0aGlzIHRleHR1cmUuXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHVzZXMgYFVpbnQ4QXJyYXlgLiBJZiB5b3Ugd2FudCB0byBzb3VyY2UgaW1hZ2UgZGF0YSwgdXNlIGBHTENhdC5zZXRUZXh0dXJlKClgIGluc3RlYWQuXHJcbiAgICAgKiBPciB5b3Ugd2FudCB0byB1c2UgZmxvYXQgdGV4dHVyZT8gVHJ5IHRoaXM6IGBHTENhdC5zZXRUZXh0dXJlRnJvbUZsb2F0QXJyYXkoKWBcclxuICAgICAqL1xyXG4gICAgR0xDYXRUZXh0dXJlLnByb3RvdHlwZS5zZXRUZXh0dXJlRnJvbUFycmF5ID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIHNvdXJjZSwgZm9ybWF0KSB7XHJcbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gdm9pZCAwKSB7IGZvcm1hdCA9IGNvbnN0YW50c18xLmRlZmF1bHQuUkdCQTsgfVxyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5fX3RleHR1cmUpO1xyXG4gICAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0LCAwLCBmb3JtYXQsIGdsLlVOU0lHTkVEX0JZVEUsIHNvdXJjZSk7XHJcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5fX3dpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fX2hlaWdodCA9IGhlaWdodDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldCBuZXcgZGF0YSBpbnRvIHRoaXMgdGV4dHVyZS5cclxuICAgICAqIFRoaXMgZnVuY3Rpb24gdXNlcyBgRmxvYXQzMkFycmF5YC5cclxuICAgICAqIElmIHlvdSBjYW4ndCBncmFiIGBPRVNfdGV4dHVyZV9mbG9hdGAgZXh0ZW5zaW9uIGhlcmUsIHlvdSB3aWxsIGRpZSBhdCB0aGlzIHBvaW50LlxyXG4gICAgICovXHJcbiAgICBHTENhdFRleHR1cmUucHJvdG90eXBlLnNldFRleHR1cmVGcm9tRmxvYXRBcnJheSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBzb3VyY2UsIGZvcm1hdCkge1xyXG4gICAgICAgIGlmIChmb3JtYXQgPT09IHZvaWQgMCkgeyBmb3JtYXQgPSBjb25zdGFudHNfMS5kZWZhdWx0LlJHQkE7IH1cclxuICAgICAgICB2YXIgZ2wgPSB0aGlzLl9fZ2xDYXQuZ2V0UmVuZGVyaW5nQ29udGV4dCgpO1xyXG4gICAgICAgIHRoaXMuX19nbENhdC5nZXRFeHRlbnNpb24oJ09FU190ZXh0dXJlX2Zsb2F0JywgdHJ1ZSk7XHJcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5fX3RleHR1cmUpO1xyXG4gICAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZm9ybWF0LCB3aWR0aCwgaGVpZ2h0LCAwLCBmb3JtYXQsIGdsLkZMT0FULCBzb3VyY2UpO1xyXG4gICAgICAgIGlmICh0aGlzLl9fZ2xDYXQuZ2V0RXh0ZW5zaW9uKCdPRVNfdGV4dHVyZV9mbG9hdF9saW5lYXInKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRleHR1cmVGaWx0ZXIoZ2wuTkVBUkVTVCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xyXG4gICAgICAgIHRoaXMuX193aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIHRoaXMuX19oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb3B5IHBpeGVscyBmcm9tIGN1cnJlbnQgZnJhbWVidWZmZXIgdG8gZ2l2ZW4gdGV4dHVyZS5cclxuICAgICAqL1xyXG4gICAgR0xDYXRUZXh0dXJlLnByb3RvdHlwZS5jb3B5VGV4dHVyZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgdmFyIGdsID0gdGhpcy5fX2dsQ2F0LmdldFJlbmRlcmluZ0NvbnRleHQoKTtcclxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl9fdGV4dHVyZSk7XHJcbiAgICAgICAgZ2wuY29weVRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgMCwgMCwgd2lkdGgsIGhlaWdodCwgMCk7XHJcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5fX3dpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgdGhpcy5fX2hlaWdodCA9IGhlaWdodDtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFNldCBuZXcgY3ViZW1hcCBkYXRhIGludG8gdGhpcyB0ZXh0dXJlLlxyXG4gICAgICogQHBhcmFtIHRleHR1cmVzIEFycmF5IG9mIGlhbWdlcy4gT3JkZXI6IGBYK2AsIGBYLWAsIGBZK2AsIGBZLWAsIGBaK2AsIGBaLWBcclxuICAgICAqIEB0b2RvIGR1ZSB0byBjb21wYXRpYmlsaXR5IG9mIGl0cyBgd2lkdGhgIGFuZCBgaGVpZ2h0YCBpdCBzaG91bGQgbm90IGJlIHVzZWQgeWV0XHJcbiAgICAgKi9cclxuICAgIEdMQ2F0VGV4dHVyZS5wcm90b3R5cGUuc2V0Q3ViZW1hcCA9IGZ1bmN0aW9uICh0ZXh0dXJlcykge1xyXG4gICAgICAgIHZhciBnbCA9IHRoaXMuX19nbENhdC5nZXRSZW5kZXJpbmdDb250ZXh0KCk7XHJcbiAgICAgICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV9DVUJFX01BUCwgdGhpcy5fX3RleHR1cmUpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YICsgaSwgMCwgZ2wuUkdCQSwgZ2wuUkdCQSwgZ2wuVU5TSUdORURfQllURSwgdGV4dHVyZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfQ1VCRV9NQVAsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSKTtcclxuICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfQ1VCRV9NQVAsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKTtcclxuICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfQ1VCRV9NQVAsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcclxuICAgICAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfQ1VCRV9NQVAsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcclxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFX0NVQkVfTUFQLCBudWxsKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gR0xDYXRUZXh0dXJlO1xyXG59KCkpO1xyXG5leHBvcnRzLkdMQ2F0VGV4dHVyZSA9IEdMQ2F0VGV4dHVyZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5kZWZhdWx0ID0ge1xyXG4gICAgQUNUSVZFX0FUVFJJQlVURVM6IDM1NzIxLFxyXG4gICAgQUNUSVZFX0FUVFJJQlVURV9NQVhfTEVOR1RIOiAzNTcyMixcclxuICAgIEFDVElWRV9URVhUVVJFOiAzNDAxNixcclxuICAgIEFDVElWRV9VTklGT1JNUzogMzU3MTgsXHJcbiAgICBBQ1RJVkVfVU5JRk9STV9NQVhfTEVOR1RIOiAzNTcxOSxcclxuICAgIEFMSUFTRURfTElORV9XSURUSF9SQU5HRTogMzM5MDIsXHJcbiAgICBBTElBU0VEX1BPSU5UX1NJWkVfUkFOR0U6IDMzOTAxLFxyXG4gICAgQUxQSEE6IDY0MDYsXHJcbiAgICBBTFBIQV9CSVRTOiAzNDEzLFxyXG4gICAgQUxXQVlTOiA1MTksXHJcbiAgICBBUlJBWV9CVUZGRVI6IDM0OTYyLFxyXG4gICAgQVJSQVlfQlVGRkVSX0JJTkRJTkc6IDM0OTY0LFxyXG4gICAgQVRUQUNIRURfU0hBREVSUzogMzU3MTcsXHJcbiAgICBCQUNLOiAxMDI5LFxyXG4gICAgQkxFTkQ6IDMwNDIsXHJcbiAgICBCTEVORF9DT0xPUjogMzI3NzMsXHJcbiAgICBCTEVORF9EU1RfQUxQSEE6IDMyOTcwLFxyXG4gICAgQkxFTkRfRFNUX1JHQjogMzI5NjgsXHJcbiAgICBCTEVORF9FUVVBVElPTjogMzI3NzcsXHJcbiAgICBCTEVORF9FUVVBVElPTl9BTFBIQTogMzQ4NzcsXHJcbiAgICBCTEVORF9FUVVBVElPTl9SR0I6IDMyNzc3LFxyXG4gICAgQkxFTkRfU1JDX0FMUEhBOiAzMjk3MSxcclxuICAgIEJMRU5EX1NSQ19SR0I6IDMyOTY5LFxyXG4gICAgQkxVRV9CSVRTOiAzNDEyLFxyXG4gICAgQk9PTDogMzU2NzAsXHJcbiAgICBCT09MX1ZFQzI6IDM1NjcxLFxyXG4gICAgQk9PTF9WRUMzOiAzNTY3MixcclxuICAgIEJPT0xfVkVDNDogMzU2NzMsXHJcbiAgICBCUk9XU0VSX0RFRkFVTFRfV0VCR0w6IDM3NDQ0LFxyXG4gICAgQlVGRkVSX1NJWkU6IDM0NjYwLFxyXG4gICAgQlVGRkVSX1VTQUdFOiAzNDY2MSxcclxuICAgIEJZVEU6IDUxMjAsXHJcbiAgICBDQ1c6IDIzMDUsXHJcbiAgICBDTEFNUF9UT19FREdFOiAzMzA3MSxcclxuICAgIENPTE9SX0FUVEFDSE1FTlQwOiAzNjA2NCxcclxuICAgIENPTE9SX0JVRkZFUl9CSVQ6IDE2Mzg0LFxyXG4gICAgQ09MT1JfQ0xFQVJfVkFMVUU6IDMxMDYsXHJcbiAgICBDT0xPUl9XUklURU1BU0s6IDMxMDcsXHJcbiAgICBDT01QSUxFX1NUQVRVUzogMzU3MTMsXHJcbiAgICBDT01QUkVTU0VEX1RFWFRVUkVfRk9STUFUUzogMzQ0NjcsXHJcbiAgICBDT05TVEFOVF9BTFBIQTogMzI3NzEsXHJcbiAgICBDT05TVEFOVF9DT0xPUjogMzI3NjksXHJcbiAgICBDT05URVhUX0xPU1RfV0VCR0w6IDM3NDQyLFxyXG4gICAgQ1VMTF9GQUNFOiAyODg0LFxyXG4gICAgQ1VMTF9GQUNFX01PREU6IDI4ODUsXHJcbiAgICBDVVJSRU5UX1BST0dSQU06IDM1NzI1LFxyXG4gICAgQ1VSUkVOVF9WRVJURVhfQVRUUklCOiAzNDM0MixcclxuICAgIENXOiAyMzA0LFxyXG4gICAgREVDUjogNzY4MyxcclxuICAgIERFQ1JfV1JBUDogMzQwNTYsXHJcbiAgICBERUxFVEVfU1RBVFVTOiAzNTcxMixcclxuICAgIERFUFRIX0FUVEFDSE1FTlQ6IDM2MDk2LFxyXG4gICAgREVQVEhfQklUUzogMzQxNCxcclxuICAgIERFUFRIX0JVRkZFUl9CSVQ6IDI1NixcclxuICAgIERFUFRIX0NMRUFSX1ZBTFVFOiAyOTMxLFxyXG4gICAgREVQVEhfQ09NUE9ORU5UOiA2NDAyLFxyXG4gICAgREVQVEhfQ09NUE9ORU5UMTY6IDMzMTg5LFxyXG4gICAgREVQVEhfRlVOQzogMjkzMixcclxuICAgIERFUFRIX1JBTkdFOiAyOTI4LFxyXG4gICAgREVQVEhfU1RFTkNJTDogMzQwNDEsXHJcbiAgICBERVBUSF9TVEVOQ0lMX0FUVEFDSE1FTlQ6IDMzMzA2LFxyXG4gICAgREVQVEhfVEVTVDogMjkyOSxcclxuICAgIERFUFRIX1dSSVRFTUFTSzogMjkzMCxcclxuICAgIERJVEhFUjogMzAyNCxcclxuICAgIERPTlRfQ0FSRTogNDM1MixcclxuICAgIERTVF9BTFBIQTogNzcyLFxyXG4gICAgRFNUX0NPTE9SOiA3NzQsXHJcbiAgICBEWU5BTUlDX0RSQVc6IDM1MDQ4LFxyXG4gICAgRUxFTUVOVF9BUlJBWV9CVUZGRVI6IDM0OTYzLFxyXG4gICAgRUxFTUVOVF9BUlJBWV9CVUZGRVJfQklORElORzogMzQ5NjUsXHJcbiAgICBFUVVBTDogNTE0LFxyXG4gICAgRkFTVEVTVDogNDM1MyxcclxuICAgIEZMT0FUOiA1MTI2LFxyXG4gICAgRkxPQVRfTUFUMjogMzU2NzQsXHJcbiAgICBGTE9BVF9NQVQzOiAzNTY3NSxcclxuICAgIEZMT0FUX01BVDQ6IDM1Njc2LFxyXG4gICAgRkxPQVRfVkVDMjogMzU2NjQsXHJcbiAgICBGTE9BVF9WRUMzOiAzNTY2NSxcclxuICAgIEZMT0FUX1ZFQzQ6IDM1NjY2LFxyXG4gICAgRlJBR01FTlRfU0hBREVSOiAzNTYzMixcclxuICAgIEZSQU1FQlVGRkVSOiAzNjE2MCxcclxuICAgIEZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfT0JKRUNUX05BTUU6IDM2MDQ5LFxyXG4gICAgRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9PQkpFQ1RfVFlQRTogMzYwNDgsXHJcbiAgICBGUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX1RFWFRVUkVfQ1VCRV9NQVBfRkFDRTogMzYwNTEsXHJcbiAgICBGUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX1RFWFRVUkVfTEVWRUw6IDM2MDUwLFxyXG4gICAgRlJBTUVCVUZGRVJfQklORElORzogMzYwMDYsXHJcbiAgICBGUkFNRUJVRkZFUl9DT01QTEVURTogMzYwNTMsXHJcbiAgICBGUkFNRUJVRkZFUl9JTkNPTVBMRVRFX0FUVEFDSE1FTlQ6IDM2MDU0LFxyXG4gICAgRlJBTUVCVUZGRVJfSU5DT01QTEVURV9ESU1FTlNJT05TOiAzNjA1NyxcclxuICAgIEZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTUlTU0lOR19BVFRBQ0hNRU5UOiAzNjA1NSxcclxuICAgIEZSQU1FQlVGRkVSX1VOU1VQUE9SVEVEOiAzNjA2MSxcclxuICAgIEZST05UOiAxMDI4LFxyXG4gICAgRlJPTlRfQU5EX0JBQ0s6IDEwMzIsXHJcbiAgICBGUk9OVF9GQUNFOiAyODg2LFxyXG4gICAgRlVOQ19BREQ6IDMyNzc0LFxyXG4gICAgRlVOQ19SRVZFUlNFX1NVQlRSQUNUOiAzMjc3OSxcclxuICAgIEZVTkNfU1VCVFJBQ1Q6IDMyNzc4LFxyXG4gICAgR0VORVJBVEVfTUlQTUFQX0hJTlQ6IDMzMTcwLFxyXG4gICAgR0VRVUFMOiA1MTgsXHJcbiAgICBHUkVBVEVSOiA1MTYsXHJcbiAgICBHUkVFTl9CSVRTOiAzNDExLFxyXG4gICAgSElHSF9GTE9BVDogMzYzMzgsXHJcbiAgICBISUdIX0lOVDogMzYzNDEsXHJcbiAgICBJTkNSOiA3NjgyLFxyXG4gICAgSU5DUl9XUkFQOiAzNDA1NSxcclxuICAgIElORk9fTE9HX0xFTkdUSDogMzU3MTYsXHJcbiAgICBJTlQ6IDUxMjQsXHJcbiAgICBJTlRfVkVDMjogMzU2NjcsXHJcbiAgICBJTlRfVkVDMzogMzU2NjgsXHJcbiAgICBJTlRfVkVDNDogMzU2NjksXHJcbiAgICBJTlZBTElEX0VOVU06IDEyODAsXHJcbiAgICBJTlZBTElEX0ZSQU1FQlVGRkVSX09QRVJBVElPTjogMTI4NixcclxuICAgIElOVkFMSURfT1BFUkFUSU9OOiAxMjgyLFxyXG4gICAgSU5WQUxJRF9WQUxVRTogMTI4MSxcclxuICAgIElOVkVSVDogNTM4NixcclxuICAgIEtFRVA6IDc2ODAsXHJcbiAgICBMRVFVQUw6IDUxNSxcclxuICAgIExFU1M6IDUxMyxcclxuICAgIExJTkVBUjogOTcyOSxcclxuICAgIExJTkVBUl9NSVBNQVBfTElORUFSOiA5OTg3LFxyXG4gICAgTElORUFSX01JUE1BUF9ORUFSRVNUOiA5OTg1LFxyXG4gICAgTElORVM6IDEsXHJcbiAgICBMSU5FX0xPT1A6IDIsXHJcbiAgICBMSU5FX1NUUklQOiAzLFxyXG4gICAgTElORV9XSURUSDogMjg0OSxcclxuICAgIExJTktfU1RBVFVTOiAzNTcxNCxcclxuICAgIExPV19GTE9BVDogMzYzMzYsXHJcbiAgICBMT1dfSU5UOiAzNjMzOSxcclxuICAgIExVTUlOQU5DRTogNjQwOSxcclxuICAgIExVTUlOQU5DRV9BTFBIQTogNjQxMCxcclxuICAgIE1BWF9DT01CSU5FRF9URVhUVVJFX0lNQUdFX1VOSVRTOiAzNTY2MSxcclxuICAgIE1BWF9DVUJFX01BUF9URVhUVVJFX1NJWkU6IDM0MDc2LFxyXG4gICAgTUFYX0ZSQUdNRU5UX1VOSUZPUk1fVkVDVE9SUzogMzYzNDksXHJcbiAgICBNQVhfUkVOREVSQlVGRkVSX1NJWkU6IDM0MDI0LFxyXG4gICAgTUFYX1RFWFRVUkVfSU1BR0VfVU5JVFM6IDM0OTMwLFxyXG4gICAgTUFYX1RFWFRVUkVfU0laRTogMzM3OSxcclxuICAgIE1BWF9WQVJZSU5HX1ZFQ1RPUlM6IDM2MzQ4LFxyXG4gICAgTUFYX1ZFUlRFWF9BVFRSSUJTOiAzNDkyMSxcclxuICAgIE1BWF9WRVJURVhfVEVYVFVSRV9JTUFHRV9VTklUUzogMzU2NjAsXHJcbiAgICBNQVhfVkVSVEVYX1VOSUZPUk1fVkVDVE9SUzogMzYzNDcsXHJcbiAgICBNQVhfVklFV1BPUlRfRElNUzogMzM4NixcclxuICAgIE1FRElVTV9GTE9BVDogMzYzMzcsXHJcbiAgICBNRURJVU1fSU5UOiAzNjM0MCxcclxuICAgIE1JUlJPUkVEX1JFUEVBVDogMzM2NDgsXHJcbiAgICBORUFSRVNUOiA5NzI4LFxyXG4gICAgTkVBUkVTVF9NSVBNQVBfTElORUFSOiA5OTg2LFxyXG4gICAgTkVBUkVTVF9NSVBNQVBfTkVBUkVTVDogOTk4NCxcclxuICAgIE5FVkVSOiA1MTIsXHJcbiAgICBOSUNFU1Q6IDQzNTQsXHJcbiAgICBOT05FOiAwLFxyXG4gICAgTk9URVFVQUw6IDUxNyxcclxuICAgIE5PX0VSUk9SOiAwLFxyXG4gICAgTlVNX0NPTVBSRVNTRURfVEVYVFVSRV9GT1JNQVRTOiAzNDQ2NixcclxuICAgIE9ORTogMSxcclxuICAgIE9ORV9NSU5VU19DT05TVEFOVF9BTFBIQTogMzI3NzIsXHJcbiAgICBPTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1I6IDMyNzcwLFxyXG4gICAgT05FX01JTlVTX0RTVF9BTFBIQTogNzczLFxyXG4gICAgT05FX01JTlVTX0RTVF9DT0xPUjogNzc1LFxyXG4gICAgT05FX01JTlVTX1NSQ19BTFBIQTogNzcxLFxyXG4gICAgT05FX01JTlVTX1NSQ19DT0xPUjogNzY5LFxyXG4gICAgT1VUX09GX01FTU9SWTogMTI4NSxcclxuICAgIFBBQ0tfQUxJR05NRU5UOiAzMzMzLFxyXG4gICAgUE9JTlRTOiAwLFxyXG4gICAgUE9MWUdPTl9PRkZTRVRfRkFDVE9SOiAzMjgyNCxcclxuICAgIFBPTFlHT05fT0ZGU0VUX0ZJTEw6IDMyODIzLFxyXG4gICAgUE9MWUdPTl9PRkZTRVRfVU5JVFM6IDEwNzUyLFxyXG4gICAgUkVEX0JJVFM6IDM0MTAsXHJcbiAgICBSRU5ERVJCVUZGRVI6IDM2MTYxLFxyXG4gICAgUkVOREVSQlVGRkVSX0FMUEhBX1NJWkU6IDM2MTc5LFxyXG4gICAgUkVOREVSQlVGRkVSX0JJTkRJTkc6IDM2MDA3LFxyXG4gICAgUkVOREVSQlVGRkVSX0JMVUVfU0laRTogMzYxNzgsXHJcbiAgICBSRU5ERVJCVUZGRVJfREVQVEhfU0laRTogMzYxODAsXHJcbiAgICBSRU5ERVJCVUZGRVJfR1JFRU5fU0laRTogMzYxNzcsXHJcbiAgICBSRU5ERVJCVUZGRVJfSEVJR0hUOiAzNjE2MyxcclxuICAgIFJFTkRFUkJVRkZFUl9JTlRFUk5BTF9GT1JNQVQ6IDM2MTY0LFxyXG4gICAgUkVOREVSQlVGRkVSX1JFRF9TSVpFOiAzNjE3NixcclxuICAgIFJFTkRFUkJVRkZFUl9TVEVOQ0lMX1NJWkU6IDM2MTgxLFxyXG4gICAgUkVOREVSQlVGRkVSX1dJRFRIOiAzNjE2MixcclxuICAgIFJFTkRFUkVSOiA3OTM3LFxyXG4gICAgUkVQRUFUOiAxMDQ5NyxcclxuICAgIFJFUExBQ0U6IDc2ODEsXHJcbiAgICBSR0I6IDY0MDcsXHJcbiAgICBSR0I1X0ExOiAzMjg1NSxcclxuICAgIFJHQjU2NTogMzYxOTQsXHJcbiAgICBSR0JBOiA2NDA4LFxyXG4gICAgUkdCQTQ6IDMyODU0LFxyXG4gICAgU0FNUExFUl8yRDogMzU2NzgsXHJcbiAgICBTQU1QTEVSX0NVQkU6IDM1NjgwLFxyXG4gICAgU0FNUExFUzogMzI5MzcsXHJcbiAgICBTQU1QTEVfQUxQSEFfVE9fQ09WRVJBR0U6IDMyOTI2LFxyXG4gICAgU0FNUExFX0JVRkZFUlM6IDMyOTM2LFxyXG4gICAgU0FNUExFX0NPVkVSQUdFOiAzMjkyOCxcclxuICAgIFNBTVBMRV9DT1ZFUkFHRV9JTlZFUlQ6IDMyOTM5LFxyXG4gICAgU0FNUExFX0NPVkVSQUdFX1ZBTFVFOiAzMjkzOCxcclxuICAgIFNDSVNTT1JfQk9YOiAzMDg4LFxyXG4gICAgU0NJU1NPUl9URVNUOiAzMDg5LFxyXG4gICAgU0hBREVSX0NPTVBJTEVSOiAzNjM0NixcclxuICAgIFNIQURFUl9TT1VSQ0VfTEVOR1RIOiAzNTcyMCxcclxuICAgIFNIQURFUl9UWVBFOiAzNTY2MyxcclxuICAgIFNIQURJTkdfTEFOR1VBR0VfVkVSU0lPTjogMzU3MjQsXHJcbiAgICBTSE9SVDogNTEyMixcclxuICAgIFNSQ19BTFBIQTogNzcwLFxyXG4gICAgU1JDX0FMUEhBX1NBVFVSQVRFOiA3NzYsXHJcbiAgICBTUkNfQ09MT1I6IDc2OCxcclxuICAgIFNUQVRJQ19EUkFXOiAzNTA0NCxcclxuICAgIFNURU5DSUxfQVRUQUNITUVOVDogMzYxMjgsXHJcbiAgICBTVEVOQ0lMX0JBQ0tfRkFJTDogMzQ4MTcsXHJcbiAgICBTVEVOQ0lMX0JBQ0tfRlVOQzogMzQ4MTYsXHJcbiAgICBTVEVOQ0lMX0JBQ0tfUEFTU19ERVBUSF9GQUlMOiAzNDgxOCxcclxuICAgIFNURU5DSUxfQkFDS19QQVNTX0RFUFRIX1BBU1M6IDM0ODE5LFxyXG4gICAgU1RFTkNJTF9CQUNLX1JFRjogMzYwMDMsXHJcbiAgICBTVEVOQ0lMX0JBQ0tfVkFMVUVfTUFTSzogMzYwMDQsXHJcbiAgICBTVEVOQ0lMX0JBQ0tfV1JJVEVNQVNLOiAzNjAwNSxcclxuICAgIFNURU5DSUxfQklUUzogMzQxNSxcclxuICAgIFNURU5DSUxfQlVGRkVSX0JJVDogMTAyNCxcclxuICAgIFNURU5DSUxfQ0xFQVJfVkFMVUU6IDI5NjEsXHJcbiAgICBTVEVOQ0lMX0ZBSUw6IDI5NjQsXHJcbiAgICBTVEVOQ0lMX0ZVTkM6IDI5NjIsXHJcbiAgICBTVEVOQ0lMX0lOREVYOiA2NDAxLFxyXG4gICAgU1RFTkNJTF9JTkRFWDg6IDM2MTY4LFxyXG4gICAgU1RFTkNJTF9QQVNTX0RFUFRIX0ZBSUw6IDI5NjUsXHJcbiAgICBTVEVOQ0lMX1BBU1NfREVQVEhfUEFTUzogMjk2NixcclxuICAgIFNURU5DSUxfUkVGOiAyOTY3LFxyXG4gICAgU1RFTkNJTF9URVNUOiAyOTYwLFxyXG4gICAgU1RFTkNJTF9WQUxVRV9NQVNLOiAyOTYzLFxyXG4gICAgU1RFTkNJTF9XUklURU1BU0s6IDI5NjgsXHJcbiAgICBTVFJFQU1fRFJBVzogMzUwNDAsXHJcbiAgICBTVUJQSVhFTF9CSVRTOiAzNDA4LFxyXG4gICAgVEVYVFVSRTogNTg5MCxcclxuICAgIFRFWFRVUkUwOiAzMzk4NCxcclxuICAgIFRFWFRVUkUxOiAzMzk4NSxcclxuICAgIFRFWFRVUkUyOiAzMzk4NixcclxuICAgIFRFWFRVUkUzOiAzMzk4NyxcclxuICAgIFRFWFRVUkU0OiAzMzk4OCxcclxuICAgIFRFWFRVUkU1OiAzMzk4OSxcclxuICAgIFRFWFRVUkU2OiAzMzk5MCxcclxuICAgIFRFWFRVUkU3OiAzMzk5MSxcclxuICAgIFRFWFRVUkU4OiAzMzk5MixcclxuICAgIFRFWFRVUkU5OiAzMzk5MyxcclxuICAgIFRFWFRVUkUxMDogMzM5OTQsXHJcbiAgICBURVhUVVJFMTE6IDMzOTk1LFxyXG4gICAgVEVYVFVSRTEyOiAzMzk5NixcclxuICAgIFRFWFRVUkUxMzogMzM5OTcsXHJcbiAgICBURVhUVVJFMTQ6IDMzOTk4LFxyXG4gICAgVEVYVFVSRTE1OiAzMzk5OSxcclxuICAgIFRFWFRVUkUxNjogMzQwMDAsXHJcbiAgICBURVhUVVJFMTc6IDM0MDAxLFxyXG4gICAgVEVYVFVSRTE4OiAzNDAwMixcclxuICAgIFRFWFRVUkUxOTogMzQwMDMsXHJcbiAgICBURVhUVVJFMjA6IDM0MDA0LFxyXG4gICAgVEVYVFVSRTIxOiAzNDAwNSxcclxuICAgIFRFWFRVUkUyMjogMzQwMDYsXHJcbiAgICBURVhUVVJFMjM6IDM0MDA3LFxyXG4gICAgVEVYVFVSRTI0OiAzNDAwOCxcclxuICAgIFRFWFRVUkUyNTogMzQwMDksXHJcbiAgICBURVhUVVJFMjY6IDM0MDEwLFxyXG4gICAgVEVYVFVSRTI3OiAzNDAxMSxcclxuICAgIFRFWFRVUkUyODogMzQwMTIsXHJcbiAgICBURVhUVVJFMjk6IDM0MDEzLFxyXG4gICAgVEVYVFVSRTMwOiAzNDAxNCxcclxuICAgIFRFWFRVUkUzMTogMzQwMTUsXHJcbiAgICBURVhUVVJFXzJEOiAzNTUzLFxyXG4gICAgVEVYVFVSRV9CSU5ESU5HXzJEOiAzMjg3MyxcclxuICAgIFRFWFRVUkVfQklORElOR19DVUJFX01BUDogMzQwNjgsXHJcbiAgICBURVhUVVJFX0NVQkVfTUFQOiAzNDA2NyxcclxuICAgIFRFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWDogMzQwNzAsXHJcbiAgICBURVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1k6IDM0MDcyLFxyXG4gICAgVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9aOiAzNDA3NCxcclxuICAgIFRFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWDogMzQwNjksXHJcbiAgICBURVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1k6IDM0MDcxLFxyXG4gICAgVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9aOiAzNDA3MyxcclxuICAgIFRFWFRVUkVfTUFHX0ZJTFRFUjogMTAyNDAsXHJcbiAgICBURVhUVVJFX01JTl9GSUxURVI6IDEwMjQxLFxyXG4gICAgVEVYVFVSRV9XUkFQX1M6IDEwMjQyLFxyXG4gICAgVEVYVFVSRV9XUkFQX1Q6IDEwMjQzLFxyXG4gICAgVFJJQU5HTEVTOiA0LFxyXG4gICAgVFJJQU5HTEVfRkFOOiA2LFxyXG4gICAgVFJJQU5HTEVfU1RSSVA6IDUsXHJcbiAgICBVTlBBQ0tfQUxJR05NRU5UOiAzMzE3LFxyXG4gICAgVU5QQUNLX0NPTE9SU1BBQ0VfQ09OVkVSU0lPTl9XRUJHTDogMzc0NDMsXHJcbiAgICBVTlBBQ0tfRkxJUF9ZX1dFQkdMOiAzNzQ0MCxcclxuICAgIFVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTDogMzc0NDEsXHJcbiAgICBVTlNJR05FRF9CWVRFOiA1MTIxLFxyXG4gICAgVU5TSUdORURfSU5UOiA1MTI1LFxyXG4gICAgVU5TSUdORURfU0hPUlQ6IDUxMjMsXHJcbiAgICBVTlNJR05FRF9TSE9SVF80XzRfNF80OiAzMjgxOSxcclxuICAgIFVOU0lHTkVEX1NIT1JUXzVfNV81XzE6IDMyODIwLFxyXG4gICAgVU5TSUdORURfU0hPUlRfNV82XzU6IDMzNjM1LFxyXG4gICAgVkFMSURBVEVfU1RBVFVTOiAzNTcxNSxcclxuICAgIFZFTkRPUjogNzkzNixcclxuICAgIFZFUlNJT046IDc5MzgsXHJcbiAgICBWRVJURVhfQVRUUklCX0FSUkFZX0JVRkZFUl9CSU5ESU5HOiAzNDk3NSxcclxuICAgIFZFUlRFWF9BVFRSSUJfQVJSQVlfRU5BQkxFRDogMzQzMzgsXHJcbiAgICBWRVJURVhfQVRUUklCX0FSUkFZX05PUk1BTElaRUQ6IDM0OTIyLFxyXG4gICAgVkVSVEVYX0FUVFJJQl9BUlJBWV9QT0lOVEVSOiAzNDM3MyxcclxuICAgIFZFUlRFWF9BVFRSSUJfQVJSQVlfU0laRTogMzQzMzksXHJcbiAgICBWRVJURVhfQVRUUklCX0FSUkFZX1NUUklERTogMzQzNDAsXHJcbiAgICBWRVJURVhfQVRUUklCX0FSUkFZX1RZUEU6IDM0MzQxLFxyXG4gICAgVkVSVEVYX1NIQURFUjogMzU2MzMsXHJcbiAgICBWSUVXUE9SVDogMjk3OCxcclxuICAgIFpFUk86IDBcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb25zdGFudHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9jb25zdGFudHNcIikpO1xyXG5leHBvcnRzLkdMID0gY29uc3RhbnRzXzEuZGVmYXVsdDtcclxuX19leHBvcnQocmVxdWlyZShcIi4vR0xDYXRcIikpO1xyXG5fX2V4cG9ydChyZXF1aXJlKFwiLi9HTENhdEJ1ZmZlclwiKSk7XHJcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0dMQ2F0RnJhbWVidWZmZXJcIikpO1xyXG5fX2V4cG9ydChyZXF1aXJlKFwiLi9HTENhdFByb2dyYW1cIikpO1xyXG5fX2V4cG9ydChyZXF1aXJlKFwiLi9HTENhdFJlbmRlcmJ1ZmZlclwiKSk7XHJcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL0dMQ2F0VGV4dHVyZVwiKSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=