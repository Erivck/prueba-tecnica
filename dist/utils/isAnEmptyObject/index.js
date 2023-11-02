"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAnEmptyObject = void 0;
const isAnEmptyObject = (object) => {
    return !Object.values(object).filter(Boolean).length;
};
exports.isAnEmptyObject = isAnEmptyObject;
//# sourceMappingURL=index.js.map