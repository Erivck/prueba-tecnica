"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omitPropertyFromObject = void 0;
const omitPropertyFromObject = (object, property) => {
    const { [property]: _, ...filteredObject } = object;
    return filteredObject;
};
exports.omitPropertyFromObject = omitPropertyFromObject;
//# sourceMappingURL=index.js.map