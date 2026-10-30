/**
 * Utilitário de Comparação Semântica de JSON (JSON Diff)
 * Compara dois objetos JSON estruturalmente, ignorando ordenação arbitrária de chaves.
 */

export type DiffChangeType = 'added' | 'removed' | 'modified' | 'unchanged';

export interface DiffNode {
    path: string;
    key: string;
    type: DiffChangeType;
    oldValue?: any;
    newValue?: any;
    children?: DiffNode[];
}

export interface JSONDiffResult {
    isValid: boolean;
    errorOriginal?: string;
    errorModified?: string;
    isIdentical: boolean;
    stats: {
        added: number;
        removed: number;
        modified: number;
        unchanged: number;
    };
    diffTree: DiffNode[];
    flatChanges: DiffNode[];
}

function getType(val: any): string {
    if (val === null) return 'null';
    if (Array.isArray(val)) return 'array';
    return typeof val;
}

function deepEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (a === null || b === null || typeof a !== typeof b) return false;

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
    }

    if (typeof a === 'object' && typeof b === 'object') {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;
        for (const key of keysA) {
            if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
            if (!deepEqual(a[key], b[key])) return false;
        }
        return true;
    }

    return false;
}

function compareObjects(
    oldObj: any,
    newObj: any,
    currentPath = '',
    flatList: DiffNode[],
    stats: { added: number; removed: number; modified: number; unchanged: number }
): DiffNode[] {
    const nodes: DiffNode[] = [];
    const typeOld = getType(oldObj);
    const typeNew = getType(newObj);

    // Se os tipos raiz forem completamente diferentes ou um for primitivo
    if (typeOld !== typeNew || (typeOld !== 'object' && typeOld !== 'array')) {
        if (deepEqual(oldObj, newObj)) {
            stats.unchanged++;
            const node: DiffNode = {
                path: currentPath || 'root',
                key: currentPath.split('.').pop() || 'root',
                type: 'unchanged',
                oldValue: oldObj,
                newValue: newObj,
            };
            flatList.push(node);
            return [node];
        } else {
            stats.modified++;
            const node: DiffNode = {
                path: currentPath || 'root',
                key: currentPath.split('.').pop() || 'root',
                type: 'modified',
                oldValue: oldObj,
                newValue: newObj,
            };
            flatList.push(node);
            return [node];
        }
    }

    // Comparando Objetos
    if (typeOld === 'object') {
        const allKeys = Array.from(new Set([...Object.keys(oldObj), ...Object.keys(newObj)])).sort();

        for (const key of allKeys) {
            const path = currentPath ? `${currentPath}.${key}` : key;
            const hasOld = Object.prototype.hasOwnProperty.call(oldObj, key);
            const hasNew = Object.prototype.hasOwnProperty.call(newObj, key);

            if (hasOld && !hasNew) {
                stats.removed++;
                const node: DiffNode = {
                    path,
                    key,
                    type: 'removed',
                    oldValue: oldObj[key],
                };
                nodes.push(node);
                flatList.push(node);
            } else if (!hasOld && hasNew) {
                stats.added++;
                const node: DiffNode = {
                    path,
                    key,
                    type: 'added',
                    newValue: newObj[key],
                };
                nodes.push(node);
                flatList.push(node);
            } else {
                const valOld = oldObj[key];
                const valNew = newObj[key];
                const childTypeOld = getType(valOld);
                const childTypeNew = getType(valNew);

                if ((childTypeOld === 'object' || childTypeOld === 'array') && childTypeOld === childTypeNew) {
                    const children = compareObjects(valOld, valNew, path, flatList, stats);
                    const isAllUnchanged = children.every(c => c.type === 'unchanged');
                    const node: DiffNode = {
                        path,
                        key,
                        type: isAllUnchanged ? 'unchanged' : 'modified',
                        oldValue: valOld,
                        newValue: valNew,
                        children,
                    };
                    nodes.push(node);
                } else if (deepEqual(valOld, valNew)) {
                    stats.unchanged++;
                    const node: DiffNode = {
                        path,
                        key,
                        type: 'unchanged',
                        oldValue: valOld,
                        newValue: valNew,
                    };
                    nodes.push(node);
                    flatList.push(node);
                } else {
                    stats.modified++;
                    const node: DiffNode = {
                        path,
                        key,
                        type: 'modified',
                        oldValue: valOld,
                        newValue: valNew,
                    };
                    nodes.push(node);
                    flatList.push(node);
                }
            }
        }
    }

    // Comparando Arrays
    if (typeOld === 'array') {
        const maxLen = Math.max(oldObj.length, newObj.length);

        for (let i = 0; i < maxLen; i++) {
            const path = `${currentPath}[${i}]`;
            const hasOld = i < oldObj.length;
            const hasNew = i < newObj.length;

            if (hasOld && !hasNew) {
                stats.removed++;
                const node: DiffNode = {
                    path,
                    key: `[${i}]`,
                    type: 'removed',
                    oldValue: oldObj[i],
                };
                nodes.push(node);
                flatList.push(node);
            } else if (!hasOld && hasNew) {
                stats.added++;
                const node: DiffNode = {
                    path,
                    key: `[${i}]`,
                    type: 'added',
                    newValue: newObj[i],
                };
                nodes.push(node);
                flatList.push(node);
            } else {
                const itemOld = oldObj[i];
                const itemNew = newObj[i];
                const itemTypeOld = getType(itemOld);
                const itemTypeNew = getType(itemNew);

                if ((itemTypeOld === 'object' || itemTypeOld === 'array') && itemTypeOld === itemTypeNew) {
                    const children = compareObjects(itemOld, itemNew, path, flatList, stats);
                    const isAllUnchanged = children.every(c => c.type === 'unchanged');
                    const node: DiffNode = {
                        path,
                        key: `[${i}]`,
                        type: isAllUnchanged ? 'unchanged' : 'modified',
                        oldValue: itemOld,
                        newValue: itemNew,
                        children,
                    };
                    nodes.push(node);
                } else if (deepEqual(itemOld, itemNew)) {
                    stats.unchanged++;
                    const node: DiffNode = {
                        path,
                        key: `[${i}]`,
                        type: 'unchanged',
                        oldValue: itemOld,
                        newValue: itemNew,
                    };
                    nodes.push(node);
                    flatList.push(node);
                } else {
                    stats.modified++;
                    const node: DiffNode = {
                        path,
                        key: `[${i}]`,
                        type: 'modified',
                        oldValue: itemOld,
                        newValue: itemNew,
                    };
                    nodes.push(node);
                    flatList.push(node);
                }
            }
        }
    }

    return nodes;
}

/**
 * Compara semanticamente duas strings contendo código JSON.
 */
export function computeJSONDiff(rawOriginal: string, rawModified: string): JSONDiffResult {
    let parsedOriginal: any;
    let parsedModified: any;
    let errorOriginal: string | undefined;
    let errorModified: string | undefined;

    try {
        parsedOriginal = JSON.parse(rawOriginal.trim());
    } catch (e: any) {
        errorOriginal = `JSON Original inválido: ${e.message}`;
    }

    try {
        parsedModified = JSON.parse(rawModified.trim());
    } catch (e: any) {
        errorModified = `JSON Modificado inválido: ${e.message}`;
    }

    if (errorOriginal || errorModified) {
        return {
            isValid: false,
            errorOriginal,
            errorModified,
            isIdentical: false,
            stats: { added: 0, removed: 0, modified: 0, unchanged: 0 },
            diffTree: [],
            flatChanges: [],
        };
    }

    const stats = { added: 0, removed: 0, modified: 0, unchanged: 0 };
    const flatChanges: DiffNode[] = [];
    const diffTree = compareObjects(parsedOriginal, parsedModified, '', flatChanges, stats);

    const isIdentical = stats.added === 0 && stats.removed === 0 && stats.modified === 0;

    return {
        isValid: true,
        isIdentical,
        stats,
        diffTree,
        flatChanges: flatChanges.filter(c => c.type !== 'unchanged'),
    };
}

