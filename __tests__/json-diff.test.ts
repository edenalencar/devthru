import { describe, it, expect } from 'vitest';
import { computeJSONDiff } from '@/lib/utils/generators/json-diff';

describe('JSON Diff Semantic Engine', () => {
    it('detects identical objects with same keys', () => {
        const jsonA = JSON.stringify({ id: 1, name: 'DevThru', active: true });
        const jsonB = JSON.stringify({ id: 1, name: 'DevThru', active: true });

        const result = computeJSONDiff(jsonA, jsonB);
        expect(result.isValid).toBe(true);
        expect(result.isIdentical).toBe(true);
        expect(result.stats.added).toBe(0);
        expect(result.stats.removed).toBe(0);
        expect(result.stats.modified).toBe(0);
        expect(result.stats.unchanged).toBe(3);
        expect(result.flatChanges).toHaveLength(0);
    });

    it('considers objects with reordered keys as identical (semantic equality)', () => {
        const jsonA = JSON.stringify({ a: 1, b: 2, c: { x: 10, y: 20 } });
        const jsonB = JSON.stringify({ c: { y: 20, x: 10 }, b: 2, a: 1 });

        const result = computeJSONDiff(jsonA, jsonB);
        expect(result.isValid).toBe(true);
        expect(result.isIdentical).toBe(true);
        expect(result.stats.modified).toBe(0);
    });

    it('identifies added, removed and modified properties', () => {
        const jsonA = JSON.stringify({
            name: 'API v1',
            status: 200,
            deprecatedField: 'old',
            items: [1, 2]
        });
        const jsonB = JSON.stringify({
            name: 'API v2',
            status: 200,
            newFeature: true,
            items: [1, 3, 4]
        });

        const result = computeJSONDiff(jsonA, jsonB);
        expect(result.isValid).toBe(true);
        expect(result.isIdentical).toBe(false);

        // Name changed, deprecatedField removed, newFeature added
        const addedKeys = result.flatChanges.filter(c => c.type === 'added').map(c => c.key);
        const removedKeys = result.flatChanges.filter(c => c.type === 'removed').map(c => c.key);
        const modifiedKeys = result.flatChanges.filter(c => c.type === 'modified').map(c => c.key);

        expect(addedKeys).toContain('newFeature');
        expect(removedKeys).toContain('deprecatedField');
        expect(modifiedKeys).toContain('name');
    });

    it('handles nested array differences', () => {
        const jsonA = JSON.stringify({ users: [{ id: 1, role: 'user' }] });
        const jsonB = JSON.stringify({ users: [{ id: 1, role: 'admin' }, { id: 2, role: 'guest' }] });

        const result = computeJSONDiff(jsonA, jsonB);
        expect(result.isValid).toBe(true);
        expect(result.isIdentical).toBe(false);
        expect(result.stats.added).toBeGreaterThanOrEqual(1);
        expect(result.stats.modified).toBeGreaterThanOrEqual(1);
    });

    it('returns validation errors for invalid JSON syntax', () => {
        const invalidA = '{ invalid json ';
        const validB = '{"valid": true}';

        const result = computeJSONDiff(invalidA, validB);
        expect(result.isValid).toBe(false);
        expect(result.errorOriginal).toBeDefined();
        expect(result.errorModified).toBeUndefined();
    });
});

